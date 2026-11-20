# QA — ATIVO_NOV26_21 · "85% usados: onde está a oportunidade?" (lote 30 Reels nov/2026 · 20/11/2026)

**Fonte:** `ROTEIROS/LOTE_NOV2026/ATIVO_NOV26_21.md`. GANCHO + TAKES narrados palavra por palavra. Reel orgânico, verde do lote #02FB3F, logo no fecho. Voz com a direção nova e pausas naturais (`shapePauses`).

## Apuração (20/11/2026)
- Matéria do Secovi-SP: **Heitor Kuser** (CEO da CIMI 360) disse no **Conexão Imobiliária Secovi-SP** (novembro/2026) que imóveis usados são **85% do mercado** brasileiro (15% novos).
- A data do evento diverge: Secovi informa 10/11 e Portas 11/11. Por isso a tela mostra só **NOV/2026**.
- A página do roteiro (secovi.com.br) está bloqueada pela rede desta sessão. Conteúdo confirmado por busca: [matéria Secovi](https://secovi.com.br/imoveis-usados-sao-85-do-mercado-e-aluguel-e-ativos-de-bancos-pedem-mais-atencao-do-corretor-diz-heitor-kuser/), [anúncio do evento](https://secovi.com.br/secovi-sp-realiza-conexao-imobiliaria-2026-no-dia-10-de-novembro/), [Portas](https://portas.com.br/noticias/eventos-agendas/conexao-imobiliaria-secovi-sp/).
- Na tela, o 85% é sempre atribuído: "SEGUNDO UM EXECUTIVO DO SETOR"; "SEGUNDO HEITOR KUSER (CIMI 360) · CONEXÃO IMOBILIÁRIA SECOVI-SP · NOV/2026"; "ESTIMATIVA DO PALESTRANTE"; "✕ CENSO"; cidades A/B/C com "?".
- Lançamentos não são desvalorizados ("✕ ABANDONAR"). Anúncios e ficha são ILUSTRATIVOS, sem dados reais.

## CTA
- Roteiro: "Se você trabalha com imóveis usados, qual informação mais falta nas captações?"
- Virou a transição **"Carteira confiável começa na captação."** (a partir do texto de tela CARTEIRA CONFIÁVEL) + CTA SISTEMA. **Pendente de aprovação.**

## Voz
- Tomadas A (conta 1) e **B (conta 2), B usada sem edição.**
- 54,24 s, 162 palavras/min, ASR 0,941 (136/146). 1,0× sem time-stretch.
- **Pontos para ouvir (nas duas tomadas):**
  - "Secovi": o "i" final sai fraco; os ASR ouvem "Secov/Cecov".
  - "melhorar avaliação": soa como "melhorar a avaliação" pela ligação do "r".
  - "censo": correto; o ASR escreve "senso", que é homófono.

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC · 56,58 s · −14,92 LUFS · TP −1,68 dBTP.
- `editorial_check` 0 erros / 0 avisos. Movimento 1,49 · maior trecho parado 1,1 s. SFX: 31 eventos, stem −39,4 LUFS.
- Quadros revisados (15 + 6). Corrigidos:
  - ~1 s de quadro vazio no início do Take 03: a ficha entra antes;
  - checklist do Take 02 e cartão de citação encostando na borda;
  - "+ VOLUME" com risco invisível, trocado por "✕ SÓ MAIS VOLUME".
- **Legenda Instagram:** `OUTPUT/ATIVO_NOV26_21/legenda_instagram.txt`, `legenda_check` ✓ (126 palavras). Pasta: `PUBLICACAO/NOV26/REELS_21_AO_30/21/`.

## Cenas
1. **Gancho — 85% USADOS?:** contador até 85% e barra USADOS/NOVOS; "SEGUNDO UM EXECUTIVO DO SETOR"; LANÇAMENTOS · ✕ ABANDONAR.
2. **Take 01 — ESTIMATIVA SETORIAL:** citação atribuída com fonte e evento; ESTIMATIVA DO PALESTRANTE · ✕ CENSO; cidades A/B/C com "?".
3. **Take 02 — CAPTAR NÃO É SÓ CADASTRAR:** pilha caótica de anúncios (DOC ?? / R$ ??) crescendo; ORIGEM / DOCUMENTAÇÃO / SITUAÇÃO / POSICIONAMENTO; ⚠ ESTOQUE GRANDE SEM QUALIDADE.
4. **Take 03 — CARTEIRA CONFIÁVEL:** FICHA DO IMÓVEL (documentação conferida / preço avaliado / visita / responsável / atualizado em); ✕ SÓ MAIS VOLUME; COMPRADOR e PROPRIETÁRIO; "Carteira confiável começa na captação".
5. **CTA SISTEMA** (Carteira organizada de verdade) + logo.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-NOV26-21 --source episodes/ATIVO-NOV26-21/narration_source.wav && python3 tools/build_audio.py ATIVO-NOV26-21 && bash tools/render_episode.sh ATIVO-NOV26-21
```
