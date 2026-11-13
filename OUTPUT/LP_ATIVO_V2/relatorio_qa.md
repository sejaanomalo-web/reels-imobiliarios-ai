# Vídeo da landing ATIVO — versão final (16:9) — relatório de QA

**Status: renderizado e validado tecnicamente; pronto para implementar.** Revisão por quadros e métricas; eu não consigo ouvir — vale uma escuta antes de publicar.

## Ajustes desta rodada (pedido do cliente em 13/11, após aprovar a v2)

| Pedido | Feito |
|---|---|
| Só as 3 primeiras situações na representação da rotina | Ficaram Paula · Retornar hoje / Visita — 14:30 / Valor atualizado; saíram Novo lead, Proposta enviada e Retomar em 3 dias. A fala dessas três continua (só a transcrição mostra), com notificações genéricas mantendo o movimento |
| Centralizar verticalmente | Cartões e a "tela única" centrados no quadro (faixa de ~385–555 px), acima da transcrição |
| Velocidade −0,2 (regra: 1,5×→1,3×) | 1,2× → **1,0×** (gravação original, sem aceleração). Duração passou a **1min43** (103,2 s) |
| Logo oficial nos momentos de marca | Arquivo enviado, com o fundo preto convertido em transparência (sem redesenho): revelação da esquerda para a direita em "o Sistema ATIVO", sob o foco de luz no diferencial, no fecho do CTA (com brilho final), no canto da janela do sistema e no pôster. Na transcrição o "ATIVO" continua texto (é fala) |
| Verde idêntico à identidade #3AF584 | Todo o verde de interface, destaques da transcrição, botões, brilhos e trilhas de luz usam #3AF584; registrado em `MARCA/brand.json` e em `PRODUCAO/src/theme.ts`. A logo mantém as cores do próprio arquivo |

## Checagem

- Render 11/11: 1920×1080 · H.264 · yuv420p · 30 fps · AAC · 103,2 s · −15,03 LUFS · −1,97 dBTP · sem pretos · sem silêncio.
- Sincronia 0 ms; reconhecimento da fala 98,9% (voz) / 97,6% (mix).
- Movimento médio 2,01, maior trecho parado 0,7 s.
- Correções nesta rodada: o traço de luz que atravessava a logo oficial na virada foi removido (a seta da logo já cumpre esse papel); os cartões escurecem mais quando a logo entra, para nenhum texto aparecer sob as letras.

## Pendências conhecidas

1. Duração 1min43 — acima do 1min30 pedido antes; consequência direta da volta a 1,0×. Se quiser ≤ 1min35, a alternativa é 1,1×.
2. Telas do sistema seguem ilustrativas (marcadas "INTERFACE ILUSTRATIVA").
3. Gancho: o texto é o original; a proposta de cena concreta (Paula, terça 19h → sexta fechou com outro) segue disponível para gravar.

## Implementação na landing

`embed_landing.html` traz o player (vídeo mudo em autoplay + botão "Ativar som"), pôster e os dois CTAs com os links do briefing. Use `LP_ATIVO_V2_16x9_web.mp4` (~12 MB) no site; o master `LP_ATIVO_V2_16x9_FINAL.mp4` fica como arquivo-fonte.
