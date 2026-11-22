# QA — ATIVO_NOV26_06 · "Menos intenção de compra, mais critério" (lote 30 Reels nov/2026 · 19/11/2026)

**Fonte:** `ROTEIROS/LOTE_NOV2026/ATIVO_NOV26_06.md`. Narração do GANCHO + TAKES palavra por palavra. Reel orgânico, verde do lote #02FB3F, logo no fecho. Voz na regra de 19/11 (aprovada pelo cliente: "gostei, siga com este padrão") e **SFX um pouco mais dinâmicos** (pedido do cliente, 19/11).

## Apuração (19/11/2026)
- Raio-X FipeZAP 3º tri 2026: intenção de comprar imóvel **nos 3 meses seguintes** caiu de **38% (3º tri 2025) para 35% (3º tri 2026)**, comparação **anual**; **758 respondentes**, coleta de 5/10 a 3/11/2026 ([InfoMoney — fonte do roteiro](https://www.infomoney.com.br/minhas-financas/imoveis-intencao-de-compra-cai-a-35-e-descontos-atingem-67-diz-fipezap/), [Portas](https://portas.com.br/noticias/intencao-de-compra-cai-enquanto-descontos-na-compra-de-imoveis-crescem-aponta-fipezap/), [Paraíba Business](https://paraibabusiness.com.br/descontos-na-compra-de-imoveis-avancam-enquanto-intencao-de-compra-recua-no-brasil/)).
- Limite: o relatório original da FipeZAP não foi aberto, só as reportagens (concordantes entre si).
- Na tela: AMOSTRA: 758 USUÁRIOS DE PORTAIS · 3º TRI 2025 → 3º TRI 2026 · FONTE: RAIO-X FIPEZAP. Gráfico com eixo a partir de zero (não exagera a queda). Leads e quadro de qualificação marcados ILUSTRATIVOS. Nada generalizado para "todos os brasileiros".

## CTA
- No roteiro: "Qual dessas três perguntas você faz primeiro? Conta nos comentários."
- Virou a transição **"Qualifique a conversa antes de insistir."** (texto de tela do Take 03) + CTA SISTEMA. **Pendente de aprovação.**

## Voz
- 7 gerações (direção e preset sem alteração; o texto "não o desaparecimento" puxa o fim da direção "Nunca locutor de comercial"):
  - conta 2: A ("aumenta a ruída"), B (leu "não o locutor de comercial"), C ("cai", "descubra o motivo", "a ruído"), D (vazamento + "tem a entrada");
  - conta 1: E ("descubra o motivo", "O interessado"), F (leu "nunca locutor de comercial"), **G usada, sem edição**.
- Emendas entre tomadas recusadas: diferença de tom de 3,5–4,2 semitons (limite 1).
- **Pontos para ouvir em G:** "aumenta **o** ruído" (artigo a mais, as duas transcrições concordam); "**Um**/O interessado" (transcrições divergem). "Comente SISTEMA" saiu correto.
- Resultado: tomada bruta 50,1 s → 45,0 s de fala (5,0 s de silêncio cortados), 192 palavras/min, 1,0× sem time-stretch.

## SFX — mais dinâmicos (pedido do cliente 19/11)
- 30 eventos (NOV26_05: 21), cada um ~2 dB mais alto (−24 a −26 dB nos principais); whoosh/swish em toda troca de cena, tick/pop/click em cada item que entra.
- Stem de efeitos −39,4 LUFS (05: −40,2). Voz na frente: transcrição da mixagem = transcrição da narração isolada (0,944 × 0,937), nenhum erro novo causado por efeito.

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC · 47,38 s · −14,91 LUFS · TP −1,71 dBTP.
- `editorial_check` 0 erros / 0 avisos.
- **Movimento 1,95** · maior trecho parado 0,6 s.
- 21 + 4 + 3 quadros revisados. Corrigidos: "?" do personagem sobre o texto do gancho, etiqueta FOTOGRAFIA sobre o 38%, quadro vazio antes dos leads (virou slots tracejados), cards perto da borda, título ausente no quadro 0.
- **Legenda Instagram:** `PUBLICACAO/2026/11-novembro/semana-22-28/24-terca/21h00/ATIVO_NOV26_06_legenda.txt` — `legenda_check` ✓ (169 palavras). Pasta: `PUBLICACAO/2026/11-novembro/semana-22-28/24-terca/21h00/`.

## Cenas
1. **Gancho — A INTENÇÃO DE COMPRA CAIU:** 35% INTENÇÃO desde o quadro 0; linha 38% → 35% (dois pontos reais); fonte; "ACABOU O COMPRADOR?".
2. **Take 01 — INTENÇÃO NÃO É VENDA:** barras 38% / 35% (eixo em zero); AMOSTRA 758 USUÁRIOS DE PORTAIS; ✓ intenção declarada / ✕ demanda sumiu; moldura de FOTOGRAFIA com flash; ✓ um grupo específico / ✓ 5/10 a 3/11/2026.
3. **Take 02 — MOMENTOS DE COMPRA DIFERENTES:** três leads ilustrativos com relógios de decisão (só pesquisando / muda em 3 meses / entrada separada); mesma mensagem "Vamos fechar amanhã?" para os três → + RUÍDO.
4. **Take 03 — QUALIFIQUE A CONVERSA:** "E aí, vai fechar?" ×3 riscado → quadro MOTIVO / PRAZO / PRÓXIMO PASSO preenchido um a um; conversa evoluindo; ✕ adivinhar o mercado; "Qualifique antes de insistir".
5. **CTA SISTEMA** (Qualificação de cada lead) + logo.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-NOV26-06 --source episodes/ATIVO-NOV26-06/narration_source.wav && python3 tools/build_audio.py ATIVO-NOV26-06 && bash tools/render_episode.sh ATIVO-NOV26-06
```
