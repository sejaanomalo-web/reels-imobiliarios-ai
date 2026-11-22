# OUTPUT — área de produção e acervo do que NÃO está na fila do Instagram

| Pasta | O que tem |
|---|---|
| `OUTPUT/<saida>/` (na raiz) | Episódio recém-renderizado, **aguardando publicação**. Ao publicar (`tools/publicar.py`), vídeo, capa, legenda e relatórios saem daqui para `PUBLICACAO/<data>/<hora>/`. Nada fica duplicado |
| `pilotos/` | Pilotos dos modelos virais (`ATIVO_PILOTO_01`, `ATIVO_PICTO_01`) e a demonstração dos estilos (`DEMO_ESTILOS`) |
| `anuncios/` | Criativos de Meta Ads (`AD-ATIVO-01`, `AD-ATIVO-02`) |
| `landing/` | Vídeos da landing page (`LP_ATIVO`, `_V2`, `_V3`) |
| `stories/` | Os 5 Stories "na prática" |
| `reels-anteriores/` | Reels produzidos antes da publicação automática (EP001–033, ATIVO_EP01–10, REEL04–15, CASE01–03) |
| `testes-de-voz/` | Audições e tomadas de voz |

Arquivos gerados (WAV de narração e mixagem, stems, `editaveis/`) não são versionados (`.gitignore`): o render os recria a partir de `PRODUCAO/episodes/<EP>/`.
