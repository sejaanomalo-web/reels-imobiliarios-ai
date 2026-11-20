import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A, Tag, aa } from "../NOV26/kit";

/** Capa 1080×1920 — ATIVO_NOV26_30. Conteúdo crítico no recorte 3:4 (y 240–1680). */
export const NOV26_30Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={0.05} accent={A} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 360, display: "flex", justifyContent: "center" }}><Tag text="CONTINUIDADE · CONTEXTO" tone="muted" size={28} /></div>
    <div style={{ position: "absolute", left: 60, right: 60, top: 450, textAlign: "center", fontWeight: 800, fontSize: 112, lineHeight: 0.98, letterSpacing: "-0.05em", color: C.text }}>
      O corretor<br /><span style={{ color: A.hex, textShadow: `0 0 50px ${aa(0.3)}` }}>digital</span> de verdade
    </div>
    <div style={{ position: "absolute", left: 70, right: 70, top: 900, textAlign: "center", fontWeight: 800, fontSize: 60, lineHeight: 1.05, color: C.text }}>
      Processo primeiro,<br /><span style={{ color: A.hex }}>ferramenta depois</span>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1420, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76, filter: `drop-shadow(0 0 16px ${aa(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
