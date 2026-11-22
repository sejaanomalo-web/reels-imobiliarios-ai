# PROMPT MESTRE — ATIVO | Correção da identidade, aprimoramento editorial, 5 Stories e briefing da LP

Você está no Claude Code, responsável pelo sistema audiovisual real da **ATIVO | Inteligência Imobiliária**, voltado principalmente a **corretores de imóveis 40+**. Sua tarefa é **auditar e IMPLEMENTAR** melhorias no editor existente com máximo cuidado para preservar o que já foi aprovado. Não quero uma proposta abstrata: quero mudanças verificáveis, testes, piloto e, onde possível, os cinco vídeos entregues.

## 0. CONTEXTO E REPOSITÓRIOS

**Editor de vídeos (repositório principal desta tarefa):**
`https://github.com/sejaanomalo-web/reels-imobiliarios-ai`

**Landing page (repositório separado, segunda etapa):**
`https://github.com/sejaanomalo-web/LP-ATIVO`

**Constatação já verificada:** a branch `main` do editor tem basicamente materiais de referência; a branch de desenvolvimento `claude/wizardly-newton-3y0hu5` possui Remotion, logo, marca, roteiros, áudio, vídeos, vozes aprovadas e produção. **Parta da branch de código vigente, não de `main` por engano.** Reconfirme a árvore do Git no início: pode ter mudado após a elaboração deste prompt.

No repositório do editor, os arquivos de referência editorial adicionados pelo proprietário devem aparecer nestes caminhos:
- `MARCA/DIRETRIZ_IDENTIDADE_VISUAL_ATIVO.md`
- `PROMPTS/GUIA_EDITORIAL_GANCHOS_RETENCAO_CTAS_ATIVO.md`
- `ROTEIROS/stories/ROTEIRO_5_STORIES_NA_PRATICA_ATIVO.md`
- `PROMPTS/BRIEFING_SECAO_LP_NA_PRATICA_ATIVO.md`

Se algum estiver ausente, trabalhe com o conteúdo enviado nesta sessão quando disponível, registre a ausência e não substitua silenciosamente por algo inventado. **Não sobrescreva esses documentos aprovados só para reformular frases.**

## 1. PRÉ-VOO: GIT E BACKUP

1. `pwd`, `git status --short --branch`, `git remote -v`, `git branch -avv`, `git fetch --all --prune`.
2. Não descartar mudanças locais de usuário. Se houver alterações não commitadas, preservá-las e documentar; criar worktree/branch segura se necessário.
3. Verificar a branch `claude/wizardly-newton-3y0hu5` e qualquer branch mais nova com editor funcional. Ler `CLAUDE.md`, `PROMPTS/GUIA_MELHORIA_CONTINUA.md`, `MARCA/brand.json`, `ANALISE/style_tokens.json`, `PRODUCAO/LEIAME.md`, `PRODUCAO/package.json`, `PRODUCAO/src/theme.ts`.
4. Criar nova branch **a partir da branch efetiva de produção do editor**, sugerida `feat/ativo-identidade-editorial-stories-v2`. **Não trabalhar em `main` e não sobrescrever a branch antiga.**
5. Antes de qualquer mudança: registrar commit-base e status em `ANALISE/historico/2026-11-13-ativo-atualizacao/estado-inicial.md`.

## 2. IDENTIDADE VISUAL — FONTE CANÔNICA

O **verde oficial já registrado no GitHub** é `#3AF584` (RGB 58,245,132). O arquivo `MARCA/brand.json` já tem `approved: true` e `accent_color: "#3AF584"`; `PRODUCAO/src/theme.ts` também já usa `#3AF584`.

O problema está na **inconsistência**: `ANALISE/style_tokens.json` ainda mostra `#35E0A1`; componentes, cenas e versões antigas do vídeo da LP contêm `rgba(53,224,161,...)`, correspondentes ao verde-água. O antigo `#00FA44` foi apenas amostragem aproximada de imagem — **não o use como cor oficial**.

