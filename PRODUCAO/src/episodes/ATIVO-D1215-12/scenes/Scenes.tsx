import React from "react";
import { C, F } from "../../../theme";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A } from "../../NOV26/kit";
import {
  Comodo, Contorno, Cota, Prancha, SeloPlanta, TituloFolha,
  clamp01, ease, mergulho, prog,
} from "../../../estilos/planta";

/**
 * ATIVO-D1215-12 — "O que já vem marcado" (grade 15/12/2026 · 12h · FORA DA BOLHA · Planta técnica v2).
 * Folha 1: dois formulários como cômodos — MARCAR (para doar) × DESMARCAR (para sair); a caixinha vazia × a caixinha já
 * marcada; as barras sobem: 42% × 82% → o que já vem pronto → mergulho no formulário marcado → Folha 2: o cadastro do
 * imóvel pré-preenchido (endereço, metragem, vagas) e a cota PROPRIETÁRIO: CONFERIR E CORRIGIR → em branco fica para
 * depois; pronto volta. Johnson & Goldstein (2003/2004).
 */
const M = "JetBrains Mono";
const TOP = 380;
const fade = (p: number) => clamp01(p * 1.5);
const TELA = { x: 120, y: 120, w: 840, h: 640 };
const G: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: A.hex }}>{children}</span>;
const W: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: C.warn }}>{children}</span>;
const Rot: React.FC<{ x: number; y: number; texto: string; p: number; cor?: string; size?: number }> = ({ x, y, texto, p, cor = C.muted, size = 26 }) => (
  <text x={x} y={y} textAnchor="middle" fill={cor} fontFamily={M} fontWeight={700} fontSize={size} letterSpacing="0.12em" opacity={fade(p)}>{texto}</text>
);
const Caixa: React.FC<{ x: number; y: number; p: number; marcada: number; cor: string }> = ({ x, y, p, marcada, cor }) => (
  <g opacity={fade(p)}>
    <rect x={x - 34} y={y - 34} width={68} height={68} rx={8} fill="none" stroke={cor} strokeWidth={4} />
    <path d={`M${x - 20} ${y} L${x - 5} ${y + 16} L${x + 22} ${y - 18}`} fill="none" stroke={cor} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - marcada} />
  </g>
);
const BarraV: React.FC<{ x: number; base: number; h: number; p: number; cor: string }> = ({ x, base, h, p, cor }) => (
  <g opacity={fade(p)}>
    <rect x={x - 40} y={base - h * p} width={80} height={h * p} fill={cor} opacity={0.22} stroke={cor} strokeWidth={3} />
  </g>
);

