# Esteira Editorial Diária da ATIVO — 6 vídeos por dia

> **Status:** vigente desde 23/11/2026 (proposta do cliente, parecer técnico "concordo com ajustes", ajustes incorporados). Substitui a rotação fixa 1→4 dos modelos audiovisuais (que durou de 23/11 manhã a 23/11 tarde e não chegou a produzir episódio) por **adequação narrativa + guardrails de diversidade verificáveis**.
> **Onde esta esteira entra:** ela é a camada **acima** da Skill Mestre. Ela decide **o que** a ATIVO publica em cada dia (6 funções editoriais, fontes, horários e modelo audiovisual). **Como** cada roteiro nasce continua sendo a Skill Mestre (`.claude/skills/criacao-roteiros-virais-ativo/`), uma ideia por vez, com todas as etapas e vetos. **Como** cada vídeo é feito continua sendo a skill do modelo escolhido + Sistema Visual ATIVO.
> **Não muda:** CTA SISTEMA, voz Puck 1,0×, Sistema Visual Nível 1, integridade/apuração, QA técnico, direitos, legenda do Instagram, pipeline de `PUBLICACAO/`.

---

## 1. O dia em 10 passos

Cada passo vira uma linha do painel "Plano" (`PROMPTS/PLANO_DE_ETAPAS_ATIVO.md`, modelo **E**). Recomendação forte: montar a grade **D-1 ou D-2** (um a dois dias antes), nunca no próprio dia.

| # | Passo | Ferramenta / saída | Aprovação |
|---|---|---|---|
| 1 | **Abrir a grade** do dia | `python3 PRODUCAO/tools/grade.py nova AAAA-MM-DD` → `PRODUCAO/grade/AAAA-MM-DD.json` com os 6 horários | — |
| 2 | **Fonte A — `modelos/`** | `python3 modelos/verificar_pendentes.py`. MP4 pendente = **primeiro roteiro criado** do dia (até 2 por dia) | — |
| 3 | **Fonte B — radar 168 h** | pesquisa web das últimas 168 horas; cada pauta classificada **A/B/C** no campo `radar` da grade | — |
| 4 | **Fonte C — pesquisa original** | Skill Mestre, etapa 01, para os territórios ainda sem ideia | — |
| 5 | **Fonte D — aprendizado** | resultados reais das grades anteriores (`grade.py semana`, `pub_programacao`) | — |
| 6 | **Pauta do dia** | 6 ideias, cada uma com território, origem, PUSH/PULL, por que assistir e recompensa → `grade.py validar` | **Aprovação 1: pauta (lote)** |
| 7 | **Skill Mestre, uma ideia por vez** | etapas 01–10 completas; ideia reprovada é **substituída** (mesmo território), nunca remendada | **Aprovação 2: roteiros (lote)** |
| 8 | **Match horário × modelo × trilha** | horário, modelo audiovisual e trilha (§6b) por adequação, com justificativa; guardrails no `grade.py validar` | (junto da Aprovação 2) |
| 9 | **Produção** | skill do modelo + `novo_episodio.build(..., formato=…, grade="AAAA-MM-DD", slot="HH:MM")` → render → QA | — |
| 10 | **Programação e aprendizado** | `publicar.py <EP> --quando "AAAA-MM-DD HH:MM"` (confere com a grade) → commit/push → filas IG/YT/TikTok; métricas voltam para `resultados` | publicação segue as regras vigentes |

**Duas aprovações por dia, não doze.** A Skill Mestre exige aprovação de ideia e de roteiro. Na esteira diária, isso acontece em lote (pauta inteira, depois roteiros inteiros), sem pular a aprovação.

**Nenhum tema repetido (26/11/2026).** Antes da Aprovação 1, cada ideia passa por `python3 PRODUCAO/tools/pauta_repetida.py --texto "<proposta + fonte + gancho>"` (ou `--json` com o lote de roteiros) contra todos os roteiros de `ROTEIROS/ESTEIRA/`. `REPETIDO` (mesma fonte, mesmo artigo de lei ou mesma proposta) = ideia substituída. A ferramenta também lista os 5 roteiros mais próximos: leia-os, porque a mesma **tese** com outra história e outra fonte (ex.: "prova convence mais que promessa") não é pega por palavra e também conta como repetição. Motivo: entre 30/11 e 11/12 saíram 8 pares de temas repetidos com menos de 10 dias de distância.

