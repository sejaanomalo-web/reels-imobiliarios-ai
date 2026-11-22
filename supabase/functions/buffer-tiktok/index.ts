// buffer-tiktok: publica no TikTok da ATIVO (@ativo.br) os posts da fila atual (public.ig_posts) via API GraphQL do
// Buffer (plano gratuito: 3 canais, 10 posts agendados por canal, 1.000 requisições a cada 30 dias — medido em
// 22/11/2026 nos headers x-ratelimit-*). Estado por post e destino em public.pub_destinos.
//
// TRAVAS (22/11/2026):
//  - "ciclo" (produção) só age se buffer_canais.ativo = true. Hoje é false e NÃO existe cron chamando esta função.
//  - "teste" cria o post como RASCUNHO no Buffer (saveToDraft): nada vai ao TikTok. Se o Buffer
//    devolver qualquer status diferente de "draft", o post é apagado na hora.
//  - "validar", "previa" e "status" não criam nada.
// Chamada só com o header x-cron-secret (mesmo segredo do ig-publicador, via RPC ig_validar_segredo). A chave do
// Buffer fica no secret BUFFER_API_KEY e nunca é devolvida.

import { createClient } from "npm:@supabase/supabase-js@2";
import { textoTiktok, tituloDoPost } from "./textos.ts";

const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { persistSession: false } });
const API = "https://api.buffer.com";
const PERFIL = "ativo";
const LIMITE_AGENDADOS = 8; // plano gratuito: 10 por canal; 2 de folga
const MARCAR_COMO_IA = true; // narração com voz sintética: declara conteúdo gerado por IA no TikTok

const json = (d: unknown, status = 200) => new Response(JSON.stringify(d), { status, headers: { "Content-Type": "application/json" } });

