import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A } from "../NOV26/kit";
import { Bloco, ConeLuz, Mundo } from "../../estilos/maquete";

const SOMBRA = "0 2px 14px rgba(0,0,0,0.85)";
const W = 1.0, E = 0.06;

/** Capa 1080×1920 — ATIVO-D1203-18: a caixa montada à mão (acesa) ao lado da caixa pronta. */
export const D1203_18Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Mundo cam={{ pos: [0, 4.6, 10.6], alvo: [0, 1.6, -0.8], fov: 40 }} atm="explicacao" holofote={{ pos: [-1.2, 7.5, 3.0], alvo: [-1.2, 0, -1], intensidade: 0.7 }}>
      <Bloco pos={[-0.85, E / 2, -1]} tam={[W, E, W]} acende={0.6} />
      <Bloco pos={[-0.85 - W / 2, W / 2, -1]} tam={[E, W, W]} acende={0.6} />
      <Bloco pos={[-0.85 + W / 2, W / 2, -1]} tam={[E, W, W]} acende={0.6} />
      <Bloco pos={[-0.85, W / 2, -1 - W / 2]} tam={[W, W, E]} acende={0.6} />
      <Bloco pos={[-0.85, W / 2 + 0.3, -1 + W / 2 + 0.15]} tam={[W, W, E]} rot={0.08} acende={0.5} />
      <Bloco pos={[0.85, W / 2, -1]} tam={[W, W, W]} mat="grafite" />
      <ConeLuz pos={[-0.85, 0, -1]} alt={6.0} raio={1.3} p={0.7} verde={0.5} />
    </Mundo>
    <div style={{ position: "absolute", left: 100, right: 130, top: 300, textShadow: SOMBRA }}>
      <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.16em", color: C.muted }}>ATIVO · FORA DA BOLHA</div>
      <div style={{ marginTop: 22, fontWeight: 800, fontSize: 100, lineHeight: 0.98, letterSpacing: "-0.04em", color: C.text }}>
        O móvel que<br /><span style={{ color: A.hex }}>você montou</span>
      </div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1470, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 80 }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
