# Alterações — branch `feat/ativo-identidade-editorial-stories-v2`

## P0 — identidade
- `PRODUCAO/src/theme.ts`: `BRAND` (hex, rgb, ink, deep, logo) e `brandAlpha(a)`; `C.accent`/`C.accentInk` derivam de `BRAND`.
- `PRODUCAO/src/components/Background.tsx`, `Captions.tsx`: glow/marcador via `brandAlpha`.
- 78 arquivos de cena (`PRODUCAO/src/episodes/**`): verde antigo e tintas derivadas → verde oficial e tintas equivalentes (lista e critérios em `auditoria-cores.md`).
- Kits 16:9 `LP-ATIVO`, `LP-ATIVO-V2`, `LP-ATIVO-V3`: `LOGO_FILE = BRAND.logo`, `NEON = BRAND.hex`; comentários de "logo ausente/provisória" corrigidos. Pôsteres e Landings: comentários atualizados.
- Capas/Episódios EP030–EP033, EP-ATIVO01/02: comentário passa a dizer que a produção original foi sem logo porque o arquivo só chegou depois (o vídeo entregue não muda).
- `ANALISE/style_tokens.json`: status aprovado, accent `#3AF584`, tintas, nota sobre `#35E0A1`/`#00FA44`, regra da logo.

## P1 — documentação e processo editorial
- Adicionados nos caminhos pedidos: `MARCA/DIRETRIZ_IDENTIDADE_VISUAL_ATIVO.md`, `PROMPTS/GUIA_EDITORIAL_GANCHOS_RETENCAO_CTAS_ATIVO.md`, `PROMPTS/BRIEFING_SECAO_LP_NA_PRATICA_ATIVO.md`, `STORIES/ROTEIRO_5_STORIES_NA_PRATICA_ATIVO.md`, `PROMPTS/PROMPT_IMPLEMENTACAO_IDENTIDADE_EDITOR_STORIES_LP.md` (cópias fiéis dos arquivos enviados).
- `CLAUDE.md`: só os trechos conflitantes — marca aprovada, logo e verde, perfil/produto, CTA por episódio, processo real (call de diagnóstico → desenvolvimento), links oficiais, exceção da landing (1,1× + transcrição). Aprendizados e regras de voz mantidos.
- `PROMPTS/GUIA_MELHORIA_CONTINUA.md`: bloco no topo com identidade, guia editorial, checagem automática, processo real e exceção da landing.
- `PRODUCAO/tools/editorial_check.py` (novo): CTA/destino, promessas não comprovadas, fonte < mínimo 40+, verde divergente, interface sem rótulo "ilustrativa", texto fora da área segura.
- Lint: removidas 3 variáveis sem uso (EP-ATIVO01 Compass/Portfolio, LP-ATIVO-V3 S3Pain) — sem efeito visual.

## P2 — Stories "Na prática"
- `PRODUCAO/episodes/STORY-ATIVO-01…05/episode.json`: narração exata do roteiro, texto de tela, função, duração alvo, assets, CTA (Story 05: sticker Cal.com, destino único), status "aguardando voz e capturas".
- `PRODUCAO/src/episodes/STORY-ATIVO/cases.ts`: mapa único das 4 capturas com `authorized/sanitized`.
- `PRODUCAO/src/episodes/STORY-ATIVO-01/Story.tsx` + `timeline.json` (provisória, sem voz) e composição `STORY-ATIVO-01` no `Root.tsx` — prévia interna.

## Não alterado (de propósito)
- `OUTPUT/**` (entregas históricas), voz, velocidade e CTAs aprovadas, vídeos já entregues.
