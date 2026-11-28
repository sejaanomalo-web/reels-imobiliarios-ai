import React from "react";
import { prog } from "../../../lib/anim";
import type { Timeline } from "../../types";
import { aa } from "../../NOV26/kit";
import {
  Balao, Barra, CamCartoon, Carimbo, type Clima, Confete, Etiqueta, Flash, Holofote,
  Personagem, Pop, Raios, Selo, VIS, acentosDe, gesto, pop,
} from "../../../estilos/cartoon";
import { Celular } from "../../ATIVO-D1204-10/scenes/Scenes";

/**
 * ATIVO-D1215-21 — "O cliente que não apareceu" (grade 15/12/2026 · 21h · CORRETOR NA VIDA REAL · Cartoon explicativo).
 * O corretor chega, abre o imóvel, e o cliente não aparece → não é maldade: esqueceu, o dia mudou → na saúde, lembretes
 * reduzem as faltas em cerca de um quarto (barras de faltas, sem números na tela) → visita marcada precisa de lembrete →
 * na véspera e 2 h antes, com pergunta que pede resposta → visita confirmada acontece. Robotham et al., BMJ Open 2016.
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
  const t1 = c.m_maldade - 0.4;
  const t2 = c.e_saude - 0.1;
  const t3 = c.v_lembrete - 0.4;
  const t4 = c.a_confirme - 0.35;
  const t5 = c.d_confirmada - 0.45;
  const tFim = c.cta_quer - 0.05;
  return [
    {
      id: "1 ninguém", a: 0, b: t1, clima: "conflito", vin: 0.88, push: 0.012, hits: [c.h_chegou, c.h_abriu, c.h_apareceu], punch: [{ at: c.h_apareceu, s: 1.07 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={720} p={prog(t, 0, 0.3)} />
          <Personagem t={t} x={420} y={FLOOR} s={0.8} v={VIS.A} acentos={ac} humor={t > c.h_apareceu - 0.1 ? "triste" : "feliz"} braco={gesto(t, c.h_abriu - 0.1, 10, 100)} />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.h_abriu - 0.2} x={540} y={480} texto="IMÓVEL ABERTO, LUZES ACESAS" cor="white" size={36} />
          <Carimbo t={t} at={c.h_apareceu - 0.1} x={720} y={700} texto="NÃO APARECEU" cor="red" size={58} rot={6} />
        </>
      ),
      selo: (t) => <Selo t={t} at={0.1} texto="10H00" cor="red" />,
    },
    {
      id: "2 o porquê", a: t1, b: t2, clima: "pergunta", vin: 0.84, hits: [c.m_maldade, c.m_esqueceu, c.m_mudou], punch: [{ at: c.m_mudou, s: 1.05 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={720} p={0.7} />
          <Personagem t={t} x={560} y={FLOOR} s={0.8} v={VIS.comprador} seed={1} humor="espanto" fala={t > c.m_esqueceu - 0.2} />
          <Pop t={t} at={c.m_esqueceu - 0.2} x={330} y={820}><Balao texto="ESQUECI!" w={330} size={52} /></Pop>
          <Pop t={t} at={c.m_mudou - 0.3} x={790} y={700}><Balao texto="O DIA MUDOU…" w={420} size={46} cauda={-1} /></Pop>
        </>
      ),
      html: (t) => <Etiqueta t={t} at={c.m_maldade - 0.2} x={540} y={480} texto="NÃO É MALDADE" cor="white" size={42} />,
      selo: (t) => <Selo t={t} at={t1 + 0.05} texto="O PORQUÊ" />,
    },
    {
      id: "3 o estudo", a: t2, b: t3, clima: "explica", vin: 0.74, push: 0.01, hits: [c.e_saude, c.e_lembretes, c.e_faltas, c.e_quarto], punch: [{ at: c.e_quarto, s: 1.06 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} cor={aa(1)} p={0.6} />
          <Barra t={t} at={c.e_saude + 0.5} x={380} base={900} w={190} h={300} cor="#6B7080" rotulo="SEM LEMBRETE" />
          <Barra t={t} at={c.e_faltas - 0.1} x={700} base={900} w={190} h={215} rotulo="COM LEMBRETE" />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.e_saude - 0.05} x={540} y={420} texto="NA SAÚDE · REVISÃO DE ESTUDOS" cor="white" size={34} />
          <Etiqueta t={t} at={c.e_lembretes - 0.2} x={540} y={505} texto="FALTAS ÀS CONSULTAS" cor="white" size={30} />
          <Carimbo t={t} at={c.e_quarto - 0.1} x={700} y={560} texto="−1/4" cor="green" size={64} rot={-6} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t2 + 0.05} texto="FORA DA BOLHA" cor="green" />,
    },
    {
      id: "4 lembrete", a: t3, b: t4, clima: "explica", vin: 0.72, push: 0.012, hits: [c.v_lembrete], punch: [{ at: c.v_lembrete, s: 1.06 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} cor={aa(1)} p={0.6} />
          <Personagem t={t} x={540} y={FLOOR} s={0.8} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.v_lembrete - 0.1, 10, 130)} />
        </>
      ),
      html: (t) => <Carimbo t={t} at={c.v_lembrete - 0.25} x={540} y={640} texto="LEMBRETE" cor="green" size={70} rot={-4} />,
      selo: (t) => <Selo t={t} at={t3 + 0.05} texto="A VIRADA" cor="green" />,
    },
    {
      id: "5 a confirmação", a: t4, b: t5, clima: "ganho", vin: 0.68, push: 0.008, hits: [c.a_confirme, c.a_duas, c.a_resposta, c.a_esperar], punch: [{ at: c.a_esperar, s: 1.04 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={780} cor={aa(1)} />
          <Celular t={t} x={720} y={720} s={0.78} msgs={[
            { texto: ["AMANHÃ, 10H.", "TUDO CERTO?"], lado: "eu", at: c.a_confirme, verde: true },
            { texto: ["POSSO TE ESPERAR", "ÀS 10H?"], lado: "eu", at: c.a_esperar - 0.3, verde: true },
            { texto: ["SIM! JÁ ESTOU", "SAINDO"], lado: "ele", at: c.a_esperar + 0.8 },
          ]} />
          <Personagem t={t} x={260} y={FLOOR} s={0.7} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.a_confirme, 10, 100)} />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.a_confirme - 0.1} x={280} y={480} texto="NA VÉSPERA" cor="green" size={34} />
          <Etiqueta t={t} at={c.a_duas - 0.1} x={280} y={560} texto="E 2 H ANTES" cor="green" size={34} />
          <Etiqueta t={t} at={c.a_resposta - 0.2} x={280} y={640} texto="PEDE RESPOSTA" cor="white" size={34} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t4 + 0.05} texto="CONFIRME" cor="green" />,
    },
    {
      id: "6 acontece", a: t5, b: tFim, clima: "ganho", vin: 0.64, hits: [c.d_confirmada, c.d_acontece], punch: [{ at: c.d_acontece, s: 1.05 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} cor={aa(1)} />
          <Personagem t={t} x={330} y={FLOOR} s={0.74} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.d_confirmada, 10, 150)} />
          <Personagem t={t} x={760} y={FLOOR} s={0.74} v={VIS.comprador} seed={1} flip humor="feliz" fala={t > c.d_acontece - 0.3} />
          <Confete t={t} at={c.d_confirmada + 0.5} />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.d_confirmada - 0.2} x={540} y={480} texto="VISITA CONFIRMADA" cor="white" size={40} />
          <Carimbo t={t} at={c.d_confirmada + 0.5} x={540} y={680} texto="ACONTECE" cor="green" size={66} rot={-4} />
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
