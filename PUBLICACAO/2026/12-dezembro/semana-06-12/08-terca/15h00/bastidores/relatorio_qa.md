# QA — ATIVO-D1208-15 · "Cinco minutos sozinho" (Esteira Editorial Diária · grade 08/12/2026 15h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-08/ATIVO-D1208-15_cinco_minutos_sozinho.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território CORRETOR NA VIDA REAL (pesquisa da Skill Mestre) · PULL. Modelo: **Segundo modelo — Pictograma cinematográfico**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Tese por raciocínio, sem estatística (nenhum número na fala nem na tela).
- Personagens ilustrativos; nenhuma promessa de resultado.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1208-15/narration_source.wav`.
- Narração 29,0 s · 172 palavras/min · ASR 1,000 (83/83). Vídeo 31,3 s.
- **Pontos para ouvir:**
  - 'à vontade' e 'lá fora'.

## Som
- Trilha **T02** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção frase3 em None s (alvo 15.08 s); insight → seção climax em 11.04 s (alvo 17.64 s); resolucao → seção resolucao em 19.4 s (alvo 22.76 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.988 × mixagem 0.976 (queda 1.2 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.13 LUFS, TP -1.96 dBTP, LRA 2.50; narração -18.58 · trilha -29.11 · efeitos -38.55 LUFS; 16 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 31.34 s (timeline 31.33 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.15 LUFS · True peak ≤ -1 dBTP: -1.70 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 11.61 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Voz gerada com a 3ª chave do Gemini (mesmo modelo e voz Puck) depois que as duas primeiras esgotaram a cota do dia.
- Folha de quadros revisada; motion_check 48,7% parados (pictograma lento por design), maior trecho 0,9 s; sistema_visual_check --quadros 0 erro, 0 aviso.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — A MELHOR PARTE DA VISITA?: o corretor e o casal na sala; ele vira fantasma na palavra 'sai'.
2. COM VOCÊ FALANDO, ELE SÓ VISITA — balões do corretor; o casal em cinza; pílula VISITANTE.
3. SOZINHO, ELE SE MUDA — o corretor sai pela porta; o casal acende; O SOFÁ AQUI / A MESA ALI.
4. DE UM IMÓVEL À CASA DELE — a casa e a família acendem.
5. NO FIM DA VISITA, SAIA DA SALA — o corretor espera do lado de fora da porta: FIQUEM À VONTADE / EU ESPERO LÁ FORA.
6. O SILÊNCIO TAMBÉM APRESENTA; CtaNoir.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1208-15 --source episodes/ATIVO-D1208-15/narration_source.wav && python3 tools/build_audio.py ATIVO-D1208-15 && bash tools/render_episode.sh ATIVO-D1208-15
```
