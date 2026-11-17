import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { Pin } from "../../components/Art";
import { BRAND, C, F, brandAlpha } from "../../theme";
import { CityMap } from "./scenes/ui";

/** Capa 1080×1920 — mapa com um único quarteirão aceso; conteúdo crítico no recorte 3:4 (y 240–1680). */
export const ATIVOREEL09Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={0.1} />
    <div style={{ position: "absolute", left: 70, right: 70, top: 320, textAlign: "center", fontWeight: 800, fontSize: 90, lineHeight: 1.0, letterSpacing: "-0.045em", color: C.text }}>
      Se eu começasse na corretagem <span style={{ color: BRAND.hex }}>hoje</span>
    </div>
    <div style={{ position: "absolute", left: 240, top: 600 }}><CityMap w={600} h={600} hi={12} p={1} /></div>
    <div style={{ position: "absolute", left: 510, top: 790 }}><Pin size={60} /></div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1260, textAlign: "center", fontWeight: 800, fontSize: 54, color: C.text }}>
      Um público. <span style={{ color: BRAND.hex }}>Um contexto.</span>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1450, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76, filter: `drop-shadow(0 0 16px ${brandAlpha(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
