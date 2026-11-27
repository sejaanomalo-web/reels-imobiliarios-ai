# QA — ATIVO-D1211-12 · "Noventa ou dez" (Esteira Editorial Diária · grade 11/12/2026 12h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-11/ATIVO-D1211-12_noventa_ou_dez.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território FORA DA BOLHA (pesquisa da Skill Mestre) · PUSH. Modelo: **Terceiro modelo — Planta técnica**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- McNeil, Pauker, Sox & Tversky (1982), 'On the elicitation of preferences for alternative therapies', NEJM 306(21):1259–62: com os mesmos dados apresentados como chance de sobreviver, mais pessoas escolheram a cirurgia do que com os dados como chance de morrer (médicos, pacientes e estudantes).
- O vídeo mostra só a direção do efeito (MAIS × MENOS), sem os percentuais de escolha.
- '90% / 10%' do gancho é exemplo didático de enquadramento, não dado do estudo.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1211-12/narration_source.wav`.
- Narração 33,8 s · 176 palavras/min · ASR 0,948 (92/99). Vídeo 36,2 s.
- **Pontos para ouvir:**
  - 'mil novecentos e oitenta e dois' e 'sobreviver'.

## Som
- Trilha **T01** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção cama2 em 19.0 s (alvo 19.16 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.929 × mixagem 0.929 (queda 0.0 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.00 LUFS, TP -1.96 dBTP, LRA 2.80; narração -17.38 · trilha -24.82 · efeitos -40.77 LUFS; 18 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 36.18 s (timeline 36.17 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.01 LUFS · True peak ≤ -1 dBTP: -1.53 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 19.3 MB.
- `editorial_check` 0 erro (avisos revisados) (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- editorial_check pediu a transição de folha por mergulho (não crossfade) → o cômodo 90% vira a proposta.
- Prévia: metade de baixo da prancha vazia até 14 s, cota sobre os cômodos e chamada cobrindo as barras → cômodos maiores, cota abaixo, chamada no topo.
- Inteligibilidade: queda de 0,0 ponto com T01.
- motion_check 16,6% parados, maior trecho 2,0 s; sistema_visual dos quadros 0 erro / 0 aviso.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — 90% OU 10%?: dois cômodos com o mesmo dado, 90% DÁ CERTO × 10% DÁ ERRADO; QUAL PARECE MELHOR?
2. 1982 · O MESMO TRATAMENTO — selo MCNEIL, PAUKER, SOX & TVERSKY · 1982; O MESMO TRATAMENTO · DOIS JEITOS.
3. SOBREVIVER × MORRER — a barra de quem escolheu a cirurgia: MAIS ('sobreviver') × MENOS ('morrer').
4. MUDOU SÓ O JEITO DE DIZER — chamada O NÚMERO ERA O MESMO.
5. Mergulho no cômodo 90% → a proposta: O QUE VOCÊ GANHA (aceso) / E O RESTO, À VISTA; MOSTRE O GANHO.
6. A FRASE DECIDE — cota O NÚMERO INFORMA · A FRASE DECIDE.
7. Fecho — CtaPlanta com os cômodos do sistema, campo SISTEMA e logo.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1211-12 --source episodes/ATIVO-D1211-12/narration_source.wav && python3 tools/build_audio.py ATIVO-D1211-12 && bash tools/render_episode.sh ATIVO-D1211-12
```
