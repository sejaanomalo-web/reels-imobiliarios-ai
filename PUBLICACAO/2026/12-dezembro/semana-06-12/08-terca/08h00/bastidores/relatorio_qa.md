# QA — ATIVO-D1208-08 · "O prédio escolhe" (Esteira Editorial Diária · grade 08/12/2026 08h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-08/ATIVO-D1208-08_o_predio_escolhe.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território E SE…? (pesquisa da Skill Mestre) · PUSH. Modelo: **Quarto modelo — Maquete 3D**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Nova York: nos prédios em regime de cooperativa ('co-op'), um conselho entrevista o comprador e pode recusar (prática documentada; sem número).
- STJ, 4ª Turma, REsp 1.819.075/RS (abril de 2021): em condomínio de destinação residencial, a convenção pode proibir hospedagem remunerada de curta temporada por aplicativo; decisão de um caso, não vinculante (a fala diz 'num caso'; selo 'STJ · 2021 · NUM CASO').

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1208-08/narration_source.wav`.
- Narração 34,0 s · 180 palavras/min · ASR 0,971 (99/102). Vídeo 36,4 s.
- **Pontos para ouvir:**
  - 'esse tê jota' (STJ) e 'dois mil e vinte e um'.

## Som
- Trilha **T04** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção b em 15.273 s (alvo 14.6 s); insight → seção a2 em 24.0 s (alvo 23.16 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.971 × mixagem 0.971 (queda 0.0 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.14 LUFS, TP -1.97 dBTP, LRA 2.50; narração -19.45 · trilha -28.52 · efeitos -40.80 LUFS; 18 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 36.37 s (timeline 36.37 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.14 LUFS · True peak ≤ -1 dBTP: -1.65 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 13.75 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia: placas no topo dos prédios encostavam no cabeçalho e o lote ficava verde na ação → placas mais baixas, lote sem verde, placa duplicada do desfecho removida.
- motion_check 52,1% parados (câmera lenta com deriva), maior trecho 2,0 s; sistema_visual_check --quadros 0 erro, 0 aviso.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — E SE…?: o prédio; O PRÉDIO ESCOLHE?
2. NOVA YORK — a mesa do CONSELHO DE MORADORES entrevista o comprador: PODE DIZER NÃO (o comprador recua).
3. AQUI — AQUI NÃO ESCOLHE O COMPRADOR; AS REGRAS PODEM BARRAR O PLANO.
4. STJ · 2021 · NUM CASO — a CONVENÇÃO acende; a placa ALUGUEL POR APLICATIVO apaga: PODE PROIBIR.
5. ANTES DA PROPOSTA — corretor e cliente com a convenção: LEIA ANTES DA PROPOSTA.
6. A LIÇÃO — REGRA ERRADA, INVESTIMENTO ERRADO; CTA curta.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1208-08 --source episodes/ATIVO-D1208-08/narration_source.wav && python3 tools/build_audio.py ATIVO-D1208-08 && bash tools/render_episode.sh ATIVO-D1208-08
```
