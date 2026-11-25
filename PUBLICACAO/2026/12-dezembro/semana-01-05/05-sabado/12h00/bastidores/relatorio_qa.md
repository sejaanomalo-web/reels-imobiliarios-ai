# QA — ATIVO-D1205-12 · "A espera explicada" (Esteira Editorial Diária · grade 05/12/2026 12h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-05/ATIVO-D1205-12_a_espera_explicada.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território FORA DA BOLHA (pesquisa da Skill Mestre) · PULL. Modelo: **Segundo modelo — Pictograma cinematográfico**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- David Maister (1985), 'The Psychology of Waiting Lines': tempo desocupado parece mais longo; espera incerta parece mais longa que espera com prazo; espera sem explicação parece mais longa que espera explicada. Princípios de ensaio clássico, sem números; a história não verificada do aeroporto de Houston NÃO é usada.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1205-12/narration_source.wav`.
- Narração 36,0 s · 145 palavras/min · ASR 0,942 (81/87). Vídeo 38,3 s.
- **Pontos para ouvir:**
  - 'Em 1985' e a ênfase em 'sem explicação, pior'.

## Som
- Trilha **T03** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção b em 18.0 s (alvo 18.84 s); insight → seção drop em 22.0 s (alvo 21.96 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.908 × mixagem 0.92 (queda -1.2 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.28 LUFS, TP -1.95 dBTP, LRA 2.20; narração -19.93 · trilha -27.12 · efeitos -39.03 LUFS; 16 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 38.34 s (timeline 38.33 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.30 LUFS · True peak ≤ -1 dBTP: -1.68 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 14.11 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia: pílulas e relógio reposicionados para não encostar na legenda; negativas (sem/nada/prazo/explicação) em vermelho de alerta.
- motion_check 56,8% parados (normal do pictograma noir), maior trecho parado 1,0 s; sistema_visual_check --quadros 0 erro; fecho confere o logo oficial montado.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — fila de pictogramas sob o holofote, relógio: DEZ MINUTOS PARECEM UMA HORA.
2. 1985 · A PSICOLOGIA DA ESPERA — pílulas SEM NADA PARA FAZER, SEM PRAZO, SEM EXPLICAÇÃO.
3. E O SEU CLIENTE NO FINANCIAMENTO? — figura sozinha, barra de etapas apagada: EM QUE ETAPA?
4. UMA MENSAGEM A CADA ETAPA — DOCUMENTOS ENVIADOS, ANÁLISE COMEÇOU, FALTA A AVALIAÇÃO; a luz fica verde.
5. Desfecho — A ESPERA É A MESMA; EXPLICADA, PESA MENOS.
6. CTA curta — campo SISTEMA, ícones IMÓVEIS/LEADS/ATENDIMENTOS, logo montado por partículas.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1205-12 --source episodes/ATIVO-D1205-12/narration_source.wav && python3 tools/build_audio.py ATIVO-D1205-12 && bash tools/render_episode.sh ATIVO-D1205-12
```
