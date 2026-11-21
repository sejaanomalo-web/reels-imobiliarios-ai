# Análise das 3 referências, quadro a quadro

**Material:** 3 vídeos verticais de 576×1024 a 30 fps (72 s, 84 s e 78 s). Os mesmos arquivos do envio anterior (hash idêntico).

**Método:**
1. **Medição automática dos 7.013 quadros**, todos os quadros dos três vídeos. Para cada quadro foram medidos:
   - diferença para o quadro anterior;
   - movimento global da câmera (zoom, pan e giro, por casamento de pontos ORB + RANSAC);
   - luminância, saturação e vinheta (brilho do centro ÷ brilho dos cantos).
2. **Inspeção visual** em três níveis:
   - 1 quadro por segundo nos três vídeos inteiros;
   - 15 quadros por segundo em volta de 12 cortes;
   - quadros em resolução cheia para luz e sombra.

> Ressalva honesta: nos fundos chapados o medidor de câmera tem pouca textura para se apoiar. Valores altos isolados (ex.: giro de 177° no v1, 31 s) são transições, não movimentos reais de câmera.

## 1. Números-chave

| | Ref. 1 | Ref. 2 | Ref. 3 |
|---|---|---|---|
| Duração | 72,1 s | 83,9 s | 77,7 s |
| Cortes de cenário (troca de fundo) | 21 | 27 | 20 |
| Duração média de cada cenário | 3,3 s | 3,0 s | 3,7 s |
| Troca de elemento dentro do cenário | a cada ~1 s | a cada ~1 s | a cada ~1 s |
| Quadros totalmente parados | 49% | 10% | 0% |
| Vinheta média (centro ÷ cantos) | 2,5× | 2,5× | 1,8× |
| Narração | ~180 palavras/min, voz masculina enérgica, trilha baixa por baixo | idem | idem |

**Leitura dos números:**
- O cenário troca a cada ~3 s.
- Algo novo aparece na tela a cada ~1 s: um selo, um número, um objeto ou a legenda.
- A câmera fica quase sempre parada. Ela só se mexe para dar ênfase.

## 2. Estrutura narrativa (igual nos 3)

1. **Gancho em pergunta:** "O que aconteceria se…?" (0–3 s), já com o personagem e o cenário.
2. **Linha do tempo:** "No primeiro dia / Semana 1 / Mês 1 / Ano 1", com selo colorido no topo e barra de progresso de pontinhos (ref. 3).
3. **Cada etapa traz um número ou fato** com prova visual: contador rolando, comparação lado a lado, mapa.
4. **Virada / ironia** no final ("o difícil é ficar", "juntos é mais forte", "ninguém").
5. **Fecho:**
   - card "COMENTA AÍ:" com pergunta e etiquetas de opção;
   - uma mão clica em **SEGUIR → SEGUINDO ✓**;
   - "PARTE 2";
   - fade para o preto.

## 3. Personagens

- **Estilo:** 2D vetorial chapado, "cartoon explicativo".
- **Proporções e rosto:**
  - cabeça grande (≈ 1/3 do corpo);
  - olhos brancos redondos com pupila preta;
  - boca que abre e fecha na fala;
  - sobrancelha muda a emoção (neutro / bravo / espantado).
- **Corpo:** sem contorno preto; cores sólidas com 1 tom de sombra (ex.: dobra da faixa, cabelo).
- **Animação "de recorte" (rig 2D):**
  - braço gira no ombro (aceno, apontar, mão na cabeça);
  - corpo balança levemente (respiração);
  - piscadas;
  - figurantes andam em ciclo simples.
- **Elenco recorrente:** um protagonista (presidente / general) que reaparece em vários cenários, mais multidões de bonecos genéricos de cores variadas.

## 4. Iluminação e sombras

Não há luz "3D" nem sombras projetadas realistas. O clima vem de 5 recursos:

1. **Vinheta forte:** o centro chega a ser 2 a 5 vezes mais claro que os cantos. Ela fica mais forte nas cenas tensas (TV "AO VIVO" ≈ 5×) e quase some nas cenas abertas (≈ 1,1–1,5×).
2. **Fundo de raios (sunburst) girando devagar,** com o centro iluminado. A cor do fundo muda com o tom:
   - azul = explicação;
   - vermelho = ameaça / conflito;
   - verde = dinheiro / ganho;
   - roxo = pergunta final;
   - petróleo com grade = dados / "sala de controle".
3. **Holofote (cone de luz):** cone translúcido vindo de cima, com partículas de poeira e chão iluminado em elipse. Usado no general do briefing e na xícara "artigo de luxo".
4. **Grade de cor por época:**
   - cenas históricas ficam em **sépia** (1947, 1964): fundo bege, silhuetas marrons, contraste baixo;
   - presente = cores saturadas.
5. **Textura e profundidade:**
   - textura de papel / aquarela em mapas e quadros;
   - partículas e "estrelas" flutuando nos fundos escuros;
   - fundo mais escuro e dessaturado, primeiro plano saturado.

**Sombras:** só sombra de contato discreta (elipse escura sob personagens e objetos) e 1 tom mais escuro em uma face dos objetos (lombada do livro, aba do quepe).

## 5. Câmera

- **Parada na maior parte do tempo.** A ênfase vem dos objetos entrando, não da câmera.
- **Push-in lento** (1–8% por segundo) para criar tensão em frases-chave e no final (rosto espantado, v1 69–71 s).
- **Punch-in** (zoom de +15% a +33% em menos de 1 s) para dar "soco" numa palavra ou entrar num objeto (o papel sendo escrito, o tanque de 1964).
- **Zoom-out rápido** para revelar o contexto (lápide das cláusulas pétreas).
- **Pan lateral** acompanhando ação (soldados na praia, ~80 px/s).
- **Tremor de impacto** de 3–6 quadros quando algo "bate": carimbo, cofre fechando, grade da prisão.
- **Parallax 2D:** camadas de frente e de fundo andando em velocidades diferentes (deputados, multidões).

## 6. Efeitos e cortes

