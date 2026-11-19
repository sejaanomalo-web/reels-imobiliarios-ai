import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";

/** Peças do ATIVO REEL10 (desenhos próprios; cenários hipotéticos — sem taxas, Selic, percentuais ou previsão de preço). */
export { CheckDot, IconChat, IconPlane, IconUser, Label, Mark, People, Question, Tag } from "../../EP-ATIVO-CASE01/scenes/ui";
export { PropCard } from "../../EP-ATIVO-REEL04/scenes/ui";

/** Perguntas do atendimento (lista do fecho; vira o módulo IMÓVEIS na CTA). */
export const STEPS = [
  { k: "VAI FINANCIAR?", sub: "e o que já foi simulado" },
  { k: "PRAZO E MARGEM", sub: "o que cada lado precisa" },
  { k: "CUSTOS A CONFERIR", sub: "o que já foi verificado" },
];

/** Balança: tilt em graus (positivo = desce à direita). */
export const Balance: React.FC<{ w: number; tilt: number; left: React.ReactNode; right: React.ReactNode; leftLabel: string; rightLabel: string }> = ({ w, tilt, left, right, leftLabel, rightLabel }) => {
  const arm = w * 0.32;
  const rad = (tilt * Math.PI) / 180;
  const dy = Math.sin(rad) * arm;
  const pan = (x: number, y: number, content: React.ReactNode, label: string) => (
    <div style={{ position: "absolute", left: x - w * 0.17, top: y, width: w * 0.34, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ width: 4, height: 70, background: C.dim }} />
      <div style={{ width: "100%", minHeight: 150, boxSizing: "border-box", padding: 12, borderRadius: "0 0 40px 40px", borderTop: `6px solid ${C.muted}`, background: C.surface, display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", alignContent: "flex-end" }}>{content}</div>
      <div style={{ marginTop: 10, fontFamily: F.mono, fontWeight: 700, fontSize: 26, color: C.text }}>{label}</div>
    </div>
  );
  return (
    <div style={{ position: "relative", width: w, height: 520, fontFamily: F.sans }}>
      <div style={{ position: "absolute", left: w / 2 - 8, top: 40, width: 16, height: 420, borderRadius: 8, background: C.surface3 }} />
      <div style={{ position: "absolute", left: w / 2 - 90, top: 440, width: 180, height: 26, borderRadius: 13, background: C.surface3 }} />
      <div style={{ position: "absolute", left: w / 2 - arm, top: 40, width: arm * 2, height: 12, borderRadius: 6, background: C.muted, transform: `rotate(${tilt}deg)` }} />
      <div style={{ position: "absolute", left: w / 2 - 18, top: 28, width: 36, height: 36, borderRadius: 18, background: BRAND.hex, boxShadow: `0 0 18px ${brandAlpha(0.5)}` }} />
      {pan(w / 2 - arm * Math.cos(rad), 46 - dy, left, leftLabel)}
      {pan(w / 2 + arm * Math.cos(rad), 46 + dy, right, rightLabel)}
    </div>
  );
};

/** Ficha pequena (peso na balança). */
export const Chip: React.FC<{ text: string; tone?: "plain" | "good" | "warn"; size?: number; style?: React.CSSProperties }> = ({ text, tone = "plain", size = 26, style }) => (
  <div style={{ padding: `${size * 0.35}px ${size * 0.6}px`, borderRadius: size * 0.6, background: tone === "good" ? BRAND.deep : tone === "warn" ? "rgba(255,107,94,0.14)" : C.surface3, border: `2px solid ${tone === "good" ? BRAND.hex : tone === "warn" ? "rgba(255,107,94,0.6)" : C.line}`, color: tone === "warn" ? C.warn : C.text, fontFamily: F.sans, fontWeight: 800, fontSize: size, whiteSpace: "nowrap", ...style }}>{text}</div>
);
