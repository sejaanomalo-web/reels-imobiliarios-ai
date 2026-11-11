# Guia de melhoria contínua

> ## ⚠️ DECISÃO VIGENTE — 11/11/2026, a partir do EP015 (prevalece sobre tudo abaixo)
>
> **Narração em velocidade normal (1,0×) com a identidade vocal original aprovada.**
>
> - Voz: exatamente `VOZ/voice_preset.json` — Gemini `gemini-3.8-flash-tts`, voz **Puck**, com a direção do preset ("Tom de conversa entre colegas corretores de imóveis: brasileiro, próximo, seguro e natural. Ritmo ágil, sem correria, com pausas curtas entre as ideias. Nunca locutor de comercial."). Referência de escuta: `OUTPUT/VOICE_AUDITIONS/audicao_gemini_Puck_EP001.wav`.
> - **Não** usar no `episode.json`: bloco `voice` com direção própria, `tightenPauses`, `targetWpm` ou `maxStretch`. Nenhum time-stretch, nenhuma aceleração, nenhum ajuste que altere o timbre. Ritmo esperado ≈ 150–170 palavras/min, com pausas naturais.
> - **Não** usar modelo substituto (nem outra voz, nem a mesma voz em outro modelo) sem autorização do cliente. Se a cota do modelo aprovado acabar, esperar a cota voltar.
> - Imagem e som: padrão equilibrado dos primeiros episódios. A câmera virtual continua, com movimentos intencionais e deriva suave (`drift={0.5}`); legenda original (`Captions`); trilha discreta sem bateria (`music.prog` com densidade ≤ 2, sem `drums` e sem `drops`); efeitos ~2 dB mais baixos que no padrão v2 e sem whips de corte rápido. O tempo de cenas, legendas e efeitos sai da narração real (marcas por palavra).
> - Referência de calibração (EP015 V2, medida no vídeo final): voz a 148 palavras/min, 14% do tempo em pausa; movimento médio 2,5 (EP001: 2,0; padrão v2: 3,6); maior trecho parado 0,9 s. Se uma cena ficar ~3 s sem ação no ritmo normal, acrescentar microanimação coerente com a cena (ex.: horário e "✓✓ lida" na bolha do EP015 V2), nunca acelerar a voz.
> - Efeitos nunca sobre sílabas: depois de mixar, transcrever a mixagem e comparar com a voz isolada; se uma palavra some só na mixagem, deslocar o efeito para depois dela (no EP015 V2: "Você" e "sexta").
> - O modelo aprovado pode ler a direção do preset em voz alta (aconteceu nas 4 tomadas do EP015 V2). Conferir a transcrição: se houver trecho intruso, removê-lo por edição nos silêncios naturais, guardar a tomada bruta e registrar em `episodes/EP###/narration_edit.json`. Não alterar a direção do preset sem aprovação.
> - As seções "Padrão v2" abaixo ficam **só como histórico**. Os itens de voz delas (aceleração, encurtamento de pausas, time-stretch, direção energética) estão **revogados**. Os itens visuais valem apenas na forma suavizada descrita acima.

Registro do que **efetivamente** melhorou os Reels, para aplicar automaticamente nos próximos episódios. Cada item diz como foi medido, para o próximo ajuste poder ser comparado. O Claude Code deve ler este arquivo junto com o `CLAUDE.md` antes de produzir qualquer episódio.

Status: o padrão v2 foi **substituído pela decisão vigente acima** (11/11/2026); o que segue é histórico. Até a aprovação, os presets globais (`VOZ/voice_preset.json`, `src/theme.ts`) ficam intactos, e o padrão v2 vive no `episode.json` de cada episódio.

## Linha de base (EP001–EP002, padrão v1)

| Métrica | EP001 | EP002 |
|---|---|---|
| Palavras/min | 167 | 148 |
| Tempo em pausa | 18,6% | 16,6% |
| Maior pausa | 0,83 s | 0,71 s |
| Movimento médio (motion_check) | 1,98 | 1,49 |
| Quadros parados | 53% | 62% |
| Maior trecho parado | 1,5 s | 2,4 s |

Crítica do cliente: narração calma demais, pouca variação, cenas paradas, transições fracas, "cara de apresentação".

## Padrão v2 (EP003)

### Voz

| Ajuste | Como aplicar | Efeito medido no EP003 |
|---|---|---|
| Direção de energia por parágrafo (gancho provocativo, problema com tensão, insight com virada, CTA confiante) e pedido explícito de ritmo | `episode.json` → `voice.direction`. Partir do texto da tomada B do EP003 (`episodes/EP003/voice_takes.json`) | Tomada nativa a 198 palavras/min (1,26×) |
| Encurtar só as pausas longas | `voice.tightenPauses: {"min": 0.16, "max": 0.24}` | Pausas de 17–19% para 7,4%; maior pausa de 0,8 s para 0,24 s |
| Completar a velocidade com time-stretch leve, tom e formantes preservados | `voice.targetWpm: [200, 240]`; `voice.maxStretch` (padrão 1,12×; EP015 usou 1,18×) | EP003: 198 → 220 com 1,066×. EP015: 168 → 205 com 1,18× (tomada veio mais lenta). Acima de ~1,2× evitar: preferir gerar outra tomada |
| Gerar 2+ tomadas e escolher por métrica + escuta | `tools/voice_takes.py EP### A B …` → `OUTPUT/<EP>/audio/tomadas_metricas.json` | Permitiu descartar a tomada do modelo irmão, que perdia palavras |
| Direção com o papel emocional de **cada parágrafo** e as palavras a enfatizar (EP015) | `voice.direction` do EP015 | Variação de entonação de 6,6 semitons, a maior da série (EP003: 5,6). Sinal de que a direção específica por roteiro ajuda, mas o EP015 usou o modelo de rascunho, então a comparação não é limpa |

