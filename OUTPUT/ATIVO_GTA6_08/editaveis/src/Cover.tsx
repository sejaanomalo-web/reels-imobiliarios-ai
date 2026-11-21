import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A, Tag, aa } from "../NOV26/kit";
import { Carimbo, Comodo, FundoPlanta, Prancha } from "../../estilos/planta";

/** Capa 1080×1920 — ATIVO_GTA6_08 (ESTILO 3 Planta técnica: prancha + carimbo). Mapa ESQUEMÁTICO, não oficial. */
export const GTA6_08Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <FundoPlanta t={0} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 330, display: "flex", justifyContent: "center" }}><Tag text="EDIÇÃO ESPECIAL · GTA VI" tone="muted" size={28} /></div>
    <div style={{ position: "absolute", left: 60, right: 60, top: 410, textAlign: "center", fontWeight: 800, fontSize: 100, lineHeight: 0.98, letterSpacing: "-0.05em", color: C.text }}>
      Não é só<br /><span style={{ color: A.hex, textShadow: `0 0 50px ${aa(0.3)}` }}>Vice City</span>
    </div>
    <Prancha top={720} h={660}>
      <rect x={110} y={40} width={860} height={560} fill="none" stroke={C.text} strokeWidth={5} />
      <Comodo x={130} y={60} w={270} h={170} p={1} titulo="PORT GELLHORN" titleSize={26} tone="muted" />
      <Comodo x={410} y={60} w={220} h={170} p={1} titulo="AMBROSIA" titleSize={28} tone="muted" />
      <Comodo x={640} y={60} w={310} h={170} p={1} titulo="MOUNT KALAGA" titleSize={28} tone="muted" />
      <Comodo x={130} y={240} w={420} h={200} p={1} titulo="GRASSRIVERS" titleSize={32} tone="muted" />
      <Comodo x={560} y={240} w={390} h={260} p={1} titulo="VICE CITY" titleSize={44} />
      <text x={330} y={540} textAnchor="middle" fill={C.muted} fontFamily="JetBrains Mono" fontWeight={700} fontSize={28}>LEONIDA KEYS</text>
    </Prancha>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1420, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76, filter: `drop-shadow(0 0 16px ${aa(0.4)})` }} />
    </div>
    <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}><Carimbo x={600} y={1520} projeto="LEONIDA" folha="MAPA ESQUEMÁTICO" p={1} /></svg>
    <Grain frame={0} />
  </AbsoluteFill>
);
