import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Tag } from "./ui";

/**
 * CENA 2 — TAKE 01, O COMEÇO. "Mônica Poplawski já tinha experiência diante das câmeras, mas precisou aprender o mercado imobiliário
 * começando por locações pequenas." → ficha CASO REAL (fontes públicas; sem foto) + EXPERIÊNCIA EM CÂMERA + primeiro degrau LOCAÇÕES
 * PEQUENAS. "Ela própria conta que a evolução foi gradual." → escada de degraus pequenos sendo subida: NÃO FOI DO DIA PARA A NOITE.
 * "Primeiro vem o repertório, depois a segurança para atender públicos e imóveis diferentes." → REPERTÓRIO → SEGURANÇA → PÚBLICOS E
 * IMÓVEIS DIFERENTES nos degraus de cima.
 */
const N = 6;
const STEP = { w: 140, h: 86, x0: 100, y0: 1190 };
const LABELS: Record<number, string> = { 0: "LOCAÇÕES PEQUENAS", 3: "REPERTÓRIO", 4: "SEGURANÇA", 5: "PÚBLICOS E IMÓVEIS DIFERENTES" };

const CamIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="2.5" y="6.5" width="13" height="11" rx="2" stroke={C.text} strokeWidth={1.8} />
    <path d="M15.5 10.5l6-3v9l-6-3z" stroke={C.text} strokeWidth={1.8} strokeLinejoin="round" />
  </svg>
);

