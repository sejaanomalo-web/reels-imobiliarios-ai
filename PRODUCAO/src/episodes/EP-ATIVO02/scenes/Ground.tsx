import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { IconX, OpeningHead, Phone } from "./ui";

/**
 * CENA 3b — ABERTURA 4: OBJEÇÃO. "Quarto, responda a uma objeção específica: 'Precisa evitar escadas no dia a dia? Vamos conhecer
 * a circulação desta casa.' Não invente distâncias nem soluções que o imóvel não oferece."
 * Escada riscada → planta térrea ilustrativa com um percurso andando pelos ambientes; duas promessas inventadas aparecem e são riscadas.
 */
const PX = 240;
const PY = 380;
const PW = 600;
const PH = 890;
const PLAN = { x: 40, y: 200, w: 486, h: 520 };
const WALLS = [
  `M40 200 H526 V720 H40 Z`,
  `M40 420 H230`,
  `M300 420 H526`,
  `M260 200 V340`,
  `M260 560 V720`,
  `M400 420 V720`,
];
// percurso: entrada → sala → corredor → quarto → cozinha
const WALK: [number, number][] = [
  [140, 700],
  [140, 520],
  [265, 470],
  [330, 300],
  [450, 300],
  [450, 560],
  [470, 660],
];
const at = (k: number): [number, number] => {
  const n = WALK.length - 1;
  const f = Math.max(0, Math.min(0.9999, k)) * n;
  const i = Math.floor(f);
  const r = f - i;
  return [mix(WALK[i][0], WALK[i + 1][0], r), mix(WALK[i][1], WALK[i + 1][1], r)];
};

const Stairs: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
    <path d="M10 110 H40 V85 H65 V60 H90 V35 H112" stroke={C.text} strokeWidth={8} strokeLinejoin="round" strokeLinecap="round" />
  </svg>
);

const FAKES = [
  { k: "“a 2 min do metrô”", cue: "o_nodist", y: 560, x: 150 },
  { k: "“rampa de acesso”", cue: "o_nosol", y: 700, x: 230 },
];

