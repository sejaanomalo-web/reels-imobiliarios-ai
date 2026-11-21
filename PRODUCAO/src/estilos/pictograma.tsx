import React from "react";
import { Img } from "remotion";
import { ACCENT_NOV26, C, F, accentAlpha } from "../theme";
import { clamp01, ease, mix, prog, rnd, sp } from "../lib/anim";
import type { CaptionChunk } from "../episodes/types";
import logoPts from "./ativo_logo_pontos.json";

/**
 * KIT "PICTOGRAMA CINEMATOGRÁFICO" — SEGUNDO MODELO (21/11/2026).
 * Gramática medida em 5 referências do cliente (358 s, 1 quadro/s + transições a 10 quadros/s):
 * fundo quase preto com centro morno, vinheta muito forte; boneco-pictograma branco luminoso; ícones e cenários em LINHA FINA;
 * UMA cor de acento (nas referências, dourado → aqui o verde da marca #02FB3F); vermelho só para perda/erro;
 * SEM corte seco: câmera em travelling contínuo, portal (zoom para dentro de um ícone), apagar a luz mantendo uma âncora,
 * dissolução em partículas; títulos que entram letra a letra saindo do desfoque; legenda que se escreve palavra a palavra.
 * Desenho 100% original. Identidade ATIVO: verde #02FB3F (único acento), Manrope, logo oficial (nunca redesenhada).
 */
export const A = ACCENT_NOV26;
export const aa = (a: number) => accentAlpha(A, a);
export const NOIR = {
  fundo: "#050505",
  centro: "#2B2723", // centro morno (as referências medem ~#352F2B no centro e #020202 nos cantos)
  branco: "#F4F4F2",
  cinza: "#6B6B6B",
  apagado: "#3A3A3A",
  linha: "rgba(244,244,242,0.78)",
  linhaFraca: "rgba(244,244,242,0.28)",
  vermelho: C.warn,
  vermelhoFundo: "#D2392E",
};
const GLOW_BRANCO = "drop-shadow(0 0 10px rgba(255,255,255,0.55)) drop-shadow(0 0 26px rgba(255,255,255,0.22))";
const GLOW_VERDE = `drop-shadow(0 0 10px ${aa(0.6)}) drop-shadow(0 0 28px ${aa(0.28)})`;

/** Liga/desliga uma cena com "apagar a luz": entra em `a` (fadeIn s) e apaga a partir de `b` (fadeOut s). */
export const luz = (t: number, a: number, b: number, fadeIn = 0.45, fadeOut = 0.55) => prog(t, a, fadeIn, ease.out) * (1 - prog(t, b, fadeOut, ease.inOut));

/* ---------------------------------------------------------------- fundo ---------------------------------------------------------------- */
/**
 * Fundo noir: preto + centro morno (radial) + vinheta forte + poeira flutuante. `chao` desenha a linha pontilhada do chão
 * (e, se `plano`, um piso levemente mais claro com textura de pontos). `quente` 0..1 controla o brilho do centro.
 */
export const FundoNoir: React.FC<{ t: number; cx?: number; cy?: number; quente?: number; chao?: number; plano?: boolean; poeira?: number; verde?: number }> = ({ t, cx = 540, cy = 860, quente = 1, chao, plano = false, poeira = 1, verde = 0 }) => (
  <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
    <defs>
      <radialGradient id="noir_c" cx={cx} cy={cy} r={900} gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor={NOIR.centro} stopOpacity={0.95 * quente} />
        <stop offset="0.55" stopColor={NOIR.centro} stopOpacity={0.25 * quente} />
        <stop offset="1" stopColor={NOIR.fundo} stopOpacity={0} />
      </radialGradient>
      <radialGradient id="noir_g" cx={cx} cy={cy} r={700} gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor={A.hex} stopOpacity={0.1 * verde} />
        <stop offset="1" stopColor={A.hex} stopOpacity={0} />
      </radialGradient>
      <radialGradient id="noir_v" cx={540} cy={900} r={1150} gradientUnits="userSpaceOnUse">
        <stop offset="0.35" stopColor="#000" stopOpacity={0} />
        <stop offset="1" stopColor="#000" stopOpacity={0.92} />
      </radialGradient>
      <pattern id="noir_p" width={14} height={14} patternUnits="userSpaceOnUse"><circle cx={2} cy={2} r={1.2} fill="rgba(255,255,255,0.07)" /></pattern>
    </defs>
    <rect width={1080} height={1920} fill={NOIR.fundo} />
    <rect width={1080} height={1920} fill="url(#noir_c)" />
    {verde > 0 ? <rect width={1080} height={1920} fill="url(#noir_g)" /> : null}
    {chao !== undefined && plano ? <rect x={0} y={chao} width={1080} height={1920 - chao} fill="#0C0B0A" /> : null}
    {chao !== undefined && plano ? <rect x={0} y={chao} width={1080} height={1920 - chao} fill="url(#noir_p)" /> : null}
    {chao !== undefined ? <line x1={0} y1={chao} x2={1080} y2={chao} stroke="rgba(244,244,242,0.32)" strokeWidth={2} strokeDasharray="3 9" /> : null}
    {Array.from({ length: Math.round(72 * poeira) }, (_, i) => {
      const x = rnd(i * 2.7) * 1080 + Math.sin(t * 0.3 + i) * 18;
      const y = ((rnd(i * 5.1) * 1920 - t * (6 + rnd(i) * 14)) % 1920 + 1920) % 1920;
      return <circle key={i} cx={x} cy={y} r={0.9 + rnd(i * 3.3) * 2.2} fill="#fff" opacity={0.06 + 0.22 * (0.5 + 0.5 * Math.sin(t * (0.8 + rnd(i)) + i))} />;
    })}
    <rect width={1080} height={1920} fill="url(#noir_v)" />
  </svg>
);

