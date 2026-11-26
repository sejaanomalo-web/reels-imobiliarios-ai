# QA — ATIVO-D1209-08 · "O preço público" (Esteira Editorial Diária · grade 09/12/2026 08h00)

**Fonte:** `ROTEIROS/ESTEIRA/2026-12-09/ATIVO-D1209-08_o_preco_publico.md` (aprovado por delegação do cliente — ordem no chat de 24/11/2026: produzir e programar sem aprovação, revisão posterior). Território E SE…? (pesquisa da Skill Mestre) · PUSH. Modelo: **Quarto modelo — Maquete 3D**. Reel orgânico, verde `#02FB3F`, logo oficial no fecho. CTA curta vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."

## Apuração
- HM Land Registry, Price Paid Data: vendas residenciais registradas na Inglaterra e no País de Gales desde 1/1/1995, gratuitas, licença aberta (OGL); exclui vendas não registradas ou sem valor (a fala diz 'vendas de casas registradas').
- Prefeitura de São Paulo (Secretaria da Fazenda): publicação mensal das transações com ITBI pago (endereço, valor da transação, cartório; sem nomes), Lei 18.161/2024; imóveis rurais fora. O vídeo fala só de São Paulo, sem generalizar.

## Voz
- Gemini `gemini-3.8-flash-tts`, voz Puck, 1,0× sem time-stretch, `shapePauses` (0,22/0,6/0,6). Voz congelada em `PRODUCAO/episodes/ATIVO-D1209-08/narration_source.wav`.
- Narração 38,0 s · 162 palavras/min · ASR 0,961 (99/103). Vídeo 40,4 s.
- **Pontos para ouvir:**
  - 'mil novecentos e noventa e cinco' e 'í tê bê í' (ITBI).

## Som
- Trilha **T03** do catálogo (licença `autorizada`: autorização do autor informada pelo cliente em 24/11/2026, `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`), adaptada à história por `adaptar_trilha.py` (SHORTEN, velocidade 0.0%): virada → seção b em 18.54 s (alvo 17.8 s); insight → seção drop em 22.54 s (alvo 22.833 s). Mixagem v2 com ducking em 2 bandas; trilha nas pausas a -4.0 LU da voz (24/11/2026: +6 dB, ordem do cliente); portão de inteligibilidade: narração 0.971 × mixagem 0.981 (queda -1.0 pontos, aprovado).
- Efeitos 100% sintetizados por código. Mixagem (pré-master): final -15.09 LUFS, TP -1.97 dBTP, LRA 2.70; narração -19.30 · trilha -25.97 · efeitos -40.75 LUFS; 19 eventos de efeito.
- Risco residual da trilha: reconhecimento automático de áudio das plataformas (acompanhar após a publicação).

## Validação
- `validate.py`: 11/11 checagens OK — Dimensões 1080x1920: 1080x1920 · Codec de vídeo H.264: h264 · Pixel format yuv420p: yuv420p · 30 fps: 30/1 · Áudio AAC presente: aac · Duração = timeline (±0,1 s): 40.38 s (timeline 40.37 s) · Decodificação sem erros: ok · Loudness entre -16 e -14 LUFS: -15.11 LUFS · True peak ≤ -1 dBTP: -1.67 dBTP · Sem trechos pretos ≥ 0,2 s: nenhum · Sem silêncio total ≥ 0,4 s: nenhum · 20.79 MB.
- `editorial_check` 0 erro / 0 aviso (inclui `sistema_visual_check` do episódio). Folha de quadros (1 quadro/s) revisada antes do render final; correções feitas: ver `## Revisão visual`.
- Legenda do Instagram: `legenda_instagram.txt` (CTA fixa na 1ª linha, sem Markdown, 5 hashtags minúsculas).

## Revisão visual
- Prévia: títulos do cabeçalho quebravam em 2 linhas e a placa cobria a 2ª → títulos curtos; câmera inicial mais aberta, casas com menos verde, casa do anúncio mais ao centro, placa da prefeitura mais baixa, barras enquadradas.
- motion_check 32,8% parados, maior trecho 2,0 s; sistema_visual_check --quadros 0 erro, 1 aviso (quadro do fecho verde, luminância 49 — fundo da atmosfera 'solução').
- `sistema_visual_check --quadros` (1 quadro/s do MP4 final): 0 erro.

## Cenas
1. Gancho — PREÇO PÚBLICO?: a rua de casas brota; QUANTO VALEU CADA VENDA?
2. INGLATERRA · DESDE 1995 — as vendas fluem das casas para o cadastro oficial: DE GRAÇA / VENDAS REGISTRADAS DESDE 1995.
3. SÃO PAULO · TODO MÊS — a prefeitura e a planilha que acende: TRANSAÇÕES COM ITBI PAGO.
4. A DIFERENÇA — ANÚNCIO: O QUE O DONO QUER → TRANSAÇÃO: O QUE ALGUÉM PAGOU (a casa acende).
5. NA AVALIAÇÃO — o corretor: COMPARE COM VENDAS REAIS; as barras PEDIDO × FECHADO.
6. A LIÇÃO — VENDA REAL, NÃO OPINIÃO; fecho SISTEMA.

## Licenças e créditos
- Imagem: tudo desenhado em código (Remotion/React, kit do modelo); nenhum asset de terceiros; logo oficial ATIVO (`MARCA/logo/`). Fonte Manrope / JetBrains Mono (OFL).
- Áudio: voz sintética Gemini (preset aprovado); efeitos sintetizados por `tools/build_audio.py`; trilha do catálogo `TRILHAS/` com autorização do autor (status `autorizada`, 24/11/2026). O áudio da trilha não entra no Git.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-D1209-08 --source episodes/ATIVO-D1209-08/narration_source.wav && python3 tools/build_audio.py ATIVO-D1209-08 && bash tools/render_episode.sh ATIVO-D1209-08
```
