import React from "react";
import { C, F } from "../../../theme";

/** Peças visuais do EP019 (base EP016–EP018) (desenhos próprios; pessoas e mensagens fictícias). */
export const LEAD = { name: "Marina S.", ini: "MS", bg: "#7A5A6E" };

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

export const IconX: React.FC<Ico> = ({ size, color = C.warn }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke={color} strokeWidth={2.6} strokeLinecap="round" /></svg>
);
export const IconLens: React.FC<Ico> = ({ size, color = C.accent }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><circle cx="10.5" cy="10.5" r="6.5" stroke={color} strokeWidth={2.4} /><path d="M15.5 15.5L21 21" stroke={color} strokeWidth={2.6} strokeLinecap="round" /></svg>
);

/** Selo ✓/✕ redondo. */
export const Mark: React.FC<{ ok: boolean; size?: number }> = ({ ok, size = 52 }) => (
  <div style={{ width: size, height: size, flexShrink: 0, borderRadius: size / 2, background: ok ? C.accent : "rgba(255,107,94,0.16)", border: ok ? "none" : `2px solid ${C.warn}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
    {ok ? (
      <svg width={size * 0.58} height={size * 0.58} viewBox="0 0 24 24" fill="none"><path d="M5 12.5l4.5 4.5L19 7.5" stroke={C.accentInk} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" /></svg>
    ) : (
      <IconX size={size * 0.5} />
    )}
  </div>
);

/** Etiqueta com selo ✓/✕ que entra por mola. */
export const Verdict: React.FC<{ ok: boolean; text: string; p: number; size?: number; style?: React.CSSProperties }> = ({ ok, text, p, size = 34, style }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: 14, padding: "12px 24px 12px 12px", borderRadius: 40, background: ok ? "rgba(14,58,31,0.92)" : "rgba(58,24,22,0.92)", border: `2px solid ${ok ? "rgba(58,245,132,0.5)" : "rgba(255,107,94,0.5)"}`, opacity: Math.min(1, p * 1.6), transform: `scale(${0.6 + 0.4 * Math.min(1.08, p)})`, boxShadow: "0 18px 40px rgba(0,0,0,0.45)", whiteSpace: "nowrap", ...style }}>
    <Mark ok={ok} size={size * 1.5} />
    <span style={{ fontFamily: F.sans, fontWeight: 800, fontSize: size, color: C.text, letterSpacing: "-0.01em" }}>{text}</span>
  </div>
);

/** Barras de onda sonora determinísticas (desenho próprio). */
export const barH = (i: number) => {
  const a = Math.sin(i * 0.37) * 0.5 + Math.sin(i * 0.11 + 1.3) * 0.35 + Math.sin(i * 1.7) * 0.25;
  return 0.18 + 0.82 * Math.abs(a) / 1.1;
};

export const IconPlay: React.FC<Ico> = ({ size, color = C.text }) => (
  <svg width={size} height={size} viewBox="0 0 24 24"><path d="M7 4.5v15l12.5-7.5z" fill={color} /></svg>
);
export const IconPause: React.FC<Ico> = ({ size, color = C.text }) => (
  <svg width={size} height={size} viewBox="0 0 24 24"><rect x="5.5" y="4.5" width="4.5" height="15" rx="1.4" fill={color} /><rect x="14" y="4.5" width="4.5" height="15" rx="1.4" fill={color} /></svg>
);
