import React from "react";
import { BRAND, C, F } from "../../../theme";
import { mix } from "../../../lib/anim";

/** Peças do ATIVO EP04 (desenhos próprios; manchetes, anúncios e pessoas genéricos/fictícios). */
export { Card, CheckDot } from "../../EP-ATIVO03/scenes/ui";
export { IconChat, IconPlane, IconUser, IconX, Mark, Tag } from "../../EP-ATIVO02/scenes/ui";

export const QUESTIONS = [
  { k: "CONVERSAS", sub: "que você iniciou" },
  { k: "APRENDIZADO", sub: "das negociações perdidas" },
  { k: "PÚBLICO", sub: "da sua divulgação" },
  { k: "MOTIVO", sub: "de cada mudança" },
];

/** Régua "PERGUNTA n DE 4" — âncora que atravessa as quatro perguntas. */
export const Rail: React.FC<{ n: number; p: number }> = ({ n, p }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 280, display: "flex", flexDirection: "column", alignItems: "center", gap: 14, opacity: Math.min(1, p * 1.5) }}>
    <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: 30, letterSpacing: "0.14em", color: C.muted }}>
      PERGUNTA <span style={{ color: BRAND.hex }}>{n}</span> DE 4
    </div>
    <div style={{ display: "flex", gap: 12 }}>
      {[1, 2, 3, 4].map((k) => (
        <div key={k} style={{ width: 90, height: 10, borderRadius: 5, background: k < n ? BRAND.hex : k === n ? BRAND.hex : C.surface3, opacity: k < n ? 0.5 : 1, transform: k === n ? `scaleX(${mix(0.3, 1, Math.min(1, p))})` : undefined, transformOrigin: "0 50%" }} />
      ))}
    </div>
  </div>
);

/** Título de pergunta (2 linhas, grande). */
export const QTitle: React.FC<{ children: React.ReactNode; p: number; out?: number; top?: number }> = ({ children, p, out = 0, top = 380 }) =>
  p > 0.001 && out < 1 ? (
    <div style={{ position: "absolute", left: 90, right: 90, top, textAlign: "center", fontFamily: F.sans, fontWeight: 800, fontSize: 76, lineHeight: 1.02, letterSpacing: "-0.04em", color: C.text, opacity: Math.min(1, p * 1.5) * (1 - out), transform: `translateY(${(1 - Math.min(1, p)) * 40 - out * 30}px)` }}>{children}</div>
  ) : null;
