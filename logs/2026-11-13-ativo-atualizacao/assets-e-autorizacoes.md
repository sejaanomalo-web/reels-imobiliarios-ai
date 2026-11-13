# Assets e autorizações — Stories "Na prática"

| Asset esperado | Situação | Autorização | Higienização |
|---|---|---|---|
| `PRODUCAO/public/cases/ativo/bruno_painel.webp` | **ausente** | não registrada | — |
| `PRODUCAO/public/cases/ativo/bruno_site.webp` | **ausente** | não registrada | — |
| `PRODUCAO/public/cases/ativo/ivone_painel.webp` | **ausente** | não registrada | — |
| `PRODUCAO/public/cases/ativo/antonio_site.webp` | **ausente** | não registrada | — |

Mapa único: `PRODUCAO/src/episodes/STORY-ATIVO/cases.ts` (`authorized: false`, `sanitized: false`). Enquanto qualquer um for `false`, o Story mostra "CAPTURA PENDENTE", nomeia "Projeto A/B/C" e leva a marca d'água **PRÉVIA INTERNA · NÃO PUBLICAR**.

Para liberar:
1. Enviar as 4 imagens únicas (os 6 screenshots originais têm duplicatas — não anunciar "seis projetos").
2. Higienizar antes de entrar no repositório: sem nomes de leads, telefones, e-mails, métricas internas, conversas.
3. Registrar autorização de Bruno Souza, Ivone Peris e Antônio Carlos para nome e marca (por escrito).
4. Marcar `authorized: true` e `sanitized: true` em `cases.ts`.

Nenhum dado pessoal ou captura privada foi registrado neste log.
