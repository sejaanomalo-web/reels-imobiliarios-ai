import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A, aa } from "../NOV26/kit";
import { Personagem, Raios, VIS } from "../../estilos/cartoon";

const DONO = { ...VIS.lider, terno: "#7A4E3A", sombraTerno: "#5F3C2D", camisa: "#7A4E3A", gravata: undefined, calca: "#2A2D33" };
const RIVAL = { ...VIS.B, terno: "#4A4F5C", sombraTerno: "#3A3E49", gravata: "#C9CED6" };

/** Capa — ATIVO-D1202-15 (Primeiro modelo): o dono ao telefone, +R$ 50 MIL, corretor e rival. */
export const D1202_15Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Raios t={0} clima="conflito" vin={0.88} />
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <Personagem t={0.5} x={240} y={1560} s={0.9} v={VIS.A} humor="espanto" braco={150} />
      <Personagem t={1.0} x={540} y={1560} s={0.94} v={DONO} humor="feliz" fala braco={140} seed={4} />
      <Personagem t={1.4} x={850} y={1560} s={0.88} v={RIVAL} humor="feliz" flip braco={150} seed={7} />
      <g transform="translate(540 970)">
        <rect x={-230} y={-64} width={460} height={118} rx={56} fill="#F4F5F7" stroke="#0A0A0C" strokeWidth={6} />
        <text x={0} y={22} textAnchor="middle" fontFamily={F.sans} fontWeight={800} fontSize={58} fill="#111">+ R$ 50 MIL</text>
      </g>
    </svg>
    <div style={{ position: "absolute", left: 50, right: 50, top: 320, textAlign: "center", fontWeight: 800, fontSize: 104, lineHeight: 0.96, letterSpacing: "-0.04em", textTransform: "uppercase", WebkitTextStroke: "16px #0A0A0C", paintOrder: "stroke fill", color: "#fff" }}>
      O outro corretor<br />avaliou <span style={{ color: C.warn }}>mais alto</span>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 800, display: "flex", justifyContent: "center" }}>
      <div style={{ transform: "rotate(-5deg)", background: A.hex, color: A.ink, border: "7px solid #fff", borderRadius: 18, padding: "14px 30px", fontWeight: 800, fontSize: 50, boxShadow: `0 0 50px ${aa(0.35)}` }}>MOSTRE OS VENDIDOS</div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1610, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 70, filter: `drop-shadow(0 0 16px ${aa(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
