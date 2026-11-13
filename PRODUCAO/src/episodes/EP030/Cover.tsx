import React from "react";
import { AbsoluteFill } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { C, F } from "../../theme";
import { GROUPS, GROUP_COLOR } from "./scenes/ui";

/** Capa 1080×1920 — cronômetro 15:00 + três colunas; conteúdo crítico dentro do recorte 3:4 (y 240–1680). Sem logo (produção original sem logo: o arquivo só chegou depois; logo oficial hoje em PRODUCAO/public/brand/ativo_logo.png). */
export const EP030Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={0.3} />
    <div style={{ position: "absolute", left: 340, top: 300, width: 400, height: 400, borderRadius: 200, background: "rgba(21,24,29,0.96)", border: `22px solid ${C.accent}`, boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 120, letterSpacing: "-0.04em", color: C.text, boxShadow: "0 0 90px rgba(58,245,132,0.3)" }}>15:00</div>
    <div style={{ position: "absolute", left: 90, right: 90, top: 750, display: "flex", gap: 20 }}>
      {GROUPS.map((g, i) => (
        <div key={g} style={{ flex: 1, height: 110, borderRadius: 22, background: C.surface, borderTop: `8px solid ${GROUP_COLOR[i]}`, padding: "14px 16px", boxSizing: "border-box", fontFamily: F.mono, fontWeight: 700, fontSize: 19, lineHeight: 1.25, color: GROUP_COLOR[i] }}>{g}</div>
      ))}
    </div>
    <div style={{ position: "absolute", left: 80, right: 80, top: 920, textAlign: "center" }}>
      <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 30, letterSpacing: "0.16em", color: C.accent }}>CARTEIRA</div>
      <div style={{ fontWeight: 800, fontSize: 104, lineHeight: 1.0, letterSpacing: "-0.045em", color: C.text, marginTop: 20 }}>
        A reunião de carteira de <span style={{ color: C.accent }}>15 minutos</span>
      </div>
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
