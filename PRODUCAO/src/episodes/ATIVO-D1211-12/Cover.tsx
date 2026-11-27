import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A } from "../NOV26/kit";
import { Comodo, Contorno, Cota, FundoPlanta, Prancha, SOMBRA } from "../../estilos/planta";

/** Capa 1080×1920 — ATIVO-D1211-12: o mesmo dado dito de dois jeitos. */
export const D1211_12Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <FundoPlanta t={0} luzY={900} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 330, textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.18em", color: C.muted }}>ENQUADRAMENTO</div>
    <div style={{ position: "absolute", left: 60, right: 60, top: 400, textAlign: "center", fontWeight: 800, fontSize: 96, lineHeight: 0.98, letterSpacing: "-0.05em", color: C.text, textShadow: SOMBRA }}>
      Noventa<br /><span style={{ color: A.hex }}>ou dez?</span>
    </div>
    <Prancha top={720} h={640}>
      <Contorno x={150} y={60} w={780} h={480} p={1} />
      <Comodo x={190} y={180} w={330} h={240} p={1} titulo="90%" sub="DÁ CERTO" titleSize={56} acende={0.5} />
      <Comodo x={560} y={180} w={330} h={240} p={1} titulo="10%" sub="DÁ ERRADO" titleSize={56} tone="warn" />
      <Cota x1={190} x2={890} y={120} texto="O MESMO DADO" p={1} cor={A.hex} />
    </Prancha>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1480, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76 }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
