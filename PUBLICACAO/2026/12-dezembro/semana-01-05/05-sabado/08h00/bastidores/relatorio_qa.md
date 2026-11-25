# QA — ATIVO-D1205-08 · "42 horas" (Esteira Editorial Diária · grade 05/12/2026 08h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-05/ATIVO-D1205-08_42_horas.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território E SE…? (pesquisa da Skill Mestre) · PUSH. Modelo: **Primeiro modelo — Cartoon explicativo**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Oldroyd, McElheran & Elkington (2011), Harvard Business Review, 'The Short Life of Online Sales Leads': auditoria de 2.241 empresas dos EUA; entre as que responderam em até 30 dias, média de 42 horas; 23% nunca responderam. O '100×' do estudo de 2007 (dado de fornecedor) foi reprovado na porta eliminatória e não é usado.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1205-08/narration_source.wav`.
- Narração 31,1 s · 164 palavras/min · ASR 0,953 (81/85). Vídeo 33,5 s.
- **Pontos para ouvir:**
  - Ritmo 164 palavras/min; '42 horas' e '2 mil'.

## Som
- Trilha **T05** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção b em 12.571 s (alvo 13.88 s); insight → seção c em 17.568 s (alvo 17.24 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.953 × mixagem 0.941 (queda 1.2 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.26 LUFS, TP -1.94 dBTP, LRA 3.30; narração -18.92 · trilha -27.32 · efeitos -39.34 LUFS; 18 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 33.47 s (timeline 33.47 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.28 LUFS · True peak ≤ -1 dBTP: -1.66 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 17.11 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Roteiro com o complemento script-creator: 3 ganchos (E SE…?, investigador, cena), 4 erros e contrafactuais; rubrica sem item abaixo de 3.
- Prévia: o balão AINDA DISPONÍVEL? encostava na legenda → subiu.
- sistema_visual_check --quadros: 1 aviso de luminância no fecho verde; motion_check 12,3% parados.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — E SE…?: o celular com OI! AINDA ESTÁ DISPONÍVEL?; carimbo 5 MINUTOS?
2. O levantamento — 2.241 EMPRESAS · EUA · 2011; contador até 42 H (TEMPO MÉDIO DE RESPOSTA); 23% NUNCA RESPONDERAM.
3. EM 42 HORAS… — o balão AINDA DISPONÍVEL? se apaga: A DÚVIDA PASSA.
4. DEIXE PRONTO — checklist RESPOSTAS PRONTAS: DISPONÍVEL? · FINANCIAMENTO? · VAGA?
5. Desfecho — a resposta em 5 minutos (verde); NÃO É DESINTERESSE · É A ESPERA.
6. CTA curta — campo COMENTE SISTEMA, ícones, logo.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1205-08 --source episodes/ATIVO-D1205-08/narration_source.wav && python3 tools/build_audio.py ATIVO-D1205-08 && bash tools/render_episode.sh ATIVO-D1205-08
```
