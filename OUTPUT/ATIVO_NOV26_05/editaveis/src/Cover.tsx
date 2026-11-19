import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A, Tag, aa } from "../NOV26/kit";

/** Capa 1080×1920 — aprovado ≠ assinado (exemplo hipotético); conteúdo crítico no recorte 3:4 (y 240–1680). */
export const NOV26_05Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={0.05} accent={A} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 360, display: "flex", justifyContent: "center" }}><Tag text="EXEMPLO HIPOTÉTICO" tone="muted" size={30} /></div>
    <div style={{ position: "absolute", left: 60, right: 60, top: 450, textAlign: "center", fontWeight: 800, fontSize: 116, lineHeight: 0.98, letterSpacing: "-0.05em", color: C.text }}>
      APROVADO<br /><span style={{ color: C.warn }}>≠</span> <span style={{ color: A.hex, textShadow: `0 0 50px ${aa(0.35)}` }}>ASSINADO</span>
    </div>
    <div style={{ position: "absolute", left: 70, right: 70, top: 800, textAlign: "center", fontWeight: 800, fontSize: 76, lineHeight: 1.02, letterSpacing: "-0.04em", color: C.text }}>
      Não comemore <span style={{ color: C.warn }}>antes da hora</span>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1030, textAlign: "center", fontWeight: 700, fontSize: 46, color: C.muted }}>Explique o próximo passo</div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1420, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76, filter: `drop-shadow(0 0 16px ${aa(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
