import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A } from "../NOV26/kit";
import { Comodo, Contorno, FundoPlanta, Prancha, SOMBRA } from "../../estilos/planta";

/** Capa 1080×1920 — ATIVO-D1204-18: a encosta com letras genéricas e o loteamento aceso. */
export const D1204_18Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <FundoPlanta t={0} luzY={900} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 330, textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.18em", color: C.muted }}>LOS ANGELES · 1923</div>
    <div style={{ position: "absolute", left: 60, right: 60, top: 400, textAlign: "center", fontWeight: 800, fontSize: 96, lineHeight: 0.98, letterSpacing: "-0.05em", color: C.text, textShadow: SOMBRA }}>
      O letreiro era<br />um <span style={{ color: A.hex }}>anúncio</span>
    </div>
    <Prancha top={720} h={640}>
      <Contorno x={150} y={40} w={780} h={560} p={1} />
      <path d="M 180 340 C 300 200, 420 140, 540 135 C 660 140, 780 190, 900 300" fill="none" stroke={C.text} strokeOpacity={0.8} strokeWidth={3} />
      {Array.from({ length: 13 }, (_, i) => <rect key={i} x={220 + i * 50} y={220 - Math.sin((i / 12) * Math.PI) * 60 - 44} width={38} height={44} fill="none" stroke={C.text} strokeWidth={3} />)}
      <Comodo x={230} y={380} w={620} h={170} p={1} titulo="LOTEAMENTO" titleSize={40} acende={1} />
    </Prancha>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1480, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76 }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
