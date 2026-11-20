# QA — ATIVO_NOV26_24 · "Por que a incorporadora pisa no freio?" (lote 30 Reels nov/2026 · 20/11/2026)

**Fonte:** `ROTEIROS/LOTE_NOV2026/ATIVO_NOV26_24.md`. GANCHO + TAKES narrados palavra por palavra. Reel orgânico, verde do lote #02FB3F, logo no fecho. Voz com a direção nova e pausas naturais (`shapePauses`).

## Apuração (20/11/2026)
- [Portas](https://portas.com.br/noticias/eztec-ve-excesso-de-oferta-no-alto-padrao-e-preve-menos-lancamentos-em-2027/) (citando Exame e relatório do Safra): a gestão da **Eztec** vê excesso de oferta de alto padrão em **Moema, Itaim Bibi e Vila Clementino** (São Paulo) e prevê **menos lançamentos em 2027**. A matéria da Exame citada no roteiro não foi aberta.
- **Ressalva:** o foco principal da Eztec é o médio padrão (65% do VGV de 2025). O roteiro a chama de "incorporadora de alto padrão". A fala foi mantida porque a notícia é sobre o alto padrão. **Ponto para aprovação.**
- Tela: "UMA INCORPORADORA · SEGUNDO A IMPRENSA", "NOTÍCIA · NOV/2026 · SEGUNDO A IMPRENSA", 1 EMPRESA / 1 SEGMENTO / 1 CIDADE. Sem números de estoque. Prateleiras, torres e ficha são ILUSTRATIVAS.

## CTA
- Roteiro: "Você acompanha o estoque dos empreendimentos que anuncia?"
- Virou a transição **"Leia o contexto."** (texto de tela do Take 03) + CTA SISTEMA. **Pendente de aprovação.**

## Voz
- 20/11, madrugada:
  - conta 1 deu "quota exceeded" na tomada A;
  - a tomada B (conta 2) vazou a direção no início; cortei esse trecho, mas ficou a dúvida "Manchete/Manchate";
  - a tomada C (conta 2) deu "quota exceeded";
  - o episódio ficou bloqueado.
- 20/11, 11h UTC, após renovação: **tomada D (conta 1) usada sem edição.** "Manchete" sai correto e não há vazamento.
- 50,0 s, 169 palavras/min, ASR 0,968 (134/141). 1,0× sem time-stretch. Pronúncia: "Eztec" enviado ao modelo como "Éztec".
- **Pontos para ouvir:** "Eztec"; "Imagina" (forma coloquial de "Imagine").

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC · 52,35 s · −14,96 LUFS · TP −1,57 dBTP.
- `editorial_check` 0 erros / 0 avisos. Movimento 1,45 · maior trecho parado 1,2 s (fecho). SFX: 30 eventos, stem −39,5 LUFS.
- Quadros revisados (15 + 4). Corrigidos: prateleira e selo "2027 ↓ MENOS" perto do título; prateleiras do Take 02 e ficha do Take 03 baixadas.
- **Legenda Instagram:** `OUTPUT/ATIVO_NOV26_24/legenda_instagram.txt`, `legenda_check` ✓. Pasta: `PUBLICACAO/NOV26/REELS_21_AO_30/24/`.

## Cenas
1. **Gancho — MENOS LANÇAMENTOS:** prateleira de lançamentos que esvazia; "2027 ↓ MENOS"; 💎 LUXO ACABOU?
2. **Take 01 — DECISÃO DE UMA EMPRESA ≠ TODO O MERCADO:** "NÃO."; cartão de notícia atribuído; 1 EMPRESA / 1 SEGMENTO / 1 CIDADE; UNIDADES DISPONÍVEIS / VELOCIDADE DE VENDAS / NOVOS PROJETOS.
3. **Take 02 — ESTOQUE TAMBÉM É ESTRATÉGIA:** prateleira de estoque × lançamentos parecidos; ⚠ CONCORRÊNCIA COM O PRÓPRIO ESTOQUE; lançamentos planejados; ✓ ESTRATÉGIA, ~~PÂNICO~~.
4. **Take 03 — LEIA O CONTEXTO:** ficha do empreendimento (momento / condições / estoque verificado / alternativas); MANCHETE DRAMÁTICA × ✓ LEITURA DE MERCADO.
5. **CTA SISTEMA** (Cada empreendimento acompanhado) + logo.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-NOV26-24 --source episodes/ATIVO-NOV26-24/narration_source.wav && python3 tools/build_audio.py ATIVO-NOV26-24 && bash tools/render_episode.sh ATIVO-NOV26-24
```
