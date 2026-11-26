import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A } from "../NOV26/kit";
import { Comodo, Contorno, FundoPlanta, Prancha, SOMBRA } from "../../estilos/planta";

/** Capa 1080×1920 — ATIVO-D1208-12: as faixas 7% / 38% / 55% com o 7% em alerta. */
export const D1208_12Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <FundoPlanta t={0} luzY={900} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 330, textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.18em", color: C.muted }}>UM MITO DE VENDAS</div>
    <div style={{ position: "absolute", left: 60, right: 60, top: 400, textAlign: "center", fontWeight: 800, fontSize: 96, lineHeight: 0.98, letterSpacing: "-0.05em", color: C.text, textShadow: SOMBRA }}>
      Palavras valem<br /><span style={{ color: A.hex }}>só 7%?</span>
    </div>
    <Prancha top={720} h={640}>
      <Contorno x={150} y={60} w={780} h={480} p={1} />
      <Comodo x={190} y={110} w={150} h={110} p={1} titulo="7%" titleSize={34} tone="warn" />
      <Comodo x={190} y={250} w={330} h={110} p={1} titulo="38%" titleSize={34} tone="muted" />
      <Comodo x={190} y={390} w={500} h={110} p={1} titulo="55%" titleSize={34} tone="muted" />
    </Prancha>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1480, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76 }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
