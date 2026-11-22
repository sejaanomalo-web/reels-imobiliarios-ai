# ATIVO — Diretriz de marca (logo e cor) para vídeos e motion

**Versão:** 2026-11-22 · **Público:** corretores de imóveis, prioritariamente 40+.

> **As regras visuais completas de vídeo agora estão no Sistema Visual ATIVO: `MARCA/sistema-visual/README.md` (Nível 1).** Ele cobre cores, atmosferas, tipografia, ilustração, composição, movimento e qualidade, e os valores ficam em `tokens.json`. Esta diretriz trata do **logo** e do histórico da cor. Em conflito, o Sistema Visual vence.

## Fonte de verdade

1. **Cor de destaque dos vídeos novos: `#02FB3F`** (RGB 2, 251, 63).
   - É o verde da seta do logo oficial: a mediana medida no PNG é `#02FF46`.
   - É também a decisão do cliente de 17/11/2026.
   - Valor canônico em `MARCA/sistema-visual/tokens.json` → `cor.acento`; o código lê por `PRODUCAO/src/theme.ts` (`ACENTO`).
   - Derivados só de apoio: `#01290B` (texto sobre o verde) e `#063A16` (fundo escuro esverdeado).
2. **Logo:** preservar os arquivos oficiais `MARCA/logo/ativo_logo_original.webp`, `MARCA/logo/ativo_logo_transparente.png` e `PRODUCAO/public/brand/ativo_logo.png`. Nunca redesenhar por aproximação nem trocar por texto. Animações podem montá-lo a partir de pontos amostrados do PNG oficial, desde que o arquivo oficial apareça por cima no final.
3. **Tipografia:** Manrope para a linguagem principal; JetBrains Mono para dados discretos (licenças em `PRODUCAO/public/fonts/`).
4. **Fundos e texto:**
   - fundos: preto, grafite e azul-marinho profundo (atmosferas do Sistema Visual);
   - texto: branco `#F4F5F7`;
   - o verde aparece com parcimônia, para ênfase, seta, linha, indicador ou CTA.

## Histórico da cor (não usar em vídeo novo)

- **`#3AF584`:** verde da identidade aprovada em 13/11/2026. Com os derivados `#092614` e `#0E3A1F`, passou a ser **legado** depois de 17/11/2026. Fica só nos episódios entregues até 16/11/2026 e em peças antigas (LP, Stories) que não forem refeitas. No código: `BRAND`/`brandAlpha`.
- **`#35E0A1`, `rgba(53,224,161,…)` e `#00FA44`:** resquícios antigos (verde-água do piloto e uma amostragem estimada). Nunca foram cores da marca.
- `PRODUCAO/tools/editorial_check.py` e `PRODUCAO/tools/sistema_visual_check.py` bloqueiam qualquer verde fora do acento vigente, e `render_episode.sh` não renderiza com erro.

## Preservar, não substituir cegamente

- `#FF6B5E` (alerta) e `#D2392E` (alerta cheio) são cores de tensão. Ficam onde forem semanticamente adequadas: perda, erro, proibição.
- Cores de fotos reais, elementos demonstrativos e luz de ambiente não são acentos da identidade. Não devem ser alteradas por busca e substituição indiscriminada.
- `OUTPUT/` e `PUBLICACAO/` contêm entregas históricas: não reprocessar nem sobrescrever sem ordem explícita.
- Preto, branco e neutros dominam. Nada de grandes blocos verdes.

## Layout e animação (resumo; regra completa no Sistema Visual)

- Prioridade: fonte legível no celular, títulos legíveis para a audiência 40+ e uma ideia por composição.
- Fundo escuro com luz localizada; traços precisos; transições motivadas por objetos. A seta ascendente pode inspirar o movimento, mas o arquivo do logo permanece intacto.
- Movimento:
  - câmera suave;
  - partículas e poeira **sutis** permitidas (≤ 0,3 de opacidade, ≤ 4 px; Sistema Visual v1.0.0, 22/11/2026);
  - **proibidos:** glitch, ciano, neon azul, HUD futurista e brilho excessivo.
- O vídeo **deve** avançar visualmente, mas sem exigir que o corretor leia texto pequeno nem acompanhe cortes frenéticos.
- Não alterar a voz oficial nem a velocidade aprovada: consultar `VOZ/voice_preset.json` e `PROMPTS/GUIA_MELHORIA_CONTINUA.md`.
