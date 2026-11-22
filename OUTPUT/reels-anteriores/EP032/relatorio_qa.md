# EP032 — Relatório de QA

**Status: vídeo final renderizado e validado tecnicamente.** Revisão feita por quadros extraídos do MP4 e por métricas de áudio; eu não consigo ouvir — a escuta humana dos pontos marcados continua necessária.

## Validação pedida pelo cliente

| # | Item | Resultado |
|---|---|---|
| 1 | Fidelidade ao EP032 | Só `ROTEIROS/EP032.md` (livro, DIA 10 / EP032); nenhum argumento comercial novo |
| 2 | Gancho preservado | "Sua equipe tem muitos leads. Mas você sabe quais receberam retorno?" — palavra por palavra, sem vinheta |
| 3 | Voz original | `gemini-3.8-flash-tts` / `Puck` / direção original, preset inalterado desde 10/11; tomada única limpa |
| 4 | 1,0× | Sem aceleração, time-stretch, corte ou processamento além de nível. **Ouvir**: "a atividade", "observa", "Comenta" |
| 5 | Clareza do desenvolvimento | Quadro de leads → reunião com falas genéricas → ATIVIDADE ≠ AVANÇO → três colunas preenchidas palavra por palavra |
| 6 | Qualidade das animações | Movimento médio 1,80; maior trecho parado 1,0 s (limite 1,5 s) |
| 7 | Coerência do insight | "Não é vigiar": olho riscado; "clareza para apoiar": o gestor apoia as linhas sem sequência; gargalo real qualitativo (sem métrica inventada) |
| 8 | Sincronia áudio/legenda/cenas | Alinhamento por palavra (97/99); sincronia vídeo × narração 0 ms |
| 9 | Identidade ATIVO | **Parcial**: fundo escuro, tipografia, câmera, motion e fecho do padrão aprovado. **Sem o símbolo** ("A" branco + seta verde): o arquivo continua fora do repositório e da `main`; não foi redesenhado |
| 10 | CTA só com comentário SISTEMA | Sim: sem link da bio, sem outra CTA, sem recurso ou resultado inventado, sem afirmar envio automático |
| 11 | Render sem erros | 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC 48 kHz · 38,51 s · −15,01 LUFS · −1,68 dBTP · sem trechos pretos · sem silêncio total |

## Correções feitas antes da entrega

- 1º quadro com só 3 leads e grade cortada pela câmera → quadro já com 8 leads e câmera mais aberta.
- Deslocamentos laterais na tabela cortavam as bordas → movimentos menores.

## Áudio

Mix −14,99 LUFS; narração −19,4; trilha −37,3; efeitos −32,8; 14 efeitos, todos fora das palavras. Inteligibilidade (Parakeet): 98% na voz isolada e na mix, mesmas divergências (formas coloquiais) — nada some na mixagem.

## Pendências

- **Símbolo da ATIVO** fora do repositório — envie o arquivo para `MARCA/` e eu aplico (posso refazer EP030–EP032).
- Cota de voz do dia esgotada (10/10); próximo episódio só depois da renovação (~08:00 UTC).

## Regenerar

```bash
cd PRODUCAO && python3 tools/build_narration.py EP032 --source ../OUTPUT/reels-anteriores/EP032/audio/tomada_A_usada.wav && python3 tools/build_audio.py EP032 && bash tools/render_episode.sh EP032
```
