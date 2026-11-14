import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";

/**
 * CENA 5 — INSIGHT. "Fatores externos existem, e nem tudo depende do corretor." → coluna FORA DO CONTROLE (genérica).
 * "Mas melhorar começa por separar o que você não controla do que pode organizar, testar e acompanhar." → a tela se divide e a
 * coluna SOB SUA AÇÃO recebe ORGANIZAR / TESTAR / ACOMPANHAR na fala. Depois, a lista das 4 perguntas (cena CTA) assume.
 */
const OUT = ["Mercado", "Juros", "Momento do comprador"];
const IN = ["ORGANIZAR", "TESTAR", "ACOMPANHAR"];

export const Insight: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const left = OUT.map((_, i) => sp(t, c.i_fat - 0.1 + i * 0.25, { damping: 14, stiffness: 180 }));
  const dep = prog(t, c.i_dep, 0.5, ease.out);
  const split = prog(t, c.i_sep - 0.1, 0.7, ease.inOut);
  const right = [c.i_org, c.i_test, c.i_acomp].map((a) => sp(t, a - 0.1, { damping: 12, stiffness: 210 }));
  const out = prog(t, c.i_use - 0.4, 0.35, ease.in);
  const W = mix(900, 430, split);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.i_fat - 0.3, s: 1.03, y: 0 },
          { t: c.i_sep + 0.5, s: 0.98, y: 0, e: ease.inOut },
          { t: c.i_acomp + 0.5, s: 1.03, y: -10, e: ease.inOut },
          { t: c.i_use, s: 1.04, y: -10, e: ease.linear },
        ]}
      >
        {/* fora do controle */}
        <div style={{ position: "absolute", left: 90, top: 380, width: W }}>
          <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 32, letterSpacing: "0.1em", color: C.muted, textAlign: "center", paddingBottom: 16, borderBottom: `4px solid ${C.dim}`, opacity: Math.min(1, left[0] * 1.5) }}>FORA DO CONTROLE</div>
          {OUT.map((s, i) => (
            <div key={s} style={{ marginTop: 22, height: 120, borderRadius: 24, background: C.surface, border: `2px solid ${C.line}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 40, color: dep > 0.5 ? C.muted : C.text, opacity: Math.min(1, left[i] * 1.5) * mix(1, 0.7, dep), transform: `translateY(${(1 - Math.min(1, left[i])) * 60}px) rotate(${Math.sin(t * 1.5 + i) * 1.2}deg)` }}>{s}</div>
          ))}
        </div>
        {/* divisória + sob sua ação */}
        {split > 0.001 ? (
          <>
            <div style={{ position: "absolute", left: 539, top: 380, width: 3, height: 560 * split, background: C.line }} />
            <div style={{ position: "absolute", left: 560, top: 380, width: 430, opacity: split }}>
              <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 32, letterSpacing: "0.1em", color: BRAND.hex, textAlign: "center", paddingBottom: 16, borderBottom: `4px solid ${BRAND.hex}` }}>SOB SUA AÇÃO</div>
              {IN.map((s, i) => {
                const p = right[i];
                return (
                  <div key={s} style={{ marginTop: 22, height: 120, borderRadius: 24, background: p > 0.5 ? brandAlpha(0.12) : C.surface, border: `3px solid ${p > 0.5 ? BRAND.hex : C.line}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 40, letterSpacing: "-0.01em", color: p > 0.5 ? C.text : C.dim, transform: `scale(${1 + 0.1 * Math.sin(Math.min(1, p) * Math.PI)})`, boxShadow: p > 0.5 ? `0 0 30px ${brandAlpha(0.2)}` : "none" }}>{s}</div>
                );
              })}
            </div>
          </>
        ) : null}
      </Camera>
    </div>
  );
};
