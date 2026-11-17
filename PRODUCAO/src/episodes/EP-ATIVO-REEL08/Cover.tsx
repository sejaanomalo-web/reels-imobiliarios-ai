import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { BRAND, C, F, brandAlpha } from "../../theme";
import { PayNotif } from "./scenes/ui";

/** Capa 1080×1920 — comissão recebida (valor oculto) e dois caminhos; conteúdo crítico no recorte 3:4 (y 240–1680). */
export const ATIVOREEL08Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={0.1} />
    <div style={{ position: "absolute", left: 70, right: 70, top: 320, textAlign: "center", fontWeight: 800, fontSize: 92, lineHeight: 1.0, letterSpacing: "-0.045em", color: C.text }}>
      A comissão caiu. <span style={{ color: BRAND.hex }}>E a próxima carteira?</span>
    </div>
    <div style={{ position: "absolute", left: 160, top: 640 }}><PayNotif w={760} glow={1} /></div>
    <svg width={1080} height={380} style={{ position: "absolute", left: 0, top: 860 }}>
      <path d="M540 0 V110 Q540 170 330 250 L220 320" stroke={C.muted} strokeWidth={10} fill="none" strokeLinecap="round" />
      <path d="M540 110 Q540 170 750 250 L860 320" stroke={BRAND.hex} strokeWidth={10} fill="none" strokeLinecap="round" style={{ filter: `drop-shadow(0 0 10px ${brandAlpha(0.5)})` }} />
    </svg>
    <div style={{ position: "absolute", left: 90, top: 1200, fontFamily: F.mono, fontWeight: 700, fontSize: 34, color: C.muted }}>SEM HISTÓRICO</div>
    <div style={{ position: "absolute", right: 90, top: 1200, fontFamily: F.mono, fontWeight: 700, fontSize: 34, color: BRAND.hex }}>CONTINUIDADE</div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1310, textAlign: "center", fontWeight: 800, fontSize: 52, color: C.text }}>Cada atendimento ensina.</div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1450, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76, filter: `drop-shadow(0 0 16px ${brandAlpha(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
