import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A } from "../NOV26/kit";
import { Boneco, Casa, ConeLuz, Fluxo, Mundo } from "../../estilos/maquete";

const SOMBRA = "0 2px 14px rgba(0,0,0,0.85)";

/** Capa 1080×1920 — ATIVO-D1202-12: a casa da visita com os cheiros embolados no ar; o cliente diante dela. */
export const D1202_12Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Mundo cam={{ pos: [5.0, 5.4, 11.4], alvo: [5, 1.2, 0.4], fov: 40 }} atm="tensao" holofote={{ pos: [5.2, 7.5, 4.0], alvo: [5, 0, 0.4], intensidade: 0.6 }}>
      <Casa pos={[5, 0, -0.6]} escala={1.9} />
      {[[3.4, 1.4, 0.9, "argila"], [5.0, 2.0, 1.3, "grafite"], [6.6, 1.4, 1.7, "argila"]].map(([x, z, h, m], i) => (
        <Fluxo key={i} de={[x as number, 0.4, z as number]} para={[5 + (i - 1) * 0.3, 1.9, 0.9]} altura={h as number} p={1} n={14} anda={0.3 * i} mat={m as "argila" | "grafite"} />
      ))}
      <Boneco pos={[5, 0, 2.6]} rot={Math.PI} />
      <ConeLuz pos={[5, 0, 0]} alt={6.5} raio={2.2} p={0.6} />
    </Mundo>
    <div style={{ position: "absolute", left: 100, right: 130, top: 300, textShadow: SOMBRA }}>
      <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.16em", color: C.muted }}>ATIVO · VISITA</div>
      <div style={{ marginTop: 22, fontWeight: 800, fontSize: 104, lineHeight: 0.98, letterSpacing: "-0.04em", color: C.text }}>
        O cheiro que<br /><span style={{ color: A.hex }}>ninguém comenta</span>
      </div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1470, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 80 }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
