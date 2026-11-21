import React from "react";
import { C, F } from "../theme";
import { A, aa, WARN_BG } from "../episodes/NOV26/kit";

/**
 * ESTILO 1 — PALITINHO (história com personagens). Kit reutilizável da esteira ATIVO (ver PROMPTS/GUIA_ESTILOS_VISUAIS_ATIVO.md).
 * Personagens em traço branco-giz; o PROTAGONISTA (corretor que acerta / ponto de virada) em verde do lote; erro/alerta em vermelho.
 * Tudo em SVG: use dentro de <Palco> (svg 1080×H posicionado). Pessoas são SEMPRE ilustrativas.
 */
export const GIZ = "#E9ECEF";
export type Pose = "parado" | "celular" | "acena" | "pensa" | "comemora" | "dorme" | "aponta" | "bracos";

export const Palco: React.FC<{ top?: number; h?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ top = 420, h = 900, children, style }) => (
  <svg width={1080} height={h} viewBox={`0 0 1080 ${h}`} style={{ position: "absolute", left: 0, top, overflow: "visible", ...style }}>{children}</svg>
);

/** Boneco de palitinho. (x,y) = pés. `andar` 0..1 anima pernas; `fala` liga a boca; `t` dá respiração. */
export const Boneco: React.FC<{ x: number; y: number; s?: number; cor?: string; pose?: Pose; t?: number; andar?: number; fala?: boolean; olhar?: -1 | 1; opacity?: number; prop?: "celular" | "nenhum" }> = ({ x, y, s = 1, cor = GIZ, pose = "parado", t = 0, andar = 0, fala = false, olhar = 1, opacity = 1, prop }) => {
  const bob = Math.sin(t * 2.2) * 3;
  const step = Math.sin(andar * Math.PI * 6) * 26 * (andar > 0 && andar < 1 ? 1 : 0);
  const sh = -105;
  const arms: Record<Pose, [number, number, number, number]> = {
    parado: [-38, -40, 38, -40], celular: [-42, -60, 40, -140], acena: [-42, -60, 52, -168], pensa: [-42, -60, 28, -160],
    comemora: [-58, -178, 58, -178], dorme: [-42, -60, 42, -60], aponta: [-42, -60, 92, -118], bracos: [-50, -78, 50, -78],
  };
  const [lx, ly, rx, ry] = arms[pose];
  const hasPhone = prop === "celular" || pose === "celular";
  if (pose === "dorme") {
    return (
      <g transform={`translate(${x} ${y}) scale(${s})`} opacity={opacity} stroke={cor} strokeWidth={9} strokeLinecap="round" fill="none">
        <rect x={-120} y={-36} width={260} height={36} rx={12} stroke={C.surface3} />
        <circle cx={-80} cy={-66 + bob * 0.3} r={34} /><line x1={-46} y1={-56} x2={110} y2={-46} />
        <text x={40} y={-110 - ((t * 20) % 30)} fill={C.muted} stroke="none" fontFamily="Manrope" fontWeight={800} fontSize={40} opacity={0.6 + 0.4 * Math.sin(t * 3)}>z z</text>
      </g>
    );
  }
  return (
    <g transform={`translate(${x} ${y + bob}) scale(${s * olhar} ${s})`} opacity={opacity} stroke={cor} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" fill="none">
      <circle cx={0} cy={-170} r={38} />
      <circle cx={10} cy={-176} r={3.5} fill={cor} stroke="none" />
      {fala ? <ellipse cx={14} cy={-154} rx={8} ry={4 + 4 * Math.abs(Math.sin(t * 14))} fill={cor} stroke="none" /> : <line x1={6} y1={-154} x2={20} y2={-154} strokeWidth={5} />}
      <line x1={0} y1={-132} x2={0} y2={-30} />
      <line x1={0} y1={-30} x2={-34 - step * 0.5} y2={60} /><line x1={0} y1={-30} x2={34 + step * 0.5} y2={60} />
      <line x1={0} y1={sh} x2={lx} y2={ly} /><line x1={0} y1={sh} x2={rx} y2={ry} />
      {hasPhone ? <rect x={rx - 10} y={ry - 50} width={34} height={58} rx={7} fill={A.hex} stroke={A.hex} strokeWidth={4} /> : null}
      {pose === "pensa" ? <text x={50} y={-230} fill={cor} stroke="none" fontFamily="Manrope" fontWeight={800} fontSize={54}>?</text> : null}
      {pose === "comemora" ? <text x={-70} y={-230} fill={A.hex} stroke="none" fontFamily="Manrope" fontWeight={800} fontSize={44}>✦ ✦</text> : null}
    </g>
  );
};

