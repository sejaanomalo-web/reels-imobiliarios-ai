import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { CheckDot, Label, STEPS, Tag } from "./ui";

/**
 * CENA 5 — TRANSIÇÃO ADAPTADA ("Salva esse vídeo…" do roteiro; regra CTA SISTEMA 14/11/2026). "E para acompanhar negociações e prospecção
 * sem depender da memória, ajuda ter tudo organizado num só lugar." → NEGOCIAÇÕES E PROSPECÇÃO (exemplo ilustrativo): etapas, retornos,
 * rotina. O sistema não é apresentado como ferramenta financeira.
 */
export const Fim: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.f_e - 0.35, { damping: 15, stiffness: 150 });
  const list = sp(t, c.f_e - 0.1, { damping: 13, stiffness: 180 });
  const checks = [c.f_neg, c.f_prosp, c.f_org].map((x) => prog(t, x - 0.05, 0.3, ease.out));
  const out = prog(t, c.cta_quer - 0.45, 0.4, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={1.2}
        t={t}
        keys={[
          { t: c.f_e - 0.35, s: 1.05, y: 0 },
          { t: c.f_neg + 0.2, s: 1.09, x: -15, y: -15, e: ease.inOut },
          { t: c.f_prosp + 0.2, s: 1.05, x: 15, y: -10, e: ease.inOut },
          { t: c.f_org + 0.2, s: 1.09, x: 0, y: -20, e: ease.inOut },
          { t: c.cta_quer, s: 1.06, y: -10, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: 0, right: 0, top: 400, display: "flex", justifyContent: "center" }}><Tag text="SEM DEPENDER DA MEMÓRIA" tone="accent" size={28} /></div>
        {list > 0.001 ? (
          <div style={{ position: "absolute", left: 100, right: 100, top: 500, boxSizing: "border-box", padding: "24px 28px", borderRadius: 34, background: C.surface, border: `2px solid ${checks[2] > 0.5 ? brandAlpha(0.6) : C.line}`, opacity: Math.min(1, list * 1.5), transform: `translateY(${(1 - Math.min(1, list)) * 80 + Math.sin(t * 1.5) * 8}px) rotate(${Math.sin(t * 1.1) * 0.8}deg)`, boxShadow: checks[2] > 0.5 ? `0 0 40px ${brandAlpha(0.2)}` : "0 30px 80px rgba(0,0,0,0.6)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Label size={26} color={C.text}>NEGOCIAÇÕES E PROSPECÇÃO</Label>
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
        TUDO <span style={{ color: BRAND.hex }}>NUM SÓ LUGAR</span>
      </div>
    </div>
  );
};
