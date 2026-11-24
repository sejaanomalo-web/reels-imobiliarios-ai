import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A } from "../NOV26/kit";
import { Comodo, Contorno, FundoPlanta, Prancha, SOMBRA } from "../../estilos/planta";

/** Capa 1080×1920 — ATIVO-D1130-18: o anúncio com a linha de energia acesa sob o preço. */
export const D1130_18Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <FundoPlanta t={0} luzY={900} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 330, textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.18em", color: C.muted }}>E SE…? · NA FRANÇA JÁ É REGRA</div>
    <div style={{ position: "absolute", left: 60, right: 60, top: 400, textAlign: "center", fontWeight: 800, fontSize: 100, lineHeight: 0.98, letterSpacing: "-0.05em", color: C.text, textShadow: SOMBRA }}>
      O anúncio com a<br /><span style={{ color: A.hex }}>conta de luz</span>
    </div>
    <Prancha top={720} h={640}>
      <Contorno x={150} y={40} w={780} h={560} p={1} />
      <Comodo x={190} y={80} w={700} h={230} p={1} titulo="" />
      <text x={210} y={370} fill={C.text} fontFamily="JetBrains Mono" fontWeight={700} fontSize={34} letterSpacing="0.12em">PREÇO</text>
      <line x1={400} y1={360} x2={870} y2={360} stroke={C.dim} strokeWidth={3} />
      <Comodo x={190} y={410} w={700} h={150} p={1} titulo="ENERGIA / ANO" sub="NO ANÚNCIO" acende={1} titleSize={40} />
    </Prancha>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1480, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76 }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
