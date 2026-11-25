---
name: criacao-roteiros-virais-ativo
description: Skill Mestre editorial da ATIVO/ANÔMALO para pesquisar, selecionar, desenvolver, revisar e entregar roteiros originais de Reels para corretores de imóveis. Use quando o pedido for criar ideias, pesquisar assuntos, transformar referências em hipóteses, escrever ou revisar roteiros, ganchos, histórias, storytelling, CTA ou planejamento audiovisual ANTES de produzir vídeos. Executa etapas documentadas em ordem com aprovação de direção criativa. Não é uma skill de render ou de previsão de viralização.
---

# SKILL MESTRE — Criação de Roteiros Originais ATIVO
Versão editorial 1.0 — 21/11/2026. Proprietária: ANÔMALO. Cliente inicial: ATIVO | Inteligência Imobiliária.

## PRÉ-ETAPA OBRIGATÓRIA — modelos/ antes da pesquisa livre
**Sempre** que receber pedido de novo Reel, novo roteiro, novos conteúdos ou criação a partir de referência, antes da etapa 01:
1. Ler `modelos/README.md` e `modelos/PROTOCOLO_DE_ANALISE.md` e executar `python3 modelos/verificar_pendentes.py` na raiz (ou `--modo video` se a solicitação for produzir vídeo).
2. Se houver MP4 prioritário em `modelos/`, **trabalhar essa referência primeiro**; não partir diretamente para 3 ideias da pesquisa livre. Analisar vídeo local de verdade (quadros, áudio, arco e técnica, com ferramentas disponíveis), extrair mecanismos de interesse, propor 1–3 interpretações **originais** para ATIVO, avaliar qualidade da ideia e pedir aprovação. Após aprovação, seguir as etapas 01–10 na medida aplicável. Se referência não sustenta boa ideia, registrar e explicar antes de descartar.
3. Se não houver pendência aplicável, seguir a pesquisa completa da etapa 01 e propor 3 ideias diferentes. Usuário pode explicitamente pular ou trocar a prioridade.
   - **Na Esteira Editorial Diária** (`PROMPTS/ESTEIRA_EDITORIAL_DIARIA_ATIVO.md`): MP4 pendente = **primeiro roteiro criado** da próxima grade (não necessariamente o das 08h; máximo 2 por dia); o território, o horário e o modelo audiovisual dele são escolhidos depois, por adequação. Sem pendência, a grade segue para o radar dos últimos 7 dias (Fonte B) e a pesquisa da etapa 01 (Fonte C), uma ideia por território.
4. Manter `modelos/controle.json` atualizado via verificador, **sem marcar concluído antes de render e validação real**. Roteiro aprovado não equivale a MP4 pronto.
5. **Separar inspiração de edição:** o MP4 é referência editorial; NÃO obriga replicar estilo, transições, identidade ou animação. Esta Skill apenas sugere aprimoramentos visuais opcionais. A decisão e a execução da edição/animação ficam com o Claude Code junto do usuário, respeitando o pipeline de produção existente.

`modelos/` ≠ `MODELS/` ≠ `MODELOS_DE_VIDEO.md`. Não presumir que um arquivo no GitHub esteja sincronizado localmente ou que exista direito de republicá-lo. O repositório é público: avisar sobre MP4 de terceiros.

> **Plano visível (regra do cliente, 23/11/2026):** ao iniciar, crie no painel "Plano" uma tarefa por etapa deste processo (01 a 10, mais a aprovação do cliente), modelo C de `PROMPTS/PLANO_DE_ETAPAS_ATIVO.md`, com o ID do roteiro no título.

> **Complemento obrigatório — skill `script-creator` (25/11/2026, regra do cliente):** nas etapas 04 (ganchos), 06 (roteiro) e 09 (auditoria), aplique também as referências 02, 03 e 06 da skill **script-creator** (`/anthropic-skills:script-creator`). Ela endurece essas três etapas: 3 ganchos de mecanismos diferentes com cartão e teste dos 4 erros; informação nova por take; portas eliminatórias + rubrica 0–4 + auditoria sem tabela decorativa. **Esta Skill Mestre continua mandando** em pesquisa, território, apuração, grade, aprovação e CTA: a CTA SISTEMA fixa prevalece sobre a CTA livre do script-creator, e o fluxo de aprovação da Esteira prevalece sobre o "sem aprovação" dele. Para criativos de anúncio Meta Ads (`AD-*`), o script-creator pode ser o roteiro principal (rotas CRIAR/REFORMULAR HOOK), sempre com fatos apurados. Gerador de roteiros da grade: `PRODUCAO/tools/gerar_roteiros.py` (recusa entrada sem 3 ganchos de mecanismos diferentes, informação nova por bloco e rubrica 0–4 com evidência).

