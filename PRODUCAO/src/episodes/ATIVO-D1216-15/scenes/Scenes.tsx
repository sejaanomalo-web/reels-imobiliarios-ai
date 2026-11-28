import React from "react";
import { prog } from "../../../lib/anim";
import type { Timeline } from "../../types";
import { aa } from "../../NOV26/kit";
import {
  Barra, CamCartoon, Carimbo, type Clima, Confete, Etiqueta, Flash, Holofote,
  Personagem, Raios, Selo, VIS, acentosDe, gesto, pop,
} from "../../../estilos/cartoon";
import { Celular } from "../../ATIVO-D1204-10/scenes/Scenes";

/**
 * ATIVO-D1216-15 — "O trajeto no horário de pico" (grade 16/12/2026 · 15h · IDEIA QUE MUDA O JOGO · Cartoon explicativo).
 * O casal amou a casa e descobriu o trânsito depois → pesquisa alemã: trajeto mais longo, menos satisfação (barras sem
 * números) → a casa bonita não compensa → o trajeto faz parte do imóvel → calcule com o cliente o trajeto até o trabalho
 * no pico → tempo para viver na casa. Stutzer & Frey (2008), Scandinavian Journal of Economics.
 */
const FLOOR = 1540;
export type Shot = {
  id: string; a: number; b: number; clima: Clima; vin?: number; push?: number;
  punch?: { at: number; s: number; x?: number; y?: number }[]; hits?: number[];
  svg?: (t: number) => React.ReactNode; html?: (t: number) => React.ReactNode; selo?: (t: number) => React.ReactNode; flash?: number;
};

/** Fila de carros (recorte 2D), entra da direita. */
const Fila: React.FC<{ t: number; at: number; y: number }> = ({ t, at, y }) => {
  const k = prog(t, at - 0.2, 0.6);
  if (k <= 0) return null;
  const cores = ["#C9C3B8", "#8A93A6", "#B84A3A", "#6B7080", "#C9C3B8"];
  return (
    <g transform={`translate(${(1 - k) * 600} 0)`}>
      {cores.map((cor, i) => (
        <g key={i} transform={`translate(${60 + i * 200 + Math.sin(t * 2 + i) * 3} ${y})`}>
          <rect x={0} y={-50} width={170} height={52} rx={14} fill={cor} stroke="#0A0A0C" strokeWidth={5} />
          <rect x={36} y={-82} width={96} height={36} rx={10} fill={cor} stroke="#0A0A0C" strokeWidth={5} />
          <circle cx={36} cy={4} r={16} fill="#0A0A0C" />
          <circle cx={134} cy={4} r={16} fill="#0A0A0C" />
        </g>
      ))}
    </g>
  );
};