/** Holofote suave vindo de cima (cone) + brilho no chão. */
export const Holofote: React.FC<{ x: number; chao: number; topo?: number; w?: number; p?: number; cor?: string; inclina?: number }> = ({ x, chao, topo = 0, w = 420, p = 1, cor = "#FFFFFF", inclina = 0 }) => {
  const id = `hn_${Math.round(x)}_${Math.round(chao)}`;
  return (
    <g opacity={clamp01(p)}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={cor} stopOpacity={0.16} />
          <stop offset="1" stopColor={cor} stopOpacity={0.05} />
        </linearGradient>
        <radialGradient id={`${id}_e`}>
          <stop offset="0" stopColor={cor} stopOpacity={0.28} />
          <stop offset="1" stopColor={cor} stopOpacity={0} />
        </radialGradient>
      </defs>
      <path d={`M${x + inclina - 40} ${topo} L${x + inclina + 40} ${topo} L${x + w / 2} ${chao} L${x - w / 2} ${chao} Z`} fill={`url(#${id})`} />
      <ellipse cx={x} cy={chao} rx={w * 0.62} ry={54} fill={`url(#${id}_e)`} />
    </g>
  );
};

/** Halo de luz atrás de algo (brilho morno ou verde). */
export const Halo: React.FC<{ x: number; y: number; r?: number; cor?: string; p?: number }> = ({ x, y, r = 260, cor = "#FFFFFF", p = 1 }) => {
  const id = `halo_${Math.round(x)}_${Math.round(y)}_${Math.round(r)}`;
  return (
    <g opacity={clamp01(p)}>
      <defs>
        <radialGradient id={id}>
          <stop offset="0" stopColor={cor} stopOpacity={0.22} />
          <stop offset="1" stopColor={cor} stopOpacity={0} />
        </radialGradient>
      </defs>
      <circle cx={x} cy={y} r={r} fill={`url(#${id})`} />
    </g>
  );
};

/* ---------------------------------------------------------------- personagem ---------------------------------------------------------------- */
export type Pose = "pe" | "andando" | "subindo" | "sentado" | "deitado" | "apontando" | "celular" | "comemorando" | "cabisbaixo" | "bracosAbertos";
export type Tom = "luz" | "cinza" | "verde" | "apagado" | "fantasma";
const rad = (d: number) => (d * Math.PI) / 180;
const membro = (x: number, y: number, a1: number, l1: number, a2: number, l2: number) => {
  // ângulos em graus a partir da vertical para baixo (0 = pendurado; + = para a frente/direita)
  const kx = x + Math.sin(rad(a1)) * l1, ky = y + Math.cos(rad(a1)) * l1;
  const fx = kx + Math.sin(rad(a2)) * l2, fy = ky + Math.cos(rad(a2)) * l2;
  return `M${x} ${y} L${kx} ${ky} L${fx} ${fy}`;
};

/**
 * Boneco-pictograma (cabeça redonda separada do corpo, membros em cápsula, sem rosto). Pés em (x, y); altura ≈ 290·s.
 * `fase` move o ciclo de caminhada (use t × passos/s). `tom`: luz (branco com brilho, protagonista), cinza (outros/passado),
 * verde (versão de sucesso/futuro, com brilho verde), apagado (fundo), fantasma (contorno). `olha` −1/1 inclina a cabeça.
 */
