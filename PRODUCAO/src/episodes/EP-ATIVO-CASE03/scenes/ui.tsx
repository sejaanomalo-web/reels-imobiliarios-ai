import React from "react";
import { C } from "../../../theme";

/** Peças do ATIVO CASE03 (desenhos próprios). Nenhuma imagem, vídeo ou perfil da corretora citada: imóveis e linha do tempo são ilustrativos. */
export { CheckDot, IconChat, IconLens, IconPlane, IconUser, Label, Mark, Question, Tag } from "../../EP-ATIVO-CASE01/scenes/ui";
export { Plan } from "../../EP-ATIVO08/scenes/ui";

/** Lista do fecho (vira o módulo IMÓVEIS na CTA). */
export const STEPS = [
  { k: "ESTUDAR", sub: "materiais, circulação, contexto" },
  { k: "ENTENDER", sub: "o que o comprador vai perguntar" },
  { k: "APRESENTAR", sub: "só o que você sustenta" },
];

/** Casa de alto padrão genérica (laje plana, vidro, piscina) — ilustração editorial. */
export const LuxArt: React.FC<{ w: number; lit?: number }> = ({ w, lit = 1 }) => (
  <svg width={w} height={w * 0.62} viewBox="0 0 400 248" style={{ display: "block" }}>
    <rect width="400" height="248" fill="#1A2230" />
    <rect y="196" width="400" height="52" fill="#18201A" />
    <rect x="40" y="70" width="230" height="16" fill="#C9CED6" />
    <rect x="50" y="86" width="210" height="110" fill="#2A3240" />
    <rect x="62" y="98" width="120" height="86" fill={`rgba(255,214,150,${0.35 + 0.5 * lit})`} />
    <path d="M102 98 V184 M142 98 V184" stroke="#2A3240" strokeWidth="4" />
    <rect x="196" y="98" width="52" height="98" fill="#39424E" />
    <rect x="210" y="120" width="160" height="12" fill="#C9CED6" />
    <rect x="216" y="132" width="148" height="64" fill="#2E3644" />
    <rect x="228" y="142" width="124" height="40" fill={`rgba(255,214,150,${0.25 + 0.4 * lit})`} />
    <rect x="60" y="202" width="180" height="16" rx="4" fill="#3E6A8A" />
  </svg>
);

/** Prédio pequeno genérico (locação simples). */
export const SmallArt: React.FC<{ w: number }> = ({ w }) => (
  <svg width={w} height={w * 1.1} viewBox="0 0 200 220" style={{ display: "block" }}>
    <rect width="200" height="220" fill="#1C2129" />
    <rect x="50" y="40" width="100" height="170" fill="#2C333D" />
    {Array.from({ length: 8 }).map((_, i) => (
      <rect key={i} x={64 + (i % 2) * 42} y={56 + Math.floor(i / 2) * 36} width="30" height="22" fill={i === 5 ? "rgba(255,214,150,0.7)" : "rgba(255,255,255,0.14)"} />
    ))}
    <rect x="88" y="186" width="24" height="24" fill="#39424E" />
    <rect y="210" width="200" height="10" fill="#14181E" />
  </svg>
);

/** Quadro de película (mini-documentário): perfurações em cima e embaixo. */
export const Film: React.FC<{ w: number; h: number; t: number; children?: React.ReactNode }> = ({ w, h, t, children }) => {
  const holes = Math.floor(w / 44);
  const off = (t * 30) % 44;
  const row = (top: boolean) => (
    <div style={{ position: "absolute", left: 0, right: 0, [top ? "top" : "bottom"]: 0, height: 34, background: "#0B0D10", overflow: "hidden" }}>
      {Array.from({ length: holes + 2 }).map((_, i) => (
        <div key={i} style={{ position: "absolute", left: i * 44 - off, top: 9, width: 24, height: 16, borderRadius: 4, background: "#2A2F37" }} />
      ))}
    </div>
  );
  return (
    <div style={{ position: "absolute", width: w, height: h, borderRadius: 14, overflow: "hidden", background: "#0B0D10", boxShadow: "0 40px 100px rgba(0,0,0,0.6)" }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 34, bottom: 34, overflow: "hidden" }}>{children}</div>
      {row(true)}
      {row(false)}
    </div>
  );
};

/** Porta dupla que abre (p 0→1). */
export const Door: React.FC<{ w: number; h: number; p: number; children?: React.ReactNode }> = ({ w, h, p, children }) => (
  <div style={{ position: "relative", width: w, height: h, perspective: 1400 }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: 12, overflow: "hidden", background: "#11151B" }}>{children}</div>
    {[0, 1].map((i) => (
      <div key={i} style={{ position: "absolute", top: 0, bottom: 0, [i ? "right" : "left"]: 0, width: w / 2, background: "linear-gradient(180deg, #3A3026, #2A221B)", border: "3px solid #4A3E32", boxSizing: "border-box", transformOrigin: i ? "100% 50%" : "0 50%", transform: `rotateY(${(i ? 1 : -1) * p * 100}deg)`, backfaceVisibility: "hidden" }}>
        <div style={{ position: "absolute", [i ? "left" : "right"]: 18, top: h / 2 - 40, width: 10, height: 80, borderRadius: 5, background: "#B9A27A" }} />
        <div style={{ position: "absolute", left: 24, right: 24, top: 30, height: h * 0.35, border: `2px solid ${C.line}`, borderRadius: 6 }} />
        <div style={{ position: "absolute", left: 24, right: 24, bottom: 30, height: h * 0.35, border: `2px solid ${C.line}`, borderRadius: 6 }} />
      </div>
    ))}
  </div>
);
