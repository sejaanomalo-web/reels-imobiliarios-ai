> **ARQUIVADO em 23/11/2026 (decisão do cliente).** A esteira de 5 estilos foi substituída pela **rotação de 4 modelos** (1 Cartoon → 2 Pictograma → 3 Planta técnica → 4 Maquete 3D; `python3 PRODUCAO/tools/esteira.py proximo`, regras no `CLAUDE.md` e em `MODELOS_DE_VIDEO.md`). Este guia fica só como referência dos episódios já entregues nos estilos Palitinho, Desenho à mão, Planta técnica v1, Tipografia cinética e Painel. **Não use para episódio novo.**

# Guia — Esteira de 5 estilos visuais ATIVO (regra do cliente, 21/11/2026)

> **Regra:** todo Reel novo segue a esteira **um estilo por vez, em ordem circular contínua** entre roteiros **e** entre lotes:
> **1 Palitinho → 2 Desenho à mão → 3 Planta técnica → 4 Tipografia cinética → 5 Painel → 1 …**
> Fonte de verdade da fila: `PRODUCAO/estilos/esteira.json`. Nunca escolher o estilo "no olho": use `python3 tools/esteira.py proximo`.
> `tools/novo_episodio.py` registra o estilo automaticamente; `editorial_check.py` bloqueia episódio da esteira sem estilo ou com cenas fora do kit.
> Referência visual aprovada: `OUTPUT/pilotos/DEMO_ESTILOS/painel_4_estilos.jpg` (mesmo trecho do NOV26_26 nos estilos 1–4).

## 0. O que NUNCA muda (100% identidade ATIVO)
> **Fonte única desta seção: Sistema Visual ATIVO, Nível 1** (`MARCA/sistema-visual/README.md` + `tokens.json`). A esteira está registrada em `MARCA/sistema-visual/modelos.json` (id `esteira-5-estilos`); o `editorial_check` roda o `sistema_visual_check` em cada episódio. Os itens abaixo resumem o que o Nível 1 já obriga.
- **Cores:** grafite/preto/marinho (atmosferas do Nível 1) + **um único verde**, o `ACENTO` #02FB3F (kit `A`/`aa()` de `src/episodes/NOV26/kit.tsx` = `ACENTO` de `theme.ts`); vermelho `C.warn` só para erro/alerta; nada de amarelo/âmbar (ANÔMALO) nem outros verdes.
- **Tipografia:** Manrope (títulos/fala) + JetBrains Mono (rótulos técnicos). **Logo oficial** no fecho/capa.
- **Voz:** Gemini `gemini-3.8-flash-tts`, Puck, 1,0×, direção do preset, `shapePauses` (respiração e suspense, sem embolar nem arrastar).
- **Ritmo:** dinâmico, cortes no tempo da fala (cues por palavra), transições motivadas, câmera viva (`drift` 6–8, sem quadros parados > 1,5 s; `motion_check` ≥ ~1,3).
- **Som:** trilha + SFX sintetizados (`build_audio.py`), ~25–35 eventos, −15 LUFS.
- **Legenda falada:** componente `Captions` igual em todos (sem `*` colado às aspas). **Título** de cena no topo (top 285). **CTA SISTEMA** final com o componente `Cta` (igual em todos — é a "assinatura" da marca).
- **Apuração, ILUSTRATIVO/HIPOTÉTICO/FICTÍCIO**, legenda do Instagram, capa, publicação e checks: iguais.

## 1. PALITINHO — história com personagens (`src/estilos/palitinho.tsx`)
- **Quando brilha:** histórias e situações do dia a dia (cliente, corretor, equipe), antes/depois, diálogo.
- **Gramática:** personagens de palitinho em traço branco-giz (`GIZ`); o **protagonista/virada em verde**; erro em vermelho. Balões de fala (`Balao`), objetos simples (`Casinha`, `Placa`), chão (`Chao`). Poucos personagens (2–3) e cenas limpas.
- **Movimento-assinatura:** personagens respiram (`t`), andam (`andar`), falam (`fala` anima a boca), mudam de pose no tempo da palavra (`celular`, `acena`, `pensa`, `comemora`, `dorme`, `aponta`, `bracos`). Balões "estouram" (escala) na palavra-chave.
- **Evitar:** cara infantil (nada de cores extras, olhos grandes, cenário cheio); bonecos minúsculos (mín. escala ~0,9).

