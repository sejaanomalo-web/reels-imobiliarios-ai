import React from "react";
import { C, F, accentAlpha, ACCENT_NOV26 } from "../theme";
import { clamp01, ease, mix, prog, rnd, sp } from "../lib/anim";
import type { CaptionChunk } from "../episodes/types";

/**
 * KIT "CARTOON EXPLICATIVO" (piloto do novo formato, 21/11/2026) — gramática estudada nas 3 referências do cliente
 * (análise quadro a quadro): 2D vetorial chapado, fundo de raios girando com cor por clima, vinheta forte, holofote,
 * sombra de contato, pop elástico, carimbo inclinado com tremor, corte seco a cada ~3 s, legenda karaokê no centro.
 * Desenho 100% original em SVG. Identidade ATIVO: verde #02FB3F (kit A), Manrope, logo oficial; sem amarelo.
 */
const A = ACCENT_NOV26;
const aa = (a: number) => accentAlpha(A, a);
export const RED = C.warn;

/** Paletas de fundo por clima (centro → borda). Sem verdes fora da marca: o "ganho" usa o deep oficial + raios do verde A. */
export const CLIMA = {
  explica: { c0: "#24324A", c1: "#070A10", ray: "rgba(143,180,227,0.07)" },
  conflito: { c0: "#5C1A17", c1: "#120405", ray: "rgba(255,107,94,0.08)" },
  pergunta: { c0: "#33204F", c1: "#0B0612", ray: "rgba(190,160,255,0.07)" },
  ganho: { c0: A.deep, c1: "#050607", ray: aa(0.07) },
  evento: { c0: "#2A2A33", c1: "#060608", ray: "rgba(255,255,255,0.05)" },
  dados: { c0: "#173A44", c1: "#04090B", ray: "rgba(143,210,227,0.05)" },
  sepia: { c0: "#6B5638", c1: "#1A140C", ray: "rgba(255,230,190,0.06)" },
} as const;
export type Clima = keyof typeof CLIMA;

/** Fundo de raios (sunburst) girando devagar + vinheta. `vin` = força da vinheta (0.4 aberta … 0.95 tensa). */
export const Raios: React.FC<{ t: number; clima: Clima; cy?: number; vin?: number; n?: number }> = ({ t, clima, cy = 900, vin = 0.75, n = 20 }) => {
  const p = CLIMA[clima];
  const id = `r_${clima}`;
  const rot = t * 3.2;
  const R = 2400;
  const rays = Array.from({ length: n }, (_, i) => {
    const a0 = ((i * 2) / (n * 2)) * Math.PI * 2;
    const a1 = ((i * 2 + 1) / (n * 2)) * Math.PI * 2;
    return `M540 ${cy} L${540 + Math.cos(a0) * R} ${cy + Math.sin(a0) * R} L${540 + Math.cos(a1) * R} ${cy + Math.sin(a1) * R} Z`;
  });
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <defs>
        <radialGradient id={`${id}_g`} cx={540} cy={cy} r={1250} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={p.c0} />
          <stop offset="1" stopColor={p.c1} />
        </radialGradient>
        <radialGradient id={`${id}_v`} cx={540} cy={cy} r={1150} gradientUnits="userSpaceOnUse">
          <stop offset="0.25" stopColor="#000" stopOpacity={0} />
          <stop offset="1" stopColor="#000" stopOpacity={vin} />
        </radialGradient>
      </defs>
      <rect width={1080} height={1920} fill={`url(#${id}_g)`} />
      <g transform={`rotate(${rot} 540 ${cy})`}>
        {rays.map((d, i) => <path key={i} d={d} fill={p.ray} />)}
      </g>
      {clima === "dados" ? Array.from({ length: 24 }, (_, i) => <path key={`g${i}`} d={i < 12 ? `M${i * 96} 0 V1920` : `M0 ${(i - 12) * 170} H1080`} stroke="rgba(143,210,227,0.08)" strokeWidth={2} />) : null}
      {Array.from({ length: 26 }, (_, i) => {
        const x = rnd(i * 3.1) * 1080;
        const y = ((rnd(i * 7.7) * 1920 - t * (14 + rnd(i) * 20)) % 1920 + 1920) % 1920;
        return <circle key={i} cx={x + Math.sin(t * 0.7 + i) * 10} cy={y} r={1.5 + rnd(i * 2.3) * 2.5} fill="#fff" opacity={0.08 + rnd(i * 5.3) * 0.14} />;
      })}
      <rect width={1080} height={1920} fill={`url(#${id}_v)`} />
    </svg>
  );
};

