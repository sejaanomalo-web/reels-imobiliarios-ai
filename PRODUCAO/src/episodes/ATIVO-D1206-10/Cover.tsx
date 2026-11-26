import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A, aa } from "../NOV26/kit";
import { Casa, Personagem, Raios, VIS } from "../../estilos/cartoon";

/** Capa — ATIVO-D1206-10 (Primeiro modelo): dez casinhas e o corretor espantado. */
export const D1206_10Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Raios t={0} clima="pergunta" vin={0.88} />
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      {Array.from({ length: 10 }, (_, i) => <g key={i} transform={`translate(${170 + (i % 5) * 185} ${860 + Math.floor(i / 5) * 190}) scale(0.4)`}><Casa w={300} /></g>)}
      <Personagem t={0.5} x={330} y={1560} s={0.82} v={VIS.A} humor="espanto" />
      <Personagem t={0.5} x={760} y={1560} s={0.82} v={VIS.comprador} seed={1} humor="feliz" flip />
    </svg>
    <div style={{ position: "absolute", left: 50, right: 50, top: 320, textAlign: "center", fontWeight: 800, fontSize: 108, lineHeight: 0.96, letterSpacing: "-0.04em", textTransform: "uppercase", WebkitTextStroke: "16px #0A0A0C", paintOrder: "stroke fill", color: "#fff" }}>
      Dez imóveis<br />no <span style={{ color: A.hex }}>sábado?</span>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1610, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 70, filter: `drop-shadow(0 0 16px ${aa(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
