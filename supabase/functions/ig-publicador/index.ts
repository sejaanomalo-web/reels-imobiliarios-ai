// ig-publicador: publica os Reels da fila public.ig_posts no Instagram.
// Chamado pelo pg_cron a cada minuto, com o header x-cron-secret.
//
// Etapa 1 (até 20 min antes do horário): cria o container do Reel com upload resumable,
//          baixa o MP4 do GitHub e envia o binário direto para a Meta.
// Etapa 2 (no horário): se a Meta terminou de processar, publica.
//
// v3 (22/11/2026): 5 tentativas (antes 3) — com o intervalo de 5 min entre tentativas aplicado em
// ig_reservar_envio, cobre ~20 min de instabilidade da Meta; erro de upload agora registra o HTTP,
// o tipo (debug_info.type) e se a Meta considera a falha "retriable".
// v4 (23/11/2026): o modo teste aceita "legenda" (padrão "teste") para diagnosticar falhas que só aparecem
// com a legenda real do post. Produção inalterada.

import { createClient } from "npm:@supabase/supabase-js@2";

const sb = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  { auth: { persistSession: false } },
);

const MAX_TENTATIVAS = 5;
const LIMITE_ENVIO_POR_EXECUCAO = 2;
const MAX_MINUTOS_PROCESSANDO = 90;

type Perfil = {
  perfil: string;
  ig_user_id: string;
  access_token: string;
  api_host: string;
  api_versao: string;
};

type Post = {
  id: string;
  perfil: string;
  video_url: string;
  capa_url: string;
  legenda: string;
  agendado_para: string;
  status: string;
  container_id: string | null;
  tentativas: number;
  atualizado_em: string;
};

class ErroGraph extends Error {}

async function graph(
  p: Perfil,
  caminho: string,
  params: Record<string, string>,
  metodo: "GET" | "POST" = "POST",
): Promise<Record<string, any>> {
  const url = new URL(`https://${p.api_host}/${p.api_versao}/${caminho}`);
  let init: RequestInit;
  if (metodo === "GET") {
    for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
    url.searchParams.set("access_token", p.access_token);
    init = { method: "GET" };
  } else {
    init = { method: "POST", body: new URLSearchParams({ ...params, access_token: p.access_token }) };
  }
  const r = await fetch(url, init);
  const j = await r.json().catch(() => ({}));
  if (!r.ok || j.error) {
    const e = j.error ?? {};
    const sub = e.error_subcode ? ` subcode ${e.error_subcode}` : "";
    const detalhe = e.error_user_msg ? ` | ${e.error_user_msg}` : "";
    throw new ErroGraph(`Graph ${metodo} ${caminho}: ${e.message ?? `HTTP ${r.status}`}${sub}${detalhe}`);
  }
  return j;
}

async function enviarVideo(p: Perfil, containerId: string, videoUrl: string) {
  const origem = await fetch(videoUrl, { headers: { "accept-encoding": "identity" } });
  if (!origem.ok || !origem.body) {
    throw new Error(`Download do vídeo falhou (HTTP ${origem.status}): ${videoUrl}`);
  }
  const tamanho = origem.headers.get("content-length");
  if (!tamanho || Number(tamanho) <= 0) {
    throw new Error(`Origem do vídeo não informou o tamanho: ${videoUrl}`);
  }
  const r = await fetch(`https://rupload.facebook.com/ig-api-upload/${p.api_versao}/${containerId}`, {
    method: "POST",
    headers: {
      Authorization: `OAuth ${p.access_token}`,
      offset: "0",
      file_size: tamanho,
    },
    body: origem.body,
    // necessário para enviar o corpo em stream sem carregar o vídeo inteiro na memória
    duplex: "half",
  } as RequestInit);
  const texto = await r.text().catch(() => "");
  let j: Record<string, any> = {};
  try {
    j = JSON.parse(texto);
  } catch {
    // resposta não-JSON: fica registrada no trecho bruto abaixo
  }
  if (!r.ok || j.success === false || j.error) {
    const d = j.debug_info ?? {};
    const msg = d.message ?? j.error?.message ?? `HTTP ${r.status}`;
    const tipo = d.type ? ` | tipo ${d.type}` : "";
    const ret = d.retriable !== undefined ? ` | retriable ${d.retriable}` : "";
    throw new Error(
      `Upload para a Meta falhou: ${msg} | HTTP ${r.status}${tipo}${ret} | ${tamanho} bytes | resposta: ${texto.slice(0, 300)}`,
    );
  }
}

