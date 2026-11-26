# QA — ATIVO-D1207-08 · "Data de validade" (Esteira Editorial Diária · grade 07/12/2026 08h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-07/ATIVO-D1207-08_data_de_validade.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território E SE…? (pesquisa da Skill Mestre) · PUSH. Modelo: **Quarto modelo — Maquete 3D**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- HDB Key Statistics FY2025: 75,7% dos residentes de Singapura vivem em apartamentos do HDB (a fala arredonda para 'três em cada quatro'); contrato de 99 anos; ao fim, o imóvel volta ao HDB/Estado (nenhum conjunto chegou ao fim do prazo ainda).
- Decreto-Lei 2.398/1987: na transferência onerosa de imóvel em terreno de marinha, laudêmio de 5% à União (base de cálculo varia; não citada). O roteiro não diz quem paga.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1207-08/narration_source.wav`.
- Narração 33,5 s · 177 palavras/min · ASR 0,948 (91/99). Vídeo 35,9 s.
- **Pontos para ouvir:**
  - 'Singapura', 'noventa e nove' e 'laudêmio'.

## Som
- Trilha **T04** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção b em 13.091 s (alvo 12.84 s); insight → seção a2 em 21.818 s (alvo 20.84 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.909 × mixagem 0.899 (queda 1.0 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.15 LUFS, TP -1.95 dBTP, LRA 1.70; narração -18.33 · trilha -27.57 · efeitos -40.77 LUFS; 18 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 35.88 s (timeline 35.87 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.17 LUFS · True peak ≤ -1 dBTP: -1.68 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 10.54 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Primeira prévia: prédios grandes (tanque e Estado fora do quadro), placa sobre o título, corretor cortado → prédios menores, Estado ao lado, câmera recuada, placas reposicionadas.
- motion_check 52,2% parados, maior trecho 2,1 s; sistema_visual_check --quadros 0 erro, 0 aviso.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — E SE…?: o prédio com DATA DE VALIDADE?
2. SINGAPURA — quatro prédios, três acendem: 3 EM CADA 4 MORADORES; APARTAMENTOS PÚBLICOS; tanque CONTRATO DE 99 ANOS.
3. QUANDO ACABA — o tanque esvazia (O PRAZO ACABA), o fluxo leva ao Estado: VOLTA PARA O ESTADO.
4. AQUI — AQUI NÃO É ASSIM; a casa no litoral com a faixa A PARTE DA UNIÃO.
5. TERRENO DE MARINHA — fluxo até a União: LAUDÊMIO DE 5% A CADA VENDA; o corretor com a matrícula: CONFIRA NA MATRÍCULA.
6. A LIÇÃO — ANTES DE ANUNCIAR, SEM SURPRESA NA ASSINATURA; CTA curta.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1207-08 --source episodes/ATIVO-D1207-08/narration_source.wav && python3 tools/build_audio.py ATIVO-D1207-08 && bash tools/render_episode.sh ATIVO-D1207-08
```
