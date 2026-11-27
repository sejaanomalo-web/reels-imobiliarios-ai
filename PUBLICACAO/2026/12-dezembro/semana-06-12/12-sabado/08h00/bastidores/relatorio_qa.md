# QA — ATIVO-D1212-08 · "A ficha técnica da casa" (Esteira Editorial Diária · grade 12/12/2026 08h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-12/ATIVO-D1212-08_a_ficha_tecnica_da_casa.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território E SE…? (pesquisa da Skill Mestre) · PUSH. Modelo: **Terceiro modelo — Planta técnica**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Portugal, Decreto-Lei 68/2004 (Diário da República): Ficha Técnica da Habitação para habitações construídas, reconstruídas ou ampliadas após março de 2004; o promotor elabora e entrega ao comprador; descreve características técnicas e funcionais.
- O Decreto-Lei 10/2024 deixou de exigir a ficha na escritura; o vídeo não fala de escritura.
- A fala sobre o Brasil ('costumam aparecer só depois da visita') é observação de rotina, sem número.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1212-08/narration_source.wav`.
- Narração 36,1 s · 158 palavras/min · ASR 0,984 (94/95). Vídeo 38,4 s.
- **Pontos para ouvir:**
  - 'dois mil e quatro' e 'Habitação'.

## Som
- Trilha **T03** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção b em 16.54 s (alvo 16.12 s); insight → seção drop em 20.54 s (alvo 21.32 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.989 × mixagem 0.989 (queda 0.0 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.24 LUFS, TP -1.96 dBTP, LRA 3.60; narração -19.28 · trilha -25.93 · efeitos -40.76 LUFS; 19 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 38.44 s (timeline 38.43 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.26 LUFS · True peak ≤ -1 dBTP: -1.56 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 20.45 MB.
- `editorial_check` 0 erro (avisos revisados) (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia: as linhas da ficha encostavam no título 'FICHA TÉCNICA' → descidas para a parte de baixo do cômodo.
- Inteligibilidade: queda de 0,0 ponto com T03.
- motion_check 14,1% parados, maior trecho 2,0 s; sistema_visual dos quadros 0 erro / 0 aviso.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — E SE A CASA TIVESSE FICHA TÉCNICA?: a planta (sala, cozinha, quarto) e uma ficha em branco; IGUAL CARRO?
2. EM PORTUGAL, JÁ TEM — PORTUGAL · DESDE 2004; FICHA TÉCNICA DA HABITAÇÃO; selo DECRETO-LEI 68/2004.
3. A CONSTRUÇÃO NO PAPEL — ÁREAS, MATERIAIS, INSTALAÇÕES acendem; a rota leva a ficha ao COMPRADOR.
4. AQUI, DEPOIS DA VISITA — BRASIL · A MESMA CASA; as linhas ficam em branco; chamada SÓ DEPOIS DA VISITA.
5. Mergulho na ficha → MONTE A SUA: METRAGEM DE CADA CÔMODO, ANO DA CONSTRUÇÃO, REFORMAS FEITAS, DOCUMENTAÇÃO EM ORDEM.
6. O QUE TEM DENTRO DA PAREDE — cota A VISITA MOSTRA A PAREDE → A FICHA MOSTRA O QUE TEM DENTRO.
7. Fecho — CtaPlanta com os cômodos do sistema, campo SISTEMA e logo.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1212-08 --source episodes/ATIVO-D1212-08/narration_source.wav && python3 tools/build_audio.py ATIVO-D1212-08 && bash tools/render_episode.sh ATIVO-D1212-08
```