/** Balão de fala (SVG). `lado` define para onde aponta o rabinho. tone: plain | accent | warn | muted. */
export const Balao: React.FC<{ x: number; y: number; w: number; h?: number; texto: string; lado?: "esq" | "dir" | "baixo"; tone?: "plain" | "accent" | "warn" | "muted"; size?: number; p?: number }> = ({ x, y, w, h = 104, texto, lado = "baixo", tone = "plain", size = 32, p = 1 }) => {
  const st = { plain: [C.surface, GIZ, C.text], accent: [aa(0.12), A.hex, C.text], warn: [WARN_BG, C.warn, C.warn], muted: [C.surface, C.dim, C.muted] }[tone];
  const k = Math.min(1, Math.max(0, p));
  const tail = lado === "esq" ? `M ${x + 40} ${y + h} L ${x + 20} ${y + h + 36} L ${x + 80} ${y + h}` : lado === "dir" ? `M ${x + w - 80} ${y + h} L ${x + w - 20} ${y + h + 36} L ${x + w - 40} ${y + h}` : `M ${x + w / 2 - 24} ${y + h} L ${x + w / 2} ${y + h + 34} L ${x + w / 2 + 24} ${y + h}`;
  return (
    <g opacity={k} transform={`translate(${x + w / 2} ${y + h}) scale(${0.7 + 0.3 * k}) translate(${-(x + w / 2)} ${-(y + h)})`}>
      <path d={tail} fill={st[0]} stroke={st[1]} strokeWidth={4} strokeLinejoin="round" />
      <rect x={x} y={y} width={w} height={h} rx={28} fill={st[0]} stroke={st[1]} strokeWidth={4} />
      <rect x={x + 20} y={y + h - 6} width={w - 40} height={10} fill={st[0]} />
      <text x={x + w / 2} y={y + h / 2 + size * 0.35} textAnchor="middle" fill={st[2]} fontFamily="Manrope" fontWeight={800} fontSize={size}>{texto}</text>
    </g>
  );
};

/** Casinha em traço (objeto de cena). */
export const Casinha: React.FC<{ x: number; y: number; s?: number; cor?: string; p?: number }> = ({ x, y, s = 1, cor = GIZ, p = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} stroke={cor} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={Math.min(1, p * 1.4)}>
    <polyline points="-110,-140 0,-230 110,-140" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - Math.min(1, p)} />
    <rect x={-90} y={-140} width={180} height={140} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - Math.min(1, p)} />
    <rect x={-22} y={-70} width={44} height={70} opacity={p > 0.6 ? 1 : 0} />
    <rect x={-70} y={-115} width={34} height={30} opacity={p > 0.7 ? 1 : 0} /><rect x={36} y={-115} width={34} height={30} opacity={p > 0.7 ? 1 : 0} />
  </g>
);

/** Linha do chão. */
export const Chao: React.FC<{ y: number; x1?: number; x2?: number }> = ({ y, x1 = 60, x2 = 1020 }) => <line x1={x1} y1={y + 62} x2={x2} y2={y + 62} stroke={C.surface3} strokeWidth={5} strokeLinecap="round" />;

/** Placa de texto (mono) dentro do SVG. */
export const Placa: React.FC<{ x: number; y: number; w: number; texto: string; tone?: "accent" | "warn" | "muted"; size?: number; p?: number }> = ({ x, y, w, texto, tone = "muted", size = 26, p = 1 }) => {
  const st = { accent: [aa(0.14), A.hex], warn: [WARN_BG, C.warn], muted: [C.surface3, C.muted] }[tone];
  return (
    <g opacity={Math.min(1, Math.max(0, p) * 1.5)}>
      <rect x={x} y={y} width={w} height={size * 2.4} rx={size * 0.6} fill={st[0]} stroke={tone === "muted" ? "none" : st[1]} strokeWidth={3} />
      <text x={x + w / 2} y={y + size * 1.55} textAnchor="middle" fill={st[1]} fontFamily="JetBrains Mono" fontWeight={700} fontSize={size}>{texto}</text>
    </g>
  );
};
export const FONT = F;
