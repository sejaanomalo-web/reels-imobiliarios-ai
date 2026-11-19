# QA — ATIVO_NOV26_12 · "Sete em dez imóveis novos em SP" (lote 30 Reels nov/2026 · 19/11/2026)

**Fonte:** `ROTEIROS/LOTE_NOV2026/ATIVO_NOV26_12.md`. Narração do GANCHO + TAKES palavra por palavra. Reel orgânico, verde do lote #02FB3F, logo no fecho. Voz com a direção nova e pausas naturais (`shapePauses`).

## Apuração (19/11/2026)
- Secovi-SP (Pesquisa do Mercado Imobiliário): nos últimos 12 meses, o **Minha Casa Minha Vida respondeu por cerca de 7 em cada 10 imóveis residenciais NOVOS vendidos na CAPITAL paulista**; em ago/2026, 71% (7.707 unidades). A metodologia conta como MCMV as unidades financiadas nas faixas 1, 2 e 3 ([Mercado & Consumo](https://mercadoeconsumo.com.br/06/09/2026/economia/minha-casa-minha-vida-domina-mercado-e-evidencia-fragilidade-nos-demais-setores/), [Portas](https://portas.com.br/mercado-imobiliario/estoque-de-imoveis-sp-mcmv-secovi/)).
- **Fonte do roteiro não acessível nesta sessão:** [Registro de Imóveis](https://www.registrodeimoveis.org.br/mcmv-responde-por-sete-entre-dez-imoveis-vendidos-em-sp) (o host não está liberado na rede do ambiente); conteúdo conferido pelo resumo da busca e pelas reportagens acima.
- Na tela: CAPITAL DE SP · IMÓVEIS NOVOS · 12 MESES · FONTE SECOVI-SP; ✕ TODO O BRASIL ✕ USADOS; SEM PROMETER ENQUADRAMENTO. Mapa, personagem, perguntas e roteiro ILUSTRATIVOS. Nada sobre Cascavel.

## CTA
- No roteiro: "Qual é a dúvida que você mais recebe sobre o primeiro imóvel?"
- Virou a transição **"Cada dúvida respondida prepara o comprador."** (texto de tela CONTEÚDO QUE PREPARA O COMPRADOR) + CTA SISTEMA. **Pendente de aprovação.**

## Voz
- 2 gerações (conta 2: A, com "Se/Você percebe" e "entra" ambíguos; conta 1: **B, usada sem edição**). Sem vazamento da direção.
- 53,2 s → 52,2 s, 166 palavras/min, 1,0× sem time-stretch.
- **Pontos para ouvir:** "explique entrada" (as duas vogais se emendam; transcrições ouvem "a entrada"/"entra"); "só planta" (Whisper ouve "sua"); "Secovi" (o i final sai fraco); "dúvidas que recebe no" (soa "recebem no").

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC · 54,51 s · −15,03 LUFS · TP −1,66 dBTP.
- `editorial_check` 0 erros / 0 avisos.
- Movimento 1,49 · maior trecho parado 0,9 s.
- SFX: 29 eventos, stem −39,5 LUFS; transcrição da mixagem 0,931 × narração 0,941 (mesmas divergências; nenhuma causada por efeito).
- 17 + 3 quadros revisados. Corrigidos: etiqueta do mapa sobre o título, portais deslocados e cortando na borda, fachada encolhida sobre a etiqueta do roteiro.
- **Legenda Instagram:** `OUTPUT/ATIVO_NOV26_12/legenda_instagram.txt` — `legenda_check` ✓ (155 palavras). Pasta: `PUBLICACAO/NOV26/REELS_11_AO_20/12/`.

## Cenas
1. **Gancho — 7 EM 10 EM SP:** 10 casas, 7 acendem; "7 em 10"; MINHA CASA MINHA VIDA; recorte na etiqueta; casas pulsam em "tamanho desse mercado".
2. **Take 01 — 7 EM 10 · IMÓVEIS NOVOS · CAPITAL SP:** mapa ilustrativo com 7 de 10 blocos; CAPITAL DE SP / IMÓVEIS NOVOS / 12 MESES / FONTE SECOVI-SP; ✕ TODO O BRASIL ✕ USADOS.
3. **Take 02 — EXPLIQUE O PROCESSO:** comprador de primeira moradia atravessa os portais ENTRADA, CRÉDITO, CUSTOS, ETAPAS (? → ✓); SEM PROMETER ENQUADRAMENTO.
4. **Take 03 — CONTEÚDO QUE PREPARA O COMPRADOR:** planta e fachada diminuem; perguntas do atendimento viram ROTEIRO DE VÍDEO EDUCATIVO; ✓ COMO COMEÇAR; "Cada dúvida respondida prepara o comprador".
5. **CTA SISTEMA** (Dúvidas de cada comprador) + logo.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-NOV26-12 --source episodes/ATIVO-NOV26-12/narration_source.wav && python3 tools/build_audio.py ATIVO-NOV26-12 && bash tools/render_episode.sh ATIVO-NOV26-12
```
