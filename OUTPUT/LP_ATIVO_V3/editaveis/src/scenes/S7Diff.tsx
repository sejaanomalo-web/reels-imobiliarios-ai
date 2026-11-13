import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import type { SceneProps } from "../../types";
import { Cam, Mark, NEON, Trail } from "../kit";

/**
 * DIFERENCIAL v2. "Mas o principal diferencial está aqui: a gente não começa te entregando um sistema pronto. Primeiro, fazemos um
 * diagnóstico para entender como você trabalha. Como organiza seus imóveis. E o que realmente faria diferença na sua rotina."
 * Escurece com a marca pequena sob um foco de luz; um pacote fechado de "sistema pronto" entra e leva um ✕ em "pronto";
 * o traço atravessa e VOCÊ assume o centro, com um anel de varredura (diagnóstico) e as perguntas ditas ligadas a ele.
 */
const QS = [
  { k: "Como organiza seus imóveis?", cue: "x_q1", x: 80, y: 100 },
  { k: "O que faria diferença na sua rotina?", cue: "x_q4", x: 880, y: 720 },
];

const Box: React.FC<{ hit: number }> = ({ hit }) => (
  <svg width={420} height={380} viewBox="0 0 420 380">
    <path d="M210 30 L390 110 L210 190 L30 110 Z" fill="#2B3431" stroke="rgba(255,255,255,0.25)" strokeWidth={3} />
    <path d="M30 110 L210 190 L210 360 L30 280 Z" fill="#1A2120" stroke="rgba(255,255,255,0.18)" strokeWidth={3} />
    <path d="M390 110 L210 190 L210 360 L390 280 Z" fill="#222B28" stroke="rgba(255,255,255,0.18)" strokeWidth={3} />
    <path d="M120 70 L300 150 L300 200 L120 120 Z" fill="rgba(255,255,255,0.08)" />
    <text x="120" y="270" fill={hit > 0.5 ? "#FF6B5E" : "#C7CDD3"} fontFamily="JetBrains Mono" fontWeight={700} fontSize={30} transform="skewY(24) translate(0,-85)">PRONTO</text>
  </svg>
);

