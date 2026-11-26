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
 * ATIVO-D1207-12 — "Dois carimbos de graça" (grade 07/12/2026 · 12h · FORA DA BOLHA · Planta técnica v2).
 * Folhas: dois cartões de fidelidade na prancha (8 espaços × 10 com 2 já acesos; faltavam 8 nos dois) → quem via o caminho
 * começado completou mais, e mais rápido → mergulho nos dois carimbos → a planta do SEU FINANCIAMENTO: documentos e simulação
 * acesos, falta a avaliação → ninguém larga um caminho começado. Apuração: Nunes & Drèze (2006), JCR; sem percentuais.
 */
const M = "JetBrains Mono";
const TOP = 380;
const fade = (p: number) => clamp01(p * 1.5);
const TELA = { x: 120, y: 120, w: 840, h: 640 };
const G: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: A.hex }}>{children}</span>;
const Rot: React.FC<{ x: number; y: number; texto: string; p: number; cor?: string; size?: number }> = ({ x, y, texto, p, cor = C.muted, size = 26 }) => (
  <text x={x} y={y} textAnchor="middle" fill={cor} fontFamily={M} fontWeight={700} fontSize={size} letterSpacing="0.12em" opacity={fade(p)}>{texto}</text>
);
const CA = (i: number) => ({ x: 150 + i * 97, y: 210, w: 86, h: 110 });
const CB = (i: number) => ({ x: 150 + i * 78, y: 460, w: 70, h: 110 });
const DOIS = { x: 150, y: 460, w: 148, h: 110 };

/* ------------------------------------------------ 1 · os dois cartões ------------------------------------------------ */
export const Cartoes: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const mg = prog(t, c.a_financiamento - 0.7, 0.6, ease.linear);
  if (mg >= 1) return null;
  const m = mergulho(mg, DOIS, TELA);
  const a = (i: number) => prog(t, (t < c.o_oito - 0.5 ? c.h_dois : c.o_oito - 0.4) + i * 0.06, 0.3, ease.out);
  const b = (i: number) => prog(t, (t < c.d_dez - 0.5 ? c.h_dois + 0.2 : c.d_dez - 0.4) + i * 0.05, 0.3, ease.out);
  const brinde = prog(t, Math.min(c.h_dois + 0.4, c.d_duas - 0.2), 0.4);
  const mais = prog(t, c.v_comecado - 0.1, 0.5);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans }}>
      <Camera drift={6} t={t} keys={[{ t: 0, s: 1.05, y: -8 }, { t: c.o_2006, s: 1.0, e: ease.out }, { t: c.d_dez, s: 1.03, y: -10, e: ease.inOut }, { t: c.v_rapido, s: 1.06, y: -16, e: ease.out }]}>
        <Prancha top={TOP} h={900}>
          <g transform={m.transform} opacity={m.opacity}>
            <g opacity={m.outros}>
              <Contorno {...TELA} p={prog(t, -0.1, 0.9, ease.out)} />
              <Rot x={540} y={190} texto="CARTÃO A · 8 ESPAÇOS" p={prog(t, c.h_dois, 0.5)} cor={t > c.o_metade - 0.2 && t < c.d_dez - 0.3 ? C.text : C.muted} />
              {Array.from({ length: 8 }, (_, i) => <Comodo key={i} {...CA(i)} p={a(i)} titulo={`${i + 1}`} titleSize={28} tone="muted" />)}
              <Rot x={540} y={440} texto="CARTÃO B · 10 ESPAÇOS, 2 DE BRINDE" p={prog(t, c.h_dois + 0.2, 0.5)} cor={t > c.d_dez - 0.2 ? C.text : C.muted} />
              {Array.from({ length: 8 }, (_, i) => <Comodo key={i} {...CB(i + 2)} p={b(i + 2)} titulo={`${i + 3}`} titleSize={26} acende={mais * 0.35} />)}
              <Cota x1={150} x2={930} y={620} texto="FALTAVAM 8 NOS DOIS" p={prog(t, c.d_oito - 0.2, 0.4)} cor={C.text} />
              <Chamada x={700} y={560} bx={440} by={680} bw={480} texto="COMPLETOU MAIS, E MAIS RÁPIDO" p={mais} tone="accent" />
            </g>
            <Comodo {...CB(0)} p={b(0)} titulo="1" titleSize={26} acende={brinde * 0.8} />
            <Comodo {...CB(1)} p={b(1)} titulo="2" titleSize={26} acende={brinde * 0.8} />
          </g>
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, -0.3, 0.4) * (1 - prog(t, c.o_2006 - 0.6, 0.2))} size={56}><G>DOIS CARIMBOS</G> DE GRAÇA</TituloFolha>
      <TituloFolha p={prog(t, c.o_2006 - 0.4, 0.35) * (1 - prog(t, c.v_comecado - 0.6, 0.2))} size={56}><G>2006</G>: UM LAVA-RÁPIDO</TituloFolha>
      <TituloFolha p={prog(t, c.v_comecado - 0.4, 0.35) * (1 - prog(t, c.a_financiamento - 0.7, 0.2))} size={56}>O CAMINHO <G>JÁ COMEÇADO</G></TituloFolha>
      <SeloPlanta texto="NUNES & DRÈZE, JOURNAL OF CONSUMER RESEARCH, 2006" p={prog(t, c.o_2006 - 0.2, 0.4) * (1 - prog(t, c.a_financiamento - 0.7, 0.3))} />
    </div>
  );
};

