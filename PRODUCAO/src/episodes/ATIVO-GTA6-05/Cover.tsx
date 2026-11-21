import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A, Tag, WARN_BG, aa } from "../NOV26/kit";

/** Capa 1080×1920 — ATIVO_GTA6_05 (ESTILO 5 Painel). Conversa HIPOTÉTICA; sem assets do jogo. Conteúdo crítico em y 240–1680. */
const B: React.FC<{ children: React.ReactNode; warn?: boolean }> = ({ children, warn }) => (
  <div style={{ alignSelf: "flex-start", maxWidth: 760, padding: "18px 26px", borderRadius: 28, borderBottomLeftRadius: 8, background: warn ? WARN_BG : C.surface, border: `2px solid ${warn ? C.warn : C.surface3}`, fontWeight: 700, fontSize: 36, lineHeight: 1.2, color: C.text }}>{children}</div>
);
export const GTA6_05Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={0.05} accent={A} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 330, display: "flex", justifyContent: "center" }}><Tag text="EDIÇÃO ESPECIAL · GTA VI" tone="muted" size={28} /></div>
    <div style={{ position: "absolute", left: 60, right: 60, top: 410, textAlign: "center", fontWeight: 800, fontSize: 104, lineHeight: 0.98, letterSpacing: "-0.05em", color: C.text }}>
      O comprador<br /><span style={{ color: C.warn }}>impossível</span>
    </div>
    <div style={{ position: "absolute", left: 120, right: 120, top: 700, display: "flex", flexDirection: "column", gap: 20 }}>
      <B>Cobertura frente mar, 6 vagas, piscina enorme…</B>
      <B>…numa rua tranquila. No centro.</B>
      <B warn>Aceita permuta por carro que eu peguei hoje?</B>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1420, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76, filter: `drop-shadow(0 0 16px ${aa(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
