import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { BRAND, C, F, brandAlpha } from "../../theme";
import { RoomArt, Spot, Tag, Viewfinder } from "./scenes/ui";

/** Capa 1080×1920 — visor gravando o cômodo com armário aberto e marcadores + título; conteúdo crítico no recorte 3:4 (y 240–1680). */
export const ATIVOCASE02Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={0.1} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 300, display: "flex", justifyContent: "center" }}>
      <Tag text="CASO REAL" tone="accent" size={32} />
    </div>
    <div style={{ position: "absolute", left: 70, right: 70, top: 390, textAlign: "center", fontWeight: 800, fontSize: 88, lineHeight: 1.0, letterSpacing: "-0.045em", color: C.text }}>
      Grave como quem <span style={{ color: BRAND.hex }}>vai comprar.</span>
    </div>
    <div style={{ position: "absolute", left: 150, top: 640 }}>
      <Viewfinder w={780} h={600} t={0.2}>
        <div style={{ position: "absolute", left: -10, top: 20 }}><RoomArt w={764} doors={1} light={1} path={1} t={0} /></div>
        <Spot x={150} y={240} p={1} t={0.3} label="ARMÁRIO" />
        <Spot x={560} y={190} p={1} t={0.6} label="LUZ" />
      </Viewfinder>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1300, textAlign: "center", fontWeight: 800, fontSize: 56, color: BRAND.hex }}>Mostre. Não enfeite.</div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1450, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76, filter: `drop-shadow(0 0 16px ${brandAlpha(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
