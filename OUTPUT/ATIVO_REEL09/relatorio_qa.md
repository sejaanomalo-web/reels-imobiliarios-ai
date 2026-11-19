# QA — ATIVO Reel 09 · "Se eu começasse na corretagem hoje" (17/11/2026)

**Fonte:** `ROTEIROS/ATIVO_REEL09.md` (ATIVO_Reel_09_COMECO_CORRETAGEM_FUNIL.md), narrado palavra por palavra. ID `EP-ATIVO-REEL09`. Reel **orgânico**: voz 1,0×, legenda padrão, logo só no fecho e na capa, verde exato `#3AF584`.

## CTA (regra de 14/11/2026)
- No roteiro: "Quer conhecer uma forma de organizar imóveis e atendimentos do seu jeito? Comente SISTEMA e veja as possibilidades da ATIVO."
- Já era SISTEMA; troquei pela **redação padrão** (… te envio os detalhes pelo Direct). **Sem transição extra**: "É o encaixe entre conteúdo, atendimento e acompanhamento" já leva ao sistema.
- Confirme se aceita perder "do seu jeito" / "possibilidades da ATIVO".

## Diagnóstico — `episode.json` → `diagnostico`
- C3 (plano prático). Crença questionada: "aparecer para todo mundo" / "o anúncio sozinho resolve".
- **Sem atendimento automático nem IA que responde ou vende** (nota editorial do roteiro). Mapa, imóvel, vídeo, pedido e quadro: todos ILUSTRATIVOS; preço mascarado.
- A direção pedia "curta captura real da ATIVO se disponível": **não existe captura real autorizada no repositório** — não usei tela do sistema.

## Voz
- Preset oficial (Gemini `gemini-3.8-flash-tts`, Puck), 1,0×, **conta 2**. Tomadas A 57,7 s · B 64,1 s.
- **Tomada B, sem edição:** 149 palavras/min. Limpa nos dois reconhecedores.
- **Tomada A descartada:** "faria a chamada **a** combinar" e início da CTA embolado ("que a conheceu").
- **Formas da voz:** "Comenta SISTEMA".

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC · 66,5 s · −15,0 LUFS · TP ≤ −1,6 dBTP.
- `editorial_check` 0 erros / 0 avisos.
- Mixagem × roteiro: 0,981 (só "às"→"as" e "Comenta").
- Movimento **1,41** (1ª medição 1,13 → câmera com chaves intermediárias + elementos flutuando + varredura no quadro) · maior trecho parado 0,7 s.
- ~45 quadros revistos. Corrigidos: mapa sob o título no zoom (faixa escura), ~3 s vazios antes dos caminhos e das dúvidas (lacunas tracejadas), quadro e cartão cortados na borda pelo zoom.

## Cenas
1. **Gancho — SE EU COMEÇASSE DO ZERO HOJE:** mapa de bairros; ondas tentam cobrir tudo → ✕ A CIDADE INTEIRA; zoom num quarteirão com pino: UM PROBLEMA ESPECÍFICO.
2. **UM PÚBLICO. UM CONTEXTO.:** UM TIPO DE COMPRADOR ↔ UM IMÓVEL (COMBINA); SÓ FOTOS BONITAS sai; celular gravando + ESPAÇO, LOCALIZAÇÃO, CIRCULAÇÃO, CONDIÇÕES CONFIRMADAS.
3. **O CLIQUE NÃO É O FIM:** vídeo com CHAMADA COMBINADA; QUER COMPARAR → CONVERSAR; QUER CONHECER → AGENDAR; PEDIDO DO INTERESSADO REGISTRADO → AGUARDANDO RETORNO.
4. **A PARTE MAIS IMPORTANTE → 3 PARTES CONECTADAS:** quadro RECEBEU INFO / VAI RESPONDER / RETOMAR EM (DIA COMBINADO); SÓ O ANÚNCIO não sustenta; CONTEÚDO → ATENDIMENTO → ACOMPANHAMENTO.
5. **CTA SISTEMA** + logo.

## Pendências
- Aprovar a troca da CTA.
- Duração 66,5 s (fala 64,1 s), dentro dos 55–65 s de fala.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py EP-ATIVO-REEL09 --source episodes/EP-ATIVO-REEL09/narration_source.wav && python3 tools/build_audio.py EP-ATIVO-REEL09 && bash tools/render_episode.sh EP-ATIVO-REEL09
```