export const Comeco: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.b_monica - 0.35, { damping: 15, stiffness: 150 });
  const card = sp(t, c.b_monica - 0.1, { damping: 13, stiffness: 180 });
  const cam = sp(t, c.b_cam - 0.1, { damping: 12, stiffness: 200 });
  const key = sp(t, c.b_grad - 0.1, { damping: 12, stiffness: 190 });
  // degraus: 1º em "locações", 2º e 3º durante "gradual", 4º repertório, 5º segurança, 6º diferentes
  const at = [c.b_loc - 0.1, c.b_conta + 0.2, c.b_grad, c.b_rep - 0.1, c.b_seg - 0.1, c.b_dif - 0.3];
  const steps = at.map((x) => sp(t, x, { damping: 13, stiffness: 190 }));
  const lit = at.filter((x) => t >= x).length;
  const walker = Math.max(0, lit - 1) + prog(t, at[Math.min(N - 1, lit)] ?? 999, 0.4, ease.inOut) * 0;
  const wx = STEP.x0 + walker * STEP.w + STEP.w / 2;
  const wy = STEP.y0 - walker * STEP.h - 40 + Math.abs(Math.sin(t * 6)) * -8;
  const out = prog(t, c.d_alto - 0.45, 0.4, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.b_monica - 0.35, s: 1.05, y: -40 },
          { t: c.b_loc + 0.3, s: 1.04, x: -40, y: 60, e: ease.inOut },
          { t: c.b_grad + 0.4, s: 1.0, x: 0, y: 20, e: ease.inOut },
          { t: c.b_seg + 0.3, s: 1.04, x: 20, y: -10, e: ease.inOut },
          { t: c.d_alto, s: 1.03, x: 10, y: 0, e: ease.linear },
        ]}
      >
        {/* ficha do caso → chave */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 290, display: "flex", justifyContent: "center", gap: 14, opacity: Math.min(1, card * 1.5) * (1 - Math.min(1, key * 1.6)) }}>
          <Tag text="CASO REAL" tone="accent" size={28} />
          <Tag text="FONTES: ABMI · INFOMONEY" tone="muted" size={20} />
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 350, textAlign: "center", fontWeight: 800, fontSize: 70, letterSpacing: "-0.035em", color: C.text, opacity: Math.min(1, card * 1.5) * (1 - Math.min(1, key * 1.6)), transform: `translateY(${(1 - Math.min(1, card)) * 40}px)` }}>
          Mônica Poplawski
        </div>
        {cam > 0.001 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 455, display: "flex", justifyContent: "center", opacity: Math.min(1, cam * 1.5) * (1 - Math.min(1, key * 1.6)), transform: `scale(${mix(0.6, 1, Math.min(1.06, cam))})` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 22px", borderRadius: 22, background: C.surface2, border: `2px solid ${C.line}` }}>
              <CamIcon size={44} />
              <span style={{ fontWeight: 700, fontSize: 32, color: C.text }}>Experiência diante das câmeras</span>
            </div>
          </div>
        ) : null}
        {key > 0.001 ? (
          <div style={{ position: "absolute", left: 90, right: 90, top: 330, textAlign: "center", fontWeight: 800, fontSize: 72, lineHeight: 1.02, letterSpacing: "-0.04em", color: C.text, opacity: Math.min(1, key * 1.5), transform: `scale(${mix(1.25, 1, Math.min(1, key))})` }}>
            NÃO FOI DO DIA<br /><span style={{ color: BRAND.hex }}>PARA A NOITE</span>
          </div>
        ) : null}
        {/* escada */}
        {/* contorno da escada (desde a primeira frase) */}
        {Array.from({ length: N }).map((_, i) => {
          const g = prog(t, c.b_monica + 0.4 + i * 0.12, 0.4, ease.out);
          return <div key={`g${i}`} style={{ position: "absolute", left: STEP.x0 + i * STEP.w, top: STEP.y0 - i * STEP.h, width: STEP.w - 8, height: 1260 - (STEP.y0 - i * STEP.h), boxSizing: "border-box", borderRadius: "14px 14px 0 0", border: `3px dashed ${C.dim}`, borderBottom: "none", opacity: g * 0.8 }} />;
        })}
        {(() => {
          const cur = LABELS[Math.max(0, lit - 1)] && lit > 0 ? LABELS[lit - 1] : lit > 0 ? (lit === 2 || lit === 3 ? "PASSO A PASSO" : "") : "";
          if (!cur) return null;
          const k = sp(t, at[Math.max(0, lit - 1)], { damping: 13, stiffness: 200 });
          return (
            <div key={cur} style={{ position: "absolute", left: 0, right: 0, top: 640, display: "flex", justifyContent: "center", opacity: Math.min(1, k * 1.5), transform: `translateY(${(1 - Math.min(1, k)) * 24}px)`, zIndex: 5 }}>
              <Tag text={cur} tone="accent" size={32} style={{ background: BRAND.deep }} />
            </div>
          );
        })()}
        {steps.map((p, i) => {
          if (p <= 0.001) return null;
          const on = i < lit;
          const x = STEP.x0 + i * STEP.w;
          const y = STEP.y0 - i * STEP.h;
          return (
            <React.Fragment key={i}>
              <div style={{ position: "absolute", left: x, top: y, width: STEP.w - 8, height: 1260 - y, boxSizing: "border-box", borderRadius: "14px 14px 0 0", background: on ? (i === lit - 1 ? BRAND.deep : C.surface2) : C.surface, border: `3px solid ${i === lit - 1 ? BRAND.hex : C.line}`, borderBottom: "none", opacity: Math.min(1, p * 1.5), transform: `translateY(${(1 - Math.min(1, p)) * 80}px)`, boxShadow: i === lit - 1 ? `0 0 26px ${brandAlpha(0.3)}` : "none" }} />
            </React.Fragment>
          );
        })}
        {lit > 0 ? <div style={{ position: "absolute", left: wx - 22, top: wy, width: 44, height: 44, borderRadius: 22, background: C.text, boxShadow: `0 0 20px ${brandAlpha(0.5)}`, transition: "none" }} /> : null}
        <div style={{ position: "absolute", left: 0, right: 0, top: 1270, display: "flex", justifyContent: "center", opacity: Math.min(1, steps[0] * 1.5) }}>
          <Tag text="TRAJETÓRIA ILUSTRATIVA" tone="muted" size={22} />
        </div>
      </Camera>
    </div>
  );
};
