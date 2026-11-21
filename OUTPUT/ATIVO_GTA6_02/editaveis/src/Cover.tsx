import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A, Tag, aa } from "../NOV26/kit";
import { Carimbo, Comodo, FundoPlanta, Porta, Prancha } from "../../estilos/planta";

/** Capa 1080×1920 — ATIVO_GTA6_02 (ESTILO 3 Planta técnica: prancha + carimbo). Sem assets do jogo. Conteúdo crítico em y 240–1680. */
export const GTA6_02Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <FundoPlanta t={0} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 330, display: "flex", justifyContent: "center" }}><Tag text="EDIÇÃO ESPECIAL · GTA VI" tone="muted" size={28} /></div>
    <div style={{ position: "absolute", left: 60, right: 60, top: 410, textAlign: "center", fontWeight: 800, fontSize: 100, lineHeight: 0.98, letterSpacing: "-0.05em", color: C.text }}>
      O magnata<br /><span style={{ color: A.hex, textShadow: `0 0 50px ${aa(0.3)}` }}>imobiliário</span><br />escondido
    </div>
    <Prancha top={780} h={620}>
      <rect x={150} y={40} width={780} height={380} fill="none" stroke={C.text} strokeWidth={6} />
      <Comodo x={150} y={40} w={390} h={190} p={1} titulo="IMÓVEIS" titleSize={36} />
      <Comodo x={540} y={40} w={390} h={190} p={1} titulo="CLUBE" titleSize={36} tone="muted" />
      <Comodo x={150} y={230} w={390} h={190} p={1} titulo="ESTÚDIO" titleSize={36} tone="muted" />
      <Comodo x={540} y={230} w={390} h={190} p={1} titulo="GRAVADORA" titleSize={34} tone="muted" />
      <Porta x={540} y={340} r={56} p={1} />
    </Prancha>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1420, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76, filter: `drop-shadow(0 0 16px ${aa(0.4)})` }} />
    </div>
    <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}><Carimbo x={600} y={1520} projeto="IMPÉRIO" folha="PERSONAGEM FICTÍCIO" p={1} /></svg>
    <Grain frame={0} />
  </AbsoluteFill>
);
