---
name: primeiro-modelo-cartoon-explicativo
description: PRIMEIRO MODELO de vídeo viral da ATIVO — "Primeiro modelo — Cartoon explicativo": Reel/TikTok vertical 1080×1920 em 2D vetorial chapado (personagens de recorte, fundo de raios por clima, vinheta, holofote, carimbos, pop elástico, corte seco a cada 2–4 s, legenda karaokê no centro, fecho COMENTE "SISTEMA"). Use sempre que o pedido for produzir, adaptar, decupar, revisar ou renderizar um vídeo "no estilo cartoon / explicativo / novo modelo / estilo dos 3 vídeos de referência", ou um roteiro do lote de roteiros virais destinado a este formato. Cobre roteiro → voz → timing → decupagem → cenas Remotion → som → render → QA → legenda do Instagram.
---

# Primeiro modelo — Cartoon explicativo

*ATIVO · modelo de vídeo nº 1. Registro: `MODELOS_DE_VIDEO.md` e `MARCA/sistema-visual/modelos.json` (id `cartoon-explicativo`).*

## Herança do Sistema Visual ATIVO

**Antes de produzir, leia `MARCA/sistema-visual/README.md` (Nível 1).** Ele vale acima desta skill: em conflito, o Nível 1 vence.

- **Herdado (Nível 1, sem redefinir aqui):**
  - acento único `ACENTO` `#02FB3F` (no kit: `A`/`aa`);
  - as 7 atmosferas (`ATMOSFERA`);
  - texto, contorno e alerta de `DS`;
  - Manrope e JetBrains Mono, escala e mínimos;
  - área segura e coluna de botões do Reels;
  - grão e vinheta;
  - easing e ancoragem na palavra;
  - as 7 assinaturas ATIVO;
  - qualidade e governança.

  Valores só em `MARCA/sistema-visual/tokens.json`, que o código lê por `PRODUCAO/src/theme.ts`.
- **Particular deste modelo (Nível 2, preservar):**
  - família de ilustração `chapado` (personagens de recorte, objetos sem contorno);
  - raios girando com a cor da atmosfera;
  - pop elástico, carimbos com tremor, punch-in na palavra;
  - corte seco a cada 2–4 s;
  - legenda karaokê maiúscula no centro (y 1000, 80 px);
  - fecho `CtaCartoon`.
- **Direção de cada vídeo (Nível 3):** metáfora, objetos, elenco, escalas e clima de cada plano, dentro dos níveis acima.
- **Validação:** `python3 tools/sistema_visual_check.py --modelo cartoon-explicativo` (o `editorial_check` já roda a parte do episódio e bloqueia o render). Depois, a revisão visual da folha de quadros (README §8).

> **Fonte da verdade visual:** o piloto `ATIVO_PILOTO_01` ("Concorrente ou parceiro?", 21/11/2026) e o kit `PRODUCAO/src/estilos/cartoon.tsx`. Referência: `referencias/piloto_24_quadros.jpg` (um quadro por plano). A gramática vem da análise quadro a quadro das 3 referências do cliente (`referencias/analise_3_referencias_quadro_a_quadro.md`). Tudo aqui foi medido nessas referências ou já está implementado e validado no piloto. Não é palpite.
>
> **Por que não a skill "cartoon-audio-short" (PDF UltimatoAI):** ela produz outro estilo: mundo 3D three.js com contorno de tinta, desfoque de profundidade, câmera deslizando sem parar, sem legenda e trilha a −6 dB da voz. Renderiza a 3–10 s por quadro na CPU, cerca de 1,5–4,5 h por vídeo de 55 s. Além disso, o `kit/` que ela exige não existe no PDF nem no repositório público de origem. Dela aproveitamos só os princípios marcados com ⟡ abaixo.

---

## 0. Quando usar / o que entrega

**Use para:** curiosidades, histórias, "o que aconteceria se…", erros e regras do mercado imobiliário, casos hipotéticos, comparações e mitos. Qualquer roteiro com uma pessoa, um conflito e uma virada.

**Não use para:**
- demonstração de interface real do sistema (use o estilo Painel);
- depoimento real;
- anúncio Meta Ads (padrão próprio `AD-*`).

**Entrega por episódio** (em `OUTPUT/<outputDir>/`):
- `<OUT>_FINAL.mp4`: 1080×1920, H.264 yuv420p, 30 fps, AAC 48 kHz, −15 LUFS, pico ≤ −1 dBTP;
- `<OUT>_capa.png`;
- `<OUT>_NARRACAO.wav`;
- `<OUT>_legendas.srt`;
- `legenda_instagram.txt` (regras do `CLAUDE.md`);
- `relatorio_qa.md`;
- `editaveis/` (gerado pelo render).

O código fica em `PRODUCAO/episodes/<EP>/` e `PRODUCAO/src/episodes/<EP>/`.

---

## 1. Regras inegociáveis

1. **Identidade ATIVO = Sistema Visual Nível 1** (`MARCA/sistema-visual/README.md`; seção "Herança" acima). Neste modelo:
   - Verde de destaque **somente o `ACENTO` `#02FB3F`** (kit `A`/`aa`); derivados só `A.ink` e `A.deep`. `editorial_check` e `sistema_visual_check` reprovam qualquer outro verde.
   - Fonte **Manrope** (800 em títulos e legendas) e **JetBrains Mono** (rótulos técnicos).
   - Logo oficial `BRAND.logo`, nunca redesenhada.
   - **Nada de amarelo como acento.** Onde as referências usam amarelo, nós usamos o verde.
   - Cores de apoio "humanizadas" (pele `DS.apoio.pele`, cabelo, roupas, telhados, mapas) só dentro das ilustrações e nunca verdes. O dourado das pastas e moedas é exceção declarada em `modelos.json`.
