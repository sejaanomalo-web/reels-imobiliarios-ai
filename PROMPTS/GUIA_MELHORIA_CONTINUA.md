# Guia de melhoria contínua

> ## Identidade e processo editorial — 13/11/2026 (vale para todo material novo)
>
> - **Marca ATIVO aprovada:** logo oficial (`MARCA/logo/`, render `PRODUCAO/public/brand/ativo_logo.png`) e verde **`#3AF584`**. Regras: `MARCA/DIRETRIZ_IDENTIDADE_VISUAL_ATIVO.md`. No código, use `BRAND` / `brandAlpha()` de `PRODUCAO/src/theme.ts`; nunca escreva o RGB do verde à mão. `#35E0A1`/`rgba(53,224,161,…)` foram o verde-água do piloto e saíram do código em 13/11/2026 (OUTPUT/ histórico não foi re-renderizado).
> - **Guia editorial:** `PROMPTS/GUIA_EDITORIAL_GANCHOS_RETENCAO_CTAS_ATIVO.md`. Antes de roteirizar, registrar o diagnóstico do episódio (público e situação, motivação, crença, hipótese, função C1–C5, promessa, evidências, CTA e destino). CTA é **por episódio** — não padronizar em lote nem alterar CTAs já aprovadas.
> - **Verde dos vídeos — exatamente `#3AF584` (decisão do cliente, 14/11/2026, para os próximos).** **Verde exato dos vídeos: `#3AF584` (RGB 58, 245, 132)** — único verde de destaque (texto, palavra-chave da legenda, linha, ícone, botão, glow via `brandAlpha`). "Verde luminoso"/"verde" nos roteiros = `#3AF584`. Nenhum outro verde, nem tom "parecido" (ex.: `#35E0A1`, `#00FA44`, `#1D7A42`, `#CEFCE0`). Únicos derivados permitidos, só como apoio: `BRAND.ink` `#092614` (texto sobre o verde) e `BRAND.deep` `#0E3A1F` (fundo escuro esverdeado). No código, sempre `BRAND`/`brandAlpha` de `PRODUCAO/src/theme.ts`. `editorial_check.py` recusa qualquer outro verde em episódio novo e o render para (14/11/2026; episódios entregues não são refeitos).
> - **CTA dos Reels — SEMPRE comentário SISTEMA → Direct (decisão do cliente, 14/11/2026, a partir do ATIVO EP04).** Fala final: "Quer conhecer um sistema personalizado para organizar seus imóveis, leads e atendimentos? Comente SISTEMA que eu te envio os detalhes pelo Direct."; tela COMENTE "SISTEMA" + "Receba os detalhes no Direct."; `pronunciation` para falar "sistema" em minúsculas. A CTA original do roteiro (salvar/compartilhar/comentar) vira frase de transição adaptada. Episódios já entregues não são refeitos (ATIVO EP03 mantido).
> - **Checagem automática:** `python3 PRODUCAO/tools/editorial_check.py <EP>` aponta CTA/destino ausente, promessas não comprovadas ("garantido", "triplicar", "em X dias", depoimento), fonte pequena para 40+, verde divergente, interface ilustrativa sem rótulo e texto fora da área segura. Revisar o que ele apontar antes do render.
> - **Processo comercial real:** call de diagnóstico → definição → desenvolvimento do sistema personalizado. Não dizer que o sistema é "apresentado/demonstrado" antes de existir.
> - **Exceção registrada:** vídeo da landing (`LP-ATIVO-V3`): 1,1× e transcrição completa na tela por pedido do cliente (13/11/2026). Não generalizar para Reels/Stories, que seguem 1,0× e destaque de 3–8 palavras.

