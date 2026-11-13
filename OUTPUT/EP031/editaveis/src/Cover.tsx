import React from "react";
import { AbsoluteFill } from "remotion";
import "../../fonts";
import { Avatar } from "../../components/Art";
import { Background, Grain } from "../../components/Background";
import { C, F } from "../../theme";
import { BROKERS } from "./scenes/ui";

/** Capa 1080×1920 — um lead, dois corretores; conteúdo crítico dentro do recorte 3:4 (y 240–1680). Sem logo (identidade ATIVO não fornecida no repositório). */
export const EP031Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={-0.2} />
    <div style={{ position: "absolute", left: 390, top: 330, width: 300, height: 100, borderRadius: 50, background: C.surface2, border: `3px solid ${C.warn}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 40, color: C.text }}>1 lead</div>
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <path d="M540 430 C 900 520, 160 520, 290 640" fill="none" stroke={C.warn} strokeWidth={8} />
      <path d="M540 430 C 180 520, 920 520, 790 640" fill="none" stroke={C.warn} strokeWidth={8} />
    </svg>
    {BROKERS.map((b, i) => (
      <div key={b.name} style={{ position: "absolute", left: [120, 620][i], top: 640, width: 340, height: 130, borderRadius: 30, background: C.surface, border: `2px solid ${C.line}`, display: "flex", alignItems: "center", gap: 16, padding: "0 20px", boxSizing: "border-box" }}>
        <Avatar size={70} label={b.ini} bg={b.bg} />
        <span style={{ fontWeight: 800, fontSize: 34, color: C.text }}>{b.name}</span>
      </div>
    ))}
    <div style={{ position: "absolute", left: 80, right: 80, top: 880, textAlign: "center" }}>
      <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 30, letterSpacing: "0.16em", color: C.accent }}>GESTÃO DE LEADS</div>
      <div style={{ fontWeight: 800, fontSize: 100, lineHeight: 1.0, letterSpacing: "-0.045em", color: C.text, marginTop: 20 }}>
        Dois corretores responderam o <span style={{ color: C.warn }}>mesmo lead</span>
      </div>
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
