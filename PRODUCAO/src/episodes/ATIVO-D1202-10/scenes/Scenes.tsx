import React from "react";
import { prog } from "../../../lib/anim";
import type { Timeline } from "../../types";
import { aa } from "../../NOV26/kit";
import {
  Balao, CamCartoon, Carimbo, Checklist, type Clima, Confete, Etiqueta, Flash, Holofote,
  Personagem, Pop, Raios, Selo, VIS, acentosDe, gesto, pop,
} from "../../../estilos/cartoon";

/**
 * ATIVO-D1202-10 — "E se o comprador pagasse metade?" (grade 02/12/2026 · 10h · E SE…? · PRIMEIRO MODELO, Cartoon explicativo).
 * A moeda da comissão se parte ao meio → Alemanha, lei de 23/12/2020 (apartamento/casa para morar, corretor dos dois lados:
 * meio a meio) → antes, em Berlim e Hamburgo, o comprador carregava a moeda inteira → um estudo: somando as metades, a moeda
 * ficou MAIOR → no Brasil, quase sempre paga o vendedor, mas quem DECIDE é o comprador → trabalhe como se os dois pagassem.
 * Apuração: Engel & Völkers, iamexpat, Haufe; Hertie School (1 estudo). Personagens ilustrativos.
 */
const FLOOR = 1540;
export type Shot = {
  id: string; a: number; b: number; clima: Clima; vin?: number; push?: number;
  punch?: { at: number; s: number; x?: number; y?: number }[]; hits?: number[];
  svg?: (t: number) => React.ReactNode; html?: (t: number) => React.ReactNode; selo?: (t: number) => React.ReactNode; flash?: number;
};
const OURO = "#E0A43A", OURO_S = "#A8761E", OURO_L = "#F0B94E";
const VEND = VIS.B;

/** Moeda da comissão (ouro do cartoon, "R$" gravado). `metade`: -1 só a esquerda, 1 só a direita, 0 inteira. */
const Moeda: React.FC<{ r?: number; metade?: -1 | 0 | 1; id: string }> = ({ r = 120, metade = 0, id }) => (
  <g>
    <defs>
      <clipPath id={`m-${id}`}>{metade === 0 ? <rect x={-r - 20} y={-r - 20} width={2 * r + 40} height={2 * r + 40} /> : <rect x={metade < 0 ? -r - 20 : 0} y={-r - 20} width={r + 20} height={2 * r + 40} />}</clipPath>
    </defs>
    <g clipPath={`url(#m-${id})`}>
      <circle r={r} cy={10} fill={OURO_S} />
      <circle r={r} fill={OURO} />
      <circle r={r * 0.78} fill="none" stroke={OURO_L} strokeWidth={8} />
      <text x={0} y={r * 0.22} textAnchor="middle" fontFamily="Manrope" fontWeight={800} fontSize={r * 0.62} fill={OURO_S}>R$</text>
    </g>
  </g>
);
/** Moeda partida: as metades se afastam `abre` (0..1) px * 90. */
const MoedaPartida: React.FC<{ r?: number; abre: number; id: string }> = ({ r = 120, abre, id }) => (
  <g>
    <g transform={`translate(${-abre * 90} 0) rotate(${-abre * 12})`}><Moeda r={r} metade={-1} id={`${id}a`} /></g>
    <g transform={`translate(${abre * 90} 0) rotate(${abre * 12})`}><Moeda r={r} metade={1} id={`${id}b`} /></g>
  </g>
);
/** Bandeira simplificada em listras (preto / vermelho / ouro), no mastro. */
const Bandeira: React.FC<{ t: number }> = ({ t }) => {
  const onda = (k: number) => Math.sin(t * 4 + k) * 8;
  return (
    <g>
      <rect x={-8} y={0} width={16} height={420} rx={8} fill="#C9CED6" />
      {["#16181D", "#E5484D", OURO_L].map((cor, i) => (
        <path key={cor} d={`M 8 ${20 + i * 70} Q 120 ${20 + i * 70 + onda(i)} 240 ${20 + i * 70} L 240 ${90 + i * 70} Q 120 ${90 + i * 70 + onda(i + 1)} 8 ${90 + i * 70} Z`} fill={cor} />
      ))}
    </g>
  );
};

