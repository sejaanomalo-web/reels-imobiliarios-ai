import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A, Tag, aa } from "../NOV26/kit";

/** Capa 1080×1920 — juros altos × R$ 72,5 bi contratados (Caixa + FGTS, 3º tri/2026); conteúdo crítico no recorte 3:4 (y 240–1680). */
export const NOV26_04Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={0.05} accent={A} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 360, display: "flex", justifyContent: "center" }}><Tag text="CAIXA + FGTS · 3º TRI 2026" tone="muted" size={30} /></div>
    <div style={{ position: "absolute", left: 60, right: 60, top: 450, textAlign: "center", fontWeight: 800, fontSize: 112, lineHeight: 0.98, letterSpacing: "-0.05em", color: C.text }}>
      JUROS ALTOS,<br /><span style={{ color: A.hex, textShadow: `0 0 50px ${aa(0.35)}` }}>R$ 72,5 BI</span>
    </div>
    <div style={{ position: "absolute", left: 70, right: 70, top: 790, textAlign: "center", fontWeight: 800, fontSize: 80, lineHeight: 1.02, letterSpacing: "-0.04em", color: C.text }}>
      Mercado <span style={{ color: C.warn }}>não é</span> interruptor
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1020, textAlign: "center", fontWeight: 700, fontSize: 46, color: C.muted }}>Olhe o recorte da notícia</div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1420, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76, filter: `drop-shadow(0 0 16px ${aa(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