export const Figura: React.FC<{ t: number; x: number; y: number; s?: number; pose?: Pose; tom?: Tom; fase?: number; flip?: boolean; p?: number; respira?: boolean; item?: "celular" | "pasta" | "chave" }> = ({ t, x, y, s = 1, pose = "pe", tom = "luz", fase = 0, flip = false, p = 1, respira = true, item }) => {
  const cor = tom === "luz" ? NOIR.branco : tom === "verde" ? A.hex : tom === "cinza" ? NOIR.cinza : tom === "apagado" ? NOIR.apagado : "none";
  const contorno = tom === "fantasma";
  const ph = fase * Math.PI * 2;
  const bob = pose === "andando" || pose === "subindo" ? Math.abs(Math.sin(ph)) * -6 : respira ? Math.sin(t * 2.2) * 1.5 : 0;
  // esqueleto (local, pés em 0)
  const hip = { x: 0, y: -128 + bob };
  const ombro = { x: 0, y: -214 + bob };
  let pernas: [number, number, number, number][] = [[5, 0, 3, 0], [-5, 0, -3, 0]]; // [a1, _, a2, _] por perna
  let bracos: [number, number][] = [[14, 8], [-14, -8]];
  let cabeca = { dx: 0, dy: 0 };
  let corpoRot = 0;
  switch (pose) {
    case "andando": {
      const a = Math.sin(ph) * 24;
      pernas = [[a, 0, a - Math.max(0, Math.sin(ph + 1.2)) * 26, 0], [-a, 0, -a - Math.max(0, Math.sin(ph + 1.2 + Math.PI)) * 26, 0]];
      bracos = [[-a * 0.8, -a * 0.8 + 12], [a * 0.8, a * 0.8 + 12]];
      break;
    }
    case "subindo": {
      const a = Math.sin(ph) * 30 + 8;
      pernas = [[a + 10, 0, a - 30, 0], [-a + 26, 0, -a - 10, 0]];
      bracos = [[-a * 0.7, -a * 0.7 + 18], [a * 0.7, a * 0.7 + 18]];
      corpoRot = 6;
      break;
    }
    case "sentado":
      pernas = [[80, 0, 0, 0], [86, 0, 4, 0]];
      bracos = [[60, 90], [55, 86]];
      break;
    case "apontando":
      bracos = [[95, 95], [-8, -4]];
      break;
    case "celular":
      bracos = [[120, 170], [-8, -4]];
      cabeca = { dx: 6, dy: 6 };
      break;
    case "comemorando":
      bracos = [[160, 175], [-160, -175]];
      break;
    case "cabisbaixo":
      bracos = [[8, 2], [-8, -2]];
      cabeca = { dx: 10, dy: 22 };
      corpoRot = 4;
      break;
    case "bracosAbertos":
      bracos = [[70, 80], [-70, -80]];
      break;
    default:
      break;
  }
  const sw = 24, swb = 30;
  const deitado = pose === "deitado";
  const g = (
    <g transform={`rotate(${corpoRot} 0 ${hip.y})`}>
      {pernas.map(([a1, , a2], i) => <path key={`p${i}`} d={membro(i ? -12 : 12, hip.y + 6, a1, 66, a2, 66)} fill="none" stroke={contorno ? NOIR.linha : cor} strokeWidth={contorno ? 3 : sw} strokeLinecap="round" strokeLinejoin="round" />)}
      <line x1={0} y1={ombro.y} x2={0} y2={hip.y} stroke={contorno ? NOIR.linha : cor} strokeWidth={contorno ? 3 : swb} strokeLinecap="round" />
      {bracos.map(([a1, a2], i) => <path key={`b${i}`} d={membro(i ? -21 : 21, ombro.y + 6, a1, 50, a2, 48)} fill="none" stroke={contorno ? NOIR.linha : cor} strokeWidth={contorno ? 3 : sw - 3} strokeLinecap="round" strokeLinejoin="round" />)}
      {item === "celular" || pose === "celular" ? (() => {
        const [a1, a2] = bracos[0];
        const kx = 21 + Math.sin(rad(a1)) * 50, ky = ombro.y + 6 + Math.cos(rad(a1)) * 50;
        const hx = kx + Math.sin(rad(a2)) * 48, hy = ky + Math.cos(rad(a2)) * 48;
        return <rect x={hx - 11} y={hy - 20} width={22} height={38} rx={5} fill="#111" stroke={tom === "verde" ? A.hex : NOIR.branco} strokeWidth={3} />;
      })() : null}
      <circle cx={cabeca.dx} cy={ombro.y - 44 + cabeca.dy} r={24} fill={contorno ? "none" : cor} stroke={contorno ? NOIR.linha : "none"} strokeWidth={3} />
    </g>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${(flip ? -1 : 1) * s} ${s})${deitado ? " rotate(-90) translate(0 -20)" : ""}`} opacity={clamp01(p)} style={{ filter: tom === "luz" ? GLOW_BRANCO : tom === "verde" ? GLOW_VERDE : undefined }}>
      {g}
    </g>
  );
};

/* ---------------------------------------------------------------- ícones em linha ---------------------------------------------------------------- */
export type IconeNome = "casa" | "chave" | "chat" | "pessoa" | "telefone" | "calendario" | "relogio" | "dinheiro" | "check" | "alerta" | "audio" | "documento" | "pin" | "predio" | "grafico" | "lampada" | "cadeado" | "familia" | "x" | "aviao" | "lupa";
/** Desenho do ícone em caixa 48×48 centrada em (0,0), traço fino. */
export const IconeTraco: React.FC<{ nome: IconeNome; cor?: string; w?: number }> = ({ nome, cor = NOIR.branco, w = 3 }) => {
  const st = { fill: "none", stroke: cor, strokeWidth: w, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (nome) {
    case "casa": return <g {...st}><path d="M-20 2 L0 -18 L20 2" /><path d="M-14 -4 V18 H14 V-4" /><path d="M-4 18 V6 H4 V18" /></g>;
    case "chave": return <g {...st}><circle cx={-10} cy={0} r={9} /><path d="M-1 0 H22 M14 0 V8 M19 0 V6" /></g>;
    case "chat": return <g {...st}><path d="M-20 -14 H20 V8 H-2 L-12 18 V8 H-20 Z" /><path d="M-10 -3 H10" /></g>;
    case "pessoa": return <g {...st}><circle cx={0} cy={-9} r={8} /><path d="M-15 18 C-15 4 15 4 15 18" /></g>;
    case "familia": return <g {...st}><circle cx={-10} cy={-10} r={5} /><circle cx={10} cy={-10} r={5} /><circle cx={0} cy={0} r={4} /><path d="M-17 16 V2 H-3 V16 M3 16 V2 H17 V16 M-4 18 V10 H4 V18" /></g>;
    case "telefone": return <g {...st}><rect x={-12} y={-20} width={24} height={40} rx={5} /><path d="M-4 14 H4" /></g>;
    case "calendario": return <g {...st}><rect x={-18} y={-14} width={36} height={32} rx={4} /><path d="M-18 -4 H18 M-9 -20 V-10 M9 -20 V-10" /></g>;
    case "relogio": return <g {...st}><circle r={18} /><path d="M0 -10 V0 L8 6" /></g>;
    case "dinheiro": return <g {...st}><circle r={18} /><path d="M6 -8 C2 -12 -8 -11 -7 -4 C-6 2 7 0 7 6 C7 12 -3 13 -7 9 M0 -14 V14" /></g>;
    case "check": return <g {...st}><path d="M-14 0 L-4 10 L14 -10" /></g>;
    case "x": return <g {...st}><path d="M-12 -12 L12 12 M12 -12 L-12 12" /></g>;
    case "alerta": return <g {...st}><path d="M0 -18 L19 16 H-19 Z" /><path d="M0 -6 V4 M0 10 V11" /></g>;
    case "audio": return <g {...st}><path d="M-16 -6 V6 M-8 -12 V12 M0 -4 V4 M8 -14 V14 M16 -8 V8" /></g>;
    case "documento": return <g {...st}><path d="M-13 -19 H6 L14 -11 V19 H-13 Z" /><path d="M-6 -4 H7 M-6 4 H7 M-6 12 H2" /></g>;
    case "pin": return <g {...st}><path d="M0 19 C-12 4 -14 -2 -14 -6 A14 14 0 0 1 14 -6 C14 -2 12 4 0 19 Z" /><circle cx={0} cy={-6} r={5} /></g>;
    case "predio": return <g {...st}><rect x={-13} y={-20} width={26} height={40} /><path d="M-6 -12 H-2 M2 -12 H6 M-6 -4 H-2 M2 -4 H6 M-6 4 H-2 M2 4 H6 M-3 20 V13 H3 V20" /></g>;
    case "grafico": return <g {...st}><path d="M-18 16 H18 M-14 8 L-4 -2 L4 4 L16 -12" /><path d="M10 -12 H16 V-6" /></g>;
    case "lampada": return <g {...st}><path d="M-7 10 C-7 2 -14 -1 -14 -8 A14 14 0 0 1 14 -8 C14 -1 7 2 7 10 Z" /><path d="M-6 16 H6" /></g>;
    case "cadeado": return <g {...st}><rect x={-14} y={-4} width={28} height={22} rx={4} /><path d="M-8 -4 V-10 A8 8 0 0 1 8 -10 V-4" /></g>;
    case "aviao": return <g {...st}><path d="M-18 2 L18 -14 L6 16 L0 4 Z M0 4 L18 -14" /></g>;
    case "lupa": return <g {...st}><circle cx={-4} cy={-4} r={12} /><path d="M5 5 L16 16" /></g>;
    default: return null;
  }
};

/** Ícone dentro de círculo (fundo escuro, anel fino). `tom` muda anel e traço. Escala/opacidade de entrada por `pop`. */
export const Icone: React.FC<{ nome: IconeNome; x: number; y: number; r?: number; tom?: "branco" | "verde" | "vermelho" | "cinza"; p?: number; brilho?: boolean; t?: number }> = ({ nome, x, y, r = 46, tom = "branco", p = 1, brilho = false, t }) => {
  const cor = tom === "verde" ? A.hex : tom === "vermelho" ? NOIR.vermelho : tom === "cinza" ? NOIR.cinza : NOIR.branco;
  const k = clamp01(p);
  if (k <= 0.001) return null;
  return (
    <g transform={`translate(${x} ${y + (t !== undefined ? Math.sin(t * 1.3 + x * 0.013) * 7 : 0) + (1 - k) * 18}) scale(${0.7 + 0.3 * k})`} opacity={k} style={{ filter: brilho ? (tom === "verde" ? GLOW_VERDE : GLOW_BRANCO) : undefined }}>
      <circle r={r} fill="#0A0A0A" stroke={cor} strokeWidth={2.5} strokeOpacity={0.85} />
      <g transform={`scale(${r / 34})`}><IconeTraco nome={nome} cor={cor} w={2.6} /></g>
    </g>
  );
};

/** Entrada padrão do formato: sobe 18 px e sai do desfoque em 0,45 s (nada "pula" — tudo surge). Retorna 0..1. */
export const surge = (t: number, at: number, dur = 0.45) => prog(t, at, dur, ease.out);

/** Órbita: elipse pontilhada + ícones girando devagar (profundidade: atrás menor/mais escuro). */
export const Orbita: React.FC<{ t: number; cx: number; cy: number; rx: number; ry: number; itens: { nome: IconeNome; fase: number; at: number; tom?: "branco" | "verde" | "vermelho" | "cinza" }[]; vel?: number; p?: number; r?: number }> = ({ t, cx, cy, rx, ry, itens, vel = 0.06, p = 1, r = 42 }) => (
  <g opacity={clamp01(p)}>
    <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke="rgba(244,244,242,0.22)" strokeWidth={2} strokeDasharray="2 10" strokeLinecap="round" />
    {itens
      .map((q) => {
        const ang = (q.fase + t * vel) * Math.PI * 2;
        const z = Math.sin(ang); // −1 atrás … 1 na frente
        return { q, x: cx + Math.cos(ang) * rx, y: cy + Math.sin(ang) * ry, z };
      })
      .sort((a, b) => a.z - b.z)
      .map(({ q, x, y, z }) => (
        <g key={q.nome + q.fase} opacity={0.45 + 0.55 * (z * 0.5 + 0.5)}>
          <Icone nome={q.nome} x={x} y={y} r={r * (0.8 + 0.2 * (z * 0.5 + 0.5))} tom={q.tom} p={surge(t, q.at)} />
        </g>
      ))}
  </g>
);

/** Pílula (rótulo em cápsula, maiúsculas espaçadas). HTML absoluto centrado em (x, y). */
export const Pilula: React.FC<{ t: number; at: number; x: number; y: number; texto: string; tom?: "branco" | "verde" | "vermelho" | "cinza"; size?: number; ate?: number; cheia?: boolean }> = ({ t, at, x, y, texto, tom = "branco", size = 26, ate, cheia = false }) => {
  const k = surge(t, at) * (ate !== undefined ? 1 - prog(t, ate, 0.4) : 1);
  if (k <= 0.001) return null;
  const cor = tom === "verde" ? A.hex : tom === "vermelho" ? NOIR.vermelho : tom === "cinza" ? NOIR.cinza : NOIR.branco;
  return (
    <div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%, calc(-50% + ${(1 - k) * 14}px))`, opacity: k, filter: k < 1 ? `blur(${(1 - k) * 6}px)` : undefined, border: `2.5px solid ${cor}`, borderRadius: 999, padding: `${size * 0.3}px ${size * 0.75}px`, background: cheia ? (tom === "vermelho" ? NOIR.vermelhoFundo : tom === "verde" ? A.hex : "rgba(10,10,10,0.85)") : "rgba(8,8,8,0.82)", color: cheia && tom !== "branco" ? (tom === "verde" ? A.ink : "#fff") : cor, fontFamily: F.sans, fontWeight: 800, fontSize: size, letterSpacing: "0.14em", whiteSpace: "nowrap", lineHeight: 1 }}>
      {texto}
    </div>
  );
};

