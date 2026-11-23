# Prompt — Revisão e implementação da Esteira Editorial 6x/dia da ATIVO

Quero que você atue como **arquiteto editorial + responsável pelo pipeline do projeto ATIVO** e avalie uma evolução importante da nossa esteira de conteúdo.

**NÃO aplique nada imediatamente. Primeiro estude o sistema atual, critique a proposta abaixo e me dê seu parecer. Se você CONCORDAR que ela melhora o processo e é compatível com a arquitetura existente, implemente-a no repositório com documentação clara, sem destruir histórico e sem publicar posts durante esta tarefa. Se discordar de algum ponto estrutural, pare antes de implementar esse ponto, explique o conflito e proponha a alternativa.**

## 1. Antes de opinar, leia o processo atual por completo
Leia pelo menos:
- `CLAUDE.md`;
- `.claude/skills/criacao-roteiros-virais-ativo/SKILL.md`;
- todos os documentos de `.claude/skills/criacao-roteiros-virais-ativo/etapas/`;
- `.claude/skills/criacao-roteiros-virais-ativo/MODELO_DE_ENTREGA.md`;
- `modelos/README.md`;
- `modelos/PROTOCOLO_DE_ANALISE.md`;
- `modelos/controle.json`;
- `MODELOS_DE_VIDEO.md`;
- as skills dos 4 modelos de vídeo vigentes;
- `PROMPTS/GUIA_ESTILOS_VIRAIS_ATIVO.md`;
- `PROMPTS/GUIA_EDITORIAL_GANCHOS_RETENCAO_CTAS_ATIVO.md`;
- `PROMPTS/GUIA_MELHORIA_CONTINUA.md`;
- `PROMPTS/PLANO_DE_ETAPAS_ATIVO.md`;
- `PRODUCAO/LEIAME.md`;
- a estrutura e as ferramentas de `PUBLICACAO/` e os scripts de programação/publicação usados hoje.

Considere todas as decisões vigentes: CTA, identidade visual, voz, integridade, apuração, programação e QA. Não rebaixe regras de segurança, veracidade, licenciamento ou qualidade.

## 2. Objetivo da nova esteira
A ATIVO terá **6 vídeos por dia**, distribuídos nos horários já vigentes:
**08:00, 10:00, 12:00, 15:00, 18:00 e 21:00 — horário de Brasília.**

Os vídeos serão distribuídos em Instagram, TikTok e YouTube Shorts pelo pipeline já existente.

O objetivo NÃO é produzir 6 posts aleatórios nem criar 6 versões do mesmo argumento. Queremos uma grade que tenha:
- alto potencial de atenção e compartilhamento;
- atualidade;
- entretenimento;
- cultura;
- utilidade para corretores;
- autoridade editorial;
- ligação natural com a ATIVO;
- variedade visual;
- aprendizagem pelos resultados reais.

Não queremos transformar a ATIVO em um perfil chato de CRM, planilhas, leads e dicas previsíveis.

## 3. Os seis territórios editoriais
A esteira diária deve garantir seis **funções editoriais distintas**. Elas são territórios, não fórmulas rígidas.

### TERRITÓRIO 1 — AGORA
Conteúdo baseado em fato recente, preferencialmente ocorrido/publicado nos **últimos 7 dias (168 horas)**.

Pode envolver:
- mercado imobiliário;
- economia ligada a imóveis;
- financiamento/habitação;
- construção e arquitetura;
- cidades;
- tecnologia/IA;
- turismo;
- comportamento;
- cultura ou acontecimentos que tenham implicação real para o nicho.

**Por quê:** dá atualidade, hábito de acompanhamento e autoridade.

**Regra:** notícia fraca não vira Reel apenas por ser nova. Verificar data do evento e publicação, fonte primária ou confiável e separar correlação de causalidade.

Idealmente teremos **1 notícia forte por dia** e podemos usar uma segunda quando houver pauta realmente boa. A segunda notícia pode ocupar outro território se também cumprir a função dele.

### TERRITÓRIO 2 — E SE...?
Cenários hipotéticos, extremos ou aparentemente absurdos usados para abrir uma pergunta irresistível e depois raciocinar de forma coerente.

Exemplos de espírito, NÃO para copiar sempre:
- "O que aconteceria se todos os corretores sumissem da face da Terra ao mesmo tempo?"
- "O que aconteceria se um corretor tivesse exclusividade sobre todos os imóveis do mundo?"

