import React from "react";
import type { Timeline } from "../../types";
import {
  A, CamNoir, Figura, Halo, Holofote, Icone, Pilula, TituloNoir, ease, luz, mix, prog, surge,
} from "../../../estilos/pictograma";

/**
 * ATIVO-D1210-21 — "Montado pelas próprias mãos" (grade 10/12/2026 · 21h · FORA DA BOLHA · Pictograma).
 * Sem corte seco: o boneco monta uma caixa em linha fina, peça por peça; ela fica meio torta → 2012: pessoas montam caixas
 * simples → a própria caixa vale mais que uma igual, pronta (o cifrão maior) → construir dá valor → a busca montada a quatro
 * mãos: o cliente traz os critérios, o corretor traz as opções e explica → quem participa defende → CtaNoir.
 * Apuração: Norton, Mochon & Ariely (2012), JCP 22(3). Sem percentual e sem nome de marca.
 */
const CHAO = 1180;
type P = { t: number; tl: Timeline };
const Svg: React.FC<{ children: React.ReactNode }> = ({ children }) => <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>{children}</svg>;
const Chao: React.FC = () => <line x1={-400} y1={CHAO} x2={1480} y2={CHAO} stroke="rgba(244,244,242,0.3)" strokeWidth={2} strokeDasharray="3 9" />;
/** Caixa em linha fina (frente + topo + lateral), montada peça por peça. */
const Caixa: React.FC<{ x: number; y: number; s?: number; p: number; tilt?: number; cor?: string }> = ({ x, y, s = 1, p, tilt = 0, cor = "#F4F4F2" }) => {
  const k1 = Math.min(1, p * 3), k2 = Math.min(1, Math.max(0, p * 3 - 1)), k3 = Math.min(1, Math.max(0, p * 3 - 2));
  return (
    <g transform={`translate(${x} ${y}) rotate(${tilt}) scale(${s})`} fill="none" stroke={cor} strokeWidth={4} strokeLinejoin="round" style={{ filter: cor === A.hex ? `drop-shadow(0 0 10px ${A.hex})` : undefined }}>
      <g opacity={k1} transform={`translate(${(1 - k1) * -60} 0)`}><rect x={-90} y={-60} width={140} height={120} /></g>
      <g opacity={k2} transform={`translate(0 ${(1 - k2) * -60})`}><path d="M-90 -60 L-50 -100 L90 -100 L50 -60 Z" /></g>
      <g opacity={k3} transform={`translate(${(1 - k3) * 60} 0)`}><path d="M50 -60 L90 -100 L90 20 L50 60 Z" /></g>
    </g>
  );
};

/* ---------------------------------------------------------------- 1 · a caixa montada ---------------------------------------------------------------- */
export const Caixas: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = 1 - prog(t, c.a_monte - 1.0, 0.5);
  if (on <= 0.001) return null;
  const monta = prog(t, c.h_gosta - 0.3, c.h_torto - c.h_gosta + 0.2);
  const torto = prog(t, c.h_torto - 0.2, 0.4, ease.out);
  const duas = prog(t, c.r_montou - 0.3, 0.6, ease.inOut);
  const pagar = prog(t, c.r_pagar - 0.2, 0.5);
  const vale = prog(t, c.v_construir - 0.2, 0.6);
  const xA = mix(540, 330, duas);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} push={0.004} keys={[{ t: 0, s: 1.06, y: -12 }, { t: c.h_torto, s: 1.0, e: ease.out }, { t: c.r_pronta, s: 1.04, y: -8 }, { t: c.v_valer + 0.4, s: 1.07, y: -14, e: ease.out }]}>
        <Svg>
          <Chao />
          <Holofote x={mix(540, 330, duas)} chao={CHAO} w={mix(640, 520, duas)} p={prog(t, 0, 0.6) * 0.85} cor={vale > 0.5 || pagar > 0.5 ? A.hex : "#FFFFFF"} />
          {vale > 0 && <Halo x={xA} y={820} r={300} p={0.4 * vale} cor={A.hex} />}
          <Caixa x={xA} y={860} s={1.1} p={monta} tilt={6 * torto} cor={pagar > 0.5 ? A.hex : "#F4F4F2"} />
          <g opacity={duas}><Caixa x={760} y={860} s={1.1} p={1} cor="rgba(244,244,242,0.55)" /></g>
          <g opacity={pagar}><Icone t={t} nome="dinheiro" x={xA} y={640} r={60} tom="verde" brilho /></g>
          <g opacity={pagar}><Icone t={t} nome="dinheiro" x={760} y={660} r={38} tom="cinza" /></g>
          <Figura t={t} x={duas > 0.5 ? 180 : mix(330, 180, duas)} y={CHAO} s={0.66} pose={monta > 0.02 && monta < 0.98 ? "apontando" : vale > 0.5 ? "comemorando" : "pe"} tom={vale > 0.5 ? "verde" : "luz"} />
        </Svg>
        <Pilula t={t} at={c.h_torto - 0.1} ate={c.e_2012 - 0.2} x={540} y={1000} texto="MEIO TORTO" tom="cinza" size={26} />
        <Pilula t={t} at={c.e_montassem - 0.05} ate={c.r_montou - 0.3} x={540} y={1000} texto="MONTE VOCÊ MESMO" tom="branco" size={26} />
        <Pilula t={t} at={c.r_propria - 0.05} x={330} y={1000} texto="A PRÓPRIA" tom="verde" size={26} />
        <Pilula t={t} at={c.r_pronta - 0.05} x={760} y={1000} texto="IGUAL, PRONTA" tom="cinza" size={26} />
        <Pilula t={t} at={c.e_2012 - 0.05} ate={c.a_monte - 1.0} x={540} y={1250} texto="NORTON, MOCHON & ARIELY · 2012" tom="cinza" size={24} />
      </CamNoir>
      <TituloNoir t={t} at={0.05} ate={c.e_2012 - 0.4} linhas={[{ texto: "O MÓVEL QUE", size: 64 }, { texto: "VOCÊ MONTOU", cor: "verde", size: 96 }]} top={300} />
      <TituloNoir t={t} at={c.e_2012 - 0.25} ate={c.r_montou - 0.4} linhas={[{ texto: "2012 · UM TESTE", size: 64 }, { texto: "MONTAR CAIXAS", cor: "verde", size: 90 }]} top={300} />
      <TituloNoir t={t} at={c.r_montou - 0.25} ate={c.v_construir - 0.4} linhas={[{ texto: "A PRÓPRIA", size: 64 }, { texto: "VALE MAIS", cor: "verde", size: 100 }]} top={300} />
      <TituloNoir t={t} at={c.v_construir - 0.25} ate={c.a_monte - 1.0} linhas={[{ texto: "CONSTRUIR", size: 72 }, { texto: "DÁ VALOR", cor: "verde", size: 100 }]} top={300} />
    </div>
  );
};

