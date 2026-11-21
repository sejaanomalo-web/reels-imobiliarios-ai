import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A, Tag, aa } from "../NOV26/kit";
import { Carimbo, Comodo, FundoPlanta, Porta, Prancha } from "../../estilos/planta";

/** Capa 1080×1920 — ATIVO_L60_04 (ESTILO 3 Planta técnica: prancha + carimbo). Funil ILUSTRATIVO. */
export const L60_04Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <FundoPlanta t={0} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 330, display: "flex", justifyContent: "center" }}><Tag text="ANÚNCIO × ATENDIMENTO" tone="muted" size={28} /></div>
    <div style={{ position: "absolute", left: 60, right: 60, top: 410, textAlign: "center", fontWeight: 800, fontSize: 92, lineHeight: 0.98, letterSpacing: "-0.05em", color: C.text }}>
      O anúncio <span style={{ color: A.hex, textShadow: `0 0 50px ${aa(0.3)}` }}>funcionou.</span><br /><span style={{ color: C.warn }}>O atendimento não.</span>
    </div>
    <Prancha top={720} h={660}>
      <Comodo x={170} y={40} w={740} h={160} p={1} titulo="ANÚNCIO" titleSize={42} />
      <Porta x={500} y={200} r={56} p={1} />
      <Comodo x={250} y={230} w={580} h={160} p={1} titulo="1º RETORNO: ?" tone="warn" titleSize={40} />
      <Porta x={500} y={390} r={56} p={1} aberta={false} />
      <Comodo x={330} y={420} w={420} h={150} p={1} titulo="—" tone="warn" titleSize={48} />
    </Prancha>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1420, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76, filter: `drop-shadow(0 0 16px ${aa(0.4)})` }} />
    </div>
    <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}><Carimbo x={600} y={1520} projeto="FUNIL" folha="ONDE O LEAD VAZA" p={1} /></svg>
    <Grain frame={0} />
  </AbsoluteFill>
);
