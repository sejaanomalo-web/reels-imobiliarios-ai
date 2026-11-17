import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { BRAND, C, F, brandAlpha } from "../../theme";
import { Track } from "./scenes/ui";

/** Capa 1080×1920 — as 4 etapas; conteúdo crítico no recorte 3:4 (y 240–1680). */
export const ATIVOREEL13Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={0.1} />
    <div style={{ position: "absolute", left: 70, right: 70, top: 320, textAlign: "center", fontWeight: 800, fontSize: 88, lineHeight: 1.0, letterSpacing: "-0.045em", color: C.text }}>
      Por que alguns leads <span style={{ color: C.warn }}>se perdem</span> no meio do caminho
    </div>
    <div style={{ position: "absolute", left: 60, top: 760 }}><Track w={960} on={[1, 1, 1, 1]} hi={2} t={0} /></div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1060, textAlign: "center", fontWeight: 800, fontSize: 56, color: C.text }}>
      4 etapas. <span style={{ color: BRAND.hex }}>Nenhuma invisível.</span>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1450, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76, filter: `drop-shadow(0 0 16px ${brandAlpha(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
