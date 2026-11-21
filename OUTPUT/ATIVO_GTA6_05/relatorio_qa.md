# QA — ATIVO_GTA6_05 · "O comprador impossível de Vice City" (edição especial GTA VI · roteiro 05 · 21/11/2026)

**Fonte:** `ROTEIROS/GTA6/GTA6_05.md`. O gancho, os takes 01–03 e a recompensa foram narrados palavra por palavra.
**Esteira:** ESTILO 5 · PAINEL (kit NOV26). O ciclo 1→5 está completo; o próximo é o 1 · Palitinho.
**Agenda:** 24/11/2026 às 22:00 (Brasília), ajustado no Supabase depois da Action.

## Apuração
- FICÇÃO/ESQUETE. O comprador e a conversa são HIPOTÉTICOS.
- Os balões são autorais, sem marca de app. O mapa é genérico e ILUSTRATIVO.
- "Casa que nem apareceu no mapa" é piada, não é informação sobre o jogo.

## CTA
- CTA natural: "Marca o colega que atende um comprador assim até fora do GTA."
- Virou a transição "Fora do jogo, todo pedido merece ficar anotado." e depois a CTA SISTEMA.
- A frase original foi para a legenda do Instagram.
- A transição **aguarda aprovação**.

## Voz
- Puck, 1,0×. **Usei a tomada B.**
  - **B (usada):** 49,5 s, 175 palavras/min, ASR 0,997 (144/144).
  - **A:** disse "anotada" no lugar de "anotado".

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC · 51,83 s · −14,9 LUFS.
- `editorial_check` 0/0. SFX: 22 eventos. `legenda_check` ✓.
- **Movimento:** saiu 1,15 no 1º render. Acrescentei flutuação nos balões, no mapa e no cartão, e o drift subiu para 9. No render final ficou em **1,33**, com o maior trecho parado de 1,4 s.
- Fonte de 22 px corrigida para 24 px.

## Cenas
1. **O COMPRADOR MAIS DIFÍCIL:** pessoa com "?" e medidor de dificuldade indo até 100% em vermelho; tag "VICE CITY · COMPRADOR HIPOTÉTICO".
2. **ELE COMEÇA:**
   - balão com o pedido e os chips COBERTURA FRENTE MAR / GARAGEM: 6 CARROS / PISCINA ENORME;
   - "Beleza!";
   - 2ª MENSAGEM: "…mas só se for numa rua tranquila" (fica vermelha).
3. **E PIORA:**
   - 5 MINUTOS DEPOIS: centro, perto de tudo… porém sem movimento → ✕ PEDIDOS QUE SE CONTRADIZEM;
   - silêncio de reticências → "Aceita permuta por carro que eu peguei hoje?" → “PEGUEI HOJE”?!
4. **O PROBLEMA É ENTENDER:**
   - mapa ilustrativo com 6 pinos, todos descartados;
   - ✕ ENCONTRAR IMÓVEL / ✓ ENTENDER O PEDIDO / MUNDO ABERTO;
   - pino "?" fora do mapa: "APROVADA: NEM APARECEU NO MAPA".
5. **FORA DO JOGO: ANOTE:** cartão PEDIDO DO CLIENTE com 4 linhas e ✓ ANOTADO.
6. **CTA SISTEMA.**

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-GTA6-05 --source episodes/ATIVO-GTA6-05/narration_source.wav && python3 tools/build_audio.py ATIVO-GTA6-05 && bash tools/render_episode.sh ATIVO-GTA6-05
```
