# Prompt para continuar o lote NOV26 em outra sessão

Cole o bloco abaixo como primeira mensagem de uma sessão nova com o repositório `reels-imobiliarios-ai` conectado.

---

Continue a produção do lote **"30 Reels da ATIVO — novembro 2026"** neste repositório, exatamente de onde parou. Responda em português, direto e crítico, e verifique na web o que não souber antes de afirmar.

## 0. Preparação (obrigatória, nesta ordem)
1. `git fetch origin feat/ativo-identidade-editorial-stories-v2 && git checkout feat/ativo-identidade-editorial-stories-v2 && git pull --ff-only`. Trabalhe só nessa branch, sem PR, sem force push e sem `main`.
2. Leia:
   - `CLAUDE.md`
   - `PROMPTS/GUIA_MELHORIA_CONTINUA.md` (seção do lote NOV26 e registros recentes)
   - `PRODUCAO/lotes/NOV26/LEIAME.md` (regras do lote)
   - `PRODUCAO/lotes/NOV26/estado.json` (estado de cada episódio)
   - `PRODUCAO/LEIAME.md`
   - `VOZ/voice_preset.json`
3. **O próximo episódio é o primeiro do `estado.json` com status `pendente` ou `bloqueado`** (no momento: `ATIVO_NOV26_04`, "Juros altos, crédito bilionário"). Nunca refaça um episódio marcado como `entregue`. Marque `em_producao` ao começar.
4. Roteiros em `ROTEIROS/LOTE_NOV2026/ATIVO_NOV26_##.md`. O docx original do cliente fica na mesma pasta.
5. Modelos de código: os episódios entregues `PRODUCAO/src/episodes/ATIVO-NOV26-01..03/` (`Episode.tsx`, `Cover.tsx`, `scenes/Scenes.tsx`), o kit do lote `PRODUCAO/src/episodes/NOV26/kit.tsx` e a CTA `PRODUCAO/src/episodes/NOV26/Cta.tsx`. Para a configuração, `PRODUCAO/episodes/ATIVO-NOV26-03/episode.json`.

## 1. Regras do lote (não negociar)
- **Produção sequencial:** um vídeo por vez, na ordem. Cada um precisa estar renderizado, validado, registrado, com commit e push, e avisado ao usuário (MP4 + capa enviados) antes de começar o próximo. Depois, siga automaticamente para o próximo enquanto houver cota.
- **Voz:**
  - Gemini `gemini-3.8-flash-tts`, voz `Puck`, pt-BR, **1,0×**: sem aceleração, sem time-stretch e sem trocar modelo ou voz.
  - Chaves só em variáveis de ambiente: `GEMINI_API_KEY` e `GEMINI_API_KEY_2`. Escolha com `GEMINI_KEY_VAR=<nome>`. Nunca imprima, grave ou peça a chave.
  - Antes de gerar, confira com `env | grep -o '^GEMINI[A-Z_0-9]*'` quais variáveis existem nesta sessão.
  - Cada chave tem cerca de 10 gerações por dia; cada tomada conta 1. Faça 2 tomadas por episódio.
  - **Se der erro de chave ou de cota:** pare, marque o episódio como `bloqueado` no `estado.json` com o motivo, faça commit, avise o usuário e aguarde. Nunca troque de voz.
- **Voz dinâmica (regra do cliente, 19/11/2026):** a direção do preset mudou (calorosa, contagiante, quase sem pausas) e todo `episode.json` leva `"voice": {"tightenPauses": {"min": 0.06, "max": 0.09}}`. Continua 1,0× e sem time-stretch. Ver o topo de `PROMPTS/GUIA_MELHORIA_CONTINUA.md`.
- **Verde do lote:** `#02FB3F`, só via `A` / `aa()` do kit (ou `ACCENT_NOV26` / `accentAlpha`). `Background` e `Captions` recebem `accent={A}`. Proibido usar `BRAND.hex`, `brandAlpha` ou `C.accent` nos arquivos do lote: o `editorial_check` bloqueia. A logo é só o arquivo oficial (`BRAND.logo`).
- **CTA:**
  - A fala termina sempre com a CTA SISTEMA: "Quer conhecer um sistema personalizado para organizar seus imóveis, leads e atendimentos? Comente SISTEMA que eu te envio os detalhes pelo Direct."
  - A CTA do roteiro (salve, compartilhe, siga) vira uma frase de transição curta, adaptada ao tema e de preferência usando o "TEXTO NA TELA" do roteiro.
  - Registre `cta.original_cta` e `cta.transition_adapted` e avise que a frase precisa de aprovação.
  - O episódio 30 já traz a CTA SISTEMA: use-a sem transição.
- **Narração:** só GANCHO + TAKES, palavra por palavra; as direções visuais não são lidas. Números por extenso como no roteiro; dígitos só na tela.
- **Apuração:**
  - Antes de gravar, confira na web o fato principal de cada roteiro (siga a NOTA DE APURAÇÃO) e registre em `episode.json → apuracao`, com fontes e data.
  - Notícia em estudo ou projeção nunca vira fato na tela.
  - Sem taxa, preço, valor, endereço ou percentual inventado; se a nota pedir, deixe o valor fora.
  - Perfis, imóveis e telas desenhadas levam o rótulo ILUSTRATIVO.
