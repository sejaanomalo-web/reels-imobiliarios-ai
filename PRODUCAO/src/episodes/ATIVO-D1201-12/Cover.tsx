import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A } from "../NOV26/kit";
import { Comodo, Contorno, FundoPlanta, Prancha, SOMBRA } from "../../estilos/planta";

/** Capa 1080×1920 — ATIVO-D1201-12: quem emite a nota do aluguel (empresa acesa; pessoa física em alerta). */
export const D1201_12Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <FundoPlanta t={0} luzY={900} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 330, textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.18em", color: C.muted }}>DESDE 01/12/2026</div>
    <div style={{ position: "absolute", left: 60, right: 60, top: 400, textAlign: "center", fontWeight: 800, fontSize: 100, lineHeight: 0.98, letterSpacing: "-0.05em", color: C.text, textShadow: SOMBRA }}>
      Aluguel com<br /><span style={{ color: A.hex }}>nota fiscal</span>?
    </div>
    <Prancha top={720} h={640}>
      <Contorno x={150} y={40} w={780} h={560} p={1} />
      <Comodo x={190} y={80} w={700} h={150} p={1} titulo="EMPRESA" sub="EMITE" acende={1} titleSize={42} />
      <Comodo x={190} y={250} w={700} h={130} p={1} titulo="SIMPLES" sub="01/2027" tone="muted" titleSize={38} />
      <Comodo x={190} y={400} w={700} h={160} p={1} titulo="PESSOA FÍSICA" sub="DEPENDE" tone="warn" titleSize={38} />
    </Prancha>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1480, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76 }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
