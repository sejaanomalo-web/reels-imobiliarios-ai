import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Confetti, PayNotif, Sobrado, Tag } from "./ui";

/**
 * CENA 1 — GANCHO. "A comissão caiu na conta." → notificação ilustrativa COMISSÃO RECEBIDA (R$ ••••, valor mascarado) desce desde o
 * quadro 0; confete discreto. "Agora vem uma decisão que quase nunca aparece nas fotos de conquista." → a FOTO DE CONQUISTA (sobrado com
 * placa VENDIDO) aparece; a câmera desce para fora da foto, onde a estrada se divide em dois caminhos (A e B) — a decisão.
 */
export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const notif = sp(t, 0, { damping: 13, stiffness: 120 });
  const conf = prog(t, c.h_conta - 0.1, 2.2, ease.linear);
  const nUp = prog(t, c.h_agora - 0.1, 0.6, ease.inOut);
  const photo = sp(t, c.h_fotos - 0.5, { damping: 13, stiffness: 170 });
  const fork = prog(t, c.h_dec - 0.2, 1.0, ease.out);
  const q = sp(t, c.h_dec + 0.5, { damping: 12, stiffness: 190 });
  const t2 = sp(t, c.h_dec - 0.1, { damping: 14, stiffness: 170 });
  const mv = prog(t, c.h_fotos - 0.9, 0.6, ease.inOut);
  const out = prog(t, c.p_num - 0.45, 0.4, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: 0, s: 1.12, y: -30 },
          { t: c.h_conta, s: 1.05, x: 15, y: -20, e: ease.inOut },
          { t: c.h_agora + 0.3, s: 1.0, x: 0, y: 0, e: ease.inOut },
          { t: c.h_fotos, s: 1.04, x: -20, y: -10, e: ease.inOut },
          { t: c.h_conq + 0.4, s: 1.02, x: 0, y: 0, e: ease.inOut },
          { t: c.p_num, s: 1.05, x: 0, y: 0, e: ease.linear },
        ]}
      >
        {/* notificação */}
        <div style={{ position: "absolute", left: 140, top: mix(mix(-200, 560, Math.min(1, notif)), 470, nUp), transform: `scale(${mix(1, 0.78, nUp)})`, transformOrigin: "50% 0", opacity: (1 - nUp * 0.4) * (1 - mv) }}>
          <PayNotif w={800} glow={1 - nUp} />
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: mix(900, 640, nUp), display: "flex", justifyContent: "center", opacity: Math.min(1, notif * 1.5) * (1 - nUp) }}>
          <Tag text="ILUSTRATIVO · VALOR OCULTO" tone="muted" size={24} />
        </div>
        <Confetti p={conf} x={140} y={420} w={800} n={22} />
        {/* a decisão: a estrada se divide (fica fora da foto) */}
        <div style={{ position: "absolute", left: 0, top: 640, width: 1080, height: 420, transform: `translateY(${mix(0, 360, mv)}px) scale(${mix(1, 0.75, mv)})`, transformOrigin: "50% 0" }}>
          <svg width={1080} height={340} style={{ position: "absolute", left: 0, top: 0, opacity: fork }}>
            <path d="M540 0 V120 Q540 180 330 260 L220 330" stroke={C.muted} strokeWidth={10} fill="none" strokeLinecap="round" strokeDasharray="600" strokeDashoffset={600 * (1 - fork)} />
            <path d="M540 120 Q540 180 750 260 L860 330" stroke={BRAND.hex} strokeWidth={10} fill="none" strokeLinecap="round" strokeDasharray="600" strokeDashoffset={600 * (1 - fork)} style={{ filter: `drop-shadow(0 0 10px ${brandAlpha(0.5)})` }} />
          </svg>
          <div style={{ position: "absolute", left: 120, top: 350, opacity: prog(t, c.h_dec + 0.7, 0.4, ease.out) }}><Tag text="CAMINHO A" tone="muted" size={30} style={{ color: C.text }} /></div>
          <div style={{ position: "absolute", left: 700, top: 350, opacity: prog(t, c.h_dec + 0.9, 0.4, ease.out) }}><Tag text="CAMINHO B" tone="accent" size={30} /></div>
          {q > 0.001 ? (
            <div style={{ position: "absolute", left: 470, top: 50, width: 140, height: 140, borderRadius: 70, background: C.surface2, border: `4px solid ${BRAND.hex}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 80, color: BRAND.hex, opacity: Math.min(1, q * 1.5), transform: `scale(${mix(0.4, 1, Math.min(1.08, q)) * (1 + 0.04 * Math.sin(t * 4))})` }}>?</div>
          ) : null}
        </div>
        {/* foto de conquista */}
        {photo > 0.001 ? (
          <div style={{ position: "absolute", left: 270, top: 560, width: 540, boxSizing: "border-box", padding: "20px 20px 62px", borderRadius: 10, background: C.paper, boxShadow: "0 40px 100px rgba(0,0,0,0.6)", opacity: Math.min(1, photo * 1.5), transform: `scale(${mix(0.6, 1, Math.min(1, photo))}) rotate(${mix(-8, -3, Math.min(1, photo)) + Math.sin(t * 1.3) * 0.8}deg)` }}>
            <div style={{ position: "relative", height: 340, borderRadius: 6, overflow: "hidden", background: "#1B2430" }}>
              <div style={{ position: "absolute", left: 60, top: 30 }}><Sobrado w={380} lit={0.8} /></div>
              <div style={{ position: "absolute", left: 30, top: 200, padding: "10px 18px", borderRadius: 10, background: BRAND.hex, color: BRAND.ink, fontWeight: 800, fontSize: 34, transform: "rotate(-6deg)" }}>VENDIDO</div>
            </div>
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 14, textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 26, color: C.inkMuted }}>FOTO DE CONQUISTA</div>
          </div>
        ) : null}
      </Camera>
      <div style={{ position: "absolute", left: 100, right: 100, top: 285, textAlign: "center", fontWeight: 800, fontSize: 62, lineHeight: 1.04, letterSpacing: "-0.03em", color: C.text }}>
        A COMISSÃO CAIU.
        <div style={{ color: BRAND.hex, opacity: Math.min(1, t2 * 1.5), transform: `translateY(${(1 - Math.min(1, t2)) * 20}px)` }}>E A PRÓXIMA CARTEIRA?</div>
      </div>
    </div>
  );
};
