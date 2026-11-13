import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Pin } from "../../../components/Art";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Chapter, Mark, PATHS, Tag } from "./ui";

/**
 * CENA 3 — A CARTEIRA. "O segundo conhece profundamente uma carteira específica. Sabe explicar a planta, a localização, as restrições
 * e para quem cada imóvel faz sentido. Nesse caso, a comunicação começa no produto e encontra o público compatível."
 * Edifício abstrato em camadas (isométrico); camadas de informação saem dele no tempo de cada termo; perfis de comprador se
 * ligam ao imóvel e o compatível acende — IMÓVEL → PERFIL IDEAL.
 */
const BX = 540;
const BY = 860;
const FLOORS = 7;

const Building: React.FC<{ p: number; glow: number; t: number }> = ({ p, glow, t }) => (
  <svg width={420} height={620} viewBox="-210 -560 420 620" style={{ position: "absolute", left: BX - 210, top: BY - 560 }}>
    {Array.from({ length: FLOORS }).map((_, i) => {
      const a = Math.max(0, Math.min(1, p * FLOORS - i));
      if (a <= 0) return null;
      const y = -i * 66 - (1 - a) * 40;
      const lit = 0.25 + 0.5 * Math.max(0, Math.sin(t * 2 + i));
      return (
        <g key={i} opacity={a} transform={`translate(0 ${y})`}>
          <path d="M0 -40 L150 0 L0 40 L-150 0 Z" fill="#2A3038" stroke={`rgba(143,180,227,${0.35 + 0.4 * glow})`} strokeWidth={2} />
          <path d="M-150 0 L0 40 L0 66 L-150 26 Z" fill="#1C2026" />
          <path d="M150 0 L0 40 L0 66 L150 26 Z" fill="#23282F" />
          {[0, 1, 2].map((k) => <rect key={k} x={-130 + k * 40} y={16 + k * 6} width={22} height={12} fill={`rgba(232,210,122,${lit * (k === i % 3 ? 1 : 0.4)})`} transform="skewY(15)" />)}
        </g>
      );
    })}
  </svg>
);

const LAYERS = [
  { k: "PLANTA", v: "3 quartos · 1 suíte", cue: "p_plan", x: 70, y: 380 },
  { k: "LOCALIZAÇÃO", v: "perto do metrô", cue: "p_loc", x: 700, y: 430 },
  { k: "RESTRIÇÕES", v: "regras do condomínio", cue: "p_rest", x: 70, y: 690 },
];
const PROFILES = [
  { k: "investidor", x: 80, fit: false },
  { k: "casal jovem", x: 395, fit: true },
  { k: "família grande", x: 710, fit: false },
];

