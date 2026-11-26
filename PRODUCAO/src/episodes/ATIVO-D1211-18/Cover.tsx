import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A } from "../NOV26/kit";
import { Bloco, Boneco, ConeLuz, Mundo } from "../../estilos/maquete";

const SOMBRA = "0 2px 14px rgba(0,0,0,0.85)";

/** Capa 1080×1920 — ATIVO-D1211-08: a torre, a plataforma alta e a corda. */
export const D1211_18Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Mundo cam={{ pos: [0.6, 5.6, 15.5], alvo: [0, 2.6, 0.8], fov: 42 }} atm="tensao" holofote={{ pos: [0, 8, 4], alvo: [0, 0, 0.4], intensidade: 0.6 }}>
      <Bloco pos={[0, 0.03, 1.2]} tam={[6.2, 0.06, 5.0]} mat="grafite" />
      <Bloco pos={[-0.9, 0, 0]} tam={[0.18, 4.2, 0.18]} />
      <Bloco pos={[0.9, 0, 0]} tam={[0.18, 4.2, 0.18]} />
      <Bloco pos={[0, 4.2, 0]} tam={[2.0, 0.16, 0.3]} />
      <Bloco pos={[0, 2.6, 0]} tam={[1.5, 0.12, 1.0]} />
      <Bloco pos={[-0.72, 2.5, 0]} tam={[0.14, 0.3, 0.26]} acende={0.6} />
      <Bloco pos={[0.72, 2.5, 0]} tam={[0.14, 0.3, 0.26]} acende={0.6} />
      <Boneco pos={[-0.2, 2.72, 0.1]} escala={0.62} rot={0.2} pose="aponta" />
      <Bloco pos={[0.5, 2.72, 0]} tam={[0.05, 1.48, 0.05]} mat="grafite" />
      {[[-2.2, 0, 2.6], [-1.3, 0, 3.2], [-0.4, 0, 3.5], [0.5, 0, 3.5], [1.4, 0, 3.2], [2.3, 0, 2.6]].map((p, i) => <Boneco key={i} pos={p as [number, number, number]} escala={0.72} rot={Math.PI - Math.atan2(p[0], p[2]) * 0.6} />)}
      <ConeLuz pos={[0, 0, 0]} alt={6.5} raio={1.8} p={0.6} verde={0.3} />
    </Mundo>
    <div style={{ position: "absolute", left: 100, right: 130, top: 300, textShadow: SOMBRA }}>
      <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.16em", color: C.muted }}>ATIVO · HISTÓRIA</div>
      <div style={{ marginTop: 22, fontWeight: 800, fontSize: 92, lineHeight: 0.98, letterSpacing: "-0.04em", color: C.text }}>
        Mandou cortar<br /><span style={{ color: A.hex }}>a corda</span>
      </div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1500, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 80 }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
