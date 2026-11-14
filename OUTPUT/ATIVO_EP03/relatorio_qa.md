# QA — ATIVO Episódio 03 · "A energia de um bom corretor não vem de um discurso motivacional" (14/11/2026)

**Fonte:** `ROTEIROS/ATIVO_EP03.md` (ATIVO_Roteiro_03.docx do cliente), narrado palavra por palavra. **CTA do próprio roteiro:** compartilhamento ("Compartilhe este vídeo com um corretor que trabalha sério mesmo nos dias difíceis." / tela COMPARTILHE COM UM CORRETOR). Não substituída por SISTEMA.

## Diagnóstico editorial (guia ATIVO §2) — registrado em `PRODUCAO/episodes/EP-ATIVO03/episode.json` → `diagnostico`
C2 mudança de percepção · crença questionada: "bom atendimento = euforia/performance" · promessa: 3 verificações antes do atendimento + registro honesto do dia · evidências: conhecimento prático, sem números, depoimentos ou telas de produto.

## Voz
Preset oficial (Gemini `gemini-3.8-flash-tts`, Puck, direção original), **1,0×**, sem edição. 3 tomadas: **B usada** (70,0 s, 168 palavras/min; Parakeet+Whisper conferidos); A limpa (76,1 s, reserva); C descartada (omitiu o "não" em "a negociação não avança" — inverteria o sentido).

## Validação técnica (11/11 OK)
1080×1920 · H.264 · yuv420p · 30 fps · AAC · 72,34 s · −15,01 LUFS · TP −1,70 dBTP · sem preto/silêncio.
Mixagem × voz isolada (Parakeet): 196/196 palavras, nenhum efeito sobre sílaba. Movimento médio 1,79 (série: 1,45–2,17); maior trecho parado 2,0 s (fecho com logo, após a fala).
`editorial_check.py`: 0 erros, 0 avisos.

## Decisões e observações
- Logo oficial **só no fecho** (assinatura discreta, como pede o preset do roteiro); verde via `BRAND`/`brandAlpha`.
- Pessoas, imóveis, mensagens e o registro de visita são fictícios; o registro leva o rótulo EXEMPLO ILUSTRATIVO. Contatos do CTA são iniciais genéricas.
- Texto de tela = 3–8 palavras por momento (ÂNIMO ≠ PREPARO, ATENDER BEM, 3 VERIFICAÇÕES, CONFIANÇA, DIFÍCIL, SIM. IMPROVISADO, NÃO., COMPARTILHE COM UM CORRETOR). "DIFÍCIL, SIM. IMPROVISADO, NÃO." é síntese visual das frases 16–17, não fala nova.
- Duração 72 s (roteiro estimava ~81 s a 145 palavras/min; voz real mais rápida). Não esticado.

## Regerar
```
cd PRODUCAO && python3 tools/build_audio.py EP-ATIVO03 && bash tools/render_episode.sh EP-ATIVO03
```
