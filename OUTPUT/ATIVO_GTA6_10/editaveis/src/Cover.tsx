import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A, Tag, aa } from "../NOV26/kit";
import { Balao, Boneco, Chao, Palco } from "../../estilos/palitinho";

/** Capa 1080×1920 — ATIVO_GTA6_10 (ESTILO 1 Palitinho). Esquete ILUSTRATIVO; sem assets do jogo. */
export const GTA6_10Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={0.05} accent={A} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 330, display: "flex", justifyContent: "center" }}><Tag text="EDIÇÃO ESPECIAL · GTA VI" tone="muted" size={28} /></div>
    <div style={{ position: "absolute", left: 60, right: 60, top: 410, textAlign: "center", fontWeight: 800, fontSize: 96, lineHeight: 0.98, letterSpacing: "-0.05em", color: C.text }}>
      Plantão em<br /><span style={{ color: C.warn }}>Vice City</span>
    </div>
    <Palco top={680} h={700}>
      <Chao y={560} />
      <Boneco x={860} y={560} pose="pensa" olhar={-1} cor={A.hex} />
      <Balao x={60} y={40} w={560} texto="Casa perto da praia" lado="dir" size={34} />
      <Balao x={60} y={190} w={600} texto="Cobertura com heliponto" lado="dir" size={34} />
      <Balao x={60} y={340} w={480} texto="A rua é segura?" lado="dir" tone="warn" size={36} />
    </Palco>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1420, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76, filter: `drop-shadow(0 0 16px ${aa(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
