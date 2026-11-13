import React from "react";
import { C, F } from "../../../theme";

/** Peças visuais do EP016 (desenhos próprios; pessoas e mensagens fictícias). */
export const LEAD = { name: "Lucas F.", ini: "LF", bg: "#4E5F7A" };
export const OLD_MSG = "Alguma novidade?";
export const NEW_MSG = ["Vi", "uma", "opção", "na", "região", "que", "você", "mencionou.", "Ainda", "faz", "sentido", "procurar", "por", "ali?"];

export const Tag: React.FC<{ text: string; tone: "warn" | "accent" | "muted"; size?: number; style?: React.CSSProperties }> = ({ text, tone, size = 24, style }) => {
  const p = { warn: [C.warn, "rgba(255,107,94,0.14)"], accent: [C.accent, "rgba(58,245,132,0.14)"], muted: [C.muted, C.surface3] }[tone];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: `${size * 0.3}px ${size * 0.6}px`, borderRadius: size * 0.5, background: p[1], color: p[0], fontFamily: F.mono, fontWeight: 700, fontSize: size, letterSpacing: "0.06em", whiteSpace: "nowrap", ...style }}>
      {text}
    </span>
  );
};

type Ico = { size: number; color?: string };
export const IconUser: React.FC<Ico> = ({ size, color = C.accent }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke={color} strokeWidth={2} /><path d="M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6" stroke={color} strokeWidth={2} strokeLinecap="round" /></svg>
);
export const IconChat: React.FC<Ico> = ({ size, color = C.accent }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M4 5h16v11H9l-5 4z" stroke={color} strokeWidth={2} strokeLinejoin="round" /><path d="M8 9.5h8M8 12.5h5" stroke={color} strokeWidth={2} strokeLinecap="round" /></svg>
);
export const IconPlane: React.FC<Ico> = ({ size, color = C.accent }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M3 11.5L21 4l-6.5 16-3.2-6.8z" stroke={color} strokeWidth={2} strokeLinejoin="round" /><path d="M11.3 13.2L21 4" stroke={color} strokeWidth={2} /></svg>
);
export const IconLock: React.FC<Ico> = ({ size, color = C.muted }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><rect x="5" y="10.5" width="14" height="10" rx="2.5" stroke={color} strokeWidth={2} /><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" stroke={color} strokeWidth={2} /></svg>
);

/** Bolha de mensagem enviada pelo corretor. */
export const Bubble: React.FC<{ tone: "gray" | "green"; children: React.ReactNode; style?: React.CSSProperties; size?: number }> = ({ tone, children, style, size = 40 }) => (
  <div
    style={{
      boxSizing: "border-box",
      borderRadius: 34,
      borderBottomRightRadius: 10,
      padding: `${size * 0.55}px ${size * 0.75}px`,
      background: tone === "gray" ? "#2A2F37" : "#0E3A1F",
      border: `2px solid ${tone === "gray" ? "rgba(255,255,255,0.12)" : "rgba(58,245,132,0.4)"}`,
      color: tone === "gray" ? "#C3C8D0" : C.text,
      fontFamily: F.sans,
      fontWeight: 700,
      fontSize: size,
      lineHeight: 1.22,
      letterSpacing: "-0.01em",
      boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
      ...style,
    }}
  >
    {children}
  </div>
);
