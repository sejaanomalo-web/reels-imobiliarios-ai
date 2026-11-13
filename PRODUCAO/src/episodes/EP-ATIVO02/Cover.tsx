import React from "react";
import { AbsoluteFill } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { C, F } from "../../theme";
import { OPENINGS } from "./scenes/ui";

/** Capa 1080×1920 — as cinco aberturas; conteúdo crítico dentro do recorte 3:4 (y 240–1680). Sem logo (produção original sem logo: o arquivo só chegou depois; logo oficial hoje em PRODUCAO/public/brand/ativo_logo.png). */
export const ATIVO02Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={0.25} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 330, display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
      {OPENINGS.map((o, i) => (
        <div key={o} style={{ display: "flex", alignItems: "center", gap: 18, padding: "12px 30px 12px 14px", borderRadius: 40, background: C.surface, border: `2px solid ${i === 0 ? C.accent : C.line}`, transform: `translateX(${(i % 2 ? 1 : -1) * 40}px)` }}>
          <div style={{ width: 50, height: 50, borderRadius: 25, background: C.accent, color: C.accentInk, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 28 }}>{i + 1}</div>
          <span style={{ fontWeight: 800, fontSize: 40, color: C.text }}>{o}</span>
        </div>
      ))}
    </div>
    <div style={{ position: "absolute", left: 80, right: 80, top: 1010, textAlign: "center" }}>
      <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 30, letterSpacing: "0.16em", color: C.accent }}>VÍDEOS DE IMÓVEIS</div>
      <div style={{ fontWeight: 800, fontSize: 96, lineHeight: 1.0, letterSpacing: "-0.045em", color: C.text, marginTop: 20 }}>
        5 aberturas que dão <span style={{ color: C.accent }}>um motivo</span> para ver o imóvel
      </div>
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
