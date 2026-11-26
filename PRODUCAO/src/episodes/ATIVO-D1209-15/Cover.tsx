import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, F } from "../../theme";
import { A, Figura, FundoNoir, Holofote, Icone, NOIR, aa } from "../../estilos/pictograma";

/** Capa — ATIVO-D1209-15 (Segundo modelo): a casa com o X e o boneco que pensa antes. */
export const D1209_15Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#050505", fontFamily: F.sans }}>
    <FundoNoir t={3} verde={0.25} />
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <line x1={0} y1={1220} x2={1080} y2={1220} stroke="rgba(244,244,242,0.3)" strokeWidth={2} strokeDasharray="3 9" />
      <Holofote x={540} chao={1220} w={620} cor={A.hex} p={0.6} />
      <Icone t={0} nome="casa" x={540} y={840} r={84} tom="branco" />
      <Icone t={0} nome="x" x={640} y={750} r={40} tom="vermelho" />
      <Figura t={1} x={540} y={1220} s={0.95} pose="pe" tom="verde" />
    </svg>
    <div style={{ position: "absolute", left: 40, right: 40, top: 330, textAlign: "center", fontWeight: 800, letterSpacing: "0.02em", lineHeight: 1.02 }}>
      <div style={{ fontSize: 64, color: NOIR.branco, textShadow: "0 0 30px rgba(255,255,255,0.28)" }}>IMAGINE QUE</div>
      <div style={{ fontSize: 104, color: A.hex }}>DEU ERRADO</div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1610, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 64, filter: `drop-shadow(0 0 16px ${aa(0.35)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
