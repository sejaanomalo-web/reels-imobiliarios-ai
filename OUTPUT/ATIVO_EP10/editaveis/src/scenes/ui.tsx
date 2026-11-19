import React from "react";
import { C } from "../../../theme";

/** Peças do ATIVO EP10 (desenhos próprios; feed, dúvidas, pauta e fonte oficial genéricos — exemplo ilustrativo, sem valores nem regras de programa). */
export { CheckDot, HouseArt, IconChat, IconDoc, IconLens, IconPlane, IconUser, IconX, Label, Mark, People, Question, Tag } from "../../EP-ATIVO-CASE01/scenes/ui";

/** Lista do fecho (vira o módulo IMÓVEIS na CTA). */
export const STEPS = [
  { k: "DÚVIDAS", sub: "o que o comprador quer entender" },
  { k: "PAUTA", sub: "documentos, custos, comparação" },
  { k: "ATENDIMENTO", sub: "cada comprador na sua etapa" },
];

/** Sala de estar genérica (ilustração de "sala bonita"). */
export const SalaArt: React.FC<{ w: number; hue?: number }> = ({ w, hue = 0 }) => {
  const wall = ["#2E2A33", "#28323A", "#33302A", "#2A2F3A"][hue % 4];
  return (
    <svg width={w} height={w * 1.25} viewBox="0 0 200 250" style={{ display: "block" }}>
      <rect width="200" height="250" fill={wall} />
      <rect x="110" y="40" width="64" height="90" rx="4" fill="#4A5A72" />
      <path d="M142 40 V130 M110 85 H174" stroke={wall} strokeWidth="4" />
      <rect y="180" width="200" height="70" fill="#3A3128" />
      <rect x="20" y="138" width="120" height="44" rx="12" fill="#5A6170" />
      <rect x="26" y="120" width="108" height="30" rx="10" fill="#666E7E" />
      <circle cx="48" cy="60" r="16" fill="#FFE2A8" opacity="0.5" />
      <path d="M48 76 V118" stroke="#8A8F99" strokeWidth="3" />
      <rect x="150" y="150" width="30" height="30" rx="6" fill="#6B5A4A" />
    </svg>
  );
};

/** Coração (curtida) genérico. */
export const Heart: React.FC<{ size: number; color?: string }> = ({ size, color = C.text }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 20.5s-7.5-4.6-9.3-9.2C1.4 7.9 3.6 4.5 7 4.5c2 0 3.3 1.1 5 3 1.7-1.9 3-3 5-3 3.4 0 5.6 3.4 4.3 6.8-1.8 4.6-9.3 9.2-9.3 9.2z" />
  </svg>
);

/** Ícone de calendário. */
export const IconCal: React.FC<{ size: number; color?: string }> = ({ size, color = C.text }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" stroke={color} strokeWidth={1.8} />
    <path d="M3.5 10h17M8 3v4M16 3v4" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
  </svg>
);
