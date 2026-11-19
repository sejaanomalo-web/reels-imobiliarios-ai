import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { BRAND, C, F } from "../../theme";
import { A, Tag, aa } from "../NOV26/kit";

/** Capa 1080×1920 — 1 quarto R$ 72,76/m² × 3 quartos R$ 47,52/m² (anunciado); m² ≠ lucro. Conteúdo crítico no recorte 3:4 (y 240–1680). */
export const NOV26_19Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={0.05} accent={A} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 360, display: "flex", justifyContent: "center" }}><Tag text="FIPEZAP · ALUGUEL ANUNCIADO · OUT/2026" tone="muted" size={28} /></div>
    <div style={{ position: "absolute", left: 90, right: 90, top: 450, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
      {[{ k: "1 QUARTO", v: "72,76", h: 300, col: A.hex }, { k: "3 QUARTOS", v: "47,52", h: 196, col: C.text }].map((x) => (
        <div key={x.k} style={{ width: 400, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <span style={{ fontWeight: 800, fontSize: 62, color: x.col, letterSpacing: "-0.03em", textShadow: x.col === A.hex ? `0 0 40px ${aa(0.35)}` : "none" }}>R$ {x.v}</span>
          <div style={{ width: 170, height: x.h, borderRadius: 20, background: x.col === A.hex ? `linear-gradient(180deg, ${A.hex}, ${aa(0.3)})` : `linear-gradient(180deg, ${C.text}, rgba(255,255,255,0.2))` }} />
          <span style={{ fontWeight: 800, fontSize: 40, color: C.text }}>{x.k}</span>
          <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, color: C.muted }}>POR M²</span>
        </div>
      ))}
    </div>
    <div style={{ position: "absolute", left: 70, right: 70, top: 1000, textAlign: "center", fontWeight: 800, fontSize: 86, lineHeight: 1.02, letterSpacing: "-0.04em", color: C.text }}>
      Valor por m² <span style={{ color: C.warn }}>≠</span> <span style={{ color: A.hex }}>lucro</span>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1130, textAlign: "center", fontWeight: 700, fontSize: 46, color: C.muted }}>Mostre a conta completa</div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1420, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(BRAND.logo)} style={{ height: 76, filter: `drop-shadow(0 0 16px ${aa(0.4)})` }} />
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
