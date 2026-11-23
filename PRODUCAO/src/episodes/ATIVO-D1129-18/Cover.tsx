import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A } from "../NOV26/kit";
import { Carimbo, Contorno, FundoPlanta, LINHA, Prancha, Rota, SOMBRA, TRACO } from "../../estilos/planta";
import { CasaElev } from "./scenes/Scenes";

/** Capa 1080×1920 — ATIVO-D1129-18: a casa do catálogo, acesa, no fim da rota do trem; carimbo e logo. */
export const D1129_18Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <FundoPlanta t={0} luzY={900} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 330, textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.18em", color: C.muted }}>EUA · 1908–1940</div>
    <div style={{ position: "absolute", left: 60, right: 60, top: 400, textAlign: "center", fontWeight: 800, fontSize: 104, lineHeight: 0.98, letterSpacing: "-0.05em", color: C.text, textShadow: SOMBRA }}>
      A casa que<br />chegou de <span style={{ color: A.hex }}>trem</span>
    </div>
    <Prancha top={760} h={560}>
      <Contorno x={150} y={40} w={780} h={420} p={1} />
      <Rota id="capa" d="M 200 400 L 420 400" p={1} tom="accent" />
      <rect x={210} y={366} width={88} height={40} fill="rgba(7,8,10,0.85)" stroke={LINHA} strokeWidth={TRACO} />
      <circle cx={230} cy={414} r={8} fill="none" stroke={LINHA} strokeWidth={TRACO} /><circle cx={278} cy={414} r={8} fill="none" stroke={LINHA} strokeWidth={TRACO} />
      <CasaElev cx={640} base={410} w={300} h={170} p={1} luz={1} cor={A.hex} />
      <line x1={440} y1={410} x2={860} y2={410} stroke={LINHA} strokeWidth={TRACO} />
    </Prancha>
    <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}><Carimbo x={150} y={1270} w={460} projeto="CASA POR CATÁLOGO" folha="+70 MIL VENDIDAS" p={1} /></svg>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1480, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76 }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
