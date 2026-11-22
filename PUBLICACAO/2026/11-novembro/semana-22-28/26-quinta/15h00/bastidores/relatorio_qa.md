# QA — ATIVO_NOV26_16 · "Compra Assistida: o que realmente é" (lote 30 Reels nov/2026 · 19/11/2026)

**Fonte:** `ROTEIROS/LOTE_NOV2026/ATIVO_NOV26_16.md`. Narração do GANCHO + TAKES palavra por palavra. Reel orgânico, verde do lote #02FB3F, logo no fecho. Voz com a direção nova e pausas naturais (`shapePauses`).

## Apuração (19/11/2026)
- **Portaria MCID nº 1.519** (assinada em 05/11/2026, publicada em 06/11) institui metas e procedimentos da modalidade **Compra Assistida** do MCMV (recursos do FAR; imóveis novos ou usados em área urbana) para famílias de localidades com **emergência ou calamidade reconhecida pela Defesa Civil nacional** e famílias **removidas por obras federais**; a nº 1.520 trata da definição e vinculação das famílias. O município adere e a Caixa avalia o enquadramento ([Atlas Público](https://atlaspublico.com.br/noticias/ministerio-das-cidades-define-regras-de-compra-assistida-do-99433), [Portas](https://portas.com.br/noticias/mcmv-governo-define-regras-para-compra-de-imoveis-apos-desastres-e-obras-federais/)).
- Fonte do roteiro ([gov.br — Compra Assistida Nacional](https://www.gov.br/cidades/pt-br/acesso-a-informacao/acoes-e-programas/habitacao/programa-minha-casa-minha-vida/compra-assistida-nacional)) não acessível nesta sessão (host fora da rede liberada).
- Na tela: PORTARIA MCID Nº 1.519 · NOV/2026; NÃO É BENEFÍCIO UNIVERSAL; SITUAÇÕES ESPECÍFICAS; sem valores de subsídio, prazos ou promessa; não apresentado como venda comum nem crédito para todos. Mapa ESQUEMÁTICO, story FICTÍCIO e documento ILUSTRATIVO. Cor de "obras" trocada de âmbar para cinza (evitar o amarelo da ANÔMALO).

## CTA
- No roteiro: "Salve este vídeo e consulte a portaria antes de comentar o programa."
- Virou a transição **"Antes de comentar o programa, consulte a portaria."** + CTA SISTEMA. **Pendente de aprovação.**

## Voz
- 2 gerações (conta 2: A; conta 1: **B, usada sem edição**). Sem vazamento da direção.
- Pausas: 16 moldadas (maior 0,37 s); 51,4 s → 50,6 s, 170 palavras/min, 1,0× sem time-stretch.
- **Pontos para ouvir:** "Imagina" (o modelo usa a forma coloquial no lugar de "Imagine", nas duas tomadas); "Comenta SISTEMA". Isolados e corretos: "áreas atingidas", "leia quem pode participar", "prestar um bom serviço".

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC · 52,95 s · −14,97 LUFS · TP −1,60 dBTP.
- `editorial_check` 0 erros / 0 avisos.
- Movimento 1,47 · maior trecho parado 2,0 s (no fecho com o logo; dentro da regra do guia de ≤ 2–3 s).
- SFX: 27 eventos, stem −38,7 LUFS; transcrição da mixagem 0,941 × narração 0,944.
- 16 + 3 quadros revisados. Corrigidos: "✕ PARA QUALQUER COMPRADOR" encostando no cartão; metade inferior vazia no Take 03 (documento encolhe e vira referência "PORTARIA MCID Nº 1.519 · leia antes de comentar").
- **Legenda Instagram:** `PUBLICACAO/2026/11-novembro/semana-22-28/26-quinta/15h00/ATIVO_NOV26_16_legenda.txt` — `legenda_check` ✓ (126 palavras). Pasta: `PUBLICACAO/2026/11-novembro/semana-22-28/26-quinta/15h00/`.

## Cenas
1. **Gancho — COMPRA ASSISTIDA:** cartão da modalidade; pessoas caminhando até ele; barreira e "✕ PARA QUALQUER COMPRADOR".
2. **Take 01 — NÃO É BENEFÍCIO UNIVERSAL:** Portaria MCID nº 1.519; mapa esquemático com poucas áreas marcadas (⚠ emergência ou calamidade reconhecida, 🚧 obras públicas); SITUAÇÕES ESPECÍFICAS.
3. **Take 02 — NÃO GENERALIZE:** story fictício "NOVO BENEFÍCIO PARA TODO MUNDO!"; "Quero participar!" → "Já vou planejar a mudança." → ✕ NÃO SE ENQUADRA; selo NÃO FAÇA; documento oficial = o contexto.
4. **Take 03 — CONTEXTO É ORIENTAÇÃO:** documento se divide em QUEM / ONDE / COMO; referência à portaria; O LIMITE DA NOTÍCIA · ✓ BOM SERVIÇO; "Antes de comentar, consulte a portaria".
5. **CTA SISTEMA** (Orientação de cada interessado) + logo.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-NOV26-16 --source episodes/ATIVO-NOV26-16/narration_source.wav && python3 tools/build_audio.py ATIVO-NOV26-16 && bash tools/render_episode.sh ATIVO-NOV26-16
```
