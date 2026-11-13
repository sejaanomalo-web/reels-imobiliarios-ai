import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { IconUser, Mark, Tag } from "./ui";

/**
 * CENA 03 — TENSÃO. "Antes de confirmar, alinhe o básico: características desejadas, faixa de investimento e objetivo da visita.
 * Isso evita deslocamentos sem contexto."
 * Três perguntas do corretor, três respostas de um avatar ilustrativo (sem pessoa real). Embaixo, a ida sem contexto
 * no mapa é riscada.
 */
const QS = [
  { q: "Características desejadas?", a: "3 quartos, com varanda", cue: "ten_feat" },
  { q: "Faixa de investimento?", a: "já definida no planejamento", cue: "ten_range" },
  { q: "Objetivo da visita?", a: "comparar com outra opção", cue: "ten_goal" },
];

export const Align: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const head = sp(t, c.ten_before, { damping: 15, stiffness: 160 });
  const trip = sp(t, c.ten_avoid - 0.1, { damping: 15, stiffness: 150 });
  const strike = prog(t, c.ten_ctx, 0.5, ease.out);
  const exit = prog(t, c.ins_if - 0.1, 0.45, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - exit }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.ten_before, s: 0.96, y: -40, rx: 6 },
          { t: c.ten_feat + 0.3, s: 1.04, y: -90, rx: 0, e: ease.inOut },
          { t: c.ten_goal + 0.5, s: 1.04, y: 60, e: ease.inOut },
          { t: c.ten_ctx + 0.5, s: 1.02, y: 120, e: ease.inOut },
          { t: c.ins_if + 0.3, s: 0.95, y: 40, e: ease.in },
        ]}
      >
        <div style={{ position: "absolute", left: 0, right: 0, top: 270, display: "flex", justifyContent: "center", opacity: Math.min(1, head * 1.5), transform: `translateY(${(1 - Math.min(1, head)) * 30}px)` }}>
          <Tag text="ANTES DE CONFIRMAR, ALINHE O BÁSICO" tone="accent" size={28} />
        </div>
        {QS.map((x, i) => {
          const qp = sp(t, c[x.cue] - 0.1, { damping: 14, stiffness: 170 });
          const ghost = prog(t, c.ten_before + 0.25 + i * 0.25, 0.4, ease.out) * (1 - Math.min(1, qp * 2));
          const ap = sp(t, c[x.cue] + 0.55, { damping: 13, stiffness: 180 });
          const y = 360 + i * 235;
          return (
            <div key={x.q} style={{ position: "absolute", left: 70, top: y, width: 940, height: 210 }}>
              {/* contorno da pergunta antes de ser feita */}
              <div style={{ position: "absolute", right: 0, top: 0, width: [520, 430, 380][i], height: 84, borderRadius: 28, border: "3px dashed rgba(58,245,132,0.35)", opacity: ghost, transform: `translateY(${(1 - ghost) * 30}px)`, display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 28, boxSizing: "border-box", fontWeight: 800, fontSize: 44, color: "rgba(58,245,132,0.5)" }}>?</div>
              {/* pergunta do corretor */}
              <div style={{ position: "absolute", right: 0, top: 0, padding: "18px 28px", borderRadius: 28, borderBottomRightRadius: 8, background: "#0E3A1F", border: "2px solid rgba(58,245,132,0.45)", fontWeight: 800, fontSize: 38, color: C.text, opacity: Math.min(1, qp * 1.5), transform: `translateX(${(1 - Math.min(1, qp)) * 80}px)`, boxShadow: "0 20px 50px rgba(0,0,0,0.45)" }}>
                {x.q}
              </div>
              {/* resposta do avatar ilustrativo */}
              <div style={{ position: "absolute", left: 0, top: 96, display: "flex", alignItems: "center", gap: 16, opacity: Math.min(1, ap * 1.5), transform: `translateX(${(1 - Math.min(1, ap)) * -80}px)` }}>
                <div style={{ width: 76, height: 76, borderRadius: 38, background: C.surface3, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <IconUser size={44} color={C.muted} />
                </div>
                <div style={{ padding: "16px 26px", borderRadius: 26, borderBottomLeftRadius: 8, background: C.surface2, border: `1px solid ${C.line}`, fontWeight: 700, fontSize: 34, color: C.text, display: "flex", alignItems: "center", gap: 14 }}>
                  {x.a}
                  <Mark ok size={38} />
                </div>
              </div>
            </div>
          );
        })}
        {/* deslocamento sem contexto, evitado */}
        <div style={{ position: "absolute", left: 140, top: 1080, width: 800, height: 150, boxSizing: "border-box", borderRadius: 34, background: C.surface, border: `1px solid ${C.line}`, display: "flex", alignItems: "center", gap: 24, padding: "0 30px", opacity: Math.min(1, trip * 1.5), transform: `translateY(${(1 - Math.min(1, trip)) * 80}px)` }}>
          <svg width={260} height={90} viewBox="0 0 260 90">
            <path d="M15 70 C 80 70, 90 20, 150 25 S 230 30, 245 20" fill="none" stroke={C.muted} strokeWidth={6} strokeDasharray="12 10" strokeLinecap="round" opacity={mix(1, 0.35, strike)} />
            <circle cx={15} cy={70} r={9} fill={C.muted} />
            <circle cx={245} cy={20} r={9} fill={C.muted} />
          </svg>
          <div style={{ position: "relative" }}>
            <span style={{ fontWeight: 800, fontSize: 36, color: mix(1, 0, strike) > 0.5 ? C.text : C.muted }}>deslocamento sem contexto</span>
            <div style={{ position: "absolute", left: -6, top: "54%", height: 5, borderRadius: 3, background: C.warn, width: `calc(${strike * 100}% + 12px)` }} />
          </div>
        </div>
        {strike > 0.6 ? (
          <div style={{ position: "absolute", left: 780, top: 1050, opacity: prog(t, c.ten_ctx + 0.3, 0.3, ease.out) }}>
            <Tag text="EVITADO" tone="accent" size={24} style={{ background: "rgba(9,38,20,0.95)" }} />
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
