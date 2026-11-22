// yt-publicador: publica no YouTube Shorts os posts da fila atual da ATIVO (public.ig_posts), usando o canal conectado
// pelo yt-oauth (refresh token cifrado no Vault). Estado por post e destino em public.pub_destinos.
//
// TRAVAS (22/11/2026):
//  - "ciclo" (produção) só age se yt_canais.ativo = true. Hoje é false e NÃO existe cron chamando esta função.
//  - "teste" envia UM post escolhido, sempre como privado (ou não listado); "public" é recusado.
//  - "verificar", "previa" e "status" não enviam nada.
// Chamada só com o header x-cron-secret (mesmo segredo do ig-publicador, validado via RPC ig_validar_segredo).

import { createClient } from "npm:@supabase/supabase-js@2";
import { descricaoYoutube, tituloDoPost } from "./textos.ts";

const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { persistSession: false } });
const PERFIL = "ativo";
const CATEGORIA = "27"; // Educação
const MAX_TENTATIVAS = 3;

type Post = { id: string; video_url: string; capa_url: string; legenda: string; caminho_video: string; agendado_para: string; status: string };
type Destino = { id: string; post_id: string; status: string; agendado_para: string; externo_id: string | null; tentativas: number };

const json = (d: unknown, status = 200) => new Response(JSON.stringify(d), { status, headers: { "Content-Type": "application/json" } });

async function accessToken(): Promise<string> {
  const { data: rt, error } = await sb.rpc("yt_refresh_token", { p_perfil: PERFIL });
  if (error || !rt) throw new Error("refresh token do YouTube não encontrado — reconecte o canal (yt_novo_link_conexao)");
  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: Deno.env.get("YOUTUBE_CLIENT_ID") ?? "",
      client_secret: Deno.env.get("YOUTUBE_CLIENT_SECRET") ?? "",
      refresh_token: rt as string,
      grant_type: "refresh_token",
    }),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || !j.access_token) throw new Error(`Google recusou o refresh token (${j.error ?? r.status}). Se for invalid_grant, reconecte o canal.`);
  return j.access_token;
}

async function metadados(post: Post) {
  return { titulo: await tituloDoPost(post.caminho_video, post.legenda), descricao: descricaoYoutube(post.legenda) };
}

async function enviar(at: string, post: Post, titulo: string, descricao: string, privacidade: string, publishAt?: string) {
  const origem = await fetch(post.video_url, { headers: { "accept-encoding": "identity" } });
  if (!origem.ok) throw new Error(`download do vídeo falhou (HTTP ${origem.status})`);
  const bytes = new Uint8Array(await origem.arrayBuffer());
  const ini = await fetch("https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${at}`,
      "Content-Type": "application/json; charset=UTF-8",
      "X-Upload-Content-Length": String(bytes.byteLength),
      "X-Upload-Content-Type": "video/mp4",
    },
    body: JSON.stringify({
      snippet: { title: titulo, description: descricao, categoryId: CATEGORIA, defaultLanguage: "pt-BR", defaultAudioLanguage: "pt-BR" },
      status: { privacyStatus: privacidade, selfDeclaredMadeForKids: false, ...(publishAt ? { publishAt } : {}) },
    }),
  });
  const local = ini.headers.get("location");
  if (!ini.ok || !local) throw new Error(`YouTube recusou o início do envio (HTTP ${ini.status}): ${(await ini.text()).slice(0, 300)}`);
  const up = await fetch(local, { method: "PUT", headers: { "Content-Type": "video/mp4" }, body: bytes });
  const v = await up.json().catch(() => ({}));
  if (!up.ok || !v.id) throw new Error(`envio do vídeo falhou (HTTP ${up.status}): ${JSON.stringify(v.error ?? v).slice(0, 300)}`);
  return v as { id: string; status?: { uploadStatus?: string; privacyStatus?: string; publishAt?: string } };
}

