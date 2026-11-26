import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A } from "../NOV26/kit";
import { Bloco, Casa, Mundo } from "../../estilos/maquete";

const SOMBRA = "0 2px 14px rgba(0,0,0,0.85)";

/** Capa 1080×1920 — ATIVO-D1210-18: a rua que sai do rio, casas dos dois lados. */
export const D1210_18Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Mundo cam={{ pos: [0.4, 6.4, 11.6], alvo: [0, 0.8, -1.0], fov: 42 }} atm="memoria" holofote={{ pos: [0, 8, 3], alvo: [0, 0, -0.6], intensidade: 0.6 }}>
      <Bloco pos={[0, 0, -3.4]} tam={[12, 0.1, 1.4]} mat="grafite" acende={0.25} />
      <Bloco pos={[0, 0.03, 0.2]} tam={[1.0, 0.05, 5.6]} mat="grafite" />
      {[-1.6, 0, 1.6].map((z, i) => (
        <React.Fragment key={i}>
          <Casa pos={[-1.5, 0, z]} escala={0.55} rot={Math.PI / 2} />
          <Casa pos={[1.5, 0, z]} escala={0.55} rot={-Math.PI / 2} acende={0.3} />
        </React.Fragment>
      ))}
    </Mundo>
    <div style={{ position: "absolute", left: 100, right: 130, top: 300, textShadow: SOMBRA }}>
      <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.16em", color: C.muted }}>ATIVO · HISTÓRIA</div>
      <div style={{ marginTop: 22, fontWeight: 800, fontSize: 92, lineHeight: 0.98, letterSpacing: "-0.04em", color: C.text }}>
        Os números<br /><span style={{ color: A.hex }}>das casas</span>
      </div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1500, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 80 }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
