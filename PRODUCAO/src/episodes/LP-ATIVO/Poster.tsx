import React from "react";
import { AbsoluteFill } from "remotion";
import "../../fonts";
import { C, F } from "../../theme";
import { Bg, Grain16, Mark, NEON, Trail } from "./kit";

/** Pôster 1920×1080 (primeiro quadro do player na landing, antes do play). Marca provisória até a logo oficial chegar. */
export const LandingPoster: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#020403", fontFamily: F.sans }}>
    <Bg t={0} glow={0.55} />
    <Trail d="M -60 980 C 520 1000, 820 760, 1060 560 S 1600 140, 2000 40" p={0.92} len={2700} width={12} tail={0.8} />
    <div style={{ position: "absolute", left: 140, top: 150 }}>
      <Mark size={84} />
    </div>
    <div style={{ position: "absolute", left: 140, top: 380, width: 1200, fontWeight: 800, fontSize: 104, lineHeight: 1.02, letterSpacing: "-0.04em", color: C.text }}>
      O sistema deve se adaptar <span style={{ color: NEON }}>a você.</span>
    </div>
    <div style={{ position: "absolute", left: 140, top: 640, fontWeight: 600, fontSize: 40, color: C.muted }}>Veja em 2 minutos como funciona o Sistema ATIVO.</div>
    <Grain16 frame={0} />
  </AbsoluteFill>
);
