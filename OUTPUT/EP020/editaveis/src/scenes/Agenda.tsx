import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, rnd, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Tag } from "./ui";

/**
 * CENA 01 — GANCHO. "Agendar toda visita que pedem pode parecer produtividade. Nem sempre é."
 * Uma agenda da semana enche de visitas até transbordar; por trás, rotas no mapa se cruzam sem parar.
 * Em "Nem sempre é." tudo trava e o carimbo aparece.
 */
const CAL = { x: 70, y: 430, w: 940, h: 800 };
const DAYS = ["SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];
const HOURS = 7;
const COLW = (CAL.w - 100) / 6;
const ROWH = (CAL.h - 90) / HOURS;
const SLOTS = Array.from({ length: 34 }).map((_, i) => ({ d: Math.floor(rnd(i * 4.1) * 6), h: Math.floor(rnd(i * 2.3 + 7) * HOURS), k: i }));
const ROUTES = Array.from({ length: 9 }).map((_, i) => {
  const a = { x: rnd(i * 3.3) * 1080, y: 300 + rnd(i * 5.1) * 1100 };
  const b = { x: rnd(i * 7.7 + 1) * 1080, y: 300 + rnd(i * 1.9 + 3) * 1100 };
  return `M${a.x} ${a.y} C ${a.x} ${(a.y + b.y) / 2}, ${b.x} ${(a.y + b.y) / 2}, ${b.x} ${b.y}`;
});

export const Agenda: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const freeze = c.hook_not;
  const tt = Math.min(t, freeze);
  const fillT = (i: number) => (i < 8 ? -1 + i * 0.1 : mix(0.1, freeze - 0.2, Math.pow((i - 8) / (SLOTS.length - 8), 0.8)));
  const prodW = sp(t, c.hook_prod - 0.05, { damping: 13, stiffness: 170 });
  const stamp = sp(t, c.hook_not, { damping: 11, stiffness: 230 });
  const dim = prog(t, c.hook_not, 0.4, ease.out);
  const exit = prog(t, c.sit_lead - 0.1, 0.45, ease.in);
  const over = SLOTS.filter((_, i) => tt > fillT(i)).length;

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - exit }}>
      {/* rotas que se cruzam (fundo) */}
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, opacity: mix(0.55, 0.25, dim) }}>
        {ROUTES.map((d, i) => {
          const p = prog(tt, i * 0.25 - 0.3, 1.4, ease.inOut);
          return <path key={i} d={d} fill="none" stroke={i % 3 === 0 ? C.warn : C.cold} strokeWidth={4} strokeDasharray={`${2000 * p} 2400`} strokeLinecap="round" opacity={0.6} />;
        })}
      </svg>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: 0, s: 1.06, y: -60, rx: 8 },
          { t: c.hook_prod, s: 1.0, y: 60, rx: 4, e: ease.inOut },
          { t: c.hook_not + 0.3, s: 1.03, y: 20, rx: 0, e: ease.out },
          { t: c.sit_lead + 0.4, s: 0.92, y: 0, e: ease.in },
        ]}
      >
        {/* PRODUTIVIDADE */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 270, textAlign: "center", fontWeight: 800, fontSize: 112, letterSpacing: "-0.045em", color: C.text, opacity: Math.min(1, prodW * 1.6) * mix(1, 0.45, dim), transform: `scale(${mix(1.3, 1, Math.min(1, prodW))})` }}>
          “PRODUTIVIDADE”
        </div>
        {/* agenda da semana */}
        <div style={{ position: "absolute", left: CAL.x, top: CAL.y, width: CAL.w, height: CAL.h, borderRadius: 40, background: "rgba(21,24,29,0.94)", border: `1px solid ${C.line}`, boxShadow: "0 50px 110px rgba(0,0,0,0.6)" }}>
          <div style={{ position: "absolute", left: 100, right: 0, top: 26, display: "flex" }}>
            {DAYS.map((d) => (
              <div key={d} style={{ width: COLW, textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 22, letterSpacing: "0.08em", color: C.muted }}>{d}</div>
            ))}
          </div>
          {Array.from({ length: HOURS }).map((_, h) => (
            <div key={h} style={{ position: "absolute", left: 26, top: 80 + h * ROWH, fontFamily: F.mono, fontWeight: 700, fontSize: 20, color: C.dim }}>{9 + h * 1}h</div>
          ))}
          {Array.from({ length: HOURS + 1 }).map((_, h) => (
            <div key={h} style={{ position: "absolute", left: 90, right: 20, top: 74 + h * ROWH, height: 1, background: C.lineSoft }} />
          ))}
          {SLOTS.map((s, i) => {
            const a = sp(t, fillT(i), { damping: 12, stiffness: 220 });
            if (a <= 0) return null;
            const x = 100 + s.d * COLW + 6 + (s.k % 2) * 8;
            const y = 80 + s.h * ROWH + (s.k % 3) * 6;
            return (
              <div key={i} style={{ position: "absolute", left: x, top: y, width: COLW - 14, height: ROWH - 12, borderRadius: 14, background: i % 5 === 0 ? "rgba(255,107,94,0.85)" : "rgba(143,180,227,0.85)", opacity: Math.min(1, a * 2) * mix(1, 0.6, dim), transform: `scale(${mix(0.4, 1, Math.min(1, a))})`, boxShadow: "0 6px 14px rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 17, color: C.ink }}>
                visita
              </div>
            );
          })}
          {/* transborda */}
          <div style={{ position: "absolute", right: 26, bottom: -34, opacity: over > 18 ? 1 : 0 }}>
            <Tag text={`+${Math.max(0, over - 18)} VISITAS`} tone="warn" size={24} style={{ background: "rgba(36,14,13,0.95)" }} />
          </div>
        </div>
        {/* Nem sempre é. */}
        {stamp > 0 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 720, display: "flex", justifyContent: "center" }}>
            <div style={{ padding: "20px 54px", borderRadius: 36, border: `7px solid ${C.warn}`, background: "rgba(36,14,13,0.95)", color: C.warn, fontWeight: 800, fontSize: 118, letterSpacing: "-0.03em", transform: `rotate(-5deg) scale(${mix(2.1, 1, Math.min(1, stamp))})`, opacity: Math.min(1, stamp * 2), boxShadow: "0 30px 90px rgba(0,0,0,0.6)" }}>
              NEM SEMPRE.
            </div>
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
