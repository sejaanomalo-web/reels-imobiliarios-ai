import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A } from "../NOV26/kit";
import { Comodo, Contorno, FundoPlanta, Prancha, SOMBRA } from "../../estilos/planta";

/** Capa 1080×1920 — ATIVO-D1207-12: o cartão de 10 com 2 carimbos acesos. */
export const D1207_12Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <FundoPlanta t={0} luzY={900} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 330, textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.18em", color: C.muted }}>ESTUDO · 2006</div>
    <div style={{ position: "absolute", left: 60, right: 60, top: 400, textAlign: "center", fontWeight: 800, fontSize: 96, lineHeight: 0.98, letterSpacing: "-0.05em", color: C.text, textShadow: SOMBRA }}>
      Dois carimbos<br /><span style={{ color: A.hex }}>de graça</span>
    </div>
    <Prancha top={720} h={640}>
      <Contorno x={150} y={60} w={780} h={420} p={1} />
      {Array.from({ length: 10 }, (_, i) => <Comodo key={i} x={180 + (i % 5) * 146} y={110 + Math.floor(i / 5) * 170} w={130} h={150} p={1} titulo={`${i + 1}`} titleSize={30} acende={i < 2 ? 1 : 0} />)}
    </Prancha>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1480, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76 }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