- **Corte seco** é o padrão. Não há fade entre cenas; só o fade final para preto.
- **Transições rápidas (1–3 quadros):**
  - chicote / desfoque de movimento;
  - linhas de velocidade;
  - flash para o fundo desfocado do próximo cenário.
- **Entrada de elementos com "pop" elástico:** escala de ~0,5 a 1,05 e depois 1, em 4–6 quadros (0,13–0,2 s). Vale para selos ("DIA 1"), etiquetas, números e ícones.
- **Carimbo inclinado** ("SEPAROU!", "SUSTO!", "IMPORTADO", "GOLPE"): fundo vermelho, borda branca, leve giro, cai com escala grande e tremor.
- **Contador rolando:** número sobe em ~1 s (US$ 12 → 950; 61 → 342 votos; 809 → 7.500 km).
- **Barras e pilhas crescendo de baixo** para comparações.
- **Símbolo de proibido vermelho** sobrepondo o objeto.
- **Chuva de objetos** (cédulas, confete, cadeados caindo).
- **Contorno neon brilhante** em regiões do mapa.
- **Interface de rede social fake no fecho:** botão SEGUIR, mão clicando, card de comentário.

## 7. Legendas

- **Fonte:** condensada pesada, estilo Anton / Bebas.
- **Cor e acabamento:** branca, com contorno escuro fino e sombra.
- **Posição:** fixa no **centro da tela** (~y 50%), não embaixo.
- **Tamanho dos blocos:** 2–3 palavras por vez.
- **Karaokê:**
  - a palavra ainda não falada fica **cinza**;
  - a falada vira **branca**;
  - a palavra-chave fica **amarela**;
  - palavra negativa fica **vermelha**.
- **Títulos de cena** no topo (ex.: "PROBLEMA", "MAIS GENTE!") na mesma fonte, em amarelo ou vermelho. São independentes da legenda.

## 8. Som

- Narração rápida e animada, com trilha leve contínua por baixo (Whisper marca "[Música]" no fim).
- SFX nos eventos visuais: pop, carimbo, telefone "TRIM!", whoosh.

---

## 9. Como isso vira o nosso vídeo do boxe (decupagem preliminar, ~60 s)

A mesma gramática, com cenários, personagens e artes originais. Os tempos são estimados a 180 palavras/min e se ajustam à voz real quando ela chegar.

| Tempo | Fala (roteiro aprovado) | Cenário / luz | Câmera e efeitos |
|---|---|---|---|
| 0–2 | "O que aconteceria se um boxeador…" | Ringue olímpico à noite, holofote de cima, vinheta forte, dois boxeadores (azul × vermelho) | Parada → push-in lento |
| 2–4 | "…acertasse um soco na nuca do adversário numa luta olímpica?" | Mesmo ringue; o soco congela a centímetros da nuca | Punch-in +25% + carimbo **PROIBIDO** com tremor |
| 4–7 | "No primeiro segundo, o árbitro grita 'stop' e para a luta." | Selo **1º SEGUNDO** no topo; árbitro entra entre os dois | Pop elástico do árbitro, balão **STOP!** |
| 7–11 | "Esse golpe tem até apelido: soco de coelho." | Fundo de raios azuis; cartão **SOCO DE COELHO** + silhueta de coelho | Pop + leve balanço |
| 11–16 | "E não é frescura. Atrás da cabeça ficam a base do crânio e a coluna do pescoço." | Fundo petróleo com grade ("raio-X"); cabeça de perfil com a coluna acendendo em vermelho | Push-in lento; contorno neon pulsando |
| 16–24 | "É uma área que o lutador não consegue proteger… lesão grave." | Mesmo raio-X; ícone de olho riscado; etiqueta **ÁREA SEM DEFESA** | Selo vermelho; flash curto |
| 24–29 | "Na primeira vez, o árbitro pode só dar uma bronca." | Ringue, holofote; selo **1ª VEZ**; árbitro apontando o dedo | Corte seco; pop |
| 29–34 | "Se ele der uma advertência oficial, cada juiz tira um ponto do lutador." | Placar de 3 juízes; selo **ADVERTÊNCIA 1** | Contador descendo 10 → 9 nos 3 juízes |
| 34–39 | "Na terceira advertência da mesma luta, acabou: desclassificação automática." | Fundo de raios vermelho; ADVERTÊNCIA 1 → 2 → 3 (pontinhos de progresso) | Carimbo **DESCLASSIFICADO** + tremor |
| 39–45 | "E se o golpe for de propósito e o adversário não conseguir continuar? Desclassificado na hora." | Ringue; adversário sentado no corner; luz piscando | Punch-in; carimbo **NA HORA** |
| 45–55 | "Ou seja: no boxe olímpico, um único soco no lugar errado pode valer mais pro seu adversário do que todos os seus acertos." | Balança: muitos ✓ de um lado × 1 soco do outro; a medalha atravessa o ringue | Zoom-out de revelação; chuva de confete no vencedor |
| 55–60 | "Qual esporte olímpico você quer ver aqui? Comenta aí." | Fundo roxo de raios; card **COMENTA AÍ** com ícones de esportes; botão SEGUIR | Mão clica SEGUIR → SEGUINDO ✓; fade para preto |

**Padrões aplicados:**
- troca de cenário a cada ~3–5 s;
- algo novo a cada ~1 s;
- legenda karaokê no centro (cinza → branco, chave em amarelo e negativas em vermelho);
- vinheta mais forte nos momentos tensos;
- holofote no ringue;
- SFX em cada pop, carimbo e soco, com trilha baixa por baixo.

**Ainda pendente com você:** **2D** (como nas referências) **ou 3D**?

- **Minha recomendação é 2D:** fica fiel às referências e com acabamento profissional.
- **O 3D** também dá para fazer aqui (Three.js). Os personagens sairiam estilizados e mais simples, e esse estilo não aparece nas referências.


---

# Anexo — tabela segundo a segundo

## Referência 1 — "Presidente vira ditador" (72 s)

