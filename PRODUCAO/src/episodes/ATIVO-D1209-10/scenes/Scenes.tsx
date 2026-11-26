import React from "react";
import { prog } from "../../../lib/anim";
import type { Timeline } from "../../types";
import { A, aa } from "../../NOV26/kit";
import { F } from "../../../theme";
import {
  Balao, CamCartoon, Carimbo, Checklist, type Clima, Confete, Etiqueta, Flash, Holofote,
  Personagem, Pop, Raios, Selo, VIS, acentosDe, gesto, pop,
} from "../../../estilos/cartoon";

/**
 * ATIVO-D1209-10 — "O áudio de cinco minutos" (grade 09/12/2026 · 10h · CORRETOR NA VIDA REAL · Cartoon explicativo).
 * O áudio de 5:00 no celular; o que importava estava no minuto quatro → três quartos, escola, teto de preço, perdidos entre a
 * cunhada e o trânsito → responder com outro áudio: se perde de novo → ouça inteiro e devolva por escrito, em tópicos, "está
 * certo?" → o cliente corrige na hora e a ficha fica pronta → áudio é conversa, por escrito é combinado. Rotina; sem estatística.
 */
const FLOOR = 1540;
export type Shot = {
  id: string; a: number; b: number; clima: Clima; vin?: number; push?: number;
  punch?: { at: number; s: number; x?: number; y?: number }[]; hits?: number[];
  svg?: (t: number) => React.ReactNode; html?: (t: number) => React.ReactNode; selo?: (t: number) => React.ReactNode; flash?: number;
};
const BARRAS = Array.from({ length: 34 }, (_, i) => 0.3 + 0.7 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.6)));
/** Celular com uma mensagem de áudio de 5:00; o trecho do minuto 4 acende. */
const AudioCel: React.FC<{ t: number; x: number; y: number; s?: number; toca: number; marca: number; dur?: string; quem?: string }> = ({ x, y, s = 1, toca, marca, dur = "5:00", quem = "CLIENTE" }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-200} y={-290} width={400} height={580} rx={40} fill="#000" opacity={0.35} transform="translate(12 16)" />
    <rect x={-200} y={-290} width={400} height={580} rx={40} fill="#1C2233" />
    <rect x={-180} y={-250} width={360} height={500} rx={18} fill="#F4F5F7" />
    <rect x={-180} y={-250} width={360} height={56} rx={18} fill="#2C3E66" />
    <circle cx={-140} cy={-222} r={16} fill="#C98C64" />
    <text x={-112} y={-210} fontFamily={F.sans} fontWeight={800} fontSize={30} fill="#fff">{quem}</text>
    <rect x={-160} y={-60} width={320} height={120} rx={26} fill="#FFFFFF" stroke="#0A0A0C" strokeWidth={5} />
    <circle cx={-118} cy={0} r={26} fill="#2C3E66" />
    <path d="M-126 -12 L-104 0 L-126 12 Z" fill="#fff" />
    {BARRAS.map((h, i) => {
      const bx = -80 + i * 6.6; const f = i / BARRAS.length;
      const noMarco = f > 0.74 && f < 0.86;
      const cor = noMarco && marca > 0.5 ? A.hex : f < toca ? "#2C3E66" : "#9AA3B5";
      return <rect key={i} x={bx} y={-h * 34} width={4} height={h * 68} rx={2} fill={cor} />;
    })}
    <text x={150} y={48} textAnchor="end" fontFamily={F.sans} fontWeight={800} fontSize={24} fill="#0A0A0C">{dur}</text>
    {marca > 0.01 && (
      <g opacity={marca}>
        <rect x={-80 + 0.74 * 224 - 6} y={-50} width={0.12 * 224 + 12} height={100} rx={10} fill="none" stroke={A.hex} strokeWidth={5} />
      </g>
    )}
  </g>
);

