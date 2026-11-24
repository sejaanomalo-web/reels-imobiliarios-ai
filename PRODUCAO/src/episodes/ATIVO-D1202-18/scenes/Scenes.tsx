import React from "react";
import { C, F } from "../../../theme";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A } from "../../NOV26/kit";
import {
  Chamada, Comodo, Contorno, Cota, LINHA, Porta, Prancha, Rota, SeloPlanta, TituloFolha, TRACO,
  clamp01, ease, prog, sp,
} from "../../../estilos/planta";

/**
 * ATIVO-D1202-18 — "A casa que nunca terminou" (grade 02/12/2026 · 18h · HISTÓRIA QUE ENSINA · Planta técnica v2).
 * Folhas: a casa de fazenda de 8 cômodos (Califórnia, 1886) → os cômodos brotam sem projeto (SEM ARQUITETO · ESBOÇO À MÃO;
 * um é fechado, outro derrubado) → 160 CÔMODOS; detalhes: a escada que bate no teto e a porta do 2º andar que abre para o
 * vazio → AVALIAÇÃO 1922: obra inacabada, terremoto, QUASE SEM VALOR, leilão, atração → a planta que faz sentido (rota
 * verde) → O QUE A REFORMA RESOLVEU? Apuração: Wikipedia, NPS, History Hit, The History Girl; lenda dos espíritos fora.
 */
const M = "JetBrains Mono";
const TOP = 380;
const fade = (p: number) => clamp01(p * 1.5);
const TELA = { x: 120, y: 120, w: 840, h: 640 };
const W: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: C.warn }}>{children}</span>;
const G: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: A.hex }}>{children}</span>;
const Tr: React.FC<{ d: string; p: number; cor?: string; w?: number }> = ({ d, p, cor = LINHA, w = TRACO }) => (
  <path d={d} fill="none" stroke={cor} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - clamp01(p)} opacity={p > 0.001 ? 1 : 0} />
);
const Rot: React.FC<{ x: number; y: number; texto: string; p: number; cor?: string; size?: number; anchor?: "start" | "middle" | "end" }> = ({ x, y, texto, p, cor = C.muted, size = 26, anchor = "start" }) => (
  <text x={x} y={y} textAnchor={anchor} fill={cor} fontFamily={M} fontWeight={700} fontSize={size} letterSpacing="0.12em" opacity={fade(p)}>{texto}</text>
);

/* a casa original: 8 cômodos (4 × 2) no centro */
const C8 = Array.from({ length: 8 }, (_, i) => ({ x: 340 + (i % 4) * 100, y: 330 + Math.floor(i / 4) * 100 }));
/* os acréscimos sem projeto: retângulos pseudoaleatórios em volta (determinísticos) */
const rnd = (i: number, k: number) => { const v = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453; return v - Math.floor(v); };
const EXTRA = Array.from({ length: 46 }, (_, i) => {
  const lado = i % 4;
  const w = 50 + Math.round(rnd(i, 1) * 70), h = 40 + Math.round(rnd(i, 2) * 60);
  let x = 140 + rnd(i, 3) * 760, y = 140 + rnd(i, 4) * 580;
  if (lado === 0) y = 140 + rnd(i, 5) * 150;
  if (lado === 1) y = 560 + rnd(i, 5) * 150;
  if (lado === 2) x = 140 + rnd(i, 6) * 170;
  if (lado === 3) x = 760 + rnd(i, 6) * 150;
  return { x: Math.min(x, 940 - w), y: Math.min(y, 740 - h), w, h };
});
const Ret: React.FC<{ r: { x: number; y: number; w: number; h: number }; p: number; cor?: string; w?: number }> = ({ r, p, cor = LINHA, w = TRACO * 0.67 }) => (
  <Tr d={`M ${r.x} ${r.y} L ${r.x + r.w} ${r.y} L ${r.x + r.w} ${r.y + r.h} L ${r.x} ${r.y + r.h} Z`} p={p} cor={cor} w={w} />
);
/** A planta da casa de Sarah: os 8 originais + `n` acréscimos (0..46). `x1`/`x2` = índices fechado/derrubado. */
const PlantaCasa: React.FC<{ t: number; p8: number; n: number; fechado: number; derrubado: number; apaga?: number }> = ({ t, p8, n, fechado, derrubado, apaga = 0 }) => (
  <g opacity={1 - apaga}>
    {C8.map((r, i) => <Ret key={i} r={{ ...r, w: 100, h: 100 }} p={prog(t, 0, 0.01) * clamp01(p8 * 8 - i)} w={TRACO} />)}
    {EXTRA.map((r, i) => {
      const k = clamp01(n - i);
      if (k <= 0) return null;
      if (i === 5 && derrubado > 0.5) return <g key={i} opacity={1 - derrubado}><Ret r={r} p={1} cor={C.warn} /></g>;
      return (
        <g key={i}>
          <Ret r={r} p={k} cor={i === 3 && fechado > 0.01 ? C.warn : LINHA} />
          {i === 3 && fechado > 0.01 ? <Tr d={`M ${r.x} ${r.y} L ${r.x + r.w} ${r.y + r.h} M ${r.x + r.w} ${r.y} L ${r.x} ${r.y + r.h}`} p={fechado} cor={C.warn} w={TRACO} /> : null}
        </g>
      );
    })}
  </g>
);

