# EP017 — Relatório de QA

**Status: vídeo final renderizado e validado tecnicamente.** Revisão feita por quadros extraídos do MP4 e por métricas de áudio; eu não consigo ouvir — a escuta humana dos pontos marcados abaixo continua necessária.

> Observação sobre o pedido: o texto do briefing misturava EP017 (título, gancho, guia) com EP016 (roteiro, pasta, nomes de arquivo). O EP016 já estava entregue; para não sobrescrevê-lo, este é o **EP017** do livro, entregue em `OUTPUT/reels-anteriores/EP017/` com nomes `EP017_*`.

## Checklist pedido pelo cliente

| # | Item | Resultado |
|---|---|---|
| 1 | Gancho prende | Porta fechando + carimbo NÃO virando PISTA antes de 4 s. Ponto fraco: o 1º segundo mostra só a porta aberta, sem texto |
| 2 | Identidade vocal = preset original | Sim: `gemini-3.8-flash-tts` / `Puck` / direção original, preset inalterado desde 10/11 |
| 3 | 1,0× real | Sim: tomada A usada como saiu do modelo (só normalização de nível); sem time-stretch, aceleração ou corte |
| 4 | Narração natural | 164 palavras/min (faixa do guia: 150–170), 16,8% de pausas. **Ouvir**: "pergunta", "registra", "Comenta" (forma coloquial dos imperativos) |
| 5 | Motion acompanha | Cada fala tem ação: porta, carimbo, desenho da planta, trânsito, mesa apertada, campo que se apaga, filtros, varredura, jornada. Maior trecho parado 0,7 s; movimento médio 1,68 (EP016: 1,69; EP015 V2: 2,5) |
| 6 | Acabamento | Quadros revisados em todas as cenas; corrigidos: cartões cortados pela câmera na situação e no insight e conteúdo empurrado para a faixa superior da interface do Instagram |
| 7 | Insight útil | Perguntar o que funcionou/não funcionou e transformar em critério de busca — fiel ao roteiro |
| 8 | Transição natural para a CTA | "Essas pistas só ajudam se ficarem registradas na jornada de cada cliente." retoma a palavra PISTA do gancho |
| 9 | SISTEMA claro na tela | COMENTE + pílula "SISTEMA" (132 px) + "Receba os detalhes no Direct." de ~39,1 s até o fim (≈4 s) |
| 10 | Comentário sem propaganda forçada | CTA nos últimos ~15 s; sem preço, link, botão externo, promessa ou material grátis |

## Validação técnica (`validacao_tecnica.json`) — 11/11 OK

1080×1920 · H.264 · yuv420p · 30 fps · AAC 48 kHz · 43,05 s · decodificação sem erros · −14,99 LUFS · true peak −1,12 dBTP · sem trechos pretos · sem silêncio total.

## Áudio

- Mix −14,98 LUFS; narração −18,1; trilha −37,8; efeitos −33,7; 23 eventos.
- Inteligibilidade (Parakeet, mesmo texto): narração isolada 96,4%, mix 97,3% — nenhuma palavra some na mixagem. Divergências só as formas coloquiais acima.
- Sincronia vídeo × narração: 0 ms.

## Decisões e limites

- CTA de comentário aplicada **somente ao EP017** (e antes ao EP016). Os outros roteiros do livro não foram alterados.
- Tomada B não foi gerada: a API recusou por limite de uso (HTTP 429). Duas tomadas bastaram; nenhuma leu a direção em voz alta desta vez.
- Duração 43 s (preferência do projeto 40–65 s) sem esticar nem acelerar.

## Regenerar

```bash
cd PRODUCAO && python3 tools/build_narration.py EP017 --source ../OUTPUT/reels-anteriores/EP017/audio/tomada_A_usada.wav && python3 tools/build_audio.py EP017 && bash tools/render_episode.sh EP017
```
