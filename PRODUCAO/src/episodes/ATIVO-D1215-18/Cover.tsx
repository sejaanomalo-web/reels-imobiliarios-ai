import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A } from "../NOV26/kit";
import { Contorno, Cota, FundoPlanta, Prancha, Rota, SOMBRA } from "../../estilos/planta";

/** Capa 1080×1920 — ATIVO-D1215-18: os dois eixos de Brasília. */
export const D1215_18Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <FundoPlanta t={0} luzY={900} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 330, textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.18em", color: C.muted }}>HISTÓRIA</div>
    <div style={{ position: "absolute", left: 60, right: 60, top: 400, textAlign: "center", fontWeight: 800, fontSize: 96, lineHeight: 0.98, letterSpacing: "-0.05em", color: C.text, textShadow: SOMBRA }}>
      A ideia em<br /><span style={{ color: A.hex }}>uma frase</span>
    </div>
    <Prancha top={720} h={640}>
      <Contorno x={150} y={60} w={780} h={480} p={1} />
      <Rota id="c-mon" d="M540 80 L540 520" p={1} />
      <Rota id="c-rod" d="M170 360 Q540 180 910 360" p={1} />
      <Cota x1={190} x2={890} y={500} texto="DOIS EIXOS QUE SE CRUZAM" p={1} cor={A.hex} />
    </Prancha>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1480, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76 }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
