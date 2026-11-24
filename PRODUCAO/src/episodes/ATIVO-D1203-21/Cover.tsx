import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, F } from "../../theme";
import { A, Figura, FundoNoir, Holofote, NOIR, aa } from "../../estilos/pictograma";

/** Capa — ATIVO-D1203-21 (Segundo modelo): o corretor aponta o defeito; o cliente acende em verde. */
export const D1203_21Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#050505", fontFamily: F.sans }}>
    <FundoNoir t={3} verde={0.25} />
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <line x1={0} y1={1220} x2={1080} y2={1220} stroke="rgba(244,244,242,0.3)" strokeWidth={2} strokeDasharray="3 9" />
      <Holofote x={540} chao={1220} w={600} cor={A.hex} />
      <Figura t={1} x={420} y={1220} s={1.0} pose="apontando" />
      <Figura t={1} x={660} y={1220} s={0.95} flip pose="bracosAbertos" tom="verde" />
    </svg>
    <div style={{ position: "absolute", left: 40, right: 40, top: 330, textAlign: "center", fontWeight: 800, letterSpacing: "0.02em", lineHeight: 1.02 }}>
      <div style={{ fontSize: 68, color: NOIR.branco, textShadow: "0 0 30px rgba(255,255,255,0.28)" }}>O CONTRA</div>
      <div style={{ fontSize: 104, color: A.hex }}>QUE VENDE</div>
      <div style={{ marginTop: 22, fontSize: 46, fontWeight: 700, color: NOIR.branco }}>comece pelo <span style={{ color: NOIR.vermelho }}>defeito</span></div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1610, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 64, filter: `drop-shadow(0 0 16px ${aa(0.35)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