### Fazer
- Inventariar por arquivo e ocorrência os acentos hard-coded. Comandos sugeridos (adaptar caso use `rg`):
  - `rg -n -i '#35e0a1|#13e6a2|#11e6a2|#00fa44|rgba\(\s*53\s*,\s*224\s*,\s*161|rgb\(\s*53\s*,\s*224\s*,\s*161|#3af584|58\s*,\s*245\s*,\s*132' MARCA ANALISE PRODUCAO PROMPTS CLAUDE.md`
  - Ampliar para todas as literais hex/`rgba` em arquivos `.tsx/.ts/.json/.css`, classificando-as por **marca / neutra / alerta / fotografia / interface de terceiro / histórico**.
- Conferir `PRODUCAO/src/theme.ts`, `PRODUCAO/src/components/Background.tsx`, `PRODUCAO/src/components/Captions.tsx`, componentes reutilizáveis, cenas e kits 16:9 (`LP-ATIVO`, `LP-ATIVO-V2`, `LP-ATIVO-V3`).
- Atualizar `ANALISE/style_tokens.json` e remover a indicação de identidade provisória onde contradiz o brand kit já aprovado. `MARCA/brand.json` prevalece.
- Manter `C.accent = '#3AF584'` ou, preferencialmente, centralizar o token em uma única origem importável. Definir helper de transparência, por exemplo `brandAlpha(alpha)` → `rgba(58,245,132,alpha)`, para eliminar repetições em SVG, glow, bordas, backgrounds e legenda.
- Atualizar acentos da marca nas cenas em uso, inclusive `rgba(53,224,161,...)`, sem alterar cores semânticas de alerta (`#FF6B5E`), fotografias, interfaces reais ou materiais históricos de `OUTPUT/`.
- Garantir uso do **arquivo de logo aprovado** (`MARCA/logo/ativo_logo_transparente.png` e `PRODUCAO/public/brand/ativo_logo.png`). Não redesenhar, deformar nem substituir por palavra tipográfica genérica quando o arquivo existe. Corrigir comentários ultrapassados indicando logo ausente.
- Gerar imagem comparativa antes/depois, com amostras e frames representativos, documentada em `logs/.../cores-antes-depois.md`.

### Não fazer
- Não executar find/replace cego em todos os RGBA: classifique a função de cada cor.
- Não re-renderizar automaticamente todo `OUTPUT/`, que contém entregas históricas aprovadas.
- Não alterar voz, timbre, modelo ou velocidade por causa da revisão visual.
- Não criar efeitos verde-água em novas composições.

## 3. REVISÃO DE DOCUMENTAÇÃO EXISTENTE

O `CLAUDE.md` e alguns prompts antigos ainda dizem que a marca não foi definida, o símbolo não está no repositório ou que o único CTA é link na bio. Isso está desatualizado.

Atualize apenas os trechos conflitantes, preservando aprendizados válidos:
- Marca ATIVO e `#3AF584` **aprovados**;
- Produto: **sistema imobiliário personalizado para corretores de imóveis**;
- Voz oficial aprovada no `VOZ/voice_preset.json` e nas decisões de `PROMPTS/GUIA_MELHORIA_CONTINUA.md`: **1.0x, sem aceleração, sem substituição não autorizada**;
- CTA é uma **decisão por episódio**: Stories podem usar agendamento, conteúdo editorial pode pedir comentário, e vários episódios aprovados usam `COMENTE SISTEMA` → Direct. **Não substituir em lote as CTAs já aprovadas.**
- Os episódios existentes preservam roteiro, locução, arte e produção historicamente aprovados.

Integre os novos arquivos de `PROMPTS/` como referências editoriais. Não copie integralmente PDFs/DOCXs licenciados para o repositório. O guia consolidado é o material destinado ao GitHub.

## 4. APRIMORAMENTO DO PROCESSO EDITORIAL

