import React from "react";
import { C, F } from "../../../theme";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A } from "../../NOV26/kit";
import {
  Chamada, Comodo, Contorno, Cota, Prancha, Rota, SeloPlanta, TituloFolha,
  clamp01, ease, mergulho, prog,
} from "../../../estilos/planta";

/**
 * ATIVO-D1209-21 — "Os 180 dias" (grade 09/12/2026 · 21h · CORRETOR NA VIDA REAL · Planta técnica v2).
 * Folhas: o cronograma da obra (OBRA até a data prometida) → a lei: tolerância de até 180 dias → só com cláusula clara e
 * destacada → passou disso: duas rotas (desfazer e receber o que pagou, com a multa · manter e ser indenizado) → mergulho no
 * contrato: mostre a cláusula, anote a data prometida → combinado é prazo; escondido vira briga.
 * Apuração: Lei 4.591/1964, art. 43-A (incluído pela Lei 13.786/2018). Sem percentual na tela.
 */
const M = "JetBrains Mono";
const TOP = 380;
const fade = (p: number) => clamp01(p * 1.5);
const TELA = { x: 120, y: 120, w: 840, h: 640 };
const G: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: A.hex }}>{children}</span>;
const W: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: C.warn }}>{children}</span>;
const Rot: React.FC<{ x: number; y: number; texto: string; p: number; cor?: string; size?: number; anchor?: "start" | "middle" }> = ({ x, y, texto, p, cor = C.muted, size = 26, anchor = "middle" }) => (
  <text x={x} y={y} textAnchor={anchor} fill={cor} fontFamily={M} fontWeight={700} fontSize={size} letterSpacing="0.12em" opacity={fade(p)}>{texto}</text>
);

/* ------------------------------------------------ 1 · o cronograma ------------------------------------------------ */
export const Cronograma: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const mg = prog(t, c.a_mostre - 0.7, 0.6, ease.linear);
  if (mg >= 1) return null;
  const TOL = { x: 570, y: 200, w: 220, h: 120 };
  const m = mergulho(mg, TOL, TELA);
  const passou = prog(t, c.v_passou - 0.2, 0.5);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans }}>
      <Camera drift={6} t={t} keys={[{ t: 0, s: 1.05, y: -8 }, { t: c.r_lei, s: 1.0, e: ease.out }, { t: c.c_destacada, s: 1.03, y: -8, e: ease.inOut }, { t: c.v_indenizado, s: 1.05, y: -12, e: ease.out }]}>
        <Prancha top={TOP} h={900}>
          <g transform={m.transform} opacity={m.opacity}>
            <g opacity={m.outros}>
              <Contorno {...TELA} p={prog(t, -0.1, 0.9, ease.out)} />
              <Rot x={540} y={168} texto="CRONOGRAMA DA OBRA" p={prog(t, 0.2, 0.5)} />
              <Comodo x={150} y={200} w={420} h={120} p={prog(t, c.h_planta - 0.3, 0.6, ease.out)} titulo="OBRA" titleSize={32} />
              <Comodo x={790} y={200} w={140} h={120} p={prog(t, c.v_passou - 0.3, 0.4, ease.out)} titulo="DEPOIS" titleSize={24} tone="warn" />
              <Cota x1={150} x2={570} y={370} texto="ATÉ A DATA PROMETIDA" p={prog(t, c.r_prometida - 0.2, 0.4)} cor={C.text} />
              <Cota x1={570} x2={790} y={370} texto="180 DIAS" p={prog(t, c.r_180 - 0.2, 0.4)} cor={C.warn} />
              <Chamada x={680} y={320} bx={170} by={470} bw={740} texto="SÓ COM CLÁUSULA CLARA E DESTACADA" p={prog(t, c.c_clausula - 0.2, 0.4) * (1 - passou)} tone="accent" />
              <Rota id="desf" d="M860 320 L860 430 L330 430 L330 480" p={prog(t, c.v_desfazer - 0.3, 0.6, ease.linear)} />
              <Rota id="mant" d="M860 320 L860 480" p={prog(t, c.v_manter - 0.3, 0.4, ease.linear)} />
              <Comodo x={150} y={490} w={380} h={190} p={prog(t, c.v_desfazer - 0.2, 0.5, ease.out)} titulo="DESFAZER" sub="DEVOLUÇÃO + MULTA" titleSize={30} acende={prog(t, c.v_receber - 0.1, 0.4) * 0.5} />
              <Comodo x={560} y={490} w={370} h={190} p={prog(t, c.v_manter - 0.2, 0.5, ease.out)} titulo="MANTER" sub="INDENIZAÇÃO" titleSize={30} acende={prog(t, c.v_indenizado - 0.1, 0.4) * 0.5} />
            </g>
            <Comodo {...TOL} p={prog(t, c.r_tolerancia - 0.3, 0.5, ease.out)} titulo="TOLERÂNCIA" titleSize={26} tone={t > c.c_clausula - 0.2 ? "linha" : "warn"} acende={prog(t, c.c_destacada - 0.1, 0.4) * 0.5 * (1 - passou)} />
          </g>
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, -0.3, 0.4) * (1 - prog(t, c.r_lei - 0.5, 0.2))} size={56}>ATRASOU <W>6 MESES</W>?</TituloFolha>
      <TituloFolha p={prog(t, c.r_lei - 0.3, 0.35) * (1 - prog(t, c.c_clausula - 0.5, 0.2))} size={56}>A LEI: <G>ATÉ 180 DIAS</G></TituloFolha>
      <TituloFolha p={prog(t, c.c_clausula - 0.3, 0.35) * (1 - prog(t, c.v_passou - 0.5, 0.2))} size={56}>SÓ SE ESTIVER <G>ESCRITO</G></TituloFolha>
      <TituloFolha p={prog(t, c.v_passou - 0.3, 0.35) * (1 - prog(t, c.a_mostre - 0.7, 0.2))} size={56}>PASSOU DISSO, <G>DUAS SAÍDAS</G></TituloFolha>
      <SeloPlanta texto="LEI 4.591/64 · ART. 43-A (LEI 13.786/2018)" p={prog(t, c.r_lei - 0.1, 0.4) * (1 - prog(t, c.a_mostre - 0.7, 0.3))} />
    </div>
  );
};

