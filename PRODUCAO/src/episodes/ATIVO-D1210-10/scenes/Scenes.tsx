import React from "react";
import { prog } from "../../../lib/anim";
import type { Timeline } from "../../types";
import { aa } from "../../NOV26/kit";
import {
  Balao, CamCartoon, Carimbo, Checklist, type Clima, Confete, Etiqueta, Flash, Holofote,
  Personagem, Pop, Raios, Selo, VIS, acentosDe, gesto, pop,
} from "../../../estilos/cartoon";

/**
 * ATIVO-D1210-10 — "Os quinze imóveis" (grade 10/12/2026 · 10h · CORRETOR NA VIDA REAL · Cartoon explicativo).
 * A lista de 15 imóveis no sábado → no décimo, o cliente mistura a cozinha de um com a varanda do outro → mais visita, mais
 * confusão → antes, as três coisas de que ele não abre mão; corte o que não passa → leve 3, 4 no máximo, anote na saída →
 * menos portas abertas, mais decisão. Rotina; sem estatística.
 */
const FLOOR = 1540;
export type Shot = {
  id: string; a: number; b: number; clima: Clima; vin?: number; push?: number;
  punch?: { at: number; s: number; x?: number; y?: number }[]; hits?: number[];
  svg?: (t: number) => React.ReactNode; html?: (t: number) => React.ReactNode; selo?: (t: number) => React.ReactNode; flash?: number;
};
/** Casinha chapada do cartoon. */
const Casinha: React.FC<{ x: number; y: number; s?: number; cor?: string; n?: string }> = ({ x, y, s = 1, cor = "#F4F5F7", n }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-70 0 L0 -60 L70 0 Z" fill="#2C3E66" stroke="#0A0A0C" strokeWidth={6} strokeLinejoin="round" />
    <rect x={-56} y={0} width={112} height={84} fill={cor} stroke="#0A0A0C" strokeWidth={6} />
    <rect x={-14} y={36} width={28} height={48} fill="#2C3E66" stroke="#0A0A0C" strokeWidth={4} />
    {n ? <text x={0} y={-12} textAnchor="middle" fontFamily="Manrope" fontWeight={800} fontSize={28} fill="#fff">{n}</text> : null}
  </g>
);
/** A lista que desenrola. */
const Lista: React.FC<{ p: number }> = ({ p }) => {
  const n = Math.round(15 * p);
  return (
    <g>
      <rect x={240} y={420} width={400} height={40 + n * 28} rx={14} fill="#F4F5F7" stroke="#0A0A0C" strokeWidth={6} />
      {Array.from({ length: n }, (_, i) => <rect key={i} x={270} y={440 + i * 28} width={i % 3 === 0 ? 300 : 340} height={12} rx={6} fill="#9AA3B5" />)}
    </g>
  );
};

