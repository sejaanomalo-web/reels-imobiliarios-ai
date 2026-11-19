# QA — ATIVO_NOV26_11 · "Pequeno pode custar mais por metro" (lote 30 Reels nov/2026 · 19/11/2026)

**Fonte:** `ROTEIROS/LOTE_NOV2026/ATIVO_NOV26_11.md`. Narração do GANCHO + TAKES palavra por palavra. Reel orgânico, verde do lote #02FB3F, logo no fecho. Voz com a direção nova e pausas naturais (`shapePauses`). **Primeiro da pasta REELS_11_AO_20.**

## Apuração (19/11/2026)
- Índice FipeZAP (preços anunciados): imóveis de **1 dormitório têm o maior preço médio por m²** entre as tipologias, na locação (ex.: set/2026 ≈ R$ 72,68/m², [Diário do Comércio](https://diariodocomercio.com.br/economia/aluguel-sobe-dobro-inflacao-2026/)) e na venda ([InfoMoney](https://www.infomoney.com.br/?p=3395604)). Fonte do roteiro: [InfoMoney — aluguel sobe 9%](https://www.infomoney.com.br/minhas-financas/aluguel-sobe-9-em-12-meses-quase-o-dobro-da-inflacao-aponta-fipezap/).
- O roteiro fala em "alguns recortes do mercado" e não atribui número; a tela mostra só barras relativas ("EXEMPLO DE RECORTE · SEM VALORES"). Dados de venda e de aluguel não foram misturados.
- Plantas, investidor, balança e checklist ILUSTRATIVOS.

## CTA
- No roteiro: "Siga a ATIVO para mais comparações que ajudam na rotina imobiliária."
- Virou a transição **"Comece pela finalidade; o metro vem depois."** + CTA SISTEMA. Escolhida para não repetir "metragem é um critério, não a decisão" logo depois de "metro quadrado ajuda, mas não decide sozinho"; o texto de tela METRAGEM É UM CRITÉRIO, NÃO A DECISÃO ficou como título do Take 03. **Pendente de aprovação.**

## Voz
- 2 gerações (conta 2: A; conta 1: **B, usada sem edição**). Sem vazamento da direção.
- Pausas: 49,2 s → 48,0 s, 172 palavras/min, 1,0× sem time-stretch.
- **Pontos para ouvir:** "imagine/imagina" (as transcrições divergem; no A as duas ouvem "imagina"); "Comente SISTEMA" correto.

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC · 50,37 s · −15,00 LUFS · TP −1,67 dBTP.
- `editorial_check` 0 erros / 0 avisos.
- Movimento 1,88 · maior trecho parado 1,3 s (no logo final).
- SFX: 33 eventos, stem −40,1 LUFS; transcrição da mixagem 0,968 × narração 0,957.
- 18 + 4 quadros revisados. Corrigidos: etiqueta do Take 01 encostando no título, fatores cobrindo o rótulo PREÇO POR M², pilha de cartões da balança saindo pela esquerda e barra da balança aparecendo através deles; capa corrigida de "Menor ≠ mais barato" para "Menor ≠ mais barato por m²" (no preço total, o menor costuma ser mais barato).
- **Legenda Instagram:** `OUTPUT/ATIVO_NOV26_11/legenda_instagram.txt` — `legenda_check` ✓ (144 palavras). Pasta: `PUBLICACAO/NOV26/REELS_11_AO_20/11/`.

## Cenas
1. **Gancho — M² NÃO CONTA TUDO:** plantas 1 quarto × 3 quartos; barras relativas de preço por m²; MAIOR = MAIS CARO POR M²? → O TAMANHO NÃO CONTA TUDO.
2. **Take 01 — MENOR NÃO SIGNIFICA MAIS BARATO POR M²:** menor × maior com barras relativas; localização, padrão, oferta, perfil de quem compra; barras oscilam em "mudar essa relação".
3. **Take 02 — O OBJETIVO MUDA A CONTA:** balança investimento × moradia; condomínio, vacância, mobília e manutenção caem no prato do investimento; rotina, espaço e trajeto no da moradia.
4. **Take 03 — METRAGEM É UM CRITÉRIO, NÃO A DECISÃO:** checklist finalidade, custo total, funcionalidade, alternativas reais; M² AJUDA · ✕ NÃO DECIDE SOZINHO; "Primeiro a finalidade, depois o metro".
5. **CTA SISTEMA** (Perfil de cada cliente) + logo.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-NOV26-11 --source episodes/ATIVO-NOV26-11/narration_source.wav && python3 tools/build_audio.py ATIVO-NOV26-11 && bash tools/render_episode.sh ATIVO-NOV26-11
```
