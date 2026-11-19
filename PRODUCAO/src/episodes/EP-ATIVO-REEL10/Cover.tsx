import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { BRAND, C, F, brandAlpha } from "../../theme";

/** Capa 1080×1920 — JURO ↓ ? IMÓVEL MAIS BARATO; conteúdo crítico no recorte 3:4 (y 240–1680). Sem números. */
export const ATIVOREEL10Cover: React.FC = () => {
  const card = (top: number, el: React.ReactNode) => (
    <div style={{ position: "absolute", left: 160, right: 160, top, height: 170, borderRadius: 34, background: C.surface, border: `2px solid ${C.line}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 62, letterSpacing: "-0.03em", color: C.text }}>{el}</div>
  );
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
      <Background t={0} mood={0.1} />
      <div style={{ position: "absolute", left: 70, right: 70, top: 320, textAlign: "center", fontWeight: 800, fontSize: 88, lineHeight: 1.0, letterSpacing: "-0.045em", color: C.text }}>
        Juro alto ou baixo: <span style={{ color: BRAND.hex }}>onde está a negociação?</span>
      </div>
      {card(640, <>JURO <span style={{ color: BRAND.hex, marginLeft: 16 }}>↓</span></>)}
      <div style={{ position: "absolute", left: 0, right: 0, top: 815, textAlign: "center", fontWeight: 800, fontSize: 130, color: BRAND.hex, textShadow: `0 0 30px ${brandAlpha(0.6)}` }}>?</div>
      {card(990, <>IMÓVEL <span style={{ color: BRAND.hex, marginLeft: 14 }}>MAIS BARATO</span></>)}
      <div style={{ position: "absolute", left: 0, right: 0, top: 1260, textAlign: "center", fontWeight: 800, fontSize: 54, color: C.text }}>Contexto antes do palpite.</div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 1450, display: "flex", justifyContent: "center" }}>
        <Img src={staticFile(BRAND.logo)} style={{ height: 76, filter: `drop-shadow(0 0 16px ${brandAlpha(0.4)})` }} />
      </div>
      <Grain frame={0} />
    </AbsoluteFill>
  );
};
