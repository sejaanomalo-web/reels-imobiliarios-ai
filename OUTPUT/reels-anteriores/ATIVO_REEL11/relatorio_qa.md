# QA — ATIVO Reel 11 · "A venda aconteceu, mas o caixa não respirou" (17/11/2026)

**Fonte:** `ROTEIROS/ATIVO_REEL11.md` (ATIVO_Reel_11_CICLO_COMISSAO_E_CAIXA.md), narrado palavra por palavra. ID `EP-ATIVO-REEL11`. Reel **orgânico**: voz 1,0×, legenda padrão, logo só no fecho e na capa, verde exato `#3AF584`.

## CTA (regra de 14/11/2026)
- No roteiro: "Salva esse vídeo para revisar seu planejamento no fechamento do mês."
- Virou a transição **"E para acompanhar negociações e prospecção sem depender da memória, ajuda ter tudo organizado num só lugar."** + CTA SISTEMA → Direct.
- A ponte vai para **negociações e prospecção** (o que o sistema organiza), **não para finanças** — não apresento o sistema como ferramenta financeira.
- **A transição é minha. Precisa da aprovação do cliente.**

## Diagnóstico — `episode.json` → `diagnostico`
- C2 (metáfora visual). Crença questionada: "uma venda grande resolve o caixa".
- **Sem valores, percentuais, escala no reservatório ou a estatística "90% desistem"** (nota editorial). Comissão sempre `R$ ••••`; calendário "MÊS ILUSTRATIVO" só com marcas de entrada/saída.
- "Não resolve todos os riscos" aparece na tela, como na fala. Sem promessa de renda recorrente.

## Voz
- Preset oficial (Gemini `gemini-3.8-flash-tts`, Puck), 1,0×, **conta 2**. Tomadas A 67,0 s · B 60,4 s.
- **Tomada A, sem edição:** 149 palavras/min. "Com **a** operação" confirmado pelos dois reconhecedores.
- **Tomada B descartada:** "pode **sair regular**" (Parakeet) e "Com operação" (artigo engolido) — risco de sentido.
- **Formas da voz:** "ajuda **a** ter", "Comenta SISTEMA", reticências do gancho lidas como pausa curta.

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC · 69,4 s · −14,97 LUFS · TP ≤ −1,6 dBTP.
- `editorial_check` 0 erros / 0 avisos.
- Mixagem × roteiro: 0,979 (artigos, "mantém", "Comenta"; "personalizado" sumiu só na borda de janela — confirmado na janela 58–62,5 s).
- Movimento **1,60** (1ª medição 1,39) · maior trecho parado 0,9 s.
- ~32 quadros revistos. Corrigidos: rótulo VENDA FECHADA sob o marcador, ENTRADA GRANDE sobreposto a CAIXA, trechos parados no calendário e no reservatório.

## Cenas
1. **Gancho — A VENDA ACONTECEU. E O CAIXA?:** trilha circular sai do PONTO DE PARTIDA, acende VENDA FECHADA, passa pelas SEMANAS e volta ao início; "?".
2. **VENDA ≠ CAIXA DISPONÍVEL:** mês ilustrativo com uma ENTRADA; PRÓXIMA COMISSÃO: AINDA NÃO ENTROU; saídas por DESLOCAMENTOS, DIVULGAÇÃO, CONTAS, TEMPO EM VISITAS; PRESSÃO DO MÊS SEGUINTE.
3. **PENSA NUM RESERVATÓRIO:** saída contínua; ENTRADA GRANDE enche e esvazia; ENTRADA GRANDE ≠ TRANQUILIDADE DEPOIS; CAIXA + NOVAS OPORTUNIDADES em entradas regulares; CONTINUIDADE IMPORTA.
4. **3 FRENTES DE CONTROLE:** FINANÇAS / NEGOCIAÇÕES / PROSPECÇÃO; NÃO RESOLVE TODOS OS RISCOS; URGÊNCIA DO DIA → DECISÃO.
5. **TUDO NUM SÓ LUGAR:** NEGOCIAÇÕES E PROSPECÇÃO (exemplo ilustrativo).
6. **CTA SISTEMA** + logo.

## Pendências
- Aprovar a transição.
- **Duração 69,4 s (fala 67,0 s): ~2 s acima dos 55–65 s.** A tomada mais curta (B) tinha risco de sentido; preferi a correta. Se precisar caber, o corte natural é encurtar a transição (exige nova geração de voz).

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py EP-ATIVO-REEL11 --source episodes/EP-ATIVO-REEL11/narration_source.wav && python3 tools/build_audio.py EP-ATIVO-REEL11 && bash tools/render_episode.sh EP-ATIVO-REEL11
```
