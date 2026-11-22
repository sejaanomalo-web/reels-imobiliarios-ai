# EP018 — Relatório de QA

**Status: vídeo final renderizado e validado tecnicamente.** Revisão feita por quadros extraídos do MP4 e por métricas de áudio; eu não consigo ouvir — a escuta humana dos pontos marcados continua necessária.

## Checklist pedido pelo cliente

| # | Item | Resultado |
|---|---|---|
| 1 | Só o roteiro EP018 | Sim: `ROTEIROS/EP018.md` (livro, DIA 44 / EP018); nenhum texto, cena ou arquivo de outro episódio |
| 2 | Gancho original preservado | "Vinte links enviados não são vinte argumentos de venda." — palavra por palavra; esteira e contador já em movimento no 1º quadro |
| 3 | Voz = preset original | Sim: `gemini-3.8-flash-tts` / `Puck` / direção original, preset inalterado desde 10/11 |
| 4 | 1,0× | Sim: tomada A usada como saiu do modelo (só normalização de nível) |
| 5 | Entonação natural | 160 palavras/min (faixa do guia 150–170), 19,4% de pausas. **Ouvir**: "Comenta" (coloquial) e a pausa mais longa (1,19 s) |
| 6 | Movimento suficiente | Maior trecho parado 1,0 s (limite 1,5 s); movimento médio 1,73 (EP016 1,69; EP017 1,68) |
| 7 | Transições | Motivadas: esteira trava → pedido; pins viram catálogo; catálogo → prioridades; 20 fichas recolhem em 3; prioridades dobram no módulo LEADS |
| 8 | Legendas sincronizadas | Alinhamento por palavra; sincronia vídeo × narração 0 ms |
| 9 | Insight claro | Poucas opções, cada uma com um porquê, e pergunta de avanço — mostrado na cena 4 |
| 10 | CTA conectada | "Escolher com critério fica mais fácil quando as prioridades de cada cliente estão registradas." retoma CRITÉRIO e prioridades |
| 11 | SISTEMA claro | COMENTE + pílula "SISTEMA" (132 px) + "Receba os detalhes no Direct." de ~41,3 s até o fim (≈4 s) |
| 12 | Sem propaganda excessiva | CTA nos últimos ~16 s; sem link, preço, promessa, material grátis ou segunda CTA |
| 13 | Áudio equilibrado | −14,96 LUFS, true peak −1,27 dBTP; narração −19,4 LUFS na frente, trilha −36,7, efeitos −34,8 |
| 14 | Acabamento consistente | Mesma tipografia, cores, câmera e fecho dos episódios aprovados |

## Correções feitas antes da entrega

- 1º quadro mostrava "1 LINKS" (concordância) e vinha sem texto → contador começa em 3 e o título já aparece no quadro 0.
- Sons dos pins caíam em cima de "vinte endereços" → retirados da fala (um pin só depois de "explicação"); ticks da esteira 4 dB mais baixos.
- Toque de escolha cobria o texto do card → move para a área da imagem; etiqueta AVANÇAR deixava de competir com o título.
- Módulos da CTA ainda visíveis atrás de COMENTE → saem antes.

## Validação técnica (`validacao_tecnica.json`) — 11/11 OK

1080×1920 · H.264 · yuv420p · 30 fps · AAC 48 kHz · 45,18 s · sem erros de decodificação · −14,96 LUFS · −1,27 dBTP · sem trechos pretos · sem silêncio total.

## Inteligibilidade

Parakeet: 95,4% na narração isolada e na mix (as diferenças são a formatação de números do reconhecedor, "vinte" → "2", e "Comenta"). Whisper no trecho 0–12 s: mix e narração reconhecidas igualmente ("20 links… 20 argumentos… 20 endereços sem explicação").

## Decisões e limites

- CTA de comentário aplicada **somente ao EP018** (além dos EP016/EP017 já pedidos). Outros roteiros intactos.
- Tomadas B e C leram a direção do preset em voz alta — recorrente no modelo aprovado (3 dos 4 últimos episódios tiveram ao menos uma tomada assim).

## Regenerar

```bash
cd PRODUCAO && python3 tools/build_narration.py EP018 --source ../OUTPUT/reels-anteriores/EP018/audio/tomada_A_usada.wav && python3 tools/build_audio.py EP018 && bash tools/render_episode.sh EP018
```
