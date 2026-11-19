# Prompt de continuidade — nova sessão do Claude Code (ATIVO | Reels)

Cole o bloco abaixo como primeira mensagem de uma sessão nova com o repositório `reels-imobiliarios-ai` conectado.

---

Você vai continuar a produção de vídeos da **ATIVO | Inteligência Imobiliária** (braço da ANÔMALO) neste repositório, no mesmo padrão já estabelecido. Público: **corretores de imóveis**. Responda em português, direto e crítico, e verifique o que não souber antes de afirmar.

## 0. Antes de tudo
1. `git fetch origin feat/ativo-identidade-editorial-stories-v2 && git checkout feat/ativo-identidade-editorial-stories-v2`. Trabalhe só nessa branch. Não trabalhe em `main`, não abra PR, não use force push e não apague material histórico. Faça commit e push ao fim de cada entrega.
2. Leia, nesta ordem:
   - `CLAUDE.md`, as regras-mestre;
   - `PROMPTS/GUIA_MELHORIA_CONTINUA.md`, as decisões vigentes e os aprendizados por episódio (EP03 a EP08 e anúncios);
   - `PROMPTS/GUIA_EDITORIAL_GANCHOS_RETENCAO_CTAS_ATIVO.md`;
   - `MARCA/DIRETRIZ_IDENTIDADE_VISUAL_ATIVO.md`;
   - `PRODUCAO/LEIAME.md`.
3. Use como modelo de código os episódios mais recentes:
   - `PRODUCAO/src/episodes/EP-ATIVO08/` e `EP-ATIVO09/`: `Episode.tsx`, `Cover.tsx`, `scenes/ui.tsx`, `scenes/Cta.tsx`;
   - `PRODUCAO/episodes/EP-ATIVO08/episode.json`.

## 1. Regras fixas (não negociar)
- **Voz oficial:**
  - Gemini `gemini-3.8-flash-tts`, voz `Puck`, preset em `VOZ/voice_preset.json`.
  - **1,0×** em Reels e Stories: sem aceleração, sem time-stretch, sem voz ou modelo substituto. ElevenLabs e clonagem não servem.
  - Só os anúncios Meta (`AD-*`) usam 1,1× (`atempo`).
- **Chaves Gemini:**
  - Ficam só em variáveis de ambiente: `GEMINI_API_KEY` (conta 1) e `GEMINI_API_KEY_2` (conta 2).
  - Escolha a conta com `GEMINI_KEY_VAR=GEMINI_API_KEY_2` antes do comando.
  - Nunca imprima, grave em arquivo ou peça a chave no chat.
  - Cada chave tem **10 gerações/dia** (cada tomada conta 1) e renova por volta das 08:00 UTC.
  - Comece com 2 tomadas; gere a 3ª só se as duas tiverem erro.
- **CTA dos Reels:**
  - Termina **sempre** com: "Quer conhecer um sistema personalizado para organizar seus imóveis, leads e atendimentos? Comente SISTEMA que eu te envio os detalhes pelo Direct."
  - Na tela: COMENTE "SISTEMA" → Direct + logo oficial.
  - Se o roteiro trouxer outra CTA (salvar, seguir, compartilhar), ela vira uma frase de transição curta, adaptada ao tema, antes da CTA SISTEMA. Registre `original_cta` e `transition_adapted` no `episode.json` e avise o usuário que a frase precisa de aprovação.
  - Os Reels já entregues não são refeitos.
- **Cor:**
  - Único verde: `#3AF584`, sempre via `BRAND` / `brandAlpha` de `PRODUCAO/src/theme.ts`.
  - Derivados permitidos só como apoio: `BRAND.ink #092614` e `BRAND.deep #0E3A1F`.
  - Logo só o arquivo oficial (`BRAND.logo`), e só no fecho e na capa.
- **Público:**
  - Corretor. Roteiro escrito para gestor/imobiliária é adaptado ao ponto de vista do corretor ("você", "um colega", "seus clientes") antes de gravar.
  - Narração palavra por palavra do roteiro; mudança material só com aprovação.
