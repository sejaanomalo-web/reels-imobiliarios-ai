# Plano de etapas visível — regra do cliente (23/11/2026)

**Toda tarefa com 3 passos ou mais começa com um PLANO no painel "Plano" do Claude Code** (ferramenta de tarefas: `TaskCreate` / `TaskUpdate`). O objetivo é que o cliente abra o Claude Code a qualquer momento e veja **qual vídeo, em qual etapa e o que está sendo feito agora**, sem precisar ler a conversa.

## Regras

1. **Plano antes de agir.** O plano é criado logo depois de entender o pedido e antes da primeira alteração. Pergunta simples, de 1 ou 2 passos, não precisa de plano.
2. **Uma tarefa por etapa**, com o título no formato:
   `[<ID do vídeo ou frente>] <n>/<total> · <Etapa> — <o que sai dela>`
   Ex.: `[ATIVO-L60-06] 4/12 · Voz — narração Puck 1,0× congelada`. Para trabalho que não é vídeo: `[Publicação] 2/5 · Programar YouTube e TikTok`.
3. **Descrição com o detalhe:** o que é feito, os arquivos ou comandos principais e o critério de "pronto" (ex.: "editorial_check 0 erro").
4. **`activeForm` no gerúndio** (ex.: "Gerando a voz do L60-06"). É o que aparece enquanto a etapa roda.
5. **Só uma etapa `in_progress` por vez.** Marque `in_progress` ao começar e `completed` assim que terminar, nunca em lote no fim.
6. **Nunca marcar como concluída** uma etapa com erro, teste falhando ou resultado parcial. Ela fica `in_progress`, e uma nova tarefa descreve o bloqueio: `[EP] 6b/12 · BLOQUEIO — <motivo>`.
7. **Plano vivo:** se surgir uma etapa nova (correção, refação), crie a tarefa na hora; se uma etapa deixar de fazer sentido, apague (`deleted`) e diga por quê na conversa.
8. **Lote de vídeos:** cada vídeo tem as suas etapas com o próprio ID no título, para o cliente ver em que ponto cada um está.
9. **Fim de sessão:** o relatório final segue a ordem do plano: o que foi concluído, o que ficou pendente e por quê.

## Modelos de plano (adapte o total, mantenha a ordem)

### A. Vídeo novo (Reel ATIVO) — 12 etapas
1. **Fila de modelos e roteiro** — `modelos/verificar_pendentes.py`; roteiro aprovado (Skill Mestre).
2. **Modelo da vez** — próximo modelo da ordem de produção; ler a skill do modelo inteira.
3. **Apuração** — fontes, números, selos (ILUSTRATIVO/SEGUNDO…).
4. **Episódio** — `novo_episodio.py` (cues, CTA SISTEMA, SFX do fecho).
5. **Voz** — Puck 1,0×, `shapePauses`, narração congelada; conferir duração.
6. **Decupagem** — folhas/cenas, o que acende, transições (no papel, antes do código).
7. **Cenas** — `Scenes.tsx`, `Episode.tsx`, `Cover.tsx`, `Root.tsx` com o kit do modelo.
8. **Checagens** — `editorial_check` 0 erro + TypeScript.
9. **Prévia e revisão** — render `--scale=0.5`, folha de quadros, correções.
10. **Som e render final** — `build_audio` (−15 LUFS), render 1080×1920, `sistema_visual_check --quadros`.
11. **Entregas** — capa, SRT, `legenda_instagram.txt`, relatório de QA.
12. **Publicação** — `publicar.py <EP> --quando …`, commit/push, conferir fila (Instagram, YouTube, TikTok).

### B. Novo modelo / skill de vídeo — 8 etapas
1. Análise das referências (metadados, cortes, folha de quadros, detalhe, áudio).
2. Diagnóstico: gramática adotável × identidade alheia; o que muda no Nível 2.
3. Kit em `PRODUCAO/src/estilos/<modelo>.tsx`.
4. Piloto (cenas + capa + Root).
5. Prévia, folha de quadros e correções.
6. Render final + `sistema_visual_check --quadros` + `editorial_check`.
7. Skill (seção "Herança do Sistema Visual ATIVO") + referências.
8. Registro (`modelos.json`, `MODELOS_DE_VIDEO.md`, guias, `CLAUDE.md`, checagens automáticas) + commit/push.

### C. Roteiro (Skill Mestre) — etapas do próprio manual
Uma tarefa por etapa de `.claude/skills/criacao-roteiros-virais-ativo/etapas/` (01 a 10), mais "aprovação do cliente".

### D. Publicação / Supabase — 5 etapas
1. Diagnóstico (hora BRT, filas, travas, crons, cotas).
2. Código / migração (se houver) + deploy.
3. Execução (publicar, programar, reprogramar), um item por vez com conferência.
4. Verificação (status nas plataformas, `pub_programacao`).
5. Registro (README, commit/push) e relatório.
