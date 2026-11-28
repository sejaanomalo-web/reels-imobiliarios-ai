# QA — ATIVO-D1216-15 · "O trajeto no horário de pico" (Esteira Editorial Diária · grade 16/12/2026 15h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-16/ATIVO-D1216-15_o_trajeto_no_horario_de_pico.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território IDEIA QUE MUDA O JOGO (pesquisa da Skill Mestre) · PULL. Modelo: **Primeiro modelo — Cartoon explicativo**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Stutzer & Frey (2008), 'Stress That Doesn't Pay: The Commuting Paradox', Scandinavian Journal of Economics: com dados do painel alemão SOEP, quem tem deslocamento mais longo relata, em média, menor satisfação com a vida, sem compensação suficiente por renda ou moradia.
- Barras ilustrativas, sem números; 'em média' na fala; nenhum aplicativo citado.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1216-15/narration_source.wav`.
- Narração 32,2 s · 168 palavras/min · ASR 1,000 (90/90). Vídeo 34,5 s.
- **Pontos para ouvir:**
  - 'alemã' e 'horário de pico'.

## Som
- Trilha **T02** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção frase3 em None s (alvo 15.16 s); insight → seção climax em 22.12 s (alvo 19.0 s); resolucao → seção resolucao em None s (alvo 25.72 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.978 × mixagem 0.978 (queda 0.0 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.11 LUFS, TP -1.95 dBTP, LRA 3.40; narração -18.47 · trilha -30.13 · efeitos -40.07 LUFS; 19 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 34.54 s (timeline 34.53 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.12 LUFS · True peak ≤ -1 dBTP: -1.57 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 18.14 MB.
- `editorial_check` 0 erro (avisos revisados) (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia 1 aprovada sem ajuste.
- Inteligibilidade: queda de 0,0 ponto com T02.
- motion_check 18,9% parados, maior trecho 1,0 s; aviso de luminância em 1 quadro do fecho (verde do CTA).
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — AMOU A CASA; a fila de carros entra: E O TRÂNSITO?; o casal se espanta.
2. FORA DA BOLHA — PESQUISA ALEMÃ; barras TRAJETO CURTO × TRAJETO LONGO; SATISFAÇÃO COM A VIDA (MÉDIA).
3. TODO DIA — A CASA BONITA / NÃO COMPENSA; o casal triste diante da fila.
4. A VIRADA — O TRAJETO / FAZ PARTE DO IMÓVEL.
5. ANTES DE MOSTRAR — o celular: VAMOS CALCULAR O TRAJETO? / CASA → TRABALHO ÀS 8H DA MANHÃ; CALCULE JUNTO / ATÉ O TRABALHO / NO PICO.
6. TEMPO PARA VIVER / A CASA CERTA — confete.
7. Fecho — CtaCartoon curto, campo SISTEMA, módulos e logo.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1216-15 --source episodes/ATIVO-D1216-15/narration_source.wav && python3 tools/build_audio.py ATIVO-D1216-15 && bash tools/render_episode.sh ATIVO-D1216-15
```
