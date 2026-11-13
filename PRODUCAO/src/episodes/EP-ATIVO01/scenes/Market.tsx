import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, rnd, sp } from "../../../lib/anim";
import { Avatar, House, MapArt, Pin } from "../../../components/Art";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { PATHS } from "./ui";

/**
 * CENA 1 — GANCHO. "Dois corretores podem trabalhar na mesma cidade, anunciar imóveis parecidos e, ainda assim, precisar de
 * estratégias completamente diferentes. O problema começa quando eles tentam fazer exatamente a mesma coisa."
 * Dois perfis estilizados entram lado a lado num mapa urbano; anúncios parecidos aparecem; três caminhos luminosos se abrem —
 * MESMO MERCADO. ESTRATÉGIAS DIFERENTES. No fim, os dois forçam o mesmo caminho e colidem; corte no último termo.
 */
const BRK = [
  { name: "Corretor 1", ini: "1", bg: "#4E6A8C", x: 150 },
  { name: "Corretor 2", ini: "2", bg: "#8C6A4E", x: 600 },
];
const ROADS = [
  { x1: -10, y1: 124, x2: 610, y2: 96, v: 2.2 },
  { x1: -10, y1: 70, x2: 610, y2: 30, v: 1.6 },
  { x1: -10, y1: 180, x2: 610, y2: 150, v: 1.8 },
  { x1: 250, y1: -10, x2: 300, y2: 250, v: 2.4 },
  { x1: 120, y1: -10, x2: 170, y2: 250, v: 1.5 },
  { x1: 380, y1: -10, x2: 420, y2: 250, v: 1.9 },
];
const ORIGIN = { x: 540, y: 1000 };
const ENDS = [{ x: 170, y: 640 }, { x: 540, y: 600 }, { x: 910, y: 640 }];

