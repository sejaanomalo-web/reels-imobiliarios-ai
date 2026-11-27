import React from "react";
import { prog } from "../../../lib/anim";
import type { Timeline } from "../../types";
import { aa } from "../../NOV26/kit";
import {
  CamCartoon, Carimbo, Checklist, type Clima, Confete, Etiqueta, Flash, Holofote,
  Personagem, Pop, Raios, Selo, VIS, acentosDe, gesto, pop,
} from "../../../estilos/cartoon";
import { Celular } from "../../ATIVO-D1204-10/scenes/Scenes";

/**
 * ATIVO-D1213-10 — "O link do concorrente" (grade 13/12/2026 · 10h · CORRETOR NA VIDA REAL · Cartoon explicativo).
 * O cliente manda o anúncio de outro corretor → a vontade é ignorar ou apontar defeito → mas o link diz o que ele procura
 * (varanda, 2 vagas, perto da escola) → o anúncio do concorrente é a melhor pista → pergunte o que chamou a atenção e
 * filtre → quem compara junto vira o corretor de confiança. Rotina; sem marcas reais.
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
  const t1 = c.i_ignorar - 0.4;
  const t2 = c.p_exatamente - 0.4;
  const t3 = c.v_concorrente - 0.4;
  const t4 = c.a_pergunte - 0.4;
  const t5 = c.f_compara - 0.4;
  const tFim = c.cta_quer - 0.05;
  return [
    {
      id: "1 o link", a: 0, b: t1, clima: "pergunta", vin: 0.86, push: 0.012, hits: [c.h_link, c.h_outro], punch: [{ at: c.h_outro, s: 1.06 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={720} p={prog(t, 0, 0.3)} />
          <Celular t={t} x={700} y={700} s={0.8} msgs={[{ texto: ["OLHA ESTE", "AQUI:"], lado: "ele", at: c.h_link - 0.3 }, { texto: ["[ANÚNCIO DE", "OUTRO CORRETOR]"], lado: "ele", at: c.h_outro - 0.2 }]} />
          <Personagem t={t} x={300} y={FLOOR} s={0.74} v={VIS.A} acentos={ac} humor={t > c.h_outro - 0.1 ? "espanto" : "neutro"} />
        </>
      ),
      html: (t) => <Etiqueta t={t} at={c.h_outro - 0.1} x={300} y={470} texto="DE OUTRO CORRETOR" cor="red" size={36} />,
      selo: (t) => <Selo t={t} at={0.1} texto="O LINK" />,
    },
    {
      id: "2 o impulso", a: t1, b: t2, clima: "conflito", vin: 0.88, hits: [c.i_ignorar, c.i_defeito], punch: [{ at: c.i_defeito, s: 1.07 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={720} cor="#FFD9D4" />
          <Personagem t={t} x={540} y={FLOOR} s={0.8} v={VIS.A} acentos={ac} humor="bravo" braco={gesto(t, c.i_defeito - 0.1, 10, 120)} />
        </>
      ),
      html: (t) => (
        <>
          <Carimbo t={t} at={c.i_ignorar - 0.1} x={360} y={560} texto="IGNORAR?" cor="red" size={54} rot={-8} />
          <Carimbo t={t} at={c.i_defeito - 0.1} x={720} y={720} texto="FALAR MAL?" cor="red" size={54} rot={6} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t1 + 0.05} texto="A VONTADE" cor="red" />,
    },
    {
      id: "3 a pista", a: t2, b: t3, clima: "explica", vin: 0.74, push: 0.01, hits: [c.p_exatamente, c.p_procura], punch: [{ at: c.p_procura, s: 1.05 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} p={0.6} />
          <Pop t={t} at={c.p_exatamente - 0.3} x={540} y={640}><g transform="scale(0.8)">
            <Checklist t={t} titulo="ELE PROCURA:" itens={[{ k: "VARANDA", at: c.p_exatamente + 0.1 }, { k: "2 VAGAS", at: c.p_exatamente + 0.5 }, { k: "PERTO DA ESCOLA", at: c.p_procura }]} />
          </g></Pop>
          <Personagem t={t} x={220} y={FLOOR} s={0.66} v={VIS.A} acentos={ac} humor="espanto" />
        </>
      ),
      html: () => null,
      selo: (t) => <Selo t={t} at={t2 + 0.05} texto="O QUE O LINK DIZ" />,
    },
    {
      id: "4 a melhor pista", a: t3, b: t4, clima: "explica", vin: 0.72, push: 0.01, hits: [c.v_concorrente, c.v_pista], punch: [{ at: c.v_pista, s: 1.06 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} cor={aa(1)} p={0.6} />
          <Personagem t={t} x={540} y={FLOOR} s={0.8} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.v_pista - 0.1, 10, 130)} />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.v_concorrente - 0.2} x={540} y={480} texto="O ANÚNCIO DO CONCORRENTE" cor="white" size={36} />
          <Carimbo t={t} at={c.v_pista - 0.1} x={540} y={680} texto="A MELHOR PISTA" cor="green" size={60} rot={-4} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t3 + 0.05} texto="A VIRADA" cor="green" />,
    },
    {
      id: "5 a pergunta", a: t4, b: t5, clima: "ganho", vin: 0.68, push: 0.01, hits: [c.a_pergunte, c.a_atencao, c.a_filtrar], punch: [{ at: c.a_filtrar, s: 1.05 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} cor={aa(1)} />
          <Celular t={t} x={700} y={700} s={0.8} msgs={[{ texto: ["O QUE MAIS TE", "CHAMOU ATENÇÃO?"], lado: "eu", at: c.a_pergunte - 0.1, verde: true }, { texto: ["A VARANDA", "E AS 2 VAGAS"], lado: "ele", at: c.a_atencao + 0.2 }]} />
          <Personagem t={t} x={300} y={FLOOR} s={0.74} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.a_pergunte - 0.1, 10, 120)} />
        </>
      ),
      html: (t) => <Etiqueta t={t} at={c.a_filtrar - 0.1} x={300} y={470} texto="FILTRE AS OPÇÕES" cor="green" size={38} />,
      selo: (t) => <Selo t={t} at={t4 + 0.05} texto="PERGUNTE" cor="green" />,
    },
    {
      id: "6 confiança", a: t5, b: tFim, clima: "ganho", vin: 0.64, hits: [c.f_compara, c.f_confianca], punch: [{ at: c.f_compara + 0.8, s: 1.05 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} cor={aa(1)} />
          <Personagem t={t} x={330} y={FLOOR} s={0.74} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.f_compara + 0.7, 10, 150)} />
          <Personagem t={t} x={760} y={FLOOR} s={0.74} v={VIS.comprador} seed={1} flip humor="feliz" fala={t > c.f_compara + 0.6} />
          <Confete t={t} at={c.f_compara + 0.8} />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.f_compara - 0.1} x={540} y={480} texto="COMPAREM JUNTOS" cor="white" size={40} />
          <Carimbo t={t} at={c.f_compara + 0.7} x={540} y={680} texto="CORRETOR DE CONFIANÇA" cor="green" size={50} rot={-4} />
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
