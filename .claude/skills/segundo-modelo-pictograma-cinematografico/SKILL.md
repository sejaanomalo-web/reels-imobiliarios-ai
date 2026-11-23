---
name: segundo-modelo-pictograma-cinematografico
description: SEGUNDO MODELO de vídeo viral da ATIVO — "Segundo modelo — Pictograma cinematográfico": Reel/TikTok vertical 1080×1920 noir (quase preto, centro morno, vinheta muito forte), boneco-pictograma branco luminoso, cenários e ícones em linha fina, um único acento verde #02FB3F, SEM corte seco (travelling, portal, apagar a luz com âncora, partículas), títulos que saem do desfoque letra a letra, legenda que se escreve palavra a palavra e fecho com o logo ATIVO montado por partículas. Use sempre que o pedido for produzir, adaptar, decupar, revisar ou renderizar um vídeo "no segundo modelo / pictograma / noir / estilo das 5 referências", ou um roteiro reflexivo/narrativo destinado a este formato. Cobre roteiro → voz → timing → decupagem → cenas Remotion → som → render → QA → legenda do Instagram.
---

# Segundo modelo — Pictograma cinematográfico

*ATIVO · modelo de vídeo nº 2. Registro: `MODELOS_DE_VIDEO.md` e `MARCA/sistema-visual/modelos.json` (id `pictograma-cinematografico`).*

## Herança do Sistema Visual ATIVO

**Antes de produzir, leia `MARCA/sistema-visual/README.md` (Nível 1).** Ele vale acima desta skill: em conflito, o Nível 1 vence.

- **Herdado (Nível 1, sem redefinir aqui):**
  - acento único `ACENTO` `#02FB3F` (no kit: `A`/`aa`);
  - as atmosferas (`ATMOSFERA`): o "centro morno" do noir é a atmosfera `memoria`; o halo da virada é `solucao`;
  - texto, contorno e alerta de `DS`;
  - Manrope e JetBrains Mono, escala e mínimos;
  - área segura e coluna de botões do Reels;
  - grão, vinheta e poeira sutil;
  - easing e ancoragem na palavra;
  - as 7 assinaturas ATIVO;
  - qualidade e governança.

  Valores só em `MARCA/sistema-visual/tokens.json`, que o código lê por `PRODUCAO/src/theme.ts`.
- **Particular deste modelo (Nível 2, preservar):**
  - família de ilustração `linha` (pictograma luminoso sem rosto, ícones em traço fino);
  - fundo noir, o mais escuro do perfil;
  - nenhum corte seco (portal, apagar a luz com âncora, rima, dissolução, travelling);
  - surgir do desfoque em vez de pop;
  - títulos letra a letra;
  - legenda que se escreve em caixa normal (y 1330, 52 px);
  - fecho `CtaNoir` com o logo montado por partículas.
- **Direção de cada vídeo (Nível 3):** metáfora, âncora visual, rimas, luz de cada cena, dentro dos níveis acima.
- **Validação:** `python3 tools/sistema_visual_check.py --modelo pictograma-cinematografico` (o `editorial_check` já roda a parte do episódio e bloqueia o render). Depois, a revisão visual da folha de quadros (README §8).

**Fontes da verdade:**
- **Piloto:** `ATIVO_PICTO_01` ("Ninguém te avisa quando um cliente desiste", 21/11/2026).
- **Kit:** `PRODUCAO/src/estilos/pictograma.tsx`.
- **Referência visual:** `referencias/piloto_24_quadros.jpg`.
- **Gramática:** 5 referências do cliente analisadas quadro a quadro (`referencias/analise_5_referencias_quadro_a_quadro.md`; métricas em `referencias/metricas_por_segundo_5_referencias.txt`). Os números desta skill foram medidos nelas ou validados no piloto.

**Diferença para o Primeiro modelo (Cartoon explicativo):**

| | Primeiro modelo | Segundo modelo |
|---|---|---|
| Visual | Cor, raios, carimbos | **Noir, traço fino, luz** |
| Montagem | Corte seco a cada 2–4 s | **Nenhum corte seco**: transições contínuas, cena nova a cada 4–8 s |
| Ritmo | Pop elástico, punch-in, tremor | **Surgir do desfoque**, travelling, portal, partículas |
| Legenda | Karaokê no centro | **Legenda que se escreve** em ~69% da altura |
| Tom | Didático e enérgico | **Reflexivo, íntimo, cinematográfico** |

---

## 0. Quando usar / o que entrega

