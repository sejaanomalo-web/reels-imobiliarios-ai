import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A } from "../NOV26/kit";
import { Bloco, Casa, ConeLuz, Mundo, Predio } from "../../estilos/maquete";

const SOMBRA = "0 2px 14px rgba(0,0,0,0.85)";

/** Capa 1080×1920 — ATIVO-D1214-18: o hotel levantado sobre os macacos. */
export const D1214_18Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Mundo cam={{ pos: [2.2, 5.6, 14.0], alvo: [0, 2.2, 0], fov: 42 }} atm="dilema" holofote={{ pos: [0, 8, 4], alvo: [0, 0.8, 0], intensidade: 0.6 }}>
      <Bloco pos={[0, 0, 0]} tam={[12, 0.02, 8]} mat="grafite" />
      {[[-0.9, -0.5], [0.9, -0.5], [-0.9, 0.5], [0.9, 0.5], [0, -0.5], [0, 0.5]].map(([x, z], i) => <Bloco key={i} pos={[x, 0, -0.6 + z]} tam={[0.16, 0.8, 0.16]} mat="grafite" />)}
      <Predio pos={[0, 0.8, -0.6]} andares={6} escala={0.9} acende={0.3} />
      <Casa pos={[-3.0, 0, -0.4]} escala={0.85} />
      <Casa pos={[3.0, 0, -0.4]} escala={0.85} />
      <Bloco pos={[0, 0, 2.2]} tam={[8.6, 0.05, 1.4]} />
      <ConeLuz pos={[0, 0, 0.4]} alt={6} raio={3.0} p={0.6} verde={0.3} />
    </Mundo>
    <div style={{ position: "absolute", left: 100, right: 130, top: 300, textShadow: SOMBRA }}>
      <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.16em", color: C.muted }}>ATIVO · HISTÓRIA</div>
      <div style={{ marginTop: 22, fontWeight: 800, fontSize: 92, lineHeight: 0.98, letterSpacing: "-0.04em", color: C.text }}>
        A cidade<br /><span style={{ color: A.hex }}>que subiu</span>
      </div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1500, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 80 }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
