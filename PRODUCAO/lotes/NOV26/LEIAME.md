# Lote "30 Reels — novembro 2026" (ATIVO-NOV26-01 … 30)

- **Fonte:** `ROTEIROS/LOTE_NOV2026/` (docx do cliente, um `.md` por episódio).
- **Estado persistente:** `PRODUCAO/lotes/NOV26/estado.json`. Atualize-o ao iniciar e ao concluir cada episódio. **Nunca produza um episódio que já esteja como "entregue".**
- **Ordem:** estritamente 01 → 30, um por vez, cada um renderizado, validado, registrado e com commit antes do próximo.
- **IDs:**
  - pasta, composição e `EP`: `ATIVO-NOV26-##` (o Remotion não aceita `_` no id);
  - saída e arquivos: `OUTPUT/ATIVO_NOV26_##/ATIVO_NOV26_##_*`.
- **Verde do lote:**
  - `#02FB3F` via `ACCENT_NOV26` / `accentAlpha` (`src/theme.ts`) e o kit `src/episodes/NOV26/kit.tsx`;
  - `Background` e `Captions` recebem `accent={A}`;
  - o `editorial_check` bloqueia o verde antigo nos arquivos do episódio;
  - episódios anteriores intactos.
- **CTA:**
  - regra dos Reels (14/11/2026): fala final = CTA SISTEMA → Direct;
  - a CTA do roteiro (salve/compartilhe/siga) vira uma transição curta, registrada em `cta.original_cta` / `transition_adapted`;
  - CTA da tela: `src/episodes/NOV26/Cta.tsx` (props `seg`, `title`, `sub`, `steps`).
- **Narração:**
  - lida: GANCHO + TAKES (sem direções);
  - número por extenso como no roteiro;
  - a tela pode mostrar o número em dígitos.
- **Apuração:** conferir o fato principal de cada roteiro (notícia) na web antes de gravar e registrar em `episode.json → apuracao`. Notícia ainda em estudo/projeção nunca vira fato na tela.
- **Trilha:** discreta, sem bateria (não usar `music.drums`).
- **Voz:**
  - 2 tomadas por episódio;
  - cota de 10 gerações/dia por chave (`GEMINI_API_KEY`, `GEMINI_API_KEY_2`; escolher com `GEMINI_KEY_VAR`);
  - sem cota: marcar `bloqueado` no estado, avisar o usuário e retomar após ~08:00 UTC.

## Entrega para publicação (pedido do cliente, 19/11/2026)
- Cada episódio entregue precisa de **vídeo + capa + legenda** (`OUTPUT/ATIVO_NOV26_##/legenda_instagram.txt`, padrão `PROMPTS/GUIA_LEGENDAS_INSTAGRAM_ATIVO.md`: 1ª linha fixa da CTA SISTEMA, sem Markdown, 5 hashtags minúsculas). Conferir com `python3 tools/legenda_check.py ATIVO_NOV26_##`.
- Depois, montar a pasta de publicação: `python3 tools/publicar_lote.py NOV26 <n>` → `PUBLICACAO/NOV26/REELS_01_AO_10/01/` (grupos de 10: `REELS_11_AO_20`, `REELS_21_AO_30`). Cada pasta: `ATIVO_NOV26_##.mp4`, `ATIVO_NOV26_##_capa.png`, `ATIVO_NOV26_##_legenda.docx` (um parágrafo por linha, sem negrito, para copiar e colar no Instagram) e o mesmo texto em `.txt`.
- O script só copia arquivos já validados e recusa entrega incompleta. Não renderiza nem gera voz.
