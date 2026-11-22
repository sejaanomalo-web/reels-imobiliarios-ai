# Sistema Visual ATIVO — Nível 1 (identidade global)

**Versão:** veja `tokens.json` → `versao` (histórico em `CHANGELOG.md`) · **Vale para:** todo vídeo, modelo, skill e kit da ATIVO, atuais e futuros.

> **Regra mestra.** A ATIVO não tem vários estilos desconectados. Tem **um universo visual**, dentro do qual existem diferentes modelos de produção. A identidade é reconhecível sem o logo; a criatividade narrativa de cada modelo continua livre.

**Arquivos deste sistema (fonte única):**

| Arquivo | Papel |
|---|---|
| `README.md` (este) | regras obrigatórias, em palavras |
| `tokens.json` | os valores (cores, atmosferas, tipografia, grade, movimento). O código lê daqui: `PRODUCAO/src/theme.ts` → `DS`, `ACENTO`, `ATMOSFERA` |
| `modelos.json` | registro dos modelos (Nível 2): skill, kit, prefixos e particularidades declaradas |
| `NOVO_MODELO.md` | processo obrigatório para criar um modelo/skill novo + esqueleto da seção de herança |
| `CHANGELOG.md` | toda mudança do Nível 1, com versão e impacto |
| `exemplos/` | mostruário renderizado (tokens, atmosferas, certo × errado, comparação entre modelos) |
| `PRODUCAO/tools/sistema_visual_check.py` | validador automático das regras objetivas |
| `.claude/skills/ativo-sistema-visual/SKILL.md` | a skill que o Claude Code aciona para aplicar e validar este sistema |

---

## 1. Hierarquia das regras

| Nível | O que define | Onde mora | Quem pode mudar |
|---|---|---|---|
| **1 — Identidade global ATIVO** | cor, atmosferas, tipografia, texturas, grade de tela, princípios de ilustração e movimento, assinaturas, qualidade | este diretório | só o cliente, pela governança da seção 10 |
| **2 — Identidade do modelo** | narrativa, montagem, família de ilustração, posição e estilo da legenda, transições, personagens, efeitos próprios | a skill do modelo + o kit + `modelos.json` | o modelo, **dentro** do Nível 1 |
| **3 — Direção do vídeo** | metáfora, objetos, cenas, ritmo e luz daquele roteiro | o episódio (`episode.json`, `src/episodes/<EP>/`) | a produção, **dentro** dos Níveis 1 e 2 |

Uma decisão de nível inferior **nunca** contraria uma regra obrigatória de nível superior. Se um roteiro "precisa" quebrar o Nível 1, ele está pedindo outra solução visual, não uma exceção.

**O que é obrigatório × o que é livre.** Obrigatório = tudo marcado **DEVE** abaixo e os valores de `tokens.json`. Livre = tudo o que não está aqui: composição, metáfora, personagens, efeitos, câmera e montagem de cada modelo.

---

## 2. As 7 assinaturas ATIVO (reconhecimento sem o logo)

Todo vídeo, de qualquer modelo, **DEVE** ter as sete:

1. **Escuro com luz localizada.** Fundo preto, grafite ou azul-marinho profundo, com **uma** fonte de luz (holofote, halo, centro do gradiente) e vinheta. Nunca fundo claro chapado nem tela "acesa" por inteiro.
2. **Semântica de cor fixa.** Verde ATIVO = solução, organização, acerto, "você". Vermelho = perda, erro, pendência. Todo o resto é neutro. O verde é raro: ele vale porque aparece pouco.
3. **Legenda falada palavra a palavra** em Manrope 800, branca, com a palavra-chave em verde e a negativa em vermelho. Cada modelo escolhe posição, tamanho e caixa (Nível 2).
4. **O corretor é a figura mais iluminada da cena.** Quando ele vence, ganha o verde (gravata, brilho, versão de sucesso, caminho percorrido).
5. **Textura ATIVO:** grão global (`Grain`, opacidade 0,07) + poeira/partículas sutis + vinheta. Nada de vídeo "limpo de template".
6. **Fecho-ritual SISTEMA:** a CTA falada vigente, um campo que **digita S-I-S-T-E-M-A**, o envio e o **logo oficial**. A coreografia é a mesma em todos os modelos; o desenho é de cada um.
7. **Integridade visível:** pílula ou selo em Manrope 800 maiúsculo espaçado para "EXEMPLO HIPOTÉTICO", "SIMULAÇÃO ILUSTRATIVA", "INTERFACE ILUSTRATIVA" ou "SEGUNDO <fonte>", sempre que couber.

