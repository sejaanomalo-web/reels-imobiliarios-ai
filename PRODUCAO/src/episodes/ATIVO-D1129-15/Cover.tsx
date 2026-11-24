import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A, aa } from "../NOV26/kit";
import { Personagem, Raios, VIS } from "../../estilos/cartoon";

const B_FERIAS = { ...VIS.B, terno: "#4C7FB8", sombraTerno: "#3D6694", camisa: "#4C7FB8", gravata: undefined };

/** Capa — ATIVO-D1129-15 (Primeiro modelo): B com a placa "VOLTO EM JANEIRO" × A espantado; pergunta do gancho. */
export const D1129_15Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Raios t={0} clima="pergunta" vin={0.88} />
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <Personagem t={0.5} x={280} y={1560} s={0.98} v={VIS.A} humor="espanto" braco={30} olhar={1} />
      <Personagem t={1.2} x={800} y={1560} s={0.98} v={B_FERIAS} humor="feliz" flip braco={140} seed={2} />
      <g transform="translate(800 820)">
        <rect x={-170} y={0} width={340} height={150} rx={18} fill="#000" opacity={0.35} transform="translate(8 10)" />
        <rect x={-170} y={0} width={340} height={150} rx={18} fill="#F4F5F7" stroke="#0A0A0C" strokeWidth={6} />
        <text x={0} y={62} textAnchor="middle" fontFamily={F.sans} fontWeight={800} fontSize={46} fill="#111">VOLTO EM</text>
        <text x={0} y={118} textAnchor="middle" fontFamily={F.sans} fontWeight={800} fontSize={46} fill="#D2392E">JANEIRO</text>
      </g>
    </svg>
    <div style={{ position: "absolute", left: 50, right: 50, top: 320, textAlign: "center", fontWeight: 800, fontSize: 112, lineHeight: 0.96, letterSpacing: "-0.04em", textTransform: "uppercase", WebkitTextStroke: "16px #0A0A0C", paintOrder: "stroke fill", color: "#fff" }}>
      Dezembro é<br /><span style={{ color: C.warn }}>mês morto?</span>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 590, display: "flex", justifyContent: "center" }}>
      <div style={{ transform: "rotate(-5deg)", background: A.hex, color: A.ink, border: "7px solid #fff", borderRadius: 18, padding: "14px 30px", fontWeight: 800, fontSize: 54, boxShadow: `0 0 50px ${aa(0.35)}` }}>É O MÊS DA DECISÃO</div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1610, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 70, filter: `drop-shadow(0 0 16px ${aa(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
