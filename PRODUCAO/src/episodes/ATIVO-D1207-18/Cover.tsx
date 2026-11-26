import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A } from "../NOV26/kit";
import { Casa, ConeLuz, Mundo, Predio } from "../../estilos/maquete";

const SOMBRA = "0 2px 14px rgba(0,0,0,0.85)";
const TOPO = 13 * 0.55 * 0.56;

/** Capa 1080×1920 — ATIVO-D1207-18: a torre com a casa no topo. */
export const D1207_18Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Mundo cam={{ pos: [2.2, 3.4, 12.4], alvo: [0, 3.0, 0], fov: 42 }} atm="memoria" holofote={{ pos: [2, 10, 5], alvo: [0, 2, 0], intensidade: 0.6 }}>
      <Predio pos={[0, 0, 0]} andares={13} escala={0.56} />
      <Casa pos={[0, TOPO, 0]} escala={0.5} acende={0.35} />
      <ConeLuz pos={[0, 0, 0]} alt={9} raio={2.4} p={0.5} verde={0.25} />
    </Mundo>
    <div style={{ position: "absolute", left: 100, right: 130, top: 300, textShadow: SOMBRA }}>
      <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.16em", color: C.muted }}>ATIVO · SÃO PAULO, 1929</div>
      <div style={{ marginTop: 22, fontWeight: 800, fontSize: 88, lineHeight: 0.98, letterSpacing: "-0.04em", color: C.text }}>
        A casa no<br /><span style={{ color: A.hex }}>topo do prédio</span>
      </div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1500, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 80 }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
