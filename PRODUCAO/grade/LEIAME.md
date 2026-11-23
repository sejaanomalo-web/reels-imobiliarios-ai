# Grade editorial diária (`PRODUCAO/grade/AAAA-MM-DD.json`)

Um arquivo por dia de publicação, com os 6 horários da ATIVO (08h, 10h, 12h, 15h, 18h, 21h de Brasília). É o registro verificável da **Esteira Editorial Diária** (`PROMPTS/ESTEIRA_EDITORIAL_DIARIA_ATIVO.md`): o que vai em cada horário, de onde veio, por quê, em qual modelo audiovisual, e o que aconteceu depois.

## Comandos (a partir da raiz)
```bash
python3 PRODUCAO/tools/grade.py nova 2026-11-26          # cria a grade com os 6 horários vazios (não sobrescreve)
python3 PRODUCAO/tools/grade.py validar 2026-11-26       # regras e guardrails; código 1 se houver ERRO
python3 PRODUCAO/tools/grade.py status 2026-11-26        # tabela do dia
python3 PRODUCAO/tools/grade.py semana 2026-11-26        # 7 dias: distribuição e média dos resultados
python3 PRODUCAO/tools/grade.py resultado 2026-11-26 18:00 ig_alcance=1520 tt_views=800 comentarios_sistema=4
python3 PRODUCAO/tools/grade.py onde ATIVO-D1126-18      # em que grade/slot está o episódio
```

## Ciclo de um slot
`ideia` → `aprovada` (Aprovação 1, pauta) → `roteiro` → `roteiro_aprovado` (Aprovação 2, roteiros) → `producao` (criado por `novo_episodio.build(..., grade=, slot=)`) → `pronto` → `programado` (`publicar.py`) → `publicado` (métricas em `resultados`). Ou `descartado` / `vazio`, sempre com `motivo`.

## O que é ERRO (bloqueia `novo_episodio`, `editorial_check` e render)
- horário fora dos 6, repetido, ou o mesmo episódio em dois horários;
- território, origem, PUSH/PULL ou modelo fora da lista;
- `agora` sem `dataFato` ou com fato a mais de 7 dias da data da grade;
- `origem: "modelos"` sem `origemRef` registrado em `modelos/controle.json`;
- slot que passou de `ideia` sem território/origem/PUSH-PULL/ideia/recompensa; slot em produção sem modelo, justificativas ou episódio;
- item do `radar` sem classe A/B/C, URL ou datas;
- guardrail violado **sem** justificativa no bloco `justificativas` (com justificativa vira AVISO registrado):
  - dia sem os 6 territórios (`territorios`); PUSH/PULL diferente de 4/2 (`pushPull`); mais de 2 referências de `modelos/` (`modelos_ref`);
  - modelo mais de 2× no dia, modelo repetido em slots consecutivos, menos de 3 modelos com 5+ slots, modelo acima de 40% em 7 dias (`modelos`);
  - trilha (Sistema Musical, `TRILHAS/README.md`) mais de 1× no dia, repetida em horários seguidos ou acima de 25% em 7 dias (`trilhas`). Slot em produção com `trilha` precisa de `justificativaTrilha`; a trilha precisa existir no catálogo.

## Regras de convivência
- Grade não substitui a Skill Mestre: cada ideia passa pelas etapas 01–10.
- A grade não publica nada. Programar continua sendo `publicar.py` + commit/push (regras vigentes do `CLAUDE.md`).
- Os posts já agendados antes de 23/11/2026 (inclusive os de 22h do Instagram) continuam como histórico; a grade vale para os novos.
