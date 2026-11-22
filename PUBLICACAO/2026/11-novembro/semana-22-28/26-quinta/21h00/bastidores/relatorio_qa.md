# QA — ATIVO_NOV26_18 · "Aluguel sobe mais que inflação" (lote 30 Reels nov/2026 · 19/11/2026)

**Fonte:** `ROTEIROS/LOTE_NOV2026/ATIVO_NOV26_18.md`. GANCHO + TAKES narrados palavra por palavra. Reel orgânico, verde do lote #02FB3F, logo no fecho. Voz com a direção nova e pausas naturais (`shapePauses`).

## Apuração (19/11/2026)
- **Índice FipeZAP de Locação Residencial, outubro/2026:** +9,01% em 12 meses, +0,49% no mês; IPCA de 12 meses 4,63%. Fontes: reportagens de Diário do Comércio, Gazeta do Povo e Jornal do Comércio. A fonte do roteiro (InfoMoney) não foi aberta, e o comunicado primário da FipeZAP não apareceu na busca.
- O índice usa **preços de anúncios** (pedidos). O reajuste de contrato vigente segue o índice e a periodicidade pactuados, dentro das regras aplicáveis. Nenhum índice contratual específico é citado como obrigatório.
- Tela: ALUGUEL +9,01% (ANUNCIADO) · FIPEZAP · OUT/2026 · IPCA 12M: 4,63% · SEU CONTRATO "+9%?" riscado + "✕ NÃO É AUTOMÁTICO" · ÍNDICE DE ANÚNCIO ≠ REAJUSTE CONTRATUAL · PREÇO DE ANÚNCIO ≠ PREÇO FECHADO · MÉDIA NACIONAL ≠ SEU BAIRRO. Bairros **sem valores** (MAPA ESTILIZADO); painel, anúncios e contrato ILUSTRATIVOS. A curva de 12 meses mostra só a forma da alta, sem valores mensais.

## CTA
- Roteiro: "Salve para explicar essa diferença sem confundir o cliente."
- Virou a transição **"Comece pelo dado certo."** (texto de tela do Take 03) + CTA SISTEMA. **Pendente de aprovação.**

## Voz
- 2 gerações (conta 1).
  - **B descartada:** diz "subirão" (futuro) no lugar de "subiram"; os dois ASR confirmam.
  - **A usada sem edição:** "FipeZAP" vai ao modelo como "Fipe Zap" (mapa de pronúncia do 07).
- 51,74 s, 161 palavras/min, ASR 0,949 (130/139). 1,0× sem time-stretch.
- **Pontos para ouvir:** "FipeZAP" (o ASR ouve "Fip Zap/FIPSAP"); "Pro corretor" (forma coloquial de "Para o corretor"); "confira imóveis" (emendado); "Comenta SISTEMA".

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC · 54,08 s · −14,99 LUFS · TP −1,69 dBTP. Movimento 1,32 · maior trecho parado 1,3 s (fecho com logo).
- `editorial_check` 0 erros / 0 avisos.
- SFX: 34 eventos, stem −39,6 LUFS; trilha −37,7 LUFS; mix −14,97 LUFS, TP −1,96 dBTP (pré-master).
- 16 + 4 quadros revisados. Corrigidos:
  - cartão "SEU CONTRATO" cobrindo o +9,01%: o cartão desceu e o selo foi para cima dele;
  - "OFERTA ⇄ DEMANDA" colado no título: movido para baixo do mapa.
- **Legenda Instagram:** `PUBLICACAO/2026/11-novembro/semana-22-28/26-quinta/21h00/ATIVO_NOV26_18_legenda.txt`, `legenda_check` ✓ (136 palavras). Pasta: `PUBLICACAO/2026/11-novembro/semana-22-28/26-quinta/21h00/`.

## Cenas
1. **Gancho — ALUGUEL +9,01%:** painel de locação com curva de 12 meses e contador; fonte FipeZAP e IPCA; cartão SEU CONTRATO "+9%?" riscado: NÃO É AUTOMÁTICO.
2. **Take 01 — ÍNDICE DE ANÚNCIO ≠ REAJUSTE CONTRATUAL:** etiquetas ALUGUEL ANUNCIADO (preço pedido) × CONTRATO VIGENTE (em vigor / pactuado / regras aplicáveis); os dois se chocam: MISTURAR = ATENDIMENTO RUIM.
3. **Take 02 — A MÉDIA NÃO É O SEU BAIRRO:** mapa estilizado de bairros com tendências diferentes e sem valores; fluxo oferta ⇄ demanda; PREÇO DE ANÚNCIO ≠ PREÇO FECHADO; MÉDIA NACIONAL ≠ SEU BAIRRO.
4. **Take 03 — COMECE PELO DADO CERTO:** proprietário e locatário; checklist comparáveis / contrato / legislação; indicadores separados; "Comece pelo dado certo".
5. **CTA SISTEMA** (Cada locação no lugar certo) + logo.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-NOV26-18 --source episodes/ATIVO-NOV26-18/narration_source.wav && python3 tools/build_audio.py ATIVO-NOV26-18 && bash tools/render_episode.sh ATIVO-NOV26-18
```
