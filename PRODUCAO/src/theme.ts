/**
 * Sistema visual da ATIVO | Inteligência Imobiliária — identidade APROVADA (MARCA/brand.json, 13/11/2026).
 * Fonte única do verde da marca: BRAND. Para transparências use brandAlpha(a) — nunca escreva o RGB do verde à mão.
 * Logo oficial: PRODUCAO/public/brand/ativo_logo.png (fundo transparente) · original em MARCA/logo/.
 */
export const BRAND = {
  hex: "#3AF584",
  rgb: [58, 245, 132] as const,
  /** texto escuro sobre o verde (botões, chips preenchidos) */
  ink: "#092614",
  /** tinta escura do verde para fundos de selo/balão */
  deep: "#0E3A1F",
  logo: "brand/ativo_logo.png",
};
export const brandAlpha = (a: number) => `rgba(${BRAND.rgb[0]},${BRAND.rgb[1]},${BRAND.rgb[2]},${a})`;

export const C = {
  bg0: "#07080A",
  bg1: "#12151A",
  surface: "#15181D",
  surface2: "#1D2128",
  surface3: "#262B33",
  line: "rgba(255,255,255,0.10)",
  lineSoft: "rgba(255,255,255,0.06)",
  text: "#F4F5F7",
  muted: "#9198A3",
  dim: "#5A606B",
  accent: BRAND.hex,
  accentInk: BRAND.ink,
  warn: "#FF6B5E",
  cold: "#8FB4E3",
  coldDeep: "#17212D",
  paper: "#F2F0EA",
  ink: "#14161A",
  inkMuted: "#676C75",
};

export const F = {
  sans: "Manrope, sans-serif",
  mono: "'JetBrains Mono', monospace",
};

export const VIDEO = { width: 1080, height: 1920, fps: 30 };

/** Área segura para a interface do Instagram Reels. */
export const SAFE = { top: 250, bottom: 350, side: 100 };