async function statusNoYoutube(at: string, id: string) {
  const r = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=status,processingDetails&id=${encodeURIComponent(id)}`, { headers: { Authorization: `Bearer ${at}` } });
  const j = await r.json().catch(() => ({}));
  return j.items?.[0] ?? null;
}

async function atualizar(id: string, campos: Record<string, unknown>) {
  await sb.from("pub_destinos").update({ ...campos, atualizado_em: new Date().toISOString() }).eq("id", id);
}

async function postDaFila(postId: string): Promise<Post> {
  const { data, error } = await sb.from("ig_posts").select("id, video_url, capa_url, legenda, caminho_video, agendado_para, status").eq("id", postId).single();
  if (error || !data) throw new Error(`post ${postId} não está na fila`);
  return data as Post;
}

// ---------------------------------------------------------------- ações
/** Confere a autorização sem enviar nada: renova o token e lê o canal (custo: 1 unidade de cota). */
async function verificar() {
  const at = await accessToken();
  const r = await fetch("https://www.googleapis.com/youtube/v3/channels?part=snippet,status&mine=true", { headers: { Authorization: `Bearer ${at}` } });
  const j = await r.json().catch(() => ({}));
  const c = j.items?.[0];
  const { data: canal } = await sb.from("yt_canais").select("canal_id, ativo").eq("perfil", PERFIL).single();
  return json({ ok: !!c && c.id === canal?.canal_id, canal: c ? { id: c.id, titulo: c.snippet?.title, longUploadsStatus: c.status?.longUploadsStatus ?? null } : null, publicacao_automatica: canal?.ativo ?? false });
}

async function previa(corpo: { post_id: string }) {
  const post = await postDaFila(corpo.post_id);
  return json({ ok: true, post_id: post.id, video: post.caminho_video, ...(await metadados(post)), nada_foi_enviado: true });
}

async function teste(corpo: { post_id: string; privacidade?: string }) {
  const privacidade = corpo.privacidade ?? "private";
  if (!["private", "unlisted"].includes(privacidade)) return json({ ok: false, erro: "teste só aceita privacidade private ou unlisted" }, 400);
  const post = await postDaFila(corpo.post_id);
  const { titulo, descricao } = await metadados(post);
  const { data: d, error } = await sb.from("pub_destinos")
    .insert({ post_id: post.id, destino: "youtube", modo: "teste", status: "enviando", titulo, descricao, privacidade, agendado_para: post.agendado_para })
    .select("id").single();
  if (error || !d) throw new Error(`não foi possível registrar o teste: ${error?.message}`);
  try {
    const at = await accessToken();
    const v = await enviar(at, post, titulo, descricao, privacidade);
    await atualizar(d.id, { status: "processando", externo_id: v.id, url: `https://www.youtube.com/shorts/${v.id}`, erro: null });
    return json({ ok: true, destino_id: d.id, video_id: v.id, url: `https://www.youtube.com/shorts/${v.id}`, privacidade: v.status?.privacyStatus, upload: v.status?.uploadStatus, titulo });
  } catch (e) {
    await atualizar(d.id, { status: "erro", erro: String((e as Error).message).slice(0, 1000), tentativas: 1 });
    throw e;
  }
}

async function status(corpo: { destino_id: string }) {
  const { data: d } = await sb.from("pub_destinos").select("id, externo_id, modo, status").eq("id", corpo.destino_id).eq("destino", "youtube").single();
  if (!d?.externo_id) return json({ ok: false, erro: "destino sem vídeo enviado" }, 404);
  const item = await statusNoYoutube(await accessToken(), d.externo_id);
  if (!item) return json({ ok: false, erro: "vídeo não encontrado no canal" }, 404);
  const pronto = item.status?.uploadStatus === "processed";
  if (pronto && d.status === "processando") await atualizar(d.id, { status: d.modo === "teste" ? "publicado" : "agendado" });
  return json({ ok: true, video_id: d.externo_id, upload: item.status?.uploadStatus, privacidade: item.status?.privacyStatus, publishAt: item.status?.publishAt ?? null, processamento: item.processingDetails?.processingStatus ?? null });
}

