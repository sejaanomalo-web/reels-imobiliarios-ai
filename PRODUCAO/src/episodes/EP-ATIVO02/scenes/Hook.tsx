import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { House } from "../../../components/Art";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { IconPause } from "./ui";

/**
 * CENA 1 — GANCHO. "Se seus vídeos de imóveis sempre começam com 'olha essa oportunidade', você está desperdiçando os segundos
 * mais importantes da apresentação. O comprador ainda não sabe por que deveria continuar assistindo."
 * Cinco vídeos genéricos entram com a mesma frase; os primeiros 3 s de cada um ficam marcados como desperdiçados; um cursor
 * pausa um a um; tela escura: O QUE TEM A VER COMIGO?
 */
const TILES = [
  { x: 70, y: 330 },
  { x: 400, y: 330 },
  { x: 730, y: 330 },
  { x: 235, y: 800 },
  { x: 565, y: 800 },
];
const TW = 280;
const TH = 440;
const TINT = ["#2A3A4A", "#3A2F2A", "#2A3A33", "#33293A", "#3A3A2A"];

const Cursor: React.FC<{ press: number }> = ({ press }) => (
  <svg width={70} height={84} viewBox="0 0 24 29" style={{ transform: `scale(${1 - 0.15 * press})`, transformOrigin: "10% 10%", filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.6))" }}>
    <path d="M2 2l19 11.5-8.2 1.6 4.9 9.6-3.4 1.7-4.9-9.6L3.6 22z" fill={C.text} stroke={C.ink} strokeWidth={1.4} strokeLinejoin="round" />
  </svg>
);

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const tiles = TILES.map((_, i) => sp(t, c.h_videos - 0.35 + i * 0.12, { damping: 14, stiffness: 170 }));
  const say = TILES.map((_, i) => sp(t, c.h_olha - 0.1 + i * 0.09, { damping: 11, stiffness: 220 }));
  const waste = prog(t, c.h_waste, 1.2, ease.inOut);
  const wasteTag = sp(t, c.h_seconds, { damping: 13, stiffness: 190 });
  const pauseAt = TILES.map((_, i) => c.h_buyer - 0.45 + i * 0.2);
  const paused = pauseAt.map((s) => sp(t, s + 0.05, { damping: 12, stiffness: 240 }));
  const dark = prog(t, c.h_notknow - 0.15, 0.5, ease.inOut);
  const q = sp(t, c.h_notknow, { damping: 13, stiffness: 160 });
  const exit = prog(t, c.r_first - 0.35, 0.35, ease.in);

  // trajeto do cursor: entra pela direita e passa pelos cinco "pause"
  const pts = TILES.map((p) => ({ x: p.x + TW / 2 - 10, y: p.y + TH / 2 - 10 }));
  const curStart = pauseAt[0] - 0.45;
  let cx = 1100;
  let cy = 1100;
  if (t >= curStart) {
    if (t < pauseAt[0]) {
      const k = ease.inOut(Math.min(1, (t - curStart) / 0.45));
      cx = mix(1100, pts[0].x, k);
      cy = mix(1150, pts[0].y, k);
    } else {
      const i = Math.min(TILES.length - 1, Math.floor((t - pauseAt[0]) / 0.2));
      const j = Math.min(TILES.length - 1, i + 1);
      const k = ease.inOut(Math.min(1, ((t - pauseAt[0]) % 0.2) / 0.2));
      cx = i === j ? pts[i].x : mix(pts[i].x, pts[j].x, k);
      cy = i === j ? pts[i].y : mix(pts[i].y, pts[j].y, k);
    }
  }
  const press = TILES.reduce((m, _, i) => Math.max(m, Math.sin(Math.PI * prog(t, pauseAt[i] - 0.04, 0.14, ease.linear))), 0);
  const curOp = prog(t, curStart, 0.2, ease.out) * (1 - prog(t, c.h_notknow, 0.3, ease.in));

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - exit }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: 0, s: 1.14, y: -40, r: -1.5 },
          { t: c.h_olha + 0.3, s: 1.02, y: 0, r: 0, e: ease.inOut },
          { t: c.h_seconds + 0.4, s: 1.06, y: -30, e: ease.inOut },
          { t: c.h_buyer, s: 1.0, y: 0, e: ease.inOut },
          { t: c.h_notknow + 0.6, s: 1.08, y: 0, e: ease.inOut },
          { t: c.r_first, s: 1.12, y: 0, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", inset: 0, opacity: mix(1, 0.12, dark), filter: `blur(${dark * 6}px)` }}>
          {TILES.map((p, i) => {
            const a = Math.min(1, tiles[i]);
            const run = paused[i] > 0.5 ? Math.max(0, pauseAt[i] - (c.h_videos + i * 0.12)) : Math.max(0, t - (c.h_videos + i * 0.12));
            const fill = Math.min(1, run / 9);
            const gray = Math.min(1, paused[i]);
            return (
              <div key={i} style={{ position: "absolute", left: p.x, top: p.y, width: TW, height: TH, boxSizing: "border-box", borderRadius: 40, padding: 8, background: "#0B0D10", border: `2px solid ${C.surface3}`, opacity: Math.min(1, a * 1.5), transform: `translateY(${(1 - a) * 160}px) scale(${mix(0.7, 1, a)}) rotate(${(i % 2 ? 1 : -1) * (1 - a) * 8}deg)`, boxShadow: "0 30px 70px rgba(0,0,0,0.55)" }}>
                <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 32, overflow: "hidden", background: `linear-gradient(180deg, ${TINT[i]}, #0F1216)`, filter: `grayscale(${gray}) brightness(${mix(1, 0.6, gray)})` }}>
                  <div style={{ position: "absolute", left: 20, top: 150, transform: `scale(${1.06 + 0.04 * Math.sin(t * 1.3 + i)})` }}>
                    <House w={230} h={200} />
                  </div>
                  {/* barra de progresso: os 3 primeiros segundos marcados */}
                  <div style={{ position: "absolute", left: 16, right: 16, top: 16, height: 8, borderRadius: 4, background: "rgba(255,255,255,0.2)", overflow: "hidden" }}>
                    <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${fill * 100}%`, background: C.text }} />
                    <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${33 * waste}%`, background: C.warn }} />
                  </div>
                  {/* a mesma frase em todos */}
                  <div style={{ position: "absolute", left: 14, right: 14, top: 64, textAlign: "center", fontWeight: 800, fontSize: 29, lineHeight: 1.02, letterSpacing: "-0.02em", color: C.text, textShadow: "0 4px 18px rgba(0,0,0,0.8)", opacity: Math.min(1, say[i] * 1.5), transform: `scale(${mix(1.4, 1, Math.min(1, say[i]))})` }}>
                    OLHA ESSA<br />OPORTUNIDADE!
                  </div>
                  {/* pausado */}
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: `rgba(0,0,0,${0.35 * gray})`, opacity: Math.min(1, paused[i] * 1.5) }}>
                    <div style={{ width: 110, height: 110, borderRadius: 55, background: "rgba(20,22,26,0.85)", display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${mix(0.4, 1, Math.min(1.1, paused[i]))})` }}>
                      <IconPause size={56} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {wasteTag > 0 ? (
            <div style={{ position: "absolute", left: 0, right: 0, top: 1262, display: "flex", justifyContent: "center", opacity: Math.min(1, wasteTag * 1.5) * (1 - prog(t, c.h_buyer - 0.3, 0.3, ease.in)), transform: `scale(${mix(0.6, 1, Math.min(1, wasteTag))})` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 26px", borderRadius: 30, background: "rgba(58,24,22,0.95)", border: `2px solid ${C.warn}` }}>
                <div style={{ width: 70, height: 12, borderRadius: 6, background: C.warn }} />
                <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 32, color: C.warn, letterSpacing: "0.04em" }}>0–3 s DESPERDIÇADOS</span>
              </div>
            </div>
          ) : null}
        </div>

        {/* O QUE TEM A VER COMIGO? */}
        {q > 0 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 560, textAlign: "center", fontWeight: 800, fontSize: 112, lineHeight: 0.98, letterSpacing: "-0.045em", color: C.text, opacity: Math.min(1, q * 1.5), transform: `translateY(${(1 - Math.min(1, q)) * 50}px) scale(${mix(0.92, 1, Math.min(1, q))})` }}>
            O QUE TEM
            <br />A VER <span style={{ color: C.accent }}>COMIGO?</span>
          </div>
        ) : null}
        {curOp > 0 ? (
          <div style={{ position: "absolute", left: cx, top: cy, opacity: curOp, zIndex: 50 }}>
            <Cursor press={press} />
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
