# EP001 — Shotlist

Tempos reais (derivados da narração). Implementação: `PRODUCAO/src/episodes/EP001/scenes/`. O final foi planejado antes do início: a linha da conversa que fica solta na cena 2 é a mesma que fecha completa na cena 5.

## 01 GANCHO — 0.00 s → 3.51 s (3.5 s)

- **Locução:** O lead não sumiu. O histórico é que sumiu.
- **Visual principal:** Celular em perspectiva com lista de conversas; a conversa do lead (Rafael M., destacada) é empurrada para baixo por conversas novas até sair da tela.
- **Movimento:** Empurrões discretos que aceleram até virar rolagem contínua com desfoque; cartões de notificação voam para dentro do celular; tremor curto quando o lead some.
- **Transição:** Mergulho de câmera no celular (3.31 s) → abre a conversa.
- **Som:** Ticks a cada conversa nova (acelerando), subida de ruído, impacto grave em "sumiu", whoosh do mergulho.
- **Texto na tela:** Nenhum texto extra — a legenda é o título.
- **Riscos / notas:** Nomes e mensagens fictícios. Não imita a interface de nenhum app real.

## 02 SITUAÇÃO — 3.51 s → 11.97 s (8.5 s)

- **Locução:** Um comprador pediu um apartamento de dois quartos. Você enviou opções, conversou sobre a localização e deixou a conversa aberta.
- **Visual principal:** Dentro da conversa: balão do pedido ("2 quartos" marcado), balão com duas opções de imóvel, mapa com alfinete, e o campo "PRÓXIMO RETORNO: sem data" tracejado.
- **Movimento:** Cada balão entra na palavra correspondente; uma linha contínua desce ligando os momentos e termina pontilhada em vermelho (ponta solta).
- **Transição:** A conversa encolhe e vira um cartão pequeno que cai na pilha de conversas da cena seguinte.
- **Som:** Pop por balão, swish das opções, queda do alfinete, teclas do "digitando…", nota oca quando a conversa fica aberta.
- **Texto na tela:** "conversa ilustrativa" no cabeçalho.
- **Riscos / notas:** Imóveis e mapa são ilustrações vetoriais próprias.

## 03 TENSÃO — 11.97 s → 20.64 s (8.7 s)

- **Locução:** A semana encheu de visitas. Quando apareceu o imóvel perfeito, você lembrava do apartamento, mas não do nome de quem procurava.
- **Visual principal:** Agenda da semana enchendo de visitas (contador até 15, fica vermelho); pilha de conversas cobrindo o cartão do Rafael; cartão "NOVO · Apê 2 quartos" sobe e acende; cartão "QUEM PROCURAVA?" com nome embaralhado.
- **Movimento:** 15 blocos em sequência acelerada; agenda recua e desfoca; brilho do imóvel pulsa; check em "lembrava"; pilha treme enquanto o nome embaralha; ligação pontilhada fica vermelha.
- **Transição:** Tudo se dobra numa linha horizontal (20.79 s).
- **Som:** Um toque por bloco de agenda, shimmer no imóvel perfeito, embaralhar em "nome", nota oca em "procurava".
- **Texto na tela:** Rótulos: "Agenda da semana", "NOVO", "QUEM PROCURAVA?".
- **Riscos / notas:** Fundo esquenta (vermelho discreto) — tensão sem exagero.

## 04 INSIGHT — 20.64 s → 31.25 s (10.6 s)

- **Locução:** Um contato útil precisa de três registros: o que procura, em que etapa está e qual é o próximo retorno. Sem isso, até uma boa oportunidade pode ficar esquecida.
- **Visual principal:** Título "CONTATO ÚTIL · 3 registros" e três cartões: INTERESSE (Apartamento · 2 quartos), ETAPA (Em conversa), PRÓXIMO PASSO (Retornar quinta, 10h).
- **Movimento:** A linha se abre em três espaços vazios numerados; cada um vira cartão claro na palavra certa; em "Sem isso" os três esvaziam e o "Imóvel perfeito" aparece, escurece e afunda em "esquecida".
- **Transição:** Os registros voltam a preencher e encaixam no sistema.
- **Som:** Três sinos ascendentes (fá–lá–dó), um por registro; tom descendente em "Sem isso…".
- **Texto na tela:** Rótulos dos três cartões — são a informação central do vídeo.
- **Riscos / notas:** Único momento com cartões claros: contraste = clareza. Câmera parada.

