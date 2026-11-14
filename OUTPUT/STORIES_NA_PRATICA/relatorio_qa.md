# QA — Stories "Na prática" (STORY-ATIVO-01…05) — 14/11/2026

Fonte: `STORIES/ROTEIRO_5_STORIES_NA_PRATICA_ATIVO.md`. Formato 1080×1920, 30 fps, H.264/AAC. Voz oficial Gemini `gemini-3.8-flash-tts`, Puck, **1,0×** (sem aceleração/time-stretch).

## Status de publicação
**PRÉVIA INTERNA — NÃO PUBLICAR.** Todos saem com marca d'água "PRÉVIA INTERNA · SEM AUTORIZAÇÃO · NÃO PUBLICAR" e projetos anonimizados ("Projeto A/B/C") porque **falta autorização** de Bruno Souza, Ivone Peris e Antônio Carlos para nome/marca. As capturas higienizadas mostram os nomes dos corretores no cabeçalho dos painéis/sites. Para liberar: autorização registrada → `authorized: true` em `PRODUCAO/src/episodes/STORY-ATIVO/cases.ts` → `bash PRODUCAO/tools/render_episode.sh STORY-ATIVO-0X` (a marca d'água some sozinha).
Pendente também: decidir se o selo "MANEI" (sites de Ivone/Antônio) pode aparecer.

## Validação técnica (validate.py — 11 checagens)
| Story | Duração | LUFS | True peak | 11 checagens | Maior trecho parado |
|---|---|---|---|---|---|
| 01 Por que são diferentes? | 11,05 s | −14,99 | −1,64 dBTP | OK | 1,5 s (fecho) |
| 02 Painel e site | 10,75 s | −14,89 | −1,53 dBTP | OK | 0,1 s |
| 03 Identidade própria | 14,34 s | −14,78 | −1,68 dBTP | OK | 0,1 s |
| 04 Busca | 10,28 s | −14,84 | −1,69 dBTP | OK | 0,5 s |
| 05 Começar por você | 15,57 s | −14,84 | −1,73 dBTP | OK | 1,5 s |

`editorial_check.py`: 0 erros, 0 avisos nos 5. Quadros inspecionados em todas as cues (+ início/fim).

## Narração (tomadas)
- 01–04: primeira geração limpa (transcrição = roteiro).
- 05: 1ª tomada descartada — o modelo leu a instrução de direção em voz alta. 2ª tomada usada. Desvio aceito: diz "para **a** sua rotina" (roteiro: "para sua rotina"); a legenda segue o roteiro.
- "Na ATIVO" soa como "nativo" — é fonética natural do pt-BR, não erro; legenda e logo entram no mesmo instante.
- Total: 6 gerações de 10 da cota diária.

## Observações
- Durações abaixo do alvo do roteiro em 01 (alvo 13–17 s), 02 (13–17 s) e 04 (12–16 s): a voz em 1,0× é mais rápida que a estimativa. Não estiquei (regra do guia).
- Story 04 mantido como no roteiro ("a prioridade é facilitar a busca"). Ressalva registrada: o site do Projeto A usa a mesma caixa de busca — quem vê 02 e 04 em sequência percebe.
- Story 05: texto mantido por decisão do cliente (13/11). O sticker de link (Cal.com `https://cal.com/anomalohub/demonstracao-do-sistema-imobiliario`) é inserido no Instagram; o MP4 reserva a área y 1020–1240 (na prévia, contorno tracejado).
- Trilha e efeitos sintetizados pelo próprio pipeline (`build_audio.py`), sem material de terceiros.

## Regerar
```
cd PRODUCAO && python3 tools/build_audio.py STORY-ATIVO-0X && bash tools/render_episode.sh STORY-ATIVO-0X
```
