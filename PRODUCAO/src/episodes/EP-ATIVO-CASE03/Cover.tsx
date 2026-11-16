import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { BRAND, C, F, brandAlpha } from "../../theme";
import { Film, LuxArt, SmallArt, Tag } from "./scenes/ui";

/** Capa 1080×1920 — trajetória em película (locação simples → alto padrão) + título; conteúdo crítico no recorte 3:4 (y 240–1680). */
export const ATIVOCASE03Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={0.1} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 300, display: "flex", justifyContent: "center" }}>
      <Tag text="CASO REAL" tone="accent" size={32} />
    </div>
    <div style={{ position: "absolute", left: 70, right: 70, top: 390, textAlign: "center", fontWeight: 800, fontSize: 86, lineHeight: 1.0, letterSpacing: "-0.045em", color: C.text }}>
      O preparo vem <span style={{ color: BRAND.hex }}>antes</span> do alto padrão.
    </div>
    <div style={{ position: "absolute", left: 110, top: 760, transform: "rotate(-3deg)" }}><Film w={300} h={380} t={0}><SmallArt w={300} /></Film></div>
    <div style={{ position: "absolute", left: 470, top: 740, transform: "rotate(3deg)" }}><Film w={500} h={360} t={0.4}><LuxArt w={500} /></Film></div>
    <div style={{ position: "absolute", left: 140, right: 140, top: 1200, height: 10, borderRadius: 5, background: BRAND.hex, boxShadow: `0 0 18px ${brandAlpha(0.6)}` }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 1260, textAlign: "center", fontWeight: 800, fontSize: 52, color: C.text }}>50 anos → <span style={{ color: BRAND.hex }}>alto padrão</span></div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1450, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76, filter: `drop-shadow(0 0 16px ${brandAlpha(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
