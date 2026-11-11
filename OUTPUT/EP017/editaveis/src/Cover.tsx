import React from "react";
import { AbsoluteFill } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { C, F } from "../../theme";
import { IconLens } from "./scenes/ui";

/** Capa 1080×1920 — carimbo NÃO riscado virando PISTA; conteúdo crítico dentro do recorte 3:4 (y 240–1680). */
export const EP017Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={0.3} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 420, display: "flex", justifyContent: "center", alignItems: "center", gap: 36 }}>
      <div style={{ position: "relative", padding: "18px 34px", borderRadius: 28, border: `6px solid ${C.warn}`, color: C.warn, fontWeight: 800, fontSize: 90, transform: "rotate(-7deg)", opacity: 0.75 }}>
        NÃO
        <div style={{ position: "absolute", left: 14, right: 14, top: "50%", height: 8, borderRadius: 4, background: C.warn }} />
      </div>
      <span style={{ fontWeight: 800, fontSize: 90, color: C.muted }}>→</span>
      <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 34px", borderRadius: 28, border: `6px solid ${C.accent}`, background: "rgba(7,40,29,0.94)", color: C.accent, fontWeight: 800, fontSize: 90, transform: "rotate(-3deg)", boxShadow: "0 0 90px rgba(53,224,161,0.35)" }}>
        <IconLens size={80} />
        PISTA
      </div>
    </div>
    <div style={{ position: "absolute", left: 80, right: 80, top: 800, textAlign: "center" }}>
      <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 30, letterSpacing: "0.16em", color: C.accent }}>VISITAS</div>
      <div style={{ fontWeight: 800, fontSize: 100, lineHeight: 1.0, letterSpacing: "-0.045em", color: C.text, marginTop: 20 }}>
        O imóvel errado pode ensinar a <span style={{ color: C.accent }}>venda certa</span>
      </div>
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