| s | O que acontece na tela | Câmera (zoom %/s · pan px/s) | Movimento | Luz (luminância · vinheta centro/canto) |
|---|---|---|---|---|
| 0 | Abertura: estádio + presidente de frente, bandeira; pergunta-gancho | parada | leve | 141 · 1.1 |
| 1 | Fundo de raios azuis; presidente centralizado fala (boca animada) | parada | médio | 85 · 2.2 |
| 2 | Fundo de raios azuis; presidente centralizado fala (boca animada) | parada | leve | 65 · 2.7 |
| 3 | Punch-in rápido (+15%) com leve giro: soco de ênfase | push-in +15% · pan -28,-13 | médio | 65 · 2.7 |
| 4 | Fundo de raios vermelho, coroa cai, título DITADOR, cara brava | zoom-out -3% | leve | 66 · 2.8 |
| 5 | Corte: gabinete, relógio 7:00 surge com pop | parada | médio | 113 · 2.7 |
| 6 | Corte: papel na mesa de madeira; câmera empurra forte (+14% a +33%/s) até o papel; caneta escreve | push-in +33% · pan -90,-187 | médio | 136 · 3.8 |
| 7 | Corte: papel na mesa de madeira; câmera empurra forte (+14% a +33%/s) até o papel; caneta escreve | push-in +14% · pan -38,-89 | quase parado | 139 · 4.1 |
| 8 | Corte: papel na mesa de madeira; câmera empurra forte (+14% a +33%/s) até o papel; caneta escreve | push-in +27% · pan -74,-162 | leve | 136 · 4.3 |
| 9 | Texto manuscrito aparece; carimbo bate (tremor de impacto) |  · pan -1,-54 | médio | 131 · 3.8 |
| 10 | Texto manuscrito aparece; carimbo bate (tremor de impacto) | parada | forte | 123 · 3.5 |
| 11 | NADA em vermelho + balão de reticências | parada | quase parado | 82 · 3.5 |
| 12 | Corte: Congresso no céu, deputados entram caminhando (parallax); selo CONGRESSO ABERTO | push-in +9% · pan -30,-52 | médio | 160 · 1.9 |
| 13 | Corte: Congresso no céu, deputados entram caminhando (parallax); selo CONGRESSO ABERTO | parada | leve | 160 · 1.9 |
| 14 | Corte: Congresso no céu, deputados entram caminhando (parallax); selo CONGRESSO ABERTO | parada | médio | 120 · 1.9 |
| 15 | Corte: livro Constituição 1988 nos raios azuis; correntes e cadeado travam | parada | quase parado | 62 · 2.1 |
| 16 | Corte: livro Constituição 1988 nos raios azuis; correntes e cadeado travam | parada | quase parado | 63 · 2.2 |
| 17 | Zoom-out rápido (-16% a -33%/s) para lápide CLÁUSULAS PÉTREAS | zoom-out -16% · pan +48,+77 | médio | 72 · 2.7 |
| 18 | Zoom-out rápido (-16% a -33%/s) para lápide CLÁUSULAS PÉTREAS | zoom-out -33% · pan +98,+43 | leve | 75 · 3.0 |
| 19 | Lápide menor + fila de deputados trocando de cor (troca-troca) | zoom-out -1% | médio | 72 · 2.5 |
| 20 | Lápide menor + fila de deputados trocando de cor (troca-troca) | parada | médio | 71 · 2.5 |
| 21 | Proibido vermelho + borracha tentando apagar | push-in +9% · pan -15,-62 | médio | 67 · 2.7 |
| 22 | Corte: fundo grade petróleo, urna VOTO e pilares PODERES | parada | leve | 46 · 2.9 |
| 23 | Corte: fundo grade petróleo, urna VOTO e pilares PODERES | parada | quase parado | 48 · 3.0 |
| 24 | Cofre fecha com chicote lateral (whip) e tremor forte: DENTRO. | zoom-out -7% · pan +104,+6 | médio | 86 · 3.0 |
| 25 | Corte: gabinete, presidente no telefone vermelho, TRIM! em volta | parada | leve | 147 · 1.4 |
| 26 | Corte: gabinete, presidente no telefone vermelho, TRIM! em volta | push-in +2% · pan +35,-87 | médio | 136 · 1.8 |
| 27 | Corte: gabinete, presidente no telefone vermelho, TRIM! em volta | parada | quase parado | 131 · 2.0 |
| 28 | Corte: fundo grade, fila de ministros; 2024 SUPREMO; checks verdes um a um: UNANIMIDADE | parada | médio | 81 · 2.3 |
| 29 | Corte: fundo grade, fila de ministros; 2024 SUPREMO; checks verdes um a um: UNANIMIDADE | parada | quase parado | 49 · 2.6 |
| 30 | Corte: fundo grade, fila de ministros; 2024 SUPREMO; checks verdes um a um: UNANIMIDADE | parada | quase parado | 49 · 2.6 |
| 31 | Corte: fundo grade, fila de ministros; 2024 SUPREMO; checks verdes um a um: UNANIMIDADE | zoom-out -4% · pan +545,+1053 | leve | 51 · 2.7 |
| 32 | Corte (giro): quepe militar, coroa QUEM MANDA, proibido por cima | parada | leve | 51 · 2.7 |
| 33 | Corte (giro): quepe militar, coroa QUEM MANDA, proibido por cima |  · pan -14,-2 | leve | 55 · 3.2 |
| 34 | Corte (giro): quepe militar, coroa QUEM MANDA, proibido por cima | parada | leve | 56 · 3.3 |
| 35 | Corte: TV AO VIVO, presidente gritando (vinheta forte nas bordas) | parada | quase parado | 52 · 5.1 |
| 36 | Corte: TV AO VIVO, presidente gritando (vinheta forte nas bordas) | parada | leve | 52 · 5.0 |
| 37 | Corte: TV AO VIVO, presidente gritando (vinheta forte nas bordas) | parada | quase parado | 52 · 5.2 |
| 38 | Corte: TV AO VIVO, presidente gritando (vinheta forte nas bordas) | parada | médio | 53 · 5.1 |
| 39 | Corte: plenário em arco, selo DIA SEGUINTE, pasta PROCESSO cai | parada | leve | 56 · 2.7 |
| 40 | Corte: plenário em arco, selo DIA SEGUINTE, pasta PROCESSO cai | parada | quase parado | 56 · 2.3 |
| 41 | Corte: plenário em arco, selo DIA SEGUINTE, pasta PROCESSO cai | parada | médio | 74 · 4.2 |
| 42 | Corte: plenário em arco, selo DIA SEGUINTE, pasta PROCESSO cai | parada | leve | 70 · 4.3 |
| 43 | Corte: placar semicircular conta 61 → 223 → 342 VOTOS (fica verde) | parada | médio | 45 · 3.6 |
| 44 | Corte: placar semicircular conta 61 → 223 → 342 VOTOS (fica verde) | parada | médio | 47 · 3.7 |
| 45 | Corte: placar semicircular conta 61 → 223 → 342 VOTOS (fica verde) | parada | médio | 86 · 2.7 |
| 46 | Corte: gabinete, TENTAR GOLPE | parada | leve | 142 · 1.5 |
| 47 | Grade de prisão desce na frente, selo ATÉ 12 ANOS | parada | leve | 125 · 1.4 |
| 48 | Grade de prisão desce na frente, selo ATÉ 12 ANOS | parada | médio | 123 · 1.5 |
| 49 | Bandeira, cadeados caem em volta: TANTA TRAVA | parada | quase parado | 68 · 2.7 |
| 50 | Bandeira, cadeados caem em volta: TANTA TRAVA | parada | leve | 71 · 2.8 |
| 51 | Bandeira, cadeados caem em volta: TANTA TRAVA | push-in +28% · pan -75,-68 | médio | 95 · 2.2 |
| 52 | Punch-in (+28%) e corte para cena SÉPIA: tanque, 1964, carimbo GOLPE | parada | quase parado | 126 · 1.2 |
| 53 | Punch-in (+28%) e corte para cena SÉPIA: tanque, 1964, carimbo GOLPE | parada | quase parado | 126 · 1.2 |
| 54 | Punch-in (+28%) e corte para cena SÉPIA: tanque, 1964, carimbo GOLPE | parada | quase parado | 126 · 1.2 |
| 55 | Punch-in (+28%) e corte para cena SÉPIA: tanque, 1964, carimbo GOLPE | zoom-out -19% · pan +54,-7 | médio | 119 · 1.6 |
| 56 | Zoom-out; urna com cadeado 1965 / 1980 / 1985; selo 21 ANOS SEM VOTAR | parada | leve | 118 · 1.7 |
| 57 | Zoom-out; urna com cadeado 1965 / 1980 / 1985; selo 21 ANOS SEM VOTAR | parada | leve | 120 · 1.7 |
| 58 | Constituição 1988 de volta nos raios azuis | parada | médio | 77 · 2.0 |
| 59 | Constituição 1988 de volta nos raios azuis | parada | quase parado | 63 · 2.1 |
| 60 | Constituição 1988 de volta nos raios azuis | parada | leve | 63 · 2.1 |
| 61 | Porta DITADURA, a chave some: ESCONDEU A CHAVE | push-in +1% | leve | 61 · 1.8 |
| 62 | Porta DITADURA, a chave some: ESCONDEU A CHAVE | parada | leve | 62 · 1.7 |
| 63 | Gabinete, cadeira vazia, presidente apontando: 1 SEMANA DEPOIS, NINGUÉM | parada | médio | 110 · 1.5 |
| 64 | Gabinete, cadeira vazia, presidente apontando: 1 SEMANA DEPOIS, NINGUÉM | parada | leve | 133 · 1.4 |
| 65 | Gabinete, cadeira vazia, presidente apontando: 1 SEMANA DEPOIS, NINGUÉM | parada | quase parado | 133 · 1.4 |
| 66 | Gabinete, cadeira vazia, presidente apontando: 1 SEMANA DEPOIS, NINGUÉM | parada | leve | 133 · 1.4 |
| 67 | Gabinete, cadeira vazia, presidente apontando: 1 SEMANA DEPOIS, NINGUÉM | parada | leve | 134 · 1.4 |
| 68 | Gabinete, cadeira vazia, presidente apontando: 1 SEMANA DEPOIS, NINGUÉM | parada | quase parado | 132 · 1.4 |
| 69 | Push-in lento (+6%/s) no rosto espantado com ? (gancho final) | push-in +5% · pan -14,-26 | médio | 150 · 2.1 |
| 70 | Push-in lento (+6%/s) no rosto espantado com ? (gancho final) | push-in +6% · pan -23,-23 | médio | 164 · 1.5 |
| 71 | Push-in lento (+6%/s) no rosto espantado com ? (gancho final) | push-in +7% · pan -25,-24 | forte | 111 · 1.1 |
| 72 | Fade para preto | parada | forte | 16 · 1.0 |

