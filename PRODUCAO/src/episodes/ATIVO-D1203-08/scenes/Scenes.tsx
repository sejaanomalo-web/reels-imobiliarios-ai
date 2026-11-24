import React from "react";
import { prog } from "../../../lib/anim";
import type { Timeline } from "../../types";
import { aa } from "../../NOV26/kit";
import {
  Balao, CamCartoon, Carimbo, Casa, Checklist, type Clima, Confete, Etiqueta, Flash, Holofote,
  Personagem, Pop, Raios, Selo, VIS, acentosDe, gesto, pop,
} from "../../../estilos/cartoon";

/**
 * ATIVO-D1203-08 — "E se você mostrasse só 3 imóveis?" (grade 03/12/2026 · 08h · E SE…? · PRIMEIRO MODELO, Cartoon explicativo).
 * Três casinhas na mão do corretor → o estudo das geleias: mesa de 24 × mesa de 6 (3% × 30%) → SÓ QUE: revisão de 50
 * experimentos, efeito médio ≈ zero; atrapalha quando o cliente não sabe o que quer → primeiro os critérios (checklist) →
 * com critério o cliente compara; sem critério, se perde. Apuração: Iyengar & Lepper (2000); Scheibehenne et al. (2010).
 */
const FLOOR = 1540;
export type Shot = {
  id: string; a: number; b: number; clima: Clima; vin?: number; push?: number;
  punch?: { at: number; s: number; x?: number; y?: number }[]; hits?: number[];
  svg?: (t: number) => React.ReactNode; html?: (t: number) => React.ReactNode; selo?: (t: number) => React.ReactNode; flash?: number;
};
const CORES = ["#B5483A", "#E0A43A", "#7A4E8A", "#4C7FB8", "#8A6A4A", "#C9CED6"];
/** Pote de geleia. */
const Pote: React.FC<{ x: number; y: number; cor: string; s?: number }> = ({ x, y, cor, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-22} y={-50} width={44} height={50} rx={8} fill={cor} />
    <rect x={-25} y={-62} width={50} height={14} rx={4} fill="#F4F5F7" />
    <rect x={-14} y={-36} width={28} height={16} rx={3} fill="#F4F5F7" opacity={0.85} />
  </g>
);
/** Mesa com N potes (grade). */
const Mesa: React.FC<{ x: number; y: number; n: number; w?: number }> = ({ x, y, n, w = 400 }) => {
  const cols = n > 6 ? 8 : 3;
  const rows = Math.ceil(n / cols);
  return (
    <g>
      {Array.from({ length: n }, (_, i) => <Pote key={i} x={x - w / 2 + 30 + (i % cols) * ((w - 60) / (cols - 1))} y={y - 8 - Math.floor(i / cols) * 0} cor={CORES[i % 6]} s={n > 6 ? 0.62 : 1} />).map((p, i) => <g key={i} transform={`translate(0 ${-Math.floor(i / cols) * (n > 6 ? 44 : 70)})`}>{p}</g>)}
      <rect x={x - w / 2 - 20} y={y} width={w + 40} height={26} rx={8} fill="#8A6A4A" />
      <rect x={x - w / 2} y={y + 26} width={22} height={150} fill="#6E5236" /><rect x={x + w / 2 - 22} y={y + 26} width={22} height={150} fill="#6E5236" />
      {rows > 0 ? null : null}
    </g>
  );
};
/** Cartão de imóvel (casinha). */
const Cartao: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <g transform={`scale(${s})`}>
    <rect x={-80} y={-110} width={160} height={150} rx={14} fill="#F4F5F7" stroke="#0A0A0C" strokeWidth={5} />
    <g transform="translate(0 10) scale(0.38)"><Casa w={260} /></g>
  </g>
);

