import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { BRAND, C, F, brandAlpha } from "../../theme";
import { SPECS, SpecCard } from "./scenes/ui";

/** Capa 1080×1920 — ficha apagada × a pergunta; conteúdo crítico no recorte 3:4 (y 240–1680). */
export const ATIVOREEL14Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={0.1} />
    <div style={{ position: "absolute", left: 70, right: 70, top: 320, textAlign: "center", fontWeight: 800, fontSize: 86, lineHeight: 1.0, letterSpacing: "-0.045em", color: C.text }}>
      Saber tudo sobre o imóvel <span style={{ color: C.warn }}>pode não bastar</span>
    </div>
    <div style={{ position: "absolute", left: 140, top: 620 }}>
      {SPECS.map((s, i) => <div key={s} style={{ marginTop: i ? 12 : 0 }}><SpecCard text={s} w={800} dim={1} /></div>)}
    </div>
    <div style={{ position: "absolute", left: 140, right: 140, top: 1100, padding: "30px 36px", borderRadius: 36, borderBottomLeftRadius: 8, background: BRAND.deep, border: `3px solid ${BRAND.hex}`, fontWeight: 800, fontSize: 56, color: C.text, boxShadow: `0 0 40px ${brandAlpha(0.35)}` }}>
      O que mudou na <span style={{ color: BRAND.hex }}>rotina</span> de vocês?
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1450, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76, filter: `drop-shadow(0 0 16px ${brandAlpha(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
