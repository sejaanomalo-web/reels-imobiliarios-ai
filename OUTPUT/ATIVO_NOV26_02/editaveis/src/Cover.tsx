import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A, Tag, aa } from "../NOV26/kit";

/** Capa 1080×1920 — CAIXA ESTUDA (≠ já aumentou); conteúdo crítico no recorte 3:4 (y 240–1680); logo oficial discreta. */
export const NOV26_02Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={0.05} accent={A} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 360, display: "flex", justifyContent: "center" }}><Tag text="NOTÍCIA · 13/11/2026" tone="muted" size={30} /></div>
    <div style={{ position: "absolute", left: 60, right: 60, top: 450, textAlign: "center", fontWeight: 800, fontSize: 150, lineHeight: 0.95, letterSpacing: "-0.05em", color: C.text }}>
      CAIXA<br /><span style={{ color: A.hex, textShadow: `0 0 50px ${aa(0.35)}` }}>ESTUDA</span>
    </div>
    <div style={{ position: "absolute", left: 70, right: 70, top: 820, textAlign: "center", fontWeight: 800, fontSize: 84, lineHeight: 1.02, letterSpacing: "-0.04em", color: C.text }}>
      Estudar <span style={{ color: C.warn }}>≠</span> já aumentou
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1060, textAlign: "center", fontWeight: 700, fontSize: 48, color: C.muted }}>Confira antes de prometer</div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1420, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76, filter: `drop-shadow(0 0 16px ${aa(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
