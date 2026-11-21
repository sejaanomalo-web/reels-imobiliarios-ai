/**
 * ESTEIRA DE 5 ESTILOS VISUAIS — ATIVO (regra do cliente, 21/11/2026). Ordem fixa e circular entre todos os roteiros:
 * 1 Palitinho → 2 Desenho à mão → 3 Planta técnica → 4 Tipografia cinética → 5 Painel (padrão atual) → 1 …
 * O próximo estilo fica em PRODUCAO/estilos/esteira.json (tools/esteira.py). Guia: PROMPTS/GUIA_ESTILOS_VISUAIS_ATIVO.md.
 * Mesma identidade em todos: grafite + verde do lote (kit NOV26: A/aa), Manrope + JetBrains Mono, logo oficial, legenda, CTA SISTEMA,
 * voz Puck 1,0× com pausas naturais, trilha e SFX sintetizados.
 */
export const ESTILOS = {
  1: { nome: "Palitinho", kit: "estilos/palitinho" },
  2: { nome: "Desenho à mão", kit: "estilos/lousa" },
  3: { nome: "Planta técnica", kit: "estilos/planta" },
  4: { nome: "Tipografia cinética", kit: "estilos/tipografia" },
  5: { nome: "Painel", kit: "episodes/NOV26/kit" },
} as const;
