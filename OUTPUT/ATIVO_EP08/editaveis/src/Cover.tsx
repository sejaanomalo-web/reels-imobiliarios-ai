import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { BRAND, C, F, brandAlpha } from "../../theme";
import { AdCard } from "./scenes/ui";

/** Capa 1080×1920 — dois anúncios iguais + pergunta; conteúdo crítico dentro do recorte 3:4 (y 240–1680); logo discreta. */
export const ATIVO08Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={0.1} />
    <div style={{ position: "absolute", left: 70, right: 70, top: 320, textAlign: "center", fontWeight: 800, fontSize: 96, lineHeight: 1.0, letterSpacing: "-0.045em", color: C.text }}>
      O mesmo imóvel. <span style={{ color: BRAND.hex }}>Dois corretores.</span>
    </div>
    <div style={{ position: "absolute", left: 70, top: 600, transform: "rotate(-3deg)" }}><AdCard who="CORRETOR A" /></div>
    <div style={{ position: "absolute", left: 580, top: 600, transform: "rotate(3deg)" }}><AdCard who="CORRETOR B" /></div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1110, textAlign: "center", fontWeight: 800, fontSize: 62, letterSpacing: "-0.03em", color: C.text }}>Com qual ele conversa?</div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1420, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76, filter: `drop-shadow(0 0 16px ${brandAlpha(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
