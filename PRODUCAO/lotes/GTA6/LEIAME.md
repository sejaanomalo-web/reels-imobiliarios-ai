# Lote GTA6 — edição especial GTA VI (PDF do cliente, 21/11/2026)

- Roteiros: `ROTEIROS/GTA6/GTA6_NN.md` (extraídos de `ATIVO_GTA_VI_50_Roteiros_Completos.pdf`; índice em `roteiros_gta6.json`).
- Nomes: composição `ATIVO-GTA6-NN` · saída `OUTPUT/ATIVO_GTA6_NN` · publicação `python3 tools/publicar.py <EPISÓDIO> --quando "AAAA-MM-DD HH:MM"` → `PUBLICACAO/AAAA/MM-mes/semana-DD-DD/DD-dia/HHhMM/` (a pasta define o horário do post).
- Esteira de estilos contínua (`tools/esteira.py`). Narração: GANCHO + TAKES + RECOMPENSA palavra por palavra; CTA natural → transição; fim na CTA SISTEMA.
- Direitos: nunca usar logo, captura, arte, personagem ou música do jogo; nomes só citados em texto; desenhos originais.

## Agenda (pedido do cliente, 21/11/2026)
- 1 GTA por dia às **22:00 (Brasília)** de 21/11 a 29/11; a partir de 29/11, por dia: 1 GTA (22:00) + 2 do livro L60 (slots automáticos).
- Ordem de produção: GTA01..GTA08 → L60_02 → GTA09 → [L60, L60, GTA] por dia.
- **Desde 22/11/2026 a pasta define o horário:** publique o GTA com `--quando "AAAA-MM-DD 22:00"` (pasta `.../22h00/`); a função `ig_enfileirar_post` do Supabase agenda exatamente na data/hora do caminho. Não é mais preciso o `update` manual para 22:00.
- O publicador (`ig-publicador`, cron a cada minuto) publica quando `agendado_para <= now() + 20 min` — 22:00 funciona.
