import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A, Tag, aa } from "../NOV26/kit";

/** Capa 1080×1920 — ATIVO_L60_05 (ESTILO 5 Painel). Chama desenhada (sem emoji de plataforma). */
const CHAMA = "M 0 -120 C 40 -70 70 -40 60 10 C 52 60 20 90 0 90 C -20 90 -52 60 -60 10 C -66 -30 -30 -50 -20 -90 C -10 -60 10 -50 0 -120 Z";
export const L60_05Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={0.05} accent={A} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 330, display: "flex", justifyContent: "center" }}><Tag text="QUALIFICAÇÃO DE LEADS" tone="muted" size={28} /></div>
    <div style={{ position: "absolute", left: 60, right: 60, top: 410, textAlign: "center", fontWeight: 800, fontSize: 100, lineHeight: 0.98, letterSpacing: "-0.05em", color: C.text }}>
      Lead quente não é<br />quem manda <span style={{ color: C.warn }}>emoji</span>
    </div>
    <svg width={1080} height={420} style={{ position: "absolute", left: 0, top: 720 }}>
      <g transform="translate(330 220) scale(1.4)"><path d={CHAMA} fill={C.warn} opacity={0.9} /><path d={CHAMA} transform="scale(0.55) translate(0 40)" fill="#FFD9D4" opacity={0.6} /></g>
      <text x={560} y={170} fill={C.text} fontFamily="JetBrains Mono" fontWeight={700} fontSize={36}>PRAZO ?</text>
      <text x={560} y={230} fill={C.text} fontFamily="JetBrains Mono" fontWeight={700} fontSize={36}>CONDIÇÃO ?</text>
      <text x={560} y={290} fill={C.text} fontFamily="JetBrains Mono" fontWeight={700} fontSize={36}>VISITA ?</text>
    </svg>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1180, display: "flex", justifyContent: "center" }}><Tag text="3 PERGUNTAS ANTES" tone="accent" size={34} /></div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1420, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76, filter: `drop-shadow(0 0 16px ${aa(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
