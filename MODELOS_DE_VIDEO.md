# Modelos de vídeo da ATIVO

Cada modelo é um estilo viral de edição para Instagram e TikTok, com manual completo (skill), kit de código e um vídeo-piloto de referência. Para produzir num modelo, peça ao Claude Code "faça no **Primeiro modelo**" (ou no segundo, terceiro…): ele lê a skill inteira antes de começar.

| Modelo | Nome | Manual (skill) | Kit de código | Piloto de referência | Status |
|---|---|---|---|---|---|
| **Primeiro modelo** | **Cartoon explicativo** | [`.claude/skills/primeiro-modelo-cartoon-explicativo/SKILL.md`](.claude/skills/primeiro-modelo-cartoon-explicativo/SKILL.md) | `PRODUCAO/src/estilos/cartoon.tsx` | `OUTPUT/ATIVO_PILOTO_01/` ("Concorrente ou parceiro?") | ✅ pronto (21/11/2026) |
| **Segundo modelo** | **Pictograma cinematográfico** | [`.claude/skills/segundo-modelo-pictograma-cinematografico/SKILL.md`](.claude/skills/segundo-modelo-pictograma-cinematografico/SKILL.md) | `PRODUCAO/src/estilos/pictograma.tsx` | `OUTPUT/ATIVO_PICTO_01/` ("Ninguém te avisa quando um cliente desiste") | ✅ pronto (21/11/2026) |
| Terceiro modelo | — | — | — | — | aguardando referências |
| Quarto modelo | — | — | — | — | — |

**Primeiro modelo — Cartoon explicativo**, em uma linha: 2D chapado com personagens de recorte; fundo de raios com cor por clima; vinheta e holofote; carimbos e pop elástico; corte seco a cada 2–4 s; legenda karaokê no centro; fecho cartoon "COMENTE: SISTEMA" → Direct. Prévia: [`referencias/piloto_24_quadros.jpg`](.claude/skills/primeiro-modelo-cartoon-explicativo/referencias/piloto_24_quadros.jpg).

**Segundo modelo — Pictograma cinematográfico**, em uma linha:
- noir (preto com centro morno, vinheta forte);
- boneco-pictograma branco luminoso; ícones e cenários em linha fina;
- só o verde `#02FB3F` como acento;
- sem corte seco: portal, apagar a luz com âncora, partículas, travelling;
- títulos que saem do desfoque; legenda que se escreve;
- fecho com o logo ATIVO montado por partículas.

Prévia: [`referencias/piloto_24_quadros.jpg`](.claude/skills/segundo-modelo-pictograma-cinematografico/referencias/piloto_24_quadros.jpg).

**Regras comuns a todos os modelos:**
- identidade ATIVO: verde `#02FB3F`, Manrope, logo oficial;
- voz Puck 1,0×;
- CTA SISTEMA;
- apuração;
- QA 11/11;
- os modelos virais ficam **fora** da esteira de 5 estilos.