/**
 * Título cinematográfico: cada letra sai do desfoque (14 px → 0) com 0,045 s de defasagem, brilho suave; some em `ate`
 * desfocando inteiro em 0,45 s. Linhas: [{texto, cor: "branco"|"verde"|"vermelho"}]. Maiúsculas, Manrope 800.
 */
export const TituloNoir: React.FC<{ t: number; at: number; ate?: number; linhas: { texto: string; cor?: "branco" | "verde" | "vermelho"; size?: number }[]; top?: number; size?: number }> = ({ t, at, ate, linhas, top = 300, size = 104 }) => {
  if (t < at - 0.05) return null;
  const sai = ate !== undefined ? prog(t, ate, 0.45, ease.in) : 0;
  if (sai >= 1) return null;
  let idx = 0;
  return (
    <div style={{ position: "absolute", left: 40, right: 40, top, textAlign: "center", fontFamily: F.sans, fontWeight: 800, letterSpacing: "0.02em", lineHeight: 1.02, opacity: 1 - sai, filter: sai > 0 ? `blur(${sai * 16}px)` : undefined }}>
      {linhas.map((l, li) => {
        const cor = l.cor === "verde" ? A.hex : l.cor === "vermelho" ? NOIR.vermelho : NOIR.branco;
        const sz = l.size ?? (li === 0 ? size : size * 0.78);
        return (
          <div key={li} style={{ fontSize: sz, color: cor, textShadow: l.cor === "verde" ? `0 0 34px ${aa(0.45)}` : "0 0 30px rgba(255,255,255,0.28)", whiteSpace: "nowrap" }}>
            {l.texto.split("").map((ch, ci) => {
              const k = prog(t, at + (idx++) * 0.045, 0.32, ease.out);
              return <span key={ci} style={{ display: "inline-block", opacity: k, filter: k < 1 ? `blur(${(1 - k) * 14}px)` : undefined, whiteSpace: "pre" }}>{ch}</span>;
            })}
          </div>
        );
      })}
    </div>
  );
};

