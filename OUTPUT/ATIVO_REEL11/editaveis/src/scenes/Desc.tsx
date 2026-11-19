import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Chip, Tag } from "./ui";

/**
 * CENA 2 — O DESCOMPASSO. "Na corretagem, a entrada de receita pode ser irregular." → calendário do mês (ilustrativo, sem valores) com uma
 * única ENTRADA. "Enquanto uma comissão não entra, continuam existindo deslocamentos, divulgação, contas e tempo dedicado a visitas." →
 * marcas de SAÍDA se espalham pelos dias, uma categoria por palavra. "Se cada negócio começa do zero, a pressão do mês seguinte aumenta." →
 * PRESSÃO DO MÊS SEGUINTE enche. Texto-chave: VENDA ≠ CAIXA DISPONÍVEL.
 */
const OUT_DAYS = [[1, 5, 9, 15, 20, 26], [4, 11, 18, 25], [2, 8, 14, 22, 27], [6, 12, 17, 23]];
const CATS = ["DESLOCAMENTOS", "DIVULGAÇÃO", "CONTAS", "TEMPO EM VISITAS"];

export const Desc: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.d_na - 0.35, { damping: 15, stiffness: 150 });
  const inc = sp(t, c.d_irreg - 0.3, { damping: 11, stiffness: 200 });
  const pend = prog(t, c.d_nao - 0.1, 0.4, ease.out);
  const cats = [c.d_desl, c.d_div, c.d_cont, c.d_vis].map((x) => prog(t, x - 0.1, 0.5, ease.out));
  const press = prog(t, c.d_press - 0.1, 1.4, ease.inOut);
  const out = prog(t, c.r_pensa - 0.45, 0.4, ease.in);
  const W = 840, cw = W / 7;

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={1.2}
        t={t}
        keys={[
          { t: c.d_na - 0.35, s: 1.05, y: 0 },
          { t: ((c.d_na - 0.35) + (c.d_irreg + 0.2)) / 2, s: 1.115, x: 12, y: -18, e: ease.inOut },
          { t: c.d_irreg + 0.2, s: 1.09, x: -15, y: -15, e: ease.inOut },
          { t: ((c.d_irreg + 0.2) + (c.d_nao + 0.2)) / 2, s: 1.115, x: -12, y: -18, e: ease.inOut },
          { t: c.d_nao + 0.2, s: 1.04, x: 0, y: -5, e: ease.inOut },
          { t: ((c.d_nao + 0.2) + (c.d_desl + 0.2)) / 2, s: 1.095, x: 12, y: -18, e: ease.inOut },
          { t: c.d_desl + 0.2, s: 1.07, x: 15, y: -15, e: ease.inOut },
          { t: ((c.d_desl + 0.2) + (c.d_div + 0.2)) / 2, s: 1.095, x: -12, y: -18, e: ease.inOut },
          { t: c.d_div + 0.2, s: 1.04, x: -15, y: -10, e: ease.inOut },
          { t: ((c.d_div + 0.2) + (c.d_cont + 0.2)) / 2, s: 1.095, x: 12, y: -18, e: ease.inOut },
          { t: c.d_cont + 0.2, s: 1.07, x: 15, y: -15, e: ease.inOut },
          { t: ((c.d_cont + 0.2) + (c.d_vis + 0.2)) / 2, s: 1.095, x: -12, y: -18, e: ease.inOut },
          { t: c.d_vis + 0.2, s: 1.04, x: -10, y: -10, e: ease.inOut },
          { t: ((c.d_vis + 0.2) + (c.d_zero + 0.2)) / 2, s: 1.095, x: 12, y: -18, e: ease.inOut },
          { t: c.d_zero + 0.2, s: 1.07, x: 0, y: -15, e: ease.inOut },
          { t: ((c.d_zero + 0.2) + (c.d_press + 0.6)) / 2, s: 1.125, x: -12, y: -18, e: ease.inOut },
          { t: c.d_press + 0.6, s: 1.1, x: 0, y: -25, e: ease.inOut },
          { t: c.r_pensa, s: 1.06, y: -10, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: 120, top: 420, width: W, boxSizing: "border-box", padding: 18, borderRadius: 30, background: C.surface, border: `2px solid ${C.line}`, transform: `translateY(${Math.sin(t * 1.4) * 6}px) rotate(${Math.sin(t * 0.9) * 0.6}deg)` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, color: C.text }}>MÊS ILUSTRATIVO</span>
            <span style={{ display: "flex", gap: 10 }}>
              <Tag text="ENTRADA" tone="accent" size={22 + 2} />
              <Tag text="SAÍDA" tone="warn" size={24} />
            </span>
          </div>
          <div style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8 }}>
            {Array.from({ length: 28 }).map((_, d) => {
              const isIn = d === 3;
              let o = 0;
              OUT_DAYS.forEach((ds, k) => { if (ds.includes(d)) o = Math.max(o, prog(cats[k], ds.indexOf(d) * 0.12, 0.3, ease.out)); });
              const later = d === 24;
              return (
                <div key={d} style={{ position: "relative", height: cw * 0.7, borderRadius: 12, background: C.surface2, border: isIn && inc > 0.5 ? `3px solid ${BRAND.hex}` : later && pend > 0.5 ? `3px dashed ${C.dim}` : "3px solid transparent" }}>
                  {isIn && inc > 0.001 ? <div style={{ position: "absolute", inset: 8, borderRadius: 8, background: BRAND.hex, opacity: Math.min(1, inc * 1.5), transform: `scale(${mix(0.3, 1, Math.min(1.1, inc))})`, boxShadow: `0 0 20px ${brandAlpha(0.5)}` }} /> : null}
                  {later && pend > 0.5 ? <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 32, color: C.muted }}>?</div> : null}
                  {o > 0 ? <div style={{ position: "absolute", left: "50%", top: "50%", width: 22, height: 22, marginLeft: -11, marginTop: -11, borderRadius: 11, background: C.warn, opacity: o * 0.9, transform: `scale(${mix(2, 1, o) * (1 + 0.25 * Math.max(0, Math.sin(t * 4 + d)))})` }} /> : null}
                </div>
              );
            })}
          </div>
        </div>
        {pend > 0.001 ? <div style={{ position: "absolute", left: 0, right: 0, top: 905, display: "flex", justifyContent: "center", opacity: pend }}><Tag text="PRÓXIMA COMISSÃO: AINDA NÃO ENTROU" tone="muted" size={26} style={{ color: C.text }} /></div> : null}
        <div style={{ position: "absolute", left: 100, right: 100, top: 975, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
          {CATS.map((k, i) => (cats[i] > 0 ? <div key={k} style={{ opacity: cats[i], transform: `translateY(${(1 - cats[i]) * 30 + Math.sin(t * 2 + i) * 5}px)` }}><Chip text={k} tone="warn" size={28} /></div> : null))}
        </div>
        {press > 0 ? (
          <div style={{ position: "absolute", left: 160, right: 160, top: 1145 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted }}><span>PRESSÃO DO MÊS SEGUINTE</span><span style={{ color: C.warn }}>↑</span></div>
            <div style={{ marginTop: 8, height: 22, borderRadius: 11, background: C.surface3, overflow: "hidden" }}>
              <div style={{ width: `${press * 88 + Math.sin(t * 4) * 2}%`, height: "100%", borderRadius: 11, background: C.warn }} />
            </div>
          </div>
        ) : null}
      </Camera>
      <div style={{ position: "absolute", left: 80, right: 80, top: 285, textAlign: "center", fontWeight: 800, fontSize: 58, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, enter * 1.5) }}>
        VENDA <span style={{ color: C.warn }}>≠</span> <span style={{ color: BRAND.hex }}>CAIXA DISPONÍVEL</span>
      </div>
    </div>
  );
};
