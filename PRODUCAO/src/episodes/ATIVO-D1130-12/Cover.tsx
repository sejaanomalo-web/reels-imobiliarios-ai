import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A } from "../NOV26/kit";
import { Bloco, Casa, ConeLuz, Mundo } from "../../estilos/maquete";

const SOMBRA = "0 2px 14px rgba(0,0,0,0.85)";

/** Capa 1080×1920 — ATIVO-D1130-12: duas casas iguais; a Nº 8 num degrau, acesa; a Nº 4 afundada. */
export const D1130_12Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Mundo cam={{ pos: [0, 3.4, 9.0], alvo: [0, 1.0, 0.2], fov: 38 }} atm="dados" holofote={{ pos: [-1.2, 7.5, 3.0], alvo: [-1.15, 0, 0], intensidade: 0.6 }}>
      <Bloco pos={[-1.15, 0, 0]} tam={[1.9, 0.32, 1.6]} mat="grafite" />
      <Casa pos={[-1.15, 0.32, 0]} escala={1.15} acende={0.55} />
      <Casa pos={[1.15, -0.3, 0]} escala={1.15} />
      <ConeLuz pos={[-1.15, 0, 0.3]} alt={6.5} raio={1.4} p={0.7} verde={0.4} />
    </Mundo>
    <div style={{ position: "absolute", left: 100, right: 130, top: 300, textShadow: SOMBRA }}>
      <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.16em", color: C.muted }}>ATIVO · NÚMERO E PREÇO</div>
      <div style={{ marginTop: 22, fontWeight: 800, fontSize: 108, lineHeight: 0.98, letterSpacing: "-0.04em", color: C.text }}>
        Casa <span style={{ color: A.hex }}>8</span> vendeu<br />mais que a <span style={{ color: C.warn }}>4</span>.
      </div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1470, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 80 }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
