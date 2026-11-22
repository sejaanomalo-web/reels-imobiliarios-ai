# QA — ATIVO_NOV26_19 · "Um quarto, aluguel por metro mais alto" (lote 30 Reels nov/2026 · 19/11/2026)

**Fonte:** `ROTEIROS/LOTE_NOV2026/ATIVO_NOV26_19.md`. GANCHO + TAKES narrados palavra por palavra. Reel orgânico, verde do lote #02FB3F, logo no fecho. Voz com a direção nova e pausas naturais (`shapePauses`).

## Apuração (19/11/2026)
- **Índice FipeZAP de Locação Residencial, outubro/2026** (preços anunciados para novos contratos): **1 dormitório R$ 72,76/m²** (maior preço médio) e **3 dormitórios R$ 47,52/m²**. Confirmado em reportagens que citam o informe (Jornal de Brasília, Brasil em Folhas, Gazeta do Povo). A página do roteiro (InfoMoney) e o PDF da Fipe estão bloqueados pela rede desta sessão.
- Fala: "quase setenta e três" e "perto de quarenta e oito". Tela: valores exatos com "ALUGUEL ANUNCIADO · R$/m² · MÉDIA" e "FIPEZAP · LOCAÇÃO · OUT/2026".
- Sem retorno calculado: a planilha "CONTA DO INVESTIDOR" (ILUSTRATIVO) tem campos "DADO DO CASO" e "RETORNO = ?". Studio e imóvel maior são EXEMPLOS ILUSTRATIVOS, sem valores. Nenhuma tipologia é apresentada como melhor ("✕ TIPOLOGIA VENCEDORA UNIVERSAL").

## CTA
- Roteiro: "Você já recebeu cliente escolhendo investimento só pelo aluguel por metro?"
- Virou a transição **"Mostre a conta completa."** (texto de tela do Take 03) + CTA SISTEMA. **Pendente de aprovação.**

## Voz
- **5 gerações na conta 1 (registro honesto):**
  - **A:** "que é lugar rápido" no lugar de "que aluga rápido".
  - **B:** "Pensa num" embolado.
  - **C (3ª, permitida porque A e B tinham erro):** vazou o texto da direção e também errou "aluga".
  - **D e E: geradas por engano meu.** Importei o `build_narration.py` só para medir tempos de palavras, e o script rodou inteiro: sem fonte congelada, gerou 2 tomadas e guardou a melhor.
- **D usada sem edição:** "Pensa num estúdio que aluga rápido", "não em vender... vencedora universal", sem vazamento.
- 51,07 s, 169 palavras/min, ASR 0,933 (os "não reconhecidos" são números ditos por extenso, que o ASR escreve em dígitos, e "studio", que ele ouve como "estúdio"). 1,0× sem time-stretch.
- **Pontos para ouvir:** "studio" (sai como "estúdio"); "FipeZAP"; "Pro corretor" (coloquial); "compara com um imóvel maior" (o "um" fica fraco).

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC · 53,42 s · −14,96 LUFS · TP −1,61 dBTP.
- `editorial_check` 0 erros / 0 avisos. Movimento 1,34 · maior trecho parado 1,2 s. SFX: 33 eventos, stem −39,7 LUFS.
- Quadros revisados (16 + 9). Corrigidos:
  - valor da barra encostando no rótulo "1 QUARTO";
  - cartão STUDIO e planilha invadindo o título;
  - cartão IMÓVEL MAIOR cortado na borda.
- **Legenda Instagram:** `PUBLICACAO/2026/11-novembro/semana-22-28/27-sexta/08h00/ATIVO_NOV26_19_legenda.txt`, `legenda_check` ✓ (135 palavras). Pasta: `PUBLICACAO/2026/11-novembro/semana-22-28/27-sexta/08h00/`.

## Cenas
1. **Gancho — 1 QUARTO VS 3 QUARTOS:** plantas e barras que sobem contando até R$ 72,76 e R$ 47,52 por m²; VS; aluguel anunciado · média.
2. **Take 01 — VALOR POR M² ≠ LUCRO:** réguas resumidas com fonte FipeZAP; R$/m² (preço pedido) ≠ DINHEIRO SOBRANDO; "PARA O PROPRIETÁRIO?".
3. **Take 02 — RENTABILIDADE TEM MAIS VARIÁVEIS:** STUDIO (✓ aluga rápido / condomínio alto / troca de moradores, com caixas de mudança passando) × IMÓVEL MAIOR (aluguel total diferente / outra vacância); DESPESAS · VACÂNCIA · MANUTENÇÃO.
4. **Take 03 — MOSTRE A CONTA COMPLETA:** planilha preenchida com dados do caso; RETORNO = ? · CALCULE COM DADOS; ✕ tipologia vencedora universal; "Mostre a conta completa".
5. **CTA SISTEMA** (Cada investidor com a sua conta) + logo.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-NOV26-19 --source episodes/ATIVO-NOV26-19/narration_source.wav && python3 tools/build_audio.py ATIVO-NOV26-19 && bash tools/render_episode.sh ATIVO-NOV26-19
```
