import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { House, IconLink } from "../../../components/Art";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";

/**
 * CENA 01 — GANCHO. "Vinte links enviados não são vinte argumentos de venda."
 * Uma esteira veloz de miniaturas; o contador sobe até 20 LINKS. Em "não são" a esteira trava
 * e surge "≠ 20 ARGUMENTOS".
 */
const BELT = { y: 860, h: 250 };
const CARD_W = 180;
const GAP = 34;

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const stop = c.hook_not + 0.05;
  // posição da esteira: rápida até "não", depois desacelera em 0,35 s
  const v = 1500;
  const dec = prog(t, stop, 0.35, ease.out);
  const pos = t < stop ? t * v : stop * v + dec * v * 0.18;
  const count = Math.min(20, Math.max(1, Math.round(mix(3, 20, prog(t, 0.05, stop - 0.15, ease.inOut)))));
  const head = sp(t, -0.4, { damping: 15, stiffness: 160 });
  const neq = sp(t, c.hook_args - 0.1, { damping: 12, stiffness: 190 });
  const shake = Math.sin((t - stop) * 45) * 10 * Math.max(0, 1 - (t - stop) / 0.3) * (t > stop ? 1 : 0);
  const exit = prog(t, c.sit_ask - 0.1, 0.45, ease.in);
  const span = CARD_W + GAP;

  return (
    <div style={{ position: "absolute", inset: 0, opacity: 1 - exit }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: 0, s: 1.08, y: 30, r: -2 },
          { t: stop, s: 1.02, y: 10, r: -1, e: ease.inOut },
          { t: c.hook_args + 0.4, s: 1.0, y: 0, r: 0, e: ease.inOut },
          { t: c.sit_ask + 0.4, s: 0.92, y: 0, e: ease.in },
        ]}
      >
        {/* contador */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 300, textAlign: "center", fontFamily: F.sans, fontWeight: 800, fontSize: 210, lineHeight: 0.95, letterSpacing: "-0.05em", color: C.text, opacity: Math.min(1, head * 2), transform: `translateX(${shake}px) scale(${mix(1.2, 1, Math.min(1, head))})` }}>
          <span style={{ fontVariantNumeric: "tabular-nums" }}>{count}</span> LINKS
        </div>
        {/* ≠ 20 ARGUMENTOS */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 540, display: "flex", justifyContent: "center", opacity: Math.min(1, neq * 1.6), transform: `translateY(${(1 - Math.min(1, neq)) * 40}px)` }}>
          <div style={{ padding: "16px 40px", borderRadius: 30, border: `4px solid ${C.warn}`, background: "rgba(36,14,13,0.9)", fontFamily: F.sans, fontWeight: 800, fontSize: 84, letterSpacing: "-0.03em", color: C.warn }}>
            ≠ 20 ARGUMENTOS
          </div>
        </div>
        {/* esteira */}
        <div style={{ position: "absolute", left: -60, right: -60, top: BELT.y, height: BELT.h, perspective: 1600 }}>
          <div style={{ position: "absolute", inset: 0, transform: "rotateX(14deg)", transformOrigin: "50% 100%" }}>
            <div style={{ position: "absolute", left: 0, right: 0, bottom: -26, height: 40, borderRadius: 20, background: "#1A1D22", border: `1px solid ${C.line}` }}>
              {Array.from({ length: 14 }).map((_, i) => (
                <div key={i} style={{ position: "absolute", top: 8, left: ((i * 90 - pos * 0.5) % 1260 + 1260) % 1260, width: 24, height: 24, borderRadius: 12, border: "3px solid #3A3F48" }} />
              ))}
            </div>
            {Array.from({ length: 7 }).map((_, i) => {
              const loop = 7 * span;
              const raw = i * span - pos;
              const x = ((raw % loop) + loop) % loop - CARD_W + 40;
              const n = ((i + 7 * Math.floor((pos - i * span + loop) / loop)) % 20 + 1).toString().padStart(2, "0");
              const blur = t < stop ? 3 : 3 * (1 - dec);
              return (
                <div key={i} style={{ position: "absolute", left: x, top: 0, width: CARD_W, height: 220, borderRadius: 22, overflow: "hidden", background: C.surface, border: `1px solid ${C.line}`, boxShadow: "0 20px 40px rgba(0,0,0,0.5)", filter: blur > 0.3 ? `blur(${blur}px)` : undefined }}>
                  <div style={{ height: 130, background: C.surface2, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
                    <House w={140} h={110} />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "16px 14px" }}>
                    <IconLink size={30} color={C.muted} stroke={2.2} />
                    <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted }}>link {n}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Camera>
    </div>
  );
};
