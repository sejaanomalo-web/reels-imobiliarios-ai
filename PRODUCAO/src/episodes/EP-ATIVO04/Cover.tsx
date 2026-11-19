import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { BRAND, C, F, brandAlpha } from "../../theme";
import { QUESTIONS } from "./scenes/ui";

/** Capa 1080×1920 — "o mercado esfriou?" + 4 perguntas; conteúdo crítico dentro do recorte 3:4 (y 240–1680); logo oficial discreta. */
export const ATIVO04Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={0.2} />
    <div style={{ position: "absolute", left: 80, right: 80, top: 330, textAlign: "center" }}>
      <div style={{ display: "inline-block", padding: "16px 30px", background: C.paper, color: C.ink, fontFamily: "Georgia, serif", fontWeight: 700, fontSize: 56, transform: "rotate(-3deg)" }}>MERCADO ESFRIOU?</div>
      <div style={{ fontWeight: 800, fontSize: 104, lineHeight: 1.0, letterSpacing: "-0.045em", color: C.text, marginTop: 50 }}>
        4 perguntas <span style={{ color: BRAND.hex }}>antes de culpar o mercado</span>
      </div>
    </div>
    <div style={{ position: "absolute", left: 140, right: 140, top: 1030, display: "flex", flexDirection: "column", gap: 16 }}>
      {QUESTIONS.map((q, i) => (
        <div key={q.k} style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 54, height: 54, borderRadius: 27, background: BRAND.hex, color: BRAND.ink, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 30 }}>{i + 1}</div>
          <span style={{ fontWeight: 800, fontSize: 42, color: C.text }}>{q.k}</span>
          <span style={{ fontWeight: 600, fontSize: 30, color: C.muted }}>{q.sub}</span>
        </div>
      ))}
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1480, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76, filter: `drop-shadow(0 0 16px ${brandAlpha(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
