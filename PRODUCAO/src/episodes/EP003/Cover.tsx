import React from "react";
import { AbsoluteFill } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { C, F } from "../../theme";
import { Hook } from "./scenes/Hook";
import { timeline } from "./Episode";

/** Capa 1080×1920: os cinco celulares tocando + título dentro do recorte central 3:4 (y 240–1680). */
export const EP003Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={0.2} />
    <div style={{ position: "absolute", inset: 0, transform: "translateY(-170px) scale(0.92)" }}>
      <Hook t={timeline.cues.hook_same + 0.2} tl={timeline} />
    </div>
    <AbsoluteFill style={{ background: "linear-gradient(to bottom, transparent 52%, rgba(7,8,10,0.95) 66%)" }} />
    <div style={{ position: "absolute", left: 80, right: 80, top: 1270, textAlign: "center" }}>
      <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 30, letterSpacing: "0.16em", color: C.accent }}>ROTINA DO CORRETOR</div>
      <div style={{ fontWeight: 800, fontSize: 104, lineHeight: 1.0, letterSpacing: "-0.045em", color: C.text, marginTop: 18 }}>
        5 clientes. <span style={{ color: C.accent }}>Quem primeiro?</span>
      </div>
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
