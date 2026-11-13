import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Mark, OpeningHead, Phone } from "./ui";

/**
 * CENA 2b — ABERTURA 2: CONTRASTE. "Segundo, use um contraste real: 'A fachada é discreta. O que surpreende é a distribuição dos
 * ambientes por dentro.' Só diga isso se a imagem realmente comprovar."
 * Fachada simples sobe e revela a planta ilustrativa com os ambientes acendendo; um visor de câmera enquadra e confirma.
 */
const PX = 240;
const PY = 380;
const PW = 600;
const PH = 890;
const ROOMS = [
  { k: "SALA", x: 40, y: 170, w: 300, h: 220 },
  { k: "COZINHA", x: 340, y: 170, w: 186, h: 220 },
  { k: "VARANDA", x: 40, y: 390, w: 160, h: 150 },
  { k: "LAVABO", x: 200, y: 390, w: 140, h: 150 },
  { k: "QUARTO", x: 340, y: 390, w: 186, h: 230 },
  { k: "SUÍTE", x: 40, y: 540, w: 300, h: 220 },
  { k: "BANHO", x: 340, y: 620, w: 186, h: 140 },
];

export const Facade: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const head = sp(t, c.k_second - 0.1, { damping: 14, stiffness: 170 });
  const phone = sp(t, c.k_second + 0.1, { damping: 15, stiffness: 140 });
  const fac = sp(t, c.k_second + 0.25, { damping: 14, stiffness: 150 });
  const t1 = sp(t, c.k_disc - 0.05, { damping: 12, stiffness: 200 });
  const lift = prog(t, c.k_surp - 0.1, 0.8, ease.inOut);
  const t2 = sp(t, c.k_inside - 0.05, { damping: 12, stiffness: 200 });
  const finder = sp(t, c.k_only - 0.05, { damping: 14, stiffness: 170 });
  const ok = sp(t, c.k_prove + 0.1, { damping: 11, stiffness: 210 });
  const exit = prog(t, c.l_third - 0.35, 0.35, ease.in);
  const rec = Math.floor(t * 2) % 2 === 0;

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - exit }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.k_second - 0.2, s: 0.94, y: 60, r: -1.5 },
          { t: c.k_facade, s: 1.0, y: 20, r: 0, e: ease.inOut },
          { t: c.k_disc + 0.3, s: 1.06, y: 0, e: ease.inOut },
          { t: c.k_inside + 0.4, s: 1.0, y: 30, e: ease.inOut },
          { t: c.k_prove + 0.3, s: 1.08, y: 0, e: ease.inOut },
          { t: c.l_third, s: 1.04, y: 0, e: ease.inOut },
        ]}
      >
        <OpeningHead n={2} p={head} t={t} />
        <div style={{ position: "absolute", inset: 0, opacity: Math.min(1, phone * 1.5), transform: `translateY(${(1 - Math.min(1, phone)) * 200}px)` }}>
          <Phone x={PX} y={PY} w={PW} h={PH} t={t} t0={c.k_facade} dur={5}>
            {/* planta revelada */}
            <svg width={566} height={856} style={{ position: "absolute", inset: 0, opacity: prog(lift, 0.2, 0.5, ease.linear) }}>
              {ROOMS.map((r, i) => {
                const on = prog(t, c.k_dist - 0.1 + i * 0.16, 0.35, ease.out);
                return (
                  <g key={r.k}>
                    <rect x={r.x} y={r.y} width={r.w} height={r.h} fill={`rgba(58,245,132,${0.05 + 0.13 * on})`} stroke={on > 0.5 ? C.accent : "#7C8796"} strokeWidth={on > 0.5 ? 4 : 3} />
                  </g>
                );
              })}
            </svg>
            {ROOMS.map((r, i) => {
              const on = prog(t, c.k_dist - 0.1 + i * 0.16, 0.35, ease.out);
              return (
                <div key={r.k} style={{ position: "absolute", left: r.x + 12, top: r.y + 10, fontFamily: F.mono, fontWeight: 700, fontSize: 22, letterSpacing: "0.04em", color: on > 0.5 ? C.accent : C.muted, opacity: prog(lift, 0.3, 0.5, ease.linear) }}>{r.k}</div>
              );
            })}
            {/* fachada discreta, que sobe */}
            <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, transform: `translateY(${-lift * 900}px)`, opacity: Math.min(1, fac * 1.5) * (1 - prog(lift, 0.6, 0.4, ease.linear)) }}>
              <svg width={566} height={856} style={{ position: "absolute", inset: 0 }}>
                <rect x={0} y={0} width={566} height={856} fill="#151A20" />
                <rect x={0} y={760} width={566} height={96} fill="#0E1115" />
                <rect x={70} y={250} width={426} height={510} fill="#2A3038" stroke="#3A424C" strokeWidth={3} />
                {[0, 1, 2].map((r) =>
                  [0, 1].map((k) => <rect key={`${r}${k}`} x={120 + k * 220} y={300 + r * 130} width={110} height={70} rx={4} fill={r === 1 && k === 0 ? "#FFD98A" : "#1C2128"} opacity={r === 1 && k === 0 ? 0.75 : 1} />),
                )}
                <rect x={243} y={650} width={80} height={110} rx={4} fill="#3A424C" />
              </svg>
            </div>
            {/* textos do vídeo */}
            <div style={{ position: "absolute", left: 30, right: 30, top: 80, textAlign: "center", fontWeight: 800, fontSize: 40, letterSpacing: "-0.02em", color: C.text, opacity: Math.min(1, t1 * 1.5) * (1 - lift), transform: `scale(${mix(1.3, 1, Math.min(1, t1))})` }}>
              FACHADA DISCRETA.
            </div>
            <div style={{ position: "absolute", left: 30, right: 30, top: 80, textAlign: "center", fontWeight: 800, fontSize: 40, letterSpacing: "-0.02em", color: C.accent, opacity: Math.min(1, t2 * 1.5), transform: `scale(${mix(1.3, 1, Math.min(1, t2))})` }}>
              E POR DENTRO…
            </div>
            {/* visor de câmera: só se a imagem comprovar */}
            {finder > 0 ? (
              <div style={{ position: "absolute", left: 24, top: 150, width: 518, height: 630, opacity: Math.min(1, finder * 1.5), transform: `scale(${mix(1.25, 1, Math.min(1, finder))})` }}>
                {[
                  { l: 0, t: 0, r: 0 },
                  { l: 1, t: 0, r: 90 },
                  { l: 1, t: 1, r: 180 },
                  { l: 0, t: 1, r: 270 },
                ].map((k, i) => (
                  <svg key={i} width={70} height={70} viewBox="0 0 70 70" style={{ position: "absolute", left: k.l ? 448 : 0, top: k.t ? 560 : 0, transform: `rotate(${k.r}deg)` }}>
                    <path d="M4 60V4h56" fill="none" stroke={ok > 0.5 ? C.accent : C.text} strokeWidth={7} strokeLinecap="round" />
                  </svg>
                ))}
                <div style={{ position: "absolute", left: 30, top: -2, display: "flex", alignItems: "center", gap: 8, transform: "translateY(-40px)" }}>
                  <div style={{ width: 16, height: 16, borderRadius: 8, background: C.warn, opacity: rec ? 1 : 0.3 }} />
                  <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 22, color: C.text }}>REC</span>
                </div>
              </div>
            ) : null}
            {ok > 0 ? (
              <div style={{ position: "absolute", left: 0, right: 0, top: 795, display: "flex", justifyContent: "center", opacity: Math.min(1, ok * 1.5), transform: `scale(${mix(0.6, 1, Math.min(1.05, ok))})` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 20px 8px 8px", borderRadius: 30, background: "rgba(14,58,31,0.95)", border: "2px solid rgba(58,245,132,0.5)" }}>
                  <Mark ok size={42} />
                  <span style={{ fontWeight: 800, fontSize: 30, color: C.text }}>a imagem comprova</span>
                </div>
              </div>
            ) : null}
          </Phone>
        </div>
      </Camera>
    </div>
  );
};