/** Holofote: cone translúcido de cima + elipse iluminada no chão. */
export const Holofote: React.FC<{ x: number; chao: number; w?: number; p?: number; cor?: string }> = ({ x, chao, w = 520, p = 1, cor = "#FFFFFF" }) => (
  <g opacity={clamp01(p)}>
    <defs>
      <linearGradient id={`hf_${x}_${chao}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={cor} stopOpacity={0.0} />
        <stop offset="0.25" stopColor={cor} stopOpacity={0.08} />
        <stop offset="1" stopColor={cor} stopOpacity={0.16} />
      </linearGradient>
    </defs>
    <path d={`M${x - 60} 0 L${x + 60} 0 L${x + w / 2} ${chao} L${x - w / 2} ${chao} Z`} fill={`url(#hf_${x}_${chao})`} />
    <ellipse cx={x} cy={chao} rx={w / 2} ry={46} fill={cor} opacity={0.13} />
  </g>
);

/** Pop elástico (0,5 → 1,05 → 1 em ~0,2 s) — escala para `transform`. */
export const pop = (t: number, at: number) => (t < at ? 0 : sp(t, at, { damping: 9, stiffness: 260, mass: 0.6 }));
export const Pop: React.FC<{ t: number; at: number; x: number; y: number; children: React.ReactNode; rot?: number }> = ({ t, at, x, y, children, rot = 0 }) => {
  const s = pop(t, at);
  if (s <= 0.001) return null;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${0.5 + 0.5 * s})`} opacity={Math.min(1, s * 3)}>{children}</g>;
};

/** Tremor de impacto (3–6 quadros) a partir de instantes de batida. Retorna deslocamento [x, y]. */
export const tremor = (t: number, hits: number[], amp = 14) => {
  let x = 0, y = 0;
  for (const h of hits) {
    const d = t - h;
    if (d >= 0 && d < 0.22) {
      const k = (1 - d / 0.22) * amp;
      x += Math.sin(d * 95) * k;
      y += Math.cos(d * 120) * k * 0.7;
    }
  }
  return [x, y] as const;
};

/** Câmera do formato: quase parada; push-in lento contínuo + punch-ins em palavras e tremor nas batidas. */
export const CamCartoon: React.FC<{ t: number; t0: number; push?: number; punch?: { at: number; s: number; x?: number; y?: number }[]; hits?: number[]; children: React.ReactNode }> = ({ t, t0, push = 0.012, punch = [], hits = [], children }) => {
  let s = 1 + push * Math.max(0, t - t0), ox = 0, oy = 0;
  for (const q of punch) {
    const k = prog(t, q.at - 0.05, 0.22, ease.out);
    s *= mix(1, q.s, k);
    ox += (q.x ?? 0) * k;
    oy += (q.y ?? 0) * k;
  }
  const [tx, ty] = tremor(t, hits);
  // entrada de corte seco com "chicote" de 3 quadros
  const w = 1 - prog(t, t0, 0.1, ease.out);
  return (
    <div style={{ position: "absolute", inset: 0, transform: `translate(${ox + tx + w * 70}px, ${oy + ty}px) scale(${s})`, transformOrigin: "540px 960px", filter: w > 0.02 ? `blur(${w * 7}px)` : undefined }}>
      {children}
    </div>
  );
};

/** Sombra de contato. */
export const Sombra: React.FC<{ x: number; y: number; rx?: number }> = ({ x, y, rx = 110 }) => <ellipse cx={x} cy={y + 4} rx={rx} ry={rx * 0.16} fill="#000" opacity={0.45} />;

export type Humor = "neutro" | "feliz" | "bravo" | "espanto" | "triste";
export type Visual = { terno: string; sombraTerno: string; pele: string; cabelo: string; gravata?: string; calca?: string; camisa?: string; cabeloTipo?: "curto" | "topete" | "coque" | "careca" };
export const VIS: Record<string, Visual> = {
  A: { terno: "#2C3E66", sombraTerno: "#22314F", pele: "#E8B48C", cabelo: "#2A1C14", gravata: A.hex, calca: "#1C2233", cabeloTipo: "topete" },
  B: { terno: "#6E3A2C", sombraTerno: "#572D22", pele: "#9A6444", cabelo: "#151012", gravata: "#E9E2D6", calca: "#2A1E1A", cabeloTipo: "curto" },
  comprador: { terno: "#D7883A", sombraTerno: "#B9712C", pele: "#C98C64", cabelo: "#4A2E1C", calca: "#2E3442", camisa: "#D7883A", cabeloTipo: "coque" },
  lider: { terno: "#3A3F4A", sombraTerno: "#2E323B", pele: "#D9A27B", cabelo: "#8C8C8C", gravata: "#B8BDC6", calca: "#22252C", cabeloTipo: "curto" },
};

/**
 * Personagem em "rig de recorte" 2D (sem contorno, cor chapada + 1 tom de sombra). Pés em (x, y).
 * braco: ângulo do braço direito (graus; 0 = pendurado, 90 = estendido para o lado, 160 = para cima). bracoE idem, esquerdo.
 */
export const Personagem: React.FC<{
  t: number; x: number; y: number; s?: number; v: Visual; humor?: Humor; fala?: boolean; olhar?: number; flip?: boolean;
  braco?: number; bracoE?: number; seed?: number; item?: React.ReactNode; sombra?: boolean; acentos?: number[];
}> = ({ t, x, y, s = 1, v, humor = "neutro", fala = false, olhar = 0, flip = false, braco = 8, bracoE = -8, seed = 0, item, sombra = true, acentos = [] }) => {
  const resp = Math.sin(t * 2.4 + seed) * 0.012;
  const pisca = ((t + seed * 0.37) % 3.4) < 0.11;
  const boca = fala ? 0.35 + 0.65 * Math.abs(Math.sin(t * 15 + seed)) * (0.6 + 0.4 * Math.sin(t * 5.3)) : 0;
  const brow = { neutro: 0, feliz: -6, bravo: 16, espanto: -14, triste: -10 }[humor];
  const browY = humor === "espanto" ? -12 : 0;
  // balanço de cabeça nas palavras enfatizadas (0,25 s: desce 9 px e inclina 3°)
  const bob = acentos.reduce((acc, a) => (t >= a && t < a + 0.25 ? acc + Math.sin(((t - a) / 0.25) * Math.PI) : acc), 0);
  const headY = -420 + Math.sin(t * 2.4 + seed) * 3 + bob * 9;
  const Hair = () => {
    switch (v.cabeloTipo) {
      case "topete": return <path d="M-84 -440 C-90 -520 -20 -540 30 -528 C70 -540 100 -505 86 -440 C70 -470 30 -478 -10 -470 C-40 -486 -70 -470 -84 -440 Z" fill={v.cabelo} />;
      case "coque": return <g fill={v.cabelo}><circle cx={0} cy={-520} r={34} /><path d="M-86 -430 C-92 -515 92 -515 86 -430 C60 -470 -60 -470 -86 -430 Z" /></g>;
      case "careca": return <path d="M-86 -420 C-90 -440 -80 -450 -74 -440 L-74 -410 Z M86 -420 C90 -440 80 -450 74 -440 L74 -410 Z" fill={v.cabelo} />;
      default: return <path d="M-86 -432 C-92 -515 92 -515 86 -432 C66 -462 -66 -462 -86 -432 Z" fill={v.cabelo} />;
    }
  };
  const Braco: React.FC<{ lado: 1 | -1; ang: number }> = ({ lado, ang }) => (
    <g transform={`translate(${lado * 92} -318) rotate(${-lado * ang})`}>
      <rect x={-19} y={-6} width={38} height={150} rx={19} fill={lado === 1 ? v.sombraTerno : v.terno} />
      <circle cx={0} cy={150} r={22} fill={v.pele} />
      {lado === 1 && item ? <g transform={`translate(0 168) rotate(${lado * ang})`}>{item}</g> : null}
    </g>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${(flip ? -1 : 1) * s} ${s})`}>
      {sombra ? <ellipse cx={0} cy={4} rx={120} ry={20} fill="#000" opacity={0.45} /> : null}
      {/* pernas */}
      <rect x={-52} y={-160} width={44} height={156} rx={14} fill={v.calca ?? "#1E2230"} />
      <rect x={8} y={-160} width={44} height={156} rx={14} fill={v.calca ?? "#1E2230"} />
      <ellipse cx={-34} cy={-4} rx={36} ry={14} fill="#0B0C0F" />
      <ellipse cx={34} cy={-4} rx={36} ry={14} fill="#0B0C0F" />
      <Braco lado={-1} ang={bracoE} />
      {/* tronco */}
      <g transform={`translate(0 -150) scale(1 ${1 + resp}) translate(0 150)`}>
        <path d="M-98 -330 Q-104 -170 -86 -140 L86 -140 Q104 -170 98 -330 Q0 -356 -98 -330 Z" fill={v.terno} />
        <path d="M30 -336 Q98 -330 98 -330 Q104 -170 86 -140 L48 -140 Z" fill={v.sombraTerno} />
        {v.camisa ? <path d="M-30 -340 L0 -300 L30 -340 Z" fill="#F3EEE6" /> : (
          <>
            <path d="M-34 -342 L0 -250 L34 -342 Z" fill="#F3EEE6" />
            {v.gravata ? <path d="M-11 -330 L11 -330 L16 -262 L0 -244 L-16 -262 Z" fill={v.gravata} /> : null}
          </>
        )}
      </g>
      <Braco lado={1} ang={braco} />
      {/* cabeça */}
      <g transform={`translate(0 ${headY + 420}) rotate(${bob * 3} 0 -360)`}>
        <rect x={-24} y={-356} width={48} height={30} fill={v.pele} />
        <circle cx={-88} cy={-418} r={16} fill={v.pele} />
        <circle cx={88} cy={-418} r={16} fill={v.pele} />
        <circle cx={0} cy={-420} r={88} fill={v.pele} />
        <path d="M40 -500 A88 88 0 0 1 40 -340 A100 100 0 0 0 40 -500 Z" fill="#000" opacity={0.08} />
        <Hair />
        {/* olhos */}
        {[-30, 30].map((ex) => (
          <g key={ex}>
            <ellipse cx={ex} cy={-428} rx={17} ry={pisca ? 2 : humor === "espanto" ? 21 : 18} fill="#fff" />
            {!pisca ? <circle cx={ex + olhar * 7} cy={-426} r={humor === "espanto" ? 7 : 9} fill="#111" /> : null}
            <rect x={ex - 18} y={-462 + browY} width={36} height={8} rx={4} fill={v.cabelo} transform={`rotate(${(ex < 0 ? 1 : -1) * brow} ${ex} ${-458 + browY})`} />
          </g>
        ))}
        {/* boca */}
        {fala || humor === "espanto" ? (
          <ellipse cx={0} cy={-374} rx={humor === "espanto" ? 15 : 20} ry={humor === "espanto" ? 18 : 3 + boca * 13} fill="#3A0F12" />
        ) : humor === "feliz" ? (
          <path d="M-26 -382 Q0 -352 26 -382 Z" fill="#3A0F12" />
        ) : humor === "triste" || humor === "bravo" ? (
          <path d="M-22 -366 Q0 -386 22 -366" fill="none" stroke="#3A0F12" strokeWidth={7} strokeLinecap="round" />
        ) : (
          <path d="M-18 -374 Q0 -364 18 -374" fill="none" stroke="#3A0F12" strokeWidth={7} strokeLinecap="round" />
        )}
      </g>
    </g>
  );
};

