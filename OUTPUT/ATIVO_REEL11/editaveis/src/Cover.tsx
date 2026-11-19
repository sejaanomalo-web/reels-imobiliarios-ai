import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { BRAND, C, F, brandAlpha } from "../../theme";
import { Tank } from "./scenes/ui";

/** Capa 1080×1920 — reservatório com saída contínua; conteúdo crítico no recorte 3:4 (y 240–1680). Sem números. */
export const ATIVOREEL11Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={0.1} />
    <div style={{ position: "absolute", left: 70, right: 70, top: 320, textAlign: "center", fontWeight: 800, fontSize: 86, lineHeight: 1.0, letterSpacing: "-0.045em", color: C.text }}>
      A venda aconteceu. <span style={{ color: C.warn }}>O caixa não respirou.</span>
    </div>
    <div style={{ position: "absolute", left: 220, top: 600 }}><Tank w={420} h={440} level={0.28} inflow={0} outflow={1} t={1.2} /></div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1240, textAlign: "center", fontWeight: 800, fontSize: 56, color: C.text }}>
      Continuidade <span style={{ color: BRAND.hex }}>importa.</span>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1450, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76, filter: `drop-shadow(0 0 16px ${brandAlpha(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
