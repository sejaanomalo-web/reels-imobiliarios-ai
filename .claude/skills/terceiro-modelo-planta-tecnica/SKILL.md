---
name: terceiro-modelo-planta-tecnica
description: TERCEIRO MODELO de vídeo da ATIVO (um dos 4 modelos, escolhido por adequação na grade diária) — "Terceiro modelo — Planta técnica": Reel/TikTok vertical 1080×1920 em que o assunto vira PROJETO de arquitetura numa prancha marinho com grade (cômodo = etapa, cota = medida/tempo, chamada = observação, porta = passagem, rota = caminho, elevação = crescimento, carimbo = assinatura ILUSTRATIVA), linha de projeto branca que se desenha na hora da fala, verde ATIVO só no que "acende", mergulho no cômodo como transição e fecho com o campo SISTEMA na prancha. Use sempre que o pedido for produzir, adaptar, decupar, revisar ou renderizar um vídeo "no terceiro modelo / planta técnica / blueprint / como o GTA6_02", ou um roteiro sobre processo, estrutura, organização, frentes de negócio ou crescimento. Herda o Sistema Visual ATIVO (MARCA/sistema-visual).
---

# Terceiro modelo — Planta técnica

*ATIVO · modelo de vídeo nº 3 dos 4 modelos (escolha por adequação na grade diária). Registro: `MODELOS_DE_VIDEO.md` e `MARCA/sistema-visual/modelos.json` (id `planta-tecnica`).*

## Herança do Sistema Visual ATIVO

**Antes de produzir, leia `MARCA/sistema-visual/README.md` (Nível 1).** Ele vale acima desta skill: em conflito, o Nível 1 vence.

- **Herdado (Nível 1, sem redefinir aqui):**
  - acento único `ACENTO` (no kit: `A`/`aa`), atmosferas `ATMOSFERA` (a prancha usa `dados`; `tensao` na falha; `solucao` no fecho);
  - texto, contorno e alerta de `DS`; Manrope e JetBrains Mono, escala e mínimos;
  - área segura e coluna de botões do Reels; grão e vinheta;
  - easing e ancoragem na palavra; as 7 assinaturas; qualidade e governança.

  Valores só em `MARCA/sistema-visual/tokens.json`, lidos por `PRODUCAO/src/theme.ts`.
- **Particular deste modelo (Nível 2, preservar):**
  - família de ilustração `esquema` (desenho técnico: paredes, cotas, chamadas, portas, rotas, elevação, carimbo);
  - prancha marinho com grade neutra e UMA luz sobre a área de trabalho;
  - linha de projeto BRANCA; verde só no que acende; vermelho só em falha;
  - traço único `TRACO` (3 px); contorno externo em linha dupla;
  - cada folha = uma planta; a folha seguinte nasce do cômodo em que a câmera MERGULHA;
  - legenda `Captions` (y 1392, 68 px, caixa de frase) e título da folha no topo (`TituloFolha`, y 285);
  - fecho `CtaPlanta` (projeto "SEU SISTEMA" + campo que digita SISTEMA + logo assinado no carimbo).
- **Direção de cada vídeo (Nível 3):** qual planta (casa, império, mapa, corte), quais cômodos, o que acende, onde a câmera mergulha.
- **Validação:** `python3 PRODUCAO/tools/sistema_visual_check.py --modelo planta-tecnica` (o `editorial_check` já roda a parte do episódio e bloqueia o render) + revisão visual da folha de quadros (README §8).

**Fontes da verdade:**
- **Piloto:** `ATIVO-PLANTA-01` (`OUTPUT/pilotos/ATIVO_PLANTA_01/`): o roteiro do GTA6_02 ("O magnata imobiliário escondido em GTA VI") refeito no kit v2.
- **Kit:** `PRODUCAO/src/estilos/planta.tsx` (v2, 23/11/2026).
- **Referências:** `referencias/piloto_24_quadros.jpg` (piloto) e `referencias/antes_x_depois.jpg` (v1 entregue × v2). Análise do v1 em `referencias/analise_v1_gta6_02.md`.

