# Lote L60 — roteiros do livro de 60 (calendário), com a esteira de 5 estilos

- **Fila:** `estado.json` → roteiros do `ROTEIROS/LIVRO_60_ROTEIROS.docx` na ordem do calendário de 60 dias (Dia 02 = EP011, Dia 03 = EP021, Dia 05 = EP041 …), pulando os já produzidos (EP001–003, 015–020, 030–033).
- **Extração:** o bloco "DIA NN / EPxxx" do livro vira `ROTEIROS/EPxxx.md` (GANCHO, SITUAÇÃO, TENSÃO, INSIGHT com LOCUÇÃO + VISUAL). Narrar a LOCUÇÃO de GANCHO→INSIGHT palavra por palavra; a "CTA / BIO" do livro (link da bio) é substituída pela CTA SISTEMA padrão (`cta.original_cta` registra a original).
- **Nomes:** `ATIVO-L60-NN` (composition/episódio), `OUTPUT/ATIVO_L60_NN`, `PUBLICACAO/L60/REELS_01_AO_10/NN` (`python3 tools/publicar_lote.py L60 NN`). NN = ordem de produção.
- **Estilo:** sempre o próximo da esteira (`python3 tools/esteira.py proximo`), registrado por `tools/novo_episodio.py`. Guia: `PROMPTS/GUIA_ESTILOS_VISUAIS_ATIVO.md`.
- **Publicação:** push na **main** → Action `enfileirar.yml` agenda no próximo horário livre (8h/10h/12h/15h/18h/21h). Nunca mover/renomear post já enviado.
- **Voz:** contas `GEMINI_API_KEY` / `GEMINI_API_KEY_2` via `GEMINI_KEY_VAR`; A/B (C só se ambas erram); cota estourada → marcar `bloqueado`, commitar, avisar e esperar.
