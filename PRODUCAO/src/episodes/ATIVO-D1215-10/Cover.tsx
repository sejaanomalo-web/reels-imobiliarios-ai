import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A, aa } from "../NOV26/kit";
import { Personagem, Raios, VIS, type Visual } from "../../estilos/cartoon";

const CRIANCA: Visual = { terno: "#B84A3A", sombraTerno: "#963B2E", pele: "#E2A983", cabelo: "#3A2418", calca: "#2E3442", camisa: "#B84A3A", cabeloTipo: "curto" };

/** Capa — ATIVO-D1215-10 (Primeiro modelo): a criança correndo na visita. */
export const D1215_10Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Raios t={0} clima="pergunta" vin={0.9} />
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <Personagem t={0.5} x={260} y={1560} s={0.74} v={VIS.B} seed={3} humor="espanto" />
      <Personagem t={0.5} x={490} y={1560} s={0.74} v={VIS.comprador} seed={1} humor="espanto" />
      <Personagem t={0.5} x={820} y={1560} s={0.5} v={CRIANCA} seed={5} humor="feliz" flip braco={140} bracoE={-120} />
    </svg>
    <div style={{ position: "absolute", left: 50, right: 50, top: 320, textAlign: "center", fontWeight: 800, fontSize: 100, lineHeight: 0.96, letterSpacing: "-0.04em", textTransform: "uppercase", WebkitTextStroke: "16px #0A0A0C", paintOrder: "stroke fill", color: "#fff" }}>
      A criança<br /><span style={{ color: A.hex }}>na visita</span>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1640, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 64, filter: `drop-shadow(0 0 16px ${aa(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
