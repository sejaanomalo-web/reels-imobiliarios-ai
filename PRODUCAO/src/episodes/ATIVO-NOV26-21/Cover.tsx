import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A, Tag, aa } from "../NOV26/kit";

/** Capa 1080×1920 — "85% usados" (fala atribuída, Secovi-SP nov/2026); carteira confiável. Conteúdo crítico no recorte 3:4 (y 240–1680). */
export const NOV26_21Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={0.05} accent={A} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 360, display: "flex", justifyContent: "center" }}><Tag text="ESTIMATIVA DE EXECUTIVO · SECOVI-SP · NOV/2026" tone="muted" size={26} /></div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 430, textAlign: "center" }}>
      <div style={{ fontWeight: 800, fontSize: 250, lineHeight: 0.9, letterSpacing: "-0.06em", color: A.hex, textShadow: `0 0 60px ${aa(0.3)}` }}>85%</div>
      <div style={{ marginTop: 6, fontFamily: F.mono, fontWeight: 700, fontSize: 44, letterSpacing: "0.12em", color: C.text }}>USADOS?</div>
    </div>
    <div style={{ position: "absolute", left: 70, right: 70, top: 850, textAlign: "center", fontWeight: 800, fontSize: 80, lineHeight: 1.02, letterSpacing: "-0.04em", color: C.text }}>
      Captar <span style={{ color: C.warn }}>não é só</span><br /><span style={{ color: A.hex }}>cadastrar</span>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1110, textAlign: "center", fontWeight: 700, fontSize: 46, color: C.muted }}>Carteira confiável começa na captação</div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1420, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76, filter: `drop-shadow(0 0 16px ${aa(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
