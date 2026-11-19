# QA — ATIVO Reel 14 · "Saber tudo sobre o imóvel pode não ser suficiente" (17/11/2026)

**Fonte:** `ROTEIROS/ATIVO_REEL14.md` (ATIVO_Reel_14_ESCUTA_ANTES_DA_FICHA.md), narrado palavra por palavra. ID `EP-ATIVO-REEL14`. Reel **orgânico**: voz 1,0×, legenda padrão, logo só no fecho e na capa, verde exato `#3AF584`.

## CTA (regra de 14/11/2026)
- No roteiro: "Na próxima visita, testa começar por essa pergunta e observa como a conversa muda. Compartilha com sua equipe."
- **Mantida a 1ª frase** (aplicação prática).
- "Compartilha…" virou a transição curta **"E registra o que cada família contou."** + CTA SISTEMA → Direct.
- **A transição é minha. Precisa da aprovação do cliente.**

## Diagnóstico — `episode.json` → `diagnostico`
- C2 (paradoxo). Crença questionada: "saber tudo do imóvel basta".
- CENA ILUSTRATIVA nos dois atendimentos; casal sem rosto nem identidade; os três cenários (trabalho remoto, filho, família) aparecem como **possíveis respostas**, sem família real. Não afirma venda. A ficha técnica não é descartada ("1. PERGUNTA → 2. FICHA").

## Voz
- Preset oficial (Gemini `gemini-3.8-flash-tts`, Puck), 1,0×, **conta 2** (última geração da conta). Tomadas A 66,1 s · B 65,7 s.
- **Tomada B, sem edição:** 161 palavras/min.
- **Tomada A descartada:** "porcelanato" saiu "por, sei lá, nato".
- **Formas da voz:** "**Tá** tudo correto" (por "Está"), "Comenta SISTEMA".
- **Ponto para ouvir: 0:14 "porcelanato".** Na tomada B o Parakeet ouve certo em todas as janelas; o Whisper ouve "por selanato" na janela curta da mixagem.

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC · 68,1 s · −14,95 LUFS · TP ≤ −1,6 dBTP.
- `editorial_check` 0 erros / 0 avisos.
- Mixagem × roteiro: 0,969 ("porcelanato", "tá", "Comenta").
- Movimento **1,58** · maior trecho parado 0,7 s.
- ~31 quadros revistos. Corrigidos: cartões e personagem na borda pelo deslocamento de câmera, texto-chave aparecendo só 0,7 s, metade de baixo vazia no princípio (cartões SELECIONAR), 2 s vazios no início do fecho.

## Cenas
1. **Gancho — SABER TUDO ≠ ENTENDER:** A cercado da ficha (METRAGEM, PORCELANATO, SALÃO DE FESTAS, ACADEMIA) × B com "O que mudou?"; o lado de B acende.
2. **PRIMEIRO, A FICHA:** casal + PROCURA 2 QUARTOS; ficha empilhada no tempo da fala; TUDO CORRETO ✓; POR QUE SE MUDAR?; INFORMAÇÃO CORRETA. CONTEXTO ERRADO.
3. **PRIMEIRO, A PERGUNTA:** "O que mudou na rotina de vocês?" ocupa a tela; POSSÍVEIS RESPOSTAS (trabalho remoto / chegada de um filho / perto da família); ficha apaga e acende O QUE ATENDE ESTE MOMENTO.
4. **ENTENDA ANTES DE APRESENTAR:** FICHA TÉCNICA ✓ obrigatória + CONTEXTO; SELECIONAR; APRESENTAÇÃO vira ORIENTAÇÃO; 1. PERGUNTA → 2. FICHA.
5. **TESTA NA PRÓXIMA VISITA:** a pergunta + "a conversa muda"; O QUE A FAMÍLIA CONTOU (exemplo ilustrativo).
6. **CTA SISTEMA** + logo.

## Pendências
- Aprovar a transição.
- Ouvir 0:14.
- **Duração 68,1 s (fala 65,7 s): ~6 s acima dos 50–60 s.** O texto do roteiro + a frase de aplicação mantida já somam ~176 palavras; a 1,0× não cabe em 60 s. Para caber, seria preciso cortar texto (ex.: tirar a frase de aplicação mantida) — decisão do cliente.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py EP-ATIVO-REEL14 --source episodes/EP-ATIVO-REEL14/narration_source.wav && python3 tools/build_audio.py EP-ATIVO-REEL14 && bash tools/render_episode.sh EP-ATIVO-REEL14
```
