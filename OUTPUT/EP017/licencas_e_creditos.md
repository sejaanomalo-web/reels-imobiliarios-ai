# EP017 — Licenças, créditos, recursos e ferramentas

Nenhuma imagem, música, efeito sonoro, vídeo ou voz de terceiros entra no vídeo final.

## Recursos visuais (todos desenhados em código neste repositório)

| Recurso | Arquivo |
|---|---|
| Porta, cartão da visita, carimbo NÃO → PISTA | `PRODUCAO/src/episodes/EP017/scenes/Hook.tsx` |
| Planta, rua com trânsito, mapa com pin, mesa de jantar apertada | `scenes/Visits.tsx` |
| Registro da visita, DESCARTOU, MOTIVO, próxima indicação | `scenes/Record.tsx` |
| Funcionou × não funcionou, filtros, três fichas de imóveis | `scenes/Criteria.tsx` |
| Jornada da cliente, módulos, campo de comentário genérico, fecho COMENTE "SISTEMA" | `scenes/Cta.tsx` |
| Selos ✓/✕, etiquetas, ícones (lupa, usuário, conversa, avião, X) | `scenes/ui.tsx` |
| Câmera virtual, legenda, fundo, avatares, mapa, pin, casas | `PRODUCAO/src/components/` |
| Pessoa e imóveis (fictícios: Renata M.; Opções A, B, C) | só iniciais e desenhos, sem dados reais |

Nenhuma interface simula comentário ou mensagem de pessoa real: o campo de comentário não tem perfil, nome de usuário, foto ou curtidas; não há interface de Instagram/WhatsApp reproduzida. Telas de sistema marcadas "interface ilustrativa".

## Áudio

| Recurso | Origem | Licença |
|---|---|---|
| Narração | Gemini `gemini-3.8-flash-tts`, voz `Puck`, preset original aprovado, 1,0×, tomada A sem edição | Termos da Gemini API — ver pendência 2 |
| Trilha (pad + baixo, sem bateria; Dm→Bb→A→F→C→Bb→F, 92 bpm) | Sintetizada por `PRODUCAO/tools/build_audio.py` | Próprio |
| 23 efeitos | Sintetizados pelo mesmo script; lista em `audio/eventos_sfx.json` | Próprio |

## Ferramentas

| Etapa | Ferramenta |
|---|---|
| Voz | Gemini TTS (REST); tomadas A e C geradas, B bloqueada por limite da API; C descartada (palavra inserida) |
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
