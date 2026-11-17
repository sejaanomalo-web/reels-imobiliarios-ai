import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { CheckDot, Label, PropCard, Question, Tag } from "./ui";

/**
 * CENA 3 — TAKE 02, O OUTRO CAMINHO. "No segundo atendimento, vêm três perguntas antes da lista: qual é o objetivo da mudança? O que é
 * indispensável? E o orçamento já foi validado com quem pode orientar sobre crédito, quando necessário?" → ATENDIMENTO 2 · PERGUNTAS
 * PRIMEIRO; três molduras (OBJETIVO / PRIORIDADES / VIABILIDADE) preenchidas na fala — sem valores, simulação ou aprovação. "A partir daí,
 * as opções começam a fazer sentido." → os 10 cartões passam pelo filtro das respostas; ficam 3 que FAZEM SENTIDO.
 */
const Q = [
  { k: "OBJETIVO", q: "Qual é o objetivo da mudança?" },
  { k: "PRIORIDADES", q: "O que é indispensável?" },
  { k: "VIABILIDADE", q: "Orçamento já orientado sobre crédito?" },
];

export const Outro: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const at = [c.o_obj, c.o_indisp, c.o_orc];
  const enter = sp(t, c.o_seg - 0.35, { damping: 15, stiffness: 150 });
  const filt = prog(t, c.o_partir - 0.1, 1.2, ease.inOut);
  const ok = sp(t, c.o_sentido - 0.1, { damping: 12, stiffness: 200 });
  const cur = at.filter((x) => t >= x - 0.15).length - 1;
  const out = prog(t, c.a_perc - 0.45, 0.4, ease.in);
  const keep = [2, 5, 7];

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.o_seg - 0.35, s: 1.04, y: -20 },
          { t: c.o_obj + 0.2, s: 1.05, y: -50, e: ease.inOut },
          { t: c.o_indisp + 0.2, s: 1.05, y: 0, e: ease.inOut },
          { t: c.o_orc + 0.2, s: 1.05, y: 50, e: ease.inOut },
          { t: c.o_partir + 0.4, s: 1.0, y: 50, e: ease.inOut },
          { t: c.a_perc, s: 1.02, y: 50, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: 0, right: 0, top: 290, display: "flex", justifyContent: "center", gap: 12 }}>
          <Tag text="ATENDIMENTO 2 · PERGUNTAS PRIMEIRO" tone="accent" size={28} />
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 350, display: "flex", justifyContent: "center", opacity: prog(t, c.o_tres - 0.1, 0.4, ease.out) }}>
          <Label size={26}>3 PERGUNTAS ANTES DA LISTA</Label>
        </div>
        {Q.map((k, i) => {
          const a = sp(t, c.o_seg + 0.2 + i * 0.15, { damping: 14, stiffness: 190 });
          const on = t >= at[i] - 0.15;
          const f = sp(t, at[i] - 0.15, { damping: 12, stiffness: 200 });
          return (
            <div key={k.k} style={{ position: "absolute", left: 100, right: 100, top: 400 + i * 178 + Math.sin(t * 1.5 + i) * 3, height: 162, boxSizing: "border-box", borderRadius: 30, background: C.surface, border: `3px ${on ? "solid" : "dashed"} ${on ? (cur === i ? BRAND.hex : brandAlpha(0.5)) : C.dim}`, padding: "0 26px", display: "flex", alignItems: "center", gap: 22, opacity: Math.min(1, a * 1.5) * (on ? 1 : 0.55), transform: `translateX(${(1 - Math.min(1, a)) * 100}px) scale(${on && cur === i ? 1.02 : 1})`, boxShadow: on && cur === i ? `0 0 30px ${brandAlpha(0.25)}` : "none" }}>
              <div style={{ transform: `scale(${on ? mix(0.4, 1, Math.min(1.1, f)) : 0.8})`, opacity: on ? 1 : 0.4 }}><Question size={80} color={on ? BRAND.hex : C.dim} ink={on ? BRAND.ink : C.bg0} /></div>
              <div style={{ flex: 1 }}>
                <Label size={26} color={on ? BRAND.hex : C.dim}>{k.k}</Label>
                <div style={{ fontWeight: 800, fontSize: 36, lineHeight: 1.08, letterSpacing: "-0.02em", color: on ? C.text : C.dim, opacity: on ? Math.min(1, f * 1.5) : 0.5 }}>{k.q}</div>
              </div>
              {filt > 0.3 ? <CheckDot p={prog(filt, 0.3 + i * 0.1, 0.3, ease.out)} size={50} /> : null}
            </div>
          );
        })}
        {/* filtro */}
        <div style={{ position: "absolute", left: 100, right: 100, top: 950, height: 360, opacity: prog(t, c.o_partir - 0.3, 0.4, ease.out) }}>
          {Array.from({ length: 10 }).map((_, i) => {
            const kept = keep.includes(i);
            const ki = keep.indexOf(i);
            const x0 = (i % 5) * 176;
            const y0 = Math.floor(i / 5) * 120;
            const x1 = 60 + ki * 280;
            const x = kept ? mix(x0, x1, filt) : x0;
            const y = kept ? mix(y0, 150, filt) : y0 + filt * 40;
            return (
              <div key={i} style={{ position: "absolute", left: x, top: y, opacity: kept ? 1 : mix(1, 0.08, filt), transform: `scale(${kept ? mix(0.62, 1, filt) : 0.62})`, transformOrigin: "0 0" }}>
                <PropCard w={240} i={i} ok={kept && ok > 0.5} />
              </div>
            );
          })}
          {ok > 0.001 ? (
            <div style={{ position: "absolute", left: 0, right: 0, top: 70, display: "flex", justifyContent: "center", opacity: Math.min(1, ok * 1.5), transform: `scale(${mix(0.5, 1, Math.min(1.08, ok))})` }}>
              <Tag text="OPÇÕES QUE FAZEM SENTIDO" tone="accent" size={28} />
            </div>
          ) : null}
        </div>
      </Camera>
    </div>
  );
};
