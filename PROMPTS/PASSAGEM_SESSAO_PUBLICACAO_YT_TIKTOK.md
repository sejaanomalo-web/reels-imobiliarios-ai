# Passagem de sessão — publicar no YouTube Shorts e no TikTok (23/11/2026)

Cole o bloco abaixo numa sessão NOVA aberta só com o repositório `sejaanomalo-web/reels-imobiliarios-ai`, em modo **Auto**.

---

```
Responda sempre em português do Brasil. Leia antes: CLAUDE.md (inteiro), supabase/README.md, supabase/functions/yt-publicador/index.ts, supabase/functions/buffer-tiktok/index.ts, supabase/functions/*/textos.ts e supabase/migrations/20261122_pub_destinos.sql.

## O PEDIDO (autorização explícita do cliente, 23/11/2026)
1. Publicar AGORA, de forma PÚBLICA, 5 vídeos no YouTube Shorts (canal "Ativo | Para Corretores de Imóveis") e 5 vídeos no TikTok (@ativo.br, via Buffer).
2. Depois, programar TODOS os demais vídeos da fila, em sequência, nos 6 horários diários da ATIVO — 08h00, 10h00, 12h00, 15h00, 18h00 e 21h00 (horário de Brasília) — começando no próximo horário livre de hoje, um vídeo por horário, nas duas plataformas.
3. Ligar a publicação automática do YouTube e do TikTok (travas + cron) para que a programação aconteça sozinha. Seguir até finalizar e me entregar um relatório.
Esta mensagem É a aprovação de: publicação pública, ligar publicação automática e criar crons para yt-publicador e buffer-tiktok. Continua proibido sem nova aprovação: qualquer custo/plano pago, apagar dados ou posts agendados, mexer na pasta .github/, alterar a fila ou os horários do INSTAGRAM (ig_posts / ig-publicador) e colocar segredos no repositório (ele é público).

## ESTADO ATUAL (fim de 22–23/11/2026)
- Supabase: projeto cawwccbuejmvfemgdhvl (https://cawwccbuejmvfemgdhvl.supabase.co). Autorização permanente para SQL, migrações, deploy de Edge Functions e logs (ver CLAUDE.md).
- Fila única: tabela public.ig_posts (uma linha por pasta PUBLICACAO/AAAA/MM-mes/semana-DD-DD/DD-dia/HHhMM/ com o MP4). Campos usados: id, video_url (raw do GitHub), capa_url, legenda, caminho_video, agendado_para, status. São ~46 MP4 em PUBLICACAO/ (GTA6_01…11, NOV26_01…30, L60_01…05, CARTOON_01).
  - ATIVO_GTA6_01: status "erro" no Instagram (ProcessingFailedError repetido; suspeita de filtro de duplicidade da Meta). NÃO incluir no YouTube/TikTok sem perguntar.
  - ATIVO_GTA6_02: já publicado no Instagram em 22/11 22h (https://www.instagram.com/reel/DgEHTrAAfCB/).
  - ATIVO_GTA6_04: agendado no Instagram para 23/11 22h00. Conferir se publicou (ig_posts.status) e informar.
- Estado por destino: public.pub_destinos (post_id FK ig_posts; destino youtube|tiktok; modo teste|producao; status pendente|enviando|processando|agendado|rascunho|publicado|erro|cancelado; agendado_para; externo_id; url; tentativas; erro). Índice único (post_id, destino) quando modo='producao' — impede publicar o mesmo vídeo 2× no mesmo destino.
- pub_sincronizar(p_destino, p_horizonte) cria linhas 'pendente' COPIANDO ig_posts.agendado_para (horário do Instagram). Para usar os 6 horários próprios do YouTube/TikTok, inserir/atualizar as linhas de pub_destinos com o agendado_para calculado; as que já existem não são recriadas.
- YouTube: canal UCXq03MMjf0tDX5g0ggm7wsA, refresh token no Vault (RPC yt_refresh_token), secrets YOUTUBE_CLIENT_ID/YOUTUBE_CLIENT_SECRET. yt_canais.ativo = false. Função yt-publicador v1: ações verificar | previa | teste (só private/unlisted) | status | ciclo (envia 1 post por chamada como private + publishAt, janela 15 min–6 h à frente; MAX_TENTATIVAS 3; categoria 27). NÃO existe ação de publicação pública imediata — criar.
- TikTok: Buffer GraphQL (https://api.buffer.com, secret BUFFER_API_KEY), organização 6b02edec07e3daab80052c5a, canal 6b02eea28541f09ecb63d8e3 (@ativo.br), buffer_canais.ativo = false. Função buffer-tiktok v2: ações validar | previa | teste (rascunho) | apagar_teste | status | ciclo (customScheduled, até LIMITE_AGENDADOS=8, olha 5 dias à frente). NÃO existe ação de publicação imediata — criar (mode "shareNow", saveToDraft false, needsApproval false). isAiGenerated = true (voz sintética).
- Texto fora do Instagram (textos.ts, cópia idêntica nas 2 funções): a CTA "Comente SISTEMA" é trocada por "🔗 Sistema personalizado para corretores de imóveis: sejaativo.com.br"; título do YouTube vem do title do episode.json; YouTube ganha #shorts; TikTok até 2.200 caracteres.
- Chamada das funções (o segredo vem do Vault e nunca aparece):
  select net.http_post(url := 'https://cawwccbuejmvfemgdhvl.supabase.co/functions/v1/<funcao>', body := '{"acao":"..."}'::jsonb, headers := jsonb_build_object('Content-Type','application/json','x-cron-secret',(select decrypted_secret from vault.decrypted_secrets where name='ig_cron_secret')), timeout_milliseconds := 140000);
  -- resposta (aguarde alguns segundos): select status_code, content from net._http_response where id = <id>;
- Crons existentes que NÃO podem mudar: ig-publicador (Instagram) e lembrete-diario-6h-brt (ANÔMALO).
- Lembrete agendado na sessão antiga (22h10 BRT de 23/11) não chega aqui: confira o GTA6_04 você mesmo.

## COMO EXECUTAR
1. Diagnóstico: hora atual BRT, ig_posts (todos, por agendado_para), yt_canais, buffer_canais, pub_destinos, cron.job. Rodar yt-publicador {"acao":"verificar"} e buffer-tiktok {"acao":"validar"}.
2. Código (versionar em supabase/functions/, deploy com verify_jwt=false como as atuais):
   - yt-publicador: ação "publicar_agora" {post_id} → registra pub_destinos modo 'producao' (respeitando o índice único), envia com privacyStatus "public", sem publishAt; grava externo_id/url/status. Ação "agendar" opcional não é necessária: o ciclo já agenda via publishAt.
   - buffer-tiktok: ação "publicar_agora" {post_id} → createPost mode "shareNow", registra em pub_destinos modo 'producao'.
   - Manter "teste" como está. Não tocar no ig-publicador.
3. Escolha dos 5 de agora: os 5 primeiros da fila em ordem de ig_posts.agendado_para, pulando GTA6_01 e qualquer status erro/cancelado. Mesmos 5 nas duas plataformas. Publicar um por vez e conferir cada resultado (YouTube: ação status até uploadStatus=processed; TikTok: status do post no Buffer = sent + externalLink).
   ATENÇÃO YOUTUBE (verificar, não tenho certeza absoluta): a documentação do videos.insert diz que projetos de API não verificados criados depois de 28/07/2020 têm os vídeos enviados travados em privado até passar pela auditoria de conformidade da YouTube API. Depois do 1º envio público, confira privacyStatus. Se vier "private" travado, PARE o YouTube, não tente contornar, e me explique o caminho da auditoria (formulário "YouTube API Services – Audit and Quota Extension"). Siga com o TikTok normalmente.
4. Programação dos demais: calcular, em ordem de ig_posts.agendado_para, um vídeo por horário (08, 10, 12, 15, 18, 21 BRT) a partir do próximo horário livre de hoje, e gravar em pub_destinos (destino youtube e tiktok, modo producao, status pendente, agendado_para calculado). Mostrar a tabela da programação no relatório.
5. Ligar: update yt_canais set ativo=true; update buffer_canais set ativo=true; criar os 2 crons do supabase/README.md (yt-publicador a cada 10 min; buffer-tiktok — usar a cada 2 h em vez de 6 h para não perder horários próximos, ainda cabendo na cota do Buffer). Rodar 1 ciclo de cada manualmente e conferir.
6. Limites (respeitar, sem pagar nada):
   - YouTube Data API: 10.000 unidades/dia; videos.insert custa 100 ou 1.600 conforme a versão da doc — conferir. Se for 1.600, só ~6 envios/dia: os 5 de agora já consomem quase tudo; o ciclo envia 1 por vez dentro da janela de 6 h, então cabe nos 6 horários/dia. Erros quotaExceeded/uploadLimitExceeded → parar e reportar.
   - Buffer Free: 10 posts agendados por canal (o ciclo mantém 8), 1.000 requisições/30 dias (~997 restantes em 22/11). Publicações imediatas também contam.
7. Atualizar supabase/README.md (novas ações, crons ligados, programação), commit e push no main (git fetch + merge se rejeitado). Relatório final: o que foi publicado (links), o que ficou programado (tabela data/hora × vídeo × plataforma), crons criados, cota gasta, pendências.

## PENDÊNCIAS DO CLIENTE (só lembrar no relatório)
- Mesclar no GitHub a branch feat/publicador-paginas do repositório LP-ATIVO no main (páginas /publicador, /privacidade, /termos exigidas pelo Google).
- Google Cloud: tela de consentimento em "Em produção" e reconectar o canal (select public.yt_novo_link_conexao();). Em "Teste" o refresh token vence em 7 dias (conectado em 22/11 11h03 → vence ~29/11).
- GTA6_01: decidir entre variação (outra trilha/abertura) e reagendar, ou descartar.
```
