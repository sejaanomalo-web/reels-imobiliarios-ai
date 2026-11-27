import React from "react";
import { prog } from "../../../lib/anim";
import type { Timeline } from "../../types";
import { aa } from "../../NOV26/kit";
import {
  Balao, Barra, Calendario, CamCartoon, Carimbo, Checklist, type Clima, Confete, Etiqueta, Flash, Holofote,
  Personagem, Pop, Raios, Selo, VIS, acentosDe, gesto, pop,
} from "../../../estilos/cartoon";

/**
 * ATIVO-D1213-15 — "O próximo passo com data" (grade 13/12/2026 · 15h · IDEIA QUE MUDA O JOGO · Cartoon explicativo).
 * Toda conversa termina com uma data → 1997: estudantes e o relatório depois do Natal → quem anotou quando e onde entregou
 * mais que o dobro → 'depois a gente vê' não é combinado → marque dia, hora e o que acontece → com data acontece, sem data
 * esfria. Apuração: Gollwitzer & Brandstätter (1997), JPSP 73(1); sem percentuais.
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
  const t1 = c.e_1997 - 0.4;
  const t2 = c.r_anotou - 0.4;
  const t3 = c.v_depois - 0.4;
  const t4 = c.a_proximo - 0.4;
  const t5 = c.f_acontece - 0.4;
  const tFim = c.cta_quer - 0.05;
  return [
    {
      id: "1 a data", a: 0, b: t1, clima: "pergunta", vin: 0.86, push: 0.012, hits: [c.h_conversa, c.h_data], punch: [{ at: c.h_data, s: 1.06 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} p={prog(t, 0, 0.3)} />
          <Pop t={t} at={c.h_data - 0.2} x={540} y={640}><Calendario mes="DATA" cor={aa(1)} /></Pop>
          <Personagem t={t} x={300} y={FLOOR} s={0.74} v={VIS.A} acentos={ac} humor="feliz" fala={t < c.h_data} />
          <Personagem t={t} x={780} y={FLOOR} s={0.74} v={VIS.comprador} seed={1} flip humor="neutro" />
        </>
      ),
      html: (t) => <Etiqueta t={t} at={c.h_conversa - 0.1} x={540} y={460} texto="TODA CONVERSA TERMINA COM…" cor="white" size={34} />,
      selo: (t) => <Selo t={t} at={0.1} texto="A REGRA" />,
    },
    {
      id: "2 o estudo", a: t1, b: t2, clima: "dados", vin: 0.82, push: 0.01, hits: [c.e_1997, c.e_relatorio, c.e_natal], punch: [{ at: c.e_natal, s: 1.05 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} p={0.6} />
          <Personagem t={t} x={320} y={FLOOR} s={0.72} v={VIS.B} seed={2} humor="neutro" />
          <Personagem t={t} x={760} y={FLOOR} s={0.72} v={VIS.comprador} seed={3} flip humor="neutro" />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.e_relatorio - 0.1} x={540} y={520} texto="UM RELATÓRIO" cor="white" size={40} />
          <Carimbo t={t} at={c.e_natal - 0.1} x={540} y={700} texto="DEPOIS DO NATAL" cor="red" size={52} rot={-5} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t1 + 0.05} texto="1997 · GOLLWITZER" />,
    },
    {
      id: "3 o resultado", a: t2, b: t3, clima: "dados", vin: 0.8, push: 0.01, hits: [c.r_anotou, c.r_dobro], punch: [{ at: c.r_dobro, s: 1.06 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} p={0.6} />
          <Barra t={t} at={c.r_anotou + 0.6} x={380} base={880} w={180} h={130} cor="#6B7080" rotulo="SEM PLANO" />
          <Barra t={t} at={c.r_anotou} x={700} base={880} w={180} h={320} rotulo="QUANDO E ONDE" />
        </>
      ),
      html: (t) => <Carimbo t={t} at={c.r_dobro - 0.1} x={540} y={460} texto="MAIS QUE O DOBRO" cor="green" size={56} rot={-4} />,
      selo: (t) => <Selo t={t} at={t2 + 0.05} texto="QUEM ANOTOU" cor="green" />,
    },
    {
      id: "4 depois a gente vê", a: t3, b: t4, clima: "conflito", vin: 0.86, hits: [c.v_depois, c.v_combinado], punch: [{ at: c.v_combinado, s: 1.07 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} cor="#FFD9D4" />
          <g opacity={1 - 0.8 * prog(t, c.v_combinado - 0.2, 0.5)}>
            <Pop t={t} at={c.v_depois - 0.2} x={700} y={640}><Balao texto="DEPOIS A GENTE VÊ" w={460} size={34} cauda={1} /></Pop>
          </g>
          <Personagem t={t} x={300} y={FLOOR} s={0.74} v={VIS.A} acentos={ac} humor="triste" />
          <Personagem t={t} x={780} y={FLOOR} s={0.74} v={VIS.comprador} seed={1} flip humor="neutro" fala={t < c.v_combinado} />
        </>
      ),
      html: (t) => <Carimbo t={t} at={c.v_combinado - 0.1} x={540} y={860} texto="NÃO É COMBINADO" cor="red" size={54} rot={-5} />,
      selo: (t) => <Selo t={t} at={t3 + 0.05} texto="O ERRO" cor="red" />,
    },
    {
      id: "5 o próximo passo", a: t4, b: t5, clima: "ganho", vin: 0.68, push: 0.01, hits: [c.a_proximo, c.a_dia, c.a_hora, c.a_acontecer], punch: [{ at: c.a_acontecer, s: 1.05 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} cor={aa(1)} />
          <Pop t={t} at={c.a_proximo - 0.2} x={560} y={660}><g transform="scale(0.8)">
            <Checklist t={t} titulo="PRÓXIMO PASSO:" itens={[{ k: "O DIA", at: c.a_dia }, { k: "A HORA", at: c.a_hora }, { k: "O QUE ACONTECE", at: c.a_acontecer }]} />
          </g></Pop>
          <Personagem t={t} x={220} y={FLOOR} s={0.7} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.a_proximo - 0.1, 10, 120)} />
        </>
      ),
      html: () => null,
      selo: (t) => <Selo t={t} at={t4 + 0.05} texto="ANTES DE ENCERRAR" cor="green" />,
    },
    {
      id: "6 acontece", a: t5, b: tFim, clima: "ganho", vin: 0.64, hits: [c.f_acontece, c.f_esfria], punch: [{ at: c.f_acontece, s: 1.05 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} cor={aa(1)} />
          <Personagem t={t} x={330} y={FLOOR} s={0.74} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.f_acontece - 0.1, 10, 150)} />
          <Personagem t={t} x={760} y={FLOOR} s={0.74} v={VIS.comprador} seed={1} flip humor="feliz" />
          <Confete t={t} at={c.f_acontece} />
        </>
      ),
      html: (t) => (
        <>
          <Carimbo t={t} at={c.f_acontece - 0.1} x={540} y={560} texto="COM DATA: ACONTECE" cor="green" size={52} rot={-4} />
          <Etiqueta t={t} at={c.f_esfria - 0.2} x={540} y={760} texto="SEM DATA: ESFRIA" cor="red" size={38} />
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
