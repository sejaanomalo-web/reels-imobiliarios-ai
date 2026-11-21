import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A, Tag, aa } from "../NOV26/kit";
import { Balao, Boneco, Casinha, Chao, Palco } from "../../estilos/palitinho";

/** Capa 1080×1920 — ATIVO_GTA6_06 (ESTILO 1 Palitinho: cena mínima com 2 bonecos genéricos). Sem assets do jogo. */
export const GTA6_06Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={0.05} accent={A} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 330, display: "flex", justifyContent: "center" }}><Tag text="EDIÇÃO ESPECIAL · GTA VI" tone="muted" size={28} /></div>
    <div style={{ position: "absolute", left: 60, right: 60, top: 410, textAlign: "center", fontWeight: 800, fontSize: 100, lineHeight: 0.98, letterSpacing: "-0.05em", color: C.text }}>
      Aluguel <span style={{ color: A.hex, textShadow: `0 0 50px ${aa(0.3)}` }}>R$ 0</span><br /><span style={{ color: C.warn }}>desde que…</span>
    </div>
    <Palco top={700} h={700}>
      <Chao y={560} />
      <Casinha x={540} y={620} s={0.9} p={1} />
      <Boneco x={200} y={560} pose="comemora" />
      <Boneco x={880} y={560} pose="aponta" olhar={-1} cor={C.muted} />
      <Balao x={600} y={120} w={420} texto="Desde que…" lado="dir" tone="warn" size={40} />
    </Palco>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1420, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76, filter: `drop-shadow(0 0 16px ${aa(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
