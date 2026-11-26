import React from "react";
import { prog } from "../../../lib/anim";
import type { Timeline } from "../../types";
import { aa } from "../../NOV26/kit";
import {
  Balao, CamCartoon, Carimbo, Checklist, type Clima, Confete, Etiqueta, Flash, Holofote,
  Personagem, Pop, Raios, Selo, VIS, acentosDe, gesto, pop,
} from "../../../estilos/cartoon";

/**
 * ATIVO-D1208-10 — "O pai engenheiro" (grade 08/12/2026 · 10h · CORRETOR NA VIDA REAL · Cartoon explicativo).
 * O cliente chega com o pai engenheiro → parede, teto, a rachadura → defender cada ponto vira disputa, e ele ganha → ele não
 * veio atrapalhar, veio proteger → chame para perto: planta, laudo, idade do prédio, "o que o senhor olharia primeiro?" →
 * quem vinha barrar ajuda a decidir. Prática profissional; sem estatística.
 */
const FLOOR = 1540;
export type Shot = {
  id: string; a: number; b: number; clima: Clima; vin?: number; push?: number;
  punch?: { at: number; s: number; x?: number; y?: number }[]; hits?: number[];
  svg?: (t: number) => React.ReactNode; html?: (t: number) => React.ReactNode; selo?: (t: number) => React.ReactNode; flash?: number;
};
/** Capacete de obra para o pai. */
const Capacete: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-70 0 C-70 -60 70 -60 70 0 Z" fill="#E0A43A" stroke="#0A0A0C" strokeWidth={6} />
    <rect x={-86} y={-6} width={172} height={18} rx={8} fill="#E0A43A" stroke="#0A0A0C" strokeWidth={6} />
  </g>
);
/** Parede com rachadura que se desenha. */
const Parede: React.FC<{ p: number }> = ({ p }) => (
  <g>
    <rect x={190} y={420} width={700} height={460} rx={14} fill="#D9D2C5" stroke="#0A0A0C" strokeWidth={6} />
    <path d="M560 430 L530 520 L575 580 L520 680 L560 760" fill="none" stroke="#3A2E26" strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" pathLength={1} style={{ strokeDasharray: `${p} 1` }} />
  </g>
);

