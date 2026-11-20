# QA — ATIVO_NOV26_26 · "44% dos leads fora do expediente" (lote 30 Reels nov/2026 · 20/11/2026)

**Fonte:** `ROTEIROS/LOTE_NOV2026/ATIVO_NOV26_26.md`. GANCHO + TAKES narrados palavra por palavra. Reel orgânico, verde do lote #02FB3F, logo no fecho. Voz com a direção nova e pausas naturais (`shapePauses`).

## Apuração (20/11/2026)
- Matéria do Secovi-SP (nov/2026), painel sobre cooperação entre imobiliárias: Bernardo Dorigo, GM B2B Brasil do QuintoAndar, estimou com base em levantamentos da empresa que **44% dos leads aparecem fora do horário comercial** ([matéria Secovi](https://secovi.com.br/cooperar-entre-imobiliarias-suaviza-o-diagnostico-das-vendas-avaliam-executivos-do-setor/)). A página está bloqueada nesta sessão; o conteúdo foi confirmado por busca.
- Na tela: "44%*" com a nota "* ESTIMATIVA DO QUINTOANDAR, COM DADOS DA EMPRESA · APRESENTADA NO SECOVI-SP · NOV/2026 · NÃO É TAXA NACIONAL".
- A situação das 22h é marcada como **HIPOTÉTICA**. As conversas são **SIMULADAS**.
- A resposta do celular B está identificada como **MENSAGEM AUTOMÁTICA**, sem fingir atendimento humano.
- O vídeo não promete nenhuma função automática da ATIVO.

## CTA
- Roteiro: "Quando chegam mais contatos para você: durante o dia ou à noite? Comente."
- Virou a transição **"Lead recebido precisa ter dono."** (texto de tela do Take 03) + CTA SISTEMA. **Pendente de aprovação.**

## Voz
- Tomadas A (conta 1) e **B (conta 2), B usada sem edição.** A A saiu com "manda" e "respeit" no gancho.
- 49,82 s, 177 palavras/min (o ritmo mais rápido do lote, ainda natural, 1,0× sem time-stretch).
- ASR 0,924 (133/147): os "não reconhecidos" são números ditos por extenso, que o ASR escreve em dígitos (dez, quarenta e quatro, vinte e quatro), e "QuintoAndar", enviado ao modelo como "Quinto Andar".
- **Pontos para ouvir:** "Secovi" (o "i" final sai fraco); ritmo geral.

## Validação
- `editorial_check` 0 erros / 0 avisos.
- Quadros revisados (14 + 4). Corrigidos:
  - ~5 s quase vazios no início do Take 01: relógio e "??%" entram antes da contagem;
  - celular do gancho e fluxo do Take 03 baixados para longe do título.
- **Legenda Instagram:** `OUTPUT/ATIVO_NOV26_26/legenda_instagram.txt`, `legenda_check` ✓. Pasta: `PUBLICACAO/NOV26/REELS_21_AO_30/26/`.

## Cenas
1. **Gancho — 22H: LEAD CHEGOU:** celular às 22:00 ("Oi! O apartamento ainda está disponível?"); o relógio pula para 09:30 do dia seguinte; "Bom dia! Está sim 😊"; "Obrigado, já marquei com outra pessoa."; CONVERSA SIMULADA.
2. **Take 01 — 44% FORA DO HORÁRIO\*:** SITUAÇÃO HIPOTÉTICA; contador 44%* e relógio; nota com a fonte.
3. **Take 02 — NÃO É SOBRE NUNCA DESCANSAR:** 😴 ~~ACORDADO 24H~~; celular A (silêncio até amanhã) × B (mensagem automática que confirma o recebimento e o horário); ✓ recebimento / prazo de resposta / próximo passo.
4. **Take 03 — LEAD RECEBIDO PRECISA TER DONO:** fluxo ENTRADA → REGISTRO → RESPONSÁVEL → RESPOSTA; CONFIRMAÇÃO CLARA; AUTOMAÇÃO DIZ O QUE FAZ.
5. **CTA SISTEMA** (Cada lead com responsável) + logo.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-NOV26-26 --source episodes/ATIVO-NOV26-26/narration_source.wav && python3 tools/build_audio.py ATIVO-NOV26-26 && bash tools/render_episode.sh ATIVO-NOV26-26
```
