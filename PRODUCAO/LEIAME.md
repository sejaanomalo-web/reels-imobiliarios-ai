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

## Produzir um episódio

```bash
npm run ep -- EP001
```

Etapas, que também rodam separadas:

| Comando | O que faz | Escreve |
|---|---|---|
| `npm run narration -- EP001` | Gera (ou reaproveita) a narração com a voz de `VOZ/voice_preset.json`, confere por transcrição e mede o tempo de cada palavra | `public/EP001/narration.wav`, `src/episodes/EP001/timeline.json`, `OUTPUT/EP001/EP001_legendas.srt` |
| `npm run audio -- EP001` | Sintetiza trilha e efeitos, mixa e masteriza em −15 LUFS | `public/EP001/mix.wav`, stems em `OUTPUT/EP001/audio/` |
| `npm run render -- EP001` | Renderiza MP4 e capa e valida com ffprobe | `OUTPUT/EP001/EP001_final_1080x1920.mp4`, `EP001_capa.png`, `validacao_tecnica.json` |
| `npm run dev` | Abre o Remotion Studio para pré-visualizar e ajustar | — |

## Onde editar

| Quero mudar… | Arquivo |
|---|---|
| Texto narrado, quebra e ênfase das legendas (pausas: só no modo Kokoro) | `episodes/EP001/episode.json` → `segments` (`*palavra*` = ênfase, `\|` = quebra de bloco) |
| Em que palavra cada animação dispara | `episode.json` → `cues` |
| Efeitos sonoros e volume da trilha | `episode.json` → `sfx`, `music` |
| Voz, velocidade, pronúncia | `../VOZ/voice_preset.json` |
| Cores, fontes | `src/theme.ts` (e `../MARCA/brand.json`) |
| Desenho e animação de uma cena | `src/episodes/EP001/scenes/*.tsx` |
| Legenda (tamanho, posição, estilo) | `src/components/Captions.tsx` |

Imagem e som leem o mesmo `timeline.json`, então nada sai de sincronia quando a narração muda de duração.

## Novo episódio

1. Copiar `episodes/EP001/` para `episodes/EPNNN/` e trocar texto, marcas e sons.
2. Criar `src/episodes/EPNNN/` com cenas próprias (reaproveitar `components/`, não as cenas — cada roteiro pede metáfora visual própria) e registrar em `src/Root.tsx`.
3. `npm run ep -- EPNNN`.

## Limites conhecidos

- Ninguém ouve o áudio no pipeline: a conferência é por transcrição e por medição de volume. Ouvir antes de publicar.
- `tools/stills.sh <pasta> <segundos…>` gera quadros avulsos para revisão visual.
- Licença do Remotion para uso comercial: ver `OUTPUT/EP001/licencas_e_creditos.md`.
