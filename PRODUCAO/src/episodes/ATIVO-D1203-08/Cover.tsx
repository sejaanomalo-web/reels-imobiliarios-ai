import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A, aa } from "../NOV26/kit";
import { Casa, Personagem, Raios, VIS } from "../../estilos/cartoon";

const Cartao: React.FC = () => (
  <g>
    <rect x={-95} y={-130} width={190} height={175} rx={16} fill="#F4F5F7" stroke="#0A0A0C" strokeWidth={6} />
    <g transform="translate(0 12) scale(0.45)"><Casa w={260} /></g>
  </g>
);
/** Capa — ATIVO-D1203-08 (Primeiro modelo): três cartões de imóvel na mão do corretor. */
export const D1203_08Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Raios t={0} clima="pergunta" vin={0.88} />
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      {[-1, 0, 1].map((k) => <g key={k} transform={`translate(${540 + k * 230} ${930 + Math.abs(k) * 30}) rotate(${k * 8})`}><Cartao /></g>)}
      <Personagem t={0.5} x={540} y={1560} s={0.95} v={VIS.A} humor="feliz" braco={150} />
    </svg>
    <div style={{ position: "absolute", left: 50, right: 50, top: 320, textAlign: "center", fontWeight: 800, fontSize: 100, lineHeight: 0.96, letterSpacing: "-0.04em", textTransform: "uppercase", WebkitTextStroke: "16px #0A0A0C", paintOrder: "stroke fill", color: "#fff" }}>
      E se você mostrasse<br />só <span style={{ color: A.hex }}>3 imóveis</span>?
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1610, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 70, filter: `drop-shadow(0 0 16px ${aa(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
