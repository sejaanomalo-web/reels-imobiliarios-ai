# QA — ATIVO-D1214-08 · "A metragem do anúncio" (Esteira Editorial Diária · grade 14/12/2026 08h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-14/ATIVO-D1214-08_a_metragem_do_anuncio.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território E SE…? (pesquisa da Skill Mestre) · PUSH. Modelo: **Terceiro modelo — Planta técnica**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- França: lei Carrez (art. 46 da lei de 10/07/1965, introduzido pela lei 96-1107/1996): área privativa real mais de 1/20 menor que a do ato → redução proporcional do preço, ação em 1 ano (Assemblée nationale, SeLoger, PAP).
- Brasil: Código Civil, art. 500 (venda ad mensuram): complemento, resolução ou abatimento; diferença de até 1/20 presume-se enunciativa (§1º); prazo do art. 501 (STJ REsp 1.890.327).
- O vídeo não cita números de metros nem prazos; a legenda separa venda ad mensuram e ad corpus.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1214-08/narration_source.wav`.
- Narração 36,8 s · 168 palavras/min · ASR 0,971 (99/103). Vídeo 39,2 s.
- **Pontos para ouvir:**
  - 'vigésimo' e 'abatimento' (o Whisper ouviu 'estiveresse' no gancho; na mixagem a fala está correta).

## Som
- Trilha **T03** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção b em 21.04 s (alvo 21.88 s); insight → seção drop em 25.04 s (alvo 24.76 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.942 × mixagem 0.951 (queda -0.9 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.12 LUFS, TP -1.93 dBTP, LRA 2.90; narração -18.47 · trilha -25.15 · efeitos -40.87 LUFS; 18 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 39.17 s (timeline 39.17 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.14 LUFS · True peak ≤ -1 dBTP: -1.60 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 21.9 MB.
- `editorial_check` 0 erro (avisos revisados) (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia 1 aprovada sem ajuste.
- Inteligibilidade: queda de −0,9 ponto com T03.
- motion_check 15,6% parados, maior trecho 2,1 s.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — E SE A METRAGEM ESTIVER ERRADA?: a planta do apartamento e a cota ÁREA ANUNCIADA; a cota ÁREA REAL se desenha mais curta e a faixa NÃO EXISTE fica vermelha.
2. NA FRANÇA, É LEI — selo LEI CARREZ (1996); MAIS DE 5% A MENOS → PREÇO CAI NA PROPORÇÃO.
3. NO BRASIL, PELA MEDIDA — selo CÓDIGO CIVIL · ART. 500; ACIMA DE 1/20 → PODE VIRAR ABATIMENTO.
4. METRAGEM É PROMESSA — a cota anunciada acende; mergulho na SALA.
5. CONFIRA A ÁREA — A MATRÍCULA / A PLANTA / DE ONDE VEIO O NÚMERO.
6. METRAGEM CERTA — NEGOCIAÇÃO SEM SURPRESA.
7. Fecho — módulos do sistema na prancha, campo SISTEMA e logo.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1214-08 --source episodes/ATIVO-D1214-08/narration_source.wav && python3 tools/build_audio.py ATIVO-D1214-08 && bash tools/render_episode.sh ATIVO-D1214-08
```
