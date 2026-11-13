# ATIVO — Briefing para nova seção da Landing Page

**Repositório de destino:** `sejaanomalo-web/LP-ATIVO` (separado do editor de vídeo). **Não atualizar produção sem aprovação.**

## Inserção

Após os quatro recursos atuais (Gestão de imóveis, CRM de clientes, Assistente com IA, Leads das campanhas) e antes de “Personalizado para o seu jeito de trabalhar”.

**Eyebrow:** NA PRÁTICA

**Headline:** Três projetos. Três maneiras de trabalhar.

**Texto de apoio:** Veja algumas soluções que já desenvolvemos para a rotina de corretores de imóveis.

## Três cartões

**Bruno Souza** — **Painel e site trabalhando juntos.** Painel para acompanhar a carteira de imóveis e site próprio para apresentar opções. Imagens autorizadas: `bruno_painel.webp`, `bruno_site.webp`.

**Ivone Peris** — **Organização com identidade própria.** Painel com visão geral dos imóveis e contatos, com identidade personalizada. Imagem: `ivone_painel.webp`.

**Antônio Carlos** — **Uma busca pensada para o comprador.** Site com filtros por cidade, tipo de imóvel e quartos. Imagem: `antonio_site.webp`.

**Fechamento:** O que os projetos têm em comum? Cada solução parte da rotina do corretor.

**CTA:** Quero conhecer as possibilidades → seção de agendamento já existente.

## Design / acessibilidade

- Respeitar a identidade premium da LP, usando verde de marca `#3AF584`, branco e preto/grafite.
- Três cartões desktop, um por linha no celular, sem carrossel automático.
- Fonte clara e confortável para 40+, cards amplos e hover/scroll suaves, com `prefers-reduced-motion`.
- Capturas reais com zoom/crop responsivo e alternância manual entre painel/site Bruno, se necessário.
- Não colocar números de leads como resultados ou depoimentos falsos.
- Sem screenshots publicados com dados de clientes, sem autorização dos corretores.

## Implementação/QA

Reutilizar stack e componentes atuais da LP; criar nova branch somente no repositório LP; testar a responsividade, build, imagens e CTA; registrar no `/logs` do projeto. Não fazer merge nem deploy automático.
