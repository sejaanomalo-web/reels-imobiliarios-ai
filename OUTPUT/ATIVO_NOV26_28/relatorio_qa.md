# QA — ATIVO_NOV26_28 · "Concorrente ou parceiro?" (lote 30 Reels nov/2026 · 20/11/2026)

**Fonte:** `ROTEIROS/LOTE_NOV2026/ATIVO_NOV26_28.md`. GANCHO + TAKES narrados palavra por palavra. Reel orgânico, verde do lote #02FB3F, logo no fecho. Voz com a direção nova e pausas naturais (`shapePauses`).

## Apuração (20/11/2026)
- No Conexão Imobiliária Secovi-SP (nov/2026), executivos debateram cooperação entre imobiliárias ([Secovi](https://secovi.com.br/cooperar-entre-imobiliarias-suaviza-o-diagnostico-das-vendas-avaliam-executivos-do-setor/); página bloqueada nesta sessão, conteúdo confirmado por busca).
- A história dos corretores A e B está marcada como **EXEMPLO HIPOTÉTICO**. O acordo de parceria é ILUSTRATIVO. A rede de corretores é ILUSTRATIVA, "com permissão".
- **Consentimento explícito na tela:** "Autorização do proprietário e do cliente", "Proteção dos dados · consentimento do cliente".
- "✕ CARTEIRA ABERTA PARA QUALQUER PESSOA".
- O vídeo não promete nenhuma função de compartilhamento da ATIVO.

## CTA
- Roteiro: "Você já fechou negócio em parceria com outro corretor? Conte sua experiência."
- Virou a transição **"Cooperação com critério."** (texto de tela do Take 03) + CTA SISTEMA. **Pendente de aprovação.**

## Voz
- Tomadas A (conta 1) e B (conta 2). Na transcrição corrida, o ASR ouviu "discutirão" nas duas; nos recortes por frase as duas dizem "discutiram". A B saiu com "atendores" e "Coopera com critério". **A usada sem edição.**
- 53,31 s, 144 palavras/min, ASR 0,977 (125/128). 1,0× sem time-stretch.
- **Pontos para ouvir:**
  - "discutiram" (passado), por causa da dúvida do ASR;
  - "Comenta SISTEMA";
  - "Conexão Imobiliária".

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC · 55,64 s · −14,97 LUFS · TP −1,75 dBTP.
- `editorial_check` 0 erros / 0 avisos. Movimento 1,44 · maior trecho parado 0,9 s. SFX: 27 eventos, stem −39,7 LUFS.
- Quadros revisados (14 + ajustes). Corrigidos: selo "EXEMPLO HIPOTÉTICO" encostando no muro e "✕ CARTEIRA ABERTA" sobre a rede e perto do título; os dois desceram.
- **Legenda Instagram:** `OUTPUT/ATIVO_NOV26_28/legenda_instagram.txt`, `legenda_check` ✓. Pasta: `PUBLICACAO/NOV26/REELS_21_AO_30/28/`.

## Cenas
1. **Gancho — PARCERIA OU DISPUTA?:** corretor A (o imóvel certo) e corretor B (o cliente certo); VS → ⇄; COMPETIR OU CONVERSAR?
2. **Take 01 — UM TEM O IMÓVEL / OUTRO TEM O CLIENTE:** muro entre os dois; boa captação × cliente que quer a região; 🔒 informações isoladas; ✕ negócio não acontece.
3. **Take 02 — PARCERIA PRECISA DE REGRAS:** o muro se abre (cooperação); acordo de parceria com autorização / combinado claro / remuneração / proteção dos dados.
4. **Take 03 — COOPERAÇÃO COM CRITÉRIO:** rede de corretores ligada por permissões (🔑); ✕ carteira aberta para qualquer pessoa; ✓ organização · ✓ confiança.
5. **CTA SISTEMA** (Carteira organizada, parceria segura) + logo.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-NOV26-28 --source episodes/ATIVO-NOV26-28/narration_source.wav && python3 tools/build_audio.py ATIVO-NOV26-28 && bash tools/render_episode.sh ATIVO-NOV26-28
```
