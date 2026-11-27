import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A, aa } from "../NOV26/kit";
import { Balao, Personagem, Raios, VIS, type Visual } from "../../estilos/cartoon";

const GARCONETE: Visual = { terno: "#1E1E24", sombraTerno: "#15151A", pele: "#E2A983", cabelo: "#6B3A1E", calca: "#1C2233", camisa: "#1E1E24", cabeloTipo: "coque" };

/** Capa — ATIVO-D1214-15 (Primeiro modelo): o pedido repetido com as mesmas palavras. */
export const D1214_15Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Raios t={0} clima="ganho" vin={0.85} />
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <Personagem t={0.5} x={290} y={1560} s={0.74} v={VIS.comprador} seed={1} humor="feliz" />
      <Personagem t={0.5} x={790} y={1560} s={0.74} v={GARCONETE} seed={2} flip humor="feliz" />
      <g transform="translate(300 860)"><Balao texto="UM SUCO SEM GELO" w={440} size={40} /></g>
      <g transform="translate(780 700)"><Balao texto="UM SUCO SEM GELO" w={440} size={40} cor={aa(1)} cauda={-1} /></g>
    </svg>
    <div style={{ position: "absolute", left: 50, right: 50, top: 320, textAlign: "center", fontWeight: 800, fontSize: 100, lineHeight: 0.96, letterSpacing: "-0.04em", textTransform: "uppercase", WebkitTextStroke: "16px #0A0A0C", paintOrder: "stroke fill", color: "#fff" }}>
      As palavras<br /><span style={{ color: A.hex }}>do cliente</span>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1640, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 64, filter: `drop-shadow(0 0 16px ${aa(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
