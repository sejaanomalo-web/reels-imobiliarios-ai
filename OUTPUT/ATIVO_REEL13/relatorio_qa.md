# QA — ATIVO Reel 13 · "Por que alguns leads se perdem no meio do caminho" (17/11/2026)

**Fonte:** `ROTEIROS/ATIVO_REEL13.md` (ATIVO_Reel_13_FUNIL_QUATRO_ETAPAS.md), narrado palavra por palavra. ID `EP-ATIVO-REEL13`. Reel **orgânico**: voz 1,0×, legenda padrão, logo só no fecho e na capa, verde exato `#3AF584`.

## CTA (regra de 14/11/2026)
- No roteiro: "Quer conhecer um sistema que ajude a organizar essa jornada? Comente SISTEMA e veja as possibilidades da ATIVO."
- Já era SISTEMA; troquei pela **redação padrão** (… te envio os detalhes pelo Direct). **Sem transição extra**: o TAKE 03 já termina em "O sistema serve para deixar essas etapas visíveis…".
- Confirme se aceita perder "essa jornada" / "possibilidades da ATIVO".

## Diagnóstico — `episode.json` → `diagnostico`
- C3 (framework). Crença questionada: "receber o lead é o trabalho todo" / "máquina que vende sozinha".
- **Sem captura real**: a direção pedia painel ATIVO real "quando disponível" — não há captura autorizada no repositório. O painel do fecho é **PAINEL ILUSTRATIVO**, sem nomes, telefones ou dados.
- "Não existe botão que substitui entender a pessoa" vira o botão "RESOLVER TUDO" riscado. Som de conclusão no fecho, não de venda.

## Voz
- Preset oficial (Gemini `gemini-3.8-flash-tts`, Puck), 1,0×, **conta 2**. Tomadas A 55,6 s · B 55,3 s.
- **Tomada B, sem edição:** 171 palavras/min. CTA com "**Comente** SISTEMA" correto.
- **Tomada A descartada:** início embolado ("Receber um lead **em** uma etapa", "Fazes contato").
- **Formas da voz:** "propor a ação" sai emendado ("proporação" para o Whisper; Parakeet ouve certo), "chamar **a** atenção", "de quem **pedir**" (Parakeet) / "pediu" (Whisper). Ponto para ouvir: **0:29** "de quem pediu uma visita".

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC · 57,7 s · −14,96 LUFS · TP ≤ −1,6 dBTP.
- `editorial_check` 0 erros / 0 avisos.
- Mixagem × roteiro: 0,984.
- Movimento **1,68** · maior trecho parado 0,5 s.
- ~32 quadros revistos. Corrigidos: trilha de etapas cortada nas bordas, ficha e ações entrando ~1,5 s depois (lacunas tracejadas), trecho parado no fim do gancho (pulso no lead que avançou).

## Cenas
1. **Gancho — RECEBER ≠ AVANÇAR:** NOVO LEAD chega ao caminho; vários leads andam, alguns caem (PERDIDOS NO CAMINHO), um chega (AVANÇOU).
2. **1. ATRAIR / 2. RECEBER:** trilha das 4 etapas; vídeo que RESPONDE À DÚVIDA → PEDIDO DE INFORMAÇÕES por CANAL CLARO; ATENÇÃO ✓ CONVERSA ✓.
3. **3. ACOMPANHAR:** etapa INVISÍVEL ganha contorno; FICHA DO INTERESSADO (o que procura / já explicado / momento da decisão); colunas NOVO / COMPARANDO / VISITA com mensagens diferentes.
4. **4. PRÓXIMO PASSO → ETAPAS VISÍVEIS:** ESCLARECER DÚVIDA / ENVIAR OPÇÃO COMPATÍVEL / COMBINAR A VISITA; BOTÃO "RESOLVER TUDO" riscado; PAINEL ILUSTRATIVO com as 4 etapas.
5. **CTA SISTEMA** + logo.

## Pendências
- Aprovar a troca da CTA.
- Ouvir 0:29.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py EP-ATIVO-REEL13 --source episodes/EP-ATIVO-REEL13/narration_source.wav && python3 tools/build_audio.py EP-ATIVO-REEL13 && bash tools/render_episode.sh EP-ATIVO-REEL13
```
