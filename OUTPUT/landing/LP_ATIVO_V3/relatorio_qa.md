# Vídeo da landing ATIVO v3 (16:9) — relatório de QA

**Status: renderizado e validado tecnicamente.** Eu não consigo ouvir — vale uma escuta do trecho acelerado da rotina.

## Pedidos desta rodada (13/11) e o que foi feito

| Pedido | Feito |
|---|---|
| Remover "lead chegando de campanha, negociação avançando e outra que você tem que lembrar de retomar daqui a 3 dias" (voz e texto) e antecipar o fim da cena | Saíram as três frases; a rotina termina em "…mudando informação do imóvel" e corta seco para a dor |
| Rotina mais "infernal", fala mais acelerada, sensação de coisa demais para a cabeça | As 3 frases a **1,32×** e coladas (sem pausa). Cartões entram com impacto; notificações pipocam em ritmo crescente (~3/s → ~15/s), contador vermelho dispara até 20+, a câmera treme cada vez mais, borda vermelha pulsando; a trilha adensa no mesmo trecho; corte seco em "E muitas vezes" |
| Corrigir o fluxo diagnóstico → desenvolvimento | Etapas na tela: **01 CALL DE DIAGNÓSTICO** (Entendemos como você trabalha) · **02 DEFINIÇÃO** (Definimos juntos o que faz sentido) · **03 DESENVOLVIMENTO** (Criamos o seu sistema personalizado). Sem "demonstração" nesse trecho |
| +0,1 de velocidade | **1,1×** (rotina a 1,32×) |
| Dor animada, coerente com cada frase | "não é falta de cliente" → multidão de clientes enche a tela · "nem falta de trabalho" → agenda da semana lota · "não conseguir enxergar com clareza" → tudo embaça e uma lupa só mostra um pedaço · "informação fica espalhada" → mensagens, caderno, planilha, e-mail, post-it e agenda empilhados explodem para os cantos, ligados por linhas partidas · "ficar para trás" → o cartão da Paula afunda, perde cor e some em "trás" |
| Vídeo dinâmico do início ao fim | Movimento médio **2,55** (v2: 2,0); maior trecho parado 0,5 s; 20% de quadros parados |

## Checagem

- Render 11/11: 1920×1080 · H.264 · yuv420p · 30 fps · AAC · **87,2 s** · −15,02 LUFS · −1,98 dBTP · sem pretos · sem silêncio.
- Sincronia 0 ms. Reconhecimento: 255/255 palavras alinhadas; 98,8% na voz isolada, 98,4% na mixagem.

## Pendente (depende de nova gravação — cota de voz renova amanhã ~5h de Brasília)

A fala ainda diz duas coisas que não batem 100% com o processo real:

| Fala atual | Proposta |
|---|---|
| "…entendemos o que faz sentido e **apresentamos** uma solução personalizada…" | "A partir dessa conversa, definimos juntos o que faz sentido e **desenvolvemos** uma solução personalizada para a sua forma de trabalhar." |
| "Escolha um horário para uma **demonstração**…" | "Escolha um horário para uma **conversa de diagnóstico**…" |

O botão na tela continua "AGENDAR UMA DEMONSTRAÇÃO" para acompanhar a fala; a landing usa "Agendar uma conversa". Com a regravação, troco os dois para o mesmo termo.
