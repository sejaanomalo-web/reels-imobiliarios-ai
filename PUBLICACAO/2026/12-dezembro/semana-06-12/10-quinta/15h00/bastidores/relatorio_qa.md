# QA — ATIVO-D1210-15 · "Termine no melhor cômodo" (Esteira Editorial Diária · grade 10/12/2026 15h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-10/ATIVO-D1210-15_termine_no_melhor_comodo.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território IDEIA QUE MUDA O JOGO (pesquisa da Skill Mestre) · PULL. Modelo: **Segundo modelo — Pictograma cinematográfico**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Redelmeier & Kahneman (1996), Pain: a avaliação retrospectiva de exames desconfortáveis acompanhou o pior momento e o final, com pouca influência da duração (regra do pico-fim).
- Redelmeier, Katz & Kahneman (2003): ensaio randomizado com 682 pacientes. O vídeo diz 'um exame médico' e aplica a regra à visita por analogia ('é parecido'), sem afirmar estudo com visitas; selo 'REDELMEIER & KAHNEMAN · 1996'.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1210-15/narration_source.wav`.
- Narração 34,0 s · 152 palavras/min · ASR 0,948 (82/86). Vídeo 36,3 s.
- **Pontos para ouvir:**
  - 'minuto a minuto' e 'lembrado'.

## Som
- Trilha **T02** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção frase3 em None s (alvo 15.32 s); insight → seção climax em 23.89 s (alvo 19.911 s); resolucao → seção resolucao em None s (alvo 27.569 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.942 × mixagem 0.965 (queda -2.3 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.24 LUFS, TP -1.96 dBTP, LRA 2.90; narração -18.99 · trilha -30.19 · efeitos -38.88 LUFS; 19 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 36.31 s (timeline 36.30 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.26 LUFS · True peak ≤ -1 dBTP: -1.75 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 13.53 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia: o selo da fonte e a pílula O PIOR MOMENTO encostavam no título → selo abaixo do chão, pílula ao lado do pico.
- motion_check 58,6% parados (pictograma lento por design), maior trecho 2,5 s; sistema_visual_check --quadros 0 erro, 0 aviso.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — SÓ DOIS MOMENTOS: uma linha com dois pontos que acendem.
2. UM EXAME, MINUTO A MINUTO — a curva do incômodo se desenha; o relógio.
3. A LEMBRANÇA: PICO E FIM — o ponto vermelho O PIOR MOMENTO, o verde O FINAL; o meio apaga (DURAÇÃO: QUASE NADA).
4. NA VISITA: PICO E FIM — O PONTO ALTO / O FIM.
5. PLANEJE A ROTA, TERMINE NO MELHOR — o caminho pelos cômodos termina na lâmpada acesa: A VARANDA, A VISTA, A COZINHA CLARA.
6. QUEM TERMINA BEM É LEMBRADO — o boneco de braços abertos; CtaNoir.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1210-15 --source episodes/ATIVO-D1210-15/narration_source.wav && python3 tools/build_audio.py ATIVO-D1210-15 && bash tools/render_episode.sh ATIVO-D1210-15
```
