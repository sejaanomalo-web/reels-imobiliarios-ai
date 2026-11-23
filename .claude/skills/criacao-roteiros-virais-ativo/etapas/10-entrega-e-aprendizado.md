# ETAPA 10 — Entrega utilizável, passagem para vídeo e aprendizagem

## Pacote editorial obrigatório
1. Ficha estratégica: tema, público, hipótese independente, objetivo, motivo de interesse, promessa, razão de compartilhamento, desafio/riscos e fontes.
2. Título de trabalho, duração estimada realista e formato 9:16.
3. Texto integral falado em pt-BR, separado da produção, com GANCHO → TAKES numerados → DESFECHO → CTA curta.
4. Direção audiovisual em cada take: enquadramento, imagem, gesto, A-roll/B-roll, texto na tela, transição e som, quando úteis.
5. Mapa de progressão e recompensa: o que se descobre em cada bloco, sem números falsos de retenção.
6. Auditoria criativa sincera, revisões aplicadas e riscos factuais/licenciamento.
7. Legenda complementar com abertura "Comente SISTEMA" e padrão vigente do repositório (5 hashtags minúsculas). A legenda NÃO é a transcrição.
8. Indicação dos arquivos/recursos que precisam ser produzidos, comprados/licenciados ou confirmados.
9. Status de aprovação. Se pendente, não iniciar render, publicação, TTS pago ou geração de vídeo por conta própria.

## Rastreamento de modelo MP4, quando usado
Depois de apresentar as direções criativas de um modelo, atualizar o item em `modelos/controle.json` para `aguardando_aprovacao`. Quando o roteiro for aprovado e gravado em `ROTEIROS/`, atualizar `roteiro_aprovado` e o caminho do roteiro com o verificador. Quando a produção começar, `em_producao`. **Só `concluido` com MP4 final existente e efetivamente validado.** Se usuário recusar, registrar `descartado` com motivo, sem apagar MP4. A prioridade de `modelos/` é para conteúdo novo não trabalhado; o registro impede recriar o mesmo roteiro à toa.

## Persistência — somente após roteiro aprovado
Salvar documento em ROTEIROS/ com nome não colidente, preferencialmente ROTEIROS/VIRAL/<slug>.md ou pasta de lote aprovada. Não sobrescrever roteiro existente; conferir antes. Guardar referências e auditoria no próprio MD ou junto a ele (ex.: ANALISE/<slug>-editorial.md), se útil.
Não editar ROTEIROS/EP###.md, ROTEIROS/GTA6/*, lote L60, OUTPUT ou PUBLICACAO sem solicitação explícita.

## Passagem para produção (somente quando solicitada)
- Ler CLAUDE.md, guia de melhoria contínua, produção, voz, marca e skill do modelo de vídeo escolhido.
- Confirmar na grade do dia o slot, o território e o modelo escolhido por adequação (`python3 PRODUCAO/tools/grade.py status AAAA-MM-DD`; slot em `roteiro_aprovado`) e ler a skill do modelo inteira. Episódio: `novo_episodio.build(..., formato=…, grade=…, slot=…)`.
- Respeitar voz Puck 1,0×, safe areas, marca autorizada, licenças, legendas e QA técnico; não propor novas cores.
- Texto final aprovado tem prioridade; não reescrever CTA para modelo longo antigo. Se o pipeline rejeitar por texto legado, relatar conflito e solicitar/implementar correção autorizada da regra de checagem, sem modificar material histórico.
- Nunca afirmar MP4 finalizado sem gerar e inspecionar; nunca editar publicação existente como efeito colateral da Skill.

## Métricas após publicação
Se o usuário trouxer dados: data, formato, duração, alcance, plays, tempo médio assistido, curva de retenção quando disponível, compartilhamentos, salvamentos, seguidores, comentários "SISTEMA", qualidade dos contatos e contexto (impulsionamento/orgânico, audiência, dia). Não inventar dados.
Registrar no slot da grade: `python3 PRODUCAO/tools/grade.py resultado AAAA-MM-DD HH:MM chave=valor …` (a leitura semanal `grade.py semana` cruza território, modelo, horário e PUSH/PULL). Comparar vídeos em condições semelhantes, cauteloso com diferença de duração, distribuição e tamanho de público. Compartilhamentos por alcance, conclusão proporcional, resposta por público podem ajudar mas não são previsões causais.
Para cada Reel registrar:
- hipótese original;
- o que funcionou/fracassou e evidência;
- uma mudança sugerida;
- o que ainda está inconclusivo.
Ajustar a metodologia somente com padrão observado em mais de um caso; evitar overfitting em vídeo isolado.

## Contrato de honestidade
Nunca marcar etapa concluída sem executá-la; se o usuário já aprovou a ideia, registrar. Não declarar que assistiu mídia inacessível. Se pesquisa web indisponível, assinalar o que deve ser confirmado antes de gravar. Se revisão visual de render não ocorreu, não dizer que ocorreu.
