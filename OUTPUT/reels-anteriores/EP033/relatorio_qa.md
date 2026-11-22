# EP033 — Relatório de QA

**Status: vídeo final renderizado e validado tecnicamente.** Revisão feita por quadros extraídos do MP4 e por métricas de áudio; eu não consigo ouvir — a escuta humana dos pontos marcados continua necessária.

## Controle de qualidade pedido

| # | Item | Resultado |
|---|---|---|
| 1 | Roteiro correto | Só `ROTEIROS/EP033.md` (livro, DIA 16 / EP033) |
| 2 | Gancho e desenvolvimento preservados | Palavra por palavra; só a CTA (e a transição anterior) mudou |
| 3 | Voz original em 1,0× | `gemini-3.8-flash-tts` / `Puck` / direção original; tomada A sem edição nem processamento além de nível |
| 4 | Pronúncia clara | 106/110 palavras alinhadas; desvios são formas coloquiais: "documenta", "adapta", "Comenta" — **ouvir** |
| 5 | Qualidade das cenas | Quadros revisados com a narração real; correções abaixo |
| 6 | Movimento com intenção | Movimento médio 1,78; maior trecho parado 0,7 s (limite 1,5 s) — fios em fluxo, mensagens indo e voltando, post-its que "não acompanham o ritmo" |
| 7 | Insight útil | Documentar atendimento, atualização de imóveis e passagem de oportunidades antes de crescer; a ferramenta se adapta ao processo |
| 8 | Legendas sincronizadas | Alinhamento por palavra; sincronia vídeo × narração 0 ms |
| 9 | Música e efeitos equilibrados | Narração −18,6 LUFS na frente; trilha −37,6; efeitos −33,8; efeitos que caíam sobre a fala (entrada da CTA, ajuste da ferramenta) foram baixados/deslocados |
| 10 | Identidade ATIVO | **Parcial**: fundo escuro, tipografia, câmera e fecho do padrão aprovado. **Sem o símbolo**: não está no repositório nem na `main` (checado antes do render); não foi recriado |
| 11 | CTA com SISTEMA | COMENTE "SISTEMA" + "Receba os detalhes no Direct."; sem link da bio, sem segunda CTA, sem promessa |
| 12 | Render sem erros | 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC 48 kHz · 43,07 s · −15,03 LUFS · −1,45 dBTP · sem trechos pretos · sem silêncio total |

## Correções feitas antes da entrega

- Com a voz real, a frase "primeiro o processo, depois a ferramenta" ficaria só 0,2 s na tela → moldura e frase antecipadas para "Depois adapte…".
- Primeiro render com movimento médio 1,36 (o mais baixo da série, 43% de quadros parados) → movimento narrativo no plano da equipe → 1,78.
- Balões de dúvida sobrepostos e dúvidas visíveis atrás dos balões da tensão; tela vazia em "Antes de aumentar a operação" (corrigidos na revisão provisória).

## Inteligibilidade

Parakeet: narração 96,4%, mix 97,3% — nenhuma palavra some na mixagem.

## Observação

A avaliação de formato enviada ao cliente em 13/11 (híbrido rosto + motion; texto pequeno demais para o público 40+) ainda não teve resposta; este episódio segue o padrão atual, como pedido.

## Regenerar

```bash
cd PRODUCAO && python3 tools/build_narration.py EP033 --source ../OUTPUT/reels-anteriores/EP033/audio/tomada_A_usada.wav && python3 tools/build_audio.py EP033 && bash tools/render_episode.sh EP033
```
