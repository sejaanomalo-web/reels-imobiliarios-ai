# QA — ATIVO-D1206-15 · "O horário da rotina" (Esteira Editorial Diária · grade 06/12/2026 15h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-06/ATIVO-D1206-15_o_horario_da_rotina.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território IDEIA QUE MUDA O JOGO (pesquisa da Skill Mestre) · PULL. Modelo: **Segundo modelo — Pictograma cinematográfico**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Tese por raciocínio de prática profissional; sem estatística.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1206-15/narration_source.wav`.
- Narração 33,0 s · 184 palavras/min · ASR 0,960 (97/101). Vídeo 35,4 s.
- **Pontos para ouvir:**
  - Ritmo 184 palavras/min; 'dez da manhã' × 'seis da tarde'.

## Som
- Trilha **T02** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção frase3 em None s (alvo 14.76 s); insight → seção climax em 23.89 s (alvo 21.8 s); resolucao → seção resolucao em None s (alvo 26.92 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.941 × mixagem 0.941 (queda 0.0 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.08 LUFS, TP -1.95 dBTP, LRA 3.00; narração -18.27 · trilha -29.39 · efeitos -38.51 LUFS; 17 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 35.37 s (timeline 35.37 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.10 LUFS · True peak ≤ -1 dBTP: -1.61 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 13.74 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia: os nós do caminho apareciam antes da fala → caminho só surge no 'trajeto'.
- motion_check 47,9% parados (normal do pictograma noir), maior trecho 0,8 s; sistema_visual_check --quadros 0 erro, 0 aviso; logo oficial conferido no último quadro.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — 10H E 18H NÃO SÃO O MESMO IMÓVEL: relógio acelera; figura sob o holofote entre duas casas.
2. ÀS 10H — RUA CALMA, SOL NA SALA (halo de sol).
3. ÀS 18H — luz quente, TRÂNSITO, ESCOLA, VAGA (ícones vermelhos).
4. ELE NÃO MORA NA VISITA, MORA NA ROTINA — HORÁRIO DA VISITA × HORÁRIO DA ROTINA.
5. PERGUNTE O HORÁRIO — A QUE HORAS SAI E VOLTA?, VISITE NESSE HORÁRIO, OU FAÇA O TRAJETO (caminho verde).
6. Desfecho — A ROTINA ANTES, SEM SURPRESA DEPOIS; CTA curta com o logo montado por partículas.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1206-15 --source episodes/ATIVO-D1206-15/narration_source.wav && python3 tools/build_audio.py ATIVO-D1206-15 && bash tools/render_episode.sh ATIVO-D1206-15
```
