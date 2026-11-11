import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Tag, barH } from "./ui";

/**
 * CENA 02 — SITUAÇÃO. "Áudio é ótimo para transmitir proximidade, mas detalhes como endereço, horário e documentação
 * ficam difíceis de consultar depois."
 * A onda vira blocos de fala com calor (proximidade). Três informações saltam dos blocos — endereço, horário,
 * documentação (dados fictícios) — e, quando os blocos se apagam, elas caem para fora do quadro.
 */
const INFO = [
  { k: "ENDEREÇO", v: "Rua das Acácias, 120", cue: "sit_addr", x: 90, r: -6 },
  { k: "HORÁRIO", v: "sábado, 10h", cue: "sit_time", x: 380, r: 4 },
  { k: "DOCUMENTAÇÃO", v: "RG e comprovante", cue: "sit_docs", x: 640, r: -3 },
];
const BLOCKS = 6;

export const Details: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.sit_audio - 0.1, { damping: 16, stiffness: 140 });
  const warm = prog(t, c.sit_close, 0.6, ease.out);
  const warmTag = sp(t, c.sit_close + 0.35, { damping: 13, stiffness: 180 });
  const fadeBlocks = prog(t, c.sit_hard - 0.1, 0.9, ease.inOut);
  const fall = prog(t, c.sit_hard + 0.1, 1.0, ease.in);
  const hard = sp(t, c.sit_later - 0.2, { damping: 13, stiffness: 180 });
  const exit = prog(t, c.ten_after - 0.1, 0.4, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.4) * (1 - exit) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.sit_audio, s: 0.96, y: 20 },
          { t: c.sit_close + 0.3, s: 1.06, y: 40, e: ease.inOut },
          { t: c.sit_details, s: 1.0, y: -20, e: ease.inOut },
          { t: c.sit_docs + 0.3, s: 1.04, y: -60, e: ease.inOut },
          { t: c.sit_hard + 0.5, s: 0.98, y: 60, e: ease.inOut },
          { t: c.ten_after + 0.3, s: 0.94, y: 40, e: ease.in },
        ]}
      >
        {/* blocos de fala */}
        {Array.from({ length: BLOCKS }).map((_, b) => {
          const bx = 70 + (b % 3) * 320;
          const by = 760 + Math.floor(b / 3) * 230;
          const gone = prog(fadeBlocks, b * 0.08, 0.5, ease.in);
          return (
            <div key={b} style={{ position: "absolute", left: bx, top: by, width: 300, height: 190, borderRadius: 30, background: `rgba(${mix(29, 58, warm)},${mix(33, 40, warm)},${mix(40, 32, warm)},1)`, border: `1px solid ${warm > 0.5 ? "rgba(255,190,120,0.35)" : C.line}`, display: "flex", alignItems: "center", gap: 5, padding: "0 22px", boxSizing: "border-box", opacity: (1 - gone), transform: `translateY(${(1 - Math.min(1, enter)) * 80}px) scale(${1 - gone * 0.2})`, filter: gone > 0.02 ? `blur(${gone * 8}px)` : undefined, boxShadow: `0 20px 50px rgba(0,0,0,0.45), 0 0 ${50 * warm}px rgba(255,180,110,${0.18 * warm})` }}>
              {Array.from({ length: 16 }).map((_, i) => {
                const h = barH(i + b * 16) * 110 * (0.8 + 0.2 * Math.sin(t * 6 + i));
                return <div key={i} style={{ width: 10, height: h, borderRadius: 3, background: warm > 0.5 ? "#F2C48D" : "rgba(195,200,208,0.6)" }} />;
              })}
            </div>
          );
        })}
        <div style={{ position: "absolute", left: 0, right: 0, top: 660, display: "flex", justifyContent: "center", opacity: Math.min(1, warmTag * 1.5) * (1 - fadeBlocks), transform: `scale(${mix(0.6, 1, Math.min(1, warmTag))})` }}>
          <Tag text="PROXIMIDADE ✓" tone="accent" size={30} />
        </div>
        {/* as três informações */}
        {INFO.map((it, i) => {
          const at = c[it.cue];
          const pop = sp(t, at - 0.05, { damping: 11, stiffness: 190 });
          const f = prog(fall, i * 0.12, 0.75, ease.in);
          return (
            <div key={it.k} style={{ position: "absolute", left: it.x, top: 400 + (i % 2) * 110, width: 330, boxSizing: "border-box", padding: "20px 24px", borderRadius: 26, background: C.paper, color: C.ink, opacity: Math.min(1, pop * 1.5) * (1 - f * 0.4), transform: `translateY(${(1 - Math.min(1, pop)) * 260 + f * f * 1500}px) rotate(${it.r + f * (i - 1) * 40}deg) scale(${mix(0.4, 1, Math.min(1, pop))})`, boxShadow: "0 24px 50px rgba(0,0,0,0.5)" }}>
              <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 20, letterSpacing: "0.1em", color: C.inkMuted }}>{it.k}</div>
              <div style={{ fontWeight: 800, fontSize: 32, marginTop: 6, letterSpacing: "-0.01em" }}>{it.v}</div>
            </div>
          );
        })}
        {/* difícil de consultar */}
        {hard > 0 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 860, display: "flex", justifyContent: "center", opacity: Math.min(1, hard * 1.5), transform: `scale(${mix(0.6, 1, Math.min(1.06, hard))}) rotate(-2deg)` }}>
            <div style={{ padding: "18px 40px", borderRadius: 30, border: `4px solid ${C.warn}`, background: "rgba(36,14,13,0.94)", fontWeight: 800, fontSize: 54, color: C.warn, textAlign: "center", lineHeight: 1.1 }}>
              difícil de consultar
              <br />
              depois
            </div>
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
