# EP015 — Licenças, créditos, recursos e ferramentas

Nenhuma imagem, música, efeito sonoro, vídeo ou voz de terceiros entra no vídeo final.

## Recursos visuais usados (todos desenhados em código neste repositório)

| Recurso | Arquivo |
|---|---|
| Bolha "Obrigado." e o ponto que vira "?" | `PRODUCAO/src/episodes/EP015/scenes/Hook.tsx` |
| Fio da conversa, momentos do atendimento, pergunta, agenda de retorno, nós DATA/ASSUNTO/EXPECTATIVA | `scenes/Thread.tsx` |
| Tela dividida encerrada × acompanhada | `scenes/Compare.tsx` |
| Quadro de tarefas e LINK NA BIO | `scenes/Cta.tsx` |
| Câmera virtual, legenda dinâmica, fundo, avatares, ícones, prédios | `PRODUCAO/src/components/` |
| Pessoas e mensagens (fictícias: "Paula S.", tarefas genéricas) | nas próprias cenas |

## Áudio

| Recurso | Origem | Licença |
|---|---|---|
| Narração | Gemini `gemini-3.1-flash-tts-preview`, voz pré-definida `Puck` (rascunho; o aprovado é o `gemini-3.8-flash-tts`), via API com a chave do cliente | Termos da Gemini API — ver pendência 2 |
| Trilha (pad, baixo, bateria) | Sintetizada por `PRODUCAO/tools/build_audio.py` | Próprio |
| 38 efeitos | Sintetizados pelo mesmo script; lista em `audio/eventos_sfx.json` | Próprio |
| Time-stretch da voz | Rubber Band via filtro `rubberband` do FFmpeg | Ferramenta de processamento (GPL) |

## Modelos e ferramentas efetivamente usados

| Etapa | Ferramenta / modelo |
|---|---|
| Voz | Gemini `gemini-3.1-flash-tts-preview`, voz Puck, tomada R1 (`OUTPUT/testes-de-voz/EP015_tomada_R1.wav`); tomada R2 descartada ("sexta" ouvido como "cesta") |
| Conferência e alinhamento | Parakeet TDT 0.6b v3 e Whisper small via sherpa-onnx 2.0.1 |
| Animação e render | Remotion 4.0.542 + React + TypeScript |
| Mixagem e validação | FFmpeg 6.1.1 (`loudnorm` em 2 passagens, `ffprobe`) |
| Fontes | Manrope, JetBrains Mono — SIL OFL 1.1 |

## Pendências

1. **Remotion — uso comercial não confirmado** (grátis até 3 pessoas). Confirmar em remotion.dev/docs/license.
2. **Gemini no plano gratuito.** Termos de uso comercial do áudio não verificados; cota de 10 gerações por dia por modelo.
3. **Voz sintética:** verificar a regra de rótulo de IA do Instagram ao publicar.
4. **Referências** (`MODELS/`): vídeos de terceiros, só para estudo; manter o repositório privado.
