# QA — ATIVO_NOV26_09 · "Anunciar acima para depois negociar" (lote 30 Reels nov/2026 · 19/11/2026)

**Fonte:** `ROTEIROS/LOTE_NOV2026/ATIVO_NOV26_09.md`. Narração do GANCHO + TAKES palavra por palavra. Reel orgânico, verde do lote #02FB3F, logo no fecho. **Primeiro com a direção de voz nova** (respira e faz suspense) gerada desde a tomada, e com pausas naturais (`shapePauses`).

## Apuração (19/11/2026)
- Raio-X FipeZAP 3º tri 2026: **desconto médio de 13% considerando só as vendas fechadas com desconto** (11% no 3º tri 2025); 67% das transações tiveram desconto; 758 respondentes, coleta 5/10–3/11/2026 ([Portas — fonte do roteiro](https://portas.com.br/noticias/intencao-de-compra-cai-enquanto-descontos-na-compra-de-imoveis-crescem-aponta-fipezap/), [Paraíba Business](https://paraibabusiness.com.br/descontos-na-compra-de-imoveis-avancam-enquanto-intencao-de-compra-recua-no-brasil/), [InfoMoney](https://www.infomoney.com.br/?p=3103082)). Relatório original não aberto.
- "Descontos médios maiores" = 13% contra 11% um ano antes (comparação anual mostrada no gráfico).
- Na tela: DESCONTO MÉDIO · SÓ NAS VENDAS COM DESCONTO · FONTE RAIO-X FIPEZAP · 758 RESPONDENTES; alerta "DESCONTO MAIOR ⇒ INFLAR O ANÚNCIO? NÃO É A MESMA CONCLUSÃO". Nenhum desconto prescrito. Busca, anúncio e ficha ILUSTRATIVOS, SEM MARCAS REAIS, sem valores.

## CTA
- No roteiro: "Qual é a objeção de proprietário mais comum para você? Comente."
- Virou a transição **"Na captação, leve preço e plano de revisão."** (texto de tela PREÇO + PLANO DE REVISÃO) + CTA SISTEMA. **Pendente de aprovação.**

## Voz
- 2 gerações (conta 2: A; conta 1: B), **ambas leram o fim da direção nova** ("sem arrastar. Nunca locutor de comercial.") depois do Take 01 e recomeçaram o texto.
- Usada **B**: mantida a 1ª leitura de gancho + Take 01 (0–18,17 s), cortados o vazamento e a repetição (18,17–39,10 s), seguida a 2ª leitura a partir do Take 02. Mesma tomada: sem diferença de tom. Fade de 12 ms na emenda, em pausa.
- **Pontos para ouvir:** "inflar anúncio**s**" (o s final se funde com "seja"; as duas transcrições ouvem singular); "Comenta SISTEMA" (forma habitual da voz).
- Pausas: 15 moldadas (maior 0,46 s), 51,5 s → 50,1 s, 170 palavras/min, 1,0× sem time-stretch.
- **Atenção:** a direção nova vazou em 2 de 2 tomadas. Se repetir no NOV26_10, propor ajuste mínimo do texto da direção (mantendo a voz).

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC · 52,44 s · −15,00 LUFS · TP −1,52 dBTP.
- `editorial_check` 0 erros / 0 avisos.
- Movimento 1,69 · maior trecho parado 1,0 s (1ª medição 1,5 s no início do Take 02 → barra-fantasma crescente e câmera contínua).
- SFX: 30 eventos, stem −38,9 LUFS; transcrição da mixagem 0,951 × narração 0,958.
- 20 + 3 + 2 quadros revisados. Corrigidos: título do gancho em 2 linhas sobre a etiqueta (virou PREÇO DE ANÚNCIO, texto de tela do roteiro), rótulo LIMITE DO FILTRO sobre o card, etiqueta FORA DO FILTRO apagada, capa com título encostando no subtítulo.
- **Legenda Instagram:** `PUBLICACAO/2026/11-novembro/semana-22-28/25-quarta/12h00/ATIVO_NOV26_09_legenda.txt` — `legenda_check` ✓ (157 palavras). Pasta: `PUBLICACAO/2026/11-novembro/semana-22-28/25-quarta/12h00/`.

## Cenas
1. **Gancho — PREÇO DE ANÚNCIO:** anúncio ilustrativo com etiqueta que sobe para ACIMA DO MERCADO; proprietário "Anuncia acima, pra ter margem."; linha ANÚNCIO → ? → PROPOSTA (ANTES DA PROPOSTA).
2. **Take 01 — O FILTRO VEM ANTES DA NEGOCIAÇÃO:** busca ilustrativa; 3 aptos semelhantes; ESTE IMÓVEL passa do LIMITE DO FILTRO → FORA DO FILTRO; ✕ NENHUMA CONVERSA.
3. **Take 02 — DADO DE DESCONTO ≠ PREÇO INFLADO:** barras 11% (3º tri 2025) e 13% (3º tri 2026), só vendas com desconto; alerta de conclusão diferente.
4. **Take 03 — PREÇO + PLANO DE REVISÃO:** ficha de captação (comparáveis, plano de preço, data de revisão, interesse medido); escuro → luz; "Preço + plano de revisão".
5. **CTA SISTEMA** (Captação de cada imóvel) + logo.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-NOV26-09 --source episodes/ATIVO-NOV26-09/narration_source.wav && python3 tools/build_audio.py ATIVO-NOV26-09 && bash tools/render_episode.sh ATIVO-NOV26-09
```