## 0. Quando usar / o que entrega

**Use quando** o assunto tem ESTRUTURA: processo em etapas, frentes de um negócio, funil, organização da carteira, "o atendimento como projeto", crescimento de patrimônio, antes × depois de uma rotina. A pergunta-teste: *dá para desenhar isso como uma planta?* Se a resposta é "só com texto", use Tipografia cinética; se é uma história com pessoas, use Palitinho ou o Primeiro modelo.

**Produção:** modelo 3 dos **4 modelos** (Esteira Editorial Diária, 23/11/2026: o modelo é escolhido por adequação na grade do dia, com justificativa e guardrails — `PROMPTS/ESTEIRA_EDITORIAL_DIARIA_ATIVO.md` §6). Quando a grade escolher a Planta, crie o episódio com `novo_episodio.build(..., formato="planta-tecnica", grade="AAAA-MM-DD", slot="HH:MM")` (prefixo livre do lote). Fecho obrigatório: `CtaPlanta`.

**Entrega:** MP4 1080×1920 30 fps H.264 + AAC, capa PNG no estilo, SRT, `legenda_instagram.txt` (CLAUDE.md), relatório de QA.

## 1. Regras inegociáveis

1. **Nada de gráfico genérico.** Crescimento = `Elevacao` (andares que sobem); comparação = cômodos de tamanhos diferentes; tempo = `Cota`. Barra de gráfico, pizza ou ícone de app são de outro estilo.
2. **A linha é branca; o verde é evento.** Um cômodo só fica verde com `acende` (na palavra que o justifica: solução, "você", o ponto da frase). Nunca 3 ou mais coisas verdes ao mesmo tempo fora do fecho.
3. **Vermelho = falha.** Chamada `tone="warn"`, porta fechada, rota errada. Nunca decoração.
4. **Desenha-se na hora da fala.** Parede, cota e chamada nascem 0–3 quadros antes da palavra (cues). Nada aparece pronto antes de ser dito.
5. **Folha nova nasce da anterior.** Transição = `mergulho` no cômodo-alvo (ou encolher a planta inteira para virar uma quadra do mapa). Proibido crossfade solto entre folhas.
6. **Sempre ILUSTRATIVO.** Carimbo, cota de título ou `SeloPlanta` deixam claro que a planta é metáfora. Planta de imóvel real com medida real é proibida. Fato citado → selo "SEGUNDO <fonte>".
7. **Textos dentro dos mínimos:** frase ≥ 30 px (Manrope 700 ou JetBrains Mono 700); micro-rótulo 24 px só em MAIÚSCULAS com espaçamento ≥ 0,12 em (`AMB. 01`, `CORTE A-A`).
8. **Zonas:** palco y 360–1290; faixa da legenda 1320–1470 é exclusiva; nada de texto em y < 250, y > 1570 nem em x ≥ 950 entre y 1150 e 1760.

## 2. Pipeline

> **Plano visível (regra do cliente, 23/11/2026):** antes de começar, crie no painel "Plano" as 12 etapas do modelo A de `PROMPTS/PLANO_DE_ETAPAS_ATIVO.md`, com o ID do episódio no título (`[<EP>] n/12 · Etapa — resultado`). Uma etapa `in_progress` por vez; `completed` ao terminar; erro vira `BLOQUEIO`.

1. Roteiro aprovado (Skill Mestre) → a grade do dia escolheu a Planta para o slot (`python3 PRODUCAO/tools/grade.py status AAAA-MM-DD`).
2. `mkNN.py` com `novo_episodio.build(..., formato="planta-tecnica", grade="AAAA-MM-DD", slot="HH:MM")` (cues por palavra; liga ao slot e registra o modelo, cria `cta_leads`/`cta_atend` e os SFX do fecho).
3. Voz Puck 1,0× (`build_narration.py`), `shapePauses`.
4. **Planta no papel antes do código:** para cada folha, liste cômodos, o que acende, a palavra de cada traço e o cômodo de saída (mergulho).
5. `src/episodes/<EP>/scenes/Scenes.tsx` com o kit (copie a estrutura de `src/episodes/ATIVO-PLANTA-01/`), `Episode.tsx`, `Cover.tsx`, registro no `Root.tsx`.
6. `editorial_check` → prévia `--scale=0.5` → folha de quadros → `build_audio` → render (11/11) → `sistema_visual_check --quadros`.
7. Legenda do Instagram, QA, `publicar.py`.

