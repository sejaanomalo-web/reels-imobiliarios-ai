# QA — ATIVO_NOV26_20 · "Mais oferta em Curitiba, mesma pergunta" (lote 30 Reels nov/2026 · 19–20/11/2026)

**Fonte:** `ROTEIROS/LOTE_NOV2026/ATIVO_NOV26_20.md`. GANCHO + TAKES narrados palavra por palavra. Reel orgânico, verde do lote #02FB3F, logo no fecho. Voz com a direção nova e pausas naturais (`shapePauses`).

## Apuração (19/11/2026)
- Portas (2026, dados FipeZap): a ampliação da oferta de imóveis para locação ajudou a **moderar o ritmo dos reajustes** em Curitiba; os aluguéis **seguem em alta** e a procura segue firme ([Portas](https://portas.com.br/noticias/mais-oferta-reduz-ritmo-de-alta-dos-alugueis-em-curitiba-mas-procura-segue-firme/), [Bem Paraná](https://www.bemparana.com.br/noticias/economia/aluguel-curitiba/)).
- **Nenhum número na narração nem na tela.** O gráfico é ILUSTRATIVO · SEM ESCALA (oferta subindo; ritmo do reajuste diminuindo, mas sempre positivo: "AINDA SOBE, MAIS DEVAGAR"; "✕ QUEDA GENERALIZADA"). BAIRROS FICTÍCIOS sem valores; endereço ILUSTRATIVO.

## CTA
- Roteiro: "Marque o corretor que atua com locação em Curitiba."
- Virou a transição **"Dado local decide."** (texto de tela do Take 03) + CTA SISTEMA. **Pendente de aprovação.**

## Voz
- Tomada **A** (conta 1, 19/11, gerada antes da cota estourar) e tomada **B** (conta 2, 20/11, depois da renovação).
- B descartada: "Dado o local desse" e "Comenta". **A usada sem edição.**
- 47,51 s, 168 palavras/min, ASR 0,977 (130/133). 1,0× sem time-stretch.
- **Pontos para ouvir:** "olha imóveis comparáveis" (o modelo usa "olha" no lugar de "olhe" nas duas tomadas, como o "Imagina"); "Dado local decide"; "atendimentos" no CTA.

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC · 49,88 s · −15,02 LUFS · TP −1,68 dBTP.
- `editorial_check` 0 erros / 0 avisos. Movimento 1,28 → **1,53** (re-render com mais deriva de câmera e flutuação) · maior trecho parado 1,0 s. SFX: 31 eventos, stem −39,4 LUFS.
- Quadros revisados (15 + 5). Corrigidos:
  - tag "PARA ALUGAR" sobre o título;
  - lógica das janelas dos prédios (quase todas acendiam juntas);
  - cartão do endereço perto do título.
- **Legenda Instagram:** `OUTPUT/ATIVO_NOV26_20/legenda_instagram.txt`, `legenda_check` ✓ (131 palavras). Pasta: `PUBLICACAO/NOV26/REELS_11_AO_20/20/`.

## Cenas
1. **Gancho — MAIS OFERTA, MENOS PRESSÃO?:** dois prédios cujas janelas acendem como "para alugar"; "ALUGUEL ↓ ?"; 📍 CURITIBA · MAIS COMPLICADO.
2. **Take 01 — DESACELERAR NÃO É CAIR:** gráfico ilustrativo com linha de oferta subindo e barras de ritmo do reajuste menores, mas positivas; AINDA SOBE, MAIS DEVAGAR; ✕ QUEDA GENERALIZADA.
3. **Take 02 — BAIRROS NÃO REAGEM IGUAL:** BAIRRO 1 (muitos novos) × BAIRRO 2 (quase sem oferta nova); PROCURA / PADRÃO / PREÇOS com tendências diferentes; COMPORTAMENTOS DIFERENTES · BAIRROS FICTÍCIOS.
4. **Take 03 — DADO LOCAL DECIDE:** cartão ESTE ENDEREÇO com comparáveis hoje / tempo de anúncio / velocidade de fechamento; NOTÍCIA DA CIDADE ≠ ANÁLISE DO ENDEREÇO; "Dado local decide".
5. **CTA SISTEMA** (Cada endereço com seus dados) + logo.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-NOV26-20 --source episodes/ATIVO-NOV26-20/narration_source.wav && python3 tools/build_audio.py ATIVO-NOV26-20 && bash tools/render_episode.sh ATIVO-NOV26-20
```
