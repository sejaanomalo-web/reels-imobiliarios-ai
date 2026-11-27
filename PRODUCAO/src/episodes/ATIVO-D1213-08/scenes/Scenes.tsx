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
 * ATIVO-D1213-08 — "O sinal e a desistência" (grade 13/12/2026 · 08h · E SE…? · Planta técnica v2).
 * Folha 1: o contrato como planta — o cômodo SINAL entre QUEM PAGOU e QUEM RECEBEU → o vendedor desiste: devolve + o
 * equivalente (CC art. 418) → quem pagou desiste: perde o sinal → com cláusula de arrependimento, o sinal vira o preço da
 * desistência (art. 420) → mergulho no SINAL → Folha 2: o sinal no papel (valor, para que serve, arrependimento) → papel
 * vira compromisso. Sem 'em dobro', sem percentuais.
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

/* ------------------------------------------------ 1 · o contrato ------------------------------------------------ */
export const Contrato: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const mg = prog(t, c.a_escrito - 0.8, 0.6, ease.linear);
  if (mg >= 1) return null;
  const SINAL = { x: 340, y: 220, w: 400, h: 210 };
  const m = mergulho(mg, SINAL, TELA);
  const vend = prog(t, c.h_vendedor - 0.2, 0.4);
  const dev = prog(t, c.r_devolve - 0.2, 0.4);
  const pag = prog(t, c.p_pagou - 0.2, 0.4);
  const arr = prog(t, c.v_arrepender - 0.2, 0.4);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans }}>
      <Camera drift={6} t={t} keys={[{ t: 0, s: 1.05, y: -8 }, { t: c.h_sinal, s: 1.0, e: ease.out }, { t: c.r_equivalente, s: 1.03, y: -8, e: ease.inOut }, { t: c.v_preco, s: 1.05, y: -12, e: ease.out }]}>
        <Prancha top={TOP} h={900}>
          <g transform={m.transform} opacity={m.opacity}>
            <g opacity={m.outros}>
              <Contorno {...TELA} p={prog(t, -0.1, 0.9, ease.out)} />
              <Rot x={540} y={168} texto="CONTRATO · O SINAL" p={prog(t, 0.2, 0.5)} />
              <Comodo x={150} y={520} w={320} h={130} p={prog(t, 0.35, 0.5, ease.out)} titulo="QUEM PAGOU" sub={pag > 0.5 ? "DESISTIU" : "COMPRADOR"} titleSize={28} tone={pag > 0.5 && arr < 0.5 ? "warn" : "linha"} />
              <Comodo x={610} y={520} w={320} h={130} p={prog(t, 0.5, 0.5, ease.out)} titulo="QUEM RECEBEU" sub={vend > 0.5 && pag < 0.5 ? "DESISTIU" : "VENDEDOR"} titleSize={28} tone={vend > 0.5 && pag < 0.5 ? "warn" : "linha"} />
              <Rota id="paga" d="M310 520 L430 420" p={prog(t, 0.6, 0.6, ease.linear) * (1 - dev)} tom="linha" />
              <Rota id="recebe" d="M650 420 L770 520" p={prog(t, 0.8, 0.6, ease.linear) * (1 - dev)} tom="linha" />
              <Rota id="volta" d="M770 520 L540 440 L310 520" p={dev * (1 - pag)} />
              <Cota x1={610} x2={930} y={690} texto="DEVOLVE + O EQUIVALENTE" p={prog(t, c.r_equivalente - 0.3, 0.4) * (1 - pag)} cor={A.hex} />
              <Cota x1={150} x2={470} y={690} texto="PERDE O SINAL" p={prog(t, c.p_perde - 0.2, 0.4) * (1 - arr)} cor={C.warn} />
              <Chamada x={540} y={330} bx={150} by={660} bw={780} texto="CLÁUSULA DE ARREPENDIMENTO" p={arr} tone="accent" />
            </g>
            <Comodo {...SINAL} p={prog(t, c.h_sinal - 0.4, 0.5, ease.out)} titulo="SINAL" sub={t > c.v_preco - 0.2 ? "= PREÇO DA DESISTÊNCIA" : ""} titleSize={32} tone="linha" acende={Math.max(prog(t, c.v_preco - 0.1, 0.4) * 0.5, mg * 0.6)} />
          </g>
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, -0.3, 0.4) * (1 - prog(t, c.r_codigo - 0.5, 0.2))} size={56}>E SE O <W>VENDEDOR</W> DESISTIR?</TituloFolha>
      <TituloFolha p={prog(t, c.r_codigo - 0.3, 0.35) * (1 - prog(t, c.p_pagou - 0.5, 0.2))} size={56}>A LEI <G>JÁ RESPONDE</G></TituloFolha>
      <TituloFolha p={prog(t, c.p_pagou - 0.3, 0.35) * (1 - prog(t, c.v_arrepender - 0.5, 0.2))} size={56}>QUEM PAGOU <W>E DESISTE</W></TituloFolha>
      <TituloFolha p={prog(t, c.v_arrepender - 0.3, 0.35) * (1 - prog(t, c.a_escrito - 0.8, 0.2))} size={56}>COM ARREPENDIMENTO, <G>MUDA</G></TituloFolha>
      <SeloPlanta texto="CÓDIGO CIVIL · ARTS. 417 A 420" p={prog(t, c.r_codigo - 0.1, 0.4) * (1 - prog(t, c.a_escrito - 0.8, 0.3))} />
    </div>
  );
};

/* ------------------------------------------------ 2 · o sinal no papel ------------------------------------------------ */
export const NoPapel: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const ini = c.a_escrito - 0.25;
  if (t < ini - 0.05 || t > c.cta_quer + 0.4) return null;
  const sai = prog(t, c.cta_quer - 0.2, 0.5);
  const fim = prog(t, c.f_compromisso - 0.2, 0.4);
  const ROWS: [number, string][] = [[c.a_valor, "O VALOR"], [c.a_serve, "PARA QUE ELE SERVE"], [c.a_arrependimento, "TEM ARREPENDIMENTO?"]];
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(prog(t, ini, 0.35), 1 - sai) }}>
      <Camera drift={6} t={t} keys={[{ t: ini, s: 1.0 }, { t: c.a_arrependimento, s: 1.03, y: -8, e: ease.out }, { t: c.f_compromisso, s: 1.06, y: -14, e: ease.out }]}>
        <Prancha top={TOP} h={900}>
          <Contorno {...TELA} p={prog(t, ini, 0.6, ease.out)} />
          <Rot x={540} y={168} texto="PROJETO: O SINAL NO PAPEL" p={prog(t, ini + 0.2, 0.5)} />
          {ROWS.map(([at, s], i) => (
            <Comodo key={s} x={170} y={210 + i * 150} w={740} h={120} p={prog(t, at - 0.3, 0.4, ease.out)} titulo={s} titleSize={32} acende={prog(t, at - 0.1, 0.4) * (fim > 0.5 ? 0.55 : 0.4)} />
          ))}
          <Cota x1={170} x2={910} y={700} texto={t > c.f_compromisso - 0.2 ? "ESCRITO: COMPROMISSO" : "SEM PAPEL: BRIGA"} p={prog(t, c.f_briga - 0.2, 0.4)} cor={fim > 0.5 ? A.hex : C.warn} />
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, ini, 0.35) * (1 - prog(t, c.f_briga - 0.5, 0.2))} size={56}>DEIXE <G>ESCRITO</G></TituloFolha>
      <TituloFolha p={prog(t, c.f_briga - 0.3, 0.35)} size={56}>PAPEL VIRA <G>COMPROMISSO</G></TituloFolha>
    </div>
  );
};
