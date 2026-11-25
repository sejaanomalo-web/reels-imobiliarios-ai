# QA — ATIVO-D1204-08 · "O preço da ficha" (Esteira Editorial Diária · grade 04/12/2026 08h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-04/ATIVO-D1204-08_o_preco_da_ficha.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território E SE…? (pesquisa da Skill Mestre) · PUSH. Modelo: **Terceiro modelo — Planta técnica v2**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Northcraft & Neale (1987), Organizational Behavior and Human Decision Processes 39: corretores avaliaram a mesma casa com fichas iguais, exceto o preço pedido; as avaliações acompanharam o preço e poucos citaram o preço entre os fatores. Valor exato da diferença omitido (fontes divergem). Selo: ESTUDO COM CORRETORES · 1987.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1204-08/narration_source.wav`.
- Narração 38,5 s · 167 palavras/min · ASR 0,986 (106/107). Vídeo 40,8 s.
- **Pontos para ouvir:**
  - Ritmo 167 palavras/min; "1987" por extenso.

## Som
- Trilha **T01** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção cama2 em 18.65 s (alvo 18.76 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.944 × mixagem 0.944 (queda 0.0 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.05 LUFS, TP -1.97 dBTP, LRA 2.50; narração -17.33 · trilha -24.55 · efeitos -40.88 LUFS; 19 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 40.85 s (timeline 40.83 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.07 LUFS · True peak ≤ -1 dBTP: -1.78 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 22.94 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- editorial_check do render 1 barrou rótulos da ficha em 22 px (mínimo 24) → 24 px.
- Prévia: a folha do estudo ficava ~2 s vazia e a comparação de avaliações era ilegível → fichas entram em 1987; avaliações viraram cômodos AVALIOU MAIS CARA/BARATA; a folha da conta já abre com 1º/2º.
- sistema_visual_check --quadros: 0 erro, 0 aviso.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — a ficha do imóvel com PREÇO PEDIDO aceso; QUANTO VALE?
2. Mergulho: A MESMA CASA · A MESMA FICHA — PREÇO: ALTO × PREÇO: BAIXO.
3. A AVALIAÇÃO SEGUIU O PREÇO — AVALIOU MAIS CARA × AVALIOU MAIS BARATA.
4. E NINGUÉM PERCEBEU — chamada USOU O PREÇO? QUASE NENHUM DISSE QUE SIM.
5. Mergulho: A SUA CONTA · ANTES DA FICHA — VENDIDOS DA REGIÃO · METRAGEM · ESTADO → 1º O SEU NÚMERO.
6. Desfecho — 2º O DO DONO; SENÃO, QUEM AVALIA É A FICHA.
7. CTA curta — PROJETO: SEU SISTEMA, campo SISTEMA, logo.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1204-08 --source episodes/ATIVO-D1204-08/narration_source.wav && python3 tools/build_audio.py ATIVO-D1204-08 && bash tools/render_episode.sh ATIVO-D1204-08
```
