# EP019 — Relatório de QA

**Status: vídeo final renderizado e validado tecnicamente.** Revisão feita por quadros extraídos do MP4 e por métricas de áudio; eu não consigo ouvir — a escuta humana dos pontos marcados continua necessária, principalmente o ponto de corte em ~5,5 s.

## Checklist pedido pelo cliente

| # | Item | Resultado |
|---|---|---|
| 1 | Só o roteiro EP019 | Sim: `ROTEIROS/EP019.md` (livro, DIA 50 / EP019) |
| 2 | Gancho original preservado | "Você mandou um áudio de três minutos. O cliente ouviu metade e ficou sem saber o próximo passo." — palavra por palavra (a tomada B, que trocou o gancho, foi descartada) |
| 3 | Voz = preset aprovado | Sim: `gemini-3.8-flash-tts` / `Puck` / direção original, preset inalterado desde 10/11 |
| 4 | 1,0× | Sim: sem aceleração ou time-stretch. Houve **um corte** de 6,0 s (trecho da direção lido por engano) nos silêncios naturais, como manda o guia |
| 5 | Narração clara e natural | 181 palavras/min nativos, 11,9% de pausas. **Ouvir**: a junção do corte (pausa de 0,54 s entre "próximo passo." e "Áudio é ótimo"); formas coloquiais "envia", "registra", "Comenta" |
| 6 | Movimento acompanha a narrativa | Onda que corre e para na metade, fichas que caem, onda que vira resumo, conferência linha a linha. Movimento médio 2,11 (EP016–EP018: ~1,7); maior trecho parado 1,0 s |
| 7 | Ritmo e interesse visual | Cada frase tem uma ação própria; nenhuma cena repete a anterior |
| 8 | Transições | Motivadas: a onda vira blocos de fala; a onda se contrai no resumo; o resumo cai na ficha; o histórico dobra no módulo |
| 9 | Insight comunicado | Resumo curto (imóvel, combinado, próximo passo) + registro no acompanhamento — cenas 3 e 4 |
| 10 | CTA ligada ao conteúdo | "Se a sua rotina tem muitos atendimentos assim, vale ter esse histórico organizado." → histórico vira o módulo ATENDIMENTOS |
| 11 | SISTEMA visível | COMENTE + pílula "SISTEMA" (132 px) + "Receba os detalhes no Direct." de ~35,9 s até o fim (≈3,7 s) |
| 12 | Legendas sincronizadas | Alinhamento por palavra; sincronia vídeo × narração 0 ms |
| 13 | Áudio equilibrado | −14,97 LUFS, true peak −1,12 dBTP; narração −18,7 LUFS, trilha −38,1, efeitos −33,7 |
| 14 | Identidade dos aprovados | Mesma tipografia, cores, câmera e fecho; variação deliberada no caminho até o fecho (ATENDIMENTOS em vez de LEADS) |

## Correções feitas antes da entrega

- 1º quadro sem onda (ela entrava de fora da tela) → onda já visível no quadro 0; câmera centralizada.
- Fichas de endereço/horário/documentação entravam na faixa superior da interface do Instagram → descidas ~70 px.
- Ficha de acompanhamento com área vazia embaixo → altura reduzida.

## Validação técnica — 11/11 OK

1080×1920 · H.264 · yuv420p · 30 fps · AAC 48 kHz · 39,62 s · sem erros · −14,97 LUFS · −1,12 dBTP · sem trechos pretos · sem silêncio total.

## Inteligibilidade

Parakeet: narração isolada 97,7%, mix 97,3%. A única diferença ("é ótimo" não reconhecido na mix pelo Parakeet) não se confirma: o Whisper reconhece "Áudio é ótimo para transmitir proximidade" igualmente na voz isolada e na mix.

## Decisões e limites

- CTA de comentário aplicada **somente ao EP019** (além de EP016–EP018). Outros roteiros intactos.
- Das 3 tomadas, nenhuma saiu limpa: uma trocou o gancho e duas leram a direção. Foi preciso editar. Ver recomendação no guia.

## Regenerar

```bash
cd PRODUCAO && python3 tools/build_narration.py EP019 --source ../OUTPUT/EP019/audio/tomada_A_editada_usada.wav && python3 tools/build_audio.py EP019 && bash tools/render_episode.sh EP019
```
