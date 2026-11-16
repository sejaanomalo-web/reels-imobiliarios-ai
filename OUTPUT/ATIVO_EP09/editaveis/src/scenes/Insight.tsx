import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { CheckDot, Label, MapArt, Plan, STEPS, Tag } from "./ui";

/**
 * CENA 5 — INSIGHT. "Pense nisso: seu próximo conteúdo não precisa anunciar que você entende do assunto." → um post (genérico, sem rede
 * social identificada) com o título "EU ENTENDO DO ASSUNTO!" riscado. "Ele pode demonstrar esse conhecimento, de um jeito que realmente
 * ajude alguém." → o post vira um conteúdo que mostra mapa, planta e etapas + AJUDA ALGUÉM. "Autoridade é percebida no valor do que você
 * explica." → tripé MERCADO / ANÁLISE / PROCESSO + DEMONSTRE O QUE VOCÊ SABE. "Uma atuação mais estratégica também começa pela sua
 * organização." (transição para a CTA) → o tripé apoia-se numa base ORGANIZAÇÃO.
 */
export const Insight: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const ctaAt = c.cta_quer;
  const enter = sp(t, c.i_pense - 0.35, { damping: 15, stiffness: 150 });
  const brag = sp(t, c.i_anunc - 0.2, { damping: 11, stiffness: 210 });
  const strike = prog(t, c.i_anunc + 0.7, 0.4, ease.out);
  const flip = prog(t, c.i_demons - 0.2, 0.6, ease.inOut);
  const help = sp(t, c.i_ajude - 0.1, { damping: 11, stiffness: 220 });
  const tri = prog(t, c.i_autor - 0.3, 0.6, ease.inOut);
  const val = sp(t, c.i_valor - 0.1, { damping: 12, stiffness: 200 });
  const base = sp(t, c.i_org - 0.2, { damping: 12, stiffness: 190 });
  const out = prog(t, ctaAt - 0.45, 0.4, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.i_pense - 0.35, s: 0.95, y: 0 },
          { t: c.i_pense + 1.3, s: 1.02, y: -30, e: ease.inOut },
          { t: c.i_anunc + 0.6, s: 1.09, y: -40, e: ease.inOut },
          { t: c.i_demons + 0.5, s: 1.0, y: 20, e: ease.inOut },
          { t: c.i_ajude + 0.5, s: 1.06, y: 70, e: ease.inOut },
          { t: c.i_autor + 0.2, s: 0.97, y: 0, e: ease.inOut },
          { t: c.i_valor + 0.6, s: 1.02, y: -20, e: ease.inOut },
          { t: c.i_atuac + 0.4, s: 1.0, y: 30, e: ease.inOut },
          { t: c.i_org + 0.3, s: 1.03, y: 50, e: ease.inOut },
          { t: ctaAt, s: 1.03, y: 40, e: ease.linear },
        ]}
      >
        {/* o post */}
        {tri < 1 ? (
          <div style={{ position: "absolute", left: 170, top: 330, width: 740, height: 860, boxSizing: "border-box", borderRadius: 40, background: C.surface, border: `2px solid ${flip > 0.5 ? brandAlpha(0.5) : C.line}`, padding: 30, boxShadow: "0 40px 100px rgba(0,0,0,0.6)", opacity: 1 - tri, transform: `translateY(${Math.sin(t * 1.6) * 9}px) rotate(${Math.sin(t * 1.1) * 0.9}deg) scale(${mix(1, 0.7, tri)}) rotateY(${Math.sin(flip * Math.PI) * 14}deg)` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Label size={26} color={C.text}>SEU PRÓXIMO CONTEÚDO</Label>
              <Tag text="ILUSTRATIVO" tone="muted" size={20} />
            </div>
            {brag < 0.999 && flip < 0.5 ? (
              <div style={{ position: "absolute", left: 30, right: 30, top: 150, opacity: 1 - Math.min(1, brag * 2) }}>
                {[0.86, 0.62, 0.74].map((w, i) => (
                  <div key={i} style={{ height: i ? 30 : 54, width: `${w * 100 * prog(t, c.i_pense + 0.15 + i * 0.5, 0.5, ease.out)}%`, borderRadius: 12, background: C.line, marginBottom: 26, opacity: 0.7 + 0.3 * Math.sin(t * 3 + i) }} />
                ))}
                <div style={{ width: 8, height: 60, borderRadius: 4, background: C.text, opacity: Math.sin(t * 7) > 0 ? 0.9 : 0.15 }} />
              </div>
            ) : null}
            {flip < 0.5 ? (
              <div style={{ marginTop: 160, textAlign: "center", opacity: Math.min(1, brag * 1.5), transform: `scale(${mix(0.5, 1, Math.min(1.08, brag))})`, position: "relative" }}>
                <div style={{ fontWeight: 800, fontSize: 82, lineHeight: 1.02, letterSpacing: "-0.04em", color: strike > 0.5 ? C.muted : C.text }}>EU ENTENDO DO ASSUNTO!</div>
                <div style={{ position: "absolute", left: 30, right: 30, top: "50%", height: 12, borderRadius: 6, background: C.warn, transformOrigin: "0 50%", transform: `scaleX(${strike}) rotate(-4deg)` }} />
                {strike > 0.5 ? <div style={{ marginTop: 40 }}><Tag text="ANUNCIAR" tone="warn" size={28} /></div> : null}
              </div>
            ) : (
              <div style={{ marginTop: 30, display: "flex", flexDirection: "column", gap: 20 }}>
                <Label size={26} color={C.accent}>DEMONSTRAR</Label>
                <div style={{ display: "flex", gap: 20 }}>
                  <div style={{ borderRadius: 20, overflow: "hidden" }}><MapArt w={330} h={250} t={t} /></div>
                  <div style={{ width: 300, height: 250, borderRadius: 20, background: C.bg1, display: "flex", alignItems: "center", justifyContent: "center" }}><Plan size={250} /></div>
                </div>
                {["Antes de visitar", "Documentos", "Verificações"].map((k, i) => (
                  <div key={k} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <CheckDot p={prog(t, c.i_demons + 0.3 + i * 0.2, 0.4, ease.out)} size={46} />
                    <span style={{ fontWeight: 700, fontSize: 34, color: C.text }}>{k}</span>
                  </div>
                ))}
                {help > 0.01 ? <div style={{ display: "flex", justifyContent: "center", marginTop: 10, transform: `scale(${mix(0.4, 1, Math.min(1.08, help))})` }}><Tag text="AJUDA ALGUÉM" tone="accent" size={32} /></div> : null}
              </div>
            )}
          </div>
        ) : null}
        {/* tripé */}
        {tri > 0.001 ? (
          <>
            <div style={{ position: "absolute", left: 0, right: 0, top: 320, textAlign: "center", fontWeight: 800, fontSize: 80, lineHeight: 1.02, letterSpacing: "-0.04em", color: C.text, opacity: tri }}>
              AUTORIDADE
              <div style={{ fontSize: 46, color: C.muted, marginTop: 10, opacity: Math.min(1, val * 1.5) }}>está no <span style={{ color: BRAND.hex }}>valor</span> do que você explica</div>
            </div>
            <div style={{ position: "absolute", left: 70, right: 70, top: 600, display: "flex", gap: 20 }}>
              {STEPS.map((s, i) => {
                const a = prog(t, c.i_autor - 0.1 + i * 0.2, 0.5, ease.out);
                return (
                  <div key={s.k} style={{ flex: 1, height: 360, boxSizing: "border-box", borderRadius: 30, background: C.surface, border: `3px solid ${BRAND.hex}`, padding: "26px 18px", display: "flex", flexDirection: "column", justifyContent: "space-between", opacity: a, transform: `translateY(${(1 - a) * 80 + Math.sin(t * 1.8 + i) * 4}px)`, boxShadow: `0 0 ${22 + 8 * Math.sin(t * 2 + i)}px ${brandAlpha(0.22)}` }}>
                    <div style={{ fontWeight: 800, fontSize: 60, color: BRAND.hex }}>{i + 1}</div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 38, letterSpacing: "-0.02em", color: C.text }}>{s.k}</div>
                      <div style={{ fontWeight: 700, fontSize: 26, lineHeight: 1.15, color: C.muted, marginTop: 6 }}>{s.sub}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ position: "absolute", left: 0, right: 0, top: 1000, display: "flex", justifyContent: "center", opacity: prog(t, c.i_valor + 0.4, 0.5, ease.out) * (1 - Math.min(1, base * 1.5)) }}>
              <Tag text="DEMONSTRE O QUE VOCÊ SABE" tone="accent" size={32} />
            </div>
            {base > 0.001 ? (
              <div style={{ position: "absolute", left: 70, right: 70, top: 980, height: 110, borderRadius: 28, background: BRAND.deep, border: `3px solid ${BRAND.hex}`, display: "flex", alignItems: "center", justifyContent: "center", opacity: Math.min(1, base * 1.5), transform: `translateY(${(1 - Math.min(1, base)) * 80}px)` }}>
                <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 40, letterSpacing: "0.1em", color: C.text }}>ORGANIZAÇÃO</span>
              </div>
            ) : null}
          </>
        ) : null}
      </Camera>
    </div>
  );
};