- **Integridade:**
  - Sem preço, endereço, dado local, URL, depoimento ou resultado inventado. Preço aparece mascarado (`R$ ••••••`).
  - Toda interface, mapa, planta ou conversa desenhada leva o rótulo "ILUSTRATIVO" / "EXEMPLO ILUSTRATIVO".
  - Itens a verificar aparecem como "A CONFERIR" / "CONSULTAR", nunca como já verificados.
  - Sem procedimento jurídico universal.
- **Não re-renderizar automaticamente o `OUTPUT/` inteiro.**

## 2. Pipeline de um Reel orgânico (sempre a partir de `PRODUCAO/`)
1. **Roteiro**
   - Extraia o `.docx` com `python-docx` e salve em `ROTEIROS/ATIVO_EP##.md`, com comentário no topo sobre a troca de CTA.
2. **Configuração: `episodes/EP-ATIVO##/episode.json`**
   - Copie a estrutura do EP08/EP09.
   - `segments` frase a frase, com `caption` em blocos `|` e palavras-chave em `*...*`.
   - `scene` por bloco do roteiro e `sceneLead`.
   - `cues {seg, word}`:
     - **valide que cada palavra existe no texto do segmento** (o script do EP09 faz `assert`);
     - inclua `cta_quer`, `cta_sys`, `cta_tiles`, `cta_comment`, `cta_word`, `cta_direct`, `cta_end`.
   - `sfx` presos a cues e `music.prog` com acordes por cena.
   - `diagnostico`, `cta {type: comentario, keyword: SISTEMA, ...}`, `pronunciation {"SISTEMA":"sistema"}`, `master {tp: -2.0}`.
3. **Sem cota de voz?**
   - `python3 tools/provisional_timeline.py EP-ATIVO##` gera uma linha do tempo provisória (~30% mais lenta que a voz real). Construa e revise as cenas sobre ela. Nunca entregue esse estado.
4. **Voz**
   - Gerar: `GEMINI_KEY_VAR=... python3 tools/gen_take.py EP-ATIVO## A <scratchpad>/ep##` (e B). O script imprime a transcrição do Parakeet.
   - Conferir no Whisper (`tools/tts_common.transcribe`), por segmento **e com contexto** (s9–s11 juntos, por exemplo).
   - Descartar tomada que muda o sentido: negação perdida, palavra trocada ("informações" no lugar de "mensagens"), "te envia".
   - Aceitar o coloquial "Comenta SISTEMA".
   - Divergência entre os dois reconhecedores vai para o relatório com minutagem, para o usuário ouvir.
   - **Emenda permitida:**
     - troque uma frase pela de outra tomada, cortando no meio da pausa entre frases (de preferência num início de cena);
     - crossfade de 12 ms, ganho igualado por RMS;
     - confira que o tom da frase emendada bate com a mesma frase na outra tomada;
     - técnica e resultados no registro do EP07 no guia.
5. **Linha do tempo real**
   - `python3 tools/build_narration.py EP-ATIVO## --source <wav>` gera `timeline.json`, legendas, SRT e `narration_source.wav` congelado.
6. **Cenas: `src/episodes/EP-ATIVO##/`**
   - Uma cena por bloco do roteiro, em `<Sequence>` com `win()`.
   - Cada cena usa `<Camera drift={0.5} keys=[...]>`. **`x`/`y` da câmera são a POSIÇÃO DA CÂMERA:** `y` positivo sobe o conteúdo, `x` positivo leva o conteúdo para a esquerda.
   - Títulos fora da câmera quando houver zoom > 1,1.
   - Conteúdo principal entre y≈280 e y≈1300; legenda padrão em y≈1392; área segura de 250 px no topo, 350 px embaixo e 100 px nas laterais.
   - `hideCaptions` só quando a cena mostra a própria fala (balão digitado palavra a palavra).
   - Cabeçalho de cena nova entra só depois que o da anterior saiu.
   - Molduras dos painéis entram já na frase de abertura e são preenchidas no tempo da fala, para não deixar buraco.
   - CTA: copie `Cta.tsx` do EP09 e troque o id do segmento da CTA (`"s18"`) e o `STEPS` do `ui.tsx`.
   - Registre `Composition` + `Still` (`EP-ATIVO##-Capa`) em `src/Root.tsx`, pasta ATIVO.