**Slot vazio é melhor que vídeo fraco.** Se uma ideia é descartada na auditoria e não há substituta forte a tempo, o horário fica vazio (`status: "vazio"` com motivo). Nunca publicar para cumprir quota.

---

## 2. Os seis territórios editoriais

Territórios são **funções editoriais**, não fórmulas. Meta: os 6 territórios no dia. Repetir um território (ex.: segunda notícia forte) é permitido com justificativa em `justificativas.territorios`.

| ID na grade | Território | Função | Regra que não se negocia | PUSH/PULL típico |
|---|---|---|---|---|
| `agora` | **AGORA** | atualidade, hábito, autoridade | fato dos **últimos 7 dias** (168 h); data do evento e da publicação registradas (`dataFato`); fonte primária ou confiável; correlação ≠ causa. Notícia fraca não vira Reel só por ser nova | PUSH |
| `e-se` | **E SE…?** | curiosidade e alcance | sensacionalismo na premissa, **rigor no desenvolvimento**; a hipótese é declarada como hipótese; a conclusão precisa valer o vídeo | PUSH |
| `fora-da-bolha` | **FORA DA BOLHA** | alcance além do nicho | cultura pop, jogos, cinema, esporte, tecnologia, cidades, luxo, turismo, internet **com interseção genuína** (lugar, desejo, compra, percepção, atendimento, profissão). Nada de "trend + CRM no fim" | PUSH |
| `corretor-real` | **CORRETOR NA VIDA REAL** | identificação | começar por **cena, decisão ou tensão concreta** (visita, cliente que volta, proprietário, follow-up, documentação, captação). Proibido "você perde leads?" | PULL |
| `historia` | **HISTÓRIA QUE ENSINA** | profundidade e autoridade | caso **verificável** com arco e recompensa; a lição nasce da narrativa, sem moral colada | PUSH |
| `ideia` | **IDEIA QUE MUDA O JOGO** | visão própria da marca | tese defendida por **raciocínio concreto**; nada de frase de efeito vazia | PULL (às vezes PUSH) |

**Relação com C1–C5 (função do argumento, guia editorial e etapa 06):** o território diz **que tipo de conteúdo** ocupa o slot; C1–C5 continua opcional e diz **o que o argumento faz** (identificar, mudar percepção, solucionar, provar, converter). Não duplicar: na grade, o campo obrigatório é o território.

---

## 3. As quatro fontes, em ordem de prioridade

### Fonte A — curadoria humana (`modelos/`)
- Antes de criar **qualquer** roteiro: `python3 modelos/verificar_pendentes.py`.
- MP4 pendente = **primeiro roteiro criado/analisado** da próxima grade (não necessariamente o das 08h).
- Análise conforme `modelos/PROTOCOLO_DE_ANALISE.md`: ideia, gancho, mecanismo de curiosidade, arco, ritmo, recompensa, motivo de compartilhamento. Adaptação **original**.
- O território, o horário e o modelo audiovisual são escolhidos **depois**, por adequação. Não copiar a estética do MP4.
- Prioridade de análise ≠ garantia de publicação: ideia fraca é descartada e registrada (`descartado` + motivo).
- Máximo de **2 referências manuais por dia** (exceção: pedido explícito de lote de modelos → `justificativas.modelos_ref`).
- Na grade: `origem: "modelos"` + `origemRef: "modelos/<arquivo>.mp4"`. `modelos/controle.json` atualizado em cada mudança de estado.

