# EP019 — Licenças, créditos, recursos e ferramentas

Nenhuma imagem, música, efeito sonoro, vídeo ou voz de terceiros entra no vídeo final.

## Recursos visuais (todos desenhados em código neste repositório)

| Recurso | Arquivo |
|---|---|
| Onda sonora de 3:00, relógio, agulha, pausa na metade | `PRODUCAO/src/episodes/EP019/scenes/Wave.tsx` |
| Blocos de fala, fichas de endereço/horário/documentação, queda | `scenes/Details.tsx` |
| Áudio → resumo de três linhas | `scenes/Summary.tsx` |
| Ficha de acompanhamento, memória que se desfaz, conferência | `scenes/Followup.tsx` |
| Histórico de atendimentos, módulos, campo de comentário genérico, fecho COMENTE "SISTEMA" | `scenes/Cta.tsx` |
| Onda determinística, ícones play/pausa, selos, etiquetas, bolhas | `scenes/ui.tsx` |
| Câmera virtual, legenda, fundo, avatares | `PRODUCAO/src/components/` |
| Pessoa e dados (fictícios: Marina S.; Rua das Acácias, 120; sábado, 10h; RG e comprovante) | sem dados reais |

Nenhuma interface simula comentário ou mensagem de pessoa real: o campo de comentário não tem perfil, nome de usuário, foto ou curtidas; não há interface de Instagram/WhatsApp reproduzida. Telas de sistema marcadas "interface ilustrativa".

## Áudio

| Recurso | Origem | Licença |
|---|---|---|
| Narração | Gemini `gemini-3.8-flash-tts`, voz `Puck`, preset original aprovado, 1,0×, tomada A com um corte nos silêncios (trecho da direção lido por engano) | Termos da Gemini API — ver pendência 2 |
| Trilha (pad + baixo, sem bateria; Am→F→Em→C→G→F→Cadd9, 90 bpm) | Sintetizada por `PRODUCAO/tools/build_audio.py` | Próprio |
| 19 efeitos | Sintetizados pelo mesmo script; lista em `audio/eventos_sfx.json` | Próprio |

## Ferramentas

| Etapa | Ferramenta |
|---|---|
| Voz | Gemini TTS (REST), 3 tomadas; B trocou o gancho, C leu a direção e repetiu o gancho; A editada (corte de 6,0 s nos silêncios) |
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
