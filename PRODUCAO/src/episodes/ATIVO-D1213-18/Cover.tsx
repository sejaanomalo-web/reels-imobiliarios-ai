import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A } from "../NOV26/kit";
import { Bloco, Casa, ConeLuz, Mundo } from "../../estilos/maquete";

const SOMBRA = "0 2px 14px rgba(0,0,0,0.85)";

/** Capa 1080×1920 — ATIVO-D1211-08: o paredão e a sombra sobre a quadra. */
export const D1213_18Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Mundo cam={{ pos: [2.0, 6.4, 15.0], alvo: [0, 1.8, 0], fov: 42 }} atm="tensao" holofote={{ pos: [0, 8, 4], alvo: [0, 0, 0.4], intensidade: 0.6 }}>
      <Bloco pos={[0, 0, 0]} tam={[12, 0.02, 8]} mat="grafite" />
      {[-3.0, -1.5, 0, 1.5, 3.0].map((x, i) => <Casa key={i} pos={[x, 0, 1.7]} escala={0.75} />)}
      <Bloco pos={[0, 0.03, 1.0]} tam={[8.0, 0.02, 3.4]} mat="grafite" />
      <Bloco pos={[0, 0, -1.6]} tam={[3.0, 4.6, 1.6]} />
      <ConeLuz pos={[0, 0, -1.6]} alt={6} raio={2.0} p={0.5} verde={0.3} />
    </Mundo>
    <div style={{ position: "absolute", left: 100, right: 130, top: 300, textShadow: SOMBRA }}>
      <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.16em", color: C.muted }}>ATIVO · HISTÓRIA</div>
      <div style={{ marginTop: 22, fontWeight: 800, fontSize: 92, lineHeight: 0.98, letterSpacing: "-0.04em", color: C.text }}>
        A sombra que<br /><span style={{ color: A.hex }}>mudou a cidade</span>
      </div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1500, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 80 }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
