# EP031 — Relatório de QA

**Status: vídeo final renderizado e validado tecnicamente.** Revisão feita por quadros extraídos do MP4 e por métricas de áudio; eu não consigo ouvir — a escuta humana continua necessária, principalmente do início (a narração começa na 2ª leitura do gancho).

## Checklist pedido pelo cliente

| # | Item | Resultado |
|---|---|---|
| 1 | Só o roteiro EP031 | Sim: `ROTEIROS/EP031.md` (livro, DIA 04 / EP031) |
| 2 | Gancho preservado | "O cliente pediu informações uma vez. Recebeu resposta de dois corretores diferentes." — palavra por palavra |
| 3 | Preset aprovado e 1,0× | Sim: `gemini-3.8-flash-tts` / `Puck` / direção original; sem aceleração, time-stretch nem emenda no meio da fala (só o início do arquivo foi cortado) |
| 4 | Insight útil | Regra de atribuição: quem assume o 1º contato, quando transferir e como registrar sem perder contexto — mostrado nos mesmos campos que estavam vazios na tensão |
| 5 | Motion fluido e profissional | Movimento médio 2,17 (o maior desde a volta ao 1,0×); maior trecho parado 0,6 s |
| 6 | Legendas sincronizadas e legíveis | Alinhamento por palavra, 109/109 palavras; sincronia vídeo × narração 0 ms |
| 7 | Identidade visual da ATIVO | **Parcial**: fundo escuro, tipografia, câmera, motion e fecho do padrão aprovado. **Sem o símbolo** ("A" branco + seta verde com brilho): o arquivo não está no repositório, na `main` nem no Drive conectado; não foi recriado por aproximação |
| 8 | CTA só com comentário SISTEMA | Sim: sem link da bio, sem outra CTA, sem funcionalidade ou resultado inventado |
| 9 | Áudio equilibrado | −15,06 LUFS, true peak −1,64 dBTP; narração −19,4 LUFS na frente, trilha −36,2, efeitos −33,4 |
| 10 | Render validado | 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC 48 kHz · 45,38 s · sem erros · sem trechos pretos · sem silêncio total |

## Correções feitas antes da entrega

- Voz: as 3 tomadas leram a direção e repetiram o gancho → usada a B a partir da 2ª leitura do gancho (um corte só, no início; nenhuma emenda no meio da fala).
- Início da tensão com a metade de baixo vazia por ~4 s → close nos dois corretores e ficha da oportunidade entrando já em "regra clara".
- Pan entre as conversas A e B cortava o texto na borda → deslocamento reduzido.

## Inteligibilidade

Parakeet: 100% na narração isolada e na mix; nenhuma divergência.

## Pendências

- **Símbolo da ATIVO**: envie o arquivo oficial (SVG ou PNG transparente) para `MARCA/` — ou diga onde está — e eu aplico na capa e no fecho, re-renderizando o EP030 e o EP031 se você quiser.
- CTA de comentário aplicada **somente ao EP031** (além de EP016–EP020 e EP030). Outros roteiros intactos.

## Regenerar

```bash
cd PRODUCAO && python3 tools/build_narration.py EP031 --source ../OUTPUT/reels-anteriores/EP031/audio/tomada_B_editada_usada.wav && python3 tools/build_audio.py EP031 && bash tools/render_episode.sh EP031
```
