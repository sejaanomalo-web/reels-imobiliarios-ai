# QA — ATIVO_PLANTA_01 (piloto do Terceiro modelo, Planta técnica v2) — 23/11/2026

**O que é:** o roteiro do ATIVO_GTA6_02 ("O magnata imobiliário escondido em GTA VI"), com a mesma voz congelada (Puck 1,0×, `shapePauses`) e a mesma timeline, redesenhado no kit `PRODUCAO/src/estilos/planta.tsx` v2. Serve de referência do modelo e de comparação antes × depois. **Não é para publicação** (o GTA6_02 já foi publicado).

## Técnico
| Item | Resultado |
|---|---|
| Vídeo | 1080×1920, H.264, yuv420p, 30 fps, 50,77 s |
| Áudio | AAC; −14,91 LUFS integrado; pico −1,97 dBTP; LRA 2,1; 23 eventos de som (mesma mixagem do GTA6_02) |
| `editorial_check ATIVO-PLANTA-01` | 0 erro, 0 aviso |
| `sistema_visual_check` (sistema + modelo `planta-tecnica`) | 0 erro, 0 aviso |
| `sistema_visual_check --quadros` (24 quadros do MP4 final) | 0 erro, 0 aviso |
| TypeScript / ESLint | sem erros |

## Revisão visual (README §8) — feita na folha `.claude/skills/terceiro-modelo-planta-tecnica/referencias/piloto_24_quadros.jpg`
- [x] 7 assinaturas: escuro com luz localizada; verde só no que acende (cota "fortuna em imóveis", NEGÓCIOS, PATRIMÔNIO, "e os seus imóveis?", fecho) e vermelho só na negação/falha; legenda palavra a palavra; o "você" (lote tracejado) é o elemento verde novo; grão + vinheta; fecho que digita SISTEMA + logo oficial; selos ILUSTRATIVO / PERSONAGEM FICTÍCIO / SEGUNDO O PERFIL OFICIAL (ROCKSTAR).
- [x] Um protagonista por folha; faixa da legenda livre; nada na coluna de botões.
- [x] Texto legível: frases ≥ 30 px, rótulos de 24 px só em maiúsculas espaçadas.
- [x] Ilustração coerente (família `esquema`, traço único de 3 px).
- [x] Transições motivadas: mergulho na SALA → ficha; mergulho em NEGÓCIOS → império; império encolhe e vira a quadra central do mapa; mergulho na quadra → corte A-A; mergulho no lote "seus imóveis" → projeto SEU SISTEMA.
- [x] Reconhecível como ATIVO com o logo coberto.

Problemas encontrados na revisão e corrigidos antes do render final: moldura vazia em "O império dele" (virou esboço tracejado), elementos gigantes e borrados durante o mergulho (somem na primeira metade), rótulo "CORTE A-A" subindo para a faixa proibida com a câmera aproximada (foi para o pé do prédio), chamada "NEM É O PROTAGONISTA" curta demais (adiantada).

## Limitações
- A narração foi reconstruída da fonte congelada com o mesmo processamento do `build_narration.py`, sem realinhar (o alinhador local não está instalado nesta sessão). A timeline versionada do GTA6_02 foi mantida.
- O fecho `CtaPlanta` substitui o `Cta` comum da esteira só no formato do modelo. Usá-lo também na esteira depende de decisão do cliente.
