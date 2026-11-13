import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { IconX, Mark, OpeningHead, Phone } from "./ui";

/**
 * CENA 2a — ABERTURA 1: ROTINA. "Primeiro, comece pela rotina: 'Trabalha em casa e não quer usar o quarto como escritório?
 * Veja como este ambiente foi dividido.'"
 * Planta ilustrativa no celular: a mesa tenta entrar no quarto (✕), volta e uma divisória cria o canto de estudo na sala (✓).
 */
const PX = 240;
const PY = 380;
const PW = 600;
const PH = 890;
// coordenadas dentro da tela do celular (566 × 856)
const Q = { x: 40, y: 150, w: 230, h: 300 };
const BAN = { x: 270, y: 150, w: 120, h: 150 };
const COZ = { x: 390, y: 150, w: 136, h: 300 };
const SALA = { x: 40, y: 450, w: 486, h: 330 };
const NOOK = { x: 40, y: 610, w: 200, h: 170 };

const Desk: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <svg width={110 * s} height={70 * s} viewBox="0 0 110 70">
    <rect x="4" y="18" width="102" height="34" rx="6" fill="#3A4350" stroke="#56606E" strokeWidth="2" />
    <rect x="34" y="4" width="42" height="24" rx="3" fill="#8FB4E3" opacity="0.85" />
    <circle cx="55" cy="62" r="8" fill="#56606E" />
  </svg>
);

