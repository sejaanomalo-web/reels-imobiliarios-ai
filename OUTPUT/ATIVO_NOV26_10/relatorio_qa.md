# QA — ATIVO_NOV26_10 · "Preço anunciado não é preço fechado" (lote 30 Reels nov/2026 · 19/11/2026)

**Fonte:** `ROTEIROS/LOTE_NOV2026/ATIVO_NOV26_10.md`. Narração do GANCHO + TAKES palavra por palavra. Reel orgânico, verde do lote #02FB3F, logo no fecho. Voz com a direção nova e pausas naturais (`shapePauses`).

## Apuração (19/11/2026)
- **Índice FipeZAP de venda:** calculado com preços de imóveis residenciais prontos anunciados na internet ([metodologia nos boletins DataZAP](https://www.datazap.com.br/wp-content/uploads/2022/11/FIPEZAPVenda_202211.pdf)).
- **Raio-X FipeZAP:** pesquisa com respondentes (758 no 3º tri 2026) sobre intenção, percepção e transações relatadas ([InfoMoney — fonte do roteiro](https://www.infomoney.com.br/minhas-financas/imoveis-intencao-de-compra-cai-a-35-e-descontos-atingem-67-diz-fipezap/)).
- Bases, métodos e perguntas diferentes; o vídeo não diz que têm a mesma amostra (nota do roteiro). Sem valor do índice e sem número de cidades (a cobertura mudou ao longo dos anos).
- Apartamento do gancho = EXEMPLO HIPOTÉTICO; réguas sem números; mapa, ficha e avaliação ILUSTRATIVOS ("comparáveis a inserir").

## CTA
- No roteiro: "Salve para não confundir preço anunciado com preço de venda."
- Virou a transição **"Preço anunciado não é preço de venda: dado é ponto de partida."** (texto de tela DADO É PONTO DE PARTIDA) + CTA SISTEMA. **Pendente de aprovação.**

## Voz
- 2 gerações (conta 2: **A, usada sem edição**; conta 1: B, com "conseguir" e "verdadeiras"). Nenhum vazamento da direção nesta rodada.
- Pausas: 19 moldadas (teto 0,6 s, aplicado à pausa de 1,5 s após "região"); 56,6 s → 54,0 s, 157 palavras/min, 1,0× sem time-stretch.
- Pontos para ouvir: "Fipe Zap" (as transcrições automáticas não reconhecem a marca).

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC · 56,34 s · −14,94 LUFS · TP −1,55 dBTP.
- `editorial_check` 0 erros / 0 avisos.
- **Movimento 1,36** (1ª medição 1,27) · maior trecho parado 0,9 s. Abaixo da média do lote (1,5–1,9), porque o tema pede quadros comparativos de leitura; ajustes feitos: entrada antecipada no Take 02, flutuação dos quadros e marcadores, drift maior no gancho e no Take 01.
- SFX: 32 eventos, stem −38,9 LUFS; transcrição da mixagem 0,972 × narração 0,975.
- 18 + 4 quadros revisados. Corrigidos: título do Take 02 quebrando "UM / IMÓVEL", metade vazia antes da ficha, réguas aparecendo através do card da avaliação, segundo quadro do gancho vazio.
- **Legenda Instagram:** `OUTPUT/ATIVO_NOV26_10/legenda_instagram.txt` — `legenda_check` ✓ (158 palavras). Pasta: `PUBLICACAO/NOV26/REELS_01_AO_10/10/`.

## Cenas
1. **Gancho — DOIS PREÇOS:** EXEMPLO HIPOTÉTICO; "no índice de anúncios ▲ ficou mais caro" × "na negociação ▼ teve desconto"; "Os dois podem ser verdade".
2. **Take 01 — ANÚNCIO ≠ ESCRITURA:** réguas PREÇO PEDIDO (índice FipeZAP de venda · anúncios em portais) e PREÇO NEGOCIADO (pesquisa com entrevistados · o que relatam ter pago); BASES ≠ MÉTODOS ≠ PERGUNTAS ≠.
3. **Take 02 — INDICADOR NACIONAL NÃO PRECIFICA UM IMÓVEL:** valorização anunciada → "Seu imóvel vale isso."; o que ficou de fora (conservação, liquidez, negociações semelhantes); bairro ilustrativo · comparáveis a inserir.
4. **Take 03 — DADO É PONTO DE PARTIDA:** réguas se unem na AVALIAÇÃO CONTEXTUAL (região, estado, comparáveis); método transparente × estatística bonita; "Anunciado ≠ vendido".
5. **CTA SISTEMA** (Avaliação de cada imóvel) + logo.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-NOV26-10 --source episodes/ATIVO-NOV26-10/narration_source.wav && python3 tools/build_audio.py ATIVO-NOV26-10 && bash tools/render_episode.sh ATIVO-NOV26-10
```
