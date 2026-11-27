import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A } from "../NOV26/kit";
import { Comodo, Contorno, Cota, FundoPlanta, Prancha, SOMBRA } from "../../estilos/planta";

/** Capa 1080×1920 — ATIVO-D1211-12: o sinal entre quem pagou e quem recebeu. */
export const D1213_08Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <FundoPlanta t={0} luzY={900} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 330, textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.18em", color: C.muted }}>E SE…?</div>
    <div style={{ position: "absolute", left: 60, right: 60, top: 400, textAlign: "center", fontWeight: 800, fontSize: 96, lineHeight: 0.98, letterSpacing: "-0.05em", color: C.text, textShadow: SOMBRA }}>
      E se o vendedor<br /><span style={{ color: A.hex }}>desistir?</span>
    </div>
    <Prancha top={720} h={640}>
      <Contorno x={150} y={60} w={780} h={480} p={1} />
      <Comodo x={370} y={140} w={340} h={180} p={1} titulo="SINAL" titleSize={40} acende={0.45} />
      <Comodo x={190} y={380} w={300} h={130} p={1} titulo="QUEM PAGOU" titleSize={26} />
      <Comodo x={590} y={380} w={300} h={130} p={1} titulo="QUEM RECEBEU" titleSize={26} tone="warn" />
      <Cota x1={190} x2={890} y={110} texto="CÓDIGO CIVIL · ARTS. 417 A 420" p={1} cor={A.hex} />
    </Prancha>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1480, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76 }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
