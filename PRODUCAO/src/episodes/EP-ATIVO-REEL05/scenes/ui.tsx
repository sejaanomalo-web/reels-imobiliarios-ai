import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";

/** Peças do ATIVO REEL05 (desenhos próprios; situações ilustrativas, sem números nem promessas). */
export { CheckDot, IconChat, IconPlane, IconUser, Label, Mark, People, Question, Tag } from "../../EP-ATIVO-CASE01/scenes/ui";
export { Plan } from "../../EP-ATIVO08/scenes/ui";
export { PropCard } from "../../EP-ATIVO-REEL04/scenes/ui";

/** As três atitudes (lista do fecho; vira o módulo IMÓVEIS na CTA). */
export const STEPS = [
  { k: "DIZER QUANDO NÃO SERVE", sub: "o limite evita visita frustrada" },
  { k: "ENTENDER O MOTIVO", sub: "a pergunta antes do catálogo" },
  { k: "RESPEITAR O MOMENTO", sub: "o próximo contato combinado" },
];

/** Régua 1–3 (canto superior). */
export const Count: React.FC<{ n: number; p?: number }> = ({ n, p = 1 }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, opacity: p }}>
    {[1, 2, 3].map((k) => (
      <div key={k} style={{ width: k === n ? 64 : 22, height: 22, borderRadius: 11, background: k <= n ? BRAND.hex : C.surface3, boxShadow: k === n ? `0 0 16px ${brandAlpha(0.6)}` : "none" }} />
    ))}
  </div>
);

/** Título da atitude: número grande + texto. */
export const Head: React.FC<{ n: number; text: string; p: number }> = ({ n, text, p }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 22, opacity: Math.min(1, p * 1.5), transform: `translateY(${(1 - Math.min(1, p)) * 30}px)` }}>
    <div style={{ width: 96, height: 96, borderRadius: 30, background: BRAND.hex, color: BRAND.ink, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.sans, fontWeight: 800, fontSize: 64 }}>{n}</div>
    <div style={{ fontFamily: F.sans, fontWeight: 800, fontSize: 54, lineHeight: 1.0, letterSpacing: "-0.035em", color: C.text }}>{text}</div>
  </div>
);

/** Casa em corte com escada (ilustração; `hi` acende os degraus). */
export const StairHouse: React.FC<{ w: number; hi?: number; t?: number }> = ({ w, hi = 0, t = 0 }) => {
  const steps = 9;
  return (
    <svg width={w} height={w * 0.8} viewBox="0 0 500 400" style={{ display: "block" }}>
      <rect width="500" height="400" fill="#141922" />
      <path d="M40 140 L250 30 L460 140 Z" fill="#2C343E" />
      <rect x="60" y="140" width="380" height="240" fill="#1E242D" />
      <path d="M60 260 H440" stroke="#2C333D" strokeWidth="6" />
      {Array.from({ length: steps }).map((_, i) => {
        const x = 120 + i * 26;
        const y = 370 - i * 24;
        const on = hi > (i + 1) / steps - 0.05;
        return <rect key={i} x={x} y={y} width={30} height={10 + i * 24} fill={on ? (Math.sin(t * 6 + i) > 0 ? "#E5C07B" : "#C9A86A") : "#3A424E"} />;
      })}
      <rect x="350" y="290" width="50" height="90" rx="4" fill="#39424E" />
      <rect x="320" y="170" width="80" height="60" rx="4" fill="rgba(255,214,150,0.5)" />
      <rect y="380" width="500" height="20" fill="#12161B" />
    </svg>
  );
};
