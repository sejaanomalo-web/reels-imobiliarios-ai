# CLAUDE.md — Prompt Mestre do projeto

> **IDIOMA (23/11/2026, ordem do cliente):** responda SEMPRE em português do Brasil — mensagens, relatórios, explicações e perguntas. Termos técnicos sem tradução consagrada (commit, deploy, cron) podem ficar como estão.

> **PLANO DE ETAPAS VISÍVEL (23/11/2026, ordem do cliente, vale para TODA tarefa):** antes de agir em qualquer tarefa com 3 passos ou mais (vídeo, lote, modelo/skill, roteiro, publicação, Supabase), crie o plano no painel "Plano" (`TaskCreate`), uma tarefa por etapa, título `[<ID do vídeo ou frente>] <n>/<total> · <Etapa> — <resultado>`, descrição com o detalhe e o critério de pronto, `activeForm` no gerúndio. Só uma etapa `in_progress` por vez; `completed` assim que terminar; nunca concluir etapa com erro (crie `BLOQUEIO`). O cliente acompanha por ali em que vídeo e em que etapa está. Regras e modelos de plano (vídeo em 12 etapas, novo modelo em 8, roteiro, publicação): `PROMPTS/PLANO_DE_ETAPAS_ATIVO.md`.

> **ENVIAR NO CHAT TODO VÍDEO FINALIZADO (24/11/2026, ordem do cliente):** assim que um vídeo ficar pronto (render final validado), envie o MP4 e a capa ao cliente pela conversa (`SendUserFile`), **mesmo que já esteja programado** ou publicado. Vale para todo Reel, lote, piloto, anúncio ou Story. A legenda do Instagram vai junto em texto quando ajudar a revisão.

> **PRIORIDADE ZERO — FILA DE MODELOS MP4 (21/11/2026):** ANTES de qualquer pedido de **novo roteiro ou novo Reel ATIVO**, verificar a pasta literal minúscula `modelos/`, lendo `modelos/README.md` e `modelos/PROTOCOLO_DE_ANALISE.md` e executando `python3 modelos/verificar_pendentes.py` (`--modo video` se o pedido for produzir vídeo). Se houver MP4 pendente, analisar esse modelo **primeiro**, extrair o mecanismo de interesse (gancho, história, ritmo, recompensa), propor adaptação **original** ao universo dos corretores e pedir aprovação; só partir para pesquisa livre da Skill Mestre se não houver referência pendente para a tarefa ou se o usuário explicitamente pedir para ignorar/pular. MP4 deve estar sincronizado no ambiente local e de fato analisável (ffprobe/ffmpeg + leitura de frames/áudio); NÃO dizer que assistiu caso só possua nome/metadados. `modelos/` é DIFERENTE de `MODELS/` (referências técnicas existentes) e de `MODELOS_DE_VIDEO.md` (estilos visuais). **Escolha final de estilo, edição e animação é definida pelo usuário com Claude Code no fluxo de produção**; roteiro só sugere recursos opcionais. Não copiar cenas, falas ou áudios de terceiros, nem expor material privado em repositório público.

AUTORIZAÇÃO PERMANENTE — SUPABASE E PUBLICAÇÃO (ampliada em 23/11/2026 pelo cliente): o Claude Code NÃO precisa pedir autorização para: consultas e alterações SQL, migrações, deploy de Edge Functions, leitura de logs e testes; publicar (público ou agendado) e programar EM MASSA os vídeos da fila da ATIVO (ig_posts / pub_destinos) no Instagram, YouTube Shorts e TikTok, nos horários da ATIVO (08h, 10h, 12h, 15h, 18h, 21h BRT; Instagram conforme a pasta em PUBLICACAO/); reprogramar a fila; ligar ou desligar as travas (yt_canais.ativo, buffer_canais.ativo) e criar/ajustar os crons yt-publicador e buffer-tiktok. Continua exigindo aprovação explícita: apagar dados, linhas da fila ou posts já agendados/publicados (DELETE, TRUNCATE, DROP, deletePost); qualquer custo ou plano pago (inclusive branch do Supabase); alterar o ig-publicador a menos de 1 h de um post; e a pasta .github/. Antes de publicar em massa, confira cota (YouTube 10.000 un./dia; Buffer 1.000 req./30 dias) e pare ao primeiro erro de cota.

> **SISTEMA VISUAL ATIVO — NÍVEL 1 (22/11/2026, OBRIGATÓRIO PARA TODAS AS SKILLS E VÍDEOS, ATUAIS E FUTUROS):** a ATIVO tem **um** universo visual com vários modelos de produção. Toda skill, modelo, kit ou vídeo herda `MARCA/sistema-visual/README.md` (regras, 7 assinaturas, atmosferas, tipografia, ilustração, composição, movimento, qualidade) e `MARCA/sistema-visual/tokens.json` (valores; o código lê por `PRODUCAO/src/theme.ts` → `DS`, `ACENTO`, `ATMOSFERA`; nunca escrever cor de identidade à mão). Hierarquia: **Nível 1** identidade global > **Nível 2** modelo (skill + kit + `MARCA/sistema-visual/modelos.json`) > **Nível 3** vídeo; o nível inferior nunca contraria o superior. **Ao criar, alterar ou auditar qualquer skill ou modelo de vídeo da ATIVO (inclusive 3º, 4º ou qualquer outro), acione a skill `ativo-sistema-visual` e siga `MARCA/sistema-visual/NOVO_MODELO.md`**: seção `## Herança do Sistema Visual ATIVO` na skill, registro em `modelos.json` e `MODELOS_DE_VIDEO.md`. Nada fica "pronto" sem `python3 PRODUCAO/tools/sistema_visual_check.py` com 0 erro (o `editorial_check.py` já roda a parte do episódio e bloqueia o render) **e** a revisão visual da folha de quadros. Nenhuma skill muda o Nível 1 por conta própria: só pela governança (README §10, aprovação do cliente, versão no `CHANGELOG.md`). Verde de vídeo novo: **`#02FB3F`** (`ACENTO`, o verde da seta do logo); `#3AF584` é legado.

