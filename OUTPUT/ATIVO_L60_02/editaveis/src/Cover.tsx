import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A, Tag, aa } from "../NOV26/kit";

/** Capa 1080×1920 — ATIVO_L60_02 (ESTILO 5 Painel). Planilhas genéricas e ILUSTRATIVAS. */
const P: React.FC<{ x: number; y: number; r: number; k: string; v: string }> = ({ x, y, r, k, v }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 380, padding: "20px 24px", borderRadius: 20, background: C.surface, border: `2px solid ${C.surface3}`, transform: `rotate(${r}deg)` }}>
    <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: C.muted }}>{k}</div>
    <div style={{ fontWeight: 800, fontSize: 36, color: C.text, marginTop: 6 }}>{v}</div>
  </div>
);
export const L60_02Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={0.05} accent={A} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 330, display: "flex", justifyContent: "center" }}><Tag text="CARTEIRA DE IMÓVEIS" tone="muted" size={28} /></div>
    <div style={{ position: "absolute", left: 60, right: 60, top: 410, textAlign: "center", fontWeight: 800, fontSize: 104, lineHeight: 0.98, letterSpacing: "-0.05em", color: C.text }}>
      Um imóvel,<br /><span style={{ color: C.warn }}>quatro planilhas</span>
    </div>
    <P x={110} y={720} r={-4} k="PLANILHA 1" v="valor antigo" />
    <P x={590} y={700} r={3} k="PLANILHA 2" v="foto nova" />
    <P x={120} y={930} r={2} k="PLANILHA 3" v="disponível?" />
    <P x={580} y={920} r={-3} k="PLANILHA 4" v="nota do dono" />
    <div style={{ position: "absolute", left: 0, right: 0, top: 1170, display: "flex", justifyContent: "center" }}><Tag text="QUAL ESTÁ CERTA?" tone="accent" size={34} /></div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1420, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76, filter: `drop-shadow(0 0 16px ${aa(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