**Por quê:** é nosso território mais deliberadamente curioso/sensacionalista, pensado para alcance e entretenimento.

**Regra:** sensacionalismo na premissa, rigor no desenvolvimento. Não fingir que hipótese é fato. O raciocínio precisa gerar uma conclusão que valha assistir até o fim.

### TERRITÓRIO 3 — FORA DA BOLHA
Cultura pop, jogos, cinema, séries, esportes, tecnologia, cidades, luxo, turismo, comportamento e fenômenos da internet.

O exemplo conceitual que já funcionou para nós foi GTA/Vice City/Miami: o interesse não vinha de "falar de GTA", mas da descoberta de que uma história sobre lugares e desejo podia gerar uma reflexão relevante para corretores.

**Por quê:** amplia alcance para além de quem já procura conteúdo imobiliário.

**Regra:** não pegar trend e colar CRM no final. Precisa existir uma interseção genuína com lugar, desejo, compra, percepção, atendimento, venda, profissão ou mercado.

### TERRITÓRIO 4 — CORRETOR NA VIDA REAL
Situações profissionais muito específicas e reconhecíveis: visita, cliente que volta, imóvel indisponível, negociação, proprietário, follow-up, documentação, atendimento, carteira, captação etc.

**Por quê:** identificação e relevância direta.

**Regra:** evitar dores genéricas como "você perde leads?". Começar por uma cena, decisão ou tensão concreta.

### TERRITÓRIO 5 — HISTÓRIA QUE ENSINA
Casos reais verificáveis, curiosidades, histórias de cidades/edifícios/mercado, transformações urbanas, episódios históricos, decisões empresariais ou histórias humanas que tenham arco e recompensa.

**Por quê:** storytelling aumenta profundidade e autoridade sem virar aula.

**Regra:** a história vale por si só. A "lição para o corretor" deve nascer da narrativa, não ser uma moral artificial.

### TERRITÓRIO 6 — IDEIA QUE MUDA O JOGO
Conteúdo autoral de mudança de percepção: tese contrária, princípio, reflexão, descoberta ou visão própria da ATIVO.

Exemplos de espírito:
- "Talvez você não precise de mais leads."
- "O melhor corretor não é necessariamente quem conhece mais imóveis."
- "Seu maior ativo pode não estar no Instagram."

**Por quê:** constrói uma visão editorial própria da marca e gera desejo de acompanhar a ATIVO, não apenas consumir curiosidades.

**Regra:** a tese precisa ser defendida por raciocínio concreto. Não usar frases de efeito vazias.

## 4. Fontes de conteúdo — ordem de prioridade
Antes de montar o dia, o Claude deve considerar quatro fontes:

### FONTE A — CURADORIA HUMANA: `modelos/`
Esta é a prioridade editorial máxima.

Antes de criar QUALQUER roteiro, execute o verificador da pasta `modelos/`.

Se houver um MP4 pendente:
- ele deve ser o **primeiro roteiro CRIADO/ANALISADO da próxima esteira**;
- isso NÃO significa que será publicado às 08h;
- analise a referência segundo `modelos/PROTOCOLO_DE_ANALISE.md`;
- extraia ideia, gancho, mecanismo de curiosidade, arco, ritmo, recompensa e motivo de compartilhamento;
- crie uma adaptação original para ATIVO;
- classifique o novo conteúdo no território editorial que realmente combina com ele;
- escolha DEPOIS o horário e o modelo audiovisual mais adequados;
- referência manual tem prioridade de análise, mas **não garantia de publicação**: se gerar ideia fraca, explique e descarte conforme a Skill Mestre;
- por padrão use no máximo **2 referências manuais por dia**, salvo pedido explícito para lote de modelos;
- mantenha `modelos/controle.json` atualizado para não reutilizar o mesmo modelo como se fosse novo.

### FONTE B — RADAR DOS ÚLTIMOS 7 DIAS
Pesquisar diariamente pautas relevantes das últimas 168 horas. Fazer curadoria, não scraping editorial automático.

Separar pelo menos:
- forte o suficiente para vídeo agora;
- interessante para guardar;
- relevante, porém chato/fraco para Reel.

A atualidade nunca substitui a força da ideia.

### FONTE C — PESQUISA ORIGINAL DA SKILL
Usar a Skill Mestre para descobrir ideias perenes, conexões culturais, histórias, hipóteses, perguntas e mudanças de percepção.