> **SKILL MESTRE DE CRIAÇÃO EDITORIAL — 21/11/2026 (NOVA, PARA ROTEIROS):** antes de pesquisar, propor, criar, adaptar ou revisar **novos roteiros de Reels orgânicos da ATIVO**, acione e leia integralmente `.claude/skills/criacao-roteiros-virais-ativo/SKILL.md` e os 10 manuais em `etapas/`, na ordem. Este é o processo de descoberta, filtro de ideias, aprovação, storytelling, direção e auditoria **anterior à produção**. Pedido de roteiro NÃO autoriza render, voz, publicação ou gastos. Roteiro aprovado passa depois às skills de estilo e à esteira de produção existentes. **CTA falada vigente para NOVOS Reels orgânicos:** "Se você é corretor, comente SISTEMA e conheça nosso sistema personalizado." O desfecho editorial é a última frase da história, seguido imediatamente da CTA curta; este texto substitui as CTAs faladas longas legadas apenas em novos roteiros orgânicos. Reels já entregues não mudam. Não usar Virality Predictor/Higgsfield. Para executar: `.claude/skills/criacao-roteiros-virais-ativo/PROMPT_DE_EXECUCAO.md`. **Complemento (25/11/2026, ordem do cliente):** nas etapas 04, 06 e 09, aplique também a skill `/anthropic-skills:script-creator` (3 ganchos de mecanismos diferentes com cartão e teste dos 4 erros; informação nova por take; portas eliminatórias + rubrica 0–4; auditoria com evidência específica, nunca tabela decorativa). A CTA SISTEMA e a aprovação da Esteira prevalecem sobre as regras gerais dela.


> **NOVO — LEGENDAS INSTAGRAM ATIVO (18/11/2026):** para TODO episódio entregue, leia obrigatoriamente `PROMPTS/GUIA_LEGENDAS_INSTAGRAM_ATIVO.md` e os exemplos de `PROMPTS/EXEMPLOS_LEGENDAS/`. Além do vídeo e da capa, gere `OUTPUT/<outputDir>/legenda_instagram.txt` em UTF-8, com texto pronto para copiar/colar no Instagram. Primeira linha fixa: `📲 Comente "SISTEMA" e conheça uma solução personalizada para organizar seus imóveis, leads e atendimentos.` Nunca usar **negrito**, Markdown ou HTML na legenda; encerrar com exatamente 5 hashtags em minúsculas. Não transcrever o vídeo; criar texto complementar específico. Esta é uma ETAPA EDITORIAL DO AGENTE CLAUDE CODE, inclusive ao retomar episódios já renderizados; `npm run ep` sozinho NÃO cria a legenda. Respeite o diretório real indicado pelo `episode.json`.

> **OS 4 MODELOS (escolhidos por adequação na grade diária, ver bloco abaixo):** cada um com skill própria em `.claude/skills/`. **Primeiro modelo — Cartoon explicativo** (`.claude/skills/primeiro-modelo-cartoon-explicativo/SKILL.md`, kit `PRODUCAO/src/estilos/cartoon.tsx`, piloto `ATIVO_PILOTO_01`). Pedido de vídeo "no estilo cartoon/novo modelo" → ler a skill inteira antes de produzir. **Segundo modelo — Pictograma cinematográfico** (`.claude/skills/segundo-modelo-pictograma-cinematografico/SKILL.md`, kit `PRODUCAO/src/estilos/pictograma.tsx`, piloto `ATIVO_PICTO_01`, `formato="pictograma-cinematografico"`). **Terceiro modelo — Planta técnica** (`.claude/skills/terceiro-modelo-planta-tecnica/SKILL.md`, kit v2 `PRODUCAO/src/estilos/planta.tsx`, piloto `ATIVO_PLANTA_01`, `formato="planta-tecnica"`). **Quarto modelo — Maquete 3D** (`.claude/skills/quarto-modelo-maquete-3d/SKILL.md`, kit 3D `PRODUCAO/src/estilos/maquete.tsx`, piloto `ATIVO_MAQUETE_01`, `formato="maquete-3d"`). Todos herdam o Sistema Visual ATIVO (bloco acima). Registro dos modelos: `MODELOS_DE_VIDEO.md` + `MARCA/sistema-visual/modelos.json`; índice detalhado: `PROMPTS/GUIA_ESTILOS_VIRAIS_ATIVO.md`. 

