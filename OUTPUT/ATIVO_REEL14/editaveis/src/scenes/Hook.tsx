import React from "react";
import { BRAND, C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Bubble, Pro, SPECS, SpecCard, Tag } from "./ui";

/**
 * CENA 1 — GANCHO. "Um profissional sabia cada detalhe do apartamento." → profissional A cercado de cartões da ficha (desde o quadro 0).
 * "O outro fez uma pergunta." → B com um único balão "?". "A segunda abordagem mudou toda a conversa." → o lado de B acende.
 */
export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const cards = SPECS.map((_, i) => sp(t, i * 0.25, { damping: 12, stiffness: 180 }));
  const b = sp(t, c.h_outro - 0.2, { damping: 12, stiffness: 190 });
  const q = sp(t, c.h_perg - 0.1, { damping: 11, stiffness: 210 });
  const lit = prog(t, c.h_mudou - 0.2, 0.6, ease.out);
  const out = prog(t, c.f_imag - 0.45, 0.4, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera
        drift={1.2}
        t={t}
        keys={[
          { t: 0, s: 1.1, x: -16, y: -20 },
          { t: ((0) + (c.h_det + 0.3)) / 2, s: 1.125, x: 4, y: -18, e: ease.inOut },
          { t: c.h_det + 0.3, s: 1.06, x: -20, y: -10, e: ease.inOut },
          { t: ((c.h_det + 0.3) + (c.h_outro + 0.3)) / 2, s: 1.085, x: -4, y: -18, e: ease.inOut },
          { t: c.h_outro + 0.3, s: 1.04, x: 12, y: -10, e: ease.inOut },
          { t: ((c.h_outro + 0.3) + (c.h_mudou + 0.3)) / 2, s: 1.115, x: 4, y: -18, e: ease.inOut },
          { t: c.h_mudou + 0.3, s: 1.09, x: 12, y: -20, e: ease.inOut },
          { t: c.f_imag, s: 1.06, x: 0, y: -10, e: ease.linear },
        ]}
      >
        {/* A + ficha */}
        <div style={{ position: "absolute", left: 140, top: 900, opacity: mix(1, 0.5, lit) }}><Pro who="A" size={170} /></div>
        {SPECS.map((s, i) => (cards[i] > 0.001 ? (
          <div key={s} style={{ position: "absolute", left: 80 + (i % 2) * 30, top: 440 + i * 105, opacity: Math.min(1, cards[i] * 1.5) * mix(1, 0.5, lit), transform: `translateX(${(1 - Math.min(1, cards[i])) * -200}px) rotate(${(i % 2 ? 3 : -3) + Math.sin(t * 2 + i) * 1.5}deg)` }}><SpecCard text={s} w={400} /></div>
        ) : null))}
        {/* B + pergunta */}
        {b > 0.001 ? <div style={{ position: "absolute", left: 770, top: 900, opacity: Math.min(1, b * 1.5), transform: `translateY(${(1 - Math.min(1, b)) * 60}px)` }}><Pro who="B" size={170} glow={lit} /></div> : null}
        {q > 0.001 ? <div style={{ position: "absolute", left: 640, top: 690, opacity: Math.min(1, q * 1.5), transform: `scale(${mix(0.4, 1, Math.min(1.1, q)) * (1 + 0.04 * Math.sin(t * 4))})`, transformOrigin: "100% 100%" }}><Bubble text="O que mudou?" tone={lit > 0.5 ? "good" : "plain"} size={44} /></div> : null}
        <div style={{ position: "absolute", left: 80, top: 1120, opacity: Math.min(1, cards[3] * 1.5) }}><Tag text="CADA DETALHE" tone="muted" size={26} style={{ color: C.text }} /></div>
        {b > 0.001 ? <div style={{ position: "absolute", left: 720, top: 1120, opacity: Math.min(1, b * 1.5) }}><Tag text="UMA PERGUNTA" tone={lit > 0.5 ? "accent" : "muted"} size={26} /></div> : null}
      </Camera>
      <div style={{ position: "absolute", left: 100, right: 100, top: 285, textAlign: "center", fontWeight: 800, fontSize: 60, letterSpacing: "-0.03em", color: C.text }}>
        SABER TUDO <span style={{ color: C.warn }}>≠</span> <span style={{ color: BRAND.hex }}>ENTENDER</span>
      </div>
    </div>
  );
};
