import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A, aa } from "../NOV26/kit";
import { Personagem, Raios, VIS } from "../../estilos/cartoon";

/** Capa — ATIVO-D1208-10 (Primeiro modelo): o pai engenheiro na visita. */
export const D1208_10Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Raios t={0} clima="pergunta" vin={0.88} />
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <Personagem t={0.5} x={330} y={1560} s={0.82} v={VIS.A} humor="espanto" />
      <Personagem t={0.5} x={760} y={1560} s={0.86} v={VIS.B} seed={2} humor="bravo" flip />
      <g transform="translate(760 1085) scale(0.72)">
        <path d="M-70 0 C-70 -60 70 -60 70 0 Z" fill="#E0A43A" stroke="#0A0A0C" strokeWidth={6} />
        <rect x={-86} y={-6} width={172} height={18} rx={8} fill="#E0A43A" stroke="#0A0A0C" strokeWidth={6} />
      </g>
    </svg>
    <div style={{ position: "absolute", left: 50, right: 50, top: 320, textAlign: "center", fontWeight: 800, fontSize: 104, lineHeight: 0.96, letterSpacing: "-0.04em", textTransform: "uppercase", WebkitTextStroke: "16px #0A0A0C", paintOrder: "stroke fill", color: "#fff" }}>
      O pai<br /><span style={{ color: A.hex }}>engenheiro</span><br />na visita
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1640, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 64, filter: `drop-shadow(0 0 16px ${aa(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