/* ------------------------------------------------ 1–3 · a casa que cresce ------------------------------------------------ */
export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const fim = c.e_escada - 0.4;
  if (t > fim + 0.5) return null;
  const sai = prog(t, fim, 0.45);
  const n = 46 * prog(t, c.i_nunca - 0.2, c.e_160 - c.i_nunca + 0.1, ease.inOut);
  const n0 = t < c.i_sarah - 0.3 ? 46 * prog(t, 0.6, 1.4, ease.out) * (1 - prog(t, c.h_valor + 0.2, 0.4)) : 0;
  const stamp = sp(t, c.h_valor - 0.1, { damping: 10, stiffness: 220 }) * (1 - prog(t, c.i_sarah - 0.4, 0.3));
  const dens = prog(t, c.e_160 - 0.2, 0.4);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - sai }}>
      <Camera drift={6} t={t} keys={[{ t: 0, s: 1.06, y: -10 }, { t: c.h_valor, s: 1.02, e: ease.out }, { t: c.i_oito, s: 1.1, y: -20, e: ease.inOut }, { t: c.i_nunca, s: 1.0, e: ease.inOut }, { t: c.e_160, s: 1.04, y: -8, e: ease.out }]}>
        <Prancha top={TOP} h={900}>
          <Contorno {...TELA} p={prog(t, -0.1, 0.9, ease.out)} />
          <Rot x={540} y={170} anchor="middle" texto={t < c.i_sarah - 0.3 ? "UMA CASA · 36 ANOS DE OBRA" : "CALIFÓRNIA · 1886"} p={prog(t, 0.2, 0.5)} />
          <PlantaCasa t={t} p8={prog(t, t < c.i_sarah - 0.3 ? 0.1 : c.i_sarah - 0.2, 0.8)} n={t < c.i_sarah - 0.3 ? n0 : n} fechado={prog(t, c.o_fechado - 0.1, 0.4)} derrubado={prog(t, c.o_derrubado - 0.1, 0.5)} />
          <Cota x1={340} x2={740} y={560} texto="8 CÔMODOS" p={prog(t, c.i_oito - 0.2, 0.5) * (1 - prog(t, c.i_nunca + 0.8, 0.4))} cor={C.text} />
          <Cota x1={140} x2={940} y={790} texto="160 CÔMODOS" p={dens} cor={C.text} />
          <Chamada x={400} y={380} bx={140} by={640} bw={380} texto="SEM ARQUITETO" p={prog(t, c.o_arquiteto - 0.3, 0.6) * (1 - prog(t, c.e_160 - 0.3, 0.3))} tone="warn" />
          <Chamada x={680} y={430} bx={560} by={640} bw={380} texto="ESBOÇO À MÃO" p={prog(t, c.o_papel - 0.3, 0.6) * (1 - prog(t, c.e_160 - 0.3, 0.3))} tone="linha" />
          <g opacity={fade(stamp)} transform={`translate(540 440) rotate(-7) scale(${1 + 0.4 * (1 - Math.min(1, stamp))})`}>
            <rect x={-260} y={-56} width={520} height={112} rx={10} fill="rgba(255,107,94,0.14)" stroke={C.warn} strokeWidth={4} />
            <text x={0} y={18} textAnchor="middle" fill={C.warn} fontFamily={M} fontWeight={700} fontSize={46} letterSpacing="0.08em">QUASE SEM VALOR</text>
          </g>
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, -0.3, 0.4) * (1 - prog(t, c.i_sarah - 0.5, 0.2))} size={56}><G>36 ANOS</G> DE OBRA</TituloFolha>
      <TituloFolha p={prog(t, c.i_sarah - 0.3, 0.35) * (1 - prog(t, c.o_arquiteto - 0.6, 0.2))} size={56}>SARAH <G>WINCHESTER</G></TituloFolha>
      <TituloFolha p={prog(t, c.o_arquiteto - 0.4, 0.35) * (1 - prog(t, c.e_160 - 0.5, 0.2))} size={56}>NUNCA PAROU DE <W>REFORMAR</W></TituloFolha>
      <TituloFolha p={prog(t, c.e_160 - 0.3, 0.35)} size={56}><W>160</W> CÔMODOS</TituloFolha>
    </div>
  );
};