export const Portfolio: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const col = PATHS[1].color;
  const chap = sp(t, c.p_second - 0.05, { damping: 14, stiffness: 170 });
  const build = prog(t, c.p_second + 0.3, 1.8, ease.out);
  const prof = PROFILES.map((_, i) => sp(t, c.p_sense - 0.2 + i * 0.15, { damping: 13, stiffness: 180 }));
  const lines = prog(t, c.p_sense, 0.8, ease.inOut);
  const label = sp(t, c.p_product - 0.1, { damping: 13, stiffness: 180 });
  const fit = sp(t, c.p_public - 0.05, { damping: 11, stiffness: 200 });
  const exit = prog(t, c.o_start - 0.45, 0.35, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - exit }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.p_second, s: 1.1, y: -80, ry: -10, r: -1.5 },
          { t: c.p_second + 1.6, s: 1.06, y: -20, x: 0, ry: 8, r: 1, e: ease.inOut },
          { t: c.p_plan, s: 1.04, y: -40, x: 30, ry: 6, r: 0, e: ease.inOut },
          { t: c.p_loc + 0.4, s: 1.04, y: -20, x: 0, ry: -6, e: ease.inOut },
          { t: c.p_rest + 0.6, s: 1.0, y: 0, x: 0, ry: 3, e: ease.inOut },
          { t: c.p_public + 0.5, s: 1.04, y: 80, ry: 0, e: ease.inOut },
          { t: c.o_start + 0.3, s: 0.94, y: 40, e: ease.in },
        ]}
      >
        <div style={{ position: "absolute", left: 70, top: 270 }}>
          <Chapter n={2} text="A PARTIR DA CARTEIRA" p={chap} color={col} />
        </div>
        <Building p={build} glow={Math.min(1, fit)} t={t} />
        {/* scanner: o corretor "lê" o imóvel andar por andar */}
        {build > 0.9 ? (
          <div style={{ position: "absolute", left: BX - 190, width: 380, top: BY - 40 - ((((t - c.p_plan) * 0.55) % 1 + 1) % 1) * 470, height: 6, borderRadius: 3, background: `linear-gradient(90deg, transparent, ${col}, transparent)`, boxShadow: `0 0 30px ${col}`, opacity: 0.7 * (1 - Math.min(1, fit)) * Math.min(1, (t - c.p_second - 2) * 2) }} />
        ) : null}
        {/* camadas de informação */}
        {LAYERS.map((l) => {
          const a = sp(t, c[l.cue] - 0.05, { damping: 13, stiffness: 190 });
          if (a <= 0) return null;
          const fromX = BX - 150;
          return (
            <div key={l.k} style={{ position: "absolute", left: mix(fromX, l.x, Math.min(1, a)), top: l.y + Math.sin(t * 1.6 + l.y) * 8, width: 310, boxSizing: "border-box", borderRadius: 24, background: "rgba(21,24,29,0.95)", border: `2px solid ${col}88`, padding: "14px 18px", opacity: Math.min(1, a * 1.5), transform: `scale(${mix(0.4, 1, Math.min(1, a))})`, boxShadow: "0 20px 50px rgba(0,0,0,0.5)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {l.k === "LOCALIZAÇÃO" ? <Pin size={30} color={col} /> : <Mark ok size={30} />}
                <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.06em", color: col }}>{l.k}</span>
              </div>
              <div style={{ fontWeight: 800, fontSize: 30, color: C.text, marginTop: 6 }}>{l.v}</div>
            </div>
          );
        })}
        <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {LAYERS.map((l, i) => {
            const a = prog(t, c[l.cue] + 0.1, 0.5, ease.out);
            const sx = l.x < BX ? l.x + 310 : l.x;
            const sy = l.y + 50 + Math.sin(t * 1.6 + l.y) * 8;
            const ty = BY - 120 - i * 110;
            return <path key={l.k} d={`M${sx} ${sy} L${BX + (l.x < BX ? -60 : 60)} ${ty}`} stroke={col} strokeWidth={3} strokeDasharray="10 8" strokeDashoffset={-t * 40} opacity={0.6 * a * (1 - Math.min(1, fit))} />;
          })}
        </svg>
        {/* para quem faz sentido */}
        <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {PROFILES.map((p, i) => (
            <path key={p.k} d={`M${BX} ${BY + 70} C ${BX} ${BY + 150}, ${p.x + 140} ${BY + 120}, ${p.x + 140} ${BY + 210}`} fill="none" stroke={p.fit && fit > 0.5 ? col : C.dim} strokeWidth={p.fit && fit > 0.5 ? 6 : 3} strokeDasharray={`${300 * lines} 400`} opacity={p.fit ? 1 : mix(1, 0.4, Math.min(1, fit))} />
          ))}
        </svg>
        {PROFILES.map((p, i) => (
          <div key={p.k} style={{ position: "absolute", left: p.x, top: BY + 210, width: 280, height: 90, boxSizing: "border-box", borderRadius: 26, background: p.fit && fit > 0.5 ? col : C.surface2, border: `2px solid ${p.fit ? col : C.line}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 32, color: p.fit && fit > 0.5 ? C.ink : C.text, opacity: Math.min(1, prof[i] * 1.5) * (p.fit ? 1 : mix(1, 0.45, Math.min(1, fit))), transform: `scale(${mix(0.6, 1, Math.min(1, prof[i])) * (p.fit ? 1 + 0.06 * Math.min(1, fit) : 1)})` }}>
            {p.k}
          </div>
        ))}
        {label > 0 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: BY + 330, display: "flex", justifyContent: "center", opacity: Math.min(1, label * 1.5), transform: `translateY(${(1 - Math.min(1, label)) * 20}px)` }}>
            <Tag text="IMÓVEL → PERFIL IDEAL" tone="accent" size={32} style={{ color: col, background: "rgba(23,33,45,0.95)" }} />
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