**Use para:**
- reflexões e verdades duras do mercado ("ninguém te avisa…", "daqui a um ano…");
- histórias com virada;
- jornada (antes → depois), disciplina e rotina;
- custo do descuido; casos reais com apuração.

**Não use para:**
- tutorial com muitos passos ou números densos (Primeiro modelo ou Painel);
- demonstração de interface real;
- anúncio Meta Ads (padrão `AD-*`).

**Entrega por episódio** (em `OUTPUT/<outputDir>/`):
- `<OUT>_FINAL.mp4`: 1080×1920, H.264 yuv420p, 30 fps, AAC, −15 LUFS ±0,5, pico ≤ −1 dBTP;
- `<OUT>_capa.png`;
- `<OUT>_legendas.srt`;
- `legenda_instagram.txt`;
- `relatorio_qa.md`.

O código fica em `PRODUCAO/episodes/<EP>/` e `PRODUCAO/src/episodes/<EP>/`. ID: **`ATIVO-PICTO-<NN>`** (outputDir `ATIVO_PICTO_<NN>`).

---

## 1. Regras inegociáveis
1. **Identidade ATIVO = Sistema Visual Nível 1** (`MARCA/sistema-visual/README.md`; seção "Herança" acima). Neste modelo:
   - Acento único **`ACENTO` `#02FB3F`** (kit `A`/`aa`), usado onde as referências usam dourado: palavra-chave, título-solução, caminho percorrido, versão "de sucesso" do personagem, ícones conquistados, glow.
   - Derivados só `A.ink` e `A.deep`. **Nenhum outro verde**: o verde menta das referências é proibido. **Nenhum dourado ou amarelo.**
   - Vermelho `C.warn` (texto e traço) / `DS.cor.alerta.fundo` (pílula cheia) **só** para perda, erro, pendência e silêncio.
   - Fonte Manrope 800/700; logo oficial (o fecho monta o PNG oficial; nunca redesenhar).
2. **Voz:** Puck, `gemini-3.8-flash-tts`, **1,0×**, `shapePauses` padrão, `direction` de `VOZ/voice_preset.json`. A imagem obedece à voz.
3. **CTA:** a fala da CTA SISTEMA é a padrão. Neste formato o visual é o **`CtaNoir`** (seção 11). Outra CTA do roteiro vira frase de transição.
4. **Integridade** (como fazem as referências R3 e R5, e mais rigorosa):
   - história inventada → pílula "EXEMPLO HIPOTÉTICO";
   - simulação → "SIMULAÇÃO ILUSTRATIVA";
   - números → só do roteiro apurado, com a fonte na tela ("SEGUNDO …");
   - caso real com acusação → atribuir a fonte, mostrar o outro lado ("A DEFESA NEGA…") e a ressalva ("INVESTIGAÇÃO NÃO É CONDENAÇÃO"); nunca caricatura de pessoa real (pictograma genérico de terno);
   - mensagens e telas genéricas, **sem marca de aplicativo**.
5. **Originalidade:** adotamos a gramática, não a identidade da série de referência. Proibido:
   - a frase-ritual dela ("sua antiga versão termina aqui / bem-vindo à…");
   - o dourado;
   - o relógio "03:00" na cama;
   - a "versão futura dourada";
   - a árvore com raízes como assinatura;
   - o desenho "EP. 0X · …" igual.

   Nosso ritual é próprio (seção 11).
6. **Legibilidade:**
   - texto ≥ 24 px (pílulas) e ≥ 30 px em balões;
   - nada espelhado;
   - interface do Instagram livre: topo 0–250 e base 1570–1920.

---

## 2. Pipeline

> **Plano visível (regra do cliente, 23/11/2026):** antes de começar, crie no painel "Plano" as 12 etapas do modelo A de `PROMPTS/PLANO_DE_ETAPAS_ATIVO.md`, com o ID do episódio no título (`[<EP>] n/12 · Etapa — resultado`). Uma etapa `in_progress` por vez; `completed` ao terminar; erro vira `BLOQUEIO`.

