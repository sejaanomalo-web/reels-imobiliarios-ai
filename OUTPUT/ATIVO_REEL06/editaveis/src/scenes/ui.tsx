import React from "react";
import { BRAND, C, F } from "../../../theme";

/** Peças do ATIVO REEL06 (desenhos próprios; arquivos, conversas e calendário genéricos — sem marca de aplicativo, sem dados reais). */
export { CheckDot, IconChat, IconLens, IconPlane, IconUser, Label, Mark, People, Question, Tag } from "../../EP-ATIVO-CASE01/scenes/ui";
export { PropCard } from "../../EP-ATIVO-REEL04/scenes/ui";

/** As três decisões (lista do fecho; vira o módulo IMÓVEIS na CTA). */
export const STEPS = [
  { k: "REGISTRAR", sub: "onde cada dado entra" },
  { k: "ATUALIZAR", sub: "quem atualiza" },
  { k: "CONSULTAR", sub: "como você encontra depois" },
];

/** Peça de quebra-cabeça com rótulo. */
export const Piece: React.FC<{ size: number; label: string; color?: string }> = ({ size, label, color = C.surface2 }) => (
  <div style={{ position: "relative", width: size, height: size }}>
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ position: "absolute", inset: 0 }}>
      <path d="M15 25 H40 a10 10 0 1 1 20 0 H85 V50 a10 10 0 1 1 0 20 V85 H60 a10 10 0 1 0 -20 0 H15 V60 a10 10 0 1 0 0 -20 Z" fill={color} stroke={C.line} strokeWidth="2" />
    </svg>
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.mono, fontWeight: 700, fontSize: Math.max(24, size * 0.14), color: C.text }}>{label}</div>
  </div>
);

/** Miniatura de arquivo: foto de imóvel, foto pessoal (genérica), PDF ou conversa. */
export const FileTile: React.FC<{ kind: "imovel" | "pessoal" | "pdf" | "chat" | "nota"; w: number; i?: number }> = ({ kind, w, i = 0 }) => {
  const h = w;
  const base: React.CSSProperties = { width: w, height: h, borderRadius: w * 0.12, overflow: "hidden", boxSizing: "border-box", border: `2px solid ${C.line}`, position: "relative" };
  if (kind === "imovel")
    return (
      <div style={{ ...base, background: ["#2A3A52", "#3A3350", "#24414A"][i % 3] }}>
        <div style={{ position: "absolute", left: "25%", top: "30%", width: "50%", height: "70%", background: "#262D38" }} />
        <div style={{ position: "absolute", left: "35%", top: "42%", width: "12%", height: "12%", background: "rgba(255,214,150,0.8)" }} />
      </div>
    );
  if (kind === "pessoal")
    return (
      <div style={{ ...base, background: ["#3B4A3A", "#4A3B48", "#4A4436"][i % 3] }}>
        <div style={{ position: "absolute", left: "30%", top: "22%", width: "40%", height: "40%", borderRadius: "50%", background: "#8E949E" }} />
        <div style={{ position: "absolute", left: "15%", top: "66%", width: "70%", height: "40%", borderRadius: "50% 50% 0 0", background: "#8E949E" }} />
      </div>
    );
  if (kind === "pdf")
    return (
      <div style={{ ...base, background: C.paper, padding: w * 0.1 }}>
        <div style={{ fontFamily: F.mono, fontWeight: 700, fontSize: Math.max(24, w * 0.18), color: C.warn }}>PDF</div>
        {[0.8, 0.6, 0.7].map((x, k) => <div key={k} style={{ marginTop: w * 0.06, height: w * 0.05, width: `${x * 100}%`, background: "#CFCBC0", borderRadius: 3 }} />)}
      </div>
    );
  if (kind === "nota")
    return (
      <div style={{ ...base, background: "#E8D88A", padding: w * 0.1 }}>
        {[0.8, 0.5, 0.7, 0.4].map((x, k) => <div key={k} style={{ marginTop: k ? w * 0.08 : 0, height: w * 0.05, width: `${x * 100}%`, background: "#8C7E3A", borderRadius: 3 }} />)}
      </div>
    );
  return (
    <div style={{ ...base, background: C.surface2, padding: w * 0.1 }}>
      {[0.7, 0.5, 0.6].map((x, k) => <div key={k} style={{ marginTop: k ? w * 0.08 : 0, marginLeft: k % 2 ? "auto" : 0, height: w * 0.14, width: `${x * 100}%`, background: k % 2 ? BRAND.deep : C.surface3, borderRadius: w * 0.06 }} />)}
    </div>
  );
};

/** Item do manual: número + texto riscado/ironia. */
export const Rule: React.FC<{ n: string; text: string; p: number; done?: number }> = ({ n, text, p, done = 0 }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 18, opacity: Math.min(1, p * 1.5), transform: `translateX(${(1 - Math.min(1, p)) * 60}px)` }}>
    <div style={{ width: 64, height: 64, borderRadius: 18, border: `3px solid ${C.warn}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.mono, fontWeight: 700, fontSize: 28, color: C.warn, flex: "none" }}>{n}</div>
    <div style={{ fontFamily: F.sans, fontWeight: 800, fontSize: 38, letterSpacing: "-0.02em", color: C.text, flex: 1 }}>{text}</div>
    <div style={{ width: 52, height: 52, borderRadius: 12, border: `3px solid ${C.muted}`, display: "flex", alignItems: "center", justifyContent: "center", color: C.warn, fontWeight: 800, fontSize: 40, flex: "none" }}>{done > 0.5 ? "✓" : ""}</div>
  </div>
);
