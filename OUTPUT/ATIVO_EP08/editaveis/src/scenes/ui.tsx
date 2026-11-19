import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { mix } from "../../../lib/anim";
import { Thumb } from "../../EP-ATIVO07/scenes/ui";

/** Peças do ATIVO EP08 (desenhos próprios; corretores, comprador, anúncios e imóvel fictícios — exemplo ilustrativo, sem preço numérico). */
export { Card, CheckDot, IconChat, IconDoc, IconPlane, IconStar, IconUser, IconX, Mark, Msg, Seal, Tag, Thumb } from "../../EP-ATIVO07/scenes/ui";

/** Fecho: a orientação que diferencia. */
export const STEPS = [
  { k: "CRITÉRIO", sub: "o que avaliar" },
  { k: "CLAREZA", sub: "o que conferir" },
  { k: "TRANSPARÊNCIA", sub: "o que pode limitar" },
];
export const WORDS = ["CRITÉRIO", "CLAREZA", "TRANSPARÊNCIA", "CONFIANÇA", "ORIENTAÇÃO"];
export const ADJ = ["AMPLA", "EXCELENTE", "IMPERDÍVEL", "ÓTIMA", "LINDO", "OPORTUNIDADE ÚNICA", "MARAVILHOSO", "TOP"];

/** Anúncio fictício do mesmo imóvel (sem preço numérico). */
export const AdCard: React.FC<{ who: string; w?: number; hi?: number[]; dim?: number }> = ({ who, w = 430, hi = [0, 0, 0], dim = 0 }) => {
  const row = (k: string, v: string, p: number) => (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", borderRadius: 14, background: p > 0.5 ? BRAND.deep : C.bg1, border: `2px solid ${p > 0.5 ? brandAlpha(0.5) : "transparent"}`, marginTop: 10 }}>
      <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted }}>{k}</span>
      <span style={{ fontWeight: 800, fontSize: 28, color: C.text }}>{v}</span>
    </div>
  );
  return (
    <div style={{ width: w, boxSizing: "border-box", borderRadius: 32, background: C.surface, border: `2px solid ${C.line}`, padding: 20, boxShadow: "0 30px 70px rgba(0,0,0,0.5)", opacity: mix(1, 0.4, dim), fontFamily: F.sans }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, letterSpacing: "0.06em", color: C.text }}>{who}</span>
        <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.dim }}>ILUSTRATIVO</span>
      </div>
      <div style={{ borderRadius: 18, overflow: "hidden", border: `3px solid ${hi[0] > 0.5 ? BRAND.hex : "transparent"}` }}>
        <Thumb w={w - 46} h={(w - 46) * 0.58} lit={hi[0]} />
      </div>
      {row("PREÇO", "R$ ••••••", hi[1])}
      {row("IMÓVEL", "Apto · 2 quartos", hi[2])}
    </div>
  );
};

/** Planta baixa abstrata (sem medidas). */
export const Plan: React.FC<{ size: number; p?: number; color?: string }> = ({ size, p = 1, color = C.text }) => (
  <svg width={size} height={size * 0.75} viewBox="0 0 160 120" fill="none">
    <path d="M8 8h144v104H8z M8 60h60 M68 8v104 M68 76h84 M110 8v68" stroke={color} strokeWidth={4} strokeLinejoin="round" strokeDasharray={900} strokeDashoffset={900 * (1 - p)} />
    <path d="M30 60v-6 M88 76v-6 M68 30h-6" stroke={BRAND.hex} strokeWidth={4} opacity={p} />
  </svg>
);

/** Comprador (ilustração). */
export const Buyer: React.FC<{ size: number; q?: number; t: number }> = ({ size, q = 0, t }) => (
  <div style={{ position: "relative", width: size, height: size }}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke={C.text} strokeWidth={1.6} /><path d="M4 21c1.5-4.5 4.5-6.5 8-6.5s6.5 2 8 6.5" stroke={C.text} strokeWidth={1.6} strokeLinecap="round" /></svg>
    {q > 0.01 ? (
      <div style={{ position: "absolute", right: -size * 0.35, top: -size * 0.15, width: size * 0.5, height: size * 0.5, borderRadius: size, background: C.warn, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: size * 0.34, fontFamily: F.sans, transform: `scale(${mix(0.3, 1, Math.min(1.1, q))}) rotate(${Math.sin(t * 3) * 8}deg)` }}>?</div>
    ) : null}
  </div>
);
