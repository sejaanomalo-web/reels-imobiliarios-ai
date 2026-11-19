import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { CheckDot, Label, STEPS, Tag } from "./ui";

/**
 * CENA 5 — APLICAÇÃO + TRANSIÇÃO. "Na próxima visita, testa começar por essa pergunta e observa como a conversa muda." (1ª frase da CTA do
 * roteiro, mantida) → PRÓXIMA VISITA: COMECE PELA PERGUNTA. "E registra o que cada família contou." (transição adaptada do "Compartilha…")
 * → O QUE A FAMÍLIA CONTOU (exemplo ilustrativo).
 */
export const Fim: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.x_na - 0.35, { damping: 15, stiffness: 150 });
  const list = sp(t, c.x_e - 0.3, { damping: 13, stiffness: 180 });
  const checks = [c.x_reg - 0.1, c.x_reg + 0.35, c.x_cont].map((x) => prog(t, x - 0.05, 0.3, ease.out));
  const out = prog(t, c.cta_quer - 0.45, 0.4, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={1.2}
        t={t}
        keys={[
          { t: c.x_na - 0.35, s: 1.05, y: 0 },
          { t: ((c.x_na - 0.35) + (c.x_perg + 0.2)) / 2, s: 1.115, x: 12, y: -18, e: ease.inOut },
          { t: c.x_perg + 0.2, s: 1.09, x: -15, y: -15, e: ease.inOut },
          { t: ((c.x_perg + 0.2) + (c.x_muda + 0.2)) / 2, s: 1.115, x: -12, y: -18, e: ease.inOut },
          { t: c.x_muda + 0.2, s: 1.05, x: 15, y: -10, e: ease.inOut },
          { t: ((c.x_muda + 0.2) + (c.x_cont + 0.2)) / 2, s: 1.115, x: 12, y: -18, e: ease.inOut },
          { t: c.x_cont + 0.2, s: 1.09, x: 0, y: -20, e: ease.inOut },
          { t: c.cta_quer, s: 1.06, y: -10, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: 0, right: 0, top: 400, display: "flex", justifyContent: "center" }}><Tag text="PRÓXIMA VISITA: COMECE PELA PERGUNTA" tone="accent" size={28} /></div>
        {list < 1 ? (() => { const b = sp(t, c.x_na, { damping: 12, stiffness: 190 }); const m = sp(t, c.x_muda - 0.2, { damping: 12, stiffness: 190 }); return (
          <div style={{ position: "absolute", left: 120, right: 120, top: 560, display: "flex", flexDirection: "column", alignItems: "center", gap: 30, opacity: 1 - Math.min(1, list * 1.5) }}>
            <div style={{ padding: "30px 40px", borderRadius: 40, borderBottomLeftRadius: 8, background: BRAND.deep, border: `3px solid ${BRAND.hex}`, fontWeight: 800, fontSize: 56, color: C.text, opacity: Math.min(1, b * 1.5), transform: `scale(${(0.6 + 0.4 * Math.min(1.05, b)) * (1 + 0.02 * Math.sin(t * 3))})` }}>O que mudou na <span style={{ color: BRAND.hex }}>rotina?</span></div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, opacity: Math.min(1, m * 1.5) }}>
              {[0, 1, 2, 3, 4].map((k) => <div key={k} style={{ width: 26, height: 26 + 30 * Math.abs(Math.sin(t * 4 + k)), borderRadius: 13, background: BRAND.hex, opacity: 0.8 }} />)}
              <span style={{ fontWeight: 800, fontSize: 40, color: C.text, marginLeft: 10 }}>a conversa muda</span>
            </div>
          </div>
        ); })() : null}
        {list > 0.001 ? (
          <div style={{ position: "absolute", left: 100, right: 100, top: 500, boxSizing: "border-box", padding: "24px 28px", borderRadius: 34, background: C.surface, border: `2px solid ${checks[2] > 0.5 ? brandAlpha(0.6) : C.line}`, opacity: Math.min(1, list * 1.5), transform: `translateY(${(1 - Math.min(1, list)) * 80 + Math.sin(t * 1.5) * 8}px) rotate(${Math.sin(t * 1.1) * 0.8}deg)`, boxShadow: checks[2] > 0.5 ? `0 0 40px ${brandAlpha(0.2)}` : "0 30px 80px rgba(0,0,0,0.6)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Label size={26} color={C.text}>O QUE A FAMÍLIA CONTOU</Label>
              <Tag text="EXEMPLO ILUSTRATIVO" tone="muted" size={24} />
            </div>
            {STEPS.map((s, k) => (
              <div key={s.k} style={{ marginTop: 16, height: 104, display: "flex", alignItems: "center", gap: 18, padding: "0 20px", borderRadius: 22, background: checks[k] > 0.5 ? BRAND.deep : C.surface2, transform: `translateX(${(1 - prog(list, 0.2 + k * 0.2, 0.4, ease.out)) * 60}px)` }}>
                <CheckDot p={checks[k]} size={48} />
                <div>
                  <div style={{ fontWeight: 800, fontSize: 36, color: C.text }}>{s.k}</div>
                  <div style={{ fontWeight: 700, fontSize: 26, color: C.muted }}>{s.sub}</div>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </Camera>
      <div style={{ position: "absolute", left: 100, right: 100, top: 285, textAlign: "center", fontWeight: 800, fontSize: 58, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, enter * 1.5) }}>
        TESTA <span style={{ color: BRAND.hex }}>NA PRÓXIMA VISITA</span>
      </div>
    </div>
  );
};
