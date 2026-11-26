import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A, aa } from "../NOV26/kit";
import { Contorno, FundoPlanta, Prancha, SOMBRA } from "../../estilos/planta";

/** Capa 1080×1920 — ATIVO-D1208-18: a elevação da torre com a antena acesa. */
export const D1208_18Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <FundoPlanta t={0} luzY={900} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 330, textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.18em", color: C.muted }}>PARIS · 1889</div>
    <div style={{ position: "absolute", left: 60, right: 60, top: 400, textAlign: "center", fontWeight: 800, fontSize: 92, lineHeight: 0.98, letterSpacing: "-0.05em", color: C.text, textShadow: SOMBRA }}>
      Feita para<br /><span style={{ color: A.hex }}>durar 20 anos</span>
    </div>
    <Prancha top={720} h={640}>
      <Contorno x={150} y={40} w={780} h={580} p={1} />
      <path d="M330 590 C 420 430, 480 260, 525 120 L 555 120 C 600 260, 660 430, 750 590 M 395 480 L 685 480 M 450 340 L 630 340 M 500 210 L 580 210 M 525 120 L 540 80 L 555 120" fill="none" stroke={C.text} strokeWidth={4} strokeLinecap="round" />
      <line x1={540} y1={80} x2={540} y2={44} stroke={A.hex} strokeWidth={5} style={{ filter: `drop-shadow(0 0 10px ${aa(0.7)})` }} />
    </Prancha>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1480, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76 }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
