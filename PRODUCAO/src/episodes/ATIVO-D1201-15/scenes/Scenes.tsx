import React from "react";
import { prog } from "../../../lib/anim";
import type { Timeline } from "../../types";
import { aa } from "../../NOV26/kit";
import {
  Balao, CamCartoon, Carimbo, Check, Checklist, type Clima, Confete, Etiqueta, Flash, Holofote,
  Personagem, Pop, Raios, Selo, VIS, acentosDe, gesto, pop,
} from "../../../estilos/cartoon";

/**
 * ATIVO-D1201-15 — "O dono na visita" (grade 01/12/2026 · 15h · CORRETOR NA VIDA REAL · PRIMEIRO MODELO, Cartoon explicativo).
 * O dono acompanha a visita e conta do vizinho, quanto pagou, por que vende, que aceita negociar → é a casa dele (memória)
 * → cada frase vira ARGUMENTO na mão do comprador → o papel do dono (recebe · mostra o que só ele sabe · dá espaço) →
 * preço, motivo e prazo com o corretor → PAPEL COMBINADO → fecho SISTEMA. Observação de prática; personagens ilustrativos.
 */
const FLOOR = 1540;
export type Shot = {
  id: string; a: number; b: number; clima: Clima; vin?: number; push?: number;
  punch?: { at: number; s: number; x?: number; y?: number }[]; hits?: number[];
  svg?: (t: number) => React.ReactNode; html?: (t: number) => React.ReactNode; selo?: (t: number) => React.ReactNode; flash?: number;
};
const DONO = { ...VIS.lider, terno: "#7A4E3A", sombraTerno: "#5F3C2D", camisa: "#7A4E3A", gravata: undefined, calca: "#2A2D33" };

/** Quadro na parede (foto de família em linha) — a "lembrança". */
const Quadro: React.FC = () => (
  <g>
    <rect x={-110} y={-80} width={220} height={160} rx={6} fill="#5A3A2A" />
    <rect x={-92} y={-62} width={184} height={124} fill="#E9E2D6" />
    <circle cx={-30} cy={-10} r={18} fill="#9A6444" /><rect x={-48} y={10} width={36} height={40} rx={10} fill="#4C7FB8" />
    <circle cx={30} cy={-4} r={14} fill="#E8B48C" /><rect x={16} y={12} width={28} height={34} rx={9} fill="#B5483A" />
  </g>
);
/** Azulejo novo (a reforma do banheiro). */
const Azulejo: React.FC = () => (
  <g>
    <rect x={-120} y={-120} width={240} height={240} rx={10} fill="#F4F5F7" stroke="#0A0A0C" strokeWidth={6} />
    {[1, 2].map((k) => <g key={k}><line x1={-120 + k * 80} y1={-120} x2={-120 + k * 80} y2={120} stroke="#B8BDC6" strokeWidth={4} /><line x1={-120} y1={-120 + k * 80} x2={120} y2={-120 + k * 80} stroke="#B8BDC6" strokeWidth={4} /></g>)}
    <circle cx={0} cy={0} r={22} fill="#4C7FB8" />
  </g>
);
/** Fichas (as frases do dono) que voam até a mão do comprador. */
const Ficha: React.FC<{ texto: string }> = ({ texto }) => (
  <g>
    <rect x={-120} y={-34} width={240} height={68} rx={12} fill="#F4F5F7" stroke="#0A0A0C" strokeWidth={5} />
    <text x={0} y={12} textAnchor="middle" fontFamily="Manrope" fontWeight={800} fontSize={28} fill="#111">{texto}</text>
  </g>
);