export const makeShots = (tl: Timeline): Shot[] => {
  const c = tl.cues;
  const ac = acentosDe(tl.captions);
  const t1 = c.e_estudo - 0.3;
  const t2 = c.v_soque - 0.25;
  const t3 = c.c_ordem - 0.3;
  const t4 = c.f_compara - 0.3;
  const tFim = c.cta_quer - 0.05;
  return [
    {
      id: "1 só três", a: 0, b: t1, clima: "pergunta", vin: 0.82, push: 0.014, hits: [c.h_tres], punch: [{ at: c.h_tres, s: 1.05, y: 8 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={620} p={prog(t, 0, 0.3)} />
          {[-1, 0, 1].map((k) => <Pop key={k} t={t} at={c.h_tres - 0.1 + (k + 1) * 0.15} x={540 + k * 200} y={720 + Math.abs(k) * 30}><g transform={`rotate(${k * 8})`}><Cartao /></g></Pop>)}
          <Personagem t={t} x={540} y={FLOOR} s={0.9} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.h_tres - 0.2, 10, 150)} />
        </>
      ),
      html: (t) => <Etiqueta t={t} at={c.h_tres + 0.4} x={540} y={500} texto="SÓ 3 IMÓVEIS?" cor="white" size={42} />,
      selo: (t) => <Selo t={t} at={0.1} texto="E SE…?" />,
    },
    {
      id: "2 o estudo das geleias", a: t1, b: t2, clima: "explica", vin: 0.74, push: 0.01, hits: [c.e_24, c.e_6, c.e_30, c.e_3],
      svg: (t) => (
        <>
          <Holofote x={280} chao={FLOOR} w={460} p={prog(t, c.e_24 - 0.3, 0.4)} cor={t > c.e_3 - 0.1 ? "#FFD9D4" : "#FFFFFF"} />
          <Holofote x={800} chao={FLOOR} w={420} p={prog(t, c.e_6 - 0.3, 0.4)} cor={t > c.e_30 - 0.1 ? aa(1) : "#FFFFFF"} />
          <Pop t={t} at={c.e_24 - 0.2} x={0} y={0}><Mesa x={280} y={1180} n={24} w={400} /></Pop>
          <Pop t={t} at={c.e_6 - 0.2} x={0} y={0}><Mesa x={800} y={1180} n={6} w={300} /></Pop>
          <Personagem t={t} x={280} y={FLOOR} s={0.6} v={VIS.comprador} seed={1} acentos={ac} humor={t > c.e_3 - 0.1 ? "triste" : "espanto"} />
          <Personagem t={t} x={800} y={FLOOR} s={0.6} v={VIS.B} seed={3} acentos={ac} humor={t > c.e_30 - 0.1 ? "feliz" : "neutro"} flip braco={gesto(t, c.e_30, 10, 120)} />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.e_24} x={280} y={760} texto="24 SABORES" cor="dark" size={34} />
          <Etiqueta t={t} at={c.e_6} x={800} y={760} texto="6 SABORES" cor="dark" size={34} />
          <Carimbo t={t} at={c.e_30 - 0.03} x={800} y={600} texto="30% COMPRARAM" cor="green" size={46} rot={5} />
          <Carimbo t={t} at={c.e_3 - 0.03} x={280} y={600} texto="SÓ 3%" cor="red" size={56} rot={-6} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t1 + 0.05} texto="O ESTUDO DAS GELEIAS" />,
    },
    {
      id: "3 só que: quase zero", a: t2, b: t3, clima: "conflito", vin: 0.86, hits: [c.v_50, c.v_zero], punch: [{ at: c.v_zero, s: 1.06 }],
      svg: (t) => {
        const perdido = prog(t, c.v_sabe - 0.2, 0.4);
        return (
          <>
            <Holofote x={540} chao={FLOOR} w={640} cor="#FFD9D4" />
            <g opacity={perdido}>
              {Array.from({ length: 14 }, (_, i) => <Pote key={i} x={180 + (i % 7) * 120} y={i < 7 ? 900 : 1300} cor={CORES[i % 6]} s={0.8} />)}
            </g>
            <Personagem t={t} x={540} y={FLOOR} s={0.88} v={VIS.comprador} seed={1} acentos={ac} humor={perdido > 0.5 ? "triste" : "neutro"} olhar={Math.sin(t * 3)} />
            <Pop t={t} at={c.v_sabe - 0.1} x={540} y={790}><Balao texto="QUAL EU QUERO?" w={460} size={46} /></Pop>
          </>
        );
      },
      html: (t) => (
        <>
          <Carimbo t={t} at={c.v_50 - 0.03} x={540} y={540} texto="50 EXPERIMENTOS" cor="white" size={48} rot={-4} />
          <Etiqueta t={t} at={c.v_zero - 0.05} x={540} y={660} texto="EFEITO MÉDIO ≈ ZERO" cor="red" size={38} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t2 + 0.05} texto="SÓ QUE…" cor="red" />,
    },
    {
      id: "4 primeiro os critérios", a: t3, b: t4, clima: "explica", vin: 0.72, push: 0.012, hits: [c.c_bairro, c.c_quartos, c.c_faltar],
      svg: (t) => (
        <>
          <g transform="translate(540 700)"><Checklist t={t} titulo="PRIMEIRO, OS CRITÉRIOS" w={760} itens={[{ k: "BAIRRO", at: c.c_bairro }, { k: "QUARTOS", at: c.c_quartos }, { k: "O QUE NÃO PODE FALTAR", at: c.c_faltar }]} /></g>
          <Holofote x={540} chao={FLOOR} w={600} />
          <Personagem t={t} x={380} y={FLOOR} s={0.84} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.c_criterios - 0.1, 10, 110)} />
          <Personagem t={t} x={720} y={FLOOR} s={0.82} v={VIS.comprador} seed={1} humor="feliz" flip />
        </>
      ),
      selo: (t) => <Selo t={t} at={t3 + 0.05} texto="A ORDEM IMPORTA" cor="green" />,
    },
    {
      id: "5 compara × se perde", a: t4, b: tFim, clima: "ganho", vin: 0.62, hits: [c.f_compara, c.f_perde], punch: [{ at: c.f_compara, s: 1.04 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR + 40} w={640} cor={aa(1)} />
          {[-1, 0, 1].map((k) => <g key={k} transform={`translate(${540 + k * 210} ${760}) rotate(${k * 6})`}><Cartao s={0.95} /></g>)}
          <Personagem t={t} x={540} y={FLOOR + 40} s={0.9} v={VIS.comprador} seed={1} acentos={ac} humor="feliz" braco={gesto(t, c.f_compara - 0.1, 10, 120)} />
          <Confete t={t} at={c.f_compara + 0.1} />
        </>
      ),
      html: (t) => (
        <>
          <Carimbo t={t} at={c.f_compara - 0.03} x={540} y={540} texto="COMPARA" cor="green" size={66} rot={-5} />
          <Etiqueta t={t} at={c.f_perde - 0.05} x={540} y={900} texto="SEM CRITÉRIO: SE PERDE" cor="red" size={34} />
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
