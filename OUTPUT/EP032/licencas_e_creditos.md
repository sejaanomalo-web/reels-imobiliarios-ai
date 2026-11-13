# EP032 — Licenças, créditos, recursos e ferramentas

Nenhuma imagem, música, efeito sonoro, vídeo ou voz de terceiros entra no vídeo final.

## Recursos visuais (todos desenhados em código neste repositório)

| Recurso | Arquivo |
|---|---|
| Quadro de 20 leads com/sem retorno, reunião com falas genéricas, ATIVIDADE ≠ AVANÇO | `PRODUCAO/src/episodes/EP032/scenes/Board.tsx` |
| Tabela das três coisas, vigilância riscada, gestor apoia, gargalo real | `scenes/Table.tsx` |
| Histórico do lead, módulos, campo de comentário genérico, fecho COMENTE "SISTEMA" | `scenes/Cta.tsx` |
| Selos, etiquetas, ícones | `scenes/ui.tsx` |
| Câmera virtual, legenda, fundo, avatares | `PRODUCAO/src/components/` |
| Pessoas e leads fictícios (iniciais A–W, Lead 1–4, Marta S.) | sem dados reais nem métricas inventadas |

**Marca:** nenhum logo, símbolo ou elemento da ATIVO foi desenhado. O pedido citou o símbolo aprovado ("A" branco e seta verde com brilho), mas o arquivo não está no repositório (nem na `main`) nem no Google Drive conectado — não foi recriado por aproximação. O vídeo usa o sistema visual provisório dos episódios aprovados.

Nenhuma interface simula comentário ou mensagem de pessoa real: o campo de comentário não tem perfil, nome de usuário, foto ou curtidas; não há interface de Instagram/WhatsApp reproduzida. Telas de sistema marcadas "interface ilustrativa".

## Áudio

| Recurso | Origem | Licença |
|---|---|---|
| Narração | Gemini `gemini-3.8-flash-tts`, voz `Puck`, preset original aprovado, 1,0×, tomada única sem edição | Termos da Gemini API — ver pendência 2 |
| Trilha (pad + baixo, sem bateria; Am→F→C→G→Cadd9→F→Cadd9, 92 bpm) | Sintetizada por `PRODUCAO/tools/build_audio.py` | Próprio |
| 14 efeitos | Sintetizados pelo mesmo script; lista em `audio/eventos_sfx.json` | Próprio |

## Ferramentas

| Etapa | Ferramenta |
|---|---|
| Voz | Gemini TTS (REST), 1 tomada (última da cota diária), limpa |
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
