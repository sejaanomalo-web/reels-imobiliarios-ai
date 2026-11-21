# Análise quadro a quadro: 5 referências do Segundo modelo (21/11/2026)

## Material e método
- **Material:** 5 Reels enviados pelo cliente, todos de uma série de terceiros sobre mentalidade e finanças. Todos em 720×1280, 30 fps, AAC 44,1 kHz.
- **Total:** 358 s, 10.740 quadros.
- **Método:**
  - leitura visual de 1 quadro por segundo (358 quadros);
  - 8 transições olhadas a 10 quadros por segundo;
  - medição numérica de todos os quadros: diferença entre quadros, luminância, vinheta, câmera por fluxo óptico ORB/RANSAC (zoom, pan, rotação);
  - cor exata amostrada em quadro cheio;
  - loudness EBU R128 e tom de voz (F0);
  - transcrição automática para medir o ritmo da fala.
- Os quadros dos vídeos de terceiros **não** foram salvos no repositório (direitos autorais); só as medições e esta descrição.
- Métricas por segundo: `metricas_por_segundo_5_referencias.txt`.

| Ref. | Duração | Tema | Palavras/min (com o fecho) | Mov. médio¹ | Quadros parados¹ | Maior trecho parado |
|---|---|---|---|---|---|---|
| R1 | 83,0 s | ambição / ficar rico ("03:00") | 162 | 3,82 | 10,6% | 2,2 s (logo) |
| R2 | 59,2 s | "atrasado na vida" aos 25 | 141 | 2,20 | 30,8% | 2,2 s |
| R3 | 68,8 s | primeiros 10 mil reais / reserva | 158 | 1,67 | 46,6% | 2,4 s |
| R4 | 55,0 s | "daqui a 5 anos no mesmo lugar" | 145 | 1,34 | 44,3% | 2,0 s |
| R5 | 92,0 s | caso real de um banqueiro (investigação) | 132 | 2,65 | 33,0% | 2,6 s |

¹ `PRODUCAO/tools/motion_check.py`: média da diferença absoluta entre quadros a 10 fps, em 270×480, escala de cinza. "Parado" = diferença < 0,8.

## 1. Números que definem o estilo

