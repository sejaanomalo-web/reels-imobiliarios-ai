import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A } from "../NOV26/kit";
import { Bloco, Boneco, ConeLuz, Mundo, Predio } from "../../estilos/maquete";

const SOMBRA = "0 2px 14px rgba(0,0,0,0.85)";

/** Capa 1080×1920 — ATIVO-D1208-08: o prédio e a mesa do conselho barrando o comprador. */
export const D1208_08Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Mundo cam={{ pos: [1.4, 5.2, 13.0], alvo: [0, 1.4, 0.6], fov: 42 }} atm="dilema" holofote={{ pos: [0, 8, 4], alvo: [0, 0, 1], intensidade: 0.6 }}>
      <Predio pos={[0, 0, -0.6]} andares={7} escala={0.62} />
      <Bloco pos={[0, 0.38, 1.8]} tam={[2.0, 0.08, 0.7]} />
      {[-0.7, 0, 0.7].map((x, i) => <Boneco key={i} pos={[x, 0, 1.2]} rot={0} escala={0.6} />)}
      <Boneco pos={[0.3, 0, 3.6]} rot={Math.PI} escala={0.62} mat="grafite" />
      <ConeLuz pos={[0, 0, 1.8]} alt={6} raio={2.4} p={0.5} verde={0.2} />
    </Mundo>
    <div style={{ position: "absolute", left: 100, right: 130, top: 300, textShadow: SOMBRA }}>
      <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.16em", color: C.muted }}>ATIVO · E SE…?</div>
      <div style={{ marginTop: 22, fontWeight: 800, fontSize: 92, lineHeight: 0.98, letterSpacing: "-0.04em", color: C.text }}>
        E se o prédio<br /><span style={{ color: A.hex }}>escolhesse<br />o comprador?</span>
      </div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1500, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 80 }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
