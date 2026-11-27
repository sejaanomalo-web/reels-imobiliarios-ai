import React from "react";
import { prog } from "../../../lib/anim";
import type { Timeline } from "../../types";
import { aa } from "../../NOV26/kit";
import {
  Balao, Barra, CamCartoon, Carimbo, type Clima, Confete, Etiqueta, Flash, Holofote,
  Personagem, Pop, Raios, Selo, VIS, type Visual, acentosDe, gesto, pop,
} from "../../../estilos/cartoon";
import { Celular } from "../../ATIVO-D1204-10/scenes/Scenes";

/**
 * ATIVO-D1214-15 — "As palavras do cliente" (grade 14/12/2026 · 15h · IDEIA QUE MUDA O JOGO · Cartoon explicativo).
 * Uma garçonete ganha gorjetas maiores sem sorrir mais → 2003, Holanda: repete o pedido com as mesmas palavras em metade
 * das mesas → nessas mesas, gorjeta maior (barras, sem números) → ouvir a própria frase prova atenção → anote as palavras
 * exatas: "quintal para o cachorro", não "área externa" → quem repete mostra que ouviu. van Baaren et al. (2003).
 */
const FLOOR = 1540;
const GARCONETE: Visual = { terno: "#1E1E24", sombraTerno: "#15151A", pele: "#E2A983", cabelo: "#6B3A1E", calca: "#1C2233", camisa: "#1E1E24", cabeloTipo: "coque" };
export type Shot = {
  id: string; a: number; b: number; clima: Clima; vin?: number; push?: number;
  punch?: { at: number; s: number; x?: number; y?: number }[]; hits?: number[];
  svg?: (t: number) => React.ReactNode; html?: (t: number) => React.ReactNode; selo?: (t: number) => React.ReactNode; flash?: number;
};

