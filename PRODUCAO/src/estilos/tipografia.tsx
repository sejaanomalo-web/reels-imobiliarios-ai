import React from "react";
import { C, F } from "../theme";
import { mix } from "../lib/anim";
import { A, aa } from "../episodes/NOV26/kit";

/**
 * ESTILO 4 — TIPOGRAFIA CINÉTICA. A palavra é a imagem: blocos grandes entram no ritmo da fala, uma palavra-chave em verde,
 * contorno gigante ao fundo, barra que varre, erro em vermelho. Poucos objetos; nada de cartões de interface.
 */
type Tom = "texto" | "verde" | "muted" | "warn" | "contorno";
const COR: Record<Tom, string> = { texto: C.text, verde: A.hex, muted: C.muted, warn: C.warn, contorno: "transparent" };

/** Palavra/linha que entra (p 0..1 vindo de sp()) a partir de uma direção. */
export const Palavra: React.FC<{ x: number; y: number; texto: React.ReactNode; p: number; size?: number; tom?: Tom; de?: "baixo" | "esq" | "dir" | "zoom"; rot?: number; peso?: number; mono?: boolean; align?: "left" | "right" | "center"; w?: number; t?: number }> = ({ x, y, texto, p, size = 140, tom = "texto", de = "baixo", rot = 0, peso = 800, mono = false, align = "left", w, t = 0 }) => {
  const k = Math.min(1.08, Math.max(0, p));
  const off = { baixo: `translateY(${(1 - Math.min(1, k)) * 120}px)`, esq: `translateX(${(1 - Math.min(1, k)) * -260}px)`, dir: `translateX(${(1 - Math.min(1, k)) * 260}px)`, zoom: `scale(${mix(1.8, 1, Math.min(1, k))})` }[de];
  return (
    <div style={{ position: "absolute", left: align === "right" ? undefined : x, right: align === "right" ? 1080 - x : undefined, top: y, width: w, textAlign: align, fontFamily: mono ? F.mono : F.sans, fontWeight: peso, fontSize: size, lineHeight: 0.92, letterSpacing: mono ? "0" : "-0.05em", color: COR[tom], WebkitTextStroke: tom === "contorno" ? `4px ${aa(0.5)}` : undefined, opacity: Math.min(1, Math.max(0, p) * 1.6), transform: `${off} rotate(${rot + Math.sin(t * 1.6) * 0.6}deg)`, transformOrigin: "0% 100%", whiteSpace: "nowrap" }}>
      {texto}
    </div>
  );
};

/** Barra que varre (sublinhado de ênfase). */
export const Barra: React.FC<{ x: number; y: number; w: number; p: number; cor?: string; h?: number }> = ({ x, y, w, p, cor = A.hex, h = 12 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w * Math.min(1, Math.max(0, p)), height: h, borderRadius: h / 2, background: `linear-gradient(90deg, ${cor}, ${cor === A.hex ? aa(0.15) : "transparent"})` }} />
);

/** Contorno gigante ao fundo (número/palavra-âncora). */
export const Contorno: React.FC<{ x: number; y: number; texto: string; size?: number; p?: number; t?: number }> = ({ x, y, texto, size = 420, p = 1, t = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, fontFamily: F.sans, fontWeight: 800, fontSize: size, lineHeight: 0.85, letterSpacing: "-0.07em", color: "transparent", WebkitTextStroke: `4px ${aa(0.45)}`, opacity: Math.min(1, Math.max(0, p) * 1.5), transform: `translateX(${Math.sin(t * 0.8) * 14}px)`, whiteSpace: "nowrap" }}>{texto}</div>
);

/** Riscar uma palavra (corte vermelho). */
export const Risco: React.FC<{ x: number; y: number; w: number; p: number }> = ({ x, y, w, p }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w * Math.min(1, Math.max(0, p)), height: 10, borderRadius: 5, background: C.warn, transform: "rotate(-4deg)" }} />
);
