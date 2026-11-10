import React from "react";
import { AbsoluteFill } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { C, F } from "../../theme";
import { PhoneFrame, PhoneList } from "./scenes/Hook";

/** Capa 1080×1920: conteúdo crítico dentro do recorte central 3:4 da grade do Instagram. */
export const EP001Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={0.2} />
    <div style={{ position: "absolute", inset: 0, perspective: 2200, transform: "translateY(-150px) scale(0.78)", transformOrigin: "540px 500px" }}>
      <PhoneFrame style={{ transform: "rotateX(8deg) rotateY(-12deg) rotateZ(1.5deg)" }}>
        <PhoneList n={2.35} speed={0} count={47} />
      </PhoneFrame>
    </div>
    <AbsoluteFill style={{ background: "linear-gradient(to bottom, transparent 44%, rgba(7,8,10,0.94) 60%)" }} />
    <div style={{ position: "absolute", left: 90, right: 90, top: 1010, textAlign: "center" }}>
      <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 32, letterSpacing: "0.16em", color: C.accent }}>
        ROTINA DO CORRETOR
      </div>
      <div style={{ fontWeight: 800, fontSize: 124, lineHeight: 1.0, letterSpacing: "-0.045em", color: C.text, marginTop: 22 }}>
        O lead
        <br />
        <span style={{ color: C.accent }}>não sumiu.</span>
      </div>
      <div style={{ fontWeight: 700, fontSize: 54, letterSpacing: "-0.03em", color: C.muted, marginTop: 30 }}>
        O histórico é que sumiu.
      </div>
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
