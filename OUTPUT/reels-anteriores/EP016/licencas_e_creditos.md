# EP016 — Licenças, créditos, recursos e ferramentas

Nenhuma imagem, música, efeito sonoro, vídeo ou voz de terceiros entra no vídeo final.

## Recursos visuais (todos desenhados em código neste repositório)

| Recurso | Arquivo |
|---|---|
| Conversa parada, "Alguma novidade?" e silêncio | `PRODUCAO/src/episodes/EP016/scenes/Hook.tsx` |
| Mapa ilustrativo, região mencionada, mensagem digitada no tempo da fala | `scenes/Compose.tsx` |
| COBRAR × AJUDAR, busca atualizada | `scenes/Compare.tsx` |
| Base de contatos, oferta genérica barrada, segmentação, NÃO CONTATAR | `scenes/Base.tsx` |
| Ficha do cliente, módulos IMÓVEIS/LEADS/ATENDIMENTOS, campo de comentário genérico, fecho COMENTE "SISTEMA" | `scenes/Cta.tsx` |
| Bolhas, etiquetas, ícones (usuário, conversa, avião, cadeado) | `scenes/ui.tsx` |
| Câmera virtual, legenda, fundo, avatares, mapa, pin, ícones | `PRODUCAO/src/components/` |
| Pessoas (fictícias: Lucas F., Ana P., Bruno M., Carla S., Diego R., Elisa T., Fábio L.) | só iniciais, sem foto, sem telefone |

Nenhuma interface simula comentário ou mensagem de pessoa real: o campo de comentário não tem perfil, nome de usuário, foto ou curtidas; não há interface de Instagram/WhatsApp reproduzida. Telas de sistema marcadas "interface ilustrativa".

## Áudio

| Recurso | Origem | Licença |
|---|---|---|
| Narração | Gemini `gemini-3.8-flash-tts`, voz `Puck`, preset original aprovado, 1,0×, tomada C sem edição | Termos da Gemini API — ver pendência 2 |
| Trilha (pad + baixo, sem bateria; Am→F→Dm→C→G→F→Cadd9, 96 bpm) | Sintetizada por `PRODUCAO/tools/build_audio.py` | Próprio |
| 27 efeitos | Sintetizados pelo mesmo script; lista em `audio/eventos_sfx.json` | Próprio |

## Ferramentas

| Etapa | Ferramenta |
|---|---|
| Voz | Gemini TTS (REST), 3 tomadas; A e B descartadas (leram a direção) |
| Alinhamento e conferência | Parakeet TDT 0.6b v3 e Whisper small via sherpa-onnx |
| Animação e render | Remotion 4.0.542 + React + TypeScript |
| Mixagem e validação | FFmpeg (`loudnorm` 2 passagens, `ffprobe`) |
| Fontes | Manrope, JetBrains Mono — SIL OFL 1.1 |

## Pendências

1. **Remotion — uso comercial não confirmado** (grátis até 3 pessoas). Confirmar em remotion.dev/docs/license.
2. **Gemini no plano gratuito.** Termos de uso comercial do áudio não verificados; cota de 10 gerações/dia por modelo.
3. **Voz sintética:** verificar a regra de rótulo de IA do Instagram ao publicar.
4. **Operação da CTA:** quem comentar SISTEMA espera resposta no Direct. Isso precisa existir (manual ou automação já configurada) antes de publicar — o vídeo não promete resposta automática nem prazo.
5. **Referências** (`MODELS/`): vídeos de terceiros, só para estudo; manter o repositório privado.