2. **Voz oficial:** Gemini `gemini-3.8-flash-tts`, voz **Puck**, **1,0×**, sem time-stretch, `voice.shapePauses = {keepUnder 0.22, ratio 0.6, max 0.6}`, `direction` de `VOZ/voice_preset.json`. Nunca editar ou re-temporizar a fala: a imagem obedece à voz.
3. **CTA de todo Reel:** "Quer conhecer um sistema personalizado para organizar seus imóveis, leads e atendimentos? Comente SISTEMA que eu te envio os detalhes pelo Direct." Neste formato o visual da CTA é o **`CtaCartoon`** (seção 11). Se o roteiro trouxer outra CTA, ela vira frase de transição antes da CTA SISTEMA.
4. **Integridade**
   - Histórias inventadas recebem o selo **"EXEMPLO HIPOTÉTICO"** na tela.
   - Nada de números, preços, comissões, prazos ou resultados que não estejam no roteiro apurado; para partilha use "DIVISÃO COMBINADA", nunca "50/50".
   - Eventos, empresas e pessoas reais aparecem só por **descrição genérica** ("PAINEL DO SETOR"), sem logo nem caricatura.
   - Personagens são ilustrações, nunca pessoas reais.
   - Nada de marcas de terceiros (WhatsApp, Instagram, portais) desenhadas.
5. **Originalidade:** nunca recriar cena, personagem ou arte das referências. Copiamos a **gramática** (ritmo, luz, câmera, tipos de efeito), não os desenhos.
6. **Texto na tela sempre legível:**
   - nada espelhado (balão de personagem virado → espelhar só a cauda, nunca o texto);
   - fonte ≥ 30 px (ideal ≥ 36);
   - dentro das zonas da seção 3.

---

## 2. Pipeline (ordem obrigatória)

> **Plano visível (regra do cliente, 23/11/2026):** antes de começar, crie no painel "Plano" as 12 etapas do modelo A de `PROMPTS/PLANO_DE_ETAPAS_ATIVO.md`, com o ID do episódio no título (`[<EP>] n/12 · Etapa — resultado`). Uma etapa `in_progress` por vez; `completed` ao terminar; erro vira `BLOQUEIO`.

| # | Etapa | Comando / arquivo | Saída |
|---|---|---|---|
| 1 | Ingestão do lote | PDF → `ROTEIROS/<LOTE>/` (texto + `roteiros.json`), um `.md` por roteiro | roteiros numerados |
| 2 | Diagnóstico editorial | `PROMPTS/GUIA_EDITORIAL_GANCHOS_RETENCAO_CTAS_ATIVO.md` | gancho, virada, apuração |
| 3 | Segmentação | `S = [(cena, texto, legenda)]` + `L = [(cue, seg, palavra)]` (seção 4) | — |
| 4 | Criar episódio | `novo_episodio.build(..., formato="cartoon-explicativo", grade="AAAA-MM-DD", slot="HH:MM")` | `episodes/<EP>/episode.json` (liga ao slot da grade do dia e registra o modelo 1; escolha por adequação — `PROMPTS/ESTEIRA_EDITORIAL_DIARIA_ATIVO.md` §6) |
| 5 | Voz | `GEMINI_KEY_VAR=GEMINI_API_KEY[_2] python3 tools/gen_take.py <EP> A <dir>` → conferir tomada → `narration_source.wav` | WAV aprovado |
| 6 | Timing | `python3 tools/build_narration.py <EP> --source episodes/<EP>/narration_source.wav` | `src/episodes/<EP>/timeline.json` (palavra a palavra) + SRT |
| 7 | Decupagem | tabela de planos ANTES do código (seção 5) | `ANALISE/shotlist_<EP>.md` (opcional) |
| 8 | Cenas | `src/episodes/<EP>/{Episode.tsx, Cover.tsx, scenes/Scenes.tsx}` + registro em `src/Root.tsx` | composição |
| 9 | Checagens | `npx tsc --noEmit -p .` e `python3 tools/editorial_check.py <EP>` (0 erro) | — |
| 10 | Quadros | `rm -rf build && npx remotion bundle --out-dir build`, depois `EP=<EP> bash tools/stills.sh <dir> <s…>`, depois folha de contato | revisão visual |
| 11 | Som | `sfx` no `episode.json` (seção 12), depois `python3 tools/build_audio.py <EP>` | `public/<EP>/mix.wav` |
| 12 | Render | `bash tools/render_episode.sh <EP>` (precisa de **11/11 OK**) | MP4 + capa + editáveis |
| 13 | Ritmo | `python3 tools/motion_check.py ../OUTPUT/<OUT>/<OUT>_FINAL.mp4` (metas na seção 13) | — |
| 14 | Legenda IG | `PROMPTS/GUIA_LEGENDAS_INSTAGRAM_ATIVO.md` + `tools/legenda_check.py` | `legenda_instagram.txt` |
| 15 | Publicação | `publicar.py <EP> --quando "AAAA-MM-DD HH:MM"` (a pasta de data/hora define o horário), commit, push, Action, conferir no Supabase | agendado |

**Sem cota de voz:** monte tudo com um `narration_source.wav` provisório (TTS anterior aprovado ou silêncio medido) e marque `"vozProvisoria": true` no `episode.json`. Ao chegar a voz real, rode de novo a partir da etapa 6. Todas as animações são ancoradas em **palavras (cues)**, nunca em segundos fixos, então a cena se reajusta sozinha.

**Mantenha o usuário informado:** mande a folha de quadros antes do render final ⟡ e o MP4 com um resumo plano a plano.

---

## 3. Grade da tela (1080 × 1920) — zonas fixas

