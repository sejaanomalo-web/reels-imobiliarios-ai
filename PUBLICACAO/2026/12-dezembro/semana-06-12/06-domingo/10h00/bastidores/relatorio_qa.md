# QA — ATIVO-D1206-10 · "Dez imóveis no sábado" (Esteira Editorial Diária · grade 06/12/2026 10h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-06/ATIVO-D1206-10_dez_imoveis_no_sabado.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território CORRETOR NA VIDA REAL (pesquisa da Skill Mestre) · PULL. Modelo: **Primeiro modelo — Cartoon explicativo**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Prática profissional; sem estatística nem estudo citado. 'As informações se misturam' é dita como observação de rotina, sem número.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1206-10/narration_source.wav`.
- Narração 35,0 s · 173 palavras/min · ASR 0,980 (99/101). Vídeo 37,4 s.
- **Pontos para ouvir:**
  - 'Escolha três ou quatro' e 'não gostou' (ritmo de lista).

## Som
- Trilha **T05** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção b em 17.569 s (alvo 16.04 s); insight → seção c em 22.566 s (alvo 21.96 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.95 × mixagem 0.931 (queda 1.9 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.15 LUFS, TP -1.96 dBTP, LRA 1.90; narração -19.40 · trilha -27.61 · efeitos -39.53 LUFS; 20 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 37.42 s (timeline 37.40 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.17 LUFS · True peak ≤ -1 dBTP: -1.66 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 20.11 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia: balão 'qual tinha a varanda?' encostava na borda direita → deslocado.
- editorial_check barrou um verde não oficial na casa escolhida (#DFFFE6) → trocado por branco #F4F5F7.
- motion_check 8,6% parados, maior trecho 0,7 s; sistema_visual_check --quadros: 1 aviso de luminância no fecho verde (padrão do cartoon), 0 erro.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — O PEDIDO: dez casinhas surgem; DEZ IMÓVEIS · SÁBADO; o corretor se espanta.
2. A MARATONA — a rota se desenha entre as casas; O DIA INTEIRO; QUAL TINHA A VARANDA?
3. DEPOIS DE ALGUNS… — SALAS, QUARTOS e PREÇOS entram e se embaralham: TUDO SE MISTURA.
4. A VIRADA — MAIS VISITAS ≠ MAIS CERTEZA; carimbo MAIS CONFUSÃO.
5. CADA UM COM UM MOTIVO — 3 OU 4 IMÓVEIS: PERTO DA ESCOLA, TEM VARANDA, CABE NO BOLSO; ENTREGUE UMA FICHA: GOSTOU / NÃO GOSTOU.
6. Desfecho — NÃO PRECISA LEMBRAR DE TUDO; a casa escolhida sobe; ESCOLHER; CTA curta.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1206-10 --source episodes/ATIVO-D1206-10/narration_source.wav && python3 tools/build_audio.py ATIVO-D1206-10 && bash tools/render_episode.sh ATIVO-D1206-10
```