## 3. Grade da tela (1080 × 1920)

| Zona | y | Conteúdo |
|---|---|---|
| Título da folha | 285–360 | `TituloFolha` (Manrope 800, 52–60 px, maiúsculas, 1 palavra-chave verde). Se quebrar em 2 linhas, reduza para 52 |
| Palco (prancha) | 360–1290 | `Prancha top={380} h={900}`: contorno principal em x 120–960 |
| Selo de integridade | ~1236 | `SeloPlanta` quando o palco não ocupa essa faixa |
| Legenda | 1320–1470 | `Captions` (exclusiva) |
| Respiro | 1470–1920 | vazio (área da interface do Reels) |

## 4. Roteiro para este formato

- 4 a 6 folhas em 45–60 s; cada folha 5–10 s com algo novo a cada ≤ 1,5 s (um cômodo, uma cota, uma chamada).
- A metáfora central precisa ser dita em voz: "o império dele", "o seu atendimento é uma obra", "cada etapa é um cômodo".
- Gancho = a primeira planta já se desenhando no quadro 0 (nada de tela vazia).
- O "você"/"seus imóveis" aparece como algo verde e novo (um lote tracejado, um cômodo que acende) logo antes da CTA.

## 5. Decupagem — regras de montagem

- **Folha** = um conjunto (`Contorno` + cômodos + cotas). Troca de folha só por `mergulho` (zoom no cômodo-alvo, 0,45–0,6 s) ou por encolhimento (a planta vira uma quadra do mapa).
- No mergulho, tudo que não é o alvo some na primeira metade (`m.outros`); o título da folha sai 0,6 s antes da troca.
- A folha seguinte começa com o `Contorno` no mesmo retângulo de chegada do mergulho (`TELA = {x:120, y:120, w:840, h:640}`) e um **esboço tracejado** (divisões + rótulos `AMB./FRENTE` em cinza) para não haver moldura vazia por mais de ~0,8 s.
- Escalas variam: planta geral → ficha (inserto) → planta de 4 frentes → mapa (geral) → corte/elevação (detalhe com câmera que abre) → fecho.

## 6. Bíblia visual

- **Fundo:** `<FundoPlanta t atm="dados"/>`; camadas extras com opacidade para clima: `atm="tensao"` sob a falha (≤ 0,55), `atm="solucao"` a partir de "Comente".
- **Luz:** uma só, sobre a área de trabalho (`luzY`), vinheta forte nas bordas.
- **Traço:** `TRACO` 3 px em tudo (paredes, cotas a 2 px, rotas 4 px); contorno externo duplo. Pontas redondas.
- **Cor:** linha `LINHA` (branco do sistema); secundário `C.muted`/`C.dim`; acento só via `acende`, `Rota tom="accent"`, `Cota cor={A.hex}`; alerta só `tone="warn"`.
- **Textos na prancha:** nome de cômodo JetBrains Mono 700 36–44 px; subtítulo Manrope 700 30 px; rótulos 24 px espaçados.

## 7. Personagens

O modelo não tem personagem desenhado. O protagonista é o **projeto**. Quando a história pedir uma pessoa, ela entra como **pino** (`circle` + rótulo) no mapa ou como ficha técnica (nome + função + selo FICTÍCIO/ILUSTRATIVO). O "corretor" (assinatura 4) é sempre o elemento que acende em verde.

## 8. Objetos (kit)