| Zona | y (px) | O que vai lá |
|---|---|---|
| Interface do Instagram (topo) | 0–250 | só fundo |
| **Selo / título de cena** | 285–360 | `Selo` (top 285) |
| **Palco superior (objetos, carimbos, cartões, mapas)** | 380–900 | protagonista visual do momento |
| **Faixa da legenda karaokê** | 912–1088 (centro y = 1000) | só a legenda; nenhum rosto nem texto aqui |
| **Palco inferior (personagens)** | 1090–1540 (chão `FLOOR = 1540`) | personagens em pé; cabeça ≥ 1090 |
| Interface do Instagram (rodapé) | 1570–1920 | só pés, sombras e chão (decorativo) |
| Margens laterais | ≥ 80 px para a legenda, ≥ 100 px para texto principal | elementos decorativos podem sangrar |

Personagem de escala `s` com pés em `FLOOR` tem o topo da cabeça em `1540 − 555·s`:

| s | Topo da cabeça | Situação |
|---|---|---|
| 0,90 | 1040 | encosta na legenda; aceitável só sem coque ou topete alto |
| 0,84 | 1074 | ideal |
| 1,05 | — | close: pés em 1630–1640 (abaixo da tela útil) |

---

## 4. Roteiro para este formato

- **Fórmula** ⟡:
  1. **Gancho** (frase 1, sem preâmbulo): pergunta ou paradoxo com conflito ("Eles vão competir ou conversar?").
  2. **Situação** em 1–2 frases: quem, onde, um detalhe concreto.
  3. **Escalada** em 2–4 batidas, cada uma maior.
  4. **Virada** ("Mas…", "A lição não é…").
  5. **Fecho** irônico ou sábio em ≤ 5 palavras ("Cooperação com critério.").
  6. **CTA SISTEMA**.
- **Tamanho:** 45–75 s.
  - Puck a 1,0× rende ~140–150 palavras/min, então 100–170 palavras + CTA.
  - As referências correm a ~180/min. Compense com **frases curtas (6–12 palavras)** e mais batidas visuais por frase, nunca acelerando a voz.
- **Legenda (`caption`):**
  - blocos separados por `|` com **1–3 palavras e ≤ 22 caracteres**;
  - `*palavra*` marca ênfase (verde na legenda e balanço de cabeça nos personagens);
  - nunca `*` colado em aspas.
- **Negativas** (não, nem, isoladas, qualquer, competir, perder, errado, proibido…) ficam vermelhas automaticamente quando enfatizadas. Para ampliar a lista, edite `NEG` em `cartoon.tsx`.
- **Cues:** uma por virada visual. Nome = prefixo da cena + conceito (`h_dois`, `a_capt`, `b_aut`, `c_rede`, `x_crit`). A CTA ganha `cta_quer`, `cta_sys`, `cta_tiles`, `cta_leads`, `cta_atend`, `cta_comment`, `cta_word`, `cta_direct` e `cta_end` (automáticos no `build` com `formato`).
- **Roteiro do cliente aprovado:** não reescrever. Só segmentar, enfatizar e encaixar a CTA. Mudança material precisa de aprovação.

---

## 5. Decupagem (planos) — regras de montagem

1. **Um plano por ideia visual, não por frase.** Corte quando muda o sujeito, o lugar, o clima ou a escala.
2. **Cadência:**
   - corte seco a cada **2–4 s** (piloto: 19 planos em 45 s = 2,4 s; referências: 3,0–3,7 s);
   - nunca mais de **4,5 s** sem trocar de plano;
   - dentro do plano, **algo novo a cada ~1 s** (personagem entra, etiqueta, check, carimbo, linha que cresce, punch-in).
3. **O plano começa na palavra:** `a` = início da palavra-gatilho ou alguns décimos antes (ex.: `tAtend + 0.56`, `c.a_b - 0.64`). Cada reação visual cai **0–3 quadros antes** da palavra ⟡. Use os cues ou `w(/regex/, "sN", fallback)` para achar a palavra.
4. **Variação de escala** ⟡:
   - geral (2–4 personagens, s 0,62–0,72);
   - médio (2 personagens, s 0,84–0,92);
   - close (1 personagem, s 1,05 com pés abaixo da tela);
   - inserto (objeto grande no palco superior);
   - revelação (rede, mapa ou multidão com zoom-out).
   - Não repetir a mesma escala em mais de 2 planos seguidos.
5. **Clima por função** (seção 6.2): explicação → `explica`; conflito ou erro → `conflito`; pergunta ou dilema → `pergunta`; solução ou ganho → `ganho`; evento ou bastidor → `evento`; dados ou números → `dados`; passado ou história antiga → `sepia`. A troca de clima acontece **só no corte**.
6. **Mapa obrigatório de um episódio:**
   - gancho (2–3 planos curtos, sendo o último um dilema com carimbo);
   - "EXEMPLO HIPOTÉTICO" quando couber;
   - escalada com pelo menos 1 impacto (muro, proibido, X);
   - virada com mudança de clima;
   - payoff com carimbo verde + confete;
   - CTA cartoon.
7. **Antes de codar:** monte a tabela `plano | a–b (s) | fala | clima | escala | personagens/poses/humor | objetos e entradas (s) | câmera | som`.

---

## 6. Bíblia visual

### 6.1 Estética
- 2D vetorial **chapado**, **sem contorno** nos personagens e objetos.
- Cada volume tem cor sólida + **1 tom de sombra** (lado direito/inferior a ~8–18% de preto, ou cor `sombraTerno`).
- Profundidade só por escala, sobreposição, sombra de contato e vinheta.
- Fundo mais escuro e dessaturado; primeiro plano saturado.

### 6.2 Fundo de raios (`<Raios t clima vin />`)
- **20 raios** alternados centrados em (540, 900), girando **3,2°/s**.
- Gradiente radial `c0` (centro) → `c1` (borda), raio 1100 px (a luz fica localizada e as bordas morrem no quase preto).
- **26 partículas** brancas (r 1,5–4 px, opacidade 0,08–0,22) subindo 14–34 px/s com leve oscilação.
- **Vinheta:** gradiente radial preto de 25% (transparente) a 100% (opacidade `vin`).
  - `vin` 0,55–0,65 = aberto (ganho, revelação);
  - 0,7–0,8 = explicação;
  - 0,85–0,92 = tensão (conflito, dilema, evento).