## Referência 2 — "EUA invadem o Brasil" (84 s)

| s | O que acontece na tela | Câmera (zoom %/s · pan px/s) | Movimento | Luz (luminância · vinheta centro/canto) |
|---|---|---|---|---|
| 0 | Praia ao pôr do sol, navios no horizonte, soldados desembarcando (pan lateral) | push-in +1% | leve | 146 · 1.1 |
| 1 | Praia ao pôr do sol, navios no horizonte, soldados desembarcando (pan lateral) | push-in +2% | forte | 141 · 1.0 |
| 2 | Praia ao pôr do sol, navios no horizonte, soldados desembarcando (pan lateral) |  · pan -39,+9 | forte | 147 · 1.3 |
| 3 | Soldados correndo com fuzis entre palmeiras |  · pan -84,-6 | forte | 146 · 1.3 |
| 4 | Corte: praia de dia, selo DIA 1, fila de soldados sorrindo, bandeira; FÁCIL? | push-in +1% | médio | 145 · 1.3 |
| 5 | Corte: praia de dia, selo DIA 1, fila de soldados sorrindo, bandeira; FÁCIL? |  · pan +64,+8 | forte | 81 · 1.6 |
| 6 | Corte: fundo escuro, pilhas de dinheiro Brasil × EUA crescendo de baixo; 40x | push-in +1% | leve | 40 · 2.1 |
| 7 | Corte: fundo escuro, pilhas de dinheiro Brasil × EUA crescendo de baixo; 40x | push-in +4% · pan -11,-19 | médio | 48 · 2.2 |
| 8 | Corte: fundo escuro, pilhas de dinheiro Brasil × EUA crescendo de baixo; 40x | push-in +3% | médio | 56 · 2.1 |
| 9 | Corte: fundo escuro, pilhas de dinheiro Brasil × EUA crescendo de baixo; 40x | parada | leve | 57 · 1.8 |
| 10 | Chuva de cédulas; contador rola US$ 12 → 950 BILHÕES/ANO | push-in +2% · pan -79,-5 | forte | 57 · 2.2 |
| 11 | Chuva de cédulas; contador rola US$ 12 → 950 BILHÕES/ANO | push-in +8% · pan -28,-33 | forte | 60 · 2.3 |
| 12 | Chuva de cédulas; contador rola US$ 12 → 950 BILHÕES/ANO | push-in +12% · pan -76,-56 | forte | 60 · 2.2 |
| 13 | Corte: sala de briefing com holofote de cima, general na frente do mapa; PROBLEMA |  · pan +68,-6 | leve | 100 · 1.7 |
| 14 | Corte: sala de briefing com holofote de cima, general na frente do mapa; PROBLEMA | parada | leve | 101 · 1.6 |
| 15 | Corte: sala de briefing com holofote de cima, general na frente do mapa; PROBLEMA | push-in +72% · pan -175,-363 | médio | 80 · 2.7 |
| 16 | Mapas Brasil × EUA sobrepostos, 8,5 × 7,8 mi km²; SEM ALASCA | parada | leve | 60 · 3.7 |
| 17 | Mapas Brasil × EUA sobrepostos, 8,5 × 7,8 mi km²; SEM ALASCA | zoom-out -1% · pan +2,+13 | forte | 69 · 3.5 |
| 18 | Mapas Brasil × EUA sobrepostos, 8,5 × 7,8 mi km²; SEM ALASCA | zoom-out -1% · pan +100,+2 | forte | 85 · 3.2 |
| 19 | Praia, soldado patrulhando; contador 809 → 7.500 KM DE PRAIA | push-in +2% · pan +10,-15 | forte | 140 · 1.3 |
| 20 | Praia, soldado patrulhando; contador 809 → 7.500 KM DE PRAIA | push-in +2% | forte | 139 · 1.2 |
| 21 | Praia, soldado patrulhando; contador 809 → 7.500 KM DE PRAIA | push-in +1% · pan -21,+15 | forte | 140 · 1.2 |
| 22 | Praia, soldado patrulhando; contador 809 → 7.500 KM DE PRAIA |  · pan -67,-2 | forte | 127 · 1.3 |
| 23 | Corte: vista aérea de floresta com estrada; SEMANA 1 | parada | médio | 97 · 1.3 |
| 24 | Corte: vista aérea de floresta com estrada; SEMANA 1 | parada | médio | 96 · 1.3 |
| 25 | Mapa do Brasil vira floresta; 1% → 49% É FLORESTA; QUASE SEM ESTRADA |  · pan +82,-8 | médio | 63 · 2.5 |
| 26 | Mapa do Brasil vira floresta; 1% → 49% É FLORESTA; QUASE SEM ESTRADA | push-in +1% | leve | 58 · 2.7 |
| 27 | Mapa do Brasil vira floresta; 1% → 49% É FLORESTA; QUASE SEM ESTRADA | parada | leve | 61 · 2.8 |
| 28 | Mapa do Brasil vira floresta; 1% → 49% É FLORESTA; QUASE SEM ESTRADA |  · pan -38,+5 | médio | 64 · 2.6 |
| 29 | Tanque e caminhão na mata: NÃO PASSA, ATOLOU | push-in +39% · pan -115,-85 | médio | 67 · 1.9 |
| 30 | Tanque e caminhão na mata: NÃO PASSA, ATOLOU | push-in +22% · pan -97,-144 | médio | 74 · 1.7 |
| 31 | Satélite no espaço | parada | médio | 49 · 2.7 |
| 32 | Floresta vista do satélite, marcadores ? ; 0 ENCONTRADOS | push-in +1% · pan -17,-3 | médio | 84 · 1.6 |
| 33 | Floresta vista do satélite, marcadores ? ; 0 ENCONTRADOS | parada | médio | 85 · 1.5 |
| 34 | Casa americana, selo MÊS 1: O PROBLEMA CHEGOU | push-in +1% · pan +100,-10 | forte | 144 · 1.9 |
| 35 | Casa americana, selo MÊS 1: O PROBLEMA CHEGOU | parada | leve | 147 · 1.8 |
| 36 | Casa americana, selo MÊS 1: O PROBLEMA CHEGOU | parada | leve | 148 · 1.8 |
| 37 | Cafezal, agricultor acenando; medalha Nº1 PRODUTOR | zoom-out -1% · pan -90,+3 | médio | 127 · 1.4 |
| 38 | Cafezal, agricultor acenando; medalha Nº1 PRODUTOR | push-in +3% · pan -8,-17 | leve | 120 · 1.2 |
| 39 | Cafezal, agricultor acenando; medalha Nº1 PRODUTOR | parada | leve | 120 · 1.2 |
| 40 | Navio cargueiro dos EUA: Nº1 COMPRADOR | push-in +9% · pan -13,-64 | médio | 125 · 2.0 |
| 41 | Navio cargueiro dos EUA: Nº1 COMPRADOR | push-in +2% | médio | 126 · 2.1 |
| 42 | Navio cargueiro dos EUA: Nº1 COMPRADOR | push-in +4% · pan -4,-28 | médio | 146 · 2.0 |
| 43 | Cozinha, brasileiro e americano com xícara vazia | parada | quase parado | 175 · 1.8 |
| 44 | Cozinha, brasileiro e americano com xícara vazia | push-in +18% · pan -49,-110 | quase parado | 175 · 1.8 |
| 45 | Holofote, xícara em vitrine com cordão: ARTIGO DE LUXO, etiqueta $99 | parada | forte | 59 · 6.9 |
| 46 | Holofote, xícara em vitrine com cordão: ARTIGO DE LUXO, etiqueta $99 |  · pan +76,-2 | forte | 48 · 6.5 |
| 47 | General preocupado: O PIOR... | parada | forte | 41 · 5.9 |
| 48 | General preocupado: O PIOR... | push-in +10% · pan -25,-63 | forte | 48 · 5.5 |
| 49 | Cena SÉPIA: documento TRATADO INTERAMERICANO 1947 | parada | leve | 96 · 5.8 |
| 50 | Cena SÉPIA: documento TRATADO INTERAMERICANO 1947 | parada | quase parado | 99 · 5.8 |
| 51 | Cena SÉPIA: documento TRATADO INTERAMERICANO 1947 | parada | quase parado | 101 · 5.8 |
| 52 | Cena SÉPIA: documento TRATADO INTERAMERICANO 1947 | parada | leve | 102 · 5.9 |
| 53 | Mapa das Américas fica vermelho: ATACOU UM = ATACOU TODOS | zoom-out -2% · pan -67,+21 | médio | 69 · 3.3 |
| 54 | Mapa das Américas fica vermelho: ATACOU UM = ATACOU TODOS | push-in +1% | leve | 68 · 3.0 |
| 55 | Mapa das Américas fica vermelho: ATACOU UM = ATACOU TODOS | parada | leve | 73 · 2.5 |
| 56 | Mapa das Américas fica vermelho: ATACOU UM = ATACOU TODOS | parada | leve | 73 · 2.3 |
| 57 | Briefing com holofote, general espantado: OS PRÓPRIOS EUA |  · pan +117,+1 | médio | 98 · 3.2 |
| 58 | Briefing com holofote, general espantado: OS PRÓPRIOS EUA | parada | leve | 101 · 3.0 |
| 59 | Briefing com holofote, general espantado: OS PRÓPRIOS EUA | push-in +30% · pan -103,-124 | médio | 100 · 2.9 |
| 60 | Briefing com holofote, general espantado: OS PRÓPRIOS EUA |  · pan -86,+2 | médio | 104 · 2.6 |
| 61 | SÉPIA: soldados do Brasil e dos EUA apertando as mãos; MESMO LADO | parada | leve | 125 · 1.3 |
| 62 | SÉPIA: soldados do Brasil e dos EUA apertando as mãos; MESMO LADO | parada | leve | 125 · 1.3 |
| 63 | SÉPIA: soldados do Brasil e dos EUA apertando as mãos; MESMO LADO | parada | leve | 125 · 1.3 |
| 64 | SÉPIA: soldados do Brasil e dos EUA apertando as mãos; MESMO LADO | parada | leve | 125 · 1.3 |
| 65 | SÉPIA: soldados do Brasil e dos EUA apertando as mãos; MESMO LADO | push-in +1% · pan +77,+11 | forte | 121 · 1.3 |
| 66 | Contador 24.387 → 25.000 brasileiros na Itália, pelotão marchando | push-in +2% · pan -39,+24 | forte | 120 · 1.3 |
| 67 | Contador 24.387 → 25.000 brasileiros na Itália, pelotão marchando | parada | médio | 123 · 1.3 |
| 68 | Briefing: ANO 1, O DIFÍCIL É FICAR |  · pan -121,+5 | forte | 101 · 2.4 |
| 69 | Briefing: ANO 1, O DIFÍCIL É FICAR | parada | leve | 87 · 2.8 |
| 70 | Briefing: ANO 1, O DIFÍCIL É FICAR | parada | leve | 88 · 2.8 |
| 71 | Briefing: ANO 1, O DIFÍCIL É FICAR | parada | quase parado | 88 · 2.6 |
| 72 | Briefing: ANO 1, O DIFÍCIL É FICAR | parada | leve | 89 · 2.7 |
| 73 | Briefing: ANO 1, O DIFÍCIL É FICAR |  · pan +116,-1 | forte | 105 · 2.3 |
| 74 | Multidão com bandeiras e confete: 213 MILHÕES | push-in +1% · pan +12,-13 | médio | 137 · 1.6 |
| 75 | Multidão com bandeiras e confete: 213 MILHÕES | parada | médio | 138 · 1.6 |
| 76 | Multidão com bandeiras e confete: 213 MILHÕES | parada | médio | 138 · 1.6 |
| 77 | Multidão com bandeiras e confete: 213 MILHÕES | parada | médio | 138 · 1.7 |
| 78 | Card COMENTA AÍ: qual estado seria o mais difícil? + etiquetas de estados | push-in +16% · pan -25,-110 | forte | 75 · 4.5 |
| 79 | Card COMENTA AÍ: qual estado seria o mais difícil? + etiquetas de estados | parada | leve | 68 · 5.4 |
| 80 | Card COMENTA AÍ: qual estado seria o mais difícil? + etiquetas de estados | parada | leve | 71 · 5.0 |
| 81 | Pôr do sol, mão clica SEGUIR → SEGUINDO ✓, PARTE 2 |  · pan +131,-3 | médio | 62 · 4.5 |
| 82 | Pôr do sol, mão clica SEGUIR → SEGUINDO ✓, PARTE 2 | parada | leve | 56 · 3.6 |
| 83 | Pôr do sol, mão clica SEGUIR → SEGUINDO ✓, PARTE 2 | parada | leve | 36 · 2.9 |

