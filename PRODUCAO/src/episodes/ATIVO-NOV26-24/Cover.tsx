import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A, Tag, aa } from "../NOV26/kit";

/** Capa 1080×1920 — incorporadora lança menos em 2027 (Eztec, segundo a imprensa) ≠ fim do luxo. Conteúdo crítico no recorte 3:4. */
export const NOV26_24Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={0.05} accent={A} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 360, display: "flex", justifyContent: "center" }}><Tag text="LANÇAMENTOS · ALTO PADRÃO · SP" tone="muted" size={28} /></div>
    <div style={{ position: "absolute", left: 60, right: 60, top: 450, textAlign: "center", fontWeight: 800, fontSize: 112, lineHeight: 0.98, letterSpacing: "-0.05em", color: C.text }}>
      Pisou no<br /><span style={{ color: A.hex, textShadow: `0 0 50px ${aa(0.3)}` }}>freio?</span>
    </div>
    <div style={{ position: "absolute", left: 70, right: 70, top: 760, textAlign: "center", fontWeight: 800, fontSize: 68, lineHeight: 1.05, color: C.text }}>
      Estoque também<br />é <span style={{ color: A.hex }}>estratégia</span>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 990, textAlign: "center", fontWeight: 700, fontSize: 46, color: C.muted }}>Leia o contexto</div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1420, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76, filter: `drop-shadow(0 0 16px ${aa(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
