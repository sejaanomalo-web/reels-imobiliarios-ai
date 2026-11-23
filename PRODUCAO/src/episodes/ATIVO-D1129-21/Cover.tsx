import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, F } from "../../theme";
import { A, Figura, FundoNoir, Halo, Holofote, NOIR, aa } from "../../estilos/pictograma";

/** Capa — ATIVO-D1129-21 (Segundo modelo): o corretor diante da porta aberta, o registro aceso em verde, título noir. */
export const D1129_21Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#050505", fontFamily: F.sans }}>
    <FundoNoir t={3} verde={0.5} />
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <line x1={0} y1={1220} x2={1080} y2={1220} stroke="rgba(244,244,242,0.3)" strokeWidth={2} strokeDasharray="3 9" />
      <Holofote x={420} chao={1220} w={420} />
      <rect x={600} y={760} width={230} height={460} fill={aa(0.14)} />
      <Halo x={715} y={1000} r={300} cor={A.hex} p={0.8} />
      <rect x={600} y={760} width={230} height={460} fill="none" stroke={NOIR.branco} strokeWidth={4} />
      <path d="M 780 770 L 830 760 L 830 1220 L 780 1210 Z" fill="#0A0A0A" stroke={NOIR.linha} strokeWidth={3} />
      <Figura t={1} x={420} y={1220} s={1.15} pose="pe" item="pasta" />
      <g transform="translate(640 880)">
        <rect x={0} y={0} width={130} height={170} rx={8} fill="#0A0A0A" stroke={A.hex} strokeWidth={3} />
        {[0, 1, 2].map((i) => <line key={i} x1={18} y1={34 + i * 26} x2={112} y2={34 + i * 26} stroke={aa(0.7)} strokeWidth={3} strokeLinecap="round" />)}
        <path d="M 18 140 c 10 -22 18 16 28 -4 s 16 -18 22 2" fill="none" stroke={A.hex} strokeWidth={4} strokeLinecap="round" />
      </g>
    </svg>
    <div style={{ position: "absolute", left: 40, right: 40, top: 330, textAlign: "center", fontWeight: 800, letterSpacing: "0.02em", lineHeight: 1.02 }}>
      <div style={{ fontSize: 96, color: NOIR.branco, textShadow: "0 0 30px rgba(255,255,255,0.28)" }}>VISITA NÃO É</div>
      <div style={{ fontSize: 112, color: NOIR.vermelho }}>CORTESIA</div>
      <div style={{ marginTop: 26, fontSize: 44, fontWeight: 700, color: NOIR.branco, letterSpacing: "0.01em" }}>é <span style={{ color: A.hex }}>trabalho</span></div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1610, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 64, filter: `drop-shadow(0 0 16px ${aa(0.35)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
