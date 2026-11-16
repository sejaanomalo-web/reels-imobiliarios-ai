import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";
import { mix } from "../../../lib/anim";

/** Peças do ATIVO EP07 (desenhos próprios; lead, conversa e imóvel fictícios — exemplo ilustrativo, sem endereço nem preço). */
export { Card, CheckDot } from "../../EP-ATIVO03/scenes/ui";
export { IconChat, IconPlane, IconUser, IconX, Mark, Tag } from "../../EP-ATIVO02/scenes/ui";

/** Fecho do episódio: os três passos da primeira resposta. */
export const STEPS = [
  { k: "CONTEXTO", sub: "reconheça o pedido" },
  { k: "CLAREZA", sub: "um dado confirmado" },
  { k: "CONFIANÇA", sub: "um próximo passo" },
];

/** Balão de conversa. side: "in" = mensagem do lead (esquerda), "out" = do corretor (direita). */
export const Msg: React.FC<{ side: "in" | "out"; tone?: "plain" | "good" | "warn" | "dim"; size?: number; style?: React.CSSProperties; children: React.ReactNode }> = ({ side, tone = "plain", size = 36, style, children }) => {
  const bg = side === "in" ? C.surface3 : tone === "good" ? BRAND.deep : C.surface2;
  const bd = tone === "good" ? brandAlpha(0.45) : tone === "warn" ? "rgba(255,107,94,0.55)" : C.line;
  return (
    <div style={{ boxSizing: "border-box", padding: `${size * 0.5}px ${size * 0.68}px`, borderRadius: size * 0.9, [side === "in" ? "borderBottomLeftRadius" : "borderBottomRightRadius"]: 8, background: bg, border: `2px solid ${bd}`, color: tone === "dim" ? C.muted : C.text, fontFamily: F.sans, fontWeight: 700, fontSize: size, lineHeight: 1.2, letterSpacing: "-0.01em", boxShadow: "0 22px 54px rgba(0,0,0,0.45)", ...style }}>
      {children}
    </div>
  );
};

/** Miniatura de imóvel desenhada (foto ilustrativa): céu, prédio, janelas. */
export const Thumb: React.FC<{ w: number; h: number; lit?: number }> = ({ w, h, lit = 0 }) => (
  <svg width={w} height={h} viewBox="0 0 160 110" style={{ display: "block", borderRadius: 18 }}>
    <defs>
      <linearGradient id="ep07sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#2A3A52" />
        <stop offset="1" stopColor="#4C5E78" />
      </linearGradient>
    </defs>
    <rect width="160" height="110" fill="url(#ep07sky)" />
    <rect x="18" y="40" width="34" height="70" fill="#1E242D" />
    <rect x="58" y="18" width="48" height="92" fill="#262D38" />
    <rect x="112" y="48" width="32" height="62" fill="#1E242D" />
    {Array.from({ length: 12 }).map((_, i) => (
      <rect key={i} x={64 + (i % 3) * 14} y={26 + Math.floor(i / 3) * 18} width="8" height="9" fill={i === 4 || i === 7 ? `rgba(255,214,150,${mix(0.5, 0.95, lit)})` : "rgba(255,255,255,0.16)"} />
    ))}
    <rect x="0" y="100" width="160" height="10" fill="#14181E" />
  </svg>
);

/** Selo circular com ícone. */
export const Seal: React.FC<{ size: number; color: string; children: React.ReactNode; glow?: number }> = ({ size, color, children, glow = 0 }) => (
  <div style={{ width: size, height: size, borderRadius: size / 2, flex: "none", border: `4px solid ${color}`, background: C.surface, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: glow > 0 ? `0 0 ${30 * glow}px ${color === BRAND.hex ? brandAlpha(0.45) : "rgba(255,255,255,0.15)"}` : "none" }}>
    {children}
  </div>
);

type Ico = { size: number; color?: string };
export const IconDoc: React.FC<Ico> = ({ size, color = C.text }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M6 3h8l4 4v14H6z" stroke={color} strokeWidth={2} strokeLinejoin="round" /><path d="M14 3v4h4M9 12h6M9 15.5h6" stroke={color} strokeWidth={2} strokeLinecap="round" /></svg>
);
export const IconStar: React.FC<Ico> = ({ size, color = C.text }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8-4.3-4.1 5.9-.8z" stroke={color} strokeWidth={2} strokeLinejoin="round" /></svg>
);
export const IconCursor: React.FC<Ico> = ({ size, color = C.text }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M5 3l13 7-6 1.6L9.5 18z" stroke={color} strokeWidth={2} strokeLinejoin="round" /></svg>
);