> ## ⚠️ DECISÃO VIGENTE — 11/11/2026, a partir do EP015 (prevalece sobre tudo abaixo)
>
> **Narração em velocidade normal (1,0×) com a identidade vocal original aprovada.**
>
> - Voz: exatamente `VOZ/voice_preset.json` — Gemini `gemini-3.8-flash-tts`, voz **Puck**, com a direção do preset ("Tom de conversa entre colegas corretores de imóveis: brasileiro, próximo, seguro e natural. Ritmo ágil, sem correria, com pausas curtas entre as ideias. Nunca locutor de comercial."). Referência de escuta: `OUTPUT/VOICE_AUDITIONS/audicao_gemini_Puck_EP001.wav`.
> - **Não** usar no `episode.json`: bloco `voice` com direção própria, `tightenPauses`, `targetWpm` ou `maxStretch`. Nenhum time-stretch, nenhuma aceleração, nenhum ajuste que altere o timbre. Ritmo esperado ≈ 150–170 palavras/min, com pausas naturais.
> - **Não** usar modelo substituto (nem outra voz, nem a mesma voz em outro modelo) sem autorização do cliente. Se a cota do modelo aprovado acabar, esperar a cota voltar.
> - Imagem e som: padrão equilibrado dos primeiros episódios. A câmera virtual continua, com movimentos intencionais e deriva suave (`drift={0.5}`); legenda original (`Captions`); trilha discreta sem bateria (`music.prog` com densidade ≤ 2, sem `drums` e sem `drops`); efeitos ~2 dB mais baixos que no padrão v2 e sem whips de corte rápido. O tempo de cenas, legendas e efeitos sai da narração real (marcas por palavra).
> - Referência de calibração (EP015 V2, medida no vídeo final): voz a 148 palavras/min, 14% do tempo em pausa; movimento médio 2,5 (EP001: 2,0; padrão v2: 3,6); maior trecho parado 0,9 s. Se uma cena ficar ~3 s sem ação no ritmo normal, acrescentar microanimação coerente com a cena (ex.: horário e "✓✓ lida" na bolha do EP015 V2), nunca acelerar a voz.
> - Efeitos nunca sobre sílabas: depois de mixar, transcrever a mixagem e comparar com a voz isolada; se uma palavra some só na mixagem, deslocar o efeito para depois dela (no EP015 V2: "Você" e "sexta").
> - O modelo aprovado pode ler a direção do preset em voz alta (aconteceu nas 4 tomadas do EP015 V2). Conferir a transcrição: se houver trecho intruso, removê-lo por edição nos silêncios naturais, guardar a tomada bruta e registrar em `episodes/EP###/narration_edit.json`. Não alterar a direção do preset sem aprovação.
> - O modelo aprovado lê a direção em voz alta com frequência (EP015 V2: 4 de 4 tomadas; EP016: 2 de 3). Gerar 3 tomadas por episódio e preferir uma tomada limpa a uma editada.
>
> ### Registro do EP016 (11/11/2026)
>
> - **Voz oficial:** o preset original aprovado (`VOZ/voice_preset.json`, Gemini `gemini-3.8-flash-tts`, voz Puck, direção original). **Velocidade padrão: 1,0×.** Se não for possível identificar o preset com segurança, avisar o cliente antes de trocar a identidade vocal.
> - **Identidade audiovisual:** o padrão inicial aprovado (itens acima).
> - **CTA do EP016:** exclusivamente por comentário, palavra-chave única **SISTEMA**, direcionando para o **Direct do Instagram**. Texto-base: "Quer conhecer um sistema personalizado para organizar seus imóveis, leads e atendimentos? Comente SISTEMA que eu te envio os detalhes pelo Direct." Na tela: **COMENTE "SISTEMA"** + "Receba os detalhes no Direct.". Sem link na bio, sem botões externos, sem prometer material grátis, teste ou demonstração automática; campo de comentário genérico, sem simular perfil ou comentário de pessoa real. Só a frase de transição anterior à CTA é adaptada ao roteiro.
> - **Escopo:** essa CTA vale para o EP016 e para episódios futuros **somente quando o cliente pedir expressamente**. Não substituir globalmente as CTAs dos 60 roteiros; o padrão do livro (link da bio) continua onde não houver pedido.
> - Como configurar: bloco `cta` no `episode.json` (tipo `comentario`, `keyword`, `channel`, `original_bio_cta`, `transition_adapted`, `base_text`) e `pronunciation` por episódio para a palavra-chave ser falada em minúsculas ("sistema"), sem soletrar.
> ### Registro do EP017 (11/11/2026)
>
> - **Voz oficial:** preset original aprovado. **Velocidade padrão: 1,0×.** **Identidade audiovisual:** padrão inicial aprovado.
> - **CTA do EP017:** exclusivamente por comentário, palavra-chave **SISTEMA**, com envio das informações pelo **Instagram Direct** (mesmo texto-base e mesmo fecho visual do EP016). Transição adaptada: "Essas pistas só ajudam se ficarem registradas na jornada de cada cliente."
> - **Escopo:** EP016 e EP017. Nos demais episódios, só quando o cliente pedir expressamente; não substituir as CTAs dos 60 roteiros.
> - Voz: tomada A a 164 palavras/min, nenhuma tomada leu a direção desta vez. O modelo tende a falar imperativos na forma coloquial ("pergunta", "registra", "comenta"); a legenda mantém o texto aprovado.
>
> ### Registro do EP018 (11/11/2026)
>
> - **Episódio:** EP018. **Voz oficial:** preset original aprovado. **Velocidade:** 1,0×. **Identidade audiovisual:** padrão inicial aprovado.
> - **CTA:** comentário com a palavra-chave **SISTEMA**; envio das informações pelo **Instagram Direct**. Transição adaptada: "Escolher com critério fica mais fácil quando as prioridades de cada cliente estão registradas."
> - **Escopo:** EP016, EP017 e EP018. Demais episódios só quando pedido expressamente; as outras regras do Prompt Mestre continuam valendo.
> - Aprendizados: (1) o Parakeet escreve números por extenso como dígitos ("vinte" → "2") — conferir números com o Whisper antes de suspeitar da voz; (2) série de efeitos sincronizada a uma fala (pins caindo durante "vinte endereços") cobre sílabas — efeitos de série só em trechos sem fala ou bem abaixo da voz (≤ −31 dB); (3) contador animado no 1º quadro precisa começar num número que concorde com o texto ("3 LINKS", nunca "1 LINKS").
>
> ### Registro do EP019 (11/11/2026)
>
> - **Episódio:** EP019. **Voz:** identidade vocal original aprovada. **Velocidade:** 1,0×. **Visual:** padrão inicial aprovado.
> - **CTA:** comentário com a palavra-chave **SISTEMA**; destino: envio dos detalhes pelo **Direct**. Transição: "Se a sua rotina tem muitos atendimentos assim, vale ter esse histórico organizado."
> - **Escopo:** EP016–EP019. Demais episódios só quando pedido expressamente.
> - Voz: nenhuma das 3 tomadas saiu limpa (uma trocou o gancho, duas leram a direção). Usada a tomada A com corte nos silêncios (6,0 s, registro em `episodes/EP019/narration_edit.json`). Erro 429 isolado é limite por minuto, não cota diária: esperar um minuto e tentar de novo.
> - Variação: o caminho até o fecho da CTA muda conforme o tema (EP019 dobra no módulo ATENDIMENTOS); o fecho COMENTE "SISTEMA" fica igual como assinatura.
>
> ### Registro do EP020 (12/11/2026)
>
> - **Episódio:** EP020. **Voz:** identidade vocal original aprovada. **Velocidade:** 1,0×. **Direção visual:** padrão inicial aprovado.
> - **CTA:** comentário com a palavra-chave **SISTEMA**; destino: envio de informações pelo **Instagram Direct**. Transição: "Para decidir isso, ajuda ter os critérios de cada comprador ao lado da agenda."
> - **Escopo:** EP016–EP020. Demais episódios só quando pedido expressamente; presets e Prompt Mestre preservados.
> - Aprendizados: (1) cota esgotada (erro com `GenerateRequestsPerDayPerProjectPerModel-FreeTier`) → esperar a renovação (~08:00 UTC), nunca trocar de voz; dá para adiantar cenas com uma linha do tempo provisória e trocar pela real depois; (2) o AAC pode subir o pico verdadeiro acima de −1 dBTP — quando a validação falhar, usar `"master": {"tp": -2.0}` no `episode.json`; (3) efeito de entrada de cena não pode cair na primeira palavra da cena (antecipar para a pausa).
>
> ### Registro do EP030 (12/11/2026)
>
> - **Episódio:** EP030. **Voz:** identidade vocal original aprovada. **Velocidade:** 1,0×. **Direção visual:** padrão aprovado da ATIVO (sistema visual dos episódios aprovados; o kit oficial da ATIVO ainda não está no repositório — sem logo nem símbolo desenhado).
> - **CTA:** comentário com a palavra-chave **SISTEMA**; destino: envio dos detalhes pelo **Instagram Direct**. Transição: "Essa revisão fica mais fácil quando a carteira inteira está organizada."
> - **Escopo:** EP016–EP020 e EP030. Demais episódios só quando pedido expressamente.
> - **Posicionamento:** a ATIVO é primeiro uma página de conteúdo; o sistema só aparece depois do insight.
> - Aprendizados: (1) quando o roteiro pede "energia", escolher entre as tomadas limpas a de maior variação de entonação e menos pausa, sem acelerar; (2) roteiros de método (quadro, checklist) tendem a ficar parados — medir o movimento antes de entregar e manter a câmera em aproximação lenta durante listas; (3) painéis sobre fichas animadas precisam de camada própria (`zIndex`).
>
> ### Registro do EP031 (12/11/2026)
>
> - **Episódio:** EP031. **Voz:** preset original aprovado, **1,0×**. **Visual:** padrão aprovado da ATIVO — **sem o símbolo** ("A" branco + seta verde com brilho), que não está no repositório nem no Drive conectado; não recriar por aproximação.
> - **CTA:** comentário com a palavra-chave **SISTEMA**; envio dos detalhes pelo **Instagram Direct**. Transição: "Esse fluxo funciona melhor quando cada oportunidade tem dono e histórico registrados."
> - **Escopo:** EP016–EP020, EP030 e EP031. Demais episódios só quando pedido expressamente.
> - Aprendizados: (1) quando o modelo lê a direção e **repete o gancho logo depois**, a segunda leitura costuma estar limpa — cortar só o início do arquivo (sem emenda no meio da fala) é a edição mais segura; (2) juntar tensão e insight no mesmo quadro (campos vazios que depois se preenchem) deu o melhor movimento da série (2,17) sem acelerar nada.
>
> ### Registro do EP032 (12/11/2026)
>
> - **Configuração usada:** preset original (Gemini `gemini-3.8-flash-tts`, Puck, direção original), **1,0×**, tomada única sem edição; padrão visual aprovado da ATIVO **sem o símbolo** (não está no repositório); CTA de comentário **SISTEMA** → **Direct**, transição "Essa clareza depende de cada lead ter seu histórico registrado."
> - **Aprendizado:** gancho + situação num quadro e tensão + insight num painel de colunas (linhas vazias que o gestor depois apoia) mantém progressão sem cortes; câmera com aproximação ≤ 1,04 em tabelas largas — acima disso corta as bordas.
>
> ### Registro do EP033 (13/11/2026)
>
> - **Configuração usada:** preset original (Gemini, Puck, direção original), **1,0×**, tomada A sem edição; padrão visual aprovado da ATIVO **sem o símbolo** (fora do repositório); CTA de comentário **SISTEMA** → **Direct**, transição "Com o processo documentado, fica mais fácil escolher a ferramenta que se adapta a ele."
> - **Aprendizados:** (1) cenas adiantadas com linha do tempo provisória precisam de nova revisão com a voz real — o fim do insight encolheu e um texto ficaria 0,2 s na tela; (2) diagramas de linhas finas e avatares parados medem pouco movimento (1,36) mesmo "bonitos": dar fluxo aos fios, respiração aos avatares e objetos atravessando a cena resolveu (1,78) sem acelerar; (3) quando não há pausa antes da CTA, o whoosh de entrada precisa ser baixo (≤ −27 dB) e colado à palavra.
> - **Pendente de decisão do cliente:** avaliação de formato (híbrido com rosto real; texto ≥ ~34 px para o público 40+).
>
> ### Registro do ATIVO Episódio 01 (13/11/2026)
>
> - **Configuração usada:** roteiro novo enviado pelo cliente (`ROTEIROS/ATIVO_EP01.md`), narrado integralmente; preset original 1,0×, tomada C sem edição; composição `EP-ATIVO01`, saída `OUTPUT/ATIVO_EP01/`. **CTA do próprio roteiro** (relacionamento: "Conta nos comentários" / QUAL É O SEU FOCO?) — não a CTA SISTEMA. Sem logo (arquivo ausente).
> - **Aprendizados:** (1) gancho com mapa estático mede ~0,5 de movimento — a cidade precisa estar viva desde o quadro 0 (tráfego, pinos pulsando, câmera descendo); (2) carimbo que entra depois da fala e sai no corte nunca é lido: o impacto visual deve cair junto da palavra; (3) zoom de câmera ≥1,15 com rotação empurra cartões da margem esquerda para fora; (4) roteiro de 199 palavras = 77 s na voz oficial — acima do ideal para Reels; sinalizar ao cliente antes de produzir os próximos.
>
> ### Registro do ATIVO Episódio 02 (13/11/2026)
>
> - **Configuração usada:** roteiro do cliente (`ROTEIROS/ATIVO_EP02.md`) palavra por palavra, exceto o fecho: "Salve este Reel e" saiu e entrou a CTA de comentário SISTEMA → Direct (pedido do cliente). Preset original 1,0×, tomada C sem edição; composição `EP-ATIVO02`, saída `OUTPUT/ATIVO_EP02/`. Sem logo.
> - **Aprendizados:** (1) um objeto-âncora repetido (o celular "gravando" cada abertura + régua ABERTURA n/5) organiza listas de 5 itens sem virar slide; (2) o conteúdo do celular deve entrar com o cabeçalho, senão sobra tela vazia de 1–3 s por abertura; (3) linha SVG com `strokeLinecap="round"` e comprimento 0 desenha um ponto — esconder até começar; (4) 229 palavras = 84 s mesmo a 169 palavras/min: o limite de duração precisa estar no roteiro, não na edição.
>
> ### Registro do ATIVO Episódio 03 (14/11/2026)
>
> - **Configuração usada:** roteiro do cliente (`ROTEIROS/ATIVO_EP03.md`) palavra por palavra; **CTA do próprio roteiro** (compartilhamento); preset original 1,0×, tomada B sem edição; composição `EP-ATIVO03`, saída `OUTPUT/ATIVO_EP03/`. Primeiro Reel da série com **logo oficial** (só no fecho) e diagnóstico editorial registrado no `episode.json`.
> - **Aprendizados:** (1) tomada que omite uma negação ("não avança") inverte o sentido — conferir negações na transcrição antes de escolher; (2) Parakeet e Whisper divergem em artigos ("um"/"o"): cruzar os dois antes de descartar tomada; (3) frases motivacionais entrando desde 0,5 s tiram o gancho do "só despertador" nos 3 primeiros segundos; (4) pilha bagunçada que depois se alinha numa agenda dá a virada "desacelera e organiza" sem corte.
>
> ### Registro do ATIVO Episódio 04 (14/11/2026)
>
> - **Configuração usada:** roteiro do cliente (`ROTEIROS/ATIVO_EP04.md`); **primeiro episódio sob a regra "CTA sempre SISTEMA"** — a CTA de salvamento virou transição. Preset original 1,0×, tomada única sem edição; logo oficial no fecho; composição `EP-ATIVO04`, saída `OUTPUT/ATIVO_EP04/`.
> - **Aprendizados:** (1) o "pop" de entrada de um título caiu sobre um artigo ("com **a** sua") — a comparação voz × mixagem pegou; efeito de título entra depois da palavra-chave, não antes; (2) régua "PERGUNTA n DE 4" segura lista de perguntas sem virar slide; (3) título e conteúdo da pergunta devem entrar logo após "Primeiro:/Segundo:", não na palavra-chave seguinte — senão sobra ~1 s só com a régua; (4) o gerador de tomadas (scratchpad) precisa aplicar `pronunciation` antes da síntese (aqui a voz já falou "sistema" corretamente sem isso).
>
> ### Criativos de anúncio Meta Ads (AD-*) — padrão a partir de 15/11/2026
>
> - **Objetivo:** clique no botão do anúncio → formulário/landing. **CTA = botão** (`cta.type: "botao_meta"`, fala "Clique no botão…", tela CLIQUE NO BOTÃO + seta para baixo). A regra "CTA SISTEMA" vale só para Reels orgânicos; `editorial_check` aplica a regra certa pelo prefixo `AD-`.
> - **Área útil:** conteúdo e texto entre y 270 e y 1250 (botão/legenda da Meta cobrem ~35% de baixo; fontes de terceiros — conferir no preview do Gerenciador). Legenda queimada em y≈1185 (`<Captions y={1185} size={58} />`); a última frase pode ficar só na tipografia (`hideCaptions`). Títulos **fora** da câmera virtual.
> - **Gancho:** situação concreta já no quadro 0, título na tela desde o 1º quadro (assistem sem som), sem abertura de marca; logo só na solução/CTA.
> - **Movimento:** anúncio pede mais energia que o orgânico — meta ≥ 1,3 e nenhum trecho parado > 1 s, inclusive na CTA (objeto principal sempre balançando/flutuando, ondas no botão).
> - **Saída:** `OUTPUT/ADS/AD-###/`, composição na pasta ADS-META do Root. Duração alvo 20–40 s.
> - **AD-ATIVO-01 v1 (15/11):** 41,4 s, 1,0×, movimento 1,40 — **reprovado pelo cliente: "precisa ser muito mais dinâmico".**
> - **Padrão de edição de anúncio (v2, pedido do cliente 15/11/2026) — usar em todos os AD-*:**
>   - Voz **1,1×** (`ffmpeg atempo=1.1` sobre a tomada aprovada; tom preservado; `voiceSpeed` no episode.json). Sem nova geração.
>   - **Texto na tela = a fala** (`AD-ATIVO-01/scenes/KText.tsx`): blocos dos "|" do roteiro, palavra a palavra, 84 px caixa alta, faixa y ≈ 935–1240; palavras `*marcadas*` em vermelho no problema e verde na solução; some antes do botão da CTA.
>   - **Palco recortado** y 270–910 com câmera própria de **cortes** (zoom de impacto a cada bloco/beat, transição de 0,14 s com motion blur), **tremida** e **flash** nos impactos, corte seco para o preto antes da solução.
>   - **Quadro 0 forte**: carimbo/elemento grande já visível (ex.: SEM RESPOSTA + contador de dias rodando) — a fala começa em 0,3 s (`leadIn`) para o impacto sonoro não cobrir a 1ª palavra.
>   - **SFX em toda troca** (cues `k00…` gerados dos blocos: swish/tick −31 a −34 dB, 70 ms antes) + impactos nos beats + séries (notificações, dias) + bateria leve (`music.drums`, bpm 112) com `drops` no respiro antes da solução. Conferir voz × mixagem: v2 com 78 eventos manteve 110/110 palavras.
>   - Medido no AD-ATIVO-01 v2: 38,1 s, **movimento 3,15** (v1 1,40), 7% quadros parados, maior trecho parado 0,3 s.
>   - **Cortes de verdade:** usar `buildCuts` (`AD-ATIVO-01/scenes/cuts.ts`): `cut: true` segura o enquadramento anterior (com 2,5% de avanço) e salta em 0,14 s. Sem isso a "câmera de cortes" desliza desde o ponto anterior (erro do AD-01 v2 corrigido em 15/11).
>   - Elementos de palco (carimbos, títulos internos) a ≥ 120 px da borda do palco: zoom de corte de 1,2× empurra o que está perto da borda para fora.
>   - **AD-ATIVO-02 "Só um minutinho" (15/11):** cronômetro do "minutinho" como fio condutor (corre durante a busca e congela no "único lugar"); 38,4 s, movimento 3,33, maior trecho parado 0,5 s, mix 117/117.
>
> ### Registro do ATIVO Episódio 05 (15/11/2026)
>
> - **Configuração usada:** roteiro do cliente (`ROTEIROS/ATIVO_EP05.md`); CTA SISTEMA (compartilhamento → transição adaptada); verde exato `#3AF584` (checado no render); preset original 1,0×, tomada A sem edição; composição `EP-ATIVO05`, saída `OUTPUT/ATIVO_EP05/`. Cenas preparadas na véspera com linha do tempo provisória (`tools/provisional_timeline.py`) e voz gerada na renovação da cota (`tools/gen_take.py`).
> - **Aprendizados:** (1) escolher tomada por fidelidade ao texto, não por duração: a mais curta tinha "se surgiu" (erro audível confirmado pelos dois reconhecedores); (2) palavra com hífen quebrava o alinhamento legenda × voz — corrigido no `build_narration.py`; (3) cena de "rede" (dois avatares + linha) mede pouco movimento parada: pulsos correndo pela linha e avatares respirando subiram o gancho de ~0,6 para ~1,2; (4) roteiros de ~210 palavras passam de 80 s a 1,0× — avisar o cliente antes de produzir.
>
> ### Registro do vídeo da landing ATIVO 16:9 (13/11/2026)
>
> - **Configuração usada:** composição `LP-ATIVO` (1920×1080), narração corrida do briefing completa, preset aprovado 1,0×, tomada única; trilha original por blocos A–H em `tools/build_music_lp.py` (ligada ao mix por `music.file`); marca e telas provisórias (`kit.tsx`).
> - **Aprendizados:** (1) para 16:9 a câmera e o fundo precisam de origem própria (960×540) — os componentes 9:16 não servem; (2) trilha amarrada às palavras (cues) permite silêncios e impactos exatos sem editar à mão; (3) cenas de texto sobre fundo escurecido viram "quadro parado" — manter os elementos de trás se mexendo; (4) legendas para player web precisam de blocos curtos, não frases inteiras; (5) ferramentas com ID fixo "EP…" podem sobrescrever outro episódio — conferir `git status` depois de cada montagem.
>
> ### Registro do vídeo da landing ATIVO v2 (13/11/2026)
>
> - **Exceção à decisão de 1,0×:** só para o vídeo da landing, o cliente pediu voz **1,2×** (ffmpeg atempo, tom preservado) e no máximo 90 s. A série de Reels continua a 1,0×.
> - **Aprendizados (feedback do cliente + referência validada):** (1) o texto grande precisa ser a **transcrição da fala**, não um resumo — frase na tela que diverge da voz é lida como erro; (2) transcrição em blocos de 2–4 palavras, palavra a palavra, destaque nas palavras-chave, faixa fixa; (3) gancho precisa de cena concreta de perda (hora, nome, consequência) — conceito abstrato prende menos; (4) telas do produto com ação interna convencem mais que ilustração; (5) dinamismo medido: v1 1,23 → v2 2,39 de movimento médio.
>
> - As seções "Padrão v2" abaixo ficam **só como histórico**. Os itens de voz delas (aceleração, encurtamento de pausas, time-stretch, direção energética) estão **revogados**. Os itens visuais valem apenas na forma suavizada descrita acima.

