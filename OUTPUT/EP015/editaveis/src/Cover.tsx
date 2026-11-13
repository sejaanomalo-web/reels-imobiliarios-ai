import React from "react";
import { AbsoluteFill } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { C, F } from "../../theme";

/** Capa 1080×1920 — "Obrigado." com o ponto virando "?"; conteúdo crítico dentro do recorte 3:4 (y 240–1680). */
export const EP015Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={0.3} />
    <div style={{ position: "absolute", left: 120, top: 430, width: 840, height: 250, boxSizing: "border-box", borderRadius: 64, borderTopLeftRadius: 16, background: C.surface2, border: `2px solid ${C.line}`, display: "flex", alignItems: "center", paddingLeft: 64, fontWeight: 800, fontSize: 132, letterSpacing: "-0.04em", color: C.text, boxShadow: "0 40px 90px rgba(0,0,0,0.6)" }}>
      Obrigado
      <span style={{ display: "inline-flex", flexShrink: 0, width: 140, height: 140, borderRadius: 70, marginLeft: 18, background: C.accent, color: C.accentInk, alignItems: "center", justifyContent: "center", fontSize: 120, boxShadow: "0 0 90px rgba(53,224,161,0.5)" }}>?</span>
    </div>
    <div style={{ position: "absolute", left: 80, right: 80, top: 860, textAlign: "center" }}>
      <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 30, letterSpacing: "0.16em", color: C.accent }}>ATENDIMENTO</div>
      <div style={{ fontWeight: 800, fontSize: 104, lineHeight: 1.0, letterSpacing: "-0.045em", color: C.text, marginTop: 20 }}>
        Todo atendimento precisa terminar <span style={{ color: C.accent }}>com isto</span>
      </div>
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
