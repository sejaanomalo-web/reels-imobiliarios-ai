import React from "react";
import { ACCENT_NOV26, C, F, accentAlpha } from "../../theme";
import { mix } from "../../lib/anim";

/**
 * Kit visual do lote "30 Reels — novembro 2026" (ATIVO-NOV26-*). Mesmo desenho dos episódios aprovados (EP02–EP09),
 * com o verde atualizado do cliente #02FB3F. Nunca usar BRAND/brandAlpha/C.accent neste lote (editorial_check bloqueia).
 */
export const A = ACCENT_NOV26;
export const aa = (a: number) => accentAlpha(A, a);
export const WARN_BG = "rgba(255,107,94,0.14)";

export const Tag: React.FC<{ text: string; tone: "warn" | "accent" | "muted"; size?: number; style?: React.CSSProperties }> = ({ text, tone, size = 24, style }) => {
  const p = { warn: [C.warn, WARN_BG], accent: [A.hex, aa(0.14)], muted: [C.muted, C.surface3] }[tone];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: `${size * 0.3}px ${size * 0.6}px`, borderRadius: size * 0.5, background: p[1], color: p[0], fontFamily: F.mono, fontWeight: 700, fontSize: size, letterSpacing: "0.06em", whiteSpace: "nowrap", ...style }}>
      {text}
    </span>
  );
};

export const Label: React.FC<{ children: React.ReactNode; color?: string; size?: number; style?: React.CSSProperties }> = ({ children, color = C.muted, size = 28, style }) => (
  <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: size, letterSpacing: "0.08em", color, ...style }}>{children}</div>
);

export const Card: React.FC<{ style?: React.CSSProperties; tone?: "plain" | "warn" | "accent"; children: React.ReactNode }> = ({ style, tone = "plain", children }) => (
  <div style={{ position: "absolute", boxSizing: "border-box", borderRadius: 30, background: C.surface, border: `2px solid ${tone === "warn" ? "rgba(255,107,94,0.55)" : tone === "accent" ? aa(0.6) : C.line}`, boxShadow: `0 30px 70px rgba(0,0,0,0.5)${tone === "accent" ? `, 0 0 40px ${aa(0.18)}` : ""}`, fontFamily: F.sans, color: C.text, ...style }}>
    {children}
  </div>
);

export const CheckDot: React.FC<{ p: number; size?: number; n?: number }> = ({ p, size = 70, n }) => (
  <div style={{ position: "relative", width: size, height: size, flex: "none" }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: size / 2, border: `4px solid ${p > 0.5 ? A.hex : C.dim}`, background: p > 0.5 ? A.hex : "transparent", boxShadow: p > 0.5 ? `0 0 26px ${aa(0.5)}` : "none", transform: `scale(${1 + 0.18 * Math.sin(Math.min(1, p) * Math.PI)})` }} />
    {p > 0.5 ? (
      <svg width={size} height={size} viewBox="0 0 24 24" style={{ position: "absolute", inset: 0 }}>
        <path d="M6.5 12.5l3.6 3.6 7.4-8" fill="none" stroke={A.ink} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={20} strokeDashoffset={20 * (1 - Math.min(1, (p - 0.5) * 2))} />
      </svg>
    ) : n !== undefined ? (
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: size * 0.46, color: C.muted }}>{n}</div>
    ) : null}
  </div>
);

type Ico = { size: number; color?: string };
export const IconX: React.FC<Ico> = ({ size, color = C.warn }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke={color} strokeWidth={3} strokeLinecap="round" /></svg>
);
export const IconUser: React.FC<Ico> = ({ size, color = A.hex }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke={color} strokeWidth={2} /><path d="M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6" stroke={color} strokeWidth={2} strokeLinecap="round" /></svg>
);
export const IconChat: React.FC<Ico> = ({ size, color = A.hex }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M4 5h16v11H9l-5 4z" stroke={color} strokeWidth={2} strokeLinejoin="round" /><path d="M8 9.5h8M8 12.5h5" stroke={color} strokeWidth={2} strokeLinecap="round" /></svg>
);
export const IconPlane: React.FC<Ico> = ({ size, color = A.hex }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M3 11.5L21 4l-6.5 16-3.2-6.8z" stroke={color} strokeWidth={2} strokeLinejoin="round" /><path d="M11.3 13.2L21 4" stroke={color} strokeWidth={2} /></svg>
);
export const IconHome: React.FC<Ico> = ({ size, color = A.hex }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M4 11l8-6.5 8 6.5V20H4z" stroke={color} strokeWidth={2} strokeLinejoin="round" /><path d="M10 20v-5h4v5" stroke={color} strokeWidth={2} /></svg>
);
export const IconDoc: React.FC<Ico> = ({ size, color = C.text }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M6 3h8l4 4v14H6z" stroke={color} strokeWidth={2} strokeLinejoin="round" /><path d="M14 3v4h4M9 12h6M9 15.5h6" stroke={color} strokeWidth={2} strokeLinecap="round" /></svg>
);
export const IconCalc: React.FC<Ico> = ({ size, color = C.text }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><rect x="5" y="3" width="14" height="18" rx="2.5" stroke={color} strokeWidth={2} /><path d="M8 7h8M8.5 12h1M11.5 12h1M14.5 12h1M8.5 15.5h1M11.5 15.5h1M14.5 15.5h1" stroke={color} strokeWidth={2} strokeLinecap="round" /></svg>
);
export const IconBank: React.FC<Ico> = ({ size, color = C.text }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M3 9.5L12 4l9 5.5M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3.5 20.5h17" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></svg>
);

