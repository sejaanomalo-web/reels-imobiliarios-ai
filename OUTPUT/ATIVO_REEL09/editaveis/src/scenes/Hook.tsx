import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import { Pin } from "../../../components/Art";
import type { SceneProps } from "../../types";
import { CityMap, Tag } from "./ui";

/**
 * CENA 1 — GANCHO. "Se eu começasse do zero vendendo imóveis hoje, não tentaria aparecer para a cidade inteira." → mapa de bairros desde o
 * quadro 0; ondas de "alcance" tentam cobrir a cidade toda e são cortadas (CIDADE INTEIRA ✕). "Começaria com um problema bem específico."
 * → a câmera fecha num único quarteirão, que acende com o pino: UM PROBLEMA ESPECÍFICO.
 */
const MAP = { x: 140, y: 470, w: 800, h: 740 };
const HI = 17;

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const waves = prog(t, c.h_nao - 0.6, 1.6, ease.out);
  const cut = sp(t, c.h_cidade + 0.3, { damping: 11, stiffness: 220 });
  const focus = prog(t, c.h_comec - 0.1, 0.9, ease.inOut);
  const pin = sp(t, c.h_prob - 0.2, { damping: 11, stiffness: 200 });
  const tag = sp(t, c.h_espec - 0.1, { damping: 12, stiffness: 190 });
  const out = prog(t, c.u_esc - 0.45, 0.4, ease.in);
  const hx = MAP.x + ((HI % 5) + 0.5) * (MAP.w / 5);
  const hy = MAP.y + (Math.floor(HI / 5) + 0.5) * (MAP.h / 6);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera
        drift={1.3}
        t={t}
        keys={[
          { t: 0, s: 1.06, x: 0, y: -10 },
          { t: c.h_zero, s: 1.04, x: -20, y: -10, e: ease.inOut },
          { t: c.h_cidade + 0.3, s: 0.98, x: 0, y: 0, e: ease.inOut },
          { t: c.h_comec - 0.1, s: 1.0, x: 0, y: 0, e: ease.inOut },
          { t: c.h_prob + 0.2, s: 1.3, x: hx - 540, y: 0, e: ease.inOut },
          { t: c.u_esc, s: 1.33, x: hx - 540, y: 0, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: MAP.x, top: MAP.y }}><CityMap w={MAP.w} h={MAP.h} hi={HI} p={focus} t={t} /></div>
        {/* ondas tentando cobrir a cidade */}
        {waves > 0 && cut < 1.2 ? [0, 1, 2].map((k) => {
          const r = Math.max(0, waves - k * 0.2) * 900;
          return <div key={k} style={{ position: "absolute", left: 540 - r / 2, top: 810 - r / 2, width: r, height: r, borderRadius: "50%", border: `5px solid ${C.muted}`, opacity: (1 - Math.min(1, cut)) * 0.6 * (1 - waves * 0.4) }} />;
        }) : null}
        {cut > 0.001 && focus < 1 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 760, display: "flex", justifyContent: "center", opacity: Math.min(1, cut * 1.5) * (1 - focus), transform: `rotate(-4deg) scale(${mix(1.6, 1, Math.min(1, cut))})` }}>
            <div style={{ padding: "18px 30px", borderRadius: 24, background: C.bg1, border: `3px solid ${C.warn}`, fontWeight: 800, fontSize: 52, color: C.text, boxShadow: "0 30px 80px rgba(0,0,0,0.7)" }}>
              <span style={{ color: C.warn }}>✕ </span>A CIDADE INTEIRA
            </div>
          </div>
        ) : null}
        {pin > 0.001 ? <div style={{ position: "absolute", left: hx - 30, top: hy - 90 + Math.sin(t * 3) * 6, opacity: Math.min(1, pin * 1.5), transform: `scale(${mix(0.3, 1, Math.min(1.1, pin))})`, transformOrigin: "50% 100%" }}><Pin size={60} /></div> : null}
        {tag > 0.001 ? (
          <div style={{ position: "absolute", left: hx - 230, top: hy + 70, width: 460, display: "flex", justifyContent: "center", opacity: Math.min(1, tag * 1.5), transform: `scale(${mix(0.5, 1, Math.min(1.06, tag)) / 1.3})`, transformOrigin: "50% 0" }}>
            <Tag text="UM PROBLEMA ESPECÍFICO" tone="accent" size={34} style={{ boxShadow: `0 0 24px ${brandAlpha(0.35)}`, background: BRAND.deep }} />
          </div>
        ) : null}
      </Camera>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 520, background: `linear-gradient(180deg, ${C.bg0} 0%, ${C.bg0} 70%, rgba(7,8,10,0) 100%)`, opacity: 0.92 * focus }} />
      <div style={{ position: "absolute", left: 100, right: 100, top: 285, textAlign: "center", fontWeight: 800, fontSize: 62, lineHeight: 1.04, letterSpacing: "-0.03em", color: C.text }}>
        SE EU COMEÇASSE<br /><span style={{ color: BRAND.hex }}>DO ZERO HOJE</span>
      </div>
    </div>
  );
};
