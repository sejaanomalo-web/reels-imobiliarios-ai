import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A, Tag, aa } from "../NOV26/kit";

/** Capa 1080×1920 — IA substitui corretor? Buscar ≠ orientar. Conteúdo crítico no recorte 3:4 (y 240–1680). */
export const NOV26_27Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={0.05} accent={A} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 360, display: "flex", justifyContent: "center" }}><Tag text="INTELIGÊNCIA ARTIFICIAL × CORRETOR" tone="muted" size={28} /></div>
    <div style={{ position: "absolute", left: 60, right: 60, top: 450, textAlign: "center", fontWeight: 800, fontSize: 120, lineHeight: 0.98, letterSpacing: "-0.05em", color: C.text }}>
      IA substitui<br /><span style={{ color: A.hex, textShadow: `0 0 50px ${aa(0.3)}` }}>corretor?</span>
    </div>
    <div style={{ position: "absolute", left: 70, right: 70, top: 790, textAlign: "center", fontWeight: 800, fontSize: 76, lineHeight: 1.04, color: C.text }}>
      Buscar <span style={{ color: C.warn }}>≠</span> <span style={{ color: A.hex }}>orientar</span>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 930, textAlign: "center", fontWeight: 700, fontSize: 46, color: C.muted }}>Tecnologia apoia, profissional orienta</div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1420, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76, filter: `drop-shadow(0 0 16px ${aa(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
