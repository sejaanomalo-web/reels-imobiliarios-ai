# EP030 — Licenças, créditos, recursos e ferramentas

Nenhuma imagem, música, efeito sonoro, vídeo ou voz de terceiros entra no vídeo final.

## Recursos visuais (todos desenhados em código neste repositório)

| Recurso | Arquivo |
|---|---|
| Mapa da carteira embaçado → em foco, cronômetro 15:00 | `PRODUCAO/src/episodes/EP030/scenes/Clock.tsx` |
| Quadro de três colunas, fichas fictícias, conferência do 2º grupo, ação + responsável no 3º | `scenes/Board.tsx` |
| VENDA TODA SEMANA riscado, gaveta de arquivo barrada, linha do tempo semanal | `scenes/Week.tsx` |
| Resumo da carteira, módulos, campo de comentário genérico, fecho COMENTE "SISTEMA" | `scenes/Cta.tsx` |
| Carteira fictícia (9 imóveis), grupos, cronômetro, ícones, selos | `scenes/ui.tsx` |
| Câmera virtual, legenda, fundo, mapa, pins, casas | `PRODUCAO/src/components/` |
| Pessoas e imóveis fictícios (Ana R.; iniciais AR/JM/LC; "Apto 2q · Centro" etc.) | sem dados reais |

**Marca:** nenhum logo, símbolo ou elemento da ATIVO foi desenhado — a identidade visual oficial não está no repositório (`MARCA/brand.json`). O vídeo usa o sistema visual provisório dos episódios aprovados.

Nenhuma interface simula comentário ou mensagem de pessoa real: o campo de comentário não tem perfil, nome de usuário, foto ou curtidas; não há interface de Instagram/WhatsApp reproduzida. Telas de sistema marcadas "interface ilustrativa".

## Áudio

| Recurso | Origem | Licença |
|---|---|---|
| Narração | Gemini `gemini-3.8-flash-tts`, voz `Puck`, preset original aprovado, 1,0×, tomada C sem edição | Termos da Gemini API — ver pendência 2 |
| Trilha (pad + baixo, sem bateria; Em→C→G→Am→F→C→Cadd9, 96 bpm) | Sintetizada por `PRODUCAO/tools/build_audio.py` | Próprio |
| 17 efeitos | Sintetizados pelo mesmo script; lista em `audio/eventos_sfx.json` | Próprio |

## Ferramentas

| Etapa | Ferramenta |
|---|---|
| Voz | Gemini TTS (REST), 3 tomadas; A leu a direção, B mais lenta; C escolhida |
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
