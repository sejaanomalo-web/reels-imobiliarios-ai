import React from "react";
import { BRAND, C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Bubble, Pro, Sobrado, Tag } from "./ui";

/**
 * CENA 1 — GANCHO. "Dois profissionais chegam para captar o mesmo sobrado." → sobrado ilustrativo no centro desde o quadro 0; os
 * profissionais A e B caminham até ele. "Um oferece anúncio." → A: balão "Vou anunciar!". "O outro chega com um plano." → B: prancheta PLANO.
 */
export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const walk = prog(t, 0, Math.max(1.2, c.h_sobrado), ease.out);
  const a = sp(t, c.h_anuncio - 0.2, { damping: 12, stiffness: 200 });
  const b = sp(t, c.h_plano - 0.2, { damping: 12, stiffness: 200 });
  const out = prog(t, c.p_prim - 0.45, 0.4, ease.in);
  const bob = (k: number) => Math.abs(Math.sin(t * 7 + k)) * -10 * (1 - walk);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: 0, s: 1.1, x: -20, y: -40 },
          { t: 1.0, s: 1.05, x: 20, y: -20, e: ease.inOut },
          { t: c.h_sobrado, s: 1.0, y: 0, e: ease.inOut },
          { t: c.h_anuncio + 0.2, s: 1.05, x: -60, y: 20, e: ease.inOut },
          { t: c.h_plano + 0.2, s: 1.05, x: 60, y: 20, e: ease.inOut },
          { t: c.p_prim, s: 1.05, x: 60, y: 20, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: 300, top: 430, transform: `translateY(${Math.sin(t * 1.4) * 4}px)` }}><Sobrado w={480} /></div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 860, display: "flex", justifyContent: "center" }}><Tag text="SOBRADO ILUSTRATIVO" tone="muted" size={22} /></div>
        {/* A */}
        <div style={{ position: "absolute", left: mix(-60, 110, walk), top: 900 + bob(0) }}><Pro who="A" size={170} /></div>
        {a > 0.001 ? <div style={{ position: "absolute", left: 90, top: 780, opacity: Math.min(1, a * 1.5), transform: `scale(${mix(0.5, 1, Math.min(1.08, a))})`, transformOrigin: "0 100%" }}><Bubble text="Vou anunciar!" /></div> : null}
        {/* B */}
        <div style={{ position: "absolute", left: mix(1000, 800, walk), top: 900 + bob(2) }}><Pro who="B" size={170} glow={b} /></div>
        {b > 0.001 ? (
          <div style={{ position: "absolute", left: 640, top: 760, opacity: Math.min(1, b * 1.5), transform: `scale(${mix(0.5, 1, Math.min(1.08, b))}) rotate(4deg)`, transformOrigin: "100% 100%" }}>
            <div style={{ width: 200, padding: "16px 18px", borderRadius: 18, background: C.paper, border: `5px solid ${BRAND.hex}` }}>
              <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 28, color: C.ink }}>PLANO</div>
              {[0.9, 0.7, 0.8].map((w, k) => <div key={k} style={{ marginTop: 10, height: 10, width: `${w * 100}%`, borderRadius: 5, background: "#C9C5BA" }} />)}
            </div>
          </div>
        ) : null}
        <div style={{ position: "absolute", left: 0, right: 0, top: 1110, display: "flex", justifyContent: "center", gap: 120, opacity: prog(t, c.h_anuncio, 0.5, ease.out) }}>
          <Tag text="ANÚNCIO" tone="muted" size={28} style={{ color: C.text }} />
          <Tag text="PLANO" tone="accent" size={28} style={{ opacity: prog(t, c.h_plano, 0.4, ease.out) }} />
        </div>
      </Camera>
      <div style={{ position: "absolute", left: 100, right: 100, top: 285, textAlign: "center", fontWeight: 800, fontSize: 62, lineHeight: 1.04, letterSpacing: "-0.03em", color: C.text }}>
        O MESMO SOBRADO.<br /><span style={{ color: BRAND.hex }}>DUAS PROPOSTAS.</span>
      </div>
    </div>
  );
};