| # | Etapa | Comando / arquivo |
|---|---|---|
| 1 | Ingestão do lote (PDF) | `ROTEIROS/<LOTE>/`, um `.md` por roteiro |
| 2 | Roteiro no formato | seção 4 |
| 3 | Criar episódio | `novo_episodio.build(..., formato="pictograma-cinematografico", grade="AAAA-MM-DD", slot="HH:MM")`: liga ao slot da grade do dia e registra o modelo 2 (escolha por adequação — `PROMPTS/ESTEIRA_EDITORIAL_DIARIA_ATIVO.md` §6); cria `cta_leads`/`cta_atend` e os efeitos sonoros do `CtaNoir` |
| 4 | Ajustar `episode.json` | `"tail": 3.8` (o logo precisa de ~2 s parado); `music.gain −28`, `duck −6`, `bpm 70`; `prog` com `dens 1` e `bright 0,3–0,5` |
| 5 | Voz | `GEMINI_KEY_VAR=GEMINI_API_KEY[_2] python3 tools/gen_take.py <EP> A <dir>`; conferir; copiar para `episodes/<EP>/narration_source.wav` |
| 6 | Timing | `python3 tools/build_narration.py <EP> --source episodes/<EP>/narration_source.wav` |
| 7 | Decupagem | seção 5, antes do código |
| 8 | Cenas | `src/episodes/<EP>/{Episode.tsx, Cover.tsx, scenes/Scenes.tsx}` + `Root.tsx` (copie a estrutura do piloto) |
| 9 | Checagens | `npx tsc --noEmit -p .` e `python3 tools/editorial_check.py <EP>` (exige `estilos/pictograma`, `LegendaNoir`, `CtaNoir`, `FundoNoir`) |
| 10 | Quadros | `rm -rf build && npx remotion bundle --out-dir build`, depois `EP=<EP> bash tools/stills.sh <dir> <s…>` (2 por cena + cada transição) |
| 11 | Som | seção 12; depois `python3 tools/build_audio.py <EP>` |
| 12 | Render | `bash tools/render_episode.sh <EP>`: **11/11 OK** |
| 13 | Movimento | `python3 tools/motion_check.py ../OUTPUT/<OUT>/<OUT>_FINAL.mp4` (metas na seção 13) |
| 14 | Legenda IG | `PROMPTS/GUIA_LEGENDAS_INSTAGRAM_ATIVO.md` + `tools/legenda_check.py <OUT>` |
| 15 | Publicação | `publicar.py <EP> --quando "AAAA-MM-DD HH:MM"` (a pasta de data/hora define o horário), commit, push na `main`, Action, conferir no Supabase |

**Sem cota de voz:** monte com narração provisória e marque `"vozProvisoria": true`; tudo é ancorado em palavras (cues), então a troca da voz só exige refazer a partir da etapa 6.

---

## 3. Grade da tela (1080 × 1920)

| Zona | y (px) | Conteúdo |
|---|---|---|
| Interface do IG | 0–250 | só fundo |
| **Título** | 300–460 | `TituloNoir` (top 300, 1–2 linhas) |
| **Palco** (ícones, celular, órbita, relógio) | 380–1000 | protagonista visual |
| **Chão** | `CHAO = 1180` | linha pontilhada; pés dos personagens |
| **Legenda** | 1270–1400 (centro 1330) | `LegendaNoir`, só ela |
| Interface do IG | 1570–1920 | só fundo e luz |
| Laterais | ≥ 110 px para a legenda; ≥ 60 px para títulos | decorativos podem sangrar |

**Escalas do personagem** (altura ≈ 290·s): s = 1 em close (topo da cabeça em ~890), 0,8–0,9 na cena, 0,6 em fundo e multidão. Pílulas e balões nunca na faixa 1270–1400.

---

## 4. Roteiro para este formato
- **Fórmula** (igual nas 5 referências):
  1. **Gancho de identificação** em 1 frase ("Ninguém te avisa quando…", "Imagine daqui a um ano…", "Todo corretor já…").
  2. **Realidade em frases curtas e concretas:** 2–5 imagens ("Ontem, era…", "Hoje, silêncio.").
  3. **Virada** ("Não faltou X. Faltou Y.", "Mas…").
  4. **Caminho:** o que muda, em verbos claros.
  5. **Frase-síntese citável** de 4–7 palavras ("Venda não é sorte. É memória organizada.").
  6. **CTA SISTEMA.**
- **Tamanho:** 40–75 s. A voz Puck lê textos curtos e reflexivos a ~150–170 palavras/min (piloto: 168), então **90–150 palavras + CTA**.
- **Use frases curtíssimas** (2–8 palavras) para gerar pausas naturais: é o que dá o ar "cinematográfico" sem mexer na velocidade.
- **Legenda (`caption`):** blocos de 1–3 palavras com `|`; `*ênfase*` = verde (ou vermelho se negativa); máx. 2–3 ênfases por frase.
- **Negativas:** palavras de perda ficam vermelhas pela lista `NEG` do kit ou pelo `negativas` do episódio (ex.: `/^(desiste\.|silêncio\.|esquecido|outro|corretor\.|sorte\.)$/i`). Palavra enfatizada logo após "não/nem" herda o vermelho.
- **Cues:** um por virada visual (prefixos h_/a_/b_/c_/x_ + conceito). A CTA usa os cues automáticos do `build`.

