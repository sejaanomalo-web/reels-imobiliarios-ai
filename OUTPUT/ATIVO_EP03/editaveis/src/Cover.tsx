import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { BRAND, C, F, brandAlpha } from "../../theme";
import { Clock } from "./scenes/ui";

/** Capa 1080×1920 — ÂNIMO ≠ PREPARO; conteúdo crítico dentro do recorte 3:4 (y 240–1680); logo oficial discreta. */
export const ATIVO03Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={0.2} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 360, display: "flex", justifyContent: "center", opacity: 0.9 }}>
      <Clock size={300} t={0.31} ring={0.6} />
    </div>
    <div style={{ position: "absolute", left: 80, right: 80, top: 800, textAlign: "center" }}>
      <div style={{ fontWeight: 800, fontSize: 120, letterSpacing: "-0.05em", lineHeight: 1 }}>
        <span style={{ color: C.text }}>ÂNIMO</span>
        <span style={{ color: C.warn, margin: "0 24px" }}>≠</span>
        <span style={{ color: BRAND.hex }}>PREPARO</span>
      </div>
      <div style={{ fontWeight: 800, fontSize: 60, lineHeight: 1.08, letterSpacing: "-0.03em", color: C.text, marginTop: 40 }}>
        A energia de um bom corretor não vem de discurso motivacional
      </div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1440, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 80, filter: `drop-shadow(0 0 16px ${brandAlpha(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
