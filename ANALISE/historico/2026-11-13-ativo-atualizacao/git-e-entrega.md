# Git e entrega

- Branch inicial: `claude/wizardly-newton-3y0hu5` @ `f9082dd`
- Branch nova: `feat/ativo-identidade-editorial-stories-v2` (sem force push, sem merge em `main`, nada histórico apagado)
- Commits: ver `git log claude/wizardly-newton-3y0hu5..feat/ativo-identidade-editorial-stories-v2`
- Antes do commit: `git diff --check` limpo; sem `.env`, tokens, contatos de leads ou mídia bruta privada (as capturas reais não entraram).

## Landing page (`sejaanomalo-web/LP-ATIVO`)
**Não alterada.** O repositório não está anexado a esta sessão e as capturas autorizadas (necessárias para os três cartões) não existem. O briefing está em `PROMPTS/BRIEFING_SECAO_LP_NA_PRATICA_ATIVO.md`.

Passos quando houver capturas autorizadas:
1. No repo da LP: `git checkout -b feat/secao-na-pratica` a partir da branch ativa.
2. Inserir a seção entre os 4 recursos e "Personalizado para o seu jeito de trabalhar": eyebrow NA PRÁTICA, headline "Três projetos. Três maneiras de trabalhar.", 3 cartões (Bruno: painel + site com alternância manual; Ivone: painel; Antônio: site com filtros), fechamento e CTA "Quero conhecer as possibilidades" → âncora da seção de agendamento existente.
3. `#3AF584`, tipografia 40+, 3 colunas no desktop / 1 por linha no celular, sem carrossel automático, `prefers-reduced-motion`.
4. Build, teste responsivo, commit e push só da branch; **sem merge e sem deploy**.