---

## 5. Decupagem — regras de montagem
1. **Sem corte seco. Nunca.** Toda passagem usa uma das transições da seção 10.2. A cena "apaga" (0,45–0,55 s) e a seguinte "acende" (0,45–0,7 s) com sobreposição de ~0,3 s.
2. **Cadência:**
   - **cena nova a cada 4–8 s** (piloto: 9 cenas em 34 s ≈ 3,8 s; referências 4,3–8,3 s);
   - **dentro da cena, algo muda a cada ~1–1,5 s**: um ícone surge, uma pílula, a câmera muda de direção, um título, o personagem muda de pose ou anda.
3. **Continuidade:** o personagem é a âncora. Ele atravessa cenas (andando, subindo) ou a câmera o acompanha. Use **rimas visuais** (o mesmo objeto abre e fecha o vídeo; um círculo vira relógio).
4. **Luz conta a história:**

   | Momento | Luz | Tons |
   |---|---|---|
   | Dor | `quente` 0,5–0,6 (escurece), holofote apagado | personagem branco, outros cinza, vermelho nos sinais |
   | Virada / solução | halo verde (`verde` 0,6–1 no `FundoNoir`, `Halo` verde) | caminho verde, personagem pode virar `tom="verde"` |
   | Síntese | holofote do alto + degraus acesos | título em 2 linhas (branco + verde) |
5. **Cada cena tem 1 protagonista visual.** Fora ele, tudo fica cinza ou apagado.
6. **Tabela antes do código:** `cena | a–b (s) | fala | luz | âncora | objetos e entradas (cue) | câmera | transição de saída | som`.

---

## 6. Bíblia visual

### 6.1 Fundo (`<FundoNoir t quente verde chao plano poeira/>`)
- Preto `DS.cor.fundo.preto` + **centro morno** radial = atmosfera `memoria` do Nível 1 (`ATMOSFERA.memoria.centro`; raio 900, opacidade 0,95·`quente`), centrado em (540, 860).
- **Vinheta** radial de 35% (transparente) a 100% (preto 0,92); cantos quase pretos.
- **Poeira:** 72 pontos brancos (r 0,9–3,1; opacidade 0,06–0,28, pulsando) subindo 6–20 px/s com oscilação.
- `verde` 0–1 acrescenta um halo verde `aa(0.1)` no centro (cenas de solução e fecho).
- `chao` desenha a linha pontilhada (`3 9`, branco 0,32); `plano` acrescenta um piso `#0C0B0A` com textura de pontos de 14 px.
- Medido nas referências: luminância média 15–20/255. **Não clareie o fundo.**

### 6.2 Luz
- **`Holofote`:** cone de 80 px no topo até `w` (360–460) no chão, gradiente 0,16 → 0,05, e elipse de luz no chão (0,28). Acende com o personagem (`p`).
- **`Halo`:** brilho radial (r 260–420) atrás de algo importante; branco (neutro) ou `A.hex` (conquista).
- **Brilho no personagem e nos ícones:** `drop-shadow` duplo, branco (10 px 0,55 + 26 px 0,22) ou verde. Só no protagonista e no que está "aceso".
- **Sem sombras projetadas.** Profundidade = luz + escala + cinza (o que está atrás é cinza ou apagado).

### 6.3 Traço e cor

| Elemento | Traço | Cor |
|---|---|---|
| Objetos e ícones | 2,5–3 px, pontas redondas | branco `NOIR.linha` (0,78) ou `A.hex` |
| Linhas de apoio (órbitas, chão, caminhos futuros) | pontilhado `2 10` / `3 9` | branco 0,22–0,35 |
| Fundo de ícones e objetos | — | `#090909`–`#0A0A0A` (preenchimento escuro para "recortar" do fundo) |

---

## 7. Personagem (`<Figura/>` — pictograma)

### 7.1 Construção
Coordenadas locais com pés em (0,0); altura ≈ 290·s.

| Parte | Medida |
|---|---|
| Cabeça | círculo r 24 em y −258, **separada** do tronco (vão de ~10 px) |
| Tronco | cápsula de traço 30 de y −214 a −128 (respira ±1,5 px) |
| Braços | 2 segmentos (50 + 48), traço 21, ombros em x ±21 |
| Pernas | 2 segmentos (66 + 66), traço 24, quadris em x ±12 |
| Rosto | nenhum |

