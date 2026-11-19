import React from "react";
import { BRAND, C, F } from "../../../theme";
import { ease, mix, prog, rnd, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Card, QTitle, Rail, Tag } from "./ui";

/**
 * CENA 4 — PERGUNTA 4. "Quando você muda de estratégia, sabe por quê?" → setas para todos os lados. "Se a cada semana troca o público,
 * o imóvel e a abordagem…" → o cartão da semana embaralha cada campo na palavra. "…sem observar o que aconteceu antes…" → as setas
 * convergem numa linha do tempo AÇÃO → OBSERVAÇÃO → AJUSTE; "…ajuste necessário de uma reação por ansiedade." → AJUSTE ≠ ANSIEDADE.
 */
const FIELDS = [
  { k: "PÚBLICO", v: ["Família", "Investidor", "Primeiro imóvel"] },
  { k: "IMÓVEL", v: ["Casa", "Apartamento", "Terreno"] },
  { k: "ABORDAGEM", v: ["Vídeo", "Anúncio pago", "Lista no WhatsApp"] },
];
const STEPS = ["AÇÃO", "OBSERVAÇÃO", "AJUSTE"];

export const Q4: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const rail = sp(t, c.d_quar - 0.15, { damping: 14, stiffness: 170 });
  const title = sp(t, c.d_muda - 0.2, { damping: 13, stiffness: 170 });
  const arrows = prog(t, c.d_quar, 0.6, ease.out);
  const conv = prog(t, c.d_obs - 0.2, 0.9, ease.inOut);
  const week = sp(t, c.d_sem - 0.2, { damping: 14, stiffness: 170 });
  const shuffleAt = [c.d_pub, c.d_imo, c.d_abord];
  const line = prog(t, c.d_obs + 0.4, 0.9, ease.inOut);
  const step = [c.d_obs + 0.5, c.d_obs + 1.0, c.d_ajuste].map((a) => sp(t, a, { damping: 12, stiffness: 200 }));
  const neq = sp(t, c.d_ans - 0.1, { damping: 10, stiffness: 220 });
  const out = prog(t, c.i_fat - 0.45, 0.4, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.d_quar - 0.3, s: 1.05, r: 1 },
          { t: c.d_sem, s: 1.0, r: -1, e: ease.inOut },
          { t: c.d_obs + 0.4, s: 0.98, r: 0, e: ease.inOut },
          { t: c.d_ans + 0.5, s: 1.04, y: 10, e: ease.inOut },
          { t: c.i_fat, s: 1.05, y: 10, e: ease.linear },
        ]}
      >
        <Rail n={4} p={rail} />
        <QTitle p={title}>
          SABE <span style={{ color: BRAND.hex }}>POR QUE</span> MUDOU?
        </QTitle>
        {/* setas para todos os lados → convergem na linha do tempo */}
        <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, opacity: arrows * (1 - line * 0.9) }}>
          {Array.from({ length: 12 }).map((_, i) => {
            const cx = 120 + rnd(i * 3.3) * 840;
            const cy = 620 + rnd(i * 5.1) * 560;
            const ang = rnd(i * 7.9) * Math.PI * 2 + Math.sin(t * 2 + i) * 0.3 * (1 - conv);
            const tx = mix(cx, 140 + (i / 11) * 800, conv);
            const ty = mix(cy, 1000, conv);
            const a = mix(ang, 0, conv);
            const L = 90;
            return (
              <g key={i} transform={`translate(${tx} ${ty}) rotate(${(a * 180) / Math.PI})`}>
                <path d={`M ${-L / 2} 0 L ${L / 2} 0 M ${L / 2 - 22} -16 L ${L / 2} 0 L ${L / 2 - 22} 16`} fill="none" stroke={conv > 0.6 ? BRAND.hex : C.warn} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
              </g>
            );
          })}
        </svg>
        {/* semana que troca tudo */}
        {week > 0.001 && conv < 1 ? (
          <Card style={{ left: 190, top: 600, width: 700, padding: "26px 32px", opacity: Math.min(1, week * 1.5) * (1 - conv), transform: `scale(${mix(0.8, 1, Math.min(1, week))}) rotate(${Math.sin(t * 3) * 1.5 * (1 - conv)}deg)` }}>
            <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.12em", color: C.warn }}>
              ESTA SEMANA: <span style={{ color: C.text }}>TUDO NOVO</span>
            </div>
            {FIELDS.map((f, i) => {
              const k = Math.max(0, Math.min(2, Math.floor((t - shuffleAt[i] + 0.1) * 7)));
              const flip = t > shuffleAt[i] - 0.1 && t < shuffleAt[i] + 0.35;
              return (
                <div key={f.k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 18 }}>
                  <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 28, color: C.muted }}>{f.k}</span>
                  <span style={{ fontWeight: 800, fontSize: 40, color: flip ? C.warn : C.text, transform: flip ? `translateY(${Math.sin(t * 40) * 4}px)` : undefined }}>{t < shuffleAt[i] - 0.1 ? f.v[0] : f.v[k]}</span>
                </div>
              );
            })}
          </Card>
        ) : null}
        {/* linha do tempo */}
        {line > 0.001 ? (
          <div style={{ position: "absolute", left: 90, top: 760, width: 900, height: 320 }}>
            <div style={{ position: "absolute", left: 60, top: 82, height: 8, borderRadius: 4, width: 720 * line, background: BRAND.hex }} />
            {STEPS.map((s, i) => (
              <div key={s} style={{ position: "absolute", left: 60 + i * 360 - 90, top: 30, width: 180, textAlign: "center", opacity: Math.min(1, step[i] * 1.5), transform: `scale(${mix(0.5, 1, Math.min(1.1, step[i]))})` }}>
                <div style={{ margin: "0 auto", width: 112, height: 112, borderRadius: 56, background: i === 2 ? BRAND.hex : C.surface2, border: `5px solid ${BRAND.hex}`, color: i === 2 ? BRAND.ink : C.text, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 44 }}>{i + 1}</div>
                <div style={{ marginTop: 16, fontWeight: 800, fontSize: 34, letterSpacing: "-0.02em", color: C.text, whiteSpace: "nowrap" }}>{s}</div>
              </div>
            ))}
          </div>
        ) : null}
        {neq > 0.001 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 1110, display: "flex", justifyContent: "center", opacity: Math.min(1, neq * 1.5), transform: `scale(${mix(1.5, 1, Math.min(1, neq))})` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <Tag text="AJUSTE" tone="accent" size={40} />
              <span style={{ fontWeight: 800, fontSize: 56, color: C.warn }}>≠</span>
              <Tag text="ANSIEDADE" tone="warn" size={40} />
            </div>
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
