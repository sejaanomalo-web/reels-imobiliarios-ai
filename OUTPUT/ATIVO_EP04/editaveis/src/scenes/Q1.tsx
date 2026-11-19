import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Card, QTitle, Rail } from "./ui";

/**
 * CENA 2 — PERGUNTA 1. "Quantas conversas novas você iniciou por iniciativa própria?" → dois calendários: RECEBIDAS (setas entrando)
 * e INICIADAS POR VOCÊ (setas saindo, que só aparecem quando a fala chega em "iniciativa própria"). Sem números.
 * "Atendimento é essencial, mas esperar o telefone tocar não é um plano de prospecção." → o lado das recebidas ganha um ✓ de
 * atendimento, um telefone fica tocando à espera, e o carimbo ESPERAR ≠ PROSPECTAR fecha a ideia.
 */
const DAYS = ["S", "T", "Q", "Q", "S"];

const Arrow: React.FC<{ out: boolean; p: number }> = ({ out, p }) => (
  <svg width={46} height={46} viewBox="0 0 24 24" style={{ opacity: p, transform: `scale(${mix(0.3, 1, Math.min(1, p))})` }}>
    {out ? <path d="M6 18L18 6M9 6h9v9" fill="none" stroke={BRAND.hex} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" /> : <path d="M18 6L6 18M15 18H6V9" fill="none" stroke={C.muted} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" />}
  </svg>
);

const Cal: React.FC<{ x: number; title: string; good: boolean; cells: number[]; t: number; t0: number; glow: number }> = ({ x, title, good, cells, t, t0, glow }) => (
  <Card tone={good && glow > 0.5 ? "accent" : "plain"} style={{ left: x, top: 640, width: 430, height: 470, padding: "26px 24px" }}>
    <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, letterSpacing: "0.08em", color: good ? BRAND.hex : C.muted, textAlign: "center" }}>{title}</div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10, marginTop: 20 }}>
      {DAYS.map((d, i) => (
        <div key={i} style={{ textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 26, color: C.dim }}>{d}</div>
      ))}
      {Array.from({ length: 15 }).map((_, i) => {
        const has = cells.includes(i);
        const p = has ? prog(t, t0 + cells.indexOf(i) * 0.18, 0.3, ease.out) : 0;
        return (
          <div key={i} style={{ height: 96, borderRadius: 14, background: C.bg1, border: `1px solid ${C.lineSoft}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {has ? <Arrow out={good} p={p} /> : null}
          </div>
        );
      })}
    </div>
  </Card>
);

export const Q1: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const rail = sp(t, c.a_prim - 0.15, { damping: 14, stiffness: 170 });
  const title = sp(t, c.a_prim + 0.2, { damping: 13, stiffness: 170 });
  const cals = sp(t, Math.min(c.a_conv, c.a_prim + 0.6), { damping: 15, stiffness: 140 });
  const glow = prog(t, c.a_inic, 0.4, ease.out);
  const ok = sp(t, c.a_atend + 0.4, { damping: 11, stiffness: 210 });
  const ring = prog(t, c.a_esp - 0.1, 0.3, ease.out) * (1 - prog(t, c.a_prosp + 0.2, 0.3, ease.in));
  const stamp = sp(t, c.a_prosp - 0.05, { damping: 9, stiffness: 240 });
  const out = prog(t, c.b_seg - 0.45, 0.4, ease.in);
  const shake = Math.sin(t * 44) * 8 * ring;

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.a_prim - 0.3, s: 1.04, y: 0 },
          { t: c.a_inic + 0.4, s: 1.0, x: -40, y: 0, e: ease.inOut },
          { t: c.a_esp, s: 1.04, x: 50, y: 20, e: ease.inOut },
          { t: c.a_prosp + 0.3, s: 1.0, x: 0, y: 0, e: ease.inOut },
          { t: c.b_seg, s: 1.02, e: ease.linear },
        ]}
      >
        <Rail n={1} p={rail} />
        <QTitle p={title}>
          CONVERSAS QUE <span style={{ color: BRAND.hex }}>VOCÊ INICIOU</span>
        </QTitle>
        <div style={{ opacity: Math.min(1, cals * 1.5), transform: `translateY(${(1 - Math.min(1, cals)) * 160}px)` }}>
          <Cal x={90} title="RECEBIDAS" good={false} cells={[1, 4, 7, 12]} t={t} t0={c.a_conv + 0.35} glow={0} />
          <Cal x={560} title="INICIADAS POR VOCÊ" good cells={[0, 2, 5, 6, 9, 10, 13]} t={t} t0={c.a_inic} glow={glow} />
        </div>
        {/* atendimento é essencial */}
        {ok > 0.001 ? (
          <div style={{ position: "absolute", left: 90, top: 1130, width: 430, textAlign: "center", fontWeight: 800, fontSize: 30, color: C.text, opacity: Math.min(1, ok * 1.5) }}>
            <span style={{ color: BRAND.hex }}>✓</span> atendimento é essencial
          </div>
        ) : null}
        {/* telefone esperando */}
        {ring > 0.01 ? (
          <div style={{ position: "absolute", left: 230, top: 760, width: 150, height: 150, borderRadius: 75, background: C.surface2, border: `3px solid ${C.muted}`, display: "flex", alignItems: "center", justifyContent: "center", opacity: ring, transform: `rotate(${shake}deg)`, boxShadow: "0 20px 50px rgba(0,0,0,0.6)" }}>
            <svg width={80} height={80} viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" fill="none" stroke={C.text} strokeWidth={1.8} strokeLinejoin="round" /></svg>
            {[0, 1].map((k) => {
              const r = ((t * 1.4 + k / 2) % 1);
              return <div key={k} style={{ position: "absolute", inset: -r * 60, borderRadius: "50%", border: `3px solid rgba(244,245,247,${0.4 * (1 - r)})` }} />;
            })}
          </div>
        ) : null}
        {/* carimbo */}
        {stamp > 0.001 ? (
          <div style={{ position: "absolute", left: 120, right: 120, top: 800, padding: "26px 0", borderRadius: 24, border: `6px solid ${C.warn}`, background: "rgba(7,8,10,0.86)", textAlign: "center", fontWeight: 800, fontSize: 62, letterSpacing: "-0.03em", color: C.text, transform: `rotate(-5deg) scale(${mix(1.8, 1, Math.min(1, stamp))})`, opacity: Math.min(1, stamp * 1.5), boxShadow: `0 0 50px ${brandAlpha(0.1)}` }}>
            ESPERAR <span style={{ color: C.warn }}>≠</span> <span style={{ color: BRAND.hex }}>PROSPECTAR</span>
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
