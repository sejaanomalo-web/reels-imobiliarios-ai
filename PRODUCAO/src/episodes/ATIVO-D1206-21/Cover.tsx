import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, F } from "../../theme";
import { A, Figura, FundoNoir, Holofote, Icone, NOIR, aa } from "../../estilos/pictograma";

/** Capa — ATIVO-D1206-21 (Segundo modelo): uma moeda e a pilha: o preço por dia. */
export const D1206_21Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#050505", fontFamily: F.sans }}>
    <FundoNoir t={3} verde={0.2} />
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <line x1={0} y1={1220} x2={1080} y2={1220} stroke="rgba(244,244,242,0.3)" strokeWidth={2} strokeDasharray="3 9" />
      <Holofote x={540} chao={1220} w={620} />
      <Icone t={0} nome="dinheiro" x={330} y={900} r={50} tom="verde" brilho />
      {Array.from({ length: 8 }, (_, i) => <Icone key={i} t={0} nome="dinheiro" x={760} y={1000 - i * 30} r={42} tom="branco" />)}
      <Figura t={1} x={540} y={1220} s={1.0} pose="pe" />
    </svg>
    <div style={{ position: "absolute", left: 40, right: 40, top: 330, textAlign: "center", fontWeight: 800, letterSpacing: "0.02em", lineHeight: 1.02 }}>
      <div style={{ fontSize: 64, color: NOIR.branco, textShadow: "0 0 30px rgba(255,255,255,0.28)" }}>O MESMO DINHEIRO</div>
      <div style={{ fontSize: 100, color: A.hex }}>POR DIA</div>
      <div style={{ marginTop: 22, fontSize: 46, fontWeight: 700, color: NOIR.branco }}>parece <span style={{ color: A.hex }}>menor</span></div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1610, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 64, filter: `drop-shadow(0 0 16px ${aa(0.35)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
