import React from "react";
import type { Timeline } from "../../types";
import {
  A, CamNoir, Figura, Halo, Holofote, Icone, NOIR, Pilula, TituloNoir, aa, ease, luz, mix, prog, surge,
} from "../../../estilos/pictograma";

/**
 * ATIVO-D1206-21 — "O preço por dia" (grade 06/12/2026 · 21h · FORA DA BOLHA · Pictograma).
 * Sem corte seco: uma moeda (R$ 1 por dia) × uma pilha (R$ 365 por ano): o mesmo dinheiro → 1998, um pesquisador de Harvard:
 * dito por dia, parece menor (a gente compara com um café) → use para clareza, não para pressão → a balança: a diferença por
 * dia × as horas de trânsito → número grande assusta, o do dia a dia se compara → fecho CtaNoir.
 * Apuração: Gourville (1998), 'Pennies-a-Day', Journal of Consumer Research; sem números do estudo.
 */
const CHAO = 1180;
type P = { t: number; tl: Timeline };
const Svg: React.FC<{ children: React.ReactNode }> = ({ children }) => <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>{children}</svg>;
const Chao: React.FC = () => <line x1={-400} y1={CHAO} x2={1480} y2={CHAO} stroke="rgba(244,244,242,0.3)" strokeWidth={2} strokeDasharray="3 9" />;
const GLOW_V = `drop-shadow(0 0 12px ${aa(0.6)})`;

/** Xícara em linha fina. */
const Xicara: React.FC<{ x: number; y: number; p: number }> = ({ x, y, p }) => (
  <g transform={`translate(${x} ${y})`} opacity={p} fill="none" stroke={NOIR.branco} strokeWidth={4} strokeLinecap="round">
    <path d="M-46 -30 H46 V10 C46 34 28 46 0 46 C-28 46 -46 34 -46 10 Z" />
    <path d="M46 -14 C70 -14 70 22 46 22" />
    <path d="M-20 -48 C-14 -58 -26 -66 -20 -76 M2 -48 C8 -58 -4 -66 2 -76 M24 -48 C30 -58 18 -66 24 -76" opacity={0.6} />
    <path d="M-70 58 H70" />
  </g>
);

