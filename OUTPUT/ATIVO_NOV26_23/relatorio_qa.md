# QA — ATIVO_NOV26_23 · "Black Friday no imóvel: é desconto real?" (lote 30 Reels nov/2026 · 20/11/2026)

**Fonte:** `ROTEIROS/LOTE_NOV2026/ATIVO_NOV26_23.md`. GANCHO + TAKES narrados palavra por palavra. Reel orgânico, verde do lote #02FB3F, logo no fecho. Voz com a direção nova e pausas naturais (`shapePauses`).

## Apuração (20/11/2026)
- Em novembro de 2026, incorporadoras lançaram campanhas de Black Friday com descontos e condições especiais ([Correio, 12/11](https://www.correio24horas.com.br/salvador/black-friday-imobiliaria-oferece-descontos-de-ate-r-100-mil-em-salvador-1126), [Diário do Comércio](https://diariodocomercio.com.br/negocios/black-friday-descontos-48-mil-imoveis/)).
- O tema é contextual, como pede a nota do roteiro: **nenhuma empresa, percentual ou promoção real é citada.** A etiqueta "-50%" está marcada como **ETIQUETA FICTÍCIA**. As propostas A (banner -50%) e B (banner -20%) estão marcadas como **PROPOSTAS FICTÍCIAS**, sem valores. O vídeo não afirma que as promoções são enganosas.

## CTA
- Roteiro: "Mande para o colega que está preparando anúncio de Black November."
- Virou a transição **"Compare propostas completas."** (texto de tela do Take 03) + CTA SISTEMA. **Pendente de aprovação.**

## Voz
- Tomadas A (conta 1) e **B (conta 2), B usada sem edição.**
- A A foi descartada: no recorte por frase do Whisper, saiu "não é adianta" e "Compara".
- Na B, "não adianta", "custo total" e "Compare" saíram corretos nos recortes por frase. Na transcrição corrida, o ASR perdeu o "não" nas duas tomadas, então vale ouvir.
- 52,72 s, 153 palavras/min, ASR 0,977 (130/134). 1,0× sem time-stretch.
- "Black Friday" lido naturalmente: a reescrita de pronúncia foi removida antes de gerar.
- **Pontos para ouvir:** "Também não adianta comparar"; "Black Friday".

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC · 55,08 s · −15,00 LUFS · TP −1,71 dBTP.
- `editorial_check` 0 erros / 0 avisos.
- Movimento 1,53 · maior trecho parado 1,0 s. SFX: 29 eventos, stem −39,7 LUFS.
- Quadros revisados (14 + 3). Corrigidos:
  - selo ETIQUETA FICTÍCIA perto do título;
  - "PARCELA BAIXA!" subindo sobre o título: agora some;
  - cartões das propostas perto da borda.
- **Legenda Instagram:** `OUTPUT/ATIVO_NOV26_23/legenda_instagram.txt`, `legenda_check` ✓. Pasta: `PUBLICACAO/NOV26/REELS_21_AO_30/23/`.

## Cenas
1. **Gancho — BLACK FRIDAY DE IMÓVEIS:** etiqueta pendurada (% → -50%); lupa com "?".
2. **Take 01 — DESCONTO SOBRE QUAL REFERÊNCIA?:** "EM RELAÇÃO A QUAL PREÇO?"; campanhas de incorporadoras · nov/2026; a etiqueta encolhe e abre BASE / CONDIÇÃO / VALIDADE; ORIGINAL ≠ PROMOCIONAL.
3. **Take 02 — PARCELA NÃO É PREÇO TOTAL:** a manchete "PARCELA BAIXA!" recua; calculadora com entrada / evolução da obra / correção monetária / taxas / cronograma = CUSTO TOTAL ?; DEPENDE DO CONTRATO.
4. **Take 03 — COMPARE PROPOSTAS COMPLETAS:** propostas fictícias A e B com checklist; MAIOR % ≠ MELHOR PROPOSTA; ✓ promoção boa resiste à comparação.
5. **CTA SISTEMA** (Cada proposta no lugar certo) + logo.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-NOV26-23 --source episodes/ATIVO-NOV26-23/narration_source.wav && python3 tools/build_audio.py ATIVO-NOV26-23 && bash tools/render_episode.sh ATIVO-NOV26-23
```
