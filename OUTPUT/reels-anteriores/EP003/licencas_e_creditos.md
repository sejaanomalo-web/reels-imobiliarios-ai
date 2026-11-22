# EP003 — Licenças, créditos, recursos e ferramentas

Nenhuma imagem, música, efeito sonoro, vídeo ou voz de terceiros entra no vídeo final.

## Recursos visuais usados (todos desenhados em código neste repositório)

| Recurso | Arquivo |
|---|---|
| Celulares, mesa, "?" | `PRODUCAO/src/episodes/EP003/scenes/Hook.tsx` |
| Cartões de intenção (visita, documentos, bairro) | `scenes/Incoming.tsx` |
| Faixas de contato, selos, ícones de intenção, barra de capacidade | `scenes/Rows.tsx`, `scenes/Queue.tsx` |
| Trilhas e fluxo único, LINK NA BIO | `scenes/Cta.tsx` |
| Câmera virtual (zoom, giro, inclinação, desfoque de movimento) | `PRODUCAO/src/components/Camera.tsx` |
| Legenda dinâmica | `PRODUCAO/src/components/Captions.tsx` → `CaptionsPunch` |
| Fundo em planta baixa, granulação, avatares, ícones | `PRODUCAO/src/components/Background.tsx`, `Art.tsx` |
| Pessoas e mensagens (fictícias) | `scenes/people.ts` |

## Áudio

| Recurso | Origem | Licença |
|---|---|---|
| Narração | Gemini `gemini-3.8-flash-tts`, voz pré-definida `Puck`, via API com a chave do cliente | Termos da Gemini API — **ver pendência 2** |
| Trilha (pad, baixo, bateria) | Sintetizada por `PRODUCAO/tools/build_audio.py` | Próprio |
| 50 efeitos (notificações, vibração, impactos, whips, alerta, cartões, sinos, acorde) | Sintetizados pelo mesmo script; lista em `audio/eventos_sfx.json` | Próprio |
| Time-stretch da voz | Rubber Band, via filtro `rubberband` do FFmpeg | Ferramenta de processamento (GPL); nada dela vai no arquivo além do processamento |

## Modelos e ferramentas efetivamente usados

| Etapa | Ferramenta / modelo | Versão |
|---|---|---|
| Voz | Gemini `gemini-3.8-flash-tts`, voz Puck, tomada única (`OUTPUT/testes-de-voz/EP003_tomada_B_rapida.wav`) | API v1beta, 10–11/11/2026 |
| Tomadas descartadas | `gemini-3.1-flash-tts-preview` (C, perdeu palavras); `gemini-2.5-pro-preview-tts` (sem cota gratuita) | — |
| Conferência da fala e alinhamento das legendas | NVIDIA Parakeet TDT 0.6b v3 (int8) e Whisper small, via sherpa-onnx | sherpa-onnx 2.0.1 |
| Animação e render | Remotion + React + TypeScript; Chromium headless | Remotion 4.0.542 |
| Mixagem, loudness, validação | FFmpeg (`loudnorm` em 2 passagens, `ffprobe`) | 6.1.1 |
| Fontes | Manrope, JetBrains Mono (`@fontsource`) | SIL OFL 1.1 |

## Pendências

1. **Remotion — uso comercial não confirmado** (grátis para equipes de até 3 pessoas; acima disso exige licença). Confirmar em remotion.dev/docs/license.
2. **Gemini no plano gratuito.** Os termos de uso comercial do áudio no plano gratuito não foram verificados. A cota (10 gerações por dia por modelo) também limita a produção em série.
3. **Voz sintética:** verificar a regra vigente de rótulo de IA do Instagram ao publicar.
4. **Referências** (`MODELS/`): vídeos de terceiros, usados só para estudo; manter o repositório privado.
