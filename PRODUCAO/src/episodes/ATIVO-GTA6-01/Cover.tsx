import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A, Tag, aa } from "../NOV26/kit";
import { Lousa, Traco, casa, circulo, seta } from "../../estilos/lousa";

/** Capa 1080×1920 — ATIVO_GTA6_01 (ESTILO 2 Desenho à mão: desenho de giz + título). Sem assets do jogo. Conteúdo crítico no recorte 3:4 (y 240–1680). */
const pad = (x: number, y: number, w = 420) => { const h = w * 0.5; return `M ${x - w * 0.3} ${y - h / 2} L ${x + w * 0.3} ${y - h / 2} Q ${x + w / 2} ${y - h / 2} ${x + w / 2} ${y} Q ${x + w * 0.52} ${y + h * 0.75} ${x + w * 0.36} ${y + h * 0.7} Q ${x + w * 0.22} ${y + h * 0.62} ${x + w * 0.16} ${y + h * 0.3} L ${x - w * 0.16} ${y + h * 0.3} Q ${x - w * 0.22} ${y + h * 0.62} ${x - w * 0.36} ${y + h * 0.7} Q ${x - w * 0.52} ${y + h * 0.75} ${x - w / 2} ${y} Q ${x - w / 2} ${y - h / 2} ${x - w * 0.3} ${y - h / 2} Z M ${x - w * 0.3} ${y - 10} L ${x - w * 0.18} ${y - 10} M ${x - w * 0.24} ${y - 34} L ${x - w * 0.24} ${y + 14}`; };
export const GTA6_01Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={0.05} accent={A} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 330, display: "flex", justifyContent: "center" }}><Tag text="EDIÇÃO ESPECIAL · GTA VI" tone="muted" size={28} /></div>
    <div style={{ position: "absolute", left: 60, right: 60, top: 410, textAlign: "center", fontWeight: 800, fontSize: 100, lineHeight: 0.98, letterSpacing: "-0.05em", color: C.text }}>
      O corretor<br />não vai jogar<br /><span style={{ color: A.hex, textShadow: `0 0 50px ${aa(0.3)}` }}>em paz</span>
    </div>
    <Lousa top={760} h={620}>
      <Traco d={pad(380, 420, 380)} p={1} w={8} />
      <Traco d={casa(800, 330, 190)} p={1} w={8} cor={A.hex} />
      <Traco d={circulo(800, 250, 170, 140)} p={1} w={6} cor={A.hex} />
      <Traco d={[[0.22, -0.06], [0.3, 0.02], [0.22, 0.1], [0.14, 0.02]].map(([a, b]) => `M ${380 + 380 * a + 11} ${420 + 380 * b} A 11 11 0 1 1 ${380 + 380 * a + 10.9} ${420 + 380 * b - 1}`).join(" ")} p={1} w={6} cor={A.hex} />
      <Traco d={seta(470, 300, 610, 250, 40)} p={1} w={7} />
    </Lousa>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1420, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76, filter: `drop-shadow(0 0 16px ${aa(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
