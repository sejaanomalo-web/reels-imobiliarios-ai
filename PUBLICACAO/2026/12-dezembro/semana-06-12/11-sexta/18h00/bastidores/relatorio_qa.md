# QA — ATIVO-D1211-18 · "Mandou cortar a corda" (Esteira Editorial Diária · grade 11/12/2026 18h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-11/ATIVO-D1211-18_mandou_cortar_a_corda.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território HISTÓRIA QUE ENSINA (pesquisa da Skill Mestre) · PUSH. Modelo: **Quarto modelo — Maquete 3D**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Demonstração do freio de segurança do elevador no Crystal Palace (Exposição de Nova York), 1854 (Britannica, American Heritage, PBS): o inventor subiu numa plataforma, mandou cortar a corda, a plataforma caiu poucos centímetros e o freio segurou.
- O nome do inventor é também marca comercial atual; por regra da ATIVO, nem a fala nem a tela citam o nome (fala: 'um inventor').
- Detalhes de altura e de quantas vezes a demonstração foi repetida variam entre as fontes; o vídeo não dá números.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1211-18/narration_source.wav`.
- Narração 33,7 s · 142 palavras/min · ASR 0,975 (78/80). Vídeo 36,1 s.
- **Pontos para ouvir:**
  - 'mil oitocentos e cinquenta e quatro' e 'certidões'.

## Som
- Trilha **T03** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção b em 17.54 s (alvo 17.72 s); insight → seção drop em 21.54 s (alvo 21.24 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.925 × mixagem 0.912 (queda 1.3 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.15 LUFS, TP -1.97 dBTP, LRA 4.10; narração -17.36 · trilha -23.99 · efeitos -41.09 LUFS; 17 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 36.08 s (timeline 36.07 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.18 LUFS · True peak ≤ -1 dBTP: -1.50 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 15.28 MB.
- `editorial_check` 0 erro (avisos revisados) (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia 1: o topo da torre encostava no título do cabeçalho, a plateia ocupava o rodapé e as placas da virada ficavam sob o cabeçalho → câmera afastada e mais alta nas tomadas da torre; placas da virada ao lado da torre.
- motion_check 40,8% parados, maior trecho 2,0 s; aviso de luminância em 1 quadro do fecho (verde do CTA), igual aos demais vídeos da maquete.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — 1854: a torre da feira com a plataforma alta, o inventor e a corda; 1854 · NOVA YORK; a plateia brota; CORTEM A CORDA e a corda some.
2. O INVENTOR — os freios nas guias acendem: FREIO DE SEGURANÇA; UMA FEIRA EM NOVA YORK.
3. A QUEDA — a plataforma cai poucos centímetros e trava: CAIU POUCOS CENTÍMETROS → E PAROU; O PÚBLICO VIU (a plateia acende).
4. A VIRADA — NÃO DISSE QUE ERA SEGURO → ELE MOSTROU (o inventor abre os braços).
5. NO ATENDIMENTO — a câmera anda até a mesa: DESCONFIOU? NÃO JURE; os documentos acendem: MATRÍCULA, CERTIDÕES, HISTÓRICO.
6. A LIÇÃO — plano aberto com a torre e a mesa: PROVA, NÃO PROMESSA.
7. Fecho — módulos do sistema acendem, campo SISTEMA e logo.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1211-18 --source episodes/ATIVO-D1211-18/narration_source.wav && python3 tools/build_audio.py ATIVO-D1211-18 && bash tools/render_episode.sh ATIVO-D1211-18
```
