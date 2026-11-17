import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { BRAND, C, F, brandAlpha } from "../../theme";

/** Capa 1080×1920 — trilha de um passo por vez; conteúdo crítico no recorte 3:4 (y 240–1680). */
const NODES = ["PERGUNTA", "VIABILIDADE", "OPÇÕES", "VISITA"];
export const ATIVOREEL12Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={0.1} />
    <div style={{ position: "absolute", left: 70, right: 70, top: 320, textAlign: "center", fontWeight: 800, fontSize: 92, lineHeight: 1.0, letterSpacing: "-0.045em", color: C.text }}>
      O primeiro imóvel começa com <span style={{ color: BRAND.hex }}>clareza</span>
    </div>
    <div style={{ position: "absolute", left: 170, top: 790, width: 740, height: 12, borderRadius: 6, background: BRAND.hex, boxShadow: `0 0 18px ${brandAlpha(0.5)}` }} />
    {NODES.map((n, i) => (
      <div key={n} style={{ position: "absolute", left: 110 + i * 247 - 60, top: 736, width: 240, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ width: 120, height: 120, borderRadius: 60, background: BRAND.hex, color: BRAND.ink, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 56, boxShadow: `0 0 26px ${brandAlpha(0.5)}` }}>{i + 1}</div>
        <div style={{ marginTop: 16, fontWeight: 800, fontSize: 30, color: C.text }}>{n}</div>
      </div>
    ))}
    <div style={{ position: "absolute", left: 0, right: 0, top: 1150, textAlign: "center", fontWeight: 800, fontSize: 58, color: C.text }}>
      Um passo <span style={{ color: BRAND.hex }}>de cada vez.</span>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1450, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76, filter: `drop-shadow(0 0 16px ${brandAlpha(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
