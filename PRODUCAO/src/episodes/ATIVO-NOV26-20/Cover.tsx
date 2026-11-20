import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A, Tag, aa } from "../NOV26/kit";

/** Capa 1080×1920 — Curitiba: mais oferta, reajuste mais lento (não queda). Conteúdo crítico no recorte 3:4 (y 240–1680). */
export const NOV26_20Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={0.05} accent={A} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 360, display: "flex", justifyContent: "center" }}><Tag text="📍 CURITIBA · LOCAÇÃO" tone="muted" size={30} /></div>
    <div style={{ position: "absolute", left: 60, right: 60, top: 470, textAlign: "center", fontWeight: 800, fontSize: 112, lineHeight: 0.98, letterSpacing: "-0.05em", color: C.text }}>
      Mais oferta,<br /><span style={{ color: A.hex, textShadow: `0 0 50px ${aa(0.3)}` }}>aluguel cai?</span>
    </div>
    <div style={{ position: "absolute", left: 70, right: 70, top: 800, textAlign: "center", fontWeight: 800, fontSize: 74, lineHeight: 1.04, letterSpacing: "-0.03em", color: C.text }}>
      Desacelerar <span style={{ color: C.warn }}>não é</span> cair
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1000, textAlign: "center", fontWeight: 700, fontSize: 46, color: C.muted }}>Dado local decide</div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1420, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76, filter: `drop-shadow(0 0 16px ${aa(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
