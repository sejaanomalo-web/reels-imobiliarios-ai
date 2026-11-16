import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { IconDoc, Label, Tag } from "./ui";

/**
 * CENA 4 — EXEMPLO 3: PROCESSO. "Terceiro, esclareça etapas da compra." → 3 · PROCESSO + linha vertical (ILUSTRATIVA — não é um
 * procedimento jurídico universal). Cada pergunta acende uma etapa: ANTES DE VISITAR · DOCUMENTOS · VERIFICAÇÕES (itens "A CONFERIR").
 * "Quando houver regras específicas, oriente a procurar fontes oficiais e profissionais responsáveis." → caixa REGRAS ESPECÍFICAS? →
 * FONTES OFICIAIS + PROFISSIONAIS RESPONSÁVEIS.
 */
const STAGES = [
  { k: "ANTES DE VISITAR", q: "O que conferir?" },
  { k: "DOCUMENTOS", q: "O que costuma exigir atenção?" },
  { k: "VERIFICAÇÕES", q: "Em que momento entram?" },
];
const Y0 = 400;
const GAP = 175;

export const Processo: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const at = [c.p_visitar, c.p_doc, c.p_verif];
  const enter = sp(t, c.p_terc - 0.35, { damping: 15, stiffness: 150 });
  const line = prog(t, c.p_etapas - 0.2, 1.0, ease.inOut);
  const lit = at.filter((x) => t >= x - 0.2).length;
  const rules = sp(t, c.p_regras - 0.25, { damping: 13, stiffness: 190 });
  const chips = [c.p_oficiais, c.p_prof].map((x) => sp(t, x - 0.15, { damping: 11, stiffness: 220 }));
  const out = prog(t, c.i_pense - 0.45, 0.4, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.p_terc - 0.35, s: 1.06, y: -60 },
          { t: c.p_visitar, s: 1.02, y: -30, e: ease.inOut },
          { t: c.p_verif + 0.4, s: 1.02, y: 20, e: ease.inOut },
          { t: c.p_regras + 0.4, s: 0.98, y: 70, e: ease.inOut },
          { t: c.i_pense, s: 1.0, y: 70, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: 0, right: 0, top: 290, display: "flex", justifyContent: "center", gap: 14, opacity: prog(t, c.p_terc - 0.05, 0.3, ease.out) }}>
          <Tag text="3 · PROCESSO" tone="accent" size={32} />
          <Tag text="ETAPAS ILUSTRATIVAS" tone="muted" size={22} />
        </div>
        {/* linha */}
        <div style={{ position: "absolute", left: 128, top: Y0 + 40, width: 8, height: (GAP * 2) * line, borderRadius: 4, background: C.line }} />
        <div style={{ position: "absolute", left: 128, top: Y0 + 40, width: 8, height: GAP * Math.max(0, lit - 1) * line, borderRadius: 4, background: BRAND.hex, boxShadow: `0 0 16px ${brandAlpha(0.6)}` }} />
        {STAGES.map((s, i) => {
          const a = sp(t, Math.min(at[i] - 0.25, c.p_etapas + 0.2 + i * 0.2), { damping: 14, stiffness: 190 });
          const on = t >= at[i] - 0.2;
          const y = Y0 + i * GAP;
          return (
            <React.Fragment key={s.k}>
              <div style={{ position: "absolute", left: 104, top: y + 16, width: 56, height: 56, borderRadius: 28, background: on ? BRAND.hex : C.surface2, border: `4px solid ${on ? BRAND.hex : C.line}`, color: on ? BRAND.ink : C.muted, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 30, opacity: Math.min(1, a * 1.5), boxShadow: on ? `0 0 24px ${brandAlpha(0.6)}` : "none" }}>{i + 1}</div>
              <div style={{ position: "absolute", left: 200, top: y, width: 780, height: 150, boxSizing: "border-box", borderRadius: 28, background: C.surface, border: `3px solid ${on ? brandAlpha(0.6) : C.line}`, padding: "18px 26px", display: "flex", alignItems: "center", gap: 22, opacity: Math.min(1, a * 1.5) * (on ? 1 : 0.6), transform: `translateX(${(1 - Math.min(1, a)) * 120}px) scale(${on && lit === i + 1 ? 1.03 : 1})` }}>
                {i === 1 ? <IconDoc size={60} color={on ? BRAND.hex : C.muted} /> : null}
                <div style={{ flex: 1 }}>
                  <Label size={28} color={on ? C.text : C.muted}>{s.k}</Label>
                  <div style={{ fontWeight: 800, fontSize: 36, letterSpacing: "-0.02em", color: on ? C.text : C.dim, marginTop: 4 }}>{s.q}</div>
                </div>
                {on ? <Tag text="A CONFERIR" tone="muted" size={20} /> : null}
              </div>
            </React.Fragment>
          );
        })}
        {/* regras específicas */}
        {rules > 0.001 ? (
          <div style={{ position: "absolute", left: 100, right: 100, top: 960, boxSizing: "border-box", borderRadius: 32, background: C.bg1, border: `2px dashed ${C.muted}`, padding: "24px 28px", opacity: Math.min(1, rules * 1.5), transform: `translateY(${(1 - Math.min(1, rules)) * 80}px)` }}>
            <div style={{ fontWeight: 800, fontSize: 40, color: C.text }}>Regras específicas?</div>
            <div style={{ marginTop: 18, display: "flex", gap: 16, flexWrap: "wrap" }}>
              {["FONTES OFICIAIS", "PROFISSIONAIS RESPONSÁVEIS"].map((k, i) => (
                <div key={k} style={{ opacity: Math.min(1, chips[i] * 1.5), transform: `scale(${mix(0.4, 1, Math.min(1.08, chips[i]))})` }}>
                  <Tag text={`→ ${k}`} tone="accent" size={28} />
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
