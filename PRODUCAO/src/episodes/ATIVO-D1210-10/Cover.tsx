import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A, aa } from "../NOV26/kit";
import { Personagem, Raios, VIS } from "../../estilos/cartoon";

/** Capa — ATIVO-D1210-10 (Primeiro modelo): o corretor diante da lista de 15 imóveis. */
export const D1210_10Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Raios t={0} clima="pergunta" vin={0.88} />
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <Personagem t={0.5} x={330} y={1560} s={0.82} v={VIS.A} humor="espanto" />
      <g>
        <rect x={600} y={760} width={360} height={470} rx={14} fill="#F4F5F7" stroke="#0A0A0C" strokeWidth={6} />
        {Array.from({ length: 15 }, (_, k) => <rect key={k} x={626} y={784 + k * 29} width={k % 3 === 0 ? 260 : 300} height={12} rx={6} fill="#9AA3B5" />)}
      </g>
    </svg>
    <div style={{ position: "absolute", left: 50, right: 50, top: 320, textAlign: "center", fontWeight: 800, fontSize: 100, lineHeight: 0.96, letterSpacing: "-0.04em", textTransform: "uppercase", WebkitTextStroke: "16px #0A0A0C", paintOrder: "stroke fill", color: "#fff" }}>
      <span style={{ color: A.hex }}>15 imóveis</span><br />no sábado?
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1640, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 64, filter: `drop-shadow(0 0 16px ${aa(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
