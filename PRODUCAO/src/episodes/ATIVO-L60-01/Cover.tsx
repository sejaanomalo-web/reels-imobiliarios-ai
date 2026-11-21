import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A, Tag, aa } from "../NOV26/kit";
import { Balao, Boneco, Chao, Palco } from "../../estilos/palitinho";

/** Capa 1080×1920 — ATIVO_L60_01 (ESTILO 1 Palitinho: cena mínima com 2 bonecos). Conteúdo crítico no recorte 3:4 (y 240–1680). */
export const L60_01Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={0.05} accent={A} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 330, display: "flex", justifyContent: "center" }}><Tag text="ATENDIMENTO · PRIMEIRA RESPOSTA" tone="muted" size={28} /></div>
    <div style={{ position: "absolute", left: 60, right: 60, top: 410, textAlign: "center", fontWeight: 800, fontSize: 104, lineHeight: 0.98, letterSpacing: "-0.05em", color: C.text }}>
      Não responda<br />só com <span style={{ color: A.hex, textShadow: `0 0 50px ${aa(0.3)}` }}>“sim”</span>
    </div>
    <Palco top={700} h={700}>
      <Chao y={560} />
      <Boneco x={230} y={560} pose="celular" />
      <Boneco x={850} y={560} pose="celular" olhar={-1} cor={A.hex} />
      <Balao x={40} y={170} w={460} texto="Ainda está disponível?" lado="esq" size={32} />
      <Balao x={560} y={170} w={480} texto="Sim! Planta ou visita?" lado="dir" tone="accent" size={32} />
    </Palco>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1420, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76, filter: `drop-shadow(0 0 16px ${aa(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
