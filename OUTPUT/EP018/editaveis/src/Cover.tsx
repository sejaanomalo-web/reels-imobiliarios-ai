import React from "react";
import { AbsoluteFill } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { C, F } from "../../theme";

/** Capa 1080×1920 — "20 LINKS ≠ 20 ARGUMENTOS"; conteúdo crítico dentro do recorte 3:4 (y 240–1680). */
export const EP018Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={-0.1} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 400, textAlign: "center", fontWeight: 800, fontSize: 190, lineHeight: 0.95, letterSpacing: "-0.05em", color: C.text }}>20 LINKS</div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 610, display: "flex", justifyContent: "center" }}>
      <div style={{ padding: "14px 38px", borderRadius: 28, border: `4px solid ${C.warn}`, background: "rgba(36,14,13,0.9)", fontWeight: 800, fontSize: 76, letterSpacing: "-0.03em", color: C.warn }}>≠ 20 ARGUMENTOS</div>
    </div>
    <div style={{ position: "absolute", left: 80, right: 80, top: 900, textAlign: "center" }}>
      <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 30, letterSpacing: "0.16em", color: C.accent }}>INDICAÇÕES</div>
      <div style={{ fontWeight: 800, fontSize: 100, lineHeight: 1.0, letterSpacing: "-0.045em", color: C.text, marginTop: 20 }}>
        Mandar 20 imóveis não é <span style={{ color: C.accent }}>personalizar</span>
      </div>
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
