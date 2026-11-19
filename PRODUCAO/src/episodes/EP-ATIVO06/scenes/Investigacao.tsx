import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { CheckDot, Tag } from "./ui";

/**
 * CENA 4 — A INVESTIGAÇÃO. "Para encontrar o gargalo, escolha uma negociação recente e refaça seu percurso." → RASTREIE UMA
 * OPORTUNIDADE; um ponto percorre o mapa. "Quem recebeu? Quem assumiu? Onde ficaram as informações? Quando aconteceu o último
 * movimento? O que dependia de outra pessoa?" → cinco checkpoints acendem na fala. "Uma resposta vaga já indica onde vale
 * investigar." → um checkpoint fica com resposta vaga (?) e a lupa para nele. Mapa ilustrativo, não é tela de produto.
 */
const CP = [
  { k: "QUEM RECEBEU?", x: 120, y: 520 },
  { k: "QUEM ASSUMIU?", x: 580, y: 640 },
  { k: "ONDE ESTÃO AS INFORMAÇÕES?", x: 120, y: 790 },
  { k: "ÚLTIMO MOVIMENTO?", x: 580, y: 920 },
  { k: "DEPENDIA DE QUEM?", x: 120, y: 1060 },
];

export const Investigacao: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const head = sp(t, c.v_garg - 0.15, { damping: 13, stiffness: 170 });
  const qs = [c.v_q1, c.v_q2, c.v_q3, c.v_q4, c.v_q5];
  const lit = qs.map((a) => prog(t, a + 0.1, 0.35, ease.out));
  const appear = qs.map((a, i) => sp(t, Math.min(a - 0.3, c.v_ref + 0.2 + i * 0.12), { damping: 13, stiffness: 190 }));
  const vague = sp(t, c.v_vaga - 0.05, { damping: 10, stiffness: 230 });
  const out = prog(t, c.g_boa - 0.45, 0.4, ease.in);
  // ponto que percorre o percurso: anda do checkpoint i ao i+1 no meio segundo antes da pergunta seguinte
  let dx = CP[0].x + 160;
  let dy = CP[0].y + 50;
  for (let i = 0; i < 4; i++) {
    if (t >= qs[i]) {
      const u = ease.inOut(Math.min(1, Math.max(0, (t - (qs[i + 1] - 0.5)) / 0.5)));
      dx = mix(CP[i].x + 160, CP[i + 1].x + 160, u);
      dy = mix(CP[i].y + 50, CP[i + 1].y + 50, u);
    }
  }
  const lensP = prog(t, c.v_vaga + 0.2, 0.5, ease.inOut);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, head * 1.5) * (1 - out) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.v_garg - 0.3, s: 0.98, y: 30 },
          { t: c.v_q1, s: 1.04, y: -40, e: ease.inOut },
          { t: c.v_q3, s: 1.04, y: 30, e: ease.inOut },
          { t: c.v_q5, s: 1.04, y: 120, e: ease.inOut },
          { t: c.v_vaga + 0.5, s: 1.12, x: -60, y: 20, e: ease.inOut },
          { t: c.g_boa, s: 1.12, x: -60, y: 20, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: 80, right: 80, top: 300, textAlign: "center", fontWeight: 800, fontSize: 74, lineHeight: 1.02, letterSpacing: "-0.045em", color: C.text, opacity: Math.min(1, head * 1.5), transform: `translateY(${(1 - Math.min(1, head)) * 40}px)` }}>
          RASTREIE <span style={{ color: BRAND.hex }}>UMA OPORTUNIDADE</span>
        </div>
        {/* trilha */}
        <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
          <path d={`M ${CP[0].x + 160} ${CP[0].y + 50} ${CP.slice(1).map((p) => `L ${p.x + 160} ${p.y + 50}`).join(" ")}`} fill="none" stroke={C.line} strokeWidth={6} strokeDasharray="14 14" />
        </svg>
        {CP.map((p, i) => {
          const isVague = i === 2 && vague > 0.5;
          return (
            <div key={p.k} style={{ position: "absolute", left: p.x, top: p.y, width: 380, minHeight: 100, boxSizing: "border-box", padding: "16px 20px", borderRadius: 22, background: C.surface, border: `3px solid ${isVague ? C.warn : lit[i] > 0.5 ? BRAND.hex : C.line}`, boxShadow: lit[i] > 0.5 && !isVague ? `0 0 26px ${brandAlpha(0.3)}` : "0 20px 50px rgba(0,0,0,0.5)", display: "flex", alignItems: "center", gap: 14, opacity: Math.min(1, appear[i] * 1.5), transform: `scale(${mix(0.6, 1, Math.min(1, appear[i])) * (1 + 0.05 * Math.sin(Math.min(1, lit[i]) * Math.PI))})` }}>
              {isVague ? (
                <div style={{ width: 54, height: 54, borderRadius: 27, background: C.warn, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 34, flex: "none" }}>?</div>
              ) : (
                <CheckDot p={lit[i]} size={54} n={i + 1} />
              )}
              <span style={{ fontWeight: 800, fontSize: 30, lineHeight: 1.1, color: lit[i] > 0.5 ? C.text : C.muted }}>{p.k}</span>
            </div>
          );
        })}
        {t >= c.v_q1 - 0.2 ? <div style={{ position: "absolute", left: dx - 16, top: dy - 16, width: 32, height: 32, borderRadius: 16, background: BRAND.hex, boxShadow: `0 0 24px ${brandAlpha(0.8)}` }} /> : null}
        {vague > 0.01 ? (
          <div style={{ position: "absolute", left: CP[2].x + 410, top: CP[2].y + 20, transform: `scale(${mix(0.3, 1, Math.min(1.1, vague))}) rotate(-3deg)` }}>
            <Tag text="INVESTIGUE AQUI" tone="warn" size={30} />
          </div>
        ) : null}
        {lensP > 0.01 ? (
          <div style={{ position: "absolute", left: CP[2].x + 190 - 130, top: CP[2].y + 50 - 130 + (1 - lensP) * 300, width: 260, height: 260, borderRadius: 130, border: `12px solid ${C.text}`, opacity: lensP * 0.9 }}>
            <div style={{ position: "absolute", left: 215, top: 215, width: 30, height: 120, borderRadius: 15, background: C.text, transform: "rotate(-45deg)", transformOrigin: "50% 0" }} />
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
