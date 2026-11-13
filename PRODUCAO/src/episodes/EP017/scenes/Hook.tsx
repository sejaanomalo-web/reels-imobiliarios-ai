import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Avatar } from "../../../components/Art";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { IconLens, LEAD, Tag } from "./ui";

/**
 * CENA 01 — GANCHO. "Às vezes, a visita que não virou proposta trouxe a informação mais valiosa da semana."
 * A porta do apartamento fecha; o carimbo NÃO cai sobre a visita e gira até virar PISTA.
 */
const DOOR = { x: 330, y: 250, w: 420, h: 640 };

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const close = prog(t, c.hook_door + 0.1, 0.6, ease.in);
  const bounce = Math.sin(Math.PI * prog(t, c.hook_door + 0.7, 0.25, ease.linear)) * 3;
  const doorAngle = mix(-72, 0, close) + bounce;
  const card = sp(t, c.hook_door + 0.35, { damping: 16, stiffness: 140 });
  const stamp = sp(t, c.hook_no + 0.45, { damping: 12, stiffness: 230 });
  const flip = prog(t, c.hook_clue - 0.05, 0.5, ease.inOut);
  const value = sp(t, c.hook_value, { damping: 12, stiffness: 170 });
  const exit = prog(t, c.sit_a - 0.1, 0.45, ease.in);
  const light = 1 - close;
  const showNo = flip < 0.5;
  const rotX = showNo ? flip * 180 : (flip - 1) * 180;
  const ring = ((t - c.hook_value) % 1.6 + 1.6) % 1.6 / 1.6;

  return (
    <div style={{ position: "absolute", inset: 0, opacity: 1 - exit }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: 0, s: 1.22, y: -150, ry: -6 },
          { t: c.hook_door + 0.7, s: 1.08, y: -70, ry: 0, e: ease.inOut },
          { t: c.hook_no + 0.6, s: 1.0, y: 30, e: ease.inOut },
          { t: c.hook_value + 0.4, s: 1.04, y: 50, e: ease.inOut },
          { t: c.sit_a + 0.4, s: 0.9, y: 40, e: ease.in },
        ]}
      >
        {/* parede e batente */}
        <div style={{ position: "absolute", left: DOOR.x - 40, top: DOOR.y - 40, width: DOOR.w + 80, height: DOOR.h + 40, borderRadius: "28px 28px 0 0", background: "#1A1E24", border: `1px solid ${C.line}`, boxShadow: "0 50px 110px rgba(0,0,0,0.55)" }} />
        {/* interior (visto pela fresta) */}
        <div style={{ position: "absolute", left: DOOR.x, top: DOOR.y, width: DOOR.w, height: DOOR.h, borderRadius: "10px 10px 0 0", overflow: "hidden", background: `linear-gradient(180deg, rgba(255,214,150,${0.35 * light}) 0%, rgba(255,190,120,${0.12 * light}) 60%, #0B0D10 100%)` }}>
          <div style={{ position: "absolute", left: 60, right: 60, bottom: 0, height: 120, background: `rgba(255,220,170,${0.12 * light})`, transform: "perspective(400px) rotateX(60deg)" }} />
        </div>
        {/* porta */}
        <div style={{ position: "absolute", left: DOOR.x, top: DOOR.y, width: DOOR.w, height: DOOR.h, perspective: 1400 }}>
          <div style={{ position: "absolute", inset: 0, transformOrigin: "0 50%", transform: `rotateY(${doorAngle}deg)`, borderRadius: "10px 10px 0 0", background: "linear-gradient(90deg, #2B3038 0%, #262A31 100%)", border: "2px solid rgba(255,255,255,0.08)", boxShadow: "inset 0 0 0 18px rgba(255,255,255,0.025)" }}>
            <div style={{ position: "absolute", left: 50, right: 50, top: 60, height: 230, borderRadius: 10, border: "2px solid rgba(255,255,255,0.07)" }} />
            <div style={{ position: "absolute", left: 50, right: 50, top: 330, height: 250, borderRadius: 10, border: "2px solid rgba(255,255,255,0.07)" }} />
            <div style={{ position: "absolute", right: 40, top: 330, width: 18, height: 70, borderRadius: 9, background: "#9BA3AE" }} />
            <div style={{ position: "absolute", left: "50%", top: 120, transform: "translateX(-50%)", fontFamily: F.mono, fontWeight: 700, fontSize: 30, color: "#9BA3AE", letterSpacing: "0.1em" }}>APTO</div>
          </div>
        </div>
        <div style={{ position: "absolute", left: DOOR.x - 60, top: DOOR.y + DOOR.h, width: DOOR.w + 120, height: 10, borderRadius: 5, background: "#2A2F37" }} />

        {/* cartão da visita */}
        <div style={{ position: "absolute", left: 110, top: 960, width: 860, height: 200, boxSizing: "border-box", borderRadius: 40, background: C.surface2, border: `1px solid ${C.line}`, display: "flex", alignItems: "center", gap: 26, padding: "0 36px", fontFamily: F.sans, opacity: Math.min(1, card * 1.5), transform: `translateY(${(1 - Math.min(1, card)) * 120}px)`, boxShadow: "0 40px 90px rgba(0,0,0,0.55)" }}>
          <Avatar size={100} label={LEAD.ini} bg={LEAD.bg} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, fontSize: 44, color: C.text }}>Visita · {LEAD.name}</div>
            <div style={{ fontWeight: 600, fontSize: 28, color: C.muted, marginTop: 6 }}>apartamento 2 quartos · sábado</div>
          </div>
          <Tag text="SEM PROPOSTA" tone="muted" size={20} />
        </div>

        {/* carimbo NÃO → PISTA */}
        {stamp > 0 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 690, display: "flex", justifyContent: "center", perspective: 1200 }}>
            {!showNo && value > 0
              ? [0, 1].map((k) => {
                  const r = (ring + k * 0.5) % 1;
                  return <div key={k} style={{ position: "absolute", top: 20 - r * 50, width: 520 + r * 140, height: 200 + r * 100, borderRadius: 50 + r * 40, border: `3px solid ${C.accent}`, opacity: (1 - r) * 0.35 }} />;
                })
              : null}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
                padding: "26px 54px",
                borderRadius: 40,
                border: `8px solid ${showNo ? C.warn : C.accent}`,
                background: showNo ? "rgba(36,14,13,0.92)" : "rgba(9,40,22,0.94)",
                color: showNo ? C.warn : C.accent,
                fontFamily: F.sans,
                fontWeight: 800,
                fontSize: 150,
                lineHeight: 1,
                letterSpacing: "-0.03em",
                transform: `rotate(${showNo ? -7 : -3}deg) rotateX(${rotX}deg) scale(${mix(2.2, 1, Math.min(1, stamp)) * (showNo ? 1 : 1 + 0.06 * Math.min(1, value))})`,
                opacity: Math.min(1, stamp * 2),
                boxShadow: showNo ? "0 30px 80px rgba(0,0,0,0.6)" : `0 30px 80px rgba(0,0,0,0.6), 0 0 ${120 * Math.min(1, value)}px rgba(58,245,132,0.35)`,
              }}
            >
              {showNo ? "NÃO" : (
                <>
                  <IconLens size={130} />
                  PISTA
                </>
              )}
            </div>
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