/* ------------------------------------------------ 2 · o contrato ------------------------------------------------ */
export const Contrato: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const ini = c.a_mostre - 0.15;
  if (t < ini - 0.05 || t > c.cta_quer + 0.4) return null;
  const sai = prog(t, c.cta_quer - 0.2, 0.5);
  const esc = prog(t, c.f_escondido - 0.2, 0.4);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(prog(t, ini, 0.35), 1 - sai) }}>
      <Camera drift={6} t={t} keys={[{ t: ini, s: 1.0 }, { t: c.a_anote, s: 1.03, y: -8, e: ease.out }, { t: c.f_briga, s: 1.06, y: -14, e: ease.out }]}>
        <Prancha top={TOP} h={900}>
          <Contorno {...TELA} p={prog(t, ini, 0.6, ease.out)} />
          <Rot x={540} y={168} texto="CONTRATO · IMÓVEL NA PLANTA" p={prog(t, ini + 0.2, 0.5)} />
          <Comodo x={170} y={210} w={740} h={130} p={prog(t, ini + 0.2, 0.5, ease.out)} titulo="CLÁUSULA DE TOLERÂNCIA" titleSize={30} acende={prog(t, c.a_mostre, 0.4) * 0.6 * (1 - esc)} tone={esc > 0.5 ? "warn" : "linha"} />
          <Comodo x={170} y={370} w={740} h={130} p={prog(t, ini + 0.3, 0.5, ease.out)} titulo="DATA PROMETIDA" titleSize={30} acende={prog(t, c.a_anote - 0.1, 0.4) * 0.6 * (1 - esc)} />
          <Comodo x={170} y={530} w={740} h={110} p={prog(t, ini + 0.4, 0.5, ease.out)} titulo="ASSINATURAS" titleSize={24} tone="muted" />
          <Cota x1={170} x2={910} y={690} texto={esc > 0.5 ? "NINGUÉM MOSTROU: VIRA BRIGA" : "MOSTRADO ANTES DE ASSINAR"} p={prog(t, c.a_anote + 0.4, 0.4)} cor={esc > 0.5 ? C.warn : A.hex} />
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, ini, 0.35) * (1 - prog(t, c.f_combinado - 0.5, 0.2))} size={56}>NA VENDA, <G>MOSTRE E ANOTE</G></TituloFolha>
      <TituloFolha p={prog(t, c.f_combinado - 0.3, 0.35) * (1 - prog(t, c.f_escondido - 0.4, 0.2))} size={56}>COMBINADO <G>É PRAZO</G></TituloFolha>
      <TituloFolha p={prog(t, c.f_escondido - 0.25, 0.35)} size={56}>ESCONDIDO <W>VIRA BRIGA</W></TituloFolha>
    </div>
  );
};