/* ------------------------------------------------ 4 · os detalhes: escada e porta ------------------------------------------------ */
export const Take1: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const ini = c.e_escada - 0.4;
  if (t < ini - 0.05 || t > c.v_1922 + 0.3) return null;
  const sai = prog(t, c.v_1922 - 0.35, 0.4);
  const degraus = Array.from({ length: 8 }, (_, i) => `L ${200 + i * 36} ${640 - i * 48} L ${236 + i * 36} ${640 - i * 48}`).join(" ");
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(prog(t, ini, 0.4), 1 - sai) }}>
      <Camera drift={6} t={t} keys={[{ t: ini, s: 1.0 }, { t: c.e_teto, s: 1.05, x: 60, y: -8, e: ease.inOut }, { t: c.e_porta, s: 1.05, x: -60, y: -8, e: ease.inOut }, { t: c.e_vazio, s: 1.08, x: -70, y: -14, e: ease.out }]}>
        <Prancha top={TOP} h={900}>
          <Contorno x={140} y={200} w={380} h={540} p={prog(t, ini, 0.6, ease.out)} />
          <Rot x={330} y={250} anchor="middle" texto="DETALHE A · ESCADA" p={prog(t, ini + 0.2, 0.4)} size={24} />
          <Tr d="M 160 300 L 500 300" p={prog(t, c.e_escada - 0.2, 0.4)} cor={C.text} />
          <Rot x={460} y={292} anchor="end" texto="TETO" p={prog(t, c.e_escada, 0.4)} size={24} />
          <Tr d={`M 160 688 L 200 688 L 200 640 ${degraus}`} p={prog(t, c.e_escada - 0.1, c.e_teto - c.e_escada + 0.1, ease.inOut)} cor={t > c.e_teto - 0.05 ? C.warn : LINHA} />
          <Rot x={330} y={700} anchor="middle" texto="SOBE ATÉ O TETO" p={prog(t, c.e_teto - 0.05, 0.4)} cor={C.warn} size={24} />
          <Contorno x={560} y={200} w={380} h={540} p={prog(t, c.e_porta - 0.5, 0.6, ease.out)} />
          <Rot x={750} y={250} anchor="middle" texto="DETALHE B · PORTA" p={prog(t, c.e_porta - 0.3, 0.4)} size={24} />
          <Tr d="M 600 470 L 900 470" p={prog(t, c.e_porta - 0.3, 0.4)} cor={C.text} />
          <Rot x={890} y={460} anchor="end" texto="2º ANDAR" p={prog(t, c.e_porta - 0.1, 0.4)} size={24} />
          <Tr d="M 900 470 L 900 720" p={prog(t, c.e_porta - 0.3, 0.4)} cor={C.text} />
          <Porta x={620} y={470} r={80} p={prog(t, c.e_porta, 0.4)} aberta />
          <Rota id="vazio" d="M 700 470 L 700 720" p={prog(t, c.e_vazio - 0.3, 0.5)} tom="warn" />
          <Rot x={720} y={700} texto="VAZIO" p={prog(t, c.e_vazio - 0.05, 0.4)} cor={C.warn} size={26} />
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, ini, 0.35) * (1 - prog(t, c.e_porta - 0.4, 0.2))} size={56}>ESCADA PARA O <W>TETO</W></TituloFolha>
      <TituloFolha p={prog(t, c.e_porta - 0.2, 0.35)} size={56}>PORTA PARA O <W>VAZIO</W></TituloFolha>
    </div>
  );
};

