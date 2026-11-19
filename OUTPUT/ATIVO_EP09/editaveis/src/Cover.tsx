import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { BRAND, C, F, brandAlpha } from "../../theme";
import { CarArt, MapArt, Plan } from "./scenes/ui";

/** Capa 1080×1920 — carro desfocado × planta e mapa nítidos + título; conteúdo crítico no recorte 3:4 (y 240–1680); logo discreta. */
export const ATIVO09Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={0.1} />
    <div style={{ position: "absolute", left: 60, right: 60, top: 320, textAlign: "center", fontWeight: 800, fontSize: 92, lineHeight: 1.0, letterSpacing: "-0.045em", color: C.text }}>
      Autoridade <span style={{ color: C.warn }}>não é</span> uma foto ao lado de um carro.
    </div>
    <div style={{ position: "absolute", left: 140, top: 760, filter: "blur(10px)", opacity: 0.45 }}><CarArt w={800} /></div>
    <div style={{ position: "absolute", left: 100, top: 900, padding: 16, borderRadius: 26, background: C.surface, border: `2px solid ${brandAlpha(0.5)}`, transform: "rotate(-3deg)" }}><Plan size={330} /></div>
    <div style={{ position: "absolute", left: 540, top: 880, borderRadius: 26, overflow: "hidden", transform: "rotate(3deg)" }}><MapArt w={420} h={315} /></div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1290, textAlign: "center", fontWeight: 800, fontSize: 56, color: BRAND.hex }}>Mostre como você pensa.</div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1440, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76, filter: `drop-shadow(0 0 16px ${brandAlpha(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