/* ---------------------------------------------------------------- cenários em linha ---------------------------------------------------------------- */
/** Degraus (barras arredondadas). Acendem até `acesos` (índice); desenham-se em sequência a partir de `at`. Base do 1º degrau em (x0, y0). */
export const Degraus: React.FC<{ t: number; at: number; x0: number; y0: number; n: number; dx?: number; dy?: number; w?: number; acesos?: number; rotulos?: string[] }> = ({ t, at, x0, y0, n, dx = 120, dy = -90, w = 130, acesos = -1, rotulos = [] }) => (
  <g>
    {Array.from({ length: n }, (_, i) => {
      const k = surge(t, at + i * 0.08, 0.4);
      const on = i <= acesos;
      return (
        <g key={i} opacity={k} transform={`translate(0 ${(1 - k) * 20})`}>
          <rect x={x0 + i * dx - w / 2} y={y0 + i * dy - 9} width={w} height={18} rx={9} fill={on ? "#151515" : "none"} stroke={on ? NOIR.branco : "rgba(244,244,242,0.35)"} strokeWidth={2.5} style={{ filter: on ? "drop-shadow(0 0 8px rgba(255,255,255,0.4))" : undefined }} />
          {rotulos[i] ? <text x={x0 + i * dx} y={y0 + i * dy + 44} textAnchor="middle" fontFamily={F.sans} fontWeight={800} fontSize={24} letterSpacing="0.12em" fill={on ? NOIR.branco : NOIR.cinza}>{rotulos[i]}</text> : null}
        </g>
      );
    })}
  </g>
);

/** Caminho que se desenha (progresso p) com nós; a parte percorrida acende em verde. */
export const Caminho: React.FC<{ pontos: [number, number][]; p: number; cor?: string; nos?: boolean; tracejado?: boolean; w?: number }> = ({ pontos, p, cor = A.hex, nos = true, tracejado = false, w = 5 }) => {
  const segs = pontos.slice(1).map((q, i) => Math.hypot(q[0] - pontos[i][0], q[1] - pontos[i][1]));
  const total = segs.reduce((a, b) => a + b, 0);
  let alvo = clamp01(p) * total;
  const vis: [number, number][] = [pontos[0]];
  for (let i = 0; i < segs.length && alvo > 0; i++) {
    const f = Math.min(1, alvo / segs[i]);
    vis.push([mix(pontos[i][0], pontos[i + 1][0], f), mix(pontos[i][1], pontos[i + 1][1], f)]);
    alvo -= segs[i];
  }
  return (
    <g>
      <polyline points={pontos.map((q) => q.join(",")).join(" ")} fill="none" stroke="rgba(244,244,242,0.25)" strokeWidth={2.5} strokeDasharray="3 10" strokeLinecap="round" />
      <polyline points={vis.map((q) => q.join(",")).join(" ")} fill="none" stroke={cor} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={tracejado ? "14 12" : undefined} style={{ filter: `drop-shadow(0 0 8px ${cor === A.hex ? aa(0.55) : "rgba(255,255,255,0.4)"})` }} />
      {nos ? pontos.map((q, i) => {
        const on = i < vis.length;
        return <circle key={i} cx={q[0]} cy={q[1]} r={9} fill={on ? cor : "#0A0A0A"} stroke={on ? cor : "rgba(244,244,242,0.4)"} strokeWidth={2.5} />;
      }) : null}
    </g>
  );
};

/** Celular em linha (contorno) com conteúdo. Centro em (x, y). */
export const Celular: React.FC<{ x: number; y: number; w?: number; h?: number; brilho?: number; children?: React.ReactNode; tom?: string }> = ({ x, y, w = 300, h = 560, brilho = 0, children, tom = NOIR.branco }) => (
  <g transform={`translate(${x - w / 2} ${y - h / 2})`}>
    {brilho > 0 ? <rect x={-30} y={-30} width={w + 60} height={h + 60} rx={70} fill={`rgba(255,255,255,${0.05 * brilho})`} /> : null}
    <rect x={0} y={0} width={w} height={h} rx={44} fill="#090909" stroke={tom} strokeWidth={3} style={{ filter: brilho > 0 ? `drop-shadow(0 0 ${14 * brilho}px rgba(255,255,255,0.35))` : undefined }} />
    <rect x={w / 2 - 40} y={16} width={80} height={14} rx={7} fill="none" stroke="rgba(244,244,242,0.5)" strokeWidth={2} />
    {children}
  </g>
);

/** Balão de mensagem em linha (genérico, sem marca de app). Texto ≥ 30 px. HTML absoluto. */
export const Bolha: React.FC<{ t: number; at: number; x: number; y: number; texto: string; lado?: "esq" | "dir"; tom?: "branco" | "cinza" | "verde" | "vermelho"; size?: number; ate?: number }> = ({ t, at, x, y, texto, lado = "esq", tom = "branco", size = 32, ate }) => {
  const k = surge(t, at) * (ate !== undefined ? 1 - prog(t, ate, 0.4) : 1);
  if (k <= 0.001) return null;
  const cor = tom === "verde" ? A.hex : tom === "vermelho" ? NOIR.vermelho : tom === "cinza" ? NOIR.cinza : NOIR.branco;
  return (
    <div style={{ position: "absolute", left: x, top: y, transform: `translate(${lado === "esq" ? "0" : "-100%"}, ${(1 - k) * 16 - 50}%)`, opacity: k, filter: k < 1 ? `blur(${(1 - k) * 6}px)` : undefined, border: `2.5px solid ${cor}`, borderRadius: 26, borderBottomLeftRadius: lado === "esq" ? 6 : 26, borderBottomRightRadius: lado === "dir" ? 6 : 26, padding: "14px 22px", background: "rgba(10,10,10,0.9)", color: cor, fontFamily: F.sans, fontWeight: 700, fontSize: size, whiteSpace: "nowrap" }}>
      {texto}
    </div>
  );
};