/* ---------------------------------------------------------------- 1 · a moeda e a pilha ---------------------------------------------------------------- */
export const Moedas: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = 1 - prog(t, c.v_clareza - 0.9, 0.5);
  if (on <= 0.001) return null;
  const pilha = surge(t, c.h_ano - 0.3, 0.6);
  const igual = surge(t, c.h_mesmo - 0.2);
  const encolhe = prog(t, c.e_menor - 0.3, 0.7, ease.out);
  const cafe = surge(t, c.c_cafe - 0.3, 0.5);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} push={0.004} keys={[{ t: 0, s: 1.06, y: -16 }, { t: c.h_ano, s: 1.0, e: ease.out }, { t: c.e_1998, s: 1.03, x: 20 }, { t: c.c_cafe, s: 1.06, x: -20, y: -12, e: ease.out }]}>
        <Svg>
          <Chao />
          <Holofote x={540} chao={CHAO} w={720} p={prog(t, 0, 0.6)} />
          <g opacity={surge(t, c.h_real - 0.2)}><Icone t={t} nome="dinheiro" x={300} y={820} r={46} tom={igual > 0.5 ? "verde" : "branco"} brilho={igual > 0.5} /></g>
          {Array.from({ length: 9 }, (_, i) => (
            <g key={i} opacity={pilha * (i / 9 < pilha ? 1 : 0)} transform={`translate(0 ${mix(0, 60, encolhe) * (i / 8)})`}>
              <Icone t={t} nome="dinheiro" x={780} y={930 - i * mix(30, 8, encolhe)} r={mix(40, 34, encolhe)} tom={igual > 0.5 ? "verde" : "branco"} />
            </g>
          ))}
          <text x={540} y={860} textAnchor="middle" fill={A.hex} fontFamily="Manrope" fontWeight={800} fontSize={90} opacity={igual * (1 - cafe)} style={{ filter: GLOW_V }}>=</text>
          <Xicara x={540} y={760} p={cafe} />
          <Figura t={t} x={540} y={CHAO} s={0.8} pose={t > c.e_1998 && t < c.c_compara ? "apontando" : "pe"} tom="luz" />
        </Svg>
        <Pilula t={t} at={c.h_real - 0.05} ate={c.e_1998 - 0.3} x={300} y={920} texto="R$ 1 POR DIA" tom="branco" size={28} />
        <Pilula t={t} at={c.h_ano - 0.05} ate={c.e_1998 - 0.3} x={780} y={1010} texto="R$ 365 POR ANO" tom="branco" size={28} />
        <Pilula t={t} at={c.h_mesmo - 0.05} ate={c.e_1998 - 0.3} x={540} y={700} texto="O MESMO DINHEIRO" tom="verde" size={30} />
        <Pilula t={t} at={c.e_menor - 0.05} ate={c.c_cafe - 0.3} x={540} y={700} texto="DITO POR DIA, PARECE MENOR" tom="verde" size={28} />
        <Pilula t={t} at={c.c_cafe - 0.05} x={540} y={880} texto="COMPARADO COM UM CAFÉ" tom="branco" size={28} />
      </CamNoir>
      <TituloNoir t={t} at={0.05} ate={c.e_1998 - 0.3} linhas={[{ texto: "UM REAL POR DIA", size: 70 }, { texto: "PARECE POUCO", cor: "verde", size: 84 }]} top={300} />
      <TituloNoir t={t} at={c.e_1998 - 0.15} ate={c.c_compara - 0.3} linhas={[{ texto: "1998 · HARVARD", size: 64 }, { texto: "O PREÇO POR DIA", size: 84 }]} top={300} />
      <TituloNoir t={t} at={c.c_compara - 0.15} ate={c.v_clareza - 0.9} linhas={[{ texto: "A GENTE", size: 64 }, { texto: "COMPARA", cor: "verde", size: 96 }]} top={300} />
    </div>
  );
};

/* ---------------------------------------------------------------- 2–3 · clareza e a balança ---------------------------------------------------------------- */
export const Balanca: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = luz(t, c.v_clareza - 1.0, c.f_assusta - 0.9, 0.6, 0.5);
  if (on <= 0.001) return null;
  const bal = surge(t, c.a_trabalho - 0.4, 0.6);
  const esq = surge(t, c.a_dia - 0.2);
  const dir = surge(t, c.a_horas - 0.2);
  const incl = mix(0, -0.12, dir) + mix(0, 0.05, esq * (1 - dir));
  const cx = 540, cy = 760, L = 280;
  const ex = cx - L * Math.cos(incl), ey = cy - L * Math.sin(incl), dx = cx + L * Math.cos(incl), dy = cy + L * Math.sin(incl);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} t0={c.v_clareza - 1.0} push={0.005} keys={[{ t: c.v_clareza - 1.0, s: 1.05 }, { t: c.v_pressionar, s: 1.0, e: ease.out }, { t: c.a_horas + 0.5, s: 1.05, y: -14, e: ease.out }]}>
        <Svg>
          <Chao />
          <Holofote x={540} chao={CHAO} w={mix(520, 680, dir)} p={0.85} cor={dir > 0.5 ? A.hex : "#FFFFFF"} />
          <g opacity={bal} stroke={NOIR.branco} strokeWidth={4} fill="none" strokeLinecap="round">
            <path d={`M${cx} ${cy} V${cy + 300} M${cx - 90} ${cy + 300} H${cx + 90}`} />
            <path d={`M${ex} ${ey} L${dx} ${dy}`} />
            <path d={`M${ex} ${ey} l-70 110 h140 z M${dx} ${dy} l-70 110 h140 z`} />
          </g>
          <g opacity={bal * esq}><Icone t={t} nome="dinheiro" x={ex} y={ey + 70} r={36} tom="branco" /></g>
          <g opacity={bal * dir}><Icone t={t} nome="relogio" x={dx} y={dy + 70} r={36} tom="verde" brilho /></g>
          <g opacity={surge(t, c.a_trabalho - 0.2) * (1 - bal * 0.0)}><Icone t={t} nome="predio" x={540} y={560} r={44} tom="branco" /></g>
          <g opacity={1 - surge(t, c.a_trabalho - 0.5)}><Figura t={t} x={260} y={CHAO} s={0.8} pose="apontando" tom="luz" /></g>
        </Svg>
        <Pilula t={t} at={c.v_clareza - 0.05} ate={c.a_trabalho - 0.4} x={540} y={760} texto="CLAREZA" tom="verde" size={34} />
        <Pilula t={t} at={c.v_pressionar - 0.05} ate={c.a_trabalho - 0.4} x={540} y={840} texto="PRESSÃO, NÃO" tom="vermelho" size={30} />
        <Pilula t={t} at={c.a_trabalho - 0.05} x={540} y={635} texto="PERTO DO TRABALHO" tom="branco" size={26} />
        <Pilula t={t} at={c.a_dia - 0.05} x={300} y={1000} texto="+ R$ POR DIA" tom="branco" size={26} />
        <Pilula t={t} at={c.a_horas - 0.05} x={790} y={1000} texto="HORAS DE TRÂNSITO" tom="verde" size={26} />
      </CamNoir>
      <TituloNoir t={t} at={c.v_clareza - 0.9} ate={c.a_trabalho - 0.4} linhas={[{ texto: "USE PARA", size: 64 }, { texto: "DAR CLAREZA", cor: "verde", size: 92 }]} top={300} />
      <TituloNoir t={t} at={c.a_trabalho - 0.25} ate={c.f_assusta - 0.9} linhas={[{ texto: "A DIFERENÇA", size: 64 }, { texto: "POR DIA", cor: "verde", size: 96 }]} top={300} />
    </div>
  );
};

