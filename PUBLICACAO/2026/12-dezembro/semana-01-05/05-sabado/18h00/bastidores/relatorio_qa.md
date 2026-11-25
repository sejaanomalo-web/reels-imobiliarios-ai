# QA — ATIVO-D1205-18 · "A terceira opção" (Esteira Editorial Diária · grade 05/12/2026 18h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-05/ATIVO-D1205-18_a_terceira_opcao.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território FORA DA BOLHA (pesquisa da Skill Mestre) · PUSH. Modelo: **Terceiro modelo — Planta técnica**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Dan Ariely, 'Previsivelmente Irracional' (2008): experimento de assinatura com cerca de 100 estudantes — só digital US$ 59 × impressa + digital US$ 125 → maioria no digital (~68%); com a opção só impressa por US$ 125, ~84% escolheram a combinada e ninguém a só impressa. Nome da revista omitido (marca de terceiros); selo 'EXPERIMENTO DESCRITO POR DAN ARIELY · ~100 ESTUDANTES'.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1205-18/narration_source.wav`.
- Narração 41,5 s · 148 palavras/min · ASR 0,971 (99/102). Vídeo 43,8 s.
- **Pontos para ouvir:**
  - '59 dólares', '125' e '84%'.

## Som
- Trilha **T01** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção cama2 em 16.5 s (alvo 16.36 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.951 × mixagem 0.961 (queda -1.0 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -14.98 LUFS, TP -1.96 dBTP, LRA 2.40; narração -18.71 · trilha -26.18 · efeitos -40.77 LUFS; 17 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 43.82 s (timeline 43.80 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -14.99 LUFS · True peak ≤ -1 dBTP: -1.85 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 23.44 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia: componentes da prancha apareciam tarde → antecipados para cair na palavra; textos de dado em JetBrains Mono ≥ 24 px.
- Integridade: a referência é 'honesta' (nada de imóvel-isca inventado); motion_check 14,6% parados, maior trecho 2,0 s; sistema_visual_check --quadros 0 erro, 0 aviso.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — A OPÇÃO QUE NINGUÉM ESCOLHEU: três cômodos, OPÇÃO B com 0%.
2. DUAS OPÇÕES: A MAIORIA NO DIGITAL — US$ 59 × US$ 125.
3. TRÊS OPÇÕES: 84% NA COMBINADA — a opção só impressa (NINGUÉM ESCOLHEU) muda a escolha.
4. A COMPARAÇÃO MUDA O VALOR — na sua apresentação, imóveis em grupos que façam sentido, LADO A LADO.
5. Desfecho — E O CLIENTE VÊ O CERTO: imóvel de REFERÊNCIA HONESTA do lado.
6. CTA curta — prancha do sistema (IMÓVEIS, LEADS, ATENDIMENTOS), campo SISTEMA, logo.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1205-18 --source episodes/ATIVO-D1205-18/narration_source.wav && python3 tools/build_audio.py ATIVO-D1205-18 && bash tools/render_episode.sh ATIVO-D1205-18
```