Antes de produzir material novo, validar por episódio: público, situação real de corretor, motivação, crença, hipótese central, função C1–C5, insight verificável, abertura, progressão, recompensa e CTA específico.

Ganchos devem ser concretos e originais, não frases de marketing genéricas. Não mudar um gancho apenas para reproduzir um template. Variação real de motivação, história e execução visual. Retenção é narrativa, não cortes sem propósito.

Checagens automáticas ou semiautomáticas úteis:
- falta de CTA/destino definido;
- uso não comprovado de “garantido”, “triplicar”, “em X dias”, depoimento fictício;
- corte/legenda em área insegura;
- fonte muito pequena para 40+;
- cor divergente;
- uso de mockup gerado como se fosse sistema verdadeiro.

Adicionar a orientação editorial na documentação e/ou template de storyboard vigente, **sem quebrar o pipeline de produção de episódios já existentes**.

## 5. PRODUÇÃO DOS CINCO STORIES “NA PRÁTICA”

Leia `ROTEIROS/stories/ROTEIRO_5_STORIES_NA_PRATICA_ATIVO.md`. Produzir **5 Stories independentes** de 1080×1920, 30fps, com padrão Remotion atual.

**Narrativa:** (1) três projetos/curiosidade; (2) Bruno — painel + site; (3) Ivone — painel e identidade; (4) Antônio — site e filtros; (5) personalização da ATIVO + agendamento.

**Assets esperados (somente depois de autorizado e higienizado):** `PRODUCAO/public/cases/ativo/bruno_painel.webp`, `bruno_site.webp`, `ivone_painel.webp`, `antonio_site.webp`. Os seis screenshots originais equivalem a apenas quatro imagens únicas; não anunciar “seis projetos”. Se os nomes dos arquivos forem diferentes, ajustar o mapa em um único arquivo de dados.

### Condições de segurança e integridade
- Antes de usar screenshots reais, revisar se há nomes de leads, celulares, e-mails, métricas internas, detalhes de atendimento e marcas sem autorização. Criar cópias sanitizadas de uso público, sem publicar as versões brutas.
- Obter autorização comercial para divulgar nomes/marcas de Bruno, Ivone e Antônio. **Na ausência de autorização, produzir prévia interna anonimizando tudo; não renderizar uma versão identificada como pronta para publicar.**
- Não inventar telas de CRM ou diálogo de assistente que as capturas não demonstram.
- Não representar número de leads como resultado de vendas.

### Linguagem audiovisual
- Fundo preto/grafite, off-white, acento `#3AF584` e glow da mesma cor; logo oficial.
- Forte legibilidade para corretores 40+, uma ideia por quadro; motion de captura real com crop, pan, zoom leve, highlights precisos e transição de objeto.
- Áudio: reutilizar **preset vocal aprovado** e a velocidade 1.0x. Trilha minimalista com licença compatível; efeitos discretos e abaixo da voz.
- Timeline vinculada à locução real, não forçar corte que atropela frase. Não usar a mesma transição em todos os Stories.
- Reservar área para sticker de link do Instagram no quinto Story, que será inserido na plataforma (MP4 não contém sticker clicável).

**CTA quinto Story:** Agendar demonstração em `https://cal.com/anomalohub/demonstracao-do-sistema-imobiliario`. Uma alternativa WhatsApp pode existir na LP, mas evitar oferecer dois destinos concorrentes no mesmo sticker.

### Implementação
- Reaproveitar `PRODUCAO/src/Root.tsx`, componentes e pipeline; não criar outro projeto concorrente.
- Criar `PRODUCAO/episodes/STORY-ATIVO-01` ... `05` e `PRODUCAO/src/episodes/STORY-ATIVO-01` ... `05` (ou adaptar à convenção real), com voz, legendas, cena, timeline e capa.
- Registrar composições no Remotion Root. Manter formato de saída e naming consistentes.
- **Render de validação:** primeiro STORY-ATIVO-01, conferir cor/voz/áreas seguras; depois os outros quatro quando não houver bloqueios.
- Saídas: 5 MP4 H.264/AAC, 5 posters/capas, arquivos de edição, legendas quando existentes, relatório de QA e créditos de áudio.