---

## 3. Cores (valores em `tokens.json` → `cor`)

| Papel | Token | Valor | Uso |
|---|---|---|---|
| **Acento único** | `cor.acento.hex` (`ACENTO`) | **`#02FB3F`** | palavra-chave, solução, check, caminho, botão, glow. É o verde da seta do logo oficial (medido `#02FF46`) e a decisão do cliente de 17/11/2026 |
| Texto sobre o verde | `cor.acento.ink` | `#01290B` | só dentro de botão, carimbo ou chip verdes |
| Verde-escuro de fundo | `cor.acento.deep` | `#063A16` | centro da atmosfera "solução", selo escuro |
| Fundos | `cor.fundo.*` | `#050505` · `#07080A` · `#12151A` · superfícies `#15181D` `#1D2128` `#262B33` | base de todo quadro |
| Texto | `cor.texto.branco` | `#F4F5F7` | todo texto principal |
| Texto secundário | `cor.texto.secundario` / `terciario` | `#9198A3` / `#5A606B` | rótulos de apoio, dados, rodapé |
| Palavra ainda não dita | `cor.texto.pendente` / `surgindo` | `#8B9099` / `#6F6F6F` | legenda que mostra a frase antes (pendente) ou que escreve a palavra (surgindo) |
| Luz | `cor.luz` | `#FFFFFF` | só fontes de luz e brilho, nunca bloco |
| Contorno de leitura | `cor.contorno` | `#0A0A0C` | contorno de legenda, selo e carimbo |
| Alerta | `cor.alerta.hex` / `fundo` / `escuro` | `#FF6B5E` / `#D2392E` / `#3A0F12` | perda, erro, proibição; pílula ou carimbo cheio |
| Apoio ilustrativo | `apoio.*` | 6 tons de pele, papel `#F2F0EA` | só dentro de ilustrações (pele, cabelo, tecido, material) |

**DEVE:**
- Usar só o acento `#02FB3F` e seus dois derivados como verde. Glow e transparências do verde vêm de `accentAlpha`/`acentoAlpha`; nunca de um RGB digitado.
- Manter preto, grafite, marinho e branco como cores dominantes; o verde ocupa **área pequena** (sem campo verde de fundo a tela inteira).
- Usar vermelho apenas com o significado de perda/erro. Nunca em celebração, confete ou decoração.
- Usar cores de apoio só dentro de ilustrações, com saturação moderada. Nunca em texto, destaque, glow ou fundo.

**NÃO PODE (o validador reprova):**
- `#3AF584`, `#35E0A1` ou `#00FA44` em vídeo novo. `#3AF584` é **legado**: só para episódios entregues até 16/11/2026.
- Qualquer outro verde, inclusive verde-água ou menta.
- Ciano e azul neon.
- Roxo e magenta saturados.
- Amarelo e dourado como acento (são heranças da ANÔMALO). Quando um objeto precisa ser dourado (moeda, pasta de couro), a exceção vai declarada no `modelos.json` do modelo.

### 3.1 Atmosferas (o clima de cada cena) — `tokens.json` → `atmosfera`

Todos os modelos falam o mesmo idioma de clima. Cada um desenha a atmosfera do seu jeito (raios, centro de luz, grade, piso), mas a **cor** é esta:

