import React from "react";
import { prog } from "../../../lib/anim";
import type { Timeline } from "../../types";
import { aa } from "../../NOV26/kit";
import { F } from "../../../theme";
import {
  Balao, CamCartoon, Carimbo, Casa, Checklist, type Clima, Confete, Etiqueta, Flash, Holofote,
  Personagem, Pop, RED, Raios, Selo, VIS, type Visual, acentosDe, gesto, pop,
} from "../../../estilos/cartoon";

/**
 * ATIVO-D1203-15 — "Ela amou, ele odiou" (grade 03/12/2026 · 15h · CORRETOR NA VIDA REAL · PRIMEIRO MODELO, Cartoon explicativo).
 * Visita: um já escolhe onde vai a mesa, o outro de braços cruzados na porta → o corretor tenta convencer, os dois se fecham →
 * virada: não é o imóvel, são critérios nunca combinados → duas perguntas a cada um → espaço × sem trânsito →
 * com os dois critérios na mesa, para de defender e procura o certo. Prática profissional, sem estatística.
 */
const FLOOR = 1540;
export type Shot = {
  id: string; a: number; b: number; clima: Clima; vin?: number; push?: number;
  punch?: { at: number; s: number; x?: number; y?: number }[]; hits?: number[];
  svg?: (t: number) => React.ReactNode; html?: (t: number) => React.ReactNode; selo?: (t: number) => React.ReactNode; flash?: number;
};
/** Personagem de braços cruzados (antebraços sobre o peito). */
const Cruzado: React.FC<{ t: number; x: number; s: number; v: Visual; humor?: "bravo" | "neutro" | "triste"; flip?: boolean; seed?: number; acentos?: number[] }> = ({ t, x, s, v, humor = "bravo", flip, seed = 2, acentos }) => (
  <>
    <Personagem t={t} x={x} y={FLOOR} s={s} v={v} humor={humor} braco={-42} bracoE={-42} flip={flip} seed={seed} acentos={acentos} />
    <g transform={`translate(${x} ${FLOOR}) scale(${s})`}>
      <rect x={-92} y={-246} width={184} height={40} rx={20} fill={v.sombraTerno} transform="rotate(-8 0 -226)" />
      <rect x={-92} y={-236} width={184} height={40} rx={20} fill={v.terno} transform="rotate(8 0 -216)" />
      <circle cx={-86} cy={-222} r={20} fill={v.pele} /><circle cx={86} cy={-222} r={20} fill={v.pele} />
    </g>
  </>
);
/** Batente de porta. */
const Porta: React.FC<{ x: number }> = ({ x }) => (
  <g>
    <rect x={x - 170} y={720} width={340} height={FLOOR - 720} fill="#1B1F28" />
    <rect x={x - 190} y={700} width={380} height={FLOOR - 700} fill="none" stroke="#8A6A4A" strokeWidth={26} />
  </g>
);
/** Mesa (vista lateral). */
const MesaLado: React.FC<{ x: number; y: number; w?: number; fantasma?: boolean }> = ({ x, y, w = 300, fantasma }) => (
  <g opacity={fantasma ? 0.9 : 1}>
    <rect x={x - w / 2} y={y} width={w} height={24} rx={8} fill={fantasma ? "none" : "#8A6A4A"} stroke={fantasma ? "#F4F5F7" : "none"} strokeWidth={6} strokeDasharray={fantasma ? "18 12" : undefined} />
    <rect x={x - w / 2 + 16} y={y + 24} width={18} height={120} fill={fantasma ? "none" : "#6E5236"} stroke={fantasma ? "#F4F5F7" : "none"} strokeWidth={6} strokeDasharray={fantasma ? "14 10" : undefined} />
    <rect x={x + w / 2 - 34} y={y + 24} width={18} height={120} fill={fantasma ? "none" : "#6E5236"} stroke={fantasma ? "#F4F5F7" : "none"} strokeWidth={6} strokeDasharray={fantasma ? "14 10" : undefined} />
  </g>
);
/** Cartão de critério sobre a mesa. */
const Ficha: React.FC<{ texto: string; on?: number }> = ({ texto, on = 1 }) => (
  <g>
    <rect x={-150} y={-60} width={300} height={120} rx={14} fill="#F4F5F7" stroke={on > 0.5 ? aa(1) : "#0A0A0C"} strokeWidth={7} />
    <text x={0} y={14} textAnchor="middle" fontFamily={F.sans} fontWeight={800} fontSize={36} fill="#111">{texto}</text>
  </g>
);
const Cartao: React.FC<{ s?: number; luz?: number }> = ({ s = 1, luz = 0 }) => (
  <g transform={`scale(${s})`}>
    {luz > 0 ? <rect x={-96} y={-126} width={192} height={182} rx={20} fill="none" stroke={aa(luz)} strokeWidth={10} /> : null}
    <rect x={-80} y={-110} width={160} height={150} rx={14} fill="#F4F5F7" stroke="#0A0A0C" strokeWidth={5} />
    <g transform="translate(0 10) scale(0.38)"><Casa w={260} /></g>
  </g>
);

