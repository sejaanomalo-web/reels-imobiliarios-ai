# QA — ATIVO-D1215-21 · "O cliente que não apareceu" (Esteira Editorial Diária · grade 15/12/2026 21h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-15/ATIVO-D1215-21_o_cliente_que_nao_apareceu.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território CORRETOR NA VIDA REAL (pesquisa da Skill Mestre) · PUSH. Modelo: **Primeiro modelo — Cartoon explicativo**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Robotham et al. (2016), BMJ Open 6:e012116: em ensaios randomizados, notificações digitais reduziram em 25% a chance de faltar a consultas (RR 0,75; 15% × 21%); múltiplas notificações podem melhorar mais. Revisão Cochrane (2013) com conclusão semelhante.
- A fala diz 'na saúde' e 'cerca de um quarto'; barras sem números; o vídeo não promete redução para visitas.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1215-21/narration_source.wav`.
- Narração 29,9 s · 159 palavras/min · ASR 0,975 (77/79). Vídeo 32,2 s.
- **Pontos para ouvir:**
  - 'lembretes' e 'um quarto'.

## Som
- Trilha **T01** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção cama2 em 16.0 s (alvo 15.96 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.949 × mixagem 0.949 (queda 0.0 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.12 LUFS, TP -1.96 dBTP, LRA 2.40; narração -18.42 · trilha -25.51 · efeitos -40.42 LUFS; 20 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 32.23 s (timeline 32.23 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.14 LUFS · True peak ≤ -1 dBTP: -1.70 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 16.73 MB.
- `editorial_check` 0 erro (avisos revisados) (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia 1: o balão O DIA MUDOU era cortado cedo → o plano do estudo começa em 'saúde'; FALTAS ÀS CONSULTAS cobria a legenda → subiu; a barra cinza entra em 'saúde' (sem 3 s de cena vazia).
- Ressalva menor: o carimbo −1/4 encosta nas etiquetas no pico do soco de câmera.
- Inteligibilidade: queda de 0,0 ponto com T01.
- motion_check 14,3% parados, maior trecho 0,7 s; aviso de luminância em 1 quadro do fecho (verde do CTA).
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — 10H00: IMÓVEL ABERTO, LUZES ACESAS / NÃO APARECEU.
2. O PORQUÊ — NÃO É MALDADE; balões ESQUECI! / O DIA MUDOU….
3. FORA DA BOLHA — NA SAÚDE · REVISÃO DE ESTUDOS; FALTAS ÀS CONSULTAS: barras SEM LEMBRETE × COM LEMBRETE; carimbo −1/4.
4. A VIRADA — LEMBRETE.
5. CONFIRME — o celular: AMANHÃ, 10H. TUDO CERTO? / POSSO TE ESPERAR ÀS 10H? / SIM! JÁ ESTOU SAINDO; NA VÉSPERA / E 2 H ANTES / PEDE RESPOSTA.
6. VISITA CONFIRMADA / ACONTECE — confete.
7. Fecho — CtaCartoon curto, campo SISTEMA, módulos e logo.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1215-21 --source episodes/ATIVO-D1215-21/narration_source.wav && python3 tools/build_audio.py ATIVO-D1215-21 && bash tools/render_episode.sh ATIVO-D1215-21
```
