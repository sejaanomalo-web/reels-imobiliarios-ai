import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { BRAND, C, F, brandAlpha } from "../../theme";
import { HouseArt, People, SalaArt } from "./scenes/ui";

/** Capa 1080×1920 — feed de salas/fachadas apagado + a pergunta EU CONSIGO COMPRAR?; conteúdo crítico no recorte 3:4 (y 240–1680). */
export const ATIVO10Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={0.1} />
    <div style={{ position: "absolute", inset: 0, opacity: 0.22, filter: "blur(5px)" }}>
      {[60, 390, 720].map((x, ci) =>
        [0, 1, 2, 3, 4].map((k) => (
          <div key={`${ci}-${k}`} style={{ position: "absolute", left: x, top: -80 + k * 395 + ci * 60, width: 300, height: 375, borderRadius: 22, overflow: "hidden" }}>
            {(k + ci) % 2 ? <SalaArt w={300} hue={k + ci} /> : <HouseArt w={300} hue={k + ci} />}
          </div>
        )),
      )}
    </div>
    <div style={{ position: "absolute", left: 70, right: 70, top: 330, textAlign: "center", fontWeight: 800, fontSize: 84, lineHeight: 1.02, letterSpacing: "-0.045em", color: C.text }}>
      O conteúdo que o comprador precisa <span style={{ color: BRAND.hex }}>antes da visita</span>
    </div>
    <div style={{ position: "absolute", left: 140, right: 140, top: 760, boxSizing: "border-box", padding: "40px", borderRadius: 40, background: C.surface, border: `4px solid ${BRAND.hex}`, textAlign: "center", boxShadow: `0 0 60px ${brandAlpha(0.3)}` }}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}><People n={1} size={110} /></div>
      <div style={{ fontWeight: 800, fontSize: 80, lineHeight: 1.0, letterSpacing: "-0.04em", color: C.text }}>EU CONSIGO <span style={{ color: BRAND.hex }}>COMPRAR?</span></div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1450, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76, filter: `drop-shadow(0 0 16px ${brandAlpha(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
