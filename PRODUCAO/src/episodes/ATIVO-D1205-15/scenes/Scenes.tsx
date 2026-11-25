import React from "react";
import { prog } from "../../../lib/anim";
import type { Timeline } from "../../types";
import { aa } from "../../NOV26/kit";
import { F } from "../../../theme";
import {
  Balao, CamCartoon, Carimbo, Casa, type Clima, Confete, Etiqueta, Flash, Holofote,
  Personagem, Pop, Raios, Selo, VIS, acentosDe, gesto, pop,
} from "../../../estilos/cartoon";

/**
 * ATIVO-D1205-15 — "Vou pensar" (grade 05/12/2026 · 15h · CORRETOR NA VIDA REAL · Cartoon explicativo).
 * O cliente gostou e disse "vou pensar" → "fico no aguardo": a conversa morre → muitas vezes não é tempo, é dúvida não dita
 * → "pensar em quê, exatamente?": valor, bairro ou alguém → agora dá para resolver, sem desculpa → perguntar ganha conversa;
 * só aguardar arrisca o silêncio. Prática profissional.
 */
const FLOOR = 1540;
export type Shot = {
  id: string; a: number; b: number; clima: Clima; vin?: number; push?: number;
  punch?: { at: number; s: number; x?: number; y?: number }[]; hits?: number[];
  svg?: (t: number) => React.ReactNode; html?: (t: number) => React.ReactNode; selo?: (t: number) => React.ReactNode; flash?: number;
};
/** Plaquinha de opção (valor, bairro, alguém). */
const Opcao: React.FC<{ texto: string; on: number; s?: number }> = ({ texto, on, s = 1 }) => (
  <g transform={`scale(${s})`}>
    <rect x={-120} y={-44} width={240} height={88} rx={16} fill={on > 0.5 ? aa(1) : "#F4F5F7"} stroke="#0A0A0C" strokeWidth={5} />
    <text x={0} y={14} textAnchor="middle" fontFamily={F.sans} fontWeight={800} fontSize={36} fill={on > 0.5 ? "#01290B" : "#111"}>{texto}</text>
  </g>
);

