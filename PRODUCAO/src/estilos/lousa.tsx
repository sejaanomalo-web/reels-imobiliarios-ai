import React from "react";
import { C } from "../theme";
import { A } from "../episodes/NOV26/kit";

/**
 * ESTILO 2 — DESENHO À MÃO (lousa/sketch). Traço de giz trêmulo (filtro SVG), desenhado em tempo real (stroke-dashoffset).
 * Giz branco para o desenho; verde do lote = marcador de destaque; vermelho = erro. Use dentro de <Lousa> (svg com os filtros).
 */
export const GIZ = "#E9ECEF";
export const BG_LOUSA = "#0E1012";

export const Lousa: React.FC<{ top?: number; h?: number; children: React.ReactNode; seed?: number }> = ({ top = 380, h = 980, children, seed = 4 }) => (
  <svg width={1080} height={h} viewBox={`0 0 1080 ${h}`} style={{ position: "absolute", left: 0, top, overflow: "visible" }}>
    <defs>
      <filter id="rough" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed={seed} /><feDisplacementMap in="SourceGraphic" scale="6" /></filter>
    </defs>
    {children}
  </svg>
);

/** Fundo de lousa (grafite levemente esfumado). */
export const FundoLousa: React.FC = () => (
  <div style={{ position: "absolute", inset: 0, background: `radial-gradient(120% 80% at 50% 40%, #15181B 0%, ${BG_LOUSA} 70%)` }} />
);

/** Traço que se desenha: p 0..1. */
export const Traco: React.FC<{ d: string; p: number; cor?: string; w?: number; fill?: string }> = ({ d, p, cor = GIZ, w = 7, fill = "none" }) => (
  <path d={d} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - Math.min(1, Math.max(0, p))} stroke={cor} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" fill={fill} filter="url(#rough)" />
);

/** Texto escrito a giz (aparece da esquerda para a direita). */
export const Giz: React.FC<{ x: number; y: number; texto: string; p?: number; size?: number; cor?: string; rot?: number; anchor?: "start" | "middle" | "end" }> = ({ x, y, texto, p = 1, size = 52, cor = GIZ, rot = 0, anchor = "start" }) => {
  const n = Math.round(texto.length * Math.min(1, Math.max(0, p)));
  return <text x={x} y={y} textAnchor={anchor} fill={cor} fontFamily="Manrope" fontWeight={800} fontSize={size} transform={`rotate(${rot} ${x} ${y})`} filter="url(#rough)">{texto.slice(0, n)}</text>;
};

/* Construtores de caminhos (desenhos à mão). */
export const casa = (x: number, y: number, w = 300) => { const h = w * 0.85; return `M ${x - w * 0.6} ${y - h * 0.62} L ${x} ${y - h * 1.15} L ${x + w * 0.6} ${y - h * 0.62} M ${x - w / 2} ${y - h * 0.62} L ${x - w / 2} ${y} L ${x + w / 2} ${y} L ${x + w / 2} ${y - h * 0.62} M ${x - w * 0.12} ${y} L ${x - w * 0.12} ${y - h * 0.42} L ${x + w * 0.12} ${y - h * 0.42} L ${x + w * 0.12} ${y}`; };
export const predio = (x: number, y: number, w = 200, h = 420) => `M ${x - w / 2} ${y} L ${x - w / 2} ${y - h} L ${x + w / 2} ${y - h} L ${x + w / 2} ${y} ` + Array.from({ length: 4 }, (_, i) => `M ${x - w * 0.3} ${y - h * (0.2 + i * 0.2)} L ${x - w * 0.1} ${y - h * (0.2 + i * 0.2)} M ${x + w * 0.1} ${y - h * (0.2 + i * 0.2)} L ${x + w * 0.3} ${y - h * (0.2 + i * 0.2)}`).join(" ");
export const celular = (x: number, y: number, w = 240, h = 430) => `M ${x - w / 2 + 30} ${y - h / 2} L ${x + w / 2 - 30} ${y - h / 2} Q ${x + w / 2} ${y - h / 2} ${x + w / 2} ${y - h / 2 + 30} L ${x + w / 2} ${y + h / 2 - 30} Q ${x + w / 2} ${y + h / 2} ${x + w / 2 - 30} ${y + h / 2} L ${x - w / 2 + 30} ${y + h / 2} Q ${x - w / 2} ${y + h / 2} ${x - w / 2} ${y + h / 2 - 30} L ${x - w / 2} ${y - h / 2 + 30} Q ${x - w / 2} ${y - h / 2} ${x - w / 2 + 30} ${y - h / 2} M ${x - 35} ${y - h / 2 + 28} L ${x + 35} ${y - h / 2 + 28}`;
export const relogio = (x: number, y: number, r = 80) => `M ${x + r} ${y} A ${r} ${r} 0 1 1 ${x + r - 0.1} ${y - 1} M ${x} ${y} L ${x} ${y - r * 0.65} M ${x} ${y} L ${x - r * 0.45} ${y + r * 0.12}`;
export const seta = (x1: number, y1: number, x2: number, y2: number, curva = 60) => { const mx = (x1 + x2) / 2, my = (y1 + y2) / 2 - curva; const ang = Math.atan2(y2 - my, x2 - mx); const a1 = ang + 2.6, a2 = ang - 2.6; return `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2} M ${x2 + 28 * Math.cos(a1)} ${y2 + 28 * Math.sin(a1)} L ${x2} ${y2} L ${x2 + 28 * Math.cos(a2)} ${y2 + 28 * Math.sin(a2)}`; };
export const circulo = (x: number, y: number, rx: number, ry: number) => `M ${x + rx} ${y} A ${rx} ${ry} 0 1 1 ${x + rx - 2} ${y - 6} L ${x + rx + 14} ${y - 18}`;
export const sublinha = (x: number, y: number, w: number) => `M ${x} ${y} Q ${x + w / 2} ${y - 16} ${x + w} ${y + 4}`;
export const caixa = (x: number, y: number, w: number, h: number) => `M ${x} ${y} L ${x + w} ${y + 3} L ${x + w - 2} ${y + h} L ${x + 2} ${y + h - 3} Z`;
export const check = (x: number, y: number, s = 40) => `M ${x} ${y} L ${x + s * 0.4} ${y + s * 0.4} L ${x + s} ${y - s * 0.5}`;
export const xis = (x: number, y: number, s = 40) => `M ${x - s / 2} ${y - s / 2} L ${x + s / 2} ${y + s / 2} M ${x + s / 2} ${y - s / 2} L ${x - s / 2} ${y + s / 2}`;
export const VERDE = A.hex;
export const VERMELHO = C.warn;
