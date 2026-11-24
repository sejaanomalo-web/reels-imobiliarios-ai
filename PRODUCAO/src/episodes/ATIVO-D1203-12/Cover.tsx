import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A } from "../NOV26/kit";
import { Casa, ConeLuz, Mundo } from "../../estilos/maquete";

const SOMBRA = "0 2px 14px rgba(0,0,0,0.85)";

/** Capa 1080×1920 — ATIVO-D1203-12: a cidade de casas apagadas e uma acesa. */
export const D1203_12Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Mundo cam={{ pos: [0, 7.4, 12.6], alvo: [0, 1.4, -1.2], fov: 40 }} atm="memoria" holofote={{ pos: [1.1, 7.5, 3.0], alvo: [1.1, 0, 0], intensidade: 0.6 }}>
      {([[-3.3, 0, -2.6], [-1.1, 0, -2.6], [1.1, 0, -2.6], [3.3, 0, -2.6], [-3.3, 0, 0], [-1.1, 0, 0], [1.1, 0, 0], [3.3, 0, 0]] as [number, number, number][]).map((p, i) => <Casa key={i} pos={p} escala={0.95} mat={i === 6 ? "argila" : "grafite"} acende={i === 6 ? 0.6 : 0} />)}
      <ConeLuz pos={[1.1, 0, 0.3]} alt={6.5} raio={1.4} p={0.7} verde={0.5} />
    </Mundo>
    <div style={{ position: "absolute", left: 100, right: 130, top: 300, textShadow: SOMBRA }}>
      <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.16em", color: C.muted }}>ATIVO · SICÍLIA, 2019</div>
      <div style={{ marginTop: 22, fontWeight: 800, fontSize: 104, lineHeight: 0.98, letterSpacing: "-0.04em", color: C.text }}>
        Casas por<br /><span style={{ color: A.hex }}>1 euro</span>
      </div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1470, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 80 }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