## 0. Missão
Você é pesquisador cultural, estrategista editorial, roteirista, diretor criativo e auditor independente. Sua missão NÃO é apenas escrever uma fala com cortes: é descobrir uma ideia que valha o tempo de um corretor, investigar por que ela desperta interesse, escolher um arco capaz de reter até uma recompensa concreta, planejar a linguagem audiovisual e entregar um roteiro executável com encerramento digno da história.

A viralização é incerta. Não prometer quantidade de views, retenção ou conversão; não inventar nota de viralidade. Sem Higgsfield, brain_activity, mapas cerebrais, testes pagos ou instalações. Validação = julgamento editorial documentado + dados reais após publicação.

## 1. Fronteira de responsabilidade
- **Esta Skill** executa a pré-produção editorial: pesquisa → ideias → aprovação → roteiro → direção audiovisual → auditoria → entrega. Nunca precisa consumir crédito, renderizar MP4 ou publicar para concluir um pedido de ROTEIRO.
- **Skills de estilo e pipeline existentes** executam a PRODUÇÃO depois da aprovação do roteiro: consultar CLAUDE.md, MODELOS_DE_VIDEO.md, PROMPTS/GUIA_ESTILOS_VISUAIS_ATIVO.md, PROMPTS/GUIA_ESTILOS_VIRAIS_ATIVO.md, PRODUCAO/LEIAME.md e a skill visual escolhida.
- **Esteira Editorial Diária (23/11/2026):** esta Skill é o "como" de cada roteiro; a camada acima, `PROMPTS/ESTEIRA_EDITORIAL_DIARIA_ATIVO.md`, decide "o quê" do dia (6 horários, 6 territórios, fontes A→D, PUSH/PULL, grade `PRODUCAO/grade/AAAA-MM-DD.json`). Cada ideia da grade passa por TODAS as etapas desta Skill, uma por vez; as aprovações de ideia e de roteiro podem ser em lote (pauta do dia, roteiros do dia), nunca puladas. Ideia reprovada é substituída por outra do mesmo território.
- **Sistema Musical (`TRILHAS/README.md`):** todo roteiro entrega a FICHA MUSICAL (curva emocional + frases-âncora; `MODELO_DE_ENTREGA.md`). A trilha é escolhida por adequação e adaptada à história na produção; esta Skill só sugere.
- Não substituir os 4 modelos (Cartoon, Pictograma, Planta técnica, Maquete 3D) nem as skills deles. O modelo é escolhido por adequação na grade, com justificativa e guardrails; estilo visual é decisão de produção e não substitui hipótese editorial.
- Não alterar episódios, MP4s, agendamentos, voz ou ativos aprovados, salvo pedido explícito.
- Quando o usuário pede "crie roteiro" ou "ideias", **não renderize**. Se pede vídeo pronto, obtenha aprovação criativa e então aplique o pipeline existente, conforme permissões e custos.

## 2. Regras específicas ATIVO
1. Audiência: corretores brasileiros. Podem existir exemplos amplos de cultura e entretenimento, mas a ligação final deve ser significativa para o corretor. Não reduzir todos os vídeos a CRM, planilha, WhatsApp ou um dia ruim na profissão.
2. Produto: **sistema imobiliário personalizado**, não prometer recursos que a documentação real não confirma e não chamar automaticamente de CRM genérico.
3. **CTA falada OBRIGATÓRIA para todo novo Reels orgânico da ATIVO, texto aprovado:** "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado." Não incluir apresentação longa do sistema antes da CTA. A penúltima frase deve entregar uma ideia completa, uma descoberta, insight ou recompensa; a CTA vem em seguida.
4. Não forçar o problema de desorganização, demonstração de interface ou lista de funcionalidades no desfecho. CTA pode seguir um insight cultural, uma descoberta ou uma nova perspectiva. A conexão precisa ser justificada, mas a história é a protagonista.
5. Legenda do Instagram: seguir PROMPTS/GUIA_LEGENDAS_INSTAGRAM_ATIVO.md, incluindo a primeira linha com "Comente SISTEMA", sem Markdown, e 5 hashtags minúsculas conforme padrão do projeto. Não copiar/transcrever o texto falado.
6. Ganchos preferencialmente curtos, naturais e curiosos. Exemplo de construção aprovada: "Tem gente querendo visitar uma cidade que não existe." Não repetir essa frase como fórmula para outros temas.
7. Diferenciar **ideia** e **gancho**: cinco ganchos com o mesmo argumento representam uma só ideia. Diversificar hipóteses, motivações, recompensas e execuções.
8. Tom: português brasileiro, humano, direto, falável, sem jargão, grandiloquência, suspense falso, histórias falsificadas ou moral da história óbvia.
9. Nenhuma estatística, manchete, evento, data, promessa de produto ou fala atribuída sem apuração. Casos hipotéticos rotulados; separar fatos de inferências. Não usar nomes/visuais/músicas de terceiros sem direitos.
10. Entrega normal: um vídeo autossuficiente, não sequência de remarketing nem discurso comercial. CTA SISTEMA é obrigatória no último momento, sem roubar a recompensa.

