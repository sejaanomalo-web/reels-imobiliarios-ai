# EP020 — Relatório de QA

**Status: vídeo final renderizado e validado tecnicamente.** Revisão feita por quadros extraídos do MP4 e por métricas de áudio; eu não consigo ouvir — a escuta humana dos pontos marcados continua necessária.

## Checklist pedido pelo cliente

| # | Item | Resultado |
|---|---|---|
| 1 | Só o roteiro EP020 | Sim: `ROTEIROS/EP020.md` (livro, DIA 56 / EP020) |
| 2 | Gancho preservado | "Agendar toda visita que pedem pode parecer produtividade. Nem sempre é." — palavra por palavra; agenda já cheia no 1º quadro |
| 3 | Voz = preset aprovado | Sim: `gemini-3.8-flash-tts` / `Puck` / direção original, preset inalterado desde 10/11. A produção esperou a cota voltar em vez de usar outra voz |
| 4 | 1,0× | Sim: tomada C como saiu do modelo, sem corte nem processamento além de nível |
| 5 | Interpretação natural | 164 palavras/min, 15,9% de pausas. **Ouvir**: formas coloquiais "alinha", "Se tiver", "Comenta"; "deslocamento" no singular; "ajuda a ter" |
| 6 | Movimento adequado | Movimento médio 1,98; maior trecho parado 1,0 s (limite 1,5 s) |
| 7 | Progressão | Agenda cheia → dúvida do interessado → três perguntas → duas rotas → critérios ao lado da agenda |
| 8 | Transições | Motivadas: a agenda trava e o mapa assume; perguntas preenchem contornos já visíveis; a bifurcação nasce do avatar; a ficha dobra no módulo |
| 9 | Insight | Duas rotas respeitosas (confirmar × ajustar busca) e QUALIFICAÇÃO ≠ PRESSÃO |
| 10 | CTA ligada ao tema | "Para decidir isso, ajuda ter os critérios de cada comprador ao lado da agenda." |
| 11 | SISTEMA visível | COMENTE + pílula "SISTEMA" (132 px) + "Receba os detalhes no Direct." de ~39,3 s até o fim (≈3,8 s) |
| 12 | Legendas sincronizadas | Alinhamento por palavra; sincronia vídeo × narração 0 ms |
| 13 | Música e efeitos | Narração −18,9 LUFS na frente; trilha −38,7; efeitos −33,1; whoosh da CTA movido para antes de "Para" |
| 14 | Identidade dos aprovados | Mesma tipografia, cores, câmera e fecho |
| 15 | MP4 completo | Duração 43,14 s = linha do tempo; decodificação sem erros; sem trechos pretos; sem silêncio total; áudio AAC presente |

## Correções feitas antes da entrega

- **True peak do MP4 em −0,95 dBTP** (falha da checagem; a compressão AAC subiu o pico) → masterização com margem maior só neste episódio (`"master": {"tp": -2.0}` no `episode.json`; opção nova em `build_audio.py`, padrão continua −1,5) → −1,56 dBTP.
- Vazio visual de ~1,8 s em "Antes de confirmar" → contornos das perguntas aparecem antes e são preenchidos na fala.
- "VISITA CONFIRMADA" entrava atrasado → agora entra em "marque".
- Whoosh da CTA sobre "Para" → antecipado para a pausa.
- Revisão com linha do tempo provisória em 11/11: agenda vazia no 1º quadro, cards cortados pela câmera — corrigidos.

## Validação técnica — 11/11 OK

1080×1920 · H.264 · yuv420p · 30 fps · AAC 48 kHz · 43,14 s · sem erros · −15,06 LUFS · −1,56 dBTP · sem trechos pretos · sem silêncio total.

## Inteligibilidade

Parakeet: narração 96,0%, mix 94,2%. Diferenças só da mix ("três → 3", "para → pra") não se confirmam: o Whisper reconhece os trechos da CTA de forma idêntica na voz isolada e na mix.

## Decisões e limites

- CTA de comentário aplicada **somente ao EP020** (além de EP016–EP019). Outros roteiros intactos.
- Atraso de um dia: a cota gratuita do modelo de voz acabou em 11/11 (10 gerações/dia).

## Regenerar

```bash
cd PRODUCAO && python3 tools/build_narration.py EP020 --source ../OUTPUT/reels-anteriores/EP020/audio/tomada_C_usada.wav && python3 tools/build_audio.py EP020 && bash tools/render_episode.sh EP020
```
