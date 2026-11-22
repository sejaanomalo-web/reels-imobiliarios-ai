# QA — ATIVO_NOV26_29 · "O comprador quer resposta, não cinco PDFs" (lote 30 Reels nov/2026 · 20/11/2026)

**Fonte:** `ROTEIROS/LOTE_NOV2026/ATIVO_NOV26_29.md`. GANCHO + TAKES narrados palavra por palavra. Reel orgânico, verde do lote #02FB3F, logo no fecho. Voz com a direção nova e pausas naturais (`shapePauses`).

## Apuração (20/11/2026)
- O [Conexão Imobiliária Secovi-SP](https://secovi.com.br/secovi-sp-realiza-conexao-imobiliaria-2026-no-dia-10-de-novembro/) (10/11/2026) teve painéis sobre IA, comportamento do consumidor e jornada de compra. Isso dá base à fala "virou tema em debates sobre a jornada digital do cliente".
- **O diálogo é hipotético e o chat, FICTÍCIO.** Nenhum imóvel real é afirmado como tendo vaga coberta. A ficha do imóvel é ILUSTRATIVA. Não há marca de aplicativo real.

## CTA
- Roteiro: "Envie para alguém que costuma responder tudo, menos o que foi perguntado."
- Virou a transição **"Clareza antes da automação."** (texto de tela do Take 03) + CTA SISTEMA. **Pendente de aprovação.**

## Voz
- Tomadas A (conta 1) e **B (conta 2), B usada sem edição.** A A começou com palavras fora do roteiro ("Ó, você impressiona").
- 52,42 s, 166 palavras/min, ASR **1,0 (145/145)**. 1,0× sem time-stretch.
- **Pontos para ouvir:** a citação entre aspas ("Sim, a vaga é coberta…"), para conferir se a entonação de citação ficou natural.

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC · 54,78 s · −14,99 LUFS · TP −1,61 dBTP.
- `editorial_check` 0 erros / 0 avisos. Movimento 1,68 · maior trecho parado 0,6 s. SFX: 26 eventos, stem −38,6 LUFS. Quadros: corrigido asterisco solto na legenda (“*Sim…”) — ênfase colada às aspas removida dos segmentos citados; selo +N MENSAGENS tirado de cima da pergunta.
- **Legenda Instagram:** `PUBLICACAO/2026/11-novembro/semana-22-28/28-sabado/18h00/ATIVO_NOV26_29_legenda.txt`, `legenda_check` ✓ ("garantir" trocado por "cuidar", termo bloqueado pelo check). Pasta: `PUBLICACAO/2026/11-novembro/semana-22-28/28-sabado/18h00/`.

## Cenas
1. **Gancho — ELE PEDIU UMA RESPOSTA:** chat fictício: "Esse apartamento tem vaga coberta?" e uma enxurrada de mensagens prontas + PDF; "+N MENSAGENS".
2. **Take 01 — RESPOSTA QUE NÃO RESPONDE:** 📌 VAGA COBERTA? · SEM RESPOSTA; pilha de anexos; jornada digital · debates do setor; PRIMEIRO, A PERGUNTA DELE.
3. **Take 02 — PERGUNTA → RESPOSTA → PRÓXIMO PASSO:** resposta curta + ✓ DADO CONFIRMADO NA FICHA + pergunta sobre o acesso à garagem; fluxo pergunta → resposta → próximo passo.
4. **Take 03 — CLAREZA ANTES DA AUTOMAÇÃO:** ficha atualizada (vaga coberta / acesso descrito / última conferência); conectar o pedido / verificar os dados / respeitar o momento; ✕ conversa que ignora o cliente.
5. **CTA SISTEMA** (Cada resposta no lugar certo) + logo.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-NOV26-29 --source episodes/ATIVO-NOV26-29/narration_source.wav && python3 tools/build_audio.py ATIVO-NOV26-29 && bash tools/render_episode.sh ATIVO-NOV26-29
```
