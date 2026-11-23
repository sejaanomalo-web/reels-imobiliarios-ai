# QA — ATIVO_MAQUETE_01 (piloto do Quarto modelo, Maquete 3D) — 23/11/2026

**O que é:** o roteiro do ATIVO_NOV26_03 ("O dinheiro que financia os imóveis"), com a mesma voz congelada (Puck) e a mesma timeline, montado como maquete 3D no kit `PRODUCAO/src/estilos/maquete.tsx`. Serve de referência do modelo. **Não é para publicação** (o NOV26_03 já está na fila).

## Técnico
| Item | Resultado |
|---|---|
| Vídeo | 1080×1920, H.264, yuv420p, 30 fps, 49,98 s, 15,1 MB |
| Áudio | AAC; −15,1 LUFS integrado; pico −1,6 dBFS; LRA 2,8 (mesmo roteiro de efeitos do NOV26_03) |
| `editorial_check ATIVO-MAQUETE-01` | 0 erro, 0 aviso |
| `sistema_visual_check` (sistema + modelo `maquete-3d`) | 0 erro, 0 aviso |
| `sistema_visual_check --quadros` (24 quadros do MP4 final) | 0 erro, 0 aviso (no 1º render, 10 avisos de rodapé claro sob o holofote; corrigido com vinheta e rodapé escuro) |
| TypeScript / ESLint | sem erros |
| Render | `@remotion/three` (WebGL headless), ~9 min para 50 s em 4 núcleos; prévia `--scale=0.5` ~7 min |

## Revisão visual (README §8) — folha `.claude/skills/quarto-modelo-maquete-3d/referencias/piloto_24_quadros.jpg`
- [x] 7 assinaturas:
  - escuro com luz localizada (atmosfera por capítulo + holofote);
  - verde só no que acende ("financiamento", o corretor na virada, os módulos do fecho) e vermelho só na pressão e na saída;
  - legenda palavra a palavra;
  - o corretor de gravata verde sob o holofote;
  - poeira + grão + vinheta;
  - campo que digita SISTEMA + logo oficial;
  - FONTES e o selo "METÁFORA ILUSTRATIVA".
- [x] Um protagonista por capítulo; palco entre y 600 e 1420; legenda em caixa na faixa 1440–1540.
- [x] Placas curtas (no máximo 2 ao mesmo tempo); nada na coluna de botões.
- [x] Apuração do NOV26_03 respeitada: reservatório como metáfora, sem o valor da saída líquida, sem dizer que o crédito parou.
- [x] Plano-sequência: a câmera anda pelo mesmo mundo; clima troca por capítulo.

Problemas encontrados na revisão e corrigidos antes do render final:
- câmera perto demais (objetos cortados e encostando no cabeçalho);
- maquete espalhada na largura;
- tela vazia no 1º segundo;
- corretor sozinho por 3 s;
- pedestal vazio no início do fecho;
- rodapé claro sob o holofote;
- módulos do fecho atrás da legenda.

## Pendências
- **Família de ilustração "maquete" no Nível 1** (Sistema Visual v1.1.0): aguardando a aprovação do cliente pela governança (README §10). Até lá, fica registrada como proposta em `modelos.json`.
- Narração reconstruída da fonte congelada com o mesmo processamento do `build_narration.py`, sem realinhar (o alinhador local não está instalado nesta sessão); a timeline versionada do NOV26_03 foi mantida.
