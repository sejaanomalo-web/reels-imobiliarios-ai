# QA — ATIVO-D1210-21 · "Montado pelas próprias mãos" (Esteira Editorial Diária · grade 10/12/2026 21h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-10/ATIVO-D1210-21_montado_pelas_proprias_maos.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território FORA DA BOLHA (pesquisa da Skill Mestre) · PUSH. Modelo: **Segundo modelo — Pictograma cinematográfico**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Norton, Mochon & Ariely (2012), 'The IKEA Effect: When Labor Leads to Love', Journal of Consumer Psychology 22(3): 453–460 — participantes que montaram caixas simples atribuíram mais valor a elas do que a caixas idênticas já montadas.
- Sem percentual (o '63%' que circula não foi verificado na fonte primária) e sem nome de marca na fala ou na tela; selo 'NORTON, MOCHON & ARIELY · 2012'.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1210-21/narration_source.wav`.
- Narração 31,8 s · 170 palavras/min · ASR 0,950 (86/90). Vídeo 34,2 s.
- **Pontos para ouvir:**
  - 'dois mil e doze' e 'montassem'.

## Som
- Trilha **T04** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção b em 15.273 s (alvo 15.88 s); insight → seção a2 em 19.636 s (alvo 17.96 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.956 × mixagem 0.967 (queda -1.1 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.13 LUFS, TP -1.95 dBTP, LRA 3.80; narração -18.59 · trilha -27.68 · efeitos -38.85 LUFS; 18 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 34.18 s (timeline 34.17 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.15 LUFS · True peak ≤ -1 dBTP: -1.62 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 12.51 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Voz gerada com a 3ª chave do Gemini (mesmo modelo e voz Puck), no mesmo dia, depois da cota liberar.
- Prévia: o ícone e a pílula 'E EXPLICA CADA UMA' encostavam no título → descidos para o centro da cena.
- motion_check 58,7% parados (pictograma lento por design), maior trecho 1,2 s; sistema_visual_check --quadros 0 erro, 0 aviso.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — O MÓVEL QUE VOCÊ MONTOU: a caixa em linha fina se monta peça por peça e fica MEIO TORTA.
2. 2012 · UM TESTE, MONTAR CAIXAS — MONTE VOCÊ MESMO.
3. A PRÓPRIA VALE MAIS — a caixa montada acende ao lado de uma IGUAL, PRONTA; o cifrão maior sobre a própria.
4. CONSTRUIR DÁ VALOR — o boneco comemora.
5. MONTE A BUSCA COM O CLIENTE — OS CRITÉRIOS DELE (checks) × AS SUAS OPÇÕES (casas); E EXPLICA CADA UMA.
6. QUEM PARTICIPA DEFENDE — tudo acende; CtaNoir.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1210-21 --source episodes/ATIVO-D1210-21/narration_source.wav && python3 tools/build_audio.py ATIVO-D1210-21 && bash tools/render_episode.sh ATIVO-D1210-21
```
