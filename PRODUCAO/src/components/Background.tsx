import React from "react";
import { AbsoluteFill } from "remotion";
import { C } from "../theme";

/**
 * Fundo grafite com linhas de "planta baixa" em deriva lenta, brilho ambiente e vinheta.
 * `mood` 0 = neutro, valores negativos = tensão (quente), positivos = clareza (menta).
 */
export const Background: React.FC<{ t: number; mood: number }> = ({ t, mood }) => {
  const drift = (t * 7) % 360;
  const glow =
    mood >= 0
      ? `rgba(53,224,161,${0.07 + 0.12 * mood})`
      : `rgba(255,107,94,${0.05 + 0.13 * -mood})`;
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg0 }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(1000px 1300px at 50% 40%, #171B21 0%, ${C.bg0} 78%)`,
        }}
      />
      <AbsoluteFill
        style={{
          opacity: 0.9,
          WebkitMaskImage: "radial-gradient(820px 1250px at 50% 46%, #000 0%, transparent 82%)",
          maskImage: "radial-gradient(820px 1250px at 50% 46%, #000 0%, transparent 82%)",
        }}
      >
        <svg width="1080" height="1920" style={{ position: "absolute", inset: 0 }}>
          <defs>
            <pattern
              id="planta"
              width="360"
              height="360"
              patternUnits="userSpaceOnUse"
              patternTransform={`translate(${-drift} ${-drift * 0.6})`}
            >
              <g fill="none" stroke="rgba(255,255,255,0.075)" strokeWidth="1.5">
                <path d="M0 0H360V360H0Z" />
                <path d="M0 150H130M190 150H360" />
                <path d="M130 150a60 60 0 0 1 60 -60" strokeDasharray="5 7" />
                <path d="M220 150V290M220 350V360M220 0V60" />
                <path d="M220 290a60 60 0 0 0 60 60" strokeDasharray="5 7" />
                <path d="M60 240H140M60 260H140" strokeWidth="1" />
                <rect x="262" y="40" width="56" height="34" strokeWidth="1" />
              </g>
            </pattern>
          </defs>
          <rect width="1080" height="1920" fill="url(#planta)" />
        </svg>
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          background: `radial-gradient(700px 640px at 50% 40%, ${glow} 0%, transparent 70%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(1200px 1600px at 50% 46%, transparent 58%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};

/** Granulação sutil para tirar a aparência de vetor chapado. */
export const Grain: React.FC<{ frame: number }> = ({ frame }) => (
  <AbsoluteFill style={{ opacity: 0.07, mixBlendMode: "overlay", pointerEvents: "none" }}>
    <svg width="1080" height="1920">
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={Math.floor(frame / 2) % 12} />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="1080" height="1920" filter="url(#grain)" />
    </svg>
  </AbsoluteFill>
);
