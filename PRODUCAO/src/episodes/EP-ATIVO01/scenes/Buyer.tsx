import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Avatar, House } from "../../../components/Art";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Chapter, Mark, PATHS, Tag } from "./ui";

/**
 * CENA 2 — O COMPRADOR. "Imagine o primeiro. Ele trabalha a partir do comprador. Conversa, descobre o que aquela família precisa
 * e procura a opção adequada, mesmo quando ela não está entre os imóveis que já divulga. O valor dele está na curadoria e no relacionamento."
 * Cartão do comprador (família ilustrativa) com critérios; imóveis passam pelo filtro — quatro saem, um fica, e ele é de fora da
 * divulgação própria. NECESSIDADE → BUSCA → INDICAÇÃO acende no tempo da fala. Sem endereços reais.
 */
const OPTS = [
  { n: "Apto 2q · Centro", ok: false },
  { n: "Casa 3q · sem quintal", ok: false },
  { n: "Apto 3q · longe da escola", ok: false },
  { n: "Casa 3q · quintal, perto da escola", ok: true },
  { n: "Cobertura · 2q", ok: false },
];
const FLOW = [["NECESSIDADE", "b_need"], ["BUSCA", "b_search"], ["INDICAÇÃO", "b_right"]] as const;

export const Buyer: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const col = PATHS[0].color;
  const chap = sp(t, c.b_first - 0.05, { damping: 14, stiffness: 170 });
  const card = sp(t, c.b_first + 0.35, { damping: 15, stiffness: 150 });
  const crit = [0, 1, 2].map((i) => sp(t, c.b_talk + 0.3 + i * 0.35, { damping: 12, stiffness: 200 }));
  const stream = (i: number) => prog(t, c.b_search - 0.1 + i * 0.32, 1.0, ease.inOut);
  const out = prog(t, c.b_notin - 0.1, 0.5, ease.out);
  const value = sp(t, c.b_value - 0.1, { damping: 13, stiffness: 180 });
  const exit = prog(t, c.p_second - 0.2, 0.45, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - exit }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.b_first - 0.3, s: 1.14, y: -160, r: 1.5 },
          { t: c.b_buyer + 0.3, s: 1.1, y: -120, r: 0, e: ease.inOut },
          { t: c.b_talk + 0.4, s: 1.04, y: -80, e: ease.inOut },
          { t: c.b_search + 0.3, s: 1.0, y: 40, e: ease.inOut },
          { t: c.b_notin + 0.4, s: 1.05, y: 80, x: 0, e: ease.inOut },
          { t: c.b_value + 0.4, s: 1.0, y: 40, x: 0, e: ease.inOut },
          { t: c.p_second + 0.3, s: 0.94, y: 20, e: ease.in },
        ]}
      >
        <div style={{ position: "absolute", left: 70, top: 270 }}>
          <Chapter n={1} text="A PARTIR DO COMPRADOR" p={chap} color={col} />
        </div>
        {/* cartão do comprador */}
        <div style={{ position: "absolute", left: 70, top: 370, width: 940, boxSizing: "border-box", borderRadius: 36, background: C.surface, border: `2px solid ${col}55`, padding: "24px 28px", opacity: Math.min(1, card * 1.5), transform: `translateY(${(1 - Math.min(1, card)) * 80}px)`, boxShadow: "0 40px 90px rgba(0,0,0,0.5)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ display: "flex" }}>
              {["#6E7A5A", "#7A5A6E", "#5A6E8C"].map((bg, k) => (
                <div key={k} style={{ marginLeft: k ? -18 : 0 }}><Avatar size={64} label={["M", "P", "L"][k]} bg={bg} /></div>
              ))}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: 36, color: C.text }}>Família · comprador</div>
              <div style={{ fontWeight: 600, fontSize: 24, color: C.muted }}>perfil ilustrativo</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 14, marginTop: 20 }}>
            {["3 quartos", "perto da escola", "quintal"].map((k, i) => (
              <span key={k} style={{ padding: "10px 20px", borderRadius: 22, background: `${col}22`, border: `2px solid ${col}88`, fontWeight: 800, fontSize: 30, color: C.text, opacity: Math.min(1, crit[i] * 1.5), transform: `scale(${mix(0.5, 1, Math.min(1.08, crit[i]))})`, display: "inline-block" }}>{k}</span>
            ))}
          </div>
          {/* NECESSIDADE → BUSCA → INDICAÇÃO */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 24 }}>
            {FLOW.map(([k, cue], i) => {
              const on = prog(t, c[cue] - 0.1, 0.4, ease.out);
              return (
                <React.Fragment key={k}>
                  {i > 0 ? <span style={{ fontWeight: 800, fontSize: 34, color: on > 0.5 ? col : C.dim }}>→</span> : null}
                  <span style={{ padding: "10px 16px", borderRadius: 16, fontFamily: F.mono, fontWeight: 700, fontSize: 26, letterSpacing: "0.04em", background: on > 0.5 ? col : C.surface2, color: on > 0.5 ? C.ink : C.dim, transform: `scale(${1 + 0.08 * Math.sin(Math.PI * on)})`, display: "inline-block" }}>{k}</span>
                </React.Fragment>
              );
            })}
          </div>
        </div>
        {/* filtro */}
        <div style={{ position: "absolute", left: 390, top: 760, width: 300, height: 360, borderRadius: 30, border: `4px dashed ${col}`, opacity: Math.min(1, stream(0) * 3) * (1 - out * 0.6) }} />
        {OPTS.map((o, i) => {
          const s = stream(i);
          if (s <= 0) return null;
          const passing = o.ok;
          const x = passing ? mix(1100, 405, Math.min(1, s * 1.6)) : mix(1100, -340, s);
          const y = passing ? 790 : 790 + (s > 0.55 ? (s - 0.55) * 500 : 0);
          return (
            <div key={o.n} style={{ position: "absolute", left: x, top: y, width: 270, borderRadius: 22, overflow: "hidden", background: C.surface2, border: `2px solid ${passing && s > 0.6 ? col : C.line}`, opacity: passing ? 1 : 1 - Math.max(0, s - 0.55) * 2.2, boxShadow: passing && s > 0.6 ? `0 0 60px ${col}55` : "0 20px 40px rgba(0,0,0,0.45)" }}>
              <div style={{ height: 150, background: "#1A1E24", display: "flex", alignItems: "flex-end", justifyContent: "center" }}><House w={170} h={130} /></div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px" }}>
                {s > 0.5 ? <Mark ok={passing} size={34} /> : null}
                <span style={{ fontWeight: 800, fontSize: 26, lineHeight: 1.15, color: C.text }}>{o.n}</span>
              </div>
            </div>
          );
        })}
        {out > 0 ? (
          <div style={{ position: "absolute", left: 700, top: 820, opacity: out, transform: `translateX(${(1 - out) * 40}px)` }}>
            <Tag text="FORA DA SUA DIVULGAÇÃO" tone="accent" size={22} style={{ background: "rgba(9,38,20,0.95)" }} />
          </div>
        ) : null}
        {value > 0 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 1170, display: "flex", justifyContent: "center", opacity: Math.min(1, value * 1.5), transform: `scale(${mix(0.6, 1, Math.min(1.06, value))})` }}>
            <div style={{ padding: "14px 30px", borderRadius: 28, background: C.surface2, border: `2px solid ${col}`, fontWeight: 800, fontSize: 40, color: C.text }}>
              <span style={{ color: col }}>curadoria</span> + relacionamento
            </div>
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
