import React from "react";
import { BRAND, C, F } from "../../../theme";

/** Peças do ATIVO REEL15 (desenhos próprios; sem alíquotas, valores ou orientação tributária; app de conversa genérico). */
export { CheckDot, IconChat, IconPlane, IconUser, Label, Mark, People, Question, Tag } from "../../EP-ATIVO-CASE01/scenes/ui";
export { Chip } from "../../EP-ATIVO-REEL10/scenes/ui";
export { Rule } from "../../EP-ATIVO-REEL06/scenes/ui";

/** Negociação registrada (lista do fecho; vira o módulo IMÓVEIS na CTA). */
export const STEPS = [
  { k: "QUEM PARTICIPOU", sub: "parceiros de cada negociação" },
  { k: "O QUE FOI COMBINADO", sub: "registrado na hora" },
  { k: "PRÓXIMOS PASSOS", sub: "e o que levar ao contador" },
];

/** Pasta de arquivo. */
export const Folder: React.FC<{ w: number; label: string; tone?: "plain" | "good" | "warn"; open?: number }> = ({ w, label, tone = "plain", open = 0 }) => {
  const col = tone === "good" ? BRAND.hex : tone === "warn" ? C.warn : C.muted;
  return (
    <div style={{ position: "relative", width: w, height: w * 0.72, fontFamily: F.sans }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: w * 0.42, height: w * 0.12, borderRadius: `${w * 0.04}px ${w * 0.04}px 0 0`, background: tone === "good" ? BRAND.deep : C.surface3, border: `3px solid ${col}`, borderBottom: "none" }} />
      <div style={{ position: "absolute", left: 0, top: w * 0.1, right: 0, bottom: 0, borderRadius: w * 0.05, background: tone === "good" ? BRAND.deep : C.surface2, border: `3px solid ${col}`, transform: `perspective(600px) rotateX(${-open * 25}deg)`, transformOrigin: "50% 100%", display: "flex", alignItems: "center", justifyContent: "center", padding: 10, boxSizing: "border-box" }}>
        <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: Math.max(24, w * 0.085), color: tone === "good" ? BRAND.hex : C.text, textAlign: "center", lineHeight: 1.1, whiteSpace: "pre-line" }}>{label}</span>
      </div>
    </div>
  );
};

/** Folha de papel solta. */
export const Paper: React.FC<{ w: number; label?: string }> = ({ w, label }) => (
  <div style={{ width: w, height: w * 1.3, boxSizing: "border-box", padding: w * 0.1, borderRadius: 8, background: C.paper, boxShadow: "0 12px 30px rgba(0,0,0,0.5)" }}>
    {label ? <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: Math.max(24, w * 0.13), color: C.ink, marginBottom: 6 }}>{label}</div> : null}
    {[0.9, 0.7, 0.8, 0.6].map((x, k) => <div key={k} style={{ marginTop: w * 0.07, height: w * 0.05, width: `${x * 100}%`, borderRadius: 4, background: "#C9C5BA" }} />)}
  </div>
);
