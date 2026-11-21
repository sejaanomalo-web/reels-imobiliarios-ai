import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, F } from "../../theme";
import { A, Figura, FundoNoir, Holofote, NOIR, aa } from "../../estilos/pictograma";

/** Capa — ATIVO_PICTO_01 (Segundo modelo): pictograma com o celular, cliente que virou contorno, título noir. */
export const PICTO_01Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#050505", fontFamily: F.sans }}>
    <FundoNoir t={3} />
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <line x1={0} y1={1220} x2={1080} y2={1220} stroke="rgba(244,244,242,0.3)" strokeWidth={2} strokeDasharray="3 9" />
      <Holofote x={380} chao={1220} w={420} />
      <Figura t={1} x={380} y={1220} s={1.15} pose="celular" />
      <line x1={450} y1={980} x2={760} y2={980} stroke={NOIR.vermelho} strokeOpacity={0.6} strokeWidth={3} strokeDasharray="3 14" />
      <Figura t={1} x={800} y={1220} s={1.05} pose="pe" tom="fantasma" flip />
    </svg>
    <div style={{ position: "absolute", left: 40, right: 40, top: 330, textAlign: "center", fontWeight: 800, letterSpacing: "0.02em", lineHeight: 1.02 }}>
      <div style={{ fontSize: 112, color: NOIR.branco, textShadow: "0 0 30px rgba(255,255,255,0.28)" }}>NINGUÉM</div>
      <div style={{ fontSize: 88, color: NOIR.vermelho }}>TE AVISA</div>
      <div style={{ marginTop: 26, fontSize: 40, fontWeight: 700, color: NOIR.branco, letterSpacing: "0.01em" }}>quando um cliente <span style={{ color: A.hex }}>desiste</span></div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1610, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 64, filter: `drop-shadow(0 0 16px ${aa(0.35)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
