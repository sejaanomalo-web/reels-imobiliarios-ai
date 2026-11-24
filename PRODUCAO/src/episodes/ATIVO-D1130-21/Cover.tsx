import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, F } from "../../theme";
import { A, FundoNoir, Holofote, NOIR, aa } from "../../estilos/pictograma";
import { Casinha, Paredao } from "./scenes/Scenes";

/** Capa — ATIVO-D1130-21 (Segundo modelo): a casinha acesa entre os paredões da obra; título noir. */
export const D1130_21Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#050505", fontFamily: F.sans }}>
    <FundoNoir t={3} verde={0.3} />
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
      <g transform="translate(0 60)">
        <line x1={0} y1={1180} x2={1080} y2={1180} stroke="rgba(244,244,242,0.3)" strokeWidth={2} strokeDasharray="3 9" />
        <Paredao x={-60} w={330} h={700} p={1} />
        <Paredao x={810} w={330} h={660} p={1} />
        <Paredao x={190} w={170} h={480} p={1} />
        <Paredao x={720} w={170} h={450} p={1} />
        <Holofote x={540} chao={1180} w={420} p={0.8} />
        <Casinha x={540} s={0.95} acesa={1} />
      </g>
    </svg>
    <div style={{ position: "absolute", left: 40, right: 40, top: 330, textAlign: "center", fontWeight: 800, letterSpacing: "0.02em", lineHeight: 1.02 }}>
      <div style={{ fontSize: 60, color: NOIR.branco, textShadow: "0 0 30px rgba(255,255,255,0.28)" }}>RECUSOU</div>
      <div style={{ fontSize: 104, color: NOIR.vermelho }}>US$ 1 MILHÃO</div>
      <div style={{ marginTop: 26, fontSize: 44, fontWeight: 700, color: NOIR.branco, letterSpacing: "0.01em" }}>e a casa ficou com quem <span style={{ color: A.hex }}>nunca tentou</span></div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1610, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 64, filter: `drop-shadow(0 0 16px ${aa(0.35)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