### Fonte B — radar dos últimos 7 dias
- Pesquisa diária (web) das **últimas 168 horas**: mercado imobiliário, economia ligada a imóveis, financiamento/habitação, construção e arquitetura, cidades, tecnologia/IA, turismo, comportamento, cultura com implicação real.
- **Curadoria, não scraping editorial.** Cada pauta no campo `radar` da grade, com `classe`:
  - **A** — forte o suficiente para vídeo agora;
  - **B** — interessante, guardar (pode voltar como `historia`, `ideia` ou `fora-da-bolha`);
  - **C** — relevante, porém fraca para Reel.
- Para cada pauta: título, fonte (URL), data do evento, data da publicação, fato × interpretação.
- Normalmente 1 pauta A por dia vira o slot `agora`; uma segunda só se for realmente boa (e pode ocupar outro território se cumprir a função dele).
- **Atualidade nunca substitui força da ideia.** A pauta A ainda passa pelos vetos da Skill Mestre (etapa 02).

### Fonte C — pesquisa original da Skill Mestre
Etapa 01 da Skill Mestre para ideias perenes, conexões culturais, histórias, hipóteses e mudanças de percepção. Preenche os territórios que A e B não cobriram.
- **Banco de pautas:** o livro de 60 roteiros (`ROTEIROS/LIVRO_60_ROTEIROS.docx`, lote `PRODUCAO/lotes/L60/`) entra aqui. Um roteiro dele ocupa um slot como qualquer ideia (quase sempre `corretor-real` ou `ideia`, PULL), passa pela Skill Mestre e pela auditoria, e recebe o modelo por adequação. Não há mais fila fixa do L60.

### Fonte D — aprendizado do perfil
- Sinal, não lei: alcance, retenção disponível, tempo médio, compartilhamentos, salvamentos, comentários SISTEMA, diferenças IG × TikTok × YouTube, território, modelo, duração, horário.
- Registro no campo `resultados` de cada slot (depois de publicado) e na leitura semanal `grade.py semana`.
- Mudança de regra só com **padrão recorrente** (vários vídeos em condições parecidas). Poucos vídeos = hipótese, não lei.

---

## 4. PUSH e PULL
- **PUSH:** ganha a atenção de quem não procurava o tema (E SE…?, notícia curiosa, cultura, história, descoberta).
- **PULL:** a pessoa já reconhece o problema ou o interesse profissional (rotina, aplicação, técnica, organização, sistema).
- Orientação: **~4 PUSH + 2 PULL** por dia. Outra proporção exige `justificativas.pushPull`.

---

## 5. Horário: o conteúdo escolhe o slot

Horários fixos: **08h00 · 10h00 · 12h00 · 15h00 · 18h00 · 21h00 (Brasília)**. Não existe "território X = horário Y". A grade registra o match e uma frase de justificativa (`justificativaHorario`). Heurística, não lei:

| Horário | Tende a funcionar para |
|---|---|
| 08h | atualidade, descoberta rápida, pauta que cria hábito |
| 10h | curiosidade, hipótese forte, E SE…? |
| 12h | conteúdo acessível, cultural ou notícia extra |
| 15h | identificação, aplicação, rotina |
| 18h | narrativa ou história de alto apelo |
| 21h | conteúdo mais forte, reflexivo, autoral ou de grande recompensa |

Um conteúdo de `modelos/` pode ser o primeiro criado e ir às 18h ou 21h se esse for o melhor slot. A heurística será substituída por evidência quando a Fonte D tiver padrão recorrente.

---

## 6. Modelo audiovisual: adequação primeiro, diversidade garantida

**Parecer (23/11/2026):** a rotação fixa 1→4 era robusta (diversidade automática, zero decisão), mas obrigava roteiros a formatos errados (ex.: notícia com números caindo no Pictograma noir, que a própria skill desaconselha para dados densos). Com 6 vídeos/dia, o ganho de qualidade da escolha por adequação supera o risco, **desde que** a diversidade seja verificável e não dependa de boa vontade. A ferramenta `grade.py validar` cobra os guardrails abaixo; violação sem justificativa é **erro** (bloqueia `editorial_check` e render).

