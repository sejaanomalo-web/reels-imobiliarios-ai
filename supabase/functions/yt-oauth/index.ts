// yt-oauth: conecta o canal do YouTube da ATIVO (OAuth 2.0 do Google, aplicativo da Web, com PKCE).
// NÃO publica nada. Guarda o refresh token cifrado no Vault (RPC yt_salvar_conexao) e mostra o canal conectado.
//
// Fluxo:
//   1. No SQL Editor: select public.yt_novo_link_conexao();   → link de uso único (15 min)
//   2. Abrir o link → GET /functions/v1/yt-oauth/iniciar?state=…  → redireciona para o consentimento do Google
//   3. Google → GET /functions/v1/yt-oauth/callback?code=…&state=…  (URI cadastrada no Google Cloud)
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
const ESCOPOS = [
  "https://www.googleapis.com/auth/youtube.upload", // enviar vídeos (Shorts)
  "https://www.googleapis.com/auth/youtube.readonly", // identificar o canal conectado e conferir uploads
];

const pagina = (titulo: string, corpo: string, status = 200) =>
  new Response(
    `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${titulo}</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#07080A;color:#F4F5F7;font-family:system-ui,sans-serif}
main{max-width:560px;padding:32px}h1{font-size:24px;margin:0 0 12px}p{color:#9198A3;line-height:1.5}b{color:#F4F5F7}.ok{color:#02FB3F}.erro{color:#FF6B5E}</style></head>
<body><main><h1>${titulo}</h1>${corpo}</main></body></html>`,
    { status, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } },
  );

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

const b64url = (buf: ArrayBuffer) =>
  btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

async function iniciar(url: URL) {
  const clientId = Deno.env.get("YOUTUBE_CLIENT_ID");
  if (!clientId) return pagina("Configuração pendente", `<p class="erro">O secret <b>YOUTUBE_CLIENT_ID</b> ainda não foi cadastrado no Supabase.</p>`, 500);
  const state = url.searchParams.get("state") ?? "";
  const { data, error } = await sb
    .from("yt_oauth_estados")
    .select("code_verifier")
    .eq("state", state)
    .is("usado_em", null)
    .gt("expira_em", new Date().toISOString())
    .maybeSingle();
  if (error || !data) return pagina("Link inválido ou expirado", `<p class="erro">Gere um novo link com <b>select public.yt_novo_link_conexao();</b> e abra em até 15 minutos.</p>`, 400);
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
  if (erroGoogle) return pagina("Conexão não autorizada", `<p class="erro">O Google respondeu: <b>${esc(erroGoogle)}</b>. Nada foi salvo.</p>`, 400);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  if (!code || !state) return pagina("Callback incompleto", `<p class="erro">Faltam os parâmetros do Google. Comece pelo link gerado no Supabase.</p>`, 400);

  // consome o state (uso único) de forma atômica
  const { data: est, error: errEst } = await sb
    .from("yt_oauth_estados")
    .update({ usado_em: new Date().toISOString() })
    .eq("state", state)
    .is("usado_em", null)
    .gt("expira_em", new Date().toISOString())
    .select("code_verifier, perfil")
    .maybeSingle();
  if (errEst || !est) return pagina("Link inválido ou expirado", `<p class="erro">Este retorno não corresponde a um link válido. Gere outro e tente de novo.</p>`, 400);

  const clientId = Deno.env.get("YOUTUBE_CLIENT_ID");
  const clientSecret = Deno.env.get("YOUTUBE_CLIENT_SECRET");
  if (!clientId || !clientSecret) return pagina("Configuração pendente", `<p class="erro">Cadastre <b>YOUTUBE_CLIENT_ID</b> e <b>YOUTUBE_CLIENT_SECRET</b> nos secrets do Supabase.</p>`, 500);

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
    return pagina("Falha ao trocar o código", `<p class="erro">Google: <b>${esc(String(tok.error ?? tokRes.status))}</b> ${esc(String(tok.error_description ?? ""))}</p>`, 502);
  }
  if (!tok.refresh_token) {
    return pagina("Sem refresh token", `<p class="erro">O Google não devolveu o refresh token. Remova o acesso do app em <b>myaccount.google.com/permissions</b> e gere um novo link.</p>`, 400);
  }

  const chRes = await fetch("https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true", {
    headers: { Authorization: `Bearer ${tok.access_token}` },
  });
  const ch = await chRes.json().catch(() => ({}));
  const canal = ch.items?.[0];
  if (!chRes.ok || !canal) {
    console.log(`yt-oauth: channels.list falhou (HTTP ${chRes.status}): ${ch.error?.message ?? "sem canal"}`);
    return pagina("Canal não encontrado", `<p class="erro">A conta escolhida não tem canal do YouTube (ou o acesso de leitura foi negado). Gere um novo link e escolha a conta do canal da ATIVO.</p>`, 400);
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
    return pagina("Falha ao salvar", `<p class="erro">A autorização funcionou, mas não foi possível salvar. Nada foi publicado.</p>`, 500);
  }
  console.log(`yt-oauth: canal ${canal.id} conectado ao perfil ${est.perfil}`);
  return pagina(
    "Canal conectado à ATIVO",
    `<p class="ok"><b>${esc(canal.snippet?.title ?? canal.id)}</b> foi conectado.</p>
<p>Escopos: envio de vídeos e leitura do canal. O token ficou cifrado no Supabase.</p>
<p><b>Publicação automática: DESLIGADA.</b> Nada será enviado até ser ativado.</p><p>Pode fechar esta aba.</p>`,
  );
}

Deno.serve(async (req) => {
  if (req.method !== "GET") return new Response("Método não permitido", { status: 405 });
  const url = new URL(req.url);
  try {
    if (url.pathname.endsWith("/iniciar")) return await iniciar(url);
    if (url.pathname.endsWith("/callback")) return await callback(url);
    return pagina("Não encontrado", `<p>Use o link gerado por <b>select public.yt_novo_link_conexao();</b></p>`, 404);
  } catch (e) {
    console.log(`yt-oauth: erro inesperado: ${(e as Error).message}`);
    return pagina("Erro inesperado", `<p class="erro">Nada foi salvo nem publicado. Tente gerar um novo link.</p>`, 500);
  }
});
