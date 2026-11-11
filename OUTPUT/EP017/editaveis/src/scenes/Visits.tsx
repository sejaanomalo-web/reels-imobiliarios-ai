import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { MapArt, Pin } from "../../../components/Art";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Tag, Verdict } from "./ui";

/**
 * CENA 02 — SITUAÇÃO. "O cliente gostou da planta, mas achou a rua movimentada. Ou adorou a localização e percebeu que precisa de mais espaço."
 * Duas cenas ilustrativas, cada uma dividida em "gostou" × "não serviu": planta × trânsito na rua; localização × mesa de jantar apertada.
 */
const CARD = { x: 70, w: 940, h: 420 };
const HALF = 430;

const Half: React.FC<{ x: number; children: React.ReactNode }> = ({ x, children }) => (
  <div style={{ position: "absolute", left: x, top: 78, width: HALF, height: 310, borderRadius: 26, overflow: "hidden", background: C.surface2 }}>{children}</div>
);

const Plan: React.FC<{ p: number }> = ({ p }) => {
  const len = 1800;
  return (
    <svg width={HALF} height={310} viewBox="0 0 430 310">
      <path d="M40 40H390V270H40Z M40 150H200 M200 40V270 M200 190H390 M300 190V270 M120 150V270" fill="none" stroke={C.cold} strokeWidth={6} strokeLinejoin="round" strokeDasharray={`${len * p} ${len}`} />
      <text x="80" y="105" fill={C.muted} fontFamily="JetBrains Mono" fontSize="18" opacity={p}>SALA</text>
      <text x="250" y="125" fill={C.muted} fontFamily="JetBrains Mono" fontSize="18" opacity={p}>QUARTO</text>
      <text x="215" y="240" fill={C.muted} fontFamily="JetBrains Mono" fontSize="18" opacity={p}>QTO 2</text>
    </svg>
  );
};

const Street: React.FC<{ t: number; busy: number }> = ({ t, busy }) => {
  const cars = [0, 1, 2, 3, 4, 5];
  return (
    <svg width={HALF} height={310} viewBox="0 0 430 310">
      {[20, 110, 220, 320].map((x, i) => (
        <rect key={i} x={x} y={30 + (i % 2) * 20} width={80} height={130 - (i % 2) * 20} rx={6} fill="#262B33" />
      ))}
      <rect x={0} y={170} width={430} height={110} fill="#1A1D22" />
      <path d="M0 225H430" stroke="#5A606B" strokeWidth={4} strokeDasharray="22 18" />
      {cars.map((k) => {
        const dir = k % 2 === 0 ? 1 : -1;
        const speed = mix(60, 260, busy);
        const x = (((t * speed * dir + k * 150) % 600) + 600) % 600 - 90;
        return <rect key={k} x={x} y={dir > 0 ? 182 : 236} width={78} height={32} rx={10} fill={[C.warn, C.cold, "#C3C8D0"][k % 3]} opacity={k < 3 + Math.round(busy * 3) ? 0.9 : 0} />;
      })}
    </svg>
  );
};

const Dining: React.FC<{ squeeze: number }> = ({ squeeze }) => {
  const w = mix(330, 250, squeeze);
  const x0 = (HALF - w) / 2;
  return (
    <svg width={HALF} height={310} viewBox="0 0 430 310">
      <rect x={x0} y={45} width={w} height={220} rx={8} fill="none" stroke={C.cold} strokeWidth={6} />
      <rect x={x0 + w / 2 - 70} y={115} width={140} height={80} rx={10} fill="#3A3F48" />
      {[[-1, 0], [0, 0], [1, 0], [-1, 1], [0, 1], [1, 1]].map(([i, j], k) => (
        <rect key={k} x={x0 + w / 2 - 18 + i * 48} y={j ? 205 : 73} width={36} height={32} rx={8} fill="#5A606B" />
      ))}
      <rect x={x0 + w / 2 - 110} y={140} width={30} height={30} rx={8} fill="#5A606B" />
      <rect x={x0 + w / 2 + 80} y={140} width={30} height={30} rx={8} fill="#5A606B" />
      {squeeze > 0.05 ? (
        <>
          <path d={`M${x0 - 34} 155H${x0 - 6}M${x0 - 16} 145L${x0 - 6} 155L${x0 - 16} 165`} stroke={C.warn} strokeWidth={4} fill="none" opacity={squeeze} />
          <path d={`M${x0 + w + 34} 155H${x0 + w + 6}M${x0 + w + 16} 145L${x0 + w + 6} 155L${x0 + w + 16} 165`} stroke={C.warn} strokeWidth={4} fill="none" opacity={squeeze} />
        </>
      ) : null}
    </svg>
  );
};

