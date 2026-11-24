# QA — ATIVO-D1130-21 · "A casa que ninguém conseguiu comprar" (Esteira Editorial Diária · grade 30/11/2026 21h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-11-30/ATIVO-D1130-21_a_casa_que_ninguem_comprou.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território HISTÓRIA QUE ENSINA (pesquisa da Skill Mestre) · PUSH. Modelo: **Segundo modelo — Pictograma cinematográfico**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Wikipedia (Edith Macefield), HistoryLink ("A House Is Your Home"), Seattle Weekly (2008), Cascade PBS (2015), KUOW (2015): Edith Macefield (1921–2008), Ballard, Seattle; recusou em 2006 ofertas que chegaram a cerca de US$ 1 milhão (relatos de US$ 750 mil a 1 milhão, com extras) para um empreendimento comercial construído em volta da casa.
- Barry Martin, superintendente da obra, tornou-se amigo, levava compras e a acompanhava a consultas; ela deixou a casa para ele no testamento; morreu em junho de 2008, aos 86 anos.
- A ligação com o filme Up (lenda/inspiração parcial) não foi usada. Pictogramas originais; nenhuma foto da casa ou de pessoas reais. A lição é interpretação.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1130-21/narration_source.wav`.
- Narração 52,8 s · 151 palavras/min · ASR 0,977 (130/133). Vídeo 55,1 s.
- **Pontos para ouvir:**
  - "Macefield" com pronúncia do episódio ("Mêicefild"); o reconhecedor ouviu "Mainsfield" — conferir na escuta.
  - Primeira geração recusada por limite por minuto da API (429); a segunda saiu com ASR 0,977.

## Som
- Trilha **T02** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção frase3 em 22.12 s (alvo 25.08 s); descoberta → seção crescendo em None s (alvo 36.44 s); insight → seção climax em 34.8 s (alvo 47.08 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.97 × mixagem 0.97 (queda 0.0 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.08 LUFS, TP -1.96 dBTP, LRA 3.40; narração -19.62 · trilha -30.79 · efeitos -39.38 LUFS; 27 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 55.10 s (timeline 55.10 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.09 LUFS · True peak ≤ -1 dBTP: -1.80 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 17.34 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia: o zoom na janela estourava o telhado sob o título → zoom menor (2,0×) e casa abaixo do título; a poltrona desenhada ficava grande demais para a janela → removida.
- Final 1: o título A DONA DISSE NÃO entrava atrasado (em "E o prédio") → entra no "não" e a pílula NÃO saiu (render 2).
- `sistema_visual_check --quadros` 0 erro / 0 aviso; `motion_check` movimento médio 1,24 (Pictograma é lento por natureza), maior trecho parado 1,0 s.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — a casinha acesa sozinha (≈ US$ 1 MILHÃO); A DONA DISSE NÃO; os paredões sobem em volta.
2. Retrato — zoom na janela: SEATTLE · 2006, EDITH MACEFIELD · 84 ANOS (pictograma sentado).
3. Ofertas — CONSTRUTORA; envelopes cada vez maiores chegam à porta (OFERTA ↑) e se desfazem: RECUSOU TODAS.
4. Cerco — a obra fecha os lados, guindaste; CERCADA DE CONCRETO; a casa continua acesa.
5. Virada — apagar a luz com âncora na porta; o CHEFE DA OBRA · BARRY MARTIN chega; sacola de compras, médico, CUIDAVA DELA.
6. Herança — 2008; Edith sai de cena devagar; a chave passa de uma mão para a outra e ele acende: A CASA FICOU PARA ELE.
7. Desfecho — a casinha entre os prédios: NINGUÉM CONSEGUIU COMPRAR · FICOU COM QUEM NUNCA TENTOU; NÃO É SOBRE DINHEIRO → É SOBRE CONFIANÇA.
8. CTA curta — CtaNoir (logo por partículas).

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1130-21 --source episodes/ATIVO-D1130-21/narration_source.wav && python3 tools/build_audio.py ATIVO-D1130-21 && bash tools/render_episode.sh ATIVO-D1130-21
```
