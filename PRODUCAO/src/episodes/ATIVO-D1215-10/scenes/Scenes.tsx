import React from "react";
import { prog } from "../../../lib/anim";
import type { Timeline } from "../../types";
import { A, aa } from "../../NOV26/kit";
import {
  CamCartoon, Carimbo, type Clima, Confete, Etiqueta, Flash, Holofote,
  Personagem, Pop, Raios, Selo, VIS, type Visual, acentosDe, gesto, pop,
} from "../../../estilos/cartoon";

/**
 * ATIVO-D1215-10 — "A criança na visita" (grade 15/12/2026 · 10h · CORRETOR NA VIDA REAL · Cartoon explicativo).
 * A visita ia bem até a criança começar a correr → os pais passam a visita cuidando do filho → saem sem lembrar da
 * cozinha nem do quarto → a criança também precisa de uma tarefa → papel e lápis: desenhe o seu quarto → criança ocupada,
 * pais atentos, o quarto já tem dono. Rotina; sem estatística.
 */
const FLOOR = 1540;
const CRIANCA: Visual = { terno: "#B84A3A", sombraTerno: "#963B2E", pele: "#E2A983", cabelo: "#3A2418", calca: "#2E3442", camisa: "#B84A3A", cabeloTipo: "curto" };
export type Shot = {
  id: string; a: number; b: number; clima: Clima; vin?: number; push?: number;
  punch?: { at: number; s: number; x?: number; y?: number }[]; hits?: number[];
  svg?: (t: number) => React.ReactNode; html?: (t: number) => React.ReactNode; selo?: (t: number) => React.ReactNode; flash?: number;
};

/** O desenho da criança: folha com o quarto (cama, janela, estrela). Centro (0,0). */
const Desenho: React.FC<{ t: number; at: number }> = ({ t, at }) => {
  const k = prog(t, at, 1.6);
  return (
    <g transform="rotate(-4)">
      <rect x={-170} y={-125} width={340} height={250} rx={10} fill="#000" opacity={0.3} transform="translate(10 12)" />
      <rect x={-170} y={-125} width={340} height={250} rx={10} fill="#F6F2EA" />
      <g fill="none" stroke="#2C3E66" strokeWidth={7} strokeLinecap="round" strokeLinejoin="round">
        <path d="M-120 70 H40 V20 H-120 Z" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - Math.min(1, k * 2)} />
        <path d="M-120 20 V-10 H-80 V20" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - Math.min(1, Math.max(0, k * 2 - 0.4))} />
        <rect x={70} y={-90} width={70} height={60} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - Math.min(1, Math.max(0, k * 2 - 0.8))} />
      </g>
      <path d="M105 50 l10 22 l24 2 l-18 16 l6 24 l-22 -12 l-22 12 l6 -24 l-18 -16 l24 -2 Z" fill={A.hex} opacity={Math.max(0, k * 2 - 1.2) > 0 ? 1 : 0} transform="scale(0.8) translate(10 -40)" />
    </g>
  );
};

