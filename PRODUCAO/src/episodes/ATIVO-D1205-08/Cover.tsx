import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A, aa } from "../NOV26/kit";
import { Personagem, Raios, VIS } from "../../estilos/cartoon";

/** Capa — ATIVO-D1205-08 (Primeiro modelo): o corretor com o celular no "5 minutos". */
export const D1205_08Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Raios t={0} clima="conflito" vin={0.88} />
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <g transform="translate(400 980)">
        <rect x={-170} y={-290} width={340} height={580} rx={40} fill="#1C2233" />
        <rect x={-150} y={-250} width={300} height={500} rx={18} fill="#F4F5F7" />
        <rect x={-150} y={-250} width={300} height={56} rx={18} fill="#2C3E66" />
        <rect x={-130} y={-165} width={270} height={92} rx={14} fill="#FFFFFF" stroke="#0A0A0C" strokeWidth={3} />
        <text x={-116} y={-128} fontFamily={F.sans} fontWeight={800} fontSize={30} fill="#111">OI! AINDA ESTÁ</text>
        <text x={-116} y={-90} fontFamily={F.sans} fontWeight={800} fontSize={30} fill="#111">DISPONÍVEL?</text>
        <text x={130} y={-50} textAnchor="end" fontFamily={F.sans} fontWeight={700} fontSize={28} fill="#6B7280" dy={24}>42 H SEM RESPOSTA</text>
      </g>
      <Personagem t={0.5} x={800} y={1560} s={0.9} v={VIS.A} humor="triste" flip />
    </svg>
    <div style={{ position: "absolute", left: 50, right: 50, top: 320, textAlign: "center", fontWeight: 800, fontSize: 104, lineHeight: 0.96, letterSpacing: "-0.04em", textTransform: "uppercase", WebkitTextStroke: "16px #0A0A0C", paintOrder: "stroke fill", color: "#fff" }}>
      E se fossem<br /><span style={{ color: A.hex }}>5 minutos</span>?
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1610, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 70, filter: `drop-shadow(0 0 16px ${aa(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
