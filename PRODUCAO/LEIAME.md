# PRODUCAO — como os Reels são gerados

Tudo é código: trocar o texto, a voz ou uma cor e rodar um comando regenera o vídeo inteiro.

## Requisitos

Node 20+, Python 3.10+, FFmpeg. Sem GPU. Em outra máquina o Remotion baixa o próprio Chromium.

```bash
npm install
```

```bash
npm run models
```

`npm run models` instala as bibliotecas Python e baixa ~1,5 GB de modelos para `.models/` (fora do git): Kokoro (voz local opcional), Whisper small (conferência) e Parakeet (alinhamento das legendas).

## Voz

`VOZ/voice_preset.json` → `provider`:

| provider | Como funciona | Precisa de |
|---|---|---|
| `gemini` (atual) | Uma chamada gera a narração inteira; o resultado fica congelado em `episodes/EP###/narration_source.wav` e só é refeito com `--regen` ou se texto/voz/direção mudarem | variável `GEMINI_API_KEY` |
| `arquivo` | Usa o WAV que você colocar em `episodes/EP###/narration_source.wav` (ElevenLabs exportado, locutor humano) | nada |
| `local (kokoro-onnx)` | Síntese local frase a frase, sem custo, mais sintética | nada |

Audições com a narração real: `python3 tools/voice_auditions_gemini.py EP001 Puck Orus Charon`. Adotar uma audição: `python3 tools/build_narration.py EP001 --source <arquivo.wav>`.

Opções de `tools/build_narration.py`:

| Opção | Efeito |
|---|---|
| `--regen` | Gera outra tomada mesmo com a narração em cache |
| `--model <id>` | Rascunho com outro modelo do Gemini (ex.: cota do aprovado esgotada). Na próxima execução sem `--model`, o pipeline tenta voltar ao aprovado |
| `--force` | Adota a nova tomada mesmo que ela reconheça < 97% do texto (por padrão, a narração existente é mantida e a tomada fraca vai para `OUTPUT/EP###/audio/`) |
| `--source <wav>` | Adota um arquivo como narração oficial |

A chave atual está no plano gratuito: 10 gerações por dia **por modelo**. Um episódio usa de 1 a 4.

## Produzir um episódio

```bash
npm run ep -- EP001
```

Etapas, que também rodam separadas:

| Comando | O que faz | Escreve |
|---|---|---|
| `npm run narration -- EP001` | Gera (ou reaproveita) a narração com a voz de `VOZ/voice_preset.json`, confere por transcrição e mede o tempo de cada palavra | `public/EP001/narration.wav`, `src/episodes/EP001/timeline.json`, `OUTPUT/reels-anteriores/EP001/EP001_legendas.srt` |
| `npm run audio -- EP001` | Sintetiza trilha e efeitos, mixa e masteriza em −15 LUFS | `public/EP001/mix.wav`, stems em `OUTPUT/reels-anteriores/EP001/audio/` |
| `npm run render -- EP001` | Renderiza MP4 e capa e valida com ffprobe | `OUTPUT/reels-anteriores/EP001/EP001_final_1080x1920.mp4`, `EP001_capa.png`, `validacao_tecnica.json` |
| `npm run dev` | Abre o Remotion Studio para pré-visualizar e ajustar | — |

## Onde editar

| Quero mudar… | Arquivo |
|---|---|
| Texto narrado, quebra e ênfase das legendas (pausas: só no modo Kokoro) | `episodes/EP001/episode.json` → `segments` (`*palavra*` = ênfase, `\|` = quebra de bloco) |
| Em que palavra cada animação dispara | `episode.json` → `cues` |
| Efeitos sonoros, volume e harmonia da trilha | `episode.json` → `sfx`, `music` (`music.prog`: acorde por cena ou marca) |
| Séries de eventos (ex.: 10 anúncios em sequência) | `episode.json` → `series` (`"type": "between"`) |
| Esconder a legenda de um trecho que já é tipografia | `episode.json` → `hideCaptions` |
| Voz, velocidade, pronúncia | `../VOZ/voice_preset.json` |
| Cores, fontes | `src/theme.ts` (e `../MARCA/brand.json`) |
| Desenho e animação de uma cena | `src/episodes/EP001/scenes/*.tsx` |
| Legenda (tamanho, posição, estilo) | `src/components/Captions.tsx` |

Imagem e som leem o mesmo `timeline.json`, então nada sai de sincronia quando a narração muda de duração.

## Novo episódio

1. Copiar `episodes/EP001/` para `episodes/EPNNN/` e trocar texto, marcas e sons.
2. Criar `src/episodes/EPNNN/` com cenas próprias (reaproveitar `components/`, não as cenas — cada roteiro pede metáfora visual própria) e registrar em `src/Root.tsx`.
3. `npm run ep -- EPNNN`.