export const makeShots = (tl: Timeline): Shot[] => {
  const c = tl.cues;
  const ac = acentosDe(tl.captions);
  const t1 = c.l_alemanha - 0.3;
  const t2 = c.l_venda - 0.3;
  const t3 = c.a_antes - 0.3;
  const t4 = c.v_soque - 0.25;
  const t5 = c.b_mudar - 0.25;
  const t6 = c.f_trabalhe - 0.25;
  const tFim = c.cta_quer - 0.05;
  return [
    {
      id: "1 e se o comprador pagasse metade", a: 0, b: t1, clima: "pergunta", vin: 0.82, push: 0.014, hits: [c.h_metade], punch: [{ at: c.h_metade, s: 1.05, y: 8 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={620} p={prog(t, 0, 0.3)} />
          <Pop t={t} at={c.h_comprador - 0.4} x={540} y={760}><MoedaPartida r={150} abre={prog(t, c.h_metade - 0.05, 0.35)} id="h" /></Pop>
          <Personagem t={t} x={540} y={FLOOR} s={0.9} v={VIS.comprador} seed={1} acentos={ac} humor={t > c.h_metade ? "espanto" : "neutro"} braco={gesto(t, c.h_metade, 10, 120)} bracoE={-gesto(t, c.h_metade, 10, 60)} />
        </>
      ),
      html: (t) => <Etiqueta t={t} at={c.h_comissao - 0.05} x={540} y={520} texto="METADE DA COMISSÃO?" cor="white" size={40} />,
      selo: (t) => <Selo t={t} at={0.1} texto="E SE…?" />,
    },
    {
      id: "2 na Alemanha virou lei", a: t1, b: t2, clima: "explica", vin: 0.74, push: 0.012, hits: [c.l_lei],
      svg: (t) => (
        <>
          <Pop t={t} at={t1 + 0.05} x={300} y={560}><Bandeira t={t} /></Pop>
          <Holofote x={700} chao={FLOOR} w={520} />
          <Personagem t={t} x={720} y={FLOOR} s={0.86} v={VIS.A} acentos={ac} humor="feliz" fala braco={gesto(t, c.l_lei - 0.1, 10, 140)} />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.l_alemanha - 0.05} x={420} y={480} texto="ALEMANHA" cor="dark" size={40} />
          <Carimbo t={t} at={c.l_2020 - 0.05} x={720} y={560} texto="LEI" sub="23/12/2020" cor="white" size={76} rot={-6} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t1 + 0.05} texto="ISSO EXISTE" />,
    },
    {
      id: "3 meio a meio", a: t2, b: t3, clima: "explica", vin: 0.72, push: 0.01, hits: [c.l_dois, c.l_meio],
      svg: (t) => {
        const abre = prog(t, c.l_meio - 0.1, 0.5);
        return (
          <>
            <Holofote x={540} chao={FLOOR} w={760} />
            <Pop t={t} at={c.l_dois - 0.2} x={540} y={640}><g transform={`translate(${-abre * 140} ${abre * 120})`}><Moeda r={110} metade={-1} id="v" /></g><g transform={`translate(${abre * 140} ${abre * 120})`}><Moeda r={110} metade={1} id="c" /></g></Pop>
            <Personagem t={t} x={210} y={FLOOR} s={0.8} v={VEND} seed={3} acentos={ac} humor="neutro" braco={gesto(t, c.l_meio, 10, 70)} />
            <Personagem t={t} x={540} y={FLOOR} s={0.86} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.l_dois - 0.1, 10, 100)} bracoE={-gesto(t, c.l_dois - 0.1, 10, 100)} />
            <Personagem t={t} x={870} y={FLOOR} s={0.8} v={VIS.comprador} seed={1} acentos={ac} humor="neutro" flip braco={gesto(t, c.l_meio, 10, 70)} />
          </>
        );
      },
      html: (t) => (
        <>
          {t < c.l_dois - 0.05 ? <Etiqueta t={t} at={c.l_venda - 0.05} x={540} y={430} texto="APTO OU CASA PARA MORAR" cor="dark" size={34} /> : <Etiqueta t={t} at={c.l_dois - 0.05} x={540} y={430} texto="CORRETOR DOS DOIS LADOS" cor="white" size={34} />}
          <Carimbo t={t} at={c.l_meio - 0.03} x={540} y={540} texto="MEIO A MEIO" cor="green" size={62} rot={-5} />
        </>
      ),
    },
    {
      id: "4 antes o comprador pagava tudo", a: t3, b: t4, clima: "sepia", vin: 0.8, push: 0.012, hits: [c.a_tudo],
      svg: (t) => {
        const solta = prog(t, c.a_aliviar - 0.1, 0.5);
        return (
          <>
            <Holofote x={540} chao={FLOOR} w={560} cor="#FFE9D6" />
            <g transform={`translate(${540 + solta * 200} ${740 - solta * 40}) rotate(${solta * 20})`}><Moeda r={130} id="peso" /></g>
            <Personagem t={t} x={540} y={FLOOR} s={0.9} v={VIS.comprador} seed={1} acentos={ac} humor={solta > 0.5 ? "feliz" : "triste"} braco={160 - solta * 140} bracoE={-160 + solta * 140} />
            <Pop t={t} at={c.a_aliviar} x={300} y={700}><Balao texto="ALÍVIO!" w={300} size={52} /></Pop>
          </>
        );
      },
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.a_berlim - 0.05} x={540} y={440} texto="BERLIM · HAMBURGO" cor="dark" size={38} />
          <Carimbo t={t} at={c.a_tudo - 0.03} x={760} y={600} texto="PAGAVA TUDO" cor="red" size={54} rot={6} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t3 + 0.05} texto="ANTES" />,
    },
    {
      id: "5 o estudo: ficou maior", a: t4, b: t5, clima: "conflito", vin: 0.88, hits: [c.v_estudo, c.v_maior], punch: [{ at: c.v_maior, s: 1.07 }],
      svg: (t) => {
        const junta = prog(t, c.v_somando - 0.1, 0.6);
        const cresce = 1 + 0.45 * prog(t, c.v_maior - 0.15, 0.5);
        return (
          <>
            <Holofote x={540} chao={FLOOR} w={700} cor="#FFD9D4" />
            <g transform={`translate(540 700) scale(${cresce})`}>
              <g transform={`translate(${-(1 - junta) * 180} 0)`}><Moeda r={110} metade={-1} id="e1" /></g>
              <g transform={`translate(${(1 - junta) * 180} 0)`}><Moeda r={110} metade={1} id="e2" /></g>
            </g>
            <Personagem t={t} x={200} y={FLOOR} s={0.8} v={VEND} seed={3} acentos={ac} humor={t > c.v_maior ? "espanto" : "neutro"} />
            <Personagem t={t} x={880} y={FLOOR} s={0.8} v={VIS.comprador} seed={1} acentos={ac} humor={t > c.v_maior ? "espanto" : "neutro"} flip />
          </>
        );
      },
      html: (t) => (
        <>
          <Carimbo t={t} at={c.v_estudo - 0.03} x={540} y={490} texto="1 ESTUDO" sub="UNIVERSIDADE DE BERLIM" cor="white" size={50} rot={-4} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t4 + 0.05} texto="SÓ QUE…" cor="red" />,
      flash: c.v_maior,
    },
    {
      id: "6 no Brasil quem decide", a: t5, b: t6, clima: "explica", vin: 0.74, push: 0.012, hits: [c.b_vendedor, c.b_decide],
      svg: (t) => (
        <>
          <Holofote x={t > c.b_decide - 0.1 ? 800 : 280} chao={FLOOR} w={520} cor={t > c.b_decide - 0.1 ? aa(1) : "#FFFFFF"} />
          <Personagem t={t} x={260} y={FLOOR} s={0.86} v={VEND} seed={3} acentos={ac} humor="neutro" braco={gesto(t, c.b_vendedor - 0.1, 10, 95)} item={t > c.b_vendedor - 0.1 ? <g transform="scale(0.5)"><Moeda r={110} id="br" /></g> : null} />
          <Personagem t={t} x={800} y={FLOOR} s={0.9} v={VIS.comprador} seed={1} acentos={ac} humor="feliz" flip braco={gesto(t, c.b_decide - 0.1, 10, 150)} />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.b_mudou - 0.05} x={540} y={440} texto="QUEM PAGA ≠ VALOR" cor="white" size={44} />
          <Etiqueta t={t} at={c.b_vendedor - 0.05} x={290} y={760} texto="QUASE SEMPRE PAGA" cor="dark" size={32} />
          <Carimbo t={t} at={c.b_decide - 0.03} x={790} y={760} texto="QUEM DECIDE" cor="green" size={52} rot={5} />
        </>
      ),
      selo: (t) => <Selo t={t} at={c.b_brasil - 0.1} texto="NO BRASIL" />,
    },
    {
      id: "7 como se os dois pagassem", a: t6, b: tFim, clima: "ganho", vin: 0.62, push: 0.01, hits: [c.f_pesquisa, c.f_documentos, c.f_negociacao],
      svg: (t) => (
        <>
          <g transform="translate(540 650)"><Checklist t={t} titulo="O QUE ELE RECEBE DE VOCÊ" w={760} itens={[{ k: "PESQUISA", at: c.f_pesquisa }, { k: "DOCUMENTOS", at: c.f_documentos }, { k: "NEGOCIAÇÃO", at: c.f_negociacao }]} /></g>
          <Holofote x={540} chao={FLOOR + 40} w={640} cor={aa(1)} />
          <Personagem t={t} x={380} y={FLOOR + 40} s={0.84} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.f_trabalhe - 0.1, 10, 110)} />
          <Personagem t={t} x={760} y={FLOOR + 40} s={0.82} v={VIS.comprador} seed={1} humor="feliz" flip />
          <Confete t={t} at={c.f_negociacao + 0.2} />
        </>
      ),
      selo: (t) => <Selo t={t} at={c.f_dois - 0.1} texto="COMO SE OS DOIS PAGASSEM" cor="green" size={48} />,
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
