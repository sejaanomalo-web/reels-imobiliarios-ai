# EP018 — Licenças, créditos, recursos e ferramentas

Nenhuma imagem, música, efeito sonoro, vídeo ou voz de terceiros entra no vídeo final.

## Recursos visuais (todos desenhados em código neste repositório)

| Recurso | Arquivo |
|---|---|
| Esteira de links, contador 20 LINKS, ≠ 20 ARGUMENTOS | `PRODUCAO/src/episodes/EP018/scenes/Hook.tsx` |
| Pedido do restaurante, mapa com 20 pins, morph para catálogo de imóveis | `scenes/Pins.tsx` |
| Prioridades × fichas, dez adjetivos, carimbo CRITÉRIO | `scenes/Criterio.tsx` |
| 20 → 3 opções com porquê, pergunta, toque de escolha | `scenes/Picks.tsx` |
| Prioridades registradas, módulos, campo de comentário genérico, fecho COMENTE "SISTEMA" | `scenes/Cta.tsx` |
| Selos, etiquetas, bolhas, ícones | `scenes/ui.tsx` |
| Câmera virtual, legenda, fundo, mapa, pins, casas, ícone de link | `PRODUCAO/src/components/` |
| Pessoa e imóveis (fictícios: Paulo C.; Imóvel 1–2; Opção 1–3; "imóvel 01…20") | sem dados reais |

Nenhuma interface simula comentário ou mensagem de pessoa real: o campo de comentário não tem perfil, nome de usuário, foto ou curtidas; não há interface de Instagram/WhatsApp reproduzida. Telas de sistema marcadas "interface ilustrativa".

## Áudio

| Recurso | Origem | Licença |
|---|---|---|
| Narração | Gemini `gemini-3.8-flash-tts`, voz `Puck`, preset original aprovado, 1,0×, tomada A sem edição | Termos da Gemini API — ver pendência 2 |
| Trilha (pad + baixo, sem bateria; Em→C→Dm→G→Cadd9→F→Cadd9, 94 bpm) | Sintetizada por `PRODUCAO/tools/build_audio.py` | Próprio |
| 27 efeitos | Sintetizados pelo mesmo script; lista em `audio/eventos_sfx.json` | Próprio |

## Ferramentas

| Etapa | Ferramenta |
|---|---|
| Voz | Gemini TTS (REST), 3 tomadas; B e C descartadas (leram a direção em voz alta) |
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
