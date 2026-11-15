# QA — ATIVO Episódio 05 · "Parceria imobiliária não começa com uma promessa de comissão" (15/11/2026)

**Fonte:** `ROTEIROS/ATIVO_EP05.md` (ATIVO_Roteiro_05.docx), narrado palavra por palavra, exceto o fecho.
**CTA:** comentário **SISTEMA → Direct** (regra do cliente para Reels, 14/11/2026). Saiu "Envie este vídeo para um corretor com quem você gostaria de trabalhar."; entrou a transição *"Essa clareza fica mais fácil quando o status de cada imóvel e de cada atendimento está registrado."* (redação proposta; cliente não pediu alteração até a gravação) + texto-base SISTEMA. Tela: COMENTE "SISTEMA" + "Receba os detalhes no Direct." + logo oficial.

## Diagnóstico editorial — `PRODUCAO/episodes/EP-ATIVO05/episode.json` → `diagnostico`
C3 apresentação de solução · crença questionada: "parceria se resolve combinando a comissão e confiando no colega" · promessa: processo antes da comissão, autorização, papéis por escrito, fonte única atualizada · evidências: documento abstrato não jurídico (sem cláusulas), interface ilustrativa sem funcionalidades reais do produto.

## Voz
Preset oficial (Gemini, Puck, direção original), **1,0×**, sem edição. 3 tomadas, nenhuma leu a direção:
- **A usada** (80,4 s, 157 palavras/min): fiel ao texto ("Se surgir", "combinado", "Alinhe" confirmados com Whisper); "Comenta sistema" (imperativo coloquial já aceito).
- B (72,3 s): "Se **surgiu** uma mudança" confirmado pelos dois reconhecedores — erro de gramática audível; descartada apesar de mais curta.
- C: "Alinha", "te envia" — descartada.

## Validação técnica (11/11 OK) e editorial
1080×1920 · H.264 · yuv420p · 30 fps · AAC · 82,75 s · −15,0 LUFS · TP −1,46 dBTP · sem preto/silêncio. `editorial_check.py` (roda dentro do render): 0 erros, 0 avisos — CTA SISTEMA e verde exato #3AF584.
Mixagem × voz: inteligível (a única diferença é emenda de bloco do reconhecedor em "pessoa", não efeito sonoro).
Movimento médio 1,40 (1ª versão 1,26 → acrescentados pulsos na linha da parceria, avatares respirando, câmera de abertura mais ativa, chips/documento flutuando); maior trecho parado 0,8 s.

## Observações
- **Duração 82,7 s** — o mais longo da série (210 palavras). Retenção é o risco principal deste episódio.
- Movimento 1,40 é o mais baixo da série depois do ajuste (faixa 1,45–2,17); maior trecho parado só 0,8 s.
- Correção de ferramenta: `build_narration.py` passou a alinhar palavras com hífen ("bem-intencionada").

## Regerar
```
cd PRODUCAO && python3 tools/build_audio.py EP-ATIVO05 && bash tools/render_episode.sh EP-ATIVO05
```
