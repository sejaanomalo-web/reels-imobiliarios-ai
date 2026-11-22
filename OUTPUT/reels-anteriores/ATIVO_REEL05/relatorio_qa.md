# QA — ATIVO Reel 05 · "Três atitudes que parecem fazer perder a venda" (17/11/2026)

**Fonte:** `ROTEIROS/ATIVO_REEL05.md` (ATIVO_Reel_05_TRES_ATITUDES_CONSULTIVAS.md), narrado palavra por palavra. ID `EP-ATIVO-REEL05`. Reel **orgânico**: voz 1,0×, legenda padrão, logo só no fecho e na capa, verde exato `#3AF584`.

## CTA (regra de 14/11/2026)
- No roteiro: "Qual dessas três atitudes você mais valoriza em um atendimento? Deixa nos comentários."
- Substituída pela transição **"E para respeitar o momento de cada pessoa, ajuda saber em que ponto cada conversa parou."** + CTA SISTEMA → Direct.
- **A transição é minha. Precisa da aprovação do cliente.**
- A pergunta original funciona como legenda do post, para puxar comentários.

## Diagnóstico — `PRODUCAO/episodes/EP-ATIVO-REEL05/episode.json` → `diagnostico`
- C2 (lista contraintuitiva). Crença questionada: "admitir limite, perguntar antes e não pressionar fazem perder a venda".
- Situações ilustrativas, com rótulos IMÓVEL ILUSTRATIVO e EXEMPLO ILUSTRATIVO.
- **Sem números, táticas manipulativas ou carimbo VENDIDO**, como pede o roteiro.
- O selo de incompatibilidade é informativo ("i · Não encaixa neste caso"), sem tom de reprovação.

## Voz
- Preset oficial (Gemini `gemini-3.8-flash-tts`, Puck), 1,0×, **conta 1**. **2 gerações** (A 53,6 s · B 56,6 s).
- **Tomada B, sem edição:** 161 palavras/min, 151/152 palavras alinhadas.
- **Tomada A descartada:** "o imóvel" no lugar de "um imóvel" e "limite **e** evita".
- **Formas da voz:**
  - "ajuda **a** saber": as duas tomadas falam assim; o sentido não muda.
  - "Comenta SISTEMA": coloquial já aceito.
  - O "te envio" foi confirmado pelos dois reconhecedores.

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC · 58,94 s · −15,01 LUFS · TP −1,64 dBTP.
- `editorial_check` 0 erros / 0 avisos.
- Mixagem × roteiro: **0,977**. As diferenças caem nas bordas da janela de 20 s (20 s e 30 s) e saem certas com a janela deslocada.
- Movimento **1,79** (1ª medição: 1,32 com 1,6 s parado) · maior trecho parado 0,8 s.
- 44 quadros revistos. Corrigidos:
  - selos em verde sobre os degraus amarelos, ilegíveis (agora ficam abaixo da casa);
  - quartos entrando ~2 s depois;
  - metade de baixo vazia por ~4 s na cena 3 (agora entra a comparação de opções);
  - cartas cortadas na borda no quadro 0;
  - trechos parados (câmera agora presa às falas, cartas e pontos de progresso animados).

## Cenas
1. **Gancho:** 3 ATITUDES que parecem perder a venda: três cartas numeradas já no quadro 0 → PARECE ATRAPALHAR → no "confiança" viram verdes ✓, e o subtítulo vira "que constroem confiança".
2. **1 · Dizer quando não serve:** PRECISA EVITAR ESCADAS × casa com MUITOS DEGRAUS; "Ótimo para se exercitar!" riscado; "Não encaixa neste caso" + "Visita frustrada evitada".
3. **2 · Entender o motivo:** o catálogo congela e entra "Pergunta antes"; "TRÊS QUARTOS" → FILHOS / HOME OFFICE / RECEBER FAMÍLIA; MOTIVAÇÃO → SELEÇÃO.
4. **3 · Respeitar o momento + transição:** PERGUNTA → COMPARA → VISITA (sem VENDIDO), pessoa comparando opções; "Decide hoje?" riscado; PRÓXIMO CONTATO · Informação combinada; O RELACIONAMENTO CONTINUA → SUAS CONVERSAS com PAROU AQUI em cada uma.
5. **CTA SISTEMA** + logo.

## Pendências
- Aprovar a transição.
- Duração 58,9 s, dentro dos 50–60 s do roteiro.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py EP-ATIVO-REEL05 --source episodes/EP-ATIVO-REEL05/narration_source.wav && python3 tools/build_audio.py EP-ATIVO-REEL05 && bash tools/render_episode.sh EP-ATIVO-REEL05
```
