import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { BRAND, C, F, brandAlpha } from "../../theme";
import { People, PropCard, Question } from "./scenes/ui";

/** Capa 1080×1920 — mesma família, dois caminhos (pilha de fotos × "?"); conteúdo crítico no recorte 3:4 (y 240–1680). */
export const ATIVOREEL04Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={0.1} />
    <div style={{ position: "absolute", left: 70, right: 70, top: 320, textAlign: "center", fontWeight: 800, fontSize: 90, lineHeight: 1.0, letterSpacing: "-0.045em", color: C.text }}>
      Fotos primeiro ou <span style={{ color: BRAND.hex }}>perguntas primeiro?</span>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 620, display: "flex", justifyContent: "center" }}>
      <div style={{ padding: "22px 36px 16px", borderRadius: 36, background: C.surface, border: `2px solid ${C.line}` }}><People n={3} size={110} /></div>
    </div>
    <svg width={1080} height={200} style={{ position: "absolute", left: 0, top: 820 }}>
      <path d="M540 0 C540 100, 300 80, 300 190" stroke={C.muted} strokeWidth={8} fill="none" />
      <path d="M540 0 C540 100, 780 80, 780 190" stroke={BRAND.hex} strokeWidth={8} fill="none" />
    </svg>
    {[0, 1, 2].map((k) => <div key={k} style={{ position: "absolute", left: 160 + k * 40, top: 1030 + k * 20, transform: `rotate(${(k - 1) * 9}deg)` }}><PropCard w={200} i={k} dim={0.4} /></div>)}
    <div style={{ position: "absolute", left: 700, top: 1040, filter: `drop-shadow(0 0 30px ${brandAlpha(0.5)})` }}><Question size={180} /></div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1450, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76, filter: `drop-shadow(0 0 16px ${brandAlpha(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