export const makeShots = (tl: Timeline): Shot[] => {
  const c = tl.cues;
  const ac = acentosDe(tl.captions);
  const t1 = c.p_alema - 0.4;
  const t2 = c.c_bonita - 0.4;
  const t3 = c.v_trajeto - 0.4;
  const t4 = c.a_calcule - 0.35;
  const t5 = c.d_tempo - 0.45;
  const tFim = c.cta_quer - 0.05;
  return [
    {
      id: "1 o trânsito", a: 0, b: t1, clima: "conflito", vin: 0.86, push: 0.012, hits: [c.h_amou, c.h_transito, c.h_mudanca], punch: [{ at: c.h_transito, s: 1.06 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} p={prog(t, 0, 0.3)} />
          <Fila t={t} at={c.h_transito} y={900} />
          <Personagem t={t} x={360} y={FLOOR} s={0.74} v={VIS.B} seed={3} humor={t > c.h_mudanca - 0.2 ? "espanto" : "feliz"} />
          <Personagem t={t} x={640} y={FLOOR} s={0.74} v={VIS.comprador} seed={1} flip humor={t > c.h_mudanca - 0.2 ? "espanto" : "feliz"} />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.h_amou - 0.2} x={540} y={480} texto="AMOU A CASA" cor="white" size={42} />
          <Carimbo t={t} at={c.h_transito - 0.1} x={540} y={680} texto="E O TRÂNSITO?" cor="red" size={58} rot={5} />
        </>
      ),
      selo: (t) => <Selo t={t} at={0.1} texto="DEPOIS DA MUDANÇA" cor="red" />,
    },
    {
      id: "2 a pesquisa", a: t1, b: t2, clima: "explica", vin: 0.76, push: 0.01, hits: [c.p_alema, c.p_tempo, c.p_satisfeito], punch: [{ at: c.p_satisfeito, s: 1.05 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} cor={aa(1)} p={0.6} />
          <Barra t={t} at={c.p_tempo - 0.2} x={370} base={900} w={190} h={300} rotulo="TRAJETO CURTO" />
          <Barra t={t} at={c.p_satisfeito - 0.3} x={710} base={900} w={190} h={170} cor="#6B7080" rotulo="TRAJETO LONGO" />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.p_alema - 0.2} x={540} y={420} texto="PESQUISA ALEMÃ" cor="white" size={38} />
          <Etiqueta t={t} at={c.p_satisfeito - 0.3} x={540} y={505} texto="SATISFAÇÃO COM A VIDA (MÉDIA)" cor="white" size={30} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t1 + 0.05} texto="FORA DA BOLHA" cor="green" />,
    },
    {
      id: "3 não compensa", a: t2, b: t3, clima: "conflito", vin: 0.88, push: 0.01, hits: [c.c_bonita, c.c_compensa], punch: [{ at: c.c_compensa, s: 1.06 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} cor="#FFD9D4" p={0.7} />
          <Fila t={t} at={t2} y={900} />
          <Personagem t={t} x={360} y={FLOOR} s={0.74} v={VIS.B} seed={3} humor="triste" />
          <Personagem t={t} x={640} y={FLOOR} s={0.74} v={VIS.comprador} seed={1} flip humor="triste" />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.c_bonita - 0.2} x={540} y={480} texto="A CASA BONITA" cor="white" size={42} />
          <Carimbo t={t} at={c.c_compensa - 0.1} x={540} y={680} texto="NÃO COMPENSA" cor="red" size={60} rot={-5} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t2 + 0.05} texto="TODO DIA" cor="red" />,
    },
    {
      id: "4 o trajeto", a: t3, b: t4, clima: "explica", vin: 0.72, push: 0.012, hits: [c.v_trajeto, c.v_imovel], punch: [{ at: c.v_imovel, s: 1.06 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} cor={aa(1)} p={0.6} />
          <Personagem t={t} x={540} y={FLOOR} s={0.8} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.v_imovel - 0.1, 10, 130)} />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.v_trajeto - 0.2} x={540} y={480} texto="O TRAJETO" cor="white" size={44} />
          <Carimbo t={t} at={c.v_imovel - 0.4} x={540} y={680} texto="FAZ PARTE DO IMÓVEL" cor="green" size={48} rot={-4} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t3 + 0.05} texto="A VIRADA" cor="green" />,
    },
    {
      id: "5 calcule", a: t4, b: t5, clima: "ganho", vin: 0.68, push: 0.008, hits: [c.a_calcule, c.a_trabalho, c.a_pico], punch: [{ at: c.a_pico, s: 1.04 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={780} cor={aa(1)} />
          <Celular t={t} x={730} y={720} s={0.76} msgs={[
            { texto: ["VAMOS CALCULAR", "O TRAJETO?"], lado: "eu", at: c.a_calcule, verde: true },
            { texto: ["CASA → TRABALHO", "ÀS 8H DA MANHÃ"], lado: "eu", at: c.a_pico - 0.2, verde: true },
          ]} />
          <Personagem t={t} x={250} y={FLOOR} s={0.7} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.a_calcule, 10, 100)} />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.a_calcule - 0.1} x={270} y={480} texto="CALCULE JUNTO" cor="green" size={34} />
          <Etiqueta t={t} at={c.a_trabalho - 0.1} x={270} y={560} texto="ATÉ O TRABALHO" cor="green" size={34} />
          <Etiqueta t={t} at={c.a_pico - 0.1} x={270} y={640} texto="NO PICO" cor="white" size={34} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t4 + 0.05} texto="ANTES DE MOSTRAR" cor="green" />,
    },
    {
      id: "6 tempo para viver", a: t5, b: tFim, clima: "ganho", vin: 0.64, hits: [c.d_tempo, c.d_viver], punch: [{ at: c.d_viver, s: 1.05 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} cor={aa(1)} />
          <Personagem t={t} x={360} y={FLOOR} s={0.74} v={VIS.B} seed={3} humor="feliz" braco={gesto(t, c.d_tempo, 10, 150)} />
          <Personagem t={t} x={640} y={FLOOR} s={0.74} v={VIS.comprador} seed={1} flip humor="feliz" fala={t > c.d_viver - 0.2} />
          <Confete t={t} at={c.d_tempo + 0.3} />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.d_tempo - 0.2} x={540} y={480} texto="TEMPO PARA VIVER" cor="white" size={42} />
          <Carimbo t={t} at={c.d_tempo + 0.2} x={540} y={680} texto="A CASA CERTA" cor="green" size={64} rot={-4} />
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
