import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, rnd, sp } from "../../../lib/anim";
import { House } from "../../../components/Art";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { LEAD, Mark, Tag } from "./ui";

/**
 * CENA 03 — TENSÃO. "Uma recomendação útil explica a relação entre o imóvel e a prioridade do cliente.
 * Não precisa de dez adjetivos. Precisa de critério."
 * As prioridades do cliente (escola perto, duas vagas) se ligam, por linhas, às duas fichas que as atendem.
 * Dez adjetivos flutuam e caem; fica o carimbo CRITÉRIO.
 */
const ADJ = ["lindo", "incrível", "imperdível", "espaçoso", "charmoso", "moderno", "exclusivo", "iluminado", "sofisticado", "aconchegante"];
const PRIO = [
  { label: "Escola perto", x: 110 },
  { label: "2 vagas", x: 590 },
];
const CARDS = [
  { name: "Imóvel 1", fact: "escola a 5 min a pé", x: 70 },
  { name: "Imóvel 2", fact: "2 vagas na garagem", x: 560 },
];

export const Criterio: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const prio = sp(t, c.ten_rec, { damping: 15, stiffness: 150 });
  const cards = [0, 1].map((i) => sp(t, c.ten_rec + 0.5 + i * 0.15, { damping: 15, stiffness: 140 }));
  const links = [c.ten_rel, c.ten_prio].map((at) => prog(t, at + 0.1, 0.6, ease.inOut));
  const facts = [c.ten_rel, c.ten_prio].map((at) => sp(t, at + 0.55, { damping: 12, stiffness: 190 }));
  const adjStart = c.ten_adj - 1.1;
  const fall = prog(t, c.ten_crit - 0.55, 0.7, ease.in);
  const crit = sp(t, c.ten_crit + 0.05, { damping: 11, stiffness: 220 });
  const exit = prog(t, c.ins_few - 0.25, 0.45, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - exit }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.ten_rec, s: 0.95, y: -20 },
          { t: c.ten_rel + 0.3, s: 1.06, y: -40, x: -60, e: ease.inOut },
          { t: c.ten_prio + 0.3, s: 1.06, y: -40, x: 60, e: ease.inOut },
          { t: c.ten_adj, s: 1.0, y: 0, x: 0, e: ease.inOut },
          { t: c.ten_crit + 0.4, s: 1.04, y: 40, e: ease.inOut },
          { t: c.ins_few + 0.2, s: 0.95, y: 20, e: ease.in },
        ]}
      >
        {/* prioridades do cliente */}
        <div style={{ position: "absolute", left: 70, top: 270, width: 940, height: 190, boxSizing: "border-box", borderRadius: 38, background: C.surface2, border: `1px solid ${C.line}`, padding: "22px 30px", opacity: Math.min(1, prio * 1.5), transform: `translateY(${(1 - Math.min(1, prio)) * -60}px)`, boxShadow: "0 30px 80px rgba(0,0,0,0.5)" }}>
          <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 22, letterSpacing: "0.1em", color: C.muted }}>PRIORIDADES DO {LEAD.name.toUpperCase()}</div>
          {PRIO.map((p, i) => (
            <div key={p.label} style={{ position: "absolute", left: p.x - 70 + 30, top: 82, padding: "14px 28px", borderRadius: 30, background: links[i] > 0.5 ? "rgba(53,224,161,0.16)" : C.surface3, border: `2px solid ${links[i] > 0.5 ? C.accent : "transparent"}`, fontWeight: 800, fontSize: 40, color: C.text }}>
              {p.label}
            </div>
          ))}
        </div>
        {/* linhas de relação */}
        <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {[0, 1].map((i) => (
            <path key={i} d={`M${[230, 690][i]} 460 V${[580, 580][i]}`} stroke={C.accent} strokeWidth={5} strokeLinecap="round" strokeDasharray={`${130 * links[i]} 200`} />
          ))}
        </svg>
        {/* as duas fichas */}
        {CARDS.map((k, i) => (
          <div key={k.name} style={{ position: "absolute", left: k.x, top: 590, width: 450, height: 420, boxSizing: "border-box", borderRadius: 36, overflow: "hidden", background: C.surface, border: `2px solid ${facts[i] > 0.5 ? "rgba(53,224,161,0.55)" : C.line}`, opacity: Math.min(1, cards[i] * 1.5), transform: `translateY(${(1 - Math.min(1, cards[i])) * 120}px)`, boxShadow: "0 40px 90px rgba(0,0,0,0.5)" }}>
            <div style={{ height: 200, background: C.surface2, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
              <House w={240} h={170} />
            </div>
            <div style={{ padding: "22px 26px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: 800, fontSize: 38, color: C.text }}>{k.name}</span>
                <Tag text="ILUSTRATIVO" tone="muted" size={15} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 20, opacity: Math.min(1, facts[i] * 1.5), transform: `translateX(${(1 - Math.min(1, facts[i])) * 30}px)` }}>
                <Mark ok size={46} />
                <span style={{ fontWeight: 800, fontSize: 31, color: C.accent }}>{k.fact}</span>
              </div>
            </div>
          </div>
        ))}
        {/* dez adjetivos */}
        {ADJ.map((w, i) => {
          const at = adjStart + i * 0.12;
          const a = sp(t, at, { damping: 13, stiffness: 180 });
          if (a <= 0) return null;
          const x = 60 + rnd(i * 5.3) * 760;
          const y = 520 + rnd(i * 2.9 + 1) * 520;
          const f = fall;
          return (
            <div key={w} style={{ position: "absolute", left: x, top: y + f * f * 900, padding: "10px 22px", borderRadius: 22, background: "rgba(42,47,55,0.95)", border: "2px solid rgba(255,255,255,0.15)", fontWeight: 800, fontSize: 36, color: "#C3C8D0", opacity: Math.min(1, a * 1.5) * (1 - f), transform: `scale(${mix(0.5, 1, Math.min(1, a))}) rotate(${(rnd(i) - 0.5) * 16 + f * (rnd(i * 9) - 0.5) * 80}deg)`, boxShadow: "0 16px 40px rgba(0,0,0,0.5)" }}>
              {w}
            </div>
          );
        })}
        {/* CRITÉRIO */}
        {crit > 0 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 1040, display: "flex", justifyContent: "center" }}>
            <div style={{ padding: "18px 56px", borderRadius: 34, border: `6px solid ${C.accent}`, background: "rgba(7,40,29,0.95)", fontWeight: 800, fontSize: 120, letterSpacing: "-0.03em", color: C.accent, transform: `rotate(-3deg) scale(${mix(2, 1, Math.min(1, crit))})`, opacity: Math.min(1, crit * 2), boxShadow: "0 30px 90px rgba(0,0,0,0.6), 0 0 90px rgba(53,224,161,0.3)" }}>
              CRITÉRIO
            </div>
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
