import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A } from "../NOV26/kit";
import { Carimbo, Comodo, Contorno, FundoPlanta, Porta, Prancha, SOMBRA } from "../../estilos/planta";

/** Capa 1080×1920 — ATIVO-PLANTA-01 (Terceiro modelo, Planta técnica v2): prancha marinho, um cômodo aceso, carimbo + logo. */
export const PLANTA_01Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <FundoPlanta t={0} luzY={900} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 330, textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.18em", color: C.muted }}>FOLHA 01 · EDIÇÃO GTA VI</div>
    <div style={{ position: "absolute", left: 60, right: 60, top: 400, textAlign: "center", fontWeight: 800, fontSize: 104, lineHeight: 0.98, letterSpacing: "-0.05em", color: C.text, textShadow: SOMBRA }}>
      O magnata<br /><span style={{ color: A.hex }}>imobiliário</span><br />escondido
    </div>
    <Prancha top={800} h={560}>
      <Contorno x={150} y={40} w={780} h={400} p={1} />
      <Comodo x={150} y={40} w={390} h={200} p={1} titulo="IMÓVEIS" titleSize={40} acende={1} />
      <Comodo x={540} y={40} w={390} h={200} p={1} titulo="CLUBE" titleSize={38} />
      <Comodo x={150} y={240} w={390} h={200} p={1} titulo="ESTÚDIO" titleSize={38} />
      <Comodo x={540} y={240} w={390} h={200} p={1} titulo="GRAVADORA" titleSize={36} />
      <Porta x={540} y={360} r={56} p={1} />
    </Prancha>
    <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}><Carimbo x={150} y={1290} w={460} projeto="IMPÉRIO" folha="PERSONAGEM FICTÍCIO" p={1} /></svg>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1480, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76 }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