| Atmosfera | Centro → borda | Luz (RGB, opacidade ≤ 0,10) | Quando |
|---|---|---|---|
| `neutra` | `#2A2A33` → `#060608` | branco | bastidor, evento, palco |
| `explicacao` | `#24324A` → `#070A10` | marinho claro | explicação, situação, contexto |
| `dilema` | `#1A2238` → `#06070C` | branco | pergunta, dúvida, gancho em dilema |
| `dados` | `#1B2D3F` → `#04080C` | marinho claro + grade | números, comparação |
| `memoria` | `#2B2723` → `#050505` | creme | passado, intimidade, reflexão (o "centro morno" do noir) |
| `tensao` | `#5C1A17` → `#120405` | vermelho de alerta | erro, disputa, perda, proibição |
| `solucao` | `#063A16` → `#050607` | verde ATIVO | solução, payoff, CTA |

A borda **DEVE** morrer em quase preto (luminância ≤ 16/255 nas bordas e no rodapé). O quadro inteiro fica escuro: luminância média ≤ 45/255. As exceções precisam de justificativa: flash de 6 quadros, ou um cartão claro do fecho que seja o protagonista daquele instante (o "COMENTE" do 1º modelo). `sistema_visual_check.py --quadros` mede isso e avisa; quem decide se a exceção é legítima é a revisão visual.

---

## 4. Tipografia (`tokens.json` → `tipografia`)

- **Família:** **Manrope** em tudo. **JetBrains Mono** só para dado técnico (cota, código, hora, rótulo de painel). Nenhuma outra fonte (licenças em `PRODUCAO/public/fonts/`).
- **Pesos:** 800 em títulos, legendas, selos e rótulos; 700 em balões e textos de apoio.
- **Escala (px numa tela de 1080 de largura):**
  - display: 104–124 (capa, título de impacto);
  - título: 72–96;
  - legenda: 52–80 (o modelo fixa **um** valor);
  - rótulo: 30–40;
  - micro-rótulo: 24–28, **só** em maiúsculas espaçadas (≥ 0,12 em) e nunca para frase.
- **Mínimos:** 24 px absoluto; 30 px para qualquer frase.
- **Leitura garantida:** todo texto sobre fundo animado **DEVE** ter contorno `cor.contorno` de 0,12–0,16 × o tamanho (com `paintOrder: "stroke fill"`) **ou** sombra de pelo menos `0 2px 14px rgba(0,0,0,0.85)`. Contraste mínimo de 4,5:1 com o fundo local.
- **Hierarquia:** um texto principal por vez. No máximo **3 elementos de texto além da legenda** ao mesmo tempo (título, rótulos, selo, balão).
- **Destaque:** até 3 palavras-chave por frase, em verde. Negativa em vermelho. Nenhuma outra cor de destaque, nenhum sublinhado colorido, nenhuma fonte "de efeito".
- **Legenda:** blocos de 1–3 palavras ou páginas de até 2 linhas. Sincronizada palavra a palavra com a narração (`timeline.json`). Nunca inventa texto que não foi falado.
- **Caixa:** títulos, selos e rótulos podem ir em maiúsculas. A caixa da legenda é escolha do modelo (Nível 2).

---

## 5. Ilustração (`tokens.json` → `ilustracao`)

As linguagens podem variar por modelo. Hoje existem estas **famílias**:
- `chapado`: Primeiro modelo;
- `linha`: Segundo modelo;
- `giz`, `esquema`, `tipografico` e `interface`: esteira de 5 estilos.

Uma família nova entra pela governança (seção 10). Toda família **DEVE** respeitar:

- **Simplicidade e geometria:** formas primárias (círculo, cápsula, retângulo arredondado). Nada de render realista, 3D detalhado, textura fotográfica ou banco de imagens.
- **Traço:** quando há linha, 2,5–3 px com pontas redondas; a espessura é a mesma dentro de um vídeo. Não misture contorno e chapado no mesmo objeto.
- **Luz:** vem de cima e é localizada (holofote, halo). O brilho (glow) só pode ser branco ou verde ATIVO, e só no protagonista ou no que está "aceso".
- **Sombra:** de contato (elipse, opacidade ≤ 0,45) ou nenhuma. Nada de sombra projetada longa.
- **Complexidade:** um protagonista visual por cena; no máximo ~7 objetos simultâneos. O que não é protagonista fica cinza, apagado ou menor.
- **Pessoas:** sempre ilustrativas, com diversidade de tons de pele (`apoio.pele`). Nunca caricatura de pessoa real, nem marca de terceiros desenhada.
- **Acabamento:** cantos arredondados coerentes, nada de pixel serrilhado, nada de clip-art misturado a desenho próprio.

---

## 6. Composição (`tokens.json` → `tela`)

- **Formato:** 1080 × 1920, 9:16, 30 fps. Nada fora disso para Reels.
- **Área segura:** nenhum texto em y < 250 nem em y > 1570. Laterais ≥ 100 px para texto principal e ≥ 80 px para a legenda.
- **Coluna de botões do Reels** (x ≥ 950, y 1150–1760): **nenhum texto**. Ali só pode haver elemento decorativo.
- **Zonas fixas por modelo:** cada modelo declara as suas (título, palco, faixa exclusiva da legenda, chão) na skill. A faixa da legenda é **exclusiva**: nenhum rosto, balão ou rótulo pode entrar nela.
- **Espaço negativo:** pelo menos ~30% do quadro sem elemento de primeiro plano. O escuro também é composição.
- **Escala:** os enquadramentos variam (geral, médio, close, inserto, revelação), e nunca a mesma escala em 3 cenas seguidas.
- **Leitura imediata:** a ideia da cena precisa ser entendida em 1 segundo, sem som.

---

## 7. Movimento (`tokens.json` → `movimento`)

- **A imagem obedece à voz.** Toda reação visual é ancorada numa palavra (`cues`/`timeline.json`) e cai de **0 a 3 quadros antes** dela. Nada de tempo fixo "chutado".
- **Easing** (`PRODUCAO/src/lib/anim.ts`):
  - entrada: `ease.out`;
  - câmera e transição: `ease.inOut`;
  - queda ou impacto: `ease.in`;
  - `linear` só em loop contínuo (rotação, partículas).
  - Molas (`sp`) são permitidas onde o modelo declara elasticidade.
- **Durações:**
  - micro: 0,10–0,20 s;
  - entrada: 0,30–0,50 s;
  - saída: 0,20–0,55 s;
  - transição: 0,30–0,75 s.
- **Ritmo:** algo muda em cena pelo menos a cada **1,5 s**. A cadência de cena é do modelo (Nível 2).
- **Revelação progressiva:** a informação aparece quando é falada, nunca toda de uma vez antes da fala.
- **Câmera:** sempre motivada. Empurrão sutil de 0,4–3 %/s. Zoom acima de 1,10× só com motivo narrativo (choque, portal).
- **Transformar para explicar:** a transição nasce da ação anterior (o ícone vira portal, a linha vira caminho, o círculo vira relógio).
- **NÃO PODE:**
  - glitch, RGB split, giro 3D, "cubo" ou "página virando";
  - transições de template;
  - bounce em tudo;
  - texto entrando de todos os lados;
  - crossfade sem âncora;
  - whoosh em todo corte;
  - movimento sem função narrativa.

---

## 8. Qualidade — critérios de acabamento

Um vídeo **está pronto** quando passa nos itens objetivos (validador) **e** na revisão visual da folha de quadros (no mínimo 2 quadros por cena e por transição).

