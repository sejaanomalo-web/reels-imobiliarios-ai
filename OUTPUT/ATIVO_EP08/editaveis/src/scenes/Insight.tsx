import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, rnd, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { AdCard, CheckDot, Tag, WORDS } from "./ui";

/**
 * CENA 5 — INSIGHT. "Outro corretor pode anunciar um imóvel semelhante e oferecer um bom atendimento também." → os dois anúncios
 * voltam; o do outro corretor ganha BOM ATENDIMENTO (honesto: não garante exclusividade). "O que está nas suas mãos é a qualidade da
 * sua orientação." → os anúncios saem; NAS SUAS MÃOS: ORIENTAÇÃO. "Seja reconhecido por tornar a decisão mais clara, não por repetir
 * adjetivos." → ficam as cinco palavras do roteiro (CRITÉRIO, CLAREZA, TRANSPARÊNCIA, CONFIANÇA, ORIENTAÇÃO); adjetivos riscados caem.
 * "E orientar com clareza começa por ter cada informação organizada." (transição para a CTA) → as palavras viram uma lista organizada.
 */
const FALL = ["AMPLA", "EXCELENTE", "IMPERDÍVEL"];

export const Insight: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const ctaAt = c.cta_quer;
  const enter = sp(t, c.i_outro - 0.35, { damping: 15, stiffness: 150 });
  const good = sp(t, c.i_bom - 0.05, { damping: 11, stiffness: 220 });
  const leave = prog(t, c.i_maos - 0.4, 0.6, ease.in);
  const hands = sp(t, c.i_maos - 0.2, { damping: 14, stiffness: 180 });
  const qual = sp(t, c.i_maos + 0.35, { damping: 14, stiffness: 180 });
  const orient = sp(t, c.i_orient - 0.1, { damping: 11, stiffness: 210 });
  const words = prog(t, c.i_seja - 0.2, 0.3, ease.out);
  const adj = prog(t, c.i_adj - 0.1, 1.2, ease.in);
  const org = prog(t, c.i_e - 0.1, 0.8, ease.inOut);
  const tagOrg = sp(t, c.i_org - 0.1, { damping: 11, stiffness: 220 });
  const out = prog(t, ctaAt - 0.45, 0.4, ease.in);
  const wordAt = (i: number) => mix(c.i_seja, c.i_clara + 0.3, i / (WORDS.length - 1));

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.i_outro - 0.35, s: 0.92, y: -40 },
          { t: c.i_bom + 0.4, s: 1.0, x: 50, y: -20, e: ease.inOut },
          { t: c.i_maos, s: 1.0, x: 0, y: 0, e: ease.inOut },
          { t: c.i_adj, s: 1.04, y: 10, e: ease.inOut },
          { t: c.i_org + 0.3, s: 0.98, y: 0, e: ease.inOut },
          { t: ctaAt, s: 1.0, y: 0, e: ease.linear },
        ]}
      >
        {/* os dois anúncios */}
        {leave < 1 ? (
          <>
            <div style={{ position: "absolute", left: 70, top: 380, transform: `translateX(${-leave * 700}px)` }}>
              <AdCard who="VOCÊ" />
            </div>
            <div style={{ position: "absolute", left: 580, top: 380, transform: `translateX(${leave * 700}px)` }}>
              <AdCard who="OUTRO CORRETOR" />
              {good > 0.01 ? (
                <div style={{ position: "absolute", left: 0, right: 0, bottom: -70, display: "flex", justifyContent: "center", transform: `scale(${mix(0.4, 1, Math.min(1.08, good))})`, opacity: Math.min(1, good * 1.5) }}>
                  <Tag text="✓ BOM ATENDIMENTO TAMBÉM" tone="muted" size={24} style={{ color: C.text }} />
                </div>
              ) : null}
            </div>
          </>
        ) : null}
        {/* nas suas mãos */}
        {hands > 0.01 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 300, textAlign: "center", opacity: Math.min(1, hands * 1.5) }}>
            <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 32, letterSpacing: "0.12em", color: C.muted }}>NAS SUAS MÃOS</div>
            <div style={{ marginTop: 10, fontWeight: 800, fontSize: 64, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, qual * 1.5) * (1 - words), transform: `scale(${mix(0.7, 1, Math.min(1, qual))})` }}>
              a qualidade da sua{" "}
              <span style={{ display: "inline-block", color: orient > 0.5 ? BRAND.hex : C.dim, transform: `scale(${1 + 0.12 * Math.sin(Math.min(1, orient) * Math.PI)})` }}>orientação</span>
            </div>
          </div>
        ) : null}
        {/* as cinco palavras */}
        {words > 0.001 ? (
          <div style={{ position: "absolute", left: 140, right: 140, top: 430, boxSizing: "border-box", borderRadius: 40, border: `3px solid ${org > 0.05 ? brandAlpha(0.3 + 0.4 * org) : "transparent"}`, background: org > 0.05 ? `rgba(21,24,29,${org})` : "transparent", padding: "24px 30px", display: "flex", flexDirection: "column", gap: mix(18, 10, org) }}>
            {WORDS.map((w, i) => {
              const a = sp(t, wordAt(i) - 0.1, { damping: 12, stiffness: 200 });
              const last = i === WORDS.length - 1;
              return (
                <div key={w} style={{ display: "flex", alignItems: "center", justifyContent: org > 0.5 ? "flex-start" : "center", gap: 22, height: 96, opacity: Math.min(1, a * 1.5), transform: `translateY(${(1 - Math.min(1, a)) * 40}px) scale(${mix(0.8, 1, Math.min(1, a))})` }}>
                  {org > 0.05 ? <div style={{ opacity: org }}><CheckDot p={prog(t, c.i_e + 0.2 + i * 0.25, 0.4, ease.out)} size={58} /></div> : null}
                  <span style={{ fontWeight: 800, fontSize: mix(76, 64, org), letterSpacing: "-0.035em", color: last ? BRAND.hex : C.text }}>{w}</span>
                </div>
              );
            })}
          </div>
        ) : null}
        {/* adjetivos riscados caem */}
        {adj > 0 && adj < 1
          ? FALL.map((w, i) => {
              const x = 120 + i * 300 + (rnd(i * 3.1) - 0.5) * 60;
              const y = mix(1080, 1700, adj) + i * 30;
              return (
                <div key={w} style={{ position: "absolute", left: x, top: y, fontWeight: 800, fontSize: 52, color: C.muted, textDecoration: "line-through", textDecorationColor: C.warn, textDecorationThickness: 6, opacity: (1 - adj) * 0.9, transform: `rotate(${(i - 1) * 14 * adj}deg)` }}>
                  {w}
                </div>
              );
            })
          : null}
        {tagOrg > 0.01 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 1060, display: "flex", justifyContent: "center", opacity: Math.min(1, tagOrg * 1.5), transform: `scale(${mix(0.4, 1, Math.min(1.08, tagOrg))})` }}>
            <Tag text="CADA INFORMAÇÃO ORGANIZADA" tone="accent" size={30} />
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
