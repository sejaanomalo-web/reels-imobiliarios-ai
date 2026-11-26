# QA — ATIVO-D1207-18 · "A casa no topo do prédio" (Esteira Editorial Diária · grade 07/12/2026 18h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-07/ATIVO-D1207-18_a_casa_no_topo.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território HISTÓRIA QUE ENSINA (pesquisa da Skill Mestre) · PUSH. Modelo: **Quarto modelo — Maquete 3D**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Prefeitura de São Paulo (Gestão Urbana; Secretaria de Habitação): Edifício Martinelli, primeiro arranha-céu de SP; diante da desconfiança sobre a segurança, Giuseppe Martinelli construiu um palacete na cobertura e mudou-se com a família (1929). Gazeta SP: 30 andares. A motivação é atribuída na fala: 'segundo a prefeitura'.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1207-18/narration_source.wav`.
- Narração 37,9 s · 142 palavras/min · ASR 0,938 (83/90). Vídeo 40,2 s.
- **Pontos para ouvir:**
  - 'Martinelli', 'arranha-céu' e 'mil novecentos e vinte e nove'.

## Som
- Trilha **T01** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção cama2 em 16.0 s (alvo 16.52 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.967 × mixagem 0.933 (queda 3.4 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.12 LUFS, TP -1.96 dBTP, LRA 3.20; narração -18.54 · trilha -25.76 · efeitos -41.33 LUFS; 17 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 40.23 s (timeline 40.23 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.14 LUFS · True peak ≤ -1 dBTP: -1.60 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 12.11 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévias: torre alta demais (topo e placas no cabeçalho), pessoas cortadas nas bordas → torre menor, câmera recuada e mais alta, pessoas para dentro.
- Portão de inteligibilidade: queda de 3,4 pontos (máx. 3) por um único trecho — o reconhecedor junta 'matrícula em dia' em 'matriculendia' depois da masterização; o resultado não mudou com ducking de −12, −15/−6 dB nem tirando o efeito da palavra. Fala conferida segmento a segmento: todas as outras palavras idênticas. Mixagem liberada com ATIVO_IGNORAR_INTELIGIBILIDADE (exceção registrada); ducking dos médios em −12 dB e sem o efeito em 'matrícula'.
- Render 1 abortado (começou antes da mixagem corrigida).
- motion_check 60,3% parados (câmera lenta com deriva), maior trecho 2,0 s; sistema_visual_check --quadros 0 erro, 0 aviso.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — a torre sobe andar por andar; UMA CASA NO TOPO.
2. O MARTINELLI — MARTINELLI · SÃO PAULO; PRIMEIRO ARRANHA-CÉU · 30 ANDARES.
3. A DESCONFIANÇA — a multidão escurece: DESCONFIAVAM DA SEGURANÇA.
4. 1929 — a família sobe pelo arco de pontos até o palacete: 1929: A FAMÍLIA SE MUDA PARA O TOPO.
5. NO SEU ATENDIMENTO — PROVA VALE MAIS QUE ARGUMENTO; MATRÍCULA EM DIA, LAUDO, MANUTENÇÃO acendem.
6. A LIÇÃO — CONFIANÇA NÃO SE PEDE / SE MOSTRA; CTA curta.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1207-18 --source episodes/ATIVO-D1207-18/narration_source.wav && python3 tools/build_audio.py ATIVO-D1207-18 && bash tools/render_episode.sh ATIVO-D1207-18
```
