import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { BRAND, C, F, brandAlpha } from "../../theme";
import { Broker, House } from "./scenes/ui";

/** Capa 1080×1920 — parceria: A e B ligados pelo imóvel; conteúdo crítico dentro do recorte 3:4 (y 240–1680); logo oficial discreta. */
export const ATIVO05Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={0.2} />
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <path d="M 230 520 L 850 520" stroke={BRAND.hex} strokeWidth={10} strokeLinecap="round" style={{ filter: `drop-shadow(0 0 12px ${brandAlpha(0.6)})` }} />
    </svg>
    <div style={{ position: "absolute", left: 115, top: 445 }}><Broker ini="A" bg="#4E6A8C" label="Corretor A" role="COMPRADOR" ring /></div>
    <div style={{ position: "absolute", left: 735, top: 445 }}><Broker ini="B" bg="#8C6A4E" label="Corretor B" role="PROPRIETÁRIO" ring /></div>
    <div style={{ position: "absolute", left: 465, top: 445, width: 150, height: 150, borderRadius: 40, background: C.surface2, border: `3px solid ${BRAND.hex}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <House size={90} />
    </div>
    <div style={{ position: "absolute", left: 80, right: 80, top: 860, textAlign: "center" }}>
      <div style={{ fontWeight: 800, fontSize: 96, lineHeight: 1.0, letterSpacing: "-0.045em", color: C.text }}>
        Parceria não começa pela <span style={{ color: BRAND.hex }}>comissão</span>
      </div>
      <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 32, letterSpacing: "0.12em", color: C.muted, marginTop: 36 }}>AUTORIZAÇÃO · PAPÉIS · ACORDOS</div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1480, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76, filter: `drop-shadow(0 0 16px ${brandAlpha(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
