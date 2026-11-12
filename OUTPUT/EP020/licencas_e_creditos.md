# EP020 — Licenças, créditos, recursos e ferramentas

Nenhuma imagem, música, efeito sonoro, vídeo ou voz de terceiros entra no vídeo final.

## Recursos visuais (todos desenhados em código neste repositório)

| Recurso | Arquivo |
|---|---|
| Agenda da semana transbordando, rotas cruzadas, carimbo NEM SEMPRE | `PRODUCAO/src/episodes/EP020/scenes/Agenda.tsx` |
| Mapa com rota do interessado, apartamento, dúvidas (3º quarto, planejamento) | `scenes/Doubt.tsx` |
| Três perguntas, respostas do avatar ilustrativo, deslocamento evitado | `scenes/Align.tsx` |
| Bifurcação VISITA CONFIRMADA × AJUSTAR BUSCA, QUALIFICAÇÃO ≠ PRESSÃO | `scenes/Routes.tsx` |
| Ficha de critérios do comprador, módulos, campo de comentário genérico, fecho COMENTE "SISTEMA" | `scenes/Cta.tsx` |
| Ícones (agenda, controles, usuário, avião), selos, etiquetas | `scenes/ui.tsx` |
| Câmera virtual, legenda, fundo, mapa, pin, casa | `PRODUCAO/src/components/` |
| Pessoa e dados (fictícios: Rafael T.; respostas do avatar; sábado, 10h) | sem dados reais |

Nenhuma interface simula comentário ou mensagem de pessoa real: o campo de comentário não tem perfil, nome de usuário, foto ou curtidas; não há interface de Instagram/WhatsApp reproduzida. Telas de sistema marcadas "interface ilustrativa".

## Áudio

| Recurso | Origem | Licença |
|---|---|---|
| Narração | Gemini `gemini-3.8-flash-tts`, voz `Puck`, preset original aprovado, 1,0×, tomada C sem edição | Termos da Gemini API — ver pendência 2 |
| Trilha (pad + baixo, sem bateria; Dm→Bb→C→F→Cadd9→Bb→F, 92 bpm) | Sintetizada por `PRODUCAO/tools/build_audio.py` | Próprio |
| 21 efeitos | Sintetizados pelo mesmo script; lista em `audio/eventos_sfx.json` | Próprio |

## Ferramentas

| Etapa | Ferramenta |
|---|---|
| Voz | Gemini TTS (REST), 3 tomadas limpas; C escolhida (A: "alinho"; B: pausa em "Comenta, sistema") |
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
