# QA — ATIVO-D1213-18 · "A sombra que mudou a cidade" (Esteira Editorial Diária · grade 13/12/2026 18h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-13/ATIVO-D1213-18_a_sombra_que_mudou_a_cidade.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território HISTÓRIA QUE ENSINA (pesquisa da Skill Mestre) · PUSH. Modelo: **Quarto modelo — Maquete 3D**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Equitable Building, 120 Broadway, Nova York (concluído em 1915): torre de cerca de 40 andares sem recuos, cuja sombra cobria cerca de sete acres; a reação ajudou a aprovar a Resolução de Zoneamento de 1916, a primeira da cidade, com recuos para a luz chegar à rua (Wikipedia, 99% Invisible, Skyscraper Museum).
- O vídeo diz 'quase quarenta andares' (as fontes variam entre 38 e 40) e não cita a área da sombra.
- Não diz que existe lei igual no Brasil: a legenda remete ao plano diretor e à lei de zoneamento de cada município.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1213-18/narration_source.wav`.
- Narração 32,5 s · 194 palavras/min · ASR 0,981 (103/105). Vídeo 34,9 s.
- **Pontos para ouvir:**
  - 'mil novecentos e quinze' e 'zoneamento'.

## Som
- Trilha **T02** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção frase3 em None s (alvo 17.4 s); insight → seção climax em 22.12 s (alvo 22.2 s); resolucao → seção resolucao em None s (alvo 27.08 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.981 × mixagem 0.981 (queda 0.0 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -14.90 LUFS, TP -1.92 dBTP, LRA 2.50; narração -19.86 · trilha -31.38 · efeitos -40.66 LUFS; 17 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 34.90 s (timeline 34.90 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -14.93 LUFS · True peak ≤ -1 dBTP: -1.53 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 17.09 MB.
- `editorial_check` 0 erro (avisos revisados) (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia 1: o paredão subia por trás do título e as placas da sombra e dos 40 andares se sobrepunham → câmera afastada e mais alta; a placa da sombra sai quando a dos andares entra.
- Inteligibilidade: queda de 0,0 ponto com T02.
- motion_check 55,7% parados (plano-sequência lento), maior trecho 2,0 s; aviso de luminância em 1 quadro do fecho (verde do CTA).
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — UMA SOMBRA MUDOU A LEI: a quadra de casinhas ao sol; o paredão brota; NOVA YORK · 1915.
2. SEM RECUO, SEM SOL — A SOMBRA SOBRE A QUADRA; QUASE 40 ANDARES, SEM RECUO; as casas escurecem.
3. RECUOS PARA A LUZ — 1916 · LEI DE ZONEAMENTO; o paredão vira prédio em degraus e a luz volta.
4. LUZ COMPRADA, PERDIDA — OS VIZINHOS COMPRARAM LUZ / E PERDERAM PELO VIZINHO.
5. CONFIRA O VIZINHO — a casa à venda e o terreno vazio: A VISTA, O SOL; CONFIRA O ZONEAMENTO; o prédio que a lei permite brota: O QUE PODE SUBIR AQUI?
6. O LADO FAZ PARTE — TAMBÉM FAZ PARTE DO IMÓVEL.
7. Fecho — módulos do sistema acendem, campo SISTEMA e logo.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1213-18 --source episodes/ATIVO-D1213-18/narration_source.wav && python3 tools/build_audio.py ATIVO-D1213-18 && bash tools/render_episode.sh ATIVO-D1213-18
```
