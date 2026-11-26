# QA — ATIVO-D1207-10 · "Desconto antes da visita" (Esteira Editorial Diária · grade 07/12/2026 10h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-07/ATIVO-D1207-10_desconto_antes_da_visita.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território CORRETOR NA VIDA REAL (pesquisa da Skill Mestre) · PULL. Modelo: **Primeiro modelo — Cartoon explicativo**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Prática profissional; sem estatística. A mensagem 'FAÇO 10% A MENOS' é exemplo ilustrativo no celular desenhado.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1207-10/narration_source.wav`.
- Narração 30,3 s · 182 palavras/min · ASR 1,000 (92/92). Vídeo 32,6 s.
- **Pontos para ouvir:**
  - Ritmo 182 palavras/min; 'vamos visitar; se for o imóvel certo…'.

## Som
- Trilha **T05** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção b em 12.571 s (alvo 11.72 s); insight → seção c em 20.066 s (alvo 19.16 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.967 × mixagem 0.957 (queda 1.0 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.15 LUFS, TP -1.96 dBTP, LRA 2.50; narração -19.16 · trilha -27.29 · efeitos -39.58 LUFS; 20 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 32.62 s (timeline 32.60 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.15 LUFS · True peak ≤ -1 dBTP: -1.71 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 17.53 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia: etiquetas e carimbos caíam sobre a legenda karaokê → subiram.
- Render 1 descartado: o carimbo TALVEZ NEM QUEIRA não aparecia (plano terminava antes da palavra) e 'não com o preço no chão' durava 0,4 s → tempos corrigidos.
- motion_check 14,2% parados, maior trecho 0,7 s; sistema_visual_check --quadros: 1 aviso de luminância no fecho verde (padrão do cartoon), 0 erro.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — NO WHATSAPP: 'FAZ POR QUANTO?' ANTES DE VER O IMÓVEL.
2. SE JÁ RESPONDE COM NÚMERO… — a etiqueta PREÇO despenca: O PREÇO CAI PRIMEIRO.
3. E MAIS… — DESCONTO SEM VISITA; a casa e o '?': TALVEZ NEM QUEIRA.
4. PRIMEIRO — A ORDEM CERTA: 1. QUERER O IMÓVEL, 2. DEPOIS, O PREÇO.
5. RESPONDA ASSIM — 'VAMOS VISITAR? SE FOR O CERTO, LEVO SUA PROPOSTA.' e o PROPRIETÁRIO.
6. Desfecho — QUERENDO O IMÓVEL; NÃO COM O PREÇO NO CHÃO; CTA curta.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1207-10 --source episodes/ATIVO-D1207-10/narration_source.wav && python3 tools/build_audio.py ATIVO-D1207-10 && bash tools/render_episode.sh ATIVO-D1207-10
```