Registro do que **efetivamente** melhorou os Reels, para aplicar automaticamente nos próximos episódios. Cada item diz como foi medido, para o próximo ajuste poder ser comparado. O Claude Code deve ler este arquivo junto com o `CLAUDE.md` antes de produzir qualquer episódio.

Status: o padrão v2 foi **substituído pela decisão vigente acima** (11/11/2026); o que segue é histórico. Até a aprovação, os presets globais (`VOZ/voice_preset.json`, `src/theme.ts`) ficam intactos, e o padrão v2 vive no `episode.json` de cada episódio.

## Linha de base (EP001–EP002, padrão v1)

| Métrica | EP001 | EP002 |
|---|---|---|
| Palavras/min | 167 | 148 |
| Tempo em pausa | 18,6% | 16,6% |
| Maior pausa | 0,83 s | 0,71 s |
| Movimento médio (motion_check) | 1,98 | 1,49 |
| Quadros parados | 53% | 62% |
| Maior trecho parado | 1,5 s | 2,4 s |

Crítica do cliente: narração calma demais, pouca variação, cenas paradas, transições fracas, "cara de apresentação".

## Padrão v2 (EP003)

### Voz

| Ajuste | Como aplicar | Efeito medido no EP003 |
|---|---|---|
| Direção de energia por parágrafo (gancho provocativo, problema com tensão, insight com virada, CTA confiante) e pedido explícito de ritmo | `episode.json` → `voice.direction`. Partir do texto da tomada B do EP003 (`episodes/EP003/voice_takes.json`) | Tomada nativa a 198 palavras/min (1,26×) |
| Encurtar só as pausas longas | `voice.tightenPauses: {"min": 0.16, "max": 0.24}` | Pausas de 17–19% para 7,4%; maior pausa de 0,8 s para 0,24 s |
| Completar a velocidade com time-stretch leve, tom e formantes preservados | `voice.targetWpm: [200, 240]`; `voice.maxStretch` (padrão 1,12×; EP015 usou 1,18×) | EP003: 198 → 220 com 1,066×. EP015: 168 → 205 com 1,18× (tomada veio mais lenta). Acima de ~1,2× evitar: preferir gerar outra tomada |
| Gerar 2+ tomadas e escolher por métrica + escuta | `tools/voice_takes.py EP### A B …` → `OUTPUT/<EP>/audio/tomadas_metricas.json` | Permitiu descartar a tomada do modelo irmão, que perdia palavras |
| Direção com o papel emocional de **cada parágrafo** e as palavras a enfatizar (EP015) | `voice.direction` do EP015 | Variação de entonação de 6,6 semitons, a maior da série (EP003: 5,6). Sinal de que a direção específica por roteiro ajuda, mas o EP015 usou o modelo de rascunho, então a comparação não é limpa |

