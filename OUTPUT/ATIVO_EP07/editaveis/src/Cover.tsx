import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { BRAND, C, F, brandAlpha } from "../../theme";

/** Capa 1080×1920 — INDICAÇÃO ≠ ANÚNCIO + título; conteúdo crítico dentro do recorte 3:4 (y 240–1680); logo discreta. */
export const ATIVO07Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={0.1} />
    <div style={{ position: "absolute", left: 80, right: 80, top: 360, textAlign: "center", fontWeight: 800, fontSize: 104, lineHeight: 1.0, letterSpacing: "-0.045em", color: C.text }}>
      Um lead de <span style={{ color: BRAND.hex }}>anúncio</span> ainda não conhece você.
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 900, display: "flex", justifyContent: "center", alignItems: "center", gap: 30 }}>
      <div style={{ padding: "26px 34px", borderRadius: 28, background: C.surface, border: `3px solid ${BRAND.hex}`, fontFamily: F.mono, fontWeight: 700, fontSize: 40, color: C.text, boxShadow: `0 0 30px ${brandAlpha(0.3)}` }}>INDICAÇÃO</div>
      <div style={{ width: 110, height: 110, borderRadius: 55, background: C.warn, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 84 }}>≠</div>
      <div style={{ padding: "26px 34px", borderRadius: 28, background: C.surface, border: `3px solid ${C.line}`, fontFamily: F.mono, fontWeight: 700, fontSize: 40, color: C.text }}>ANÚNCIO</div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1130, textAlign: "center", fontWeight: 700, fontSize: 46, color: C.muted }}>Como fazer a primeira resposta</div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1420, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76, filter: `drop-shadow(0 0 16px ${brandAlpha(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