## 2. DESENHO À MÃO — lousa / sketch (`src/estilos/lousa.tsx`)
- **Quando brilha:** conceitos, explicações, passo a passo, checklist, "professor explicando".
- **Gramática:** fundo `FundoLousa`; desenhos em giz trêmulo (`Traco` + caminhos `casa`, `predio`, `celular`, `relogio`, `seta`, `circulo`, `sublinha`, `caixa`, `check`, `xis`); texto à mão (`Giz`, levemente rotacionado). Verde = marcador (sublinhar/circular o que importa); vermelho = riscar o erro.
- **Movimento-assinatura:** **o traço se desenha na hora da fala** (`p` de 0→1 por cue), texto "escrito" letra a letra, seta que liga causa → efeito.
- **Evitar:** encher a lousa (máx. ~3 desenhos por quadro; apague/esmaeça o anterior).

## 3. PLANTA TÉCNICA — blueprint (`src/estilos/planta.tsx`, v2 de 23/11/2026)
> **Este estilo é também o Terceiro modelo.** O manual completo (regras, grade, montagem, kit, QA) está em `.claude/skills/terceiro-modelo-planta-tecnica/SKILL.md`. Leia a skill antes de produzir um episódio no estilo 3.
- **Quando brilha:** processos, fluxos, estrutura, frentes de negócio, crescimento ("o atendimento como um projeto").
- **Gramática (v2):** `FundoPlanta` (prancha marinho, grade neutra, uma luz), `Contorno` (linha dupla), **cômodo = etapa** (`Comodo`, linha branca; verde só com `acende`), **cota = medida/tempo** (`Cota`/`CotaV`), **chamada** (`Chamada`: vermelha = falha), **porta**, **rota**, **elevação = crescimento** (`Elevacao`, nunca gráfico de barras), **carimbo** técnico (sempre ILUSTRATIVO).
- **Movimento-assinatura:** paredes que se traçam na palavra; o cômodo acende; a folha nova nasce do cômodo em que a câmera **mergulha** (`mergulho`).
- **Fecho na esteira:** o `Cta` comum aos 5 estilos (regra de 21/11). O `CtaPlanta` é o fecho do modelo fora da esteira.
- **Evitar:** fundo ou grade verdes (era o v1), tudo verde, planta de imóvel real com medidas reais, moldura vazia esperando a fala, texto de 24 px em frase.

## 4. TIPOGRAFIA CINÉTICA (`src/estilos/tipografia.tsx`)
- **Quando brilha:** mitos x verdades, números fortes, frases de efeito, manchetes, listas curtas.
- **Gramática:** a palavra é a imagem — `Palavra` (blocos grandes, entrada por direção: baixo/esq/dir/zoom), `Contorno` gigante ao fundo, `Barra` que varre, `Risco` vermelho para negar. Uma palavra-chave em verde por quadro.
- **Movimento-assinatura:** cada palavra entra no tempo exato em que é dita; trocas rápidas de composição a cada frase; contraste de tamanhos (420 / 150 / 90 px).
- **Evitar:** duplicar a legenda (título/blocos = **resumo** da fala, não transcrição); mais de ~8 palavras na tela ao mesmo tempo.

## 5. PAINEL — padrão atual (`src/episodes/NOV26/kit.tsx`)
- **Quando brilha:** notícias com dados, índices, comparações, interfaces ilustrativas, mapas.
- **Gramática/movimento:** o que foi aprovado no lote NOV26 (cartões, tags, gráficos, celulares, mapas), sem kits dos estilos 1–4.

## 6. Fluxo de produção (igual ao lote NOV26, com 1 passo a mais)
0. **Plano visível:** crie no painel "Plano" as 12 etapas do modelo A de `PROMPTS/PLANO_DE_ETAPAS_ATIVO.md` com o ID do episódio no título; atualize a cada etapa.
1. `python3 tools/esteira.py proximo` → saber o estilo do próximo roteiro.
2. Ler roteiro, apurar, montar `mkNN.py` com `tools/novo_episodio.py` (registra o estilo).
3. Vozes A/B (C só se ambas erram) → `build_narration.py --source`.
4. `Scenes.tsx` **com o kit do estilo** (copiar a estrutura Hook/Take1/Take2/Take3 do episódio anterior do MESMO estilo, se existir, e trocar o conteúdo); `Episode.tsx` (mood, Sequences, `Cta`), `Cover.tsx` (capa no mesmo estilo), Root.
5. `editorial_check` → stills/folhas de revisão → `build_audio` → `render_episode.sh` (11/11) → `motion_check`.
6. Legenda Instagram + `legenda_check` → QA (registrar o estilo) → `publicar.py <EP> --quando "AAAA-MM-DD HH:MM"` → commit/push **main** → conferir a Action (horário) → enviar arquivos ao cliente.

## 7. Capa por estilo
Mesma estrutura (tag no topo, título grande, subtítulo, logo em 1420), com a "pele" do estilo: palitinho (cena mínima com 2 bonecos), lousa (desenho de giz + título à mão), planta (prancha + carimbo), tipografia (palavra gigante + contorno), painel (atual).
