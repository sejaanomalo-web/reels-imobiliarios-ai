# QA — ATIVO_NOV26_13 · "Minha Casa Minha Vida além do estereótipo" (lote 30 Reels nov/2026 · 19/11/2026)

**Fonte:** `ROTEIROS/LOTE_NOV2026/ATIVO_NOV26_13.md`. Narração do GANCHO + TAKES palavra por palavra. Reel orgânico, verde do lote #02FB3F, logo no fecho. Voz com a direção nova e pausas naturais (`shapePauses`).

## Apuração (19/11/2026)
- O MCMV reúne faixas de renda e modalidades diferentes, e as regras mudam: portaria do Ministério das Cidades de 30/03/2026, **novas regras em vigor a partir de 22/04/2026**, com faixa 4 consolidada e limites de renda atualizados ([O Povo](https://www.opovo.com.br/noticias/economia/2026/04/21/mcmv-passa-a-operar-com-novas-regras-veja-mudancas.html), [Portas](https://portas.com.br/noticias/minha-casa-minha-vida-2026/); fonte do roteiro: [gov.br — Programa MCMV](https://www.gov.br/cidades/pt-br/acesso-a-informacao/acoes-e-programas/habitacao/programa-minha-casa-minha-vida)).
- Valores de faixa, teto e juros **divergem entre fontes não oficiais** — por isso nenhum número aparece no vídeo (nota do roteiro). Tela: só "EX.: NOVAS REGRAS EM VIGOR EM ABR/2026".
- Perfis, conversas e checklist ILUSTRATIVOS; fonte oficial e banco citados de forma genérica (sem imitar interface).

## CTA
- No roteiro: "Salve e confira as condições atuais antes do próximo atendimento."
- Virou a transição **"Antes do próximo atendimento, consulte a regra atual."** (texto de tela CONSULTE A REGRA ATUAL) + CTA SISTEMA. **Pendente de aprovação.**

## Voz
- 2 gerações (conta 2: **A, usada sem edição**; conta 1: B, com possível "escuta a Minha Casa"). Sem vazamento da direção.
- Pausas: 17 moldadas (maior 0,54 s); 58,3 s → 56,0 s, 160 palavras/min, 1,0× sem time-stretch. Correspondência ASR 99,3%.
- Ponto para ouvir: "Comenta SISTEMA" (forma habitual da voz).

## Validação
- `validate.py` 11/11: 1080×1920 · H.264 · yuv420p · 30 fps · AAC · 58,30 s · −14,94 LUFS · TP −1,69 dBTP.
- `editorial_check` 0 erros / 0 avisos (1ª rodada recusou um tom verde de perfil `#7FD9A0` → trocado por bege neutro).
- **Movimento 1,41** (1ª medição 1,35) · maior trecho parado 0,9 s. Ajustes: etiqueta MINHA CASA MINHA VIDA no gancho, personagem respirando, drift maior, câmera contínua no início (ponto intermediário com ease.inOut parava a câmera).
- SFX: 28 eventos, stem −40,4 LUFS; transcrição da mixagem 0,973 × narração 0,973.
- 18 quadros revisados. Corrigido: metade inferior vazia no Take 02 (quadros "?" que viram fonte oficial e banco).
- **Legenda Instagram:** `PUBLICACAO/2026/11-novembro/semana-22-28/26-quinta/08h00/ATIVO_NOV26_13_legenda.txt` — `legenda_check` ✓ (145 palavras). Pasta: `PUBLICACAO/2026/11-novembro/semana-22-28/26-quinta/08h00/`.

## Cenas
1. **Gancho — MCMV SEM ACHISMO:** um personagem → UM ÚNICO PERFIL? → se divide em quatro perfis ilustrativos; "Perfis diferentes".
2. **Take 01 — MCMV NÃO É UM PERFIL ÚNICO:** perfis A/B/C com FAIXA e MODALIDADE; linha REGRA ANTERIOR → REGRA ATUAL; "EX.: NOVAS REGRAS EM VIGOR EM ABR/2026"; bilhete "de memória: renda · valor" riscado; ⏳ NÃO É ETERNO.
3. **Take 02 — NÃO PROMETA ENQUADRAMENTO:** "Acho que não me encaixo." × "O programa aprova qualquer apê!" → ✕ → se desfazem em FONTE OFICIAL e BANCO / AGENTE; CRITÉRIOS VIGENTES · TIPO DE OPERAÇÃO.
4. **Take 03 — CONSULTE A REGRA ATUAL:** calendário de atualizações; regras oficiais, simulação atualizada, caminho claro; ✕ decorar um número / ✓ conferir o que mudou.
5. **CTA SISTEMA** (Atendimento de cada comprador) + logo.

## Regerar
```
cd PRODUCAO && python3 tools/build_narration.py ATIVO-NOV26-13 --source episodes/ATIVO-NOV26-13/narration_source.wav && python3 tools/build_audio.py ATIVO-NOV26-13 && bash tools/render_episode.sh ATIVO-NOV26-13
```
