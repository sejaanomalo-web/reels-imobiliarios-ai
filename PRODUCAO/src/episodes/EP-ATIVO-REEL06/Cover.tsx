import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { BRAND, C, F, brandAlpha } from "../../theme";
import { Piece } from "./scenes/ui";

/** Capa 1080×1920 — capa do "manual" irônico + peças soltas; conteúdo crítico no recorte 3:4 (y 240–1680). */
export const ATIVOREEL06Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={0.1} />
    {["FOTO", "VALOR", "LEAD", "VISITA"].map((k, i) => (
      <div key={k} style={{ position: "absolute", left: [80, 760, 100, 780][i], top: [330, 380, 1180, 1140][i], transform: `rotate(${[-14, 12, 10, -10][i]}deg)`, opacity: 0.7 }}><Piece size={200} label={k} /></div>
    ))}
    <div style={{ position: "absolute", left: 230, top: 560, width: 620, height: 660, boxSizing: "border-box", borderRadius: "16px 30px 30px 16px", background: "#1A1F27", borderLeft: `22px solid ${C.warn}`, boxShadow: "0 40px 100px rgba(0,0,0,0.7)", padding: "50px 44px", transform: "rotate(-3deg)" }}>
      <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 30, letterSpacing: "0.1em", color: C.warn }}>MANUAL</div>
      <div style={{ fontWeight: 800, fontSize: 76, lineHeight: 1.0, letterSpacing: "-0.04em", color: C.text, marginTop: 20 }}>Para perder o controle da carteira</div>
      <div style={{ marginTop: 40, fontWeight: 800, fontSize: 40, color: BRAND.hex }}>(e como sair dele)</div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1450, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76, filter: `drop-shadow(0 0 16px ${brandAlpha(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