/* ---------------------------------------------------------------- 4 · número do dia a dia ---------------------------------------------------------------- */
export const Fecho: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = luz(t, c.f_assusta - 1.0, c.cta_quer - 0.2, 0.6, 0.45);
  if (on <= 0.001) return null;
  const leve = prog(t, c.f_assusta + 0.8, 0.9, ease.out);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} t0={c.f_assusta - 1.0} push={0.005} keys={[{ t: c.f_assusta - 1.0, s: 1.04 }, { t: c.f_assusta, s: 1.0, e: ease.out }, { t: c.f_comparar + 0.4, s: 1.07, y: -18, e: ease.out }]}>
        <Svg>
          <Chao />
          <Holofote x={540} chao={CHAO} w={mix(560, 720, leve)} p={0.85} cor={leve > 0.3 ? A.hex : "#FFFFFF"} />
          <Halo x={540} y={CHAO - 220} r={mix(280, 420, leve)} p={0.5 * leve} cor={A.hex} />
          <g opacity={1 - leve}><Icone t={t} nome="dinheiro" x={540} y={760} r={mix(90, 40, leve)} tom="vermelho" /></g>
          <g opacity={leve}><Icone t={t} nome="dinheiro" x={540} y={760} r={44} tom="verde" brilho /></g>
          <Figura t={t} x={540} y={CHAO} pose={leve > 0.5 ? "bracosAbertos" : "pe"} tom={leve > 0.5 ? "verde" : "luz"} />
        </Svg>
      </CamNoir>
      <TituloNoir t={t} at={c.f_assusta - 0.9} ate={c.f_assusta + 0.6} linhas={[{ texto: "NÚMERO GRANDE", size: 72 }, { texto: "ASSUSTA", cor: "vermelho", size: 96 }]} top={300} />
      <TituloNoir t={t} at={c.f_assusta + 0.75} ate={c.cta_quer - 0.2} linhas={[{ texto: "O DO DIA A DIA", size: 72 }, { texto: "SE COMPARA", cor: "verde", size: 96 }]} top={300} />
    </div>
  );
};
