# Lote GTA6 — edição especial GTA VI (PDF do cliente, 21/11/2026)

- Roteiros: `ROTEIROS/GTA6/GTA6_NN.md` (extraídos de `ATIVO_GTA_VI_50_Roteiros_Completos.pdf`; índice em `roteiros_gta6.json`).
- Nomes: composição `ATIVO-GTA6-NN` · saída `OUTPUT/ATIVO_GTA6_NN` · publicação `python3 tools/publicar_lote.py GTA6 NN` → `PUBLICACAO/GTA6/REELS_XX_AO_YY/NN`.
- Esteira de estilos contínua (`tools/esteira.py`). Narração: GANCHO + TAKES + RECOMPENSA palavra por palavra; CTA natural → transição; fim na CTA SISTEMA.
- Direitos: nunca usar logo, captura, arte, personagem ou música do jogo; nomes só citados em texto; desenhos originais.

## Agenda (pedido do cliente, 21/11/2026)
- 1 GTA por dia às **22:00 (Brasília)** de 21/11 a 29/11; a partir de 29/11, por dia: 1 GTA (22:00) + 2 do livro L60 (slots automáticos).
- Ordem de produção: GTA01..GTA08 → L60_02 → GTA09 → [L60, L60, GTA] por dia.
- A Action (`.github`, intocável) põe o post no próximo slot livre (`ig_proximo_slot`: 8/10/12/15/18/21h). Depois que ela roda, o GTA é movido para 22:00:
```sql
update ig_posts set agendado_para = (timestamp 'AAAA-MM-DD 22:00' at time zone 'America/Sao_Paulo'), atualizado_em = now()
 where caminho_video = 'PUBLICACAO/GTA6/REELS_01_AO_10/NN/ATIVO_GTA6_NN.mp4' and status = 'agendado';
```
- O publicador (`ig-publicador`, cron a cada minuto) publica quando `agendado_para <= now() + 20 min` — 22:00 funciona.