async function atualizar(id: string, campos: Record<string, unknown>) {
  const { error } = await sb
    .from("ig_posts")
    .update({ ...campos, atualizado_em: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(`Falha ao atualizar post ${id}: ${error.message}`);
}

async function registrarFalha(post: Post, mensagem: string, manterContainer: boolean) {
  const tentativas = post.tentativas + 1;
  const desistir = tentativas >= MAX_TENTATIVAS;
  await atualizar(post.id, {
    status: desistir ? "erro" : manterContainer ? "processando" : "agendado",
    container_id: manterContainer && !desistir ? post.container_id : null,
    tentativas,
    erro: mensagem.slice(0, 1000),
  });
  return desistir ? "erro" : "nova tentativa";
}

async function prepararPost(post: Post, p: Perfil) {
  const c = await graph(p, `${p.ig_user_id}/media`, {
    media_type: "REELS",
    upload_type: "resumable",
    caption: post.legenda,
    cover_url: post.capa_url,
    share_to_feed: "true",
  });
  await enviarVideo(p, c.id, post.video_url);
  await atualizar(post.id, { status: "processando", container_id: c.id, erro: null });
}

async function finalizarPost(post: Post, p: Perfil): Promise<string> {
  const st = await graph(p, post.container_id!, { fields: "status_code,status" }, "GET");

  if (st.status_code === "ERROR" || st.status_code === "EXPIRED") {
    const r = await registrarFalha(post, `Container ${st.status_code}: ${st.status ?? ""}`, false);
    return `falha no processamento (${r})`;
  }

  if (st.status_code !== "FINISHED") {
    const minutos = (Date.now() - new Date(post.atualizado_em).getTime()) / 60000;
    if (minutos > MAX_MINUTOS_PROCESSANDO) {
      const r = await registrarFalha(post, `Processamento parado há ${Math.round(minutos)} min (${st.status_code})`, false);
      return `processamento travado (${r})`;
    }
    return `processando (${st.status_code})`;
  }

  if (new Date(post.agendado_para).getTime() > Date.now()) return "pronto, aguardando horário";

  const pub = await graph(p, `${p.ig_user_id}/media_publish`, { creation_id: post.container_id! });
  let permalink: string | null = null;
  try {
    permalink = (await graph(p, pub.id, { fields: "permalink" }, "GET")).permalink ?? null;
  } catch {
    // o post já foi publicado; o permalink é só informativo
  }
  await atualizar(post.id, {
    status: "publicado",
    media_id: pub.id,
    permalink,
    publicado_em: new Date().toISOString(),
    erro: null,
  });
  return `publicado ${permalink ?? pub.id}`;
}

// Modo teste: cria o container e envia o vídeo, mas NÃO publica.
// O container não publicado expira sozinho em 24h.
async function testar(corpo: { perfil?: string; video_url?: string; capa_url?: string; legenda?: string }) {
  const resposta = (dados: unknown, status = 200) =>
    new Response(JSON.stringify(dados), { status, headers: { "Content-Type": "application/json" } });
  const passos: string[] = [];
  try {
    const { data: p, error } = await sb
      .from("ig_perfis")
      .select("perfil, ig_user_id, access_token, api_host, api_versao")
      .eq("perfil", corpo.perfil ?? "")
      .single();
    if (error || !p?.access_token || !p?.ig_user_id) throw new Error(`Perfil ${corpo.perfil} sem token ou ig_user_id`);
    const perfil = p as Perfil;

    const conta = await graph(perfil, perfil.ig_user_id, { fields: "username" }, "GET");
    passos.push(`token ok, conta @${conta.username}`);

    const c = await graph(perfil, `${perfil.ig_user_id}/media`, {
      media_type: "REELS",
      upload_type: "resumable",
      caption: corpo.legenda ?? "teste",
      cover_url: corpo.capa_url!,
      share_to_feed: "true",
    });
    passos.push(`container criado ${c.id}`);

    await enviarVideo(perfil, c.id, corpo.video_url!);
    passos.push("vídeo enviado para a Meta");

    for (let i = 0; i < 24; i++) {
      const st = await graph(perfil, c.id, { fields: "status_code,status" }, "GET");
      if (st.status_code !== "IN_PROGRESS") {
        passos.push(`processamento: ${st.status_code} ${st.status ?? ""}`.trim());
        return resposta({ ok: st.status_code === "FINISHED", publicado: false, passos });
      }
      await new Promise((r) => setTimeout(r, 5000));
    }
    passos.push("processamento ainda em andamento após 2 min (normal para vídeos longos)");
    return resposta({ ok: true, publicado: false, passos });
  } catch (e) {
    passos.push(`ERRO: ${(e as Error).message}`);
    return resposta({ ok: false, publicado: false, passos }, 500);
  }
}

Deno.serve(async (req) => {
  const segredo = req.headers.get("x-cron-secret") ?? "";
  const { data: valido, error: erroSegredo } = await sb.rpc("ig_validar_segredo", { p_segredo: segredo });
  if (erroSegredo || valido !== true) {
    return new Response(JSON.stringify({ erro: "não autorizado" }), { status: 401 });
  }

  const corpo = await req.json().catch(() => ({}));
  if (corpo?.teste) return await testar(corpo);

  const log: string[] = [];

  const { data: perfisData, error: erroPerfis } = await sb
    .from("ig_perfis")
    .select("perfil, ig_user_id, access_token, api_host, api_versao")
    .eq("ativo", true)
    .not("access_token", "is", null)
    .not("ig_user_id", "is", null);
  if (erroPerfis) return new Response(JSON.stringify({ erro: erroPerfis.message }), { status: 500 });
  const perfis = new Map<string, Perfil>((perfisData ?? []).map((p) => [p.perfil, p as Perfil]));

  // Etapa 2 primeiro: publicar o que já está pronto não pode esperar uploads longos.
  const { data: processando, error: erroProc } = await sb
    .from("ig_posts")
    .select("*")
    .eq("status", "processando")
    .order("agendado_para")
    .limit(20);
  if (erroProc) return new Response(JSON.stringify({ erro: erroProc.message }), { status: 500 });

  for (const post of (processando ?? []) as Post[]) {
    const p = perfis.get(post.perfil);
    if (!p) continue;
    try {
      log.push(`${post.id}: ${await finalizarPost(post, p)}`);
    } catch (e) {
      const r = await registrarFalha(post, String((e as Error).message ?? e), true);
      log.push(`${post.id}: erro ao publicar (${r}): ${(e as Error).message}`);
    }
  }

  // Etapa 1: reservar e preparar os próximos posts.
  const { data: reservados, error: erroRes } = await sb.rpc("ig_reservar_envio", {
    p_limite: LIMITE_ENVIO_POR_EXECUCAO,
  });
  if (erroRes) return new Response(JSON.stringify({ erro: erroRes.message, log }), { status: 500 });

  for (const post of (reservados ?? []) as Post[]) {
    const p = perfis.get(post.perfil);
    if (!p) {
      log.push(`${post.id}: perfil ${post.perfil} sem token`);
      await atualizar(post.id, { status: "agendado" });
      continue;
    }
    try {
      await prepararPost(post, p);
      log.push(`${post.id}: container criado e vídeo enviado`);
    } catch (e) {
      const r = await registrarFalha(post, String((e as Error).message ?? e), false);
      log.push(`${post.id}: erro ao preparar (${r}): ${(e as Error).message}`);
    }
  }

  if (log.length) console.log(log.join("\n"));
  return new Response(JSON.stringify({ ok: true, log }), {
    headers: { "Content-Type": "application/json" },
  });
});
