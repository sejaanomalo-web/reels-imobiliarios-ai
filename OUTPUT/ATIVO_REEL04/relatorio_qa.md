# QA — ATIVO Reel 04 · "Dois atendimentos, a mesma busca" (17/11/2026)

**Fonte:** `ROTEIROS/ATIVO_REEL04.md` (ATIVO_Reel_04_DOIS_ATENDIMENTOS_PERGUNTAS.md), narrado palavra por palavra. ID `EP-ATIVO-REEL04`. Reel **orgânico**: voz 1,0×, legenda padrão, logo só no fecho e na capa, verde exato `#3AF584`.

## CTA (regra de 14/11/2026)
- No roteiro: "Antes de mandar a próxima lista, testa essas três perguntas. Depois me conta se a conversa ficou mais clara."
- **Mantida a 1ª frase**, que é a ação prática do vídeo.
- "Depois me conta…" virou a transição **"E deixa as respostas de cada comprador registradas para a próxima conversa."**, seguida da CTA SISTEMA → Direct.
- **A transição é minha. Precisa da aprovação do cliente.**
- A pergunta "a conversa ficou mais clara?" funciona como legenda do post.

## Diagnóstico — `PRODUCAO/episodes/EP-ATIVO-REEL04/episode.json` → `diagnostico`
- C2 (comparação). Crença questionada: "mandar mais opções rápido é atender bem".
- Promessa: três perguntas antes da próxima lista (objetivo, indispensável, viabilidade).
- **Situação hipotética**, com o selo SITUAÇÃO ILUSTRATIVA.
- Imóveis com preço mascarado (`R$ ••••`), **sem valores, simulação bancária ou aprovação de crédito**. A viabilidade aparece só como pergunta ("Orçamento já orientado sobre crédito?").

## Voz
- Preset oficial (Gemini `gemini-3.8-flash-tts`, Puck), 1,0×. **Conta 1** (a conta 2 esgotou ontem e renova às ~08:00 UTC). **2 gerações** (A 66,0 s · B 66,6 s).
- **Tomada B, sem edição:** 160 palavras/min.
- Tomada A descartada: o "te envio" da CTA saiu ambíguo (o Whisper ouve "tinha enviado" em duas janelas).
- Formas da voz:
  - "Imagine", "Perceba", "deixe" e "Comenta" (roteiro: "Imagina", "Percebe", "deixa", "Comente"). A legenda mantém o texto do roteiro.
  - "vêm" × "vem" soam iguais.
- **Ponto para ouvir:** 0:21 "A conversa **esfria**". O Whisper ouve "se fria"; o Parakeet, no trecho isolado, ouve certo.

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC · 68,91 s · −15,08 LUFS · TP −1,61 dBTP.
- `editorial_check` 0 erros / 0 avisos.
- Mixagem × roteiro: 0,938. Diferenças:
  - "dez/três" viram dígitos;
  - formas da voz acima;
  - palavras "sumidas" nas bordas das janelas de 20 s (40 s e 60 s), que saem certas com a janela deslocada.
- Movimento **1,52** · maior trecho parado 0,8 s (antes da correção: 1,1 s na abertura).
- 36 quadros revistos. Corrigidos:
  - parte de baixo vazia no gancho;
  - pilha de imóveis começando ~3 s depois da fala;
  - carimbo sobre o termômetro;
  - pergunta 3 cortando o rótulo;
  - título sobre os painéis;
  - molduras cortadas no quadro 0;
  - abertura parada.

## Cenas
1. **Gancho:** família ilustrativa (QUER UM APARTAMENTO); caminhos tracejados fluindo desde o quadro 0 → no "dois" a bifurcação acende: ATENDIMENTO 1 (fotos primeiro) × ATENDIMENTO 2 (perguntas primeiro).
2. **Take 01:** "Quero um apartamento." → 10 cartões se amontoam (contador) → "Obrigado!" + CABE NA ROTINA? / E NO ORÇAMENTO? → 10 OPÇÕES. ZERO CLAREZA. → termômetro da conversa esfria.
3. **Take 02:** 3 PERGUNTAS ANTES DA LISTA (OBJETIVO / PRIORIDADES / VIABILIDADE), preenchidas na fala → filtro: dos 10, ficam 3 OPÇÕES QUE FAZEM SENTIDO.
4. **Take 03:** PERGUNTE ANTES DE INDICAR. ENVIAR TUDO × SELECIONAR COM CRITÉRIO; "menos por preguiça" ✕ / "o que conversa com a realidade" ✓; QUALIFICAÇÃO ≠ INTERROGATÓRIO; MENOS TEMPO PERDIDO (comprador + corretor).
5. **Aplicação + transição:** rascunho PRÓXIMA LISTA com o enviar travado até as 3 perguntas → respostas registradas na ficha COMPRADOR.
6. **CTA SISTEMA** + logo.

## Pendências
- Aprovar a transição.
- Ouvir 0:21.
- **Duração 68,9 s:** 4 s acima dos 55–65 s do roteiro (178 palavras a 160 palavras/min). Sem aceleração. Cortar "Percebe a diferença?" ou "Ela até agradece," devolveria ~2 s.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py EP-ATIVO-REEL04 --source episodes/EP-ATIVO-REEL04/narration_source.wav && python3 tools/build_audio.py EP-ATIVO-REEL04 && bash tools/render_episode.sh EP-ATIVO-REEL04
```
