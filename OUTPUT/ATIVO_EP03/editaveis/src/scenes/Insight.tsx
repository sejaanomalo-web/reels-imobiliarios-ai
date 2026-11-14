import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Card, CheckDot } from "./ui";

/**
 * CENA 5 — INSIGHT. "A confiança … vem menos da energia que ele demonstra" → linha ENERGIA, cheia de picos e quedas; "e mais da
 * segurança com que conduz cada etapa" → linha SEGURANÇA, estável e subindo devagar, com um marco por etapa. "A rotina pode ser
 * difícil." → os picos voltam a tremer ao fundo; "O atendimento não precisa ser improvisado." → a mesa se organiza: agenda,
 * verificações e registro alinhados sobre a linha estável.
 */
const W = 880;
const H = 420;
const N = 60;
const energy = (i: number) => H * (0.5 + 0.38 * Math.sin(i * 0.9) * Math.cos(i * 0.37) + 0.12 * Math.sin(i * 2.3));
const secure = (i: number) => H * (0.82 - 0.5 * (i / (N - 1)));
const path = (f: (i: number) => number, upto: number) =>
  Array.from({ length: Math.max(2, Math.round(upto * N)) })
    .map((_, i) => `${i ? "L" : "M"} ${(i / (N - 1)) * W} ${f(i)}`)
    .join(" ");

export const Insight: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.i_conf - 0.2, { damping: 15, stiffness: 140 });
  const eStart = Math.min(c.i_energia - 0.1, c.i_conf + 0.7);
  const eLine = prog(t, eStart, c.i_energia + 1.1 - eStart, ease.inOut);
  const sLine = prog(t, c.i_seg - 0.1, 1.6, ease.inOut);
  const eDim = prog(t, c.i_seg, 0.6, ease.out);
  const steps = [0, 1, 2, 3].map((k) => sp(t, c.i_etapa - 0.2 + k * 0.12, { damping: 12, stiffness: 200 }));
  const desk = prog(t, c.i_atend - 0.2, 0.8, ease.inOut);
  const rough = prog(t, c.i_rot - 0.1, 0.5, ease.out) * (1 - desk);
  const label = sp(t, c.i_dif - 0.1, { damping: 13, stiffness: 180 });
  const label2 = sp(t, c.i_impro - 0.05, { damping: 12, stiffness: 190 });
  const out = prog(t, c.c_comp - 0.4, 0.35, ease.in);
  const chartY = mix(560, 820, desk);
  const chartS = mix(1, 0.8, desk);
  const jitter = rough * 10;

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.i_conf - 0.2, s: 0.95, y: 30 },
          { t: c.i_seg + 1.4, s: 1.03, y: 0, e: ease.inOut },
          { t: c.i_rot, s: 1.06, y: 10, r: -1, e: ease.inOut },
          { t: c.i_atend + 0.6, s: 1.0, y: 0, r: 0, e: ease.inOut },
          { t: c.c_comp, s: 1.03, y: -10, e: ease.linear },
        ]}
      >
        {/* título */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 300, textAlign: "center", fontWeight: 800, fontSize: 92, letterSpacing: "-0.045em", lineHeight: 1, color: C.text, opacity: Math.min(1, enter * 1.5) * (1 - Math.min(1, label * 1.5)), transform: `translateY(${(1 - Math.min(1, enter)) * 40}px)` }}>
          CONFIANÇA
          <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 30, letterSpacing: "0.12em", color: C.muted, marginTop: 18 }}>VEM DE ONDE?</div>
        </div>
        {/* frase da virada */}
        {label > 0.001 ? (
          <div style={{ position: "absolute", left: 80, right: 80, top: 300, textAlign: "center", fontWeight: 800, fontSize: 80, letterSpacing: "-0.04em", lineHeight: 1.04, color: C.text, opacity: Math.min(1, label * 1.5) * (1 - out) }}>
            DIFÍCIL, SIM.
            <br />
            <span style={{ color: BRAND.hex, opacity: Math.min(1, label2 * 1.5), display: "inline-block", transform: `translateY(${(1 - Math.min(1, label2)) * 30}px)` }}>IMPROVISADO, NÃO.</span>
          </div>
        ) : null}
        {/* gráfico */}
        <div style={{ position: "absolute", left: 100, top: chartY, width: W, height: H, transform: `scale(${chartS})`, transformOrigin: "50% 0" }}>
          <svg width={W} height={H} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
            <line x1={0} y1={H} x2={W} y2={H} stroke={C.line} strokeWidth={3} />
            {eLine > 0.02 ? (
              <path d={path(energy, eLine)} fill="none" stroke={C.warn} strokeWidth={7} strokeLinejoin="round" strokeLinecap="round" opacity={mix(0.95, 0.35, eDim) * (1 - desk * 0.6)} transform={`translate(0 ${Math.sin(t * 23) * jitter})`} />
            ) : null}
            {sLine > 0.02 ? <path d={path(secure, sLine)} fill="none" stroke={BRAND.hex} strokeWidth={10} strokeLinecap="round" style={{ filter: `drop-shadow(0 0 12px ${brandAlpha(0.6)})` }} /> : null}
            {steps.map((p, k) => {
              const i = Math.round(((k + 1) / 5) * (N - 1));
              return p > 0.01 ? <circle key={k} cx={(i / (N - 1)) * W} cy={secure(i)} r={14 * Math.min(1.2, p)} fill={BRAND.hex} stroke={C.bg0} strokeWidth={4} /> : null;
            })}
          </svg>
          {eLine > 0.1 ? <div style={{ position: "absolute", left: 0, top: -70, fontFamily: F.mono, fontWeight: 700, fontSize: 32, letterSpacing: "0.1em", color: C.warn, opacity: mix(1, 0.4, eDim) * (1 - desk) }}>ENERGIA</div> : null}
          {sLine > 0.3 ? <div style={{ position: "absolute", right: 0, top: secure(N - 1) - 80, fontFamily: F.mono, fontWeight: 700, fontSize: 34, letterSpacing: "0.1em", color: BRAND.hex }}>SEGURANÇA</div> : null}
          {steps[3] > 0.3 ? <div style={{ position: "absolute", left: 0, top: H + 20, fontFamily: F.mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.1em", color: C.muted, opacity: 1 - desk }}>CADA ETAPA</div> : null}
        </div>
        {/* mesa organizada */}
        {desk > 0.001
          ? ["AGENDA", "3 VERIFICAÇÕES", "REGISTRO"].map((k, i) => {
              const a = prog(t, c.i_atend - 0.1 + i * 0.15, 0.6, ease.out);
              return (
                <Card key={k} tone={i === 1 ? "accent" : "plain"} style={{ left: 100 + i * 300, top: 560 + (1 - a) * 200 + Math.sin(t * 1.3 + i) * 4, width: 280, height: 200, padding: "24px 22px", opacity: a, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <CheckDot p={prog(t, c.i_impro + 0.2 + i * 0.2, 0.4, ease.out)} size={54} />
                  <div style={{ fontWeight: 800, fontSize: 32, lineHeight: 1.05, letterSpacing: "-0.02em", color: C.text }}>{k}</div>
                </Card>
              );
            })
          : null}
      </Camera>
    </div>
  );
};
