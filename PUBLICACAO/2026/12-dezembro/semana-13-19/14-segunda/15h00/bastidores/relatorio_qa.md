# QA — ATIVO-D1214-15 · "As palavras do cliente" (Esteira Editorial Diária · grade 14/12/2026 15h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-14/ATIVO-D1214-15_as_palavras_do_cliente.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território IDEIA QUE MUDA O JOGO (pesquisa da Skill Mestre) · PULL. Modelo: **Primeiro modelo — Cartoon explicativo**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- van Baaren, Holland, Steenaert & van Knippenberg (2003), Journal of Experimental Social Psychology 39(4):393–398: a garçonete que repetiu literalmente o pedido de metade dos clientes recebeu gorjetas significativamente maiores (exp. 1; exp. 2 com linha de base).
- Barras ilustrativas, sem valores; o pedido 'um suco sem gelo' é exemplo ilustrativo.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1214-15/narration_source.wav`.
- Narração 32,5 s · 155 palavras/min · ASR 0,964 (81/84). Vídeo 34,8 s.
- **Pontos para ouvir:**
  - 'garçonete' e 'Holanda' (o Whisper juntou 'ganhou gorjetas' em 'ganhetas' na narração pura; na fala está correto).

## Som
- Trilha **T02** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção frase3 em None s (alvo 15.08 s); insight → seção climax em 22.12 s (alvo 18.52 s); resolucao → seção resolucao em None s (alvo 27.08 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.988 × mixagem 0.988 (queda 0.0 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.16 LUFS, TP -1.95 dBTP, LRA 3.60; narração -18.65 · trilha -29.86 · efeitos -39.98 LUFS; 19 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 34.82 s (timeline 34.80 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.19 LUFS · True peak ≤ -1 dBTP: -1.71 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 18.25 MB.
- `editorial_check` 0 erro (avisos revisados) (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia 1: '= ATENÇÃO' ficava 0,24 s → entra 1 s depois de 'própria'; o carimbo AS MESMAS PALAVRAS cobria o balão da garçonete → balões descidos; a etiqueta ANOTE encostava no selo → descida.
- Ressalva menor: a barra REPETIU encosta na etiqueta GORJETA POR MESA no pico do soco de câmera.
- Inteligibilidade: queda de 0,0 ponto com T02.
- motion_check 15,6% parados, maior trecho 0,9 s; aviso de luminância em 1 quadro do fecho (verde do CTA).
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — UMA GARÇONETE / GORJETAS MAIORES.
2. O ESTUDO — 2003 · HOLANDA; o cliente pede 'UM SUCO SEM GELO' e a garçonete repete igual: AS MESMAS PALAVRAS.
3. O RESULTADO — barras NÃO REPETIU × REPETIU (sem números).
4. A VIRADA — A PRÓPRIA FRASE DE VOLTA = ATENÇÃO.
5. NA PRÁTICA — ANOTE AS PALAVRAS EXATAS; 'QUINTAL PARA O CACHORRO' vai para a mensagem; NÃO: 'ÁREA EXTERNA'.
6. REPETIU AS PALAVRAS / MOSTROU QUE OUVIU — confete.
7. Fecho — CtaCartoon curto, campo SISTEMA, módulos e logo.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1214-15 --source episodes/ATIVO-D1214-15/narration_source.wav && python3 tools/build_audio.py ATIVO-D1214-15 && bash tools/render_episode.sh ATIVO-D1214-15
```
