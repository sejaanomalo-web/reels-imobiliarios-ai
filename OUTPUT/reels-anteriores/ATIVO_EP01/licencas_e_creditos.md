# ATIVO — Episódio 01 — Licenças, créditos, recursos e ferramentas

Nenhuma imagem, música, efeito sonoro, vídeo ou voz de terceiros entra no vídeo final.

## Recursos visuais (todos desenhados em código neste repositório)

| Recurso | Arquivo |
|---|---|
| Mapa urbano, tráfego, pinos, dois corretores fictícios, anúncios genéricos, três caminhos, carimbo | `PRODUCAO/src/episodes/EP-ATIVO01/scenes/Market.tsx` |
| Cartão de comprador (perfil ilustrativo), fluxo necessidade→busca→indicação, esteira de imóveis | `scenes/Buyer.tsx` |
| Prédio isométrico abstrato, camadas de informação, perfis | `scenes/Portfolio.tsx` |
| Proprietário fictício, etapas de captação, catálogo, três portas | `scenes/Owner.tsx` |
| Bússola, prioridade, CTA "QUAL É O SEU FOCO?" | `scenes/Compass.tsx` |
| Capítulos, cores dos três caminhos, selos | `scenes/ui.tsx` |
| Capa | `src/episodes/EP-ATIVO01/Cover.tsx` |
| Câmera virtual, legenda, fundo, ícones | `PRODUCAO/src/components/` |

Sem endereços, telefones, nomes ou dados reais. Nenhuma interface simula comentário ou mensagem de pessoa real (o ícone de comentário é genérico, sem perfil, nome ou curtidas).

**Marca:** nenhum logo ou símbolo da ATIVO foi desenhado. O roteiro pede "logo oficial discreta" no encerramento, mas o arquivo não está no repositório nem na `main`; não foi recriado por aproximação.

## Áudio

| Recurso | Origem | Licença |
|---|---|---|
| Narração | Gemini `gemini-3.8-flash-tts`, voz `Puck`, preset original aprovado, 1,0×, tomada C sem edição | Termos da Gemini API — ver pendência 2 |
| Trilha (pad + baixo; Dm→F→C→Bb→Am→F→Cadd9, 92 bpm) | Sintetizada por `PRODUCAO/tools/build_audio.py` | Próprio |
| 15 efeitos | Sintetizados pelo mesmo script; lista em `audio/eventos_sfx.json` | Próprio |

## Ferramentas

| Etapa | Ferramenta |
|---|---|
| Voz | Gemini TTS (REST), 3 tomadas; C escolhida |
| Alinhamento e conferência | Parakeet TDT 0.6b v3 e Whisper small via sherpa-onnx |
| Animação e render | Remotion 4.0.542 + React + TypeScript |
| Mixagem e validação | FFmpeg (`loudnorm` 2 passagens, `ffprobe`) |
| Fontes | Manrope, JetBrains Mono — SIL OFL 1.1 |

## Pendências

1. **Remotion — uso comercial não confirmado** (grátis até 3 pessoas). Confirmar em remotion.dev/docs/license.
2. **Gemini no plano gratuito.** Termos de uso comercial do áudio não verificados; cota de 10 gerações/dia por modelo.
3. **Voz sintética:** verificar a regra de rótulo de IA do Instagram ao publicar.
4. **Referências** (`MODELS/`): vídeos de terceiros, só para estudo; manter o repositório privado. O link de referência do roteiro (instagram.com/p/DfIs2VYoy1X) não foi aberto — nenhuma cena foi copiada.