### 7.2 Poses (`pose`)

| pose | descrição | uso |
|---|---|---|
| `pe` | braços levemente abertos (±14°) | padrão |
| `andando` | ciclo com `fase = t × 1,6` (pernas ±24°, joelho dobra, braços opostos, quique de 6 px) | travellings, ir embora, chegar |
| `subindo` | passada alta, tronco inclinado 6° | degraus e caminhos |
| `sentado` | coxas horizontais, braços à frente | mesa e trabalho |
| `deitado` | corpo girado −90° | cama e cansaço |
| `apontando` | braço direito a 95° | interação e acordo |
| `celular` | braço erguido segurando o celular à frente do rosto | conversa com cliente |
| `comemorando` | braços para cima | conquista |
| `cabisbaixo` | cabeça baixa e à frente, tronco inclinado | dor e esquecimento |
| `bracosAbertos` | braços a ±70° | apresentar e "tudo isso" |

### 7.3 Tons (`tom`)
- `luz`: branco com brilho (protagonista).
- `cinza`: outros e passado.
- `verde`: versão de sucesso, com brilho verde (no máximo 1 vez por vídeo, no clímax).
- `apagado`: fundo.
- `fantasma`: contorno (quem sumiu, ausência).

`flip` espelha o personagem; `s` define a escala; `p` a opacidade; `item="celular"` põe o celular na mão.

### 7.4 Elenco
- **O corretor (protagonista) é sempre o branco luminoso.**
- O cliente é cinza; quando some, vira `fantasma` (contorno).
- O "outro corretor", a concorrência e a multidão: cinza.
- Para pessoa específica num caso real: pictograma genérico **sem rosto e sem traços pessoais**, só com rótulo. É possível estender o kit com uma variação "de terno" em contorno, com gravata verde.

---

## 8. Objetos e elementos (kit)

| Elemento | Componente | Especificação / uso |
|---|---|---|
| Ícone em círculo | `Icone nome x y r tom p brilho t` | anel 2,5 px; fundo `#0A0A0A`; ícones: casa, chave, chat, pessoa, família, telefone, calendário, relógio, dinheiro, check, x, alerta, áudio, documento, pin, prédio, gráfico, lâmpada, cadeado, avião, lupa. Com `t`, flutua ±7 px |
| Ícone solto | `IconeTraco nome cor w` | caixa 48×48; use `scale` para crescer |
| **Órbita** | `Orbita t cx cy rx ry itens vel` | elipse pontilhada + ícones girando (vel 0,05–0,09 volta/s); os de trás ficam menores e mais escuros. Abertura, "tudo que ele tinha", fecho |
| **Pílula** | `Pilula t at x y texto tom size ate cheia` | cápsula de contorno 2,5 px, Manrope 800, maiúsculas espaçadas 0,14 em, 24–30 px; `cheia` = fundo vermelho/verde para veredito ("VENDA PERDIDA") |
| **Título** | `TituloNoir t at ate linhas top size` | letras saem do desfoque (14 → 0 px, 0,045 s entre letras, 0,32 s cada); some inteiro desfocando em 0,45 s; 1–2 linhas (≈104 px + 78%); branco, verde (solução) ou vermelho (dor) |
| Degraus | `Degraus t at x0 y0 n dx dy w acesos rotulos` | barras arredondadas 18 px que surgem em sequência (0,08 s); os acesos têm contorno branco e brilho |
| Caminho | `Caminho pontos p cor nos` | trilha pontilhada (futuro) + traço verde percorrido com brilho + nós; o personagem anda sobre ele |
| Celular | `Celular x y w h brilho tom` | contorno 3 px, raio 44, notch; conteúdo como filhos (ícones, pontinhos "digitando") |
| Balão | `Bolha t at x y texto lado tom size ate` | mensagem genérica de contorno, Manrope 700 ≥ 30 px, sem marca de app |
| Relógio | `Relogio t x y r vel` | ponteiros girando (vel 0,9 = "o tempo voa"); pino central verde |
| Holofote / Halo | `Holofote`, `Halo` | seção 6.2 |
| Partículas | `Dissolver`, `Escapa`, `NuvemLogo` | seção 9 |

**Regras de texto na tela:**
- no máximo 1 título + 2 pílulas + 1 balão ao mesmo tempo;
- pílulas **rotulam** ("PENDENTE", "O QUE PROCURA", "DIA 7"), nunca repetem a legenda;
- títulos só nos 3–4 conceitos centrais do vídeo (gancho, virada, síntese).

---

## 9. Animações

