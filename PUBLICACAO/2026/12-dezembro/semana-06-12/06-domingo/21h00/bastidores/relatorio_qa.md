# QA — ATIVO-D1206-21 · "O preço por dia" (Esteira Editorial Diária · grade 06/12/2026 21h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-06/ATIVO-D1206-21_o_preco_por_dia.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território FORA DA BOLHA (pesquisa da Skill Mestre) · PUSH. Modelo: **Segundo modelo — Pictograma cinematográfico**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- John Gourville (Harvard Business School), 'Pennies-a-Day: The Effect of Temporal Reframing on Transaction Evaluation', Journal of Consumer Research, 1998: o mesmo custo apresentado por dia é avaliado como menor, por comparação com gastos pequenos do cotidiano. Trabalho posterior do autor (2003) mostra inversão com valores altos. Nenhum número do estudo é usado; a virada põe o limite ético (clareza, não pressão).

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1206-21/narration_source.wav`.
- Narração 39,6 s · 159 palavras/min · ASR 0,961 (99/105). Vídeo 41,9 s.
- **Pontos para ouvir:**
  - 'Trezentos e sessenta e cinco reais' e 'Harvard'.

## Som
- Trilha **T03** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção b em 21.54 s (alvo 20.6 s); insight → seção drop em 25.54 s (alvo 26.04 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.924 × mixagem 0.914 (queda 1.0 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.16 LUFS, TP -1.96 dBTP, LRA 3.00; narração -19.07 · trilha -25.85 · efeitos -39.14 LUFS; 18 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 41.94 s (timeline 41.93 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.18 LUFS · True peak ≤ -1 dBTP: -1.65 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 15.44 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia: pílulas sobrepostas na abertura e figura cobrindo a pílula da balança → pílulas no alto, figura sai na balança.
- Render 1 descartado: o título final só aparecia 0,7 s → passa a entrar em 'número do dia a dia'.
- motion_check 58,6% parados (normal do pictograma noir), maior trecho 1,6 s; sistema_visual_check --quadros 0 erro, 0 aviso.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — UM REAL POR DIA PARECE POUCO: uma moeda × uma pilha (R$ 365 POR ANO); O MESMO DINHEIRO.
2. 1998 · HARVARD — O PREÇO POR DIA: a pilha encolhe; DITO POR DIA, PARECE MENOR.
3. A GENTE COMPARA — a xícara: COMPARADO COM UM CAFÉ.
4. USE PARA DAR CLAREZA — CLAREZA × PRESSÃO, NÃO.
5. A DIFERENÇA POR DIA — a balança: + R$ POR DIA × HORAS DE TRÂNSITO; PERTO DO TRABALHO.
6. Desfecho — NÚMERO GRANDE ASSUSTA → O DO DIA A DIA SE COMPARA; CTA com o logo montado por partículas.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1206-21 --source episodes/ATIVO-D1206-21/narration_source.wav && python3 tools/build_audio.py ATIVO-D1206-21 && bash tools/render_episode.sh ATIVO-D1206-21
```
