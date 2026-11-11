import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { House, MapArt, Pin } from "../../../components/Art";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { IconUser, Tag } from "./ui";

/**
 * CENA 02 — SITUAÇÃO. "Um interessado quer conhecer o apartamento, mas ainda não sabe se precisa de três quartos
 * ou se aquele valor cabe no planejamento."
 * O mapa leva o interessado a um apartamento de dois quartos; a necessidade fica em dúvida (o 3º quarto pisca
 * tracejado) e o ponteiro do planejamento não para.
 */
const MAP = { x: 70, y: 280, w: 940, h: 500 };

export const Doubt: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.sit_lead - 0.05, { damping: 16, stiffness: 140 });
  const route = prog(t, c.sit_apt - 0.2, 0.9, ease.inOut);
  const apt = sp(t, c.sit_apt + 0.45, { damping: 11, stiffness: 190 });
  const rooms = sp(t, c.sit_three - 0.2, { damping: 14, stiffness: 160 });
  const budget = sp(t, c.sit_value - 0.1, { damping: 14, stiffness: 160 });
  const blink = 0.35 + 0.65 * Math.max(0, Math.sin((t - c.sit_three) * 6));
  const needle = Math.sin((t - c.sit_value) * 3.2) * 55 * Math.min(1, budget);
  const exit = prog(t, c.ten_before - 0.1, 0.45, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.4) * (1 - exit) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.sit_lead, s: 1.08, y: -260 },
          { t: c.sit_apt + 0.6, s: 1.04, y: -220, x: 40, e: ease.inOut },
          { t: c.sit_three, s: 1.04, y: 60, x: -30, e: ease.inOut },
          { t: c.sit_value + 0.3, s: 1.04, y: 60, x: 30, e: ease.inOut },
          { t: c.ten_before + 0.3, s: 0.95, y: 0, e: ease.in },
        ]}
      >
        {/* mapa: interessado → apartamento */}
        <div style={{ position: "absolute", left: MAP.x, top: MAP.y, width: MAP.w, height: MAP.h, borderRadius: 44, overflow: "hidden", border: `1px solid ${C.line}`, boxShadow: "0 40px 100px rgba(0,0,0,0.55)", transform: `translateY(${(1 - Math.min(1, enter)) * 100}px)` }}>
          <MapArt w={MAP.w} h={MAP.h} />
          <svg width={MAP.w} height={MAP.h} style={{ position: "absolute", inset: 0 }}>
            <path d="M150 380 C 300 380, 320 160, 520 170 S 760 160, 790 140" fill="none" stroke={C.accent} strokeWidth={8} strokeLinecap="round" strokeDasharray={`${900 * route} 1000`} />
          </svg>
          <div style={{ position: "absolute", left: 96, top: 320, width: 110, height: 110, borderRadius: 55, background: C.surface2, border: `3px solid ${C.accent}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <IconUser size={64} />
          </div>
          <div style={{ position: "absolute", left: 80, top: 444 }}>
            <Tag text="INTERESSADO" tone="accent" size={20} style={{ background: "rgba(5,38,27,0.9)" }} />
          </div>
          <div style={{ position: "absolute", left: 762, top: 60, opacity: Math.min(1, apt * 3), transform: `translateY(${(1 - Math.min(1, apt)) * -80}px)`, filter: "drop-shadow(0 10px 10px rgba(0,0,0,0.5))" }}>
            <Pin size={60} />
          </div>
          <div style={{ position: "absolute", left: 24, top: 22 }}>
            <Tag text="MAPA ILUSTRATIVO" tone="muted" size={18} />
          </div>
        </div>
        {/* o apartamento */}
        <div style={{ position: "absolute", left: 610, top: 470, width: 360, height: 270, borderRadius: 30, overflow: "hidden", background: C.surface, border: `2px solid ${C.line}`, opacity: Math.min(1, apt * 1.5), transform: `scale(${mix(0.6, 1, Math.min(1, apt))})`, boxShadow: "0 30px 70px rgba(0,0,0,0.6)" }}>
          <div style={{ height: 150, background: C.surface2, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
            <House w={190} h={130} />
          </div>
          <div style={{ padding: "16px 22px" }}>
            <div style={{ fontWeight: 800, fontSize: 34, color: C.text }}>Apartamento</div>
            <div style={{ fontWeight: 700, fontSize: 28, color: C.muted, marginTop: 4 }}>2 quartos</div>
          </div>
        </div>
        {/* dúvida 1: três quartos? */}
        <div style={{ position: "absolute", left: 70, top: 830, width: 450, height: 380, boxSizing: "border-box", borderRadius: 36, background: C.surface, border: `2px dashed ${C.warn}`, padding: "28px 30px", opacity: Math.min(1, rooms * 1.5), transform: `translateY(${(1 - Math.min(1, rooms)) * 100}px)` }}>
          <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 22, letterSpacing: "0.1em", color: C.warn }}>NÃO SABE AINDA</div>
          <div style={{ fontWeight: 800, fontSize: 54, color: C.text, marginTop: 6 }}>3 quartos<span style={{ color: C.warn }}>?</span></div>
          <div style={{ display: "flex", gap: 18, marginTop: 34 }}>
            {[0, 1, 2].map((k) => (
              <div key={k} style={{ width: 110, height: 120, borderRadius: 18, background: k < 2 ? "rgba(143,180,227,0.2)" : "transparent", border: k < 2 ? `3px solid ${C.cold}` : `3px dashed ${C.warn}`, opacity: k < 2 ? 1 : blink, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 22, color: k < 2 ? C.cold : C.warn }}>
                {k < 2 ? `Q${k + 1}` : "Q3?"}
              </div>
            ))}
          </div>
        </div>
        {/* dúvida 2: cabe no planejamento? */}
        <div style={{ position: "absolute", left: 560, top: 830, width: 450, height: 380, boxSizing: "border-box", borderRadius: 36, background: C.surface, border: `2px dashed ${C.warn}`, padding: "28px 30px", opacity: Math.min(1, budget * 1.5), transform: `translateY(${(1 - Math.min(1, budget)) * 100}px)` }}>
          <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 22, letterSpacing: "0.1em", color: C.warn }}>NÃO SABE AINDA</div>
          <div style={{ fontWeight: 800, fontSize: 44, lineHeight: 1.05, color: C.text, marginTop: 6 }}>o valor cabe no planejamento<span style={{ color: C.warn }}>?</span></div>
          <svg width={390} height={150} viewBox="0 0 390 150" style={{ marginTop: 6 }}>
            <path d="M75 140 A120 120 0 0 1 315 140" fill="none" stroke={C.surface3} strokeWidth={18} strokeLinecap="round" />
            <path d="M75 140 A120 120 0 0 1 195 20" fill="none" stroke="rgba(53,224,161,0.5)" strokeWidth={18} strokeLinecap="round" />
            <path d="M195 20 A120 120 0 0 1 315 140" fill="none" stroke="rgba(255,107,94,0.5)" strokeWidth={18} strokeLinecap="round" />
            <g transform={`rotate(${needle} 195 140)`}>
              <path d="M195 140 L195 45" stroke={C.text} strokeWidth={7} strokeLinecap="round" />
            </g>
            <circle cx={195} cy={140} r={12} fill={C.text} />
          </svg>
        </div>
      </Camera>
    </div>
  );
};
