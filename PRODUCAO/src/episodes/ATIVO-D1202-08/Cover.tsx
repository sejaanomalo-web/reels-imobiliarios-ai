import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A } from "../NOV26/kit";
import { Comodo, Contorno, Cota, FundoPlanta, Prancha, SOMBRA } from "../../estilos/planta";

/** Capa 1080×1920 — ATIVO-D1202-08: o 13º caiu; a conta que falta (ITBI 3% + cartório). */
export const D1202_08Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <FundoPlanta t={0} luzY={900} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 330, textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.18em", color: C.muted }}>1ª PARCELA ATÉ 30/11</div>
    <div style={{ position: "absolute", left: 60, right: 60, top: 400, textAlign: "center", fontWeight: 800, fontSize: 100, lineHeight: 0.98, letterSpacing: "-0.05em", color: C.text, textShadow: SOMBRA }}>
      O 13º caiu.<br />E o <span style={{ color: A.hex }}>ITBI</span>?
    </div>
    <Prancha top={720} h={640}>
      <Contorno x={150} y={40} w={780} h={560} p={1} />
      <Comodo x={190} y={80} w={700} h={150} p={1} titulo="PREÇO" sub="O QUE APARECE NO ANÚNCIO" titleSize={40} tone="muted" />
      <Cota x1={190} x2={890} y={270} texto="R$ 400 MIL" p={1} cor={C.text} />
      <Comodo x={190} y={300} w={400} h={260} p={1} titulo="ITBI" sub="= R$ 12 MIL" acende={1} titleSize={52} />
      <Comodo x={610} y={300} w={280} h={260} p={1} titulo="CARTÓRIO" titleSize={34} />
    </Prancha>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1480, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76 }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
