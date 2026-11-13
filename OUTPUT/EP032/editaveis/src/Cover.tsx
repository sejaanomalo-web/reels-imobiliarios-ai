import React from "react";
import { AbsoluteFill } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { C, F } from "../../theme";
import { Mark } from "./scenes/ui";

/** Capa 1080×1920 — grade de leads com e sem retorno; conteúdo crítico dentro do recorte 3:4 (y 240–1680). Sem logo (símbolo ATIVO não está no repositório). */
const HAS = [1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1];
export const EP032Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={-0.15} />
    <div style={{ position: "absolute", left: 150, top: 330, width: 780, display: "flex", flexWrap: "wrap", gap: 18 }}>
      {HAS.map((h, i) => (
        <div key={i} style={{ width: 180, height: 100, borderRadius: 20, background: C.surface, border: `2px solid ${h ? C.line : C.warn}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {h ? <Mark ok size={46} /> : <div style={{ width: 46, height: 46, borderRadius: 23, border: `4px dashed ${C.warn}` }} />}
        </div>
      ))}
    </div>
    <div style={{ position: "absolute", left: 80, right: 80, top: 790, textAlign: "center" }}>
      <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 30, letterSpacing: "0.16em", color: C.accent }}>GESTÃO DE EQUIPE</div>
      <div style={{ fontWeight: 800, fontSize: 104, lineHeight: 1.0, letterSpacing: "-0.045em", color: C.text, marginTop: 20 }}>
        Você sabe quem <span style={{ color: C.warn }}>retornou</span> ao cliente?
      </div>
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
