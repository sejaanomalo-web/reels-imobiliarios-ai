import React from "react";
import { C, F } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Avatar } from "../../../components/Art";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { PEOPLE } from "./people";
import { Chip, IntentIcon } from "./Rows";

/**
 * CENA 02a — SITUAÇÃO. "Uma quer agendar visita. Outra pede documentação. A terceira ainda nem escolheu bairro."
 * Cada pedido sai do "?" e avança em direção à câmera (profundidade simulada: escala + desfoque);
 * a câmera acompanha cada chegada com um deslocamento lateral; os cartões empilham para abrir espaço.
 */
export const CARD = { x: 100, w: 880, h: 250 };
export const STACK_Y = [300, 580, 860];
const HERO_Y = 560;

export const Incoming: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const arr = [c.sit_c1, c.sit_c2, c.sit_c3];
  return (
    <Camera
      t={t}
      keys={[
        { t: c.sit_c1, x: 0, s: 1.08, r: 0 },
        { t: c.sit_c1 + 0.5, x: -24, s: 1.04, r: -2, e: ease.out },
        { t: c.sit_c2 + 0.5, x: 24, s: 1.0, r: 2, e: ease.inOut },
        { t: c.sit_c3 + 0.5, x: 0, y: 40, s: 0.97, r: 0, e: ease.inOut },
        { t: c.sit_split, x: 0, y: 30, s: 1.0, r: 0 },
      ]}
    >
      {PEOPLE.slice(0, 3).map((p, k) => {
        const a = sp(t, arr[k], { damping: 14, stiffness: 170 });
        if (t < arr[k]) return null;
        const toStack = k < 2 ? sp(t, arr[k + 1] - 0.05, { damping: 16, stiffness: 150 }) : prog(t, c.sit_split - 0.3, 0.3, ease.inOut);
        const y = mix(HERO_Y, STACK_Y[k], toStack);
        const side = k === 0 ? -1 : k === 1 ? 1 : 0;
        const far = 1 - Math.min(1, a);
        const scale = mix(0.12, 1, Math.min(1, a)) * mix(1.04, 1, toStack);
        const glow = Math.max(0, 1 - (t - arr[k]) / 0.8);
        return (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: CARD.x,
              top: y,
              width: CARD.w,
              height: CARD.h,
              boxSizing: "border-box",
              borderRadius: 40,
              background: C.surface2,
              border: `2px solid rgba(53,224,161,${0.15 + 0.6 * glow})`,
              boxShadow: `0 40px 90px rgba(0,0,0,0.6), 0 0 ${90 * glow}px rgba(53,224,161,${0.3 * glow})`,
              padding: "26px 34px",
              fontFamily: F.sans,
              opacity: Math.min(1, a * 2.5),
              transformOrigin: "50% 50%",
              transform: `translate(${far * side * 260}px, ${far * -420}px) scale(${scale}) rotate(${far * side * 12}deg)`,
              filter: far > 0.05 ? `blur(${far * 14}px)` : undefined,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
              <Avatar size={92} label={p.ini} bg={p.bg} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 800, fontSize: 40, color: C.text, letterSpacing: "-0.02em" }}>{p.name}</div>
                <div style={{ fontWeight: 600, fontSize: 32, color: C.muted, marginTop: 4, whiteSpace: "nowrap" }}>“{p.msg}”</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 20 }}>
              <IntentIcon id={p.id} size={40} />
              <Chip text={p.intent} tone="accent" style={{ height: 44, fontSize: 22, padding: "0 16px" }} />
            </div>
          </div>
        );
      })}
    </Camera>
  );
};
