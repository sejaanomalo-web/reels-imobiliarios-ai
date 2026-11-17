# QA — ATIVO_NOV26_03 · "O dinheiro que financia os imóveis" (lote 30 Reels nov/2026 · 17/11/2026)

**Fonte:** `ROTEIROS/LOTE_NOV2026/ATIVO_NOV26_03.md`. Narração palavra por palavra. Reel orgânico, voz 1,0×, verde do lote #02FB3F, logo no fecho.

## Apuração (17/11/2026)
- **Fato:** o Banco Central divulgou em 11/11/2026 que a poupança teve saída líquida em outubro/2026, de cerca de R$ 8,88 bi ([Diário do Comércio](https://diariodocomercio.com.br/financas/saques-poupanca-superam-depositos/)).
- **Pela nota do roteiro, o valor não aparece** na locução nem na tela, que mostra só "Outubro: saída líquida · Banco Central · divulgado em 11/11/2026".
- O reservatório é metáfora (rótulo METÁFORA). O esquema de fontes leva "ESQUEMA ILUSTRATIVO · SEM PROPORÇÕES", sem percentuais.

## CTA
- No roteiro: "Gostou desse tipo de explicação? Siga a ATIVO para entender o mercado sem complicação."
- Virou a transição **"Traduza a notícia para o cliente, sem complicação."** (o texto de tela do Take 03) + CTA SISTEMA. **Pendente de aprovação.**

## Voz
- Preset oficial, 1,0×, **conta 1**, 2 gerações.
- **Usada: tomada B + a frase "Quando há mais saques do que depósitos, esse reservatório fica sob pressão." da tomada A.**
  - Na B, o Whisper ouvia "fica **à sua** pressão" (o Parakeet ouvia certo); na A, "sob pressão" saiu claro.
  - Tom da frase emendada ≈157 Hz, contra ≈160–162 Hz nas frases vizinhas da B (o "sob pressão" original da B estava em ≈128 Hz, mais grave).
  - Crossfade de 12 ms, ganho por RMS (×0,79).
- **Tomada A descartada no restante:** disse "saída de recursos", sem o "líquida".
- Aceitos: "Acompanha" (coloquial), "a saída líquida", "a aprovação".
- 47,6 s de fala, 168 palavras/min. Vídeo de 50,0 s.

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC · 49,98 s · −15,07 LUFS · TP −1,64 dBTP.
- `editorial_check` 0 erros / 0 avisos (perfil NOV26).
- **Movimento 1,40** · maior trecho parado 0,8 s. A 1ª medição deu 1,18; ajustei com câmera percorrendo o reservatório, nível enchendo e mais deriva.
- Mixagem × roteiro: 0,94. Diferenças: "volta ou registrar" na emenda da janela de 20 s, "pro", "traduz a" (ligação) e "Comenta".
- 18 + 6 quadros revisados. Corrigidos:
  - ~3 s vazios no Take 02 (o esquema do banco entra junto com a notícia);
  - entrada do reservatório;
  - traço solto da fonte ainda não citada;
  - cartão CRÉDITO cortado pela câmera.

## Cenas
1. **Gancho:** DINHEIRO DA POUPANÇA; cartões POUPANÇA e FINANCIAMENTO ligados por um traço; "?".
2. **Take 01:** reservatório POUPANÇA com DEPÓSITOS entrando e CRÉDITO saindo; UMA DAS FONTES / REGRAS ESPECÍFICAS; quando entram os SAQUES, o nível baixa → SOB PRESSÃO; POUPANÇA É UMA FONTE DE RECURSOS.
3. **Take 02:** "Outubro: saída líquida" (BC, 11/11) → banco com poupança + OUTRAS FONTES + DECISÕES DO BANCO; BANCO SEGUE FINANCIANDO; SAÍDA DE RECURSOS ≠ CRÉDITO ZERO.
4. **Take 03:** atendimento ilustrativo com simulação "condições atualizadas hoje": APROVAÇÃO / TAXA / PRAZO = depende do perfil; NÃO É IGUAL PARA TODO MUNDO; TRADUZA A NOTÍCIA PARA O CLIENTE.
5. **CTA SISTEMA** + logo.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-NOV26-03 --source episodes/ATIVO-NOV26-03/narration_source.wav && python3 tools/build_audio.py ATIVO-NOV26-03 && bash tools/render_episode.sh ATIVO-NOV26-03
```