## Referência 3 — "Sul vira outro país" (78 s)

| s | O que acontece na tela | Câmera (zoom %/s · pan px/s) | Movimento | Luz (luminância · vinheta centro/canto) |
|---|---|---|---|---|
| 0 | Abertura: mapa da América do Sul, Brasil com bandeira | push-in +3% · pan -15,-16 | forte | 95 · 2.0 |
| 1 | Zoom no Sul, estados com bandeiras e contorno neon; fumaça; selo SEPAROU! | push-in +76% · pan -213,-406 | forte | 95 · 1.6 |
| 2 | Zoom no Sul, estados com bandeiras e contorno neon; fumaça; selo SEPAROU! | push-in +2% · pan +23,-22 | forte | 95 · 1.6 |
| 3 | Zoom no Sul, estados com bandeiras e contorno neon; fumaça; selo SEPAROU! | zoom-out -6% · pan +11,+39 | médio | 95 · 1.6 |
| 4 | Selo verde DIA 1 + barra de progresso de pontinhos no topo | push-in +2% · pan +0,-14 | leve | 94 · 1.5 |
| 5 | Linha vermelha: FRONTEIRA NOVA | push-in +1% | leve | 94 · 1.5 |
| 6 | Linha vermelha: FRONTEIRA NOVA | push-in +29% · pan -85,-95 | forte | 97 · 1.5 |
| 7 | Etiquetas dos estados: 3 ESTADOS, 1 PAÍS SÓ | push-in +1% | leve | 93 · 1.5 |
| 8 | Etiquetas dos estados: 3 ESTADOS, 1 PAÍS SÓ | push-in +12% · pan -37,-29 | leve | 92 · 1.3 |
| 9 | Etiquetas dos estados: 3 ESTADOS, 1 PAÍS SÓ | parada | leve | 90 · 1.3 |
| 10 | Bandeira nova sobe no mastro, presidente acenando | push-in +8% · pan -83,-2 | médio | 89 · 1.6 |
| 11 | Bandeira nova sobe no mastro, presidente acenando | parada | leve | 94 · 1.6 |
| 12 | Bandeira nova sobe no mastro, presidente acenando | parada | leve | 94 · 1.5 |
| 13 | Bandeira nova sobe no mastro, presidente acenando | parada | leve | 95 · 1.5 |
| 14 | Comparação novo país × França nos raios azuis com partículas | push-in +9% · pan -53,-42 | forte | 84 · 2.0 |
| 15 | Comparação novo país × França nos raios azuis com partículas | zoom-out -19% · pan +53,+113 | forte | 91 · 1.9 |
| 16 | DIA 2: multidão preenche o mapa; QUASE 30 MILHÕES | push-in +2% · pan -5,-13 | leve | 87 · 1.9 |
| 17 | DIA 2: multidão preenche o mapa; QUASE 30 MILHÕES | push-in +2% · pan -4,-14 | leve | 86 · 1.9 |
| 18 | DIA 2: multidão preenche o mapa; QUASE 30 MILHÕES | push-in +1% | médio | 87 · 1.8 |
| 19 | DIA 2: multidão preenche o mapa; QUASE 30 MILHÕES | parada | leve | 88 · 1.9 |
| 20 | Colunas de bonecos novo país × Austrália: MAIS GENTE! | push-in +20% · pan -58,-94 | forte | 82 · 2.1 |
| 21 | Colunas de bonecos novo país × Austrália: MAIS GENTE! | push-in +9% · pan -30,-54 | médio | 82 · 2.0 |
| 22 | DIA 3, fundo verde de raios | push-in +1% | médio | 76 · 2.0 |
| 23 | DIA 3, fundo verde de raios | push-in +19% · pan -43,-122 | médio | 78 · 2.0 |
| 24 | Grade de 100 moedas; 17 viram azuis: 17 SÃO DO SUL | parada | médio | 85 · 2.3 |
| 25 | Grade de 100 moedas; 17 viram azuis: 17 SÃO DO SUL | parada | médio | 88 · 2.6 |
| 26 | Grade de 100 moedas; 17 viram azuis: 17 SÃO DO SUL | zoom-out -4% · pan +10,+18 | forte | 90 · 2.5 |
| 27 | Grade de 100 moedas; 17 viram azuis: 17 SÃO DO SUL | parada | médio | 87 · 2.6 |
| 28 | Grade de 100 moedas; 17 viram azuis: 17 SÃO DO SUL | parada | médio | 87 · 2.6 |
| 29 | Grade de 100 moedas; 17 viram azuis: 17 SÃO DO SUL | parada | médio | 87 · 2.6 |
| 30 | Grade de 100 moedas; 17 viram azuis: 17 SÃO DO SUL | push-in +3% · pan +4,-27 | forte | 87 · 2.4 |
| 31 | Pilhas de dinheiro novo país × Chile |  · pan -94,-8 | forte | 113 · 1.9 |
| 32 | Cozinha com dois personagens: DIA 4 HORA DO ALMOÇO, SUSTO!, arroz 70% do RS, carimbo IMPORTADO | parada | leve | 185 · 1.4 |
| 33 | Cozinha com dois personagens: DIA 4 HORA DO ALMOÇO, SUSTO!, arroz 70% do RS, carimbo IMPORTADO | zoom-out -4% · pan +13,+6 | médio | 185 · 1.5 |
| 34 | Cozinha com dois personagens: DIA 4 HORA DO ALMOÇO, SUSTO!, arroz 70% do RS, carimbo IMPORTADO | parada | leve | 188 · 1.5 |
| 35 | Cozinha com dois personagens: DIA 4 HORA DO ALMOÇO, SUSTO!, arroz 70% do RS, carimbo IMPORTADO | zoom-out -6% · pan +26,+28 | médio | 189 · 1.5 |
| 36 | Cozinha com dois personagens: DIA 4 HORA DO ALMOÇO, SUSTO!, arroz 70% do RS, carimbo IMPORTADO | parada | leve | 187 · 1.5 |
| 37 | Cozinha com dois personagens: DIA 4 HORA DO ALMOÇO, SUSTO!, arroz 70% do RS, carimbo IMPORTADO | parada | médio | 178 · 1.4 |
| 38 | Cozinha com dois personagens: DIA 4 HORA DO ALMOÇO, SUSTO!, arroz 70% do RS, carimbo IMPORTADO | push-in +9% · pan -95,+47 | forte | 173 · 1.4 |
| 39 | Cozinha com dois personagens: DIA 4 HORA DO ALMOÇO, SUSTO!, arroz 70% do RS, carimbo IMPORTADO | push-in +2% · pan -15,-13 | leve | 186 · 1.4 |
| 40 | Cozinha com dois personagens: DIA 4 HORA DO ALMOÇO, SUSTO!, arroz 70% do RS, carimbo IMPORTADO |  · pan +104,+4 | forte | 181 · 1.2 |
| 41 | Neve, casa, araucárias: DIA 5 CHEGA O INVERNO, PERDEU A NEVE! | zoom-out -1% · pan +41,-1 | médio | 169 · 1.1 |
| 42 | Neve, casa, araucárias: DIA 5 CHEGA O INVERNO, PERDEU A NEVE! | parada | médio | 170 · 1.1 |
| 43 | Neve, casa, araucárias: DIA 5 CHEGA O INVERNO, PERDEU A NEVE! | parada | médio | 172 · 1.1 |
| 44 | Neve, casa, araucárias: DIA 5 CHEGA O INVERNO, PERDEU A NEVE! | push-in +18% · pan -59,-114 | forte | 172 · 1.1 |
| 45 | Mapa ONDE NEVA? flocos sobre o Sul: TUDO NO SUL! | zoom-out -4% · pan +31,+16 | forte | 116 · 1.8 |
| 46 | Mapa ONDE NEVA? flocos sobre o Sul: TUDO NO SUL! | push-in +2% · pan -2,-15 | médio | 90 · 2.0 |
| 47 | Mapa ONDE NEVA? flocos sobre o Sul: TUDO NO SUL! | zoom-out -26% · pan +137,+174 | forte | 93 · 1.9 |
| 48 | DIA 6 FAMÍLIAS: pessoas migrando no mapa | zoom-out -54% · pan +250,+474 | forte | 90 · 1.7 |
| 49 | DIA 6 FAMÍLIAS: pessoas migrando no mapa | parada | leve | 88 · 1.8 |
| 50 | DIA 6 FAMÍLIAS: pessoas migrando no mapa | parada | leve | 88 · 1.7 |
| 51 | DIA 6 FAMÍLIAS: pessoas migrando no mapa | parada | leve | 90 · 1.8 |
| 52 | DIA 6 FAMÍLIAS: pessoas migrando no mapa | parada | leve | 94 · 1.9 |
| 53 | Natal, árvore, passaporte: VIAGEM INTERNACIONAL | push-in +6% · pan -10,-45 | forte | 71 · 1.3 |
| 54 | Natal, árvore, passaporte: VIAGEM INTERNACIONAL | push-in +2% | leve | 64 · 1.1 |
| 55 | Natal, árvore, passaporte: VIAGEM INTERNACIONAL | parada | leve | 65 · 1.1 |
| 56 | Natal, árvore, passaporte: VIAGEM INTERNACIONAL | push-in +6% · pan -34,-33 | médio | 73 · 1.7 |
| 57 | DIA 7 fundo vermelho de raios: cabo de guerra churrasco × chimarrão, NINGUÉM SOLTA! | push-in +2% · pan +13,-26 | médio | 81 · 2.0 |
| 58 | DIA 7 fundo vermelho de raios: cabo de guerra churrasco × chimarrão, NINGUÉM SOLTA! | push-in +2% · pan -13,-2 | médio | 83 · 2.0 |
| 59 | DIA 7 fundo vermelho de raios: cabo de guerra churrasco × chimarrão, NINGUÉM SOLTA! | zoom-out -6% · pan -18,+19 | forte | 84 · 2.0 |
| 60 | DIA 7 fundo vermelho de raios: cabo de guerra churrasco × chimarrão, NINGUÉM SOLTA! | push-in +2% | médio | 82 · 2.0 |
| 61 | DIA 7 fundo vermelho de raios: cabo de guerra churrasco × chimarrão, NINGUÉM SOLTA! | parada | médio | 82 · 1.9 |
| 62 | Presente abre: SURPRESA! | zoom-out -4% · pan +26,-1 | forte | 82 · 2.0 |
| 63 | Presente abre: SURPRESA! | zoom-out -5% · pan +29,+14 | forte | 79 · 2.0 |
| 64 | Mapa: SEPARADOS mais fracos × JUNTOS muito mais forte, confete | zoom-out -2% · pan +22,+8 | médio | 96 · 1.5 |
| 65 | Mapa: SEPARADOS mais fracos × JUNTOS muito mais forte, confete | push-in +1% | leve | 99 · 1.5 |
| 66 | Mapa: SEPARADOS mais fracos × JUNTOS muito mais forte, confete | parada | leve | 101 · 1.4 |
| 67 | Mapa: SEPARADOS mais fracos × JUNTOS muito mais forte, confete | zoom-out -6% · pan +94,+24 | médio | 90 · 1.4 |
| 68 | Mapa: SEPARADOS mais fracos × JUNTOS muito mais forte, confete |  · pan -14,-1 | leve | 89 · 1.5 |
| 69 | Mapa: SEPARADOS mais fracos × JUNTOS muito mais forte, confete | zoom-out -4% · pan -111,-24 | forte | 96 · 1.4 |
| 70 | Mapa: SEPARADOS mais fracos × JUNTOS muito mais forte, confete | push-in +2% · pan +2,-15 | médio | 96 · 1.4 |
| 71 | Mapa: SEPARADOS mais fracos × JUNTOS muito mais forte, confete | zoom-out -5% · pan +3,+37 | médio | 88 · 1.9 |
| 72 | Fundo roxo, ícones churrasco/chimarrão/neve/arroz: DO QUE O BRASIL SENTIRIA FALTA? | push-in +2% · pan +48,-47 | forte | 63 · 2.5 |
| 73 | Fundo roxo, ícones churrasco/chimarrão/neve/arroz: DO QUE O BRASIL SENTIRIA FALTA? | parada | forte | 69 · 2.6 |
| 74 | Fundo verde, mão clica SEGUIR → SEGUINDO, PARTE 2, fade | push-in +6% · pan +4,-47 | forte | 78 · 2.3 |
| 75 | Fundo verde, mão clica SEGUIR → SEGUINDO, PARTE 2, fade | parada | médio | 77 · 2.1 |
| 76 | Fundo verde, mão clica SEGUIR → SEGUINDO, PARTE 2, fade | push-in +1% | médio | 78 · 2.1 |
| 77 | Fundo verde, mão clica SEGUIR → SEGUINDO, PARTE 2, fade | parada | médio | 53 · 1.9 |