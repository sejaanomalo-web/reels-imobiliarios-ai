import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, F } from "../../theme";
import { A, Figura, FundoNoir, Holofote, NOIR, aa } from "../../estilos/pictograma";

/** Capa — ATIVO-D1210-21 (Segundo modelo): a caixa montada, meio torta, acesa. */
export const D1210_21Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#050505", fontFamily: F.sans }}>
    <FundoNoir t={3} verde={0.25} />
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <line x1={0} y1={1220} x2={1080} y2={1220} stroke="rgba(244,244,242,0.3)" strokeWidth={2} strokeDasharray="3 9" />
      <Holofote x={540} chao={1220} w={620} cor={A.hex} p={0.6} />
      <g transform="translate(560 900) rotate(6) scale(1.3)" fill="none" stroke={A.hex} strokeWidth={4} strokeLinejoin="round">
        <rect x={-90} y={-60} width={140} height={120} /><path d="M-90 -60 L-50 -100 L90 -100 L50 -60 Z" /><path d="M50 -60 L90 -100 L90 20 L50 60 Z" />
      </g>
      <Figura t={1} x={540} y={1220} s={0.95} pose="pe" tom="verde" />
    </svg>
    <div style={{ position: "absolute", left: 40, right: 40, top: 330, textAlign: "center", fontWeight: 800, letterSpacing: "0.02em", lineHeight: 1.02 }}>
      <div style={{ fontSize: 64, color: NOIR.branco, textShadow: "0 0 30px rgba(255,255,255,0.28)" }}>MONTADO PELAS</div>
      <div style={{ fontSize: 92, color: A.hex }}>PRÓPRIAS MÃOS</div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1610, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 64, filter: `drop-shadow(0 0 16px ${aa(0.35)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
