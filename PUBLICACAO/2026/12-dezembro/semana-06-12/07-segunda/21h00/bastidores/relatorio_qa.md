# QA — ATIVO-D1207-21 · "O novo começo" (Esteira Editorial Diária · grade 07/12/2026 21h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-07/ATIVO-D1207-21_o_novo_comeco.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território FORA DA BOLHA (pesquisa da Skill Mestre) · PUSH. Modelo: **Segundo modelo — Pictograma cinematográfico**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Dai, Milkman & Riis (2014), Management Science, 'The Fresh Start Effect': buscas no Google por 'dieta' sobem no início da semana, do mês e do ano; idas à academia universitária aumentam após datas marcantes (início de semana/mês/semestre, aniversários). Números não usados.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1207-21/narration_source.wav`.
- Narração 36,0 s · 163 palavras/min · ASR 0,964 (94/98). Vídeo 38,3 s.
- **Pontos para ouvir:**
  - 'dois mil e quatorze' e 'segunda-feira'.

## Som
- Trilha **T04** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção b em 17.455 s (alvo 16.84 s); insight → seção a2 em 21.818 s (alvo 21.88 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.99 × mixagem 0.98 (queda 1.0 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.11 LUFS, TP -1.94 dBTP, LRA 2.60; narração -18.69 · trilha -28.01 · efeitos -39.08 LUFS; 19 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 38.31 s (timeline 38.30 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.13 LUFS · True peak ≤ -1 dBTP: -1.73 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 13.67 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia: pílulas 'começo da semana/do mês' sobrepostas (e 'COMEÇO DO SEMANA' com artigo errado) → textos corrigidos e alturas alternadas; títulos e figuras sobrepostos no fim → a cena anterior sai antes.
- motion_check 58,1% parados (normal do pictograma noir), maior trecho 1,2 s; sistema_visual_check --quadros 0 erro, 0 aviso.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — POR QUE SEGUNDA-FEIRA? (calendário acende).
2. 2014 · PESQUISA — OS COMEÇOS: BUSCAS POR DIETA SOBEM no COMEÇO DA SEMANA, DO MÊS, DO ANO.
3. DEPOIS DE DATAS MARCANTES — ACADEMIA, ANIVERSÁRIOS.
4. AS DATAS VIRAM UM RECOMEÇO — o caminho acende: O PLANO ADIADO GANHA UMA NOVA CHANCE.
5. AQUELE LEAD QUE ESFRIOU? — RETOME NUM MARCO: COMEÇO DO MÊS, VIRADA DO ANO, FIM DO ALUGUEL.
6. Desfecho — NÃO É OUTRO IMÓVEL / É UM NOVO COMEÇO; CTA com o logo montado por partículas.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1207-21 --source episodes/ATIVO-D1207-21/narration_source.wav && python3 tools/build_audio.py ATIVO-D1207-21 && bash tools/render_episode.sh ATIVO-D1207-21
```