export const Room: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const head = sp(t, c.r_first - 0.1, { damping: 14, stiffness: 170 });
  const phone = sp(t, c.r_first + 0.1, { damping: 15, stiffness: 140 });
  const plan = prog(t, c.r_first + 0.2, 1.3, ease.inOut);
  const title = sp(t, c.r_home - 0.05, { damping: 12, stiffness: 200 });
  const person = sp(t, c.r_home + 0.3, { damping: 12, stiffness: 190 });
  const toRoom = prog(t, c.r_quarto - 0.15, 0.55, ease.inOut);
  const no = sp(t, c.r_office + 0.15, { damping: 10, stiffness: 230 });
  const back = prog(t, c.r_veja - 0.05, 0.7, ease.inOut);
  const wall = prog(t, c.r_div - 0.35, 0.6, ease.inOut);
  const yes = sp(t, c.r_div + 0.25, { damping: 11, stiffness: 210 });
  const exit = prog(t, c.k_second - 0.35, 0.35, ease.in);

  // mesa: entra pela sala → tenta o quarto → vai para o canto de estudo
  const deskStart = { x: SALA.x + 260, y: SALA.y + 150 };
  const deskRoom = { x: Q.x + 70, y: Q.y + 200 };
  const deskNook = { x: NOOK.x + 46, y: NOOK.y + 70 };
  const dx = back > 0 ? mix(deskRoom.x, deskNook.x, back) : mix(deskStart.x, deskRoom.x, toRoom);
  const dy = back > 0 ? mix(deskRoom.y, deskNook.y, back) : mix(deskStart.y, deskRoom.y, toRoom);
  const roomRed = Math.min(1, no) * (1 - back);
  const shake = no > 0 && back === 0 ? Math.sin((t - c.r_office - 0.15) * 46) * 8 * Math.max(0, 1 - (t - c.r_office - 0.15) / 0.45) : 0;

  const wallStroke = (r: { x: number; y: number; w: number; h: number }, k: number) => (
    <rect x={r.x} y={r.y} width={r.w} height={r.h} fill="none" stroke="#7C8796" strokeWidth={5} strokeDasharray={`${(r.w + r.h) * 2 * k} 3000`} />
  );

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - exit }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.r_first - 0.2, s: 0.94, y: 60, r: 1.5 },
          { t: c.r_home, s: 1.0, y: 20, r: 0, e: ease.inOut },
          { t: c.r_office + 0.3, s: 1.06, y: 40, x: 50, e: ease.inOut },
          { t: c.r_div + 0.3, s: 1.08, y: -40, x: 20, e: ease.inOut },
          { t: c.k_second, s: 1.03, y: 0, x: 0, e: ease.inOut },
        ]}
      >
        <OpeningHead n={1} p={head} t={t} />
        <div style={{ position: "absolute", inset: 0, opacity: Math.min(1, phone * 1.5), transform: `translateY(${(1 - Math.min(1, phone)) * 200}px)` }}>
          <Phone x={PX} y={PY} w={PW} h={PH} t={t} t0={c.r_home} dur={5}>
            <svg width={566} height={856} style={{ position: "absolute", inset: 0 }}>
              {/* quarto acende em vermelho quando a mesa tenta entrar */}
              <rect x={Q.x} y={Q.y} width={Q.w} height={Q.h} fill={`rgba(255,107,94,${0.18 * roomRed})`} />
              <rect x={NOOK.x} y={NOOK.y} width={NOOK.w * wall} height={NOOK.h} fill={`rgba(53,224,161,${0.16 * Math.min(1, yes)})`} />
              {wallStroke({ x: 40, y: 150, w: 486, h: 630 }, plan)}
              {wallStroke(Q, plan)}
              {wallStroke(BAN, plan)}
              {wallStroke(COZ, plan)}
              {/* cama */}
              <g opacity={plan}>
                <rect x={Q.x + 40} y={Q.y + 30} width={150} height={190} rx={14} fill="#2C343E" stroke="#4A5562" strokeWidth={2} />
                <rect x={Q.x + 55} y={Q.y + 42} width={120} height={38} rx={10} fill="#4A5562" />
                <rect x={COZ.x + 18} y={COZ.y + 20} width={100} height={40} rx={6} fill="#262D36" />
                <rect x={SALA.x + 280} y={SALA.y + 40} width={170} height={80} rx={18} fill="#262D36" />
              </g>
              {/* divisória */}
              <path d={`M${NOOK.x + NOOK.w} ${SALA.y + SALA.h} L${NOOK.x + NOOK.w} ${NOOK.y} L${NOOK.x} ${NOOK.y}`} fill="none" stroke={C.accent} strokeWidth={7} strokeLinecap="round" strokeDasharray={`${370 * wall} 400`} opacity={wall > 0.01 ? 1 : 0} />
            </svg>
            {/* rótulos */}
            {[
              { k: "QUARTO", x: Q.x + 14, y: Q.y + Q.h - 44 },
              { k: "SALA", x: SALA.x + 300, y: SALA.y + 140 },
              { k: "COZINHA", x: COZ.x + 10, y: COZ.y + 250 },
            ].map((l) => (
              <div key={l.k} style={{ position: "absolute", left: l.x, top: l.y, fontFamily: F.mono, fontWeight: 700, fontSize: 24, letterSpacing: "0.06em", color: C.muted, opacity: plan }}>{l.k}</div>
            ))}
            <div style={{ position: "absolute", left: NOOK.x + 14, top: NOOK.y + 14, fontFamily: F.mono, fontWeight: 700, fontSize: 26, letterSpacing: "0.06em", color: C.accent, opacity: Math.min(1, yes * 1.5) }}>ESTUDO</div>
            {/* mesa */}
            <div style={{ position: "absolute", left: dx, top: dy, opacity: Math.min(1, person * 1.5), transform: `translateX(${shake}px)` }}>
              <Desk />
            </div>
            {no > 0 && back < 1 ? (
              <div style={{ position: "absolute", left: Q.x + 92, top: Q.y + 120, width: 76, height: 76, borderRadius: 38, background: "rgba(36,14,13,0.95)", border: `3px solid ${C.warn}`, display: "flex", alignItems: "center", justifyContent: "center", opacity: Math.min(1, no * 1.5) * (1 - back), transform: `scale(${mix(0.4, 1, Math.min(1.1, no))})` }}>
                <IconX size={44} />
              </div>
            ) : null}
            {/* texto de abertura do vídeo */}
            <div style={{ position: "absolute", left: 30, right: 30, top: 74, textAlign: "center", fontWeight: 800, fontSize: 40, letterSpacing: "-0.02em", color: C.text, opacity: Math.min(1, title * 1.5), transform: `scale(${mix(1.3, 1, Math.min(1, title))})` }}>
              TRABALHA EM CASA?
            </div>
            {yes > 0 ? (
              <div style={{ position: "absolute", left: 0, right: 0, top: 800, display: "flex", justifyContent: "center", opacity: Math.min(1, yes * 1.5), transform: `scale(${mix(0.6, 1, Math.min(1.05, yes))})` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 20px 8px 8px", borderRadius: 30, background: "rgba(18,58,45,0.95)", border: "2px solid rgba(53,224,161,0.5)" }}>
                  <Mark ok size={42} />
                  <span style={{ fontWeight: 800, fontSize: 30, color: C.text }}>ambiente dividido</span>
                </div>
              </div>
            ) : null}
          </Phone>
        </div>
      </Camera>
    </div>
  );
};
