import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A } from "../NOV26/kit";
import { Comodo, Contorno, FundoPlanta, Prancha, SOMBRA } from "../../estilos/planta";

/** Capa 1080×1920 — ATIVO-D1206-12: a lista de 19 itens na prancha, o último aceso. */
export const D1206_12Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <FundoPlanta t={0} luzY={900} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 330, textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.18em", color: C.muted }}>ESTUDO · NEJM 2009</div>
    <div style={{ position: "absolute", left: 60, right: 60, top: 400, textAlign: "center", fontWeight: 800, fontSize: 96, lineHeight: 0.98, letterSpacing: "-0.05em", color: C.text, textShadow: SOMBRA }}>
      Uma lista de<br /><span style={{ color: A.hex }}>19 itens</span>
    </div>
    <Prancha top={720} h={640}>
      <Contorno x={150} y={40} w={780} h={560} p={1} />
      {Array.from({ length: 19 }, (_, i) => <Comodo key={i} x={180 + (i % 4) * 185} y={70 + Math.floor(i / 4) * 102} w={165} h={86} p={1} titulo={`${i + 1}`} titleSize={28} acende={i === 18 ? 1 : 0} />)}
    </Prancha>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1480, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76 }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
