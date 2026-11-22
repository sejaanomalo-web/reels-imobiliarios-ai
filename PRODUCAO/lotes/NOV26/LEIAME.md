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
- Depois, publicar: `python3 tools/publicar.py <EPISÓDIO> --quando "AAAA-MM-DD HH:MM"` → `PUBLICACAO/AAAA/MM-mes/semana-DD-DD/DD-dia/HHhMM/` (a pasta define o horário do post). Cada pasta de horário tem só `<ID>.mp4`, `<ID>_capa.jpg`, `<ID>_legenda.txt` e `bastidores/` (QA, SRT, validação). O script MOVE as entregas de `OUTPUT/` (sem duplicar), recusa entrega incompleta e legenda reprovada. Não renderiza nem gera voz.

## Voz — regra do cliente de 19/11/2026 (a partir do NOV26_05)
- **Voz (regra do cliente, 19/11/2026, atualizada à tarde — a partir do NOV26_08):** calorosa e contagiante, ritmo dinâmico **mas humano, respeitando pausas de respiração e de suspense** (nem embolado, nem arrastado). Todo `episode.json` leva `"voice": {"shapePauses": {"keepUnder": 0.22, "ratio": 0.6, "max": 0.6}}` (o gerador já inclui; substitui o `tightenPauses` 0,09 s de NOV26_05–07). Continua 1,0×, sem `targetWpm`/time-stretch. Ver o topo de `PROMPTS/GUIA_MELHORIA_CONTINUA.md`.
- Alvo medido: ≥ 80% do tempo com fala e nenhuma pausa > 0,1 s entre frases. Se a tomada vier lenta demais, gerar outra; não acelerar.

- Padrão **aprovado pelo cliente em 19/11** ("gostei, siga com este padrão").

## SFX — um pouco mais dinâmicos (cliente, 19/11/2026, a partir do NOV26_06)

- ~+2 dB por evento (principais entre −24 e −26 dB) e mais eventos: whoosh/swish em toda troca de cena, tick/pop/click em cada item que entra (NOV26_06: 30 eventos; NOV26_05: 21).
- Voz sempre na frente: `mixcmp.py` da mixagem não pode ficar pior que o da narração isolada.
