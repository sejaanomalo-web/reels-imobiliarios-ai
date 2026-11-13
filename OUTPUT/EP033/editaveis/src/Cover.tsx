import React from "react";
import { AbsoluteFill } from "remotion";
import "../../fonts";
import { Avatar } from "../../components/Art";
import { Background, Grain } from "../../components/Background";
import { C, F } from "../../theme";
import { INITIALS, TEAM } from "./scenes/ui";

/** Capa 1080×1920 — oito avatares com fios embaraçados; conteúdo crítico dentro do recorte 3:4 (y 240–1680). Sem logo (símbolo ATIVO não está no repositório). */
const P = Array.from({ length: 8 }).map((_, i) => ({ x: 540 + 260 * Math.cos((i / 8) * Math.PI * 2), y: 560 + 200 * Math.sin((i / 8) * Math.PI * 2) }));
export const EP033Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={-0.2} />
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      {P.flatMap((a, i) => P.map((b, j) => (j > i ? <path key={`${i}-${j}`} d={`M${a.x} ${a.y} Q ${(a.x + b.x) / 2 + ((i + j) % 3 - 1) * 90} ${(a.y + b.y) / 2}, ${b.x} ${b.y}`} fill="none" stroke={[C.warn, C.cold, "#C3C8D0"][(i + j) % 3]} strokeWidth={3} opacity={0.6} /> : null)))}
    </svg>
    {P.map((p, i) => (
      <div key={i} style={{ position: "absolute", left: p.x - 40, top: p.y - 40 }}>
        <Avatar size={80} label={INITIALS[i]} bg={TEAM[i]} />
      </div>
    ))}
    <div style={{ position: "absolute", left: 80, right: 80, top: 860, textAlign: "center" }}>
      <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 30, letterSpacing: "0.16em", color: C.accent }}>GESTÃO</div>
      <div style={{ fontWeight: 800, fontSize: 100, lineHeight: 1.0, letterSpacing: "-0.045em", color: C.text, marginTop: 20 }}>
        Crescer a equipe pode aumentar a <span style={{ color: C.warn }}>confusão</span>
      </div>
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
