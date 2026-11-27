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
 * ATIVO-D1214-10 — "A tampa do vaso" (grade 14/12/2026 · 10h · CORRETOR NA VIDA REAL · Cartoon explicativo).
 * A foto do banheiro sai no anúncio com a tampa levantada → quem rola repara e passa para o próximo → a foto é a primeira
 * visita, sem o corretor → cinco minutos de preparo → checklist (luzes, cortinas, tampa, objetos pessoais, horizontal) →
 * cinco minutos valem mais que cem fotos. Rotina; sem portal nem estatística.
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
  const t1 = c.r_repara - 0.5;
  const t2 = c.p_primeira - 0.4;
  const t3 = c.v_cinco - 0.4;
  const t4 = c.a_luzes - 0.35;
  const t5 = c.d_valem - 0.45;
  const tFim = c.cta_quer - 0.05;
  return [
    {
      id: "1 a foto", a: 0, b: t1, clima: "pergunta", vin: 0.86, push: 0.012, hits: [c.h_tampa, c.h_levantada], punch: [{ at: c.h_levantada, s: 1.07 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={720} p={prog(t, 0, 0.3)} />
          <Celular t={t} x={700} y={700} s={0.8} msgs={[{ texto: ["ANÚNCIO NO AR:", "FOTO DO BANHEIRO"], lado: "ele", at: c.h_foto - 0.2 }, { texto: ["[TAMPA DO VASO", "LEVANTADA]"], lado: "ele", at: c.h_tampa - 0.1 }]} />
          <Personagem t={t} x={300} y={FLOOR} s={0.74} v={VIS.A} acentos={ac} humor={t > c.h_levantada - 0.1 ? "espanto" : "neutro"} />
        </>
      ),
      html: (t) => <Carimbo t={t} at={c.h_levantada - 0.1} x={300} y={470} texto="LEVANTADA!" cor="red" size={54} rot={-8} />,
      selo: (t) => <Selo t={t} at={0.1} texto="A FOTO" />,
    },
    {
      id: "2 passou direto", a: t1, b: t2, clima: "conflito", vin: 0.88, hits: [c.r_repara, c.r_proximo], punch: [{ at: c.r_proximo, s: 1.07 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={720} cor="#FFD9D4" />
          <Personagem t={t} x={540} y={FLOOR} s={0.8} v={VIS.comprador} seed={1} acentos={ac} humor={t > c.r_repara - 0.1 ? "bravo" : "neutro"} braco={gesto(t, c.r_proximo - 0.1, 10, 130)} />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.r_repara - 0.1} x={540} y={480} texto="REPAROU NA HORA" cor="red" size={38} />
          <Carimbo t={t} at={c.r_proximo - 0.1} x={540} y={690} texto="PRÓXIMO →" cor="red" size={60} rot={5} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t1 + 0.05} texto="QUEM ROLA" cor="red" />,
    },
    {
      id: "3 a primeira visita", a: t2, b: t3, clima: "explica", vin: 0.76, push: 0.01, hits: [c.p_primeira, c.p_sem], punch: [{ at: c.p_sem, s: 1.05 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} p={0.6} />
          <Personagem t={t} x={760} y={FLOOR} s={0.74} v={VIS.comprador} seed={1} flip humor="neutro" />
          <Personagem t={t} x={300} y={FLOOR} s={0.66} v={VIS.A} acentos={ac} humor="espanto" />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.p_primeira - 0.2} x={540} y={480} texto="A FOTO = A 1ª VISITA" cor="white" size={40} />
          <Carimbo t={t} at={c.p_sem - 0.1} x={540} y={690} texto="SEM VOCÊ" cor="red" size={60} rot={-5} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t2 + 0.05} texto="A FOTO" />,
    },
    {
      id: "4 cinco minutos", a: t3, b: t4, clima: "explica", vin: 0.72, push: 0.012, hits: [c.v_cinco, c.v_preparo], punch: [{ at: c.v_preparo, s: 1.06 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} cor={aa(1)} p={0.6} />
          <Personagem t={t} x={540} y={FLOOR} s={0.8} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.v_preparo - 0.1, 10, 130)} />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.v_cinco - 0.2} x={540} y={480} texto="CINCO MINUTOS" cor="white" size={44} />
          <Carimbo t={t} at={c.v_preparo - 0.1} x={540} y={680} texto="DE PREPARO" cor="green" size={60} rot={-4} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t3 + 0.05} texto="A VIRADA" cor="green" />,
    },
    {
      id: "5 o checklist", a: t4, b: t5, clima: "ganho", vin: 0.68, push: 0.008, hits: [c.a_luzes, c.a_cortinas, c.a_tampa, c.a_objetos, c.a_horizontal], punch: [{ at: c.a_horizontal, s: 1.04 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} cor={aa(1)} />
          <Pop t={t} at={t4} x={540} y={655}><g transform="scale(0.7)">
            <Checklist t={t} titulo="ANTES DA FOTO:" w={760} itens={[{ k: "LUZES ACESAS", at: c.a_luzes - 0.05 }, { k: "CORTINAS ABERTAS", at: c.a_cortinas - 0.05 }, { k: "TAMPA ABAIXADA", at: c.a_tampa - 0.05 }, { k: "OBJETOS GUARDADOS", at: c.a_objetos - 0.05 }, { k: "CELULAR NA HORIZONTAL", at: c.a_horizontal - 0.05 }]} />
          </g></Pop>
          <Personagem t={t} x={190} y={FLOOR} s={0.6} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.a_luzes, 10, 130)} />
        </>
      ),
      html: () => null,
      selo: (t) => <Selo t={t} at={t4 + 0.05} texto="O PREPARO" cor="green" />,
    },
    {
      id: "6 cem fotos", a: t5, b: tFim, clima: "ganho", vin: 0.64, hits: [c.d_valem, c.d_fotos], punch: [{ at: c.d_fotos, s: 1.05 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} cor={aa(1)} />
          <Personagem t={t} x={330} y={FLOOR} s={0.74} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.d_valem, 10, 150)} />
          <Personagem t={t} x={760} y={FLOOR} s={0.74} v={VIS.comprador} seed={1} flip humor="feliz" fala={t > c.d_fotos} />
          <Confete t={t} at={c.d_valem + 0.3} />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.d_valem - 0.2} x={540} y={480} texto="5 MINUTOS DE PREPARO" cor="white" size={40} />
          <Carimbo t={t} at={c.d_valem + 0.25} x={540} y={680} texto="> 100 FOTOS" cor="green" size={64} rot={-4} />
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
