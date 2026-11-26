import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A } from "../NOV26/kit";
import { Bloco, Boneco, ConeLuz, Mundo, Predio } from "../../estilos/maquete";

const SOMBRA = "0 2px 14px rgba(0,0,0,0.85)";

/** Capa 1080×1920 — ATIVO-D1211-08: o estande e os sete dias acesos. */
export const D1211_08Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Mundo cam={{ pos: [0.4, 7.6, 12.8], alvo: [0, 0.9, 0], fov: 42 }} atm="dilema" holofote={{ pos: [0, 8, 4], alvo: [0, 0, 0.4], intensidade: 0.6 }}>
      <Bloco pos={[0.4, 0.03, 0.4]} tam={[8.8, 0.06, 4.6]} mat="grafite" />
      <Bloco pos={[0, 0.38, 0.8]} tam={[2.2, 0.08, 0.9]} />
      <Predio pos={[0, 0.42, 0.8]} andares={5} escala={0.28} />
      <Boneco pos={[-1.2, 0, 1.9]} rot={0.5} gravata />
      <Boneco pos={[1.2, 0, 2.0]} rot={-0.5} />
      {Array.from({ length: 7 }, (_, i) => <Bloco key={i} pos={[-2.7 + i * 0.9, 0, -2.6]} tam={[0.6, 0.6, 0.6]} acende={0.45} />)}
      <ConeLuz pos={[0, 0, 0.8]} alt={6} raio={2.4} p={0.5} verde={0.3} />
    </Mundo>
    <div style={{ position: "absolute", left: 100, right: 130, top: 300, textShadow: SOMBRA }}>
      <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.16em", color: C.muted }}>ATIVO · E SE…?</div>
      <div style={{ marginTop: 22, fontWeight: 800, fontSize: 92, lineHeight: 0.98, letterSpacing: "-0.04em", color: C.text }}>
        Sete dias<br />para <span style={{ color: A.hex }}>desistir</span>
      </div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1500, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 80 }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
