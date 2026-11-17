import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Tag } from "./ui";

/**
 * CENA 1 — GANCHO. "Juro mais baixo sempre significa imóvel mais barato?" → a equação JURO ↓ = IMÓVEL MAIS BARATO monta-se desde o quadro
 * 0. "A resposta depende de uma coisa que muita apresentação esquece." → o "=" vira "?" e as peças balançam; entra a carta virada O QUE A
 * APRESENTAÇÃO ESQUECE (revelada na cena 3: CONTEXTO). Sem taxas nem números.
 */
export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const a = sp(t, 0, { damping: 13, stiffness: 140 });
  const b = sp(t, Math.min(1.1, c.h_barato - 0.6), { damping: 12, stiffness: 180 });
  const q = prog(t, c.h_dep - 0.1, 0.4, ease.inOut);
  const wob = q * Math.sin(t * 5) * 4;
  const hid = sp(t, c.h_esq - 0.3, { damping: 13, stiffness: 170 });
  const out = prog(t, c.a_imag - 0.45, 0.4, ease.in);
  const card = (text: React.ReactNode, p: number, y: number, rot: number) => (
    <div style={{ position: "absolute", left: 140, right: 140, top: y, height: 170, boxSizing: "border-box", borderRadius: 34, background: C.surface, border: `2px solid ${C.line}`, display: "flex", alignItems: "center", justifyContent: "center", gap: 18, fontWeight: 800, fontSize: 64, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, p * 1.5), transform: `translateY(${(1 - Math.min(1, p)) * 80 + Math.sin(t * 2.2 + y) * 12}px) rotate(${rot + Math.sin(t * 1.7 + y) * 1.5}deg) scale(${1 + 0.02 * Math.sin(t * 2.6 + y)})`, boxShadow: "0 30px 80px rgba(0,0,0,0.6)" }}>{text}</div>
  );

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera
        drift={1.2}
        t={t}
        keys={[
          { t: 0, s: 1.1, y: -20 },
          { t: 1.4, s: 1.03, x: 15, y: -5, e: ease.inOut },
          { t: c.h_barato, s: 1.07, x: -15, y: -15, e: ease.inOut },
          { t: c.h_dep + 0.2, s: 1.08, x: 0, y: -20, e: ease.inOut },
          { t: c.h_esq + 0.3, s: 1.0, x: 0, y: 0, e: ease.inOut },
          { t: c.a_imag, s: 1.04, x: 0, y: -10, e: ease.linear },
        ]}
      >
        {card(<>JURO <span style={{ color: BRAND.hex }}>↓</span></>, a, 440, -wob)}
        <div style={{ position: "absolute", left: 0, right: 0, top: 625, height: 130, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "relative", width: 140, height: 130 }}>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 130, color: C.muted, opacity: Math.min(1, b * 1.5) * (1 - q) }}>=</div>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 130, color: BRAND.hex, opacity: q, transform: `scale(${mix(0.4, 1, q) * (1 + 0.05 * Math.sin(t * 4))})`, textShadow: `0 0 30px ${brandAlpha(0.6)}` }}>?</div>
          </div>
        </div>
        {card(<>IMÓVEL <span style={{ color: BRAND.hex }}>MAIS BARATO</span></>, b, 770, wob)}
        {hid > 0.001 ? (
          <div style={{ position: "absolute", left: 220, right: 220, top: 1000, height: 210, boxSizing: "border-box", borderRadius: 30, border: `4px dashed ${brandAlpha(0.7)}`, background: BRAND.deep, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, opacity: Math.min(1, hid * 1.5), transform: `translateY(${(1 - Math.min(1, hid)) * 120 + Math.sin(t * 2) * 8}px) rotate(${Math.sin(t * 1.5) * 2}deg)` }}>
            <div style={{ fontWeight: 800, fontSize: 80, color: BRAND.hex }}>?</div>
            <Tag text="O QUE A APRESENTAÇÃO ESQUECE" tone="muted" size={24} style={{ color: C.text }} />
          </div>
        ) : null}
      </Camera>
      <div style={{ position: "absolute", left: 100, right: 100, top: 285, textAlign: "center", fontWeight: 800, fontSize: 60, letterSpacing: "-0.03em", color: C.text }}>
        SEMPRE? <span style={{ color: BRAND.hex, opacity: q }}>DEPENDE.</span>
      </div>
    </div>
  );
};