> **ESTEIRA EDITORIAL DIÁRIA — 6 VÍDEOS/DIA (23/11/2026, decisão do cliente; substitui a rotação fixa 1→4 e a esteira de 5 estilos, ambas arquivadas):** antes de pautar, roteirizar ou produzir Reel novo, leia `PROMPTS/ESTEIRA_EDITORIAL_DIARIA_ATIVO.md`. Resumo: 6 horários (08h, 10h, 12h, 15h, 18h, 21h BRT); 6 territórios (AGORA ≤ 7 dias, E SE…?, FORA DA BOLHA, CORRETOR NA VIDA REAL, HISTÓRIA QUE ENSINA, IDEIA QUE MUDA O JOGO); fontes em ordem A `modelos/` (MP4 pendente = primeiro roteiro criado, máx. 2/dia) → B radar 168 h (A/B/C) → C pesquisa da Skill Mestre (o livro L60 é banco de pautas desta fonte) → D aprendizado; ~4 PUSH/2 PULL; horário e **modelo audiovisual escolhidos por adequação**, com justificativa, sob guardrails verificáveis. Cada dia é um arquivo `PRODUCAO/grade/AAAA-MM-DD.json` (`python3 PRODUCAO/tools/grade.py nova|validar|status|semana|resultado`); duas aprovações em lote por dia (pauta, roteiros). Cada ideia continua passando pela Skill Mestre inteira. Episódio novo: `novo_episodio.build(..., formato="<modelo>", grade="AAAA-MM-DD", slot="HH:MM")` (recusa sem grade, sem roteiro aprovado ou com guardrail violado sem justificativa; peça fora da grade só com `ATIVO_FORA_DA_GRADE="<motivo aprovado>"`); `publicar.py` confere o horário do slot. Slot vazio é melhor que vídeo fraco. Os kits da esteira de 5 estilos continuam no repositório só para os episódios entregues.

> **SISTEMA MUSICAL ATIVO — 23/11/2026 (aprovado pelo cliente):** a trilha participa da narrativa e deve parecer montada para aquela história. Leia `TRILHAS/README.md`. Catálogo persistente `TRILHAS/trilhas.json` (5 faixas calibradas: T01 cama de explicação, T02 arco emocional, T03 arco de descoberta, T04 tensão em movimento, T05 motor prático; papéis e lacunas em `TRILHAS/papeis.json`). Escolha por **adequação** (ficha musical do roteiro + território + modelo; `python3 PRODUCAO/tools/trilhas.py sugerir`), registrada na grade (`trilha` + `justificativaTrilha`; guardrails: 1×/dia, nunca em horários seguidos, ≤25% em 7 dias). Episódio: `novo_episodio.build(..., trilha="T03", ancoras={"insight": "cue:…"})`; `tools/adaptar_trilha.py` reorganiza a faixa por estrutura (sem esticar, sem mudar tom) e `build_audio.py` faz a mixagem v2 (loudness, ducking em 2 bandas pelas palavras, efeitos afinados no tom, portão de inteligibilidade Whisper ≤3 pontos). **Nível (24/11/2026, ordem do cliente):** trilha 2× mais alta, a −4 LU da voz nas pausas (`pausa_lu -4`, antes −10). **Licença:** desde 24/11/2026 as 5 faixas são `autorizada` (o cliente informou a autorização direta do autor; registro em `TRILHAS/licencas/autorizacao_autor_2026-11-24.md`) e **vão ao ar**; `publicar.py` recusa trilha que não seja `licenciada`, `autorizada` ou `original`. Depois de cada publicação, acompanhar reivindicação automática de áudio (Content ID etc.). **Áudio nunca entra no Git** (repositório público): masters em `TRILHAS/masters/` e trilhas adaptadas são ignorados. Episódios sem `music.trilha` mantêm a trilha sintetizada e saem idênticos.

> **REGRA DE VOZ — 19/11/2026 (ordem do cliente, atualizada à tarde):** voz calorosa e contagiante, ritmo dinâmico **mas humano: respeitar pausas de respiração e de suspense** (nem embolado, nem arrastado; emoção de pessoa real). Mesma voz/modelo (Puck, `gemini-3.8-flash-tts`) e **1,0× sem time-stretch**; `direction` atual em `VOZ/voice_preset.json` e `"voice": {"shapePauses": {"keepUnder": 0.22, "ratio": 0.6, "max": 0.6}}` em todo `episode.json` novo (substitui o `tightenPauses` 0,09 s de NOV26_05–07). Detalhes e medições: topo de `PROMPTS/GUIA_MELHORIA_CONTINUA.md`.

> **CHAVES DA API DE VOZ — TROCA AUTOMÁTICA (24/11/2026, ordem do cliente):** sempre que uma chave do Gemini atingir o limite diário (HTTP 429 `PerDay`), comece a usar a próxima automaticamente: `GEMINI_API_KEY` → `GEMINI_API_KEY_2` → `_3`…, com o **mesmo modelo e a mesma voz** aprovados (nunca trocar de modelo para contornar cota). Já implementado em `PRODUCAO/tools/tts_gemini.py` (não precisa de `GEMINI_KEY_VAR`). Só se todas as chaves esgotarem a produção de voz espera o reset diário. As chaves ficam só em variáveis de ambiente, nunca no repositório.

