import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";

/** Peças do ATIVO REEL09 (desenhos próprios; mapa, imóvel e telas ilustrativos — sem atendimento automático). */
export { CheckDot, IconChat, IconPlane, IconUser, Label, Mark, People, Question, Tag } from "../../EP-ATIVO-CASE01/scenes/ui";
export { Phone } from "../../EP-ATIVO-CASE01/scenes/ui";
export { PropCard } from "../../EP-ATIVO-REEL04/scenes/ui";

/** As três partes conectadas (lista do fecho; vira o módulo IMÓVEIS na CTA). */
export const STEPS = [
  { k: "CONTEÚDO", sub: "responde à dúvida do comprador" },
  { k: "ATENDIMENTO", sub: "pedido registrado com clareza" },
  { k: "ACOMPANHAMENTO", sub: "quando retomar a conversa" },
];

/** Mapa de bairro estilizado (quarteirões em grade); hi = índice do quarteirão em destaque, p = 0…1 do destaque. */
export const CityMap: React.FC<{ w: number; h: number; hi?: number; p?: number; t?: number }> = ({ w, h, hi = -1, p = 0, t = 0 }) => {
  const cols = 5, rows = 6, gx = w / cols, gy = h / rows;
  return (
    <div style={{ position: "relative", width: w, height: h, borderRadius: 30, overflow: "hidden", background: "#1A2027" }}>
      {Array.from({ length: cols * rows }).map((_, i) => {
        const x = (i % cols) * gx, y = Math.floor(i / cols) * gy;
        const on = i === hi;
        return (
          <div key={i} style={{ position: "absolute", left: x + 14, top: y + 14, width: gx - 28, height: gy - 28, borderRadius: 12, background: on ? `rgba(14,58,31,${0.4 + 0.6 * p})` : "#232A33", border: on && p > 0.3 ? `3px solid ${BRAND.hex}` : "3px solid transparent", boxShadow: on && p > 0.3 ? `0 0 ${30 + 10 * Math.sin(t * 3)}px ${brandAlpha(0.35)}` : "none", opacity: hi >= 0 && !on ? 1 - p * 0.7 : 1 }}>
            {[0, 1, 2].map((k) => <div key={k} style={{ position: "absolute", left: 10 + k * ((gx - 48) / 3), top: 10, width: (gx - 60) / 3, height: gy - 48, borderRadius: 6, background: on ? brandAlpha(0.18 + 0.2 * p) : "#2C343E" }} />)}
          </div>
        );
      })}
      <div style={{ position: "absolute", left: 0, right: 0, top: gy * 3 - 3, height: 6, background: "repeating-linear-gradient(90deg,#4A5562 0 18px,transparent 18px 36px)" }} />
    </div>
  );
};

/** Ficha de pedido de interessado (ilustrativa, sem dados reais). */
export const LeadCard: React.FC<{ w: number; status: string; glow?: number; children?: React.ReactNode }> = ({ w, status, glow = 0, children }) => (
  <div style={{ width: w, boxSizing: "border-box", padding: "22px 26px", borderRadius: 28, background: C.surface, border: `2px solid ${glow > 0.5 ? brandAlpha(0.7) : C.line}`, boxShadow: `0 0 ${40 * glow}px ${brandAlpha(0.25)}, 0 30px 80px rgba(0,0,0,0.6)`, fontFamily: F.sans }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, letterSpacing: "0.06em", color: C.muted }}>PEDIDO DO INTERESSADO</span>
      <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted, padding: "4px 10px", borderRadius: 10, background: C.surface3 }}>ILUSTRATIVO</span>
    </div>
    {children}
    <div style={{ marginTop: 14, display: "inline-block", padding: "8px 16px", borderRadius: 14, background: BRAND.deep, fontFamily: F.mono, fontWeight: 700, fontSize: 26, color: BRAND.hex }}>{status}</div>
  </div>
);
