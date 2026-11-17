import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Chip, IconChat, PropCard, Tag, Track } from "./ui";

/**
 * CENA 2 — O INÍCIO. "Pensa na jornada de um interessado em apartamento." → trilha das 4 etapas aparece apagada. "Primeiro, ele vê um
 * conteúdo que responde algo importante." → 1 ATRAIR acende; vídeo ilustrativo que RESPONDE A DÚVIDA. "Depois, pede informações por um
 * canal claro." → 2 RECEBER acende; PEDIDO DE INFORMAÇÕES por CANAL CLARO. "Até aqui, o trabalho foi chamar atenção e começar uma
 * conversa." → ATENÇÃO ✓ · CONVERSA ✓. Texto-chave: 1. ATRAIR / 2. RECEBER.
 */
export const Ini: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.i_pensa - 0.35, { damping: 15, stiffness: 150 });
  const on = [sp(t, c.i_prim, { damping: 12, stiffness: 200 }), sp(t, c.i_dep, { damping: 12, stiffness: 200 }), 0, 0];
  const vid = sp(t, c.i_cont - 0.3, { damping: 13, stiffness: 180 });
  const req = sp(t, c.i_canal - 0.4, { damping: 13, stiffness: 180 });
  const arrow = prog(t, c.i_dep, 0.6, ease.out);
  const ok = [c.i_aten, c.i_conv].map((x) => sp(t, x - 0.15, { damping: 12, stiffness: 200 }));
  const out = prog(t, c.m_agora - 0.45, 0.4, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={1.2}
        t={t}
        keys={[
          { t: c.i_pensa - 0.35, s: 1.04, y: 0 },
          { t: ((c.i_pensa - 0.35) + (c.i_jorn + 0.3)) / 2, s: 1.105, x: 12, y: -18, e: ease.inOut },
          { t: c.i_jorn + 0.3, s: 1.08, x: 0, y: -15, e: ease.inOut },
          { t: ((c.i_jorn + 0.3) + (c.i_cont + 0.2)) / 2, s: 1.105, x: -12, y: -18, e: ease.inOut },
          { t: c.i_cont + 0.2, s: 1.06, x: -25, y: -10, e: ease.inOut },
          { t: ((c.i_cont + 0.2) + (c.i_canal + 0.2)) / 2, s: 1.085, x: 12, y: -18, e: ease.inOut },
          { t: c.i_canal + 0.2, s: 1.06, x: 25, y: -10, e: ease.inOut },
          { t: ((c.i_canal + 0.2) + (c.i_ate + 0.2)) / 2, s: 1.085, x: -12, y: -18, e: ease.inOut },
          { t: c.i_ate + 0.2, s: 1.03, x: 0, y: 0, e: ease.inOut },
          { t: ((c.i_ate + 0.2) + (c.i_conv + 0.3)) / 2, s: 1.105, x: 12, y: -18, e: ease.inOut },
          { t: c.i_conv + 0.3, s: 1.08, x: 0, y: -20, e: ease.inOut },
          { t: c.m_agora, s: 1.05, y: -10, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: 110, top: 410 }}><Track w={860} on={on} hi={on[1] > 0.5 ? 1 : on[0] > 0.5 ? 0 : -1} t={t} /></div>
        {vid > 0.001 ? (
          <div style={{ position: "absolute", left: 110, top: 660, width: 380, opacity: Math.min(1, vid * 1.5), transform: `translateY(${(1 - Math.min(1, vid)) * 80 + Math.sin(t * 1.7) * 8}px) rotate(${Math.sin(t * 1.2) * 1.5}deg)` }}>
            <div style={{ position: "relative", borderRadius: 26, overflow: "hidden" }}>
              <PropCard w={380} i={2} />
              <div style={{ position: "absolute", left: 160, top: 70, width: 0, height: 0, borderLeft: "54px solid rgba(255,255,255,0.9)", borderTop: "32px solid transparent", borderBottom: "32px solid transparent" }} />
            </div>
            <div style={{ marginTop: 12, display: "flex", justifyContent: "center" }}><Chip text="RESPONDE À DÚVIDA" tone="good" size={26} /></div>
          </div>
        ) : null}
        <div style={{ position: "absolute", left: 500, top: 800, width: 90, height: 10, borderRadius: 5, background: BRAND.hex, transformOrigin: "0 50%", transform: `scaleX(${arrow})`, boxShadow: `0 0 12px ${brandAlpha(0.5)}` }} />
        {req > 0.001 ? (
          <div style={{ position: "absolute", left: 600, top: 680, width: 380, boxSizing: "border-box", padding: "22px 22px", borderRadius: 28, background: C.surface, border: `2px solid ${brandAlpha(0.6)}`, opacity: Math.min(1, req * 1.5), transform: `translateX(${(1 - Math.min(1, req)) * 120}px) translateY(${Math.sin(t * 1.7 + 1) * 8}px)` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}><IconChat size={56} /><span style={{ fontWeight: 800, fontSize: 32, color: C.text, lineHeight: 1.05 }}>PEDIDO DE INFORMAÇÕES</span></div>
            <div style={{ marginTop: 14, display: "flex", justifyContent: "center" }}><Tag text="CANAL CLARO" tone="accent" size={26} /></div>
          </div>
        ) : null}
        <div style={{ position: "absolute", left: 0, right: 0, top: 1110, display: "flex", justifyContent: "center", gap: 20 }}>
          {["ATENÇÃO ✓", "CONVERSA ✓"].map((k, i) => (ok[i] > 0.001 ? <div key={k} style={{ opacity: Math.min(1, ok[i] * 1.5), transform: `scale(${mix(0.5, 1, Math.min(1.08, ok[i]))})` }}><Chip text={k} tone="good" size={34} /></div> : null))}
        </div>
      </Camera>
      <div style={{ position: "absolute", left: 100, right: 100, top: 285, textAlign: "center", fontWeight: 800, fontSize: 58, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, enter * 1.5) }}>
        1. ATRAIR <span style={{ color: C.muted }}>/</span> <span style={{ color: BRAND.hex }}>2. RECEBER</span>
      </div>
    </div>
  );
};