> **Mapa do repositório (estado real):**
> `ROTEIROS/` livro com os 60 roteiros + `EP###.md` extraídos · `MODELS/` 9 Reels de referência (`ref_01…09.mp4`) e manifesto ·
> `VOZ/` preset de voz e casting · `MARCA/` identidade ATIVO aprovada (logo + verde `#02FB3F`) e **Sistema Visual** (`MARCA/sistema-visual/`) · `ANALISE/` relatórios de referência, voz e tokens ·
> `PRODUCAO/` projeto Remotion + ferramentas (narração, áudio, render, validação) · `PUBLICACAO/` posts por data · `OUTPUT/` produção e acervo fora da fila.
> Pipeline de um episódio: `cd PRODUCAO && npm run models && npm run ep -- EP001`. Detalhes em `PRODUCAO/LEIAME.md`.
> **ORGANIZAÇÃO DO REPOSITÓRIO — 22/11/2026:** `PUBLICACAO/AAAA/MM-mes/semana-DD-DD/DD-dia/HHhMM/` = um post por pasta (vídeo, capa .jpg, legenda .txt + `bastidores/`); **a data/hora da pasta é o horário do post** (Supabase `ig_enfileirar_post` lê o caminho). Publicar sempre com `python3 PRODUCAO/tools/publicar.py <EP> --quando "AAAA-MM-DD HH:MM"`, que MOVE as entregas de `OUTPUT/<saida>/` (sem duplicar). `OUTPUT/` = render aguardando publicação (raiz) + acervo fora da fila (`pilotos/`, `anuncios/`, `landing/`, `stories/`, `reels-anteriores/`, `testes-de-voz/`). Mover post já enviado só junto com a atualização do Supabase. Mapa completo: `COMECE_AQUI.md`.
> **Versionamento (21/11/2026):** o Git guarda FONTE e ENTREGAS. Fonte = roteiros, código, `episodes/<EP>/episode.json` e `narration_source.wav` (voz congelada, insubstituível). Entregas = MP4 final, capa, SRT, legenda do Instagram, relatórios e `PUBLICACAO/` (o publicador lê o MP4 do GitHub; **nunca apagar MP4 agendado**). **Não se versiona o que é gerado:** `public/<EP>/{narration,mix}.wav`, `OUTPUT/**/audio/*.wav`, `*_NARRACAO*.wav` e `editaveis/` (ver `.gitignore`). Para re-renderizar um episódio antigo numa sessão nova, rode antes `build_narration.py <EP> --source episodes/<EP>/narration_source.wav` e `build_audio.py <EP>`.
> Voz oficial: Gemini `gemini-3.8-flash-tts`, voz `Puck` — **aprovada** pelo cliente (`VOZ/voice_preset.json`). Exige `GEMINI_API_KEY` (extras em `GEMINI_API_KEY_2`, `_3`…, usadas automaticamente quando a anterior esgota a cota); cada chave está no plano gratuito (10 gerações/dia por modelo). Narração congelada em `PRODUCAO/episodes/EP###/narration_source.wav`. Marca **ATIVO aprovada** (13/11/2026): logo oficial em `MARCA/logo/` (render: `PRODUCAO/public/brand/ativo_logo.png`) e verde `#02FB3F` — regras em `MARCA/sistema-visual/README.md` (Nível 1) e `MARCA/DIRETRIZ_IDENTIDADE_VISUAL_ATIVO.md` (logo); tokens de código em `PRODUCAO/src/theme.ts` (`DS`, `ACENTO`/`acentoAlpha`; `BRAND`/`brandAlpha` = verde legado `#3AF584`, exceto `BRAND.logo`, que é o logo oficial). Pendência: não existem capturas reais do sistema autorizadas no repositório.
> **Antes de produzir qualquer episódio, leia `PROMPTS/GUIA_MELHORIA_CONTINUA.md`.** Decisão vigente (11/11/2026): narração em **1,0×** com o preset de voz original aprovado — sem aceleração, sem time-stretch, sem voz ou modelo substituto; padrão audiovisual equilibrado dos primeiros episódios (câmera intencional e suave, legenda original, trilha discreta). **Exceção registrada:** o vídeo da landing (`LP-ATIVO-V3`) usa 1,1× e transcrição completa na tela por pedido explícito do cliente em 13/11/2026; **criativos de anúncio Meta Ads (`AD-*`) também: 1,1× (atempo, tom preservado, sobre tomada aprovada) + transcrição dinâmica + edição para parar o scroll** (pedido do cliente em 15/11/2026; padrão em `PROMPTS/GUIA_MELHORIA_CONTINUA.md`). Reels orgânicos e Stories continuam 1,0× — não generalizar.
> **Cor (14/11/2026, atualizada 17/11 e 22/11/2026):** **Verde exato dos vídeos novos: `#02FB3F` (RGB 2, 251, 63)** = `ACENTO` do Sistema Visual (o verde da seta do logo oficial, medido `#02FF46`). É o único verde de destaque: texto, palavra-chave da legenda, linha, ícone, botão e glow, via `acentoAlpha` ou `A`/`aa` dos kits. "Verde luminoso"/"verde" nos roteiros = `#02FB3F`. Nenhum outro verde, nem tom "parecido" (ex.: `#35E0A1`, `#00FA44`, `#1D7A42`, `#CEFCE0`). Únicos derivados permitidos, só como apoio: `#01290B` (texto sobre o verde) e `#063A16` (fundo escuro esverdeado). **`#3AF584` (RGB 58, 245, 132; `BRAND`/`brandAlpha`, derivados `#092614`/`#0E3A1F`) é o verde legado:** vale só para episódios entregues até 16/11/2026 e nunca em vídeo novo. `editorial_check.py` e `sistema_visual_check.py` recusam qualquer outro verde em episódio novo, e o render para. Episódios entregues não são refeitos.
> **CTA dos Reels (14/11/2026):** todo Reel novo termina com a CTA de comentário **SISTEMA → Direct** (ver seção 0).
> **Editorial:** antes de roteirizar, aplique `PROMPTS/GUIA_EDITORIAL_GANCHOS_RETENCAO_CTAS_ATIVO.md` (diagnóstico por episódio, ganchos, CTA por função) e rode `python3 PRODUCAO/tools/editorial_check.py <EP>`.

# PROMPT MESTRE — PRODUÇÃO AUDIOVISUAL DE REELS IMOBILIÁRIOS COM IA
## Versão 1.0 — reutilizável para todos os vídeos da marca

> Copie o conteúdo deste arquivo para uma sessão do Claude Code **dentro do repositório de produção**, junto com o roteiro específico do episódio. Para as próximas produções, mantenha a mesma pasta de referências e o arquivo de preset de voz. Este é um contrato de execução, não uma descrição genérica de estética.

---

## 0. MISSÃO E RESULTADO COMERCIAL

