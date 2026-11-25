import React from "react";
import { prog } from "../../../lib/anim";
import type { Timeline } from "../../types";
import { aa } from "../../NOV26/kit";
import { F } from "../../../theme";
import {
  Balao, CamCartoon, Carimbo, Casa, Checklist, type Clima, Confete, Etiqueta, Flash, Holofote,
  Personagem, Pop, Raios, Selo, VIS, acentosDe, gesto, pop,
} from "../../../estilos/cartoon";

/**
 * ATIVO-D1204-10 — "O cliente sumiu depois da visita" (grade 04/12/2026 · 10h · CORRETOR NA VIDA REAL · Cartoon explicativo).
 * Visita boa, cliente animado → dois dias depois, sumiu → "e aí, o que achou?" fica no visualizado → pergunta aberta dá
 * trabalho a quem está cansado de decidir → resumo no mesmo dia (gostou / não gostou / falta saber) → pergunta fácil
 * (mais um parecido ou esse continua no páreo?) → o resumo mostra que você ouviu; a resposta vem rápida. Prática profissional.
 */
const FLOOR = 1540;
export type Shot = {
  id: string; a: number; b: number; clima: Clima; vin?: number; push?: number;
  punch?: { at: number; s: number; x?: number; y?: number }[]; hits?: number[];
  svg?: (t: number) => React.ReactNode; html?: (t: number) => React.ReactNode; selo?: (t: number) => React.ReactNode; flash?: number;
};
type Msg = { texto: string[]; lado: "eu" | "ele"; at: number; verde?: boolean };
/** Celular com conversa (balões de texto em linhas). */
const Celular: React.FC<{ t: number; x: number; y: number; s?: number; msgs: Msg[]; rodape?: string; rodapeAt?: number }> = ({ t, x, y, s = 1, msgs, rodape, rodapeAt = 0 }) => {
  let cy = -190;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-200} y={-290} width={400} height={580} rx={40} fill="#000" opacity={0.35} transform="translate(12 16)" />
      <rect x={-200} y={-290} width={400} height={580} rx={40} fill="#1C2233" />
      <rect x={-180} y={-250} width={360} height={500} rx={18} fill="#F4F5F7" />
      <rect x={-180} y={-250} width={360} height={56} rx={18} fill="#2C3E66" />
      <circle cx={-140} cy={-222} r={16} fill="#C98C64" />
      <text x={-112} y={-210} fontFamily={F.sans} fontWeight={800} fontSize={30} fill="#fff">CLIENTE</text>
      {msgs.map((m, i) => {
        const k = t >= m.at ? pop(t, m.at) : 0;
        const h = 26 + m.texto.length * 36;
        const w = 330;
        const bx = m.lado === "eu" ? 168 - w : -168;
        const g = (
          <g key={i} opacity={Math.min(1, k)} transform={`translate(0 ${cy}) scale(${0.6 + 0.4 * Math.min(1, k)})`}>
            <rect x={bx} y={0} width={w} height={h} rx={14} fill={m.verde ? aa(1) : m.lado === "eu" ? "#DCE6F5" : "#FFFFFF"} stroke="#0A0A0C" strokeWidth={3} />
            {m.texto.map((l, j) => <text key={j} x={bx + 14} y={40 + j * 36} fontFamily={F.sans} fontWeight={800} fontSize={30} fill="#111">{l}</text>)}
          </g>
        );
        cy += h + 18;
        return g;
      })}
      {rodape ? <text x={165} y={230} textAnchor="end" fontFamily={F.sans} fontWeight={700} fontSize={30} fill="#6B7280" opacity={t >= rodapeAt ? 1 : 0}>{rodape}</text> : null}
    </g>
  );
};