/* ------------------------------------------------ 5 · a avaliação de 1922 ------------------------------------------------ */
export const Take2: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const ini = c.v_1922 - 0.3;
  if (t < ini - 0.05 || t > c.l_dinheiro + 0.3) return null;
  const sai = prog(t, c.l_dinheiro - 0.35, 0.4);
  const stamp = sp(t, c.v_nada - 0.1, { damping: 10, stiffness: 220 });
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(prog(t, ini, 0.4), 1 - sai) }}>
      <Camera drift={6} t={t} keys={[{ t: ini, s: 1.0 }, { t: c.v_terremoto, s: 1.03, y: -8, e: ease.out }, { t: c.v_nada, s: 1.07, y: -16, e: ease.out }, { t: c.v_atracao, s: 1.04, e: ease.inOut }]}>
        <Prancha top={TOP} h={900}>
          <Contorno {...TELA} p={prog(t, ini, 0.6, ease.out)} />
          <Rot x={540} y={170} anchor="middle" texto="AVALIAÇÃO · 1922" p={prog(t, ini + 0.2, 0.4)} cor={C.text} />
          <g opacity={0.45}><PlantaCasa t={t} p8={1} n={46} fechado={1} derrubado={1} /></g>
          <Chamada x={300} y={260} bx={160} by={560} bw={380} texto="OBRA INACABADA" p={prog(t, c.v_avaliadores + 0.2, 0.6)} tone="warn" />
          <Chamada x={820} y={300} bx={560} by={560} bw={360} texto="TERREMOTO" p={prog(t, c.v_terremoto - 0.2, 0.6)} tone="warn" />
          <g opacity={fade(stamp)} transform={`translate(540 400) rotate(-6) scale(${1 + 0.4 * (1 - Math.min(1, stamp))})`}>
            <rect x={-290} y={-62} width={580} height={124} rx={10} fill="rgba(10,10,12,0.9)" stroke={C.warn} strokeWidth={5} />
            <text x={0} y={20} textAnchor="middle" fill={C.warn} fontFamily={M} fontWeight={700} fontSize={50} letterSpacing="0.08em">QUASE SEM VALOR</text>
          </g>
          <Rot x={330} y={700} anchor="middle" texto="LEILÃO · 12/1922" p={prog(t, c.v_leilao - 0.1, 0.4)} cor={C.text} size={28} />
          <Rot x={750} y={700} anchor="middle" texto="ATRAÇÃO TURÍSTICA" p={prog(t, c.v_atracao - 0.1, 0.4)} cor={C.text} size={28} />
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, ini, 0.35) * (1 - prog(t, c.v_morar - 0.4, 0.2))} size={56}>OS <W>AVALIADORES</W></TituloFolha>
      <TituloFolha p={prog(t, c.v_morar - 0.2, 0.35)} size={56}>PARA MORAR: <W>QUASE NADA</W></TituloFolha>
    </div>
  );
};

