# Supabase da ATIVO — código versionado

Projeto: `cawwccbuejmvfemgdhvl` (`https://cawwccbuejmvfemgdhvl.supabase.co`). Nenhum segredo fica neste repositório (ele é público): tokens e chaves vivem nos **secrets das Edge Functions** e no **Vault** do Supabase.

## YouTube Shorts — conexão do canal (`functions/yt-oauth`, `migrations/20261122_yt_oauth.sql`)

Só **conecta** o canal. Não publica: não há cron nem publicador, e `yt_canais.ativo` nasce `false`.

| Item | Valor |
|---|---|
| URI de redirecionamento (Google Cloud → Cliente OAuth "Aplicativo da Web") | `https://cawwccbuejmvfemgdhvl.supabase.co/functions/v1/yt-oauth/callback` |
| Origens JavaScript autorizadas | deixar em branco (o fluxo é todo no servidor) |
| Secrets da Edge Function | `YOUTUBE_CLIENT_ID`, `YOUTUBE_CLIENT_SECRET` |
| Escopos pedidos | `youtube.upload` (enviar vídeos) e `youtube.readonly` (identificar o canal) |
| Onde fica o refresh token | Vault (`yt_refresh_ativo_…`), referenciado por `yt_canais.refresh_token_id` |

**Conectar o canal:**
1. No SQL Editor, rode `select public.yt_novo_link_conexao();`. Isso gera um link de uso único que vale 15 minutos.
2. Abra o link logado na conta Google dona do canal da ATIVO. Se for uma conta de marca, escolha o canal na tela de contas.
3. Autorize. A página final mostra o nome do canal conectado.

Segurança: `state` de uso único + PKCE (S256); tabelas `yt_*` com RLS e sem acesso público; funções `SECURITY DEFINER` só para `service_role`; `verify_jwt = false` porque o Google redireciona o navegador sem JWT.

**Atenção:** com a tela de consentimento do Google em status "Teste", o refresh token vence em 7 dias. Publique o app ("Em produção") antes de conectar o canal definitivo.

**Desconectar o canal:** `select public.yt_desconectar('ativo');`. Exclui o refresh token do Vault, o registro do canal e os códigos de autorização (migração `20261122_yt_desconectar.sql`). É o que garante a promessa da Política de Privacidade.

**Páginas públicas do app** (exigidas pela tela de consentimento do Google; ficam no repositório `sejaanomalo-web/LP-ATIVO`, publicado em sejaativo.com.br):

| Campo do Google (Branding) | Endereço |
|---|---|
| Application home page | `https://www.sejaativo.com.br/publicador` |
| Application privacy policy link | `https://www.sejaativo.com.br/publicador/privacidade` |
| Application terms of service link | `https://www.sejaativo.com.br/publicador/termos` |
| Authorized domains | `sejaativo.com.br` |

Se as práticas descritas mudarem (escopos, armazenamento, retenção), atualize as páginas no mesmo commit da mudança.

## Outras funções (não versionadas aqui ainda)

`ig-publicador` (fila do Instagram, v3 de 22/11/2026) e `sentinela`.