## 05 CTA / BIO — 31.25 s → 42.70 s (11.5 s)

- **Locução:** Quer acompanhar esse histórico em um sistema feito para sua rotina? Conheça nosso sistema imobiliário personalizado no link da bio e agende uma demonstração.
- **Visual principal:** CRM ilustrativo: contato Rafael M., os três registros em linha e o HISTÓRICO completo (pedido → opções → localização → retorno agendado). Fecho: "LINK NA BIO" + "Agende uma demonstração".
- **Movimento:** Linha do histórico desce sem ponta solta (resposta visual à cena 2); check final acende em "rotina"; painel recua em perspectiva; botão entra com mola e anéis pulsando.
- **Transição:** Fim. 1,7 s de respiro após a última palavra.
- **Som:** Pops das entradas do histórico, sino, whoosh, acorde de fá maior no "LINK NA BIO".
- **Texto na tela:** "interface ilustrativa", "SISTEMA IMOBILIÁRIO PERSONALIZADO", "LINK NA BIO", "Agende uma demonstração".
- **Riscos / notas:** Sem marca, URL, preço ou promessa. Painel é mockup e está rotulado como tal — não há captura real do produto no repositório.

## Momentos sincronizados com a fala

| Tempo | Marca | Palavra que dispara |
|---|---|---|
| 01.83 s | `hook_accel` | "histórico" (start) |
| 02.63 s | `hook_exit` | "sumiu" (start) |
| 03.31 s | `hook_dive` | "sumiu" (end, +0.12 s) |
| 03.87 s | `sit_bubble` | "comprador" (start, -0.10 s) |
| 05.89 s | `sit_tag` | "dois" (start) |
| 07.35 s | `sit_listings` | "enviou" (start) |
| 08.47 s | `sit_map` | "conversou" (start) |
| 09.43 s | `sit_pin` | "localização" (start) |
| 10.23 s | `sit_typing` | "deixou" (start) |
| 11.19 s | `sit_open` | "aberta" (start) |
| 12.36 s | `ten_agenda` | "semana" (start, -0.10 s) |
| 14.12 s | `ten_full` | "visitas" (end) |
| 14.66 s | `ten_listing` | "apareceu" (start) |
| 15.78 s | `ten_glow` | "perfeito" (start) |
| 16.66 s | `ten_remember` | "lembrava" (start) |
| 18.65 s | `ten_name` | "nome" (start, -0.25 s) |
| 19.70 s | `ten_who` | "procurava" (start) |
| 20.79 s | `ins_fold` | "um" (start, -0.15 s) |
| 22.54 s | `ins_three` | "três" (start) |
| 23.60 s | `ins_c1` | "procura" (start, -0.30 s) |
| 24.54 s | `ins_c2` | "etapa" (start, -0.32 s) |
| 25.99 s | `ins_c3` | "próximo" (start, -0.15 s) |
| 27.32 s | `ins_ghost` | "sem" (start) |
| 28.66 s | `ins_opp` | "oportunidade" (start, -0.10 s) |
| 30.20 s | `ins_forgot` | "esquecida" (start) |
| 31.40 s | `cta_dock` | "quer" (start, -0.10 s) |
| 32.62 s | `cta_hist` | "histórico" (start) |
| 34.86 s | `cta_routine` | "rotina" (start) |
| 35.73 s | `cta_pull` | "conheça" (start) |
| 38.15 s | `cta_link` | "link" (start, -0.30 s) |
| 40.19 s | `cta_demo` | "demonstração" (start, -0.10 s) |
