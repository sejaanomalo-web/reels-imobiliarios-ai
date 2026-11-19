# ATIVO — Guia oficial de legendas para Reels no Instagram
> Versão 1.0 · 18/11/2026 · Instrução editorial obrigatória para o Claude Code na produção de episódios ATIVO.
> Este arquivo complementa `CLAUDE.md` e `PROMPTS/GUIA_MELHORIA_CONTINUA.md`. Não modifica o preset de voz, o roteiro aprovado nem o vídeo.

## 1. Objetivo

Ao produzir cada Reel da ATIVO, gerar TAMBÉM a legenda da publicação em um arquivo texto puro, pronto para copiar e colar diretamente no Instagram.

O resultado obrigatório por episódio é:
- vídeo final: nome definido no episódio, normalmente `OUTPUT/EP###/EP###_final_1080x1920.mp4`;
- capa final: nome definido no episódio, normalmente `OUTPUT/EP###/EP###_capa.png`;
- legenda: `OUTPUT/EP###/legenda_instagram.txt`.

A legenda é a descrição do post, **não** é o SRT de legendas sincronizadas na tela, nem a transcrição da voz, nem um roteiro de locução. Não confundir `legenda_instagram.txt` com `EP###_legendas.srt`.

O Claude Code deve elaborar a legenda usando raciocínio editorial a partir do episódio efetivamente produzido. Esta etapa não depende da quota de Gemini/TTS: não criar chamadas extras de voz para gerar uma legenda.

## 2. Fontes e prioridade

Antes de escrever:
1. Ler `ROTEIROS/EP###.md`, se existir, e o roteiro efetivamente narrado em `OUTPUT/EP###/EP###_roteiro_final.md` (ou outro nome real da entrega).
2. Conferir o conteúdo final do vídeo/capa quando disponível. O texto do post não deve prometer algo que o vídeo ou produto não sustenta.
3. Ler este guia até o fim.
4. Ler TODOS os modelos em `PROMPTS/EXEMPLOS_LEGENDAS/` para compreender ritmo, estrutura, densidade e tom. Modelar o padrão, jamais copiar o argumento de outro episódio.
5. Identificar: assunto central, problema específico do corretor de imóveis, insight útil, orientação prática, contexto de mercado e o nível de consciência do público.
6. Produzir a legenda de modo que COMPLEMENTE o vídeo, sem repetir mecanicamente toda a fala.

Para fatos atuais (juros, legislação, indicadores, nomes, preços, datas), usar apenas fatos explicitamente sustentados pelas fontes fornecidas ou por verificação atual apropriada. Se não for possível verificar, retirar o número/afirmação incerta ou escrever de forma condicional, sem criar um dado. Distinguir estudo de decisão implementada, anúncio de proposta, pesquisa de universo inteiro.

## 3. Formato obrigatório do arquivo

UTF-8, extensão `.txt`, português brasileiro natural. Texto pronto para postagem, sem cabeçalho de documento, sem comentários de bastidor, sem numeração de cenas, sem rótulos como “Legenda:” ou “Hashtags:”.

A PRIMEIRA LINHA é fixa e idêntica em todos os episódios:

📲 Comente "SISTEMA" e conheça uma solução personalizada para organizar seus imóveis, leads e atendimentos.

Deixar uma linha em branco após a CTA.

Depois:
- Abertura independente com uma pergunta, situação concreta ou afirmação que gere reconhecimento.
- Desenvolvimento com argumento específico, uma explicação útil, comparação ou exemplos reais de rotina.
- Lista curta com ✅ quando ela melhorar a escaneabilidade; não é obrigatória e não deve aparecer automaticamente em todos os posts.
- Conclusão com aprendizado, passo prático ou reflexão que faça sentido para o corretor.
- Uma linha em branco e, por fim, **exatamente cinco hashtags** relevantes, todas em minúsculas, separadas por espaço, em uma única linha.

Faixa editorial indicativa: corpo em torno de 110 a 190 palavras, ajustável ao tema; clareza vale mais do que uma meta rígida de tamanho. Parágrafos curtos, leitura natural em celular. É preferível uma boa explicação de 140 palavras a 200 palavras repetitivas.

Nunca aplicar negrito: sem `**`, sem `__`, sem Markdown, sem HTML, sem títulos estilizados. Também não usar itálico, tabelas ou listas Markdown. Os emojis são texto normal; usar com moderação.

A palavra "SISTEMA" deve ser grafada com aspas duplas retas, maiúscula e sem asteriscos. Não alterar a primeira linha sem autorização explícita do usuário.

## 4. Estilo e assinatura editorial ATIVO

Público principal: **corretores de imóveis brasileiros**, especialmente autônomos. A legenda deve reconhecer essa profissão sem confundir com proprietários ou compradores como público final.

Tom: direto, humano, profissional, específico, consultivo e sem cara de texto publicitário genérico.

Preferir:
- cenas que acontecem na corretagem (pedido de visita, lead que ficou sem retorno, dados espalhados, negociações, qualificação, captação, rotinas);
- explicação do porquê, em vez de frases de efeito vazias;
- argumento claro, exemplos aplicáveis e consequência realista;
- diferença entre gerar leads e acompanhar leads;
- conexão sutil entre organização e qualidade de atendimento;
- frases simples, sem travessões longos nem jargão de automação desnecessário.

