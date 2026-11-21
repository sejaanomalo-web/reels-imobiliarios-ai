import React from "react";
import { C } from "../theme";
import { A, aa } from "../episodes/NOV26/kit";

/**
 * ESTILO 3 — PLANTA TÉCNICA (blueprint verde). O conteúdo vira "projeto": cômodos = etapas, cotas = tempos/medidas,
 * chamadas vermelhas = falhas, carimbo técnico = assinatura (sempre ILUSTRATIVO). Fundo verde-escuro com grade.
 */
export const BG_PLANTA = "#06100A";
const M = "JetBrains Mono";

export const FundoPlanta: React.FC<{ t?: number }> = ({ t = 0 }) => (
  <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
    <rect width={1080} height={1920} fill={BG_PLANTA} />
    {Array.from({ length: 28 }).map((_, i) => <line key={"v" + i} x1={i * 40} y1={0} x2={i * 40} y2={1920} stroke={aa(i % 5 === 0 ? 0.13 : 0.05)} strokeWidth={i % 5 === 0 ? 2 : 1} />)}
    {Array.from({ length: 49 }).map((_, i) => <line key={"h" + i} x1={0} y1={i * 40 + ((t * 8) % 40)} x2={1080} y2={i * 40 + ((t * 8) % 40)} stroke={aa(i % 5 === 0 ? 0.13 : 0.05)} strokeWidth={i % 5 === 0 ? 2 : 1} />)}
  </svg>
);

export const Prancha: React.FC<{ top?: number; h?: number; children: React.ReactNode }> = ({ top = 380, h = 1000, children }) => (
  <svg width={1080} height={h} viewBox={`0 0 1080 ${h}`} style={{ position: "absolute", left: 0, top, overflow: "visible" }}>{children}</svg>
);

/** Cômodo = etapa. Desenha as paredes com p (0..1); textos aparecem depois. */
export const Comodo: React.FC<{ x: number; y: number; w: number; h: number; p: number; amb?: string; titulo: string; sub?: string; tone?: "accent" | "warn" | "muted"; titleSize?: number }> = ({ x, y, w, h, p, amb, titulo, sub, tone = "accent", titleSize = 38 }) => {
  const col = tone === "warn" ? C.warn : tone === "muted" ? C.dim : A.hex;
  const k = Math.min(1, Math.max(0, p));
  const tx = Math.min(1, Math.max(0, (p - 0.6) * 2.5));
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={tone === "warn" ? "rgba(255,107,94,0.06)" : aa(0.04 * tx)} stroke={col} strokeWidth={5} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - k} />
      <g opacity={tx} fontFamily={M} fontWeight={700} textAnchor="middle">
        {amb ? <text x={x + w / 2} y={y + h / 2 - titleSize * 0.95} fill={col} fontSize={24}>{amb}</text> : null}
        <text x={x + w / 2} y={y + h / 2 + titleSize * 0.15} fill={C.text} fontSize={titleSize}>{titulo}</text>
        {sub ? <text x={x + w / 2} y={y + h / 2 + titleSize * 1.15} fill={tone === "warn" ? C.warn : C.muted} fontSize={24}>{sub}</text> : null}
      </g>
    </g>
  );
};

/** Cota (linha de medida) horizontal com rótulo. */
export const Cota: React.FC<{ x1: number; x2: number; y: number; texto: string; p?: number; cor?: string }> = ({ x1, x2, y, texto, p = 1, cor = C.muted }) => (
  <g opacity={Math.min(1, Math.max(0, p) * 1.5)} stroke={cor} strokeWidth={2}>
    <line x1={x1} y1={y} x2={x1 + (x2 - x1) * Math.min(1, p)} y2={y} /><line x1={x1} y1={y - 14} x2={x1} y2={y + 14} /><line x1={x2} y1={y - 14} x2={x2} y2={y + 14} opacity={p > 0.95 ? 1 : 0} />
    <text x={(x1 + x2) / 2} y={y - 16} textAnchor="middle" fill={cor} stroke="none" fontFamily={M} fontWeight={700} fontSize={24}>{texto}</text>
  </g>
);

/** Chamada (callout) de um ponto até uma caixa de texto. */
export const Chamada: React.FC<{ x: number; y: number; bx: number; by: number; bw: number; texto: string; p?: number; tone?: "warn" | "accent" }> = ({ x, y, bx, by, bw, texto, p = 1, tone = "warn" }) => {
  const col = tone === "warn" ? C.warn : A.hex;
  const k = Math.min(1, Math.max(0, p));
  return (
    <g opacity={Math.min(1, k * 1.5)}>
      <circle cx={x} cy={y} r={10} fill={col} />
      <line x1={x} y1={y} x2={x + (bx + bw / 2 - x) * k} y2={y + (by - y) * k} stroke={col} strokeWidth={3} strokeDasharray="10 8" />
      <rect x={bx} y={by} width={bw} height={80} rx={12} fill={tone === "warn" ? "rgba(255,107,94,0.12)" : aa(0.12)} stroke={col} strokeWidth={3} opacity={k > 0.8 ? 1 : 0} />
      <text x={bx + bw / 2} y={by + 51} textAnchor="middle" fill={col} fontFamily={M} fontWeight={700} fontSize={25} opacity={k > 0.8 ? 1 : 0}>{texto}</text>
    </g>
  );
};

/** Porta (arco tracejado) — passagem entre etapas. */
export const Porta: React.FC<{ x: number; y: number; r?: number; p?: number; aberta?: boolean }> = ({ x, y, r = 70, p = 1, aberta = true }) => (
  <g opacity={Math.min(1, p * 1.5)} stroke={aberta ? A.hex : C.warn} strokeWidth={4} fill="none">
    <line x1={x} y1={y} x2={x + r} y2={y} />
    {aberta ? <path d={`M ${x + r} ${y} A ${r} ${r} 0 0 0 ${x} ${y - r}`} strokeDasharray="8 8" /> : <line x1={x} y1={y - 20} x2={x + r} y2={y + 20} />}
  </g>
);

/** Carimbo técnico da prancha (assinatura do estilo). */
export const Carimbo: React.FC<{ x: number; y: number; projeto: string; folha: string; p?: number }> = ({ x, y, projeto, folha, p = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={Math.min(1, Math.max(0, p) * 1.5)} fontFamily={M} fontWeight={700}>
    <rect width={420} height={150} fill="none" stroke={A.hex} strokeWidth={3} /><line x1={0} y1={50} x2={420} y2={50} stroke={A.hex} strokeWidth={2} />
    <text x={20} y={36} fill={A.hex} fontSize={24}>PROJETO: {projeto}</text>
    <text x={20} y={92} fill={C.muted} fontSize={22}>{folha}</text>
    <text x={20} y={128} fill={C.muted} fontSize={22}>ILUSTRATIVO · ATIVO</text>
  </g>
);