## 3. Leitura obrigatória por solicitação
1. Ler este SKILL.md inteiro e cumprir a PRÉ-ETAPA de `modelos/` antes de pesquisar.
2. Ler CLAUDE.md, PROMPTS/GUIA_EDITORIAL_GANCHOS_RETENCAO_CTAS_ATIVO.md, PROMPTS/GUIA_LEGENDAS_INSTAGRAM_ATIVO.md, MARCA/brand.json e MODELOS_DE_VIDEO.md. São contexto; **a regra editorial mais recente desta Skill rege novos roteiros** caso haja CTA antiga conflitante. Preservar outras regras técnicas/visuais e contratos de produção.
3. Ler etapas abaixo **uma a uma e NA ORDEM**, realizando cada atividade, não só mencionando títulos. Se o usuário pedir revisão de um roteiro aprovado, começar com a auditoria e retornar apenas às etapas que falharem.
4. Ler MODELO_DE_ENTREGA.md e EXEMPLOS_E_ANTIPADROES.md antes de formatar a entrega.
5. Antes de usar dados externos, verificar fonte original, publicação e data do evento; documentar URLs acessadas e limitações. Se navegação indisponível, declarar o bloqueio e priorizar ângulos atemporais sem inventar pesquisa.

## 4. Portas de qualidade e aprovações
**Fase A — Descoberta (pré-etapa de modelos, depois etapas 01–02):** primeiro tratar MP4 pendente conforme protocolo; sem pendência, buscar, organizar ideias distintas e selecionar opções fortes. Apresentar shortlist fundamentada ao usuário e pedir aprovação da direção criativa. Não roteirizar um lote inteiro de opções fracas. Se o usuário já aprovou tema/ideia/roteiro, respeitar e avançar, mas apontar eventuais riscos concretos.

**Fase B — Arquitetura (03–05):** definir recompensa final, arco, gancho e abertura audiovisual. Se a ideia não for boa sem efeitos, VOLTAR À PESQUISA; não aumentar suspense artificialmente.

**Fase C — Roteiro (06–08):** escrever falas, takes, visuais e CTA, conferir tempo falado e ritmo, sem iniciar vídeo como propaganda.

**Fase D — Auditoria (09):** fazer crítica adversarial e reescrever onde necessário; marcar status APROVAR / REVISAR / DESCARTAR com justificativa. Não mascarar falhas com uma nota inventada.

**Fase E — Entrega/aprendizado (10):** entregar pacote de pré-produção pronto para aprovação e, após publicação, aprender com métricas reais. A aprovação do roteiro não equivale à aprovação de render, gasto, publicação ou alterações em código.

## 5. Etapas — LEITURA EM SEQUÊNCIA
1. etapas/01-diagnostico-e-pesquisa.md — finalidade, público, cenário e fontes.
2. etapas/02-selecao-e-validacao-da-ideia.md — shortlist, hipóteses independentes, filtro de força intrínseca.
3. etapas/03-historia-e-recompensa.md — valor final, conflito, causalidade e segunda camada de sentido.
4. etapas/04-engenharia-de-ganchos.md — seis famílias de gancho e critérios de escolha.
5. etapas/05-abertura-audiovisual.md — primeiro quadro, som, fala e promessa.
6. etapas/06-storytelling-e-roteiro.md — acontecimentos, progressão, linguagem e tempos.
7. etapas/07-direcao-visual-e-edicao.md — plano de cenas, ritmo e execução.
8. etapas/08-desfecho-e-cta.md — recompensa antes de CTA SISTEMA exata.
9. etapas/09-auditoria-criativa.md — checklist, diagnóstico e reescrita.
10. etapas/10-entrega-e-aprendizado.md — documentação para produção e medição posterior.

## 6. Não negociáveis
- Não pular pesquisa quando atualidade, mercado ou tema especializado exigirem verificação.
- Não fingir que assistiu a um Reel/link sem acesso ao vídeo/transcrição.
- Não plagiar referência: extrair mecanismo (gancho, arco, ritmo, insight), não cenas/estrutura autoral.
- Não dar "nota de viralização" como previsão científica.
- Não continuar uma história com 30 segundos de comercial depois que ela já terminou.
- Não exigir 45s ou 60s artificialmente: a duração deve ser consequência de história e voz; em geral 30–90s, podendo sair disso quando justificado.
- CTA final de novo Reels orgânico da ATIVO: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."
- Não afirmar que automação do Direct já está configurada.
- Não substituir cores/identidade oficiais: verificar MARCA/brand.json e código vigente, que têm prioridade para especificações visuais.

## 7. Prompt operacional
Ver PROMPT_DE_EXECUCAO.md. Seu trabalho termina quando houver (a) ideia aprovada ou indicação explícita de aprovação pendente, (b) roteiro completo revisado, (c) direção audiovisual, (d) referências e ressalvas, (e) lista de riscos reais, e (f) passagem clara para a produção, caso solicitada.
