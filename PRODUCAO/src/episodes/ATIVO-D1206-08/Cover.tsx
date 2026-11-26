import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A } from "../NOV26/kit";
import { Bloco, Casa, ConeLuz, Mundo, Tanque } from "../../estilos/maquete";

const SOMBRA = "0 2px 14px rgba(0,0,0,0.85)";

/** Capa 1080×1920 — ATIVO-D1206-08: a casa com o tanque de valor quase vazio e o lote aceso. */
export const D1206_08Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Mundo cam={{ pos: [0.4, 5.2, 9.6], alvo: [0.4, 0.2, 0], fov: 42 }} atm="dados" holofote={{ pos: [0, 8, 4], alvo: [0, 0, 0], intensidade: 0.6 }}>
      <Bloco pos={[0, 0.03, 0]} tam={[2.6, 0.06, 2.2]} mat="grafite" acende={0.7} />
      <Casa pos={[0, 0, 0]} escala={1.15} mat="grafite" />
      <Tanque pos={[1.7, 0, 0.3]} raio={0.34} alt={1.5} nivel={0.1} alerta={1} />
      <ConeLuz pos={[0, 0, 0]} alt={6} raio={2.2} p={0.5} verde={0.4} />
    </Mundo>
    <div style={{ position: "absolute", left: 100, right: 130, top: 300, textShadow: SOMBRA }}>
      <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.16em", color: C.muted }}>ATIVO · E SE…?</div>
      <div style={{ marginTop: 22, fontWeight: 800, fontSize: 96, lineHeight: 0.98, letterSpacing: "-0.04em", color: C.text }}>
        E se a casa<br />perdesse valor<br /><span style={{ color: A.hex }}>como um carro?</span>
      </div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1470, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 80 }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
