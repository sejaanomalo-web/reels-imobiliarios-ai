# QA — ATIVO-D1209-15 · "Imagine que deu errado" (Esteira Editorial Diária · grade 09/12/2026 15h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-09/ATIVO-D1209-15_imagine_que_deu_errado.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território IDEIA QUE MUDA O JOGO (pesquisa da Skill Mestre) · PULL. Modelo: **Segundo modelo — Pictograma cinematográfico**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Gary Klein, 'Performing a Project Premortem', Harvard Business Review, setembro de 2007: o método do pré-mortem.
- Klein cita Mitchell, Russo & Pennington (1989, Journal of Behavioral Decision Making 2:25–38): a 'retrospectiva prospectiva' aumentou em 30% a capacidade de identificar corretamente os motivos. Base de evidência pequena; a fala atribui o número ao estudo citado por ele (selo 'ESTUDO DE 1989 CITADO POR KLEIN · HBR · 2007').

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1209-15/narration_source.wav`.
- Narração 43,0 s · 142 palavras/min · ASR 0,970 (98/102). Vídeo 45,3 s.
- **Pontos para ouvir:**
  - 'trinta por cento' e 'distrato'.

## Som
- Trilha **T04** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção b em 19.636 s (alvo 20.6 s); insight → seção a2 em 30.545 s (alvo 30.6 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.961 × mixagem 0.941 (queda 2.0 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.15 LUFS, TP -1.94 dBTP, LRA 2.90; narração -18.86 · trilha -28.54 · efeitos -39.09 LUFS; 19 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 45.31 s (timeline 45.30 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.17 LUFS · True peak ≤ -1 dBTP: -1.69 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 16.53 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia: o selo do estudo cobria o título, as três pílulas de objeção se sobrepunham e a pílula de +30% encostava no boneco → selo e lupa mais baixos, pílulas espaçadas (24 px), boneco do 1º ato menor.
- motion_check 61,1% parados (pictograma lento por design), maior trecho 0,8 s; sistema_visual_check --quadros 0 erro, 0 aviso.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — IMAGINE QUE DEU ERRADO: a casa e o X vermelho na palavra 'errado'.
2. O MÉTODO DO PRÉ-MORTEM — a lâmpada (o psicólogo), o projeto, ANTES DE COMEÇAR, IMAGINA QUE FRACASSOU · POR QUÊ?
3. UM ESTUDO, VER ANTES — a lupa acende: +30% NA IDENTIFICAÇÃO DOS MOTIVOS.
4. NA VISITA, PERGUNTE — 'IMAGINE: DAQUI A 1 ANO…' (o relógio corre) '…VOCÊ SE ARREPENDEU. POR QUÊ?'
5. O QUE ELE SÓ DIRIA DEPOIS — BARULHO, ESCOLA LONGE, CONDOMÍNIO CARO acendem: AGORA, E NÃO DEPOIS.
6. ANTES É PERGUNTA, DEPOIS, DISTRATO — ANTES: PERGUNTA × DEPOIS: DISTRATO; CtaNoir.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1209-15 --source episodes/ATIVO-D1209-15/narration_source.wav && python3 tools/build_audio.py ATIVO-D1209-15 && bash tools/render_episode.sh ATIVO-D1209-15
```