/** Figurante genérico (multidão): cabeça + corpo em cor dessaturada. */
export const Figurante: React.FC<{ x: number; y: number; s?: number; cor: string; t: number; seed?: number }> = ({ x, y, s = 1, cor, t, seed = 0 }) => (
  <g transform={`translate(${x} ${y + Math.abs(Math.sin(t * 3 + seed)) * -6}) scale(${s})`}>
    <ellipse cx={0} cy={2} rx={70} ry={12} fill="#000" opacity={0.35} />
    <path d="M-62 0 Q-70 -170 0 -180 Q70 -170 62 0 Z" fill={cor} />
    <circle cx={0} cy={-232} r={56} fill={cor} />
    <circle cx={-18} cy={-238} r={7} fill="#111" opacity={0.6} />
    <circle cx={18} cy={-238} r={7} fill="#111" opacity={0.6} />
  </g>
);

/** Casa chapada (fachada + 1 tom de sombra no telhado/lateral). Base em (0,0). */
export const Casa: React.FC<{ w?: number; cor?: string; teto?: string }> = ({ w = 300, cor = "#E9E2D6", teto = "#B5483A" }) => {
  const h = w * 0.62;
  return (
    <g>
      <ellipse cx={0} cy={6} rx={w * 0.62} ry={w * 0.06} fill="#000" opacity={0.4} />
      <rect x={-w / 2} y={-h} width={w} height={h} fill={cor} />
      <rect x={w * 0.2} y={-h} width={w * 0.3} height={h} fill="#000" opacity={0.08} />
      <path d={`M${-w * 0.62} ${-h + 4} L0 ${-h - w * 0.42} L${w * 0.62} ${-h + 4} Z`} fill={teto} />
      <path d={`M0 ${-h - w * 0.42} L${w * 0.62} ${-h + 4} L${w * 0.3} ${-h + 4} Z`} fill="#000" opacity={0.15} />
      <rect x={-w * 0.12} y={-h * 0.55} width={w * 0.24} height={h * 0.55} rx={6} fill="#5A3A2A" />
      <rect x={-w * 0.4} y={-h * 0.75} width={w * 0.2} height={w * 0.18} rx={4} fill="#9EC3E6" />
      <rect x={w * 0.2} y={-h * 0.75} width={w * 0.2} height={w * 0.18} rx={4} fill="#9EC3E6" />
    </g>
  );
};

/** Prédio (imobiliária) chapado. Base em (0,0). */
export const Predio: React.FC<{ w?: number; h?: number; cor?: string; letreiro?: string }> = ({ w = 240, h = 420, cor = "#3B4456", letreiro }) => (
  <g>
    <ellipse cx={0} cy={6} rx={w * 0.66} ry={18} fill="#000" opacity={0.4} />
    <rect x={-w / 2} y={-h} width={w} height={h} fill={cor} />
    <rect x={w * 0.18} y={-h} width={w * 0.32} height={h} fill="#000" opacity={0.14} />
    {Array.from({ length: 5 }, (_, r) => [0, 1, 2].map((k) => <rect key={`${r}${k}`} x={-w / 2 + 26 + k * (w - 52) / 3} y={-h + 40 + r * ((h - 140) / 5)} width={(w - 52) / 3 - 18} height={(h - 140) / 5 - 22} rx={4} fill="#9EC3E6" opacity={0.75} />))}
    <rect x={-34} y={-90} width={68} height={90} fill="#22262E" />
    {letreiro ? <text x={0} y={-h - 22} textAnchor="middle" fontFamily={F.sans} fontWeight={800} fontSize={34} fill="#fff">{letreiro}</text> : null}
  </g>
);