/** Relógio de traço com ponteiros (vel = voltas por segundo do ponteiro grande). */
export const Relogio: React.FC<{ t: number; x: number; y: number; r?: number; vel?: number; p?: number }> = ({ t, x, y, r = 170, vel = 0.15, p = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={clamp01(p)}>
    <circle r={r} fill="#080808" stroke={NOIR.branco} strokeWidth={3} style={{ filter: "drop-shadow(0 0 10px rgba(255,255,255,0.25))" }} />
    {Array.from({ length: 12 }, (_, i) => <line key={i} x1={0} y1={-r + 12} x2={0} y2={-r + (i % 3 ? 26 : 40)} stroke={NOIR.branco} strokeWidth={i % 3 ? 2 : 4} transform={`rotate(${i * 30})`} />)}
    <line x1={0} y1={0} x2={0} y2={-r * 0.78} stroke={NOIR.branco} strokeWidth={5} strokeLinecap="round" transform={`rotate(${t * vel * 360})`} />
    <line x1={0} y1={0} x2={0} y2={-r * 0.5} stroke={NOIR.branco} strokeWidth={7} strokeLinecap="round" transform={`rotate(${(t * vel * 360) / 12 + 40})`} />
    <circle r={9} fill={A.hex} />
  </g>
);

/* ---------------------------------------------------------------- partículas ---------------------------------------------------------------- */
/** Dissolve uma região (ex.: o boneco) em partículas que sobem e se espalham entre `at` e `at+dur`. */
export const Dissolver: React.FC<{ t: number; at: number; x: number; y: number; w?: number; h?: number; n?: number; dur?: number; cor?: string }> = ({ t, at, x, y, w = 80, h = 290, n = 140, dur = 1.1, cor = NOIR.branco }) => {
  if (t < at || t > at + dur + 0.6) return null;
  const d = t - at;
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const sx = x + (rnd(i * 1.3) - 0.5) * w, sy = y - rnd(i * 2.9) * h;
        const inicio = (1 - (y - sy) / h) * 0.45 * dur; // de baixo para cima
        const k = clamp01((d - inicio) / (dur * 0.9));
        if (k <= 0) return null;
        const ang = rnd(i * 7.7) * Math.PI * 2;
        const dist = 60 + rnd(i * 4.4) * 320;
        return <circle key={i} cx={sx + Math.cos(ang) * dist * k} cy={sy + Math.sin(ang) * dist * k - 120 * k} r={1.5 + rnd(i) * 2.5} fill={i % 5 === 0 ? A.hex : cor} opacity={(1 - k) * 0.95} />;
      })}
    </g>
  );
};

/** Poeira contínua que sobe de uma região (memória que escapa, calor, ideias). */
export const Escapa: React.FC<{ t: number; x: number; y: number; w?: number; n?: number; p?: number; cor?: string }> = ({ t, x, y, w = 200, n = 18, p = 1, cor = NOIR.branco }) => (
  <g opacity={clamp01(p)}>
    {Array.from({ length: n }, (_, i) => {
      const ph = (t * (0.25 + rnd(i) * 0.25) + rnd(i * 3.7)) % 1;
      return <circle key={i} cx={x + (rnd(i * 1.7) - 0.5) * w + Math.sin(t * 1.5 + i) * 10} cy={y - ph * 260} r={1.5 + rnd(i * 2.2) * 2.5} fill={i % 6 === 0 ? A.hex : cor} opacity={(1 - ph) * 0.8} />;
    })}
  </g>
);

/**
 * Nuvem → logo: partículas espalhadas em esfera convergem para os pontos do LOGO OFICIAL (amostrados do PNG) entre `at` e
 * `at+dur`; em seguida a imagem oficial do logo aparece por cima (o logo nunca é redesenhado). Centro (cx, cy), largura `w`.
 */
export const NuvemLogo: React.FC<{ t: number; at: number; logo: string; cx?: number; cy?: number; w?: number; dur?: number }> = ({ t, at, logo, cx = 540, cy = 900, w = 620, dur = 1.6 }) => {
  if (t < at - 0.8) return null;
  const pts = (logoPts as { aspect: number; pontos: number[][] }).pontos;
  const asp = (logoPts as { aspect: number }).aspect;
  const h = w / asp;
  const nuvem = prog(t, at - 0.8, 0.8, ease.out);
  const k = prog(t, at, dur, ease.inOut);
  const img = prog(t, at + dur - 0.35, 0.6, ease.out);
  return (
    <>
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
        {pts.map((q, i) => {
          const a = rnd(i * 3.1) * Math.PI * 2, b = Math.acos(2 * rnd(i * 5.7) - 1);
          const R = 260 + rnd(i * 1.9) * 140;
          const sx = cx + Math.sin(b) * Math.cos(a) * R * nuvem, sy = cy + Math.cos(b) * R * nuvem + Math.sin(t + i) * 6;
          const tx = cx - w / 2 + q[0] * w, ty = cy - h / 2 + q[1] * h;
          return <circle key={i} cx={mix(sx, tx, k)} cy={mix(sy, ty, k)} r={mix(2.4, 1.6, k)} fill={i % 4 === 0 ? A.hex : NOIR.branco} opacity={(0.35 + 0.6 * nuvem) * (1 - img * 0.9)} />;
        })}
      </svg>
      {img > 0 ? <Img src={logo} style={{ position: "absolute", left: cx - w / 2, top: cy - h / 2, width: w, height: h, opacity: img, filter: `blur(${(1 - img) * 8}px) drop-shadow(0 0 24px ${aa(0.35)})` }} /> : null}
    </>
  );
};

/* ---------------------------------------------------------------- câmera e transições ---------------------------------------------------------------- */
export type CamKey = { t: number; s: number; x?: number; y?: number; e?: (x: number) => number };
/**
 * Câmera em travelling contínuo: interpola chaves (escala e deslocamento) com ease-in-out e soma um empurrão lento
 * permanente (`push` %/s, padrão 0,6%/s). Aplica desfoque de movimento proporcional à velocidade (até 6 px).
 */
