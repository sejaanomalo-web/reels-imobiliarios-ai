import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { mix } from "../../../lib/anim";

/** Peças do ATIVO EP06 (desenhos próprios; equipe, lead e imóvel fictícios; exemplo ilustrativo). */
export { Card, CheckDot } from "../../EP-ATIVO03/scenes/ui";
export { IconChat, IconPlane, IconUser, IconX, Mark, Tag } from "../../EP-ATIVO02/scenes/ui";

export const STAGES = ["ENTRADA", "ATENDIMENTO", "VISITA", "NEGOCIAÇÃO"];
export const TEAM = [
  { ini: "A", bg: "#4E6A8C" },
  { ini: "B", bg: "#8C6A4E" },
  { ini: "C", bg: "#5A7A6E" },
  { ini: "D", bg: "#6A5A8C" },
];
export const PROTOCOL = [
  { k: "CLIENTES", sub: "quem está em cada etapa" },
  { k: "ETAPAS", sub: "onde cada oportunidade está" },
  { k: "PENDÊNCIAS", sub: "o que precisa de ação" },
];

export const Avatar: React.FC<{ ini: string; bg: string; size?: number; ring?: string }> = ({ ini, bg, size = 64, ring }) => (
  <div style={{ width: size, height: size, borderRadius: size / 2, flex: "none", background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.sans, fontWeight: 800, fontSize: size * 0.42, color: C.text, boxSizing: "border-box", border: ring ? `4px solid ${ring}` : "none" }}>{ini}</div>
);

/** Nó do fluxo (etapa). state: ok | warn | idle */
export const Node: React.FC<{ label: string; state: "ok" | "warn" | "idle"; p: number; children?: React.ReactNode; w?: number }> = ({ label, state, p, children, w = 520 }) => {
  const col = state === "ok" ? BRAND.hex : state === "warn" ? C.warn : C.line;
  return (
    <div style={{ width: w, height: 112, boxSizing: "border-box", borderRadius: 28, background: C.surface, border: `3px solid ${col}`, boxShadow: state === "ok" ? `0 0 30px ${brandAlpha(0.25)}` : "0 24px 60px rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 26px", opacity: Math.min(1, p * 1.5), transform: `scale(${mix(0.7, 1, Math.min(1, p))})`, fontFamily: F.sans }}>
      <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 32, letterSpacing: "0.08em", color: C.text }}>{label}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>{children}</div>
    </div>
  );
};
