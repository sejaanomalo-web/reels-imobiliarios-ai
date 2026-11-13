# ATIVO — Episódio 02 — Licenças, créditos, recursos e ferramentas

Nenhuma imagem, música, efeito sonoro, vídeo ou voz de terceiros entra no vídeo final.

## Recursos visuais (todos desenhados em código neste repositório)

| Recurso | Arquivo |
|---|---|
| Cinco vídeos genéricos, cursor, "O QUE TEM A VER COMIGO?" | `PRODUCAO/src/episodes/EP-ATIVO02/scenes/Hook.tsx` |
| Planta com divisória (rotina) | `scenes/Room.tsx` |
| Fachada e planta revelada, visor de câmera (contraste) | `scenes/Facade.tsx` |
| Mapa ilustrativo sem distâncias (localização) | `scenes/MapAccess.tsx` |
| Escada, planta térrea, promessas riscadas (objeção) | `scenes/Ground.tsx` |
| Comprador ilustrativo, prioridades, cinco motivos (momento de vida) | `scenes/Life.tsx` |
| Editor "PARA QUEM ESTE IMÓVEL FAZ SENTIDO?" | `scenes/Editor.tsx` |
| Cartões salvos, módulos, campo de comentário genérico, fecho COMENTE "SISTEMA" | `scenes/Cta.tsx` |
| Celular, cabeçalho das aberturas, selos | `scenes/ui.tsx` |
| Capa | `src/episodes/EP-ATIVO02/Cover.tsx` |
| Câmera virtual, legenda, fundo, mapa, ícones | `PRODUCAO/src/components/` |

Sem endereços, telefones, nomes, preços ou distâncias reais. Imóveis, plantas e mapa marcados como ilustrativos. As frases "a 2 min do metrô" e "rampa de acesso" aparecem só como exemplos de promessa inventada e são riscadas. Nenhuma interface simula comentário ou mensagem de pessoa real (o campo de comentário não tem perfil, usuário, foto ou curtidas).

**Marca:** nenhum logo ou símbolo da ATIVO foi desenhado. O roteiro pede "logo oficial discreta" no encerramento, mas o arquivo não está no repositório nem na `main`; não foi recriado por aproximação.

## Áudio

| Recurso | Origem | Licença |
|---|---|---|
| Narração | Gemini `gemini-3.8-flash-tts`, voz `Puck`, preset original aprovado, 1,0×, tomada C sem edição | Termos da Gemini API — ver pendência 2 |
| Trilha (pad + baixo; Dm→F→C→Bb→Am→F→Dm→Bb→Cadd9, 96 bpm) | Sintetizada por `PRODUCAO/tools/build_audio.py` | Próprio |
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
4. **Operação da CTA:** quem comentar SISTEMA espera resposta no Direct. Isso precisa existir (manual ou automação já configurada) antes de publicar — o vídeo não promete resposta automática nem prazo.
5. **Referências** (`MODELS/`): vídeos de terceiros, só para estudo; manter o repositório privado. O link de referência do roteiro (instagram.com/p/DfDq799o9PI) não foi aberto — nenhuma cena foi copiada.
