import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A, aa } from "../NOV26/kit";
import { Personagem, Raios, VIS } from "../../estilos/cartoon";
import { Celular } from "../ATIVO-D1204-10/scenes/Scenes";

/** Capa — ATIVO-D1211-10 (Primeiro modelo): o corretor e o celular às 23h. */
export const D1211_10Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Raios t={0} clima="pergunta" vin={0.9} />
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <Personagem t={0.5} x={320} y={1560} s={0.82} v={VIS.A} humor="espanto" />
      <Celular t={5} x={730} y={1000} s={0.85} msgs={[{ texto: ["TEM NOVIDADE", "DAQUELE AP?"], lado: "ele", at: 0 }, { texto: ["E A VAGA?"], lado: "ele", at: 0 }]} />
    </svg>
    <div style={{ position: "absolute", left: 50, right: 50, top: 320, textAlign: "center", fontWeight: 800, fontSize: 100, lineHeight: 0.96, letterSpacing: "-0.04em", textTransform: "uppercase", WebkitTextStroke: "16px #0A0A0C", paintOrder: "stroke fill", color: "#fff" }}>
      A mensagem<br />das <span style={{ color: A.hex }}>23h</span>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1640, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 64, filter: `drop-shadow(0 0 16px ${aa(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
