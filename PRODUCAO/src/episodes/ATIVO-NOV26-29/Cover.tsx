import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A, Tag, aa } from "../NOV26/kit";

/** Capa 1080×1920 — ATIVO_NOV26_29. Conteúdo crítico no recorte 3:4 (y 240–1680). */
export const NOV26_29Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={0.05} accent={A} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 360, display: "flex", justifyContent: "center" }}><Tag text="PERGUNTA SIMPLES · RESPOSTA CLARA" tone="muted" size={28} /></div>
    <div style={{ position: "absolute", left: 60, right: 60, top: 450, textAlign: "center", fontWeight: 800, fontSize: 112, lineHeight: 0.98, letterSpacing: "-0.05em", color: C.text }}>
      Ele pediu<br /><span style={{ color: A.hex, textShadow: `0 0 50px ${aa(0.3)}` }}>uma resposta</span>
    </div>
    <div style={{ position: "absolute", left: 70, right: 70, top: 790, textAlign: "center", fontWeight: 800, fontSize: 64, lineHeight: 1.05, color: C.text }}>
      Não cinco <span style={{ color: C.warn }}>PDFs</span>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 920, textAlign: "center", fontWeight: 700, fontSize: 46, color: C.muted }}>Clareza antes da automação</div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1420, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76, filter: `drop-shadow(0 0 16px ${aa(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
