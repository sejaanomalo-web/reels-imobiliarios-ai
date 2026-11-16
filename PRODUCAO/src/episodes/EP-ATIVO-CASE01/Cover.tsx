import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { BRAND, C, F, brandAlpha } from "../../theme";
import { HouseArt, Phone, Question, Tag } from "./scenes/ui";

/** Capa 1080×1920 — celular com casa apagada + "?" em destaque; conteúdo crítico no recorte 3:4 (y 240–1680); logo discreta. */
export const ATIVOCASE01Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={0.1} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 300, display: "flex", justifyContent: "center" }}>
      <Tag text="CASO REAL" tone="accent" size={32} />
    </div>
    <div style={{ position: "absolute", left: 70, right: 70, top: 390, textAlign: "center", fontWeight: 800, fontSize: 92, lineHeight: 1.0, letterSpacing: "-0.045em", color: C.text }}>
      O detalhe <span style={{ color: C.warn }}>não está</span> nas casas.
    </div>
    <Phone w={360} h={600} glow={1} style={{ left: 360, top: 640 }}>
      <div style={{ position: "absolute", inset: 0, filter: "blur(4px)", opacity: 0.4 }}><HouseArt w={350} hue={1} /></div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 200, display: "flex", justifyContent: "center" }}><Question size={160} /></div>
    </Phone>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1300, textAlign: "center", fontWeight: 800, fontSize: 56, color: BRAND.hex }}>Atenção com intenção.</div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1450, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76, filter: `drop-shadow(0 0 16px ${brandAlpha(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
