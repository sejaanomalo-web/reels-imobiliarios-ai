# QA — ATIVO_NOV26_07 · "O desconto não é o vilão" (lote 30 Reels nov/2026 · 19/11/2026)

**Fonte:** `ROTEIROS/LOTE_NOV2026/ATIVO_NOV26_07.md`. Narração do GANCHO + TAKES palavra por palavra. Reel orgânico, verde do lote #02FB3F, logo no fecho. Voz na regra de 19/11 (aprovada) e SFX mais dinâmicos (pedido 19/11).

## Apuração (19/11/2026)
- Raio-X FipeZAP 3º tri 2026: **67% das transações residenciais relatadas** pelos respondentes tiveram algum desconto sobre o preço anunciado (65% um ano antes); 758 respondentes, usuários de portais, coleta 5/10–3/11/2026 ([Portas — fonte do roteiro](https://portas.com.br/noticias/intencao-de-compra-cai-enquanto-descontos-na-compra-de-imoveis-crescem-aponta-fipezap/), [Paraíba Business](https://paraibabusiness.com.br/descontos-na-compra-de-imoveis-avancam-enquanto-intencao-de-compra-recua-no-brasil/), [InfoMoney](https://www.infomoney.com.br/minhas-financas/imoveis-intencao-de-compra-cai-a-35-e-descontos-atingem-67-diz-fipezap/)). Relatório original não aberto; reportagens concordantes.
- Na tela: AMOSTRA PESQUISADA · RAIO-X FIPEZAP 3º TRI 2026 · NÃO REPRESENTA TODAS AS VENDAS. Sem desconto médio, sem valores de proposta, sem cidade. Proprietários e ficha: EXEMPLO HIPOTÉTICO / ILUSTRATIVO.

## CTA
- No roteiro: "Salve para a próxima conversa difícil sobre preço."
- Virou a transição **"Na próxima conversa difícil sobre preço, leve contexto."** (texto de tela NEGOCIAÇÃO = CONTEXTO) + CTA SISTEMA. **Pendente de aprovação.**

## Voz
- 4 gerações: conta 1 → A ("FipeZAP" saiu "Fips Zap"), B (leu a direção de estilo no começo); com pronúncia `FipeZAP → Fipe Zap` (só no texto enviado à voz): conta 2 → C ("terminam", "conversa é difícil"), conta 1 → **D, usada sem edição**.
- **Pontos para ouvir em D:** "trata **a** negociação" (artigo a mais — saiu nas 4 tomadas; sentido igual); "Raio-X Fipe Zap" (as transcrições automáticas não reconhecem a marca: confirmar no ouvido).
- Tomada bruta 53,5 s → 47,3 s de fala (6,2 s de silêncio cortados), 183 palavras/min, 1,0× sem time-stretch.

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC · 49,64 s · −15,10 LUFS · TP −1,65 dBTP.
- `editorial_check` 0 erros / 0 avisos.
- Movimento 1,75 · maior trecho parado 1,0 s (entrada do gráfico do Take 02).
- SFX: 29 eventos, stem −39,4 LUFS; transcrição da mixagem = narração isolada (0,917 × 0,924; diferença só "deva/deve" no Whisper).
- 21 + 2 quadros revisados. Corrigidos: título do Take 01 em duas linhas sobre o carimbo, painéis com metade vazia, ícone da casa encolhendo.
- **Legenda Instagram:** `OUTPUT/ATIVO_NOV26_07/legenda_instagram.txt` — `legenda_check` ✓ (162 palavras). Pasta: `PUBLICACAO/NOV26/REELS_01_AO_10/07/`.

## Cenas
1. **Gancho — O DESCONTO É O VILÃO?:** 67% COM DESCONTO desde o quadro 0; grade de 100 quadrados preenchendo 67; fonte; conversa ilustrativa "Chegou uma proposta abaixo do anúncio." → "Que ofensa! Nem respondo."
2. **Take 01 — MESMA PROPOSTA, REAÇÕES DIFERENTES:** carimbo EXEMPLO HIPOTÉTICO; proprietário A ✕ recusa antes de conversar; proprietário B ✓ pede dados ✓ entende as condições.
3. **Take 02 — DESCONTO NÃO É REGRA FIXA:** rosca 67% abaixo do valor pedido; "amostra pesquisada · não representa todas as vendas"; ✕ desconto igual para todo imóvel; ✕ aceitar qualquer oferta.
4. **Take 03 — NEGOCIAÇÃO = CONTEXTO:** comparáveis, tempo anunciado (cronômetro), condição do bem, capacidade real → ficha da proposta com argumentos organizados; ✕ forçar uma resposta; "Leve contexto para a conversa".
5. **CTA SISTEMA** (Histórico de cada negociação) + logo.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-NOV26-07 --source episodes/ATIVO-NOV26-07/narration_source.wav && python3 tools/build_audio.py ATIVO-NOV26-07 && bash tools/render_episode.sh ATIVO-NOV26-07
```
