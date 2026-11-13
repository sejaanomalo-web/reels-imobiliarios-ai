import React from "react";
import { AbsoluteFill } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { C, F } from "../../theme";
import { PATHS } from "./scenes/ui";

/** Capa 1080×1920 — três caminhos luminosos; conteúdo crítico dentro do recorte 3:4 (y 240–1680). Sem logo (arquivo oficial não está no repositório). */
export const ATIVO01Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={0.25} />
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      {[{ x: 200, y: 360 }, { x: 540, y: 320 }, { x: 880, y: 360 }].map((e, i) => {
        const d = `M540 760 C 540 600, ${e.x} 560, ${e.x} ${e.y}`;
        return (
          <g key={i}>
            <path d={d} fill="none" stroke={PATHS[i].color} strokeWidth={22} opacity={0.2} strokeLinecap="round" />
            <path d={d} fill="none" stroke={PATHS[i].color} strokeWidth={8} strokeLinecap="round" />
          </g>
        );
      })}
    </svg>
    {PATHS.map((p, i) => (
      <div key={p.k} style={{ position: "absolute", left: [80, 390, 720][i], top: [280, 240, 280][i], width: 280, textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 28, color: p.color }}>{p.k}</div>
    ))}
    <div style={{ position: "absolute", left: 80, right: 80, top: 860, textAlign: "center" }}>
      <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 30, letterSpacing: "0.16em", color: C.accent }}>ESTRATÉGIA COMERCIAL</div>
      <div style={{ fontWeight: 800, fontSize: 100, lineHeight: 1.0, letterSpacing: "-0.045em", color: C.text, marginTop: 20 }}>
        Para quem sua operação <span style={{ color: C.accent }}>realmente trabalha?</span>
      </div>
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