export const Ground: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const head = sp(t, c.o_fourth - 0.1, { damping: 14, stiffness: 170 });
  const phone = sp(t, c.o_fourth + 0.1, { damping: 15, stiffness: 140 });
  const title = sp(t, c.o_avoid - 0.1, { damping: 12, stiffness: 200 });
  const stairs = sp(t, c.o_avoid - 0.1, { damping: 13, stiffness: 180 });
  const cross = sp(t, c.o_stairs + 0.25, { damping: 10, stiffness: 230 });
  const swap = prog(t, c.o_circ - 0.45, 0.5, ease.inOut);
  const plan = prog(t, c.o_circ - 0.2, 0.8, ease.inOut);
  const walk = prog(t, c.o_circ + 0.1, 2.4, ease.inOut);
  const fakes = FAKES.map((f) => sp(t, c[f.cue] - 0.1, { damping: 12, stiffness: 200 }));
  const strike = FAKES.map((f, i) => prog(t, c.o_noffer - 0.1 + i * 0.15, 0.35, ease.out));
  const label = sp(t, c.o_noffer + 0.1, { damping: 12, stiffness: 200 });
  const exit = prog(t, c.m_fifth - 0.35, 0.35, ease.in);
  const [wx, wy] = at(walk);
  const trail = Array.from({ length: 24 }).map((_, i) => at(walk - i * 0.012));

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - exit }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.o_fourth - 0.2, s: 0.94, y: 60, r: -1.5 },
          { t: c.o_obj, s: 1.0, y: 20, r: 0, e: ease.inOut },
          { t: c.o_stairs + 0.4, s: 1.08, y: 80, e: ease.inOut },
          { t: c.o_circ + 0.6, s: 1.02, y: 0, e: ease.inOut },
          { t: c.o_nosol + 0.3, s: 1.0, y: -20, e: ease.inOut },
          { t: c.m_fifth, s: 1.05, y: 0, e: ease.inOut },
        ]}
      >
        <OpeningHead n={4} p={head} t={t} />
        <div style={{ position: "absolute", inset: 0, opacity: Math.min(1, phone * 1.5), transform: `translateY(${(1 - Math.min(1, phone)) * 200}px)` }}>
          <Phone x={PX} y={PY} w={PW} h={PH} t={t} t0={c.o_avoid} dur={4}>
            {/* escada riscada */}
            <div style={{ position: "absolute", left: 0, right: 0, top: 260, display: "flex", justifyContent: "center", opacity: Math.min(1, stairs * 1.5) * (1 - swap), transform: `scale(${mix(0.6, 1, Math.min(1, stairs)) * mix(1, 0.6, swap)})` }}>
              <div style={{ position: "relative" }}>
                <Stairs size={300} />
                <svg width={300} height={300} style={{ position: "absolute", inset: 0 }}>
                  <path d="M40 40 L260 260" stroke={C.warn} strokeWidth={16} strokeLinecap="round" strokeDasharray={`${312 * Math.min(1, cross)} 400`} />
                </svg>
              </div>
            </div>
            {/* planta térrea ilustrativa */}
            <svg width={566} height={856} style={{ position: "absolute", inset: 0, opacity: plan }}>
              {WALLS.map((d, i) => (
                <path key={i} d={d} fill="none" stroke="#7C8796" strokeWidth={5} strokeDasharray={`${1800 * plan} 2000`} />
              ))}
              <rect x={PLAN.x} y={PLAN.y} width={PLAN.w} height={PLAN.h} fill="rgba(53,224,161,0.04)" />
              {trail.map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r={7 - i * 0.22} fill={C.accent} opacity={walk > 0 ? 0.55 * (1 - i / 24) : 0} />
              ))}
              {walk > 0 ? <circle cx={wx} cy={wy} r={16} fill={C.accent} stroke={C.accentInk} strokeWidth={4} /> : null}
            </svg>
            {[
              { k: "SALA", x: 60, y: 440 },
              { k: "QUARTO", x: 280, y: 214 },
              { k: "COZINHA", x: 416, y: 440 },
              { k: "SUÍTE", x: 60, y: 214 },
            ].map((l) => (
              <div key={l.k} style={{ position: "absolute", left: l.x, top: l.y, fontFamily: F.mono, fontWeight: 700, fontSize: 22, color: C.muted, opacity: plan }}>{l.k}</div>
            ))}
            <div style={{ position: "absolute", left: 0, right: 0, top: 740, display: "flex", justifyContent: "center", opacity: plan }}>
              <span style={{ padding: "6px 18px", borderRadius: 18, background: C.surface3, fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.text, letterSpacing: "0.06em" }}>CASA TÉRREA · ILUSTRATIVA</span>
            </div>
            {/* texto do vídeo */}
            <div style={{ position: "absolute", left: 30, right: 30, top: 80, textAlign: "center", fontWeight: 800, fontSize: 38, letterSpacing: "-0.02em", color: C.text, opacity: Math.min(1, title * 1.5), transform: `scale(${mix(1.3, 1, Math.min(1, title))})` }}>
              PRECISA EVITAR ESCADAS?
            </div>
          </Phone>
        </div>
        {/* promessas inventadas → riscadas */}
        {FAKES.map((f, i) => {
          const a = fakes[i];
          if (a <= 0) return null;
          return (
            <div key={f.k} style={{ position: "absolute", left: f.x, top: f.y, zIndex: 40, opacity: Math.min(1, a * 1.5), transform: `rotate(${i ? 3 : -3}deg) scale(${mix(0.6, 1, Math.min(1.05, a))})` }}>
              <div style={{ position: "relative", padding: "16px 30px", borderRadius: 30, background: "rgba(29,33,40,0.97)", border: `2px solid ${strike[i] > 0.5 ? C.warn : C.line}`, boxShadow: "0 24px 60px rgba(0,0,0,0.6)", fontWeight: 800, fontSize: 44, color: strike[i] > 0.5 ? C.muted : C.text, whiteSpace: "nowrap" }}>
                {f.k}
                <div style={{ position: "absolute", left: 20, top: "50%", height: 6, width: `calc(${strike[i] * 100}% - 40px)`, background: C.warn, borderRadius: 3 }} />
              </div>
            </div>
          );
        })}
        {label > 0 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 860, zIndex: 41, display: "flex", justifyContent: "center", opacity: Math.min(1, label * 1.5), transform: `scale(${mix(1.6, 1, Math.min(1, label))})` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 34px", borderRadius: 34, border: `5px solid ${C.warn}`, background: "rgba(36,14,13,0.96)" }}>
              <IconX size={48} />
              <span style={{ fontWeight: 800, fontSize: 56, color: C.warn, letterSpacing: "-0.02em" }}>NÃO INVENTE</span>
            </div>
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
