# Estilos virais da ATIVO (formatos de edição para Instagram e TikTok)

Decisão do cliente (21/11/2026): criar **4 estilos virais de edição**, cada um documentado numa skill própria e completa em `.claude/skills/`, para variar o conteúdo e buscar alcance. Os roteiros chegam em lotes (PDF com ~50), gerados fora daqui (ex.: GPT) e entregues pelo cliente.

| # | Estilo | Skill | Status |
|---|---|---|---|
| 1 | **Cartoon explicativo** (2D chapado, raios por clima, carimbos, corte seco a cada 2–4 s, legenda karaokê no centro, fecho COMENTE "SISTEMA") | `.claude/skills/ativo-cartoon-explicativo/SKILL.md` | **ativo**: piloto `ATIVO_PILOTO_01` aprovado como base |
| 2 | a definir | — | pendente |
| 3 | a definir | — | pendente |
| 4 | a definir | — | pendente |

**Regras comuns a todos:**
- identidade ATIVO: verde `#02FB3F`, Manrope/JetBrains Mono, logo oficial;
- voz Puck 1,0× com `shapePauses`;
- CTA SISTEMA → Direct;
- apuração e integridade (sem número, logo ou pessoa real sem fonte);
- legenda do Instagram;
- QA 11/11 no render.

**Relação com a esteira de 5 estilos (21/11):** os formatos virais ficam **fora** da esteira (`novo_episodio.build(..., formato="cartoon-explicativo")` não consome a vez da esteira). Se os estilos virais vão substituir, alternar com ou se somar à esteira é **decisão pendente do cliente**.