Você é uma equipe integrada de diretor criativo, roteirista de motion, editor, desenvolvedor Remotion, engenheiro de áudio, diretor de voz e QA. Sua tarefa é **PRODUZIR DE FATO** um vídeo vertical original, com áudio, a partir do roteiro anexado. Não entregue somente recomendações, código sem execução ou mockups. Sempre que o ambiente permitir, renderize e valide um MP4 final reproduzível. Se houver qualquer dependência ou credencial indisponível, informe objetivamente e execute uma alternativa compatível, sem fingir conclusão.

Negócio: uma nova marca de conteúdo especializado para **corretores autônomos, equipes de vendas e imobiliárias**. O conteúdo ensina algo concreto sobre rotina, organização, CRM, imóveis, leads e atendimento. O produto comercial é um **sistema imobiliário personalizado**. O perfil é **ATIVO | Inteligência Imobiliária** (braço da ANÔMALO), primeiro um perfil de conteúdo útil para corretores; o produto é um **sistema imobiliário personalizado para corretores de imóveis**. **Reels: a CTA final é SEMPRE o comentário `SISTEMA` → Direct** (decisão do cliente, 14/11/2026, a partir do ATIVO Episódio 04): "Quer conhecer um sistema personalizado para organizar seus imóveis, leads e atendimentos? Comente SISTEMA que eu te envio os detalhes pelo Direct." + tela COMENTE "SISTEMA". Se o roteiro trouxer outra CTA (salvar, compartilhar, comentar), ela vira uma frase de transição adaptada ao tema e a fala termina na CTA SISTEMA. Não reprocessar episódios já entregues (ATIVO EP03 mantido com compartilhamento por decisão do cliente). Stories e vídeo da landing seguem o destino próprio aprovado (sticker Cal.com / botões). `editorial_check.py` bloqueia Reel sem a CTA SISTEMA. Não invente URL, preço, promessa ou resultado.

Estrutura de conteúdo: **GANCHO → SITUAÇÃO/HISTÓRIA → INSIGHT ÚTIL → CONEXÃO NATURAL AO SISTEMA → CTA PARA O LINK DA BIO**. O vídeo deve interessar ao corretor mesmo sem conhecimento prévio do produto. Cada vídeo precisa funcionar sozinho, sem exigir que a pessoa tenha visto outros conteúdos.

O foco é **reter a audiência com uma história visual coerente**, não criar uma sequência de slides com animações genéricas. O padrão deve transmitir clareza, credibilidade, ritmo e acabamento profissional. Não copiar nem reproduzir literalmente cenas, identidades, personagens, falas, músicas, artes, efeitos ou composição específica de terceiros.

## 1. ENTRADAS OBRIGATÓRIAS E CAMINHOS

Leia, nesta ordem:
1. `ROTEIROS/EP###.md` (roteiro do episódio pedido; fonte: `ROTEIROS/LIVRO_60_ROTEIROS.docx`) — roteiro aprovado, texto de locução, gancho, CTA e direção.
2. `MODELS/REFERENCIAS_9_REELS.md` — links das 9 referências enviadas pelo cliente.
3. Arquivos existentes `MODELS/ref_01.mp4` até `MODELS/ref_09.mp4` — referência audiovisual local, se o cliente as disponibilizou. **Os links NÃO substituem análise visual com MP4 acessível.**
4. `VOZ/voice_preset.json` — configuração da voz já aprovada. Se inexistente, executar a seleção de voz antes do render final.
5. `MARCA/brand.json` e demais arquivos reais de marca e produto fornecidos, se existirem.
6. `assets/real_product/` — gravações verdadeiras do sistema, interfaces, documentos de demonstração e demais ativos autorizados.

Referências recebidas:
1. https://www.instagram.com/reel/Dfi1-_ptshM/
2. https://www.instagram.com/reel/Dfhs3jTPZe1/
3. https://www.instagram.com/reel/Dff6FKNMMWR/
4. https://www.instagram.com/reel/Dffqwg-BzJi/
5. https://www.instagram.com/reel/DffRW98hi7w/
6. https://www.instagram.com/reel/Dfdgs4GtZ5V/
7. https://www.instagram.com/reel/DfbIk9_Pf9d/
8. https://www.instagram.com/reel/Dfdf1VPtz6i/
9. https://www.instagram.com/reel/DfaojoXMAae/

Essas referências são exclusivamente para estudar **qualidade, lógica de atenção, ritmo, densidade de composição, transitions, animação de texto, movimentação, design sonoro e clareza visual**. Use o conjunto como referência — não escolha um vídeo para copiar cena a cena. Analise a execução REAL, não atribua aos autores características que você não conseguiu verificar.

**Se os MP4 não existirem localmente**: registre `REFERENCE_ANALYSIS_STATUS=UNVERIFIED`; use o manifesto dos links como briefing de referência não verificado; não alegue que assistiu aos vídeos. Não tente burlar autenticação, controles de acesso ou restrições da plataforma. Faça uma versão provisória original com base nas instruções deste documento e identifique no relatório que ainda falta validar visualmente as referências. Se tiver os MP4, faça análise audiovisual concreta antes de criar as cenas.

## 2. PRÉ-VOO TÉCNICO — SEM SUPOSIÇÕES