### FONTE D — APRENDIZADO DO PERFIL
Quando houver métricas reais, usar desempenho anterior como sinal:
- alcance;
- retenção disponível;
- tempo médio;
- compartilhamentos;
- salvamentos;
- comentários SISTEMA;
- diferenças entre IG/TikTok/YouTube;
- território;
- modelo visual;
- duração;
- horário.

Não transformar correlação de poucos vídeos em lei. Aprender por padrões recorrentes.

## 5. PUSH e PULL
Use esta lente para equilibrar o dia.

**PUSH:** conteúdo que ganha atenção de alguém que não estava buscando o tema — E SE...?, notícia curiosa, cultura, história, descoberta.

**PULL:** conteúdo em que a pessoa já reconhece um problema ou interesse profissional — rotina, aplicação, sistema, organização, técnica.

Como orientação, não quota rígida, buscar algo próximo de **4 PUSH + 2 PULL por dia**. Se o dia pedir outra proporção, justificar.

## 6. Como montar os 6 conteúdos
Não obrigue os seis vídeos a falar do mesmo tema.

O que dá unidade ao perfil é:
- os seis territórios;
- a visão editorial da ATIVO;
- a qualidade da Skill Mestre;
- CTA e identidade;
- os quatro modelos audiovisuais;
- o aprendizado contínuo.

Cada vídeo precisa funcionar isoladamente e ter sua própria hipótese.

Não criar:
- 6 vídeos sobre "organização";
- 6 ganchos para a mesma dor;
- 6 notícias só porque são recentes;
- 6 vendas disfarçadas do sistema.

Pode haver especiais temáticos quando fizer sentido, mas não como regra diária.

## 7. Horários — Claude deve FAZER O MATCH, não seguir tema fixo cegamente
Os horários permanecem:
**08h / 10h / 12h / 15h / 18h / 21h BRT.**

Não quero fixar para sempre "território X = horário Y". Quero que você analise o conjunto diário e decida qual conteúdo faz mais sentido em cada horário.

Use como heurística, não lei:
- manhã cedo: atualidade, descoberta rápida, pauta que cria hábito;
- meio da manhã: curiosidade/hipótese forte;
- almoço: conteúdo acessível, cultural ou notícia extra;
- tarde: identificação, aplicação e rotina;
- 18h: narrativa/história com alto apelo;
- 21h: conteúdo mais forte, reflexivo, autoral ou de grande recompensa.

Mas a **adequação do conteúdo** tem prioridade. Explique brevemente o match de cada vídeo com o horário.

Um conteúdo vindo de `modelos/` pode ser o primeiro roteiro criado e ser programado às 18h ou 21h se esse for o melhor slot.

## 8. Os 4 modelos audiovisuais — avaliar um conflito atual
Hoje o repositório possui quatro modelos:
1. Cartoon explicativo;
2. Pictograma cinematográfico;
3. Planta técnica;
4. Maquete 3D.

Existe atualmente uma regra de **rotação obrigatória 1 → 2 → 3 → 4**.

A nova estratégia propõe que o Claude leia as quatro skills e escolha o **modelo que potencializa melhor cada roteiro**, mantendo diversidade ao longo do dia/semana.

Antes de alterar essa regra, quero seu PARECER técnico/editorial:
- A rotação fixa é melhor para diversidade e robustez do pipeline?
- Ou seleção por adequação narrativa produz vídeos melhores?
- Dá para manter diversidade sem prender cada roteiro ao "modelo da vez"?

Minha preferência estratégica é **adequação narrativa primeiro**, com guardrails de diversidade, por exemplo:
- usar os 4 modelos ao longo do dia sempre que fizer sentido;
- como temos 6 vídeos, dois modelos naturalmente se repetirão;
- evitar o mesmo modelo em vídeos consecutivos quando outro servir igualmente bem;
- evitar um modelo dominar o dia/semana sem evidência de que isso é desejável;
- não escolher um formato só para cumprir distribuição;
- métricas futuras podem orientar o match território × formato.

Estes são GUARDRAILS propostos, não uma ordem para quebrar o pipeline. Analise a implementação atual (`esteira.py`, `novo_episodio.py`, checks e skills) e diga se a mudança é segura.

Também trate as características dos quatro modelos como **sugestões de compatibilidade**, nunca como prisão. Leia cada skill antes de escolher.

