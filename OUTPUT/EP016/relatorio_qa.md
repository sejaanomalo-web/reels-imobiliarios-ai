# EP016 — Relatório de QA

**Status: vídeo final renderizado e validado tecnicamente.** Revisão feita por quadros extraídos do MP4 e por métricas de áudio; eu não consigo ouvir — a escuta humana dos pontos marcados abaixo continua necessária.

## Checklist pedido pelo cliente

| # | Item | Resultado |
|---|---|---|
| 1 | Gancho prende | Conversa parada + "ALGUMA NOVIDADE?" em tipografia grande antes de 4 s; silêncio visual em seguida |
| 2 | Identidade vocal = preset original | Sim: `gemini-3.8-flash-tts` / `Puck` / direção original, preset inalterado desde 10/11 |
| 3 | 1,0× real | Sim: nenhum time-stretch, aceleração ou corte; tomada C usada como saiu do modelo (só normalização de nível) |
| 4 | Narração natural | ~180 wpm nativos, 12% de pausas. Mais ágil que o EP015 V2 (148 wpm). **Ouvir**: "Comenta" (coloquial), "existir", "cobra" |
| 5 | Motion profissional | Câmera suave por cena, transições motivadas (mensagem → mapa → comparação → base → ficha → módulo → comentário). Maior trecho parado 0,9 s (limite 1,5 s). Movimento médio 1,69 — abaixo do EP015 V2 (2,5); o vídeo é mais calmo, principalmente no início do gancho (0–3 s) e no fecho |
| 6 | Acabamento das animações | Quadros revisados em todas as cenas; corrigidos: painel cortado no 1º quadro, bolha verde vazia antes da digitação, cartões cortados pela câmera, texto da capa encostando na borda |
| 7 | Insight útil | Base segmentada por contexto + opt-out respeitado, fiel ao roteiro |
| 8 | Transição natural para a CTA | "Retomar com contexto exige ter o histórico de cada cliente à mão." liga o insight à ficha e ao sistema |
| 9 | SISTEMA claro na tela | COMENTE + pílula "SISTEMA" (132 px, cor de destaque) e "Receba os detalhes no Direct." visíveis de ~34,6 s até o fim (≈4 s) |
| 10 | Incentiva comentário sem virar anúncio | CTA ocupa os últimos ~13 s, sem preço, link, botão externo, promessa ou material grátis |

## Validação técnica (`validacao_tecnica.json`) — 11/11 OK

1080×1920 · H.264 · yuv420p · 30 fps · AAC 48 kHz · 38,63 s · decodificação sem erros · −14,98 LUFS · true peak −1,29 dBTP · sem trechos pretos · sem silêncio total.

## Áudio

- Mix: −14,96 LUFS; narração −17,8 LUFS; trilha −36,9 LUFS; efeitos −33,7 LUFS; 27 eventos.
- Inteligibilidade (Parakeet, mesmo texto): narração isolada 96,8%, mix 95,9%. Única diferença: "existir → existe" no mix; no trecho isolado (20,6–25,3 s) mix e narração são reconhecidos igualmente como "existir". Efeito de 22,4 s foi movido para depois de "contexto" por precaução.
- Sincronia vídeo × narração: 0 ms (correlação de envelope).

## Decisões e limites

- CTA de comentário aplicada **somente ao EP016**. As CTAs dos outros episódios no livro não foram alteradas.
- Tomadas A e B descartadas porque o modelo leu a direção do preset em voz alta; isso já aconteceu em todas as tomadas do EP015 V2. Problema recorrente do modelo, não do texto.
- Legenda da fala final (s11) oculta: o fecho já mostra o texto na tela; o SRT mantém tudo.

## Regenerar

```bash
cd PRODUCAO && python3 tools/build_narration.py EP016 --source ../OUTPUT/EP016/audio/tomada_C_usada.wav && python3 tools/build_audio.py EP016 && bash tools/render_episode.sh EP016
```
