# QA — ATIVO-D1215-18 · "A ideia em uma frase" (Esteira Editorial Diária · grade 15/12/2026 18h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-15/ATIVO-D1215-18_a_ideia_em_uma_frase.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território HISTÓRIA QUE ENSINA (pesquisa da Skill Mestre) · PUSH. Modelo: **Terceiro modelo — Planta técnica**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Concurso do Plano Piloto de Brasília (1956–1957), vencido por Lúcio Costa em março de 1957: poucos desenhos ('rabiscos toscos feitos a lápis de cor', segundo Niemeyer) e texto à máquina; o Relatório abre com desculpas pela 'apresentação sumária' e descreve dois eixos cruzando-se em ângulo reto (IPHAN, Câmara, artigos USP/UnB).
- O vídeo não afirma o motivo da escolha do júri; o exemplo de frase do imóvel está só na legenda.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1215-18/narration_source.wav`.
- Narração 32,1 s · 159 palavras/min · ASR 0,982 (84/85). Vídeo 34,4 s.
- **Pontos para ouvir:**
  - 'mil novecentos e cinquenta e sete' e 'eixos'.

## Som
- Trilha **T03** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção b em 18.54 s (alvo 19.32 s); insight → seção drop em 22.54 s (alvo 21.64 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.988 × mixagem 1.0 (queda -1.2 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -14.99 LUFS, TP -1.92 dBTP, LRA 3.40; narração -19.20 · trilha -25.95 · efeitos -40.73 LUFS; 18 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 34.41 s (timeline 34.40 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.01 LUFS · True peak ≤ -1 dBTP: -1.63 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 17.73 MB.
- `editorial_check` 0 erro (avisos revisados) (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia 1: os cômodos POUCOS DESENHOS e TEXTO À MÁQUINA ficavam sob o cruzamento → somem junto com os rabiscos.
- Inteligibilidade: queda de −1,2 ponto com T03.
- motion_check 17,5% parados, maior trecho 2,0 s.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — BRASÍLIA EM RABISCOS: a prancha do concurso recebe rabiscos a lápis.
2. 1957: POUCOS DESENHOS — POUCOS DESENHOS / TEXTO À MÁQUINA; chamada PEDIU DESCULPAS PELA APRESENTAÇÃO; selo LÚCIO COSTA · RELATÓRIO DO PLANO PILOTO, 1957.
3. A IDEIA NUMA FRASE — os rabiscos somem e os dois eixos se desenham e se cruzam: DOIS EIXOS QUE SE CRUZAM.
4. PRIMEIRO, A IDEIA — o cruzamento acende; mergulho.
5. A FRASE DO IMÓVEL — PARA QUEM? / POR QUÊ?; a lista de itens apaga: A LISTA VEM DEPOIS.
6. QUEM ENTENDE, LEMBRA.
7. Fecho — módulos do sistema na prancha, campo SISTEMA e logo.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1215-18 --source episodes/ATIVO-D1215-18/narration_source.wav && python3 tools/build_audio.py ATIVO-D1215-18 && bash tools/render_episode.sh ATIVO-D1215-18
```