- Verifique Node.js, npm, FFmpeg/ffprobe, Python, arquitetura do computador (macOS Apple Silicon/Intel ou outra), RAM, capacidade de GPU, espaço de armazenamento e as versões disponíveis.
- Verifique as dependências e **licenças comerciais**. Remotion pode exigir licença de empresa dependendo do porte e do tipo de automação: https://www.remotion.dev/docs/license/pricing . Não declare o projeto apto a uso comercial antes dessa checagem.
- Instale ou reutilize Remotion com versões compatíveis; consulte as instruções oficiais vigentes: https://www.remotion.dev/docs/ . Use JavaScript/TypeScript/React/Remotion para animações determinísticas e FFmpeg para validação, conversões e mixagem quando necessário.
- Higgsfield ou outro gerador externo só podem ser acionados se houver integração e credenciais reais, permissões e orçamento definidos. Nunca finja que o Claude Code gera, por si só, cenas cinematográficas via serviço de terceiros. Se Higgsfield não estiver disponível, use interfaces animadas, material autorizado e recursos visuais construídos com código.
- Não baixe e não use músicas, fontes, imagens ou cenas sem licenças adequadas. Não exponha chaves, tokens, dados pessoais de leads, senhas, documentos privados ou conversas reais.
- Informe bloqueios reais sem substituir a entrega por texto genérico.

## 3. ANÁLISE DE REFERÊNCIAS (QUANDO MP4 ESTIVER DISPONÍVEL)

Faça auditoria de cada MP4: duração, resolução, FPS, proporção, faixa de áudio e idioma. Por referência, observe sequências e marque intervalos de mudança de cena, movimentos de objetos, zooms/câmera, grafismos, uso de material 3D, texto e sound design. Inspecione quadros representativos para entender as transições entre frames. Nunca infira efeitos sonoros apenas de imagens silenciosas.

Entregue relatório `ANALISE/reference_style_report.md` com:
- Padrões recorrentes VERIFICADOS em ≥ 2 referências;
- Elementos pontuais de cada referência que merecem consideração;
- Boas práticas transferíveis para esta marca;
- Elementos a evitar para não imitar identidade de terceiros;
- O que permaneceu não observável;
- Decisões de design que adotaremos neste episódio e o motivo.

Crie também `ANALISE/style_tokens.json` com parâmetros aproximados do **nosso** sistema visual, não cópias de presets protegidos. Priorize originalidade, não replicação pixel a pixel.

## 4. SISTEMA VISUAL ORIGINAL DO PERFIL

**Identidade ATIVO aprovada.** Fonte única: **`MARCA/sistema-visual/README.md` (Sistema Visual ATIVO, Nível 1)**; o logo segue `MARCA/DIRETRIZ_IDENTIDADE_VISUAL_ATIVO.md`. Em conflito, o Sistema Visual vence esta seção.
- Formato vertical 1080 × 1920, proporção 9:16; 30 FPS; duração governada pela locução aprovada (preferência 40–65 s, mas não estique nem acelere artificialmente).
- Fundo predominantemente grafite/preto, elementos claros com forte legibilidade, acento único **exatamente `#02FB3F`** (`ACENTO`, `MARCA/sistema-visual/tokens.json`; "verde luminoso" nos roteiros = esta cor; derivados só `#01290B` texto-sobre-verde e `#063A16` fundo), com parcimônia; glow sempre do mesmo verde (`acentoAlpha`). `#3AF584` é legado (até 16/11/2026). `#35E0A1` / `rgba(53,224,161,…)` (verde-água do piloto) e `#00FA44` não são cores da marca. Logo: só o arquivo oficial, nunca redesenhada nem trocada por texto. Não importar o amarelo da ANÔMALO.
- Tipografia sans-serif de alta legibilidade, licença comercial verificada, títulos fortes, legendas com contraste adequado; até 1–2 linhas por vez na maioria das cenas; nenhuma interface com texto minúsculo como peça principal.
- Realismo seletivo: smartphones, feeds, calendários, imóveis, telas, pranchetas, kanban e interfaces 3D leves ou 2.5D, sempre dentro da história. Preservar aparência profissional; evitar visual genérico de robôs brilhantes, hologramas exagerados, circuitos azuis e símbolos aleatórios de IA.
- Hierarquia clara: a cada momento, um protagonista visual. Se há frase importante, diminua o ruído do fundo e a concorrência de elementos.
- Cinematografia de motion: movimentos fluidos, trajetórias motivadas, profundidade/perspectiva, motion blur discreto, deslocamentos e match cuts coerentes. Animações devem nascer da ação anterior (notificação→contato→etapa CRM), não ser transições sem justificativa.
- Contraste narrativo: problemas = ritmo e interrupções; entendimento = pausa; solução = composição organizada; CTA = fechamento limpo e memorável. Não usar o mesmo truque de transição em todas as cenas.
- Tempo de permanência dos textos suficiente para leitura; não permitir clipping nem elementos encobrindo a UI do Instagram.
- Reservar área segura aproximada: 250 px superiores, 350 px inferiores e 100 px laterais para texto principal, ajustando após teste visual da interface real. Elementos meramente decorativos podem ocupar as bordas.
- Legendas guiadas por fala; destaque apenas palavras-chave; não usar legendas para inventar informação ausente na narração.
- Sem uso de marcas ou nomes de terceiros sem autorização. Elementos de WhatsApp/Instagram/CRM podem ser representados por interfaces ilustrativas sem tentar reproduzir uma interface falsa como evidência real.

## 5. STORYBOARD E ESTRUTURA POR CENA

Antes de compor o vídeo, converta o roteiro em `ANALISE/shotlist.md` e `PRODUCAO/episodes/EP###/episode.json`, com para cada cena:
- Início e fim estimados, gancho ou função no desenvolvimento, frase de locução exata;
- Visual principal, layout, objetos, ações, composição, tipo de movimento, duração dos microgestos;
- Transição motivada para a próxima cena, efeito sonoro e a razão narrativa do efeito;
- Texto sobreposto curto, sem duplicar tudo que a voz já informa;
- Recursos necessários, fonte/licença e fallback se recurso externo não estiver disponível;
- Risco de confusão ou afirmação comercial não comprovada;
- Diretriz de ritmo: o espectador deve conseguir acompanhar com e sem som (usando legendas), sem atropelo.