export const makeShots = (tl: Timeline): Shot[] => {
  const c = tl.cues;
  const ac = acentosDe(tl.captions);
  const t1 = c.m_achou - 1.6;
  const t2 = c.v_trabalho - 1.4;
  const t3 = c.r_dia - 0.6;
  const t4 = c.p_facil - 1.5;
  const t5 = c.f_ouviu - 1.6;
  const tFim = c.cta_quer - 0.05;
  return [
    {
      id: "1 visita boa → sumiu", a: 0, b: t1, clima: "pergunta", vin: 0.8, push: 0.012, hits: [c.h_animado, c.h_sumiu], punch: [{ at: c.h_sumiu, s: 1.05 }],
      svg: (t) => {
        const some = prog(t, c.h_sumiu - 0.25, 0.4);
        return (
          <>
            <Holofote x={540} chao={FLOOR} w={660} p={prog(t, 0, 0.3)} cor={some > 0.5 ? "#FFD9D4" : "#FFFFFF"} />
            <Pop t={t} at={0.15} x={540} y={830}><g transform="scale(0.85)"><Casa w={300} /></g></Pop>
            <Personagem t={t} x={360} y={FLOOR} s={0.78} v={VIS.A} acentos={ac} humor={some > 0.5 ? "espanto" : "feliz"} braco={gesto(t, 0.4, 10, 100)} />
            <g opacity={1 - some}><Personagem t={t} x={730} y={FLOOR} s={0.76} v={VIS.comprador} seed={1} acentos={ac} humor="feliz" flip braco={gesto(t, c.h_animado - 0.2, 10, 150)} /></g>
            <g opacity={some}><path d={`M 640 ${FLOOR} L 640 ${FLOOR - 420} L 820 ${FLOOR - 420} L 820 ${FLOOR}`} fill="none" stroke="#F4F5F7" strokeWidth={6} strokeDasharray="16 12" /></g>
          </>
        );
      },
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.h_animado - 0.1} x={730} y={560} texto="CLIENTE ANIMADO" cor="green" size={34} />
          <Etiqueta t={t} at={c.h_sumiu - 1.2} x={360} y={560} texto="2 DIAS DEPOIS…" cor="white" size={34} />
          <Carimbo t={t} at={c.h_sumiu - 0.03} x={730} y={700} texto="SUMIU" cor="red" size={72} rot={-6} />
        </>
      ),
      selo: (t) => <Selo t={t} at={0.1} texto="DEPOIS DA VISITA" />,
    },
    {
      id: "2 visualizado", a: t1, b: t2, clima: "conflito", vin: 0.84, push: 0.01, hits: [c.m_achou, c.m_visualiza], punch: [{ at: c.m_visualiza, s: 1.05, x: 30 }],
      svg: (t) => (
        <>
          <Holofote x={420} chao={FLOOR} w={620} cor="#FFD9D4" />
          <Celular t={t} x={390} y={700} s={0.84} msgs={[{ texto: ["E AÍ, O QUE", "ACHOU?"], lado: "eu", at: c.m_achou - 0.1 }]} rodape="VISUALIZADO ✓✓" rodapeAt={c.m_visualiza - 0.05} />
          <Personagem t={t} x={820} y={FLOOR} s={0.78} v={VIS.A} acentos={ac} humor={t > c.m_visualiza ? "triste" : "neutro"} flip olhar={-1} />
        </>
      ),
      html: (t) => <Carimbo t={t} at={c.m_visualiza + 0.2} x={760} y={560} texto="SEM RESPOSTA" cor="red" size={48} rot={6} />,
      selo: (t) => <Selo t={t} at={t1 + 0.05} texto="A MENSAGEM DE SEMPRE" cor="red" />,
    },
    {
      id: "3 pergunta aberta dá trabalho", a: t2, b: t3, clima: "explica", vin: 0.8, hits: [c.v_trabalho, c.v_cansado], punch: [{ at: c.v_trabalho, s: 1.04 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={640} />
          {[0, 1, 2, 3, 4].map((i) => (
            <Pop key={i} t={t} at={c.v_trabalho - 0.3 + i * 0.12} x={340 + i * 100} y={880 - (i % 2) * 60}><Balao texto="?" w={90} size={56} /></Pop>
          ))}
          <Personagem t={t} x={540} y={FLOOR} s={0.84} v={VIS.comprador} seed={1} acentos={ac} humor={t > c.v_cansado - 0.1 ? "triste" : "neutro"} olhar={Math.sin(t * 3)} />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={t2 + 0.3} x={540} y={520} texto="PERGUNTA ABERTA" cor="white" size={40} />
          <Carimbo t={t} at={c.v_trabalho - 0.03} x={540} y={640} texto="DÁ TRABALHO" cor="red" size={60} rot={-5} />
          <Etiqueta t={t} at={c.v_cansado - 0.05} x={540} y={760} texto="CANSADO DE DECIDIR" cor="red" size={34} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t2 + 0.05} texto="POR QUE ELE SOME" />,
    },
    {
      id: "4 o resumo no mesmo dia", a: t3, b: t4, clima: "explica", vin: 0.72, push: 0.012, hits: [c.r_dia, c.r_resumo, c.r_gostou, c.r_nao, c.r_falta],
      svg: (t) => (
        <>
          <g transform="translate(540 650)"><Checklist t={t} titulo="RESUMO DA VISITA" w={720} itens={[{ k: "O QUE ELE GOSTOU", at: c.r_gostou }, { k: "O QUE NÃO GOSTOU", at: c.r_nao }, { k: "O QUE FALTA SABER", at: c.r_falta }]} /></g>
          <Holofote x={540} chao={FLOOR} w={600} />
          <Personagem t={t} x={540} y={FLOOR + 40} s={0.66} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.r_resumo - 0.1, 10, 120)} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t3 + 0.05} texto="NO MESMO DIA" cor="green" />,
    },
    {
      id: "5 pergunta fácil", a: t4, b: t5, clima: "explica", vin: 0.72, hits: [c.p_facil, c.p_parecido, c.p_pareo],
      svg: (t) => (
        <>
          <Holofote x={420} chao={FLOOR} w={620} />
          <Celular t={t} x={390} y={700} s={0.84} msgs={[
            { texto: ["GOSTOU: A SALA.", "NÃO: A VAGA."], lado: "eu", at: t4 + 0.1 },
            { texto: ["QUER VER MAIS UM", "PARECIDO?"], lado: "eu", at: c.p_parecido - 0.2 },
            { texto: ["OU ESSE CONTINUA", "NO PÁREO?"], lado: "eu", at: c.p_pareo - 0.6 },
          ]} />
          <Personagem t={t} x={820} y={FLOOR} s={0.78} v={VIS.A} acentos={ac} humor="feliz" flip braco={gesto(t, c.p_facil - 0.1, 10, 110)} />
        </>
      ),
      html: (t) => <Etiqueta t={t} at={c.p_facil - 0.05} x={800} y={560} texto="PERGUNTA FÁCIL" cor="green" size={36} />,
      selo: (t) => <Selo t={t} at={t4 + 0.05} texto="E TERMINE ASSIM" cor="green" />,
    },
    {
      id: "6 ouviu → resposta rápida", a: t5, b: tFim, clima: "ganho", vin: 0.62, hits: [c.f_ouviu, c.f_sim, c.f_rapida], punch: [{ at: c.f_rapida, s: 1.04 }],
      svg: (t) => (
        <>
          <Holofote x={420} chao={FLOOR} w={640} cor={aa(1)} />
          <Celular t={t} x={390} y={700} s={0.84} msgs={[
            { texto: ["QUER VER MAIS UM", "PARECIDO?"], lado: "eu", at: 0 },
            { texto: ["SIM! MANDA", "MAIS UM!"], lado: "ele", at: c.f_rapida - 0.1, verde: true },
          ]} />
          <Personagem t={t} x={820} y={FLOOR} s={0.78} v={VIS.A} acentos={ac} humor="feliz" flip braco={gesto(t, c.f_rapida - 0.1, 10, 150)} />
          <Confete t={t} at={c.f_rapida + 0.1} />
        </>
      ),
      html: (t) => (
        <>
          <Carimbo t={t} at={c.f_ouviu - 0.03} x={790} y={540} texto="VOCÊ OUVIU" cor="green" size={52} rot={-5} />
          <Etiqueta t={t} at={c.f_sim - 0.05} x={790} y={680} texto="SIM OU NÃO" cor="white" size={36} />
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
