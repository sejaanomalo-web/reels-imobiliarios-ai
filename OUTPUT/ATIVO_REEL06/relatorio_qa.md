# QA — ATIVO Reel 06 · "Manual para perder o controle da carteira" (17/11/2026)

**Fonte:** `ROTEIROS/ATIVO_REEL06.md` (ATIVO_Reel_06_MANUAL_IRONICO_DESORGANIZACAO.md), narrado palavra por palavra. ID `EP-ATIVO-REEL06`. Reel **orgânico**, humor irônico: voz 1,0×, legenda padrão, logo só no fecho e na capa, verde exato `#3AF584`.

## CTA (regra de 14/11/2026)
- No roteiro: "Se você reconheceu pelo menos um desses hábitos, salva para revisar sua rotina depois."
- Virou a transição **"Se você reconheceu pelo menos um desses hábitos, comece revisando onde cada informação entra."** + CTA SISTEMA → Direct. A primeira metade da frase é a original.
- **Precisa da aprovação do cliente.**
- **Ponto de atenção editorial:** o roteiro diz "o primeiro passo não é comprar uma ferramenta enorme" e logo depois vem a CTA de um sistema. "Personalizado" responde à objeção, mas vale você conferir se a sequência não soa contraditória.

## Diagnóstico — `PRODUCAO/episodes/EP-ATIVO-REEL06/episode.json` → `diagnostico`
- C1 identificação (humor irônico, sem culpar o corretor).
- Promessa: decidir onde cada dado entra, quem atualiza e como encontra depois.
- Arquivos, conversas e agendas genéricos. **Sem marca de aplicativo na tela**: o WhatsApp é citado só na fala; na tela aparece CONVERSA.
- **Sem estatística** e sem a expressão financeira depreciativa da referência.
- Capa do "manual" com o selo IRONIA · NÃO SIGA.

## Voz
- Preset oficial (Gemini `gemini-3.8-flash-tts`, Puck), 1,0×, **conta 1**. **2 gerações** (A 54,7 s · B 59,1 s).
- **Tomada A, sem edição:** 168 palavras/min.
- **Por que a A:** as duas tomadas estão limpas; a A fecha a fala dentro dos 45–55 s pedidos, e a B passaria.
- **Formas da voz:** "começa" (roteiro: "comece") e "Comenta SISTEMA". A legenda mantém o texto do roteiro.
- Em "Brincadeira à parte", o "à" é engolido na emenda das vogais. É fala natural; o Parakeet ouve completo.

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC · 57,07 s · −15,02 LUFS · TP −1,67 dBTP.
- `editorial_check` 0 erros / 0 avisos.
- Mixagem × roteiro: 0,964. As diferenças são as formas coloquiais acima e "num" → "em um".
- Movimento **1,57** · maior trecho parado 0,8 s.
- 35 quadros revistos. Corrigidos:
  - título do gancho quebrando em "QUEBRA-" / "CABEÇA?";
  - peças sobre o título;
  - lista de regras encostando no título (a câmera subia o conteúdo);
  - arquivos cobrindo o nome das caixas;
  - cartão na borda.

## Cenas
1. **Gancho:** peças FOTO / METRAGEM / VALOR / LEAD / VISITA / RETORNO soltas desde o quadro 0 → espalham no "quebra-cabeça" → É SIMPLES. → capa do MANUAL (IRONIA · NÃO SIGA).
2. **1. ESPALHE TUDO:** 01 galeria mistura imóveis e fotos pessoais; 02 PDF com VERSÃO ANTIGA; 03 conversa rola e o valor some (CADÊ O VALOR?); lupa + NOVO INTERESSADO (investigação).
3. **2. NÃO ATUALIZE NADA:** 04 leads em CONVERSA / BLOCO DE NOTAS / SÓ NA CABEÇA; 05 agendas desencontradas (15h × 16h ?) + NINGUÉM ATUALIZOU; 06 alertas de retorno, tudo treme.
4. **Virada + transição:** BRINCADEIRA À PARTE; cada informação nasce num lugar; FERRAMENTA ENORME riscada; os arquivos convergem em REGISTRAR / ATUALIZAR / CONSULTAR; ORGANIZAÇÃO É PROCESSO; "Revisar: onde cada informação entra" ✓.
5. **CTA SISTEMA** + logo.

## Pendências
- Aprovar a transição.
- Conferir o ponto de atenção editorial.
- Duração 57,1 s (fala 54,7 s), dentro do alvo de 45–55 s de fala.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py EP-ATIVO-REEL06 --source episodes/EP-ATIVO-REEL06/narration_source.wav && python3 tools/build_audio.py EP-ATIVO-REEL06 && bash tools/render_episode.sh EP-ATIVO-REEL06
```