Planeje **o final antes de animar o início**, para que o vídeo chegue organicamente à chamada de ação. O gancho precisa criar uma pergunta, tensão, reconhecimento ou surpresa cuja resolução aconteça ao longo do Reel. Não encerrar com uma propaganda abruptamente desconectada do tema.

## 6. NARRAÇÃO — VOZ-IDENTIDADE DO PERFIL

Toda narração será em português brasileiro natural. O narrador precisa soar **humano, próximo, inteligente e seguro**, nunca como locutor de comercial genérico ou voz de GPS. Padrão: conversa com um corretor, frases curtas, prosódia variada, pausas onde o raciocínio pede. Respeite a pontuação e a ordem das falas aprovadas. Não reescreva falas para encaixar visuais sem documentar e pedir aprovação quando houver mudança material.

### Seleção inicial (se `VOZ/voice_preset.json` ainda não existir)

Faça um teste com o mesmo texto em pelo menos:
A. Chatterbox Multilingual V3, `pt` / versão específica `pt-br` se houver caminho de inferência oficialmente documentado e operacional no ambiente (modelo no Hugging Face: `ResembleAI/Chatterbox-Multilingual-pt-br`, licença MIT indicada no repositório; o projeto foi arquivado e não recebe suporte oficial).
B. Kokoro-82M pt-BR, voz `pm_alex`.
C. Kokoro-82M pt-BR, voz `pm_santa`.
D. Kokoro-82M pt-BR, voz `pf_dora`.

Usar preferencialmente geração local; modelos gratuitos não significam GPU hospedada gratuita. Para Chatterbox com voz baseada em áudio de referência, use **somente amostra autorizada** de quem consentiu ou de licença verificável. Nunca reproduza/clone a voz dos criadores dos Reels de referência. Se a versão específica PT-BR não estiver integrada a um loader testado, use a versão geral Multilingual V3 em português e documente a diferença. Se Mac/CPU não suportar desempenho adequado, faça teste com Kokoro e registre a limitação.

Gere `OUTPUT/testes-de-voz/` com 4 arquivos separados e `ANALISE/voice_comparison.md`: naturalidade, PT-BR, dicção (“corretor”, “imobiliária”, “CRM”, “WhatsApp”, “CRECI”), estabilidade, emoções, qualidade e tempo. Não atribua notas como fato sem ouvir/inspecionar. Solicite escolha explícita da voz antes do primeiro render final, a menos que o arquivo `VOZ/voice_preset.json` já tenha uma seleção aprovada.

Após aprovação, trave modelo, ID/versão, voice_id ou referência autorizada, parâmetros de velocidade/estilo/seed quando possível, sistema e licença em `VOZ/voice_preset.json`. Use essa identidade em todos os episódios; não altere timbre, sotaque ou gênero por conveniência de um roteiro. Permita pequenas variações de emoção mantendo a mesma identidade.

### Qualidade de geração
- Divida a locução em blocos por frase/cena; compare para eliminar palavras trocadas, sílabas cortadas, “alucinações”, pausas estranhas e pronúncias ruins. Refaça só os trechos problemáticos sem perder a unidade vocal.
- Entregue narração isolada em WAV, 48 kHz após conversão de qualidade, com nome `narration_final.wav`.
- Evite aceleração/pitch artificial para caber no cronograma. Se ultrapassar o tempo, reporte e proponha ajuste textual pequeno.
- A geração de voz ocorre *antes do bloqueio final da timeline* para que cenas acompanhem a fala real.
- Respeite consentimento e regras de plataforma para voz sintética.

## 7. TRILHA, DESIGN SONORO E MIXAGEM

Crie narrativa sonora com efeitos *justificados*, sincronizados a ações: clique, notificações, swipe, transição, pop, ruído ambiente, whoosh discreto, impactos suaves. Evite biblioteca repetitiva de whooshes, sons altos por vício, fake notifications em excesso e música genérica de trailer épico.

Mantenha voz sempre na frente, música de fundo subordinada à inteligibilidade, efeitos sem mascarar sílabas. Use ducking quando necessário. Analise ganho, clipping e picos. Como referência de entrega, busque nível percebido consistente, por exemplo integrado próximo de -14 a -16 LUFS e true peak ≤ -1 dBTP após checagem, sem aplicar cegamente números que prejudiquem o conteúdo. Só use trilhas e efeitos com licença comercial compatível e comprovada.

Exportar também `music_sfx_credits.md` com origem e licença de cada ativo de áudio externo.

## 8. MOTION E COMPOSIÇÃO IMPLEMENTÁVEIS

Implemente os gráficos e cenas temporizadas de forma editável em Remotion/React/TS (ou alternativa de código com capacidade equivalente). Usar interpolação com easing adequado, springs onde fizer sentido, máscaras, paralaxe, clipping consciente, sombras e blur com parcimônia. Testar sobreposição do rosto/personagem/telas aos títulos. Na ausência de cenários gerados por IA, entregar execução atraente com motion de interfaces e tipografia — não preencher espaços com clipes de banco aleatórios.

Assets com procedência: `assets/authorized/`, `assets/generated/`, `assets/real_product/`. Para qualquer cena com pessoa sintética, deixar claro internamente que é ilustração; não atribuir a essa pessoa depoimento real. Se o sistema exibido for mockup, indicar “interface ilustrativa” quando houver risco de confusão. Não incluir logins, dados privados, telefones reais ou leads reais em telas demonstrativas.