Meta para os próximos: 200–240 palavras/min, pausas ≤ 10%, maior pausa ≤ 0,3 s, texto reconhecido ≥ 95%, desvio de entonação ≥ 6 semitons. Escrever a direção de voz para cada roteiro (papel de cada parágrafo + palavras a enfatizar), não copiar a do episódio anterior. Conferir de ouvido as trocas apontadas pelos reconhecedores.

### Imagem

| Ajuste | Como aplicar | Efeito medido |
|---|---|---|
| Câmera virtual em todas as cenas, com keyframes presos às palavras (zoom, lateral, giro, inclinação 3D) e desfoque proporcional à velocidade | `src/components/Camera.tsx`; uma lista `keys` por cena usando `c.<marca>` | Movimento médio 3,73 (≈ 2–2,5×) |
| Nada parado por mais de ~0,5 s: deriva contínua da câmera + microanimações | `Camera` com `drift` padrão; animar algo a cada marca | Quadros parados 12%; maior trecho parado 0,3 s |
| Elemento mais forte já no primeiro quadro, sem animação de entrada lenta | Abrir a cena 1 com o objeto principal visível e em movimento em t=0 | Os 2 primeiros segundos estão entre os de maior movimento |
| Fio condutor: os mesmos personagens/objetos atravessam todas as cenas e se transformam | Um `people.ts` (ou equivalente) por episódio; a cena seguinte nasce dos elementos da anterior | Transições sem corte; sensação de progressão |
| Tipografia cinética só para a palavra-chave da virada | Ex.: "ERRO:", "ETAPA + PRAZO" | — (qualitativo) |
| Respiro antes da revelação: imagem escurece e a trilha some por ~0,4 s | `music.drops` + overlay de 0,4 s | — (qualitativo) |
| Uma marca de animação a cada ~1 s de fala | `cues` no `episode.json` | 28 marcas em 25 s |