### Compatibilidade (sugestão, nunca prisão — leia a skill inteira antes de escolher)
| Modelo (`formato`) | Brilha com | Evitar quando |
|---|---|---|
| 1 Cartoon explicativo (`cartoon-explicativo`) | E SE…?, curiosidade com personagem, erro/regra do mercado, mito, comparação, humor que nasce do fato | reflexão íntima, demonstração de interface |
| 2 Pictograma cinematográfico (`pictograma-cinematografico`) | IDEIA QUE MUDA O JOGO, reflexão, história com virada, jornada, custo do descuido | tutorial com muitos passos, números densos |
| 3 Planta técnica (`planta-tecnica`) | processo, estrutura, frentes de negócio, organização, crescimento, "o atendimento como projeto" | história emocional com personagem |
| 4 Maquete 3D (`maquete-3d`) | AGORA (notícia com mecanismo), dinheiro/fluxo entre partes, "quem decide o quê", explicação de mercado | reflexão íntima; piada curta |

### Guardrails verificáveis (`grade.py validar`)
1. Nenhum modelo mais de **2×** no dia.
2. Mesmo modelo em **slots consecutivos** só com justificativa.
3. Com **4 ou mais** slots definidos, pelo menos **3 modelos diferentes** no dia (o ideal são os 4). *(24/11/2026: era 5+; o dia-piloto de 29/11 deixou o Cartoon de fora sem nenhum alerta.)*
4. Na janela de 7 dias (grades existentes), nenhum modelo acima de **40%** dos vídeos.
4b. Na mesma janela, com **8 ou mais vídeos**, **cada um dos 4 modelos aparece pelo menos 1×** (nenhum modelo some da esteira). *(24/11/2026)*
5. Todo slot em produção tem `modelo` + `justificativaModelo` (a razão narrativa, não "faltava usar").

Para quebrar 1–4, preencha `justificativas.modelos` com o motivo editorial; vira aviso registrado. **Não escolher formato só para cumprir distribuição.** Quando a Fonte D mostrar padrão `território × formato`, a tabela de compatibilidade é atualizada aqui.

`tools/esteira.py` deixa de impor "modelo da vez". Ele registra o modelo de cada episódio (histórico) e mostra a distribuição (`esteira.py diversidade`) para servir de desempate.

---

## 6b. Trilha: a música segue a história (Sistema Musical, `TRILHAS/README.md`)
- No match horário × modelo (passo 8), cada slot ganha `trilha` + `justificativaTrilha`, escolhida por **adequação** à ficha musical do roteiro (curva emocional + âncoras), ao território e ao modelo: `python3 PRODUCAO/tools/trilhas.py sugerir --territorio <id> --modelo <formato> --data AAAA-MM-DD`. A frequência recente só desempata.
- Guardrails (`grade.py validar`): mesma trilha no máximo **1× por dia**, nunca em **horários seguidos**, no máximo **25% em 7 dias**; quebrar exige `justificativas.trilhas`. Com só 5 faixas no catálogo, um dia de 6 vídeos precisa de justificativa ou de um slot com a trilha sintetizada; a meta é 15–20 faixas (`TRILHAS/papeis.json`).
- Só trilha `licenciada` ou `original` vai ao ar; `referencia` é teste interno (`publicar.py` recusa).
- Aprendizado: `grade.py semana` mostra uso e resultados por trilha, ao lado de território, modelo e horário.

## 7. Da Skill Mestre à produção
- Cada ideia aprovada passa **individualmente** pelas etapas 01–10: pesquisa → filtro → recompensa → história causal → gancho → abertura → roteiro → direção sugerida → desfecho → CTA → auditoria.
- Ideia reprovada: substituir por outra **do mesmo território** (preserva a função do slot). Não salvar com edição.
- CTA vigente: "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado." A frase anterior é a recompensa. Sem segundo bloco de propaganda.
- A Skill Mestre **sugere** movimento, enquadramento, metáfora, match cut, pausa, SFX e ritmo. A execução final é da skill do modelo + Sistema Visual. Não copiar a estética do MP4 de `modelos/`.
- Episódio: `novo_episodio.build(..., formato="<modelo>", grade="AAAA-MM-DD", slot="HH:MM")`. O gerador recusa episódio novo sem grade/slot, grava território/origem/horário no `episode.json` e liga o episódio ao slot (`episodio`).

