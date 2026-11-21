import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A, aa } from "../NOV26/kit";
import { Moedas, Personagem, Raios, VIS } from "../../estilos/cartoon";

/** Capa — ATIVO_CARTOON_01 (Primeiro modelo): A espantado × B com a comissão. */
export const CARTOON_01Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Raios t={0} clima="conflito" vin={0.9} />
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <Personagem t={0.5} x={270} y={1560} s={0.98} v={VIS.A} humor="espanto" braco={30} olhar={1} />
      <Personagem t={1.2} x={810} y={1560} s={0.98} v={VIS.B} humor="feliz" flip braco={140} seed={2} />
      <g transform="translate(560 1250) scale(0.95)"><Moedas /></g>
    </svg>
    <div style={{ position: "absolute", left: 50, right: 50, top: 320, textAlign: "center", fontWeight: 800, fontSize: 112, lineHeight: 0.96, letterSpacing: "-0.04em", textTransform: "uppercase", WebkitTextStroke: "16px #0A0A0C", paintOrder: "stroke fill", color: "#fff" }}>
      Você <span style={{ color: A.hex }}>mostrou.</span><br /><span style={{ color: C.warn }}>Outro recebeu.</span>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 690, display: "flex", justifyContent: "center" }}>
      <div style={{ transform: "rotate(-5deg)", background: "#D2392E", color: "#fff", border: "7px solid #fff", borderRadius: 18, padding: "14px 30px", fontWeight: 800, fontSize: 54 }}>A COMISSÃO PODE SER SUA?</div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1610, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 70, filter: `drop-shadow(0 0 16px ${aa(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
