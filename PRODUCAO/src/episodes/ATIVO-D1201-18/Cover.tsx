import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A } from "../NOV26/kit";
import { Bloco, Boneco, ConeLuz, Mundo } from "../../estilos/maquete";

const SOMBRA = "0 2px 14px rgba(0,0,0,0.85)";

/** Capa 1080×1920 — ATIVO-D1201-18: a fila de 7 dias e o 8º acendendo; o comprador diante dela. */
export const D1201_18Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Mundo cam={{ pos: [5.6, 7.0, 13.0], alvo: [5.8, 0.8, 0.3], fov: 40 }} atm="dilema" holofote={{ pos: [9.6, 7.5, 3.0], alvo: [10.2, 0, 0.6], intensidade: 0.6 }}>
      {Array.from({ length: 7 }, (_, i) => <Bloco key={i} pos={[3.2 + i * 0.95, 0, 0.6]} tam={[0.75, 0.5 + 0.06 * i, 0.75]} />)}
      <Bloco pos={[10.23, 0, 0.6]} tam={[0.9, 1.1, 0.9]} acende={1} />
      <Boneco pos={[5.2, 0, 2.0]} rot={0.4} />
      <ConeLuz pos={[10.23, 0, 0.8]} alt={6.5} raio={1.2} p={0.7} verde={0.6} />
    </Mundo>
    <div style={{ position: "absolute", left: 100, right: 130, top: 300, textShadow: SOMBRA }}>
      <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.16em", color: C.muted }}>ATIVO · IMÓVEL NA PLANTA</div>
      <div style={{ marginTop: 22, fontWeight: 800, fontSize: 104, lineHeight: 0.98, letterSpacing: "-0.04em", color: C.text }}>
        Assinou e pode<br /><span style={{ color: C.warn }}>desistir</span> em <span style={{ color: A.hex }}>7 dias</span>
      </div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1470, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 80 }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
