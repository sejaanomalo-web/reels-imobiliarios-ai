# QA — ATIVO Reel 10 · "Juro alto ou baixo: onde está a negociação?" (17/11/2026)

**Fonte:** `ROTEIROS/ATIVO_REEL10.md` (ATIVO_Reel_10_JUROS_NEGOCIACAO_CONTEXTOS.md), narrado palavra por palavra. ID `EP-ATIVO-REEL10`. Reel **orgânico**: voz 1,0×, legenda padrão, logo só no fecho e na capa, verde exato `#3AF584`.

## CTA (regra de 14/11/2026)
- No roteiro: "Antes de usar juros como argumento de venda, confira os dados do momento e o perfil do comprador. Compartilha com quem atende financiamento."
- **Mantida a 1ª frase** (é a aplicação prática).
- "Compartilha…" virou a transição **"E para lembrar o que cada comprador respondeu, ajuda ter cada atendimento registrado."** + CTA SISTEMA → Direct.
- **A transição é minha. Precisa da aprovação do cliente.**

## Diagnóstico — `episode.json` → `diagnostico`
- C2 (contraintuitivo). Crença questionada: "juro mais baixo = imóvel mais barato".
- **Atemporal:** sem Selic, taxas, Copom, percentuais, gráfico ou previsão de preço. Os dois quadros levam CENÁRIO HIPOTÉTICO; a barra "CRÉDITO MAIS CARO" não tem escala nem número.
- Sem aconselhamento financeiro: "TODO PREÇO SOBE" e "TODA NEGOCIAÇÃO PIORA" aparecem só para serem riscados, como a fala diz.

## Voz
- Preset oficial (Gemini `gemini-3.8-flash-tts`, Puck), 1,0×, **conta 2**. Tomadas A 70,5 s · B 64,7 s.
- **Tomada B, sem edição:** 178 palavras/min (texto longo: 192 palavras com a CTA).
- **Tomada A descartada:** "**todo o** preço sobe / **toda a** negociação" — muda o sentido ("o preço inteiro").
- **Formas da voz:** "Qual **o** prazo?", "ajuda **a** ter", "pra lembrar", "Comenta SISTEMA".
- "compra agora" / "espera cair": o Whisper às vezes ouve "compr agora"; o Parakeet e o Whisper em janela curta ouvem certo. Ponto para ouvir: **0:36**.

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC · −14,95 LUFS · TP ≤ −1,6 dBTP.
- `editorial_check` 0 erros / 0 avisos.
- Movimento **1,63** · maior trecho parado 1,0 s (no limite).
- ~36 quadros revistos. Corrigidos: pratos da balança saindo da tela, balões sobrepostos, terço de baixo vazio no cenário A (barra de custo do crédito), 2 s vazios antes dos palpites e do imóvel, trechos parados no gancho e no cenário B.

## Cenas
1. **Gancho — SEMPRE? DEPENDE.:** JURO ↓ = IMÓVEL MAIS BARATO; o "=" vira "?"; carta virada O QUE A APRESENTAÇÃO ESQUECE.
2. **CRÉDITO MAIS CARO:** balança COMPRADORES × VENDEDORES; FINANCIA MENOS, ADIA PLANOS, MAIS ABERTOS?; REGIÃO, TIPO DE IMÓVEL, NECESSIDADE → DEPENDE.
3. **CRÉDITO MAIS ACESSÍVEL:** interessados chegam ao imóvel; EM ALGUNS SEGMENTOS · CONCORRÊNCIA; TODO PREÇO SOBE / TODA NEGOCIAÇÃO PIORA riscados; a carta vira CONTEXTO.
4. **CONTEXTO ANTES DO PALPITE:** COMPRA AGORA! / ESPERA CAIR! riscados; ANTES DE ORIENTAR: as quatro perguntas; CONVERSA RESPONSÁVEL > PREVISÃO CONFIANTE.
5. **DADOS ANTES DO ARGUMENTO → CADA RESPOSTA REGISTRADA:** DADOS DO MOMENTO (A CONFERIR) + PERFIL DO COMPRADOR; ATENDIMENTO DO COMPRADOR (ilustrativo).
6. **CTA SISTEMA** + logo.

## Pendências
- Aprovar a transição.
- Ouvir 0:36.
- Duração 67,0 s (fala 64,7 s), dentro dos 60–70 s.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py EP-ATIVO-REEL10 --source episodes/EP-ATIVO-REEL10/narration_source.wav && python3 tools/build_audio.py EP-ATIVO-REEL10 && bash tools/render_episode.sh EP-ATIVO-REEL10
```
