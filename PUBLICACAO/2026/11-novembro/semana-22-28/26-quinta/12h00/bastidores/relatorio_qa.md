# QA — ATIVO_NOV26_15 · "FGTS e imóveis usados" (lote 30 Reels nov/2026 · 19/11/2026)

**Fonte:** `ROTEIROS/LOTE_NOV2026/ATIVO_NOV26_15.md`. Narração do GANCHO + TAKES palavra por palavra. Reel orgânico, verde do lote #02FB3F, logo no fecho. Voz com a direção nova e pausas naturais (`shapePauses`).

## Apuração (19/11/2026)
- Premissa "atualização do orçamento habitacional": reportagem do [Atlas Público](https://atlaspublico.com.br/noticias/ministerio-das-cidades-fixa-em-rs-1-6-bilhao-o-limite-do-101652) — Instrução Normativa MCID nº 29 (DOU extra de 12/11/2026) altera o orçamento operacional do FGTS para habitação em 2026 e fixa limite para financiamento de usados.
- **Valor não usado:** o limite (R$ 1,6 bi na reportagem) não foi conferido no texto oficial e há números conflitantes em outra fonte ([ImobiBrasil](https://www.imobibrasil.com.br/blog/minha-casa-minha-vida-imovel-usado-regras/)). O roteiro já evitava número e "novidade" (nota de apuração) — mantido. Fonte do roteiro: [Caixa — habitação](https://www.caixa.gov.br/voce/habitacao/Paginas/default.aspx).
- Na tela: "ATUALIZAÇÃO DO ORÇAMENTO HABITACIONAL · NOV/2026" (genérico); TER SALDO NÃO É APROVAÇÃO; CONSULTE O AGENTE FINANCEIRO; "✕ PROMESSA" sobre "Agora todo usado pode entrar!". Sem valores, limites, taxas ou prazos. Imóvel, carteira e tablet ILUSTRATIVOS.

## CTA
- No roteiro: "Mande para o colega que trabalha com revenda de imóveis."
- Virou a transição **"Na revenda, verifique antes de anunciar."** (texto de tela VERIFIQUE ANTES DE ANUNCIAR) + CTA SISTEMA. **Pendente de aprovação.**

## Voz
- 2 gerações (conta 2: A, com "contrador" no lugar de "comprador"; conta 1: **B, usada sem edição**). Sem vazamento da direção.
- Pausas: 15 moldadas (maior 0,56 s); 52,9 s → 51,2 s, 163 palavras/min, 1,0× sem time-stretch.
- Isolado: "verifique antes de anunciar" correto nas duas transcrições (no arquivo inteiro o Parakeet emenda "te anunciar"). Ponto para ouvir: "Comenta SISTEMA".

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC · 53,55 s · −14,97 LUFS · TP −1,68 dBTP.
- `editorial_check` 0 erros / 0 avisos.
- **Movimento 1,31** (1ª medição 1,13) · maior trecho parado 0,8 s. Ajustes: drift 3,4, carteira entra antes no gancho, flutuação maior de casa/carteira/porta/tablet, pastas em leque antes de se separarem. Abaixo da média do lote: cenas de leitura (pastas, selos, checklist).
- SFX: 29 eventos, stem −40,2 LUFS; transcrição da mixagem 0,972 × narração 0,961.
- 16 quadros revisados. Corrigido: frase final encostando no carimbo CONSULTE O AGENTE FINANCEIRO.
- **Legenda Instagram:** `PUBLICACAO/2026/11-novembro/semana-22-28/26-quinta/12h00/ATIVO_NOV26_15_legenda.txt` — `legenda_check` ✓ (141 palavras). Pasta: `PUBLICACAO/2026/11-novembro/semana-22-28/26-quinta/12h00/`.

## Cenas
1. **Gancho — FGTS + USADOS?:** imóvel usado ilustrativo · carteira SALDO FGTS · "?" entre eles · QUAL OPERAÇÃO?
2. **Take 01 — 3 PERGUNTAS DIFERENTES:** atualização do orçamento habitacional · nov/2026; pilha de pastas se separa em ORÇAMENTO (limite de recursos), REGRAS (do programa), COMPRADOR (condições).
3. **Take 02 — TER SALDO NÃO É APROVAÇÃO:** a carteira empurra a porta trancada, que não abre; selos requisitos de uso, limite de valor, modalidade, situação do imóvel; TUDO PRECISA SER CONFERIDO.
4. **Take 03 — VERIFIQUE ANTES DE ANUNCIAR:** "Agora todo usado pode entrar!" riscado (✕ PROMESSA) → tablet com roteiro de verificação (banco, regras atualizadas, enquadramento, documentação) → CONSULTE O AGENTE FINANCEIRO; "Na revenda, verifique antes".
5. **CTA SISTEMA** (Verificação de cada negócio) + logo.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-NOV26-15 --source episodes/ATIVO-NOV26-15/narration_source.wav && python3 tools/build_audio.py ATIVO-NOV26-15 && bash tools/render_episode.sh ATIVO-NOV26-15
```
