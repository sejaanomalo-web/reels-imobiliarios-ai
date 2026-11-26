import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A, aa } from "../NOV26/kit";
import { Personagem, Raios, VIS } from "../../estilos/cartoon";

/** Capa — ATIVO-D1209-10 (Primeiro modelo): o corretor diante do áudio de 5:00. */
export const D1209_10Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Raios t={0} clima="pergunta" vin={0.88} />
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <Personagem t={0.5} x={330} y={1560} s={0.82} v={VIS.A} humor="espanto" />
      <g transform="translate(760 1180) scale(0.62)">
        <rect x={-200} y={-290} width={400} height={580} rx={40} fill="#1C2233" />
        <rect x={-180} y={-250} width={360} height={500} rx={18} fill="#F4F5F7" />
        <rect x={-160} y={-60} width={320} height={120} rx={26} fill="#FFFFFF" stroke="#0A0A0C" strokeWidth={5} />
        {Array.from({ length: 30 }, (_, i) => { const h = 0.3 + 0.7 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.6)); return <rect key={i} x={-110 + i * 8} y={-h * 34} width={5} height={h * 68} rx={2} fill={i > 22 && i < 27 ? A.hex : "#2C3E66"} />; })}
      </g>
    </svg>
    <div style={{ position: "absolute", left: 50, right: 50, top: 320, textAlign: "center", fontWeight: 800, fontSize: 100, lineHeight: 0.96, letterSpacing: "-0.04em", textTransform: "uppercase", WebkitTextStroke: "16px #0A0A0C", paintOrder: "stroke fill", color: "#fff" }}>
      O áudio de<br /><span style={{ color: A.hex }}>5 minutos</span>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1640, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 64, filter: `drop-shadow(0 0 16px ${aa(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
