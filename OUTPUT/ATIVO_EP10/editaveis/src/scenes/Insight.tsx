import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { IconHome } from "../../../components/Art";
import { CheckDot, Label, Question, Tag } from "./ui";

/**
 * CENA 5 — INSIGHT + TRANSIÇÃO. "Conteúdo de imóvel apresenta uma opção." → caminho MOSTRAR O IMÓVEL. "Conteúdo educativo ajuda o
 * comprador a entender a própria decisão." → caminho EXPLICAR A DECISÃO. "Os dois têm espaço na estratégia, mas não fazem a mesma coisa."
 * → os caminhos convergem em ATENDIMENTO MAIS CLARO (≠ entre eles). "Para acompanhar cada comprador nessa jornada, vale ter as informações
 * organizadas." (transição adaptada da CTA de salvar/compartilhar) → a jornada vira três etapas que se marcam.
 */
export const Insight: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.i_im - 0.35, { damping: 15, stiffness: 150 });
  const L = sp(t, c.i_im - 0.15, { damping: 13, stiffness: 180 });
  const Lsub = prog(t, c.i_opcao - 0.1, 0.4, ease.out);
  const R = sp(t, c.i_edu - 0.15, { damping: 13, stiffness: 180 });
  const Rsub = prog(t, c.i_decisao - 0.1, 0.4, ease.out);
  const conv = prog(t, c.i_dois - 0.1, 0.9, ease.inOut);
  const diff = sp(t, c.i_mesma - 0.1, { damping: 11, stiffness: 220 });
  const jor = sp(t, c.i_jorn - 0.1, { damping: 13, stiffness: 190 });
  const org = prog(t, c.i_org - 0.2, 0.5, ease.out);
  const out = prog(t, c.cta_quer - 0.45, 0.4, ease.in);
  const flow = (t * 0.8) % 1;

  const path = (left: boolean, p: number, sub: number, inner = 1) => (
    <div style={{ position: "absolute", left: left ? 90 : 570, top: 360 + Math.sin(t * 1.5 + (left ? 0 : 2)) * 5, width: 420, height: 380, boxSizing: "border-box", borderRadius: 34, background: C.surface, border: `3px ${inner > 0.5 ? "solid" : "dashed"} ${left ? C.text : inner > 0.5 ? BRAND.hex : C.dim}`, padding: 28, display: "flex", flexDirection: "column", justifyContent: "space-between", opacity: Math.min(1, p * 1.5), transform: `translateY(${(1 - Math.min(1, p)) * 80}px)`, boxShadow: left ? "0 30px 70px rgba(0,0,0,0.5)" : `0 0 34px ${brandAlpha(0.22)}` }}>
      <div style={{ opacity: inner }}>{left ? <IconHome size={90} color={C.text} stroke={2} /> : <Question size={90} />}</div>
      <div style={{ opacity: inner }}>
        <Label size={24}>{left ? "CONTEÚDO DE IMÓVEL" : "CONTEÚDO EDUCATIVO"}</Label>
        <div style={{ fontWeight: 800, fontSize: 46, lineHeight: 1.04, letterSpacing: "-0.03em", color: C.text, marginTop: 6 }}>{left ? "Mostrar o imóvel" : "Explicar a decisão"}</div>
        <div style={{ fontWeight: 700, fontSize: 30, color: left ? C.muted : BRAND.hex, marginTop: 8, opacity: sub }}>{left ? "apresenta uma opção" : "ajuda a entender"}</div>
      </div>
    </div>
  );

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.i_im - 0.35, s: 1.05, x: -60, y: -20 },
          { t: c.i_edu + 0.3, s: 1.05, x: 60, y: -20, e: ease.inOut },
          { t: c.i_dois + 0.5, s: 0.97, x: 0, y: 20, e: ease.inOut },
          { t: c.i_jorn + 0.3, s: 1.02, y: 60, e: ease.inOut },
          { t: c.cta_quer, s: 1.04, y: 70, e: ease.linear },
        ]}
      >
        {path(true, L, Lsub)}
        {path(false, Math.max(R, 0.6 * L), Rsub, Math.min(1, R * 1.5))}
        {diff > 0.001 ? (
          <div style={{ position: "absolute", left: 490, top: 500, width: 100, textAlign: "center", fontWeight: 800, fontSize: 84, color: C.warn, opacity: Math.min(1, diff * 1.5), transform: `scale(${mix(1.8, 1, Math.min(1, diff))})` }}>≠</div>
        ) : null}
        {/* convergência */}
        <svg width={1080} height={260} style={{ position: "absolute", left: 0, top: 740, overflow: "visible" }}>
          {[300, 780].map((x, i) => {
            const d = `M ${x} 0 C ${x} 120, 540 100, 540 220`;
            return (
              <g key={i} opacity={conv}>
                <path d={d} stroke={i ? BRAND.hex : C.muted} strokeWidth={8} fill="none" strokeDasharray="400" strokeDashoffset={400 * (1 - conv)} strokeLinecap="round" />
                {conv > 0.9 ? <circle cx={mix(x, 540, flow)} cy={mix(0, 220, flow * flow)} r={10} fill={i ? BRAND.hex : C.text} /> : null}
              </g>
            );
          })}
        </svg>
        {conv > 0.6 ? (
          <div style={{ position: "absolute", left: 140, right: 140, top: 970, height: 110, borderRadius: 32, background: BRAND.deep, border: `3px solid ${BRAND.hex}`, display: "flex", alignItems: "center", justifyContent: "center", opacity: prog(conv, 0.6, 0.4, ease.out), boxShadow: `0 0 ${36 + 14 * Math.sin(t * 3)}px ${brandAlpha(0.3)}` }}>
            <span style={{ fontWeight: 800, fontSize: 50, letterSpacing: "-0.02em", color: C.text }}>ATENDIMENTO MAIS CLARO</span>
          </div>
        ) : null}
        {/* jornada organizada */}
        {jor > 0.001 ? (
          <div style={{ position: "absolute", left: 140, right: 140, top: 1110, display: "flex", justifyContent: "space-between", opacity: Math.min(1, jor * 1.5), transform: `translateY(${(1 - Math.min(1, jor)) * 40}px)` }}>
            {["DÚVIDAS", "VISITA", "DECISÃO"].map((k, i) => (
              <div key={k} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <CheckDot p={prog(org, i * 0.25, 0.4, ease.out)} size={44} />
                <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, letterSpacing: "0.06em", color: C.text }}>{k}</span>
              </div>
            ))}
          </div>
        ) : null}
        {jor > 0.001 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 1190, display: "flex", justifyContent: "center", opacity: org }}>
            <Tag text="INFORMAÇÕES ORGANIZADAS" tone="accent" size={24} />
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
