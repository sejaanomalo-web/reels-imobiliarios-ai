import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { ease, mix, prog, sp } from "../../../lib/anim";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { Heart, HouseArt, People, SalaArt, Tag } from "./ui";

/**
 * CENA 1 — GANCHO. "Existe um comprador que ainda não está procurando a sala mais bonita do Instagram." → feed genérico em 3 colunas
 * (salas e fachadas) deslizando desde o quadro 0; a "sala mais bonita" acende e apaga. "Ele está tentando descobrir se consegue comprar o
 * primeiro imóvel." → o feed CONGELA e escurece; caixa EU CONSIGO COMPRAR? + PRIMEIRO IMÓVEL. "E, se seus conteúdos só mostram fachadas,
 * talvez você nunca responda à dúvida que realmente importa para ele." → as fachadas voltam (SÓ FACHADAS) e a pergunta fica SEM RESPOSTA.
 */
const COLS = [60, 390, 720];
const TW = 300;
const TH = 375;

export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const freezeAt = c.h_desc - 0.1;
  const tv = Math.min(t, freezeAt);
  const dark = prog(t, freezeAt, 0.4, ease.out) * (1 - 0.55 * prog(t, c.h_fach - 0.2, 0.5, ease.inOut));
  const best = sp(t, c.h_sala - 0.1, { damping: 12, stiffness: 200 });
  const bestOff = prog(t, c.h_insta + 0.3, 0.4, ease.in);
  const box = sp(t, freezeAt + 0.05, { damping: 12, stiffness: 190 });
  const prim = sp(t, c.h_prim - 0.1, { damping: 12, stiffness: 200 });
  const only = sp(t, c.h_fach - 0.1, { damping: 12, stiffness: 200 });
  const none = sp(t, c.h_nunca, { damping: 11, stiffness: 220 });
  const imp = prog(t, c.h_importa - 0.1, 0.5, ease.out);
  const out = prog(t, c.d_antes - 0.45, 0.4, ease.in);
  const facadesOnly = t >= c.h_fach - 0.2;

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - out }}>
      <Camera
        drift={0.5}
        t={t}
        keys={[
          { t: 0, s: 1.1, y: 0 },
          { t: c.h_sala + 0.4, s: 1.04, x: 30, y: -40, e: ease.inOut },
          { t: freezeAt, s: 1.0, x: 0, y: 0, e: ease.inOut },
          { t: c.h_prim + 0.4, s: 1.05, y: -20, e: ease.inOut },
          { t: c.h_nunca + 0.4, s: 0.98, y: 0, e: ease.inOut },
          { t: c.d_antes, s: 1.0, y: -40, e: ease.linear },
        ]}
      >
        {/* feed */}
        <div style={{ position: "absolute", inset: 0, opacity: mix(1, 0.28, dark), filter: dark > 0.02 ? `blur(${dark * 6}px)` : undefined }}>
          {COLS.map((x, ci) => {
            const speed = [120, 160, 135][ci];
            const off = (tv * speed + ci * 140) % (TH + 20);
            return Array.from({ length: 7 }).map((_, k) => {
              const idx = k + ci * 7;
              const sala = !facadesOnly && (idx + ci) % 2 === 0;
              const isBest = ci === 1 && k === 2 && !facadesOnly;
              const y = 120 + k * (TH + 20) - off - (TH + 20);
              return (
                <div key={`${ci}-${k}`} style={{ position: "absolute", left: x, top: y, width: TW, height: TH, borderRadius: 22, overflow: "hidden", border: `3px solid ${isBest && best > 0.5 && bestOff < 1 ? "#E5C07B" : "transparent"}` }}>
                  {sala ? <SalaArt w={TW} hue={idx} /> : <div style={{ marginTop: -20 }}><HouseArt w={TW} hue={idx} /></div>}
                  <div style={{ position: "absolute", right: 14, bottom: 14, opacity: 0.85 }}><Heart size={34} /></div>
                </div>
              );
            });
          })}
        </div>
        {best > 0.001 && bestOff < 1 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 640, display: "flex", justifyContent: "center", opacity: Math.min(1, best * 1.5) * (1 - bestOff), transform: `scale(${mix(0.5, 1, Math.min(1.08, best))})`, zIndex: 4 }}>
            <Tag text="A SALA MAIS BONITA" tone="muted" size={34} style={{ color: "#E5C07B", background: "rgba(7,8,10,0.85)", border: "2px solid #E5C07B" }} />
          </div>
        ) : null}
        {only > 0.001 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 300, display: "flex", justifyContent: "center", gap: 14, opacity: Math.min(1, only * 1.5) }}>
            <Tag text="SÓ FACHADAS" tone="muted" size={32} style={{ color: C.text, background: "rgba(7,8,10,0.85)" }} />
            <Tag text="FEED ILUSTRATIVO" tone="muted" size={22} style={{ background: "rgba(7,8,10,0.85)" }} />
          </div>
        ) : null}
        {/* a pergunta */}
        {box > 0.001 ? (
          <div style={{ position: "absolute", left: 120, right: 120, top: 640, boxSizing: "border-box", padding: "40px 40px 46px", borderRadius: 40, background: C.surface, border: `4px ${none > 0.5 && imp < 0.5 ? "dashed" : "solid"} ${imp > 0.5 ? BRAND.hex : none > 0.5 ? C.warn : C.text}`, textAlign: "center", opacity: Math.min(1, box * 1.5), transform: `scale(${mix(0.6, 1, Math.min(1.06, box))}) translateY(${Math.sin(t * 1.8) * 6}px)`, boxShadow: imp > 0.5 ? `0 0 ${50 + 20 * Math.sin(t * 3)}px ${brandAlpha(0.35)}` : "0 40px 100px rgba(0,0,0,0.7)", zIndex: 5 }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}><People n={1} size={110} /></div>
            <div style={{ fontWeight: 800, fontSize: 84, lineHeight: 1.0, letterSpacing: "-0.04em", color: C.text }}>
              EU CONSIGO <span style={{ color: BRAND.hex }}>COMPRAR?</span>
            </div>
            <div style={{ marginTop: 22, display: "flex", justifyContent: "center", gap: 14, minHeight: 50 }}>
              {prim > 0.001 ? <div style={{ transform: `scale(${mix(0.5, 1, Math.min(1.08, prim))})`, opacity: Math.min(1, prim * 1.5) }}><Tag text="PRIMEIRO IMÓVEL" tone="accent" size={30} /></div> : null}
              {none > 0.001 && imp < 0.5 ? <div style={{ transform: `scale(${mix(1.8, 1, Math.min(1, none))}) rotate(-4deg)`, opacity: Math.min(1, none * 1.5) }}><Tag text="SEM RESPOSTA" tone="warn" size={30} /></div> : null}
            </div>
          </div>
        ) : null}
      </Camera>
      <div style={{ position: "absolute", left: 0, right: 0, top: 1240, height: 420, background: "linear-gradient(180deg, rgba(7,8,10,0) 0%, rgba(7,8,10,0.85) 35%, rgba(7,8,10,0.85) 70%, rgba(7,8,10,0) 100%)", opacity: 1 - dark * 0.6 }} />
    </div>
  );
};
