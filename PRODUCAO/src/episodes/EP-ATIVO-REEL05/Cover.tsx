import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { BRAND, C, F, brandAlpha } from "../../theme";

/** Capa 1080×1920 — três cartas numeradas (parecem atrapalhar → constroem confiança); conteúdo crítico no recorte 3:4 (y 240–1680). */
export const ATIVOREEL05Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={0.1} />
    <div style={{ position: "absolute", left: 70, right: 70, top: 330, textAlign: "center", fontWeight: 800, fontSize: 88, lineHeight: 1.0, letterSpacing: "-0.045em", color: C.text }}>
      3 atitudes que <span style={{ color: C.warn }}>parecem</span> perder a venda
    </div>
    {[0, 1, 2].map((i) => (
      <div key={i} style={{ position: "absolute", left: 85 + i * 315, top: 720 + (i === 1 ? -30 : 0), width: 280, height: 400, boxSizing: "border-box", borderRadius: 30, background: C.surface, border: `4px solid ${i === 1 ? BRAND.hex : C.warn}`, display: "flex", alignItems: "center", justifyContent: "center", transform: `rotate(${(i - 1) * 5}deg)`, boxShadow: i === 1 ? `0 0 40px ${brandAlpha(0.35)}` : "0 30px 70px rgba(0,0,0,0.6)" }}>
        <span style={{ fontWeight: 800, fontSize: 180, color: i === 1 ? BRAND.hex : C.text }}>{i + 1}</span>
      </div>
    ))}
    <div style={{ position: "absolute", left: 0, right: 0, top: 1210, textAlign: "center", fontWeight: 800, fontSize: 56, color: BRAND.hex }}>e constroem confiança.</div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1450, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76, filter: `drop-shadow(0 0 16px ${brandAlpha(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