/* ------------------------------------------------ 6–7 · a casa que faz sentido ------------------------------------------------ */
const SIMPLES = [
  { x: 180, y: 220, w: 330, h: 240, t: "SALA" }, { x: 530, y: 220, w: 370, h: 240, t: "COZINHA" },
  { x: 180, y: 480, w: 230, h: 220, t: "QUARTO" }, { x: 430, y: 480, w: 230, h: 220, t: "QUARTO" }, { x: 680, y: 480, w: 220, h: 220, t: "BANHO" },
];
export const Take3: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const ini = c.l_dinheiro - 0.3;
  if (t < ini - 0.05 || t > c.cta_quer + 0.4) return null;
  const sai = prog(t, c.cta_quer - 0.2, 0.5);
  const reforma = prog(t, c.f_dono - 0.3, 0.5);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(prog(t, ini, 0.4), 1 - sai) }}>
      <Camera drift={6} t={t} keys={[{ t: ini, s: 1.0 }, { t: c.l_sentido, s: 1.04, y: -10, e: ease.out }, { t: c.f_pergunte, s: 1.06, y: -14, e: ease.out }]}>
        <Prancha top={TOP} h={900}>
          <Contorno {...TELA} p={prog(t, ini, 0.6, ease.out)} />
          <Rot x={540} y={170} anchor="middle" texto={reforma > 0.5 ? "A CAPTAÇÃO" : "O QUE O COMPRADOR PAGA"} p={prog(t, ini + 0.2, 0.4)} />
          <g opacity={1 - reforma * 0.75}>
            {SIMPLES.map((r, i) => <Comodo key={i} x={r.x} y={r.y} w={r.w} h={r.h} p={prog(t, c.l_sozinho - 0.6 + i * 0.12, 0.6, ease.out)} titulo={r.t} titleSize={30} />)}
            <Rota id="sentido" d="M 345 700 L 345 460 L 715 340 L 545 590 L 790 590" p={prog(t, c.l_sentido - 0.4, 0.8, ease.inOut)} tom="accent" />
          </g>
          <Cota x1={180} x2={900} y={740} texto="DINHEIRO NA OBRA ≠ VALOR" p={prog(t, c.l_dinheiro - 0.1, 0.5) * (1 - reforma)} cor={C.text} />
          <Comodo x={300} y={300} w={480} h={200} p={reforma} titulo="REFORMA" sub={t > c.f_resolveu - 0.1 ? "O QUE RESOLVEU?" : t > c.f_gastou - 0.1 ? "QUANTO GASTOU" : ""} titleSize={48} acende={prog(t, c.f_resolveu - 0.1, 0.4)} />
          <Chamada x={540} y={500} bx={260} by={600} bw={560} texto="PERGUNTE" p={prog(t, c.f_pergunte - 0.3, 0.6)} tone="linha" />
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, ini, 0.35) * (1 - prog(t, c.f_dono - 0.5, 0.2))} size={56}>CASA QUE FAZ <G>SENTIDO</G></TituloFolha>
      <TituloFolha p={prog(t, c.f_dono - 0.3, 0.35)} size={56}>O QUE A REFORMA <G>RESOLVEU</G>?</TituloFolha>
      <SeloPlanta texto="HISTÓRIA REAL · SAN JOSÉ, CALIFÓRNIA" p={prog(t, ini, 0.4) * (1 - prog(t, c.f_dono - 0.4, 0.3))} />
    </div>
  );
};
