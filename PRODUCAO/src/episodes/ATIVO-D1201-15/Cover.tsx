import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A, aa } from "../NOV26/kit";
import { Personagem, Raios, VIS } from "../../estilos/cartoon";

const DONO = { ...VIS.lider, terno: "#7A4E3A", sombraTerno: "#5F3C2D", camisa: "#7A4E3A", gravata: undefined, calca: "#2A2D33" };

/** Capa — ATIVO-D1201-15 (Primeiro modelo): o dono falando demais na visita, o corretor espantado. */
export const D1201_15Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Raios t={0} clima="pergunta" vin={0.88} />
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <Personagem t={0.5} x={260} y={1560} s={0.94} v={VIS.A} humor="espanto" braco={165} />
      <Personagem t={1.0} x={560} y={1560} s={0.98} v={DONO} humor="feliz" fala braco={150} seed={4} />
      <Personagem t={1.4} x={860} y={1560} s={0.9} v={VIS.comprador} humor="feliz" flip seed={1} />
      <g transform="translate(560 880)">
        <rect x={-250} y={-60} width={500} height={110} rx={55} fill="#F4F5F7" stroke="#0A0A0C" strokeWidth={6} />
        <text x={0} y={18} textAnchor="middle" fontFamily={F.sans} fontWeight={800} fontSize={42} fill="#111">ACEITO NEGOCIAR!</text>
      </g>
    </svg>
    <div style={{ position: "absolute", left: 50, right: 50, top: 320, textAlign: "center", fontWeight: 800, fontSize: 108, lineHeight: 0.96, letterSpacing: "-0.04em", textTransform: "uppercase", WebkitTextStroke: "16px #0A0A0C", paintOrder: "stroke fill", color: "#fff" }}>
      O dono na<br /><span style={{ color: C.warn }}>visita</span>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 600, display: "flex", justifyContent: "center" }}>
      <div style={{ transform: "rotate(-5deg)", background: A.hex, color: A.ink, border: "7px solid #fff", borderRadius: 18, padding: "14px 30px", fontWeight: 800, fontSize: 54, boxShadow: `0 0 50px ${aa(0.35)}` }}>COMBINE O PAPEL</div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1610, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 70, filter: `drop-shadow(0 0 16px ${aa(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
