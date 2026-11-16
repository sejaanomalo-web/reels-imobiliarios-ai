import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Heart, HouseArt, RoomArt, Spot, Tag, Viewfinder } from "./ui";

/**
 * CENA 1 — GANCHO. "Enquanto muita gente grava a casa para impressionar o proprietário, esse agente imobiliário faz o contrário: grava como
 * quem vai comprar." → visor de câmera gravando desde o quadro 0: fachada com brilho e corações (GRAVAR PARA IMPRESSIONAR); no "contrário"
 * a imagem varre para dentro do cômodo: armário aberto, marcadores de detalhe (GRAVAR COMO QUEM VAI COMPRAR). Imagens ilustrativas.
 */
const VF = { x: 110, y: 400, w: 860, h: 740 };

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const owner = sp(t, c.h_prop - 0.1, { damping: 12, stiffness: 200 });
  const wipe = prog(t, c.h_contr - 0.05, 0.55, ease.inOut);
  const doors = prog(t, c.h_contr + 0.4, 0.6, ease.inOut);
  const spots = [c.h_contr + 0.7, c.h_comprar - 0.2, c.h_comprar + 0.2].map((x) => sp(t, x, { damping: 12, stiffness: 210 }));
  const t1 = 1;
  const t2 = sp(t, c.h_contr + 0.1, { damping: 13, stiffness: 180 });
  const out = prog(t, c.c_jason - 0.45, 0.4, ease.in);
  const iw = VF.w - 36;

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: 0, s: 1.06, y: 20 },
          { t: c.h_prop + 0.3, s: 1.0, y: 0, e: ease.inOut },
          { t: c.h_contr + 0.6, s: 1.04, x: 30, y: -20, e: ease.inOut },
          { t: c.c_jason, s: 1.06, x: 0, y: -30, e: ease.linear },
        ]}
      >
        <div style={{ position: "absolute", left: VF.x, top: VF.y }}>
          <Viewfinder w={VF.w} h={VF.h} t={t} label="IMAGEM ILUSTRATIVA">
            {/* fachada para impressionar */}
            <div style={{ position: "absolute", inset: 0, clipPath: `inset(0 ${wipe * 100}% 0 0)` }}>
              <div style={{ position: "absolute", left: -60, top: -230, transform: `translate(${Math.sin(t * 0.9) * 45}px, ${Math.cos(t * 0.7) * 18}px) scale(${1.04 + 0.08 * Math.min(1, t / 4)}) rotate(${Math.sin(t * 1.3) * 1.2}deg)` }}>
                <HouseArt w={iw + 120} hue={4} lit={1} />
              </div>
              {Array.from({ length: 9 }).map((_, i) => {
                const ph = (t * 0.8 + i * 0.37) % 1;
                return <div key={i} style={{ position: "absolute", left: 60 + ((i * 97) % 700), top: 80 + ((i * 151) % 420), width: 26, height: 26, opacity: Math.sin(ph * Math.PI) * 0.9, transform: `rotate(45deg) scale(${0.5 + ph})`, background: "#FFE2A8", clipPath: "polygon(50% 0, 60% 40%, 100% 50%, 60% 60%, 50% 100%, 40% 60%, 0 50%, 40% 40%)" }} />;
              })}
              {[0, 1, 2].map((i) => {
                const ph = (t * 0.6 + i * 0.33) % 1;
                return <div key={`h${i}`} style={{ position: "absolute", right: 60 + i * 50, bottom: 60 + ph * 260, opacity: 1 - ph }}><Heart size={44} color={C.warn} /></div>;
              })}
              {owner > 0.001 ? (
                <div style={{ position: "absolute", left: 40, bottom: 40, opacity: Math.min(1, owner * 1.5), transform: `scale(${mix(0.5, 1, Math.min(1.08, owner))})`, transformOrigin: "0 100%" }}>
                  <Tag text="PARA O PROPRIETÁRIO" tone="muted" size={28} style={{ color: "#E5C07B", background: "rgba(7,8,10,0.85)", border: "2px solid #E5C07B" }} />
                </div>
              ) : null}
            </div>
            {/* como quem vai comprar */}
            <div style={{ position: "absolute", inset: 0, clipPath: `inset(0 0 0 ${(1 - wipe) * 100}%)`, background: "#1C2028" }}>
              <div style={{ position: "absolute", left: -10 + Math.sin(t * 1.1) * 18, top: 70 + Math.cos(t * 0.9) * 10 }}><RoomArt w={iw + 20} doors={doors} light={wipe} path={0} t={t} /></div>
              <Spot x={170} y={330} p={spots[0]} t={t} label="ARMÁRIO" />
              <Spot x={600} y={250} p={spots[1]} t={t} label="LUZ" />
              <Spot x={420} y={560} p={spots[2]} t={t} label="ACABAMENTO" />
            </div>
          </Viewfinder>
        </div>
      </Camera>
      {/* títulos fora da câmera */}
      {t2 < 0.5 ? (
        <div style={{ position: "absolute", left: 100, right: 100, top: 280, textAlign: "center", fontWeight: 800, fontSize: 62, lineHeight: 1.05, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, t1 * 1.5) * (1 - Math.min(1, t2 * 2)) }}>
          GRAVAR PARA <span style={{ color: "#E5C07B" }}>IMPRESSIONAR</span>
        </div>
      ) : null}
      {t2 > 0.001 ? (
        <div style={{ position: "absolute", left: 100, right: 100, top: 280, textAlign: "center", fontWeight: 800, fontSize: 62, lineHeight: 1.05, letterSpacing: "-0.03em", color: C.text, opacity: Math.min(1, t2 * 1.5), transform: `translateY(${(1 - Math.min(1, t2)) * 30}px)`, textShadow: `0 0 30px ${brandAlpha(0.25)}` }}>
          GRAVAR COMO QUEM <span style={{ color: BRAND.hex }}>VAI COMPRAR</span>
        </div>
      ) : null}
    </div>
  );
};
