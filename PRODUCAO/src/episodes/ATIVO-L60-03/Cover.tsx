import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A, Tag, aa } from "../NOV26/kit";
import { Giz, Lousa, Traco, xis } from "../../estilos/lousa";

/** Capa 1080×1920 — ATIVO_L60_03 (ESTILO 2 Desenho à mão: desenho de giz + título). Robô ILUSTRATIVO. */
const robo = "M 470 140 L 610 140 L 610 250 L 470 250 Z M 540 140 L 540 100 M 510 185 L 526 185 M 554 185 L 570 185 M 510 220 L 570 220 M 450 270 L 630 270 L 630 400 L 450 400 Z M 630 300 L 780 240";
export const L60_03Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={0.05} accent={A} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 330, display: "flex", justifyContent: "center" }}><Tag text="TECNOLOGIA SEM PROMESSA MÁGICA" tone="muted" size={28} /></div>
    <div style={{ position: "absolute", left: 60, right: 60, top: 410, textAlign: "center", fontWeight: 800, fontSize: 100, lineHeight: 0.98, letterSpacing: "-0.05em", color: C.text }}>
      A IA não vende<br /><span style={{ color: C.warn }}>sozinha</span>
    </div>
    <Lousa top={760} h={620}>
      <Traco d={robo} p={1} w={8} />
      <Traco d="M 780 240 A 30 30 0 1 1 779.9 239 M 810 240 L 930 240 M 900 240 L 900 268" p={1} w={8} cor={A.hex} />
      <Traco d={xis(540, 260, 360)} p={1} w={10} cor={C.warn} />
      <Giz x={540} y={540} texto="quem decide é você" p={1} size={52} anchor="middle" cor={A.hex} />
    </Lousa>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1420, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76, filter: `drop-shadow(0 0 16px ${aa(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
