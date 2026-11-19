import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A, Tag, aa } from "../NOV26/kit";

/** Capa 1080×1920 — Selic 13,75% × financiamento; conteúdo crítico no recorte 3:4 (y 240–1680); logo oficial discreta. */
export const NOV26_01Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={0.1} accent={A} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 360, display: "flex", justifyContent: "center" }}><Tag text="COPOM · 04/11/2026" tone="muted" size={30} /></div>
    <div style={{ position: "absolute", left: 60, right: 60, top: 450, textAlign: "center", fontWeight: 800, fontSize: 170, letterSpacing: "-0.05em", color: A.hex, textShadow: `0 0 50px ${aa(0.35)}` }}>13,75%</div>
    <div style={{ position: "absolute", left: 70, right: 70, top: 700, textAlign: "center", fontWeight: 800, fontSize: 92, lineHeight: 1.0, letterSpacing: "-0.045em", color: C.text }}>
      Selic parada. Por que o financiamento <span style={{ color: C.warn }}>ainda pesa?</span>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1130, textAlign: "center", fontWeight: 700, fontSize: 48, color: C.muted }}>Selic ≠ taxa do contrato</div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1420, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76, filter: `drop-shadow(0 0 16px ${aa(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