Meta para os próximos: 200–240 palavras/min, pausas ≤ 10%, maior pausa ≤ 0,3 s, texto reconhecido ≥ 95%, desvio de entonação ≥ 6 semitons. Escrever a direção de voz para cada roteiro (papel de cada parágrafo + palavras a enfatizar), não copiar a do episódio anterior. Conferir de ouvido as trocas apontadas pelos reconhecedores.

### Imagem

| Ajuste | Como aplicar | Efeito medido |
|---|---|---|
| Câmera virtual em todas as cenas, com keyframes presos às palavras (zoom, lateral, giro, inclinação 3D) e desfoque proporcional à velocidade | `src/components/Camera.tsx`; uma lista `keys` por cena usando `c.<marca>` | Movimento médio 3,73 (≈ 2–2,5×) |
| Nada parado por mais de ~0,5 s: deriva contínua da câmera + microanimações | `Camera` com `drift` padrão; animar algo a cada marca | Quadros parados 12%; maior trecho parado 0,3 s |
| Elemento mais forte já no primeiro quadro, sem animação de entrada lenta | Abrir a cena 1 com o objeto principal visível e em movimento em t=0 | Os 2 primeiros segundos estão entre os de maior movimento |
| Fio condutor: os mesmos personagens/objetos atravessam todas as cenas e se transformam | Um `people.ts` (ou equivalente) por episódio; a cena seguinte nasce dos elementos da anterior | Transições sem corte; sensação de progressão |
| Tipografia cinética só para a palavra-chave da virada | Ex.: "ERRO:", "ETAPA + PRAZO" | — (qualitativo) |
| Respiro antes da revelação: imagem escurece e a trilha some por ~0,4 s | `music.drops` + overlay de 0,4 s | — (qualitativo) |
| Uma marca de animação a cada ~1 s de fala | `cues` no `episode.json` | 28 marcas em 25 s |

### Legendas

| Ajuste | Como aplicar |
|---|---|
| Blocos de 1–4 palavras; palavra aparece no instante em que é dita; sublinhado na palavra falada; base escura translúcida | `CaptionsPunch` (`src/components/Captions.tsx`); quebras com `\|` no `caption` de cada segmento |

### Som

| Ajuste | Como aplicar | Efeito medido |
|---|---|---|
| Trilha com bateria (bumbo e chimbal) que muda por seção e some na virada | `music.drums`, `music.drops`, `music.prog` | Inteligibilidade 94,6% → 92,5% na mixagem: a trilha não mascara a fala |
| Biblioteca de efeitos v2: `notif`, `ring`, `impact`, `whip`, `alert`, `shuffle` | `sfx` no `episode.json` | — |
| Efeito sempre preso a um movimento visível (whip ↔ corte de câmera, impacto ↔ carimbo) | Usar as mesmas marcas da câmera | Atraso 0 ms |

### Processo

1. Gerar as tomadas de voz → escolher → `build_narration` → definir `cues` sobre os tempos reais.
2. Revisar quadros a cada ~0,5 s **antes** do render final e corrigir cortes e sobreposições (no EP003 foram 5 correções).
3. Depois do render, rodar `tools/motion_check.py` e comparar com a tabela acima; conferir inteligibilidade da mixagem.
4. Registrar aqui o que mudou e o efeito medido.

## Pendências que limitam a qualidade

- **Cota do Gemini (plano gratuito: 10 gerações por dia por modelo).** Impede gerar várias tomadas e refazer trechos no mesmo dia. Ativar cobrança resolve.
- **Duração:** com ritmo 1,4×, roteiros de ~90 palavras viram vídeos de ~27 s. Se a meta for 40 s+, os roteiros precisam de mais texto.
- **Variação de entonação** sem ganho medido (ver acima).

## Histórico

| Data | Episódio | Mudança | Aprovado? |
|---|---|---|---|
| 2026-11-11 | EP003 | Padrão v2: voz rápida com direção por parágrafo, câmera virtual, legenda dinâmica, trilha com bateria | Aguardando o cliente |
| 2026-11-11 | EP015 (V1) | Padrão v2 aplicado a outra metáfora (fio da conversa); direção de voz escrita para o roteiro; régua de movimento mantida (3,61; 0,4 s parado) | **Reprovado** pelo cliente: voz acelerada |
| 2026-11-11 | EP015 (V2) | Volta à voz original 1,0× (preset aprovado) e ao padrão audiovisual inicial, com câmera intencional suavizada. Resultado: 148 palavras/min, 39,1 s, movimento 2,5, maior trecho parado 0,9 s | Decisão do cliente; vigente |
