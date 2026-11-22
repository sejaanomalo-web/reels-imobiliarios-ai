// yt-oauth: conecta o canal do YouTube da ATIVO (OAuth 2.0 do Google, aplicativo da Web, com PKCE).
// NÃO publica nada. Guarda o refresh token cifrado no Vault (RPC yt_salvar_conexao).
//
// Fluxo:
//   1. No SQL Editor: select public.yt_novo_link_conexao();   → link de uso único (15 min)
//   2. Abrir o link → GET /functions/v1/yt-oauth/iniciar?state=…  → redireciona para o consentimento do Google
//   3. Google → GET /functions/v1/yt-oauth/callback?code=…&state=…  (URI cadastrada no Google Cloud)
//   4. A função grava a conexão e REDIRECIONA para https://www.sejaativo.com.br/publicador/conexao?resultado=…
//
// v2 (22/11/2026): o Supabase reescreve respostas text/html para text/plain (com CSP sandbox) no domínio compartilhado
// supabase.co — é uma trava anti-phishing da plataforma; só um domínio personalizado (pago) libera HTML. Por isso a
// página de resultado agora fica no site da ATIVO. Pela URL vão só o resultado, o nome público do canal e um código de
// motivo — nunca token ou código de autorização.
//
// Secrets (Edge Functions → Secrets): YOUTUBE_CLIENT_ID e YOUTUBE_CLIENT_SECRET.
// Deploy com verify_jwt = false: o Google redireciona o navegador sem JWT; a segurança vem do state de uso único + PKCE.

import { createClient } from "npm:@supabase/supabase-js@2";

const sb = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  { auth: { persistSession: false } },
);

// Precisa ser IDÊNTICA à URI cadastrada em "URIs de redirecionamento autorizados" no Google Cloud.
const REDIRECT_URI = "https://cawwccbuejmvfemgdhvl.supabase.co/functions/v1/yt-oauth/callback";
const PAGINA_RESULTADO = "https://www.sejaativo.com.br/publicador/conexao";
const ESCOPOS = [
  "https://www.googleapis.com/auth/youtube.upload", // enviar vídeos (Shorts)
  "https://www.googleapis.com/auth/youtube.readonly", // identificar o canal conectado e conferir uploads
];

/** Redireciona o navegador para a página de resultado no site (que renderiza o HTML). */
const resultado = (params: Record<string, string>) => {
  const u = new URL(PAGINA_RESULTADO);
  for (const [k, v] of Object.entries(params)) u.searchParams.set(k, v.slice(0, 120));
  return new Response(null, { status: 303, headers: { Location: u.toString(), "Cache-Control": "no-store" } });
};
const erro = (motivo: string, detalhe = "") => resultado(detalhe ? { resultado: "erro", motivo, detalhe } : { resultado: "erro", motivo });

const b64url = (buf: ArrayBuffer) =>
  btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

async function iniciar(url: URL) {
  const clientId = Deno.env.get("YOUTUBE_CLIENT_ID");
  if (!clientId) return erro("configuracao");
  const state = url.searchParams.get("state") ?? "";
  const { data, error } = await sb
    .from("yt_oauth_estados")
    .select("code_verifier")
    .eq("state", state)
    .is("usado_em", null)
    .gt("expira_em", new Date().toISOString())
    .maybeSingle();
  if (error || !data) return erro("link_invalido");
  const challenge = b64url(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(data.code_verifier)));
  const google = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  google.search = new URLSearchParams({
    client_id: clientId,
    redirect_uri: REDIRECT_URI,
    response_type: "code",
    scope: ESCOPOS.join(" "),
    access_type: "offline", // devolve refresh token
    prompt: "consent select_account", // garante refresh token novo e a escolha do canal/conta
    include_granted_scopes: "true",
    state,
    code_challenge: challenge,
    code_challenge_method: "S256",
  }).toString();
  return Response.redirect(google.toString(), 302);
}

async function callback(url: URL) {
  const erroGoogle = url.searchParams.get("error");
  if (erroGoogle) return erro("google", erroGoogle);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  if (!code || !state) return erro("callback_incompleto");

  // consome o state (uso único) de forma atômica
  const { data: est, error: errEst } = await sb
    .from("yt_oauth_estados")
    .update({ usado_em: new Date().toISOString() })
    .eq("state", state)
    .is("usado_em", null)
    .gt("expira_em", new Date().toISOString())
    .select("code_verifier, perfil")
    .maybeSingle();
  if (errEst || !est) return erro("link_invalido");

  const clientId = Deno.env.get("YOUTUBE_CLIENT_ID");
  const clientSecret = Deno.env.get("YOUTUBE_CLIENT_SECRET");
  if (!clientId || !clientSecret) return erro("configuracao");

  const tokRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
      code_verifier: est.code_verifier,
    }),
  });
  const tok = await tokRes.json().catch(() => ({}));
  if (!tokRes.ok || !tok.access_token) {
    console.log(`yt-oauth: troca do code falhou (HTTP ${tokRes.status}): ${tok.error ?? ""} ${tok.error_description ?? ""}`);
    return erro("troca_codigo", String(tok.error ?? tokRes.status));
  }
  if (!tok.refresh_token) return erro("sem_refresh_token");

  const chRes = await fetch("https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true", {
    headers: { Authorization: `Bearer ${tok.access_token}` },
  });
  const ch = await chRes.json().catch(() => ({}));
  const canal = ch.items?.[0];
  if (!chRes.ok || !canal) {
    console.log(`yt-oauth: channels.list falhou (HTTP ${chRes.status}): ${ch.error?.message ?? "sem canal"}`);
    return erro("sem_canal");
  }

  const { error: errSalvar } = await sb.rpc("yt_salvar_conexao", {
    p_perfil: est.perfil,
    p_canal_id: canal.id,
    p_canal_titulo: canal.snippet?.title ?? "",
    p_escopos: String(tok.scope ?? ESCOPOS.join(" ")),
    p_refresh_token: tok.refresh_token,
  });
  if (errSalvar) {
    console.log(`yt-oauth: falha ao salvar a conexão: ${errSalvar.message}`);
    return erro("salvar");
  }
  console.log(`yt-oauth: canal ${canal.id} conectado ao perfil ${est.perfil}`);
  return resultado({ resultado: "ok", canal: String(canal.snippet?.title ?? canal.id) });
}

Deno.serve(async (req) => {
  if (req.method !== "GET") return new Response("Método não permitido", { status: 405 });
  const url = new URL(req.url);
  try {
    if (url.pathname.endsWith("/iniciar")) return await iniciar(url);
    if (url.pathname.endsWith("/callback")) return await callback(url);
    return new Response("Não encontrado. Gere o link com: select public.yt_novo_link_conexao();", { status: 404 });
  } catch (e) {
    console.log(`yt-oauth: erro inesperado: ${(e as Error).message}`);
    return erro("inesperado");
  }
});
