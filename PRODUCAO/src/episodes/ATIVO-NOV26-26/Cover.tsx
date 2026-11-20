import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A, Tag, aa } from "../NOV26/kit";

/** Capa 1080×1920 — 44%* dos leads fora do horário (estimativa do QuintoAndar). Conteúdo crítico no recorte 3:4 (y 240–1680). */
export const NOV26_26Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={0.05} accent={A} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 360, display: "flex", justifyContent: "center" }}><Tag text="🌙 22:00 · LEAD CHEGOU" tone="muted" size={30} /></div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 440, textAlign: "center" }}>
      <div style={{ fontWeight: 800, fontSize: 240, lineHeight: 0.9, letterSpacing: "-0.06em", color: A.hex, textShadow: `0 0 60px ${aa(0.3)}` }}>44%<span style={{ color: C.warn, fontSize: 130 }}>*</span></div>
      <div style={{ marginTop: 10, fontWeight: 800, fontSize: 56, color: C.text }}>dos leads fora do horário</div>
    </div>
    <div style={{ position: "absolute", left: 70, right: 70, top: 860, textAlign: "center", fontWeight: 800, fontSize: 72, lineHeight: 1.04, letterSpacing: "-0.03em", color: C.text }}>
      Lead recebido<br /><span style={{ color: A.hex }}>precisa ter dono</span>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1080, textAlign: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 26, color: C.muted }}>* estimativa do QuintoAndar · Secovi-SP · nov/2026</div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1420, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76, filter: `drop-shadow(0 0 16px ${aa(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
