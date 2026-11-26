# QA — ATIVO-D1210-12 · "O preço da ficha" (Esteira Editorial Diária · grade 10/12/2026 12h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-10/ATIVO-D1210-12_o_preco_da_ficha.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território FORA DA BOLHA (pesquisa da Skill Mestre) · PUSH. Modelo: **Terceiro modelo — Planta técnica**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- Northcraft & Neale (1987), 'Experts, amateurs, and real estate: An anchoring-and-adjustment perspective on property pricing decisions', Organizational Behavior and Human Decision Processes 39(1): corretores visitaram a mesma casa em Tucson (EUA) com fichas idênticas, exceto o preço pedido; as avaliações subiram com o preço; poucos citaram o preço como fator.
- Sem cifras em dólar (os resumos divergem); selo 'NORTHCRAFT & NEALE · 1987'.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1210-12/narration_source.wav`.
- Narração 34,0 s · 152 palavras/min · ASR 0,983 (85/86). Vídeo 36,3 s.
- **Pontos para ouvir:**
  - 'mil novecentos e oitenta e sete' e 'influenciado'.

## Som
- Trilha **T01** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção cama2 em 17.5 s (alvo 17.24 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.953 × mixagem 0.977 (queda -2.4 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.11 LUFS, TP -1.96 dBTP, LRA 2.00; narração -18.58 · trilha -26.04 · efeitos -40.57 LUFS; 17 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 36.35 s (timeline 36.33 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.13 LUFS · True peak ≤ -1 dBTP: -1.59 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 19.71 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia: a prancha ficava vazia nos primeiros 2 s e a chamada 'O PREÇO NÃO INFLUENCIOU' encostava nas barras → fichas entram na 1ª palavra; chamada mais alta e a cota do preço some quando ela entra; título encurtado.
- motion_check 18,8% parados, maior trecho 2,0 s; sistema_visual_check --quadros 0 erro, 0 aviso.
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — MESMA CASA, MESMO ERRO: quatro fichas iguais se desenham.
2. 1987 · FICHAS IGUAIS — as fichas ganham o preço pedido: BAIXO, MÉDIO, ALTO, MAIS ALTO.
3. A AVALIAÇÃO SEGUIU O PREÇO — as barras sobem com o preço; AVALIAÇÃO DOS CORRETORES.
4. E QUASE TODOS NEGARAM — chamada “O PREÇO NÃO INFLUENCIOU”.
5. PRIMEIRO, AS VENDAS — mergulho na ordem: 1 · VENDAS PARECIDAS, 2 · SÓ DEPOIS, O PREÇO PEDIDO.
6. O PRIMEIRO NÚMERO DECIDE — cota O PRIMEIRO NÚMERO PUXA O RESTO; fecho SISTEMA na prancha.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1210-12 --source episodes/ATIVO-D1210-12/narration_source.wav && python3 tools/build_audio.py ATIVO-D1210-12 && bash tools/render_episode.sh ATIVO-D1210-12
```
