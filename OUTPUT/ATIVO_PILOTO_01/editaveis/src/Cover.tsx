import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A, aa } from "../NOV26/kit";
import { Personagem, Raios, VIS } from "../../estilos/cartoon";

/** Capa 1080×1920 — ATIVO_PILOTO_01 (formato cartoon explicativo): os dois corretores frente a frente + pergunta. */
export const PILOTO_01Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Raios t={0} clima="pergunta" vin={0.85} />
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <Personagem t={0.5} x={280} y={1560} s={0.98} v={VIS.A} humor="espanto" braco={30} olhar={1} />
      <Personagem t={1.2} x={800} y={1560} s={0.98} v={VIS.B} humor="espanto" flip braco={30} olhar={1} seed={2} />
    </svg>
    <div style={{ position: "absolute", left: 60, right: 60, top: 330, textAlign: "center", fontWeight: 800, fontSize: 118, lineHeight: 0.95, letterSpacing: "-0.04em", textTransform: "uppercase", WebkitTextStroke: "16px #0A0A0C", paintOrder: "stroke fill", color: "#fff" }}>
      <span style={{ color: C.warn }}>Concorrente</span><br />ou <span style={{ color: A.hex }}>parceiro?</span>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 690, display: "flex", justifyContent: "center" }}>
      <div style={{ transform: "rotate(-5deg)", background: "#D2392E", color: "#fff", border: "7px solid #fff", borderRadius: 18, padding: "14px 30px", fontWeight: 800, fontSize: 52 }}>COOPERAÇÃO COM CRITÉRIO</div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1610, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 70, filter: `drop-shadow(0 0 16px ${aa(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