Evitar:
- copiar a transcrição na mesma ordem frase a frase;
- exagerar a dor e inventar perdas que não foram comprovadas;
- “revolucione suas vendas”, “o segredo do sucesso”, “venda no automático”, “nunca mais perca um lead” e outras promessas;
- pressionar com urgência fictícia;
- afirmar que a ATIVO garante vendas ou possui uma função não confirmada;
- inserir múltiplas chamadas comerciais diferentes; a CTA de comentário já aparece na primeira linha;
- uma legenda idêntica à anterior com apenas o tema trocado;
- excesso de hashtags ou emojis, especialmente emoji de coração;
- se apoiar na estética do vídeo para substituir uma mensagem informativa.

## 5. Diferença entre legenda e roteiro

Se o vídeo mostrar um comprador que recebeu 10 opções de imóveis, a legenda deve aprofundar o princípio de qualificação, não simplesmente transcrever cada take.

Se o vídeo falar do funil de leads, a legenda pode organizar as etapas (atrair, captar, acompanhar, avançar) e explicar que o próximo passo muda conforme o momento do comprador.

Se o vídeo falar sobre comissão, a legenda pode explorar a continuidade comercial e a importância de registrar a origem do negócio, comissões e contatos; sem dar aconselhamento tributário não verificado.

Se o vídeo citar uma notícia, não apresentar como fato consumado o que no próprio vídeo é apenas hipótese ou estudo.

## 6. Estrutura sugerida para redigir (NÃO incluir estes rótulos no .txt)

A) CTA fixa (exatamente igual).
B) Gancho textual: 1 a 2 frases curtas, relevante para a pessoa que está navegando no feed.
C) Desenvolvimento: 2 a 4 parágrafos com argumento, exemplos e orientação; pode ter 3 a 5 itens com ✅ se fizer sentido.
D) Fechamento: 1 a 2 frases trazendo o aprendizado principal, sem insistência comercial.
E) Cinco hashtags minúsculas.

A mensagem da legenda deve ser compreensível mesmo se a pessoa não assistiu ao vídeo. O texto não precisa repetir o título da capa.

## 7. Exemplos aprovados a estudar

Estudar os arquivos abaixo como **referências editoriais anteriores**, não como moldes para copiar trechos:
- `PROMPTS/EXEMPLOS_LEGENDAS/01_funil_de_leads.txt` — clareza das etapas comerciais;
- `PROMPTS/EXEMPLOS_LEGENDAS/02_captacao_com_plano.txt` — profissionalismo na captação;
- `PROMPTS/EXEMPLOS_LEGENDAS/03_carteira_desorganizada.txt` — identificação com retrabalho;
- `PROMPTS/EXEMPLOS_LEGENDAS/04_qualificacao_comprador.txt` — atendimento guiado por perguntas.

Os exemplos contêm textos de postagens anteriores discutidas com o cliente. Preservar a voz e o padrão, não as frases ou casos de uso em outros episódios.

## 8. Integração obrigatória na rotina de cada episódio

Ao receber a tarefa `produzir EP###`, `gerar vídeo`, `renderizar capa` ou `entregar episódio`:
1. Produzir/renderizar o vídeo e a capa segundo os procedimentos existentes, sem alterar a voz aprovada.
2. Após consolidar o roteiro final, escrever uma legenda **original para esse EP###** aplicando este guia.
3. Salvar em `OUTPUT/EP###/legenda_instagram.txt`. Se o `episode.json` define `outputDir` diferente, respeitar o diretório real de entrega.
4. Se a pasta ainda não existir, criá-la. Usar UTF-8 e quebras de linha normais.
5. Executar o checklist da seção 9. Corrigir o texto, não apenas reportar erros.
6. Incluir a existência e o caminho do arquivo no relatório/recado final de entrega junto do MP4 e da capa.
7. Ao retomar um episódio já renderizado cuja legenda não existe, gerar o .txt sem renderizar novamente e sem regenerar narração.
8. Se houver mudança substancial no roteiro/narração após a legenda, atualizar também o .txt. Não deixar legenda divergente do Reel final.
9. Não declarar uma entrega completa de publicação se faltar `legenda_instagram.txt`; indicar explicitamente como pendência.

A criação editorial do texto **é tarefa do Claude Code como agente**. O comando Bash de renderização por si só não gera conteúdo editorial com inteligência. Portanto, não declarar que `npm run ep` gera a legenda automaticamente se o agente não realizou esta etapa.

## 9. Checklist QA obrigatório

Antes de concluir, conferir:
- [ ] Arquivo real existe e foi escrito no diretório correto.
- [ ] Codificação UTF-8; acentos e emoji corretos.
- [ ] Primeira linha exata: `📲 Comente "SISTEMA" e conheça uma solução personalizada para organizar seus imóveis, leads e atendimentos.`
- [ ] Sem qualquer negrito/Markdown/HTML ou rótulos extras.
- [ ] Texto substantivo, não transcrição repetitiva do vídeo.
- [ ] Público coerente: corretores de imóveis.
- [ ] Não inventa funções, métricas, valores, resultados, fatos de mercado ou escassez.
- [ ] Não contradiz o roteiro final.
- [ ] Parágrafos legíveis e sem erros de português.
- [ ] Exatamente cinco hashtags em minúsculas ao final.
- [ ] Sem hashtags entre parágrafos ou após a linha final.
- [ ] Sem repetição genérica de legendas antigas.
- [ ] Arquivo pode ser copiado integralmente e publicado sem limpar formatação.

## 10. Quando há dúvida editorial

É permitido consultar o roteiro e os exemplos. Se faltar fato indispensável, usar uma formulação fiel e cautelosa; não inventar. Se o usuário solicitar alteração de CTA, número de hashtags ou tom, seguir a instrução explícita mais recente e atualizar este guia após aprovação.

Fim do padrão oficial de legendas ATIVO.
