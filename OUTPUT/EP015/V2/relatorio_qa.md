# EP015 V2 — Relatório de QA

**Estado: vídeo completo, renderizado e validado, com a voz original aprovada em 1,0×.** A V1 (padrão acelerado) está preservada em `OUTPUT/EP015/EP015_FINAL.mp4` para comparação.

## Entregas

| Arquivo | Conteúdo |
|---|---|
| `OUTPUT/EP015/EP015_FINAL_V2.mp4` | Vídeo final V2 |
| `OUTPUT/EP015/EP015_NARRACAO_V2.wav` | Narração isolada, 48 kHz |
| `OUTPUT/EP015/V2/` | Legendas (`EP015_legendas_V2.srt`), capa, roteiro com tempos reais, shotlist, stems de áudio, validação, licenças, editáveis |
| `PRODUCAO/episodes/EP015V2/`, `PRODUCAO/src/episodes/EP015V2/` | Fonte editável (a V1 continua em `.../EP015/`) |

## Voz restaurada

| Item | V2 |
|---|---|
| Modelo / voz | `gemini-3.8-flash-tts` / Puck — exatamente o preset aprovado (`VOZ/voice_preset.json`, aprovado em 10/11) |
| Direção | A do preset, sem direção própria do episódio |
| Velocidade | **1,0×**: nenhum time-stretch, nenhum encurtamento de pausas, nenhum ajuste de altura ou timbre |
| Edição | Remoção de 6,7 s em que o modelo leu por engano parte da direção ("Ritmo ágil, sem correria…"), nas 4 tomadas geradas; corte nos silêncios naturais, com 0,65 s de pausa mantida. Também um estalo de 0,2 s no início. Tomada bruta guardada (`narration_source_bruta.wav`) |
| Fidelidade | 98,9% do texto (91/92 palavras). "Respeite" sai como "Respeita" (coloquial, mesmo sentido) |

## V1 × V2

| Métrica | V1 (acelerada) | V2 (original) | EP001/EP002 (referência) |
|---|---|---|---|
| Modelo de voz | 3.1-flash-tts-preview (rascunho) | **3.8-flash-tts (aprovado)** | 3.8 / 3.1 |
| Time-stretch | 1,18× | **nenhum** | nenhum |
| Palavras/min | 205 | **148** | 167 / 148 |
| Tempo em pausa | 5,5% | **14,0%** | 18,6% / 16,6% |
| Maior pausa | 0,19 s | 0,96 s | 0,83 / 0,71 s |
| Variação de entonação (desvio F0) | 6,6 st | 5,0 st | 5,7 / 6,3 st |
| Duração | 28,5 s | **39,1 s** | 42,7 / 41,0 s |
| Movimento médio | 3,61 | **2,50** | 1,98 / 1,49 |
| Maior trecho parado | 0,4 s | **0,9 s** | 1,5 / 2,4 s |
| Inteligibilidade (texto reconhecido na mixagem) | 97,3% | 94,1%* | — |

\* As diferenças na mixagem são truncamentos do reconhecedor ("convers…") e o "respeita". Os dois efeitos que caíam sobre "Você" e "sexta" foram deslocados para depois das palavras, e "sexta" voltou a ser reconhecida.

Leitura dos números: a V2 volta ao ritmo e às pausas dos primeiros episódios, e mantém mais movimento visual que eles, mas sem a pressa da V1.

## Validação técnica (`V2/validacao_tecnica.json`)

| Checagem | Resultado |
|---|---|
| Formato | 1080×1920, H.264, yuv420p, bt709, 30 fps ✅ |
| Áudio | AAC 48 kHz estéreo ✅ |
| Duração | 39,08 s (timeline 39,07 s) ✅ |
| Decodificação sem erros | ✅ |
| Loudness / true peak | −14,94 LUFS / −1,14 dBTP ✅ |
| Pretos / silêncio | nenhum ✅ |
| Sincronia narração ↔ imagem | 0 ms ✅ |

## Padrão audiovisual restaurado

- **Legenda:** original dos primeiros episódios.
- **Trilha:** discreta, sem bateria e sem cortes; 18 dB abaixo da voz.
- **Efeitos:** 38, cerca de 2 dB mais baixos, sem whips de corte rápido.
- **Câmera:** mesmos movimentos intencionais da V1, com deriva suave e mergulho do gancho mais calmo (3× com easing suave).
- **Sincronia:** o tempo de cenas, animações, legendas e efeitos foi recalculado sobre a narração real (marcas por palavra). Nada da edição acelerada foi reaproveitado sem nova sincronização.
- **Microanimação nova:** horário + "✓✓ lida" na bolha do gancho, para a bolha não ficar parada ~3 s no ritmo normal.

## Revisão por quadros (84 quadros: prévia, timeline real e MP4 final)

- Sem texto cortado, sem sobreposição com a legenda, CTA visível de 35,6 s até o fim.
- O enquadramento da agenda foi ajustado na prévia (estava a 8 px da borda).

## NÃO verificado

1. Ninguém ouviu o áudio. Confira de ouvido principalmente o ponto da emenda (≈ 5,7 s, entre "claro." e "Você mostrou") e se a voz soa igual à da audição do EP001.
2. Legibilidade no celular e sobreposição com a interface real do Instagram.

## Pendências

- **Duração de 39,1 s,** um pouco abaixo dos 40–65 s do Prompt Mestre. É a fala natural das 92 palavras; não estiquei.
- **Cota gratuita do Gemini:** este episódio esperou ~8 h pela cota do modelo aprovado e usou 5 das 10 gerações do dia.
- **Arquivos citados no pedido:** `PROMPTS/PROMPT_MESTRE_CLAUDE_CODE.md`, `PROMPTS/REFERENCIAS_9_REELS.md` e `PROMPTS/VOZES_E_TESTES.md` não existem com esses nomes; o conteúdo seguido está em `CLAUDE.md`, `MODELS/REFERENCIAS_9_REELS.md` e `VOZ/VOZES_E_TESTES.md`.

## Regenerar exatamente este vídeo

```bash
cd PRODUCAO && npm install && npm run models && npm run ep -- EP015V2
```

A narração editada está congelada em `episodes/EP015V2/narration_source.wav`; o comando não chama a API.
