import React from "react";
import { prog } from "../../../lib/anim";
import type { Timeline } from "../../types";
import { aa } from "../../NOV26/kit";
import {
  Balao, CamCartoon, Carimbo, type Clima, Confete, Etiqueta, Flash, Holofote,
  Personagem, Pop, Raios, Selo, VIS, acentosDe, gesto, pop,
} from "../../../estilos/cartoon";
import { Celular } from "../../ATIVO-D1204-10/scenes/Scenes";

/**
 * ATIVO-D1212-15 — "O resumo do mesmo dia" (grade 12/12/2026 · 15h · IDEIA QUE MUDA O JOGO · Cartoon explicativo).
 * O cliente sai da visita com o balão cheio → no dia seguinte, o balão esvazia → 1885: a curva do esquecimento cai rápido
 * nas primeiras horas → em casa, a família pergunta e ele não defende → não espere → no mesmo dia: três fotos, o que gostou,
 * a dúvida → o balão enche de novo: o imóvel entra na conversa. Apuração: Ebbinghaus (1885), sem percentuais.
 */
const FLOOR = 1540;
export type Shot = {
  id: string; a: number; b: number; clima: Clima; vin?: number; push?: number;
  punch?: { at: number; s: number; x?: number; y?: number }[]; hits?: number[];
  svg?: (t: number) => React.ReactNode; html?: (t: number) => React.ReactNode; selo?: (t: number) => React.ReactNode; flash?: number;
};

