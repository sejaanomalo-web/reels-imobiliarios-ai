# Lote L60 — roteiros do livro de 60 (calendário), com a esteira de 5 estilos

- **Fila:** `estado.json` → roteiros do `ROTEIROS/LIVRO_60_ROTEIROS.docx` na ordem do calendário de 60 dias (Dia 02 = EP011, Dia 03 = EP021, Dia 05 = EP041 …), pulando os já produzidos (EP001–003, 015–020, 030–033).
- **Extração:** o bloco "DIA NN / EPxxx" do livro vira `ROTEIROS/EPxxx.md` (GANCHO, SITUAÇÃO, TENSÃO, INSIGHT com LOCUÇÃO + VISUAL). Narrar a LOCUÇÃO de GANCHO→INSIGHT palavra por palavra; a "CTA / BIO" do livro (link da bio) é substituída pela CTA SISTEMA padrão (`cta.original_cta` registra a original).
- **Nomes:** `ATIVO-L60-NN` (composition/episódio), `OUTPUT/ATIVO_L60_NN`, publicação `python3 tools/publicar.py <EPISÓDIO> --quando "AAAA-MM-DD HH:MM"` → `PUBLICACAO/AAAA/MM-mes/semana-DD-DD/DD-dia/HHhMM/` (a pasta define o horário do post). NN = ordem de produção.
- **Modelo:** sempre o da vez na rotação de 4 modelos (`python3 tools/esteira.py proximo`), registrado por `novo_episodio.build(..., formato=...)` (desde 23/11/2026; a esteira de 5 estilos foi arquivada).
- **Publicação:** `tools/publicar.py` com o horário escolhido (8h/10h livres do dia) → push na **main** → Action `enfileirar.yml` agenda exatamente no horário da pasta. Mover um post já enviado só junto com a atualização do Supabase (o Claude faz as duas coisas).
- **Voz:** contas `GEMINI_API_KEY` / `GEMINI_API_KEY_2` via `GEMINI_KEY_VAR`; A/B (C só se ambas erram); cota estourada → marcar `bloqueado`, commitar, avisar e esperar.