export const CamNoir: React.FC<{ t: number; keys: CamKey[]; push?: number; t0?: number; children: React.ReactNode; origem?: [number, number]; drift?: number }> = ({ t, keys, push = 0.006, t0 = 0, children, origem = [540, 960], drift = 12 }) => {
  const at = (tt: number) => {
    let s = keys[0].s, x = keys[0].x ?? 0, y = keys[0].y ?? 0;
    for (let i = 1; i < keys.length; i++) {
      const k0 = keys[i - 1], k1 = keys[i];
      if (tt >= k1.t) { s = k1.s; x = k1.x ?? 0; y = k1.y ?? 0; continue; }
      if (tt > k0.t) {
        const f = (k1.e ?? ease.inOut)(clamp01((tt - k0.t) / (k1.t - k0.t)));
        s = mix(k0.s, k1.s, f); x = mix(k0.x ?? 0, k1.x ?? 0, f); y = mix(k0.y ?? 0, k1.y ?? 0, f);
      }
      break;
    }
    return { s: s * (1 + push * Math.max(0, tt - t0)), x: x + Math.sin(tt * 0.45) * drift, y: y + Math.cos(tt * 0.37) * drift * 0.7 };
  };
  const a = at(t), b = at(t - 1 / 30);
  const v = Math.hypot(a.x - b.x, a.y - b.y) + Math.abs(a.s - b.s) * 900;
  const blur = Math.min(6, Math.max(0, v - 6) * 0.25);
  return (
    <div style={{ position: "absolute", inset: 0, transform: `translate(${a.x}px, ${a.y}px) scale(${a.s})`, transformOrigin: `${origem[0]}px ${origem[1]}px`, filter: blur > 0.3 ? `blur(${blur}px)` : undefined }}>
      {children}
    </div>
  );
};

/**
 * PORTAL: a próxima cena aparece dentro de um círculo que nasce no ícone (cx, cy, r0) e cresce até cobrir a tela em `dur`;
 * o anel do círculo passa pela câmera e some. Use com a cena anterior fazendo zoom para o mesmo ponto.
 */
export const Portal: React.FC<{ t: number; at: number; dur?: number; cx: number; cy: number; r0?: number; children: React.ReactNode }> = ({ t, at, dur = 0.8, cx, cy, r0 = 46, children }) => {
  // o interior do portal tem fundo próprio (opaco): a cena anterior não "vaza" para dentro do círculo
  if (t < at) return null;
  const k = prog(t, at, dur, ease.in);
  const r = mix(r0, 2300, k);
  const id = `portal_${Math.round(cx)}_${Math.round(cy)}`;
  return (
    <>
      <div style={{ position: "absolute", inset: 0, clipPath: `circle(${r}px at ${cx}px ${cy}px)` }}>
        <FundoNoir t={t} />
        {children}
      </div>
      {k < 1 ? (
        <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
          <circle id={id} cx={cx} cy={cy} r={r} fill="none" stroke={NOIR.branco} strokeWidth={mix(4, 40, k)} opacity={0.9 * (1 - k)} style={{ filter: "drop-shadow(0 0 16px rgba(255,255,255,0.5))" }} />
        </svg>
      ) : null}
    </>
  );
};

/* ---------------------------------------------------------------- legenda ---------------------------------------------------------------- */
const NEG = /^(não|nem|nunca|ninguém|silêncio[.,]?|perdeu|perdido|esquece[.,]?|esquecido)[,.?!:]*$/i;
type Pagina = { start: number; end: number; words: { text: string; start: number; emph: boolean }[] };
/** Agrupa os blocos de legenda em "páginas" de até 2 linhas (~34 caracteres), sem atravessar segmentos. */
export const paginas = (chunks: CaptionChunk[], max = 34): Pagina[] => {
  const out: Pagina[] = [];
  let cur: Pagina | null = null, seg = "", len = 0;
  for (const c of chunks) {
    const txt = c.words.map((w) => w.text).join(" ");
    if (!cur || c.seg !== seg || len + txt.length + 1 > max) {
      if (cur) out.push(cur);
      cur = { start: c.start, end: c.end, words: [] }; seg = c.seg; len = 0;
    }
    cur.words.push(...c.words.map((w) => ({ text: w.text, start: w.start, emph: w.emph })));
    cur.end = c.end; len += txt.length + 1;
  }
  if (cur) out.push(cur);
  return out;
};

/**
 * Legenda que se ESCREVE: as palavras da página aparecem uma a uma; a próxima palavra surge em cinza 0,18 s antes de ser dita
 * e fica branca quando dita (verde se *ênfase*, vermelha se negativa). Caixa normal (não maiúsculas), Manrope 800, centro em y.
 * A página some em 0,2 s no fim; entre frases a área fica vazia (respiro), como nas referências.
 */
export const LegendaNoir: React.FC<{ t: number; chunks: CaptionChunk[]; y?: number; size?: number; negativas?: RegExp; esconder?: (t: number) => boolean }> = ({ t, chunks, y = 1330, size = 52, negativas, esconder }) => {
  if (esconder && esconder(t)) return null;
  const pgs = paginas(chunks);
  const pg = pgs.find((p, i) => t >= p.start - 0.03 && t < (pgs[i + 1] ? Math.min(pgs[i + 1].start - 0.03, p.end + 0.45) : p.end + 0.45));
  if (!pg) return null;
  const fim = prog(t, pg.end + 0.25, 0.2, ease.in);
  return (
    <div style={{ position: "absolute", left: 110, right: 110, top: y - size * 1.2, minHeight: size * 2.4, display: "flex", flexWrap: "wrap", justifyContent: "center", alignContent: "flex-start", columnGap: size * 0.26, fontFamily: F.sans, fontWeight: 800, fontSize: size, lineHeight: 1.18, letterSpacing: "-0.01em", opacity: 1 - fim, textShadow: "0 2px 14px rgba(0,0,0,0.85)" }}>
      {pg.words.map((w, i) => {
        const pre = t >= w.start - 0.18;
        if (!pre) return null;
        const dita = t >= w.start - 0.02;
        const prev = i > 0 ? pg.words[i - 1].text : "";
        const neg = (NEG.test(w.text) && w.emph) || (negativas ? negativas.test(w.text) : false) || (/^(não|nem)$/i.test(prev) && w.emph);
        const cor = !dita ? "#6F6F6F" : neg ? NOIR.vermelho : w.emph ? A.hex : NOIR.branco;
        const k = prog(t, w.start - 0.18, 0.16, ease.out);
        return <span key={i} style={{ color: cor, opacity: k, filter: k < 1 ? `blur(${(1 - k) * 5}px)` : undefined, textShadow: dita && w.emph && !neg ? `0 0 22px ${aa(0.45)}` : undefined, whiteSpace: "nowrap" }}>{w.text}</span>;
      })}
    </div>
  );
};

/* ---------------------------------------------------------------- fecho (CTA SISTEMA) ---------------------------------------------------------------- */
/**
 * FECHO do Segundo modelo (CTA SISTEMA → Direct): na pergunta, o boneco no centro e uma órbita com IMÓVEIS / LEADS /
 * ATENDIMENTOS (cada ícone acende na palavra); em "Comente", a órbita apaga e surge o campo em cápsula que digita SISTEMA;
 * em "Direct", um avião de traço cruza; por fim tudo dissolve em partículas que formam o LOGO OFICIAL (ritual de assinatura).
 */