## 9. Processo de roteirização continua sendo a Skill Mestre
Depois da curadoria diária, cada vídeo deve passar pela Skill Mestre atual:
modelos/radar/pesquisa → filtro da ideia → recompensa → história causal → gancho → abertura audiovisual → roteiro → direção sugerida → desfecho → CTA → auditoria.

Não reduza a Skill Mestre a "preencher os seis slots".

Se uma ideia falhar na auditoria:
- substitua a ideia;
- não tente salvá-la com edição;
- preserve a função editorial do slot, mas procure outro assunto.

CTA vigente para novos Reels:
**"Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado."**

A frase imediatamente anterior deve ser a recompensa/conclusão da história. Não criar segundo bloco de propaganda.

## 10. Edição e animação
A Skill editorial pode sugerir:
- movimento;
- enquadramento;
- metáfora visual;
- match cut;
- pausa;
- SFX;
- ritmo;
- tipo de transição.

Mas essas são recomendações para potencializar o roteiro.

A implementação final da edição, animação e estética deve acontecer no Claude Code dentro da skill do modelo audiovisual escolhido e do Sistema Visual ATIVO.

Não copiar a estética de um MP4 de `modelos/` só porque ele inspirou o roteiro.

## 11. Programação
Depois que um conteúdo estiver aprovado, produzido e validado tecnicamente:
- associar território + modelo + horário;
- colocar no slot escolhido da data;
- usar o pipeline vigente de `PUBLICACAO/` e banco/publicadores;
- programar IG, TikTok e YouTube Shorts conforme as integrações existentes e regras atuais;
- respeitar timezone BRT;
- não duplicar o mesmo conteúdo no mesmo destino;
- manter rastreabilidade entre roteiro, episódio, arquivo final, território, modelo e horário.

Durante ESTA tarefa de revisão da estratégia, **não publique nem programe posts reais**. Apenas implemente a arquitetura/processo se aprovada no seu parecer.

## 12. O que eu quero que você faça AGORA
### FASE A — AUDITORIA E PARECER (antes de editar)
1. Crie um plano visível conforme `PROMPTS/PLANO_DE_ETAPAS_ATIVO.md`.
2. Leia os arquivos atuais.
3. Resuma como a criação e publicação funcionam hoje.
4. Compare a proposta acima com o processo vigente.
5. Identifique conflitos, duplicidades e riscos.
6. Dê seu parecer:
   - **CONCORDO**;
   - **CONCORDO COM AJUSTES**; ou
   - **NÃO CONCORDO**, com justificativa.
7. Dê atenção especial à rotação fixa dos 4 modelos versus seleção por adequação, à prioridade de `modelos/`, ao radar de notícias e aos horários.

### FASE B — IMPLEMENTAÇÃO
**Somente se seu parecer for CONCORDO ou CONCORDO COM AJUSTES compatíveis com o objetivo:**
1. Crie uma documentação central da **Esteira Editorial Diária 6x/dia** em local coerente do repositório.
2. Integre-a à Skill Mestre sem duplicar desnecessariamente instruções.
3. Atualize `CLAUDE.md` com um ponteiro/regra curta, mantendo o documento legível.
4. Atualize `modelos/` para deixar explícito: referência pendente = primeiro roteiro criado, mas horário/território/modelo são escolhidos por adequação.
5. Ajuste a lógica dos 4 modelos SOMENTE se seu parecer recomendar; preserve histórico dos episódios já produzidos.
6. Se substituir rotação fixa, atualize com cuidado `esteira.py`, `novo_episodio.py`, validações e documentos para que a regra nova seja verificável e não apenas texto.
7. Não remova skills/modelos existentes.
8. Não mude identidade visual Nível 1.
9. Não altere CTA, voz, integridade, QA ou direitos.
10. Não publique nada nesta tarefa.
11. Faça checagens/testes dos arquivos alterados e mostre o diff lógico final.

### FASE C — ENTREGA
Ao terminar, me entregue:
- seu parecer e os principais motivos;
- a arquitetura final adotada;
- todos os arquivos criados/alterados;
- eventuais conflitos que permaneceram;
- como o Claude deverá montar um dia de 6 vídeos daqui para frente;
- um exemplo hipotético de um dia completo com 6 ideias, território, origem (modelo/radar/pesquisa), modelo audiovisual sugerido e horário — **sem produzir/publicar os vídeos**.

O objetivo é transformar a ATIVO em uma **marca editorial com variedade e intenção**, e não uma fábrica de posts aleatórios.
