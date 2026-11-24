import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, F } from "../../theme";
import { A, Figura, FundoNoir, Holofote, Icone, NOIR, aa } from "../../estilos/pictograma";

/** Capa — ATIVO-D1201-21 (Segundo modelo): o dono com a chave e o corretor com o contrato; título noir. */
export const D1201_21Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#050505", fontFamily: F.sans }}>
    <FundoNoir t={3} verde={0.3} />
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <line x1={0} y1={1220} x2={1080} y2={1220} stroke="rgba(244,244,242,0.3)" strokeWidth={2} strokeDasharray="3 9" />
      <Holofote x={540} chao={1220} w={560} />
      <Figura t={1} x={380} y={1220} s={1.1} pose="apontando" item="pasta" />
      <Figura t={1.5} x={720} y={1220} s={1.06} tom="cinza" flip item="chave" />
      <Icone nome="documento" x={540} y={820} r={60} tom="verde" brilho />
    </svg>
    <div style={{ position: "absolute", left: 40, right: 40, top: 330, textAlign: "center", fontWeight: 800, letterSpacing: "0.02em", lineHeight: 1.02 }}>
      <div style={{ fontSize: 64, color: NOIR.branco, textShadow: "0 0 30px rgba(255,255,255,0.28)" }}>EXCLUSIVIDADE</div>
      <div style={{ fontSize: 100, color: NOIR.vermelho }}>NÃO É POSSE</div>
      <div style={{ marginTop: 26, fontSize: 44, fontWeight: 700, color: NOIR.branco }}>é <span style={{ color: A.hex }}>compromisso</span></div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1610, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 64, filter: `drop-shadow(0 0 16px ${aa(0.35)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
