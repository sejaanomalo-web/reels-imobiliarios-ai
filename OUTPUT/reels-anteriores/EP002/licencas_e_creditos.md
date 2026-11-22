# EP002 — Licenças e créditos

Nenhuma imagem, música, efeito sonoro, vídeo ou voz de terceiros entra no vídeo final.

| Recurso | Origem | Licença | Observação |
|---|---|---|---|
| Ilustrações, ícones, interfaces | Desenhados em código (SVG/React) neste repositório | Próprio | Prédios, mapa, casa, placa, alfinete, sino, cartões, funil |
| Trilha musical | Sintetizada por `PRODUCAO/tools/build_audio.py` | Próprio | Pad + pulso, sem samples; progressão em `episodes/EP002/episode.json` |
| Efeitos sonoros (56 eventos) | Sintetizados pelo mesmo script | Próprio | Lista em `audio/eventos_sfx.json` |
| Voz | Gemini `gemini-3.1-flash-tts-preview`, voz pré-definida `Puck`, via API com a chave do cliente | Termos da Gemini API | **Rascunho**: o modelo aprovado é o `gemini-3.8-flash-tts` (ver `relatorio_qa.md`). Voz de catálogo; nenhuma clonagem |
| Fonte Manrope | `@fontsource/manrope` | SIL OFL 1.1 | Cópia da licença em `PRODUCAO/public/fonts/` |
| Fonte JetBrains Mono | `@fontsource/jetbrains-mono` | SIL OFL 1.1 | Idem |
| Remotion 4.0.542 | remotion.dev | Licença Remotion | Ver pendência 1 |
| React, FFmpeg, numpy, scipy, sherpa-onnx | Projetos open source | MIT / LGPL-GPL (FFmpeg) / BSD / Apache-2.0 | Ferramentas de produção |
| Parakeet TDT 0.6b v3, Whisper small | Modelos de reconhecimento | CC-BY-4.0 / MIT | Só conferem a narração e alinham as legendas; nada deles vai no vídeo |

## Referências (`MODELS/ref_01…09.mp4`)

Usadas apenas para estudo de ritmo e acabamento (ver `ANALISE/reference_style_report.md`). Nenhum quadro, áudio, fala, personagem ou elemento gráfico delas foi reutilizado. São vídeos de terceiros versionados no repositório: manter o repositório privado ou removê-los do histórico.

## Pendências de licença

1. **Remotion — uso comercial não confirmado.** Grátis para equipes de até 3 pessoas segundo o instalador; empresas maiores precisam de licença. A página de preços está bloqueada na rede deste ambiente. Confirmar em remotion.dev/docs/license.
2. **Gemini — plano gratuito.** O erro de cota confirma que a chave está no *Free Tier* (10 gerações por dia por modelo de voz). Os termos de uso comercial do áudio gerado no plano gratuito não foram verificados. Confirmar em ai.google.dev antes de publicar.
3. **Voz sintética:** o Instagram pode exigir rótulo de conteúdo gerado por IA; verificar a regra vigente ao publicar.
4. Nomes ("Marcos T."), mensagens, valores da simulação e prazos são fictícios.
