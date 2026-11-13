# Auditoria de cores — 13/11/2026

Fonte canônica: `MARCA/brand.json` → `accent_color: "#3AF584"` (RGB 58,245,132). Código: `PRODUCAO/src/theme.ts` → `BRAND` + `brandAlpha(a)`.

## Inventário em `PRODUCAO/src` (antes da correção)

| Literal | Ocorrências | Função | Decisão |
|---|---|---|---|
| `rgba(53,224,161,…)` | 185 em 78 arquivos | **marca** (glow, borda, fundo de destaque, legenda) | → `rgba(58,245,132,…)`; componentes compartilhados via `brandAlpha()` |
| `#35E0A1` | `ANALISE/style_tokens.json` (1) + bolinha verde de janela em `EP-ATIVO02/scenes/Editor.tsx` (1) | marca / interface ilustrativa própria | → `#3AF584` |
| `#123A2D` · `rgba(18,58,45,…)` | 27 · 14 | **marca (tinta escura)** — fundo de selo ✓ e balão verde | → `#0E3A1F` · `rgba(14,58,31,…)` (`BRAND.deep`) |
| `#05261B` · `rgba(5,38,27,…)` · `rgba(7,40,29,…)` | 4 · 5 · 4 | **marca (tinta)** — texto escuro sobre botão verde | → `#092614` (`BRAND.ink`) e equivalentes |
| `#0E7A55` · `#BFF3DF` | 3 · 3 | marca (tinta média / clara) | → `#1D7A42` · `#CEFCE0` |
| `#FF6B5E`, `rgba(255,107,94…)`, `rgba(58,24,22…)`, `rgba(36,14,13…)`, `rgba(255,70,60…)` | — | **alerta / tensão** | mantidos |
| `#8FB4E3`, `#E8B86A`, `rgba(143,180,227…)`, `rgba(232,184,106…)` | — | semânticos (frio/âmbar) | mantidos |
| `#07080A`, `#020403`, `#16201C`, `#0F1714`… e `rgba(0,0,0…)`, `rgba(255,255,255…)` | — | **neutros** (grafite com leve tom) | mantidos |
| `#4E6A8C`, `#8C6A4E`… | — | avatares fictícios / ilustração | mantidos |
| `#FFD98A`, `#E9E3C9`, `#2A2A22` | — | ilustração (janela acesa, post-it) | mantidos |
| `#00FA44`, `#13E6A2`, `#11E6A2` | 0 | — | não encontrados |

Fotografias e interfaces de terceiros: nenhuma no código (as capturas reais ainda não estão no repositório).

## Depois

`rg -i '#35e0a1|#13e6a2|#11e6a2|#00fa44|53\s*,\s*224\s*,\s*161' PRODUCAO/src` → **0 ocorrências**.

Exceções justificadas (fora do código de cena):
- `ANALISE/style_tokens.json:41` — nota dizendo que `#35E0A1`/`#00FA44` **não** são da marca.
- `PRODUCAO/tools/editorial_check.py:11,31` — o detector que procura o verde antigo.
- Documentação (`CLAUDE.md`, `PROMPTS/GUIA_MELHORIA_CONTINUA.md`, `MARCA/DIRETRIZ…`, `PROMPTS/PROMPT_IMPLEMENTACAO…`) — menções explicativas.
- `OUTPUT/**` (68 arquivos `editaveis/`) — **histórico aprovado, não alterado nem re-renderizado** (regra do prompt).

## Limite honesto

As 185 ocorrências das cenas foram trocadas pelo novo triplet **no lugar** (`rgba(58,245,132,…)`), não convertidas uma a uma para `brandAlpha()`. A cor está correta e a classificação foi feita por função; a migração completa para o helper fica como melhoria progressiva (componentes compartilhados, kits 16:9 e o Story novo já usam `BRAND`/`brandAlpha`). O `editorial_check.py` impede a volta do verde antigo.