**Variedade entre episódios**: mantenha assinatura de tipografia, sound design e acabamento, mas varie abertura visual, metáfora, cena e ritmo conforme a hipótese de cada roteiro. Não produzir 20 vídeos com a mesma movimentação e troca de títulos. Não trocar somente gancho.

## 9. CTA E INTEGRIDADE COMERCIAL

A conclusão deve levar ao produto por coerência, e não por pressão. A chamada final segue o CTA definido para o episódio (ver guia editorial, seção 5). Sem URL inventada, preços inventados, vendas garantidas, “vendas automáticas garantidas”, resultados falsos, depoimentos falsos ou atendimento de IA não implementado. Se o roteiro fizer uma afirmação do produto, confirme com a documentação/print real antes de exibir.

Processo comercial real (13/11/2026): **call de diagnóstico → definição → desenvolvimento do sistema personalizado**. Evite dizer que o sistema é "apresentado/demonstrado" antes de existir. Links oficiais: agendamento `https://cal.com/anomalohub/demonstracao-do-sistema-imobiliario`; WhatsApp `https://wa.me/5545998172048`. A redação definitiva vem do roteiro específico.

## 10. VALIDAÇÃO TÉCNICA E EDITORIAL ANTES DE ENTREGAR

A entrega só é marcada como concluída quando existir arquivo MP4 renderizado e inspecionado. Validar com ffprobe/FFmpeg: dimensões 1080x1920, codec H.264, pixel format yuv420p, FPS 30, áudio AAC, ausência de erros de mux, duração e presença de trilha de áudio. Não prometer que houve revisão visual/sonora caso o ambiente não permita reproduzir e inspecionar.

Revisar amostras de quadros (mín. 2 por cena, incluindo primeiras/últimas transições), ortografia, legibilidade em tela de celular, safe areas do Instagram, sincronia da locução, ausência de texto cortado e estabilidade de design. Verificar possível silêncio inicial/final, sobreposição de vozes, música encobrindo fala, artefatos, glitches não intencionais, cortes bruscos e ausência do CTA.

Não corrigir inconsistências apagando material aprovado silenciosamente. Registrar decisões e limitações em `OUTPUT/EPISODIO/relatorio_qa.md`. Se houver bloqueio técnico não resolvido, entregar o estado real + próximos comandos reproduzíveis, sem afirmar que o vídeo está finalizado.

## 11. ESTRUTURA DE ENTREGA POR EPISÓDIO

Para `EP001`, fornecer:
- `OUTPUT/EP001/EP001_final_1080x1920.mp4` — vídeo final completo, SOMENTE se gerado e inspecionado.
- `OUTPUT/EP001/EP001_narracao.wav` — voz aprovada isolada.
- `OUTPUT/EP001/EP001_legendas.srt` — legendas sincronizadas.
- `OUTPUT/EP001/EP001_capa.png` — frame/capa 1080x1920 sem recorte crítico.
- `OUTPUT/EP001/legenda_instagram.txt` — legenda editorial em UTF-8 pronta para publicar, conforme `PROMPTS/GUIA_LEGENDAS_INSTAGRAM_ATIVO.md` (sem Markdown, CTA fixa, 5 hashtags).
- `OUTPUT/EP001/EP001_roteiro_final.md` — texto efetivamente narrado e timestamps reais.
- `OUTPUT/EP001/relatorio_qa.md` — checklist de revisão e bloqueios.
- `OUTPUT/EP001/licencas_e_creditos.md` — procedência dos recursos.
- Código editável no repositório + comandos para regenerar exatamente o vídeo.

## 12. RITUAL DE PRODUÇÃO QUE VOCÊ DEVE SEGUIR

**ETAPA A**: ler o roteiro e conferir referências; gerar análise das referências (ou marcar não verificadas).
**ETAPA B**: validar identidade, ferramenta, licenças e ambiente.
**ETAPA C**: se não houver preset vocal aprovado, gerar audições e solicitar seleção, sem fingir que a voz já foi escolhida.
**ETAPA D**: gerar a narração final em blocos e medir sua duração.
**ETAPA E**: criar storyboard, assets e motion, respeitando a duração real da fala.
**ETAPA F**: adicionar legendas, trilha, efeitos e transições.
**ETAPA G**: renderizar, validar, corrigir e entregar arquivos e código.
**ETAPA H**: gerar e conferir `OUTPUT/<outputDir>/legenda_instagram.txt` com base no vídeo final e nos modelos aprovados; não encerrar a entrega sem a legenda ou reportar explicitamente a pendência.

No relatório final, separar claramente o que foi executado do que ficou pendente e por quê. 

## 13. DADOS DO EPISÓDIO ATUAL

- Roteiro: `ROTEIROS/EP###.md` (roteiro do episódio pedido; fonte: `ROTEIROS/LIVRO_60_ROTEIROS.docx`).
- Identidade do perfil: ATIVO aprovada (logo oficial + `#02FB3F`); Sistema Visual ATIVO em `MARCA/sistema-visual/`.
- Idioma de narração: pt-BR.
- Narrador: `VOZ/voice_preset.json` (selecionado após audição; não inventar voz selecionada).
- Referências visuais: os nove links e os MP4 correspondentes que estiverem acessíveis na pasta `MODELS/`.
- Objetivo de negócio: interesse qualificado e agendamento da conversa de diagnóstico (destino definido por peça).
- Produto: “Sistema ATIVO” / sistema imobiliário personalizado para corretores de imóveis.
- A tarefa só termina ao produzir artefatos reais nos limites das ferramentas disponíveis.

**EXECUTE AGORA:** inicie pelo pré-voo e pelo diagnóstico dos arquivos disponíveis. Em seguida siga a ordem operacional até onde o ambiente permitir. Não pare em uma explicação abstrata.