/** Carimbo inclinado: cai com escala grande e para com leve giro. Retorna o instante da batida via `bateEm`. */
export const Carimbo: React.FC<{ t: number; at: number; x: number; y: number; texto: string; sub?: string; cor?: "red" | "green" | "white"; rot?: number; size?: number }> = ({ t, at, x, y, texto, sub, cor = "red", rot = -7, size = 64 }) => {
  if (t < at) return null;
  const k = prog(t, at, 0.16, ease.in);
  const s = mix(2.3, 1, k) * (1 + 0.04 * Math.sin(clamp01((t - at - 0.16) / 0.2) * Math.PI));
  const bg = cor === "red" ? "#D2392E" : cor === "green" ? A.hex : "#F4F5F7";
  const fg = cor === "green" ? A.ink : cor === "white" ? "#111" : "#fff";
  return (
    <div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%, -50%) rotate(${rot}deg) scale(${s})`, opacity: Math.min(1, k * 2.5), background: bg, color: fg, border: "7px solid #fff", borderRadius: 18, padding: `${size * 0.22}px ${size * 0.42}px`, fontFamily: F.sans, fontWeight: 800, fontSize: size, lineHeight: 1, letterSpacing: "-0.02em", whiteSpace: "nowrap", textAlign: "center", boxShadow: `0 18px 40px rgba(0,0,0,0.55)${cor === "green" ? `, 0 0 50px ${aa(0.35)}` : ""}` }}>
      {texto}
      {sub ? <div style={{ fontSize: size * 0.42, marginTop: size * 0.14, fontWeight: 700, opacity: 0.9 }}>{sub}</div> : null}
    </div>
  );
};

/** Selo de topo (título da cena), pop elástico. */
export const Selo: React.FC<{ t: number; at: number; texto: string; cor?: "green" | "red" | "white"; top?: number; size?: number }> = ({ t, at, texto, cor = "white", top = 285, size = 56 }) => {
  const s = pop(t, at);
  if (s <= 0.001) return null;
  const c = cor === "green" ? A.hex : cor === "red" ? RED : C.text;
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top, display: "flex", justifyContent: "center" }}>
      <div style={{ transform: `scale(${0.5 + 0.5 * s})`, opacity: Math.min(1, s * 3), fontFamily: F.sans, fontWeight: 800, fontSize: size, letterSpacing: "-0.02em", color: c, WebkitTextStroke: "10px #0A0A0C", paintOrder: "stroke fill", textShadow: "0 8px 24px rgba(0,0,0,0.6)", whiteSpace: "nowrap" }}>{texto}</div>
    </div>
  );
};

/** Etiqueta de objeto (pílula), pop elástico. HTML absoluto. */
export const Etiqueta: React.FC<{ t: number; at: number; x: number; y: number; texto: string; cor?: "green" | "red" | "white" | "dark"; size?: number }> = ({ t, at, x, y, texto, cor = "dark", size = 36 }) => {
  const s = pop(t, at);
  if (s <= 0.001) return null;
  const [bg, fg, bd] = { green: [A.hex, A.ink, "#fff"], red: ["#D2392E", "#fff", "#fff"], white: ["#F4F5F7", "#111", "#111"], dark: ["#111318", "#F4F5F7", "rgba(255,255,255,0.85)"] }[cor];
  return (
    <div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%, -50%) scale(${0.5 + 0.5 * s})`, opacity: Math.min(1, s * 3), background: bg, color: fg, border: `5px solid ${bd}`, borderRadius: 999, padding: `${size * 0.28}px ${size * 0.6}px`, fontFamily: F.sans, fontWeight: 800, fontSize: size, lineHeight: 1, whiteSpace: "nowrap", boxShadow: "0 12px 28px rgba(0,0,0,0.5)" }}>{texto}</div>
  );
};

/** Símbolo de proibido sobre um objeto. */
export const Proibido: React.FC<{ t: number; at: number; x: number; y: number; r?: number }> = ({ t, at, x, y, r = 170 }) => (
  <Pop t={t} at={at} x={x} y={y}>
    <circle r={r} fill="none" stroke="#D2392E" strokeWidth={r * 0.16} />
    <line x1={-r * 0.7} y1={r * 0.7} x2={r * 0.7} y2={-r * 0.7} stroke="#D2392E" strokeWidth={r * 0.16} strokeLinecap="round" />
  </Pop>
);

/** Confete (chuva de papéis) a partir de `at`. */
export const Confete: React.FC<{ t: number; at: number; n?: number }> = ({ t, at, n = 60 }) => {
  if (t < at) return null;
  const d = t - at;
  const cores = [A.hex, "#F4F5F7", "#8FB4E3", "#FF6B5E"];
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const x0 = rnd(i * 1.7) * 1080;
        const y = -40 + d * (420 + rnd(i * 4.1) * 380) - rnd(i * 2.9) * 300;
        if (y < -60 || y > 1960) return null;
        return <rect key={i} x={x0 + Math.sin(d * 3 + i) * 40} y={y} width={16} height={9} fill={cores[i % 4]} transform={`rotate(${d * 300 + i * 37} ${x0} ${y})`} opacity={0.9} />;
      })}
    </g>
  );
};