export const makeShots = (tl: Timeline): Shot[] => {
  const c = tl.cues;
  const ac = acentosDe(tl.captions);
  const t1 = c.h_cinco - 0.3;
  const t2 = c.c_pagou - 0.3;
  const t3 = c.m_mal - 0.3;
  const t4 = c.v_problema - 0.15;
  const t5 = c.p_combine - 0.15;
  const t6 = c.p_mostra + 0.6;
  const t7 = c.p_preco - 0.15;
  const t8 = c.f_presente - 0.15;
  const tFim = c.cta_quer - 0.05;
  const mix = (a: number, b: number, k: number) => a + (b - a) * Math.max(0, Math.min(1, k));
  return [
    {
      id: "1 o dono quis ir junto", a: 0, b: t1, clima: "evento", vin: 0.78, push: 0.012,
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={640} p={prog(t, 0, 0.3)} />
          <Personagem t={t} x={250} y={FLOOR} s={0.82} v={VIS.A} acentos={ac} humor="neutro" braco={gesto(t, c.h_proprietario, 10, 60)} />
          <Pop t={t} at={c.h_proprietario - 0.2} x={540} y={FLOOR}><Personagem t={t} x={0} y={0} s={0.86} v={DONO} seed={4} acentos={ac} humor="feliz" /></Pop>
          <Pop t={t} at={c.h_visita - 0.3} x={830} y={FLOOR}><Personagem t={t} x={0} y={0} s={0.8} v={VIS.comprador} seed={1} humor="neutro" flip /></Pop>
        </>
      ),
      html: (t) => <Etiqueta t={t} at={c.h_proprietario} x={540} y={560} texto="O PROPRIETÁRIO VEIO JUNTO" cor="white" size={38} />,
      selo: (t) => <Selo t={t} at={0.1} texto="VISITA" />,
    },
    {
      id: "2 o vizinho barulhento", a: t1, b: t2, clima: "pergunta", vin: 0.85, hits: [c.h_barulhento], punch: [{ at: c.h_barulhento, s: 1.05, y: 10 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={600} />
          <Personagem t={t} x={240} y={FLOOR} s={0.82} v={VIS.A} acentos={ac} humor="espanto" braco={gesto(t, c.h_barulhento, 20, 165)} />
          <Personagem t={t} x={540} y={FLOOR} s={0.86} v={DONO} seed={4} acentos={ac} humor="feliz" fala braco={gesto(t, c.h_vizinho - 0.1, 10, 150)} />
          <Personagem t={t} x={840} y={FLOOR} s={0.8} v={VIS.comprador} seed={1} humor="neutro" flip />
          <Pop t={t} at={c.h_vizinho - 0.15} x={560} y={700}><Balao texto="O DE CIMA É BARULHENTO…" w={560} size={40} /></Pop>
        </>
      ),
      html: (t) => <Carimbo t={t} at={c.h_cinco - 0.05} x={540} y={470} texto="5 MINUTOS" cor="white" size={60} rot={-5} />,
    },
    {
      id: "3 conta tudo", a: t2, b: t3, clima: "pergunta", vin: 0.85, push: 0.014, hits: [c.c_pagou, c.c_vendendo, c.c_negociar],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={600} />
          <Personagem t={t} x={330} y={FLOOR} s={0.88} v={DONO} seed={4} acentos={ac} humor="feliz" fala braco={gesto(t, c.c_pagou - 0.1, 20, 120)} />
          <Personagem t={t} x={790} y={FLOOR} s={0.84} v={VIS.comprador} seed={1} acentos={ac} humor="feliz" flip braco={gesto(t, c.c_pagou, 10, 70)} />
          <Pop t={t} at={c.c_pagou - 0.15} x={330} y={480}><Balao texto="PAGUEI POUCO…" w={360} size={40} /></Pop>
          <Pop t={t} at={c.c_vendendo - 0.15} x={480} y={640}><Balao texto="VOU MUDAR DE CIDADE" w={480} size={38} /></Pop>
          <Pop t={t} at={c.c_negociar - 0.15} x={360} y={800}><Balao texto="ACEITO NEGOCIAR!" w={420} size={40} /></Pop>
        </>
      ),
    },
    {
      id: "4 é a casa dele", a: t3, b: t4, clima: "sepia", vin: 0.78, push: 0.01,
      svg: (t) => (
        <>
          <Pop t={t} at={t3 + 0.1} x={540} y={640}><g transform="scale(1.3)"><Quadro /></g></Pop>
          <Holofote x={540} chao={FLOOR} w={520} cor="#FFE9D6" />
          <Personagem t={t} x={540} y={FLOOR} s={0.92} v={DONO} seed={4} acentos={ac} humor="feliz" olhar={-1} braco={gesto(t, c.m_casa - 0.1, 10, 130)} />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.m_casa - 0.05} x={540} y={440} texto="É A CASA DELE" cor="white" size={44} />
          <Etiqueta t={t} at={c.m_defeito} x={300} y={860} texto="CADA DEFEITO" cor="dark" size={32} />
          <Etiqueta t={t} at={c.m_lembranca} x={780} y={860} texto="CADA LEMBRANÇA" cor="dark" size={32} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t3 + 0.05} texto="NÃO POR MAL" />,
    },
    {
      id: "5 vira argumento", a: t4, b: t5, clima: "conflito", vin: 0.9, hits: [c.v_argumento + 0.03], punch: [{ at: c.v_argumento, s: 1.06 }],
      svg: (t) => {
        const voa = (at: number) => prog(t, at, 0.7);
        const fichas = [{ txt: "VIZINHO", at: c.v_frase - 0.4 }, { txt: "PAGOU POUCO", at: c.v_frase }, { txt: "TEM PRESSA", at: c.v_frase + 0.4 }, { txt: "ACEITA MENOS", at: c.v_argumento - 0.4 }];
        return (
          <>
            <Holofote x={760} chao={FLOOR} w={520} cor="#FFD9D4" />
            <Personagem t={t} x={280} y={FLOOR} s={0.84} v={DONO} seed={4} acentos={ac} humor="feliz" fala />
            <Personagem t={t} x={780} y={FLOOR} s={0.9} v={VIS.comprador} seed={1} acentos={ac} humor="feliz" flip braco={gesto(t, c.v_argumento - 0.2, 10, 110)} />
            {fichas.map((f, i) => {
              const k = voa(f.at);
              return k <= 0 ? null : <g key={f.txt} transform={`translate(${mix(330, 760, k)} ${mix(720, 640 + i * 70, k)}) rotate(${(1 - k) * -20 + (i % 2 ? 4 : -4)})`}><Ficha texto={f.txt} /></g>;
            })}
          </>
        );
      },
      html: (t) => <Carimbo t={t} at={c.v_argumento - 0.03} x={540} y={540} texto="ARGUMENTO" cor="red" size={78} rot={-6} />,
      selo: (t) => <Selo t={t} at={t4 + 0.05} texto="NA NEGOCIAÇÃO" />,
    },
    {
      id: "6 combine antes", a: t5, b: t6, clima: "explica", vin: 0.72, push: 0.012,
      svg: (t) => (
        <>
          <g transform="translate(540 690)"><Checklist t={t} titulo="PAPEL DO DONO" w={760} itens={[{ k: "RECEBE E SE APRESENTA", at: c.p_recebe }, { k: "MOSTRA O QUE SÓ ELE SABE", at: c.p_mostra }, { k: "DEPOIS, DÁ ESPAÇO", at: c.p_espaco }]} /></g>
          <Holofote x={540} chao={FLOOR} w={520} />
          <Personagem t={t} x={360} y={FLOOR} s={0.8} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.p_combine - 0.1, 10, 100)} />
          <Personagem t={t} x={720} y={FLOOR} s={0.8} v={DONO} seed={4} humor="feliz" flip />
        </>
      ),
      selo: (t) => <Selo t={t} at={t5 + 0.05} texto="COMBINE ANTES" cor="green" />,
    },
    {
      id: "7 a reforma do banheiro", a: t6, b: t7, clima: "explica", vin: 0.72, hits: [c.p_banheiro],
      svg: (t) => {
        const recua = prog(t, c.p_espaco - 0.2, 0.7);
        return (
          <>
            <Pop t={t} at={c.p_banheiro - 0.3} x={760} y={760}><Azulejo /></Pop>
            <Holofote x={mix(560, 300, recua)} chao={FLOOR} w={480} />
            <Personagem t={t} x={mix(560, 230, recua)} y={FLOOR} s={0.86} v={DONO} seed={4} acentos={ac} humor="feliz" braco={gesto(t, c.p_banheiro - 0.1, 10, 95)} />
            <Personagem t={t} x={860} y={FLOOR} s={0.82} v={VIS.comprador} seed={1} humor="feliz" flip />
          </>
        );
      },
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.p_banheiro} x={760} y={560} texto="REFORMA DO BANHEIRO" cor="white" size={34} />
          <Etiqueta t={t} at={c.p_espaco - 0.05} x={300} y={860} texto="DÁ ESPAÇO" cor="green" size={36} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t6 + 0.05} texto="O QUE SÓ ELE SABE" />,
    },
    {
      id: "8 quem responde é você", a: t7, b: t8, clima: "explica", vin: 0.72, hits: [c.p_preco, c.p_motivo, c.p_prazo],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={520} cor={t > c.p_voce ? aa(1) : "#FFFFFF"} />
          <Personagem t={t} x={540} y={FLOOR} s={0.92} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.p_voce - 0.15, 10, 150)} />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.p_preco - 0.05} x={260} y={620} texto="PREÇO" cor="white" size={40} />
          <Etiqueta t={t} at={c.p_motivo - 0.05} x={540} y={540} texto="MOTIVO" cor="white" size={40} />
          <Etiqueta t={t} at={c.p_prazo - 0.05} x={820} y={620} texto="PRAZO" cor="white" size={40} />
          <Carimbo t={t} at={c.p_voce - 0.05} x={540} y={780} texto="COM O CORRETOR" cor="green" size={58} rot={-5} />
        </>
      ),
    },
    {
      id: "9 papel combinado", a: t8, b: tFim, clima: "ganho", vin: 0.6, hits: [c.f_papel + 0.03], punch: [{ at: c.f_papel, s: 1.05 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR + 40} w={660} cor={aa(1)} />
          <Personagem t={t} x={300} y={FLOOR + 40} s={0.86} v={DONO} seed={4} acentos={ac} humor="feliz" />
          <Personagem t={t} x={560} y={FLOOR + 40} s={0.9} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.f_papel - 0.1, 12, 140)} />
          <Personagem t={t} x={830} y={FLOOR + 40} s={0.82} v={VIS.comprador} seed={1} humor="feliz" flip />
          <Pop t={t} at={c.f_papel + 0.1} x={560} y={1060}><Check r={44} /></Pop>
          <Confete t={t} at={c.f_papel} />
        </>
      ),
      html: (t) => (
        <>
          <Carimbo t={t} at={c.f_presente - 0.05} x={540} y={440} texto="DONO PRESENTE: OK" cor="white" size={56} rot={-5} />
          <Carimbo t={t} at={c.f_papel - 0.05} x={540} y={620} texto="PAPEL COMBINADO" cor="green" size={68} rot={4} />
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