### Legendas

| Ajuste | Como aplicar |
|---|---|
| Blocos de 1–4 palavras; palavra aparece no instante em que é dita; sublinhado na palavra falada; base escura translúcida | `CaptionsPunch` (`src/components/Captions.tsx`); quebras com `\|` no `caption` de cada segmento |

### Som

| Ajuste | Como aplicar | Efeito medido |
|---|---|---|
| Trilha com bateria (bumbo e chimbal) que muda por seção e some na virada | `music.drums`, `music.drops`, `music.prog` | Inteligibilidade 94,6% → 92,5% na mixagem: a trilha não mascara a fala |
| Biblioteca de efeitos v2: `notif`, `ring`, `impact`, `whip`, `alert`, `shuffle` | `sfx` no `episode.json` | — |
| Efeito sempre preso a um movimento visível (whip ↔ corte de câmera, impacto ↔ carimbo) | Usar as mesmas marcas da câmera | Atraso 0 ms |

### Processo

1. Gerar as tomadas de voz → escolher → `build_narration` → definir `cues` sobre os tempos reais.
2. Revisar quadros a cada ~0,5 s **antes** do render final e corrigir cortes e sobreposições (no EP003 foram 5 correções).
3. Depois do render, rodar `tools/motion_check.py` e comparar com a tabela acima; conferir inteligibilidade da mixagem.
4. Registrar aqui o que mudou e o efeito medido.

