# QA — ATIVO_NOV26_27 · "IA substitui corretor?" (lote 30 Reels nov/2026 · 20/11/2026)

**Fonte:** `ROTEIROS/LOTE_NOV2026/ATIVO_NOV26_27.md`. GANCHO + TAKES narrados palavra por palavra. Reel orgânico, verde do lote #02FB3F, logo no fecho. Voz com a direção nova e pausas naturais (`shapePauses`).

## Apuração (20/11/2026)
- O Conexão Imobiliária Secovi-SP (nov/2026) teve painel no Palco Arena sobre IA, dados e novas fontes de receita para corretores e imobiliárias, tratando a tecnologia como apoio ([Secovi, Palco Arena](https://secovi.com.br/palco-arena-debate-ia-dados-e-novas-fontes-de-receita-para-corretores-e-imobiliarias/)).
- "Centenas de imóveis em segundos" é uma descrição genérica de busca automatizada, sem número.
- **Nenhuma capacidade de IA é atribuída à ATIVO.** Busca, resultados e chat são ILUSTRATIVOS, sem marca de IA real. O vídeo mostra "⚠ RESPOSTA AUTOMÁTICA PODE ERRAR" e verificação feita pelo corretor.

## CTA
- Roteiro: "O que você delegaria para uma ferramenta, e o que nunca delegaria?"
- Virou a transição **"Tecnologia apoia, profissional orienta."** (texto de tela do Take 03) + CTA SISTEMA. **Pendente de aprovação.**

## Voz
- Tomadas A (conta 1) e **B (conta 2), B usada sem edição.** A A disse "como um apoio".
- As duas tomadas têm 61–63 s brutos. A B, com as pausas ajustadas (máx. 0,6 s), fica em 60,38 s, 139 palavras/min: o ritmo mais calmo do lote, dentro do alvo de 50–70 s e sem aceleração.
- ASR 0,982 (137/140).
- **Pontos para ouvir:**
  - o ritmo geral, a conferir se não ficou arrastado;
  - "Comenta SISTEMA".

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC · 62,72 s · −14,91 LUFS · TP −1,66 dBTP.
- `editorial_check` 0 erros / 0 avisos. Movimento 1,40 · maior trecho parado 1,1 s. SFX: 31 eventos, stem −39,4 LUFS.
- Quadros revisados (13 + ajustes). Corrigido: cartões encostando nas bordas no Take 01 e no Take 03 (cartões mais estreitos, câmera contida).
- **Legenda Instagram:** `PUBLICACAO/2026/11-novembro/semana-22-28/28-sabado/12h00/ATIVO_NOV26_27_legenda.txt`, `legenda_check` ✓. Pasta: `PUBLICACAO/2026/11-novembro/semana-22-28/28-sabado/12h00/`.

## Cenas
1. **Gancho — IA VAI SUBSTITUIR?:** barra de busca digitando, grade de resultados; CENTENAS DE RESULTADOS · EM SEGUNDOS; "E O CORRETOR?".
2. **Take 01 — BUSCAR ≠ ORIENTAR:** cartão BUSCAR (preço / localização / metragem / preferências ✓) × cartão ORIENTAR (dúvidas do cliente sobre rotina, documentação e riscos); FILTRO NÃO RESPONDE ISSO.
3. **Take 02 — AUTOMAÇÃO NÃO DISPENSA VERIFICAÇÃO:** debates do setor · Secovi-SP · nov/2026; ✨ POSSÍVEL OPÇÃO; ⚠ resposta automática pode errar; matrícula / dados do anúncio / estado do imóvel ✓ VERIFICADO.
4. **Take 03 — TECNOLOGIA APOIA / PROFISSIONAL ORIENTA:** FERRAMENTA (dados se organizando · ganha tempo) × PROFISSIONAL (julgamento / responsabilidade / relacionamento).
5. **CTA SISTEMA** (Rotina organizada para orientar melhor) + logo.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-NOV26-27 --source episodes/ATIVO-NOV26-27/narration_source.wav && python3 tools/build_audio.py ATIVO-NOV26-27 && bash tools/render_episode.sh ATIVO-NOV26-27
```
