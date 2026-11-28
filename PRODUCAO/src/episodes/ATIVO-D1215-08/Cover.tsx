import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A } from "../NOV26/kit";
import { Bloco, Boneco, Casa, ConeLuz, Mundo } from "../../estilos/maquete";

const SOMBRA = "0 2px 14px rgba(0,0,0,0.85)";

/** Capa 1080×1920 — ATIVO-D1215-08: o inspetor e o defeito na parede. */
export const D1215_08Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Mundo cam={{ pos: [1.8, 5.6, 13.4], alvo: [0, 1.2, 0], fov: 42 }} atm="dilema" holofote={{ pos: [0, 8, 4], alvo: [0, 0.6, 0], intensidade: 0.6 }}>
      <Bloco pos={[0, 0, 0]} tam={[12, 0.02, 8]} mat="grafite" />
      <Casa pos={[0, 0, -0.4]} escala={1.25} />
      <Bloco pos={[0.45, 0.25, 0.24]} tam={[0.09, 0.55, 0.05]} mat="alerta" acende={0.8} />
      <Boneco pos={[1.7, 0, 1.2]} rot={-0.7} pose="aponta" />
      <Boneco pos={[-1.7, 0, 1.2]} rot={0.6} />
      <ConeLuz pos={[0, 0, 0.4]} alt={6} raio={3.0} p={0.6} verde={0.2} />
    </Mundo>
    <div style={{ position: "absolute", left: 100, right: 130, top: 300, textShadow: SOMBRA }}>
      <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.16em", color: C.muted }}>ATIVO · E SE…?</div>
      <div style={{ marginTop: 22, fontWeight: 800, fontSize: 92, lineHeight: 0.98, letterSpacing: "-0.04em", color: C.text }}>
        A vistoria<br /><span style={{ color: A.hex }}>antes de assinar</span>
      </div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1500, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 80 }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
