import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Bubble, Mark, People, Pro, Tag } from "./ui";

/**
 * CENA 4 — POR QUÊ. "O proprietário não consegue garantir o resultado da venda." → proprietário; RESULTADO DA VENDA? + NINGUÉM PODE
 * PROMETER. "Mas consegue avaliar a clareza do processo e a preparação de quem vai representá-lo." → CLAREZA DO PROCESSO ✓ /
 * PREPARAÇÃO ✓. "É isso que diferencia um simples pedido de captação de uma proposta profissional." → PROMESSA (A, "Vou divulgar!") ×
 * MÉTODO (B, plano). Título: PROVE SEU PROCESSO.
 */
export const Porque: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.q_prop - 0.35, { damping: 15, stiffness: 150 });
  const g = sp(t, c.q_garant - 0.1, { damping: 12, stiffness: 200 });
  const strike = prog(t, c.q_garant + 0.6, 0.35, ease.out);
  const ev = [c.q_clar, c.q_prep].map((x) => sp(t, x - 0.1, { damping: 12, stiffness: 210 }));
  const cmp = sp(t, c.q_dif - 0.2, { damping: 13, stiffness: 180 });
  const prop = sp(t, c.q_prop2 - 0.1, { damping: 12, stiffness: 200 });
  const title = sp(t, c.q_aval - 0.1, { damping: 13, stiffness: 180 });
  const out = prog(t, c.a_prox - 0.45, 0.4, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.q_prop - 0.35, s: 1.05, y: 0 },
          { t: c.q_garant + 0.3, s: 1.06, x: 20, y: -10, e: ease.inOut },
          { t: c.q_clar, s: 1.03, x: -20, y: 0, e: ease.inOut },
          { t: c.q_prep + 0.3, s: 1.03, x: 20, y: 0, e: ease.inOut },
          { t: c.q_dif + 0.3, s: 1.0, x: 0, y: 0, e: ease.inOut },
          { t: c.q_prop2 + 0.3, s: 1.04, x: 30, y: 0, e: ease.inOut },
          { t: c.a_prox, s: 1.04, x: 30, y: 0, e: ease.linear },
        ]}
      >
        {/* proprietário e o que ele consegue avaliar */}
        <div style={{ position: "absolute", inset: 0, opacity: 1 - Math.min(1, cmp * 1.5) }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 420, display: "flex", justifyContent: "center" }}>
            <div style={{ padding: "18px 28px 10px", borderRadius: 32, background: C.surface, border: `2px solid ${C.line}`, transform: `translateY(${Math.sin(t * 1.8) * 5}px)` }}><People n={1} size={130} /></div>
          </div>
          <div style={{ position: "absolute", left: 0, right: 0, top: 610, display: "flex", justifyContent: "center" }}><Tag text="PROPRIETÁRIO" tone="muted" size={26} style={{ color: C.text }} /></div>
          {g > 0.001 ? (
            <div style={{ position: "absolute", left: 0, right: 0, top: 690, display: "flex", justifyContent: "center", opacity: Math.min(1, g * 1.5), transform: `scale(${mix(0.6, 1, Math.min(1.06, g))})` }}>
              <div style={{ position: "relative", padding: "14px 30px", borderRadius: 24, border: `3px dashed ${C.muted}`, fontWeight: 800, fontSize: 46, color: C.muted }}>
                RESULTADO DA VENDA?
                <div style={{ position: "absolute", left: 0, right: 0, top: "112%", textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 26, color: C.warn, opacity: strike }}>NINGUÉM PODE PROMETER</div>
              </div>
            </div>
          ) : null}
          <div style={{ position: "absolute", left: 140, right: 140, top: 860, display: "flex", flexDirection: "column", gap: 16 }}>
            {["Clareza do processo", "Preparação de quem representa"].map((k, i) => (
              <div key={k} style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 22px", borderRadius: 24, background: C.surface, border: `3px solid ${ev[i] > 0.5 ? BRAND.hex : C.line}`, opacity: mix(0.3, 1, Math.min(1, ev[i])) * prog(t, c.q_prop + 0.6, 0.4, ease.out), boxShadow: ev[i] > 0.5 ? `0 0 26px ${brandAlpha(0.2)}` : "none" }}>
                <Mark ok size={52} />
                <span style={{ fontWeight: 800, fontSize: 38, color: C.text }}>{k}</span>
                <span style={{ marginLeft: "auto", fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted }}>ELE AVALIA</span>
              </div>
            ))}
          </div>
        </div>
        {/* promessa × método */}
        {cmp > 0.001 ? (
          <div style={{ position: "absolute", left: 90, right: 90, top: 470, display: "flex", gap: 30, opacity: Math.min(1, cmp * 1.5) }}>
            {[0, 1].map((i) => {
              const good = i === 1;
              return (
                <div key={i} style={{ flex: 1, height: 560, boxSizing: "border-box", borderRadius: 34, background: C.surface, border: `3px solid ${good ? BRAND.hex : C.warn}`, padding: 24, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", transform: `translateY(${(1 - Math.min(1, cmp)) * 80 + Math.sin(t * 1.6 + i * 2) * 5}px)`, boxShadow: good && prop > 0.5 ? `0 0 40px ${brandAlpha(0.35)}` : "none" }}>
                  <Tag text={good ? "MÉTODO" : "PROMESSA"} tone={good ? "accent" : "warn"} size={30} />
                  <Pro who={good ? "B" : "A"} size={150} glow={good ? 1 : 0} />
                  {good ? (
                    <div style={{ width: 220, padding: "12px 14px", borderRadius: 14, background: C.paper, borderTop: `8px solid ${BRAND.hex}` }}>
                      {[0.9, 0.7, 0.8, 0.6].map((w, k) => <div key={k} style={{ marginTop: k ? 8 : 0, height: 10, width: `${w * 100}%`, borderRadius: 5, background: "#C9C5BA" }} />)}
                    </div>
                  ) : (
                    <Bubble text="Vou divulgar!" tone="dim" size={30} />
                  )}
                  <span style={{ fontWeight: 800, fontSize: 34, color: good ? BRAND.hex : C.muted, textAlign: "center" }}>{good ? "Proposta profissional" : "Pedido de captação"}</span>
                </div>
              );
            })}
          </div>
        ) : null}
      </Camera>
      {title > 0.001 ? (
        <div style={{ position: "absolute", left: 100, right: 100, top: 285, textAlign: "center", fontWeight: 800, fontSize: 62, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, title * 1.5), transform: `translateY(${(1 - Math.min(1, title)) * 30}px)` }}>
          PROVE SEU <span style={{ color: BRAND.hex }}>PROCESSO</span>
        </div>
      ) : null}
    </div>
  );
};
