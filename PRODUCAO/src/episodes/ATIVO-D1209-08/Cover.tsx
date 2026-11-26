import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A } from "../NOV26/kit";
import { Bloco, Casa, ConeLuz, Mundo } from "../../estilos/maquete";

const SOMBRA = "0 2px 14px rgba(0,0,0,0.85)";

/** Capa 1080×1920 — ATIVO-D1209-08: a rua de casas e a casa do meio acesa (o preço que alguém pagou). */
export const D1209_08Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Mundo cam={{ pos: [0.6, 4.8, 11.4], alvo: [0, 1.0, 0], fov: 42 }} atm="dilema" holofote={{ pos: [0, 8, 4], alvo: [0, 0, 0], intensidade: 0.6 }}>
      <Bloco pos={[0, 0.03, 0.2]} tam={[6.4, 0.06, 2.0]} mat="grafite" />
      {[-2.4, -0.8, 0.8, 2.4].map((x, i) => <Casa key={i} pos={[x, 0, 0]} escala={0.62} acende={i === 2 ? 0.5 : 0} />)}
      <ConeLuz pos={[0.8, 0, 0]} alt={6} raio={1.4} p={0.6} verde={0.6} />
    </Mundo>
    <div style={{ position: "absolute", left: 100, right: 130, top: 300, textShadow: SOMBRA }}>
      <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.16em", color: C.muted }}>ATIVO · E SE…?</div>
      <div style={{ marginTop: 22, fontWeight: 800, fontSize: 92, lineHeight: 0.98, letterSpacing: "-0.04em", color: C.text }}>
        E se o preço<br />de venda fosse<br /><span style={{ color: A.hex }}>público?</span>
      </div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1500, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 80 }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