| Animação | Especificação |
|---|---|
| **Surgir** (entrada padrão) | `surge(t, at)`: 0 → 1 em 0,45 s (ease-out): opacidade + sobe 14–18 px + desfoque 6 → 0. **Nada "pula"** (o pop elástico é do Primeiro modelo) |
| **Acender / apagar a cena** | `luz(t, a, b, fadeIn, fadeOut)` |
| **Título letra a letra** | seção 8 |
| **Legenda que se escreve** | seção 11.1 |
| **Dissolver** | o alvo se desfaz **de baixo para cima** em ~0,9–1,1 s; partículas (5% verdes) sobem 120 px e se espalham 60–380 px |
| **Escapa** | poeira contínua subindo de uma região (memória que escapa, ideia, calor); 18–22 partículas em loop |
| **Nuvem → logo** | nuvem esférica (R 260–400) nasce em 0,8 s; os 900 pontos amostrados do PNG oficial convergem em ~1,3 s; o PNG oficial aparece por cima saindo do desfoque (0,6 s) |
| **Ciclo de caminhada** | `fase = t × 1,6` (andando) ou `× 1,7–2` (subindo); deslocamento horizontal de 300–450 px em 1,5–3 s |
| **Flutuar** | ícones ±7 px (seno 1,3 rad/s); celular ±10 px |
| **Digitando** | 3 pontos que sobem/descem em fila (seno 8 rad/s, defasagem 1 rad) |
| **Contagem** | rótulo que troca valores ("DIA 1" … "DIA 7") ao longo da frase; vira vermelho no limite |
| **Linha que se rompe** | ligação pontilhada (`3 8`) que fica vermelha e espaçada (`3 14`) na palavra da perda; um "x" vermelho no meio |

---

## 10. Câmera e transições

### 10.1 Câmera (`<CamNoir t keys push t0 drift origem>`)
- **Sempre em movimento:**
  - empurrão contínuo `push` 0,4–1%/s (até 2% em tensão);
  - **deriva** senoidal de ±12 px em x e ±8 px em y;
  - chaves `{t, s, x, y}` com ease-in-out entre elas.
- **Travelling:** a câmera segue o personagem (x de −150 a −300 px ao longo de 2–4 s).
- **Zoom de transição:** até 2,6× em 0,7 s (ease-in) para o portal.
- **Zoom-out de revelação:** 1,05 → 0,96.
- **Desfoque de movimento automático** proporcional à velocidade (até 6 px).
- **Proibido:** tremor, punch-in seco, rotação.

### 10.2 Transições (escolha 1 por passagem e varie)

| Transição | Como fazer no kit | Quando |
|---|---|---|
| **Portal** | cena A: `CamNoir` termina com zoom 2,6× no ponto do ícone ou celular; cena B dentro de `<Portal at dur=0.75 cx cy r0>` com o círculo nascendo **no mesmo ponto da tela** (calcule: `tela = origem + (ponto − origem)·s + (x, y)`). O portal tem fundo próprio | entrar num pensamento, num celular, num detalhe |
| **Apagar a luz com âncora** | `luz()` derruba a cena em 0,45–0,55 s; o personagem ou um objeto continua na próxima cena na mesma posição | mudança de assunto |
| **Rima de forma** | um círculo/órbita fica e vira o objeto seguinte (relógio, alvo) | ligar dois conceitos |
| **Dissolver** | `Dissolver` no fim de uma cena + a próxima acende | memória, perda, fim de ciclo |
| **Travelling contínuo** | a mesma cena se estende e a câmera viaja para o próximo "cenário" | jornada e tempo passando |
| **Zoom-out de revelação** | câmera se afasta 4–8% e entram elementos ao redor | conclusão |

---

## 11. Legenda e fecho

### 11.1 `<LegendaNoir chunks y={1330} size={52} negativas/>`
- **Páginas** de até 2 linhas (~34 caracteres), sem atravessar frases; a página aparece **quando a 1ª palavra é dita**.
- Cada palavra **surge** (desfoque 5 → 0, 0,16 s) em `DS.cor.texto.surgindo` **0,18 s antes** de ser dita, e fica `DS.cor.texto.branco` na hora; ênfase `A.hex` com brilho; negativa `C.warn`.
- Caixa normal (não maiúsculas), Manrope 800, 52 px, entrelinha 1,18, sombra 0 2 14 rgba(0,0,0,.85).
- Margens: 110 px à esquerda e 130 px à direita. A direita termina em x 950 para não entrar na coluna de botões do Reels (Nível 1, 22/11/2026).
- A página some em 0,2 s, 0,25 s depois da última palavra; entre frases a área fica vazia (respiro).

