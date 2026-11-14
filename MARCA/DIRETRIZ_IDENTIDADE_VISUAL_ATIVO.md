# ATIVO — Diretriz visual obrigatória para vídeos e motion

**Versão:** 2026-11-13 · **Público:** corretores de imóveis, prioritariamente 40+.

## Fonte de verdade

1. **Cor principal aprovada e registrada no repositório:** `#3AF584` (RGB 58, 245, 132). A fonte canônica existente é `MARCA/brand.json` (`accent_color`). O projeto Remotion deve lê-la ou sincronizar rigorosamente com ela.
2. **Logo:** preservar os arquivos oficiais `MARCA/logo/ativo_logo_original.webp`, `MARCA/logo/ativo_logo_transparente.png` e `PRODUCAO/public/brand/ativo_logo.png`. Nunca redesenhar por aproximação.
3. **Tipografia existente:** Manrope para a linguagem principal; JetBrains Mono para dados discretos. Preservar as fontes e respectivas licenças.
4. **Fundos e texto:** grafite/preto escuro `#07080A` e tons escuros do projeto, branco `#F4F5F7`; usar `#3AF584` com parcimônia para ênfase, seta, linha, indicador ou CTA.

## Regra de uso (14/11/2026)

Nos vídeos novos, o verde é **exatamente `#3AF584`** — inclusive quando o roteiro diz só "verde" ou "verde luminoso". Tons derivados permitidos apenas como apoio: `#092614` (texto sobre o verde) e `#0E3A1F` (fundo escuro esverdeado). `PRODUCAO/tools/editorial_check.py` bloqueia qualquer outro verde e `render_episode.sh` não renderiza com erro. Vídeos já entregues não são reprocessados.

## Erro corrigido

`#35E0A1` e `rgba(53,224,161,...)` são resquícios de verde-água/menta usados em parte do pipeline. Eles não devem ser a cor de identidade dos novos vídeos. Não confundir `#00FA44` (amostragem estimada de PNG sugerida anteriormente) com o HEX oficial: **priorizar `#3AF584`**.

O glow deve usar o MESMO verde: `rgba(58,245,132,alfa)`, com opacidade controlada. No Remotion, centralizar helpers para construir transparências sem espalhar RGB literal.

## Preservar, não substituir cegamente

- `#FF6B5E` é cor de aviso/tensão e pode permanecer quando semanticamente adequada.
- Cores de interfaces de terceiros, fotos reais, elementos demonstrativos, estados de alerta e luz do ambiente não são acentos da identidade e não devem ser alterados por busca/substituição indiscriminada.
- `OUTPUT/` contém vídeos e entregas históricas: não reprocessar ou sobrescrever sem ordem explícita.
- Preto, branco e cores neutras devem dominar, e não grandes blocos verdes.

## Layout e animação

- Prioridade: fonte legível em celular; títulos legíveis para audiência 40+; uma ideia por composição.
- Fundo escuro, traços precisos, transições motivadas por objetos; a seta ascendente pode inspirar o movimento, mas o arquivo de logo original permanece intacto.
- Câmera suave, motion inteligente, sem glitch, ciano, neon azul, partículas, HUD futurista ou brilho excessivo.
- O vídeo **deve** avançar visualmente, mas jamais exigir que o corretor leia texto pequeno ou acompanhe cortes frenéticos.
- Não alterar a voz oficial nem velocidade aprovada: consultar `VOZ/voice_preset.json` e `PROMPTS/GUIA_MELHORIA_CONTINUA.md`.

## Critérios de aceitação

- [ ] `MARCA/brand.json`, `PRODUCAO/src/theme.ts`, `ANALISE/style_tokens.json` alinhados em `#3AF584`.
- [ ] Nenhum `#35E0A1` ou `rgba(53,224,161,...)` ativo como acento da ATIVO; diferenças históricas comentadas/documentadas.
- [ ] Render de quadro comparativo com logo aprovada e elementos em `#3AF584`.
- [ ] Preview em Story 9:16 e vídeo LP 16:9, com legibilidade, logo oficial e sem artefatos.
- [ ] QA registrado em `/logs` com arquivos atingidos e validação de fonte/voz/cores.
