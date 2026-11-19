import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { BRAND, C, F, brandAlpha } from "../../theme";
import { STAGES } from "./scenes/ui";

/** Capa 1080×1920 — fluxo com um elo quebrado + pergunta; conteúdo crítico dentro do recorte 3:4 (y 240–1680); logo discreta. */
export const ATIVO06Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={0.1} />
    <div style={{ position: "absolute", left: 80, right: 80, top: 330, textAlign: "center", fontWeight: 800, fontSize: 100, lineHeight: 1.0, letterSpacing: "-0.045em", color: C.text }}>
      Seu atendimento tem um <span style={{ color: C.warn }}>gargalo</span>.
      <div style={{ fontSize: 64, marginTop: 24 }}>Mas onde ele está?</div>
    </div>
    <div style={{ position: "absolute", left: 290, top: 850, display: "flex", flexDirection: "column", gap: 30 }}>
      {STAGES.map((s, i) => (
        <div key={s} style={{ width: 500, height: 96, boxSizing: "border-box", borderRadius: 26, border: `3px solid ${i === 1 || i === 2 ? C.warn : BRAND.hex}`, background: C.surface, display: "flex", alignItems: "center", padding: "0 26px", fontFamily: F.mono, fontWeight: 700, fontSize: 32, color: C.text, boxShadow: i === 0 || i === 3 ? `0 0 26px ${brandAlpha(0.25)}` : "none" }}>{s}</div>
      ))}
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1420, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76, filter: `drop-shadow(0 0 16px ${brandAlpha(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
