import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Broker, CheckDot } from "./ui";

/**
 * CENA 5 — INSIGHT. "Parceria forte não é aquela em que todo mundo promete muito." → balões de promessa (genéricos) inflam e murcham.
 * "É aquela em que cada pessoa sabe o que precisa fazer, o que pode comunicar e como prestar contas." → três compromissos marcam na fala.
 * "Colaboração e profissionalismo combinam." → A e B se ligam por uma linha verde estável, sem falha: CLAREZA ANTES DA NEGOCIAÇÃO.
 */
const PROMISES = [
  { s: "“Vendo rapidinho!”", x: 110, y: 520, r: -6 },
  { s: "“Tenho o comprador certo!”", x: 170, y: 670, r: 5 },
  { s: "“Deixa comigo!”", x: 160, y: 820, r: 3 },
];
const DUTIES = ["O QUE FAZER", "O QUE COMUNICAR", "COMO PRESTAR CONTAS"];

export const Insight: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const prom = PROMISES.map((_, i) => sp(t, c.i_forte + 0.1 + i * 0.25, { damping: 10, stiffness: 200 }));
  const deflate = prog(t, c.i_sabe - 0.3, 0.5, ease.in);
  const duties = [c.i_fazer, c.i_com, c.i_contas].map((a) => prog(t, a + 0.05, 0.4, ease.out));
  const rows = sp(t, c.i_sabe - 0.15, { damping: 14, stiffness: 170 });
  const join = prog(t, c.i_colab - 0.2, 0.9, ease.inOut);
  const head = sp(t, c.i_combinam - 0.05, { damping: 13, stiffness: 170 });
  const out = prog(t, c.i_clar - 0.35, 0.35, ease.in);
  const toTop = prog(t, c.i_colab - 0.3, 0.7, ease.inOut);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.i_forte - 0.3, s: 1.04, y: 0 },
          { t: c.i_sabe + 0.3, s: 1.0, y: 0, e: ease.inOut },
          { t: c.i_contas + 0.4, s: 1.03, y: 10, e: ease.inOut },
          { t: c.i_combinam + 0.5, s: 0.98, y: 0, e: ease.inOut },
          { t: c.i_clar, s: 1.0, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: 0, right: 0, top: 300, textAlign: "center", fontWeight: 800, fontSize: 80, letterSpacing: "-0.045em", lineHeight: 1.02, color: C.text, opacity: Math.min(1, prom[0] * 1.5) * (1 - toTop) }}>
          PARCERIA <span style={{ color: BRAND.hex }}>FORTE</span>
        </div>
        {/* promessas que murcham */}
        {PROMISES.map((p, i) => {
          const a = prom[i];
          if (a <= 0.001 || deflate >= 1) return null;
          return (
            <div key={p.s} style={{ position: "absolute", left: p.x, top: p.y, padding: "18px 30px", borderRadius: 36, background: C.surface2, border: `2px solid ${C.line}`, fontWeight: 800, fontSize: 44, color: C.text, whiteSpace: "nowrap", opacity: Math.min(1, a * 1.5) * (1 - deflate), transform: `rotate(${p.r}deg) scale(${mix(0.3, 1.05, Math.min(1, a)) * (1 - deflate * 0.6)}) translateY(${deflate * 80}px)` }}>{p.s}</div>
          );
        })}
        {/* compromissos */}
        {rows > 0.001 && toTop < 1 ? (
          <div style={{ position: "absolute", left: 140, top: 520, width: 800, opacity: Math.min(1, rows * 1.5) * (1 - toTop) }}>
            <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 30, letterSpacing: "0.12em", color: C.muted, textAlign: "center", marginBottom: 20 }}>CADA PESSOA SABE</div>
            {DUTIES.map((d, i) => (
              <div key={d} style={{ display: "flex", alignItems: "center", gap: 26, marginTop: 22, height: 120, padding: "0 30px", borderRadius: 26, background: duties[i] > 0.5 ? brandAlpha(0.1) : C.surface, border: `3px solid ${duties[i] > 0.5 ? BRAND.hex : C.line}` }}>
                <CheckDot p={duties[i]} size={62} />
                <span style={{ fontWeight: 800, fontSize: 44, letterSpacing: "-0.02em", color: duties[i] > 0.5 ? C.text : C.dim }}>{d}</span>
              </div>
            ))}
          </div>
        ) : null}
        {/* A e B ligados de forma estável */}
        {join > 0.001 ? (
          <>
            <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, opacity: join }}>
              <path d="M 260 840 L 820 840" fill="none" stroke={BRAND.hex} strokeWidth={12} strokeLinecap="round" strokeDasharray={`${560 * join} 700`} style={{ filter: `drop-shadow(0 0 14px ${brandAlpha(0.6)})` }} />
            </svg>
            <div style={{ position: "absolute", left: mix(-200, 145, join), top: 765, opacity: join }}>
              <Broker ini="A" bg="#4E6A8C" label="Corretor A" role="PAPEL CLARO" ring />
            </div>
            <div style={{ position: "absolute", left: mix(1100, 705, join), top: 765, opacity: join }}>
              <Broker ini="B" bg="#8C6A4E" label="Corretor B" role="PAPEL CLARO" ring />
            </div>
          </>
        ) : null}
        {head > 0.001 ? (
          <div style={{ position: "absolute", left: 80, right: 80, top: 360, textAlign: "center", fontWeight: 800, fontSize: 76, letterSpacing: "-0.045em", lineHeight: 1.02, color: C.text, opacity: Math.min(1, head * 1.5), transform: `translateY(${(1 - Math.min(1, head)) * 40}px)` }}>
            <span style={{ color: BRAND.hex }}>CLAREZA</span>
            <br />
            ANTES DA NEGOCIAÇÃO
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
