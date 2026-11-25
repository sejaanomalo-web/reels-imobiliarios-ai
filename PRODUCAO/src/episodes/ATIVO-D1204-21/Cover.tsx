import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, F } from "../../theme";
import { A, Figura, FundoNoir, Holofote, NOIR, aa } from "../../estilos/pictograma";

/** Capa — ATIVO-D1204-21 (Segundo modelo): cômodos em linha, o último aceso com a figura de braços abertos. */
export const D1204_21Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#050505", fontFamily: F.sans }}>
    <FundoNoir t={3} verde={0.3} />
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <line x1={0} y1={1220} x2={1080} y2={1220} stroke="rgba(244,244,242,0.3)" strokeWidth={2} strokeDasharray="3 9" />
      <Holofote x={830} chao={1220} w={420} cor={A.hex} />
      {[200, 420, 640, 860].map((x, i) => <rect key={x} x={x - 95} y={970} width={190} height={250} fill={i === 3 ? aa(0.12) : "none"} stroke={i === 3 ? A.hex : NOIR.branco} strokeWidth={3} />)}
      <Figura t={1} x={860} y={1220} s={0.8} pose="bracosAbertos" tom="verde" />
    </svg>
    <div style={{ position: "absolute", left: 40, right: 40, top: 330, textAlign: "center", fontWeight: 800, letterSpacing: "0.02em", lineHeight: 1.02 }}>
      <div style={{ fontSize: 68, color: NOIR.branco, textShadow: "0 0 30px rgba(255,255,255,0.28)" }}>O FIM DA VISITA</div>
      <div style={{ fontSize: 100, color: A.hex }}>É O QUE FICA</div>
      <div style={{ marginTop: 22, fontSize: 46, fontWeight: 700, color: NOIR.branco }}>termine no <span style={{ color: A.hex }}>melhor cômodo</span></div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1610, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 64, filter: `drop-shadow(0 0 16px ${aa(0.35)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
