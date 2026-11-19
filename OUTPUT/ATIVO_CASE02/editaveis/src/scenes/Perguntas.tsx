import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Label, Question, STEPS, Tag } from "./ui";

/**
 * CENA 4 — TAKE 03, APLICAÇÃO (1). "Na próxima visita gravada, escolha três perguntas que um comprador faria ali dentro." → roteiro de
 * gravação 3 PERGUNTAS REAIS (exemplos ilustrativos) preenchido na fala. "Grave as respostas." → um REC acende em cada pergunta.
 */
export const Perguntas: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.g_prox - 0.35, { damping: 15, stiffness: 150 });
  const head = sp(t, c.g_prox + 0.2, { damping: 12, stiffness: 200 });
  const rows = [0, 1, 2].map((i) => sp(t, c.g_tres + 0.25 + i * 0.4, { damping: 13, stiffness: 200 }));
  const rec = [0, 1, 2].map((i) => prog(t, c.g_grave - 0.05 + i * 0.22, 0.25, ease.out));
  const out = prog(t, c.t_forma - 0.45, 0.4, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.g_prox - 0.35, s: 1.06, y: -40 },
          { t: c.g_tres + 0.3, s: 1.02, y: -10, e: ease.inOut },
          { t: c.g_grave + 0.4, s: 1.06, y: 20, e: ease.inOut },
          { t: c.t_forma, s: 1.04, y: 20, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: 0, right: 0, top: 300, display: "flex", justifyContent: "center", gap: 14 }}>
          <Tag text="PRÓXIMA VISITA GRAVADA" tone="accent" size={28} />
          <Tag text="EXEMPLO ILUSTRATIVO" tone="muted" size={20} />
        </div>
        <div style={{ position: "absolute", left: 110, right: 110, top: 390, height: 760, boxSizing: "border-box", borderRadius: 40, background: C.surface, border: `2px solid ${C.line}`, padding: "34px 36px", boxShadow: "0 40px 100px rgba(0,0,0,0.6)", transform: `translateY(${(1 - Math.min(1, enter)) * 100}px)` }}>
          <div style={{ fontWeight: 800, fontSize: 70, letterSpacing: "-0.04em", color: C.text, opacity: Math.min(1, head * 1.5), transform: `scale(${mix(1.25, 1, Math.min(1, head))})`, transformOrigin: "0 50%" }}>
            <span style={{ color: BRAND.hex }}>3</span> PERGUNTAS REAIS
          </div>
          <Label size={26} style={{ marginTop: 6 }}>que um comprador faria ali dentro</Label>
          {STEPS.map((s, i) => {
            const p = rows[i];
            return (
              <div key={s.k} style={{ marginTop: i ? 22 : 36, height: 150, boxSizing: "border-box", display: "flex", alignItems: "center", gap: 22, padding: "0 24px", borderRadius: 28, background: C.surface2, border: `3px ${p > 0.5 ? "solid" : "dashed"} ${rec[i] > 0.5 ? BRAND.hex : p > 0.5 ? brandAlpha(0.4) : C.dim}`, boxShadow: rec[i] > 0.5 ? `0 0 26px ${brandAlpha(0.2)}` : "none" }}>
                <div style={{ opacity: Math.min(1, p * 1.5), transform: `scale(${mix(0.4, 1, Math.min(1.08, p))})` }}><Question size={80} /></div>
                <div style={{ flex: 1, opacity: Math.min(1, p * 1.5) }}>
                  <div style={{ fontWeight: 800, fontSize: 44, letterSpacing: "-0.02em", color: C.text }}>{s.k}</div>
                  <div style={{ fontWeight: 700, fontSize: 28, color: C.muted }}>{s.sub}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, opacity: rec[i], fontFamily: F.mono, fontWeight: 700, fontSize: 26, color: C.text }}>
                  <div style={{ width: 22, height: 22, borderRadius: 11, background: C.warn, opacity: Math.sin(t * 5 + i) > 0 ? 1 : 0.3 }} />
                  REC
                </div>
              </div>
            );
          })}
        </div>
      </Camera>
    </div>
  );
};
