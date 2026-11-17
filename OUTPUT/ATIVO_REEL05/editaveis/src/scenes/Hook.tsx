import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Mark, STEPS } from "./ui";

/**
 * CENA 1 — GANCHO. "Três atitudes que parecem atrapalhar uma venda de imóvel, mas podem ser exatamente o que constrói confiança." → três
 * cartas numeradas já no quadro 0, viradas para baixo com PARECE ATRAPALHAR (vermelho); no "confiança" elas viram e acendem verdes ✓.
 * O conteúdo de cada carta só aparece na cena dela (o título revela as três sem antecipar a explicação).
 */
export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const bad = sp(t, c.h_atrap - 0.1, { damping: 12, stiffness: 200 });
  const flip = [0, 1, 2].map((i) => prog(t, c.h_conf - 0.15 + i * 0.18, 0.5, ease.inOut));
  const title = prog(t, c.h_exat, 0.5, ease.out);
  const out = prog(t, c.u_prim - 0.45, 0.4, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: 0, s: 1.06, x: -15, y: -60 },
          { t: c.h_tres + 1.0, s: 1.04, x: 15, y: -30, e: ease.inOut },
          { t: c.h_atrap + 0.3, s: 1.03, x: -20, y: 0, e: ease.inOut },
          { t: c.h_exat, s: 1.05, x: 20, y: 10, e: ease.inOut },
          { t: c.h_conf + 0.6, s: 1.0, y: 10, e: ease.inOut },
          { t: c.u_prim, s: 1.04, y: 20, e: ease.linear },
        ]}
      >
        {[0, 1, 2].map((i) => {
          const f = flip[i];
          const front = f > 0.5;
          const x = 85 + i * 315;
          return (
            <div key={i} style={{ position: "absolute", left: x, top: 640 + Math.sin(t * 2.2 + i * 1.3) * 18, width: 280, height: 420, perspective: 1200 }}>
              <div style={{ position: "absolute", inset: 0, boxSizing: "border-box", borderRadius: 30, background: front ? C.surface : C.surface2, border: `4px solid ${front ? BRAND.hex : bad > 0.5 ? C.warn : C.line}`, transform: `rotateY(${Math.sin(f * Math.PI) * 80 + (front ? 0 : Math.sin(t * 2.6 + i) * 10)}deg) rotate(${(i - 1) * (front ? 0 : 4) + Math.sin(t * 1.9 + i) * 2}deg)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: "26px 16px", boxShadow: front ? `0 0 34px ${brandAlpha(0.3)}` : "0 30px 70px rgba(0,0,0,0.6)" }}>
                <div style={{ fontWeight: 800, fontSize: 130, lineHeight: 1, color: front ? BRAND.hex : C.text }}>{i + 1}</div>
                {front ? (
                  <>
                    <Mark ok size={70} />
                    <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, textAlign: "center", color: C.text, lineHeight: 1.2 }}>{STEPS[i].k}</div>
                  </>
                ) : (
                  <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, textAlign: "center", color: C.warn, opacity: Math.min(1, bad * 1.5), lineHeight: 1.2 }}>PARECE<br />ATRAPALHAR</div>
                )}
              </div>
            </div>
          );
        })}
      </Camera>
      <div style={{ position: "absolute", left: 100, right: 100, top: 290, textAlign: "center", fontWeight: 800, fontSize: 76, lineHeight: 1.0, letterSpacing: "-0.04em", color: C.text }}>
        3 ATITUDES
        <div style={{ fontSize: 50, marginTop: 10, color: C.muted, opacity: 1 - title }}>que parecem <span style={{ color: C.warn }}>perder a venda</span></div>
        <div style={{ fontSize: 50, marginTop: -60, color: C.muted, opacity: title }}>que constroem <span style={{ color: BRAND.hex }}>confiança</span></div>
      </div>
    </div>
  );
};
