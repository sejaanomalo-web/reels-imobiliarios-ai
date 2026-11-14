import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";

/** Peças do ATIVO EP03 (desenhos próprios; pessoas, imóveis e mensagens fictícios). */
export { IconChat, IconPlane, IconUser, IconX, Tag } from "../../EP-ATIVO02/scenes/ui";

export const Card: React.FC<{ style?: React.CSSProperties; tone?: "plain" | "warn" | "accent"; children: React.ReactNode }> = ({ style, tone = "plain", children }) => (
  <div
    style={{
      position: "absolute",
      boxSizing: "border-box",
      borderRadius: 30,
      background: C.surface,
      border: `2px solid ${tone === "warn" ? "rgba(255,107,94,0.55)" : tone === "accent" ? brandAlpha(0.6) : C.line}`,
      boxShadow: `0 30px 70px rgba(0,0,0,0.5)${tone === "accent" ? `, 0 0 40px ${brandAlpha(0.18)}` : ""}`,
      fontFamily: F.sans,
      color: C.text,
      ...style,
    }}
  >
    {children}
  </div>
);

/** Círculo de verificação (vazio → marcado). */
export const CheckDot: React.FC<{ p: number; size?: number; n?: number }> = ({ p, size = 70, n }) => (
  <div style={{ position: "relative", width: size, height: size, flex: "none" }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: size / 2, border: `4px solid ${p > 0.5 ? BRAND.hex : C.dim}`, background: p > 0.5 ? BRAND.hex : "transparent", boxShadow: p > 0.5 ? `0 0 26px ${brandAlpha(0.5)}` : "none", transform: `scale(${1 + 0.18 * Math.sin(Math.min(1, p) * Math.PI)})` }} />
    {p > 0.5 ? (
      <svg width={size} height={size} viewBox="0 0 24 24" style={{ position: "absolute", inset: 0 }}>
        <path d="M6.5 12.5l3.6 3.6 7.4-8" fill="none" stroke={BRAND.ink} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={20} strokeDashoffset={20 * (1 - Math.min(1, (p - 0.5) * 2))} />
      </svg>
    ) : n !== undefined ? (
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: size * 0.46, color: C.muted }}>{n}</div>
    ) : null}
  </div>
);

/** Despertador desenhado (sem marca). `ring` 0–1 = intensidade do toque. */
export const Clock: React.FC<{ size: number; t: number; ring: number; time?: string }> = ({ size, t, ring, time = "6:30" }) => {
  const shake = Math.sin(t * 46) * 7 * ring;
  return (
    <div style={{ position: "relative", width: size, height: size * 1.12, transform: `rotate(${shake}deg)` }}>
      {[-1, 1].map((s) => (
        <div key={s} style={{ position: "absolute", top: 0, left: size / 2 + s * size * 0.3 - size * 0.14, width: size * 0.28, height: size * 0.16, borderRadius: `${size * 0.14}px ${size * 0.14}px 4px 4px`, background: C.muted, transform: `rotate(${s * 28 + Math.sin(t * 60 + s) * 10 * ring}deg)` }} />
      ))}
      <div style={{ position: "absolute", top: size * 0.1, left: 0, width: size, height: size, borderRadius: size / 2, background: C.surface2, border: `${size * 0.04}px solid ${C.muted}`, boxShadow: "0 30px 80px rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontFamily: F.mono, fontWeight: 700, fontSize: size * 0.26, color: C.text }}>{time}</span>
      </div>
      {ring > 0.05
        ? [0, 1, 2].map((i) => {
            const k = (t * 1.6 + i / 3) % 1;
            return <div key={i} style={{ position: "absolute", left: size / 2 - size * (0.6 + k * 0.5), top: size * 0.6 - size * (0.6 + k * 0.5), width: size * (1.2 + k), height: size * (1.2 + k), borderRadius: "50%", border: `3px solid rgba(244,245,247,${0.35 * (1 - k) * ring})` }} />;
          })
        : null}
    </div>
  );
};

/** Linha de texto com rótulo mono acima. */
export const Field: React.FC<{ label: string; children: React.ReactNode; size?: number; color?: string }> = ({ label, children, size = 40, color = C.text }) => (
  <div>
    <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 26, letterSpacing: "0.1em", color: C.muted }}>{label}</div>
    <div style={{ fontWeight: 800, fontSize: size, lineHeight: 1.12, letterSpacing: "-0.02em", color, marginTop: 6 }}>{children}</div>
  </div>
);
