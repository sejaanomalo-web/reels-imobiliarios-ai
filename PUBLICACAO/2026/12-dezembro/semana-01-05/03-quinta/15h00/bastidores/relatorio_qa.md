# QA — ATIVO-D1203-15 · "Ela amou, ele odiou" (Esteira Editorial Diária · grade 03/12/2026 15h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-03/ATIVO-D1203-15_ela_amou_ele_odiou.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território CORRETOR NA VIDA REAL (pesquisa da Skill Mestre) · PULL. Modelo: **Primeiro modelo — Cartoon explicativo**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Prática profissional; sem estatística. Risco de estereótipo de gênero tratado: a legenda do Instagram é neutra (um e outro) e na tela os dois têm critérios legítimos (espaço × não pegar trânsito).

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1203-15/narration_source.wav`.
- Narração 35,8 s · 171 palavras/min · ASR 0,981 (101/102). Vídeo 38,1 s.
- **Pontos para ouvir:**
  - Ritmo 171 palavras/min; "inegociável" e "trânsito".

## Som
- Trilha **T04** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): tensao → seção respiro em 6.545 s (alvo 6.92 s); virada → seção b em 8.727 s (alvo 9.8 s); insight → seção a2 em 17.454 s (alvo 16.76 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.99 × mixagem 0.99 (queda 0.0 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.17 LUFS, TP -1.95 dBTP, LRA 3.50; narração -18.94 · trilha -27.62 · efeitos -40.28 LUFS; 20 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 38.14 s (timeline 38.13 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.19 LUFS · True peak ≤ -1 dBTP: -1.60 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 19.73 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia: os balões estavam na camada HTML e não apareciam → passaram para o SVG; a casa da virada ficava sob o carimbo SÃO OS CRITÉRIOS e a etiqueta NÃO É O IMÓVEL encostava no selo → reempilhados.
- Na legenda, "se fecham", "convencer" e "defender" em vermelho (ações a evitar).
- sistema_visual_check --quadros: 1 aviso de luminância (46 vs 45) no fecho verde.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — VISITA COM CASAL: um aponta a mesa fantasma (A MESA VAI AQUI!), o outro de BRAÇOS CRUZADOS na porta.
2. O ERRO COMUM — o corretor tenta convencer (MAS OLHA ESSA VISTA!); OS DOIS SE FECHAM, ambos de braços cruzados.
3. A VIRADA — NÃO É O IMÓVEL · SÃO OS CRITÉRIOS · NUNCA COMBINADOS; um ? sobre cada um.
4. NA PRÓXIMA CONVERSA — checklist PARA CADA UM: O QUE FAZ SER SIM? · O QUE É INEGOCIÁVEL?
5. CADA UM, O SEU — ESPAÇO × SEM TRÂNSITO (holofotes verdes).
6. Desfecho — OS DOIS CRITÉRIOS NA MESA; DEFENDER O IMÓVEL riscado; PROCURAR O CERTO, um cartão aceso.
7. CTA curta — campo COMENTE SISTEMA, ícones, logo.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1203-15 --source episodes/ATIVO-D1203-15/narration_source.wav && python3 tools/build_audio.py ATIVO-D1203-15 && bash tools/render_episode.sh ATIVO-D1203-15
```
