import React from "react";
import { AbsoluteFill } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { C, F } from "../../theme";
import { IconPause, barH } from "./scenes/ui";

/** Capa 1080×1920 — onda de 3:00 pausada na metade; conteúdo crítico dentro do recorte 3:4 (y 240–1680). */
export const EP019Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={-0.1} />
    <div style={{ position: "absolute", left: 90, right: 90, top: 430, height: 260, display: "flex", alignItems: "center", gap: 6 }}>
      {Array.from({ length: 56 }).map((_, i) => (
        <div key={i} style={{ flex: 1, height: barH(i) * 240, borderRadius: 4, background: i < 28 ? C.accent : "rgba(195,200,208,0.5)" }} />
      ))}
    </div>
    <div style={{ position: "absolute", left: 455, top: 475, width: 170, height: 170, borderRadius: 85, background: C.warn, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 20px 60px rgba(0,0,0,0.6)" }}>
      <IconPause size={90} color={C.ink} />
    </div>
    <div style={{ position: "absolute", left: 80, right: 80, top: 800, textAlign: "center" }}>
      <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 30, letterSpacing: "0.16em", color: C.accent }}>ATENDIMENTO</div>
      <div style={{ fontWeight: 800, fontSize: 104, lineHeight: 1.0, letterSpacing: "-0.045em", color: C.text, marginTop: 20 }}>
        Áudio longo pode esconder uma <span style={{ color: C.accent }}>decisão</span>
      </div>
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
