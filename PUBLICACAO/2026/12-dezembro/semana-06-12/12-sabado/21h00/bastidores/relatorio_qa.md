# QA — ATIVO-D1212-21 · "O inquilino e a visita" (Esteira Editorial Diária · grade 12/12/2026 21h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-12/ATIVO-D1212-21_o_inquilino_e_a_visita.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território CORRETOR NA VIDA REAL (pesquisa da Skill Mestre) · PUSH. Modelo: **Segundo modelo — Pictograma cinematográfico**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Lei 8.245/1991 (Lei do Inquilinato), art. 23, IX: o locatário deve permitir a vistoria pelo locador ou mandatário, mediante combinação prévia de dia e hora, e admitir que o imóvel seja visitado e examinado por terceiros na hipótese do art. 27 (venda, com direito de preferência do inquilino).
- O vídeo não fala em prazo de aviso (24 h etc.), que não está no texto da lei.
- A legenda do Instagram lembra o direito de preferência do inquilino (art. 27).

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1212-21/narration_source.wav`.
- Narração 28,8 s · 184 palavras/min · ASR 0,989 (87/88). Vídeo 31,1 s.
- **Pontos para ouvir:**
  - 'Inquilinato' e 'antecedência'.

## Som
- Trilha **T01** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção cama2 em 13.0 s (alvo 13.0 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.955 × mixagem 0.966 (queda -1.1 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.08 LUFS, TP -1.95 dBTP, LRA 3.70; narração -17.59 · trilha -24.75 · efeitos -39.04 LUFS; 18 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 31.10 s (timeline 31.10 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.09 LUFS · True peak ≤ -1 dBTP: -1.76 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 11.34 MB.
- `editorial_check` 0 erro (avisos revisados) (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia: o selo da lei encostava no título → pílulas 30 px abaixo.
- Inteligibilidade: melhora de 1,1 ponto com T01 (queda negativa).
- motion_check 50,6% parados (pictograma lento por design), maior trecho 1,0 s; sistema_visual dos quadros 0 erro / 0 aviso.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — O INQUILINO NÃO DEIXA?: a porta, o corretor e o comprador; IMÓVEL ALUGADO, À VENDA; 'NINGUÉM ENTRA' (o inquilino com o X vermelho).
2. A LEI DIZ QUE DEIXA — LEI 8.245/91 · ART. 23, IX / PRECISA PERMITIR A VISITA / DE QUEM QUER COMPRAR.
3. MAS COM DIA E HORA — o calendário verde: DIA E HORA COMBINADOS / SURPRESA NÃO VALE.
4. O JEITO DE PEDIR — A LEI DÁ O DIREITO / O JEITO DE PEDIR ABRE (a porta acende).
5. AGENDE POR ESCRITO — POR ESCRITO / COM ANTECEDÊNCIA / NO HORÁRIO ACEITO.
6. AVISADO, ABRE A PORTA — a porta abre em verde; DE BOA VONTADE.
7. Fecho — CtaNoir: campo SISTEMA, módulos e logo por partículas.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1212-21 --source episodes/ATIVO-D1212-21/narration_source.wav && python3 tools/build_audio.py ATIVO-D1212-21 && bash tools/render_episode.sh ATIVO-D1212-21
```
