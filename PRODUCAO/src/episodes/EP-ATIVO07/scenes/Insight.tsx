import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, rnd, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { CheckDot, IconStar, STEPS, Tag } from "./ui";

/**
 * CENA 5 — INSIGHT. "O primeiro contato não precisa provar que você é o melhor corretor da cidade." → selo MELHOR CORRETOR DA CIDADE
 * cercado de ruído (Nº 1, TOP, !!!) e riscado. "Precisa mostrar que você ouviu a pergunta, sabe responder e não vai pressionar…" → o
 * ruído some e três verificações marcam. "Revise estes passos antes de atender seu próximo lead de anúncio." → as verificações viram a
 * cadeia CONTEXTO → CLAREZA → CONFIANÇA (direção do roteiro) + ANTES DO PRÓXIMO LEAD.
 */
const NOISE = ["Nº 1", "TOP VENDAS", "!!!", "O MELHOR", "★★★★★", "IMPERDÍVEL", "!!", "ÚLTIMA CHANCE"];
const CHECKS = ["Ouviu a pergunta", "Sabe responder", "Não pressiona"];

export const Insight: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const ctaAt = tl.segments.find((s) => s.id === "s20")?.start ?? c.cta_sys - 0.9;
  const enter = sp(t, c.i_prim - 0.35, { damping: 15, stiffness: 150 });
  const badge = sp(t, c.i_melhor - 0.2, { damping: 10, stiffness: 200 });
  const strike = prog(t, c.i_melhor + 0.9, 0.45, ease.out);
  const quiet = prog(t, c.i_ouviu - 0.7, 0.9, ease.inOut);
  const checks = [c.i_ouviu, c.i_resp, c.i_press];
  const chain = prog(t, c.i_rev - 0.2, 0.8, ease.inOut);
  const lead = sp(t, c.i_lead - 0.1, { damping: 13, stiffness: 190 });
  const out = prog(t, ctaAt - 0.45, 0.4, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.i_prim - 0.35, s: 1.06, y: 30, r: 1 },
          { t: c.i_melhor + 0.3, s: 1.1, y: 80, r: -1, e: ease.inOut },
          { t: c.i_ouviu, s: 1.0, y: 0, r: 0, e: ease.inOut },
          { t: c.i_rev + 0.5, s: 1.0, y: -20, e: ease.inOut },
          { t: ctaAt, s: 1.04, y: -30, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: 0, right: 0, top: 300, textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 34, letterSpacing: "0.14em", color: C.muted, opacity: 1 - chain }}>
          O PRIMEIRO CONTATO
        </div>
        {/* ruído */}
        {NOISE.map((n, i) => {
          const a = sp(t, c.i_prim + 0.15 + i * 0.16, { damping: 10, stiffness: 230 });
          if (a <= 0.001 || quiet >= 1) return null;
          const x = 80 + rnd(i * 3.7) * 760;
          const y = 380 + rnd(i * 5.1) * 420;
          return (
            <div key={i} style={{ position: "absolute", left: x + Math.sin(t * 9 + i) * 6, top: y + Math.cos(t * 8 + i) * 6, transform: `rotate(${(rnd(i * 2.2) - 0.5) * 30}deg) scale(${mix(0.3, 1, Math.min(1.1, a)) * mix(1, 0.6, quiet)})`, opacity: Math.min(1, a * 1.5) * (1 - quiet) * 0.75, padding: "10px 18px", borderRadius: 14, background: i % 2 ? C.surface3 : "rgba(255,107,94,0.16)", color: i % 2 ? C.text : C.warn, fontWeight: 800, fontSize: 34, whiteSpace: "nowrap" }}>
              {n}
            </div>
          );
        })}
        {/* selo do "melhor corretor" */}
        {badge > 0.001 && chain < 1 ? (
          <div style={{ position: "absolute", left: 140, top: 470, width: 800, height: 300, boxSizing: "border-box", borderRadius: 40, background: C.surface, border: `3px solid ${strike > 0.5 ? C.line : "#E5C07B"}`, display: "flex", alignItems: "center", gap: 30, padding: "0 40px", opacity: Math.min(1, badge * 1.5) * mix(1, 0.45, strike) * (1 - chain), transform: `scale(${mix(0.4, 1, Math.min(1.08, badge)) * mix(1, 0.82, quiet)}) translateY(${-quiet * 130}px)`, boxShadow: "0 40px 100px rgba(0,0,0,0.6)", zIndex: 3 }}>
            <IconStar size={140} color={strike > 0.5 ? C.dim : "#E5C07B"} />
            <div style={{ fontWeight: 800, fontSize: 62, lineHeight: 1.0, letterSpacing: "-0.03em", color: strike > 0.5 ? C.muted : C.text }}>MELHOR CORRETOR DA CIDADE</div>
            <div style={{ position: "absolute", left: 30, right: 30, top: 146, height: 10, borderRadius: 5, background: C.warn, transformOrigin: "0 50%", transform: `scaleX(${strike}) rotate(-4deg)` }} />
            {strike > 0.5 ? (
              <div style={{ position: "absolute", right: 30, top: -30 }}>
                <Tag text="NÃO PRECISA PROVAR" tone="warn" size={24} />
              </div>
            ) : null}
          </div>
        ) : null}
        {/* o que precisa mostrar */}
        {CHECKS.map((k, i) => {
          const a = sp(t, checks[i] - 0.3, { damping: 14, stiffness: 190 });
          if (a <= 0.001 || chain >= 1) return null;
          return (
            <div key={k} style={{ position: "absolute", left: 140, top: 820 + i * 135, width: 800, height: 112, boxSizing: "border-box", borderRadius: 30, background: C.surface, border: `2px solid ${brandAlpha(0.35)}`, display: "flex", alignItems: "center", gap: 26, padding: "0 30px", opacity: Math.min(1, a * 1.5) * (1 - chain), transform: `translateX(${(1 - Math.min(1, a)) * -120}px) translateY(${-chain * (200 + i * 120)}px)` }}>
              <CheckDot p={prog(t, checks[i] + 0.15, 0.4, ease.out)} size={62} />
              <span style={{ fontWeight: 800, fontSize: 46, letterSpacing: "-0.02em", color: C.text }}>{k}</span>
            </div>
          );
        })}
        {/* CONTEXTO → CLAREZA → CONFIANÇA */}
        {chain > 0.001 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 470, display: "flex", flexDirection: "column", alignItems: "center", gap: 26 }}>
            {STEPS.map((s, i) => {
              const a = prog(t, c.i_rev - 0.1 + i * 0.35, 0.5, ease.out);
              return (
                <React.Fragment key={s.k}>
                  {i ? (
                    <svg width={40} height={46} viewBox="0 0 40 46" style={{ opacity: a }}>
                      <path d="M20 4v34M8 28l12 12 12-12" fill="none" stroke={BRAND.hex} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : null}
                  <div style={{ width: 720, height: 128, boxSizing: "border-box", borderRadius: 34, background: i === 2 ? BRAND.deep : C.surface, border: `3px solid ${BRAND.hex}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 36px", opacity: a, transform: `translateY(${(1 - a) * 50}px) scale(${mix(0.9, 1, a)})`, boxShadow: `0 0 ${24 + 10 * Math.sin(t * 2 + i)}px ${brandAlpha(0.22)}` }}>
                    <span style={{ fontWeight: 800, fontSize: 54, letterSpacing: "-0.03em", color: C.text }}>{s.k}</span>
                    <span style={{ fontWeight: 700, fontSize: 28, color: C.muted }}>{s.sub}</span>
                  </div>
                </React.Fragment>
              );
            })}
            {lead > 0.01 ? (
              <div style={{ marginTop: 18, opacity: Math.min(1, lead * 1.5), transform: `scale(${mix(0.5, 1, Math.min(1.08, lead))})` }}>
                <Tag text="ANTES DO PRÓXIMO LEAD DE ANÚNCIO" tone="accent" size={28} />
              </div>
            ) : null}
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
