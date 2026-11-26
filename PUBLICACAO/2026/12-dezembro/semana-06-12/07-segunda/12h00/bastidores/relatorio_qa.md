# QA — ATIVO-D1207-12 · "Dois carimbos de graça" (Esteira Editorial Diária · grade 07/12/2026 12h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-07/ATIVO-D1207-12_dois_carimbos.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território FORA DA BOLHA (pesquisa da Skill Mestre) · PUSH. Modelo: **Terceiro modelo — Planta técnica**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Nunes & Drèze (2006), Journal of Consumer Research, 'The Endowed Progress Effect': lava-rápido; metade dos clientes com cartão de 8 espaços, metade com 10 e 2 já carimbados (8 lavagens pagas nos dois); quem recebeu o progresso inicial completou mais e com menos intervalo. Percentuais exatos não conferidos no texto integral (PDF fora da rede liberada) → não usados.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1207-12/narration_source.wav`.
- Narração 32,0 s · 161 palavras/min · ASR 0,930 (80/86). Vídeo 34,3 s.
- **Pontos para ouvir:**
  - ASR 93% (formas escritas de números); 'dois mil e seis'.

## Som
- Trilha **T03** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção b em 14.54 s (alvo 15.64 s); insight → seção drop em 18.54 s (alvo 18.36 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.942 × mixagem 0.93 (queda 1.2 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.16 LUFS, TP -1.95 dBTP, LRA 2.50; narração -19.31 · trilha -25.75 · efeitos -40.67 LUFS; 18 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 34.30 s (timeline 34.30 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.17 LUFS · True peak ≤ -1 dBTP: -1.38 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 19.69 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia: a chamada COMPLETOU MAIS durava 0,4 s → entra em 'começado'; mergulho atrasado 0,4 s.
- motion_check 15,8% parados, maior trecho 2,0 s; sistema_visual_check --quadros 0 erro, 0 aviso.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — DOIS CARIMBOS DE GRAÇA: cartão A (8) e cartão B (10, os dois primeiros acesos).
2. 2006: UM LAVA-RÁPIDO — CARTÃO A · 8 ESPAÇOS (metade dos clientes).
3. CARTÃO B · 10 ESPAÇOS, 2 DE BRINDE; cota FALTAVAM 8 NOS DOIS.
4. O CAMINHO JÁ COMEÇADO — chamada COMPLETOU MAIS, E MAIS RÁPIDO.
5. Mergulho nos dois carimbos → PROJETO: SEU FINANCIAMENTO: DOCUMENTOS ENVIADOS, SIMULAÇÃO PRONTA acendem; AVALIAÇÃO PRÓXIMA; cota 2 ETAPAS FEITAS · FALTA A AVALIAÇÃO.
6. NINGUÉM LARGA UM CAMINHO COMEÇADO; CTA curta na prancha.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1207-12 --source episodes/ATIVO-D1207-12/narration_source.wav && python3 tools/build_audio.py ATIVO-D1207-12 && bash tools/render_episode.sh ATIVO-D1207-12
```
