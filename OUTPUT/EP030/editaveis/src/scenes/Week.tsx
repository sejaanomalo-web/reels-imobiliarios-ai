import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Mark, Tag } from "./ui";

/**
 * CENA 04 — INSIGHT. "O objetivo não é cobrar uma venda toda semana. É impedir que a carteira vire um arquivo esquecido.
 * Registre as decisões e revise na próxima reunião."
 * 1) "VENDA TODA SEMANA" é riscado. 2) Fichas deslizam para uma gaveta de arquivo morto, empoeirando — a gaveta é
 * barrada e elas voltam. 3) Uma linha do tempo semanal liga a reunião de hoje à próxima: concluídas ✓, pendentes seguem.
 */
const TASKS = [
  { k: "fotos novas · Studio Vila Sul", done: true },
  { k: "ligar proprietário · Apto Praça", done: true },
  { k: "rever anúncio · Cobertura Mar", done: false },
];

export const Week: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const p1 = sp(t, c.ins_goal - 0.05, { damping: 15, stiffness: 160 });
  const strike = prog(t, c.ins_sale + 0.35, 0.5, ease.out);
  const out1 = prog(t, c.ins_stop - 0.25, 0.45, ease.in);
  const p2 = sp(t, c.ins_stop - 0.1, { damping: 15, stiffness: 150 });
  const slide = prog(t, c.ins_stop + 0.2, 1.2, ease.inOut);
  const block = sp(t, c.ins_forgot + 0.45, { damping: 11, stiffness: 220 });
  const back = prog(t, c.ins_forgot + 0.6, 0.6, ease.out);
  const out2 = prog(t, c.ins_reg - 0.25, 0.45, ease.in);
  const p3 = sp(t, c.ins_reg - 0.1, { damping: 15, stiffness: 150 });
  const line = prog(t, c.ins_reg + 0.2, 1.6, ease.inOut);
  const next = sp(t, c.ins_next - 0.05, { damping: 13, stiffness: 180 });
  const carry = prog(t, c.ins_next + 0.3, 0.8, ease.inOut);
  const exit = prog(t, c.cta_org - 0.15, 0.45, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - exit }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.ins_goal, s: 1.0, y: -40 },
          { t: c.ins_stop, s: 1.06, y: 0, e: ease.inOut },
          { t: c.ins_reg, s: 1.0, y: 20, e: ease.inOut },
          { t: c.ins_next + 0.5, s: 1.05, y: 40, e: ease.inOut },
          { t: c.cta_org + 0.3, s: 0.95, y: 20, e: ease.in },
        ]}
      >
        {/* 1 — não é cobrar venda */}
        {out1 < 1 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 560, textAlign: "center", opacity: Math.min(1, p1 * 1.5) * (1 - out1), transform: `translateY(${(1 - Math.min(1, p1)) * 40 - out1 * 80}px)` }}>
            <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 30, letterSpacing: "0.12em", color: C.muted }}>O OBJETIVO NÃO É COBRAR</div>
            <div style={{ position: "relative", display: "inline-block", marginTop: 20, fontWeight: 800, fontSize: 112, lineHeight: 0.98, letterSpacing: "-0.045em", color: mix(1, 0, strike) > 0.5 ? C.text : C.muted }}>
              VENDA TODA
              <br />
              SEMANA
              <div style={{ position: "absolute", left: -10, top: "48%", height: 12, borderRadius: 6, background: C.warn, width: `calc(${strike * 100}% + 20px)` }} />
            </div>
          </div>
        ) : null}
        {/* 2 — arquivo esquecido */}
        {p2 > 0 && out2 < 1 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, opacity: Math.min(1, p2 * 1.5) * (1 - out2) }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 300, display: "flex", justifyContent: "center" }}>
              <Tag text="IMPEDIR QUE A CARTEIRA VIRE ARQUIVO" tone="accent" size={28} />
            </div>
            {/* gaveta */}
            <div style={{ position: "absolute", left: 240, top: 820, width: 600, height: 330, borderRadius: 28, background: "linear-gradient(180deg, #2A2E35, #1C1F24)", border: `2px solid ${C.line}`, boxShadow: "0 40px 90px rgba(0,0,0,0.6)" }}>
              <div style={{ position: "absolute", left: 230, top: 40, width: 140, height: 30, borderRadius: 15, background: "#3A3F48" }} />
              <div style={{ position: "absolute", left: 0, right: 0, top: 110, textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 30, letterSpacing: "0.14em", color: C.dim }}>ARQUIVO</div>
            </div>
            {[0, 1, 2].map((i) => {
              const s = Math.max(0, Math.min(1, slide * 1.3 - i * 0.15)) * (1 - back);
              const y = mix(430 + i * 40, 840, s);
              return (
                <div key={i} style={{ position: "absolute", left: 300 + i * 30, top: y, width: 480, height: 120, borderRadius: 22, background: C.surface2, border: `1px solid ${C.line}`, opacity: 1 - s * 0.7, filter: `grayscale(${s}) blur(${s * 2}px)`, transform: `rotate(${(i - 1) * 3 * s}deg)`, display: "flex", alignItems: "center", padding: "0 24px", boxSizing: "border-box", fontWeight: 800, fontSize: 32, color: C.text, boxShadow: "0 20px 40px rgba(0,0,0,0.45)" }}>
                  {["Apto 3q · Lago", "Terreno · Serra", "Casa 2q · Bosque"][i]}
                </div>
              );
            })}
            {block > 0 ? (
              <div style={{ position: "absolute", left: 470, top: 860, width: 140, height: 140, borderRadius: 70, background: C.warn, display: "flex", alignItems: "center", justifyContent: "center", color: C.ink, fontWeight: 800, fontSize: 90, transform: `scale(${mix(0.3, 1, Math.min(1.12, block))})`, boxShadow: "0 20px 60px rgba(0,0,0,0.6)" }}>✕</div>
            ) : null}
          </div>
        ) : null}
        {/* 3 — linha do tempo semanal */}
        {p3 > 0 ? (
          <div style={{ position: "absolute", inset: 0, opacity: Math.min(1, p3 * 1.5) }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 300, display: "flex", justifyContent: "center" }}>
              <Tag text="REGISTRE AS DECISÕES" tone="accent" size={28} />
            </div>
            <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
              <path d="M150 460 V1080" stroke={C.surface3} strokeWidth={6} />
              <path d="M150 460 V1080" stroke={C.accent} strokeWidth={6} strokeDasharray={`${660 * line} 700`} />
            </svg>
            {[{ y: 420, k: "REUNIÃO · ESTA SEMANA" }, { y: 1040, k: "PRÓXIMA REUNIÃO" }].map((n, i) => {
              const a = i === 0 ? Math.min(1, p3) : Math.min(1, next);
              return (
                <div key={n.k} style={{ position: "absolute", left: 110, top: n.y, display: "flex", alignItems: "center", gap: 24, opacity: Math.min(1, a * 1.5), transform: `scale(${mix(0.6, 1, a)})`, transformOrigin: "40px 40px" }}>
                  <div style={{ width: 80, height: 80, borderRadius: 40, background: i === 0 ? C.accent : C.surface2, border: `4px solid ${C.accent}` }} />
                  <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 30, letterSpacing: "0.08em", color: i === 0 ? C.accent : C.text }}>{n.k}</span>
                </div>
              );
            })}
            {TASKS.map((x, i) => {
              const a = sp(t, c.ins_reg + 0.3 + i * 0.25, { damping: 14, stiffness: 180 });
              const moved = !x.done ? carry : 0;
              return (
                <div key={x.k} style={{ position: "absolute", left: 220, top: mix(560 + i * 150, 1150, moved), width: 760, height: 120, boxSizing: "border-box", borderRadius: 24, background: C.surface, border: `2px solid ${x.done ? "rgba(53,224,161,0.4)" : moved > 0.5 ? C.accent : "rgba(255,107,94,0.45)"}`, display: "flex", alignItems: "center", gap: 18, padding: "0 24px", opacity: Math.min(1, a * 1.5), transform: `translateX(${(1 - Math.min(1, a)) * 60}px)`, boxShadow: "0 20px 50px rgba(0,0,0,0.45)" }}>
                  {x.done ? <Mark ok size={50} /> : <div style={{ width: 50, height: 50, borderRadius: 25, border: `3px dashed ${C.warn}` }} />}
                  <span style={{ flex: 1, fontWeight: 800, fontSize: 30, color: C.text }}>{x.k}</span>
                  <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 20, color: x.done ? C.accent : C.warn }}>{x.done ? "CONCLUÍDA" : moved > 0.5 ? "REVISAR" : "PENDENTE"}</span>
                </div>
              );
            })}
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
