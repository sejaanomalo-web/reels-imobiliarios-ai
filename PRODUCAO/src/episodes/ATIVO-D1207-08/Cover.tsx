import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A } from "../NOV26/kit";
import { ConeLuz, Mundo, Predio, Tanque } from "../../estilos/maquete";

const SOMBRA = "0 2px 14px rgba(0,0,0,0.85)";

/** Capa 1080×1920 — ATIVO-D1207-08: prédios e o tanque de 99 anos quase vazio. */
export const D1207_08Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Mundo cam={{ pos: [0.6, 7.0, 13.6], alvo: [0.6, 1.2, 0], fov: 42 }} atm="dilema" holofote={{ pos: [0, 9, 4], alvo: [0, 0, 0], intensidade: 0.6 }}>
      {[0, 1, 2, 3].map((i) => <Predio key={i} pos={[-2.7 + i * 1.8, 0, 0]} andares={6} escala={0.8} acende={i < 3 ? 0.3 : 0} />)}
      <Tanque pos={[3.9, 0, 1.8]} raio={0.4} alt={1.6} nivel={0.15} alerta={1} />
      <ConeLuz pos={[0, 0, 0]} alt={6} raio={3} p={0.5} verde={0.2} />
    </Mundo>
    <div style={{ position: "absolute", left: 100, right: 130, top: 300, textShadow: SOMBRA }}>
      <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.16em", color: C.muted }}>ATIVO · E SE…?</div>
      <div style={{ marginTop: 22, fontWeight: 800, fontSize: 96, lineHeight: 0.98, letterSpacing: "-0.04em", color: C.text }}>
        Apartamento<br />com <span style={{ color: A.hex }}>data de<br />validade?</span>
      </div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1470, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 80 }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
