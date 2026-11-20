# QA — ATIVO_NOV26_22 · "Leilão: desconto não é lucro" (lote 30 Reels nov/2026 · 20/11/2026)

**Fonte:** `ROTEIROS/LOTE_NOV2026/ATIVO_NOV26_22.md`. GANCHO + TAKES narrados palavra por palavra. Reel orgânico, verde do lote #02FB3F, logo no fecho. Voz com a direção nova e pausas naturais (`shapePauses`).

## Apuração (20/11/2026)
- O Santander realizou em **17/11/2026** um leilão online de **195 imóveis** residenciais em 20 estados, pela plataforma da Biasi Leilões ([Jornal do Comércio](https://www.jornaldocomercio.com/economia/2026/11/1270753-santander-leiloa-imoveis-inclusive-no-rio-grande-do-sul-com-lances-a-partir-de-rs-34-mil.html), [Diário do Comércio](https://diariodocomercio.com.br/economia/santander-leiloa-195-imoveis/)). A página da leiloeira, citada no roteiro, não foi aberta.
- O evento já passou e aparece assim na tela ("REALIZADO EM 17/11"); não é divulgado como oportunidade disponível.
- O valor "a partir de R$ 34 mil" não foi usado. O cartaz é **FICTÍCIO** ("LOTE 000", "R$ ●●●.●●●").
- Comissão e impostos aparecem sem percentuais, como itens a avaliar. O vídeo não afirma que leilão é seguro (balança DESCONTO × CUSTOS E RISCOS).

## CTA
- Roteiro: "Salve este checklist antes de falar de imóveis de banco."
- Virou a transição **"Não venda apenas o percentual."** (texto de tela do Take 03) + CTA SISTEMA. **Pendente de aprovação.**

## Voz
- Tomadas A (conta 1) e B (conta 2). A B foi descartada: acrescentou "Olha," no início, fora do roteiro, e disse "Comenta". **A usada sem edição.**
- 54,54 s, 153 palavras/min, ASR 0,979 (137/139). 1,0× sem time-stretch.
- **Pontos para ouvir:**
  - "enxergar margem de lucro": nas duas tomadas, o ASR ouve "enxergar a margem", provavelmente pela ligação do "r";
  - "Não venda apenas o percentual": um ASR ouviu "vendo" num recorte curto; em janela maior aparece "venda".

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC · 56,88 s · −15,06 LUFS · TP −1,69 dBTP.
- `editorial_check` 0 erros / 0 avisos. Movimento 1,46 · maior trecho parado 0,6 s. SFX: 31 eventos, stem −40,0 LUFS.
- Quadros revisados (15 + 3). Corrigidos:
  - martelo malformado: removido;
  - quadro vazio no primeiro segundo: a grade de lotes entra desde o início;
  - "LANCE BARATO" sobre a grade;
  - carimbo reduzido.
- **Legenda Instagram:** `OUTPUT/ATIVO_NOV26_22/legenda_instagram.txt`, `legenda_check` ✓. Pasta: `PUBLICACAO/NOV26/REELS_21_AO_30/22/`.

## Cenas
1. **Gancho — LEILÃO NÃO É ATALHO:** grade de lotes; 195 IMÓVEIS · 20 ESTADOS · REALIZADO EM 17/11; LANCE "BARATO" com A CONTA BEM MAIOR abrindo embaixo.
2. **Take 01 — LANCE INICIAL NÃO É CUSTO FINAL:** cartaz fictício; ↓ MUITO ABAIXO DO MERCADO; LUCRO AUTOMÁTICO? ✕; as letras miúdas crescem ("condições variam de lote para lote").
3. **Take 02 — LEIA O EDITAL:** EDITAL / MATRÍCULA / OCUPAÇÃO / DÉBITOS / COMISSÃO / IMPOSTOS / FORMA DE PAGAMENTO ao redor do imóvel; carimbo EXAMINAR DOCUMENTOS; ⚖️ ORIENTAÇÃO JURÍDICA E DOCUMENTAL.
4. **Take 03 — NÃO VENDA APENAS O PERCENTUAL:** balança DESCONTO × CUSTOS E RISCOS; ✓ explica o que verificou / ✓ indica análise profissional; OPORTUNIDADE = DEPOIS DOS RISCOS.
5. **CTA SISTEMA** (Cada imóvel com seu checklist) + logo.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-NOV26-22 --source episodes/ATIVO-NOV26-22/narration_source.wav && python3 tools/build_audio.py ATIVO-NOV26-22 && bash tools/render_episode.sh ATIVO-NOV26-22
```
