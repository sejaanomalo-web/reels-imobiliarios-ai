import React from "react";
import { prog } from "../../../lib/anim";
import type { Timeline } from "../../types";
import { aa } from "../../NOV26/kit";
import {
  CamCartoon, Carimbo, Checklist, type Clima, Confete, Etiqueta, Flash, Holofote,
  Personagem, Pop, Raios, Selo, VIS, acentosDe, gesto, pop,
} from "../../../estilos/cartoon";

/**
 * ATIVO-D1216-10 — "A portaria" (grade 16/12/2026 · 10h · CORRETOR NA VIDA REAL · Cartoon explicativo).
 * O cliente chega na hora e o porteiro levanta a mão → ninguém avisou, e o porteiro está certo → dez minutos na calçada,
 * a visita começou errada → a visita começa na portaria → na véspera: nome do cliente, horário, apartamento (checklist) →
 * cliente que entra sem esperar entra de bom humor. Rotina; regras variam por prédio.
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
  const t1 = c.c_avisado - 0.4;
  const t2 = c.k_dez - 0.2;
  const t3 = c.v_comeca - 0.4;
  const t4 = c.a_vespera - 0.35;
  const t5 = c.d_esperar - 0.45;
  const tFim = c.cta_quer - 0.05;
  return [
    {
      id: "1 barrado", a: 0, b: t1, clima: "conflito", vin: 0.86, push: 0.012, hits: [c.h_hora, c.h_portaria, c.h_entrar], punch: [{ at: c.h_entrar, s: 1.07 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} p={prog(t, 0, 0.3)} />
          <Personagem t={t} x={300} y={FLOOR} s={0.74} v={VIS.comprador} seed={1} humor={t > c.h_entrar - 0.1 ? "espanto" : "feliz"} />
          <Personagem t={t} x={770} y={FLOOR} s={0.78} v={VIS.lider} seed={4} flip humor="neutro" braco={gesto(t, c.h_portaria, 10, 160)} />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.h_hora - 0.2} x={540} y={480} texto="CHEGOU NA HORA" cor="white" size={40} />
          <Carimbo t={t} at={c.h_entrar - 0.1} x={560} y={690} texto="NÃO PODE ENTRAR" cor="red" size={54} rot={-6} />
        </>
      ),
      selo: (t) => <Selo t={t} at={0.1} texto="A PORTARIA" cor="red" />,
    },
    {
      id: "2 ninguém avisou", a: t1, b: t2, clima: "pergunta", vin: 0.84, hits: [c.c_avisado, c.c_certo], punch: [{ at: c.c_certo, s: 1.05 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={720} p={0.7} />
          <Personagem t={t} x={540} y={FLOOR} s={0.82} v={VIS.lider} seed={4} humor="neutro" braco={gesto(t, c.c_certo - 0.1, 10, 100)} />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.c_avisado - 0.2} x={540} y={480} texto="NINGUÉM AVISOU" cor="white" size={42} />
          <Carimbo t={t} at={c.c_certo - 0.6} x={540} y={690} texto="ELE ESTÁ CERTO" cor="green" size={54} rot={-4} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t1 + 0.05} texto="O PORQUÊ" />,
    },
    {
      id: "3 a calçada", a: t2, b: t3, clima: "conflito", vin: 0.88, push: 0.01, hits: [c.k_dez, c.k_calcada, c.k_errada], punch: [{ at: c.k_errada, s: 1.06 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} cor="#FFD9D4" p={0.7} />
          <Personagem t={t} x={360} y={FLOOR} s={0.74} v={VIS.comprador} seed={1} humor={t > c.k_errada - 0.2 ? "bravo" : "triste"} />
          <Personagem t={t} x={720} y={FLOOR} s={0.74} v={VIS.A} acentos={ac} humor="espanto" flip />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.k_dez - 0.2} x={540} y={480} texto="10 MIN NA CALÇADA" cor="white" size={42} />
          <Carimbo t={t} at={c.k_errada - 0.1} x={540} y={690} texto="COMEÇOU ERRADA" cor="red" size={56} rot={5} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t2 + 0.05} texto="O CUSTO" cor="red" />,
    },
    {
      id: "4 a visita começa", a: t3, b: t4, clima: "explica", vin: 0.72, push: 0.012, hits: [c.v_comeca, c.v_portaria], punch: [{ at: c.v_portaria, s: 1.06 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} cor={aa(1)} p={0.6} />
          <Personagem t={t} x={540} y={FLOOR} s={0.8} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.v_portaria - 0.1, 10, 130)} />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.v_comeca - 0.3} x={540} y={480} texto="A VISITA COMEÇA" cor="white" size={42} />
          <Carimbo t={t} at={c.v_portaria - 0.1} x={540} y={680} texto="NA PORTARIA" cor="green" size={64} rot={-4} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t3 + 0.05} texto="A VIRADA" cor="green" />,
    },
    {
      id: "5 a véspera", a: t4, b: t5, clima: "ganho", vin: 0.68, push: 0.008, hits: [c.a_vespera, c.a_nome, c.a_horario, c.a_apartamento], punch: [{ at: c.a_apartamento, s: 1.04 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={780} cor={aa(1)} />
          <Pop t={t} at={t4} x={560} y={730}><g transform="scale(0.72)">
            <Checklist t={t} titulo="AVISO À PORTARIA" w={720} itens={[{ k: "NOME DO CLIENTE", at: c.a_nome - 0.05 }, { k: "HORÁRIO", at: c.a_horario - 0.05 }, { k: "APARTAMENTO", at: c.a_apartamento - 0.05 }]} />
          </g></Pop>
          <Personagem t={t} x={190} y={FLOOR} s={0.6} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.a_vespera, 10, 130)} />
        </>
      ),
      html: (t) => <Etiqueta t={t} at={c.a_vespera - 0.1} x={540} y={460} texto="NA VÉSPERA" cor="green" size={40} />,
      selo: (t) => <Selo t={t} at={t4 + 0.05} texto="AVISE" cor="green" />,
    },
    {
      id: "6 bom humor", a: t5, b: tFim, clima: "ganho", vin: 0.64, hits: [c.d_esperar, c.d_humor], punch: [{ at: c.d_esperar + 0.6, s: 1.05 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} cor={aa(1)} />
          <Personagem t={t} x={300} y={FLOOR} s={0.74} v={VIS.comprador} seed={1} humor="feliz" fala={t > c.d_humor - 0.4} />
          <Personagem t={t} x={770} y={FLOOR} s={0.78} v={VIS.lider} seed={4} flip humor="feliz" braco={gesto(t, c.d_esperar, 10, 150)} />
          <Confete t={t} at={c.d_esperar + 0.6} />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.d_esperar - 0.2} x={540} y={480} texto="ENTROU SEM ESPERAR" cor="white" size={40} />
          <Carimbo t={t} at={c.d_esperar + 0.5} x={540} y={680} texto="BOM HUMOR" cor="green" size={66} rot={-4} />
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