/* ------------------------------------------------ 1 · os dois formulários ------------------------------------------------ */
export const Formularios: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const mg = prog(t, c.a_cadastro - 0.8, 0.6, ease.linear);
  if (mg >= 1) return null;
  const DIR = { x: 540, y: 200, w: 380, h: 420 };
  const m = mergulho(mg, DIR, TELA);
  const ini = prog(t, c.i_marcar - 0.2, 0.4);
  const out = prog(t, c.o_desmarcar - 0.2, 0.4);
  const pronto = prog(t, c.v_pronto - 0.2, 0.4);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans }}>
      <Camera drift={6} t={t} keys={[{ t: 0, s: 1.05, y: -8 }, { t: c.h_dobro, s: 1.0, e: ease.out }, { t: c.i_quarenta, s: 1.03, x: 20, e: ease.inOut }, { t: c.o_oitenta, s: 1.03, x: -20, e: ease.inOut }, { t: c.v_pronto, s: 1.05, y: -12, e: ease.out }]}>
        <Prancha top={TOP} h={900}>
          <g transform={m.transform} opacity={m.opacity}>
            <g opacity={m.outros}>
              <Contorno {...TELA} p={prog(t, -0.1, 0.9, ease.out)} />
              <Rot x={540} y={168} texto="EXPERIMENTO · 2003" p={prog(t, 0.2, 0.5)} />
              <Comodo x={160} y={200} w={380} h={420} p={prog(t, 0.3, 0.5, ease.out)} titulo="MARCAR" sub={ini > 0.5 ? "PARA DOAR" : ""} titleSize={32} tone={ini > 0.5 && pronto < 0.5 ? "linha" : "linha"} />
              <Caixa x={350} y={330} p={prog(t, 0.6, 0.4)} marcada={0} cor="#F4F4F2" />
              <BarraV x={350} base={600} h={110} p={prog(t, c.i_quarenta - 0.2, 0.7, ease.out)} cor="#F4F4F2" />
              <Cota x1={160} x2={540} y={680} texto="42% ACEITARAM" p={prog(t, c.i_quarenta - 0.1, 0.4)} cor={C.text} />
              <Caixa x={730} y={330} p={prog(t, 0.75, 0.4)} marcada={prog(t, c.h_marcado - 0.3, 0.5)} cor={A.hex} />
              <BarraV x={730} base={600} h={215} p={prog(t, c.o_oitenta - 0.2, 0.8, ease.out)} cor={A.hex} />
              <Cota x1={540} x2={920} y={680} texto="82% FICARAM" p={prog(t, c.o_oitenta - 0.1, 0.4)} cor={A.hex} />
            </g>
            <Comodo {...DIR} p={prog(t, 0.45, 0.5, ease.out)} titulo="DESMARCAR" sub={out > 0.5 ? "PARA SAIR" : ""} titleSize={32} acende={Math.max(pronto * 0.4, mg * 0.6)} />
          </g>
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, -0.3, 0.4) * (1 - ini)} size={56}>QUASE O <G>DOBRO</G> DE SIM</TituloFolha>
      <TituloFolha p={ini * (1 - out)} size={56}>PRECISAVA <W>MARCAR</W></TituloFolha>
      <TituloFolha p={out * (1 - prog(t, c.v_aceitar - 0.3, 0.3))} size={56}>JÁ VINHA <G>MARCADO</G></TituloFolha>
      <TituloFolha p={prog(t, c.v_aceitar - 0.2, 0.35) * (1 - prog(t, c.a_cadastro - 0.8, 0.2))} size={56}>O QUE VEM <G>PRONTO</G></TituloFolha>
      <SeloPlanta texto="JOHNSON & GOLDSTEIN · SCIENCE, 2003" p={prog(t, c.h_2003 - 0.1, 0.4) * (1 - prog(t, c.a_cadastro - 0.8, 0.3))} />
    </div>
  );
};

/* ------------------------------------------------ 2 · o cadastro pronto ------------------------------------------------ */
export const Cadastro: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const ini = c.a_cadastro - 0.25;
  if (t < ini - 0.05 || t > c.cta_quer + 0.4) return null;
  const sai = prog(t, c.cta_quer - 0.2, 0.5);
  const fim = prog(t, c.d_volta - 0.2, 0.4);
  const ROWS: [number, string][] = [[c.a_preenchido - 0.3, "ENDEREÇO ✓"], [c.a_preenchido + 0.2, "METRAGEM ✓"], [c.a_preenchido + 0.7, "VAGAS ✓"]];
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(prog(t, ini, 0.35), 1 - sai) }}>
      <Camera drift={6} t={t} keys={[{ t: ini, s: 1.0 }, { t: c.a_conferir, s: 1.03, y: -8, e: ease.out }, { t: c.d_volta, s: 1.06, y: -14, e: ease.out }]}>
        <Prancha top={TOP} h={900}>
          <Contorno {...TELA} p={prog(t, ini, 0.6, ease.out)} />
          <Rot x={540} y={168} texto="CADASTRO DO IMÓVEL · JÁ PREENCHIDO" p={prog(t, ini + 0.2, 0.5)} />
          {ROWS.map(([at, s], i) => (
            <Comodo key={s} x={170} y={210 + i * 130} w={740} h={105} p={prog(t, at - 0.3, 0.4, ease.out)} titulo={s} titleSize={30} acende={prog(t, at - 0.1, 0.4) * (fim > 0.5 ? 0.55 : 0.35)} />
          ))}
          <Cota x1={170} x2={910} y={640} texto="PROPRIETÁRIO: CONFERIR E CORRIGIR" p={prog(t, c.a_conferir - 0.2, 0.4)} cor={A.hex} />
          <Cota x1={170} x2={910} y={720} texto={t > c.d_volta - 0.2 ? "PRONTO: VOLTA" : "EM BRANCO: FICA PARA DEPOIS"} p={prog(t, c.d_branco - 0.2, 0.4)} cor={fim > 0.5 ? A.hex : C.warn} />
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, ini, 0.35) * (1 - prog(t, c.d_branco - 0.5, 0.2))} size={56}>MANDE <G>PREENCHIDO</G></TituloFolha>
      <TituloFolha p={prog(t, c.d_branco - 0.3, 0.35)} size={56}>FORMULÁRIO PRONTO <G>VOLTA</G></TituloFolha>
    </div>
  );
};