/* ---------- objetos reutilizáveis (promovidos do piloto ATIVO_PILOTO_01) ---------- */
export const Pasta: React.FC<{ s?: number; label?: string; cor?: string }> = ({ s = 1, label, cor = "#E0A43A" }) => (
  <g transform={`scale(${s})`}>
    <path d="M-80 -60 L-30 -60 L-18 -46 L80 -46 L80 50 L-80 50 Z" fill={cor} />
    <rect x={-80} y={-34} width={160} height={84} rx={6} fill="#F0B94E" />
    {label ? <text x={0} y={18} textAnchor="middle" fontFamily={F.sans} fontWeight={800} fontSize={30} fill="#3A2A10">{label}</text> : null}
  </g>
);
export const Cadeado: React.FC<{ s?: number; cor?: string }> = ({ s = 1, cor = "#C9CED6" }) => (
  <g transform={`scale(${s})`}>
    <path d="M-30 -10 L-30 -40 A30 30 0 0 1 30 -40 L30 -10" fill="none" stroke={cor} strokeWidth={14} />
    <rect x={-48} y={-14} width={96} height={78} rx={14} fill={cor} />
    <rect x={8} y={-14} width={40} height={78} fill="#000" opacity={0.12} />
    <circle cx={0} cy={18} r={11} fill="#222" />
  </g>
);
export const Chave: React.FC = () => (
  <g fill={A.hex}>
    <circle cx={0} cy={0} r={22} />
    <circle cx={0} cy={0} r={9} fill="#0A0A0C" />
    <rect x={16} y={-6} width={60} height={12} rx={4} />
    <rect x={58} y={4} width={9} height={16} />
    <rect x={44} y={4} width={9} height={12} />
  </g>
);
export const Raio: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <path transform={`scale(${s})`} d="M10 -120 L-50 10 L-6 10 L-24 120 L50 -20 L4 -20 Z" fill="#FFD9D4" stroke="#D2392E" strokeWidth={10} strokeLinejoin="round" />
);
export const Balao: React.FC<{ texto: string; w?: number; cor?: string; size?: number; cauda?: 1 | -1 }> = ({ texto, w = 150, cor = "#F4F5F7", size = 64, cauda = 1 }) => (
  <g>
    <rect x={-w / 2} y={-70} width={w} height={110} rx={40} fill={cor} />
    <path d={cauda === 1 ? "M-20 38 L-40 78 L10 38 Z" : "M20 38 L40 78 L-10 38 Z"} fill={cor} />
    <text x={0} y={-15 + size * 0.45} textAnchor="middle" fontFamily={F.sans} fontWeight={800} fontSize={size} fill="#111">{texto}</text>
  </g>
);
/** Folha de calendário (mês em destaque). Centro em (0,0). */
export const Calendario: React.FC<{ mes: string; cor?: string }> = ({ mes, cor = "#D2392E" }) => (
  <g>
    <rect x={-130} y={-120} width={260} height={250} rx={24} fill="#000" opacity={0.35} transform="translate(10 14)" />
    <rect x={-130} y={-120} width={260} height={250} rx={24} fill="#F4F5F7" />
    <rect x={-130} y={-120} width={260} height={80} rx={24} fill={cor} />
    <rect x={-130} y={-64} width={260} height={24} fill={cor} />
    {[-70, 70].map((x) => <rect key={x} x={x - 9} y={-146} width={18} height={50} rx={9} fill="#2A2D33" />)}
    <text x={0} y={-62} textAnchor="middle" fontFamily={F.sans} fontWeight={800} fontSize={40} fill="#fff">{mes}</text>
    {Array.from({ length: 12 }, (_, i) => <rect key={i} x={-104 + (i % 4) * 56} y={-12 + Math.floor(i / 4) * 44} width={40} height={30} rx={6} fill="#C9CED6" />)}
  </g>
);
/** Balança da Justiça. `incl` = inclinação (−1 esquerda pesa … 1 direita pesa). Base em (0,0). */
export const Balanca: React.FC<{ incl?: number; s?: number; cor?: string }> = ({ incl = 0, s = 1, cor = "#E0A43A" }) => {
  const a = incl * 14;
  const ly = Math.sin((a * Math.PI) / 180) * 180;
  return (
    <g transform={`scale(${s})`}>
      <ellipse cx={0} cy={6} rx={150} ry={20} fill="#000" opacity={0.4} />
      <rect x={-110} y={-30} width={220} height={30} rx={10} fill={cor} />
      <rect x={-14} y={-420} width={28} height={400} fill={cor} />
      <rect x={4} y={-420} width={10} height={400} fill="#000" opacity={0.12} />
      <circle cx={0} cy={-430} r={26} fill={cor} />
      <g transform={`rotate(${a} 0 -420)`}><rect x={-190} y={-428} width={380} height={16} rx={8} fill={cor} /></g>
      {[-1, 1].map((k) => {
        const px = k * 180, py = -420 + k * ly;
        return (
          <g key={k}>
            <path d={`M${px} ${py} L${px - 80} ${py + 150} M${px} ${py} L${px + 80} ${py + 150}`} stroke="#C9CED6" strokeWidth={4} />
            <path d={`M${px - 100} ${py + 150} Q${px} ${py + 210} ${px + 100} ${py + 150} Z`} fill={cor} />
          </g>
        );
      })}
    </g>
  );
};
/** Fumaça de "sumiço" (puff): 7 nuvens que crescem e somem em 0,6 s a partir de `at`. Centro em (0,0). */
export const Fumaca: React.FC<{ t: number; at: number; r?: number }> = ({ t, at, r = 120 }) => {
  if (t < at || t > at + 0.7) return null;
  const p = (t - at) / 0.7;
  return (
    <g opacity={1 - p}>
      {Array.from({ length: 7 }, (_, i) => {
        const ang = (i / 7) * Math.PI * 2;
        const d = r * 0.5 * (0.3 + p);
        return <circle key={i} cx={Math.cos(ang) * d} cy={Math.sin(ang) * d - 40} r={r * (0.35 + 0.4 * p)} fill="#D9DCE2" />;
      })}
    </g>
  );
};
/** Documento com checklist que marca cada item quando a palavra é dita. Centro em (0,0); itens [{k, at}]. */
export const Checklist: React.FC<{ t: number; titulo: string; itens: { k: string; at: number }[]; w?: number; topo?: string }> = ({ t, titulo, itens, w = 680, topo = "#2C3E66" }) => {
  const h = 150 + itens.length * 112;
  return (
    <g>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={18} fill="#000" opacity={0.35} transform="translate(14 18)" />
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={18} fill={C.paper} />
      <rect x={-w / 2} y={-h / 2} width={w} height={90} rx={18} fill={topo} />
      <rect x={-w / 2} y={-h / 2 + 60} width={w} height={30} fill={topo} />
      <text x={0} y={-h / 2 + 58} textAnchor="middle" fontFamily={F.sans} fontWeight={800} fontSize={40} fill="#fff">{titulo}</text>
      {itens.map((q, i) => {
        const on = t >= q.at;
        const k = on ? pop(t, q.at) : 0;
        return (
          <g key={q.k} transform={`translate(${-w / 2 + 50} ${-h / 2 + 150 + i * 112})`}>
            <rect x={0} y={-38} width={76} height={76} rx={14} fill={on ? A.hex : "none"} stroke="#111" strokeWidth={6} />
            {on ? <g transform={`translate(38 0) scale(${0.5 + 0.5 * k})`}><path d="M-22 2 L-6 18 L24 -16" fill="none" stroke={A.ink} strokeWidth={11} strokeLinecap="round" strokeLinejoin="round" /></g> : null}
            <text x={104} y={14} fontFamily={F.sans} fontWeight={800} fontSize={42} fill={on ? "#111" : "#9A968E"}>{q.k}</text>
          </g>
        );
      })}
    </g>
  );
};
export const Avatar: React.FC<{ v: Visual; r?: number; borda?: string }> = ({ v, r = 120, borda = "#fff" }) => (
  <g>
    <circle r={r} fill="#1A1D24" stroke={borda} strokeWidth={10} />
    <clipPath id={`av_${v.terno}_${r}`}><circle r={r - 5} /></clipPath>
    <g clipPath={`url(#av_${v.terno}_${r})`}>
      <path d={`M${-r * 0.8} ${r} Q${-r * 0.8} ${r * 0.3} 0 ${r * 0.3} Q${r * 0.8} ${r * 0.3} ${r * 0.8} ${r} Z`} fill={v.terno} />
      <circle cx={0} cy={-r * 0.18} r={r * 0.42} fill={v.pele} />
      <path d={`M${-r * 0.43} ${-r * 0.24} C${-r * 0.46} ${-r * 0.72} ${r * 0.46} ${-r * 0.72} ${r * 0.43} ${-r * 0.24} C${r * 0.3} ${-r * 0.4} ${-r * 0.3} ${-r * 0.4} ${-r * 0.43} ${-r * 0.24} Z`} fill={v.cabelo} />
      <circle cx={-r * 0.15} cy={-r * 0.2} r={r * 0.06} fill="#111" />
      <circle cx={r * 0.15} cy={-r * 0.2} r={r * 0.06} fill="#111" />
    </g>
  </g>
);
export const Check: React.FC<{ r?: number }> = ({ r = 46 }) => (
  <g>
    <circle r={r} fill={A.hex} stroke="#fff" strokeWidth={7} />
    <path d={`M${-r * 0.42} 0 L${-r * 0.1} ${r * 0.32} L${r * 0.45} ${-r * 0.32}`} fill="none" stroke={A.ink} strokeWidth={r * 0.2} strokeLinecap="round" strokeLinejoin="round" />
  </g>
);
export const Moedas: React.FC = () => (
  <g>
    {[0, 1, 2, 3].map((k) => <g key={k} transform={`translate(0 ${-k * 26})`}><ellipse rx={70} ry={22} cy={12} fill="#A8761E" /><ellipse rx={70} ry={22} fill="#E0A43A" /></g>)}
    <circle cx={0} cy={-150} r={52} fill="#F4F5F7" stroke="#111" strokeWidth={6} />
    <text x={0} y={-131} textAnchor="middle" fontFamily={F.sans} fontWeight={800} fontSize={56} fill="#111">%</text>
  </g>
);
export const Escudo: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <g transform={`scale(${s})`}>
    <path d="M0 -150 L120 -105 Q122 40 0 140 Q-122 40 -120 -105 Z" fill={A.hex} stroke="#fff" strokeWidth={10} />
    <path d="M0 -150 L120 -105 Q122 40 0 140 Z" fill="#000" opacity={0.12} />
    <g transform="translate(0 -6)"><Cadeado s={1.05} cor={A.ink} /></g>
  </g>
);


