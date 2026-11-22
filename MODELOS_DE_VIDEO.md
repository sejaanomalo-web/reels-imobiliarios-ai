# Modelos de vídeo da ATIVO

> **Não confundir:** a pasta nova `modelos/` (minúsculas) guarda MP4 enviados pelo usuário como **referências editoriais prioritárias para novos roteiros**; este arquivo e as skills existentes tratam **dos estilos visuais da produção**. A Skill Mestre analisa a referência e sugere recursos opcionais. O usuário define o estilo/edição com o Claude Code, observando as regras técnicas vigentes do projeto.

> **Um universo visual, vários modelos.** Todos os modelos herdam o **Sistema Visual ATIVO (Nível 1)**: `MARCA/sistema-visual/README.md` (regras e 7 assinaturas) + `tokens.json` (valores). O registro técnico de cada modelo (Nível 2) fica em `MARCA/sistema-visual/modelos.json`. **Modelo novo (3º, 4º, …):** siga `MARCA/sistema-visual/NOVO_MODELO.md` (a skill `ativo-sistema-visual` faz isso automaticamente). Ele só fica pronto com `python3 PRODUCAO/tools/sistema_visual_check.py` sem erros e a revisão visual.

Cada modelo é um estilo viral de edição para Instagram e TikTok, com manual completo (skill), kit de código e um vídeo-piloto de referência. Para produzir num modelo, peça ao Claude Code "faça no **Primeiro modelo**" (ou no segundo, terceiro…): ele lê a skill inteira antes de começar.

| Modelo | Nome | Manual (skill) | Kit de código | Piloto de referência | Status |
|---|---|---|---|---|---|
| **Primeiro modelo** | **Cartoon explicativo** | [`.claude/skills/primeiro-modelo-cartoon-explicativo/SKILL.md`](.claude/skills/primeiro-modelo-cartoon-explicativo/SKILL.md) | `PRODUCAO/src/estilos/cartoon.tsx` | `OUTPUT/pilotos/ATIVO_PILOTO_01/` ("Concorrente ou parceiro?") | ✅ pronto (21/11/2026) |
| **Segundo modelo** | **Pictograma cinematográfico** | [`.claude/skills/segundo-modelo-pictograma-cinematografico/SKILL.md`](.claude/skills/segundo-modelo-pictograma-cinematografico/SKILL.md) | `PRODUCAO/src/estilos/pictograma.tsx` | `OUTPUT/pilotos/ATIVO_PICTO_01/` ("Ninguém te avisa quando um cliente desiste") | ✅ pronto (21/11/2026) |
| Terceiro modelo | — | — | — | — | reservado (aguardando referências; criar por `MARCA/sistema-visual/NOVO_MODELO.md`) |
| Quarto modelo | — | — | — | — | reservado (idem) |
| 5º, 6º, … | — | — | — | — | o registro não tem limite: cada novo modelo entra em `modelos.json` |

**Primeiro modelo — Cartoon explicativo**, em uma linha: 2D chapado com personagens de recorte; fundo de raios com a cor das atmosferas do Nível 1; vinheta e holofote; carimbos e pop elástico; corte seco a cada 2–4 s; legenda karaokê no centro; fecho cartoon "COMENTE: SISTEMA" → Direct. Prévia: [`referencias/piloto_24_quadros.jpg`](.claude/skills/primeiro-modelo-cartoon-explicativo/referencias/piloto_24_quadros.jpg).

**Segundo modelo — Pictograma cinematográfico**, em uma linha:
- noir (preto com centro morno, vinheta forte);
- boneco-pictograma branco luminoso; ícones e cenários em linha fina;
- só o `ACENTO` `#02FB3F` como acento;
- sem corte seco: portal, apagar a luz com âncora, partículas, travelling;
- títulos que saem do desfoque; legenda que se escreve;
- fecho com o logo ATIVO montado por partículas.

Prévia: [`referencias/piloto_24_quadros.jpg`](.claude/skills/segundo-modelo-pictograma-cinematografico/referencias/piloto_24_quadros.jpg).

**Regras comuns a todos os modelos:**
- **Sistema Visual ATIVO (Nível 1):** `MARCA/sistema-visual/README.md`. Ele define acento `#02FB3F`, atmosferas, Manrope/JetBrains Mono, logo oficial, as 7 assinaturas, área segura e qualidade;
- voz Puck 1,0×;
- CTA SISTEMA;
- apuração;
- QA 11/11 + `sistema_visual_check` (o `editorial_check` já roda);
- os modelos virais ficam **fora** da esteira de 5 estilos (que também herda o Nível 1).
