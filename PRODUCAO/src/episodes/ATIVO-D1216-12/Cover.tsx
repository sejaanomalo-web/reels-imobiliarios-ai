import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A } from "../NOV26/kit";
import { Bloco, Boneco, ConeLuz, Mundo } from "../../estilos/maquete";

const SOMBRA = "0 2px 14px rgba(0,0,0,0.85)";

/** Capa 1080×1920 — ATIVO-D1216-12: o maquinista aponta para o sinal. */
export const D1216_12Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Mundo cam={{ pos: [0.6, 5.4, 13.2], alvo: [-1.0, 1.2, -0.4], fov: 42 }} atm="dilema" holofote={{ pos: [0, 8, 4], alvo: [-1, 0.6, 0], intensidade: 0.6 }}>
      <Bloco pos={[0, 0, 0]} tam={[12, 0.02, 8]} mat="grafite" />
      <Bloco pos={[0, 0, 1.0]} tam={[8.0, 0.3, 1.8]} />
      {[0, 1, 2].map((i) => <Bloco key={i} pos={[0.6 + i * 2.4, 0.05, -0.7]} tam={[2.2, 0.95, 0.95]} />)}
      <Bloco pos={[-2.8, 0, -1.3]} tam={[0.12, 1.8, 0.12]} mat="grafite" />
      <Bloco pos={[-2.8, 1.8, -1.3]} tam={[0.4, 0.4, 0.4]} mat="aceso" acende={0.7} />
      <Boneco pos={[-1.2, 0.3, 0.9]} rot={-0.9} pose="aponta" />
      <ConeLuz pos={[0, 0, 0.6]} alt={6} raio={3.0} p={0.6} verde={0.3} />
    </Mundo>
    <div style={{ position: "absolute", left: 100, right: 130, top: 300, textShadow: SOMBRA }}>
      <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.16em", color: C.muted }}>ATIVO · FORA DA BOLHA</div>
      <div style={{ marginTop: 22, fontWeight: 800, fontSize: 92, lineHeight: 0.98, letterSpacing: "-0.04em", color: C.text }}>
        Apontar<br /><span style={{ color: A.hex }}>e falar</span>
      </div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1500, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 80 }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