## Pendências que limitam a qualidade

- **Cota do Gemini (plano gratuito: 10 gerações por dia por modelo).** Impede gerar várias tomadas e refazer trechos no mesmo dia. Ativar cobrança resolve.
- **Duração:** com ritmo 1,4×, roteiros de ~90 palavras viram vídeos de ~27 s. Se a meta for 40 s+, os roteiros precisam de mais texto.
- **Variação de entonação** sem ganho medido (ver acima).

## Histórico

| Data | Episódio | Mudança | Aprovado? |
|---|---|---|---|
| 2026-11-11 | EP003 | Padrão v2: voz rápida com direção por parágrafo, câmera virtual, legenda dinâmica, trilha com bateria | Aguardando o cliente |
| 2026-11-11 | EP015 (V1) | Padrão v2 aplicado a outra metáfora (fio da conversa); direção de voz escrita para o roteiro; régua de movimento mantida (3,61; 0,4 s parado) | **Reprovado** pelo cliente: voz acelerada |
| 2026-11-11 | EP015 (V2) | Volta à voz original 1,0× (preset aprovado) e ao padrão audiovisual inicial, com câmera intencional suavizada. Resultado: 148 palavras/min, 39,1 s, movimento 2,5, maior trecho parado 0,9 s | Decisão do cliente; vigente |
| 2026-11-11 | EP016 | Padrão original 1,0× + CTA de comentário (SISTEMA → Direct), só neste episódio. Tomada C limpa, 180 palavras/min nativos, 38,6 s, movimento 1,69, maior trecho parado 0,9 s | Pedido do cliente; aguardando avaliação |
| 2026-11-11 | EP017 | Padrão original 1,0× + CTA de comentário (SISTEMA → Direct). Tomada A sem edição, 164 palavras/min, 43,0 s, movimento 1,68, maior trecho parado 0,7 s | Pedido do cliente; aguardando avaliação |
| 2026-11-11 | EP018 | Padrão original 1,0× + CTA de comentário (SISTEMA → Direct). Tomada A sem edição (B e C leram a direção), 160 palavras/min, 45,2 s, movimento 1,73, maior trecho parado 1,0 s | Pedido do cliente; aguardando avaliação |
| 2026-11-11 | EP019 | Padrão original 1,0× + CTA de comentário (SISTEMA → Direct). Tomada A com corte da direção lida (6,0 s), 181 palavras/min nativos, 39,6 s, movimento 2,11, maior trecho parado 1,0 s | Pedido do cliente; aguardando avaliação |
| 2026-11-12 | EP020 | Padrão original 1,0× + CTA de comentário (SISTEMA → Direct). Tomada C sem edição (3 tomadas limpas), 164 palavras/min, 43,1 s, movimento 1,98, maior trecho parado 1,0 s | Pedido do cliente; aguardando avaliação |
| 2026-11-12 | EP030 | Padrão aprovado (ATIVO, sem kit de marca) 1,0× + CTA de comentário (SISTEMA → Direct). Tomada C sem edição, 158 palavras/min, 46,8 s, movimento 1,78, maior trecho parado 1,1 s | Pedido do cliente; aguardando avaliação |
| 2026-11-12 | EP031 | Padrão aprovado (ATIVO, sem símbolo) 1,0× + CTA de comentário (SISTEMA → Direct). Tomada B a partir da 2ª leitura do gancho (corte só no início), 151 palavras/min, 45,4 s, movimento 2,17, maior trecho parado 0,6 s | Pedido do cliente; aguardando avaliação |
| 2026-11-12 | EP032 | Padrão aprovado (ATIVO, sem símbolo) 1,0× + CTA de comentário (SISTEMA → Direct). Tomada única limpa, 161 palavras/min, 38,5 s, movimento 1,80, maior trecho parado 1,0 s | Pedido do cliente; aguardando avaliação |
| 2026-11-13 | EP033 | Padrão aprovado (ATIVO, sem símbolo) 1,0× + CTA de comentário (SISTEMA → Direct). Tomada A sem edição, 161 palavras/min, 43,1 s, movimento 1,78, maior trecho parado 0,7 s | Pedido do cliente; aguardando avaliação |
| 2026-11-13 | ATIVO EP01 | Roteiro novo do cliente, CTA de relacionamento do próprio roteiro. Tomada C sem edição, 160 palavras/min, 76,9 s, movimento 1,45, maior trecho parado 0,9 s, sem logo | Pedido do cliente; aguardando avaliação |
| 2026-11-13 | ATIVO EP02 | Roteiro do cliente + CTA de comentário SISTEMA (no lugar de "Salve este Reel"). Tomada C sem edição, 169 palavras/min, 83,9 s, movimento 1,83, maior trecho parado 1,1 s, sem logo | Pedido do cliente; aguardando avaliação |
| 2026-11-14 | ATIVO EP03 | Roteiro do cliente + CTA de compartilhamento do roteiro; logo oficial no fecho. Tomada B sem edição, 168 palavras/min, 72,3 s, movimento 1,79, maior trecho parado 2,0 s (fecho) | Pedido do cliente; aguardando avaliação |
| 2026-11-14 | ATIVO EP04 | Roteiro do cliente + CTA SISTEMA obrigatória (salvar → transição); logo oficial. Tomada única sem edição, 158 palavras/min, 70,3 s, movimento 1,53, maior trecho parado 1,1 s | Pedido do cliente; aguardando avaliação |
| 2026-11-15 | ATIVO EP05 | Roteiro do cliente + CTA SISTEMA (compartilhar → transição); verde exato verificado no render. Tomada A sem edição, 157 palavras/min, 82,7 s, movimento 1,40, maior trecho parado 0,8 s | Pedido do cliente; aguardando avaliação |
| 2026-11-15 | AD-ATIVO-01 | Criativo Meta Ads "A venda esquecida": CTA para o botão, área útil y 270–1250, legenda y 1185. Tomada A, 41,4 s, movimento 1,40, maior trecho parado 0,7 s | Pedido do cliente; aguardando avaliação |
| 2026-11-15 | AD-ATIVO-01 v2 | Edição para parar o scroll: 1,1×, transcrição dinâmica, cortes/tremida/flash, SFX em cada troca, bateria. 38,1 s, movimento 3,15, maior trecho parado 0,3 s, mix 110/110 | Pedido do cliente (v1 reprovada por pouca dinâmica); aguardando avaliação |
| 2026-11-15 | AD-ATIVO-02 | Criativo "Só um minutinho" no padrão de anúncio v2 + cortes secos (`buildCuts`, também aplicado ao AD-01). 38,4 s, movimento 3,33, maior trecho parado 0,5 s, mix 117/117 | Pedido do cliente; aguardando avaliação |
| 2026-11-13 | LANDING 16:9 | Vídeo principal da landing: 118 s, 1920×1080, trilha original por blocos, marca e telas provisórias, legendas web | Pedido do cliente; aguardando avaliação |
| 2026-11-13 | LANDING 16:9 v2 | Transcrição dinâmica, voz 1,2× (exceção pedida), 86,5 s, elementos maiores, movimento 2,39 | Feedback do cliente: mais dinâmica, texto = fala, gancho mais forte |
| 2026-11-13 | LANDING 16:9 FINAL | Logo oficial (revelação) + verde #3AF584, 3 situações centralizadas, voz 1,0×, 103 s, movimento 2,0 | Aprovado para implementação pelo cliente, com estes ajustes |
| 2026-11-13 | LANDING 16:9 v3 | Rotina em sobrecarga (1,32×, notificações crescentes), dor com uma imagem por frase, processo diagnóstico→desenvolvimento, 1,1×, 87 s, movimento 2,55 | Feedback do cliente; regravação de 2 frases pendente |