export const CtaNoir: React.FC<{ t: number; tl: { captions: CaptionChunk[]; cues: Record<string, number>; duration: number }; segPergunta: string; segComente: string; logo: string; rodape?: string }> = ({ t, tl, segPergunta, segComente, logo, rodape }) => {
  const wAt = (seg: string, re: RegExp, fb: number) => {
    for (const k of tl.captions) if (k.seg === seg) for (const w of k.words) if (re.test(w.text)) return w.start;
    return fb;
  };
  const c = tl.cues;
  const t0 = tl.captions.find((k) => k.seg === segPergunta)?.start ?? c.cta_quer;
  const tCom = tl.captions.find((k) => k.seg === segComente)?.start ?? c.cta_comment;
  const tSis = wAt(segComente, /sistema/i, tCom + 0.5);
  const tDir = wAt(segComente, /direct/i, tCom + 2.3);
  const tIm = wAt(segPergunta, /im[óo]veis/i, t0 + 2.4), tLe = wAt(segPergunta, /leads/i, t0 + 3), tAt = wAt(segPergunta, /atendimentos/i, t0 + 3.6);
  const orb = luz(t, t0 - 0.1, tCom - 0.3, 0.6, 0.5);
  const campo = luz(t, tCom - 0.15, tDir + 0.9, 0.45, 0.5);
  const typed = Math.round(prog(t, tSis, 0.5, ease.linear) * 7);
  const voo = prog(t, tDir - 0.1, 1.0, ease.inOut);
  const tLogo = tDir + 1.1;
  const fig = luz(t, t0 - 0.2, tDir + 0.4, 0.5, 0.2);
  const orbPos = (f: number) => { const a = (f + t * 0.09) * Math.PI * 2; return { x: 540 + Math.cos(a) * 320, y: 700 + Math.sin(a) * 95 }; };
  const itens = [
    { nome: "casa" as IconeNome, k: "IMÓVEIS", at: tIm, ...orbPos(0.42) },
    { nome: "pessoa" as IconeNome, k: "LEADS", at: tLe, ...orbPos(0.75) },
    { nome: "chat" as IconeNome, k: "ATENDIMENTOS", at: tAt, ...orbPos(0.08) },
  ];
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
        <Holofote x={540} chao={1180} w={460} p={fig} />
        <Figura t={t} x={540} y={1180} s={1} pose={t > tIm - 0.2 ? "bracosAbertos" : "pe"} p={fig} />
        <Dissolver t={t} at={tDir + 0.35} x={540} y={1180} n={160} />
        <g opacity={orb}>
          <ellipse cx={540} cy={700} rx={330} ry={90} fill="none" stroke="rgba(244,244,242,0.22)" strokeWidth={2} strokeDasharray="2 10" />
          {itens.map((q) => <Icone key={q.k} t={t} nome={q.nome} x={q.x} y={q.y} r={58} tom={t >= q.at ? "verde" : "cinza"} p={surge(t, q.at - 0.3)} brilho={t >= q.at} />)}
        </g>
        {voo > 0 && voo < 1 ? <g transform={`translate(${mix(700, 1000, voo)} ${mix(860, 560, voo) - Math.sin(voo * Math.PI) * 120}) scale(2.2) rotate(-10)`} opacity={1 - voo * 0.6}><IconeTraco nome="aviao" cor={A.hex} w={2.4} /></g> : null}
      </svg>
      {itens.map((q) => <Pilula key={q.k} t={t} at={q.at} ate={tCom - 0.3} x={q.x} y={q.y + 92} texto={q.k} tom="verde" size={24} />)}
      {campo > 0.001 ? (
        <div style={{ position: "absolute", left: 140, right: 140, top: 560, opacity: campo, filter: campo < 1 ? `blur(${(1 - campo) * 8}px)` : undefined, fontFamily: F.sans }}>
          <div style={{ textAlign: "center", fontWeight: 800, fontSize: 30, letterSpacing: "0.2em", color: NOIR.cinza, marginBottom: 18 }}>COMENTE</div>
          <div style={{ display: "flex", alignItems: "center", gap: 18, border: `3px solid ${NOIR.branco}`, borderRadius: 999, padding: "16px 18px 16px 40px", background: "rgba(8,8,8,0.9)", boxShadow: `0 0 ${30 + 30 * (0.5 + 0.5 * Math.sin(t * 4))}px ${aa(0.12 + 0.18 * (0.5 + 0.5 * Math.sin(t * 4)))}` }}>
            <div style={{ flex: 1, fontWeight: 800, fontSize: 64, letterSpacing: "0.06em", color: NOIR.branco }}>
              {"SISTEMA".slice(0, typed)}
              <span style={{ color: A.hex, opacity: typed < 7 && Math.floor(t * 3) % 2 === 0 ? 1 : typed >= 7 ? 0 : 0.2 }}>|</span>
            </div>
            <div style={{ width: 92, height: 92, borderRadius: 46, border: `3px solid ${A.hex}`, display: "flex", alignItems: "center", justifyContent: "center", background: typed >= 7 ? A.hex : "transparent", transition: "none" }}>
              <svg width={52} height={52} viewBox="-24 -24 48 48"><IconeTraco nome="aviao" cor={typed >= 7 ? A.ink : A.hex} w={3} /></svg>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: 22, fontWeight: 700, fontSize: 34, color: NOIR.branco, opacity: prog(t, tDir - 0.25, 0.3) }}>
            detalhes pelo <span style={{ color: A.hex }}>Direct</span>
          </div>
        </div>
      ) : null}
      <NuvemLogo t={t} at={tLogo} logo={logo} cy={820} w={600} dur={1.3} />
      {rodape ? <div style={{ position: "absolute", left: 0, right: 0, top: 960, textAlign: "center", fontFamily: F.sans, fontWeight: 800, fontSize: 26, letterSpacing: "0.22em", color: NOIR.cinza, opacity: prog(t, tLogo + 0.9, 0.5) }}>{rodape}</div> : null}
    </div>
  );
};

/** Re-exporta utilidades usadas nas cenas. */
export { clamp01, ease, mix, prog, sp };
