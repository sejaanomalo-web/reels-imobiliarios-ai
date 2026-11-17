import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { BRAND, C, F, brandAlpha } from "../../theme";
import { Bubble, Pro, Sobrado } from "./scenes/ui";

/** Capa 1080×1920 — mesmo sobrado: A "Vou anunciar!" × B com plano; conteúdo crítico no recorte 3:4 (y 240–1680). */
export const ATIVOREEL07Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={0.1} />
    <div style={{ position: "absolute", left: 70, right: 70, top: 320, textAlign: "center", fontWeight: 800, fontSize: 86, lineHeight: 1.0, letterSpacing: "-0.045em", color: C.text }}>
      O proprietário não quer só <span style={{ color: C.warn }}>mais um anúncio</span>
    </div>
    <div style={{ position: "absolute", left: 300, top: 640 }}><Sobrado w={480} /></div>
    <div style={{ position: "absolute", left: 90, top: 1060 }}><Pro who="A" size={170} /></div>
    <div style={{ position: "absolute", left: 70, top: 960 }}><Bubble text="Vou anunciar!" tone="dim" /></div>
    <div style={{ position: "absolute", left: 820, top: 1060 }}><Pro who="B" size={170} glow={1} /></div>
    <div style={{ position: "absolute", left: 640, top: 930, width: 200, padding: "16px 18px", borderRadius: 18, background: C.paper, border: `5px solid ${BRAND.hex}`, transform: "rotate(4deg)" }}>
      <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 28, color: C.ink }}>PLANO</div>
      {[0.9, 0.7, 0.8].map((w, k) => <div key={k} style={{ marginTop: 10, height: 10, width: `${w * 100}%`, borderRadius: 5, background: "#C9C5BA" }} />)}
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1300, textAlign: "center", fontWeight: 800, fontSize: 56, color: BRAND.hex }}>Prove seu processo.</div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1450, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76, filter: `drop-shadow(0 0 16px ${brandAlpha(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
