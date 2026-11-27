# QA — ATIVO-D1213-21 · "A visita que não cabe no bolso" (Esteira Editorial Diária · grade 13/12/2026 21h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-13/ATIVO-D1213-21_a_visita_que_nao_cabe_no_bolso.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território CORRETOR NA VIDA REAL (pesquisa da Skill Mestre) · PUSH. Modelo: **Segundo modelo — Pictograma cinematográfico**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Situação de rotina, sem estatística; personagens ilustrativos.
- Não cita banco, taxa nem percentual de renda; diz só que a simulação (renda, entrada, parcela) vem antes da visita.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1213-21/narration_source.wav`.
- Narração 30,1 s · 158 palavras/min · ASR 0,994 (79/79). Vídeo 32,4 s.
- **Pontos para ouvir:**
  - 'simulação do financiamento' e 'orçamento'.

## Som
- Trilha **T04** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção b em 13.091 s (alvo 14.28 s); insight → seção a2 em 17.454 s (alvo 16.76 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 1.0 × mixagem 1.0 (queda 0.0 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.18 LUFS, TP -1.97 dBTP, LRA 2.80; narração -18.44 · trilha -28.46 · efeitos -38.86 LUFS; 16 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 32.41 s (timeline 32.40 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.19 LUFS · True peak ≤ -1 dBTP: -1.45 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 12.05 MB.
- `editorial_check` 0 erro (avisos revisados) (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia 1 aprovada sem ajuste: pílulas fora da faixa da legenda (y 1330), títulos em top 300.
- Inteligibilidade: queda de 0,0 ponto com T04.
- motion_check 58,8% parados (noir lento), maior trecho 1,2 s.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — AMOU O APARTAMENTO: a casa acende em verde e o cliente comemora.
2. NÃO COUBE NO BOLSO — a simulação aparece, a casa fica vermelha e o cliente cabisbaixo: A PARCELA NÃO COUBE.
3. E AGORA TUDO PARECE PIOR — as outras casas surgem apagadas.
4. SIMULAÇÃO ANTES DA VISITA — 1 · SIMULAÇÃO → 2 · VISITA, NÃO DEPOIS.
5. NO PRIMEIRO CONTATO — A RENDA / A ENTRADA / A PARCELA QUE CABE.
6. O IMÓVEL CERTO — só a casa que cabe acende: DENTRO DO ORÇAMENTO.
7. Fecho — campo SISTEMA, módulos e logo por partículas.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1213-21 --source episodes/ATIVO-D1213-21/narration_source.wav && python3 tools/build_audio.py ATIVO-D1213-21 && bash tools/render_episode.sh ATIVO-D1213-21
```