export const makeShots = (tl: Timeline): Shot[] => {
  const c = tl.cues;
  const ac = acentosDe(tl.captions);
  const t1 = c.e_aguardo - 1.2;
  const t2 = c.v_tempo - 1.0;
  const t3 = c.p_que - 0.6;
  const t4 = c.x_resolver - 0.6;
  const t5 = c.f_conversa - 0.8;
  const tFim = c.cta_quer - 0.05;
  return [
    {
      id: "1 vou pensar", a: 0, b: t1, clima: "pergunta", vin: 0.8, push: 0.012, hits: [c.h_gostou, c.h_pensar], punch: [{ at: c.h_pensar, s: 1.05 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={680} p={prog(t, 0, 0.3)} />
          <Pop t={t} at={0.1} x={540} y={820}><g transform="scale(0.7)"><Casa w={300} /></g></Pop>
          <Personagem t={t} x={330} y={FLOOR} s={0.78} v={VIS.A} acentos={ac} humor="feliz" />
          <Personagem t={t} x={760} y={FLOOR} s={0.78} v={VIS.comprador} seed={1} acentos={ac} humor={t > c.h_pensar - 0.2 ? "neutro" : "feliz"} flip fala={t > c.h_pensar - 0.3 && t < c.h_pensar + 0.8} />
          <Pop t={t} at={c.h_pensar - 0.1} x={780} y={820}><Balao texto="VOU PENSAR…" w={380} size={50} cauda={-1} /></Pop>
        </>
      ),
      html: (t) => <Etiqueta t={t} at={c.h_gostou - 0.1} x={760} y={560} texto="GOSTOU DO IMÓVEL" cor="green" size={34} />,
      selo: (t) => <Selo t={t} at={0.1} texto="NA VISITA" />,
    },
    {
      id: "2 fico no aguardo", a: t1, b: t2, clima: "conflito", vin: 0.86, hits: [c.e_aguardo, c.e_morre], punch: [{ at: c.e_morre, s: 1.06 }],
      svg: (t) => {
        const morre = prog(t, c.e_morre - 0.2, 0.6);
        return (
          <>
            <Holofote x={540} chao={FLOOR} w={680} cor="#FFD9D4" />
            <Personagem t={t} x={330} y={FLOOR} s={0.78} v={VIS.A} acentos={ac} humor={morre > 0.5 ? "triste" : "feliz"} fala={t < c.e_morre} />
            <g opacity={1 - morre * 0.8}><Personagem t={t} x={760} y={FLOOR} s={0.78} v={VIS.comprador} seed={1} flip humor="neutro" /></g>
            <Pop t={t} at={c.e_aguardo - 0.3} x={330} y={820}><Balao texto="FICO NO AGUARDO!" w={480} size={42} /></Pop>
          </>
        );
      },
      html: (t) => <Carimbo t={t} at={c.e_morre - 0.03} x={540} y={600} texto="A CONVERSA MORRE" cor="red" size={52} rot={-5} />,
      selo: (t) => <Selo t={t} at={t1 + 0.05} texto="A RESPOSTA DE SEMPRE" cor="red" />,
    },
    {
      id: "3 não é tempo, é dúvida", a: t2, b: t3, clima: "explica", vin: 0.8, hits: [c.v_tempo, c.v_duvida], punch: [{ at: c.v_duvida, s: 1.04 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={620} />
          <Personagem t={t} x={540} y={FLOOR} s={0.84} v={VIS.comprador} seed={1} acentos={ac} humor="neutro" olhar={Math.sin(t * 2)} />
          <Pop t={t} at={c.v_duvida - 0.1} x={540} y={860}><Balao texto="?" w={130} size={80} /></Pop>
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.v_tempo - 0.1} x={540} y={520} texto="NÃO É SOBRE TEMPO" cor="white" size={40} />
          <Carimbo t={t} at={c.v_duvida - 0.03} x={540} y={660} texto="É UMA DÚVIDA" cor="green" size={58} rot={-4} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t2 + 0.05} texto="MUITAS VEZES…" />,
    },
    {
      id: "4 pensar em quê", a: t3, b: t4, clima: "explica", vin: 0.72, push: 0.012, hits: [c.p_que, c.p_valor, c.p_bairro, c.p_alguem],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={680} />
          {[["VALOR", c.p_valor], ["BAIRRO", c.p_bairro], ["ALGUÉM", c.p_alguem]].map(([k, at], i) => (
            <Pop key={k as string} t={t} at={(at as number) - 0.1} x={260 + i * 280} y={860}><Opcao texto={k as string} on={0} s={0.9} /></Pop>
          ))}
          <Personagem t={t} x={330} y={FLOOR} s={0.78} v={VIS.A} acentos={ac} humor="feliz" fala braco={gesto(t, c.p_que - 0.1, 10, 100)} />
          <Personagem t={t} x={760} y={FLOOR} s={0.78} v={VIS.comprador} seed={1} flip humor="feliz" />
        </>
      ),
      html: (t) => <Carimbo t={t} at={c.p_que - 0.03} x={540} y={600} texto="PENSAR EM QUÊ?" cor="green" size={58} rot={-4} />,
      selo: (t) => <Selo t={t} at={t3 + 0.05} texto="PERGUNTE COM CALMA" cor="green" />,
    },
    {
      id: "5 agora dá para resolver", a: t4, b: t5, clima: "explica", vin: 0.7, hits: [c.x_resolver, c.x_desculpa],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={680} cor={aa(1)} />
          <Pop t={t} at={t4 + 0.1} x={540} y={860}><Opcao texto="BAIRRO" on={prog(t, c.x_resolver - 0.1, 0.3)} s={1.1} /></Pop>
          <Personagem t={t} x={330} y={FLOOR} s={0.78} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.x_resolver - 0.1, 10, 130)} />
          <Personagem t={t} x={760} y={FLOOR} s={0.78} v={VIS.comprador} seed={1} flip humor="feliz" />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.x_resolver - 0.05} x={540} y={600} texto="AGORA DÁ PARA RESOLVER" cor="green" size={38} />
          <Etiqueta t={t} at={c.x_desculpa - 0.05} x={540} y={700} texto="SEM DESCULPA INVENTADA" cor="white" size={32} />
        </>
      ),
    },
    {
      id: "6 conversa × silêncio", a: t5, b: tFim, clima: "ganho", vin: 0.64, hits: [c.f_conversa, c.f_aguarda, c.f_silencio], punch: [{ at: c.f_conversa, s: 1.04 }],
      svg: (t) => {
        const sil = prog(t, c.f_aguarda - 0.2, 0.5);
        return (
          <>
            <Holofote x={300} chao={FLOOR} w={460} cor={aa(1)} />
            <Holofote x={800} chao={FLOOR} w={420} p={0.3 + 0.5 * sil} cor="#FFD9D4" />
            <Personagem t={t} x={220} y={FLOOR} s={0.62} v={VIS.A} acentos={ac} humor="feliz" fala />
            <Personagem t={t} x={400} y={FLOOR} s={0.62} v={VIS.comprador} seed={1} flip humor="feliz" fala />
            <g opacity={sil}><Personagem t={t} x={800} y={FLOOR} s={0.62} v={VIS.B} seed={2} humor="triste" /></g>
            <Confete t={t} at={c.f_conversa + 0.1} />
          </>
        );
      },
      html: (t) => (
        <>
          <Carimbo t={t} at={c.f_conversa - 0.03} x={300} y={620} texto="CONVERSA" cor="green" size={54} rot={-5} />
          <Carimbo t={t} at={c.f_silencio - 0.03} x={800} y={720} texto="SILÊNCIO" cor="red" size={48} rot={5} />
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
