import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A } from "../NOV26/kit";
import { Casa, Fluxo, Instituicao, Mundo, Tanque } from "../../estilos/maquete";

const SOMBRA = "0 2px 14px rgba(0,0,0,0.85)";

/** Capa 1080×1920 — ATIVO-MAQUETE-01 (Quarto modelo): a maquete do fluxo poupança → banco → casas, uma casa acesa. */
export const MAQUETE_01Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Mundo cam={{ pos: [0.4, 8.6, 10.6], alvo: [0.5, 0.2, -1.4], fov: 40 }} atm="dados">
      <Tanque pos={[-1.3, 0, 2.0]} raio={1.05} alt={2.3} nivel={0.8} />
      <Instituicao pos={[0.7, 0, -0.9]} escala={0.95} />
      <Casa pos={[1.5, 0, -3.8]} escala={0.85} acende={1} />
      <Casa pos={[0.1, 0, -4.9]} escala={0.85} rot={-0.1} />
      <Casa pos={[2.6, 0, -5.6]} escala={0.85} rot={0.1} />
      <Fluxo de={[-1.3, 2.5, 2.0]} para={[0.7, 1.6, -0.9]} altura={1.4} p={1} n={12} />
      <Fluxo de={[0.7, 1.6, -0.9]} para={[1.3, 1.2, -4.4]} altura={1.2} p={1} n={12} />
    </Mundo>
    <div style={{ position: "absolute", left: 100, right: 130, top: 300, textShadow: SOMBRA }}>
      <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.16em", color: C.muted }}>ATIVO · POUPANÇA E CRÉDITO</div>
      <div style={{ marginTop: 22, fontWeight: 800, fontSize: 112, lineHeight: 0.96, letterSpacing: "-0.04em", color: C.text }}>
        De onde vem o <span style={{ color: A.hex }}>financiamento</span>?
      </div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1470, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 80 }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
