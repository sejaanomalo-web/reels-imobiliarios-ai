# QA — ATIVO-D1203-12 · "A casa de 1 euro" (Esteira Editorial Diária · grade 03/12/2026 12h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-03/ATIVO-D1203-12_a_casa_de_um_euro.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território HISTÓRIA QUE ENSINA (pesquisa da Skill Mestre) · PUSH. Modelo: **Quarto modelo — Maquete 3D**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Sambuca di Sicilia (2019): casas a partir de 1 euro em leilão; depósito de 5 mil euros devolvido após a reforma; reforma em até 3 anos; a maioria saiu entre 5 e 10 mil euros; objetivo: repovoar a cidade (CNN, Money, Time Out, Euronews). Na tela: FONTES CNN, EURONEWS, TIME OUT (2019).

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1203-12/narration_source.wav`.
- Narração 46,0 s · 145 palavras/min · ASR 0,955 (107/111). Vídeo 48,3 s.
- **Pontos para ouvir:**
  - Ritmo 145 palavras/min; "Sambuca", "euro/euros" e "5 mil".

## Som
- Trilha **T02** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção frase3 em None s (alvo 23.88 s); insight → seção climax em 23.89 s (alvo 29.4 s); resolucao → seção resolucao em None s (alvo 35.96 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.955 × mixagem 0.946 (queda 0.9 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.07 LUFS, TP -1.95 dBTP, LRA 3.30; narração -19.20 · trilha -29.76 · efeitos -40.55 LUFS; 19 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 48.34 s (timeline 48.33 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.10 LUFS · True peak ≤ -1 dBTP: -1.57 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 16.46 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia: placas e telhados invadiam o cabeçalho → câmera mais alta; as casas acesas ficaram em verde parcial (não a cidade inteira).
- Render 1: 50% de quadros parados → deriva lenta e contínua da câmera (plano-sequência); render 2: 44%, maior trecho parado 2,0 s (dentro da regra de 2–3 s).
- sistema_visual_check --quadros: 1 aviso de luminância no fecho verde.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — SICÍLIA · 2019: a cidade em miniatura, € 1.
2. A cidade — CASAS VAZIAS: as casas ficam grafite.
3. O anúncio — arcos de pontos chegam de longe (O ANÚNCIO RODOU O MUNDO); brotam interessados.
4. A condição — DEPÓSITO € 5 MIL · REFORMA EM 3 ANOS · LEILÃO: € 5 A 10 MIL.
5. O objetivo — QUERIA GENTE MORANDO: as casas acendem uma a uma.
6. Para o corretor — o dono e a casa: PRAZO · QUEM VAI CUIDAR · UM RECOMEÇO.
7. Desfecho — o corretor: O QUE ELE QUER ALÉM DO PREÇO?
8. CTA curta — módulos do sistema, campo SISTEMA, logo.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1203-12 --source episodes/ATIVO-D1203-12/narration_source.wav && python3 tools/build_audio.py ATIVO-D1203-12 && bash tools/render_episode.sh ATIVO-D1203-12
```
