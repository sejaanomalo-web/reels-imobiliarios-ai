import React from "react";
import { BRAND, C, F } from "../../../theme";
import { ease, mix, prog, rnd, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Card, Clock, Field } from "./ui";

/**
 * CENA 1 — GANCHO. "O corretor não precisa acordar todos os dias se sentindo invencível." → despertador tocando e uma explosão
 * exagerada de frases motivacionais. "Mas o cliente que marcou uma visita com ele precisa encontrar alguém preparado." → as frases
 * estouram e somem; entra a visita marcada (fictícia). "São duas coisas muito diferentes." → ÂNIMO ≠ PREPARO.
 */
const HYPE = [
  { s: "VOCÊ É IMPARÁVEL!", x: 80, y: 360, r: -9 },
  { s: "BORA VENDER!", x: 560, y: 430, r: 7 },
  { s: "ENERGIA MÁXIMA!", x: 120, y: 1060, r: 6 },
  { s: "MODO CAMPEÃO", x: 600, y: 1000, r: -6 },
  { s: "NINGUÉM TE SEGURA!", x: 250, y: 1180, r: -3 },
];

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const ring = 1 - prog(t, c.h_mas - 0.2, 0.5, ease.out) * 0.85;
  const toSide = prog(t, c.h_mas - 0.1, 0.8, ease.inOut);
  const visit = sp(t, c.h_visita - 0.15, { damping: 15, stiffness: 150 });
  const prep = sp(t, c.h_prep - 0.05, { damping: 12, stiffness: 190 });
  const neq = sp(t, c.h_duas - 0.1, { damping: 13, stiffness: 170 });
  const out = prog(t, c.p_dia - 0.45, 0.4, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: 0, s: 1.12, y: 0, r: -1.5 },
          { t: c.h_inv, s: 1.04, y: 0, r: 0, e: ease.out },
          { t: c.h_mas + 0.6, s: 1.0, y: 0, e: ease.inOut },
          { t: c.h_duas + 0.4, s: 1.03, y: -20, e: ease.inOut },
          { t: c.p_dia, s: 1.06, y: -30, e: ease.linear },
        ]}
      >
        {/* despertador: centro → lado do ÂNIMO */}
        <div style={{ position: "absolute", left: mix(540 - 170, 120, toSide), top: mix(560, 820, toSide), transform: `scale(${mix(1, 0.72, toSide)})`, transformOrigin: "0 0" }}>
          <Clock size={340} t={t} ring={ring} />
        </div>
        {/* frases motivacionais exageradas: explodem no "invencível" e estouram no "Mas" */}
        {HYPE.map((h, i) => {
          const a = sp(t, mix(0.45, c.h_inv - 0.25, i / (HYPE.length - 1)), { damping: 9, stiffness: 220 });
          const pop = prog(t, c.h_mas - 0.15 + i * 0.07, 0.22, ease.in);
          if (a <= 0.001 || pop >= 1) return null;
          const wob = Math.sin(t * 7 + i * 2) * 3;
          return (
            <div key={h.s} style={{ position: "absolute", left: h.x, top: h.y + (1 - Math.min(1, a)) * 80, padding: "14px 26px", borderRadius: 18, background: i % 2 ? "#F4F5F7" : "#2A2F37", color: i % 2 ? "#14161A" : C.text, fontWeight: 800, fontSize: 50, letterSpacing: "-0.02em", whiteSpace: "nowrap", boxShadow: "0 20px 50px rgba(0,0,0,0.5)", opacity: Math.min(1, a * 1.5) * (1 - pop), transform: `rotate(${h.r + wob}deg) scale(${mix(0.3, 1, Math.min(1.1, a)) * (1 + pop * 0.6)})`, filter: pop > 0 ? `blur(${pop * 8}px)` : undefined }}>
              {h.s}
            </div>
          );
        })}
        {/* estilhaços do estouro */}
        {Array.from({ length: 18 }).map((_, i) => {
          const k = prog(t, c.h_mas - 0.1, 0.6, ease.out);
          if (k <= 0 || k >= 1) return null;
          const ang = rnd(i * 3.1) * Math.PI * 2;
          const d = 120 + rnd(i * 7.7) * 380;
          return <div key={i} style={{ position: "absolute", left: 540 + Math.cos(ang) * d * k, top: 760 + Math.sin(ang) * d * k, width: 14, height: 14, borderRadius: 4, background: i % 3 ? C.muted : C.text, opacity: 1 - k, transform: `rotate(${k * 300}deg)` }} />;
        })}
        {/* visita marcada (fictícia) → lado do PREPARO */}
        {visit > 0.001 ? (
          <Card tone={prep > 0.5 ? "accent" : "plain"} style={{ left: mix(140, 560, toSide), top: mix(760, 820, toSide) + (1 - Math.min(1, visit)) * 300, width: 420, padding: "30px 32px", opacity: Math.min(1, visit * 1.5) }}>
            <Field label="VISITA · 10:00">Apto 2 quartos</Field>
            <div style={{ marginTop: 18, fontWeight: 700, fontSize: 32, color: C.muted }}>Cliente: Marina</div>
            <div style={{ marginTop: 22, display: "inline-block", padding: "10px 20px", borderRadius: 999, background: prep > 0.5 ? BRAND.hex : C.surface3, color: prep > 0.5 ? BRAND.ink : C.muted, fontWeight: 800, fontSize: 30, transform: `scale(${1 + 0.15 * Math.sin(Math.min(1, prep) * Math.PI)})` }}>espera alguém preparado</div>
          </Card>
        ) : null}
        {/* ÂNIMO ≠ PREPARO */}
        {neq > 0.001 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 470, textAlign: "center", fontWeight: 800, fontSize: 104, letterSpacing: "-0.045em", lineHeight: 1, opacity: Math.min(1, neq * 1.5), transform: `translateY(${(1 - Math.min(1, neq)) * 40}px)` }}>
            <span style={{ color: C.text }}>ÂNIMO</span>
            <span style={{ color: C.warn, margin: "0 26px", display: "inline-block", transform: `scale(${1 + 0.3 * Math.sin(Math.min(1, prog(t, c.h_dif, 0.4, ease.out)) * Math.PI)})` }}>≠</span>
            <span style={{ color: BRAND.hex }}>PREPARO</span>
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