export const makeShots = (tl: Timeline): Shot[] => {
  const c = tl.cues;
  const ac = acentosDe(tl.captions);
  const t1 = c.m_decimo - 0.4;
  const t2 = c.e_escolha - 0.8;
  const t3 = c.v_antes - 0.5;
  const t4 = c.a_leve - 0.5;
  const t5 = c.f_portas - 0.6;
  const tFim = c.cta_quer - 0.05;
  const CASAS: [number, number, number, string][] = [[220, 520, 0, "3"], [540, 460, 0.3, "7"], [860, 520, 0.6, "10"], [380, 700, 0.9, "12"], [700, 700, 1.2, "4"]];
  return [
    {
      id: "1 a lista", a: 0, b: t1, clima: "pergunta", vin: 0.8, push: 0.012, hits: [c.h_quinze, c.h_sabado], punch: [{ at: c.h_quinze, s: 1.06 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} p={prog(t, 0, 0.3)} />
          <Lista p={prog(t, c.h_quinze - 0.4, 1.2)} />
          <Personagem t={t} x={300} y={FLOOR} s={0.72} v={VIS.A} acentos={ac} humor={t > c.h_quinze ? "espanto" : "neutro"} />
          <Personagem t={t} x={780} y={FLOOR} s={0.72} v={VIS.comprador} seed={1} flip humor="feliz" fala />
        </>
      ),
      html: (t) => (
        <>
          <Carimbo t={t} at={c.h_quinze - 0.05} x={800} y={560} texto="15 IMÓVEIS" cor="red" size={48} rot={-8} />
          <Etiqueta t={t} at={c.h_sabado - 0.1} x={820} y={860} texto="NO SÁBADO" cor="white" size={34} />
        </>
      ),
      selo: (t) => <Selo t={t} at={0.1} texto="O PEDIDO" />,
    },
    {
      id: "2 a mistura", a: t1, b: t2, clima: "conflito", vin: 0.84, hits: [c.m_decimo, c.m_terceiro, c.m_misturar, c.m_cozinha, c.m_varanda], punch: [{ at: c.m_misturar, s: 1.06 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={720} cor="#FFD9D4" />
          {CASAS.map(([x, y, d, n], i) => {
            const k = prog(t, t1 + d * 0.4, 0.4);
            const gira = prog(t, c.m_misturar - 0.1, 1.2);
            const dx = Math.sin(gira * 6 + i) * 60 * gira; const dy = Math.cos(gira * 5 + i * 2) * 40 * gira;
            return <g key={i} opacity={k}><Casinha x={x + dx} y={y + dy} s={0.8} n={n} cor={n === "3" && t > c.m_terceiro - 0.1 ? "#FFD9D4" : "#F4F5F7"} /></g>;
          })}
          <Personagem t={t} x={300} y={FLOOR} s={0.72} v={VIS.A} acentos={ac} humor="triste" />
          <Personagem t={t} x={780} y={FLOOR} s={0.72} v={VIS.comprador} seed={1} flip humor={t > c.m_misturar ? "espanto" : "neutro"} />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.m_terceiro - 0.1} x={220} y={420} texto="E O TERCEIRO?" cor="red" size={30} />
          <Etiqueta t={t} at={c.m_cozinha - 0.1} x={300} y={870} texto="A COZINHA DO 4" cor="white" size={30} />
          <Etiqueta t={t} at={c.m_varanda - 0.1} x={780} y={870} texto="A VARANDA DO 10" cor="white" size={30} />
          <Carimbo t={t} at={c.m_misturar - 0.05} x={540} y={640} texto="MISTUROU" cor="red" size={56} rot={-6} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t1 + 0.05} texto="NO DÉCIMO…" cor="red" />,
    },
    {
      id: "3 confusão", a: t2, b: t3, clima: "conflito", vin: 0.88, hits: [c.e_escolha, c.e_confusao], punch: [{ at: c.e_confusao, s: 1.07 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={720} cor="#FFD9D4" />
          <Personagem t={t} x={540} y={FLOOR} s={0.78} v={VIS.comprador} seed={1} humor="espanto" />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={t2 + 0.1} x={540} y={480} texto="MAIS VISITA ≠ MAIS ESCOLHA" cor="white" size={38} />
          <Carimbo t={t} at={c.e_confusao - 0.05} x={540} y={680} texto="MAIS CONFUSÃO" cor="red" size={58} rot={-5} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t2 + 0.05} texto="O ERRO" cor="red" />,
    },
    {
      id: "4 os critérios", a: t3, b: t4, clima: "explica", vin: 0.72, push: 0.01, hits: [c.v_antes, c.v_tres, c.v_corte], punch: [{ at: c.v_corte, s: 1.05 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} cor={aa(1)} p={0.6} />
          <Pop t={t} at={c.v_tres - 0.3} x={540} y={600}><g transform="scale(0.78)">
            <Checklist t={t} titulo="NÃO ABRE MÃO DE:" itens={[{ k: "3 QUARTOS", at: c.v_tres + 0.4 }, { k: "PERTO DO TRABALHO", at: c.v_tres + 1.0 }, { k: "ATÉ O TETO DE PREÇO", at: c.v_tres + 1.6 }]} />
          </g></Pop>
          <Personagem t={t} x={300} y={FLOOR} s={0.72} v={VIS.A} acentos={ac} humor="feliz" fala={t < c.v_corte} braco={gesto(t, c.v_antes - 0.1, 10, 120)} />
          <Personagem t={t} x={790} y={FLOOR} s={0.72} v={VIS.comprador} seed={1} flip humor="neutro" />
        </>
      ),
      html: (t) => (
        <>
          {t < c.v_tres - 0.3 ? <Etiqueta t={t} at={c.v_antes - 0.1} x={540} y={480} texto="ANTES DE SAIR" cor="green" size={38} /> : null}
          <Carimbo t={t} at={c.v_corte - 0.05} x={540} y={870} texto="CORTE O QUE NÃO PASSA" cor="green" size={46} rot={-4} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t3 + 0.05} texto="A VIRADA" cor="green" />,
    },
    {
      id: "5 três ou quatro", a: t4, b: t5, clima: "ganho", vin: 0.68, push: 0.01, hits: [c.a_leve, c.a_quatro, c.a_anote], punch: [{ at: c.a_anote, s: 1.05 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} cor={aa(1)} />
          {[[260, 0], [540, 0.25], [820, 0.5]].map(([x, d]) => <g key={x} opacity={prog(t, c.a_leve - 0.2 + d, 0.3)}><Casinha x={x} y={560} s={0.9} cor="#F4F5F7" /></g>)}
          <Personagem t={t} x={300} y={FLOOR} s={0.72} v={VIS.A} acentos={ac} humor="feliz" />
          <Personagem t={t} x={790} y={FLOOR} s={0.72} v={VIS.comprador} seed={1} flip humor="feliz" fala={t > c.a_anote} />
          <Pop t={t} at={c.a_anote - 0.1} x={760} y={790}><Balao texto="GOSTEI DA LUZ DO 2!" w={420} size={30} cauda={-1} /></Pop>
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.a_quatro - 0.1} x={540} y={440} texto="4 NO MÁXIMO" cor="green" size={36} />
          <Etiqueta t={t} at={c.a_anote - 0.1} x={300} y={870} texto="ANOTE NA SAÍDA" cor="white" size={32} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t4 + 0.05} texto="NO SÁBADO, 3 OU 4" cor="green" />,
    },
    {
      id: "6 decisão", a: t5, b: tFim, clima: "ganho", vin: 0.64, hits: [c.f_portas, c.f_decisao], punch: [{ at: c.f_decisao, s: 1.05 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} cor={aa(1)} />
          <Personagem t={t} x={330} y={FLOOR} s={0.72} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.f_decisao - 0.1, 10, 150)} />
          <Personagem t={t} x={760} y={FLOOR} s={0.72} v={VIS.comprador} seed={1} flip humor="feliz" />
          <Confete t={t} at={c.f_decisao + 0.1} />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.f_portas - 0.1} x={540} y={480} texto="MENOS PORTAS ABERTAS" cor="white" size={38} />
          <Carimbo t={t} at={c.f_decisao - 0.05} x={540} y={660} texto="MAIS DECISÃO" cor="green" size={58} rot={-4} />
        </>
      ),
    },
  ];
};

export const Planos: React.FC<{ t: number; shots: Shot[] }> = ({ t, shots }) => {
  const s = shots.find((q) => t >= q.a && t < q.b);
  if (!s) return null;
  return (
    <>
      <Raios t={t} clima={s.clima} vin={s.vin} />
      <CamCartoon t={t} t0={s.a} push={s.push} punch={s.punch} hits={s.hits}>
        <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, overflow: "visible" }}>{s.svg?.(t)}</svg>
        {s.html?.(t)}
      </CamCartoon>
      {s.selo?.(t)}
      {s.flash !== undefined ? <Flash t={t} at={s.flash} /> : null}
    </>
  );
};

export { pop };