- **Trilha:** discreta, sem bateria (não use `music.drums`).

## 2. Pipeline por episódio (sempre a partir de `PRODUCAO/`)
1. **`episodes/ATIVO-NOV26-##/episode.json`**, copiando a estrutura do 03:
   - `segments` frase a frase, com `caption` em blocos `|` e palavras-chave em `*...*`;
   - `cues` validados por `assert` contra as palavras de cada segmento (inclua `cta_quer`, `cta_sys`, `cta_tiles`, `cta_comment`, `cta_word`, `cta_direct`, `cta_end`);
   - `sfx`, `music.prog`, `diagnostico`, `apuracao`, `cta`;
   - `outputDir`: `ATIVO_NOV26_##`.
2. **Voz:** `GEMINI_KEY_VAR=... python3 tools/gen_take.py ATIVO-NOV26-## A|B <scratchpad>/n##`.
   - Confira no Parakeet (impresso pelo script) e no Whisper (`tools/tts_common.transcribe`), com contexto.
   - Descarte tomada que leu a instrução de estilo, inventou interjeição ("Ó,"), perdeu ou trocou palavra que muda o sentido.
   - Para conferir a sílaba de abertura, transcreva-a isolada com silêncio em volta, porque o Whisper inventa "Ó" no início do arquivo.
   - Coloquiais aceitos: "Comenta", "Acompanha".
   - **Emenda permitida:** troque uma frase pela da outra tomada, cortando no meio da pausa, com crossfade de 12 ms, ganho por RMS e tom conferido. O código está no registro do NOV26_01/03 e no EP07.
3. `python3 tools/build_narration.py ATIVO-NOV26-## --source <wav>`.
4. **Cenas:** `src/episodes/ATIVO-NOV26-##/` com `scenes/Scenes.tsx` (Hook, Take1–3), `Episode.tsx` e `Cover.tsx`.
   - Registre `Composition` + `Still` na pasta `ATIVO-NOV26` de `src/Root.tsx`.
   - **A câmera recebe a posição da câmera:** `y` positivo sobe o conteúdo, `x` positivo leva o conteúdo para a esquerda.
   - Conteúdo entre y≈280 e y≈1300; legenda em y≈1392; títulos fora da câmera.
   - Varie a metáfora visual por episódio, seguindo FORMATO / CENA / MOVIMENTO do roteiro.
   - O texto de abertura do roteiro aparece desde o quadro 0.
5. `npx tsc --noEmit -p .` e `python3 tools/editorial_check.py ATIVO-NOV26-##` precisam dar **0 erros e 0 avisos**.
6. **Revisão de quadros:** `rm -rf build && npx remotion bundle --out-dir build`, depois `EP=ATIVO-NOV26-## bash tools/stills.sh <dir> <~18 segundos>`.
   - Monte folhas de contato com PIL e olhe: sobreposição de título, corte na borda, trecho vazio > 1,5 s, traço ou rótulo antes da hora.
   - Corrija e reveja.
7. `python3 tools/build_audio.py ATIVO-NOV26-##`, depois `bash tools/render_episode.sh ATIVO-NOV26-##` (precisa dar 11/11).
8. `python3 tools/motion_check.py ../OUTPUT/ATIVO_NOV26_##/ATIVO_NOV26_##_FINAL.mp4`: meta ≥ 1,4 e nenhum trecho parado > 1 s.
   - Se ficar abaixo, ache os segundos fracos e acrescente percurso de câmera ou flutuação.
9. **Mixagem × roteiro com Whisper** em janelas de 20 s. Palavra "sumida" na borda da janela é artefato: confira o trecho inteiro.
10. **Entrega:**
    - `OUTPUT/ATIVO_NOV26_##/relatorio_qa.md` no padrão do 03;
    - **legenda** `OUTPUT/ATIVO_NOV26_##/legenda_instagram.txt` (leia `PROMPTS/GUIA_LEGENDAS_INSTAGRAM_ATIVO.md` e os 4 exemplos de `PROMPTS/EXEMPLOS_LEGENDAS/`; confira com `python3 tools/legenda_check.py ATIVO_NOV26_##`);
    - **pasta de publicação**: `python3 tools/publicar_lote.py NOV26 <n>` → `PUBLICACAO/NOV26/REELS_01_AO_10/##/` (vídeo, capa, legenda .docx e .txt);
    - `estado.json` com o episódio `entregue`, vídeo, validação, voz e notas;
    - linha no histórico do guia;
    - commit e push;
    - envie o MP4 e a capa ao usuário com o caminho e o resultado da validação, e mande a notificação;
    - siga para o próximo.

## 3. Estado em 17/11/2026, 18:00 UTC
- **Entregues:** NOV26_01 (Selic), 02 (Caixa estuda) e 03 (poupança). Commits até `75cda37`.
- **Próximo:** NOV26_04. Estava `bloqueado` por cota de voz da sessão anterior; nesta sessão, se houver cota, desbloqueie e produza.
- **Pendências do usuário:**
  - aprovar as frases de transição dos 01–03;
  - ouvir 0:00 do 01;
  - reconferir o status da Caixa antes de publicar o 02.