## Padrão v2 (a partir do EP003)

Ver `../PROMPTS/GUIA_MELHORIA_CONTINUA.md`. Peças:

| Peça | Onde |
|---|---|
| Direção de voz por episódio, encurtamento de pausas, ritmo-alvo | `episode.json` → `voice` (`direction`, `tightenPauses`, `targetWpm`, `maxStretch`) |
| Tomadas de voz com métricas | `python3 tools/voice_takes.py EP### A B` (direções em `episodes/EP###/voice_takes.json`) |
| Métricas da voz | `tools/voice_metrics.py` |
| Medição de movimento do vídeo | `python3 tools/motion_check.py ../OUTPUT/EP###/<arquivo>.mp4` |
| Câmera virtual | `src/components/Camera.tsx` |
| Legenda dinâmica | `CaptionsPunch` em `src/components/Captions.tsx` |
| Bateria e respiros na trilha | `episode.json` → `music.drums`, `music.drops` |
| Nome dos arquivos de entrega | `episode.json` → `deliverables` (`final`, `narration`) |
| Cópia dos editáveis em `OUTPUT/EP###/editaveis/` | feita por `npm run render` |

## Limites conhecidos

- Ninguém ouve o áudio no pipeline: a conferência é por transcrição e por medição de volume. Ouvir antes de publicar.
- `EP=EP002 tools/stills.sh <pasta> <segundos…>` gera quadros avulsos para revisão visual.
- Licença do Remotion para uso comercial: ver `OUTPUT/reels-anteriores/EP001/licencas_e_creditos.md`.

## Legenda pronta para Instagram (nova etapa editorial obrigatória)

Para cada episódio, depois do roteiro final e da capa, o agente Claude Code deve ler `../PROMPTS/GUIA_LEGENDAS_INSTAGRAM_ATIVO.md` e os quatro exemplos em `../PROMPTS/EXEMPLOS_LEGENDAS/`, escrever uma legenda ORIGINAL e salvar `OUTPUT/<outputDir>/legenda_instagram.txt` (caminho relativo à raiz do repositório). Arquivo em UTF-8 pronto para copiar/colar, sem negrito ou Markdown, com primeira linha fixa `📲 Comente "SISTEMA" e conheça uma solução personalizada para organizar seus imóveis, leads e atendimentos.`, conclusão útil e exatamente 5 hashtags minúsculas.

**Importante:** esse é um passo de criação de texto a ser executado pelo agente Claude Code depois do pipeline técnico. O script `npm run ep` apenas gera narração, áudio, vídeo e capa; não tem um modelo editorial embutido e **não gera sozinho** o `.txt`. Ao pedir para o Claude Code produzir o vídeo, incluir a legenda na mesma entrega. Se o vídeo já existir, gerar apenas a legenda sem refazer o render ou a voz. Consulte `episode.json` para respeitar `outputDir` quando não for `EP###`.

## Esteira Editorial Diária e os 4 modelos (23/11/2026) — substitui a rotação fixa 1→4 e a esteira de 5 estilos
Grade do dia: `python3 tools/grade.py nova|validar|status|semana|resultado` (`grade/AAAA-MM-DD.json`, ver `grade/LEIAME.md` e `../PROMPTS/ESTEIRA_EDITORIAL_DIARIA_ATIVO.md`). O modelo é escolhido por adequação, com justificativa, sob guardrails; episódio novo: `novo_episodio.build(..., formato="<modelo>", grade="AAAA-MM-DD", slot="HH:MM")` (cartoon-explicativo, pictograma-cinematografico, planta-tecnica, maquete-3d) — recusa sem grade, sem roteiro aprovado ou com guardrail violado sem justificativa; fora da grade só com `ATIVO_FORA_DA_GRADE="<motivo>"`. `tools/esteira.py diversidade` mostra o uso recente de cada modelo (desempate). `tools/publicar.py` confere o horário do slot (`--fora-da-grade "<motivo>"` para exceção). Skills em `.claude/skills/`; kits em `src/estilos/` (cartoon, pictograma, planta, maquete). O 4º modelo é 3D (`@remotion/three`).

### Esteira de 5 estilos (21/11/2026) — ARQUIVADA, só episódios entregues
Os episódios entregues nela usaram o próximo estilo da esteira e o gerador `tools/novo_episodio.py`. Kits: `src/estilos/` (1 palitinho, 2 lousa, 3 planta, 4 tipografia) e `src/episodes/NOV26/kit.tsx` (5 painel). Guia: `../PROMPTS/GUIA_ESTILOS_VISUAIS_ATIVO.md`.
