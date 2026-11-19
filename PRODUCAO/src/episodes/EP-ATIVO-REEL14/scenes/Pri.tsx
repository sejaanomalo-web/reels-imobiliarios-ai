import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Chip } from "./ui";

/**
 * CENA 4 — O PRINCÍPIO. "Conhecer o imóvel é obrigatório." → FICHA TÉCNICA ✓ OBRIGATÓRIO. "Mas saber selecionar quais informações importam
 * para aquele comprador é o que transforma uma apresentação em orientação." → FICHA TÉCNICA + CONTEXTO = APRESENTAÇÃO → vira ORIENTAÇÃO.
 * "Não substitua a ficha técnica; use a ficha depois de entender a pergunta." → ordem 1 PERGUNTA → 2 FICHA. Texto-chave: ENTENDA ANTES DE
 * APRESENTAR.
 */
export const Pri: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.p_conh - 0.35, { damping: 15, stiffness: 150 });
  const ficha = sp(t, c.p_conh - 0.1, { damping: 12, stiffness: 190 });
  const obr = sp(t, c.p_obr - 0.1, { damping: 12, stiffness: 200 });
  const plus = sp(t, c.p_sel - 0.1, { damping: 12, stiffness: 200 });
  const eq = sp(t, c.p_apres - 0.2, { damping: 12, stiffness: 190 });
  const turn = prog(t, c.p_orient - 0.1, 0.5, ease.inOut);
  const order = sp(t, c.p_depois - 0.3, { damping: 12, stiffness: 190 });
  const out = prog(t, c.x_na - 0.45, 0.4, ease.in);
  const box = (label: string, good: boolean, p: number) => (
    <div style={{ padding: "26px 28px", borderRadius: 28, background: good ? BRAND.deep : C.surface, border: `3px solid ${good ? BRAND.hex : C.line}`, fontWeight: 800, fontSize: 40, color: C.text, textAlign: "center", lineHeight: 1.05, opacity: Math.min(1, p * 1.5), transform: `scale(${mix(0.5, 1, Math.min(1.06, p))}) translateY(${Math.sin(t * 1.8 + label.length) * 6}px)`, boxShadow: good ? `0 0 26px ${brandAlpha(0.3)}` : "none" }}>{label}</div>
  );

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={1.2}
        t={t}
        keys={[
          { t: c.p_conh - 0.35, s: 1.05, y: 0 },
          { t: ((c.p_conh - 0.35) + (c.p_obr + 0.2)) / 2, s: 1.115, x: 12, y: -18, e: ease.inOut },
          { t: c.p_obr + 0.2, s: 1.09, x: -15, y: -15, e: ease.inOut },
          { t: ((c.p_obr + 0.2) + (c.p_sel + 0.2)) / 2, s: 1.115, x: -12, y: -18, e: ease.inOut },
          { t: c.p_sel + 0.2, s: 1.05, x: 0, y: -10, e: ease.inOut },
          { t: ((c.p_sel + 0.2) + (c.p_apres + 0.2)) / 2, s: 1.105, x: 12, y: -18, e: ease.inOut },
          { t: c.p_apres + 0.2, s: 1.08, x: 10, y: -15, e: ease.inOut },
          { t: ((c.p_apres + 0.2) + (c.p_orient + 0.3)) / 2, s: 1.105, x: -12, y: -18, e: ease.inOut },
          { t: c.p_orient + 0.3, s: 1.04, x: 0, y: -5, e: ease.inOut },
          { t: ((c.p_orient + 0.3) + (c.p_ficha + 0.2)) / 2, s: 1.105, x: 12, y: -18, e: ease.inOut },
          { t: c.p_ficha + 0.2, s: 1.08, x: 0, y: -15, e: ease.inOut },
          { t: ((c.p_ficha + 0.2) + (c.p_depois + 0.3)) / 2, s: 1.105, x: -12, y: -18, e: ease.inOut },
          { t: c.p_depois + 0.3, s: 1.05, x: 0, y: -10, e: ease.inOut },
          { t: c.x_na, s: 1.08, y: -15, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: 0, right: 0, top: 460, display: "flex", justifyContent: "center", alignItems: "center", gap: 20 }}>
          {box("FICHA TÉCNICA", false, ficha)}
          {plus > 0.001 ? <div style={{ fontWeight: 800, fontSize: 70, color: BRAND.hex, opacity: Math.min(1, plus * 1.5) }}>+</div> : null}
          {plus > 0.001 ? box("CONTEXTO", true, plus) : null}
        </div>
        {obr > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 620, display: "flex", justifyContent: "center", opacity: Math.min(1, obr * 1.5) * (1 - Math.min(1, plus * 2) * 0.6) }}><Chip text="CONHECER O IMÓVEL: OBRIGATÓRIO ✓" tone="good" size={28} /></div> : null}
        {plus > 0.001 && eq < 1 ? (
          <div style={{ position: "absolute", left: 100, right: 100, top: 740, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14, opacity: Math.min(1, plus * 1.5) * (1 - Math.min(1, eq * 1.5)) }}>
            {["METRAGEM", "PORCELANATO", "SALÃO DE FESTAS", "ACADEMIA", "O QUE ATENDE A FAMÍLIA"].map((k, i) => { const sel = prog(t, c.p_sel + 0.4 + i * 0.25, 0.3, ease.out); return <div key={k} style={{ opacity: i === 4 ? sel : 1 - sel * 0.6, transform: `translateY(${Math.sin(t * 2 + i) * 6}px)` }}><Chip text={k} tone={i === 4 ? "good" : "plain"} size={30} /></div>; })}
            <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: 8 }}><span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, color: BRAND.hex }}>SELECIONAR</span></div>
          </div>
        ) : null}
        {eq > 0.001 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 700, display: "flex", flexDirection: "column", alignItems: "center", gap: 10, opacity: Math.min(1, eq * 1.5) }}>
            <div style={{ fontWeight: 800, fontSize: 70, color: C.muted }}>=</div>
            <div style={{ position: "relative", width: 640, height: 130 }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: 30, background: C.surface2, border: `3px solid ${C.line}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 52, color: C.muted, opacity: 1 - turn, transform: `rotateX(${turn * 90}deg)` }}>APRESENTAÇÃO</div>
              <div style={{ position: "absolute", inset: 0, borderRadius: 30, background: BRAND.hex, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 56, color: BRAND.ink, opacity: turn, transform: `rotateX(${(1 - turn) * -90}deg) scale(${1 + 0.02 * Math.sin(t * 4)})`, boxShadow: `0 0 40px ${brandAlpha(0.45)}` }}>ORIENTAÇÃO</div>
            </div>
          </div>
        ) : null}
        {order > 0.001 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 1010, display: "flex", justifyContent: "center", alignItems: "center", gap: 18, opacity: Math.min(1, order * 1.5), transform: `translateY(${(1 - Math.min(1, order)) * 50}px)` }}>
            <Chip text="1. PERGUNTA" tone="good" size={34} />
            <div style={{ fontWeight: 800, fontSize: 50, color: BRAND.hex }}>→</div>
            <Chip text="2. FICHA" size={34} />
          </div>
        ) : null}
      </Camera>
      <div style={{ position: "absolute", left: 80, right: 80, top: 285, textAlign: "center", fontWeight: 800, fontSize: 56, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, enter * 1.5) }}>
        ENTENDA <span style={{ color: BRAND.hex }}>ANTES DE APRESENTAR</span>
      </div>
    </div>
  );
};
