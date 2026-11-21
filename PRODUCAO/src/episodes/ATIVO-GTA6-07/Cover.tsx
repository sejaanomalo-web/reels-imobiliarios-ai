import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A, Tag, aa } from "../NOV26/kit";
import { Giz, Lousa, Traco } from "../../estilos/lousa";

/** Capa 1080×1920 — ATIVO_GTA6_07 (ESTILO 2 Desenho à mão). Sem arte do jogo: nomes só em texto. */
export const GTA6_07Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={0.05} accent={A} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 330, display: "flex", justifyContent: "center" }}><Tag text="EDIÇÃO ESPECIAL · GTA VI" tone="muted" size={28} /></div>
    <div style={{ position: "absolute", left: 60, right: 60, top: 410, textAlign: "center", fontWeight: 800, fontSize: 96, lineHeight: 0.98, letterSpacing: "-0.05em", color: C.text }}>
      Não é só<br /><span style={{ color: C.warn }}>roubar carro</span>
    </div>
    <Lousa top={700} h={680}>
      <Traco d="M 540 40 L 545 330" p={1} w={5} cor={C.dim} />
      <Giz x={280} y={140} texto="JASON" p={1} size={64} anchor="middle" />
      <Giz x={280} y={230} texto="vida tranquila" p={1} size={40} anchor="middle" cor={A.hex} />
      <Giz x={800} y={140} texto="LUCIA" p={1} size={64} anchor="middle" />
      <Giz x={800} y={230} texto="mudar a sorte" p={1} size={40} anchor="middle" cor={A.hex} />
      <Traco d="M 140 600 Q 540 440 940 600" p={1} w={8} cor={C.warn} />
      <Giz x={540} y={400} texto="a cidade puxa de volta" p={1} size={40} anchor="middle" cor={C.warn} />
    </Lousa>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1420, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76, filter: `drop-shadow(0 0 16px ${aa(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
