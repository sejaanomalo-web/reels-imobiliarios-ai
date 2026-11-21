import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A, Tag, aa } from "../NOV26/kit";
import { Contorno } from "../../estilos/tipografia";

/** Capa 1080×1920 — ATIVO_GTA6_04 (ESTILO 4 Tipografia cinética: palavra gigante + contorno). Sem assets do jogo. */
export const GTA6_04Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans, overflow: "hidden" }}>
    <Background t={0} mood={0.05} accent={A} />
    <Contorno x={10} y={560} texto="VICE" size={380} p={1} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 330, display: "flex", justifyContent: "center" }}><Tag text="EDIÇÃO ESPECIAL · GTA VI" tone="muted" size={28} /></div>
    <div style={{ position: "absolute", left: 80, top: 450, fontWeight: 800, fontSize: 112, lineHeight: 0.92, letterSpacing: "-0.05em", color: C.text }}>
      Eu captaria<br />essa <span style={{ color: A.hex, textShadow: `0 0 50px ${aa(0.3)}` }}>casa</span>
    </div>
    <div style={{ position: "absolute", left: 80, top: 760, fontWeight: 800, fontSize: 72, lineHeight: 1, letterSpacing: "-0.04em", color: C.muted }}>antes da missão</div>
    <div style={{ position: "absolute", left: 80, top: 900, display: "flex", flexDirection: "column", gap: 18, fontFamily: F.mono, fontWeight: 700, fontSize: 46, color: C.text }}>
      <span><span style={{ color: A.hex }}>1</span> FACHADA</span><span><span style={{ color: A.hex }}>2</span> LOCALIZAÇÃO</span><span><span style={{ color: A.hex }}>3</span> HISTÓRIA</span>
    </div>
    <div style={{ position: "absolute", left: 80, top: 1140, fontWeight: 800, fontSize: 64, color: C.warn, transform: "rotate(-3deg)" }}>proprietário: ???</div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1420, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76, filter: `drop-shadow(0 0 16px ${aa(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