/* ------------------------------------------------ 2 · o seu financiamento ------------------------------------------------ */
const ETAPAS = (c: Record<string, number>) => [
  { x: 150, y: 200, w: 250, h: 180, titulo: "DOCUMENTOS", sub: "ENVIADOS", at: c.a_documentos, feito: true },
  { x: 415, y: 200, w: 250, h: 180, titulo: "SIMULAÇÃO", sub: "PRONTA", at: c.a_simulacao, feito: true },
  { x: 680, y: 200, w: 250, h: 180, titulo: "AVALIAÇÃO", sub: "PRÓXIMA", at: c.a_avaliacao, feito: false },
  { x: 150, y: 400, w: 380, h: 180, titulo: "ANÁLISE", sub: "", at: 1e9, feito: false },
  { x: 550, y: 400, w: 380, h: 180, titulo: "ASSINATURA", sub: "", at: 1e9, feito: false },
];
export const Financiamento: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const ini = c.a_financiamento - 0.15;
  if (t < ini - 0.05 || t > c.cta_quer + 0.4) return null;
  const sai = prog(t, c.cta_quer - 0.2, 0.5);
  const fim = prog(t, c.f_comecou - 0.2, 0.4);
  const it = ETAPAS(c);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(prog(t, ini, 0.35), 1 - sai) }}>
      <Camera drift={6} t={t} keys={[{ t: ini, s: 1.0 }, { t: c.a_simulacao, s: 1.03, y: -8, e: ease.out }, { t: c.f_comecou, s: 1.06, y: -14, e: ease.out }]}>
        <Prancha top={TOP} h={900}>
          <Contorno {...TELA} p={prog(t, ini, 0.6, ease.out)} />
          <Rot x={540} y={168} texto="PROJETO: SEU FINANCIAMENTO" p={prog(t, ini + 0.2, 0.5)} />
          <Rota id="fin" d="M275 290 L540 290 L805 290 L805 490 L740 490 M340 490 L540 490" p={prog(t, c.a_documentos, c.a_avaliacao - c.a_documentos + 0.4, ease.linear)} />
          {it.map((q, i) => (
            <Comodo key={i} x={q.x} y={q.y} w={q.w} h={q.h} p={prog(t, ini + 0.2 + i * 0.1, 0.5, ease.out)} titulo={q.titulo} sub={t > q.at - 0.15 ? q.sub : ""} titleSize={28}
              tone={q.feito ? "linha" : i === 2 ? "linha" : "muted"} acende={q.feito ? Math.max(prog(t, q.at - 0.15, 0.35) * 0.6, fim * 0.7) : 0} />
          ))}
          <Cota x1={150} x2={930} y={650} texto="2 ETAPAS FEITAS · FALTA A AVALIAÇÃO" p={prog(t, c.a_avaliacao - 0.2, 0.4)} cor={C.text} />
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, ini, 0.35) * (1 - prog(t, c.f_ninguem - 0.4, 0.2))} size={56}>MOSTRE O QUE <G>JÁ FOI FEITO</G></TituloFolha>
      <TituloFolha p={prog(t, c.f_ninguem - 0.3, 0.35)} size={56}>NINGUÉM LARGA UM CAMINHO <G>COMEÇADO</G></TituloFolha>
    </div>
  );
};
