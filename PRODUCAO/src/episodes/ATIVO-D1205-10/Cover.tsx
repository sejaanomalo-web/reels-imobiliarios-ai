import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A } from "../NOV26/kit";
import { Bloco, ConeLuz, Mundo, type V3 } from "../../estilos/maquete";

const SOMBRA = "0 2px 14px rgba(0,0,0,0.85)";
const SEG = 9;
const pos = (i: number): V3 => { const x = -3.2 + (i * 6.4) / (SEG - 1); return [x, 1.0, -1.4 + 0.7 * Math.sin(x * 0.9)]; };
const rot = (i: number) => { const x = -3.2 + (i * 6.4) / (SEG - 1); return -Math.atan(0.63 * Math.cos(x * 0.9)); };

/** Capa 1080×1920 — ATIVO-D1205-10: a lâmina curva com perfis diferentes acesos. */
export const D1205_10Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Mundo cam={{ pos: [0, 6.0, 13.6], alvo: [0, 0.4, -1.2], fov: 42 }} atm="memoria" holofote={{ pos: [0, 8, 4], alvo: [0, 0, -1.2], intensidade: 0.6 }}>
      {Array.from({ length: SEG }, (_, i) => <Bloco key={i} pos={pos(i)} tam={[0.82, 2.0, 0.5]} rot={rot(i)} mat={i % 3 === 0 ? "argila" : "grafite"} acende={i % 3 === 0 ? 0.45 : 0} />)}
      <ConeLuz pos={[0, 0, -0.6]} alt={6.5} raio={3.2} p={0.5} verde={0.3} />
    </Mundo>
    <div style={{ position: "absolute", left: 100, right: 130, top: 300, textShadow: SOMBRA }}>
      <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.16em", color: C.muted }}>ATIVO · SÃO PAULO, 1966</div>
      <div style={{ marginTop: 22, fontWeight: 800, fontSize: 100, lineHeight: 0.98, letterSpacing: "-0.04em", color: C.text }}>
        Um prédio,<br /><span style={{ color: A.hex }}>muitas vidas</span>
      </div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1470, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 80 }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