## 6. LANDING PAGE — SEGUNDA ETAPA, EM REPOSITÓRIO SEPARADO

Usar `PROMPTS/BRIEFING_SECAO_LP_NA_PRATICA_ATIVO.md` para orientar alterações no repo `LP-ATIVO` **somente se ele estiver acessível no workspace com permissão e com estado Git verificado**. Criar uma branch específica a partir da branch ativa desse repositório, sem misturar commits entre dois projetos. Se a LP não estiver clonada, entregar briefing com instruções aplicáveis, sem alegar que foi alterada.

A nova seção “Três projetos. Três maneiras de trabalhar.” deve entrar entre recursos e personalização, com três cartões e capturas reais autorizadas; usar `#3AF584`, transições discretas, tipografia 40+ e CTA para a seção de agendamento. Preservar hero, vídeo, copy já aprovada, links e responsive. Não fazer deploy automático.

## 7. TESTES, QA, LOGS

- Rode `cd PRODUCAO && npm ci && npm run lint` (o `lint` existente valida ESLint e TypeScript), corrigindo erros criados sem refatorar todo o histórico.
- Rodar as verificações e renders previstas em `PRODUCAO/LEIAME.md`. Se houver problema de modelo/credencial, manter narração aprovada existente, registrar o bloqueio e não trocar de voz.
- Fazer busca final por `#35E0A1`, `rgba(53,224,161,...)`, tokens aquosos e usos ativos da marca no código. Exceções válidas devem ser justificadas por caminho/linha.
- Verificar layout e legibilidade de 1080×1920 e, se houver mudança no vídeo horizontal, 1920×1080.
- Validar MP4 com `ffprobe`, inspecionar frames representativos, revisar ortografia, áudio, logo e safe areas.
- Criar em `ANALISE/historico/2026-11-13-ativo-atualizacao/`: `estado-inicial.md`, `auditoria-cores.md`, `alteracoes.md`, `qa.md`, `assets-e-autorizacoes.md`, `licencas.md`, `git-e-entrega.md`, capturas antes/depois. **Não registrar segredos, dados pessoais nem amostras privadas em logs públicos.**

## 8. GIT E ENTREGA

- Antes de commitar: `git diff --check`, `git status`, revisão de arquivos adicionados e ausência de `.env`, tokens, contatos reais, downloads privados ou mídia bruta sem permissão.
- Commit de código e documentação na branch nova, sem force push, sem merge em `main`, sem apagar material histórico.
- Push: `git push -u origin feat/ativo-identidade-editorial-stories-v2` (ou nome equivalente se necessário). Se bloqueado por credencial, registrar e entregar comandos específicos; **não alegar push feito**.
- No `LP-ATIVO`, caso haja implementação, criar branch, commit e push próprios e **não fazer deploy automático**.
- Resposta final deve listar: branch inicial, nova branch, commits, push, principais arquivos ajustados, HEX adotado, locais exatos de substituição, testes executados, status de cada Story, bloqueios de assets/autorização, status da LP e caminhos dos logs.

## PRIORIDADES DE EXECUÇÃO

**P0:** corrigir fonte canônica e inconsistências de verde; confirmar marca/voz sem regressões.

**P1:** integrar guia editorial e atualizar contradições de documentação.

**P2:** renderizar Story piloto e depois cinco Stories, com ativos autorizados.

**P3:** entregar briefing ou implementar seção separada na LP em branch própria.

Comece agora pela inspeção do repositório, não pela reescrita do pipeline. Em toda etapa, privilegie mudanças pequenas, testes reais e preservação do material aprovado. Não invente sucesso de render, publicação, deploy ou push.
