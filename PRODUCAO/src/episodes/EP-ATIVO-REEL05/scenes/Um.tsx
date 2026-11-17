import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Count, Head, Mark, People, StairHouse, Tag } from "./ui";

/**
 * CENA 2 — 1. DIZER QUANDO NÃO SERVE. "Primeira: admitir quando um imóvel não encaixa." → 1/3 + título. "Se a pessoa precisa evitar escadas
 * e a casa tem muitos degraus, não adianta tentar transformar isso em vantagem." → pessoa com PRECISA EVITAR ESCADAS; a casa ilustrativa
 * acende os degraus; o balão "Ótimo para se exercitar!" (virar vantagem) é riscado. "Mostrar o limite evita uma visita frustrada." → selo
 * neutro NÃO ENCAIXA NESTE CASO (informação, não reprovação) + VISITA FRUSTRADA EVITADA.
 */
export const Um: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const enter = sp(t, c.u_prim - 0.35, { damping: 15, stiffness: 150 });
  const head = sp(t, c.u_prim - 0.1, { damping: 13, stiffness: 180 });
  const need = sp(t, c.u_escadas - 0.1, { damping: 12, stiffness: 200 });
  const stairs = prog(t, c.u_degraus - 0.2, 0.8, ease.out);
  const spin = sp(t, c.u_adianta - 0.1, { damping: 12, stiffness: 200 });
  const strike = prog(t, c.u_vant, 0.35, ease.out);
  const lim = sp(t, c.u_limite - 0.1, { damping: 12, stiffness: 200 });
  const vis = sp(t, c.u_visita - 0.05, { damping: 12, stiffness: 200 });
  const out = prog(t, c.d_seg - 0.45, 0.4, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(1, enter * 1.5) * (1 - out) }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.u_prim - 0.35, s: 1.04, y: -30 },
          { t: c.u_encaixa + 0.2, s: 1.06, x: 30, y: -10, e: ease.inOut },
          { t: c.u_escadas, s: 1.04, x: -40, y: 0, e: ease.inOut },
          { t: c.u_degraus + 0.4, s: 1.06, x: 30, y: 20, e: ease.inOut },
          { t: c.u_vant + 0.3, s: 1.02, x: 0, y: 30, e: ease.inOut },
          { t: c.u_limite + 0.5, s: 1.03, y: 60, e: ease.inOut },
          { t: c.u_visita + 0.4, s: 1.06, x: -20, y: 80, e: ease.inOut },
          { t: c.d_seg, s: 1.03, y: 60, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: 100, top: 300 }}><Head n={1} text="Dizer quando não serve" p={head} /></div>
        {/* pessoa */}
        <div style={{ position: "absolute", left: 100, top: 460, display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ padding: "14px 18px 8px", borderRadius: 24, background: C.surface, border: `2px solid ${C.line}` }}><People n={1} size={84} /></div>
          {need > 0.001 ? <div style={{ opacity: Math.min(1, need * 1.5), transform: `scale(${mix(0.5, 1, Math.min(1.08, need))})`, transformOrigin: "0 50%" }}><Tag text="PRECISA EVITAR ESCADAS" tone="muted" size={28} style={{ color: C.text }} /></div> : null}
        </div>
        {/* casa */}
        <div style={{ position: "absolute", left: 200, top: 590, borderRadius: 28, overflow: "hidden", border: `3px solid ${lim > 0.5 ? brandAlpha(0.5) : C.line}`, boxShadow: "0 30px 80px rgba(0,0,0,0.6)", opacity: Math.min(1, enter * 1.5) }}>
          <StairHouse w={680} hi={stairs} t={t} />
          <div style={{ position: "absolute", right: 14, top: 14 }}><Tag text="IMÓVEL ILUSTRATIVO" tone="muted" size={20} style={{ background: "rgba(7,8,10,0.75)" }} /></div>
          {stairs > 0.5 ? <div style={{ position: "absolute", left: 150, top: 80, opacity: prog(stairs, 0.5, 0.4, ease.out) }}><Tag text="MUITOS DEGRAUS" tone="muted" size={26} style={{ color: "#E5C07B", background: "rgba(7,8,10,0.85)", border: "2px solid #E5C07B" }} /></div> : null}
        </div>
        {spin > 0.001 && lim < 0.5 ? (
          <div style={{ position: "absolute", left: 260, top: 1150, zIndex: 5, opacity: Math.min(1, spin * 1.5) * (1 - lim * 2), transform: `rotate(-3deg) scale(${mix(0.5, 1, Math.min(1.08, spin))})` }}>
            <div style={{ position: "relative", padding: "16px 26px", borderRadius: 26, borderBottomLeftRadius: 6, background: C.surface3, fontWeight: 800, fontSize: 40, color: C.muted }}>
              “Ótimo para se exercitar!”
              <div style={{ position: "absolute", left: 14, right: 14, top: "50%", height: 9, borderRadius: 5, background: C.warn, transformOrigin: "0 50%", transform: `scaleX(${strike}) rotate(-3deg)` }} />
            </div>
          </div>
        ) : null}
        {lim > 0.001 ? (
          <div style={{ position: "absolute", left: 100, right: 100, top: 1150, display: "flex", flexDirection: "column", alignItems: "center", gap: 12, zIndex: 5 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 26px", borderRadius: 26, background: C.surface, border: `3px solid ${C.text}`, opacity: Math.min(1, lim * 1.5), transform: `scale(${mix(0.6, 1, Math.min(1.06, lim))})` }}>
              <span style={{ width: 44, height: 44, borderRadius: 22, border: `3px solid ${C.text}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 28, color: C.text }}>i</span>
              <span style={{ fontWeight: 800, fontSize: 38, color: C.text }}>Não encaixa neste caso</span>
            </div>
            {vis > 0.001 ? (
              <div style={{ display: "flex", alignItems: "center", gap: 12, opacity: Math.min(1, vis * 1.5) }}>
                <Mark ok size={46} />
                <span style={{ fontWeight: 800, fontSize: 36, color: BRAND.hex }}>Visita frustrada evitada</span>
              </div>
            ) : null}
          </div>
        ) : null}
      </Camera>
      <div style={{ position: "absolute", right: 100, top: 260 }}><Count n={1} p={head} /></div>
    </div>
  );
};
