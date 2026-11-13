import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, rnd, sp } from "../../../lib/anim";
import { House, MapArt, Pin } from "../../../components/Art";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { IconUser, Tag } from "./ui";

/**
 * CENA 02 — SITUAÇÃO. "Imagine pedir um restaurante tranquilo e receber uma lista com vinte endereços sem explicação.
 * É assim que um comprador pode se sentir."
 * O pedido em balão; a resposta: um mapa entupido de pins e uma lista sem uma linha de explicação.
 * Em "comprador", cada pin vira a miniatura de um imóvel — o mesmo excesso, agora num catálogo.
 */
const P = { x: 70, y: 470, w: 940, h: 760 };
const N = 20;
const pins = Array.from({ length: N }).map((_, i) => ({ x: 60 + rnd(i * 3.1) * 800, y: 60 + rnd(i * 7.7 + 2) * 600 }));
const cell = (i: number) => ({ x: 22 + (i % 5) * 182, y: 70 + Math.floor(i / 5) * 172 });

export const Pins: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const ask = sp(t, c.sit_ask, { damping: 15, stiffness: 150 });
  const quiet = prog(t, c.sit_quiet, 0.4, ease.out);
  const panel = sp(t, c.sit_list - 0.15, { damping: 16, stiffness: 130 });
  const pinT = (i: number) => mix(c.sit_twenty - 0.1, c.sit_noexp + 0.1, i / (N - 1));
  const noexp = sp(t, c.sit_noexp + 0.3, { damping: 12, stiffness: 190 });
  const morph = prog(t, c.sit_buyer - 0.25, 0.9, ease.inOut);
  const buyer = sp(t, c.sit_buyer + 0.4, { damping: 14, stiffness: 160 });
  const exit = prog(t, c.ten_rec - 0.15, 0.45, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - exit }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: c.sit_ask, s: 1.12, y: -280 },
          { t: c.sit_quiet + 0.4, s: 1.08, y: -230, e: ease.inOut },
          { t: c.sit_list + 0.3, s: 1.0, y: 0, e: ease.inOut },
          { t: c.sit_noexp + 0.5, s: 1.04, y: 30, e: ease.inOut },
          { t: c.sit_buyer + 0.6, s: 0.98, y: 20, e: ease.inOut },
          { t: c.ten_rec + 0.3, s: 0.94, y: 0, e: ease.in },
        ]}
      >
        {/* o pedido */}
        <div style={{ position: "absolute", left: 90, top: 280, display: "flex", alignItems: "flex-end", gap: 18, opacity: Math.min(1, ask * 1.5), transform: `translateY(${(1 - Math.min(1, ask)) * 40}px)` }}>
          <div style={{ width: 84, height: 84, borderRadius: 42, background: C.surface3, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <IconUser size={50} color={buyer > 0.5 ? C.accent : C.muted} />
          </div>
          <div style={{ position: "absolute", left: -6, top: -46, opacity: Math.min(1, buyer * 1.5), transform: `scale(${mix(0.6, 1, Math.min(1, buyer))})`, transformOrigin: "0 100%" }}>
            <Tag text="COMPRADOR" tone="accent" size={22} />
          </div>
          <div style={{ padding: "24px 32px", borderRadius: 34, borderBottomLeftRadius: 10, background: C.surface2, border: `1px solid ${C.line}`, fontWeight: 800, fontSize: 46, color: C.text, boxShadow: "0 24px 60px rgba(0,0,0,0.45)" }}>
            Um restaurante{" "}
            <span style={{ color: mix(0, 1, quiet) > 0.5 ? C.accent : C.text, background: `rgba(58,245,132,${0.15 * quiet})`, borderRadius: 10, padding: "0 6px" }}>tranquilo</span>?
          </div>
        </div>

        {/* a resposta: mapa entupido → catálogo entupido */}
        <div style={{ position: "absolute", left: P.x, top: P.y, width: P.w, height: P.h, borderRadius: 44, overflow: "hidden", background: C.surface, border: `1px solid ${C.line}`, boxShadow: "0 50px 110px rgba(0,0,0,0.55)", opacity: Math.min(1, panel * 1.5), transform: `translateY(${(1 - Math.min(1, panel)) * 160}px)` }}>
          <div style={{ position: "absolute", inset: 0, opacity: 1 - morph }}>
            <MapArt w={P.w} h={P.h} />
          </div>
          <div style={{ position: "absolute", left: 24, top: 20, display: "flex", gap: 12, zIndex: 2 }}>
            <Tag text={morph > 0.5 ? "20 IMÓVEIS" : "20 ENDEREÇOS"} tone="muted" size={22} style={{ background: "rgba(21,24,29,0.9)", color: C.text }} />
          </div>
          {pins.map((p, i) => {
            const at = pinT(i);
            const drop = sp(t, at, { damping: 9, stiffness: 200 });
            const g = cell(i);
            const x = mix(p.x, g.x, morph);
            const y = mix(p.y, g.y, morph);
            return (
              <div key={i} style={{ position: "absolute", left: x, top: y, width: 170, height: 160, opacity: Math.min(1, drop * 3) }}>
                <div style={{ position: "absolute", left: 0, top: 0, opacity: 1 - morph, transform: `translateY(${(1 - Math.min(1, drop)) * -120}px)`, filter: "drop-shadow(0 8px 8px rgba(0,0,0,0.5))" }}>
                  <Pin size={46} color={i % 4 === 0 ? C.warn : C.accent} />
                </div>
                <div style={{ position: "absolute", inset: 0, borderRadius: 18, overflow: "hidden", background: C.surface2, border: `1px solid ${C.line}`, opacity: morph, transform: `scale(${mix(0.3, 1, morph)})`, transformOrigin: "0 0" }}>
                  <div style={{ height: 104, display: "flex", alignItems: "flex-end", justifyContent: "center", background: "#1A1E24" }}>
                    <House w={120} h={92} />
                  </div>
                  <div style={{ padding: "10px 12px", fontFamily: F.mono, fontWeight: 700, fontSize: 18, color: C.dim }}>imóvel {(i + 1).toString().padStart(2, "0")}</div>
                </div>
              </div>
            );
          })}
        </div>
        {/* sem explicação */}
        {noexp > 0 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 1150, display: "flex", justifyContent: "center", opacity: Math.min(1, noexp * 1.5), transform: `scale(${mix(0.6, 1, Math.min(1.08, noexp))}) rotate(-2deg)` }}>
            <div style={{ padding: "16px 36px", borderRadius: 28, border: `4px solid ${C.warn}`, background: "rgba(36,14,13,0.94)", fontWeight: 800, fontSize: 58, color: C.warn, letterSpacing: "-0.02em", boxShadow: "0 24px 60px rgba(0,0,0,0.55)" }}>
              sem explicação
            </div>
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
