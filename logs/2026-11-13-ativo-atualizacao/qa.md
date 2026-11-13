# QA — 13/11/2026

| Verificação | Resultado |
|---|---|
| `npm ci` (instalação limpa, com backup do node_modules anterior) | OK — 343 pacotes |
| `npm run lint` (ESLint + tsc) | OK — 0 erros (3 erros pré-existentes de variáveis sem uso corrigidos) |
| Busca final verde antigo em `PRODUCAO/src` | 0 ocorrências |
| `python3 PRODUCAO/tools/editorial_check.py` (21 episódios) | 0 ERROS; AVISOS de fonte < mínimo (16–22 px) em rótulos secundários de episódios históricos e da landing; LP-ATIVO-V3 sem campo `cta` no episode.json (CTA só na fala) |
| Render de quadros antes/depois (EP033, EP-ATIVO02, EP-ATIVO01, LP-ATIVO) | OK — `img/cores-antes-depois.jpg` |
| Prévia 9:16 STORY-ATIVO-01 com área segura (250/350/100 px) | Títulos dentro da área; "PERSONALIZAÇÃO" estreitado para caber nas margens laterais; logo oficial sem sobrepor rótulos — `img/story01_previa_area_segura.jpg` |
| Ortografia (títulos do Story 01) | revisada |
| Voz/velocidade | **não alteradas** |
| MP4 dos Stories | **não renderizados** — sem voz (cota esgotada) e sem capturas autorizadas; prévia é só de quadros |

## Avisos que pedem decisão
1. Fontes de 16–22 px em rótulos secundários (mono) de vários episódios: abaixo do mínimo 40+ do guia. Não corrigi em episódios aprovados; vale nas próximas produções.
2. **Story 05** — DECIDIDO pelo cliente (13/11/2026): manter o texto do roteiro como está ("apresentamos o sistema… Agende uma demonstração"). Narração da landing (v3) também mantida, sem regravar.
3. Guia editorial pede 3–8 palavras na tela; o vídeo da landing usa transcrição completa por pedido do cliente — registrado como exceção.

## Decisões do cliente (13/11/2026, fim do dia)
- Story 05: manter texto do roteiro.
- Landing v3: manter narração atual.
- Vozes dos 5 Stories: gerar quando a cota Gemini renovar (agendado para 14/11 ~05:15 Brasília) e avisar o cliente.
- Pendências jurídicas (autorização dos corretores): fora de prioridade agora; até haver autorização, Stories seguem anonimizados como prévia interna.
