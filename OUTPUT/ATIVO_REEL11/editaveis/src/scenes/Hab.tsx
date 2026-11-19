import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { CheckDot, Tag } from "./ui";

/**
 * CENA 4 — O HÁBITO. "Um começo possível é separar compromissos financeiros, acompanhar negociações por etapa e manter uma rotina mínima
 * de prospecção." → três colunas FINANÇAS / NEGOCIAÇÕES / PROSPECÇÃO, cada uma acende e marca no tempo da fala. "Não resolve todos os riscos
 * da profissão, mas evita tomar cada decisão só pela urgência do dia." → aviso honesto NÃO RESOLVE TODOS OS RISCOS; URGÊNCIA DO DIA perde
 * o peso. Texto-chave: 3 FRENTES DE CONTROLE.
 */
const COLS = [
  { k: "FINANÇAS", sub: "compromissos separados", rows: ["FIXOS", "VARIÁVEIS"] },
  { k: "NEGOCIAÇÕES", sub: "por etapa", rows: ["VISITA", "PROPOSTA"] },
  { k: "PROSPECÇÃO", sub: "rotina mínima", rows: ["SEG", "QUI"] },
];

export const Hab: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.x_um - 0.35, { damping: 15, stiffness: 150 });
  const at = [c.x_sep, c.x_acomp, c.x_mant];
  const cols = at.map((x) => sp(t, x - 0.2, { damping: 12, stiffness: 190 }));
  const honest = sp(t, c.x_riscos - 0.2, { damping: 12, stiffness: 190 });
  const urg = sp(t, c.x_urg - 0.3, { damping: 12, stiffness: 200 });
  const urgDim = prog(t, c.x_urg + 0.5, 0.6, ease.out);
  const out = prog(t, c.f_e - 0.45, 0.4, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={1.2}
        t={t}
        keys={[
          { t: c.x_um - 0.35, s: 1.05, y: 0 },
          { t: ((c.x_um - 0.35) + (c.x_sep + 0.2)) / 2, s: 1.105, x: 12, y: -18, e: ease.inOut },
          { t: c.x_sep + 0.2, s: 1.08, x: -20, y: -15, e: ease.inOut },
          { t: ((c.x_sep + 0.2) + (c.x_acomp + 0.2)) / 2, s: 1.105, x: -12, y: -18, e: ease.inOut },
          { t: c.x_acomp + 0.2, s: 1.08, x: 0, y: -15, e: ease.inOut },
          { t: ((c.x_acomp + 0.2) + (c.x_mant + 0.2)) / 2, s: 1.105, x: 12, y: -18, e: ease.inOut },
          { t: c.x_mant + 0.2, s: 1.08, x: 20, y: -15, e: ease.inOut },
          { t: ((c.x_mant + 0.2) + (c.x_prosp + 0.3)) / 2, s: 1.105, x: -12, y: -18, e: ease.inOut },
          { t: c.x_prosp + 0.3, s: 1.03, x: 0, y: 0, e: ease.inOut },
          { t: ((c.x_prosp + 0.3) + (c.x_riscos + 0.2)) / 2, s: 1.095, x: 12, y: -18, e: ease.inOut },
          { t: c.x_riscos + 0.2, s: 1.07, x: 0, y: -20, e: ease.inOut },
          { t: ((c.x_riscos + 0.2) + (c.x_evita + 0.2)) / 2, s: 1.095, x: -12, y: -18, e: ease.inOut },
          { t: c.x_evita + 0.2, s: 1.04, x: -10, y: -10, e: ease.inOut },
          { t: ((c.x_evita + 0.2) + (c.x_urg + 0.3)) / 2, s: 1.105, x: 12, y: -18, e: ease.inOut },
          { t: c.x_urg + 0.3, s: 1.08, x: 10, y: -20, e: ease.inOut },
          { t: c.f_e, s: 1.05, y: -10, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: 100, right: 100, top: 430, display: "flex", gap: 16 }}>
          {COLS.map((col, i) => {
            const p = cols[i];
            return (
              <div key={col.k} style={{ flex: 1, height: 500, boxSizing: "border-box", padding: 16, borderRadius: 28, background: p > 0.5 ? BRAND.deep : C.surface, border: `3px solid ${p > 0.5 ? BRAND.hex : C.line}`, opacity: mix(0.45, 1, Math.min(1, p)), transform: `translateY(${(1 - Math.min(1, p)) * 40 + Math.sin(t * 1.8 + i) * 8}px)`, boxShadow: p > 0.5 ? `0 0 30px ${brandAlpha(0.2)}` : "none" }}>
                <div style={{ display: "flex", justifyContent: "center" }}><CheckDot p={p > 0.5 ? 1 : 0} size={56} /></div>
                <div style={{ marginTop: 14, textAlign: "center", fontWeight: 800, fontSize: 32, color: C.text, letterSpacing: "-0.01em" }}>{col.k}</div>
                <div style={{ textAlign: "center", fontWeight: 700, fontSize: 24, color: C.muted }}>{col.sub}</div>
                {col.rows.map((r, k) => {
                  const q = prog(t, at[i] + 0.3 + k * 0.25, 0.35, ease.out);
                  return <div key={r} style={{ marginTop: 16, height: 90, borderRadius: 18, background: C.surface3, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.text, opacity: q, transform: `translateY(${(1 - q) * -30}px) rotate(${Math.sin(t * 2 + i + k) * 1.5}deg)` }}>{r}</div>;
                })}
              </div>
            );
          })}
        </div>
        {honest > 0.001 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 975, display: "flex", justifyContent: "center", opacity: Math.min(1, honest * 1.5), transform: `scale(${mix(0.6, 1, Math.min(1.06, honest))})` }}>
            <Tag text="NÃO RESOLVE TODOS OS RISCOS" tone="muted" size={30} style={{ color: C.text }} />
          </div>
        ) : null}
        {urg > 0.001 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 1070, display: "flex", justifyContent: "center", alignItems: "center", gap: 20, opacity: Math.min(1, urg * 1.5) }}>
            <div style={{ padding: "16px 24px", borderRadius: 22, background: mix(1, 0, urgDim) > 0.5 ? "rgba(255,107,94,0.14)" : C.surface3, border: `3px solid ${urgDim > 0.5 ? C.dim : C.warn}`, fontWeight: 800, fontSize: 40, color: urgDim > 0.5 ? C.muted : C.warn, transform: `rotate(${Math.sin(t * 6) * (1 - urgDim) * 3}deg) scale(${mix(1.1, 0.85, urgDim)})` }}>URGÊNCIA DO DIA</div>
            <div style={{ fontWeight: 800, fontSize: 40, color: C.muted, opacity: urgDim }}>→</div>
            <div style={{ padding: "16px 24px", borderRadius: 22, background: BRAND.deep, border: `3px solid ${BRAND.hex}`, fontWeight: 800, fontSize: 40, color: C.text, opacity: urgDim, transform: `scale(${mix(0.7, 1, urgDim)})` }}>DECISÃO</div>
          </div>
        ) : null}
      </Camera>
      <div style={{ position: "absolute", left: 100, right: 100, top: 285, textAlign: "center", fontWeight: 800, fontSize: 58, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, enter * 1.5) }}>
        3 FRENTES <span style={{ color: BRAND.hex }}>DE CONTROLE</span>
      </div>
    </div>
  );
};
