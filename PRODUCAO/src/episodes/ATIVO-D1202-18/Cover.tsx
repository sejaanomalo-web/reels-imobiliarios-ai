import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { Contorno, FundoPlanta, Prancha, SOMBRA, TRACO, LINHA } from "../../estilos/planta";

const rnd = (i: number, k: number) => { const v = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453; return v - Math.floor(v); };

/** Capa 1080×1920 — ATIVO-D1202-18: a planta que cresceu sem projeto (dezenas de cômodos) e o carimbo QUASE SEM VALOR. */
export const D1202_18Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <FundoPlanta t={0} luzY={900} atm="tensao" />
    <div style={{ position: "absolute", left: 0, right: 0, top: 330, textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.18em", color: C.muted }}>CALIFÓRNIA · 1886–1922</div>
    <div style={{ position: "absolute", left: 60, right: 60, top: 400, textAlign: "center", fontWeight: 800, fontSize: 96, lineHeight: 0.98, letterSpacing: "-0.05em", color: C.text, textShadow: SOMBRA }}>
      36 anos de obra.<br /><span style={{ color: C.warn }}>Quase sem valor.</span>
    </div>
    <Prancha top={720} h={640}>
      <Contorno x={150} y={40} w={780} h={560} p={1} />
      {Array.from({ length: 40 }, (_, i) => {
        const w = 50 + rnd(i, 1) * 80, h = 40 + rnd(i, 2) * 70, x = 170 + rnd(i, 3) * (740 - w), y = 60 + rnd(i, 4) * (520 - h);
        return <rect key={i} x={x} y={y} width={w} height={h} fill="none" stroke={LINHA} strokeWidth={TRACO * 0.67} opacity={0.8} />;
      })}
      <g transform="translate(540 320) rotate(-7)">
        <rect x={-290} y={-62} width={580} height={124} rx={10} fill="rgba(10,10,12,0.92)" stroke={C.warn} strokeWidth={5} />
        <text x={0} y={20} textAnchor="middle" fill={C.warn} fontFamily="JetBrains Mono" fontWeight={700} fontSize={50}>160 CÔMODOS</text>
      </g>
    </Prancha>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1480, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76 }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
