import React from "react";
import { AbsoluteFill } from "remotion";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { C, F } from "../../theme";
import { BigQuote, BOX, CARD, ColdBoxBack, ColdBoxFront, LeadCard } from "./scenes/Hook";

/** Capa 1080×1920: conteúdo crítico dentro do recorte central 3:4 (y 240–1680) da grade do Instagram. */
export const EP002Cover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg0, fontFamily: F.sans }}>
    <Background t={0} mood={0} />
    <div style={{ position: "absolute", inset: 0, transform: "translateY(-10px)" }}>
      <BigQuote fill={1} outline={0} />
      <ColdBoxBack />
      <LeadCard t={0} line="quote" frost={0.6} style={{ transform: `translateY(${BOX.y - CARD.y - 120}px) rotate(5deg) scale(0.92)` }} />
      <ColdBoxFront pulse={0.25} />
    </div>
    <div style={{ position: "absolute", left: 90, right: 90, top: 1300, textAlign: "center" }}>
      <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 30, letterSpacing: "0.16em", color: C.accent }}>
        ATENDIMENTO
      </div>
      <div style={{ fontWeight: 800, fontSize: 76, lineHeight: 1.05, letterSpacing: "-0.04em", color: C.text, marginTop: 18 }}>
        A pergunta que o corretor não faz
      </div>
    </div>
    <Grain frame={0} />
  </AbsoluteFill>
);
