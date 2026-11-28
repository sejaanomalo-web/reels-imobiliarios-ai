# QA — ATIVO-D1216-08 · "O que o comprador pergunta" (Esteira Editorial Diária · grade 16/12/2026 08h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-16/ATIVO-D1216-08_o_que_o_comprador_pergunta.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território E SE…? (pesquisa da Skill Mestre) · PUSH. Modelo: **Segundo modelo — Pictograma cinematográfico**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Califórnia, Civil Code §1710.2: não é obrigatório informar morte de ocupante ocorrida há mais de três anos antes da oferta; as dos últimos três anos podem ser fato relevante; diante de pergunta direta, não se pode mentir (Justia/FindLaw; C.A.R.).
- Brasil: sem regra equivalente; a legenda cita o CC art. 147 (silêncio intencional como omissão dolosa). Tom respeitoso; nenhuma imagem de morte.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1216-08/narration_source.wav`.
- Narração 30,4 s · 162 palavras/min · ASR 0,976 (80/82). Vídeo 32,7 s.
- **Pontos para ouvir:**
  - 'Califórnia' e 'proprietário'.

## Som
- Trilha **T04** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção b em 15.273 s (alvo 17.96 s); insight → seção a2 em 19.636 s (alvo 19.16 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.963 × mixagem 0.963 (queda 0.0 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.12 LUFS, TP -1.94 dBTP, LRA 2.80; narração -18.24 · trilha -27.23 · efeitos -38.73 LUFS; 16 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 32.70 s (timeline 32.70 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.14 LUFS · True peak ≤ -1 dBTP: -1.32 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 11.59 MB.
- `editorial_check` 0 erro (avisos revisados) (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia 1: pílulas encostavam nos títulos e PROPRIETÁRIO cruzava a pílula central → reposicionadas.
- Ressalva menor: duas pílulas encostam no topo do ícone da casa; texto legível.
- Inteligibilidade: queda de 0,0 ponto com T04.
- motion_check 55,5% parados (noir lento), maior trecho 1,0 s.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — E SE VOCÊ TIVESSE QUE CONTAR?: a casa em linha fina perde a luz.
2. NA CALIFÓRNIA, TRÊS ANOS — o calendário; MORTE NOS ÚLTIMOS 3 ANOS / PODE TER QUE SER INFORMADA.
3. PERGUNTOU? A VERDADE — o comprador pergunta: PERGUNTA DIRETA / NINGUÉM PODE MENTIR / NEM SOBRE O QUE FOI ANTES.
4. RESPOSTA VERDADEIRA.
5. PERGUNTE ANTES — ANTES DE ANUNCIAR; o corretor e o PROPRIETÁRIO; ALGO QUE O COMPRADOR / GOSTARIA DE SABER?.
6. QUEM DESCOBRE DEPOIS NÃO CONFIA — DESCOBRIR DEPOIS → CONFIANÇA VEM ANTES; a casa acende.
7. Fecho — CtaNoir: campo SISTEMA, módulos e logo por partículas.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1216-08 --source episodes/ATIVO-D1216-08/narration_source.wav && python3 tools/build_audio.py ATIVO-D1216-08 && bash tools/render_episode.sh ATIVO-D1216-08
```