async function gql(query: string, variables: Record<string, unknown> = {}) {
  const key = Deno.env.get("BUFFER_API_KEY");
  if (!key) throw new Error("secret BUFFER_API_KEY ausente");
  const r = await fetch(API, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` }, body: JSON.stringify({ query, variables }) });
  const j = await r.json().catch(() => ({}));
  const cota = { restante: r.headers.get("x-ratelimit-remaining"), limite: r.headers.get("x-ratelimit-limit") };
  if (!r.ok || j.errors) throw new Error(`Buffer HTTP ${r.status}: ${JSON.stringify(j.errors ?? j).slice(0, 300)} (cota restante ${cota.restante})`);
  return { data: j.data, cota };
}

async function canal() {
  const { data, error } = await sb.from("buffer_canais").select("organizacao_id, canal_id, canal_nome, ativo").eq("perfil", PERFIL).single();
  if (error || !data) throw new Error("canal do Buffer não registrado em buffer_canais");
  return data as { organizacao_id: string; canal_id: string; canal_nome: string; ativo: boolean };
}

async function postDaFila(postId: string) {
  const { data, error } = await sb.from("ig_posts").select("id, video_url, capa_url, legenda, caminho_video, agendado_para, status").eq("id", postId).single();
  if (error || !data) throw new Error(`post ${postId} não está na fila`);
  return data as { id: string; video_url: string; capa_url: string; legenda: string; caminho_video: string; agendado_para: string; status: string };
}

const CRIAR = `mutation($input: CreatePostInput!) { createPost(input: $input) { __typename
  ... on PostActionSuccess { post { id status dueAt shareMode } } ... on MutationError { message } } }`;
const APAGAR = `mutation($input: DeletePostInput!) { deletePost(input: $input) { __typename ... on MutationError { message } } }`;
const CONSULTAR = `query($input: PostInput!) { post(input: $input) { id status sentAt externalLink error { message } } }`;

function entrada(canalId: string, post: { video_url: string; capa_url: string; legenda: string }, extra: Record<string, unknown>) {
  return {
    channelId: canalId,
    text: textoTiktok(post.legenda),
    schedulingType: "automatic",
    assets: [{ video: { url: post.video_url, thumbnailUrl: post.capa_url } }],
    metadata: { tiktok: { isAiGenerated: MARCAR_COMO_IA } },
    source: "ativo-supabase",
    ...extra,
  };
}

async function atualizar(id: string, campos: Record<string, unknown>) {
  await sb.from("pub_destinos").update({ ...campos, atualizado_em: new Date().toISOString() }).eq("id", id);
}

// ---------------------------------------------------------------- ações
async function validar() {
  const c = await canal();
  const r = await gql(`query($o: OrganizationId!) { account { organizations { id name channelCount limits { channels scheduledPosts } } }
    channels(input: {organizationId: $o}) { id name service isDisconnected isLocked isQueuePaused timezone } }`, { o: c.organizacao_id });
  const tiktok = r.data.channels.find((x: { id: string }) => x.id === c.canal_id);
  return json({ ok: !!tiktok && !tiktok.isDisconnected, canal: tiktok ?? null, organizacoes: r.data.account.organizations, cota: r.cota, publicacao_automatica: c.ativo });
}

async function previa(corpo: { post_id: string }) {
  const post = await postDaFila(corpo.post_id);
  return json({ ok: true, post_id: post.id, video: post.caminho_video, titulo_referencia: await tituloDoPost(post.caminho_video, post.legenda), texto: textoTiktok(post.legenda), nada_foi_enviado: true });
}

async function teste(corpo: { post_id: string }) {
  const c = await canal();
  const post = await postDaFila(corpo.post_id);
  const { data: d, error } = await sb.from("pub_destinos")
    .insert({ post_id: post.id, destino: "tiktok", modo: "teste", status: "enviando", descricao: textoTiktok(post.legenda), privacidade: "rascunho", agendado_para: post.agendado_para })
    .select("id").single();
  if (error || !d) throw new Error(`não foi possível registrar o teste: ${error?.message}`);
  const r = await gql(CRIAR, { input: entrada(c.canal_id, post, { mode: "addToQueue", saveToDraft: true, needsApproval: false }) });
  const res = r.data.createPost;
  if (res.__typename !== "PostActionSuccess") {
    await atualizar(d.id, { status: "erro", erro: `${res.__typename}: ${res.message ?? ""}`.slice(0, 1000) });
    return json({ ok: false, erro: `${res.__typename}: ${res.message ?? ""}`, cota: r.cota }, 502);
  }
  const p = res.post;
  if (p.status !== "draft") {
    // trava de segurança: só aceitamos rascunho no teste
    await gql(APAGAR, { input: { id: p.id } });
    await atualizar(d.id, { status: "cancelado", externo_id: p.id, erro: `Buffer devolveu status ${p.status}; post apagado por segurança` });
    return json({ ok: false, erro: `Buffer criou com status ${p.status} (não rascunho) — apagado por segurança` }, 502);
  }
  await atualizar(d.id, { status: "rascunho", externo_id: p.id });
  return json({ ok: true, destino_id: d.id, buffer_post_id: p.id, status: p.status, cota: r.cota, nada_foi_publicado: true });
}

async function apagarTeste(corpo: { destino_id: string }) {
  const { data: d } = await sb.from("pub_destinos").select("id, externo_id, modo, status").eq("id", corpo.destino_id).eq("destino", "tiktok").single();
  if (!d?.externo_id || d.modo !== "teste") return json({ ok: false, erro: "só apaga rascunhos de teste" }, 400);
  const r = await gql(APAGAR, { input: { id: d.externo_id } });
  await atualizar(d.id, { status: "cancelado" });
  return json({ ok: true, resultado: r.data.deletePost.__typename, cota: r.cota });
}

async function status(corpo: { destino_id: string }) {
  const { data: d } = await sb.from("pub_destinos").select("id, externo_id").eq("id", corpo.destino_id).eq("destino", "tiktok").single();
  if (!d?.externo_id) return json({ ok: false, erro: "destino sem post no Buffer" }, 404);
  const r = await gql(CONSULTAR, { input: { id: d.externo_id } });
  return json({ ok: true, post: r.data.post, cota: r.cota });
}

/** Produção: mantém até LIMITE_AGENDADOS posts agendados no Buffer (customScheduled no horário da fila). */
async function ciclo() {
  const c = await canal();
  if (c.ativo !== true) return json({ ok: true, desativado: true, motivo: "buffer_canais.ativo = false (publicação automática desligada)" });
  const novos = (await sb.rpc("pub_sincronizar", { p_destino: "tiktok", p_horizonte: "5 days" })).data ?? 0;
  const agora = new Date();
  // confirma 1 post que já passou do horário (economia de cota)
  const { data: vencido } = await sb.from("pub_destinos").select("id, externo_id").eq("destino", "tiktok").eq("modo", "producao")
    .eq("status", "agendado").lt("agendado_para", new Date(agora.getTime() - 30 * 60_000).toISOString()).order("agendado_para").limit(1);
  if (vencido?.[0]?.externo_id) {
    const r = await gql(CONSULTAR, { input: { id: vencido[0].externo_id } });
    const p = r.data.post;
    if (p?.status === "sent") await atualizar(vencido[0].id, { status: "publicado", url: p.externalLink ?? null, publicado_em: p.sentAt ?? agora.toISOString() });
    if (p?.status === "error") await atualizar(vencido[0].id, { status: "erro", erro: p.error?.message ?? "erro no Buffer" });
  }
  const { count } = await sb.from("pub_destinos").select("id", { count: "exact", head: true })
    .eq("destino", "tiktok").eq("modo", "producao").eq("status", "agendado").gt("agendado_para", agora.toISOString());
  const vagas = Math.max(0, LIMITE_AGENDADOS - (count ?? 0));
  const { data: fila } = await sb.from("pub_destinos").select("id, post_id, agendado_para, tentativas").eq("destino", "tiktok").eq("modo", "producao")
    .eq("status", "pendente").gt("agendado_para", new Date(agora.getTime() + 20 * 60_000).toISOString()).order("agendado_para").limit(Math.min(vagas, 2));
  const enviados: string[] = [];
  for (const item of fila ?? []) {
    const post = await postDaFila(item.post_id);
    if (post.status === "cancelado" || post.status === "erro") { await atualizar(item.id, { status: "cancelado", erro: `post do Instagram está ${post.status}` }); continue; }
    const r = await gql(CRIAR, { input: entrada(c.canal_id, post, { mode: "customScheduled", dueAt: new Date(item.agendado_para).toISOString(), saveToDraft: false, needsApproval: false }) });
    const res = r.data.createPost;
    if (res.__typename === "PostActionSuccess") {
      await atualizar(item.id, { status: "agendado", externo_id: res.post.id, descricao: textoTiktok(post.legenda), erro: null });
      enviados.push(res.post.id);
    } else {
      await atualizar(item.id, { status: "erro", erro: `${res.__typename}: ${res.message ?? ""}`.slice(0, 1000), tentativas: item.tentativas + 1 });
    }
  }
  return json({ ok: true, novos, vagas, agendados_agora: enviados });
}

Deno.serve(async (req) => {
  const segredo = req.headers.get("x-cron-secret") ?? "";
  const { data: valido } = await sb.rpc("ig_validar_segredo", { p_segredo: segredo });
  if (valido !== true) return json({ erro: "não autorizado" }, 401);
  const corpo = await req.json().catch(() => ({}));
  try {
    if (corpo.acao === "validar") return await validar();
    if (corpo.acao === "previa") return await previa(corpo);
    if (corpo.acao === "teste") return await teste(corpo);
    if (corpo.acao === "apagar_teste") return await apagarTeste(corpo);
    if (corpo.acao === "status") return await status(corpo);
    if (corpo.acao === "ciclo") return await ciclo();
    return json({ ok: false, erro: "ação desconhecida: validar | previa | teste | apagar_teste | status | ciclo" }, 400);
  } catch (e) {
    console.log(`buffer-tiktok: ${(e as Error).message}`);
    return json({ ok: false, erro: (e as Error).message }, 500);
  }
});
