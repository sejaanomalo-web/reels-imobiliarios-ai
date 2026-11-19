import React from "react";
import { BRAND, C, F } from "../../../theme";

/** Peças do ATIVO EP05 (desenhos próprios; corretores, imóvel e cliente fictícios; documento abstrato, não jurídico). */
export { Card, CheckDot } from "../../EP-ATIVO03/scenes/ui";
export { IconChat, IconPlane, IconUser, IconX, Mark, Tag } from "../../EP-ATIVO02/scenes/ui";

export const PROTOCOL = [
  { k: "AUTORIZAÇÃO", sub: "para divulgar ou negociar" },
  { k: "PAPÉIS", sub: "quem faz o quê" },
  { k: "ACORDOS", sub: "registrados por escrito" },
  { k: "FONTE ÚNICA", sub: "status sempre atualizado" },
];

/** Corretor (avatar fictício com rótulo). */
export const Broker: React.FC<{ ini: string; bg: string; label: string; role: string; ring?: boolean; size?: number }> = ({ ini, bg, label, role, ring = false, size = 150 }) => (
  <div style={{ width: size + 80, textAlign: "center", fontFamily: F.sans }}>
    <div style={{ margin: "0 auto", width: size, height: size, borderRadius: size / 2, background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: size * 0.38, color: C.text, boxSizing: "border-box", border: `5px solid ${ring ? BRAND.hex : "transparent"}`, boxShadow: "0 20px 50px rgba(0,0,0,0.55)" }}>{ini}</div>
    <div style={{ marginTop: 14, fontWeight: 800, fontSize: 34, color: C.text }}>{label}</div>
    <div style={{ marginTop: 4, fontFamily: F.mono, fontWeight: 700, fontSize: 24, letterSpacing: "0.08em", color: C.muted }}>{role}</div>
  </div>
);

/** Ícone de casa simples. */
export const House: React.FC<{ size: number; color?: string }> = ({ size, color = C.text }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1z" stroke={color} strokeWidth={1.8} strokeLinejoin="round" /></svg>
);
