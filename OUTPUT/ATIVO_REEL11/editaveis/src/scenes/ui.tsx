import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";

/** Peças do ATIVO REEL11 (desenhos próprios; sem valores, percentuais ou promessa de renda). */
export { CheckDot, IconChat, IconPlane, IconUser, Label, Mark, People, Question, Tag } from "../../EP-ATIVO-CASE01/scenes/ui";
export { Chip } from "../../EP-ATIVO-REEL10/scenes/ui";
export { Month } from "../../EP-ATIVO-REEL08/scenes/ui";

/** Negociações e prospecção (lista do fecho; vira o módulo IMÓVEIS na CTA). */
export const STEPS = [
  { k: "NEGOCIAÇÕES POR ETAPA", sub: "quem está em cada fase" },
  { k: "PRÓXIMOS RETORNOS", sub: "quando falar com cada um" },
  { k: "ROTINA DE PROSPECÇÃO", sub: "o mínimo da semana" },
];

/** Reservatório: level 0…1, inflow/outflow 0…1 (intensidade das correntes), t para animar a água. */
export const Tank: React.FC<{ w: number; h: number; level: number; inflow: number; outflow: number; t: number; glow?: number }> = ({ w, h, level, inflow, outflow, t, glow = 0 }) => {
  const lv = Math.max(0, Math.min(1, level));
  const wave = (k: number) => `M0 ${12 + Math.sin(t * 2 + k) * 6} Q ${w * 0.25} ${Math.sin(t * 2.4 + k) * 10} ${w * 0.5} ${12 + Math.sin(t * 2.1 + k + 1) * 6} T ${w} ${12 + Math.sin(t * 2.3 + k) * 6} V 40 H 0 Z`;
  return (
    <div style={{ position: "relative", width: w + 160, height: h + 140, fontFamily: F.sans }}>
      {/* entrada */}
      <div style={{ position: "absolute", left: 40, top: 0, width: 120, height: 34, borderRadius: 10, background: C.surface3 }} />
      <div style={{ position: "absolute", left: 130, top: 34, width: 30 * inflow + 4, height: h * (1 - lv) + 60, marginLeft: -(30 * inflow) / 2, borderRadius: 10, background: brandAlpha(0.75 * inflow), opacity: inflow > 0.02 ? 1 : 0 }} />
      {/* tanque */}
      <div style={{ position: "absolute", left: 80, top: 60, width: w, height: h, borderRadius: "20px 20px 40px 40px", border: `6px solid ${glow > 0.5 ? BRAND.hex : C.muted}`, borderTop: "none", overflow: "hidden", background: "rgba(255,255,255,0.03)", boxShadow: glow > 0.5 ? `0 0 40px ${brandAlpha(0.3)}` : "none" }}>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: `${lv * 100}%`, background: `linear-gradient(180deg, ${brandAlpha(0.55)}, ${BRAND.deep})` }}>
          <svg width={w} height={40} style={{ position: "absolute", left: 0, top: -24 }}><path d={wave(0)} fill={brandAlpha(0.55)} /></svg>
        </div>
        {[0.25, 0.5, 0.75].map((m) => <div key={m} style={{ position: "absolute", right: 0, bottom: `${m * 100}%`, width: 30, height: 4, background: C.dim }} />)}
      </div>
      {/* saída */}
      <div style={{ position: "absolute", left: 80 + w, top: 60 + h - 50, width: 90, height: 30, borderRadius: 8, background: C.surface3 }} />
      <div style={{ position: "absolute", left: 80 + w + 70, top: 60 + h - 20, width: 10 + 14 * outflow, height: 100, borderRadius: 8, background: `rgba(255,107,94,${0.6 * outflow})` }} />
    </div>
  );
};