export const makeShots = (tl: Timeline): Shot[] => {
  const c = tl.cues;
  const ac = acentosDe(tl.captions);
  const t1 = c.i_parede - 0.9;
  const t2 = c.d_defender - 0.8;
  const t3 = c.v_atrapalhar - 1.0;
  const t4 = c.a_chame - 0.6;
  const t5 = c.f_barrar - 0.9;
  const tFim = c.cta_quer - 0.05;
  const PAI = { ...VIS.B };
  return [
    {
      id: "1 chegam", a: 0, b: t1, clima: "pergunta", vin: 0.8, push: 0.012, hits: [c.h_pai, c.h_engenheiro], punch: [{ at: c.h_engenheiro, s: 1.05 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} p={prog(t, 0, 0.3)} />
          <Personagem t={t} x={230} y={FLOOR} s={0.66} v={VIS.A} acentos={ac} humor={t > c.h_engenheiro ? "espanto" : "feliz"} />
          <Personagem t={t} x={560} y={FLOOR} s={0.66} v={VIS.comprador} seed={1} flip humor="feliz" />
          <g opacity={prog(t, c.h_pai - 0.3, 0.3)}><Personagem t={t} x={850} y={FLOOR} s={0.72} v={PAI} seed={2} flip humor="neutro" /></g>
          <g opacity={prog(t, c.h_engenheiro - 0.2, 0.3)}><Capacete x={850} y={1150} s={0.62} /></g>
        </>
      ),
      html: (t) => <Etiqueta t={t} at={c.h_engenheiro - 0.1} x={850} y={860} texto="PAI ENGENHEIRO" cor="white" size={32} />,
      selo: (t) => <Selo t={t} at={0.1} texto="NA VISITA" />,
    },
    {
      id: "2 a inspeção", a: t1, b: t2, clima: "conflito", vin: 0.82, hits: [c.i_parede, c.i_teto, c.i_rachadura], punch: [{ at: c.i_rachadura, s: 1.06 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={720} cor="#FFD9D4" p={0.8} />
          <Parede p={prog(t, c.i_rachadura - 0.2, 0.6)} />
          <Personagem t={t} x={300} y={FLOOR} s={0.7} v={VIS.A} acentos={ac} humor={t > c.i_rachadura ? "triste" : "neutro"} />
          <Personagem t={t} x={780} y={FLOOR} s={0.74} v={PAI} seed={2} flip humor="bravo" braco={gesto(t, c.i_parede - 0.1, 10, 120)} />
          <Capacete x={780} y={1106} s={0.64} />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.i_parede - 0.1} x={360} y={470} texto="PAREDE" cor="white" size={30} />
          <Etiqueta t={t} at={c.i_teto - 0.1} x={720} y={470} texto="TETO" cor="white" size={30} />
          <Carimbo t={t} at={c.i_rachadura - 0.03} x={540} y={880} texto="RACHADURA" cor="red" size={50} rot={-5} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t1 + 0.05} texto="A INSPEÇÃO" cor="red" />,
    },
    {
      id: "3 a disputa", a: t2, b: t3, clima: "conflito", vin: 0.86, hits: [c.d_defender, c.d_disputa, c.d_ganha], punch: [{ at: c.d_disputa, s: 1.07 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={720} cor="#FFD9D4" />
          <Personagem t={t} x={300} y={FLOOR} s={0.72} v={VIS.A} acentos={ac} humor={t > c.d_ganha - 0.2 ? "triste" : "bravo"} fala={t < c.d_ganha} />
          <Personagem t={t} x={780} y={FLOOR} s={0.74} v={PAI} seed={2} flip humor="bravo" fala />
          <Capacete x={780} y={1106} s={0.64} />
          <Pop t={t} at={c.d_defender - 0.1} x={300} y={720}><Balao texto="ISSO É NORMAL!" w={420} size={40} /></Pop>
          <Pop t={t} at={c.d_defender + 0.5} x={780} y={560}><Balao texto="NÃO É!" w={260} size={48} cauda={-1} /></Pop>
        </>
      ),
      html: (t) => (
        <>
          <Carimbo t={t} at={c.d_disputa - 0.03} x={540} y={880} texto="VIRA DISPUTA" cor="red" size={54} rot={-5} />
          <Etiqueta t={t} at={c.d_ganha - 0.1} x={780} y={440} texto="E ELE GANHA" cor="red" size={34} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t2 + 0.05} texto="SE VOCÊ DEFENDE CADA PONTO…" cor="red" />,
    },
    {
      id: "4 veio proteger", a: t3, b: t4, clima: "explica", vin: 0.74, push: 0.012, hits: [c.v_atrapalhar, c.v_proteger], punch: [{ at: c.v_proteger, s: 1.05 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={680} cor={aa(1)} p={prog(t, c.v_proteger - 0.2, 0.4) * 0.7 + 0.3} />
          <Personagem t={t} x={420} y={FLOOR} s={0.74} v={VIS.comprador} seed={1} acentos={ac} humor="feliz" />
          <Personagem t={t} x={680} y={FLOOR} s={0.76} v={PAI} seed={2} flip humor="feliz" braco={gesto(t, c.v_proteger - 0.2, 10, 160)} />
          <Capacete x={680} y={1100} s={0.66} />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.v_atrapalhar - 0.1} x={540} y={480} texto="NÃO VEIO ATRAPALHAR" cor="white" size={38} />
          <Carimbo t={t} at={c.v_proteger - 0.03} x={540} y={640} texto="VEIO PROTEGER O FILHO" cor="green" size={52} rot={-4} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t3 + 0.05} texto="A VIRADA" cor="green" />,
    },
    {
      id: "5 chame para perto", a: t4, b: t5, clima: "explica", vin: 0.7, push: 0.01, hits: [c.a_chame, c.a_planta, c.a_laudo, c.a_predio, c.a_pergunte],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} cor={aa(1)} p={0.6} />
          <Pop t={t} at={c.a_planta - 0.3} x={540} y={640}><g transform="scale(0.78)">
            <Checklist t={t} titulo="PARA O ENGENHEIRO" itens={[{ k: "PLANTA", at: c.a_planta }, { k: "LAUDO", at: c.a_laudo }, { k: "IDADE DO PRÉDIO", at: c.a_predio }]} />
          </g></Pop>
          <Personagem t={t} x={300} y={FLOOR} s={0.72} v={VIS.A} acentos={ac} humor="feliz" fala={t > c.a_pergunte - 0.2} braco={gesto(t, c.a_chame - 0.1, 10, 120)} />
          <Personagem t={t} x={780} y={FLOOR} s={0.74} v={PAI} seed={2} flip humor="feliz" />
          <Capacete x={780} y={1106} s={0.64} />
          <Pop t={t} at={c.a_pergunte - 0.1} x={440} y={900}><Balao texto="O QUE O SENHOR OLHARIA PRIMEIRO?" w={600} size={30} /></Pop>
        </>
      ),
      selo: (t) => <Selo t={t} at={t4 + 0.05} texto="CHAME PARA PERTO" cor="green" />,
    },
    {
      id: "6 ajuda a decidir", a: t5, b: tFim, clima: "ganho", vin: 0.64, hits: [c.f_barrar, c.f_ajuda], punch: [{ at: c.f_ajuda, s: 1.05 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} cor={aa(1)} />
          <Personagem t={t} x={240} y={FLOOR} s={0.66} v={VIS.A} acentos={ac} humor="feliz" />
          <Personagem t={t} x={540} y={FLOOR} s={0.66} v={VIS.comprador} seed={1} flip humor="feliz" />
          <Personagem t={t} x={830} y={FLOOR} s={0.7} v={PAI} seed={2} flip humor="feliz" braco={gesto(t, c.f_ajuda - 0.1, 10, 150)} />
          <Capacete x={830} y={1144} s={0.6} />
          <Confete t={t} at={c.f_ajuda + 0.1} />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.f_barrar - 0.1} x={540} y={480} texto="VINHA PARA BARRAR" cor="white" size={36} />
          <Carimbo t={t} at={c.f_ajuda - 0.03} x={540} y={640} texto="AJUDA A DECIDIR" cor="green" size={56} rot={-4} />
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
