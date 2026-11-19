import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, rnd, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { CheckDot, Label, STEPS, Tag } from "./ui";

/**
 * CENA 5 — APLICAÇÃO + TRANSIÇÃO. "Na sua próxima captação, leve menos adjetivos e mais clareza." → adjetivos (LINDA, IMPERDÍVEL…) caem e
 * dão lugar a MAIS CLAREZA. "E para mostrar seu processo ao proprietário, ajuda ter cada etapa da captação organizada." (transição adaptada
 * do "Compartilha…") → ETAPAS DA CAPTAÇÃO organizadas, cada uma marcada.
 */
const ADJ = ["LINDA!", "IMPERDÍVEL!", "MARAVILHOSA!", "ÚNICA!", "INCRÍVEL!"];

export const Aplic: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.a_prox - 0.35, { damping: 15, stiffness: 150 });
  const fall = prog(t, c.a_adj + 0.2, 0.9, ease.in);
  const clar = sp(t, c.a_clar - 0.1, { damping: 12, stiffness: 190 });
  const list = sp(t, c.a_proc - 0.2, { damping: 13, stiffness: 180 });
  const checks = [0, 1, 2].map((i) => prog(t, c.a_etapa + i * 0.3, 0.3, ease.out));
  const out = prog(t, c.cta_quer - 0.45, 0.4, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.a_prox - 0.35, s: 1.05, y: 0 },
          { t: c.a_prox + 0.8, s: 1.07, x: -20, y: 0, e: ease.inOut },
          { t: c.a_adj + 0.3, s: 1.02, x: 20, y: 0, e: ease.inOut },
          { t: c.a_clar + 0.3, s: 1.06, x: 0, y: 0, e: ease.inOut },
          { t: c.a_proc + 0.3, s: 1.02, y: 0, e: ease.inOut },
          { t: c.a_etapa, s: 1.05, x: 15, y: 0, e: ease.inOut },
          { t: c.a_org + 0.3, s: 1.05, y: 0, e: ease.inOut },
          { t: c.cta_quer, s: 1.05, y: 0, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: 0, right: 0, top: 380, display: "flex", justifyContent: "center" }}><Tag text="PRÓXIMA CAPTAÇÃO" tone="accent" size={28} /></div>
        {ADJ.map((a, i) => (
          <div key={a} style={{ position: "absolute", left: 120 + rnd(i * 3) * 480, top: 470 + rnd(i * 5 + 1) * 260 + fall * (700 + i * 60) + Math.sin(t * 2.4 + i) * 14, opacity: prog(t, c.a_prox + i * 0.12, 0.3, ease.out) * (1 - fall), transform: `rotate(${(rnd(i * 7) - 0.5) * 20 + fall * (i % 2 ? 40 : -40) + Math.sin(t * 3 + i) * 4}deg)`, padding: "10px 22px", borderRadius: 24, background: C.surface3, fontWeight: 800, fontSize: 40, color: C.muted }}>{a}</div>
        ))}
        {clar > 0.001 && list < 0.5 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 560, textAlign: "center", fontWeight: 800, fontSize: 96, letterSpacing: "-0.04em", color: C.text, opacity: Math.min(1, clar * 1.5) * (1 - list * 2), transform: `scale(${mix(1.4, 1, Math.min(1, clar))})` }}>
            MAIS <span style={{ color: BRAND.hex }}>CLAREZA</span>
          </div>
        ) : null}
        {list > 0.001 ? (
          <div style={{ position: "absolute", left: 100, right: 100, top: 520, boxSizing: "border-box", padding: "24px 28px", borderRadius: 34, background: C.surface, border: `2px solid ${checks[2] > 0.5 ? brandAlpha(0.6) : C.line}`, opacity: Math.min(1, list * 1.5), transform: `translateY(${(1 - Math.min(1, list)) * 80}px)`, boxShadow: checks[2] > 0.5 ? `0 0 40px ${brandAlpha(0.2)}` : "0 30px 80px rgba(0,0,0,0.6)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Label size={26} color={C.text}>ETAPAS DA CAPTAÇÃO</Label>
              <Tag text="EXEMPLO ILUSTRATIVO" tone="muted" size={20} />
            </div>
            {STEPS.map((s, k) => (
              <div key={s.k} style={{ marginTop: 16, height: 96, display: "flex", alignItems: "center", gap: 18, padding: "0 20px", borderRadius: 22, background: C.surface2, transform: `translateX(${(1 - prog(list, 0.2 + k * 0.2, 0.4, ease.out)) * 60}px)` }}>
                <CheckDot p={checks[k]} size={46} />
                <div>
                  <div style={{ fontWeight: 800, fontSize: 34, color: C.text }}>{s.k}</div>
                  <div style={{ fontWeight: 700, fontSize: 24, color: C.muted }}>{s.sub}</div>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </Camera>
      <div style={{ position: "absolute", left: 100, right: 100, top: 285, textAlign: "center", fontWeight: 800, fontSize: 58, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, enter * 1.5) }}>
        MENOS <span style={{ color: C.muted }}>ADJETIVOS</span>
      </div>
    </div>
  );
};