- **Climas = atmosferas do Nível 1** (`CLIMA` no kit lê `ATMOSFERA` de `theme.ts`; o modelo só decide a intensidade dos raios). Os nomes antigos continuam válidos, e os globais também (`explicacao`, `tensao`, `dilema`, `solucao`, `neutra`, `memoria`):

| clima (antigo → atmosfera) | Cor | Raios (Nível 2) | Uso |
|---|---|---|---|
| `explica` → `explicacao` | marinho | luz marinho, 0,07 | explicação, situação |
| `conflito` → `tensao` | vermelho escuríssimo | luz de alerta, 0,08 | erro, disputa, perda, proibição |
| `pergunta` → `dilema` | marinho profundo (antes era roxo) | branco, 0,06 | dilema, gancho em pergunta |
| `ganho` → `solucao` | verde deep **localizado**: a luz do gradiente tem raio de 760 px (as outras, 1100), só atrás do protagonista; o resto do quadro fica escuro | verde ATIVO, 0,035 | solução, payoff, CTA |
| `evento` → `neutra` | grafite | branco, 0,05 | palco, painel, bastidor |
| `dados` → `dados` | marinho + **grade** 96×170 px (antes era ciano) | luz marinho, 0,05 | números, "sala de controle" |
| `sepia` → `memoria` | grafite morno (antes era sépia) | creme, 0,06 | passado, história antiga |

Os valores HEX estão em `MARCA/sistema-visual/tokens.json` → `atmosfera`. Nunca escreva cor de clima à mão no episódio.

### 6.3 Luz
- **Holofote** (`<Holofote x chao w p cor/>`):
  - cone que sai do topo (largura 120 px) até o chão (largura `w` 380–760);
  - gradiente de opacidade 0 → 0,08 → 0,16;
  - elipse no chão (ry 46, opacidade 0,13).
  - Um por protagonista. Acende junto com a entrada do personagem (`p = prog(t, entrada − 0.3, 0.3)`).
- **Sombra de contato:** elipse preta, opacidade 0,45, `rx ≈ 120·s`, `ry ≈ 0,16·rx`, 4 px abaixo dos pés. Objetos também têm (casa, prédio, muro). Nada de sombra projetada.
- **Glow:** só verde da marca (`drop-shadow(0 0 8–14px aa(.5))`) em linhas e conexões positivas.
- **Grão:** `<Grain>` global por cima de tudo.

### 6.4 Tipografia de tela
- **Manrope 800 em maiúsculas** para selos, carimbos, etiquetas e legenda. Mono só para rótulos técnicos pequenos.
- Contorno de leitura: `WebkitTextStroke` em `DS.cor.contorno` + `paintOrder: "stroke fill"` + sombra `0 6–8px 18–24px rgba(0,0,0,.6–.7)`.
- Cores (tokens do Nível 1):
  - texto `DS.cor.texto.branco`;
  - palavra-chave `A.hex`;
  - negativo `C.warn` (texto) e `DS.cor.alerta.fundo` (fundo de carimbo);
  - palavra ainda não falada `DS.cor.texto.pendente`.

---

## 7. Personagens (`<Personagem/>` — rig de recorte)

### 7.1 Construção
Coordenadas locais com pés em (0, 0) e altura total ≈ 555·s.

| Parte | Medidas (s = 1) |
|---|---|
| Cabeça | círculo r 88 centrado em y −420 (≈ 1/3 do corpo); sombra lateral em crescente (preto 8%) |
| Orelhas | r 16 em x ±88 |
| Pescoço | 48×30 |
| Olhos | elipses brancas rx 17 × ry 18 em (±30, −428); pupila preta r 9 deslocada por `olhar` (−1…1 → ±7 px) |
| Sobrancelhas | barras 36×8 na cor do cabelo, rotacionadas pelo humor |
| Boca | ver tabela de humor |
| Tronco | terno trapezoidal de y −330 a −140, ombros ±98; lapela com camisa em V `#F3EEE6`; gravata opcional (A = verde da marca); sombra lateral direita `sombraTerno` |
| Braços | cápsulas 38×150 com pivô no ombro (±92, −318) e mão r 22; braço direito com `sombraTerno` |
| Pernas | 44×156 na cor `calca`; sapatos elipse 36×14 `#0B0C0F` |
| Cabelo (`cabeloTipo`) | `topete`, `curto`, `coque` ou `careca` |

### 7.2 Humor (sobrancelha + boca)

| humor | sobrancelha | boca | olhos | Quando |
|---|---|---|---|---|
| `neutro` | 0° | traço levemente curvo | normal | situação |
| `feliz` | −6° | meia-lua aberta escura | normal | acerto, solução, CTA |
| `bravo` | +16° (franzida) | arco para baixo | normal | competição, conflito |
| `espanto` | −14° e +12 px acima | "O" 15×18 | ry 21, pupila 7 | dilema, susto, revelação |
| `triste` | −10° | arco para baixo | normal | perda, isolamento |

`fala={true}` abre e fecha a boca: elipse com altura `3 + 13·|sin(15t)|` modulada. Use só em quem "fala" na cena (painel, diálogo), nunca no narrador.

### 7.3 Vida (nunca congelar) ⟡
- **Respiração:** tronco com escala Y de 1 ± 1,2% (2,4 rad/s) e cabeça ± 3 px.
- **Piscada:** a cada 3,4 s por 0,11 s, com defasagem pelo `seed` (dê `seed` diferente a cada personagem).
- **Balanço nas ênfases:** `acentos={acentosDe(tl.captions)}` faz a cabeça descer 9 px e inclinar 3° por 0,25 s em cada `*palavra*`.
- **Gestos com antecipação:** `braco={gesto(t, cue, de, para)}` recua 12% no sentido contrário 0,1 s antes, vai por mola com overshoot (~8%) e assenta. Use **sempre** que um braço mudar de pose numa palavra.

