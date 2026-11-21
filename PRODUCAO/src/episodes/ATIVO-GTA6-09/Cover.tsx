import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A, Tag, aa } from "../NOV26/kit";
import { Contorno } from "../../estilos/tipografia";

/** Capa 1080×1920 — ATIVO_GTA6_09 (ESTILO 4 Tipografia cinética). Cobertura FICTÍCIA; sem assets do jogo. */
export const GTA6_09Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans, overflow: "hidden" }}>
    <Background t={0} mood={0.05} accent={A} />
    <Contorno x={300} y={600} texto="MAR" size={380} p={1} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 330, display: "flex", justifyContent: "center" }}><Tag text="EDIÇÃO ESPECIAL · GTA VI" tone="muted" size={28} /></div>
    <div style={{ position: "absolute", left: 100, top: 440, fontWeight: 800, fontSize: 104, lineHeight: 0.94, letterSpacing: "-0.05em", color: C.text }}>
      Essa <span style={{ color: A.hex, textShadow: `0 0 50px ${aa(0.3)}` }}>cobertura</span><br />vende sozinha?
    </div>
    <div style={{ position: "absolute", left: 100, right: 100, top: 760, padding: "28px 32px", borderRadius: 24, background: C.surface, border: `2px solid ${C.warn}`, fontWeight: 600, fontSize: 50, color: C.muted, transform: "rotate(-2deg)" }}>lindo imóvel, ótima localização.</div>
    <div style={{ position: "absolute", left: 100, top: 960, fontWeight: 800, fontSize: 92, color: C.warn, letterSpacing: "-0.04em" }}>Não em Vice City.</div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1420, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76, filter: `drop-shadow(0 0 16px ${aa(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
