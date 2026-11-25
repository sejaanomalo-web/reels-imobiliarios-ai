import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A, aa } from "../NOV26/kit";
import { Balao, Personagem, Raios, VIS } from "../../estilos/cartoon";

/** Capa — ATIVO-D1205-15 (Primeiro modelo): o cliente diz "vou pensar". */
export const D1205_15Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Raios t={0} clima="pergunta" vin={0.88} />
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <Personagem t={0.5} x={330} y={1560} s={0.9} v={VIS.A} humor="neutro" />
      <Personagem t={0.5} x={760} y={1560} s={0.9} v={VIS.comprador} seed={1} humor="neutro" flip />
      <g transform="translate(780 900)"><Balao texto="VOU PENSAR…" w={400} size={52} cauda={-1} /></g>
    </svg>
    <div style={{ position: "absolute", left: 50, right: 50, top: 320, textAlign: "center", fontWeight: 800, fontSize: 112, lineHeight: 0.96, letterSpacing: "-0.04em", textTransform: "uppercase", WebkitTextStroke: "16px #0A0A0C", paintOrder: "stroke fill", color: "#fff" }}>
      "Vou pensar"<br />é sobre <span style={{ color: A.hex }}>o quê?</span>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1610, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 70, filter: `drop-shadow(0 0 16px ${aa(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
