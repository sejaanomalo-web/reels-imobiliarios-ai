import React from "react";
import { BRAND, C, F } from "../../../theme";

/** Peças do ATIVO REEL04 (desenhos próprios; situação hipotética — família, imóveis e conversa ilustrativos, sem valores). */
export { CheckDot, IconChat, IconPlane, IconUser, Label, Mark, Msg, People, Question, Tag, Thumb } from "../../EP-ATIVO-CASE01/scenes/ui";

/** As três perguntas (lista do fecho; vira o módulo IMÓVEIS na CTA). */
export const STEPS = [
  { k: "OBJETIVO", sub: "por que a mudança?" },
  { k: "INDISPENSÁVEL", sub: "o que não pode faltar" },
  { k: "VIABILIDADE", sub: "orçamento já orientado?" },
];

/** Cartão de imóvel genérico (foto, preço mascarado). */
export const PropCard: React.FC<{ w: number; dim?: number; ok?: boolean; i?: number }> = ({ w, dim = 0, ok = false, i = 0 }) => {
  const h = w * 0.82;
  const sky = ["#2A3A52", "#3A3350", "#24414A", "#4A3C34", "#2D3A4E"][i % 5];
  return (
    <div style={{ width: w, height: h, boxSizing: "border-box", borderRadius: w * 0.08, background: C.surface, border: `3px solid ${ok ? BRAND.hex : C.line}`, overflow: "hidden", filter: dim > 0.01 ? `grayscale(${dim}) brightness(${1 - dim * 0.4})` : undefined, boxShadow: "0 16px 40px rgba(0,0,0,0.5)" }}>
      <svg width={w} height={h * 0.62} viewBox="0 0 100 50" preserveAspectRatio="none" style={{ display: "block" }}>
        <rect width="100" height="50" fill={sky} />
        <rect x="30" y="12" width="40" height="38" fill="#262D38" />
        {Array.from({ length: 6 }).map((_, k) => <rect key={k} x={35 + (k % 3) * 11} y={17 + Math.floor(k / 3) * 12} width="6" height="6" fill={k === 4 ? "rgba(255,214,150,0.8)" : "rgba(255,255,255,0.16)"} />)}
      </svg>
      <div style={{ padding: `${w * 0.04}px ${w * 0.06}px`, fontFamily: F.mono, fontWeight: 700, fontSize: Math.max(24, w * 0.11), color: C.muted }}>R$ ••••</div>
    </div>
  );
};

/** Termômetro da conversa (warm 1 → cold 0). */
export const Thermo: React.FC<{ w: number; v: number }> = ({ w, v }) => (
  <div style={{ width: w, height: 26, borderRadius: 13, background: C.surface3, overflow: "hidden" }}>
    <div style={{ width: `${Math.max(0.06, v) * 100}%`, height: "100%", borderRadius: 13, background: v > 0.5 ? "#E5C07B" : C.cold, transition: "none" }} />
  </div>
);
