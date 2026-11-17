import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";

/** Peças do ATIVO REEL07 (desenhos próprios; exemplo ilustrativo — sem preços, contrato ou resultado garantido). */
export { CheckDot, IconChat, IconLens, IconPlane, IconUser, Label, Mark, People, Question, Tag } from "../../EP-ATIVO-CASE01/scenes/ui";
export { PropCard } from "../../EP-ATIVO-REEL04/scenes/ui";

/** Etapas da captação (lista do fecho; vira o módulo IMÓVEIS na CTA). */
export const STEPS = [
  { k: "DADOS A CONFERIR", sub: "antes de prometer" },
  { k: "PLANO DE DIVULGAÇÃO", sub: "materiais e apresentação" },
  { k: "RETORNOS COMBINADOS", sub: "próximos passos com o proprietário" },
];

/** Sobrado genérico (dois pavimentos). */
export const Sobrado: React.FC<{ w: number; lit?: number }> = ({ w, lit = 0.6 }) => (
  <svg width={w} height={w * 0.86} viewBox="0 0 300 258" style={{ display: "block" }}>
    <path d="M30 92 L150 22 L270 92 Z" fill="#2C343E" />
    <rect x="45" y="92" width="210" height="150" fill="#232A33" />
    <path d="M45 166 H255" stroke="#1A1F26" strokeWidth="5" />
    {[70, 130, 190].map((x, i) => <rect key={i} x={x} y="108" width="40" height="40" rx="3" fill={i === 1 ? `rgba(255,214,150,${lit})` : "rgba(255,255,255,0.14)"} />)}
    <rect x="70" y="184" width="44" height="40" rx="3" fill="rgba(255,255,255,0.14)" />
    <rect x="186" y="184" width="44" height="40" rx="3" fill={`rgba(255,214,150,${lit * 0.8})`} />
    <rect x="132" y="186" width="36" height="56" rx="3" fill="#3F4956" />
    <rect x="0" y="242" width="300" height="16" fill="#14181E" />
  </svg>
);

/** Profissional ilustrativo (A ou B). */
export const Pro: React.FC<{ who: "A" | "B"; size: number; glow?: number }> = ({ who, size, glow = 0 }) => (
  <div style={{ position: "relative", width: size, height: size * 1.15, display: "flex", flexDirection: "column", alignItems: "center" }}>
    <div style={{ width: size * 0.42, height: size * 0.42, borderRadius: "50%", background: who === "B" ? "#3A4A40" : "#3A3F4A", border: `4px solid ${who === "B" && glow > 0.5 ? BRAND.hex : C.muted}` }} />
    <div style={{ marginTop: size * 0.04, width: size * 0.8, height: size * 0.5, borderRadius: `${size * 0.4}px ${size * 0.4}px ${size * 0.08}px ${size * 0.08}px`, background: who === "B" ? "#2E3A33" : "#2E333C", border: `4px solid ${who === "B" && glow > 0.5 ? BRAND.hex : C.muted}`, boxShadow: who === "B" && glow > 0.5 ? `0 0 24px ${brandAlpha(0.4)}` : "none" }} />
    <div style={{ position: "absolute", right: -size * 0.05, bottom: size * 0.1, width: size * 0.34, height: size * 0.34, borderRadius: "50%", background: who === "B" ? BRAND.hex : C.surface3, color: who === "B" ? BRAND.ink : C.text, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.sans, fontWeight: 800, fontSize: size * 0.2 }}>{who}</div>
  </div>
);

/** Balão de fala. */
export const Bubble: React.FC<{ text: string; tone?: "plain" | "good" | "dim"; size?: number; style?: React.CSSProperties }> = ({ text, tone = "plain", size = 36, style }) => (
  <div style={{ display: "inline-block", padding: `${size * 0.4}px ${size * 0.7}px`, borderRadius: size * 0.8, borderBottomLeftRadius: 8, background: tone === "good" ? BRAND.deep : C.surface3, border: `2px solid ${tone === "good" ? brandAlpha(0.6) : C.line}`, fontFamily: F.sans, fontWeight: 800, fontSize: size, color: tone === "dim" ? C.muted : C.text, whiteSpace: "nowrap", ...style }}>{text}</div>
);
