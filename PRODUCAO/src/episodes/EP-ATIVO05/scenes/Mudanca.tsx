import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Card, CheckDot, Tag } from "./ui";

/**
 * CENA 3 — A MUDANÇA. "Em vez de começar pela divisão da comissão, comece definindo o processo." → COMISSÃO sai do primeiro lugar,
 * PROCESSO assume. "Confirme a autorização… Alinhe as responsabilidades e registre por escrito o que foi acordado, respeitando as regras
 * profissionais aplicáveis." → documento ABSTRATO (não jurídico, sem cláusulas) preenche AUTORIZAÇÃO / PAPÉIS / ACORDOS na fala.
 */
export const Mudanca: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const com = sp(t, c.m_vez - 0.2, { damping: 14, stiffness: 170 });
  const swap = prog(t, c.m_proc - 0.15, 0.6, ease.inOut);
  const doc = sp(t, c.m_aut - 0.45, { damping: 15, stiffness: 150 });
  const f1 = prog(t, c.m_aut + 0.3, 0.5, ease.out);
  const f2 = prog(t, c.m_resp + 0.4, 0.5, ease.out);
  const f3 = prog(t, c.m_reg + 0.3, 0.5, ease.out);
  const note = prog(t, c.m_regras, 0.5, ease.out);
  const out = prog(t, c.e_dur - 0.45, 0.4, ease.in);
  const docUp = prog(t, c.m_aut - 0.45, 0.7, ease.inOut);

  const Field: React.FC<{ label: string; p: number; children: React.ReactNode }> = ({ label, p, children }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 22, padding: "20px 0", borderBottom: `1px solid ${C.lineSoft}` }}>
      <CheckDot p={p} size={58} />
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.1em", color: p > 0.5 ? BRAND.hex : C.muted }}>{label}</div>
        <div style={{ marginTop: 6, fontWeight: 800, fontSize: 36, lineHeight: 1.15, color: C.text, opacity: p, minHeight: 42 }}>{children}</div>
      </div>
    </div>
  );

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.m_vez - 0.3, s: 1.05, y: 0 },
          { t: c.m_proc + 0.5, s: 1.0, y: 0, e: ease.inOut },
          { t: c.m_resp, s: 1.02, y: 20, e: ease.inOut },
          { t: c.m_regras + 0.6, s: 1.05, y: 30, e: ease.inOut },
          { t: c.e_dur, s: 1.06, y: 30, e: ease.linear },
        ]}
      >
        {/* ordem: COMISSÃO → PROCESSO */}
        <div style={{ position: "absolute", left: 0, right: 0, top: mix(560, 300, docUp), display: "flex", justifyContent: "center", gap: 30, alignItems: "center", opacity: Math.min(1, com * 1.5), transform: `scale(${mix(1, 0.8, docUp)})` }}>
          <div style={{ order: swap > 0.5 ? 2 : 1, padding: "26px 40px", borderRadius: 26, background: C.surface, border: `3px solid ${swap > 0.5 ? C.line : C.warn}`, fontWeight: 800, fontSize: 56, color: swap > 0.5 ? C.dim : C.text, transform: `translateY(${Math.sin(swap * Math.PI) * 60}px)` }}>
            {swap > 0.5 ? "2 · " : "1 · "}COMISSÃO
          </div>
          <div style={{ order: swap > 0.5 ? 1 : 2, padding: "26px 40px", borderRadius: 26, background: swap > 0.5 ? brandAlpha(0.12) : C.surface, border: `3px solid ${swap > 0.5 ? BRAND.hex : C.line}`, fontWeight: 800, fontSize: 56, color: swap > 0.5 ? C.text : C.dim, opacity: Math.max(0.4, Math.min(1, prog(t, c.m_proc - 0.4, 0.4, ease.out) * 1.5)), transform: `translateY(${-Math.sin(swap * Math.PI) * 60}px)` }}>
            {swap > 0.5 ? "1 · " : "2 · "}PROCESSO
          </div>
        </div>
        {/* documento abstrato */}
        {doc > 0.001 ? (
          <Card tone="accent" style={{ left: 110, top: 480 + (1 - Math.min(1, doc)) * 400, width: 860, padding: "30px 40px", opacity: Math.min(1, doc * 1.5) }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.12em", color: C.muted }}>COMBINADO DA PARCERIA</span>
              <Tag text="ILUSTRATIVO" tone="muted" size={24} />
            </div>
            <Field label="AUTORIZAÇÃO" p={f1}>Confirmada para divulgar e negociar</Field>
            <Field label="PAPÉIS" p={f2}>A apresenta · B conduz e atualiza</Field>
            <Field label="ACORDOS" p={f3}>Registrados por escrito</Field>
            <div style={{ marginTop: 20, fontWeight: 600, fontSize: 28, color: C.muted, opacity: note }}>Respeitando as regras profissionais aplicáveis.</div>
          </Card>
        ) : null}
      </Camera>
    </div>
  );
};
