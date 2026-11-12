# EP031 — Licenças, créditos, recursos e ferramentas

Nenhuma imagem, música, efeito sonoro, vídeo ou voz de terceiros entra no vídeo final.

## Recursos visuais (todos desenhados em código neste repositório)

| Recurso | Arquivo |
|---|---|
| Formulário enviado uma vez, duas conversas paralelas, agendas QUI × SEX, dúvida do comprador e da equipe | `PRODUCAO/src/episodes/EP031/scenes/Split.tsx` |
| Dois corretores, linhas de distribuição cruzadas → definidas, ficha com RESPONSÁVEL/HISTÓRICO, transferência registrada | `scenes/Flow.tsx` |
| Regra de distribuição, módulos, campo de comentário genérico, fecho COMENTE "SISTEMA" | `scenes/Cta.tsx` |
| Bolhas, ícones, selos, etiquetas, corretores fictícios | `scenes/ui.tsx` |
| Câmera virtual, legenda, fundo, avatares | `PRODUCAO/src/components/` |
| Pessoas fictícias (Carla M.; Corretor A, Corretor B; mensagens ilustrativas) | sem dados reais |

**Marca:** nenhum logo, símbolo ou elemento da ATIVO foi desenhado. O pedido citou o símbolo aprovado ("A" branco e seta verde com brilho), mas o arquivo não está no repositório (nem na `main`) nem no Google Drive conectado — não foi recriado por aproximação. O vídeo usa o sistema visual provisório dos episódios aprovados.

Nenhuma interface simula comentário ou mensagem de pessoa real: o campo de comentário não tem perfil, nome de usuário, foto ou curtidas; não há interface de Instagram/WhatsApp reproduzida. Telas de sistema marcadas "interface ilustrativa".

## Áudio

| Recurso | Origem | Licença |
|---|---|---|
| Narração | Gemini `gemini-3.8-flash-tts`, voz `Puck`, preset original aprovado, 1,0×, tomada B com o início cortado (direção lida + 1ª leitura do gancho), sem emenda no meio da fala | Termos da Gemini API — ver pendência 2 |
| Trilha (pad + baixo, sem bateria; Dm→Bb→A→F→Cadd9→Bb→F, 94 bpm) | Sintetizada por `PRODUCAO/tools/build_audio.py` | Próprio |
| 19 efeitos | Sintetizados pelo mesmo script; lista em `audio/eventos_sfx.json` | Próprio |

## Ferramentas

| Etapa | Ferramenta |
|---|---|
| Voz | Gemini TTS (REST), 3 tomadas — todas leram a direção e repetiram o gancho; B usada a partir da 2ª leitura do gancho |
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
