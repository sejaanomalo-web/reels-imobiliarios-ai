import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, F } from "../../theme";
import { A, Figura, FundoNoir, Holofote, NOIR, aa } from "../../estilos/pictograma";

/** Capa — ATIVO-D1202-21 (Segundo modelo): a figura diante da moldura da foto que brilha; título noir. */
export const D1202_21Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#050505", fontFamily: F.sans }}>
    <FundoNoir t={3} verde={0.25} />
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <line x1={0} y1={1220} x2={1080} y2={1220} stroke="rgba(244,244,242,0.3)" strokeWidth={2} strokeDasharray="3 9" />
      <Holofote x={540} chao={1220} w={560} />
      <g style={{ filter: "drop-shadow(0 0 12px rgba(255,255,255,0.5))" }}>
        <rect x={290} y={690} width={500} height={330} rx={8} fill="#0A0A0A" stroke={NOIR.branco} strokeWidth={4} />
        <line x1={304} y1={930} x2={776} y2={930} stroke={NOIR.linhaFraca} strokeWidth={3} />
        <rect x={580} y={745} width={150} height={115} fill="none" stroke={NOIR.branco} strokeWidth={3} />
        <path d="M 340 930 L 340 880 L 480 880 L 480 930" fill="none" stroke={NOIR.branco} strokeWidth={3} />
      </g>
      <Figura t={1} x={540} y={1220} s={1.05} pose="apontando" />
    </svg>
    <div style={{ position: "absolute", left: 40, right: 40, top: 330, textAlign: "center", fontWeight: 800, letterSpacing: "0.02em", lineHeight: 1.02 }}>
      <div style={{ fontSize: 64, color: NOIR.branco, textShadow: "0 0 30px rgba(255,255,255,0.28)" }}>A FOTO NÃO VENDE</div>
      <div style={{ fontSize: 100, color: NOIR.branco }}>O IMÓVEL</div>
      <div style={{ marginTop: 22, fontSize: 48, fontWeight: 700, color: NOIR.branco }}>vende a <span style={{ color: A.hex }}>visita</span></div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1610, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 64, filter: `drop-shadow(0 0 16px ${aa(0.35)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
