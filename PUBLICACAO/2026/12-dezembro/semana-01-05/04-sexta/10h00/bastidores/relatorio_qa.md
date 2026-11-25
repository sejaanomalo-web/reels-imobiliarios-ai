# QA — ATIVO-D1204-10 · "O cliente sumiu depois da visita" (Esteira Editorial Diária · grade 04/12/2026 10h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-04/ATIVO-D1204-10_o_cliente_sumiu.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território CORRETOR NA VIDA REAL (pesquisa da Skill Mestre) · PULL. Modelo: **Primeiro modelo — Cartoon explicativo**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Prática profissional; sem estatística. A conversa no celular é ilustrativa (sem marca de aplicativo).

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1204-10/narration_source.wav`.
- Narração 35,4 s · 164 palavras/min · ASR 0,974 (94/97). Vídeo 37,7 s.
- **Pontos para ouvir:**
  - Ritmo 164 palavras/min; "páreo".

## Som
- Trilha **T05** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção b em 10.073 s (alvo 10.84 s); insight → seção c em 15.07 s (alvo 15.32 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.928 × mixagem 0.948 (queda -2.0 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.16 LUFS, TP -1.97 dBTP, LRA 3.60; narração -18.34 · trilha -26.92 · efeitos -39.44 LUFS; 20 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 37.74 s (timeline 37.73 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.17 LUFS · True peak ≤ -1 dBTP: -1.79 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 18.93 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia: o celular ficava sob a legenda e o texto vazava do balão → celular mais alto e mais largo; texto a 30 px (≥ 24 px na tela); balões ? afastados da legenda.
- sistema_visual_check --quadros: 1 aviso de luminância no fecho verde.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — CLIENTE ANIMADO; 2 DIAS DEPOIS…; o cliente vira contorno: SUMIU.
2. A MENSAGEM DE SEMPRE — E AÍ, O QUE ACHOU? · VISUALIZADO ✓✓; SEM RESPOSTA.
3. POR QUE ELE SOME — PERGUNTA ABERTA · DÁ TRABALHO · CANSADO DE DECIDIR (balões ?).
4. NO MESMO DIA — checklist RESUMO DA VISITA: GOSTOU · NÃO GOSTOU · FALTA SABER.
5. E TERMINE ASSIM — o celular com o resumo e a PERGUNTA FÁCIL (mais um parecido ou esse continua no páreo?).
6. Desfecho — VOCÊ OUVIU · SIM OU NÃO; a resposta chega (verde).
7. CTA curta — campo COMENTE SISTEMA, ícones, logo.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1204-10 --source episodes/ATIVO-D1204-10/narration_source.wav && python3 tools/build_audio.py ATIVO-D1204-10 && bash tools/render_episode.sh ATIVO-D1204-10
```
