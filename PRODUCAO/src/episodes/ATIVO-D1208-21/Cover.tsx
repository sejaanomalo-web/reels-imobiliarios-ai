import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, F } from "../../theme";
import { A, Figura, FundoNoir, Holofote, NOIR, aa } from "../../estilos/pictograma";

/** Capa — ATIVO-D1208-21 (Segundo modelo): a janela aberta para as árvores e o cliente olhando. */
export const D1208_21Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#050505", fontFamily: F.sans }}>
    <FundoNoir t={3} verde={0.25} />
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <line x1={0} y1={1220} x2={1080} y2={1220} stroke="rgba(244,244,242,0.3)" strokeWidth={2} strokeDasharray="3 9" />
      <Holofote x={540} chao={1220} w={620} cor={A.hex} p={0.6} />
      <g stroke={A.hex} strokeWidth={2.5} fill={aa(0.08)}>
        <circle cx={460} cy={790} r={60} /><line x1={460} y1={850} x2={460} y2={936} />
        <circle cx={600} cy={760} r={74} /><line x1={600} y1={834} x2={600} y2={936} />
      </g>
      <rect x={330} y={640} width={420} height={300} fill="none" stroke={A.hex} strokeWidth={5} />
      <line x1={540} y1={640} x2={540} y2={940} stroke={A.hex} strokeWidth={2} opacity={0.5} />
      <Figura t={1} x={600} y={1220} s={0.95} pose="pe" tom="verde" />
    </svg>
    <div style={{ position: "absolute", left: 40, right: 40, top: 330, textAlign: "center", fontWeight: 800, letterSpacing: "0.02em", lineHeight: 1.02 }}>
      <div style={{ fontSize: 64, color: NOIR.branco, textShadow: "0 0 30px rgba(255,255,255,0.28)" }}>O QUE UMA</div>
      <div style={{ fontSize: 108, color: A.hex }}>JANELA FAZ</div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1610, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 64, filter: `drop-shadow(0 0 16px ${aa(0.35)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
