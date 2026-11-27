import React from "react";
import { prog } from "../../../lib/anim";
import type { Timeline } from "../../types";
import { aa } from "../../NOV26/kit";
import {
  Balanca, CamCartoon, Carimbo, type Clima, Confete, Etiqueta, Flash, Fumaca, Holofote,
  Personagem, Pop, Raios, Selo, VIS, acentosDe, gesto, pop,
} from "../../../estilos/cartoon";
import { Celular } from "../../ATIVO-D1204-10/scenes/Scenes";

/**
 * ATIVO-D1212-10 — "Qual o valor?" (grade 12/12/2026 · 10h · CORRETOR NA VIDA REAL · Cartoon explicativo).
 * O lead manda "qual o valor?" → o corretor responde só o preço, o cliente visualiza e some em fumaça → preço sozinho vai
 * para a balança contra o anúncio mais barato → a resposta certa: preço + pergunta → "morar ou investir? quantos quartos?"
 * → quem só responde encerra; quem pergunta atende. Rotina; valor ilustrativo; sem estatística.
 */
const FLOOR = 1540;
export type Shot = {
  id: string; a: number; b: number; clima: Clima; vin?: number; push?: number;
  punch?: { at: number; s: number; x?: number; y?: number }[]; hits?: number[];
  svg?: (t: number) => React.ReactNode; html?: (t: number) => React.ReactNode; selo?: (t: number) => React.ReactNode; flash?: number;
};