### 7.4 Poses de braço (`braco` direito, `bracoE` esquerdo; graus)

| Ângulo | Pose |
|---|---|
| 8–20 | repouso |
| 30 | surpresa |
| 40–60 | apresentar |
| 70–85 | apontar ou estender para o lado (para outro personagem ou objeto) |
| 95 | confronto (braços que se encontram no meio) |
| 110–120 | segurar objeto à frente (`item` na mão: pasta, chave) |
| 140–150 | mão para cima (ideia, comemoração, aceno) |

Aperto de mão: personagens a ~280 px de distância, ambos com 78°, mais um círculo de pele no ponto de encontro.

### 7.5 Elenco e paleta (`VIS`)

| Papel | Terno / sombra | Pele | Cabelo | Detalhe |
|---|---|---|---|---|
| **A** (protagonista recorrente da ATIVO) | `#2C3E66` / `#22314F` | `#E8B48C` | `#2A1C14` topete | gravata **verde da marca** |
| **B** (outro corretor) | `#6E3A2C` / `#572D22` | `#9A6444` | `#151012` curto | gravata `#E9E2D6` |
| **comprador** | camisa `#D7883A` / `#B9712C` | `#C98C64` | `#4A2E1C` coque | sem gravata |
| **liderança** | `#3A3F4A` / `#2E323B` | `#D9A27B` | grisalho `#8C8C8C` | gravata `#B8BDC6` |

- **Diversidade obrigatória:** variar tons de pele (`#EEC3A0`, `#E8B48C`, `#D9A27B`, `#C98C64`, `#9A6444`, `#8E5A3C`), cabelos e gênero entre os personagens do mesmo vídeo.
- **Variações de figurino:** sobrescreva campos (`{ ...VIS.comprador, terno: "#4C7FB8", … }`) com cores não verdes.
- **Corretor A é a "mascote" do perfil:** aparece em todo episódio e sempre no fecho.
- **Figurantes** (`<Figurante/>`): silhueta cabeça + corpo em cinza-azulado ou terroso dessaturado (`#6B7080`, `#7D6B5E`, `#5E6E80`, `#806070`…), olhinhos opacos, pulinho de caminhada. Para multidão, entrada escalonada a cada 0,12 s.
- **Avatar** (`<Avatar/>`): retrato em círculo com borda branca (ou verde para "você/protagonista"). Use em redes, conexões e cartões de perfil.
- **Escalas por plano** (seção 5.4). `flip` espelha o personagem para encarar o outro. Nunca há texto dentro do personagem.

---

## 8. Objetos e elementos de tela

Todos são chapados e sem contorno (exceto balão e cartão, com borda branca ou escura).

| Elemento | Componente | Especificação / uso |
|---|---|---|
| Casa | `Casa w` | fachada `#E9E2D6` + lateral 8% preta, telhado `#B5483A` com água escura, porta `#5A3A2A`, janelas `#9EC3E6`, sombra |
| Prédio | `Predio w h cor` | janelas em grade 3×5 a 75%, faixa de sombra 14%, porta escura; nome em `Etiqueta` acima, nunca colado |
| Pasta / carteira | `Pasta` | `#E0A43A`/`#F0B94E`, rótulo ≥ 30 px |
| Cadeado / escudo | `Cadeado`, `Escudo` | cadeado cinza `#C9CED6`; escudo **verde da marca** com borda branca 10 px (proteção = positivo) |
| Chave | `Chave` | verde da marca na mão do personagem (`item`) |
| Raio | `Raio` | `#FFD9D4` com borda `#D2392E` (conflito) |
| Balão | `Balao` | branco, raio 40, cauda; "?" 64 px |
| Mapa | (Scenes) | papel `#E9E2D6`, ruas `#C9C1B2`, quadras `#8FA8C8` e `#B5483A`; lupa percorre e dá lugar ao **pino verde** com 2 ondas de pulso |
| Contrato | (Scenes) | papel `C.paper`, cabeçalho `#2C3E66`, caixas de seleção pretas + ✓ quando a palavra é dita; itens cinza `#9A968E` até serem ditos |
| Moedas + % | `Moedas` | pilha `#E0A43A`/`#A8761E` com selo "%" (remuneração sem números) |
| Muro | (Scenes) | tijolo `#7E3A30` com juntas `#4E1F19`, cai do alto (seção 9.6) |
| Rede | (Scenes) | avatares ligados por linhas verdes 8 px com glow, desenhadas em sequência |
| Check | `Check r` | círculo verde, borda branca 7 px, ✓ na cor `A.ink` |
| Proibido | `Proibido r` | anel + barra `#D2392E` com espessura 16% de r |
| X de conexão | (Scenes) | círculo vermelho r 58, borda branca, X branco; linha tracejada que para |
| **Selo** (topo) | `Selo texto cor` | Manrope 800, 52–56 px, contorno 10 px; branco (neutro), vermelho (lição/alerta), verde (solução) |
| **Etiqueta** (pílula) | `Etiqueta texto cor size` | 32–40 px, borda 5 px; `dark` (nomes), `white` (objetos), `green` (conquista), `red` (problema) |
| **Carimbo** | `Carimbo texto sub cor size rot` | ver 9.3; vermelho = dilema ou erro; verde = solução ou payoff; 54–84 px; ≤ 22 caracteres |
| Contador | `Contador de ate prefixo sufixo` | número sobe em ~1 s (só números do roteiro apurado) |
| Barra | `Barra h rotulo` | cresce de baixo por mola (comparações) |
| Confete | `Confete at n` | 60 papéis 16×9 em verde ATIVO, branco e cinza, que giram e caem (só no payoff; nunca vermelho, porque vermelho é perda) |
| Flash | `Flash at` | branco 0,85 → 0 em 6 quadros (salto de tempo/lugar ou revelação grande) |

