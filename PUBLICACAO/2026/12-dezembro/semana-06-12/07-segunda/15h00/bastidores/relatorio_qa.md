# QA — ATIVO-D1207-15 · "Por que agora?" (Esteira Editorial Diária · grade 07/12/2026 15h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-07/ATIVO-D1207-15_por_que_agora.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território IDEIA QUE MUDA O JOGO (pesquisa da Skill Mestre) · PULL. Modelo: **Segundo modelo — Pictograma cinematográfico**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Tese por raciocínio de prática profissional; sem estatística.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1207-15/narration_source.wav`.
- Narração 32,5 s · 149 palavras/min · ASR 0,963 (78/81). Vídeo 34,9 s.
- **Pontos para ouvir:**
  - Ritmo 149 palavras/min (mais calmo); a pergunta final.

## Som
- Trilha **T02** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção frase3 em None s (alvo 17.32 s); insight → seção climax em 22.12 s (alvo 20.92 s); resolucao → seção resolucao em None s (alvo 26.68 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.963 × mixagem 0.951 (queda 1.2 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.17 LUFS, TP -1.97 dBTP, LRA 3.50; narração -18.83 · trilha -29.85 · efeitos -38.56 LUFS; 17 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 34.88 s (timeline 34.87 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.20 LUFS · True peak ≤ -1 dBTP: -1.74 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 12.57 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia: as três pílulas de eventos encostavam (e estavam em 22 px) → 24 px e alturas alternadas.
- motion_check 58,6% parados (normal do pictograma noir), maior trecho 1,5 s; sistema_visual_check --quadros 0 erro, 0 aviso; logo oficial no último quadro.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — DUAS PALAVRAS: POR QUE AGORA? (figura com o celular).
2. MESES PROCURANDO E, DE REPENTE… — HÁ MESES OLHANDO ANÚNCIOS → DE REPENTE: ESTA SEMANA (calendário acende).
3. ALGUMA COISA MUDOU — FILHO A CAMINHO, EMPREGO NOVO, FIM DO ALUGUEL.
4. O MOTIVO DO AGORA MOSTRA — O PRAZO, O QUE PESA, QUEM DECIDE.
5. O QUE FEZ VOCÊ PROCURAR AGORA? — COM NATURALIDADE; a figura acende verde.
6. Desfecho — QUEM ENTENDE O AGORA ATENDE NO TEMPO CERTO; CTA com o logo montado por partículas.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1207-15 --source episodes/ATIVO-D1207-15/narration_source.wav && python3 tools/build_audio.py ATIVO-D1207-15 && bash tools/render_episode.sh ATIVO-D1207-15
```
