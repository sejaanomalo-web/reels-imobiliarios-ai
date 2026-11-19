import React from "react";
import { BRAND, C, F, brandAlpha } from "../../../theme";

/** Peças do ATIVO REEL13 (desenhos próprios; painel ilustrativo — não há captura real autorizada do sistema). */
export { CheckDot, IconChat, IconPlane, IconUser, Label, Mark, People, Question, Tag } from "../../EP-ATIVO-CASE01/scenes/ui";
export { Chip } from "../../EP-ATIVO-REEL10/scenes/ui";
export { PropCard } from "../../EP-ATIVO-REEL04/scenes/ui";
export { Bubble } from "../../EP-ATIVO-REEL07/scenes/ui";

/** Jornada do lead (lista do fecho; vira o módulo IMÓVEIS na CTA). */
export const STEPS = [
  { k: "O QUE PROCURA", sub: "registrado no primeiro contato" },
  { k: "MOMENTO DA DECISÃO", sub: "novo, comparando ou visita" },
  { k: "PRÓXIMA AÇÃO", sub: "dúvida, opção ou visita" },
];

export const STAGES = ["ATRAIR", "RECEBER", "ACOMPANHAR", "PRÓXIMO PASSO"];

/** Trilha das 4 etapas: on[i] 0…1 acende cada etapa; hi = etapa em destaque. */
export const Track: React.FC<{ w: number; on: number[]; hi?: number; t: number }> = ({ w, on, hi = -1, t }) => {
  const step = (w - 120) / 3;
  const lit = on.filter((x) => x > 0.5).length;
  return (
    <div style={{ position: "relative", width: w, height: 190, fontFamily: F.sans }}>
      <div style={{ position: "absolute", left: 60, top: 52, width: step * 3, height: 10, borderRadius: 5, background: C.surface3 }} />
      <div style={{ position: "absolute", left: 60, top: 52, width: step * Math.max(0, lit - 1), height: 10, borderRadius: 5, background: BRAND.hex, boxShadow: `0 0 14px ${brandAlpha(0.5)}` }} />
      {STAGES.map((s, i) => {
        const p = on[i] ?? 0;
        const isHi = i === hi;
        return (
          <div key={s} style={{ position: "absolute", left: 60 + i * step - 90, top: 0, width: 180, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: 114, height: 114, borderRadius: 57, boxSizing: "border-box", border: `5px solid ${p > 0.5 ? BRAND.hex : C.dim}`, background: p > 0.5 ? (isHi ? BRAND.hex : BRAND.deep) : C.surface, color: p > 0.5 ? (isHi ? BRAND.ink : BRAND.hex) : C.muted, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 52, transform: `scale(${1 + (isHi ? 0.06 * Math.sin(t * 4) : 0) + 0.15 * Math.sin(Math.min(1, p) * Math.PI)})`, boxShadow: isHi ? `0 0 30px ${brandAlpha(0.5)}` : "none" }}>{i + 1}</div>
            <div style={{ marginTop: 10, fontWeight: 800, fontSize: 26, color: p > 0.5 ? C.text : C.muted, textAlign: "center", lineHeight: 1.05 }}>{s}</div>
          </div>
        );
      })}
    </div>
  );
};

/** Cartão de lead ilustrativo (sem nome real). */
export const LeadChip: React.FC<{ label: string; tone?: "plain" | "good" | "dim"; w?: number }> = ({ label, tone = "plain", w = 230 }) => (
  <div style={{ width: w, boxSizing: "border-box", padding: "14px 16px", borderRadius: 20, background: tone === "good" ? BRAND.deep : C.surface2, border: `2px solid ${tone === "good" ? BRAND.hex : C.line}`, display: "flex", alignItems: "center", gap: 12, opacity: tone === "dim" ? 0.5 : 1, fontFamily: F.sans }}>
    <div style={{ width: 44, height: 44, borderRadius: 22, background: "#3A3F4A", flex: "none" }} />
    <div style={{ flex: 1 }}>
      <div style={{ height: 10, width: "80%", borderRadius: 5, background: "#4A505B" }} />
      <div style={{ marginTop: 8, fontFamily: F.mono, fontWeight: 700, fontSize: 24, color: tone === "good" ? BRAND.hex : C.muted }}>{label}</div>
    </div>
  </div>
);
