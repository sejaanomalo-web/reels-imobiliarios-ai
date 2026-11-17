import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Question, Tag } from "./ui";

/**
 * CENA 1 — GANCHO. "Você fecha uma venda, comemora... e algumas semanas depois sente que voltou ao ponto de partida." → trilha circular:
 * o marcador sai do PONTO DE PARTIDA, acende VENDA FECHADA (comissão mascarada), segue pelas SEMANAS e volta ao início. "Como isso
 * acontece?" → o círculo fica com um "?" no centro.
 */
const R = 290, CX = 540, CY = 870;

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const p1 = prog(t, 0, Math.max(0.8, c.h_venda), ease.inOut);
  const p2 = prog(t, c.h_sem - 0.3, Math.max(1, c.h_ponto - c.h_sem + 0.5), ease.inOut);
  const ang = -Math.PI / 2 + (p1 * 0.35 + p2 * 0.65) * Math.PI * 2;
  const sale = sp(t, c.h_venda - 0.1, { damping: 11, stiffness: 200 });
  const back = sp(t, c.h_ponto, { damping: 12, stiffness: 190 });
  const q = sp(t, c.h_como - 0.1, { damping: 12, stiffness: 200 });
  const out = prog(t, c.d_na - 0.45, 0.4, ease.in);
  const mx = CX + Math.cos(ang) * R, my = CY + Math.sin(ang) * R;
  const saleAng = -Math.PI / 2 + 0.35 * Math.PI * 2;
  const weeks = [0.5, 0.65, 0.8].map((f) => -Math.PI / 2 + f * Math.PI * 2);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera
        drift={1.2}
        t={t}
        keys={[
          { t: 0, s: 1.1, x: 20, y: -20 },
          { t: c.h_venda + 0.3, s: 1.06, x: 30, y: -10, e: ease.inOut },
          { t: c.h_sem + 0.3, s: 1.02, x: 0, y: 0, e: ease.inOut },
          { t: c.h_volt + 0.3, s: 1.05, x: -30, y: -10, e: ease.inOut },
          { t: c.h_ponto + 0.4, s: 1.09, x: 0, y: -20, e: ease.inOut },
          { t: c.d_na, s: 1.05, x: 0, y: -10, e: ease.linear },
        ]}
      >
        <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
          <circle cx={CX} cy={CY} r={R} stroke={C.surface3} strokeWidth={18} fill="none" />
          <circle cx={CX} cy={CY} r={R} stroke={brandAlpha(0.6)} strokeWidth={18} fill="none" strokeDasharray={`${2 * Math.PI * R}`} strokeDashoffset={2 * Math.PI * R * (1 - (p1 * 0.35 + p2 * 0.65))} transform={`rotate(-90 ${CX} ${CY})`} strokeLinecap="round" />
        </svg>
        {/* ponto de partida */}
        <div style={{ position: "absolute", left: CX - 150, top: CY - R - 110, width: 300, display: "flex", justifyContent: "center" }}>
          <Tag text="PONTO DE PARTIDA" tone={back > 0.5 ? "warn" : "muted"} size={26} style={back > 0.5 ? { transform: `scale(${1 + 0.05 * Math.sin(t * 6)})` } : { color: C.text }} />
        </div>
        {/* venda */}
        {sale > 0.001 ? (
          <div style={{ position: "absolute", left: CX + Math.cos(saleAng) * R - 380, top: CY + Math.sin(saleAng) * R - 60, opacity: Math.min(1, sale * 1.5) * mix(1, 0.55, p2), transform: `scale(${mix(0.4, 1, Math.min(1.08, sale))})`, transformOrigin: "100% 50%" }}>
            <div style={{ padding: "14px 20px", borderRadius: 20, background: BRAND.deep, border: `3px solid ${BRAND.hex}`, boxShadow: `0 0 26px ${brandAlpha(0.35)}` }}>
              <div style={{ fontWeight: 800, fontSize: 34, color: C.text }}>VENDA FECHADA</div>
              <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: BRAND.hex }}>R$ ••••</div>
            </div>
          </div>
        ) : null}
        {weeks.map((a, i) => {
          const p = prog(t, c.h_sem + i * 0.35, 0.3, ease.out);
          return p > 0 ? <div key={i} style={{ position: "absolute", left: CX + Math.cos(a) * (R + 70) - 70, top: CY + Math.sin(a) * (R + 70) - 22, width: 140, textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted, opacity: p }}>SEMANA {i + 1}</div> : null;
        })}
        {/* marcador */}
        <div style={{ position: "absolute", left: mx - 30, top: my - 30, width: 60, height: 60, borderRadius: 30, background: C.text, border: `6px solid ${BRAND.hex}`, boxShadow: `0 0 24px ${brandAlpha(0.5)}` }} />
        {q > 0.001 ? <div style={{ position: "absolute", left: CX - 75, top: CY - 75, opacity: Math.min(1, q * 1.5), transform: `scale(${mix(0.3, 1, Math.min(1.1, q)) * (1 + 0.04 * Math.sin(t * 4))})` }}><Question size={150} /></div> : null}
      </Camera>
      <div style={{ position: "absolute", left: 100, right: 100, top: 285, textAlign: "center", fontWeight: 800, fontSize: 58, lineHeight: 1.04, letterSpacing: "-0.03em", color: C.text }}>
        A VENDA ACONTECEU.<br /><span style={{ color: back > 0.5 ? C.warn : C.muted }}>E O CAIXA?</span>
      </div>
    </div>
  );
};
