# QA — ATIVO_NOV26_05 · "Aprovado não é contrato assinado" (lote 30 Reels nov/2026 · 19/11/2026)

**Fonte:** `ROTEIROS/LOTE_NOV2026/ATIVO_NOV26_05.md`. Narração palavra por palavra. Reel orgânico, verde do lote #02FB3F, logo no fecho. **Primeiro episódio com a regra de voz de 19/11/2026** (voz calorosa, ritmo contínuo, quase sem pausas).

## Apuração (19/11/2026)
- Conteúdo educativo, sem notícia. Fluxo típico conferido em fontes de mercado: análise de crédito → avaliação do imóvel → análise documental → contrato → registro ([Neon](https://neon.com.br/aprenda/financas-pessoais/comprar-uma-casa-pela-caixa/), [Tenda](https://www.tenda.com/blog/trilha-da-conquista/tudo-sobre-financiamento-habitacional-caixa/)).
- Na tela: EXEMPLO HIPOTÉTICO, CONVERSA ILUSTRATIVA e "ORDEM E NOMES VARIAM POR BANCO" (nota do roteiro). Sem prazo, taxa, fraude ou culpa do comprador.

## CTA
- No roteiro: "Envie este vídeo para alguém que confunde pré-aprovação com venda concluída."
- Virou a transição **"Aprovação inicial não é fechamento: explique o próximo passo."** (textos de tela dos Takes 01 e 03) + CTA SISTEMA. **Pendente de aprovação.**

## Voz — regra do cliente de 19/11/2026
- **Referência analisada** (`02_2.mp4`): 38,1 s, 87% de fala, 4 pausas (0,9 s), ~186 palavras/min. Nosso padrão anterior (NOV26_04): 74% de fala, 29 pausas (10,6 s).
- **Aplicado:** nova direção no preset (calorosa, contagiante, ritmo contínuo) + pausas máximas de 0,09 s (`voice.tightenPauses`). Mesma voz Puck, mesmo modelo, **1,0×, sem time-stretch**.
- **Resultado:** 45,5 s de fala (tomada bruta 51,8 s; 6,3 s de silêncio cortados), **82% de fala, 10 pausas curtas, 178 palavras/min**.
- Gerações: conta 2 → A, B (direção antiga, descartadas após a ordem), C ("retber" no lugar de "receber"), D ("Numa orientação"); conta 1 → **E, usada sem edição de palavras**.
- Formas da voz: "tá tudo certo" (Whisper; Parakeet ouve "está"), "Comenta SISTEMA". **Ponto para ouvir: "Direct" no fim sai puxado ("Diracte").**

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC · 49,17 s · −14,97 LUFS · TP ≤ −1,6 dBTP.
- `editorial_check` 0 erros / 0 avisos (perfil NOV26).
- **Movimento 1,49** (1ª medição 1,16 → chaves de câmera intermediárias em todas as cenas) · maior trecho parado 1,0 s (no logo final).
- Mixagem × roteiro: 0,97.
- 22 + 4 + 12 quadros revisados. Corrigidos: título do Take 01 quebrando sobre o selo, comprador cortado na borda (virou etiqueta PRÓXIMO: CHAVES? → AINDA NÃO).
- **Legenda Instagram:** `OUTPUT/ATIVO_NOV26_05/legenda_instagram.txt` — `legenda_check` ✓.

## Cenas
1. **Gancho — NÃO COMEMORE ANTES DA HORA:** conversa ilustrativa "Meu financiamento foi aprovado!" → "Vendido! Parabéns!" + confete que congela → FALTA QUASE TUDO.
2. **Take 01 — APROVAÇÃO INICIAL NÃO É FECHAMENTO:** EXEMPLO HIPOTÉTICO; CAMINHO ATÉ AS CHAVES (análise inicial OK; avaliação, documentos e condições PENDENTES); PRÓXIMO: CHAVES? → AINDA NÃO.
3. **Take 02 — EXPECTATIVA PRECISA SER REALISTA:** linha do tempo; "Está tudo certo!"; PENDÊNCIA; expectativa alta × confiança caindo.
4. **Take 03 — EXPLIQUE O PRÓXIMO PASSO:** EM ANÁLISE ◀ AQUI / DOCUMENTOS / CONTRATO / REGISTRO (ordem varia por banco); FASE ATUAL / O QUE AINDA FALTA / QUANDO CONFIRMAR; Aprovação inicial ≠ fechamento.
5. **CTA SISTEMA** (Etapa de cada negociação) + logo.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-NOV26-05 --source episodes/ATIVO-NOV26-05/narration_source.wav && python3 tools/build_audio.py ATIVO-NOV26-05 && bash tools/render_episode.sh ATIVO-NOV26-05
```
