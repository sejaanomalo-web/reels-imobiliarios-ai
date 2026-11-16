import React from "react";
import { BRAND, C, F } from "../../../theme";

/** Peças do ATIVO EP09 (desenhos próprios; mapa, planta, processo e perfis fictícios — exemplo ilustrativo, sem dados locais). */
export { Card, CheckDot, IconChat, IconDoc, IconPlane, IconStar, IconUser, IconX, Mark, Msg, Seal, Tag, Thumb } from "../../EP-ATIVO07/scenes/ui";
export { Plan } from "../../EP-ATIVO08/scenes/ui";

/** Tripé do fecho (direção do roteiro). */
export const STEPS = [
  { k: "MERCADO", sub: "critérios que você conferiu" },
  { k: "ANÁLISE", sub: "para quem funciona" },
  { k: "PROCESSO", sub: "o que verificar e quando" },
];

/** Mapa fictício (quadras e ruas, sem nomes reais). */
export const MapArt: React.FC<{ w: number; h: number; p?: number }> = ({ w, h, p = 1 }) => (
  <svg width={w} height={h} viewBox="0 0 400 300" style={{ display: "block" }}>
    <rect width="400" height="300" fill="#10141A" />
    {[[20, 20, 110, 80], [150, 20, 90, 80], [270, 20, 110, 120], [20, 130, 110, 150], [150, 130, 90, 60], [150, 220, 90, 60], [270, 170, 110, 110]].map(([x, y, ww, hh], i) => (
      <rect key={i} x={x} y={y} width={ww} height={hh} rx="8" fill={i === 2 || i === 4 ? "#18241C" : "#1B2027"} opacity={0.4 + 0.6 * p} />
    ))}
    <path d="M0 112 H400 M140 0 V300 M260 0 V300 M0 205 H140" stroke="#2C333D" strokeWidth="8" strokeDasharray="600" strokeDashoffset={600 * (1 - p)} />
    <path d="M0 112 H400" stroke={BRAND.hex} strokeWidth="3" strokeDasharray="10 10" opacity={0.6 * p} />
  </svg>
);

/** Silhueta de carro (ilustração genérica de "status"). */
export const CarArt: React.FC<{ w: number }> = ({ w }) => (
  <svg width={w} height={w * 0.42} viewBox="0 0 200 84" fill="none">
    <path d="M12 60 C12 48 22 44 34 42 L58 22 C64 17 72 15 80 15 H124 C134 15 142 19 148 26 L164 42 C180 44 190 50 190 60 V66 H12 Z" fill="#2A3038" stroke="#4A525E" strokeWidth="3" />
    <path d="M64 40 L82 24 H120 L140 40 Z" fill="#1A1F26" />
    <circle cx="52" cy="66" r="14" fill="#14181E" stroke="#5A626E" strokeWidth="4" />
    <circle cx="152" cy="66" r="14" fill="#14181E" stroke="#5A626E" strokeWidth="4" />
  </svg>
);

/** Troféu (ilustração genérica). */
export const TrophyArt: React.FC<{ size: number; color?: string }> = ({ size, color = "#E5C07B" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M7 4h10v5a5 5 0 0 1-10 0z" stroke={color} strokeWidth={1.8} />
    <path d="M7 6H4.5a2.5 2.5 0 0 0 2.5 4M17 6h2.5a2.5 2.5 0 0 1-2.5 4M12 14v3M8.5 20h7l-1-3h-5z" stroke={color} strokeWidth={1.8} strokeLinejoin="round" />
  </svg>
);

/** Ícone de pessoa(s). */
export const People: React.FC<{ n: number; size: number; color?: string }> = ({ n, size, color = C.text }) => (
  <div style={{ display: "flex", gap: size * 0.05 }}>
    {Array.from({ length: n }).map((_, i) => (
      <svg key={i} width={size * (i ? 0.78 : 1)} height={size * (i ? 0.78 : 1)} viewBox="0 0 24 24" fill="none" style={{ alignSelf: "flex-end" }}>
        <circle cx="12" cy="8" r="4" stroke={color} strokeWidth={1.8} />
        <path d="M4 21c1.5-4.5 4.5-6.5 8-6.5s6.5 2 8 6.5" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      </svg>
    ))}
  </div>
);

export const Label: React.FC<{ children: React.ReactNode; color?: string; size?: number; style?: React.CSSProperties }> = ({ children, color = C.muted, size = 28, style }) => (
  <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: size, letterSpacing: "0.08em", color, ...style }}>{children}</div>
);
