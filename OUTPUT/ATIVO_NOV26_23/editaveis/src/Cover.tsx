import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A, Tag, aa } from "../NOV26/kit";

/** Capa 1080×1920 — Black Friday de imóveis: desconto sobre qual referência? (etiqueta fictícia). Conteúdo crítico no recorte 3:4. */
export const NOV26_23Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={0.05} accent={A} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 360, display: "flex", justifyContent: "center" }}><Tag text="BLACK FRIDAY DE IMÓVEIS" tone="muted" size={30} /></div>
    <div style={{ position: "absolute", left: 340, top: 450, width: 400, boxSizing: "border-box", borderRadius: "40px 40px 24px 24px", background: "#0B0C0F", border: `5px solid ${A.hex}`, boxShadow: `0 0 50px ${aa(0.3)}`, padding: "26px 20px", display: "flex", flexDirection: "column", alignItems: "center", transform: "rotate(-6deg)" }}>
      <span style={{ fontWeight: 800, fontSize: 150, color: A.hex, letterSpacing: "-0.05em", lineHeight: 0.95 }}>-50%</span>
      <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 30, color: C.muted, marginTop: 8 }}>de quê?</span>
    </div>
    <div style={{ position: "absolute", left: 70, right: 70, top: 830, textAlign: "center", fontWeight: 800, fontSize: 82, lineHeight: 1.02, letterSpacing: "-0.04em", color: C.text }}>
      É desconto <span style={{ color: A.hex }}>real?</span>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 960, textAlign: "center", fontWeight: 700, fontSize: 46, color: C.muted }}>Compare propostas completas</div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1420, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76, filter: `drop-shadow(0 0 16px ${aa(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
