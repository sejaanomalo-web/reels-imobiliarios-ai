# QA — ATIVO-D1210-10 · "Os quinze imóveis" (Esteira Editorial Diária · grade 10/12/2026 10h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-10/ATIVO-D1210-10_os_quinze_imoveis.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território CORRETOR NA VIDA REAL (pesquisa da Skill Mestre) · PULL. Modelo: **Primeiro modelo — Cartoon explicativo**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Situação de rotina, sem dado estatístico; personagens ilustrativos.
- 'Três, quatro no máximo' é sugestão de prática, não regra; o vídeo não cita estudo sobre excesso de escolhas.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1210-10/narration_source.wav`.
- Narração 30,4 s · 174 palavras/min · ASR 0,977 (86/88). Vídeo 32,7 s.
- **Pontos para ouvir:**
  - 'quinze imóveis' e 'décimo'.

## Som
- Trilha **T02** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção frase3 em None s (alvo 13.08 s); insight → seção climax em 22.12 s (alvo 17.88 s); resolucao → seção resolucao em None s (alvo 24.76 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.955 × mixagem 0.932 (queda 2.3 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.12 LUFS, TP -1.96 dBTP, LRA 3.20; narração -18.87 · trilha -28.54 · efeitos -40.12 LUFS; 20 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 32.70 s (timeline 32.70 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.14 LUFS · True peak ≤ -1 dBTP: -1.68 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 17.6 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Trilha trocada de T04 para T02: com T04 a mixagem reprovou no portão de inteligibilidade (queda de 4,6 pontos; 5,7 com ducking); com T02 a queda foi de 2,3 pontos.
- Prévia: uma cor de apoio verde fora da marca (#E8FFE9) foi barrada pelo validador → trocada por #F4F5F7; o carimbo 15 IMÓVEIS encobria o selo → lista e carimbo deslocados.
- motion_check 14,4% parados, maior trecho 0,7 s; sistema_visual_check --quadros 0 erro, 1 aviso (fecho verde, luminância 46).
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — O PEDIDO: a lista desenrola com 15 linhas; carimbo 15 IMÓVEIS; NO SÁBADO.
2. NO DÉCIMO… — as casas giram e se misturam: E O TERCEIRO?, A COZINHA DO 4, A VARANDA DO 10; carimbo MISTUROU.
3. O ERRO — MAIS VISITA ≠ MAIS ESCOLHA; carimbo MAIS CONFUSÃO.
4. A VIRADA — ANTES DE SAIR; checklist NÃO ABRE MÃO DE: 3 quartos, perto do trabalho, até o teto; CORTE O QUE NÃO PASSA.
5. NO SÁBADO, 3 OU 4 — três casas; 4 NO MÁXIMO; ANOTE NA SAÍDA ('GOSTEI DA LUZ DO 2!').
6. MENOS PORTAS ABERTAS → MAIS DECISÃO; CTA curta.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1210-10 --source episodes/ATIVO-D1210-10/narration_source.wav && python3 tools/build_audio.py ATIVO-D1210-10 && bash tools/render_episode.sh ATIVO-D1210-10
```
