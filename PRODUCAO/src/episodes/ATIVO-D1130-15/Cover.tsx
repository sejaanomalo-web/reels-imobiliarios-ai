import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A, aa } from "../NOV26/kit";
import { Personagem, Raios, VIS } from "../../estilos/cartoon";

/** Capa — ATIVO-D1130-15 (Primeiro modelo): o corretor fala sem parar; o cliente com a trena quer só se imaginar ali. */
export const D1130_15Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Raios t={0} clima="pergunta" vin={0.88} />
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <Personagem t={0.5} x={290} y={1560} s={0.98} v={VIS.A} humor="feliz" fala braco={120} bracoE={-50} />
      <Personagem t={1.2} x={800} y={1560} s={0.98} v={VIS.comprador} humor="bravo" flip braco={20} seed={1} />
      <g transform="translate(560 880)">
        <rect x={-230} y={-60} width={460} height={110} rx={55} fill="#F4F5F7" stroke="#0A0A0C" strokeWidth={6} />
        <text x={0} y={18} textAnchor="middle" fontFamily={F.sans} fontWeight={800} fontSize={44} fill="#111">E AQUI A SALA…</text>
      </g>
    </svg>
    <div style={{ position: "absolute", left: 50, right: 50, top: 320, textAlign: "center", fontWeight: 800, fontSize: 108, lineHeight: 0.96, letterSpacing: "-0.04em", textTransform: "uppercase", WebkitTextStroke: "16px #0A0A0C", paintOrder: "stroke fill", color: "#fff" }}>
      A 2ª visita<br /><span style={{ color: C.warn }}>não é repeteco</span>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 600, display: "flex", justifyContent: "center" }}>
      <div style={{ transform: "rotate(-5deg)", background: A.hex, color: A.ink, border: "7px solid #fff", borderRadius: 18, padding: "14px 30px", fontWeight: 800, fontSize: 54, boxShadow: `0 0 50px ${aa(0.35)}` }}>FALE MENOS</div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1610, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 70, filter: `drop-shadow(0 0 16px ${aa(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
