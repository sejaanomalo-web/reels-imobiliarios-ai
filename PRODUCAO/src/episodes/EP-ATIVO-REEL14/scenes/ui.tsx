import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";

/** Peças do ATIVO REEL14 (desenhos próprios; cena ilustrativa — casal sem rosto, sem afirmar venda). */
export { CheckDot, IconChat, IconPlane, IconUser, Label, Mark, People, Question, Tag } from "../../EP-ATIVO-CASE01/scenes/ui";
export { Chip } from "../../EP-ATIVO-REEL10/scenes/ui";
export { Pro, Bubble } from "../../EP-ATIVO-REEL07/scenes/ui";

/** O que a família contou (lista do fecho; vira o módulo IMÓVEIS na CTA). */
export const STEPS = [
  { k: "O QUE MUDOU", sub: "na rotina da família" },
  { k: "O QUE PRECISA", sub: "neste momento" },
  { k: "O QUE DESTACAR", sub: "na próxima visita" },
];

/** Atributos da ficha técnica (sem valores). */
export const SPECS = ["METRAGEM", "PORCELANATO", "SALÃO DE FESTAS", "ACADEMIA"];

/** Cartão de atributo da ficha. */
export const SpecCard: React.FC<{ text: string; lit?: number; dim?: number; w?: number }> = ({ text, lit = 0, dim = 0, w = 360 }) => (
  <div style={{ width: w, boxSizing: "border-box", padding: "18px 22px", borderRadius: 22, background: lit > 0.5 ? BRAND.deep : C.surface2, border: `2px solid ${lit > 0.5 ? BRAND.hex : C.line}`, opacity: 1 - dim * 0.6, display: "flex", alignItems: "center", gap: 14, fontFamily: F.sans, boxShadow: lit > 0.5 ? `0 0 20px ${brandAlpha(0.3)}` : "0 16px 40px rgba(0,0,0,0.5)" }}>
    <div style={{ width: 16, height: 16, borderRadius: 8, background: lit > 0.5 ? BRAND.hex : C.muted, flex: "none" }} />
    <span style={{ fontWeight: 800, fontSize: 32, color: C.text, letterSpacing: "-0.01em" }}>{text}</span>
  </div>
);
