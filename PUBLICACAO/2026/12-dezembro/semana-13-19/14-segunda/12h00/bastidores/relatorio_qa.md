# QA — ATIVO-D1214-12 · "O pé na porta" (Esteira Editorial Diária · grade 14/12/2026 12h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-14/ATIVO-D1214-12_o_pe_na_porta.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território FORA DA BOLHA (pesquisa da Skill Mestre) · PULL. Modelo: **Segundo modelo — Pictograma cinematográfico**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Freedman & Fraser (1966), JPSP 4(2):195–202: em Palo Alto, 76% dos moradores que antes aceitaram um pedido pequeno aceitaram a placa grande no gramado; no grupo só com o pedido grande, a aceitação foi muito menor (o vídeo não cita o percentual).
- Revisões (Burger, 1999): efeito real, moderado e dependente do contexto — a legenda diz isso.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1214-12/narration_source.wav`.
- Narração 36,8 s · 143 palavras/min · ASR 0,971 (85/88). Vídeo 39,2 s.
- **Pontos para ouvir:**
  - 'mil novecentos e sessenta e seis' e 'exclusividade'.

## Som
- Trilha **T04** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção b em 17.455 s (alvo 18.44 s); insight → seção a2 em 21.818 s (alvo 21.56 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.932 × mixagem 0.92 (queda 1.2 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.10 LUFS, TP -1.96 dBTP, LRA 3.80; narração -17.82 · trilha -28.01 · efeitos -38.75 LUFS; 17 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 39.17 s (timeline 39.17 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.11 LUFS · True peak ≤ -1 dBTP: -1.83 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 14.06 MB.
- `editorial_check` 0 erro (avisos revisados) (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia 1: a 4ª casa encostava na borda direita → as quatro foram centralizadas.
- Ressalva menor: a pílula '2 · FAZER A AVALIAÇÃO' encosta no topo do ícone da casa por ~3 s; texto legível.
- Inteligibilidade: queda de 1,2 ponto com T04.
- motion_check 62,9% parados (noir lento), maior trecho 1,1 s.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — UMA PLACA ENORME: a casa em linha fina e a placa CUIDADO! no jardim; 1966 · CALIFÓRNIA.
2. QUEM JÁ TINHA DITO SIM — a rua de 4 casas com a plaquinha na janela; 3 acendem: 3 EM CADA 4: SIM.
3. SÓ O PEDIDO GRANDE — a rua fica vermelha: A MAIORIA RECUSOU.
4. UM SIM PEQUENO ABRE CAMINHO — a trilha do SIM PEQUENO ao GRANDE.
5. NA CAPTAÇÃO, COMECE PEQUENO — EXCLUSIVIDADE DE CARA (vermelho) → 1 · CONHECER O IMÓVEL / 2 · FAZER A AVALIAÇÃO.
6. DO PEQUENO AO GRANDE — a casa acende, o proprietário comemora.
7. Fecho — CtaNoir: campo SISTEMA, módulos e logo por partículas.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1214-12 --source episodes/ATIVO-D1214-12/narration_source.wav && python3 tools/build_audio.py ATIVO-D1214-12 && bash tools/render_episode.sh ATIVO-D1214-12
```