const NEG = /^(isoladas|nem|acontecer|qualquer|pessoa|competir|não)[,.?!]*$/i;

/**
 * Legenda karaokê no CENTRO (padrão das referências): 1–3 palavras, ainda não falada = cinza, falada = branca e "salta",
 * palavra-chave = verde da marca, palavra negativa = vermelho. Contorno escuro grosso para ler sobre qualquer cena.
 */
export const LegendaKaraoke: React.FC<{ t: number; chunks: CaptionChunk[]; y?: number; size?: number; negativas?: RegExp }> = ({ t, chunks, y = 1040, size = 80, negativas }) => {
  const chunk = chunks.find((c) => t >= c.start - 0.02 && t < c.end);
  if (!chunk) return null;
  const inS = pop(t, chunk.start - 0.02);
  return (
    <div style={{ position: "absolute", left: 80, right: 80, top: y - size * 1.1, height: size * 2.2, display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", columnGap: size * 0.24, rowGap: 0, transform: `scale(${0.85 + 0.15 * inS})`, fontFamily: F.sans, fontWeight: 800, fontSize: size, lineHeight: 1.02, letterSpacing: "-0.03em", textTransform: "uppercase" }}>
      {chunk.words.map((w, i) => {
        const dita = t >= w.start - 0.03;
        const sal = dita ? pop(t, w.start - 0.03) : 0;
        // negativa: lista fixa, lista do episódio, ou palavra logo depois de "não/nem" no mesmo bloco ("NÃO PROVA")
        const prev = i > 0 ? chunk.words[i - 1].text : "";
        const neg = NEG.test(w.text) || (negativas ? negativas.test(w.text) : false) || (/^(não|nem)$/i.test(prev) && w.emph);
        const cor = !dita ? "#8B9099" : neg && (w.emph || /^(não|nem)$/i.test(w.text)) ? RED : w.emph ? A.hex : "#FFFFFF";
        return (
          <span key={i} style={{ display: "inline-block", color: cor, WebkitTextStroke: `${size * 0.16}px #0A0A0C`, paintOrder: "stroke fill", textShadow: "0 6px 18px rgba(0,0,0,0.7)", transform: `scale(${dita ? 1 + 0.12 * Math.min(1, 6 / Math.max(1, w.text.length)) * Math.sin(clamp01(sal) * Math.PI) : 1})`, whiteSpace: "nowrap" }}>{w.text}</span>
        );
      })}
    </div>
  );
};

/**
 * Gesto com ANTECIPAÇÃO → passa do ponto → assenta: o valor recua 12% no sentido contrário nos 0,1 s antes de `at`,
 * depois vai até `para` por mola (overshoot natural ~8%). Use em ângulos de braço, deslocamentos e escalas de ação.
 */
export const gesto = (t: number, at: number, de: number, para: number) => {
  const d = para - de;
  if (t < at - 0.1) return de;
  if (t < at) return de - d * 0.12 * ((t - (at - 0.1)) / 0.1);
  return mix(de - d * 0.12, para, sp(t, at, { damping: 10, stiffness: 220, mass: 0.7 }));
};

/** Instantes (s) das palavras enfatizadas (*palavra* no roteiro) — alimenta `acentos` dos personagens. */
export const acentosDe = (chunks: CaptionChunk[], de = 0, ate = 1e9) => chunks.flatMap((c) => c.words.filter((w) => w.emph && w.start >= de && w.start < ate).map((w) => w.start));

/** Flash branco curto (salto de tempo/lugar ou revelação): 6 quadros por padrão. */
export const Flash: React.FC<{ t: number; at: number; dur?: number; max?: number }> = ({ t, at, dur = 0.2, max = 0.85 }) => {
  if (t < at || t > at + dur) return null;
  return <div style={{ position: "absolute", inset: 0, background: "#fff", opacity: max * (1 - (t - at) / dur) }} />;
};

/** Contador rolando (número sobe em ~1 s com desaceleração) — HTML absoluto, centralizado em (x, y). */
export const Contador: React.FC<{ t: number; at: number; de: number; ate: number; x: number; y: number; dur?: number; size?: number; prefixo?: string; sufixo?: string; cor?: "white" | "green" | "red"; casas?: number }> = ({ t, at, de, ate, x, y, dur = 1, size = 120, prefixo = "", sufixo = "", cor = "white", casas = 0 }) => {
  const s = pop(t, at);
  if (s <= 0.001) return null;
  const v = mix(de, ate, prog(t, at, dur, ease.out));
  const txt = v.toLocaleString("pt-BR", { minimumFractionDigits: casas, maximumFractionDigits: casas });
  return (
    <div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%, -50%) scale(${0.5 + 0.5 * s})`, fontFamily: F.sans, fontWeight: 800, fontSize: size, color: cor === "green" ? A.hex : cor === "red" ? RED : "#fff", WebkitTextStroke: `${size * 0.12}px #0A0A0C`, paintOrder: "stroke fill", whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums" }}>
      {prefixo}{txt}{sufixo}
    </div>
  );
};

/** Barra que cresce de baixo (comparações). SVG; base em (x, base). */
export const Barra: React.FC<{ t: number; at: number; x: number; base: number; w?: number; h: number; cor?: string; rotulo?: string }> = ({ t, at, x, base, w = 150, h, cor = A.hex, rotulo }) => {
  const k = t < at ? 0 : sp(t, at, { damping: 13, stiffness: 160 });
  if (k <= 0.001) return null;
  const hh = h * k;
  return (
    <g>
      <rect x={x - w / 2} y={base - hh} width={w} height={hh} rx={14} fill={cor} />
      <rect x={x + w * 0.18} y={base - hh} width={w * 0.32} height={hh} rx={8} fill="#000" opacity={0.15} />
      {rotulo ? <text x={x} y={base + 52} textAnchor="middle" fontFamily={F.sans} fontWeight={800} fontSize={36} fill="#fff">{rotulo}</text> : null}
    </g>
  );
};

/** Mão cartoon apontando (indicador para cima). Ponta do dedo em (0,0). */
export const Mao: React.FC<{ pele?: string; manga?: string }> = ({ pele = "#E8B48C", manga = "#2C3E66" }) => (
  <g>
    <rect x={-18} y={-4} width={36} height={86} rx={18} fill={pele} />
    <rect x={-46} y={52} width={112} height={110} rx={40} fill={pele} />
    <rect x={14} y={60} width={52} height={100} rx={26} fill="#000" opacity={0.08} />
    <rect x={-52} y={150} width={124} height={130} rx={18} fill={manga} />
  </g>
);

const IconeCasa = () => <g><path d="M-60 0 L0 -52 L60 0 Z" fill="#B5483A" /><rect x={-44} y={0} width={88} height={60} fill="#E9E2D6" /><rect x={-12} y={22} width={24} height={38} fill="#5A3A2A" /></g>;
const IconePessoa = () => <g><circle cx={0} cy={-22} r={30} fill="#E8B48C" /><path d="M-52 60 Q-52 10 0 10 Q52 10 52 60 Z" fill="#D7883A" /></g>;
const IconeChat = () => <g><rect x={-62} y={-44} width={124} height={84} rx={26} fill="#F4F5F7" /><path d="M-20 38 L-36 66 L4 38 Z" fill="#F4F5F7" />{[-28, 0, 28].map((x) => <circle key={x} cx={x} cy={-2} r={9} fill="#2A2D33" />)}</g>;

/**
 * FECHO CTA no estilo cartoon (mesmo conteúdo da CTA SISTEMA → Direct): 3 cartões IMÓVEIS / LEADS / ATENDIMENTOS entram
 * nas palavras; cartão "COMENTE" digita SISTEMA quando a palavra é dita; a mão toca ENVIAR; avião de papel voa até o Direct;
 * no fim a mão toca SEGUIR → SEGUINDO ✓ (eco do fecho das referências; opcional). Corretor A à esquerda, logo oficial no rodapé.
 */
export const CtaCartoon: React.FC<{ t: number; tl: { captions: CaptionChunk[]; cues: Record<string, number>; duration: number }; segPergunta: string; segComente: string; logo: string; seguir?: boolean; personagem?: Visual }> = ({ t, tl, segPergunta, segComente, logo, seguir = true, personagem = VIS.A }) => {
  const wAt = (seg: string, re: RegExp, fb: number) => {
    for (const k of tl.captions) if (k.seg === seg) for (const w of k.words) if (re.test(w.text)) return w.start;
    return fb;
  };
  const c = tl.cues;
  const t0 = tl.captions.find((k) => k.seg === segPergunta)?.start ?? c.cta_quer;
  const tCom = tl.captions.find((k) => k.seg === segComente)?.start ?? c.cta_comment;
  const tSis = wAt(segComente, /sistema/i, tCom + 0.5);
  const tDir = wAt(segComente, /direct/i, tCom + 2.4);
  const itens = [
    { k: "IMÓVEIS", at: wAt(segPergunta, /im[óo]veis/i, t0 + 2.4), icon: <IconeCasa />, x: 230 },
    { k: "LEADS", at: wAt(segPergunta, /leads/i, t0 + 2.9), icon: <IconePessoa />, x: 540 },
    { k: "ATENDIMENTOS", at: wAt(segPergunta, /atendimentos/i, t0 + 3.6), icon: <IconeChat />, x: 850 },
  ];
  const sai = prog(t, tCom - 0.15, 0.3, ease.in);
  const card = pop(t, tCom - 0.05);
  const typed = Math.round(prog(t, tSis, 0.45, ease.linear) * 7);
  const tEnv = tSis + 0.75;
  const maoEnv = prog(t, tSis + 0.3, 0.4, ease.out);
  const clickEnv = Math.sin(Math.PI * prog(t, tEnv, 0.16, ease.linear));
  const voo = prog(t, tEnv + 0.1, 0.9, ease.inOut);
  const tSeg = Math.max(tDir + 0.9, Math.min(tl.duration - 1.1, tDir + 1.2));
  const maoSeg = prog(t, tSeg - 0.5, 0.45, ease.out) * (1 - prog(t, tSeg + 0.3, 0.4, ease.in));
  const clickSeg = Math.sin(Math.PI * prog(t, tSeg, 0.16, ease.linear));
  const seguindo = t >= tSeg + 0.08;
  const [hx, hy] = tremor(t, [tEnv, tSeg]);
  const fim = prog(t, tl.duration - 0.45, 0.45, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, transform: `translate(${hx * 0.5}px, ${hy * 0.5}px)` }}>
      <Selo t={t} at={t0 + 0.05} texto="SISTEMA PERSONALIZADO" cor="green" size={52} />
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
        <Holofote x={250} chao={1540} w={420} />
        <Personagem t={t} x={250} y={1540} s={0.8} v={personagem} humor="feliz" braco={gesto(t, t0 + 0.3, 10, 150)} acentos={acentosDe(tl.captions, t0)} fala={false} />
        {/* cartões do sistema */}
        <g opacity={1 - sai} transform={`translate(0 ${-sai * 120})`}>
          {itens.map((q) => (
            <Pop key={q.k} t={t} at={q.at - 0.05} x={q.x} y={620}>
              <rect x={-140} y={-160} width={280} height={300} rx={34} fill="#13161B" stroke={A.hex} strokeWidth={7} />
              <g transform="translate(0 -40)">{q.icon}</g>
              <text x={0} y={95} textAnchor="middle" fontFamily={F.sans} fontWeight={800} fontSize={q.k.length > 8 ? 30 : 38} fill="#fff">{q.k}</text>
            </Pop>
          ))}
        </g>
        {/* avião de papel até o Direct */}
        {voo > 0 && voo < 1 ? (
          <g transform={`translate(${mix(880, 700, voo)} ${mix(560, 780, voo) - Math.sin(voo * Math.PI) * 260}) rotate(${-20 + voo * 30}) scale(${1.7 - voo * 0.6})`} opacity={1 - prog(voo, 0.8, 0.2, ease.linear)}>
            <path d="M-50 10 L60 -30 L-10 40 Z" fill="#fff" /><path d="M-10 40 L0 10 L60 -30 Z" fill="#C9CED6" />
          </g>
        ) : null}
      </svg>
      {/* cartão COMENTE */}
      {card > 0.001 ? (
        <div style={{ position: "absolute", left: 110, top: 420, width: 860, transform: `scale(${0.5 + 0.5 * card})`, transformOrigin: "540px 200px", opacity: Math.min(1, card * 3), background: "#F4F5F7", borderRadius: 40, border: "8px solid #0A0A0C", boxShadow: `0 30px 60px rgba(0,0,0,0.5), 0 0 60px ${aa(0.25)}`, padding: "34px 40px 40px", boxSizing: "border-box", fontFamily: F.sans }}>
          <div style={{ fontWeight: 800, fontSize: 64, color: "#111", letterSpacing: "-0.02em" }}>COMENTE:</div>
          <div style={{ marginTop: 22, display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ flex: 1, height: 120, borderRadius: 60, background: "#fff", border: "5px solid #111", display: "flex", alignItems: "center", padding: "0 34px", fontWeight: 800, fontSize: 72, color: "#111", letterSpacing: "0.02em" }}>
              {"SISTEMA".slice(0, typed)}<span style={{ opacity: typed < 7 && Math.floor(t * 3) % 2 === 0 ? 1 : 0, color: "#888" }}>|</span>
            </div>
            <div style={{ width: 120, height: 120, borderRadius: 60, background: A.hex, border: "5px solid #111", display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${1 - clickEnv * 0.12})` }}>
              <svg width={64} height={64} viewBox="0 0 24 24"><path d="M3 11.5 21 3l-8.5 18-2-7.5z" fill={A.ink} /></svg>
            </div>
          </div>
          <div style={{ marginTop: 26, fontWeight: 700, fontSize: 40, color: "#333", opacity: prog(t, tDir - 0.2, 0.3) }}>
            → detalhes pelo <span style={{ color: "#111", fontWeight: 800, background: A.hex, padding: "2px 14px", borderRadius: 12 }}>Direct</span>
          </div>
        </div>
      ) : null}
      {/* SEGUIR → SEGUINDO */}
      {seguir ? (
        <div style={{ position: "absolute", left: 560, top: 1180, width: 400, height: 110, borderRadius: 30, background: seguindo ? "#262B33" : A.hex, border: "6px solid #0A0A0C", display: "flex", alignItems: "center", justifyContent: "center", gap: 14, fontFamily: F.sans, fontWeight: 800, fontSize: 52, color: seguindo ? "#fff" : A.ink, transform: `scale(${(0.5 + 0.5 * pop(t, tDir)) * (1 - clickSeg * 0.1)})`, opacity: Math.min(1, pop(t, tDir) * 3), boxShadow: "0 16px 30px rgba(0,0,0,0.5)" }}>
          {seguindo ? <>SEGUINDO <span style={{ color: A.hex }}>✓</span></> : "SEGUIR"}
        </div>
      ) : null}
      <img src={logo} style={{ position: "absolute", left: 760 - 120, top: 1350, height: 64, opacity: prog(t, tDir, 0.4), filter: `drop-shadow(0 0 14px ${aa(0.4)})` }} />
      {/* mão: primeiro no ENVIAR, depois no SEGUIR */}
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, overflow: "visible", pointerEvents: "none" }}>
        {t >= tSis + 0.3 && t < tSeg - 0.55 ? (
          <g transform={`translate(${mix(1150, 870, maoEnv)} ${mix(1100, 640, maoEnv) + clickEnv * 14}) rotate(-12)`} opacity={1 - prog(t, tEnv + 0.5, 0.3)}><Mao manga={personagem.terno} pele={personagem.pele} /></g>
        ) : null}
        {seguir && t >= tSeg - 0.5 && maoSeg > 0.01 ? (
          <g transform={`translate(${mix(1150, 800, maoSeg)} ${mix(1700, 1250, maoSeg) + clickSeg * 14}) rotate(-12)`}><Mao manga={personagem.terno} pele={personagem.pele} /></g>
        ) : null}
      </svg>
      {fim > 0 ? <div style={{ position: "absolute", inset: 0, background: "#000", opacity: fim * 0.85 }} /> : null}
    </div>
  );
};
