# QA — ATIVO-D1203-18 · "O móvel que você montou" (Esteira Editorial Diária · grade 03/12/2026 18h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-03/ATIVO-D1203-18_o_movel_que_voce_montou.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território FORA DA BOLHA (pesquisa da Skill Mestre) · PUSH. Modelo: **Quarto modelo — Maquete 3D**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Norton, Mochon & Ariely (2012), Journal of Consumer Psychology: participantes valorizaram (e pagariam mais por) caixas e origamis que eles mesmos montaram. Percentual não citado; nome do efeito (marca) omitido. Na tela: FONTES NORTON, MOCHON & ARIELY (2012).

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1203-18/narration_source.wav`.
- Narração 38,8 s · 156 palavras/min · ASR 0,980 (100/101). Vídeo 41,2 s.
- **Pontos para ouvir:**
  - Ritmo e "origami".

## Som
- Trilha **T03** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): descoberta → seção quebra em 15.04 s (alvo 15.64 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.99 × mixagem 0.98 (queda 1.0 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.12 LUFS, TP -1.97 dBTP, LRA 3.60; narração -18.21 · trilha -25.17 · efeitos -41.08 LUFS; 18 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 41.17 s (timeline 41.17 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.13 LUFS · True peak ≤ -1 dBTP: -1.70 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 15.26 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia: um <g> SVG dentro do mundo 3D quebrava o render → <group>; caixas e bonecos cortados nas bordas → caixas mais próximas e câmera mais aberta; placas encostavam no cabeçalho → mais baixas; câmera saía da caixa acesa antes da hora → pausa até a virada.
- Render 1: 45,5% de quadros parados → deriva contínua; render 2: 41,6%, maior trecho parado 2,0 s.
- sistema_visual_check --quadros: 1 aviso de luminância no fecho verde.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — o móvel se monta peça por peça; PARECE MAIS BONITO?
2. O experimento — a caixa que ELA MONTOU × a caixa IGUAL, PRONTA; PAGAVAM MAIS.
3. O origami malfeito acende: VALE MAIS PRA QUEM DOBROU; AJUDOU A CONSTRUIR (a caixa montada acende).
4. Na sua busca — A BUSCA DO SEU CLIENTE; a LISTA PRONTA (vermelha).
5. Experimente — o mapa montado junto: MONTAR COM ELE · BAIRROS NO MAPA · O QUE NÃO PODE FALTAR · DESCARTA JUNTO (casas somem).
6. Desfecho — a casa que sobra acende: ENCONTRADO JUNTO VALE MAIS.
7. CTA curta — módulos do sistema, campo SISTEMA, logo.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1203-18 --source episodes/ATIVO-D1203-18/narration_source.wav && python3 tools/build_audio.py ATIVO-D1203-18 && bash tools/render_episode.sh ATIVO-D1203-18
```
