import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A } from "../NOV26/kit";
import { Chamada, Comodo, Contorno, FundoPlanta, Prancha, SOMBRA } from "../../estilos/planta";

/** Capa 1080×1920 — ATIVO-D1203-10: o imóvel com a linha do motivo × os links sem motivo. */
export const D1203_10Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <FundoPlanta t={0} luzY={900} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 330, textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.18em", color: C.muted }}>A LISTA DE IMÓVEIS</div>
    <div style={{ position: "absolute", left: 60, right: 60, top: 400, textAlign: "center", fontWeight: 800, fontSize: 96, lineHeight: 0.98, letterSpacing: "-0.05em", color: C.text, textShadow: SOMBRA }}>
      Cada imóvel<br />com um <span style={{ color: A.hex }}>motivo</span>
    </div>
    <Prancha top={720} h={640}>
      <Contorno x={150} y={40} w={780} h={560} p={1} />
      <Comodo x={190} y={80} w={320} h={260} p={1} titulo="IMÓVEL 1" titleSize={38} acende={1} />
      {[0, 1, 2, 3].map((i) => <Comodo key={i} x={540 + (i % 2) * 180} y={80 + Math.floor(i / 2) * 140} w={160} h={120} p={1} titulo="LINK" sub="?" titleSize={26} tone="muted" />)}
      <Chamada x={350} y={340} bx={190} by={420} bw={700} texto="SEPAREI ESTE PORQUE…" p={1} tone="linha" />
    </Prancha>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1480, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76 }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
