import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { CheckDot, Label, STEPS, Tag } from "./ui";

/**
 * CENA 5 — TRANSIÇÃO ADAPTADA (a pergunta + "Salva este vídeo…" do roteiro; regra CTA SISTEMA 14/11/2026). "No próximo fechamento, reserve
 * um momento para revisar o que essa venda ensinou." → REVISÃO DO FECHAMENTO (exemplo ilustrativo): ORIGEM DO CLIENTE, INTERESSADOS,
 * PRÓXIMO PASSO, marcados um a um. A lista dobra no módulo IMÓVEIS na CTA.
 */
export const Revis: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.r_no - 0.35, { damping: 15, stiffness: 150 });
  const list = sp(t, c.i_fech - 0.2, { damping: 13, stiffness: 180 });
  const checks = [0, 1, 2].map((i) => prog(t, c.i_revis + i * 0.35, 0.3, ease.out));
  const tick = prog(t, c.r_mom - 0.2, 1.4, ease.inOut);
  const out = prog(t, c.cta_quer - 0.45, 0.4, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.r_no - 0.35, s: 1.05, y: 0 },
          { t: c.i_fech + 0.3, s: 1.02, x: 15, y: 0, e: ease.inOut },
          { t: c.r_mom + 0.2, s: 1.06, x: -15, y: -10, e: ease.inOut },
          { t: c.i_revis + 0.3, s: 1.03, x: 10, y: 0, e: ease.inOut },
          { t: c.i_ens + 0.2, s: 1.06, x: 0, y: -10, e: ease.inOut },
          { t: c.cta_quer, s: 1.05, y: 0, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: 0, right: 0, top: 400, display: "flex", justifyContent: "center", alignItems: "center", gap: 18, opacity: Math.min(1, enter * 1.5) }}>
          <Tag text="PRÓXIMO FECHAMENTO" tone="accent" size={28} />
          <div style={{ position: "relative", width: 64, height: 64, borderRadius: 32, border: `4px solid ${C.text}` }}>
            <div style={{ position: "absolute", left: 28, top: 8, width: 4, height: 24, borderRadius: 2, background: BRAND.hex, transformOrigin: "50% 100%", transform: `rotate(${tick * 300 + t * 20}deg)` }} />
          </div>
        </div>
        {list > 0.001 ? (
          <div style={{ position: "absolute", left: 100, right: 100, top: 520, boxSizing: "border-box", padding: "24px 28px", borderRadius: 34, background: C.surface, border: `2px solid ${checks[2] > 0.5 ? brandAlpha(0.6) : C.line}`, opacity: Math.min(1, list * 1.5), transform: `translateY(${(1 - Math.min(1, list)) * 80}px)`, boxShadow: checks[2] > 0.5 ? `0 0 40px ${brandAlpha(0.2)}` : "0 30px 80px rgba(0,0,0,0.6)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Label size={26} color={C.text}>REVISÃO DO FECHAMENTO</Label>
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
        <div style={{ position: "absolute", left: 0, right: 0, top: 1110, textAlign: "center", fontWeight: 800, fontSize: 54, letterSpacing: "-0.03em", color: C.text, opacity: prog(t, c.i_ens - 0.1, 0.4, ease.out), transform: `translateY(${(1 - prog(t, c.i_ens - 0.1, 0.4, ease.out)) * 30}px)` }}>
          O que essa venda <span style={{ color: BRAND.hex }}>ensinou?</span>
        </div>
      </Camera>
      <div style={{ position: "absolute", left: 100, right: 100, top: 285, textAlign: "center", fontWeight: 800, fontSize: 58, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, enter * 1.5) }}>
        REVISE <span style={{ color: BRAND.hex }}>ANTES DE SEGUIR</span>
      </div>
    </div>
  );
};
