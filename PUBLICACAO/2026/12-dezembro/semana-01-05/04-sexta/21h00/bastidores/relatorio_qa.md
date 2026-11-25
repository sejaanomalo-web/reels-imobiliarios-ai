# QA — ATIVO-D1204-21 · "O fim da visita" (Esteira Editorial Diária · grade 04/12/2026 21h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-04/ATIVO-D1204-21_o_fim_da_visita.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território FORA DA BOLHA (pesquisa da Skill Mestre) · PUSH. Modelo: **Segundo modelo — Pictograma cinematográfico**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Kahneman, Fredrickson, Schreiber & Redelmeier (1993), Psychological Science, 'When More Pain Is Preferred to Less': 60 s a 14 °C × 60 s + 30 s com a água subindo a 15 °C; a tentativa mais longa foi julgada menos desagradável (regra do pico-fim). Percentual de preferência não citado.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1204-21/narration_source.wav`.
- Narração 33,2 s · 174 palavras/min · ASR 0,969 (93/96). Vídeo 35,5 s.
- **Pontos para ouvir:**
  - Ritmo 174 palavras/min (alto, mas dentro da faixa recente); '1993', '14 °C' não é falado.

## Som
- Trilha **T01** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção cama2 em 18.5 s (alvo 18.28 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.979 × mixagem 0.979 (queda 0.0 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.03 LUFS, TP -1.99 dBTP, LRA 2.40; narração -17.47 · trilha -24.91 · efeitos -38.88 LUFS; 16 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 35.52 s (timeline 35.50 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.05 LUFS · True peak ≤ -1 dBTP: -1.61 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 13.48 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Roteiro auditado com o complemento script-creator: o 1º gancho ('Como sofrer mais tempo pode deixar uma lembrança melhor?') falhou no teste dos 4 erros (demora/irrelevância: a visita só aparecia aos ~25 s) → trocado por 'A ordem dos cômodos muda a lembrança que o cliente leva da visita.' antes da voz.
- Prévia: termômetros só apareciam 4 s depois de '1993' → entram junto.
- sistema_visual_check --quadros: 0 erro; motion_check 47,2% parados, maior trecho 0,8 s.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — A ORDEM DOS CÔMODOS MUDA A LEMBRANÇA: 4 cômodos em linha, o último acende.
2. 1993 · ÁGUA GELADA — termômetros: 1 MIN · 14 °C × 1 MIN E MEIO; FIM A 15 °C (verde).
3. O FINAL PESOU MAIS — a curva da lembrança sobe no fim; A MAIS LONGA: MENOS RUIM; A DURAÇÃO (cinza).
4. NA VISITA, O FIM FICA — a figura atravessa QUARTOS · COZINHA · SERVIÇO · VARANDA.
5. Desfecho — TERMINE NO MELHOR PONTO: a varanda acende; o SERVIÇO fica vermelho.
6. CTA curta noir — campo SISTEMA, ícones, logo por partículas.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1204-21 --source episodes/ATIVO-D1204-21/narration_source.wav && python3 tools/build_audio.py ATIVO-D1204-21 && bash tools/render_episode.sh ATIVO-D1204-21
```
