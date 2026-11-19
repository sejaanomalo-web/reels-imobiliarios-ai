import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { IconChat, IconUser } from "./ui";

/**
 * CENA 3 — MUDANÇA DE PERCEPÇÃO. "Só que atender bem não significa falar alto, sorrir o tempo todo ou repetir que a venda vai
 * acontecer." → coluna PERFORMANCE se enche, a balança pende para ela. "Significa chegar sabendo o que a pessoa procura, os limites
 * daquela negociação e o que explicar com honestidade." → a performance é riscada, a coluna PREPARAÇÃO se preenche e a balança vira.
 */
const LEFT = ["Falar alto", "Sorrir o tempo todo", "“A venda vai sair!”"];
const RIGHT = ["O que ele procura", "Limites da negociação", "Explicar com honestidade"];

const IconScale: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M12 4v16M6 20h12M5 8h14" stroke={color} strokeWidth={2} strokeLinecap="round" /><path d="M5 8l-3 6h6zM19 8l-3 6h6z" stroke={color} strokeWidth={2} strokeLinejoin="round" /></svg>
);

export const Percepcao: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.q_so - 0.15, { damping: 15, stiffness: 140 });
  const lt = [c.q_alto, c.q_sorrir, c.q_rep].map((a) => sp(t, a - 0.1, { damping: 12, stiffness: 200 }));
  const rt = [c.q_proc, c.q_lim, c.q_hon].map((a) => sp(t, a - 0.1, { damping: 13, stiffness: 180 }));
  const strike = [0, 1, 2].map((i) => prog(t, c.q_sig + 0.1 + i * 0.18, 0.35, ease.out));
  const heavyL = (lt[0] + lt[1] + lt[2]) / 3;
  const heavyR = (rt[0] + rt[1] + rt[2]) / 3;
  const tilt = mix(0, -9, Math.min(1, heavyL)) * (1 - prog(t, c.q_sig - 0.1, 0.6, ease.inOut)) + 9 * Math.min(1, heavyR) + Math.sin(t * 2.2) * 0.8;
  const out = prog(t, c.m_antes - 0.45, 0.4, ease.in);
  const colW = 420;

  const Col: React.FC<{ x: number; head: string; good: boolean; items: string[]; ps: number[] }> = ({ x, head, good, items, ps }) => (
    <div style={{ position: "absolute", left: x, top: 440, width: colW }}>
      <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 32, letterSpacing: "0.12em", color: good ? BRAND.hex : C.warn, textAlign: "center", paddingBottom: 18, borderBottom: `4px solid ${good ? BRAND.hex : C.warn}` }}>{head}</div>
      {items.map((s, i) => {
        const p = ps[i];
        const st = good ? 0 : strike[i];
        return (
          <div key={s} style={{ position: "relative", marginTop: 24, height: 116, boxSizing: "border-box", borderRadius: 24, padding: "0 22px", display: "flex", alignItems: "center", gap: 16, background: good ? brandAlpha(0.08) : C.surface, border: `2px solid ${good ? brandAlpha(0.45) : C.line}`, opacity: Math.min(1, p * 1.5) * mix(1, 0.45, st), transform: `translateX(${(1 - Math.min(1, p)) * (good ? 160 : -160)}px)` }}>
            {good ? (i === 0 ? <IconUser size={46} /> : i === 1 ? <IconScale size={46} color={BRAND.hex} /> : <IconChat size={46} />) : null}
            <span style={{ fontWeight: 800, fontSize: 36, lineHeight: 1.08, color: C.text }}>{s}</span>
            {st > 0 ? <div style={{ position: "absolute", left: 16, top: "50%", height: 6, borderRadius: 3, width: `calc(${st * 100}% - 32px)`, background: C.warn }} /> : null}
          </div>
        );
      })}
    </div>
  );

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.q_so - 0.2, s: 0.96, y: 30 },
          { t: c.q_rep + 0.6, s: 1.02, x: 60, y: 0, e: ease.inOut },
          { t: c.q_sig + 0.3, s: 1.0, x: 0, y: 0, e: ease.inOut },
          { t: c.q_hon + 0.4, s: 1.04, x: -50, y: -10, e: ease.inOut },
          { t: c.m_antes, s: 1.05, x: -50, y: -10, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: 0, right: 0, top: 300, textAlign: "center", fontWeight: 800, fontSize: 84, letterSpacing: "-0.04em", color: C.text, transform: `translateY(${(1 - Math.min(1, enter)) * 40}px)` }}>
          ATENDER <span style={{ color: BRAND.hex }}>BEM</span>
        </div>
        <Col x={90} head="PERFORMANCE" good={false} items={LEFT} ps={lt} />
        <Col x={570} head="PREPARAÇÃO" good items={RIGHT} ps={rt} />
        {/* balança */}
        <div style={{ position: "absolute", left: 140, top: 1100, width: 800, height: 8, borderRadius: 4, background: C.muted, transform: `rotate(${tilt}deg)`, transformOrigin: "50% 50%" }}>
          <div style={{ position: "absolute", left: -10, top: -24, width: 60, height: 24, borderRadius: "8px 8px 0 0", background: C.warn, opacity: 0.4 + 0.6 * Math.min(1, heavyL) * (1 - strike[2] * 0.6) }} />
          <div style={{ position: "absolute", right: -10, top: -24, width: 60, height: 24, borderRadius: "8px 8px 0 0", background: BRAND.hex, opacity: 0.3 + 0.7 * Math.min(1, heavyR) }} />
        </div>
        <div style={{ position: "absolute", left: 528, top: 1104, width: 0, height: 0, borderLeft: "24px solid transparent", borderRight: "24px solid transparent", borderBottom: `70px solid ${C.surface3}`, transform: "translateX(-12px)" }} />
      </Camera>
    </div>
  );
};
