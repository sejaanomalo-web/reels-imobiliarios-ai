import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A } from "../NOV26/kit";
import { ConeLuz, Mundo, Predio, Tanque } from "../../estilos/maquete";

const SOMBRA = "0 2px 14px rgba(0,0,0,0.85)";

/** Capa 1080×1920 — ATIVO-D1204-12: o hotel e os três níveis de adesão (o do mesmo quarto aceso). */
export const D1204_12Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Mundo cam={{ pos: [0, 5.4, 11.0], alvo: [0, 0.9, -1.2], fov: 40 }} atm="explicacao" holofote={{ pos: [1.6, 7.5, 3.0], alvo: [1.6, 0, 0], intensidade: 0.6 }}>
      <Predio pos={[0, 0, -4.5]} andares={4} escala={0.9} />
      <Tanque pos={[-1.6, 0, 0]} raio={0.55} alt={1.8} nivel={0.35} />
      <Tanque pos={[0, 0, 0]} raio={0.55} alt={1.8} nivel={0.44} />
      <Tanque pos={[1.6, 0, 0]} raio={0.55} alt={1.8} nivel={0.55} acende={1} />
      <ConeLuz pos={[1.6, 0, 0]} alt={6} raio={1.1} p={0.6} verde={0.5} />
    </Mundo>
    <div style={{ position: "absolute", left: 100, right: 130, top: 300, textShadow: SOMBRA }}>
      <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.16em", color: C.muted }}>ATIVO · FORA DA BOLHA</div>
      <div style={{ marginTop: 22, fontWeight: 800, fontSize: 104, lineHeight: 0.98, letterSpacing: "-0.04em", color: C.text }}>
        A toalha<br />do <span style={{ color: A.hex }}>hotel</span>
      </div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1470, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 80 }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