7. **Checagens antes de renderizar**
   - `npx tsc --noEmit -p .` e `python3 tools/editorial_check.py EP-ATIVO##` precisam dar **0 erros, 0 avisos** (fonte ≥ 24 px, verde exato, rótulo ilustrativo, CTA SISTEMA).
8. **Revisão de quadros (obrigatória)**
   - `rm -rf build && npx remotion bundle --out-dir build`.
   - `EP=EP-ATIVO## bash tools/stills.sh <dir> <segundos...>`: ~25–30 quadros, de 2 a 4 por cena, logo depois de cada cue importante.
   - Monte folhas de contato com PIL e **olhe de verdade**: sobreposição, texto cortado na borda, câmera tirando conteúdo do quadro, trechos vazios de mais de 1,5 s, rótulos de cenas cruzando na transição.
   - Corrija e revise de novo os quadros afetados.
9. **Áudio e render**
   - `python3 tools/build_audio.py EP-ATIVO##` (−15 LUFS).
   - `bash tools/render_episode.sh EP-ATIVO##`: roda o `editorial_check`, renderiza, gera a capa e valida **11/11**.
10. **Pós-render**
    - `python3 tools/motion_check.py ../OUTPUT/ATIVO_EP##/ATIVO_EP##_FINAL.mp4`: meta ≥ 1,4 e nenhum trecho parado > 1 s.
    - Comparação mixagem × roteiro com Whisper em janelas de 20 s: palavra "sumida" na borda da janela é artefato; confira o trecho inteiro e também a voz sem trilha.
11. **Entrega**
    - `OUTPUT/ATIVO_EP##/relatorio_qa.md` no padrão do EP08: CTA, diagnóstico, voz (tomadas, emendas, pontos para ouvir), validação, cenas, regerar.
    - Registro + linha de histórico em `PROMPTS/GUIA_MELHORIA_CONTINUA.md`.
    - Commit e push.
    - Envie ao usuário o MP4 e a capa e diga em poucas linhas o que precisa de decisão dele.

## 3. Anúncios Meta Ads (`AD-*`)
Padrão próprio, descrito na seção "Criativos de anúncio Meta Ads" do guia:
- 1,1×, transcrição dinâmica (`AD-ATIVO-01/scenes/KText.tsx`) e cortes secos (`buildCuts`);
- CTA "Clique no botão…" (`cta.type: botao_meta`);
- área útil y 270–1250;
- saída em `OUTPUT/ADS/`.

## 4. Estado atual (16/11/2026)
- **Entregues, aguardando avaliação:** ATIVO EP03 (CTA de compartilhamento, mantido), EP04, EP05, EP06 (versão corretor), EP07, EP08; AD-ATIVO-01 v2, AD-ATIVO-02; Stories "Na prática" 01–05 (prévia interna com marca d'água; publicação depende da autorização dos corretores).
- **EP09 ("Autoridade imobiliária não é uma foto ao lado de um carro"):**
  - Roteiro, `episode.json` e as 6 cenas prontos, revisados sobre a linha do tempo provisória (commit `84b623c`).
  - **Falta:** voz (passos 4–5), revisão de quadros com o tempo real, áudio, render e entrega.
  - Transição proposta no lugar de "Siga a ATIVO": "Uma atuação mais estratégica também começa pela sua organização." Pendente de aprovação.
- **Pendências do usuário:**
  - EP08: ouvir 0:07 "não mudou", 0:39 "descreveu" e 0:57 "tornar a decisão". Se algum estiver ruim, regrave só a frase e emende.
  - Aprovar as transições do EP08 ("E orientar com clareza começa por ter cada informação organizada.") e do EP09.
- **Duração:** os roteiros do cliente rendem 72–81 s, acima do ideal de 40–65 s. Não acelerar; sugerir cortes de texto ao usuário.

## 5. Primeira tarefa desta sessão
Finalize o ATIVO EP09 seguindo os passos 4 a 11, usando `GEMINI_KEY_VAR=GEMINI_API_KEY_2`. Depois aguarde o próximo roteiro (`ATIVO_Roteiro_10.docx`), que chegará como anexo, e siga o pipeline completo.
