import React from "react";
import { AbsoluteFill } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { C, F } from "../../theme";

/** Capa 1080×1920 — a caixa cinza "Alguma novidade?" riscada; conteúdo crítico dentro do recorte 3:4 (y 240–1680). */
export const EP016Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={-0.1} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 460, display: "flex", justifyContent: "center" }}>
      <div style={{ position: "relative", padding: "34px 60px", borderRadius: 40, borderBottomRightRadius: 12, background: "#2A2F37", border: "3px solid rgba(255,255,255,0.18)", fontWeight: 800, fontSize: 90, letterSpacing: "-0.04em", color: "#C3C8D0", transform: "rotate(-3deg)", boxShadow: "0 40px 90px rgba(0,0,0,0.6)" }}>
        Alguma novidade?
        <div style={{ position: "absolute", left: 30, right: 30, top: "52%", height: 10, borderRadius: 5, background: C.warn }} />
      </div>
    </div>
    <div style={{ position: "absolute", left: 80, right: 80, top: 860, textAlign: "center" }}>
      <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 30, letterSpacing: "0.16em", color: C.accent }}>ATENDIMENTO</div>
      <div style={{ fontWeight: 800, fontSize: 104, lineHeight: 1.0, letterSpacing: "-0.045em", color: C.text, marginTop: 20 }}>
        A mensagem para quem <span style={{ color: C.accent }}>sumiu</span>
      </div>
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
