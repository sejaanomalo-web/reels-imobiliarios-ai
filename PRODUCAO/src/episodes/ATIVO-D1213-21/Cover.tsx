import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, F } from "../../theme";
import { A, Figura, FundoNoir, Holofote, NOIR, Icone, aa } from "../../estilos/pictograma";

/** Capa — ATIVO-D1211-15 (Segundo modelo): a casa que não cabe no bolso. */
export const D1213_21Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#050505", fontFamily: F.sans }}>
    <FundoNoir t={3} verde={0.25} />
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <line x1={0} y1={1220} x2={1080} y2={1220} stroke="rgba(244,244,242,0.3)" strokeWidth={2} strokeDasharray="3 9" />
      <Holofote x={540} chao={1220} w={620} cor={A.hex} p={0.6} />
      <Icone nome="casa" x={540} y={760} r={150} tom="vermelho" />
      <Figura t={1} x={540} y={1220} s={0.8} pose="pe" item="celular" tom="verde" />
    </svg>
    <div style={{ position: "absolute", left: 40, right: 40, top: 300, textAlign: "center", fontWeight: 800, letterSpacing: "0.02em", lineHeight: 1.02 }}>
      <div style={{ fontSize: 64, color: NOIR.branco, textShadow: "0 0 30px rgba(255,255,255,0.28)" }}>A VISITA QUE</div>
      <div style={{ fontSize: 96, color: A.hex }}>NÃO CABE NO BOLSO</div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1610, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 64, filter: `drop-shadow(0 0 16px ${aa(0.35)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
