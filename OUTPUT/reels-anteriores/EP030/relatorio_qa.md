# EP030 — Relatório de QA

**Status: vídeo final renderizado e validado tecnicamente.** Revisão feita por quadros extraídos do MP4 e por métricas de áudio; eu não consigo ouvir — a escuta humana dos pontos marcados continua necessária.

## Checklist pedido pelo cliente

| # | Item | Resultado |
|---|---|---|
| 1 | Só o roteiro EP030 | Sim: `ROTEIROS/EP030.md` (livro, DIA 57 / EP030) |
| 2 | Gancho preservado | "Quer ter mais clareza sobre sua carteira? Experimente esta revisão semanal de quinze minutos." — palavra por palavra |
| 3 | Voz = preset oficial | Sim: `gemini-3.8-flash-tts` / `Puck` / direção original, preset inalterado desde 10/11 |
| 4 | 1,0× | Sim: tomada C como saiu do modelo, sem corte nem processamento além de nível |
| 5 | Natural e envolvente | 158 palavras/min, a tomada mais energética das três. **Ouvir**: "essa revisão" (texto: "esta"), "Comenta", e "receberam" (o reconhecedor hesitou com "receberão" na voz isolada) |
| 6 | Impacto no início | 1º quadro: mapa da carteira embaçado em câmera inclinada; foco em "clareza"; cronômetro cai em "Experimente" |
| 7 | Progressão e movimento | Movimento médio 1,78; maior trecho parado 1,1 s (limite 1,5 s) |
| 8 | Transições | Câmera mergulha do mapa no quadro; situação e tensão no mesmo quadro (sem corte); fichas viram arquivo e voltam; resumo dobra no módulo |
| 9 | Legendas sincronizadas | Alinhamento por palavra; sincronia vídeo × narração 0 ms |
| 10 | Insight útil | Método aplicável: 3 grupos, conferir o 2º, dar ação e dono ao 3º, registrar e revisar na próxima reunião |
| 11 | Posicionamento editorial da ATIVO | Conteúdo educativo do início ao insight; sistema só aparece na CTA. Sem logo/elementos de marca (não fornecidos) |
| 12 | CTA conectada | "Essa revisão fica mais fácil quando a carteira inteira está organizada." |
| 13 | SISTEMA visível | COMENTE + pílula "SISTEMA" (132 px) + "Receba os detalhes no Direct." de ~43,0 s até o fim (≈3,7 s) |
| 14 | Música e efeitos | Narração −18,6 LUFS; trilha −36,8; efeitos −32,9; whooshes de entrada de cena antes da primeira palavra |
| 15 | Qualidade dos aprovados | Mesmo sistema visual, câmera, legenda e fecho; 11/11 técnico |

## Correções feitas antes da entrega

- Movimento médio 1,49 no primeiro render (o mais baixo da série; você pediu energia) → câmera mais viva no gancho, pan interno do mapa, ponteiro de segundos no cronômetro, aproximações durante conferir/decidir → 1,78.
- Painéis de conferência/decisão apareciam **atrás** das fichas (texto vazando) → camada corrigida.
- Pilha de "imóveis ativos" parecia um card só → leque de 9 fichas.
- Aproximação no painel "decidir" encostava o texto na borda → enquadramento corrigido.

## Validação técnica — 11/11 OK

1080×1920 · H.264 · yuv420p · 30 fps · AAC 48 kHz · 46,78 s · sem erros · −15,04 LUFS · −1,68 dBTP · sem trechos pretos · sem silêncio total.

## Inteligibilidade

Parakeet: narração 97,5%, mix 97,5%. Nenhuma palavra some só na mixagem.

## Pendências

- **Identidade visual da ATIVO não está no repositório** (nome informado por você; sem logo, cores ou fontes oficiais). Não desenhei logo nem símbolo aproximado. Quando o kit existir, coloque em `MARCA/` e eu aplico.
- CTA de comentário aplicada **somente ao EP030** (além de EP016–EP020). Outros roteiros intactos.

## Regenerar

```bash
cd PRODUCAO && python3 tools/build_narration.py EP030 --source ../OUTPUT/reels-anteriores/EP030/audio/tomada_C_usada.wav && python3 tools/build_audio.py EP030 && bash tools/render_episode.sh EP030
```
