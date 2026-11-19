import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";

/** Peças do ATIVO REEL12 (desenhos próprios; cena ilustrativa — sem aprovação de crédito, taxas ou banco). */
export { CheckDot, IconChat, IconPlane, IconUser, Label, Mark, People, Question, Tag } from "../../EP-ATIVO-CASE01/scenes/ui";
export { Chip } from "../../EP-ATIVO-REEL10/scenes/ui";
export { PropCard } from "../../EP-ATIVO-REEL04/scenes/ui";
export { Pro, Bubble } from "../../EP-ATIVO-REEL07/scenes/ui";

/** Jornada do comprador (lista do fecho; vira o módulo IMÓVEIS na CTA). */
export const STEPS = [
  { k: "MAIOR DÚVIDA", sub: "o que o comprador perguntou" },
  { k: "ETAPA ATUAL", sub: "viabilidade, opções ou visita" },
  { k: "PRÓXIMO PASSO", sub: "combinado com o comprador" },
];

/** Balcão de atendimento ilustrativo. */
export const Desk: React.FC<{ w: number; label: string; good?: boolean }> = ({ w, label, good = false }) => (
  <div style={{ width: w, fontFamily: F.sans }}>
    <div style={{ height: 26, borderRadius: "14px 14px 0 0", background: good ? BRAND.deep : C.surface3, border: `2px solid ${good ? brandAlpha(0.6) : C.line}` }} />
    <div style={{ height: 120, background: C.surface2, borderRadius: "0 0 18px 18px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 26, color: good ? BRAND.hex : C.muted }}>{label}</div>
  </div>
);

/** Planta baixa simples (ícone). */
export const Plan: React.FC<{ size: number; color?: string }> = ({ size, color = C.muted }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth={4}>
    <rect x="8" y="8" width="84" height="84" rx="4" />
    <path d="M8 50 H55 V92 M55 8 V30 M70 50 H92 M30 50 V70" />
  </svg>
);
