import React from "react";
import { BRAND, C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Card } from "./ui";

/**
 * CENA 1 — GANCHO. "É fácil dizer que o mercado esfriou." → manchetes genéricas (em forma de pergunta, sem veículo nem número) e
 * setas de queda flutuando. "Mais difícil é responder uma pergunta…" → uma lupa atravessa, empurra as manchetes e revela a agenda
 * da SUA atividade nas últimas semanas, com as casas ainda em branco. Tela: O QUE VOCÊ CONSEGUE MEDIR?
 */
const NEWS = [
  { s: "MERCADO ESFRIOU?", x: 90, y: 360, r: -4 },
  { s: "VENDAS EM QUEDA?", x: 420, y: 560, r: 3 },
  { s: "COMPRADOR SUMIU?", x: 70, y: 820, r: 2 },
  { s: "JUROS ALTOS DEMAIS?", x: 360, y: 1060, r: -3 },
];
const WEEKS = ["SEM 1", "SEM 2", "SEM 3", "SEM 4"];
const ROWS = ["Conversas iniciadas", "Visitas", "Propostas"];

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const lens = prog(t, c.h_perg - 0.3, 1.4, ease.inOut);
  const push = prog(t, c.h_perg, 1.0, ease.inOut);
  const agenda = sp(t, c.h_perg + 0.6, { damping: 15, stiffness: 140 });
  const q = sp(t, c.h_ativ - 0.15, { damping: 13, stiffness: 170 });
  const out = prog(t, c.a_prim - 0.45, 0.4, ease.in);
  const lx = mix(1150, 420, lens);
  const ly = mix(1300, 760, lens);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: 0, s: 1.1, y: 0, r: -1 },
          { t: c.h_perg, s: 1.02, y: 0, r: 0, e: ease.out },
          { t: c.h_ativ, s: 1.0, y: 0, e: ease.inOut },
          { t: c.a_prim, s: 1.05, y: -20, e: ease.linear },
        ]}
      >
        {/* setas de "mercado" */}
        <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, opacity: 0.55 * (1 - push) }}>
          {[0, 1, 2].map((i) => {
            const x0 = 120 + i * 300 + Math.sin(t * 0.8 + i) * 20;
            const y0 = 420 + i * 260;
            return <path key={i} d={`M ${x0} ${y0} l 120 70 l 60 -30 l 160 150 m -60 0 l 60 0 l 0 -60`} fill="none" stroke={C.warn} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />;
          })}
        </svg>
        {/* manchetes genéricas */}
        {NEWS.map((n, i) => {
          const a = sp(t, 0.1 + i * 0.25, { damping: 12, stiffness: 200 });
          const dir = n.x + 200 < 540 ? -1 : 1;
          return (
            <div key={n.s} style={{ position: "absolute", left: n.x + push * dir * 700, top: n.y + Math.sin(t * 1.2 + i) * 6, padding: "18px 30px", background: C.paper, color: C.ink, fontFamily: "Georgia, serif", fontWeight: 700, fontSize: 52, letterSpacing: "-0.01em", whiteSpace: "nowrap", boxShadow: "0 24px 60px rgba(0,0,0,0.55)", opacity: Math.min(1, a * 1.5) * (1 - push), transform: `rotate(${n.r + push * dir * 12}deg) scale(${mix(0.6, 1, Math.min(1, a))})` }}>
              {n.s}
            </div>
          );
        })}
        {/* agenda revelada */}
        {agenda > 0.001 ? (
          <Card tone="accent" style={{ left: 90, top: 600 + (1 - Math.min(1, agenda)) * 200, width: 900, padding: "30px 34px", opacity: Math.min(1, agenda * 1.5) }}>
            <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.12em", color: BRAND.hex }}>SUA ATIVIDADE · ÚLTIMAS SEMANAS</div>
            <div style={{ display: "flex", marginTop: 22, paddingLeft: 330 }}>
              {WEEKS.map((w) => (
                <div key={w} style={{ width: 120, textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 26, color: C.muted }}>{w}</div>
              ))}
            </div>
            {ROWS.map((r, i) => (
              <div key={r} style={{ display: "flex", alignItems: "center", marginTop: 16 }}>
                <div style={{ width: 330, fontWeight: 800, fontSize: 34, color: C.text }}>{r}</div>
                {WEEKS.map((w, k) => {
                  const blink = 0.5 + 0.5 * Math.sin(t * 4 + i + k);
                  return (
                    <div key={w} style={{ width: 108, height: 64, margin: "0 6px", borderRadius: 14, border: `2px dashed ${C.line}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 34, color: C.dim, opacity: 0.6 + 0.4 * blink * q }}>?</div>
                  );
                })}
              </div>
            ))}
          </Card>
        ) : null}
        {/* lupa */}
        {lens > 0.001 && lens < 1 ? (
          <div style={{ position: "absolute", left: lx - 150, top: ly - 150, width: 300, height: 300, borderRadius: 150, border: `14px solid ${BRAND.hex}`, background: "rgba(58,245,132,0.06)", opacity: Math.sin(lens * Math.PI) * 1.4 }}>
            <div style={{ position: "absolute", left: 250, top: 250, width: 40, height: 140, borderRadius: 20, background: BRAND.hex, transform: "rotate(-45deg)", transformOrigin: "50% 0" }} />
          </div>
        ) : null}
        {/* pergunta-tela */}
        {q > 0.001 ? (
          <div style={{ position: "absolute", left: 80, right: 80, top: 300, textAlign: "center", fontWeight: 800, fontSize: 84, lineHeight: 1.02, letterSpacing: "-0.045em", color: C.text, opacity: Math.min(1, q * 1.5), transform: `translateY(${(1 - Math.min(1, q)) * 40}px)` }}>
            O QUE VOCÊ <span style={{ color: BRAND.hex }}>CONSEGUE MEDIR?</span>
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