export const makeShots = (tl: Timeline): Shot[] => {
  const c = tl.cues;
  const ac = acentosDe(tl.captions);
  const t1 = c.e_2003 - 0.4;
  const t2 = c.r_maiores - 2.3;
  const t3 = c.v_propria - 0.4;
  const t4 = c.a_anote - 0.4;
  const t5 = c.d_repete - 0.45;
  const tFim = c.cta_quer - 0.05;
  return [
    {
      id: "1 a garçonete", a: 0, b: t1, clima: "pergunta", vin: 0.86, push: 0.012, hits: [c.h_garconete, c.h_gorjetas, c.h_sorrir], punch: [{ at: c.h_gorjetas, s: 1.06 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={720} p={prog(t, 0, 0.3)} />
          <Personagem t={t} x={540} y={FLOOR} s={0.8} v={GARCONETE} seed={2} humor={t > c.h_sorrir - 0.1 ? "neutro" : "feliz"} braco={gesto(t, c.h_gorjetas - 0.1, 10, 120)} />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.h_garconete - 0.1} x={540} y={480} texto="UMA GARÇONETE" cor="white" size={40} />
          <Carimbo t={t} at={c.h_gorjetas - 0.1} x={540} y={680} texto="GORJETAS MAIORES" cor="green" size={56} rot={-5} />
        </>
      ),
      selo: (t) => <Selo t={t} at={0.1} texto="O MISTÉRIO" />,
    },
    {
      id: "2 o pedido repetido", a: t1, b: t2, clima: "explica", vin: 0.8, push: 0.01, hits: [c.e_2003, c.e_repetiu, c.e_mesmas], punch: [{ at: c.e_mesmas, s: 1.05 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={780} p={0.7} />
          <Personagem t={t} x={290} y={FLOOR} s={0.7} v={VIS.comprador} seed={1} humor="neutro" fala={t > c.e_repetiu - 0.4 && t < c.e_mesmas - 0.2} />
          <Personagem t={t} x={790} y={FLOOR} s={0.7} v={GARCONETE} seed={2} flip humor="feliz" fala={t > c.e_mesmas - 0.1 && t < c.e_mesmas + 1.2} />
          <Pop t={t} at={c.e_repetiu - 0.4} x={300} y={880}><Balao texto="UM SUCO SEM GELO" w={440} size={40} /></Pop>
          <Pop t={t} at={c.e_mesmas - 0.1} x={780} y={780}><Balao texto="UM SUCO SEM GELO" w={440} size={40} cor={aa(1)} cauda={-1} /></Pop>
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.e_2003 - 0.1} x={540} y={480} texto="2003 · HOLANDA" cor="white" size={40} />
          <Carimbo t={t} at={c.e_mesmas + 0.6} x={540} y={620} texto="AS MESMAS PALAVRAS" cor="green" size={48} rot={-4} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t1 + 0.05} texto="O ESTUDO" />,
    },
    {
      id: "3 o resultado", a: t2, b: t3, clima: "ganho", vin: 0.72, push: 0.01, hits: [c.r_maiores], punch: [{ at: c.r_maiores, s: 1.06 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} cor={aa(1)} p={0.6} />
          <Barra t={t} at={t2 + 0.3} x={370} base={880} w={190} h={170} cor="#6B7080" rotulo="NÃO REPETIU" />
          <Barra t={t} at={c.r_maiores - 0.15} x={710} base={880} w={190} h={340} rotulo="REPETIU" />
        </>
      ),
      html: (t) => <Etiqueta t={t} at={t2 + 0.1} x={540} y={420} texto="GORJETA POR MESA" cor="white" size={36} />,
      selo: (t) => <Selo t={t} at={t2 + 0.05} texto="O RESULTADO" cor="green" />,
    },
    {
      id: "4 atenção", a: t3, b: t4, clima: "explica", vin: 0.72, push: 0.012, hits: [c.v_propria, c.v_atencao], punch: [{ at: c.v_atencao, s: 1.06 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} cor={aa(1)} p={0.6} />
          <Personagem t={t} x={540} y={FLOOR} s={0.8} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.v_atencao - 0.1, 10, 130)} />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.v_propria - 0.2} x={540} y={480} texto="A PRÓPRIA FRASE DE VOLTA" cor="white" size={38} />
          <Carimbo t={t} at={c.v_propria + 1.0} x={540} y={680} texto="= ATENÇÃO" cor="green" size={64} rot={-4} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t3 + 0.05} texto="A VIRADA" cor="green" />,
    },
    {
      id: "5 as palavras exatas", a: t4, b: t5, clima: "ganho", vin: 0.68, push: 0.008, hits: [c.a_anote, c.a_quintal, c.a_area], punch: [{ at: c.a_area, s: 1.05 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={780} cor={aa(1)} />
          <Celular t={t} x={760} y={720} s={0.72} msgs={[{ texto: ["ACHEI UMA CASA", "COM QUINTAL PARA", "O CACHORRO!"], lado: "eu", at: c.a_quintal + 0.7, verde: true }]} />
          <Personagem t={t} x={290} y={FLOOR} s={0.66} v={VIS.comprador} seed={1} humor="feliz" fala={t > c.a_quintal - 0.3 && t < c.a_quintal + 1.4} />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.a_anote - 0.1} x={540} y={480} texto="ANOTE AS PALAVRAS EXATAS" cor="green" size={38} />
          <Etiqueta t={t} at={c.a_quintal - 0.2} x={300} y={660} texto="“QUINTAL PARA O CACHORRO”" cor="white" size={30} />
          <Carimbo t={t} at={c.a_area - 0.1} x={300} y={800} texto="NÃO: “ÁREA EXTERNA”" cor="red" size={40} rot={-6} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t4 + 0.05} texto="NA PRÁTICA" cor="green" />,
    },
    {
      id: "6 ouviu", a: t5, b: tFim, clima: "ganho", vin: 0.64, hits: [c.d_repete, c.d_ouviu], punch: [{ at: c.d_ouviu, s: 1.05 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} cor={aa(1)} />
          <Personagem t={t} x={330} y={FLOOR} s={0.74} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.d_repete, 10, 150)} />
          <Personagem t={t} x={760} y={FLOOR} s={0.74} v={VIS.comprador} seed={1} flip humor="feliz" fala={t > c.d_ouviu - 0.4} />
          <Confete t={t} at={c.d_repete + 0.7} />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.d_repete - 0.1} x={540} y={480} texto="REPETIU AS PALAVRAS" cor="white" size={40} />
          <Carimbo t={t} at={c.d_repete + 0.6} x={540} y={680} texto="MOSTROU QUE OUVIU" cor="green" size={54} rot={-4} />
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
