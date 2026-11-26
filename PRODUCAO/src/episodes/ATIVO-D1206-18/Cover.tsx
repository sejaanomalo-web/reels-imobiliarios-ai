import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A } from "../NOV26/kit";
import { Bloco, Boneco, Casa, ConeLuz, Mundo } from "../../estilos/maquete";

const SOMBRA = "0 2px 14px rgba(0,0,0,0.85)";

/** Capa 1080×1920 — ATIVO-D1206-18: a fileira de casas em obra e as equipes andando. */
export const D1206_18Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Mundo cam={{ pos: [0, 7.0, 13.6], alvo: [0, 0.4, 0], fov: 42 }} atm="memoria" holofote={{ pos: [0, 9, 4], alvo: [0, 0, 0], intensidade: 0.6 }}>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <React.Fragment key={i}>
          <Bloco pos={[-5 + i * 2, 0.04, 0]} tam={[1.5, 0.08, 1.4]} mat="grafite" />
          {i < 3 ? <Casa pos={[-5 + i * 2, 0, 0]} escala={0.9} /> : i === 3 ? <Bloco pos={[1, 0.45, 0]} tam={[1.1, 0.8, 1.0]} /> : null}
        </React.Fragment>
      ))}
      {[0, 1, 2].map((e) => <Boneco key={e} pos={[-0.2 + e * 2, 0, 1.3]} rot={Math.PI / 2} escala={0.7} acende={e === 2 ? 0.3 : 0} />)}
      <ConeLuz pos={[0, 0, 0]} alt={6} raio={3} p={0.5} verde={0.25} />
    </Mundo>
    <div style={{ position: "absolute", left: 100, right: 130, top: 300, textShadow: SOMBRA }}>
      <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.16em", color: C.muted }}>ATIVO · EUA, 1947</div>
      <div style={{ marginTop: 22, fontWeight: 800, fontSize: 92, lineHeight: 0.98, letterSpacing: "-0.04em", color: C.text }}>
        A linha de<br />montagem<br /><span style={{ color: A.hex }}>ao contrário</span>
      </div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1470, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 80 }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