export const makeShots = (tl: Timeline): Shot[] => {
  const c = tl.cues;
  const ac = acentosDe(tl.captions);
  const t1 = c.p_pais - 0.4;
  const t2 = c.e_cozinha - 0.5;
  const t3 = c.v_tarefa - 0.4;
  const t4 = c.a_papel - 0.4;
  const t5 = c.d_ocupada - 0.45;
  const tFim = c.cta_quer - 0.05;
  const corre = (t: number, x0: number, amp: number) => x0 + amp * Math.sin(t * 3.1);
  return [
    {
      id: "1 a correria", a: 0, b: t1, clima: "pergunta", vin: 0.86, push: 0.012, hits: [c.h_bem, c.h_crianca, c.h_correr], punch: [{ at: c.h_correr, s: 1.06 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} p={prog(t, 0, 0.3)} />
          <Personagem t={t} x={250} y={FLOOR} s={0.7} v={VIS.B} seed={3} humor={t > c.h_correr - 0.1 ? "espanto" : "feliz"} />
          <Personagem t={t} x={470} y={FLOOR} s={0.7} v={VIS.comprador} seed={1} humor={t > c.h_correr - 0.1 ? "espanto" : "feliz"} />
          <Personagem t={t} x={t > c.h_crianca - 0.3 ? corre(t, 800, 110) : 720} y={FLOOR} s={0.46} v={CRIANCA} seed={5} humor="feliz" flip={Math.cos(t * 3.1) < 0} braco={t > c.h_correr - 0.2 ? 120 + 30 * Math.sin(t * 9) : 8} bracoE={t > c.h_correr - 0.2 ? -120 : -8} />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.h_bem - 0.2} x={540} y={480} texto="A VISITA IA BEM…" cor="white" size={40} />
          <Carimbo t={t} at={c.h_correr - 0.1} x={720} y={690} texto="CORRENDO!" cor="red" size={60} rot={6} />
        </>
      ),
      selo: (t) => <Selo t={t} at={0.1} texto="A VISITA" />,
    },
    {
      id: "2 cuidando do filho", a: t1, b: t2, clima: "conflito", vin: 0.88, hits: [c.p_pais, c.p_cuidando, c.p_olham], punch: [{ at: c.p_olham, s: 1.07 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} cor="#FFD9D4" />
          <Personagem t={t} x={corre(t, 560, 60)} y={FLOOR} s={0.7} v={VIS.B} seed={3} humor="bravo" flip={Math.cos(t * 3.1) < 0} braco={gesto(t, c.p_cuidando - 0.1, 10, 110)} />
          <Personagem t={t} x={260} y={FLOOR} s={0.7} v={VIS.comprador} seed={1} humor="espanto" />
          <Personagem t={t} x={corre(t, 820, 90)} y={FLOOR} s={0.46} v={CRIANCA} seed={5} humor="feliz" flip={Math.cos(t * 3.1) < 0} braco={120 + 30 * Math.sin(t * 9)} bracoE={-120} />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.p_cuidando - 0.2} x={540} y={480} texto="CUIDANDO DO FILHO" cor="white" size={40} />
          <Carimbo t={t} at={c.p_olham - 0.1} x={540} y={690} texto="E O IMÓVEL?" cor="red" size={60} rot={-5} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t1 + 0.05} texto="OS PAIS" cor="red" />,
    },
    {
      id: "3 sem lembrar", a: t2, b: t3, clima: "conflito", vin: 0.86, push: 0.01, hits: [c.e_cozinha, c.e_quarto], punch: [{ at: c.e_quarto, s: 1.05 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} p={0.6} />
          <Personagem t={t} x={380} y={FLOOR} s={0.7} v={VIS.B} seed={3} humor="triste" />
          <Personagem t={t} x={640} y={FLOOR} s={0.7} v={VIS.comprador} seed={1} humor="triste" flip />
        </>
      ),
      html: (t) => (
        <>
          <Carimbo t={t} at={c.e_cozinha - 0.15} x={330} y={560} texto="A COZINHA?" cor="red" size={50} rot={-6} />
          <Carimbo t={t} at={c.e_quarto - 0.15} x={740} y={720} texto="O QUARTO?" cor="red" size={50} rot={5} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t2 + 0.05} texto="NA SAÍDA" cor="red" />,
    },
    {
      id: "4 uma tarefa", a: t3, b: t4, clima: "explica", vin: 0.72, push: 0.012, hits: [c.v_tarefa], punch: [{ at: c.v_tarefa, s: 1.06 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} cor={aa(1)} p={0.6} />
          <Personagem t={t} x={540} y={FLOOR} s={0.8} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.v_tarefa - 0.1, 10, 130)} />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.v_tarefa - 0.4} x={540} y={480} texto="A CRIANÇA TAMBÉM PRECISA DE" cor="white" size={34} />
          <Carimbo t={t} at={c.v_tarefa - 0.1} x={540} y={680} texto="UMA TAREFA" cor="green" size={64} rot={-4} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t3 + 0.05} texto="A VIRADA" cor="green" />,
    },
    {
      id: "5 o desenho", a: t4, b: t5, clima: "ganho", vin: 0.68, push: 0.008, hits: [c.a_papel, c.a_lapis, c.a_desenhar, c.a_quarto], punch: [{ at: c.a_quarto, s: 1.05 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={780} cor={aa(1)} />
          <Pop t={t} at={c.a_papel - 0.2} x={640} y={760}><Desenho t={t} at={c.a_desenhar - 0.2} /></Pop>
          <Personagem t={t} x={280} y={FLOOR} s={0.7} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.a_papel - 0.1, 10, 100)} />
          <Personagem t={t} x={820} y={FLOOR} s={0.46} v={CRIANCA} seed={5} humor="feliz" flip braco={gesto(t, c.a_desenhar, 10, 70)} />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.a_papel - 0.1} x={540} y={460} texto="PAPEL E LÁPIS" cor="white" size={40} />
          <Etiqueta t={t} at={c.a_quarto - 0.2} x={540} y={565} texto="DESENHE O SEU QUARTO" cor="green" size={36} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t4 + 0.05} texto="NA PASTA" cor="green" />,
    },
    {
      id: "6 o quarto tem dono", a: t5, b: tFim, clima: "ganho", vin: 0.64, hits: [c.d_ocupada, c.d_atentos, c.d_dono], punch: [{ at: c.d_atentos + 0.6, s: 1.05 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={780} cor={aa(1)} />
          <Personagem t={t} x={230} y={FLOOR} s={0.66} v={VIS.B} seed={3} humor="feliz" />
          <Personagem t={t} x={430} y={FLOOR} s={0.66} v={VIS.comprador} seed={1} humor="feliz" fala={t > c.d_atentos} />
          <Personagem t={t} x={800} y={FLOOR} s={0.46} v={CRIANCA} seed={5} humor="feliz" flip braco={gesto(t, c.d_atentos + 0.5, 10, 160)} />
          <Confete t={t} at={c.d_atentos + 0.6} />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.d_ocupada - 0.2} x={540} y={480} texto="CRIANÇA OCUPADA, PAIS ATENTOS" cor="white" size={36} />
          <Carimbo t={t} at={c.d_atentos + 0.5} x={540} y={690} texto="O QUARTO JÁ TEM DONO" cor="green" size={50} rot={-4} />
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