| Medida | R1 | R2 | R3 | R4 | R5 | Leitura |
|---|---|---|---|---|---|---|
| **Cortes secos** | 0 | 0 | 0 | 0 | 0 | **Nenhum.** Tudo é transição contínua. |
| Mudança forte de cena (pico local) | 1 a cada 8,3 s | 5,9 s | 4,3 s | 5,0 s | 6,6 s | Cenário novo a cada ~4–8 s; dentro dele algo muda a cada ~1–1,5 s |
| Luminância média (0–255) | 19,9 | 16,2 | 17,2 | 15,0 | 17,5 | **Muito escuro**: p90 ≤ 29 |
| Vinheta centro ÷ canto (mediana) | 12,2× | 14,4× | 9,9× | 9,6× | 7,2× | Cantos quase pretos (#020202), centro morno (#352F2B) |
| Zoom da câmera (mediana / p90 por s) | 1,1% / 7,9% | 0,7% / 7,1% | 0,3% / 1,1% | 0,6% / 6,4% | 0,3% / 5,8% | Empurrão lento quase constante + zooms rápidos nas transições |
| Pan (mediana / p90, px/s a 720 p) | 20 / 126 | 5 / 74 | 2 / 16 | 7 / 49 | 3 / 50 | Travellings acompanhando o personagem |
| Loudness integrada | −14,1 | −14,1 | −14,1 | −14,2 | −14,1 LUFS | Masterização padrão de plataforma |
| Trilha sob a voz | −14 dB | −13 dB | −16 dB | −15 dB | −14 dB | Trilha **presente** e contínua (0–7% de janelas em silêncio) |
| Tom da voz (F0 mediano) | 110 Hz | 138 Hz | 126 Hz | 119 Hz | 136 Hz | Voz masculina grave, firme, sem pressa |

**Cores amostradas** (quadro cheio):
- **Acento dourado** `#C5AD84`–`#C6B38F` (champanhe): palavra-chave, títulos, valores, objetos "de valor".
- **Vermelho** `#D76054`: dívida, erro, investigação, perda.
- **Verde menta** `#7FB99E`: só para saldo positivo e rendimento (R3, R5).
- **Branco** puro: o personagem, com brilho.
- **Cinza** ~#6B6B6B: personagens secundários e o passado.

## 2. Linha do tempo por referência

Leitura de 1 quadro por segundo. "→" indica a transição para a cena seguinte.

### R1, 83 s: "ficar rico é um pensamento que nunca sai da sua cabeça"
- **0–9 s · Quarto, 3 da manhã.**
  - Cena: pictograma deitado numa cama de traço fino; relógio digital "03:00" com os dois-pontos piscando; janela com lua; linha de chão pontilhada.
  - Desde o quadro 0, ícones em círculo (casa, carro, avião, família, $ dourado, pássaro) **surgem em sequência e orbitam** em elipses pontilhadas sobre a cabeça.
  - 1,0–1,5 s: título **"RICO"** dourado entra **letra a letra saindo do desfoque**; some desfocando em 3 s.
  - Câmera: empurrão contínuo de 0,2% → 1,5%/s.
  - **→ 9,0–10,6 s: PORTAL.** A câmera acelera para dentro do ícone de pássaro (desfoque de movimento), o círculo cresce até ocupar a tela, o anel branco passa pela lente e dentro já está a próxima cena.
- **10–17 s · Escada no escuro.**
  - Boneco sobre um degrau aceso; degraus de barras arredondadas surgem um a um em diagonal.
  - **Holofote** em cone vindo do alto à direita, onde aparece a "versão futura" (boneco com brilho mais forte no topo).
  - Travelling diagonal acompanhando a subida; poeira dourada nos degraus.
- **17–23 s · "Não é apenas sobre dinheiro."**
  - Quadro tracejado com engrenagens e relógio; bonecos carregando caixas (esforço); filho guiando os pais.
  - → zoom-out para uma casa de traço dourado com a família (5 bonecos de alturas diferentes) e **chuva de partículas douradas**.
- **24–27 s · "Liberdade."**
  - Título "LIBERDADE" dourado com partículas; **sol semicírculo dourado com raios** no horizonte; boneco caminhando em silhueta contra o sol; família em cinza ao fundo.
  - **→ 27,2–28,0 s: APAGAR A LUZ.** O sol perde brilho em 0,6 s e o boneco continua andando como âncora.
- **28–33 s · "O peso da ambição."**
  - Título em 2 linhas: branco + dourado ("O PESO / DA AMBIÇÃO").
  - Boneco empurrando uma esfera de traço cheia de $ e gráficos.
  - Pílulas "ATRASADO", "TÃO JOVEM" sobre um relógio; multidão cinza passando.
- **33–44 s · Volta ao quarto (rima visual com a abertura).**
  - Bolha de pensamento com $; o boneco se levanta; a "versão futura" luminosa aparece de pé ao lado da cama e se desfaz em poeira.
  - O relógio "03:00" escurece.
  - A esfera do pensamento racha (44 s).
- **45–54 s · "Alimente sua ambição com conhecimento…"**
  - Livros dourados caindo e empilhando sob o boneco.
  - Ícones (lâmpada, alvo, avião) ao redor.
  - Degraus → linha de progresso pontilhada com nós numerados → grade "DISCIPLINA" de 4×7 que se enche de checks dourados.
- **55–60 s · "Toda grande conquista já foi um pensamento."**
  - Ponto de luz → "DO ZERO" → lâmpada → barras → gráfico crescente dourado.
- **61–69 s · Escada de novo.**
  - O boneco salta degraus; encontra a versão futura sob o holofote; as duas se fundem (66–67 s); anel dourado ao redor.
- **70–77 s · "Trabalhe em silêncio…"**
  - Escrivaninha com notebook e luminária de traço.
  - Relógio que avança (14:50 → 09:27 → 05:41) com pílulas "NOITES", "SEMANAS", "ANOS".
  - Zoom-out para uma cidade de prédios com janelas douradas e lua.
- **77–83 s · RITUAL DE FECHO.**
  - "Sua antiga versão termina aqui": o boneco se **dissolve em partículas** de baixo para cima (0,9 s).
  - A tela vira **nuvem esférica de partículas douradas** (1,6–2,4 s), que **converge e forma o logo**.
  - Círculos finos concêntricos; nome da série; "EP. 03 · O PESO DA AMBIÇÃO".

### R2, 59 s: "menos de 25 anos e se sente atrasado"
- **0–6 s:**
  - Números 18 → 22 → 25 (contorno → dourado cheio) atrás do boneco que caminha; relógios flutuando ao redor.
  - Título "ATRASADO / NA VIDA?" entra letra a letra.
  - Em 6 s o boneco para cinza, com bonecos borrados passando (pressa dos outros).
- **7–13 s · Tela dividida por uma linha vertical dourada:**
  - à esquerda, amigos em festa (varal de luzes);
  - à direita, o boneco na mesa com monitor e pastas dourada flutuando.
  - Zoom para o monitor, que mostra a família.
- **14–19 s · Sonhos que entram um a um, com rótulo no topo:**
  - casa de traço ("CASA"), carro ("CARRO DOS SONHOS"), pais ("APOSENTAR OS PAIS"), corrente que se rompe ("LIBERDADE").
- **20–23 s:** escada para uma porta iluminada; calendários trocando (8 JUN → 15 MAR → 22 DEZ → 22 ABR) enquanto o boneco sobe devagar e escurece.
- **24–27 s · Título "glitch":**
  - **AMBIÇÃO ↔ PRESSA alternam com desfoque a cada ~0,2 s** (confusão), depois se separam em 2 linhas (dourado / branco).
- **28–33 s:** chão pontilhado (piso texturizado); o boneco ajoelha e planta uma semente; raízes douradas crescem para baixo.
- **33–46 s:**
  - "TUDO AOS 20?"; degraus com pílulas CONHECIMENTO → EXPERIÊNCIA → TRABALHO → DISCIPLINA → PACIÊNCIA.
  - Contador "DIA 9 … DIA 3.650".
  - A "versão futura" dourada num halo à direita; ampulheta.
- **46–53 s:**
  - Câmera sobe da raiz para a árvore dourada que cresce e floresce de partículas; título "FUTURO".
  - Sol no horizonte; título "CONTINUE"; o boneco caminha para o sol.
- **53–59 s · Ritual:** dissolve, nuvem, logo e "EP. 06".

### R3, 69 s: "os primeiros 10 mil reais"
- **0–5 s:**
  - Boneco empurrando uma moeda gigante ladeira acima.
  - Pedras rotuladas "IMPREVISTO", "TENTAÇÃO".
  - Contador no topo R$ 697 → R$ 9.555 com barra de meta.
- **6–12 s:**
  - "NÃO É PARA / FICAR RICO" (título); carro, casa e sacola em traço.
  - → escudo dourado "R$ 10.000 · PROTEÇÃO" sobre o boneco, com ameaças em vermelho batendo nele: "DESEMPREGO", "DESPESA MÉDICA", "CONTA INESPERADA".
  - Pílula "NUNCA MAIS ZERO".
- **13–20 s:**
  - Celular em traço com loja (cartões "COMPRAR") e "SALDO NA CONTA" caindo de R$ 1.840 até −R$ 295 em vermelho.
  - Cartões de parcela vermelhos se empilhando.
  - Balões de fala "EU MEREÇO.", "A PARCELA É BAIXINHA.", "MÊS QUE VEM EU GUARDO."
- **21–25 s:** calendário que vira (JANEIRO 01 → MAIO 05 → DEZEMBRO 12); cartões "CONTA CORRENTE" e "RESERVA R$ 0,00"; "SEM RESERVA" em vermelho.
- **26–31 s:**
  - Tela "MEU BANCO" com botão "GUARDAR R$ 200"; tijolos se empilhando ("CADA TIJOLO = R$ 200").
  - **Selo "SIMULAÇÃO ILUSTRATIVA · SEM RENDIMENTO"** no topo.
  - Contador "50 MESES · R$ 10.000".
- **31–40 s:**
  - "AUMENTO!" com tela dividida (gastos × reserva, "ANO 3 / ANO 5").
  - Planilha de categorias com barras e selo "DADOS ILUSTRATIVOS"; gráfico de rosca num celular.
- **41–52 s:**
  - Medidores "PRAZER AO GASTAR" (vermelho) × "PRAZER AO GUARDAR" (dourado) que se igualam.
  - Linha de marcos 1 mil → 10 mil com celebração de partículas.
  - Oferta "50% OFF" recusada ("NÃO, OBRIGADO.").
- **53–63 s:**
  - "SUA RESERVA R$ 10.000" vira a base "FUNDAÇÃO" de um edifício de colunas (DISCIPLINA, CONHECIMENTO, PACIÊNCIA, AUTOCONTROLE, CONSISTÊNCIA); título "MENTALIDADE".
  - Zoom-out mostra uma torre crescendo.
- **63–69 s · Ritual.**

### R4, 55 s: "daqui a 5 anos no mesmo lugar"
- **0–7 s:**
  - Boneco parado no chão pontilhado; calendário que troca de ano (2026 → 2031), "5 ANOS" dourado, régua do tempo.
  - Pílula "NO MESMO LUGAR" sob os pés, com seta pulsando.
- **7–16 s:**
  - **Círculo pontilhado** (loop) onde o boneco caminha em volta, passando por pílulas "PROCRASTINAÇÃO", "DESCULPAS", "MEDO", "COMODISMO".
  - Sombra cinza "do que poderia ser" no centro.
- **16–24 s · Rima de forma (MATCH SHAPE):**
  - a cena apaga e **o círculo fica** (16 s);
  - o círculo vira o mostrador de um relógio (17–18 s) com pílulas "SEGUNDA-FEIRA", "PRÓXIMO MÊS", "PRÓXIMO ANO";
  - os ponteiros giram rápido;
  - título "TEMPO" passa por cima do relógio.
- **25–29 s:**
  - Porta de traço ("NINGUÉM VAI BATER"), com vibração de batida.
  - Caminho pontilhado do círculo "COMODISMO" até "EVOLUÇÃO", que acende dourado sob os pés.
- **30–38 s:**
  - Mesa e computador ("EM SILÊNCIO"), barra de peso ("SEM VONTADE"), caixa empurrada ("SEM MOTIVAÇÃO").
  - Escada solitária ("SOZINHO").
- **39–47 s:**
  - Gráfico em zigue-zague crescente dourado; o boneco sobe por ele, o "eu do passado" fica embaixo.
  - "SEM DESISTIR", "SUA MELHOR VERSÃO".
- **48–55 s · Ritual:** pílula "VERSÃO ANTIGA" sobre o boneco, que se desfaz.

### R5, 92 s: história real de um executivo do mercado financeiro (investigado)
- **0–5 s:**
  - Pictograma **de terno** (contorno preto com gravata dourada), variação "pessoa importante".
  - Nome em 2 linhas (branco / dourado); cidade de prédios de traço; ícones de $ e gráfico orbitando.
- **5–11 s:** quadro com uma pilha de dinheiro **projetando uma sombra enorme** atrás ("PERCEPÇÃO = PODER"). É uma das poucas sombras reais da série.
- **11–20 s:** linha do tempo 2019 → 2024 com curva verde menta e valores crescendo; prédios subindo.
- **21–33 s:**
  - "COMO?" em dourado desfocado; fileira de bancos (colunas gregas); o do meio dourado com seta verde ("RENDIMENTOS SUPERIORES").
  - Escudo "FGC · FUNDO GARANTIDOR"; multidão de bonecos depositando.
- **34–38 s:** tabuleiro de xadrez **em perspectiva** com peças e pílulas "INFLUÊNCIA", "CONFIANÇA", "REPUTAÇÃO"; zoom-out para uma rede de pontos.
- **39–50 s:**
  - A rede vira um prédio (os pontos convergem e o prédio se desenha de baixo para cima).
  - **Corte em seção:** andares com caixas; tudo fica vermelho e tracejado.
  - Carimbo "INVESTIGADO"; pílula "SEGUNDO AS INVESTIGAÇÕES" sempre visível; "CARTEIRAS DE CRÉDITO", "FICTÍCIAS?".
- **51–58 s:**
  - O executivo num disco (palco) com pilares "INFLUÊNCIA", "CONFIANÇA", "PERCEPÇÃO DE VALOR" que sustentam um prédio.
  - "A BASE" com rachaduras.
- **61–69 s:**
  - "BANCO CENTRAL · LIQUIDAÇÃO EXTRAJUDICIAL"; o prédio desmorona em pedaços.
  - Barras "R$ 80 BILHÕES ATIVOS" × "R$ 4 MILHÕES EM CAIXA" com nota "≈ 0,005% DOS ATIVOS".
- **70–75 s:**
  - Balança da justiça; documentos com lupa.
  - **"INDICIADO PELA POLÍCIA FEDERAL" + "A DEFESA NEGA IRREGULARIDADES" + pílula "INDICIAMENTO NÃO É CONDENAÇÃO".**
- **76–88 s:**
  - Dois prédios: "BASE SÓLIDA" × "SEM PRINCÍPIOS"; o segundo entorta em vermelho e cai.
  - O executivo no topo do prédio sólido ao pôr do sol; título "PERMANECER".
  - O executivo se desfaz em partículas.
- **89–92 s · Ritual:** "EP. 04".

## 3. Catálogo de transições (visto a 10 quadros por segundo)

| # | Transição | Como acontece (medido) | Quando usar |
|---|---|---|---|
| T1 | **Portal** (R1 9,0–10,6 s) | Câmera acelera para um ícone em círculo (0,7 s, ease-in, desfoque de movimento); o círculo cresce até sair da tela; o anel branco engrossa e passa pela "lente"; dentro, a próxima cena já em quadro | Entrar num pensamento, num celular, num detalhe |
| T2 | **Apagar a luz com âncora** (R1 27,2–28 s; R4 16 s) | Tudo perde brilho em 0,4–0,6 s, menos uma âncora (o boneco andando, um círculo); a próxima cena acende em volta da âncora | Mudar de assunto mantendo continuidade |
| T3 | **Rima de forma** (R4 16–18 s) | A forma que ficou (círculo) vira outro objeto (mostrador de relógio) | Ligar dois conceitos ("loop" → "tempo") |
| T4 | **Pontos → objeto** (R5 38–39,5 s) | Elementos viram pontos/estrelas e se recompõem num novo desenho, que se constrói de baixo para cima | Passar do abstrato ao concreto |
| T5 | **Dissolver em partículas** (todas no fecho; R1 39 s) | De baixo para cima em ~0,9 s; partículas sobem e se espalham, algumas no acento | Fim de ciclo, "versão antiga", memória que some |
| T6 | **Nuvem → logo** (fecho) | Nuvem esférica ~1,5 s, depois convergência de ~1 s formando o logo; anel fino e nome | Assinatura fixa da série |
| T7 | **Travelling** (R1 escadas; R2; R4 gráfico) | Câmera acompanha o personagem (pan diagonal ~50–130 px/s) | Progresso e jornada |
| T8 | **Zoom-out de revelação** (R1 cidade; R3 torre) | Câmera se afasta 30–60% em ~1 s mostrando o contexto | Grande conclusão |
| T9 | **Título glitch** (R2 24–27 s) | Duas palavras alternando com desfoque a cada ~0,2 s e depois se separando | Confusão entre dois conceitos |
| T10 | **Fantasma de movimento** (R3 12,9–13,1 s) | O boneco deixa cópias translúcidas ao sair; a cena seguinte entra em fade de 0,3 s | Saída rápida de cena |

## 4. Luz e sombra
- **Luz:**
  - Fundo `#020202`–`#050505` com um **centro morno** radial (~#352F2B) atrás da ação. Vinheta de 7 a 14×: as bordas desaparecem.
  - **Brilho (bloom)** no personagem principal: branco puro com halo de ~10–25 px. Secundários em cinza sem brilho.
  - **Holofote** em cone do alto (às vezes do canto superior direito) com chão iluminado em elipse. Marca o "lugar certo", a versão futura ou o momento de decisão.
  - **Halo dourado** atrás da "versão futura" e de objetos de valor.
  - **Sol semicírculo** no horizonte com raios finos: esperança, novo começo.
  - **Partículas/poeira** finas flutuando sempre; chuvas de partículas em conquistas.
- **Sombra:** praticamente não existe. Profundidade vem de luz e escala, não de sombra. A exceção expressiva é a sombra gigante da pilha de dinheiro (R5 7–10 s), que vira metáfora ("percepção").
- **Clima:** o brilho global cai em momentos de perda e reflexão (cena "apaga") e sobe em conquistas (halo e partículas).

## 5. Câmera
- Sempre em movimento lento: empurrão de 0,3–1%/s (mediana) e leve deriva. **Nada parado por mais de ~2,5 s**, fora o logo final.
- Movimentos fortes (5–8%/s) só nas transições (portal, zoom-out).
- Travellings laterais e diagonais acompanhando o boneco; perspectiva 3D só pontual (tabuleiro em R5).
- Sem tremor e sem punch-in seco: o oposto do Primeiro modelo.

## 6. Personagens e objetos
- **Pictograma:**
  - cabeça redonda **separada** do corpo;
  - tronco em cápsula;
  - membros em cápsulas arredondadas;
  - **sem rosto**;
  - altura ≈ 1/6 a 1/4 da tela.
- **Poses:** em pé, andando (ciclo), subindo, sentado à mesa, deitado, empurrando, carregando, ajoelhado plantando, saltando, braços abertos, cabisbaixo.
- **Variações:** cinza (outros, passado), dourado (versão futura), "de terno" em contorno (pessoa específica, R5), família com alturas diferentes, multidão miniatura.
- **Objetos em traço fino (2–3 px)**, brancos ou no acento:
  - casa, prédio com janelas acesas, carro, celular com interface simplificada, calendário, relógio digital e analógico;
  - escudo, gráfico, barras, degraus, porta, ampulheta, livros, lâmpada, árvore com raízes, balança, documentos, tabuleiro.
- **Ícones dentro de círculos** com anel fino (estilo "bolha"), orbitando em elipses pontilhadas.
- **Pílulas** (cápsula de contorno, letras pequenas maiúsculas e espaçadas) rotulando conceitos: "DISCIPLINA", "PENDENTE", "SEGUNDO AS INVESTIGAÇÕES".

## 7. Tipografia e legenda
- **Títulos:**
  - sans geométrica muito pesada, maiúsculas, levemente espaçada; 1 ou 2 linhas (branco + acento), no terço superior.
  - **Entram letra a letra saindo do desfoque** (≈ 0,04–0,05 s entre letras) e saem desfocando inteiros.
- **Legenda:**
  - sans pesada em caixa normal, ~48–52 px a 1080 p, centralizada em ~69% da altura (≈ y 1320);
  - até 2 linhas;
  - **se escreve palavra a palavra**: a próxima palavra aparece em cinza um instante antes e vira branca quando é dita; palavra-chave no acento;
  - entre frases a legenda some e a área fica vazia.

## 8. Som
- Voz masculina grave (F0 110–138 Hz), pausada, firme, sem euforia; 130–160 palavras/min.
- Trilha cinematográfica contínua (piano e pad escuros) **~14 dB abaixo da voz**, nunca some, e **cresce no fecho** quando a voz acaba (o fecho mede −14 a −17 LUFS com pouca fala).
- Efeitos discretos: *whoosh* no portal, impacto grave nos títulos, brilho nas partículas, tique de relógio, digitação, vibração da porta.

## 9. Estrutura narrativa (igual nas 5)
1. **Gancho de identificação** em 1 frase: "Se você…", "Imagine acordar daqui a 5 anos…", "Os primeiros 10 mil…", "[nome] entendeu uma coisa que poucos entendem."
2. **Dor / realidade:** o que acontece hoje, com exemplos concretos e frases curtas.
3. **Virada** ("Mas…", "Mas talvez você esteja confundindo…").
4. **Caminho:** o que fazer, em verbos no imperativo: "Comece", "Guarde", "Aprenda", "Respeite".
5. **Frase-síntese citável:** "O verdadeiro poder não está em chegar, está em permanecer."
6. **Ritual de fecho fixo da série:** a mesma frase, a mesma animação (partículas → logo) e número do episódio.

**Integridade observada em R3 e R5 (vale adotar):**
- selos "SIMULAÇÃO ILUSTRATIVA", "DADOS ILUSTRATIVOS";
- atribuição permanente da fonte ("SEGUNDO AS INVESTIGAÇÕES", "SEGUNDO O BANCO CENTRAL");
- o outro lado ("A DEFESA NEGA IRREGULARIDADES");
- a ressalva "INDICIAMENTO NÃO É CONDENAÇÃO".

## 10. O que NÃO copiar (identidade do terceiro)
- O nome e o logo da série, a frase-ritual "Sua antiga versão termina aqui / Bem-vindo à…" e a numeração "EP." com o mesmo desenho.
- O **dourado champanhe** como cor-assinatura. Na ATIVO, o papel do dourado é do verde `#02FB3F`.
- Motivos específicos: relógio "03:00" na cama, "versão futura" dourada, árvore com raízes.

O que se adota é a **gramática** (luz, traço, transições contínuas, legenda que se escreve, ritual de fecho próprio), não os desenhos.
