# QA — ATIVO_NOV26_02 · "Caixa estuda reajustar taxas" (lote 30 Reels nov/2026 · 17/11/2026)

**Fonte:** `ROTEIROS/LOTE_NOV2026/ATIVO_NOV26_02.md`. Narração palavra por palavra (GANCHO + TAKES). Reel orgânico, voz 1,0×, verde do lote #02FB3F, logo oficial no fecho.

## Apuração (17/11/2026)
- **Fato:** em 13/11/2026, a vice-presidente de Habitação da Caixa disse que o banco **estuda** reajustar a taxa, dependendo do volume de recursos.
- **Até 17/11:** não encontrei comunicado oficial com nova taxa ou data.
- **Fontes:** [InfoMoney](https://www.infomoney.com.br/minhas-financas/caixa-estuda-aumentar-juros-do-financiamento-imobiliario-diz-vice-presidente/), [SouBrasília](https://soubrasilia.com/caixa-estuda-aumentar-juros-financiamento-imobiliario/), [Seu Dinheiro](https://www.seudinheiro.com/2026/financas-pessoais/a-selic-alta-bateu-caixa-estuda-aumentar-juros-no-financiamento-imobiliario-julw/).
- **Na tela:**
  - carimbo **ESTUDO**, com **CONFIRMADO riscado** e "sem comunicado com taxa ou data";
  - nenhuma taxa ou valor: a simulação mostra `••••`;
  - atendimentos marcados como ilustrativos.
- **Reconferir antes de publicar:** se a Caixa anunciar o reajuste, o gancho fica desatualizado.

## CTA (regra dos Reels)
- No roteiro: "Se você atende compradores financiados, compartilhe com outro corretor."
- Virou a transição **"Se você atende compradores financiados, confirme antes de prometer."** + CTA SISTEMA → Direct. **Pendente de aprovação.**

## Voz
- Preset oficial, 1,0×, **conta 1**, 2 gerações.
- **Tomada A descartada:** a voz **leu a instrução de estilo em voz alta** antes do texto (3ª ocorrência no projeto: Reel 12, Reel 15 e esta).
- **Tomada B usada, sem edição:** 46,6 s de fala, 180 palavras/min (ritmo mais rápido que o habitual). Limpa nos dois reconhecedores.
- Aceitos: coloquial "Comenta SISTEMA" e "uma simulação" com ligação ("assimolação" no Whisper; o Parakeet ouve certo).
- **Duração do vídeo 49,0 s:** 1 s abaixo da faixa-alvo de 50–70 s; não acelerei nem estiquei a voz.

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC · 48,98 s · −14,98 LUFS · TP −1,29 dBTP.
- `editorial_check` 0 erros / 0 avisos (perfil NOV26).
- Movimento 1,72 · maior trecho parado 0,8 s.
- Mixagem × roteiro: 0,94. As palavras "sumidas" ("aqui", "o cliente", "personalizado") aparecem quando o trecho é conferido inteiro (emendas das janelas de 20 s e 40 s).
- 18 + 5 quadros revisados. Corrigidos:
  - título sobre a manchete (Take 01);
  - cartão da simulação cortado na borda;
  - rótulos da linha do tempo sob o título;
  - cliente cortado (Take 02);
  - título sobre os cartões (Take 03);
  - lupa fora da palavra "estuda".

## Cenas
1. **Gancho:** CAIXA ESTUDA na tela desde o 1º quadro; manchete datada de 13/11; uma lupa marca "estuda"; A PALAVRA MAIS IMPORTANTE: ESTUDANDO.
2. **Take 01:** carimbo ESTUDO + CONFIRMADO riscado; ESTUDA ≠ JÁ AUMENTOU; a mensagem "Corre! Você tem poucas horas para fechar!" recebe ✕ NÃO AUTORIZA.
3. **Take 02:** linha do tempo da proposta (emissão, prazo, conferência, revisão). A simulação "emitida há semanas" viaja até a etapa do banco e recebe DESATUALIZADA; o cliente passa de "Já planejei tudo" a "Mas não era esse o valor?"; SIMULAÇÃO ANTIGA PODE MUDAR.
4. **Take 03:** Corretor A envia um print antigo × Corretor B (canal oficial) confirma, explica e registra; INFORMAÇÃO PRECISA > urgência fabricada; CONFIRA ANTES DE PROMETER.
5. **CTA SISTEMA:** a lista confirmar / explicar / registrar dobra no módulo IMÓVEIS; COMENTE "SISTEMA" → Direct + logo.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-NOV26-02 --source episodes/ATIVO-NOV26-02/narration_source.wav && python3 tools/build_audio.py ATIVO-NOV26-02 && bash tools/render_episode.sh ATIVO-NOV26-02
```