export const makeShots = (tl: Timeline): Shot[] => {
  const c = tl.cues;
  const ac = acentosDe(tl.captions);
  const t1 = c.s_preco - 0.4;
  const t2 = c.c_sozinho - 0.4;
  const t3 = c.v_segura - 0.4;
  const t4 = c.a_valor - 0.4;
  const t5 = c.f_encerra - 0.4;
  const tFim = c.cta_quer - 0.05;
  return [
    {
      id: "1 a pergunta", a: 0, b: t1, clima: "pergunta", vin: 0.86, push: 0.012, hits: [c.h_lead, c.h_valor], punch: [{ at: c.h_valor, s: 1.06 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={720} p={prog(t, 0, 0.3)} />
          <Celular t={t} x={700} y={700} s={0.8} msgs={[{ texto: ["OI! QUAL", "O VALOR?"], lado: "ele", at: c.h_lead }]} />
          <Personagem t={t} x={300} y={FLOOR} s={0.74} v={VIS.A} acentos={ac} humor={t > c.h_valor - 0.2 ? "espanto" : "neutro"} />
        </>
      ),
      html: (t) => <Etiqueta t={t} at={c.h_valor - 0.1} x={300} y={470} texto="SÓ ISSO" cor="white" size={42} />,
      selo: (t) => <Selo t={t} at={0.1} texto="O LEAD" />,
    },
    {
      id: "2 some", a: t1, b: t2, clima: "conflito", vin: 0.86, hits: [c.s_preco, c.s_visualiza, c.s_some], punch: [{ at: c.s_some, s: 1.07 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={720} cor="#FFD9D4" />
          <Celular t={t} x={700} y={700} s={0.8} msgs={[{ texto: ["OI! QUAL", "O VALOR?"], lado: "ele", at: 0 }, { texto: ["R$ 450 MIL."], lado: "eu", at: c.s_preco - 0.1 }]} rodape="VISUALIZADO" rodapeAt={c.s_visualiza - 0.1} />
          <Personagem t={t} x={300} y={FLOOR} s={0.74} v={VIS.A} acentos={ac} humor={t > c.s_some ? "triste" : "neutro"} />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.s_visualiza - 0.1} x={300} y={470} texto="VISUALIZOU…" cor="white" size={40} />
          <Carimbo t={t} at={c.s_some - 0.05} x={290} y={800} texto="SUMIU" cor="red" size={60} rot={-6} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t1 + 0.05} texto="SÓ O PREÇO" cor="red" />,
    },
    {
      id: "3 a comparação", a: t2, b: t3, clima: "conflito", vin: 0.88, hits: [c.c_sozinho, c.c_comparacao, c.c_barato], punch: [{ at: c.c_barato, s: 1.06 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} cor="#FFD9D4" />
          <Pop t={t} at={c.c_sozinho - 0.1} x={540} y={780}><Balanca s={1.0} incl={-0.8 * prog(t, c.c_barato - 0.2, 0.5)} /></Pop>
          <g transform={`translate(860 ${FLOOR - 260})`}><Fumaca t={t} at={t2} r={140} /></g>
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.c_sozinho - 0.1} x={330} y={500} texto="SEU PREÇO" cor="white" size={36} />
          <Etiqueta t={t} at={c.c_barato - 0.2} x={760} y={500} texto="O MAIS BARATO DO BAIRRO" cor="red" size={30} />
          <Carimbo t={t} at={c.c_comparacao - 0.05} x={540} y={880} texto="SÓ COMPARAÇÃO" cor="red" size={50} rot={-5} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t2 + 0.05} texto="O ERRO" cor="red" />,
    },
    {
      id: "4 preço + pergunta", a: t3, b: t4, clima: "explica", vin: 0.72, push: 0.01, hits: [c.v_segura, c.v_pergunta], punch: [{ at: c.v_pergunta, s: 1.06 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} cor={aa(1)} p={0.6} />
          <Personagem t={t} x={540} y={FLOOR} s={0.8} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.v_pergunta - 0.1, 10, 130)} />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.v_segura - 0.1} x={540} y={480} texto="O QUE SEGURA A CONVERSA" cor="white" size={36} />
          <Carimbo t={t} at={c.v_pergunta - 0.4} x={540} y={680} texto="PREÇO + PERGUNTA" cor="green" size={58} rot={-4} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t3 + 0.05} texto="A VIRADA" cor="green" />,
    },
    {
      id: "5 a resposta", a: t4, b: t5, clima: "ganho", vin: 0.68, push: 0.01, hits: [c.a_valor, c.a_morar, c.a_quartos], punch: [{ at: c.a_quartos, s: 1.05 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} cor={aa(1)} />
          <Celular t={t} x={700} y={700} s={0.8} msgs={[{ texto: ["R$ 450 MIL."], lado: "eu", at: c.a_valor - 0.1 }, { texto: ["É PARA MORAR", "OU INVESTIR?"], lado: "eu", at: c.a_morar - 0.2, verde: true }, { texto: ["QUANTOS QUARTOS", "VOCÊ PRECISA?"], lado: "eu", at: c.a_quartos - 0.2, verde: true }]} />
          <Personagem t={t} x={300} y={FLOOR} s={0.74} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.a_morar - 0.1, 10, 120)} />
        </>
      ),
      html: (t) => <Etiqueta t={t} at={c.a_valor - 0.1} x={300} y={470} texto="DIGA O VALOR…" cor="white" size={38} />,
      selo: (t) => <Selo t={t} at={t4 + 0.05} texto="E PERGUNTE" cor="green" />,
    },
    {
      id: "6 atende", a: t5, b: tFim, clima: "ganho", vin: 0.64, hits: [c.f_encerra, c.f_atende], punch: [{ at: c.f_atende - 0.7, s: 1.05 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} cor={aa(1)} />
          <Personagem t={t} x={330} y={FLOOR} s={0.74} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.f_atende - 0.8, 10, 150)} />
          <Personagem t={t} x={760} y={FLOOR} s={0.74} v={VIS.comprador} seed={1} flip humor="feliz" fala={t > c.f_atende - 0.6} />
          <Confete t={t} at={c.f_atende - 0.6} />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.f_encerra - 0.3} x={540} y={480} texto="SÓ RESPONDE: ENCERRA" cor="red" size={38} />
          <Carimbo t={t} at={c.f_atende - 0.8} x={540} y={680} texto="PERGUNTA: ATENDE" cor="green" size={58} rot={-4} />
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