### 11.2 Fecho `<CtaNoir t tl segPergunta segComente logo rodape/>`
É o ritual de assinatura da ATIVO neste modelo, com a CTA SISTEMA intacta:
1. **"Quer conhecer…":** o corretor aparece no centro, sob o holofote, e abre os braços em "imóveis".
2. **Órbita** (elipse 320×95) com IMÓVEIS / LEADS / ATENDIMENTOS: cada ícone acende em verde exatamente na sua palavra, com a pílula embaixo, e a órbita gira 0,09 volta/s.
3. **"Comente":** a órbita apaga e surge "COMENTE" + o campo em cápsula (borda branca, glow verde pulsando), que **digita S-I-S-T-E-M-A** na palavra; o botão de enviar fica verde quando termina.
4. **"Direct":** surge "detalhes pelo **Direct**" e um avião de traço verde cruza a tela.
5. **Ritual:** o corretor **se dissolve em partículas**; a nuvem converge e forma o **logo oficial ATIVO**; embaixo, "INTELIGÊNCIA IMOBILIÁRIA" (26 px, espaçado 0,22 em, cinza).
6. Com a trilha subindo (o ducking solta), o logo fica parado ~2 s (`tail 3.8`).

**Capa (`Cover.tsx`):**
- fundo noir com chão pontilhado;
- o protagonista em pose-símbolo do episódio, sob o holofote;
- título em 2 linhas no estilo `TituloNoir` (branco 112 px + segunda linha 88 px no acento ou vermelho) + subtítulo de 40 px;
- logo oficial no rodapé (top ≈ 1610).

---

## 12. Som

| Camada | Alvo | Piloto |
|---|---|---|
| Narração | ≈ −20 LUFS | −20,7 |
| Trilha | ~13–15 dB abaixo da voz (referências: −13 a −16 dB); pad escuro contínuo (`dens 1`, `bright 0,3–0,5`, `bpm 70`), `gain −28`, `duck −6`. Sobe sozinha no fecho quando a voz acaba | −34,1 |
| Efeitos | discretos: −26 a −31 dB por evento | −38,6 LUFS integrados |
| Master | −15 LUFS ±0,5, pico ≤ −1 dBTP | −15,1 / −1,8 |

**Vocabulário de efeitos:**

| Evento | `sound` | dB | offset |
|---|---|---|---|
| Título que entra | `thump` (grave) | −26/−27 | −0,05 |
| Portal / mergulho de câmera | `whoosh_dive` | −26 | −0,35 |
| Título-solução / subida | `whoosh_up` | −29 | 0 |
| Ícone ou balão que surge | `pin` (pitch subindo em séries) | −27/−28 | 0/−0,1 |
| Silêncio, apagar a luz, esquecer | `fade_down` | −27/−29 | 0 |
| Perda, vazio | `hollow` | −28/−30 | 0 |
| Veredito vermelho (pílula cheia) | `impact` | −30 | +0,15 |
| Dias e horas passando | `tick` | −27/−28 | 0 |
| Partículas, memória, logo | `shimmer` | −25/−31 | 0 |
| A luz volta (virada positiva) | `chord` | −27/−28 | −0,1 |
| Travessia de cena | `swish` | −29 | −0,2 |
| Digitação de SISTEMA | `typing` | −29 | 0 |

**Densidade:** 1 efeito a cada ~1,2–1,5 s (piloto: 36 em 46 s). Nunca whoosh em toda transição; a trilha é que costura.

---

## 13. Metas de qualidade (QA)

**Folha de quadros (antes do render):**
- [ ] Nenhum corte seco; cada transição conferida a 10 quadros/s (o portal nasce no ponto exato).
- [ ] Faixa da legenda (1270–1400) livre de pílulas, balões e rostos.
- [ ] Um protagonista por cena; o resto cinza ou apagado.
- [ ] Só o `ACENTO` como acento; vermelho só para perda; nenhum dourado.
- [ ] Sistema Visual: `python3 tools/sistema_visual_check.py --quadros <pasta_da_folha>` sem aviso, e a revisão visual do README §8 marcada.
- [ ] Pernas e braços do pictograma separados (sem "bloco"); cabeça destacada.
- [ ] Pílulas ≥ 24 px; nada cortado nas bordas durante travellings (confira o quadro final de cada travelling).

