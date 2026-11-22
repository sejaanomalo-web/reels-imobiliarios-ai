# Vídeo da landing ATIVO — licenças, créditos e recursos

Nenhuma imagem, música, efeito sonoro, vídeo ou voz de terceiros entra no vídeo.

## Visual (desenhado em código neste repositório)

| Recurso | Arquivo |
|---|---|
| Câmera 16:9, fundo, grão, marca provisória, traço de luz, janela de app, títulos | `PRODUCAO/src/episodes/LP-ATIVO/kit.tsx` |
| Cenas 01–09 | `PRODUCAO/src/episodes/LP-ATIVO/scenes/` |
| Pôster | `PRODUCAO/src/episodes/LP-ATIVO/Poster.tsx` |
| Fontes | Manrope, JetBrains Mono — SIL OFL 1.1 |

**Marca:** a logo oficial da ATIVO **não está no repositório**. O vídeo usa um marcador **provisório só tipográfico** ("ATIVO" em Manrope) e um **traço de luz verde genérico** no lugar da seta, sem ponta e sem imitar o símbolo. Troca: salvar o arquivo aprovado em `PRODUCAO/public/brand/` e preencher `LOGO_FILE` (e o verde oficial em `NEON`) em `kit.tsx`, depois `bash tools/render_episode.sh LP-ATIVO`.

**Interfaces:** não há telas reais do sistema no repositório (`assets/real_product/` não existe). As telas de Imóveis, Clientes, Campanhas e Assistente são **ilustrativas**, marcadas "INTERFACE ILUSTRATIVA" no canto. Nomes (Paula, Mariana, Carlos, Júlia, Roberto) e dados são fictícios.

## Áudio

| Recurso | Origem | Licença |
|---|---|---|
| Narração | Gemini `gemini-3.8-flash-tts`, voz `Puck`, preset aprovado, 1,0×, tomada única sem edição | Termos da Gemini API — ver pendência 2 |
| Trilha (eletrônica minimalista, 100 bpm, blocos A–H) | Sintetizada por `PRODUCAO/tools/build_music_lp.py` | Próprio |
| 20 efeitos (tick, click, swish, pin, digitação, whoosh) | Sintetizados por `PRODUCAO/tools/build_audio.py`; lista em `audio/eventos_sfx.json` | Próprio |

## Pendências

1. **Remotion — uso comercial não confirmado** (grátis até 3 pessoas). Confirmar em remotion.dev/docs/license.
2. **Gemini no plano gratuito.** Termos de uso comercial do áudio não verificados.
3. **Voz sintética:** se o vídeo também for para redes, verificar rótulo de IA.
4. **Afirmações de produto** (gestão de imóveis, CRM, leads de campanhas, Assistente com IA, diagnóstico e personalização) vêm do briefing do cliente; não foram conferidas em telas ou documentação do sistema.