export const makeShots = (tl: Timeline): Shot[] => {
  const c = tl.cues;
  const ac = acentosDe(tl.captions);
  const t1 = c.c_quartos - 0.15;
  const t2 = c.e_outro - 0.6;
  const t3 = c.v_ouca - 0.5;
  const t4 = c.g_corrige - 0.6;
  const t5 = c.f_conversa - 0.6;
  const tFim = c.cta_quer - 0.05;
  return [
    {
      id: "1 o áudio", a: 0, b: t1, clima: "pergunta", vin: 0.8, push: 0.012, hits: [c.h_audio, c.h_cinco, c.h_quatro], punch: [{ at: c.h_cinco, s: 1.05 }, { at: c.h_quatro, s: 1.06 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} p={prog(t, 0, 0.3)} />
          <Pop t={t} at={c.h_audio - 0.3} x={540} y={680}><AudioCel t={t} x={0} y={0} s={0.82} toca={prog(t, c.h_audio, c.h_quatro - c.h_audio) * 0.8} marca={prog(t, c.h_quatro - 0.1, 0.3)} /></Pop>
          <Personagem t={t} x={330} y={FLOOR} s={0.72} v={VIS.A} acentos={ac} humor={t > c.h_cinco ? "espanto" : "neutro"} />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.h_cinco - 0.1} x={820} y={410} texto="5 MINUTOS" cor="red" size={34} />
          <Etiqueta t={t} at={c.h_quatro - 0.1} x={760} y={880} texto="NO MINUTO 4" cor="green" size={34} />
        </>
      ),
      selo: (t) => <Selo t={t} at={0.1} texto="O ÁUDIO" />,
    },
    {
      id: "2 o que importava", a: t1, b: t2, clima: "explica", vin: 0.78, push: 0.01, hits: [c.c_quartos, c.c_escola, c.c_teto, c.c_cunhada, c.c_transito],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={720} p={0.7} />
          <Personagem t={t} x={330} y={FLOOR} s={0.72} v={VIS.A} acentos={ac} humor={t > c.c_cunhada ? "triste" : "feliz"} />
          <Personagem t={t} x={780} y={FLOOR} s={0.72} v={VIS.comprador} seed={1} flip humor="feliz" fala />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.c_quartos - 0.1} x={540} y={450} texto="3 QUARTOS" cor="green" size={40} />
          <Etiqueta t={t} at={c.c_escola - 0.1} x={540} y={540} texto="PERTO DA ESCOLA" cor="green" size={40} />
          <Etiqueta t={t} at={c.c_teto - 0.1} x={540} y={630} texto="TETO DE PREÇO" cor="green" size={40} />
          <Etiqueta t={t} at={c.c_cunhada - 0.1} x={330} y={760} texto="A REFORMA DA CUNHADA" cor="white" size={32} />
          <Etiqueta t={t} at={c.c_transito - 0.1} x={760} y={830} texto="O TRÂNSITO" cor="white" size={32} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t1 + 0.05} texto="O QUE IMPORTAVA" cor="green" />,
    },
    {
      id: "3 outro áudio", a: t2, b: t3, clima: "conflito", vin: 0.86, hits: [c.e_outro, c.e_perde], punch: [{ at: c.e_perde, s: 1.07 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={720} cor="#FFD9D4" />
          <Personagem t={t} x={330} y={FLOOR} s={0.72} v={VIS.A} acentos={ac} humor={t > c.e_perde - 0.1 ? "espanto" : "feliz"} fala={t < c.e_perde} />
          <Personagem t={t} x={780} y={FLOOR} s={0.72} v={VIS.comprador} seed={1} flip humor={t > c.e_perde ? "triste" : "neutro"} />
          <Pop t={t} at={c.e_outro - 0.1} x={540} y={650}><AudioCel t={t} x={0} y={0} s={0.76} toca={0.2} marca={0} dur="3:40" quem="VOCÊ" /></Pop>
        </>
      ),
      html: (t) => <Carimbo t={t} at={c.e_perde - 0.03} x={540} y={830} texto="SE PERDE DE NOVO" cor="red" size={52} rot={-5} />,
      selo: (t) => <Selo t={t} at={t2 + 0.05} texto="ÁUDIO COM ÁUDIO" cor="red" />,
    },
    {
      id: "4 por escrito", a: t3, b: t4, clima: "explica", vin: 0.72, push: 0.01, hits: [c.v_ouca, c.v_escrito, c.v_topicos, c.v_certo], punch: [{ at: c.v_certo, s: 1.05 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} cor={aa(1)} p={0.6} />
          <Pop t={t} at={c.v_topicos - 0.3} x={540} y={640}><g transform="scale(0.78)">
            <Checklist t={t} titulo="ENTENDI ASSIM:" itens={[{ k: "3 QUARTOS", at: c.v_topicos + 0.5 }, { k: "PERTO DA ESCOLA", at: c.v_topicos + 1.3 }, { k: "ATÉ O TETO DE PREÇO", at: c.v_topicos + 2.1 }]} />
          </g></Pop>
          <Personagem t={t} x={300} y={FLOOR} s={0.72} v={VIS.A} acentos={ac} humor="feliz" fala={t > c.v_certo - 0.2} braco={gesto(t, c.v_escrito - 0.1, 10, 120)} />
          <Personagem t={t} x={790} y={FLOOR} s={0.72} v={VIS.comprador} seed={1} flip humor="neutro" />
        </>
      ),
      html: (t) => (
        <>
          {t < c.v_topicos - 0.3 ? <Etiqueta t={t} at={c.v_ouca - 0.1} x={540} y={470} texto="OUÇA INTEIRO" cor="white" size={38} /> : null}
          {t < c.v_topicos - 0.3 ? <Etiqueta t={t} at={c.v_escrito - 0.1} x={540} y={560} texto="DEVOLVA POR ESCRITO" cor="green" size={38} /> : null}
          <Carimbo t={t} at={c.v_certo - 0.05} x={540} y={880} texto="ESTÁ CERTO?" cor="green" size={50} rot={-4} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t3 + 0.05} texto="A VIRADA" cor="green" />,
    },
    {
      id: "5 corrige e ficha", a: t4, b: t5, clima: "ganho", vin: 0.68, push: 0.01, hits: [c.g_corrige, c.g_ficha], punch: [{ at: c.g_ficha, s: 1.05 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} cor={aa(1)} />
          <Personagem t={t} x={300} y={FLOOR} s={0.72} v={VIS.A} acentos={ac} humor="feliz" />
          <Personagem t={t} x={790} y={FLOOR} s={0.72} v={VIS.comprador} seed={1} flip humor="feliz" fala={t < c.g_ficha} braco={gesto(t, c.g_corrige - 0.1, 10, 150)} />
          <Pop t={t} at={c.g_corrige - 0.1} x={760} y={560}><Balao texto="QUASE: FALTOU A GARAGEM!" w={460} size={32} cauda={-1} /></Pop>
        </>
      ),
      html: (t) => <Carimbo t={t} at={c.g_ficha - 0.05} x={540} y={820} texto="FICHA PRONTA" cor="green" size={56} rot={-4} />,
      selo: (t) => <Selo t={t} at={t4 + 0.05} texto="NA HORA" cor="green" />,
    },
    {
      id: "6 combinado", a: t5, b: tFim, clima: "ganho", vin: 0.64, hits: [c.f_conversa, c.f_combinado], punch: [{ at: c.f_combinado, s: 1.05 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} cor={aa(1)} />
          <Personagem t={t} x={330} y={FLOOR} s={0.72} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.f_combinado - 0.1, 10, 150)} />
          <Personagem t={t} x={760} y={FLOOR} s={0.72} v={VIS.comprador} seed={1} flip humor="feliz" />
          <Confete t={t} at={c.f_combinado + 0.1} />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.f_conversa - 0.1} x={540} y={480} texto="ÁUDIO É CONVERSA" cor="white" size={38} />
          <Carimbo t={t} at={c.f_combinado - 0.05} x={540} y={660} texto="POR ESCRITO É COMBINADO" cor="green" size={50} rot={-4} />
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
