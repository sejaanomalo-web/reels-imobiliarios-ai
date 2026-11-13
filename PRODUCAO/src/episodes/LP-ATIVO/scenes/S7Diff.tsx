import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import type { SceneProps } from "../../types";
import { Cam, Mark, NEON, Trail } from "../kit";

/**
 * CENA 07 — GRANDE DIFERENCIAL (77–94 s). "Mas o principal diferencial está aqui: a gente não começa te entregando um sistema pronto.
 * Primeiro, fazemos um diagnóstico para entender como você trabalha. Como organiza seus imóveis. Como recebe seus clientes.
 * Como acompanha seus atendimentos. E o que realmente faria diferença na sua rotina."
 * Escurece; só a marca, pequena. NÃO COMEÇAMOS PELO SISTEMA. — pausa — VOCÊ enorme, o traço atravessa → COMEÇAMOS POR VOCÊ.
 * Depois o diagnóstico: VOCÊ no centro e as quatro perguntas ligadas a ele, cada uma quando é dita.
 */
const QS = [
  { k: "Como organiza seus imóveis?", cue: "x_q1", x: 140, y: 330 },
  { k: "Como recebe seus clientes?", cue: "x_q2", x: 1110, y: 330 },
  { k: "Como acompanha seus atendimentos?", cue: "x_q3", x: 90, y: 700 },
  { k: "O que faria diferença na sua rotina?", cue: "x_q4", x: 1010, y: 700 },
];

export const S7Diff: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const mark = prog(t, c.x_mas + 0.4, 0.9, ease.out) * (1 - prog(t, c.x_nao - 0.2, 0.4, ease.in));
  const no = sp(t, c.x_nao - 0.05, { damping: 16, stiffness: 220 });
  const noOut = prog(t, c.x_pronto_end + 0.15, 0.3, ease.in);
  const you = sp(t, c.x_prim - 0.15, { damping: 12, stiffness: 120 });
  const trail = prog(t, c.x_prim + 0.05, 1.0, ease.inOut);
  const swap = prog(t, c.x_prim + 0.55, 0.5, ease.inOut); // VOCÊ → COMEÇAMOS POR VOCÊ.
  const diag = prog(t, c.x_diag - 0.1, 0.8, ease.inOut); // sobe a frase, abre o diagnóstico
  const out = prog(t, c.p_a - 0.35, 0.4, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Cam t={t} keys={[{ t: c.x_mas, s: 1.0 }, { t: c.x_nao, s: 1.03, e: ease.inOut }, { t: c.x_prim, s: 1.06, e: ease.inOut }, { t: c.x_prim + 1.2, s: 1.0, e: ease.out }, { t: c.x_q4 + 1.5, s: 1.04, e: ease.inOut }]}>
        {/* só a marca, pequena */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 480, display: "flex", justifyContent: "center", opacity: mark }}>
          <Mark size={70} />
        </div>
        {/* NÃO COMEÇAMOS PELO SISTEMA. */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 455, textAlign: "center", fontWeight: 800, fontSize: 110, letterSpacing: "-0.04em", color: C.text, opacity: Math.min(1, no * 1.6) * (1 - noOut), transform: `scale(${mix(1.12, 1, Math.min(1, no))})` }}>
          NÃO COMEÇAMOS PELO <span style={{ color: C.muted }}>SISTEMA.</span>
        </div>
        {/* VOCÊ enorme → COMEÇAMOS POR VOCÊ. */}
        <div style={{ position: "absolute", left: 0, right: 0, top: mix(330, 120, diag), textAlign: "center", opacity: Math.min(1, you * 1.5), transform: `scale(${mix(1, 0.42, diag)})`, transformOrigin: "50% 0" }}>
          <div style={{ fontWeight: 800, fontSize: mix(330, 150, swap), lineHeight: 1, letterSpacing: "-0.05em", color: NEON, textShadow: `0 0 ${80 * (1 - diag)}px rgba(58,245,132,0.45)`, transform: `scale(${mix(1.2, 1, Math.min(1, you))})` }}>
            <span style={{ fontSize: "0.62em", color: C.text, opacity: swap, display: swap > 0.02 ? "inline" : "none" }}>COMEÇAMOS POR </span>VOCÊ<span style={{ color: C.text, opacity: swap }}>.</span>
          </div>
        </div>
        {/* diagnóstico: VOCÊ no centro, perguntas ao redor */}
        {diag > 0 ? (
          <>
            <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
              {QS.map((q) => {
                const a = prog(t, c[q.cue] - 0.15, 0.5, ease.out);
                const qw = q.k.length * 20 + 64;
                const qx = q.x < 960 ? q.x + qw : q.x;
                const qy = q.y + 45;
                return <path key={q.k} d={`M ${960 + (qx < 960 ? -80 : 80)} ${610 + (qy < 610 ? -80 : 80)} L ${qx} ${qy}`} stroke={NEON} strokeWidth={3} strokeDasharray={a >= 1 ? "10 10" : `${a * 600} 700`} strokeDashoffset={a >= 1 ? -t * 30 : 0} opacity={a > 0.01 ? 0.6 : 0} />;
              })}
            </svg>
            <div style={{ position: "absolute", left: 960 - 110, top: 610 - 110, width: 220, height: 220, borderRadius: 110, background: "rgba(58,245,132,0.12)", border: `4px solid ${NEON}`, display: "flex", alignItems: "center", justifyContent: "center", opacity: diag, transform: `scale(${mix(0.6, 1, diag) * (1 + 0.03 * Math.sin(t * 3))})`, boxShadow: "0 0 60px rgba(58,245,132,0.3)" }}>
              <span style={{ fontWeight: 800, fontSize: 52, color: C.text }}>VOCÊ</span>
            </div>
            <div style={{ position: "absolute", left: 0, right: 0, top: 860, textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 34, letterSpacing: "0.2em", color: NEON, opacity: prog(t, c.x_diag + 0.2, 0.5, ease.out) }}>DIAGNÓSTICO</div>
            {QS.map((q) => {
              const a = sp(t, c[q.cue] - 0.15, { damping: 13, stiffness: 170 });
              return (
                <div key={q.k} style={{ position: "absolute", left: q.x, top: q.y, width: 700, display: "flex", justifyContent: q.x < 960 ? "flex-start" : "flex-start", opacity: Math.min(1, a * 1.5), transform: `translateY(${(1 - Math.min(1, a)) * 30}px) scale(${mix(0.85, 1, Math.min(1, a))})` }}>
                  <div style={{ padding: "22px 32px", borderRadius: 30, background: "rgba(16,24,21,0.95)", border: "2px solid rgba(58,245,132,0.4)", fontWeight: 800, fontSize: 38, color: C.text, whiteSpace: "nowrap" }}>{q.k}</div>
                </div>
              );
            })}
          </>
        ) : null}
      </Cam>
      <Trail d="M -100 900 C 400 880, 700 700, 960 560 S 1500 220, 2040 120" p={trail} len={2500} width={14} fade={prog(t, c.x_prim + 1.1, 0.7, ease.in)} />
    </div>
  );
};
