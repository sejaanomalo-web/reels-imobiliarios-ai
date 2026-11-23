# modelos/ — Fila prioritária de referências MP4 para novos Reels

**Esta pasta, escrita exatamente em minúsculas `modelos/`, foi criada para as referências que o usuário selecionar no Instagram.** Coloque aqui arquivos `.mp4` (ou subpastas com MP4) que deseja usar como ponto de partida para um **novo conteúdo original da ATIVO**.

## Ordem automática de trabalho
1. Antes de **qualquer criação de roteiro ou vídeo**, o Claude Code deve executar `python3 modelos/verificar_pendentes.py` na raiz e ler este README + `PROTOCOLO_DE_ANALISE.md`.
2. Se houver referência ainda **não trabalhada editorialmente**, ela tem prioridade sobre pesquisa livre. Analisar um modelo por vez, salvo pedido de lote; mostrar a interpretação e pedir aprovação antes de escrever o roteiro definitivo.
3. Se não houver referência editorial pendente, executar a Skill Mestre em `.claude/skills/criacao-roteiros-virais-ativo/SKILL.md` iniciando pela pesquisa aberta.
4. Se a solicitação for **produzir um vídeo**, verificar também roteiros de modelos já aprovados mas ainda não produzidos: `python3 modelos/verificar_pendentes.py --modo video`.
5. Quando o usuário pedir explicitamente um assunto, outra tarefa, pular ou ignorar uma referência, respeitar o pedido. A prioridade é um padrão, não uma prisão.
6. **Na Esteira Editorial Diária (6 vídeos/dia, `PROMPTS/ESTEIRA_EDITORIAL_DIARIA_ATIVO.md`)** esta pasta é a **Fonte A**: o MP4 pendente vira o **primeiro roteiro criado** da próxima grade — não necessariamente o das 08h. Território, horário e modelo audiovisual são escolhidos depois, por adequação (pode ir às 18h ou 21h se for o melhor slot). Máximo de **2 referências por dia** (lote de modelos só com pedido explícito, registrado em `justificativas.modelos_ref` da grade). Na grade, o slot recebe `origem: "modelos"` e `origemRef: "modelos/<arquivo>.mp4"` — o `grade.py validar` recusa referência que não esteja no `controle.json`. Prioridade de análise não garante publicação: ideia fraca vira `descartado` com motivo, aqui e na grade.

## Como adicionar
- Adicione `.mp4` diretamente em `modelos/` (ex.: `modelos/01-referencia.mp4`) ou subpastas.
- Faça **commit e push** (pelo site do GitHub ou via Git) e **sincronize a cópia local** usada pelo Claude Code (`git pull`, sem descartar mudanças locais).
- **Não é necessário cadastrar manualmente:** o verificador detecta MP4 novos e os inscreve como `pendente` no `controle.json`.
- É opcional criar um arquivo de notas `01-referencia.md` explicando "gostei da narrativa, mas não do visual"; sem notas, a análise deve deduzir o mecanismo e identificar lacunas.
- Se houver vários modelos, o Claude prioriza pela coluna `prioridade` (maior primeiro), depois pelo estado e nome do arquivo. Prioridade pode ser ajustada pelo comando descrito abaixo.

## Consultas rápidas
```bash
python3 modelos/verificar_pendentes.py
python3 modelos/verificar_pendentes.py --modo video
python3 modelos/verificar_pendentes.py --prioridade modelos/01-referencia.mp4 10
python3 modelos/verificar_pendentes.py --status modelos/01-referencia.mp4 aguardando_aprovacao
python3 modelos/verificar_pendentes.py --status modelos/01-referencia.mp4 roteiro_aprovado --roteiro ROTEIROS/VIRAL/nome.md
python3 modelos/verificar_pendentes.py --status modelos/01-referencia.mp4 concluido --video OUTPUT/EP/EP_FINAL.mp4
```
O arquivo `controle.json` é o histórico de andamento. Só marcar `concluido` depois de existir um vídeo final validado; roteiro aprovado não significa MP4 pronto.

## IMPORTANTE: pasta pública e direitos
Este repositório está **PÚBLICO**. Subir um Reels baixado do Instagram (mesmo "só para referência") pode expor e redistribuir material de terceiros sem autorização. **Preferir tornar o repositório privado antes de colocar MP4 de terceiros**, ou usar material autorizado / arquivos locais não versionados (neste último caso, o Claude só verá na máquina que possuir os arquivos). Não podemos presumir direitos de reutilização de músicas, cenas, logos, personagens ou falas.

O upload do GitHub pelo navegador tem limites de tamanho; arquivos maiores podem precisar de Git, Git LFS ou armazenamento privado. MP4 de referência **não vira automaticamente asset licenciado de produção**.

## Separação das três estruturas
- `modelos/`: **fila nova de referências pessoais escolhidas pelo usuário**, usada antes de criar o roteiro.
- `MODELS/`: coleção preexistente de nove vídeos fixos de referência audiovisual do repositório; não mexer.
- `MODELOS_DE_VIDEO.md` e `.claude/skills/*modelo*`: **estilos visuais de produção**, decididos pelo usuário junto do Claude Code. Não impor estilo por causa do MP4.

**Autoridade sobre edição:** a Skill Mestre pode sugerir recursos visuais/sonoros como aprimoramento opcional. **A decisão criativa, implementação de animação e montagem pertencem ao processo de edição que o usuário conduz com o Claude Code**, respeitando regras do projeto e autorizações.
