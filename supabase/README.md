# Supabase da ATIVO — código versionado

Projeto: `cawwccbuejmvfemgdhvl` (`https://cawwccbuejmvfemgdhvl.supabase.co`). Nenhum segredo fica neste repositório (ele é público): tokens e chaves vivem nos **secrets das Edge Functions** e no **Vault** do Supabase.

## YouTube Shorts — conexão do canal (`functions/yt-oauth`, `migrations/20261122_yt_oauth.sql`)

Só **conecta** o canal. Não publica. Desde a v2 (22/11/2026), o resultado aparece em `https://www.sejaativo.com.br/publicador/conexao`, porque o Supabase não serve HTML no domínio `supabase.co`: ele reescreve para `text/plain`, e só um domínio personalizado pago libera.

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

## YouTube Shorts e TikTok — publicação integrada à fila atual (`yt-publicador`, `buffer-tiktok`, `migrations/20261122_pub_destinos.sql`)

**A fila continua sendo `ig_posts`** (uma pasta em `PUBLICACAO/` = um post). Nada do Instagram foi alterado. O estado de cada post em cada destino fica em `pub_destinos` (`destino` youtube|tiktok, `modo` teste|producao). `pub_sincronizar()` cria as linhas pendentes a partir dos posts agendados.

| | YouTube (`yt-publicador`) | TikTok (`buffer-tiktok`) |
|---|---|---|
| Canal | "Ativo \| Para Corretores de Imóveis" (`yt_canais`) | `@ativo.br` no Buffer (`buffer_canais`) |
| Credencial | refresh token no Vault + secrets `YOUTUBE_CLIENT_ID`/`YOUTUBE_CLIENT_SECRET` | secret `BUFFER_API_KEY` |
| Trava | `yt_canais.ativo = false` | `buffer_canais.ativo = false` |
| Teste | `teste`: envia 1 post como **privado** (public é recusado) | `teste`: cria **rascunho** no Buffer (nada vai ao TikTok); se não vier `draft`, apaga na hora |
| Sem efeito externo | `verificar`, `previa`, `status` | `validar`, `previa`, `status` |
| Produção | `ciclo`: envia privado com `publishAt` = horário da fila (o YouTube publica sozinho) | `ciclo`: agenda no Buffer (`customScheduled`) até 8 posts à frente |

**Texto:**
- a CTA do Instagram ("Comente SISTEMA…") é trocada por `CTA_FORA_DO_INSTAGRAM` (`textos.ts`, cópia idêntica nas duas funções);
- o título do YouTube vem do `title` do `episode.json` do episódio;
- o TikTok é marcado como conteúdo de IA (`MARCAR_COMO_IA`), por causa da voz sintética.

**Chamada** (no SQL Editor; o segredo é lido do Vault e nunca aparece):
```sql
select net.http_post(
  url := 'https://cawwccbuejmvfemgdhvl.supabase.co/functions/v1/<yt-publicador|buffer-tiktok>',
  body := '{"acao":"previa","post_id":"<id do ig_posts>"}'::jsonb,
  headers := jsonb_build_object('Content-Type','application/json',
             'x-cron-secret',(select decrypted_secret from vault.decrypted_secrets where name='ig_cron_secret')),
  timeout_milliseconds := 140000);
-- resposta: select status_code, content from net._http_response where id = <id devolvido>;
```

**Primeiros testes (só com aprovação do cliente):**
1. YouTube: `{"acao":"teste","post_id":"<id>","privacidade":"private"}`, depois `{"acao":"status","destino_id":"<id devolvido>"}`.
2. TikTok: `{"acao":"teste","post_id":"<id>"}` (rascunho), conferir no painel do Buffer e, se quiser, `{"acao":"apagar_teste","destino_id":"<id>"}`.

**Ativar no futuro (NÃO executado; só com aprovação do cliente):**
```sql
update public.yt_canais set ativo = true where perfil = 'ativo';
select cron.schedule('yt-publicador', '*/10 * * * *', $$ select net.http_post(url := 'https://cawwccbuejmvfemgdhvl.supabase.co/functions/v1/yt-publicador', body := '{"acao":"ciclo"}'::jsonb, headers := jsonb_build_object('Content-Type','application/json','x-cron-secret',(select decrypted_secret from vault.decrypted_secrets where name='ig_cron_secret' limit 1)), timeout_milliseconds := 140000) $$);
update public.buffer_canais set ativo = true where perfil = 'ativo';
select cron.schedule('buffer-tiktok', '17 */6 * * *', $$ select net.http_post(url := 'https://cawwccbuejmvfemgdhvl.supabase.co/functions/v1/buffer-tiktok', body := '{"acao":"ciclo"}'::jsonb, headers := jsonb_build_object('Content-Type','application/json','x-cron-secret',(select decrypted_secret from vault.decrypted_secrets where name='ig_cron_secret' limit 1)), timeout_milliseconds := 140000) $$);
```

**Limites gratuitos (medidos em 22/11/2026):**
- **Buffer Free:** 3 canais e 10 posts agendados por canal (`organization.limits`); 1.000 requisições a cada 30 dias (headers `x-ratelimit-*`). O `ciclo` a cada 6 h gasta no máximo ~3 requisições por rodada.
- **YouTube Data API:** cota padrão de 10.000 unidades/dia. O custo do `videos.insert` diverge na documentação (≈100 ou 1.600 unidades); confira em Google Cloud → APIs → YouTube Data API v3 → Cotas. Com 2–3 envios por dia, cabe nos dois casos.

## Outras funções (não versionadas aqui ainda)

`ig-publicador` (fila do Instagram, v3 de 22/11/2026) e `sentinela`.