**Regra do texto na tela:**
- etiquetas, selos e carimbos **complementam**, não repetem a legenda;
- nomeie quem é quem ("CORRETOR A", "COMPRADOR 1");
- rotule a conquista ("CAPTAÇÃO", "MESMA REGIÃO");
- dê o veredito ("SEM CONEXÃO", "DADOS PROTEGIDOS");
- no máximo **1 carimbo + 2 etiquetas** visíveis ao mesmo tempo.

---

## 9. Animações (especificação exata)

### 9.1 Pop elástico (entrada padrão de tudo)
- `pop(t, at)` = mola `{damping 9, stiffness 260, mass 0.6}`.
- Escala `0,5 + 0,5·k` (vai a ~1,05 e assenta em 4–6 quadros); opacidade `min(1, 3k)`.
- Personagens fazem pop **a partir dos pés** (`<Pop x y>` com o personagem em 0,0).
- Escalonamento: 0,07–0,25 s entre itens de um grupo.

### 9.2 Legenda: cada bloco também entra com pop (0,85 → 1), e cada palavra "salta" 12% ao ser dita.

### 9.3 Carimbo
- Escala **2,3 → 1** em **0,16 s** (ease-in, "cai" na tela), depois pulso de +4% por 0,2 s.
- Giro fixo −5° a −8°. Opacidade `min(1, 2,5k)`.
- Fundo `#D2392E` (texto branco) ou `#02FB3F` (texto `A.ink` + glow verde); borda branca 7 px; raio 18; sombra `0 18px 40px rgba(0,0,0,.55)`.
- **Sempre com tremor de câmera no mesmo instante** (`hits`).

### 9.4 Desenho progressivo
- Linhas tracejadas e conexões crescem do ponto A ao B em 0,9–1,1 s (ease-out).
- Arcos ("ponte") usam `strokeDasharray = comprimento`, com o offset indo a 0 em 0,9 s.
- Na rede, cada linha começa 0,05 s depois da anterior.

### 9.5 Voo de objetos
Arco parabólico com a altura `−160·sin(πp)`, rotação progressiva e escala 0,6. Se o voo é "proibido", na palavra-negação os objetos caem (+600 px, giram 90° e somem em 0,5 s).

### 9.6 Queda de muro / tampa
Desce de −1700 px até o chão em **0,16 s** (ease-in), batendo **exatamente** na palavra (`at − 0,16`). A sombra de contato aparece proporcional à descida. Tremor no impacto.

### 9.7 Pulso de destaque
2 anéis verdes concêntricos crescendo de r 40 a 160 e desaparecendo, em loop de 1,1 s (pino, alvo, "aqui").

### 9.8 Lupa / busca
A lupa percorre o mapa em 1,6 s (ease-in-out) e some na palavra de revelação, quando entra o pino.

### 9.9 Gesto com antecipação
`gesto()` (seção 7.3). Ação = antecipação → passa do ponto → assenta ⟡.

### 9.10 Revelação por zoom-out
Grupo em escala 1,35 → 1 em 0,7 s (ease-out) começando 0,3 s antes da palavra.

---

## 10. Câmera e transições

### 10.1 Câmera (`<CamCartoon t t0 push punch hits>`)
Aplicada a cada plano.
- **Quase parada.** Push-in contínuo de **1,2%/s** (`push 0.012`); 1,5–3%/s em tensão; 0 em revelação.
- **Punch-in na palavra-chave:** `{at, s 1.04–1.08, x, y}` com transição de 0,22 s (ease-out). As referências chegam a +15–33%; use > 1,10 só em momento único de choque. Desloque `x`/`y` para centralizar o objeto da palavra.
- **Tremor de impacto:** 0,22 s, amplitude 14 px decaindo (x `sin(95·d)`, y `0,7·cos(120·d)`), em carimbos, muro, proibido e cliques do fecho.
- Origem do zoom no centro (540, 960). O **fundo de raios fica fora da câmera**, para não pular no punch-in.
- **Proibido:** pans longos, rolagem contínua, câmera "flutuando" o tempo todo e zoom acima de 1,10 sem motivo.

### 10.2 Transições
- **Corte seco é o padrão. Nunca crossfade entre planos.**
- **Entrada "chicote"** em todo corte: o plano novo começa deslocado +70 px e com blur 7 px, que somem em **0,1 s** (3 quadros, ease-out).
- **Troca de clima** sempre no corte (o fundo muda junto).
- **Flash branco (6 quadros)** só em salto de tempo ou lugar ⟡ ou em revelação grande.
- Fade só no final: preto até 85% nos últimos 0,45 s (dentro do `CtaCartoon`).
- Na virada do roteiro ⟡: troca para o clima oposto + punch-in + impacto sonoro.

---

## 11. Legenda karaokê e fecho

### 11.1 `<LegendaKaraoke chunks y={1000} size={80}/>` — o vídeo inteiro, inclusive na CTA
- Centro em y 1000; margens laterais 80 px; Manrope 800 **maiúsculas**, 80 px, espaçamento −0,03 em, entrelinha 1,02; quebra em até 2 linhas.
- Contorno `0,16·size` `#0A0A0C` + sombra `0 6px 18px rgba(0,0,0,.7)`.
- Cores (tokens do Nível 1):
  - palavra ainda não dita = `DS.cor.texto.pendente`;
  - dita = `DS.cor.texto.branco`, com salto de 12%;
  - ênfase = `A.hex` (verde ATIVO);
  - ênfase negativa ou "não/nem" = `C.warn`.
- O bloco aparece com pop no início do primeiro termo e some no fim do último.

