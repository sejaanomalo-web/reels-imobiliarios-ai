# Estilos virais da ATIVO (formatos de edição para Instagram e TikTok)

Decisão do cliente (21/11/2026): criar **4 estilos virais de edição**, cada um documentado numa skill própria e completa em `.claude/skills/`, para variar o conteúdo e buscar alcance. Os roteiros chegam em lotes (PDF com ~50), gerados fora daqui (ex.: GPT) e entregues pelo cliente.

| # | Estilo | Skill | Status |
|---|---|---|---|
| 1 | **Primeiro modelo — Cartoon explicativo** (2D chapado, raios por clima, carimbos, corte seco a cada 2–4 s, legenda karaokê no centro, fecho COMENTE "SISTEMA") | `.claude/skills/primeiro-modelo-cartoon-explicativo/SKILL.md` | **ativo**: piloto `ATIVO_PILOTO_01` aprovado como base |
| 2 | **Segundo modelo — Pictograma cinematográfico** (noir, pictograma luminoso, traço fino, sem corte seco, portal/partículas, legenda que se escreve, logo em partículas) | `.claude/skills/segundo-modelo-pictograma-cinematografico/SKILL.md` | **ativo**: piloto `ATIVO_PICTO_01` |
| 3 | **Terceiro modelo — Planta técnica** (= estilo 3 da esteira; prancha marinho, linha branca que se desenha na fala, verde só no que acende, mergulho no cômodo, fecho `CtaPlanta`) | `.claude/skills/terceiro-modelo-planta-tecnica/SKILL.md` | **ativo**: piloto `ATIVO_PLANTA_01` (23/11/2026) |
| 4 | **Quarto modelo — Maquete 3D** (maquete de miniaturas de argila em plano-sequência, clima por capítulo, placas em hastes, fluxos de pontos, holofote no corretor, cabeçalho com FONTES, fecho com módulos que acendem) | `.claude/skills/quarto-modelo-maquete-3d/SKILL.md` | **ativo**: piloto `ATIVO_MAQUETE_01` (23/11/2026) |

**Regras comuns a todos:**
- identidade ATIVO = **Sistema Visual ATIVO, Nível 1** (`MARCA/sistema-visual/README.md`): acento `#02FB3F`, atmosferas, Manrope/JetBrains Mono, logo oficial, 7 assinaturas; modelo novo segue `MARCA/sistema-visual/NOVO_MODELO.md`;
- voz Puck 1,0× com `shapePauses`;
- CTA SISTEMA → Direct;
- apuração e integridade (sem número, logo ou pessoa real sem fonte);
- legenda do Instagram;
- QA 11/11 no render.

**Relação com a esteira de 5 estilos (21/11):** os formatos virais ficam **fora** da esteira (`novo_episodio.build(..., formato="cartoon-explicativo")` não consome a vez da esteira). Se os estilos virais vão substituir, alternar com ou se somar à esteira é **decisão pendente do cliente**.