/* ---------------------------------------------------------------- 2–3 · a busca a quatro mãos ---------------------------------------------------------------- */
export const Busca: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = luz(t, c.a_monte - 1.1, c.cta_quer - 0.2, 0.6, 0.45);
  if (on <= 0.001) return null;
  const fim = prog(t, c.f_defende - 0.2, 0.8, ease.out);
  const CR = [c.a_criterios - 0.2, c.a_criterios + 0.2, c.a_criterios + 0.6];
  const OP = [c.a_opcoes - 0.2, c.a_opcoes + 0.15, c.a_opcoes + 0.5];
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} t0={c.a_monte - 1.1} push={0.005} keys={[{ t: c.a_monte - 1.1, s: 1.05 }, { t: c.a_monte, s: 1.0, e: ease.out }, { t: c.a_explica, s: 1.04, y: -8 }, { t: c.f_defende + 0.4, s: 1.08, y: -16, e: ease.out }]}>
        <Svg>
          <Chao />
          <Holofote x={540} chao={CHAO} w={mix(700, 820, fim)} p={0.85} cor={fim > 0.5 ? A.hex : "#FFFFFF"} />
          {fim > 0 && <Halo x={540} y={800} r={mix(240, 380, fim)} p={0.45 * fim} cor={A.hex} />}
          {CR.map((at, i) => <g key={`c${i}`} opacity={surge(t, at)}><Icone t={t} nome="check" x={400 + i * 0} y={620 + i * 110} r={40} tom="verde" brilho={fim > 0.5} /></g>)}
          {OP.map((at, i) => <g key={`o${i}`} opacity={surge(t, at)}><Icone t={t} nome="casa" x={680} y={620 + i * 110} r={40} tom={fim > 0.5 ? "verde" : "branco"} brilho={fim > 0.5} /></g>)}
          <g opacity={surge(t, c.a_explica - 0.1)}><Icone t={t} nome="chat" x={540} y={730} r={40} tom="branco" /></g>
          <Figura t={t} x={220} y={CHAO} s={0.72} pose={t > c.a_criterios - 0.3 && t < c.a_opcoes ? "apontando" : fim > 0.5 ? "bracosAbertos" : "pe"} tom={fim > 0.5 ? "verde" : "luz"} fase={0.4} />
          <Figura t={t} x={860} y={CHAO} s={0.72} pose={t > c.a_opcoes - 0.3 && t < c.f_participa ? "apontando" : "pe"} flip tom="luz" />
        </Svg>
        <Pilula t={t} at={c.a_criterios - 0.05} x={330} y={970} texto="OS CRITÉRIOS DELE" tom="verde" size={24} />
        <Pilula t={t} at={c.a_opcoes - 0.05} x={760} y={970} texto="AS SUAS OPÇÕES" tom="branco" size={24} />
        <Pilula t={t} at={c.a_explica - 0.05} x={540} y={1050} texto="E EXPLICA CADA UMA" tom="branco" size={24} />
      </CamNoir>
      <TituloNoir t={t} at={c.a_monte - 0.9} ate={c.f_participa - 0.4} linhas={[{ texto: "MONTE A BUSCA", size: 64 }, { texto: "COM O CLIENTE", cor: "verde", size: 88 }]} top={300} />
      <TituloNoir t={t} at={c.f_participa - 0.25} ate={c.cta_quer - 0.2} linhas={[{ texto: "QUEM PARTICIPA", size: 64 }, { texto: "DEFENDE", cor: "verde", size: 104 }]} top={300} />
    </div>
  );
};
