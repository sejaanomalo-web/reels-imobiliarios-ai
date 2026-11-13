import React from "react";
import { AbsoluteFill } from "remotion";
import "../../fonts";
import { C, F } from "../../theme";
import { Bg, Grain16, Mark, NEON } from "./kit";

/** Pôster 1920×1080 (primeiro quadro do player na landing, antes do play). Logo oficial (LOGO_FILE em kit.tsx). */
export const LandingPoster: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#020403", fontFamily: F.sans }}>
    <Bg t={0} glow={0.55} />
    <div style={{ position: "absolute", left: 140, top: 150 }}>
      <Mark size={80} glow={0.6} />
    </div>
    <div style={{ position: "absolute", left: 140, top: 380, width: 1200, fontWeight: 800, fontSize: 104, lineHeight: 1.02, letterSpacing: "-0.04em", color: C.text }}>
      O sistema deve se adaptar <span style={{ color: NEON }}>a você.</span>
    </div>
    <div style={{ position: "absolute", left: 140, top: 640, fontWeight: 600, fontSize: 40, color: C.muted }}>Veja em menos de 2 minutos como funciona o Sistema ATIVO.</div>
    <Grain16 frame={0} />
  </AbsoluteFill>
);
