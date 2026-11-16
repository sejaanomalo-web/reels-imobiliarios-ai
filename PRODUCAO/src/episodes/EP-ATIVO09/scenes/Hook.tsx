import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { CarArt, Label, MapArt, Plan, Tag, TrophyArt } from "./ui";

/**
 * CENA 1 — GANCHO. "Se você está começando como corretor, não precisa fingir que já vendeu dezenas de imóveis para parecer confiável."
 * → o "cenário de autoridade" (carro, troféu, contador +50 VENDIDOS — ilustrativos) monta-se e ganha o carimbo FINGIR?. "Existe uma
 * forma mais interessante de construir autoridade: mostrar como você pensa." → o cenário perde o foco; planta, mapa e anotações
 * entram nítidos; AUTORIDADE NÃO É CENÁRIO → MOSTRE COMO VOCÊ PENSA.
 */
export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const car = 0.55 + 0.45 * sp(t, 0.0, { damping: 14, stiffness: 140 });
  const trophy = sp(t, Math.min(0.15, c.h_comec), { damping: 11, stiffness: 200 });
  const count = prog(t, c.h_dezenas - 0.2, 1.0, ease.out);
  const badge = sp(t, c.h_dezenas - 0.3, { damping: 11, stiffness: 210 });
  const fake = sp(t, c.h_fingir - 0.05, { damping: 9, stiffness: 240 });
  const blur = prog(t, c.h_existe - 0.1, 0.9, ease.inOut);
  const tools = [c.h_existe + 0.3, c.h_existe + 0.6, c.h_existe + 0.9].map((x) => sp(t, x, { damping: 14, stiffness: 170 }));
  const title = sp(t, c.h_autor - 0.2, { damping: 13, stiffness: 180 });
  const think = sp(t, c.h_pensa - 0.15, { damping: 12, stiffness: 200 });
  const out = prog(t, c.m_prim - 0.45, 0.4, ease.in);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: 0, s: 1.12, y: 40 },
          { t: c.h_conf, s: 1.02, y: 20, e: ease.inOut },
          { t: c.h_existe + 0.8, s: 1.0, y: 0, e: ease.inOut },
          { t: c.m_prim, s: 1.04, y: 0, e: ease.linear },
        ]}
      >
        {/* o cenário de status */}
        <div style={{ position: "absolute", inset: 0, filter: blur > 0.01 ? `blur(${blur * 14}px)` : undefined, opacity: mix(1, 0.35, blur), transform: `scale(${mix(1, 0.92, blur)})` }}>
          <div style={{ position: "absolute", left: 140, top: 720, opacity: Math.min(1, car * 1.5), transform: `translateX(${(1 - Math.min(1, car)) * -300}px)` }}>
            <CarArt w={800} />
          </div>
          <div style={{ position: "absolute", left: 640, top: 420, opacity: Math.min(1, trophy * 1.5), transform: `scale(${mix(0.3, 1, Math.min(1.1, trophy))}) rotate(${Math.sin(t * 2) * 3}deg)` }}>
            <TrophyArt size={260} />
          </div>
          {badge > 0.001 ? (
            <div style={{ position: "absolute", left: 110, top: 440, padding: "22px 30px", borderRadius: 30, background: C.surface, border: "3px solid #E5C07B", opacity: Math.min(1, badge * 1.5), transform: `scale(${mix(0.4, 1, Math.min(1.1, badge))}) rotate(-4deg)` }}>
              <div style={{ fontWeight: 800, fontSize: 96, lineHeight: 1, color: C.text }}>+{Math.round(count * 50)}</div>
              <Label size={26} color="#E5C07B">IMÓVEIS VENDIDOS</Label>
            </div>
          ) : null}
          <div style={{ position: "absolute", left: 0, right: 0, top: 1110, textAlign: "center" }}><Tag text="CENÁRIO ILUSTRATIVO" tone="muted" size={22} /></div>
        </div>
        {fake > 0.001 && blur < 1 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 620, display: "flex", justifyContent: "center", opacity: Math.min(1, fake * 1.5) * (1 - blur), transform: `rotate(-8deg) scale(${mix(2, 1, Math.min(1, fake))})`, zIndex: 5 }}>
            <div style={{ padding: "16px 40px", border: `6px solid ${C.warn}`, borderRadius: 20, color: C.warn, fontWeight: 800, fontSize: 92, letterSpacing: "0.04em", background: "rgba(7,8,10,0.6)" }}>FINGIR?</div>
          </div>
        ) : null}
        {/* as ferramentas de quem pensa */}
        {tools[0] > 0.001 ? (
          <>
            <div style={{ position: "absolute", left: 90, top: 560, padding: 18, borderRadius: 28, background: C.surface, border: `2px solid ${brandAlpha(0.5)}`, opacity: Math.min(1, tools[0] * 1.5), transform: `translateY(${(1 - Math.min(1, tools[0])) * 120}px) rotate(-3deg)`, boxShadow: "0 30px 70px rgba(0,0,0,0.6)" }}>
              <Plan size={360} p={prog(t, c.h_existe + 0.3, 1.0, ease.out)} />
            </div>
            <div style={{ position: "absolute", left: 520, top: 520, borderRadius: 28, overflow: "hidden", border: `2px solid ${C.line}`, opacity: Math.min(1, tools[1] * 1.5), transform: `translateY(${(1 - Math.min(1, tools[1])) * 120}px) rotate(3deg)`, boxShadow: "0 30px 70px rgba(0,0,0,0.6)" }}>
              <MapArt w={440} h={330} p={prog(t, c.h_existe + 0.6, 1.0, ease.out)} />
            </div>
            <div style={{ position: "absolute", left: 300, top: 900, width: 480, padding: "22px 28px", borderRadius: 24, background: "#F2F0EA", color: "#14161A", opacity: Math.min(1, tools[2] * 1.5), transform: `translateY(${(1 - Math.min(1, tools[2])) * 120}px) rotate(-2deg)`, boxShadow: "0 30px 70px rgba(0,0,0,0.6)", fontWeight: 700, fontSize: 32, lineHeight: 1.35 }}>
              <div>• o que conferir</div>
              <div>• para quem funciona</div>
              <div>• o que perguntar</div>
            </div>
          </>
        ) : null}
        {/* títulos */}
        {title > 0.001 ? (
          <div style={{ position: "absolute", left: 60, right: 60, top: 300, textAlign: "center", fontWeight: 800, fontSize: 74, lineHeight: 1.02, letterSpacing: "-0.04em", color: C.text, opacity: Math.min(1, title * 1.5), transform: `translateY(${(1 - Math.min(1, title)) * 30}px)` }}>
            {think > 0.5 ? (
              <>MOSTRE COMO<br /><span style={{ color: BRAND.hex }}>VOCÊ PENSA</span></>
            ) : (
              <>AUTORIDADE<br /><span style={{ color: C.warn }}>NÃO É</span> CENÁRIO</>
            )}
          </div>
        ) : null}
      </Camera>
    </div>
  );
};
