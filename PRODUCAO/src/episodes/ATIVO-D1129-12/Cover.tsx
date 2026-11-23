import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A } from "../NOV26/kit";
import { Casa, ConeLuz, Fluxo, Mundo } from "../../estilos/maquete";

const SOMBRA = "0 2px 14px rgba(0,0,0,0.85)";

/** Capa 1080×1920 — ATIVO-D1129-12: a casa real iluminada e a cópia escura (o anúncio falso) se descolando dela. */
export const D1129_12Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Mundo cam={{ pos: [1.6, 6.0, 11.6], alvo: [-0.6, 0.9, -0.6], fov: 40 }} atm="dilema" holofote={{ pos: [0.4, 7.5, 3.0], alvo: [0, 0, 0.4], intensidade: 0.6 }}>
      <Casa pos={[0.4, 0, 0]} escala={1.3} />
      <Casa pos={[-2.0, 0.25, -0.6]} escala={1.2} rot={0.14} mat="grafite" />
      <Casa pos={[3.2, 0, -2.8]} escala={0.8} rot={-0.25} mat="grafite" />
      <ConeLuz pos={[0.4, 0, 0.4]} alt={6.5} raio={1.5} p={0.8} />
      <Fluxo de={[-0.6, 1.4, 0]} para={[-2.0, 1.4, -0.6]} altura={0.6} p={1} n={8} mat="grafite" />
    </Mundo>
    <div style={{ position: "absolute", left: 100, right: 130, top: 300, textShadow: SOMBRA }}>
      <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.16em", color: C.muted }}>ATIVO · GOLPE DE TEMPORADA</div>
      <div style={{ marginTop: 22, fontWeight: 800, fontSize: 112, lineHeight: 0.96, letterSpacing: "-0.04em", color: C.text }}>
        A casa <span style={{ color: A.hex }}>existe</span>.<br />O aluguel, <span style={{ color: C.warn }}>não</span>.
      </div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1470, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 80 }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
