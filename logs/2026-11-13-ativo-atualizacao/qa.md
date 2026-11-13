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
2. **Story 05**: a narração do roteiro ("Depois **apresentamos** o sistema… Agende uma **demonstração**") contradiz o processo real definido pelo cliente hoje (call de diagnóstico → desenvolvimento). Voz não gravada até decisão.
3. Guia editorial pede 3–8 palavras na tela; o vídeo da landing usa transcrição completa por pedido do cliente — registrado como exceção.