| Componente | Significado | Uso |
|---|---|---|
| `Contorno` | a obra inteira / a folha | `p` de 0→1 na abertura da folha |
| `Comodo` | etapa, frente, ambiente | `p` (paredes), `acende` (verde), `tone` linha/muted/warn, `amb` e `sub` |
| `Cota` / `CotaV` | medida, tempo, valor | rótulo espaçado; verde só quando a medida é o ponto |
| `Chamada` | observação | `warn` falha · `accent` acerto · `linha` citação neutra |
| `Porta` | passagem entre etapas | aberta (linha) / fechada (vermelho) |
| `Rota` | caminho | `tom` accent/warn, tracejada revelada por máscara (`id` único) |
| `Elevacao` | crescimento | andares sobem com `p`; `destaque` + `acende` no andar que importa |
| `Carimbo` | assinatura técnica | sempre com "ILUSTRATIVO · ATIVO" |
| `SeloPlanta` | integridade | "SEGUNDO <fonte>", "EXEMPLO HIPOTÉTICO" |
| `TituloFolha` | título da folha | topo, 1 palavra verde |

## 9. Animações

- Paredes: `strokeDashoffset` 0,6–0,8 s `ease.out`, começando 0,3–0,45 s antes da palavra; texto do cômodo entra no fim do traço.
- Acender: `acende = prog(t, cue, 0.35–0.4)` (a parede e o brilho vão do branco ao verde).
- Chamada: a linha cresce do ponto até a caixa; a caixa aparece nos últimos 25 %.
- Pinos e carimbo: mola (`sp`, damping 11–13); o carimbo "bate" (escala 1,25 → 1).
- Elevação: `ease.linear`, um andar a cada ~0,5 s, terminando na palavra-chave.
- Proibido: pop em tudo, rotação, glitch, texto entrando de vários lados.

## 10. Câmera e transições

- `Camera drift={6}` com chaves nos cues (empurrões de 1,0 → 1,05). Exceção motivada: na elevação, começar fechado na base (s 1,28) e abrir até 1,0 enquanto o prédio sobe.
- `mergulho(p, alvo, tela)` devolve `transform`, `opacity` e `outros`. Use `outros` em tudo que não é o alvo.
- Encolher: `mergulho(p, TELA, QUADRA)` leva a planta inteira para virar um quarteirão do mapa (rima de forma).

## 11. Legenda e fecho

- **Legenda:** `<Captions t chunks accent={A}/>` (não mude posição nem tamanho).
- **Fecho `<CtaPlanta t tl segPergunta segComente/>`:** na pergunta, o contorno "PROJETO: SEU SISTEMA" se desenha com o esboço tracejado; IMÓVEIS, LEADS e ATENDIMENTOS se constroem e ACENDEM nas suas palavras; em "Comente" a prancha sobe e surge o campo (`COMENTE · FOLHA FINAL`) que digita S-I-S-T-E-M-A; o botão de envio acende; em "Direct" uma rota verde leva o envio para fora; por fim o logo oficial é assinado (revelado da esquerda para a direita). Atmosfera `solucao` a partir de "Comente".

## 12. Som

> **Sistema Musical (23/11/2026, `TRILHAS/README.md`):** com `music.trilha` no episódio (`novo_episodio.build(..., trilha=…, ancoras=…)`), a trilha sintetizada desta seção é substituída por uma faixa do catálogo **adaptada à história** (`tools/adaptar_trilha.py`) e pela mixagem v2 do `build_audio.py`; os efeitos afinados (shimmer/chord/bell) passam a soar no tom da trilha. Afinidade (catálogo): T01 cama de explicação e T03 arco de descoberta (muito), T04 e T05 (compatível). Só trilha `licenciada`/`original` vai ao ar. Sem `music.trilha`, vale o padrão abaixo.

Trilha e SFX de `build_audio.py` (−15 LUFS, pico ≤ −1 dBTP, ~20–30 eventos). Sugestões de evento: traço de parede = `swish` baixo; pino/carimbo = `pin`/`click`; mergulho = `whoosh_fold`; acender = `pin` agudo; fecho = os eventos que `novo_episodio` cria para `formato="planta-tecnica"`. Nada de whoosh em todo corte.