**Depois do render:**
- [ ] `render_episode.sh` 11/11.
- [ ] `motion_check`:
  - movimento médio **≥ 1,2** (referências 1,34–3,82; piloto 1,20);
  - quadros parados **≤ 45%** (referências 10,6–46,6%; piloto 43,1%);
  - maior trecho parado **≤ 2,6 s**, só no logo final.
  - Abaixo disso: mais deriva, mais personagem andando, ícones flutuando, `Escapa`.
- [ ] Mix −15 ±0,5 LUFS, pico ≤ −1 dBTP, trilha ~14 dB abaixo da voz.
- [ ] `editorial_check` 0 erro; `legenda_check` OK.

---

## 14. Esqueleto de código (copie de `src/episodes/ATIVO-PICTO-01/`)

```tsx
// Episode.tsx
<FundoNoir t={t} quente={quente} verde={verde} />            // luz global (dor → escurece; solução → verde)
<Sequence {...win(0, c.a_x + 0.7)}><Cena1 t={t} tl={tl} /></Sequence>   // janelas SE SOBREPÕEM ~0,3–1 s
<Sequence {...win(c.a_x - 0.4, c.b_y)}><Cena2 t={t} tl={tl} /></Sequence>
…
<Sequence {...win(c.cta_quer - 0.4, tl.duration)}><CtaNoir t={t} tl={tl} segPergunta="s<N-1>" segComente="s<N>" logo={staticFile(BRAND.logo)} rodape="INTELIGÊNCIA IMOBILIÁRIA" /></Sequence>
<LegendaNoir t={t} chunks={tl.captions} y={1330} size={52} negativas={NEGATIVAS} />
<Grain frame={frame} />

// Cena: opacidade por luz(); câmera por CamNoir; SVG para traço; HTML para pílulas, balões e títulos
export const Cena2: React.FC<P> = ({ t, tl }) => {
  const on = luz(t, inicio, fim, 0.6, 0.5);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} t0={inicio} push={0.01} keys={[{ t: inicio, s: 1.0, x: 40 }, { t: fim, s: 1.05, x: -30 }]}>
        <svg …><Chao /><Holofote …/><Figura t={t} x={400} y={CHAO} pose="cabisbaixo" /><Icone t={t} nome="audio" … p={surge(t, c.a_audio)} /></svg>
        <Pilula t={t} at={c.a_audio + 0.3} x={300} y={660} texto="PENDENTE" tom="vermelho" />
      </CamNoir>
      <TituloNoir t={t} at={c.b_cont} ate={fim - 0.4} linhas={[{ texto: "FALTOU" }, { texto: "CONTINUIDADE", cor: "verde" }]} />
    </div>
  );
};
```

---

## 15. Anti-padrões (reprovam o vídeo)
- Qualquer corte seco; crossfade genérico entre cenas sem âncora.
- Fundo claro, cinza médio ou com cor (o noir é a marca do formato).
- Pop elástico, carimbo, tremor ou raios coloridos (é outro modelo).
- Personagem com rosto, roupas detalhadas ou membros grudados.
- Mais de um elemento em brilho ao mesmo tempo; verde gasto em tudo (perde o peso).
- Legenda em maiúsculas ou no centro da tela; legenda "colada" sem respiro entre frases.
- Dourado, amarelo ou qualquer verde diferente do `ACENTO` (`#02FB3F`).
- Logo ATIVO redesenhado ou feito de texto.
- Copiar a frase-ritual, o logo ou os motivos assinatura da série de referência.
- Caso real sem fonte na tela, sem o outro lado, ou com caricatura.

---

## 16. Kit — referência rápida (`PRODUCAO/src/estilos/pictograma.tsx`)
`A`, `aa`, `NOIR`, `luz`, `surge`, `FundoNoir`, `Holofote`, `Halo`, `Figura` (pose, tom, fase, flip, item), `IconeTraco`, `Icone`, `Orbita`, `Pilula`, `TituloNoir`, `Degraus`, `Caminho`, `Celular`, `Bolha`, `Relogio`, `Dissolver`, `Escapa`, `NuvemLogo` (+ `ativo_logo_pontos.json`), `CamNoir`, `Portal`, `paginas`, `LegendaNoir`, `CtaNoir`.

Cenas específicas do piloto para adaptar: gancho com órbita e linha que se rompe; portal para o celular ("ONTEM" → "HOJE"); bolha de memória que se dissolve; ícones "PENDENTE"; "FALTOU CONTINUIDADE" com caminho rompido; contador "DIA 1…7" com travelling; relógio; caminho verde com nós (CLIENTE → O QUE PROCURA → PRÓXIMO PASSO); degraus com holofote. Ao criar algo reutilizável, **promova ao kit**.