export const makeShots = (tl: Timeline): Shot[] => {
  const c = tl.cues;
  const ac = acentosDe(tl.captions);
  const t1 = c.e_convencer - 0.3;
  const t2 = c.v_casal - 0.2;
  const t3 = c.p_cada - 0.35;
  const t4 = c.p_espaco - 1.0;
  const t5 = c.f_mesa - 1.1;
  const tFim = c.cta_quer - 0.05;
  return [
    {
      id: "1 a mesa × a porta", a: 0, b: t1, clima: "pergunta", vin: 0.8, push: 0.012, hits: [c.h_mesa, c.h_bracos], punch: [{ at: c.h_bracos, s: 1.05, x: -40 }],
      svg: (t) => (
        <>
          <Porta x={800} />
          <Holofote x={330} chao={FLOOR} w={520} p={prog(t, 0, 0.3)} />
          <Pop t={t} at={c.h_mesa - 0.15} x={0} y={0}><MesaLado x={470} y={1360} w={260} fantasma /></Pop>
          <Personagem t={t} x={290} y={FLOOR} s={0.78} v={VIS.comprador} seed={1} acentos={ac} humor="feliz" braco={gesto(t, c.h_mesa - 0.25, 10, 100)} />
          {t >= c.h_bracos - 0.1 ? <Cruzado t={t} x={800} s={0.78} v={VIS.B} flip acentos={ac} /> : <Personagem t={t} x={800} y={FLOOR} s={0.78} v={VIS.B} seed={2} flip />}
          <Pop t={t} at={c.h_mesa - 0.05} x={330} y={660}><Balao texto="A MESA VAI AQUI!" w={470} size={42} /></Pop>
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.h_bracos} x={800} y={540} texto="BRAÇOS CRUZADOS" cor="red" size={34} />
        </>
      ),
      selo: (t) => <Selo t={t} at={0.1} texto="VISITA COM CASAL" />,
    },
    {
      id: "2 convencer fecha os dois", a: t1, b: t2, clima: "conflito", vin: 0.86, hits: [c.e_convencer, c.e_fecham], punch: [{ at: c.e_fecham, s: 1.06 }],
      svg: (t) => {
        const fecha = t >= c.e_fecham - 0.1;
        return (
          <>
            <Holofote x={540} chao={FLOOR} w={700} cor="#FFD9D4" />
            {fecha ? <Cruzado t={t} x={250} s={0.72} v={VIS.comprador} seed={1} humor="bravo" acentos={ac} /> : <Personagem t={t} x={250} y={FLOOR} s={0.72} v={VIS.comprador} seed={1} humor="neutro" />}
            <Personagem t={t} x={540} y={FLOOR} s={0.8} v={VIS.A} acentos={ac} humor={fecha ? "espanto" : "feliz"} fala={!fecha} braco={gesto(t, c.e_convencer, 10, 95)} flip />
            <Cruzado t={t} x={830} s={0.72} v={VIS.B} flip acentos={ac} />
          <Pop t={t} at={c.e_convencer} x={640} y={640}><Balao texto="MAS OLHA ESSA VISTA!" w={520} size={40} cauda={-1} /></Pop>
          </>
        );
      },
      html: (t) => (
        <>
          <Carimbo t={t} at={c.e_fecham - 0.03} x={540} y={520} texto="OS DOIS SE FECHAM" cor="red" size={54} rot={-5} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t1 + 0.05} texto="O ERRO COMUM" cor="red" />,
    },
    {
      id: "3 não é o imóvel: são os critérios", a: t2, b: t3, clima: "explica", vin: 0.78, push: 0.01, hits: [c.v_casal, c.v_criterios, c.v_combinados], punch: [{ at: c.v_criterios, s: 1.04 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={680} />
          <Pop t={t} at={c.v_casal - 0.1} x={540} y={660}><g opacity={1 - 0.6 * prog(t, c.v_criterios - 0.3, 0.3)}><Cartao s={1.1} /></g></Pop>
          <Personagem t={t} x={260} y={FLOOR} s={0.74} v={VIS.comprador} seed={1} acentos={ac} humor="neutro" olhar={1} />
          <Personagem t={t} x={820} y={FLOOR} s={0.74} v={VIS.B} seed={2} acentos={ac} humor="neutro" olhar={1} flip />
          <Pop t={t} at={c.v_combinados - 0.1} x={260} y={1090}><Balao texto="?" w={110} size={64} /></Pop>
          <Pop t={t} at={c.v_combinados + 0.05} x={820} y={1090}><Balao texto="?" w={110} size={64} cauda={-1} /></Pop>
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.v_casal + 0.3} x={540} y={480} texto="NÃO É O IMÓVEL" cor="white" size={40} />
          <Carimbo t={t} at={c.v_criterios - 0.03} x={540} y={780} texto="SÃO OS CRITÉRIOS" cor="green" size={56} rot={-4} />
          <Etiqueta t={t} at={c.v_combinados - 0.05} x={540} y={880} texto="NUNCA COMBINADOS" cor="red" size={34} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t2 + 0.05} texto="A VIRADA" cor="green" />,
    },
    {
      id: "4 duas perguntas a cada um", a: t3, b: t4, clima: "explica", vin: 0.72, push: 0.012, hits: [c.p_cada, c.p_sim, c.p_inegociavel],
      svg: (t) => (
        <>
          <g transform="translate(540 640)"><Checklist t={t} titulo="PARA CADA UM" w={780} itens={[{ k: "O QUE FAZ SER SIM?", at: c.p_sim }, { k: "O QUE É INEGOCIÁVEL?", at: c.p_inegociavel }]} /></g>
          <Holofote x={540} chao={FLOOR} w={660} />
          <Personagem t={t} x={250} y={FLOOR} s={0.7} v={VIS.comprador} seed={1} acentos={ac} humor="feliz" />
          <Personagem t={t} x={540} y={FLOOR} s={0.78} v={VIS.A} acentos={ac} humor="feliz" fala braco={gesto(t, c.p_cada - 0.1, 10, 100)} />
          <Personagem t={t} x={830} y={FLOOR} s={0.7} v={VIS.B} seed={2} acentos={ac} humor="feliz" flip />
        </>
      ),
      selo: (t) => <Selo t={t} at={t3 + 0.05} texto="NA PRÓXIMA CONVERSA" cor="green" />,
    },
    {
      id: "5 espaço × sem trânsito", a: t4, b: t5, clima: "explica", vin: 0.72, hits: [c.p_espaco, c.p_transito],
      svg: (t) => (
        <>
          <Holofote x={270} chao={FLOOR} w={460} p={prog(t, c.p_espaco - 0.3, 0.3)} cor={aa(1)} />
          <Holofote x={810} chao={FLOOR} w={460} p={prog(t, c.p_transito - 0.3, 0.3)} cor={aa(1)} />
          <Personagem t={t} x={270} y={FLOOR} s={0.76} v={VIS.comprador} seed={1} acentos={ac} humor="feliz" braco={gesto(t, c.p_espaco - 0.2, 10, 140)} bracoE={t > c.p_espaco - 0.2 ? -140 : -8} />
          <Personagem t={t} x={810} y={FLOOR} s={0.76} v={VIS.B} seed={2} acentos={ac} humor="feliz" flip braco={gesto(t, c.p_transito - 0.2, 10, 110)} />
          <Pop t={t} at={c.p_espaco - 0.05} x={270} y={620}><Balao texto="ESPAÇO" w={330} size={52} /></Pop>
          <Pop t={t} at={c.p_transito - 0.05} x={810} y={620}><Balao texto="SEM TRÂNSITO" w={400} size={46} cauda={-1} /></Pop>
        </>
      ),
      html: (t) => (
        <>
        </>
      ),
      selo: (t) => <Selo t={t} at={t4 + 0.05} texto="CADA UM, O SEU" />,
    },
    {
      id: "6 critérios na mesa → o certo", a: t5, b: tFim, clima: "ganho", vin: 0.62, hits: [c.f_mesa, c.f_defender, c.f_certo], punch: [{ at: c.f_certo, s: 1.04 }],
      svg: (t) => {
        const certo = prog(t, c.f_certo - 0.2, 0.4);
        return (
          <>
            <Holofote x={540} chao={FLOOR} w={680} cor={certo > 0.5 ? aa(1) : "#FFFFFF"} />
            <g opacity={1 - certo}>
              <MesaLado x={540} y={1280} w={640} />
              <Pop t={t} at={c.f_mesa - 0.2} x={385} y={1220}><Ficha texto="ESPAÇO" /></Pop>
              <Pop t={t} at={c.f_mesa} x={700} y={1220}><Ficha texto="SEM TRÂNSITO" /></Pop>
            </g>
            <g opacity={certo}>
              {[-1, 0, 1].map((k) => <g key={k} transform={`translate(${540 + k * 230} 1240) rotate(${k * 5})`}><Cartao s={1} luz={k === 0 ? certo : 0} /></g>)}
            </g>
            <Personagem t={t} x={540} y={FLOOR + 60} s={0.6} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.f_certo - 0.1, 10, 140)} />
            <Confete t={t} at={c.f_certo + 0.1} />
          </>
        );
      },
      html: (t) => {
        const risco = prog(t, c.f_defender + 0.25, 0.25);
        return (
          <>
            <Etiqueta t={t} at={c.f_mesa - 0.1} x={540} y={520} texto="OS DOIS CRITÉRIOS NA MESA" cor="white" size={34} />
            {t >= c.f_defender - 0.05 && t < c.f_certo - 0.2 ? (
              <div style={{ position: "absolute", left: 0, right: 0, top: 640, display: "flex", justifyContent: "center" }}>
                <div style={{ position: "relative", fontFamily: F.sans, fontWeight: 800, fontSize: 46, color: "#fff", WebkitTextStroke: "10px #0A0A0C", paintOrder: "stroke fill", transform: `scale(${pop(t, c.f_defender - 0.05)})` }}>
                  DEFENDER O IMÓVEL
                  <div style={{ position: "absolute", left: -10, top: "50%", height: 10, width: `${(100 + 4) * risco}%`, background: RED, borderRadius: 5 }} />
                </div>
              </div>
            ) : null}
            <Carimbo t={t} at={c.f_certo - 0.03} x={540} y={700} texto="PROCURAR O CERTO" cor="green" size={58} rot={-5} />
          </>
        );
      },
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
