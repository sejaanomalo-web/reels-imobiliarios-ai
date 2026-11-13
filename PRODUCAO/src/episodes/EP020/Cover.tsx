import React from "react";
import { AbsoluteFill } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { C, F } from "../../theme";
import { IconCal, IconSliders } from "./scenes/ui";

/** Capa 1080×1920 — duas rotas: VISITA CONFIRMADA × AJUSTAR BUSCA; conteúdo crítico dentro do recorte 3:4 (y 240–1680). */
export const EP020Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={0.3} />
    <div style={{ position: "absolute", left: 110, top: 400, display: "flex", gap: 30 }}>
      {[
        { t: "VISITA CONFIRMADA", i: <IconCal size={60} /> },
        { t: "AJUSTAR BUSCA", i: <IconSliders size={60} /> },
      ].map((k) => (
        <div key={k.t} style={{ width: 415, height: 260, boxSizing: "border-box", borderRadius: 36, background: C.surface, border: `3px solid ${C.accent}`, padding: "30px 30px", display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: "0 0 80px rgba(58,245,132,0.2)" }}>
          {k.i}
          <span style={{ fontWeight: 800, fontSize: 48, lineHeight: 1.0, color: C.text }}>{k.t}</span>
        </div>
      ))}
    </div>
    <div style={{ position: "absolute", left: 80, right: 80, top: 830, textAlign: "center" }}>
      <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 30, letterSpacing: "0.16em", color: C.accent }}>VISITAS</div>
      <div style={{ fontWeight: 800, fontSize: 104, lineHeight: 1.0, letterSpacing: "-0.045em", color: C.text, marginTop: 20 }}>
        Nem toda visita precisa acontecer <span style={{ color: C.accent }}>agora</span>
      </div>
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
