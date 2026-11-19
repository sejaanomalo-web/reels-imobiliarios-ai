import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";

/** Peças do ATIVO CASE01 (desenhos próprios). Nenhuma imagem, perfil ou vídeo da corretora citada: tudo é ilustração genérica. */
export { Card, CheckDot, IconChat, IconDoc, IconPlane, IconStar, IconUser, IconX, Mark, Msg, Seal, Tag, Thumb } from "../../EP-ATIVO07/scenes/ui";
export { Plan } from "../../EP-ATIVO08/scenes/ui";
export { Label, People } from "../../EP-ATIVO09/scenes/ui";

/** Lista do fecho (vira o módulo IMÓVEIS na CTA): a lógica do caso aplicada à próxima gravação. */
export const STEPS = [
  { k: "DÚVIDA REAL", sub: "do comprador, antes da imagem" },
  { k: "COMO TRABALHA", sub: "o que você observa no imóvel" },
  { k: "CONVERSA", sub: "o convite no final" },
];

/** Casa genérica com cor variável (ilustração de vídeo de imóvel). */
export const HouseArt: React.FC<{ w: number; hue?: number; lit?: number }> = ({ w, hue = 0, lit = 1 }) => {
  const sky = ["#2A3A52", "#3A3350", "#24414A", "#4A3C34", "#2D3A4E", "#3B4452"][hue % 6];
  return (
    <svg width={w} height={w * 1.25} viewBox="0 0 200 250" style={{ display: "block" }}>
      <rect width="200" height="250" fill={sky} />
      <circle cx={150} cy={52} r={18} fill="#FFE2A8" opacity={0.35 * lit} />
      <rect y="190" width="200" height="60" fill="#1A2A22" />
      <path d="M26 128L100 66l74 62z" fill="#3A434F" />
      <rect x="40" y="126" width="120" height="76" fill="#26303A" />
      <rect x="56" y="142" width="30" height="24" rx="3" fill={`rgba(255,214,150,${0.35 + 0.6 * lit})`} />
      <rect x="114" y="142" width="30" height="24" rx="3" fill="rgba(255,255,255,0.18)" />
      <rect x="88" y="168" width="24" height="34" rx="2" fill="#3F4956" />
      <rect x="0" y="202" width="200" height="6" fill="#121820" />
    </svg>
  );
};

/** Moldura de celular genérica (sem interface de rede social identificável). */
export const Phone: React.FC<{ w: number; h: number; children?: React.ReactNode; glow?: number; style?: React.CSSProperties }> = ({ w, h, children, glow = 0, style }) => (
  <div style={{ position: "absolute", width: w, height: h, boxSizing: "border-box", borderRadius: w * 0.12, background: "#0C0E12", border: `6px solid ${glow > 0.5 ? brandAlpha(0.7) : "#2A3038"}`, boxShadow: `0 40px 100px rgba(0,0,0,0.65)${glow > 0 ? `, 0 0 ${50 * glow}px ${brandAlpha(0.3 * glow)}` : ""}`, overflow: "hidden", ...style }}>
    {children}
    <div style={{ position: "absolute", left: "50%", top: 14, width: w * 0.24, height: 18, marginLeft: -w * 0.12, borderRadius: 9, background: "#05060A" }} />
  </div>
);

/** Ícone de olho (visualizações). */
export const IconEye: React.FC<{ size: number; color?: string }> = ({ size, color = C.text }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z" stroke={color} strokeWidth={1.8} />
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth={1.8} />
  </svg>
);

/** Lupa. */
export const IconLens: React.FC<{ size: number; color?: string }> = ({ size, color = C.text }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="10.5" cy="10.5" r="6.5" stroke={color} strokeWidth={2} />
    <path d="M15.5 15.5L21 21" stroke={color} strokeWidth={2.4} strokeLinecap="round" />
  </svg>
);

/** Balão com "?" (dúvida). */
export const Question: React.FC<{ size: number; color?: string; ink?: string }> = ({ size, color = BRAND.hex, ink = BRAND.ink }) => (
  <div style={{ width: size, height: size, borderRadius: size * 0.3, borderBottomLeftRadius: 6, background: color, color: ink, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.sans, fontWeight: 800, fontSize: size * 0.62, flex: "none" }}>?</div>
);