export const S7Diff: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const spot = prog(t, c.x_mas + 0.2, 0.8, ease.out) * (1 - prog(t, c.x_nao - 0.1, 0.4, ease.in));
  const box = sp(t, c.x_nao + 0.2, { damping: 13, stiffness: 150 });
  const hit = prog(t, c.x_pronto - 0.05, 0.25, ease.out);
  const drop = prog(t, c.x_pronto + 0.35, 0.5, ease.in);
  const you = sp(t, c.x_voce - 0.1, { damping: 12, stiffness: 140 });
  const pre = prog(t, c.x_prim - 0.1, 0.5, ease.out);
  const diag = prog(t, c.x_diag - 0.1, 0.5, ease.out);
  const out = prog(t, c.p_a - 0.35, 0.4, ease.in);
  const shake = hit > 0 && drop === 0 ? Math.sin(t * 50) * 8 * Math.max(0, 1 - (t - c.x_pronto) / 0.4) : 0;

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Cam t={t} keys={[{ t: c.x_mas, s: 1.0 }, { t: c.x_nao, s: 1.08, e: ease.inOut }, { t: c.x_pronto + 0.3, s: 1.12, e: ease.inOut }, { t: c.x_prim + 0.4, s: 0.96, e: ease.out }, { t: c.p_a, s: 1.05, e: ease.inOut }]}>
        {/* foco de luz + marca pequena */}
        <div style={{ position: "absolute", left: 960 - 500, top: 380 - 300, width: 1000, height: 600, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(255,255,255,0.07), transparent)", opacity: spot }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 305, display: "flex", justifyContent: "center", opacity: spot }}>
          <Mark size={90} glow={0.6} reveal={prog(t, c.x_mas + 0.2, 0.7, ease.out)} />
        </div>
        {/* pacote "sistema pronto" */}
        {box > 0 ? (
          <div style={{ position: "absolute", left: 960 - 210 + shake, top: 190, opacity: Math.min(1, box * 1.5) * (1 - drop), transform: `translateY(${(1 - Math.min(1, box)) * -300 + drop * 500}px) rotate(${drop * 25}deg)` }}>
            <Box hit={hit} />
            <svg width={420} height={380} style={{ position: "absolute", inset: 0 }}>
              <path d="M 70 60 L 350 340" stroke={C.warn} strokeWidth={24} strokeLinecap="round" strokeDasharray={`${400 * hit} 500`} opacity={hit > 0.02 ? 1 : 0} />
              <path d="M 350 60 L 70 340" stroke={C.warn} strokeWidth={24} strokeLinecap="round" strokeDasharray={`${400 * prog(t, c.x_pronto + 0.1, 0.22, ease.out)} 500`} opacity={hit > 0.4 ? 1 : 0} />
            </svg>
          </div>
        ) : null}
        {/* VOCÊ no centro + diagnóstico */}
        <div style={{ position: "absolute", left: 960, top: 400, transform: `translate(-50%, -50%) scale(${mix(0.4, 1, Math.min(1.08, Math.max(pre * 0.5, you)))})`, opacity: Math.min(1, Math.max(pre * 0.6, you) * 1.4) }}>
          <svg width={560} height={560} style={{ position: "absolute", left: -280 + 170, top: -280 + 170, opacity: diag }}>
            <circle cx={280} cy={280} r={250} fill="none" stroke={NEON} strokeWidth={4} strokeDasharray="30 22" transform={`rotate(${t * 40} 280 280)`} opacity={0.7} />
            <circle cx={280} cy={280} r={210} fill="none" stroke="rgba(58,245,132,0.25)" strokeWidth={2} />
            <path d={`M 280 280 L ${280 + Math.cos(t * 3) * 250} ${280 + Math.sin(t * 3) * 250}`} stroke={NEON} strokeWidth={3} opacity={0.6} />
          </svg>
          <div style={{ width: 340, height: 340, borderRadius: 170, background: "rgba(58,245,132,0.12)", border: `5px solid ${NEON}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 90px rgba(58,245,132,0.35)" }}>
            <span style={{ fontWeight: 800, fontSize: 96, letterSpacing: "-0.04em", color: C.text }}>VOCÊ</span>
          </div>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 625, textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 40, letterSpacing: "0.22em", color: NEON, opacity: diag }}>DIAGNÓSTICO</div>
        {/* perguntas ditas */}
        <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
          {QS.map((q) => {
            const a = prog(t, c[q.cue] - 0.1, 0.4, ease.out);
            const qw = q.k.length * 25 + 70;
            const left = q.x + qw / 2 < 960;
            const qx = left ? q.x + qw : q.x + qw * 0.2;
            const qy = left ? q.y + 50 : q.y;
            return <path key={q.k} d={`M ${960 + (qx < 960 ? -170 : 170)} ${400 + (qy < 400 ? -60 : 60)} L ${qx} ${qy}`} stroke={NEON} strokeWidth={3} strokeDasharray={a >= 1 ? "10 10" : `${a * 600} 700`} strokeDashoffset={a >= 1 ? -t * 30 : 0} opacity={a > 0.01 ? 0.7 : 0} />;
          })}
        </svg>
        {QS.map((q) => {
          const a = sp(t, c[q.cue] - 0.1, { damping: 13, stiffness: 170 });
          return (
            <div key={q.k} style={{ position: "absolute", left: q.x, top: q.y, opacity: Math.min(1, a * 1.5), transform: `translateY(${(1 - Math.min(1, a)) * 30}px) scale(${mix(0.85, 1, Math.min(1, a))})`, padding: "24px 36px", borderRadius: 32, background: "rgba(16,24,21,0.96)", border: "2px solid rgba(58,245,132,0.5)", fontWeight: 800, fontSize: 46, color: C.text, whiteSpace: "nowrap" }}>
              {q.k}
            </div>
          );
        })}
      </Cam>
      <Trail d="M -100 760 C 400 740, 700 560, 960 400 S 1500 120, 2040 40" p={prog(t, c.x_prim - 0.05, 0.9, ease.inOut)} len={2500} width={14} fade={prog(t, c.x_prim + 0.9, 0.6, ease.in)} />
    </div>
  );
};