**Revisão visual obrigatória (não automatizável):**
- [ ] As 7 assinaturas presentes (seção 2).
- [ ] Um protagonista por cena; nada compete com a frase importante.
- [ ] Texto legível num celular a um braço de distância; nada cortado; nada na coluna de botões nem na faixa da legenda.
- [ ] O verde aparece pouco e sempre com significado; o vermelho só para perda.
- [ ] Ilustrações coerentes entre si (mesma família, mesmo traço, mesma luz).
- [ ] Cada animação tem função narrativa; nenhuma parece efeito de template.
- [ ] O vídeo parece da ATIVO mesmo com o logo coberto.

**Anti-padrões (reprovam):** cara de template genérico, excesso de efeitos, fundo poluído, ilustrações de famílias misturadas sem motivo, texto pequeno ou sem contorno, animação decorativa repetida, cores fora da paleta.

### 8.1 Certo × errado

| Certo | Errado |
|---|---|
| Fundo grafite com holofote no corretor; o resto apagado | Fundo claro ou colorido iluminado por inteiro |
| "Organizar" em **verde** na legenda; botão de envio verde | Verde em todo título, todo ícone e no fundo inteiro |
| Pílula vermelha "VENDA PERDIDA" na perda | Vermelho como decoração ou confete vermelho na comemoração |
| Legenda Manrope 800 com contorno escuro, 2 linhas no máximo | Fonte fina, sem contorno, sobre os raios; 4 linhas |
| Um título + uma pílula | Título, três etiquetas, carimbo e balão ao mesmo tempo |
| Transição que nasce do objeto (portal, linha que vira caminho) | Wipe de template, giro 3D, glitch |
| Roxo, ciano ou dourado trocados por marinho, grade neutra e material dessaturado | Fundo roxo, grade ciano, destaque dourado |

O mostruário renderizado está em `exemplos/`. Ele é gerado pelas composições `ATIVO-SISTEMA-VISUAL-*` do Remotion, então sempre reflete os tokens atuais.

---

## 9. Integração no fluxo (o que o Claude Code faz sozinho)

- **Produzir qualquer vídeo da ATIVO:** o Nível 1 vale sempre. O kit do modelo já importa os tokens, e `editorial_check.py` roda `sistema_visual_check.py` no episódio. Erro bloqueia o render.
- **Criar, alterar ou auditar uma skill, modelo ou kit de vídeo:** acionar a skill `ativo-sistema-visual` e seguir `NOVO_MODELO.md`. O modelo só conta como concluído com `python3 PRODUCAO/tools/sistema_visual_check.py` sem erros e a revisão visual registrada.
- **Roteiro (Skill Mestre):** as sugestões visuais da etapa 07 respeitam as assinaturas e as atmosferas. O estilo final continua sendo decidido na produção.

---

## 10. Governança e evolução

1. **Estabilidade:** o Nível 1 muda pouco e de forma explícita. Nenhuma skill de modelo pode editar este diretório nem `tokens.json` para resolver uma necessidade própria. Ela resolve no próprio kit, dentro das regras.
2. **Extensão sem quebra:** um modelo novo pode **acrescentar**, via proposta, uma família de ilustração, uma técnica de transição ou uma atmosfera. Essas adições são compatíveis: não alteram o que já existe.
3. **Mudança de valor existente** (cor, fonte, mínimos, grade):
   1. proposta escrita com motivo;
   2. `python3 PRODUCAO/tools/sistema_visual_check.py` em todos os modelos;
   3. folha de quadros antes × depois de cada modelo ativo;
   4. **aprovação explícita do cliente**;
   5. nova versão em `tokens.json` (semver: correção `x.y.Z`, adição `x.Y.0`, quebra `X.0.0`) e entrada no `CHANGELOG.md`.
4. **Episódios já entregues** não são refeitos por mudança do Nível 1, salvo pedido do cliente.
5. O validador confere se a versão de `tokens.json` é a última do `CHANGELOG.md`. Mudança silenciosa reprova.
