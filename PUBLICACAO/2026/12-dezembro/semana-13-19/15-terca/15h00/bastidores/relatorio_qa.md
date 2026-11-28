# QA — ATIVO-D1215-15 · "O que observar na visita" (Esteira Editorial Diária · grade 15/12/2026 15h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-15/ATIVO-D1215-15_o_que_observar_na_visita.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território IDEIA QUE MUDA O JOGO (pesquisa da Skill Mestre) · PULL. Modelo: **Segundo modelo — Pictograma cinematográfico**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Situação de rotina, sem estatística; personagens ilustrativos.
- Os três pontos são exemplos; a legenda diz para adaptar ao que o cliente contou.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1215-15/narration_source.wav`.
- Narração 29,9 s · 162 palavras/min · ASR 0,994 (81/81). Vídeo 32,3 s.
- **Pontos para ouvir:**
  - 'véspera' e 'critério'.

## Som
- Trilha **T02** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção frase3 em None s (alvo 12.92 s); insight → seção climax em 11.04 s (alvo 14.2 s); resolucao → seção resolucao em 19.4 s (alvo 24.44 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.988 × mixagem 1.0 (queda -1.2 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.10 LUFS, TP -1.96 dBTP, LRA 3.10; narração -18.00 · trilha -27.65 · efeitos -38.52 LUFS; 17 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 32.28 s (timeline 32.27 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.12 LUFS · True peak ≤ -1 dBTP: -1.77 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 12.05 MB.
- `editorial_check` 0 erro (avisos revisados) (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia 1 aprovada sem ajuste.
- Inteligibilidade: queda de −1,2 ponto com T02.
- motion_check 52,8% parados (noir lento), maior trecho 2,0 s.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — SÓ LEMBRAVA DA PAREDE: a parede acende; a luz, o barulho e o espaço ficam em segundo plano; SÓ A COR DA PAREDE.
2. SEM SABER O QUE OLHAR — O QUE CHAMA ATENÇÃO / O QUE IMPORTA: APAGADO.
3. VIRA GOSTO, NÃO CRITÉRIO.
4. A VISITA COMEÇA ANTES.
5. NA VÉSPERA, TRÊS PONTOS — o corretor no celular; 1 · A LUZ DA SALA / 2 · O BARULHO DA RUA / 3 · O ESPAÇO DA COZINHA, cada um acende o seu ícone na palavra.
6. O IMÓVEL CERTO — halo verde; o cliente comemora.
7. Fecho — CtaNoir: campo SISTEMA, módulos e logo por partículas.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1215-15 --source episodes/ATIVO-D1215-15/narration_source.wav && python3 tools/build_audio.py ATIVO-D1215-15 && bash tools/render_episode.sh ATIVO-D1215-15
```