/** Produção: sincroniza a fila e envia 1 post por chamada, agendado no próprio YouTube (privado + publishAt). */
async function ciclo() {
  const { data: canal } = await sb.from("yt_canais").select("ativo").eq("perfil", PERFIL).single();
  if (canal?.ativo !== true) return json({ ok: true, desativado: true, motivo: "yt_canais.ativo = false (publicação automática desligada)" });
  const novos = (await sb.rpc("pub_sincronizar", { p_destino: "youtube", p_horizonte: "2 days" })).data ?? 0;
  const agora = Date.now();
  // confirma os que já passaram do horário (até 2 por chamada; cada consulta custa 1 unidade de cota)
  const { data: vencidos } = await sb.from("pub_destinos").select("id, externo_id")
    .eq("destino", "youtube").eq("modo", "producao").in("status", ["processando", "agendado"])
    .lt("agendado_para", new Date(agora).toISOString()).not("externo_id", "is", null).order("agendado_para").limit(2);
  if (vencidos?.length) {
    const at = await accessToken();
    for (const v of vencidos) {
      const item = await statusNoYoutube(at, v.externo_id!);
      if (item?.status?.privacyStatus === "public") await atualizar(v.id, { status: "publicado", publicado_em: new Date().toISOString() });
    }
  }
  const { data: fila } = await sb.from("pub_destinos")
    .select("id, post_id, status, agendado_para, externo_id, tentativas")
    .eq("destino", "youtube").eq("modo", "producao").in("status", ["pendente", "erro"])
    .lt("tentativas", MAX_TENTATIVAS)
    .gt("agendado_para", new Date(agora + 15 * 60_000).toISOString())
    .lt("agendado_para", new Date(agora + 6 * 3600_000).toISOString())
    .order("agendado_para").limit(1);
  const alvo = (fila ?? [])[0] as Destino | undefined;
  if (!alvo) return json({ ok: true, novos, enviado: null });
  const post = await postDaFila(alvo.post_id);
  if (post.status === "cancelado" || post.status === "erro") {
    await atualizar(alvo.id, { status: "cancelado", erro: `post do Instagram está ${post.status}` });
    return json({ ok: true, novos, enviado: null, cancelado: alvo.id });
  }
  const { titulo, descricao } = await metadados(post);
  await atualizar(alvo.id, { status: "enviando", titulo, descricao, privacidade: "private" });
  try {
    const v = await enviar(await accessToken(), post, titulo, descricao, "private", new Date(alvo.agendado_para).toISOString());
    await atualizar(alvo.id, { status: "processando", externo_id: v.id, url: `https://www.youtube.com/shorts/${v.id}`, erro: null });
    return json({ ok: true, novos, enviado: v.id });
  } catch (e) {
    await atualizar(alvo.id, { status: "erro", erro: String((e as Error).message).slice(0, 1000), tentativas: alvo.tentativas + 1 });
    return json({ ok: false, novos, erro: (e as Error).message }, 500);
  }
}

Deno.serve(async (req) => {
  const segredo = req.headers.get("x-cron-secret") ?? "";
  const { data: valido } = await sb.rpc("ig_validar_segredo", { p_segredo: segredo });
  if (valido !== true) return json({ erro: "não autorizado" }, 401);
  const corpo = await req.json().catch(() => ({}));
  try {
    if (corpo.acao === "verificar") return await verificar();
    if (corpo.acao === "previa") return await previa(corpo);
    if (corpo.acao === "teste") return await teste(corpo);
    if (corpo.acao === "status") return await status(corpo);
    if (corpo.acao === "ciclo") return await ciclo();
    return json({ ok: false, erro: "ação desconhecida: verificar | previa | teste | status | ciclo" }, 400);
  } catch (e) {
    console.log(`yt-publicador: ${(e as Error).message}`);
    return json({ ok: false, erro: (e as Error).message }, 500);
  }
});
