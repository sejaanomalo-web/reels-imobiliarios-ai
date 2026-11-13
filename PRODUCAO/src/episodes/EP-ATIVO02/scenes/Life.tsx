import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { OPENINGS, OpeningHead } from "./ui";

/**
 * CENA 4 — ABERTURA 5: MOMENTO DE VIDA. "Quinto, fale com um momento de vida: 'Vai sair do aluguel e ainda está descobrindo que tipo
 * de imóvel cabe na sua rotina? Este exemplo ajuda a comparar prioridades.' Percebe? Cada abertura dá ao público um motivo diferente
 * para prestar atenção."
 * Silhueta de comprador (ilustrativa); o cartão ALUGUEL sai; prioridades flutuam e se ordenam. Depois as cinco aberturas se alinham,
 * cada uma com o seu motivo.
 */
const PRI = [
  { k: "nº de quartos", x: 90, y: 420 },
  { k: "trajeto", x: 700, y: 400 },
  { k: "área externa", x: 60, y: 1020 },
  { k: "condomínio", x: 690, y: 1040 },
  { k: "vaga", x: 760, y: 720 },
];
const RANK = [1, 0, 3, 2, 4];
const MOTIVE = ["home office", "a planta", "o trajeto", "sem escadas", "sair do aluguel"];

const Person: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size * 1.1} viewBox="0 0 200 220">
    <circle cx="100" cy="62" r="46" fill="#3A4350" />
    <path d="M18 216c6-62 40-96 82-96s76 34 82 96z" fill="#3A4350" />
  </svg>
);

const IconKey: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="8" cy="12" r="4.5" stroke={color} strokeWidth={2.2} />
    <path d="M12.5 12H21M18 12v3M21 12v2.5" stroke={color} strokeWidth={2.2} strokeLinecap="round" />
  </svg>
);