### 11.2 Fecho `<CtaCartoon t tl segPergunta segComente logo seguir/>` (substitui o `Cta` do Painel neste formato)
1. **Início da pergunta:** clima `ganho`, selo verde **"SISTEMA PERSONALIZADO"**; o corretor A entra à esquerda (s 0,8, holofote) e levanta o braço com antecipação.
2. **"imóveis", "leads", "atendimentos":** três cartões (280×300, fundo `#13161B`, borda verde 7 px, ícones chapados casa/pessoa/balão) entram com pop exatamente em cada palavra.
3. **"Comente":** os cartões sobem e somem (0,3 s); entra o **cartão COMENTE:** (branco `#F4F5F7`, borda 8 px `#0A0A0C`, glow verde) com campo de texto e botão verde de enviar.
4. **"SISTEMA":** o campo digita S-I-S-T-E-M-A em 0,45 s, com cursor piscando. A **mão cartoon** (manga do terno de A) entra e toca **enviar** (+0,75 s, botão afunda 12%, tremor). Um **avião de papel** voa em arco e some.
5. **"Direct":** aparece "→ detalhes pelo **Direct**" (pílula verde); entram o botão **SEGUIR** (verde) e o **logo oficial**.
6. **~1,2 s depois de "Direct":** a mão toca SEGUIR, que vira **"SEGUINDO ✓"** (cinza escuro + check verde); a mão sai e o quadro escurece até 85% de preto no final.
7. `seguir={false}` remove o passo 6, se o cliente preferir uma única chamada.

A capa (`Cover.tsx`) usa os personagens principais em `espanto` ou `bravo` num clima forte, com a pergunta do gancho em Manrope 800 maiúsculas 110–120 px (contorno 16 px, a palavra-problema em vermelho e a palavra-solução em verde), um carimbo e o logo no rodapé (top ≈ 1610).

---

## 12. Som

> **Sistema Musical (23/11/2026, `TRILHAS/README.md`):** com `music.trilha` no episódio (`novo_episodio.build(..., trilha=…, ancoras=…)`), a trilha sintetizada desta seção é substituída por uma faixa do catálogo **adaptada à história** (`tools/adaptar_trilha.py`) e pela mixagem v2 do `build_audio.py`; os efeitos afinados (shimmer/chord/bell) passam a soar no tom da trilha. Afinidade (catálogo): T05 motor prático (muito), T03 arco de descoberta (compatível), T04 (contextual); evitar T01 e T02. Lacuna: falta uma faixa de leveza/humor (`TRILHAS/papeis.json`). Só trilha `licenciada`/`original` vai ao ar. Sem `music.trilha`, vale o padrão abaixo.

### 12.1 Mixagem
Valores do piloto, padrão do perfil; **não** usar a regra "trilha a 50% da voz":

| Camada | Nível medido no piloto |
|---|---|
| Narração | ≈ −19 LUFS |
| Trilha (sintetizada, `music.prog` por cena, 88 bpm) | ≈ −36,5 LUFS (~17 dB abaixo da voz; `gain −30`, `duck −5.5`) |
| Efeitos | ≈ −39,5 LUFS integrados; eventos individuais −23 a −30 dB |
| Master | −15 LUFS ±0,5, pico ≤ −1 dBTP (`build_audio.py` + `render_episode.sh`) |

**Nenhum efeito cobre sílaba:** se o efeito cai sobre a fala, abaixe 2–3 dB ou adiante 0,05 s.

### 12.2 Vocabulário de efeitos (`episode.json → sfx: {cue, offset, sound, gain, pitch}`)

| Evento visual | `sound` | gain (dB) | offset típico | Observação |
|---|---|---|---|---|
| Entrada de personagem, etiqueta, cartão, selo | `pop` | −25 a −27 | 0 a +0,1 | `pitch` sobe +3 a cada item de uma série (0, 3, 6) |
| Carimbo, muro, proibido, "X", batida de dilema | `impact` | −25 a −29 | 0 (no quadro do impacto) | sempre junto do tremor |
| Corte com troca de assunto | `whip` | −28 a −29 | 0 | no máximo 1 a cada 3 cortes |
| Corte leve / entrada lateral | `swish` | −27 a −28 | −0,05 | |
| Check, cadeado fechando, clique, toque | `click` | −23 a −26 | 0 | `pitch` crescente em listas |
| Revelação de ponto ou objeto ("o imóvel certo", pino) | `pin` | −26 | +0,05 | |
| Conflito curto (raio) | `block` | −25 | +0,05 | |
| Vazio, perda, "não acontece" | `hollow` | −29 | +0,05 | |
| Proibição, alerta | `alert` | −30 | 0 | |
| Peso, escudo | `thump` | −26 | +0,1 | |
| Payoff positivo, confete, "seguindo" | `shimmer` | −27 a −28 | 0 | |
| Desenho de rede ou linhas | `tick` | −25 | +0,05 | |
| Voo, subida, avião de papel | `whoosh_up` | −28 | 0 | |
| Digitação de SISTEMA | `typing` | −29 | 0 (em `cta_word`) | |

**Densidade:** 1 efeito a cada 1–1,5 s em média (piloto: 48 eventos em 55 s). Todo pop, carimbo e corte relevante tem som; nem todo pop precisa de som (escolha o principal do grupo). Com `formato="cartoon-explicativo"`, o `build` já inclui os efeitos do fecho.

---

## 13. Metas de qualidade (QA)

**Antes do render (folha de quadros, mín. 2 por plano + cortes):**
- [ ] Nenhum rosto ou texto na faixa da legenda (912–1088); cabeças ≥ 1090 (exceto close).
- [ ] Nada de texto fora de 80–1000 px na horizontal; carimbo inteiro dentro da tela (≤ 22 caracteres a 54–62 px).
- [ ] Nenhum texto espelhado (balões e objetos com `flip`).
- [ ] Máximo de 1 carimbo + 2 etiquetas simultâneos; uma frase importante por vez.
- [ ] Toda reação cai na palavra (0–3 quadros antes).
- [ ] Cores: só o `ACENTO` como verde; vermelho para erro; nenhum amarelo de acento; clima de cada plano é uma atmosfera do Nível 1.
- [ ] "EXEMPLO HIPOTÉTICO" quando a história é inventada; nenhum número sem fonte.
- [ ] Sistema Visual: `python3 tools/sistema_visual_check.py --quadros <pasta_da_folha>` sem aviso de luminância fora de flash/capa, e a revisão visual do README §8 marcada.

