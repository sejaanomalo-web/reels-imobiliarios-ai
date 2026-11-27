import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A } from "../NOV26/kit";
import { Comodo, Contorno, Cota, FundoPlanta, Prancha, SOMBRA } from "../../estilos/planta";

/** Capa 1080×1920 — ATIVO-D1214-08: a área anunciada × a área real. */
export const D1214_08Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <FundoPlanta t={0} luzY={900} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 330, textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.18em", color: C.muted }}>E SE…?</div>
    <div style={{ position: "absolute", left: 60, right: 60, top: 400, textAlign: "center", fontWeight: 800, fontSize: 96, lineHeight: 0.98, letterSpacing: "-0.05em", color: C.text, textShadow: SOMBRA }}>
      E se a metragem<br /><span style={{ color: A.hex }}>estiver errada?</span>
    </div>
    <Prancha top={720} h={640}>
      <Contorno x={150} y={60} w={780} h={480} p={1} />
      <Comodo x={190} y={120} w={330} h={220} p={1} titulo="SALA" titleSize={34} acende={0.45} />
      <Comodo x={520} y={120} w={260} h={220} p={1} titulo="QUARTO" titleSize={28} />
      <Comodo x={780} y={120} w={110} h={220} p={1} titulo="" tone="warn" />
      <Cota x1={190} x2={890} y={400} texto="ÁREA ANUNCIADA" p={1} cor={C.muted} />
      <Cota x1={190} x2={780} y={470} texto="ÁREA REAL" p={1} cor={C.warn} />
    </Prancha>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1480, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76 }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