## 13. Metas de QA

- [ ] `editorial_check` sem erros (o `sistema_visual_check` do episódio roda junto).
- [ ] Prévia `--scale=0.5` revisada na folha de quadros (1 quadro por segundo): nenhuma moldura vazia > 0,8 s; algo novo a cada ≤ 1,5 s.
- [ ] Nenhum texto acima de y 250 durante o mergulho ou com a câmera aproximada.
- [ ] Verde ≤ 2 elementos fora do fecho; vermelho só em falha.
- [ ] Selo/carimbo ILUSTRATIVO presente; fato citado com "SEGUNDO <fonte>".
- [ ] `sistema_visual_check --quadros <pasta>` sem erro; render 1080×1920 H.264 yuv420p 30 fps + AAC.
- [ ] As 7 assinaturas e o teste "parece ATIVO com o logo coberto".

## 14. Esqueleto de código (copie de `src/episodes/ATIVO-PLANTA-01/`)

```tsx
// Episode.tsx
<AbsoluteFill style={{ backgroundColor: C.bg0 }}>
  <FundoPlanta t={t} atm="dados" />
  {/* camadas de clima: tensao na falha, solucao a partir de "Comente" */}
  <Hook t={t} tl={tl} /> <Take1 t={t} tl={tl} /> … {/* cada folha some ao fim do seu mergulho */}
  <CtaPlanta t={t} tl={tl} segPergunta="s11" segComente="s12" />
  <Captions t={t} chunks={tl.captions} accent={A} />
  <Grain frame={frame} />
</AbsoluteFill>

// Scenes.tsx — uma folha
const m = mergulho(prog(t, cueSaida - 0.55, 0.6, ease.linear), ALVO, TELA);
<Prancha top={380} h={900}>
  <g transform={m.transform} opacity={m.opacity}>
    <g opacity={m.outros}>{/* contorno, cômodos, cotas, chamadas */}</g>
    <Comodo {...ALVO} p={…} titulo="…" acende={prog(t, cue, 0.4)} />
  </g>
</Prancha>
<TituloFolha p={…}>O <span style={{ color: A.hex }}>IMPÉRIO</span> DELE</TituloFolha>
```

## 15. Anti-padrões (reprovam o vídeo)

- Fundo verde ou grade verde (era o v1): a prancha é marinho com grade neutra.
- Todos os cômodos em verde; verde como "cor do estilo".
- Gráfico de barras, pizza ou dashboard dentro da planta.
- Moldura vazia esperando a fala; folhas trocadas por crossfade.
- Texto de 24 px em frase, rótulo sem espaçamento, texto na faixa da legenda.
- Planta "realista" de imóvel, medida real, logo ou asset de terceiros.

## 16. Kit — referência rápida (`PRODUCAO/src/estilos/planta.tsx`)

`FundoPlanta({t, atm, luzY, luz})` · `Prancha({top, h})` · `Contorno({x,y,w,h,p,tom})` · `Comodo({x,y,w,h,p,amb,titulo,sub,tone,acende,titleSize})` · `Cota({x1,x2,y,texto,p,cor})` · `CotaV({x,y1,y2,texto,p,cor})` · `Chamada({x,y,bx,by,bw,texto,p,tone})` · `Porta({x,y,r,p,aberta})` · `Rota({id,d,p,tom,tracejado})` · `Elevacao({x,chao,w,andares,alt,p,destaque,acende})` · `Carimbo({x,y,projeto,folha,p,w})` · `SeloPlanta({texto,p,top})` · `TituloFolha({p,size})` · `mergulho(p, alvo, tela) → {transform, opacity, outros}` · `CtaPlanta({t,tl,segPergunta,segComente,logo})` · constantes `TRACO`, `LINHA`, `SOMBRA`, `BG_PLANTA`.

**Legado:** `ATIVO-GTA6-02`, `ATIVO-GTA6-08` e `ATIVO-L60-04` foram entregues no v1 (prancha verde). Não são refeitos; se re-renderizados, sairão com o desenho v2.
