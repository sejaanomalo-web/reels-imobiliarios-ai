import React from "react";
import { prog } from "../../../lib/anim";
import type { Timeline } from "../../types";
import { aa } from "../../NOV26/kit";
import {
  Balao, CamCartoon, Carimbo, Checklist, type Clima, Contador, Etiqueta, Flash, Holofote,
  Personagem, Pop, Raios, Selo, VIS, acentosDe, gesto, pop,
} from "../../../estilos/cartoon";
import { Celular } from "../../ATIVO-D1204-10/scenes/Scenes";

/**
 * ATIVO-D1205-08 — "42 horas" (grade 05/12/2026 · 08h · E SE…? · Cartoon explicativo).
 * O lead pergunta com o anúncio aberto → e se a resposta viesse em 5 minutos? → o levantamento (2.241 empresas): média de
 * 42 h; quase um quarto nunca respondeu → a dúvida passa → respostas prontas (disponível, financiamento, vaga) → não é
 * desinteresse, é espera. Apuração: Oldroyd, McElheran & Elkington (2011), HBR.
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
  const t1 = c.d_2mil - 1.2;
  const t2 = c.v_duvida - 0.5;
  const t3 = c.a_pronta - 0.5;
  const t4 = c.f_desinteresse - 0.8;
  const tFim = c.cta_quer - 0.05;
  return [
    {
      id: "1 e se em 5 minutos", a: 0, b: t1, clima: "pergunta", vin: 0.8, push: 0.012, hits: [c.h_cinco, c.h_anuncio], punch: [{ at: c.h_cinco, s: 1.05 }],
      svg: (t) => (
        <>
          <Holofote x={400} chao={FLOOR} w={620} p={prog(t, 0, 0.3)} />
          <Celular t={t} x={400} y={700} s={0.84} msgs={[{ texto: ["OI! AINDA ESTÁ", "DISPONÍVEL?"], lado: "ele", at: 0.3 }]} rodape="AGORA" rodapeAt={0.5} />
          <Personagem t={t} x={820} y={FLOOR} s={0.78} v={VIS.A} acentos={ac} humor="feliz" flip braco={gesto(t, c.h_cinco - 0.2, 10, 130)} />
        </>
      ),
      html: (t) => <Carimbo t={t} at={c.h_cinco - 0.03} x={800} y={560} texto="5 MINUTOS?" cor="green" size={56} rot={-5} />,
      selo: (t) => <Selo t={t} at={0.1} texto="E SE…?" />,
    },
    {
      id: "2 42 horas", a: t1, b: t2, clima: "conflito", vin: 0.86, hits: [c.d_42, c.d_quarto], punch: [{ at: c.d_42, s: 1.06 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={680} cor="#FFD9D4" />
          <Personagem t={t} x={540} y={FLOOR} s={0.8} v={VIS.comprador} seed={1} acentos={ac} humor={t > c.d_42 ? "triste" : "neutro"} olhar={Math.sin(t * 2)} />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={t1 + 0.3} x={540} y={470} texto="2.241 EMPRESAS · EUA · 2011" cor="white" size={34} />
          <Contador t={t} at={c.d_42 - 1.2} de={0} ate={42} x={540} y={640} dur={1.2} size={150} sufixo=" H" cor="red" />
          <Etiqueta t={t} at={c.d_42 + 0.2} x={540} y={760} texto="TEMPO MÉDIO DE RESPOSTA" cor="dark" size={32} />
          <Carimbo t={t} at={c.d_quarto - 0.03} x={540} y={880} texto="23% NUNCA RESPONDERAM" cor="red" size={44} rot={-4} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t1 + 0.05} texto="O LEVANTAMENTO" cor="red" />,
    },
    {
      id: "3 a dúvida passa", a: t2, b: t3, clima: "explica", vin: 0.82, hits: [c.v_duvida, c.v_passado],
      svg: (t) => {
        const passa = prog(t, c.v_passado - 0.3, 0.6);
        return (
          <>
            <Holofote x={540} chao={FLOOR} w={620} />
            <g opacity={1 - passa * 0.75}><Pop t={t} at={t2 + 0.2} x={540} y={800}><Balao texto="AINDA DISPONÍVEL?" w={520} size={44} /></Pop></g>
            <Personagem t={t} x={540} y={FLOOR} s={0.8} v={VIS.comprador} seed={1} acentos={ac} humor={passa > 0.5 ? "neutro" : "espanto"} olhar={passa > 0.5 ? -1 : 0} />
          </>
        );
      },
      html: (t) => <Etiqueta t={t} at={c.v_passado - 0.1} x={540} y={600} texto="A DÚVIDA PASSA" cor="red" size={40} />,
      selo: (t) => <Selo t={t} at={t2 + 0.05} texto="EM 42 HORAS…" />,
    },
    {
      id: "4 respostas prontas", a: t3, b: t4, clima: "explica", vin: 0.72, push: 0.012, hits: [c.a_disponivel, c.a_financiamento, c.a_vaga],
      svg: (t) => (
        <>
          <g transform="translate(540 650)"><Checklist t={t} titulo="RESPOSTAS PRONTAS" w={720} itens={[{ k: "AINDA DISPONÍVEL?", at: c.a_disponivel }, { k: "ACEITA FINANCIAMENTO?", at: c.a_financiamento }, { k: "TEM VAGA?", at: c.a_vaga }]} /></g>
          <Holofote x={540} chao={FLOOR} w={600} />
          <Personagem t={t} x={540} y={FLOOR + 40} s={0.66} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.a_pronta - 0.1, 10, 120)} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t3 + 0.05} texto="DEIXE PRONTO" cor="green" />,
    },
    {
      id: "5 esfria esperando", a: t4, b: tFim, clima: "ganho", vin: 0.66, hits: [c.f_desinteresse, c.f_esperando], punch: [{ at: c.f_esperando, s: 1.04 }],
      svg: (t) => (
        <>
          <Holofote x={400} chao={FLOOR} w={640} cor={aa(1)} />
          <Celular t={t} x={400} y={700} s={0.84} msgs={[
            { texto: ["OI! AINDA ESTÁ", "DISPONÍVEL?"], lado: "ele", at: 0 },
            { texto: ["SIM! QUER", "VISITAR AMANHÃ?"], lado: "eu", at: t4 + 0.3, verde: true },
          ]} rodape="EM 5 MIN" rodapeAt={t4 + 0.5} />
          <Personagem t={t} x={820} y={FLOOR} s={0.78} v={VIS.A} acentos={ac} humor="feliz" flip braco={gesto(t, c.f_esperando - 0.1, 10, 150)} />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.f_desinteresse - 0.1} x={800} y={520} texto="NÃO É DESINTERESSE" cor="white" size={32} />
          <Carimbo t={t} at={c.f_esperando - 0.03} x={800} y={650} texto="É A ESPERA" cor="red" size={56} rot={-5} />
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
