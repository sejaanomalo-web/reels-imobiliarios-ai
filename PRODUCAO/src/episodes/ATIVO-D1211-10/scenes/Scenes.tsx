import React from "react";
import { prog } from "../../../lib/anim";
import type { Timeline } from "../../types";
import { aa } from "../../NOV26/kit";
import {
  CamCartoon, Carimbo, type Clima, Confete, Etiqueta, Flash, Holofote,
  Personagem, Raios, Selo, VIS, acentosDe, gesto, pop,
} from "../../../estilos/cartoon";
import { Celular } from "../../ATIVO-D1204-10/scenes/Scenes";

/**
 * ATIVO-D1211-10 — "A mensagem das 23h" (grade 11/12/2026 · 10h · CORRETOR NA VIDA REAL · Cartoon explicativo).
 * 23h: o cliente manda mensagem e o corretor responde na hora → no dia seguinte, 23h, 23h30 → você ensinou que seu horário é
 * qualquer horário → de manhã, cedo, com tudo resolvido → urgente: ligue; se não, "amanhã às 9 te mando tudo" →
 * disponível não é sempre on-line. Rotina; sem estatística.
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
  const t1 = c.r_novo - 0.5;
  const t2 = c.e_ensinou - 0.4;
  const t3 = c.v_manha - 0.4;
  const t4 = c.a_urgente - 0.4;
  const t5 = c.f_disponivel - 0.4;
  const tFim = c.cta_quer - 0.05;
  return [
    {
      id: "1 23h", a: 0, b: t1, clima: "pergunta", vin: 0.9, push: 0.012, hits: [c.h_mensagem, c.h_noite, c.h_hora], punch: [{ at: c.h_hora, s: 1.06 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={700} p={prog(t, 0, 0.3)} />
          <Celular t={t} x={700} y={700} s={0.8} msgs={[{ texto: ["TEM NOVIDADE", "DAQUELE AP?"], lado: "ele", at: c.h_mensagem - 0.1 }, { texto: ["TENHO SIM!", "TE MANDO JÁ"], lado: "eu", at: c.h_hora - 0.1 }]} />
          <Personagem t={t} x={300} y={FLOOR} s={0.74} v={VIS.A} acentos={ac} humor={t > c.h_hora - 0.2 ? "feliz" : "espanto"} braco={gesto(t, c.h_hora - 0.2, 10, 110)} />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.h_noite - 0.1} x={300} y={470} texto="23:00" cor="white" size={44} />
          <Carimbo t={t} at={c.h_hora - 0.05} x={270} y={740} texto="NA HORA" cor="green" size={50} rot={-8} />
        </>
      ),
      selo: (t) => <Selo t={t} at={0.1} texto="DE NOITE" />,
    },
    {
      id: "2 de novo", a: t1, b: t2, clima: "conflito", vin: 0.86, hits: [c.r_novo, c.r_onze, c.r_meia], punch: [{ at: c.r_meia, s: 1.06 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={700} cor="#FFD9D4" />
          <Celular t={t} x={700} y={700} s={0.8} msgs={[{ texto: ["E AQUELE", "OUTRO?"], lado: "ele", at: c.r_onze - 0.1 }, { texto: ["E A VAGA?"], lado: "ele", at: c.r_meia - 0.1 }, { texto: ["E O PREÇO?"], lado: "ele", at: c.r_meia + 0.5 }]} />
          <Personagem t={t} x={300} y={FLOOR} s={0.74} v={VIS.A} acentos={ac} humor={t > c.r_meia - 0.1 ? "triste" : "espanto"} />
        </>
      ),
      html: (t) => (
        <>
          {t < c.r_meia - 0.15 ? <Etiqueta t={t} at={c.r_onze - 0.1} x={300} y={470} texto="23:00" cor="red" size={44} /> : null}
          <Etiqueta t={t} at={c.r_meia - 0.1} x={300} y={470} texto="23:30" cor="red" size={44} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t1 + 0.05} texto="NO DIA SEGUINTE" cor="red" />,
    },
    {
      id: "3 qualquer horário", a: t2, b: t3, clima: "conflito", vin: 0.9, hits: [c.e_ensinou, c.e_qualquer], punch: [{ at: c.e_qualquer, s: 1.07 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={720} cor="#FFD9D4" />
          <Personagem t={t} x={540} y={FLOOR} s={0.8} v={VIS.A} acentos={ac} humor="triste" />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.e_ensinou - 0.1} x={540} y={480} texto="VOCÊ ENSINOU" cor="white" size={40} />
          <Carimbo t={t} at={c.e_qualquer - 0.05} x={540} y={680} texto="QUALQUER HORÁRIO" cor="red" size={56} rot={-5} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t2 + 0.05} texto="O ERRO" cor="red" />,
    },
    {
      id: "4 de manhã", a: t3, b: t4, clima: "explica", vin: 0.72, push: 0.01, hits: [c.v_manha, c.v_cedo, c.v_resolvido], punch: [{ at: c.v_resolvido, s: 1.05 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} cor={aa(1)} p={0.6} />
          <Personagem t={t} x={540} y={FLOOR} s={0.8} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.v_resolvido - 0.1, 10, 130)} />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.v_manha - 0.1} x={540} y={480} texto="DE MANHÃ, CEDO" cor="white" size={42} />
          <Carimbo t={t} at={c.v_resolvido - 0.05} x={540} y={680} texto="TUDO RESOLVIDO" cor="green" size={56} rot={-4} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t3 + 0.05} texto="A VIRADA" cor="green" />,
    },
    {
      id: "5 a resposta curta", a: t4, b: t5, clima: "ganho", vin: 0.68, push: 0.01, hits: [c.a_urgente, c.a_ligue, c.a_curta, c.a_nove], punch: [{ at: c.a_nove, s: 1.05 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} cor={aa(1)} />
          <g opacity={prog(t, c.a_curta - 0.3, 0.3)}>
            <Celular t={t} x={700} y={700} s={0.8} msgs={[{ texto: ["E O PREÇO?"], lado: "ele", at: c.a_curta - 0.3 }, { texto: ["AMANHÃ ÀS 9", "TE MANDO TUDO"], lado: "eu", at: c.a_nove - 0.2, verde: true }]} />
          </g>
          <Personagem t={t} x={300} y={FLOOR} s={0.74} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.a_ligue - 0.1, 10, 120)} />
        </>
      ),
      html: (t) => (
        <>
          {t < c.a_curta - 0.3 ? <Etiqueta t={t} at={c.a_urgente - 0.1} x={540} y={480} texto="URGENTE?" cor="red" size={44} /> : null}
          {t < c.a_curta - 0.3 ? <Carimbo t={t} at={c.a_ligue - 0.05} x={540} y={680} texto="LIGUE" cor="green" size={64} rot={-5} /> : null}
          <Etiqueta t={t} at={c.a_curta - 0.1} x={300} y={470} texto="SE NÃO:" cor="white" size={40} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t4 + 0.05} texto="DO JEITO CERTO" cor="green" />,
    },
    {
      id: "6 disponível", a: t5, b: tFim, clima: "ganho", vin: 0.64, hits: [c.f_disponivel, c.f_online], punch: [{ at: c.f_disponivel + 1.15, s: 1.05 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} cor={aa(1)} />
          <Personagem t={t} x={540} y={FLOOR} s={0.8} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.f_online - 0.1, 10, 150)} />
          <Confete t={t} at={c.f_online + 0.1} />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.f_disponivel - 0.1} x={540} y={480} texto="DISPONÍVEL" cor="green" size={46} />
          <Carimbo t={t} at={c.f_disponivel + 1.1} x={540} y={680} texto="≠ SEMPRE ON-LINE" cor="red" size={54} rot={-4} />
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
