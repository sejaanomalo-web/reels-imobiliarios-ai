import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A, aa } from "../NOV26/kit";
import { Personagem, Raios, VIS } from "../../estilos/cartoon";

/** Capa — ATIVO-D1203-15 (Primeiro modelo): um feliz apontando, o outro de braços cruzados na porta. */
export const D1203_15Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Raios t={0} clima="conflito" vin={0.88} />
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <rect x={630} y={820} width={340} height={740} fill="#1B1F28" />
      <rect x={610} y={800} width={380} height={760} fill="none" stroke="#8A6A4A" strokeWidth={26} />
      <Personagem t={0.5} x={290} y={1560} s={0.9} v={VIS.comprador} seed={1} humor="feliz" braco={110} />
      <Personagem t={0.5} x={800} y={1560} s={0.9} v={VIS.B} seed={2} humor="bravo" braco={-42} bracoE={-42} flip />
      <g transform="translate(800 1560) scale(0.9)">
        <rect x={-92} y={-246} width={184} height={40} rx={20} fill={VIS.B.sombraTerno} transform="rotate(-8 0 -226)" />
        <rect x={-92} y={-236} width={184} height={40} rx={20} fill={VIS.B.terno} transform="rotate(8 0 -216)" />
        <circle cx={-86} cy={-222} r={20} fill={VIS.B.pele} /><circle cx={86} cy={-222} r={20} fill={VIS.B.pele} />
      </g>
    </svg>
    <div style={{ position: "absolute", left: 50, right: 50, top: 320, textAlign: "center", fontWeight: 800, fontSize: 112, lineHeight: 0.96, letterSpacing: "-0.04em", textTransform: "uppercase", WebkitTextStroke: "16px #0A0A0C", paintOrder: "stroke fill", color: "#fff" }}>
      Ela amou,<br />ele <span style={{ color: A.hex }}>odiou</span>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1610, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 70, filter: `drop-shadow(0 0 16px ${aa(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