/** Curva do esquecimento desenhada até `p` (eixos + curva). */
const Curva: React.FC<{ p: number; verde?: number }> = ({ p, verde = 0 }) => {
  const pts = Array.from({ length: 41 }, (_, i) => { const x = i / 40; return [250 + x * 600, 520 + 330 * (1 - (0.25 + 0.75 * Math.exp(-x * 6)))] as [number, number]; });
  const n = Math.max(2, Math.round(41 * Math.min(1, p)));
  return (
    <g>
      <path d="M250 470 L250 860 L870 860" fill="none" stroke="#F4F5F7" strokeWidth={6} strokeLinecap="round" />
      <polyline points={pts.slice(0, n).map((q) => q.join(",")).join(" ")} fill="none" stroke={verde > 0.5 ? aa(1) : "#FF6B5E"} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
};

export const makeShots = (tl: Timeline): Shot[] => {
  const c = tl.cues;
  const ac = acentosDe(tl.captions);
  const t1 = c.p_1885 - 0.4;
  const t2 = c.c_lembra - 0.4;
  const t3 = c.v_espere - 0.4;
  const t4 = c.a_mesmo - 0.4;
  const t5 = c.f_memoria - 0.4;
  const tFim = c.cta_quer - 0.05;
  return [
    {
      id: "1 esqueceu", a: 0, b: t1, clima: "pergunta", vin: 0.86, push: 0.012, hits: [c.h_seguinte, c.h_esqueceu], punch: [{ at: c.h_esqueceu, s: 1.06 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={720} p={prog(t, 0, 0.3)} />
          <g opacity={1 - 0.75 * prog(t, c.h_esqueceu - 0.1, 0.6)}>
            <Pop t={t} at={0.1} x={600} y={640}><Balao texto="A VARANDA! A LUZ!" w={460} size={34} cauda={-1} /></Pop>
          </g>
          <Personagem t={t} x={420} y={FLOOR} s={0.8} v={VIS.comprador} seed={1} humor={t > c.h_esqueceu - 0.1 ? "espanto" : "feliz"} />
        </>
      ),
      html: (t) => <Carimbo t={t} at={c.h_esqueceu - 0.05} x={600} y={830} texto="ESQUECEU" cor="red" size={58} rot={-6} />,
      selo: (t) => <Selo t={t} at={0.1} texto="NO DIA SEGUINTE" />,
    },
    {
      id: "2 a curva", a: t1, b: t2, clima: "dados", vin: 0.8, push: 0.01, hits: [c.p_1885, c.p_mediu, c.p_rapido], punch: [{ at: c.p_rapido, s: 1.05 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} p={0.6} />
          <Curva p={prog(t, c.p_mediu - 0.2, c.p_rapido - c.p_mediu + 0.6, (x) => x)} />
          <Personagem t={t} x={200} y={FLOOR} s={0.62} v={VIS.A} acentos={ac} humor="neutro" braco={gesto(t, c.p_memoria - 0.1, 10, 110)} />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.p_memoria - 0.2} x={330} y={470} texto="MEMÓRIA" cor="white" size={34} />
          <Etiqueta t={t} at={c.p_memoria} x={790} y={910} texto="HORAS →" cor="white" size={30} />
          <Carimbo t={t} at={c.p_rapido - 0.05} x={640} y={600} texto="CAI RÁPIDO" cor="red" size={54} rot={-5} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t1 + 0.05} texto="1885 · EBBINGHAUS" />,
    },
    {
      id: "3 em casa", a: t2, b: t3, clima: "conflito", vin: 0.86, hits: [c.c_lembra, c.c_defende, c.c_casa], punch: [{ at: c.c_defende, s: 1.06 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} cor="#FFD9D4" />
          <Personagem t={t} x={330} y={FLOOR} s={0.74} v={VIS.comprador} seed={1} humor="triste" />
          <Personagem t={t} x={760} y={FLOOR} s={0.74} v={VIS.B} seed={2} flip humor="neutro" fala={t < c.c_defende} />
          <Pop t={t} at={c.c_lembra - 0.3} x={760} y={640}><Balao texto="E A COZINHA, COMO ERA?" w={480} size={30} cauda={1} /></Pop>
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.c_lembra - 0.1} x={330} y={480} texto="NÃO LEMBRA" cor="white" size={38} />
          <Carimbo t={t} at={c.c_defende - 0.05} x={330} y={830} texto="NÃO DEFENDE" cor="red" size={54} rot={-6} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t2 + 0.05} texto="NA CONVERSA EM CASA" cor="red" />,
    },
    {
      id: "4 não espere", a: t3, b: t4, clima: "explica", vin: 0.72, hits: [c.v_espere], punch: [{ at: c.v_espere, s: 1.07 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} cor={aa(1)} p={0.6} />
          <Personagem t={t} x={540} y={FLOOR} s={0.8} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.v_espere - 0.1, 10, 140)} />
        </>
      ),
      html: (t) => <Carimbo t={t} at={c.v_espere - 0.1} x={540} y={640} texto="NÃO ESPERE" cor="green" size={66} rot={-4} />,
      selo: (t) => <Selo t={t} at={t3 + 0.05} texto="A VIRADA" cor="green" />,
    },
    {
      id: "5 o resumo", a: t4, b: t5, clima: "ganho", vin: 0.68, push: 0.01, hits: [c.a_mesmo, c.a_resumo, c.a_fotos, c.a_gostou, c.a_duvida], punch: [{ at: c.a_duvida, s: 1.05 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} cor={aa(1)} />
          <Celular t={t} x={700} y={700} s={0.8} msgs={[{ texto: ["3 FOTOS", "DA VISITA"], lado: "eu", at: c.a_fotos - 0.2 }, { texto: ["VOCÊ GOSTOU:", "DA VARANDA"], lado: "eu", at: c.a_gostou - 0.2, verde: true }, { texto: ["DÚVIDA: A VAGA", "É COBERTA?"], lado: "eu", at: c.a_duvida - 0.2, verde: true }]} />
          <Personagem t={t} x={300} y={FLOOR} s={0.74} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.a_resumo - 0.1, 10, 120)} />
        </>
      ),
      html: (t) => <Etiqueta t={t} at={c.a_mesmo - 0.1} x={300} y={470} texto="NO MESMO DIA" cor="green" size={40} />,
      selo: (t) => <Selo t={t} at={t4 + 0.05} texto="O RESUMO" cor="green" />,
    },
    {
      id: "6 na conversa", a: t5, b: tFim, clima: "ganho", vin: 0.64, hits: [c.f_memoria, c.f_conversa], punch: [{ at: c.f_conversa - 0.4, s: 1.05 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={760} cor={aa(1)} />
          <Pop t={t} at={c.f_memoria - 0.2} x={600} y={640}><Balao texto="A VARANDA! A LUZ!" w={460} size={34} cauda={-1} /></Pop>
          <Personagem t={t} x={420} y={FLOOR} s={0.8} v={VIS.comprador} seed={1} humor="feliz" />
          <Confete t={t} at={c.f_conversa - 0.4} />
        </>
      ),
      html: (t) => <Carimbo t={t} at={c.f_conversa - 0.5} x={600} y={830} texto="ENTRA NA CONVERSA" cor="green" size={52} rot={-4} />,
      selo: (t) => <Selo t={t} at={t5 + 0.05} texto="NA MEMÓRIA" cor="green" />,
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
