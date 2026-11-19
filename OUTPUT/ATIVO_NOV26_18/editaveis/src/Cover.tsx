import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A, Tag, aa } from "../NOV26/kit";

/** Capa 1080×1920 — aluguel anunciado +9,01% ≠ reajuste do contrato; conteúdo crítico no recorte 3:4 (y 240–1680). */
export const NOV26_18Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={0.05} accent={A} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 360, display: "flex", justifyContent: "center" }}><Tag text="FIPEZAP · ALUGUEL ANUNCIADO · 12 MESES" tone="muted" size={28} /></div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 440, textAlign: "center" }}>
      <div style={{ fontWeight: 800, fontSize: 210, lineHeight: 0.9, letterSpacing: "-0.06em", color: A.hex, textShadow: `0 0 60px ${aa(0.3)}` }}>+9,01%</div>
    </div>
    <div style={{ position: "absolute", left: 70, right: 70, top: 760, textAlign: "center", fontWeight: 800, fontSize: 84, lineHeight: 1.02, letterSpacing: "-0.04em", color: C.text }}>
      Não é o reajuste<br /><span style={{ color: A.hex }}>do seu contrato</span>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1040, textAlign: "center", fontWeight: 700, fontSize: 46, color: C.muted }}>Índice de anúncio ≠ reajuste contratual</div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1420, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76, filter: `drop-shadow(0 0 16px ${aa(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