export const Mark: React.FC<{ ok: boolean; size?: number }> = ({ ok, size = 52 }) => (
  <div style={{ width: size, height: size, flexShrink: 0, borderRadius: size / 2, background: ok ? A.hex : WARN_BG, border: ok ? "none" : `2px solid ${C.warn}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
    {ok ? (
      <svg width={size * 0.58} height={size * 0.58} viewBox="0 0 24 24" fill="none"><path d="M5 12.5l4.5 4.5L19 7.5" stroke={A.ink} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" /></svg>
    ) : (
      <IconX size={size * 0.5} />
    )}
  </div>
);

/** Balão de conversa. side "in" = cliente (esquerda), "out" = corretor (direita). */
export const Msg: React.FC<{ side: "in" | "out"; tone?: "plain" | "good" | "warn" | "dim"; size?: number; style?: React.CSSProperties; children: React.ReactNode }> = ({ side, tone = "plain", size = 36, style, children }) => {
  const bg = side === "in" ? C.surface3 : tone === "good" ? A.deep : C.surface2;
  const bd = tone === "good" ? aa(0.45) : tone === "warn" ? "rgba(255,107,94,0.55)" : C.line;
  return (
    <div style={{ boxSizing: "border-box", padding: `${size * 0.5}px ${size * 0.68}px`, borderRadius: size * 0.9, [side === "in" ? "borderBottomLeftRadius" : "borderBottomRightRadius"]: 8, background: bg, border: `2px solid ${bd}`, color: tone === "dim" ? C.muted : C.text, fontFamily: F.sans, fontWeight: 700, fontSize: size, lineHeight: 1.2, letterSpacing: "-0.01em", boxShadow: "0 22px 54px rgba(0,0,0,0.45)", ...style }}>
      {children}
    </div>
  );
};

/** Miniatura de imóvel desenhada (ilustrativa). */
export const Thumb: React.FC<{ w: number; h: number; lit?: number; id?: string }> = ({ w, h, lit = 0, id = "n26" }) => (
  <svg width={w} height={h} viewBox="0 0 160 110" preserveAspectRatio="xMidYMid slice" style={{ display: "block" }}>
    <defs>
      <linearGradient id={`${id}sky`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#2A3A52" />
        <stop offset="1" stopColor="#4C5E78" />
      </linearGradient>
    </defs>
    <rect width="160" height="110" fill={`url(#${id}sky)`} />
    <rect x="18" y="40" width="34" height="70" fill="#1E242D" />
    <rect x="58" y="18" width="48" height="92" fill="#262D38" />
    <rect x="112" y="48" width="32" height="62" fill="#1E242D" />
    {Array.from({ length: 12 }).map((_, i) => (
      <rect key={i} x={64 + (i % 3) * 14} y={26 + Math.floor(i / 3) * 18} width="8" height="9" fill={i === 4 || i === 7 ? `rgba(255,214,150,${mix(0.5, 0.95, lit)})` : "rgba(255,255,255,0.16)"} />
    ))}
    <rect x="0" y="100" width="160" height="10" fill="#14181E" />
  </svg>
);

/** Pessoa (ilustração), com "?" opcional. */
export const Person: React.FC<{ size: number; q?: number; t?: number; color?: string }> = ({ size, q = 0, t = 0, color = C.text }) => (
  <div style={{ position: "relative", width: size, height: size }}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke={color} strokeWidth={1.6} /><path d="M4 21c1.5-4.5 4.5-6.5 8-6.5s6.5 2 8 6.5" stroke={color} strokeWidth={1.6} strokeLinecap="round" /></svg>
    {q > 0.01 ? (
      <div style={{ position: "absolute", right: -size * 0.35, top: -size * 0.15, width: size * 0.5, height: size * 0.5, borderRadius: size, background: C.warn, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: size * 0.34, fontFamily: F.sans, transform: `scale(${mix(0.3, 1, Math.min(1.1, q))}) rotate(${Math.sin(t * 3) * 8}deg)` }}>?</div>
    ) : null}
  </div>
);

/** Barra deslizante (sem valores numéricos). */
export const Slider: React.FC<{ label: string; v: number; w?: number; color?: string }> = ({ label, v, w = 360, color = A.hex }) => (
  <div style={{ width: w }}>
    <Label size={24} color={C.muted}>{label}</Label>
    <div style={{ position: "relative", marginTop: 12, height: 12, borderRadius: 6, background: C.surface3 }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${v * 100}%`, borderRadius: 6, background: color }} />
      <div style={{ position: "absolute", left: `calc(${v * 100}% - 15px)`, top: -9, width: 30, height: 30, borderRadius: 15, background: C.text, boxShadow: "0 4px 12px rgba(0,0,0,0.5)" }} />
    </div>
  </div>
);