## 8. Da produção à programação
- Vídeo aprovado no QA → `python3 PRODUCAO/tools/publicar.py <EP> --quando "AAAA-MM-DD HH:MM"`. O script confere se a data/hora é a do slot da grade (exceção só com `--fora-da-grade`) e recusa pasta ocupada.
- Commit/push na `main` → Action "Enfileirar posts" → `ig_posts` (horário = pasta) → YouTube e TikTok via `pub_destinos`.
- **Pendência estrutural (não aplicada, aguarda decisão do cliente):** hoje `pub_sincronizar` coloca o vídeo novo no **fim da fila** do YouTube/TikTok, ignorando o horário do Instagram. Para o match território × horário valer nas três redes, a função precisa usar o horário do post quando ele for um dos 6 slots e estiver livre no destino (e só cair no próximo livre em caso de conflito). Ver o relatório de 23/11/2026.
- Rastreabilidade: roteiro (`ROTEIROS/…`) → episódio (`PRODUCAO/episodes/<EP>/episode.json`, campos `grade`) → arquivo final (`PUBLICACAO/…/HHhMM/`) → grade (`PRODUCAO/grade/AAAA-MM-DD.json`, slot com `episodio`) → destinos (`pub_programacao`).
- Nunca duplicar o mesmo conteúdo no mesmo destino (índice único em `pub_destinos`; `publicar.py` recusa pasta ocupada).

## 9. Capacidade e limites (6/dia é meta, não promessa)
| Restrição | Efeito | Conduta |
|---|---|---|
| Voz Gemini no plano grátis: **10 gerações/dia por modelo** (`CLAUDE.md`) | 6 vídeos com tomada A/B = 12 > 10 | produzir com 1–2 dias de antecedência; refazer só o necessário; plano pago é decisão de custo do cliente |
| YouTube: o canal recusou o **11º envio** do dia (`uploadLimitExceeded`, 23/11) | 6/dia cabem; não sobra para extras no mesmo dia | evitar "publicar agora" extra no YouTube |
| Buffer grátis: 10 posts agendados por canal, 1.000 req/30 dias | o ciclo mantém até 8 à frente | ok para 6/dia |
| Render: 2D ~4–6 min; Maquete 3D ~10 min (prévia +7) por vídeo | um dia inteiro de render cabe; a criação das cenas é o gargalo | buffer de produção; reaproveitar estruturas de cena da skill |
| Aprovações | 2 por dia (pauta e roteiros) | lote; sem aprovação não há render |

## 10. Arquivo da grade (`PRODUCAO/grade/AAAA-MM-DD.json`)
```json
{
  "data": "2026-11-26", "versao": 1, "status": "rascunho",
  "justificativas": { "territorios": "", "pushPull": "", "modelos": "", "modelos_ref": "" },
  "radar": [ { "titulo": "", "classe": "A", "fonte": "https://…", "dataEvento": "2026-11-24", "dataPublicacao": "2026-11-25", "nota": "fato × interpretação" } ],
  "slots": [
    { "horario": "08:00", "territorio": "agora", "origem": "radar", "origemRef": "", "dataFato": "2026-11-24",
      "pushPull": "push", "ideia": "", "porQueAssistir": "", "recompensa": "",
      "modelo": "maquete-3d", "justificativaModelo": "", "justificativaHorario": "",
      "episodio": "", "roteiro": "", "status": "ideia", "motivo": "", "resultados": {} }
  ]
}
```
- `status` da grade: `rascunho` → `pauta_aprovada` → `roteiros_aprovados` → `em_producao` → `programada` → `publicada`.
- `status` do slot: `ideia` → `aprovada` → `roteiro` → `roteiro_aprovado` → `producao` → `pronto` → `programado` → `publicado` (ou `descartado` / `vazio`, com `motivo`).
- Comandos: `grade.py nova | validar | status | semana` (ver `PRODUCAO/grade/LEIAME.md`).
