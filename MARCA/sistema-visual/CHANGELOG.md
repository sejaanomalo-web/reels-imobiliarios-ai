# Sistema Visual ATIVO — histórico de versões

Regra: toda mudança em `tokens.json` ou nas regras obrigatórias do `README.md` ganha uma entrada aqui, com a nova versão no topo (semver: correção `x.y.Z`, adição compatível `x.Y.0`, quebra `X.0.0`). O validador reprova se a versão de `tokens.json` não for a do topo deste arquivo **ou** se a impressão digital (`tokens.json sha256`) registrada na versão do topo não bater com o arquivo. Mudar um token exige nova versão e novo hash (`sha256sum MARCA/sistema-visual/tokens.json`). Restaurar a v1.0.0 a qualquer momento: `git checkout sistema-visual-v1.0.0 -- MARCA/sistema-visual`.

## 1.0.0 — 2026-11-22

tokens.json sha256: `69b2677a2746d06692397aac7bace41d8eb3c021d459f56f99f3941f71c05bca`

Criação do Sistema Visual ATIVO (Nível 1), a partir da auditoria dos dois modelos existentes e da esteira de 5 estilos.

- **Acento único `#02FB3F`** (verde da seta do logo oficial, medido `#02FF46`; decisão do cliente de 17/11/2026, já em uso em toda a produção nova). `#3AF584` passa a ser oficialmente **legado** (episódios até 16/11/2026). Corrige a contradição entre `MARCA/brand.json`/`DIRETRIZ`/`CLAUDE.md` (`#3AF584`) e o código (`#02FB3F`).
- **7 atmosferas semânticas** compartilhadas (neutra, explicação, dilema, dados, memória, tensão, solução), só com preto, grafite, azul-marinho e os tons de alerta e de solução.
- **Tipografia:** Manrope 800/700 + JetBrains Mono (só dados); escala, mínimos (24/30 px), contorno ou sombra obrigatórios e no máximo 3 textos além da legenda.
- **Tela:** área segura + coluna de botões do Reels (x ≥ 950, y 1150–1760) sem texto.
- **7 assinaturas ATIVO**, princípios de ilustração, movimento e qualidade; governança de evolução.
- **Partículas e poeira sutis passam a ser permitidas** (≤ 0,3 de opacidade e ≤ 4 px), revogando a proibição genérica da diretriz de 13/11. Continuam proibidos glitch, HUD, ciano e neon azul.
- **Impacto nos modelos:**
  - Cartoon: "pergunta" sai do roxo para o marinho profundo; "dados" sai do ciano para o marinho com grade; "sepia" vira o grafite morno da memória; o "ganho" deixa de ser um campo verde: a luz verde fica localizada atrás do protagonista (raio de 760 px, raios a 0,035); as outras atmosferas ficam com luz mais localizada (raio de 1100 em vez de 1250); confete sem vermelho e sem azul.
  - Pictograma: os tokens passam a vir do Nível 1 (diferença imperceptível) e a legenda sai da coluna de botões (margem direita de 130 px).
- **Episódios entregues não foram refeitos.**
