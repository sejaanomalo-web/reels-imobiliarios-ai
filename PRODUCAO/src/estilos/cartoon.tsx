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
  braco?: number; bracoE?: number; seed?: number; item?: React.ReactNode; sombra?: boolean;
}> = ({ t, x, y, s = 1, v, humor = "neutro", fala = false, olhar = 0, flip = false, braco = 8, bracoE = -8, seed = 0, item, sombra = true }) => {
  const resp = Math.sin(t * 2.4 + seed) * 0.012;
  const pisca = ((t + seed * 0.37) % 3.4) < 0.11;
  const boca = fala ? 0.35 + 0.65 * Math.abs(Math.sin(t * 15 + seed)) * (0.6 + 0.4 * Math.sin(t * 5.3)) : 0;
  const brow = { neutro: 0, feliz: -6, bravo: 16, espanto: -14, triste: -10 }[humor];
  const browY = humor === "espanto" ? -12 : 0;
  const headY = -420 + Math.sin(t * 2.4 + seed) * 3;
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
      <g transform={`translate(0 ${headY + 420})`}>
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

const NEG = /^(isoladas|nem|acontecer|qualquer|pessoa|competir|não)[,.?!]*$/i;

/**
 * Legenda karaokê no CENTRO (padrão das referências): 1–3 palavras, ainda não falada = cinza, falada = branca e "salta",
 * palavra-chave = verde da marca, palavra negativa = vermelho. Contorno escuro grosso para ler sobre qualquer cena.
 */
export const LegendaKaraoke: React.FC<{ t: number; chunks: CaptionChunk[]; y?: number; size?: number }> = ({ t, chunks, y = 1040, size = 80 }) => {
  const chunk = chunks.find((c) => t >= c.start - 0.02 && t < c.end);
  if (!chunk) return null;
  const inS = pop(t, chunk.start - 0.02);
  return (
    <div style={{ position: "absolute", left: 80, right: 80, top: y - size * 1.1, height: size * 2.2, display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", columnGap: size * 0.24, rowGap: 0, transform: `scale(${0.85 + 0.15 * inS})`, fontFamily: F.sans, fontWeight: 800, fontSize: size, lineHeight: 1.02, letterSpacing: "-0.03em", textTransform: "uppercase" }}>
      {chunk.words.map((w, i) => {
        const dita = t >= w.start - 0.03;
        const sal = dita ? pop(t, w.start - 0.03) : 0;
        const neg = NEG.test(w.text);
        const cor = !dita ? "#8B9099" : neg && (w.emph || /^(não|nem)$/i.test(w.text)) ? RED : w.emph ? A.hex : "#FFFFFF";
        return (
          <span key={i} style={{ display: "inline-block", color: cor, WebkitTextStroke: `${size * 0.16}px #0A0A0C`, paintOrder: "stroke fill", textShadow: "0 6px 18px rgba(0,0,0,0.7)", transform: `scale(${dita ? 1 + 0.12 * Math.sin(clamp01(sal) * Math.PI) : 1})`, whiteSpace: "nowrap" }}>{w.text}</span>
        );
      })}
    </div>
  );
};
