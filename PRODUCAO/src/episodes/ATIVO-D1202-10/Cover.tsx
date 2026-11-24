import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A, aa } from "../NOV26/kit";
import { Personagem, Raios, VIS } from "../../estilos/cartoon";

/** Capa — ATIVO-D1202-10 (Primeiro modelo): a moeda da comissão partida ao meio entre vendedor e comprador. */
const Meia: React.FC<{ lado: -1 | 1 }> = ({ lado }) => (
  <g>
    <defs><clipPath id={`cv${lado}`}><rect x={lado < 0 ? -170 : 0} y={-170} width={170} height={340} /></clipPath></defs>
    <g clipPath={`url(#cv${lado})`}>
      <circle r={150} cy={12} fill="#A8761E" /><circle r={150} fill="#E0A43A" /><circle r={117} fill="none" stroke="#F0B94E" strokeWidth={9} />
      <text x={0} y={33} textAnchor="middle" fontFamily="Manrope" fontWeight={800} fontSize={93} fill="#A8761E">R$</text>
    </g>
  </g>
);
export const D1202_10Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Raios t={0} clima="pergunta" vin={0.88} />
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <g transform="translate(540 900)"><g transform="translate(-70 0) rotate(-12)"><Meia lado={-1} /></g><g transform="translate(70 0) rotate(12)"><Meia lado={1} /></g></g>
      <Personagem t={0.5} x={240} y={1560} s={0.9} v={VIS.B} humor="neutro" braco={70} seed={3} />
      <Personagem t={1.2} x={840} y={1560} s={0.9} v={VIS.comprador} humor="espanto" flip braco={120} seed={1} />
    </svg>
    <div style={{ position: "absolute", left: 50, right: 50, top: 320, textAlign: "center", fontWeight: 800, fontSize: 100, lineHeight: 0.96, letterSpacing: "-0.04em", textTransform: "uppercase", WebkitTextStroke: "16px #0A0A0C", paintOrder: "stroke fill", color: "#fff" }}>
      E se o comprador<br />pagasse <span style={{ color: A.hex }}>metade</span>?
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1610, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 70, filter: `drop-shadow(0 0 16px ${aa(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