**Depois do render:**
- [ ] `render_episode.sh`: **11/11 OK**.
- [ ] `motion_check`: **movimento médio ≥ 2,5** (piloto 3,31; o padrão Painel antigo ficava em ~1,4); **quadros parados ≤ 15%**; **maior trecho parado ≤ 0,5 s** (fora o fade final).
- [ ] Cadência: plano médio ≤ 3,5 s, nenhum > 4,5 s.
- [ ] Mix −15 LUFS ±0,5, pico ≤ −1 dBTP, voz sempre inteligível.
- [ ] `editorial_check`: 0 erro (o formato exige `estilos/cartoon`, `LegendaKaraoke`, `CtaCartoon` e `Planos`).
- [ ] `legenda_instagram.txt` aprovada pelo `legenda_check.py`.

---

## 14. Esqueleto de código (copie do piloto `src/episodes/ATIVO-PILOTO-01/`)

```tsx
// scenes/Scenes.tsx — um array de planos; só o plano ativo é renderizado (corte seco)
type Shot = { id: string; a: number; b: number; clima: Clima; vin?: number; push?: number;
  punch?: { at: number; s: number; x?: number; y?: number }[]; hits?: number[];
  svg?: (t: number) => React.ReactNode; html?: (t: number) => React.ReactNode; selo?: (t: number) => React.ReactNode };

export const makeShots = (tl: Timeline): Shot[] => {
  const c = tl.cues; const ac = acentosDe(tl.captions);
  const w = (re: RegExp, seg: string, fb: number) => { /* início da palavra no segmento */ };
  return [
    { id: "1 gancho", a: 0, b: c.h_x, clima: "pergunta", vin: 0.85, hits: [c.h_y],
      svg: (t) => <>
        <Holofote x={300} chao={FLOOR} w={460} />
        <Pop t={t} at={0.15} x={300} y={FLOOR}><Personagem t={t} x={0} y={0} s={0.9} v={VIS.A} acentos={ac} braco={gesto(t, c.h_y, 10, 150)} /></Pop>
      </>,
      html: (t) => <Carimbo t={t} at={c.h_y} x={540} y={560} texto="PERGUNTA?" />,
      selo: (t) => <Selo t={t} at={0.1} texto="TÍTULO" /> },
    // …
  ];
};
// Episode.tsx: <Planos t shots/> até cta_quer − 0.05; depois <Raios clima="ganho"/> + <CtaCartoon/>;
// <LegendaKaraoke y={1000} size={80}/> por cima de tudo; <Grain/>; <Audio mix.wav/>.
```

- Camada SVG (personagens e objetos) e camada HTML (selos, etiquetas, carimbos, contador) ficam **dentro** da `CamCartoon`, para o punch-in valer para as duas. O `Selo` fica **fora**: o título é estável.
- Registre `Composition` e `Still` (`<EP>-Capa`) em `src/Root.tsx`.
- Prefixo de ID: **`ATIVO-CARTOON-<NN>`** (outputDir `ATIVO_CARTOON_<NN>`), já incluído no lote de verde `#02FB3F` do `editorial_check`.

---

## 15. Anti-padrões (reprovam o vídeo)
- Fundo liso ou estático sem raios, vinheta ou partículas.
- Plano > 4,5 s, ou > 1,2 s sem nada novo.
- Crossfade entre cenas.
- Câmera flutuando o tempo todo.
- Personagem congelado: sem respiração, piscada ou balanço.
- Braço que "teleporta" sem antecipação.
- Legenda embaixo ou com mais de 3 palavras por bloco.
- Legenda repetida em etiqueta, ou etiqueta repetindo a fala.
- Texto pequeno (< 30 px) ou na zona da interface do Instagram.
- Rostos sob a legenda.
- Verde diferente do `ACENTO`; amarelo de acento; cor de fundo fora das atmosferas do Nível 1 (roxo, ciano, sépia); campo verde ocupando a tela inteira.
- Logo de terceiros; pessoa real desenhada; número inventado.
- Trilha competindo com a voz; efeito em cima de sílaba; whoosh em todo corte.
- Reaproveitar a mesma sequência de planos entre episódios. Varie metáfora, objetos e escalas a cada roteiro.

---

## 16. Kit — referência rápida (`PRODUCAO/src/estilos/cartoon.tsx`)
`CLIMA`, `Raios`, `Holofote`, `pop`, `Pop`, `tremor`, `CamCartoon`, `Sombra`, `VIS`, `Personagem` (humor, fala, olhar, flip, braco, bracoE, seed, item, acentos), `Figurante`, `Casa`, `Predio`, `Carimbo`, `Selo`, `Etiqueta`, `Proibido`, `Confete`, `LegendaKaraoke`, `gesto`, `acentosDe`, `Flash`, `Contador`, `Barra`, `Mao`, `CtaCartoon`.

Objetos reutilizáveis (promovidos do piloto): `Pasta`, `Cadeado`, `Chave`, `Raio`, `Balao`, `Avatar`, `Check`, `Moedas`, `Escudo`.

Cenas específicas do piloto, para copiar e adaptar de `src/episodes/ATIVO-PILOTO-01/scenes/Scenes.tsx`: mapa com lupa e pino, contrato com checklist, rede de avatares, muro, painel do setor, voo de pastas.

Ao criar objeto novo, siga a seção 8: chapado, 1 tom de sombra, sombra de contato e pop. **Promova ao kit** tudo o que for reutilizável.
