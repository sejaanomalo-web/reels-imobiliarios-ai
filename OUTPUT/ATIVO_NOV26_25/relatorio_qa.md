# QA — ATIVO_NOV26_25 · "Moradias para uma população mais velha" (lote 30 Reels nov/2026 · 20/11/2026)

**Fonte:** `ROTEIROS/LOTE_NOV2026/ATIVO_NOV26_25.md`. GANCHO + TAKES narrados palavra por palavra. Reel orgânico, verde do lote #02FB3F, logo no fecho. Voz com a direção nova e pausas naturais (`shapePauses`).

## Apuração (20/11/2026)
- Em novembro de 2026 a imprensa voltou a tratar de empreendimentos para pessoas idosas (*senior living*): [Exame](https://exame.com/mercado-imobiliario/quem-esta-construindo-o-mercado-de-moradia-para-idosos-no-brasil/) (roteiro) e [Autimob, 12/11/2026](https://www.autimob.com.br/noticias/mercado-imobiliario/senior-living-ganha-espaco-no-mercado-imobiliario).
- "O Brasil envelhece" é uma tendência demográfica bem documentada (IBGE). Na tela aparece um gráfico de tendência sem números ("POPULAÇÃO 60+ ↑ · TENDÊNCIA").
- Nenhuma empresa, preço ou dado é citado.
- **Sem estereótipos:**
  - nada de bengala ou cadeira de rodas como símbolo;
  - o comprador aparece como pessoa independente;
  - tela "✕ ESTEREÓTIPOS SOBRE IDADE".
- Planta, roteiros e ficha são ILUSTRATIVOS. O vídeo não promete adaptação real.

## CTA
- Roteiro: "Que característica de um imóvel você passou a valorizar com o tempo?"
- Virou a transição **"Personalize a visita."** (texto de tela do Take 03) + CTA SISTEMA. **Pendente de aprovação.**

## Voz
- Tomadas A (conta 1) e **B (conta 2), B usada sem edição.** As duas estavam limpas; a B diz "Comente", como no roteiro.
- 46,25 s, 169 palavras/min, ASR 0,977 (127/130). 1,0× sem time-stretch.
- **Pontos para ouvir:**
  - "Imagina" (forma coloquial de "Imagine");
  - "explicar distância": o ASR ouve "explicar a distância", provavelmente ligação de sons.

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC · 48,62 s · −14,88 LUFS · TP −1,57 dBTP.
- `editorial_check` 0 erros / 0 avisos. Movimento 1,25 → **1,38** (re-render com `drift={8}` e mais flutuação) · maior trecho parado 0,8 s. SFX: 28 eventos, stem −39,8 LUFS.
- Quadros revisados (15 + 5). Corrigidos:
  - quadros vazios no início dos Takes 01, 02 e 03: os elementos entram junto com a fala;
  - gráfico do gancho encostando no título.
- **Legenda Instagram:** `OUTPUT/ATIVO_NOV26_25/legenda_instagram.txt`, `legenda_check` ✓. Pasta: `PUBLICACAO/NOV26/REELS_21_AO_30/25/`.

## Cenas
1. **Gancho — MORADIA E LONGEVIDADE:** barras de tendência 60+; "APRESENTAÇÃO PADRÃO" (piscina, gourmet, playground, "ideal para sua família"); UM ÚNICO TIPO DE FAMÍLIA?
2. **Take 01 — MORADIA É ROTINA:** planta ilustrativa percorrida (✓ elevador → acessibilidade → serviços próximos → autonomia → custos de operação); VAI ALÉM DO ELEVADOR.
3. **Take 02 — O CLIENTE DEFINE A PRIORIDADE:** comprador que busca independência; ROTEIRO PADRÃO, que perde destaque, × ROTEIRO DO CLIENTE (farmácia perto / acesso ao prédio / manutenção fácil).
4. **Take 03 — PERSONALIZE A VISITA:** "Como você quer viver?"; checklist verificado na visita; ✕ ESTEREÓTIPOS SOBRE IDADE.
5. **CTA SISTEMA** (Cada cliente com sua prioridade) + logo.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-NOV26-25 --source episodes/ATIVO-NOV26-25/narration_source.wav && python3 tools/build_audio.py ATIVO-NOV26-25 && bash tools/render_episode.sh ATIVO-NOV26-25
```
