# Assets e autorizações — Stories "Na prática"

Atualizado 13/11/2026 ~19h UTC: o cliente enviou 5 capturas de tela.

| Asset | Situação | Higienização feita | Autorização |
|---|---|---|---|
| `PRODUCAO/public/cases/ativo/bruno_painel.webp` | recebido | sem barra do navegador; e-mail da conta e "Leads Totais" borrados; URL de rodapé removida | **pendente** |
| `PRODUCAO/public/cases/ativo/bruno_site.webp` | recebido | sem barra do navegador (página pública) | **pendente** |
| `PRODUCAO/public/cases/ativo/ivone_painel.webp` | recebido | sem barra do navegador; e-mail e "Leads Totais" borrados | **pendente** |
| `PRODUCAO/public/cases/ativo/ivone_site.webp` | recebido (extra, não previsto no roteiro) | sem barra do navegador (página pública) | **pendente** |
| `PRODUCAO/public/cases/ativo/antonio_site.webp` | recebido | sem barra do navegador (página pública) | **pendente** |

Os originais (com abas, e-mails e métricas) **não** entraram no repositório.

## Pontos em aberto
1. **Autorização** de Bruno Souza, Ivone Peris e Antônio Carlos para nome, marca e imagens dos sistemas em material público. Até lá: prévia interna com marca d'água e "Projeto A/B/C".
2. **Selo "MANEI"** aparece no cabeçalho dos sites de Ivone e Antônio (domínio `assessoriamanei.com.br`). Se não for marca da ATIVO/ANÔMALO autorizada, precisa ser coberto nas versões públicas para não parecer produto de terceiro.
3. Números visíveis que permanecem (Publicados, Top categorias, preços dos anúncios) são informação pública dos sites; "Leads Totais" foi borrado por ser métrica interna e para não parecer resultado de vendas.

Mapa único: `PRODUCAO/src/episodes/STORY-ATIVO/cases.ts` (`sanitized: true`, `authorized: false`).
