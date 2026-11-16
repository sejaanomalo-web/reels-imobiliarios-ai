import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { IconCal, IconDoc, Label, Tag } from "./ui";
import { IconHome } from "../../../components/Art";

/**
 * CENA 3 — A PAUTA CERTA. "Isso pode virar uma série de vídeos." → os 4 cartões encolhem num calendário editorial (SÉRIE · PRIMEIRO
 * IMÓVEL, PAUTA ILUSTRATIVA) com três vagas. "Um explicando quais informações reunir antes de simular financiamento." → VÍDEO 1 DOCUMENTOS.
 * "Outro mostrando perguntas importantes sobre despesas do condomínio." → VÍDEO 2 CUSTOS. "Um terceiro explicando como comparar um imóvel
 * pronto com um empreendimento ainda em construção." → VÍDEO 3 COMPARAÇÃO (PRONTO × EM CONSTRUÇÃO). Sem tela de banco.
 */
const DAYS = ["SEG", "TER", "QUA", "QUI", "SEX"];
const EPS = [
  { k: "DOCUMENTOS", sub: "o que reunir antes de simular", day: 0 },
  { k: "CUSTOS", sub: "despesas do condomínio", day: 2 },
  { k: "COMPARAÇÃO", sub: "pronto × em construção", day: 4 },
];

const Crane: React.FC<{ size: number; color?: string }> = ({ size, color = C.text }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M5 21V5h2v16M7 5h13l-3 3H7M15 8v5M3 21h8" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    <rect x="13" y="13" width="4" height="3" stroke={color} strokeWidth={1.6} />
  </svg>
);

export const Pauta: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const at = [c.p_um, c.p_outro, c.p_terc];
  const enter = sp(t, c.p_serie - 0.35, { damping: 15, stiffness: 150 });
  const cmp = sp(t, c.p_pronto - 0.1, { damping: 12, stiffness: 200 });
  const cons = sp(t, c.p_constr - 0.1, { damping: 12, stiffness: 200 });
  const out = prog(t, c.r_se - 0.45, 0.4, ease.in);
  const cur = at.filter((x) => t >= x - 0.15).length - 1;
  const colW = 160;
  const x0 = 140;

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.p_serie - 0.35, s: 0.96, y: 0 },
          { t: c.p_um + 0.3, s: 1.04, x: -60, y: 0, e: ease.inOut },
          { t: c.p_outro + 0.3, s: 1.04, x: 0, y: 10, e: ease.inOut },
          { t: c.p_terc + 0.3, s: 1.04, x: 60, y: 20, e: ease.inOut },
          { t: c.p_constr + 0.5, s: 1.0, x: 0, y: 80, e: ease.inOut },
          { t: c.r_se, s: 1.01, y: 80, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: 0, right: 0, top: 300, display: "flex", justifyContent: "center", gap: 14 }}>
          <Tag text="SÉRIE · PRIMEIRO IMÓVEL" tone="accent" size={30} />
          <Tag text="PAUTA ILUSTRATIVA" tone="muted" size={22} />
        </div>
        {/* calendário */}
        <div style={{ position: "absolute", left: 100, right: 100, top: 380, height: 680, boxSizing: "border-box", borderRadius: 36, background: C.surface, border: `2px solid ${C.line}`, boxShadow: "0 40px 100px rgba(0,0,0,0.6)", transform: `translateY(${(1 - Math.min(1, enter)) * 100}px)` }}>
          <div style={{ position: "absolute", left: 30, top: 24, display: "flex", alignItems: "center", gap: 14 }}>
            <IconCal size={46} />
            <Label size={28} color={C.text}>CALENDÁRIO DE CONTEÚDO</Label>
          </div>
          {DAYS.map((d, i) => (
            <div key={d} style={{ position: "absolute", left: x0 - 100 + i * colW, top: 100, width: colW - 12, textAlign: "center" }}>
              <Label size={24}>{d}</Label>
              <div style={{ marginTop: 10, height: 520, borderRadius: 18, background: C.surface2, opacity: 0.6 }} />
            </div>
          ))}
          {EPS.map((e, i) => {
            const a = sp(t, Math.min(at[i] - 0.2, c.p_serie + 0.4 + i * 0.15), { damping: 14, stiffness: 190 });
            const on = t >= at[i] - 0.15;
            const fill = sp(t, at[i] - 0.15, { damping: 12, stiffness: 200 });
            const x = x0 - 100 + e.day * colW - (e.day === 4 ? 150 : e.day === 2 ? 75 : 0);
            return (
              <div key={e.k} style={{ position: "absolute", left: x, top: 150 + i * 168, width: 340, height: 158, boxSizing: "border-box", borderRadius: 22, background: on ? C.surface3 : C.bg1, border: `3px ${on ? "solid" : "dashed"} ${on ? (cur === i ? BRAND.hex : brandAlpha(0.5)) : C.dim}`, padding: "14px 18px", opacity: Math.min(1, a * 1.5), transform: `translateY(${(1 - Math.min(1, a)) * -60}px) scale(${on && cur === i ? mix(1.15, 1.04, Math.min(1, fill)) : 1})`, boxShadow: on && cur === i ? `0 0 30px ${brandAlpha(0.3)}` : "none", zIndex: 3 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Label size={22} color={on ? BRAND.hex : C.dim}>VÍDEO {i + 1}</Label>
                  {on && i === 0 ? <IconDoc size={30} color={BRAND.hex} /> : null}
                </div>
                <div style={{ fontWeight: 800, fontSize: 36, letterSpacing: "-0.02em", color: on ? C.text : C.dim }}>{on ? e.k : "—"}</div>
                <div style={{ fontWeight: 700, fontSize: 24, lineHeight: 1.1, color: C.muted, opacity: on ? Math.min(1, fill) : 0 }}>{e.sub}</div>
              </div>
            );
          })}
        </div>
        {/* pronto × em construção */}
        {cmp > 0.001 ? (
          <div style={{ position: "absolute", left: 100, right: 100, top: 1085, display: "flex", alignItems: "center", justifyContent: "center", gap: 26 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "18px 26px", borderRadius: 26, background: C.surface2, border: `2px solid ${C.line}`, opacity: Math.min(1, cmp * 1.5), transform: `translateX(${(1 - Math.min(1, cmp)) * -80}px)` }}>
              <IconHome size={54} color={C.text} stroke={2} />
              <span style={{ fontWeight: 800, fontSize: 38, color: C.text }}>PRONTO</span>
            </div>
            <span style={{ fontWeight: 800, fontSize: 44, color: C.muted, opacity: Math.min(1, cons * 1.5) }}>×</span>
            <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "18px 26px", borderRadius: 26, background: C.surface2, border: `2px solid ${C.line}`, opacity: Math.min(1, cons * 1.5), transform: `translateX(${(1 - Math.min(1, cons)) * 80}px)` }}>
              <Crane size={54} />
              <span style={{ fontWeight: 800, fontSize: 38, color: C.text }}>EM CONSTRUÇÃO</span>
            </div>
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