export const Life: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const head = sp(t, c.m_fifth - 0.1, { damping: 14, stiffness: 170 });
  const phaseB = prog(t, c.m_get - 0.15, 0.5, ease.inOut);
  const person = sp(t, c.m_life - 0.2, { damping: 14, stiffness: 160 });
  const rent = sp(t, c.m_rent - 0.3, { damping: 13, stiffness: 190 });
  const leave = prog(t, c.m_rent + 0.45, 0.9, ease.inOut);
  const pri = PRI.map((_, i) => sp(t, c.m_disc - 0.1 + i * 0.22, { damping: 11, stiffness: 190 }));
  const rank = prog(t, c.m_compare - 0.1, 0.9, ease.inOut);
  const title = sp(t, c.m_get - 0.05, { damping: 14, stiffness: 170 });
  const rows = OPENINGS.map((_, i) => sp(t, c.m_each - 0.2 + i * 0.16, { damping: 13, stiffness: 190 }));
  const mot = OPENINGS.map((_, i) => sp(t, c.m_motive - 0.25 + i * 0.12, { damping: 12, stiffness: 200 }));
  const att = prog(t, c.m_att - 0.1, 0.8, ease.inOut);
  const exit = prog(t, c.i_before - 0.35, 0.35, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - exit }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.m_fifth - 0.2, s: 1.08, y: 40, r: 1.5 },
          { t: c.m_rent, s: 1.02, y: 20, r: 0, e: ease.inOut },
          { t: c.m_fits, s: 0.97, y: 0, e: ease.inOut },
          { t: c.m_compare + 0.6, s: 1.04, y: 0, e: ease.inOut },
          { t: c.m_get + 0.4, s: 1.0, y: 0, e: ease.inOut },
          { t: c.i_before, s: 1.06, y: 0, e: ease.inOut },
        ]}
      >
        <div style={{ position: "absolute", inset: 0, opacity: 1 - phaseB }}>
          <OpeningHead n={5} p={head} t={t} />
          {/* comprador ilustrativo */}
          <div style={{ position: "absolute", left: mix(390, 640, rank), top: 560, opacity: Math.min(1, person * 1.5), transform: `translateY(${(1 - Math.min(1, person)) * 80}px) translateY(${Math.sin(t * 1.5) * 6}px)` }}>
            <Person size={300} />
            <div style={{ position: "absolute", left: 0, right: 0, top: 340, textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 22, color: C.dim }}>COMPRADOR ILUSTRATIVO</div>
          </div>
          {/* saindo do aluguel */}
          {rent > 0 ? (
            <div style={{ position: "absolute", left: mix(300, 760, leave), top: mix(820, 860, leave), opacity: Math.min(1, rent * 1.5) * (1 - prog(leave, 0.6, 0.4, ease.linear)), transform: `scale(${mix(0.6, 1, Math.min(1, rent))}) rotate(${leave * 12}deg)` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 26px", borderRadius: 26, background: C.surface2, border: `2px solid ${C.line}`, boxShadow: "0 20px 50px rgba(0,0,0,0.5)" }}>
                <IconKey size={44} color={C.muted} />
                <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 32, color: C.muted, letterSpacing: "0.06em" }}>ALUGUEL</span>
              </div>
            </div>
          ) : null}
          {/* prioridades flutuantes → ordenadas */}
          {PRI.map((p, i) => {
            const a = pri[i];
            if (a <= 0) return null;
            const r = RANK[i];
            const fx = p.x + Math.sin(t * 1.3 + i * 2) * 14;
            const fy = p.y + Math.cos(t * 1.1 + i) * 14;
            const tx = 100;
            const ty = 470 + r * 120;
            const x = mix(fx, tx, rank);
            const y = mix(fy, ty, rank);
            return (
              <div key={p.k} style={{ position: "absolute", left: x, top: y, opacity: Math.min(1, a * 1.5), transform: `scale(${mix(0.5, 1, Math.min(1, a))})`, display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 52, height: 52, borderRadius: 26, background: C.accent, color: C.accentInk, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 28, opacity: rank, transform: `scale(${rank})` }}>{r + 1}</div>
                <div style={{ padding: "14px 26px", borderRadius: 26, background: "rgba(21,24,29,0.96)", border: `2px solid ${rank > 0.5 ? "rgba(58,245,132,0.5)" : C.line}`, fontWeight: 800, fontSize: 36, color: C.text, whiteSpace: "nowrap", boxShadow: "0 18px 40px rgba(0,0,0,0.45)" }}>{p.k}</div>
              </div>
            );
          })}
        </div>

        {/* PERCEBE? as cinco aberturas, cada uma com um motivo */}
        <div style={{ position: "absolute", inset: 0, opacity: phaseB }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 270, textAlign: "center", fontWeight: 800, fontSize: 74, lineHeight: 1.0, letterSpacing: "-0.035em", color: C.text, opacity: Math.min(1, title * 1.5), transform: `translateY(${(1 - Math.min(1, title)) * 30}px)` }}>
            5 ABERTURAS,
            <br />
            <span style={{ color: C.accent }}>5 MOTIVOS.</span>
          </div>
          {OPENINGS.map((o, i) => {
            const a = rows[i];
            const m = mot[i];
            const sweep = Math.max(0, 1 - Math.abs(att * 6 - i - 0.5));
            return (
              <div key={o} style={{ position: "absolute", left: 90, top: 480 + i * 150, width: 900, height: 120, display: "flex", alignItems: "center", gap: 22, opacity: Math.min(1, a * 1.5), transform: `translateX(${(1 - Math.min(1, a)) * -160}px) scale(${1 + sweep * 0.04})`, transformOrigin: "0 50%" }}>
                <div style={{ width: 62, height: 62, borderRadius: 31, background: C.accent, color: C.accentInk, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 32, flexShrink: 0 }}>{i + 1}</div>
                <div style={{ fontWeight: 800, fontSize: 46, color: C.text, letterSpacing: "-0.02em", width: 420 }}>{o}</div>
                <svg width={60} height={20} style={{ opacity: Math.min(1, m * 1.5) }}>
                  <path d="M2 10 H50 M40 2 L52 10 L40 18" fill="none" stroke={C.accent} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div style={{ padding: "8px 18px", borderRadius: 20, background: `rgba(58,245,132,${0.12 + 0.2 * sweep})`, fontFamily: F.mono, fontWeight: 700, fontSize: 26, color: C.accent, whiteSpace: "nowrap", opacity: Math.min(1, m * 1.5), transform: `scale(${mix(0.6, 1, Math.min(1, m))})` }}>{MOTIVE[i]}</div>
              </div>
            );
          })}
        </div>
      </Camera>
    </div>
  );
};
