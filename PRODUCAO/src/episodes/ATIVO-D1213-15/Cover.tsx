import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A, aa } from "../NOV26/kit";
import { Balao, Personagem, Raios, VIS } from "../../estilos/cartoon";

/** Capa — ATIVO-D1212-15 (Primeiro modelo): o balão "depois a gente vê". */
export const D1213_15Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Raios t={0} clima="pergunta" vin={0.88} />
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <g transform="translate(620 980)"><Balao texto="DEPOIS A GENTE VÊ" w={480} size={36} cauda={-1} /></g>
      <Personagem t={0.5} x={420} y={1560} s={0.86} v={VIS.comprador} seed={1} humor="espanto" />
    </svg>
    <div style={{ position: "absolute", left: 50, right: 50, top: 320, textAlign: "center", fontWeight: 800, fontSize: 96, lineHeight: 0.96, letterSpacing: "-0.04em", textTransform: "uppercase", WebkitTextStroke: "16px #0A0A0C", paintOrder: "stroke fill", color: "#fff" }}>
      Próximo passo<br /><span style={{ color: A.hex }}>com data</span>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1640, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 64, filter: `drop-shadow(0 0 16px ${aa(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