export const Market: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const map = sp(t, -0.4, { damping: 16, stiffness: 120 });
  const pins = Array.from({ length: 8 }).map((_, i) => sp(t, c.h_city - 0.2 + i * 0.07, { damping: 9, stiffness: 200 }));
  const brokers = [0, 1].map((i) => sp(t, c.h_two - 0.2 + i * 0.15, { damping: 14, stiffness: 160 }));
  const ads = [0, 1].map((i) => sp(t, c.h_ads - 0.3 + i * 0.12, { damping: 13, stiffness: 190 }));
  const eq = sp(t, c.h_ads + 0.25, { damping: 12, stiffness: 200 });
  const paths = prog(t, c.h_paths - 0.1, 1.0, ease.inOut);
  const t1 = sp(t, c.h_paths, { damping: 14, stiffness: 170 });
  const t2 = sp(t, c.h_diff, { damping: 13, stiffness: 180 });
  const same = prog(t, c.h_prob + 0.2, 1.6, ease.inOut);
  const crash = sp(t, c.h_same - 0.15, { damping: 9, stiffness: 240 });
  const cut = prog(t, c.h_same + 0.62, 0.25, ease.in);
  const shake = crash > 0 ? Math.sin((t - c.h_same + 0.15) * 50) * 12 * Math.max(0, 1 - (t - c.h_same + 0.15) / 0.4) : 0;
  const pathsUp = 1 - prog(t, c.h_prob, 0.4, ease.out) * 0.6;

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - cut }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: 0, s: 1.2, y: -90, rx: 14, r: -2 },
          { t: c.h_ads + 0.4, s: 1.04, y: -40, rx: 6, r: 0, e: ease.inOut },
          { t: c.h_paths + 0.6, s: 0.98, y: 40, rx: 0, e: ease.inOut },
          { t: c.h_prob + 0.6, s: 1.04, y: 40, e: ease.inOut },
          { t: c.h_same + 0.3, s: 1.06, y: 60, e: ease.inOut },
        ]}
      >
        {/* mapa urbano */}
        <div style={{ position: "absolute", left: 40, top: 280, width: 1000, height: 960, borderRadius: 50, overflow: "hidden", opacity: Math.min(1, map * 1.5) * 0.85, transform: `translateX(${shake}px)`, border: `1px solid ${C.line}` }}>
          <div style={{ position: "absolute", inset: 0, transform: `translate(${mix(-110, 30, prog(t, 0, 11.5, ease.inOut))}px, ${mix(30, -20, prog(t, 0, 11.5, ease.inOut))}px) scale(${mix(1.28, 1.1, prog(t, 0, 4, ease.out))})` }}>
            <MapArt w={1000} h={960} />
            {/* tráfego: a cidade está viva antes de qualquer texto */}
            <svg width={1000} height={960} viewBox="0 0 600 240" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0 }}>
              {ROADS.flatMap((r, ri) =>
                Array.from({ length: 4 }).map((_, k) => {
                  const u = (((t * r.v) / 10 + k / 4 + ri * 0.13) % 1 + 1) % 1;
                  const back = k % 2 === 1;
                  const uu = back ? 1 - u : u;
                  const x = mix(r.x1, r.x2, uu);
                  const y = mix(r.y1, r.y2, uu);
                  return <circle key={`${ri}-${k}`} cx={x} cy={y + (back ? 3 : -3)} r={2.6} fill={back ? "#E8B86A" : "#EAF6F1"} opacity={0.75} />;
                }),
              )}
            </svg>
          </div>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(7,8,10,0.2), rgba(7,8,10,0.75))" }} />
          {pins.map((p, i) => (
            <div key={i} style={{ position: "absolute", left: 60 + rnd(i * 3.3) * 860, top: 80 + rnd(i * 7.1 + 1) * 560, opacity: Math.min(1, p * 3) * 0.8, transform: `translateY(${(1 - Math.min(1, p)) * -60}px)` }}>
              <div style={{ position: "absolute", left: 20, top: 46, width: 0, height: 0 }}>
                <div style={{ position: "absolute", left: -30, top: -12, width: 60, height: 24, borderRadius: "50%", border: `2px solid ${i % 2 ? C.cold : C.accent}`, opacity: p > 0.5 ? 0.6 * (1 - (((t * 0.8 + i * 0.29) % 1))) : 0, transform: `scale(${0.4 + ((t * 0.8 + i * 0.29) % 1) * 1.2})` }} />
              </div>
              <Pin size={40} color={i % 2 ? C.cold : C.accent} />
            </div>
          ))}
        </div>
        {/* três caminhos luminosos */}
        <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: pathsUp }}>
          {ENDS.map((e, i) => {
            const d = `M${ORIGIN.x} ${ORIGIN.y} C ${ORIGIN.x} ${ORIGIN.y - 180}, ${e.x} ${e.y + 200}, ${e.x} ${e.y}`;
            return (
              <g key={i}>
                <path d={d} fill="none" stroke={PATHS[i].color} strokeWidth={16} opacity={0.18 * paths} strokeLinecap="round" />
                <path d={d} fill="none" stroke={PATHS[i].color} strokeWidth={6} strokeLinecap="round" strokeDasharray={`${700 * paths} 800`} />
              </g>
            );
          })}
          {/* os dois forçam o mesmo caminho */}
          {same > 0
            ? [0, 1].map((i) => {
                const sx = i === 0 ? 300 : 780;
                const d = `M${sx} 470 C ${sx} 640, 540 600, 540 ${mix(760, 640, same)}`;
                return <path key={i} d={d} fill="none" stroke={C.warn} strokeWidth={8} strokeLinecap="round" strokeDasharray={`${520 * same} 600`} />;
              })
            : null}
        </svg>
        {/* corretores */}
        {BRK.map((b, i) => {
          const p = brokers[i];
          return (
            <div key={b.name} style={{ position: "absolute", left: b.x, top: 300, width: 330, opacity: Math.min(1, p * 1.5), transform: `translateX(${(1 - Math.min(1, p)) * (i === 0 ? -200 : 200)}px) translateX(${i === 0 ? shake : -shake}px)` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", borderRadius: 28, background: "rgba(21,24,29,0.95)", border: `1px solid ${C.line}`, boxShadow: "0 24px 60px rgba(0,0,0,0.5)" }}>
                <Avatar size={68} label={b.ini} bg={b.bg} />
                <span style={{ fontWeight: 800, fontSize: 34, color: C.text }}>{b.name}</span>
              </div>
              {/* anúncio parecido */}
              <div style={{ marginTop: 18, width: 330, borderRadius: 24, overflow: "hidden", background: C.surface, border: `1px solid ${C.line}`, opacity: Math.min(1, ads[i] * 1.5) * mix(1, 0.5, paths), transform: `scale(${mix(0.6, 1, Math.min(1, ads[i]))})`, transformOrigin: "50% 0" }}>
                <div style={{ height: 120, background: C.surface2, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
                  <House w={150} h={110} />
                </div>
                <div style={{ padding: "12px 18px", fontWeight: 800, fontSize: 26, color: C.text }}>Apto 2 quartos · Centro</div>
              </div>
            </div>
          );
        })}
        {eq > 0 ? (
          <div style={{ position: "absolute", left: 495, top: 560, fontWeight: 800, fontSize: 90, color: C.muted, opacity: Math.min(1, eq * 1.5) * mix(1, 0, paths) }}>=</div>
        ) : null}
        {/* MESMO MERCADO. ESTRATÉGIAS DIFERENTES. */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 1040, textAlign: "center", fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1.0 }}>
          <div style={{ fontSize: 76, color: C.text, opacity: Math.min(1, t1 * 1.5) * (1 - prog(t, c.h_prob, 0.4, ease.in)), transform: `translateY(${(1 - Math.min(1, t1)) * 30}px)` }}>MESMO MERCADO.</div>
          <div style={{ fontSize: 76, color: C.accent, opacity: Math.min(1, t2 * 1.5) * (1 - prog(t, c.h_prob, 0.4, ease.in)), transform: `translateY(${(1 - Math.min(1, t2)) * 30}px)`, marginTop: 10 }}>ESTRATÉGIAS DIFERENTES.</div>
        </div>
        {crash > 0 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 1060, display: "flex", justifyContent: "center", opacity: Math.min(1, crash * 2) }}>
            <div style={{ padding: "16px 40px", borderRadius: 32, border: `6px solid ${C.warn}`, background: "rgba(36,14,13,0.95)", fontWeight: 800, fontSize: 68, color: C.warn, transform: `rotate(-4deg) scale(${mix(1.6, 1, Math.min(1, crash))})` }}>A MESMA COISA</div>
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
