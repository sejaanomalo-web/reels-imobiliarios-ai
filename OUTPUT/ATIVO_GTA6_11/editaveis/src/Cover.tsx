import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A, Tag, aa } from "../NOV26/kit";
import { Contorno } from "../../estilos/tipografia";

/** Capa 1080×1920 — ATIVO_GTA6_11 (ESTILO 4 Tipografia cinética). Sem assets do jogo. */
export const GTA6_11Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans, overflow: "hidden" }}>
    <Background t={0} mood={0.05} accent={A} />
    <Contorno x={40} y={600} texto="?" size={600} p={1} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 330, display: "flex", justifyContent: "center" }}><Tag text="EDIÇÃO ESPECIAL · GTA VI" tone="muted" size={28} /></div>
    <div style={{ position: "absolute", left: 100, top: 440, fontWeight: 800, fontSize: 100, lineHeight: 0.94, letterSpacing: "-0.05em", color: C.text }}>
      “Contato direto<br />com a <span style={{ color: A.hex, textShadow: `0 0 50px ${aa(0.3)}` }}>natureza</span>”
    </div>
    <div style={{ position: "absolute", left: 100, top: 760, fontWeight: 800, fontSize: 96, color: C.warn, letterSpacing: "-0.04em", transform: "rotate(-3deg)" }}>Qual natureza?</div>
    <svg width={1080} height={300} style={{ position: "absolute", left: 0, top: 940 }}>
      {[0, 1].map((k) => <g key={k} transform={`translate(${420 + k * 160} 120)`}><ellipse rx={56} ry={34} fill="none" stroke={C.text} strokeWidth={7} /><circle r={14} fill={C.warn} /></g>)}
      {[0, 1, 2].map((k) => <path key={k} d={`M 160 ${150 + k * 34} ` + Array.from({ length: 8 }, () => "q 50 -16 100 0").join(" ")} fill="none" stroke={A.hex} strokeWidth={6} strokeLinecap="round" opacity={0.85 - k * 0.25} />)}
    </svg>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1420, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76, filter: `drop-shadow(0 0 16px ${aa(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
