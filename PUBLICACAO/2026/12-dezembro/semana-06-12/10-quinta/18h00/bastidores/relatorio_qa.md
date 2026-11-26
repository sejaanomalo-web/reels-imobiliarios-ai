# QA — ATIVO-D1210-18 · "Os números das casas" (Esteira Editorial Diária · grade 10/12/2026 18h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-10/ATIVO-D1210-18_os_numeros_das_casas.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território HISTÓRIA QUE ENSINA (pesquisa da Skill Mestre) · PUSH. Modelo: **Quarto modelo — Maquete 3D**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Decreto de 4 de fevereiro de 1805 (Paris): números pares de um lado e ímpares do outro; nas ruas perpendiculares ao Sena a numeração começa no rio, nas paralelas segue o curso do rio; sistema em uso até hoje (sortiraparis.com, bibnum PSL, Connexion France).
- As fontes divergem sobre o prefeito responsável; o vídeo não cita nome (selo 'DECRETO DE 4/2/1805 (PARIS)').

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1210-18/narration_source.wav`.
- Narração 31,7 s · 151 palavras/min · ASR 0,988 (79/80). Vídeo 34,0 s.
- **Pontos para ouvir:**
  - 'mil oitocentos e cinco' e 'Sena'.

## Som
- Trilha **T03** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção b em 14.0 s (alvo 14.84 s); insight → seção drop em 18.0 s (alvo 18.12 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.975 × mixagem 0.975 (queda 0.0 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.12 LUFS, TP -1.94 dBTP, LRA 3.20; narração -20.02 · trilha -26.59 · efeitos -40.96 LUFS; 17 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 34.05 s (timeline 34.03 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.14 LUFS · True peak ≤ -1 dBTP: -1.69 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 12.13 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia: o rio aceso virava uma faixa verde atravessando a tela, as casas giradas ficavam escuras, os números colavam na borda e o corretor estava cortado → rio sem verde (a placa nomeia o Sena), casas de frente, câmera mais aberta, corretor dentro do quadro, placas sem sobreposição.
- motion_check 56,0% parados (maquete com câmera lenta), maior trecho 2,1 s; sistema_visual_check --quadros 0 erro, 0 aviso.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — UMA REGRA ATÉ HOJE: a rua de argila que sai do rio; PARIS · DECRETO DE 1805.
2. A REGRA 1 — pares (verdes) de um lado, ímpares do outro: 2, 4, 6 / 1, 3, 5.
3. A REGRA 2 — O RIO SENA; PERTO DO RIO, NÚMERO MENOR.
4. A VIRADA — a câmera sobe e a rua vira mapa: A CIDADE VIRA MAPA.
5. NA SUA CARTEIRA — o corretor e três fichas iguais: ENDEREÇO, FOTOS, CÓDIGO acendem.
6. A LIÇÃO — QUEM ACHA, VENDE; fecho SISTEMA.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1210-18 --source episodes/ATIVO-D1210-18/narration_source.wav && python3 tools/build_audio.py ATIVO-D1210-18 && bash tools/render_episode.sh ATIVO-D1210-18
```
