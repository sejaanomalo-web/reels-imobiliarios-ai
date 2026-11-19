# QA — ATIVO_NOV26_04 · "Juros altos, crédito bilionário" (lote 30 Reels nov/2026 · 19/11/2026)

**Fonte:** `ROTEIROS/LOTE_NOV2026/ATIVO_NOV26_04.md`. Narração palavra por palavra. Reel orgânico, voz 1,0×, verde do lote #02FB3F, logo no fecho.

## Apuração (19/11/2026)
- **Fato:** balanço da Caixa do 3º tri/2026 (divulgado em 12/11/2026): R$ 72,5 bi em contratações imobiliárias, somando recursos próprios e do FGTS (≈ R$ 45,8 bi FGTS + R$ 26,7 bi próprios), +7,6% sobre o 3º tri/2025; carteira de R$ 1,043 tri. Conferido em [DGABC/Estadão](https://www.dgabc.com.br/Noticia/4368531/caixa-carteira-imobiliaria-sobe-15-5-em-1-ano-para-r-r-1-043-trilhao-no-no-3-trimestre) e [Portas](https://portas.com.br/noticias/caixa-amplia-credito-imobiliario-terceiro-trimestre/) (a URL do UOL indicada no roteiro está bloqueada nesta sessão; é a mesma matéria do Estadão).
- **Nota do roteiro na tela:** "CRÉDITO CONTRATADO ≠ Nº DE VENDAS". Nenhuma taxa de juros é mostrada ("taxas elevadas" sem número). O número entra mascarado (R$ ••,• BI) e só aparece completo na palavra "cinco" — sem contador com valores intermediários.

## CTA
- No roteiro: "Antes de repetir que o mercado travou, olhe o recorte da notícia." Não pede salvar/compartilhar: **mantida literal** como frase final antes da CTA SISTEMA. Confirme se aprova.

## Voz
- Preset oficial, 1,0×, **conta 2**, **3 gerações**.
- **Tomada A descartada:** leu a instrução de estilo ("conversa entre colegas corretores…") antes do texto (3ª ocorrência no histórico).
- **Tomada B descartada:** "como **uma** Caixa contratou" em todas as janelas do Parakeet. Tentei emendar a abertura da A na B: diferença de tom de 1,6 semitom (limite 1) → emenda recusada.
- **Usada: tomada C, sem edição.** "como a Caixa" confirmado. 55,9 s de fala, 163 palavras/min.
- Formas da voz: "olha o recorte" (por "olhe"), "Comenta SISTEMA", "tá caro" ouvido pelo Whisper em janela curta (Parakeet ouve "está").

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC · 58,28 s · −15,00 LUFS · TP −1,66 dBTP.
- `editorial_check` 0 erros / 0 avisos (perfil NOV26).
- **Movimento 1,46** (1ª medição 1,39 com 1,2 s parado no interruptor) · maior trecho parado 0,8 s.
- Mixagem × roteiro: 0,89 — números falados por extenso viram dígitos no Whisper ("2026", "72,5"); "elevadas" e "quais" conferidos em janela própria (artefato de borda).
- 23 + 4 quadros revisados. Corrigidos: contador mostrando valores intermediários (ex.: "R$ 23,5 BI"), interruptor entrando 1,6 s depois do título, título do Take 03 quebrando sobre o número agregado, metade de baixo vazia no Take 01 (lacunas).
- **Legenda Instagram:** `OUTPUT/ATIVO_NOV26_04/legenda_instagram.txt` — `legenda_check` ✓ (157 palavras).

## Cenas
1. **Gancho:** CRÉDITO EM MOVIMENTO (quadro 0); CRÉDITO CARO (%↑) × R$ BI CONTRATADOS; "?"; NUM ÚNICO TRIMESTRE.
2. **Take 01 — O NÚMERO DO TRIMESTRE:** 3º TRI 2026; R$ ••,• BI → R$ 72,5 BI; CAIXA + FGTS; VOLUME GRANDE · MESMO COM TAXAS ELEVADAS; CRÉDITO CONTRATADO ≠ Nº DE VENDAS.
3. **Take 02 — MERCADO NÃO É INTERRUPTOR:** interruptor LIGA/DESLIGA com as duas frases riscadas → painéis FAIXAS DE RENDA / MODALIDADES / NECESSIDADES / CONDIÇÕES.
4. **Take 03 — SEGMENTAÇÃO MUDA O ATENDIMENTO:** R$ 72,5 BI AGREGADO → funil → 3 perfis ilustrativos (sem dados pessoais) ligados a MODALIDADE / CONDIÇÕES / PRODUTO; recorte da notícia "O mercado travou" com lupa QUAL RECORTE?
5. **CTA SISTEMA** (Atendimento segmentado) + logo.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-NOV26-04 --source episodes/ATIVO-NOV26-04/narration_source.wav && python3 tools/build_audio.py ATIVO-NOV26-04 && bash tools/render_episode.sh ATIVO-NOV26-04
```
