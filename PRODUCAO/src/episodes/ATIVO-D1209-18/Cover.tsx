import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A } from "../NOV26/kit";
import { Bloco, ConeLuz, Mundo } from "../../estilos/maquete";

const SOMBRA = "0 2px 14px rgba(0,0,0,0.85)";
const T: [number, number, number][] = [[-1.5, -0.2, 2.2], [-0.9, 0.5, 2.8], [0.9, 0.5, 2.8], [1.5, -0.2, 2.2], [-1.2, -1.1, 3.1], [1.2, -1.1, 3.1], [-0.4, 1.0, 2.0], [0.4, 1.0, 2.0]];

/** Capa 1080×1920 — ATIVO-D1209-18: as torres de argila e a torre central acesa. */
export const D1209_18Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Mundo cam={{ pos: [0.8, 4.0, 12.4], alvo: [0, 2.2, 0], fov: 42 }} atm="memoria" holofote={{ pos: [0, 8, 4], alvo: [0, 0, 0], intensidade: 0.6 }}>
      <Bloco pos={[0, 0.03, 0.4]} tam={[4.6, 0.06, 3.6]} mat="grafite" />
      {T.map(([x, z, h], i) => <Bloco key={i} pos={[x, 0, z]} tam={[0.34, h, 0.34]} />)}
      <Bloco pos={[0, 0, 0.2]} tam={[0.6, 5.2, 0.6]} acende={0.5} />
      <ConeLuz pos={[0, 0, 0.2]} alt={7} raio={1.6} p={0.6} verde={0.6} />
    </Mundo>
    <div style={{ position: "absolute", left: 100, right: 130, top: 300, textShadow: SOMBRA }}>
      <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.16em", color: C.muted }}>ATIVO · HISTÓRIA</div>
      <div style={{ marginTop: 22, fontWeight: 800, fontSize: 92, lineHeight: 0.98, letterSpacing: "-0.04em", color: C.text }}>
        O que ficou<br /><span style={{ color: A.hex }}>registrado</span>
      </div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1500, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 80 }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