export const Visits: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const inA = sp(t, c.sit_a - 0.05, { damping: 16, stiffness: 130 });
  const inB = sp(t, c.sit_b - 0.1, { damping: 16, stiffness: 130 });
  const plan = prog(t, c.sit_a + 0.1, 1.3, ease.inOut);
  const okPlan = sp(t, c.sit_plan + 0.35, { damping: 12, stiffness: 190 });
  const busy = prog(t, c.sit_street, 0.8, ease.inOut);
  const noStreet = sp(t, c.sit_street + 0.5, { damping: 12, stiffness: 190 });
  const pin = sp(t, c.sit_loc + 0.3, { damping: 9, stiffness: 190 });
  const okLoc = sp(t, c.sit_loc + 0.55, { damping: 12, stiffness: 190 });
  const squeeze = prog(t, c.sit_space - 0.3, 0.7, ease.inOut);
  const noSpace = sp(t, c.sit_space + 0.4, { damping: 12, stiffness: 190 });
  const exit = prog(t, c.ten_error - 0.15, 0.45, ease.in);

  const card = (y: number, enter: number, label: string, children: React.ReactNode) => (
    <div style={{ position: "absolute", left: CARD.x, top: y, width: CARD.w, height: CARD.h, borderRadius: 40, background: C.surface, border: `1px solid ${C.line}`, boxShadow: "0 40px 100px rgba(0,0,0,0.5)", opacity: Math.min(1, enter * 1.5), transform: `translateY(${(1 - Math.min(1, enter)) * 140}px) scale(${mix(0.92, 1, Math.min(1, enter))})`, fontFamily: F.sans }}>
      <div style={{ position: "absolute", left: 30, top: 24, display: "flex", gap: 14, alignItems: "center" }}>
        <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, letterSpacing: "0.1em", color: C.muted }}>{label}</span>
        <Tag text="ILUSTRATIVA" tone="muted" size={16} />
      </div>
      {children}
    </div>
  );

  return (
    <div style={{ position: "absolute", inset: 0, opacity: 1 - exit }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.sit_a, s: 0.94, y: -60 },
          { t: c.sit_plan + 0.2, s: 1.05, y: -200, e: ease.inOut },
          { t: c.sit_street + 0.5, s: 1.06, y: -190, x: 10, e: ease.inOut },
          { t: c.sit_b + 0.4, s: 1.05, y: 10, x: 0, e: ease.inOut },
          { t: c.sit_space + 0.6, s: 1.04, y: -40, e: ease.inOut },
          { t: c.ten_error + 0.3, s: 0.94, y: -40, e: ease.in },
        ]}
      >
        {card(
          260,
          inA,
          "VISITA 1",
          <>
            <Half x={30}>
              <Plan p={plan} />
            </Half>
            <Half x={480}>
              <Street t={t} busy={busy} />
            </Half>
            <div style={{ position: "absolute", left: 30, top: 300, width: HALF, display: "flex", justifyContent: "center" }}>
              <Verdict ok text="Gostou da planta" p={okPlan} size={28} />
            </div>
            <div style={{ position: "absolute", left: 480, top: 300, width: HALF, display: "flex", justifyContent: "center" }}>
              <Verdict ok={false} text="Rua movimentada" p={noStreet} size={28} />
            </div>
          </>,
        )}
        {card(
          730,
          inB,
          "VISITA 2",
          <>
            <Half x={30}>
              <div style={{ position: "absolute", inset: 0 }}>
                <MapArt w={HALF} h={310} />
              </div>
              <div style={{ position: "absolute", left: 190, top: 90, opacity: Math.min(1, pin * 3), transform: `translateY(${(1 - Math.min(1, pin)) * -90}px)`, filter: "drop-shadow(0 10px 10px rgba(0,0,0,0.5))" }}>
                <Pin size={60} />
              </div>
            </Half>
            <Half x={480}>
              <Dining squeeze={squeeze} />
            </Half>
            <div style={{ position: "absolute", left: 30, top: 300, width: HALF, display: "flex", justifyContent: "center" }}>
              <Verdict ok text="Adorou a localização" p={okLoc} size={26} />
            </div>
            <div style={{ position: "absolute", left: 480, top: 300, width: HALF, display: "flex", justifyContent: "center" }}>
              <Verdict ok={false} text="Precisa de mais espaço" p={noSpace} size={26} />
            </div>
          </>,
        )}
      </Camera>
    </div>
  );
};
