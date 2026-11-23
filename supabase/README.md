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
| Trava | `yt_canais.ativo` (**true desde 23/11/2026**) | `buffer_canais.ativo` (**true desde 23/11/2026**) |
| Cron | `yt-publicador`, `*/10 * * * *` | `buffer-tiktok`, `17 */2 * * *` |
| Teste | `teste`: envia 1 post como **privado** (public é recusado) | `teste`: cria **rascunho** no Buffer (nada vai ao TikTok); se não vier `draft`, apaga na hora |
| Sem efeito externo | `verificar`, `previa`, `status` | `validar`, `previa`, `status` |
| Publicação imediata | `publicar_agora` {post_id}: envia **público** já | `publicar_agora` {post_id}: `shareNow` no Buffer |
| Produção agendada | `ciclo`: envia 1 post por chamada, privado + `publishAt` (janela 15 min–6 h à frente); o YouTube publica sozinho | `ciclo`: agenda no Buffer (`customScheduled`) até 8 posts à frente, 2 por chamada |

`status` também grava o resultado em `pub_destinos` (YouTube: `publicado` quando público; TikTok: `publicado` + link quando o Buffer devolve `sent`). As duas ações `publicar_agora` respeitam o índice único de produção: o mesmo vídeo não vai 2× ao mesmo destino.

**Horários próprios (migração `20261123_pub_horarios.sql`):** YouTube e TikTok publicam **um vídeo por horário** nos 6 horários da ATIVO — **08h00, 10h00, 12h00, 15h00, 18h00 e 21h00 (Brasília)** — na ordem de `ig_posts.agendado_para`, mas **sem copiar o horário do Instagram**.
- `pub_proximo_horario(t)`: próximo desses horários depois de `t`.
- `pub_sincronizar(destino)`: post novo da fila do Instagram (status agendado) entra no **fim** da fila do destino, no próximo horário livre (`p_horizonte` não é mais usado).
- `pub_reprogramar_atrasados(destino, folga)`: pendente que perdeu o horário sem envio (ex.: cota do dia esgotada) vai para o fim da fila; nenhum vídeo é pulado.
- Erros de cota do YouTube (`quotaExceeded`, `uploadLimitExceeded`…) não gastam tentativa: o post volta a `pendente`.
- O Buffer **recusa `thumbnailUrl`** em vídeo (as redes não aceitam capa personalizada): a capa do TikTok é o quadro automático.

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

**Ver a programação:** no Table Editor, abra a visão `pub_programacao` — Instagram, YouTube e TikTok juntos (horário em Brasília, plataforma, vídeo, situação, link; só leitura). Ou por SQL:
```sql
select d.destino, d.status, regexp_replace(p.caminho_video, '.*/', '') as video,
       d.agendado_para at time zone 'America/Sao_Paulo' as horario_brt, d.url, d.erro
  from pub_destinos d join ig_posts p on p.id = d.post_id
 where d.modo = 'producao' order by d.agendado_para, d.destino;
```

**Pausar** (sem apagar nada): `update public.yt_canais set ativo = false where perfil = 'ativo';` e/ou `update public.buffer_canais set ativo = false where perfil = 'ativo';`. O que já está agendado no YouTube (privado + `publishAt`) e no Buffer continua agendado lá.

**Ativação (executada em 23/11/2026, com aprovação do cliente):**
```sql
update public.yt_canais set ativo = true where perfil = 'ativo';
select cron.schedule('yt-publicador', '*/10 * * * *', $$ select net.http_post(url := 'https://cawwccbuejmvfemgdhvl.supabase.co/functions/v1/yt-publicador', body := '{"acao":"ciclo"}'::jsonb, headers := jsonb_build_object('Content-Type','application/json','x-cron-secret',(select decrypted_secret from vault.decrypted_secrets where name='ig_cron_secret' limit 1)), timeout_milliseconds := 140000) $$);
update public.buffer_canais set ativo = true where perfil = 'ativo';
select cron.schedule('buffer-tiktok', '17 */2 * * *', $$ select net.http_post(url := 'https://cawwccbuejmvfemgdhvl.supabase.co/functions/v1/buffer-tiktok', body := '{"acao":"ciclo"}'::jsonb, headers := jsonb_build_object('Content-Type','application/json','x-cron-secret',(select decrypted_secret from vault.decrypted_secrets where name='ig_cron_secret' limit 1)), timeout_milliseconds := 140000) $$);
```

**Limites gratuitos:**
- **Buffer Free:** 3 canais e 10 posts agendados por canal (`organization.limits`); 1.000 requisições a cada 30 dias (headers `x-ratelimit-*`; 982 restantes em 23/11 08h). Com 6 posts/dia, o gasto fica em ~12–15 requisições/dia.
- **YouTube Data API:** cota padrão de 10.000 unidades/dia (zera à meia-noite do Pacífico, ~05h BRT). Em 23/11 foram feitos 8 envios no mesmo dia sem erro de cota, logo o custo real do `videos.insert` neste projeto é **menor que 1.600** (1.600 × 8 = 12.800 estouraria). O valor exato não foi confirmado na documentação.
- **Limite de envios do canal (medido em 23/11/2026):** o YouTube recusou o 11º envio do dia com `uploadLimitExceeded` ("The user has exceeded the number of videos they may upload"). É um teto do canal, separado da cota da API; por isso a fila inteira não pode ser enviada de uma vez. O cron mantém 1 envio por vez, até 6 h antes de cada horário (6 por dia cabem). Envio em lote manual: `{"acao":"ciclo","janela_horas":240,"max_envios":3}` com o cron `yt-publicador` pausado (`cron.alter_job(..., active := false)`) para não enviar o mesmo vídeo 2×.
- **Refresh token do YouTube:** o app do Google está "Em produção" desde 23/11/2026 e o canal foi reconectado às 10h12 desse dia, então o token não vence mais em 7 dias. O app segue **não verificado** (aviso na tela de autorização; limite de 100 usuários, hoje 1). A página final da conexão (`sejaativo.com.br/publicador/conexao`) dá 404 até a branch `feat/publicador-paginas` do LP-ATIVO ir para o `main`; a conexão é salva mesmo assim.

## Outras funções (não versionadas aqui ainda)

`ig-publicador` (fila do Instagram, v3 de 22/11/2026) e `sentinela`.
