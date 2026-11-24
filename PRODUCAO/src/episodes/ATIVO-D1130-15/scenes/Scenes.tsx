import React from "react";
import { F } from "../../../theme";
import { ease, mix, prog } from "../../../lib/anim";
import type { Timeline } from "../../types";
import { aa } from "../../NOV26/kit";
import {
  Balao, CamCartoon, Carimbo, Check, Checklist, type Clima, Etiqueta, Figurante, Flash, Holofote,
  Personagem, Pop, Proibido, Raios, Selo, VIS, acentosDe, gesto, pop,
} from "../../../estilos/cartoon";

/**
 * ATIVO-D1130-15 — "A segunda visita" (grade 30/11/2026 · 15h · CORRETOR NA VIDA REAL · PRIMEIRO MODELO, Cartoon explicativo).
 * Porta aberta de novo → o mesmo tour → "GOSTO?" vira "COMO SERIA MORAR AQUI?" → trena, sofá tracejado, armário →
 * vizinho/barulho/sol → a mãe e o sócio → o corretor que atrapalha → sem tour, espaço → checklist (trena · medidas · condomínio)
 * → janela de dia vira noite → "FALE MENOS." → fecho SISTEMA (CTA curta). Observação de prática, sem estatística. Personagens ilustrativos.
 */
const FLOOR = 1540;
export type Shot = {
  id: string; a: number; b: number; clima: Clima; vin?: number; push?: number;
  punch?: { at: number; s: number; x?: number; y?: number }[]; hits?: number[];
  svg?: (t: number) => React.ReactNode; html?: (t: number) => React.ReactNode; selo?: (t: number) => React.ReactNode; flash?: number;
};

const MAE = { ...VIS.comprador, terno: "#7D5A8C", sombraTerno: "#644872", camisa: "#7D5A8C", pele: "#EEC3A0", cabelo: "#B8B8B8", cabeloTipo: "coque" as const };
const SOCIO = VIS.lider;

/** Porta de apartamento (batente + folha que abre). Base no chão em (0,0); `abre` 0..1. */
const Porta: React.FC<{ abre: number }> = ({ abre }) => (
  <g>
    <rect x={-150} y={-760} width={300} height={760} fill="#1B1E24" />
    <rect x={-138} y={-748} width={276} height={748} fill="#0C0D10" />
    <g transform={`translate(-138 0) scale(${1 - 0.72 * abre} 1)`}>
      <rect x={0} y={-748} width={276} height={748} fill="#5A3A2A" />
      <rect x={0} y={-748} width={60} height={748} fill="#000" opacity={0.12} />
      <circle cx={236} cy={-370} r={16} fill="#E0A43A" />
    </g>
  </g>
);
/** Trena na mão: caixinha amarela com a fita esticada (`fita` em px). */
const Trena: React.FC<{ fita?: number }> = ({ fita = 0 }) => (
  <g>
    {fita > 0 ? <rect x={28} y={-4} width={fita} height={14} fill="#F0B94E" stroke="#A8761E" strokeWidth={3} /> : null}
    {fita > 0 ? Array.from({ length: Math.floor(fita / 30) }, (_, k) => <rect key={k} x={40 + k * 30} y={-4} width={3} height={8} fill="#5A4510" />) : null}
    <rect x={-34} y={-34} width={68} height={68} rx={14} fill="#E0A43A" stroke="#7A5512" strokeWidth={4} />
    <circle r={14} fill="#3A2A10" />
  </g>
);
/** Contorno tracejado de um sofá na parede (o cliente imaginando os móveis). */
const SofaFantasma: React.FC<{ p: number; solido?: number }> = ({ p, solido = 0 }) => (
  <g opacity={p}>
    <path d="M-230 0 L-230 -150 Q-230 -190 -190 -190 L190 -190 Q230 -190 230 -150 L230 0 Z M-180 -70 L180 -70" fill={solido > 0 ? `rgba(215,136,58,${0.85 * solido})` : "none"}
      stroke="#F4F5F7" strokeWidth={7} strokeDasharray={solido > 0.5 ? "0" : "22 16"} strokeLinejoin="round" />
    <rect x={-215} y={0} width={18} height={30} fill="#F4F5F7" opacity={0.8} /><rect x={197} y={0} width={18} height={30} fill="#F4F5F7" opacity={0.8} />
  </g>
);
/** Armário de embutir: a porta direita abre (`abre` 0..1). Base em (0,0). */
const Armario: React.FC<{ abre: number }> = ({ abre }) => (
  <g>
    <ellipse cx={0} cy={6} rx={170} ry={18} fill="#000" opacity={0.35} />
    <rect x={-150} y={-560} width={300} height={560} fill="#C9B79C" />
    <rect x={0} y={-548} width={140} height={536} fill="#2A2420" />
    {[0, 1, 2].map((k) => <rect key={k} x={10} y={-500 + k * 160} width={120} height={10} fill="#8C7A60" />)}
    <rect x={-140} y={-548} width={136} height={536} fill="#D9C8AE" />
    <g transform={`translate(140 0) scale(${-(1 - 0.85 * abre)} 1)`}><rect x={0} y={-548} width={136} height={536} fill="#D9C8AE" stroke="#A8957A" strokeWidth={4} /></g>
    <rect x={-20} y={-300} width={10} height={60} rx={5} fill="#7A6A52" />
  </g>
);
/** Janela: céu de dia → noite (`noite` 0..1), sol que desce e lua que aparece. Centro em (0,0). */
const Janela: React.FC<{ noite: number }> = ({ noite }) => {
  const ceu = `rgb(${Math.round(mix(126, 14, noite))},${Math.round(mix(200, 26, noite))},${Math.round(mix(240, 51, noite))})`;
  return (
    <g>
      <rect x={-230} y={-200} width={460} height={400} fill="#1B1E24" />
      <rect x={-212} y={-182} width={424} height={364} fill={ceu} />
      <circle cx={mix(-80, -40, noite)} cy={mix(-60, 230, noite)} r={60} fill="#F0B94E" opacity={1 - noite} />
      <g opacity={noite}><circle cx={90} cy={-80} r={46} fill="#F4F5F7" /><circle cx={110} cy={-96} r={42} fill={ceu} /></g>
      {noite > 0.3 ? [[-150, -130], [-30, -150], [160, 40], [-120, 60]].map(([x, y], k) => <circle key={k} cx={x} cy={y} r={4} fill="#fff" opacity={(noite - 0.3) / 0.7} />) : null}
      <rect x={-212} y={-8} width={424} height={16} fill="#1B1E24" /><rect x={-8} y={-182} width={16} height={364} fill="#1B1E24" />
      <rect x={-250} y={200} width={500} height={24} fill="#2A2D33" />
    </g>
  );
};
const Sol: React.FC = () => (
  <g>{Array.from({ length: 8 }, (_, k) => <rect key={k} x={-6} y={-78} width={12} height={26} rx={6} fill="#F0B94E" transform={`rotate(${k * 45})`} />)}<circle r={44} fill="#F0B94E" /></g>
);
const Barulho: React.FC<{ t: number }> = ({ t }) => (
  <g>
    <path d="M-60 -30 L-30 -30 L10 -66 L10 66 L-30 30 L-60 30 Z" fill="#E9E2D6" />
    {[0, 1, 2].map((k) => { const ph = (t * 1.4 + k * 0.33) % 1; return <path key={k} d={`M${30 + ph * 50} -40 Q${50 + ph * 60} 0 ${30 + ph * 50} 40`} fill="none" stroke="#E9E2D6" strokeWidth={8} strokeLinecap="round" opacity={1 - ph} />; })}
  </g>
);
/** Predinho vizinho com uma janela acesa e um figurante. */
const Vizinho: React.FC<{ t: number }> = ({ t }) => (
  <g>
    <rect x={-110} y={-260} width={220} height={260} fill="#3B4456" />
    {[0, 1].map((r) => [0, 1].map((cc) => <rect key={`${r}${cc}`} x={-80 + cc * 100} y={-230 + r * 120} width={60} height={80} fill={r === 0 && cc === 1 ? "#F0B94E" : "#1E2230"} />))}
    <g transform="translate(50 -150)"><Figurante x={0} y={0} s={0.18} cor="#2A2D33" t={t} seed={3} /></g>
  </g>
);

export const makeShots = (tl: Timeline): Shot[] => {
  const c = tl.cues;
  const ac = acentosDe(tl.captions);
  const s9 = tl.segments.find((x) => x.id === "s9")?.start ?? 21.2;
  const t1 = c.h_mesma - 0.3;
  const t2 = c.p_pergunta - 0.1;
  const t3 = c.p_agora - 0.1;
  const t4 = c.s_sinais - 0.1;
  const t5 = c.s_vizinho - 0.25;
  const t6 = s9 - 0.05;
  const t7 = c.j_socio - 0.2;
  const t8 = c.v_sala - 0.15;
  const t9 = c.v_tour - 0.1;
  const t10 = c.v_espaco - 0.1;
  const t11 = c.r_trena - 0.15;
  const t12 = c.r_horario - 0.15;
  const t13 = c.f_segunda - 0.15;
  const tFim = c.cta_quer - 0.05;

  return [
    {
      id: "1 de novo", a: 0, b: t1, clima: "evento", vin: 0.78, push: 0.012,
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={520} p={prog(t, 0, 0.3)} />
          <g transform={`translate(760 ${FLOOR})`}><Porta abre={prog(t, 0.2, 0.6, ease.out)} /></g>
          <Personagem t={t} x={330} y={FLOOR} s={0.86} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.h_cliente, 10, 95)} />
          <Pop t={t} at={c.h_novo - 0.3} x={760} y={FLOOR}><Personagem t={t} x={0} y={0} s={0.82} v={VIS.comprador} seed={1} acentos={ac} humor="neutro" flip /></Pop>
        </>
      ),
      html: (t) => <Etiqueta t={t} at={c.h_novo - 0.05} x={540} y={560} texto="PEDIU PARA VER DE NOVO" cor="white" size={40} />,
      selo: (t) => <Selo t={t} at={0.1} texto="2ª VISITA" />,
    },
    {
      id: "2 a mesma visita", a: t1, b: t2, clima: "pergunta", vin: 0.85, hits: [c.h_vez], punch: [{ at: c.h_mesma, s: 1.05, y: 10 }],
      svg: (t) => (
        <>
          <Holofote x={400} chao={FLOOR} w={480} />
          <Personagem t={t} x={400} y={FLOOR} s={0.9} v={VIS.A} acentos={ac} humor="feliz" fala braco={gesto(t, t1 + 0.1, 20, 120)} bracoE={-40} />
          <Pop t={t} at={t1 + 0.15} x={660} y={700}><Balao texto="ESTA É A SALA…" w={440} size={44} /></Pop>
          <g transform={`translate(860 ${FLOOR})`} opacity={0.9}><Personagem t={t} x={0} y={0} s={0.7} v={VIS.comprador} seed={1} humor="neutro" flip /></g>
        </>
      ),
      html: (t) => <Carimbo t={t} at={c.h_vez - 0.05} x={540} y={470} texto="OUTRA VEZ?" size={74} rot={-6} />,
    },
    {
      id: "3 a primeira pergunta", a: t2, b: t3, clima: "explica", vin: 0.75, push: 0.012,
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={520} />
          <Personagem t={t} x={540} y={FLOOR} s={0.92} v={VIS.comprador} seed={1} acentos={ac} humor="neutro" olhar={-1} braco={gesto(t, c.p_gostava - 0.1, 10, 40)} />
          <Pop t={t} at={c.p_gostava - 0.1} x={820} y={760}><Balao texto="GOSTO?" w={300} size={56} cauda={-1} /></Pop>
        </>
      ),
      html: (t) => <Etiqueta t={t} at={c.p_primeira - 0.05} x={540} y={470} texto="1ª VISITA" cor="dark" size={44} />,
      selo: (t) => <Selo t={t} at={t2 + 0.05} texto="A PERGUNTA MUDOU" />,
    },
    {
      id: "4 como seria morar", a: t3, b: t4, clima: "ganho", vin: 0.65, hits: [c.p_morar], punch: [{ at: c.p_morar, s: 1.05, y: -10 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={520} cor={aa(1)} />
          <Personagem t={t} x={540} y={FLOOR} s={0.92} v={VIS.comprador} seed={1} acentos={ac} humor="feliz" braco={gesto(t, c.p_morar - 0.1, 10, 130)} />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.p_agora - 0.05} x={540} y={470} texto="2ª VISITA" cor="dark" size={44} />
          <Etiqueta t={t} at={c.p_morar - 0.15} x={540} y={640} texto="COMO SERIA MORAR AQUI?" cor="green" size={46} />
        </>
      ),
    },
    {
      id: "5 mede, sofá, armário", a: t4, b: t5, clima: "explica", vin: 0.75, hits: [c.s_mede, c.s_armario],
      svg: (t) => {
        const fita = mix(0, 280, prog(t, c.s_mede - 0.1, 0.6, ease.out));
        return (
          <>
            <Pop t={t} at={c.s_sofa - 0.15} x={480} y={830}><SofaFantasma p={1} /></Pop>
            <Holofote x={360} chao={FLOOR} w={460} />
            <Pop t={t} at={c.s_armario - 0.4} x={860} y={FLOOR}><Armario abre={prog(t, c.s_armario - 0.05, 0.4, ease.out)} /></Pop>
            <Personagem t={t} x={360} y={FLOOR} s={0.86} v={VIS.comprador} seed={1} acentos={ac} humor="neutro" braco={gesto(t, c.s_mede - 0.15, 10, 95)} item={<Trena fita={fita} />} />
          </>
        );
      },
      html: (t) => <Etiqueta t={t} at={c.s_sofa} x={480} y={560} texto="CABE O SOFÁ?" cor="white" size={38} />,
      selo: (t) => <Selo t={t} at={t4 + 0.05} texto="REPARE NOS SINAIS" cor="green" />,
    },
    {
      id: "6 vizinho, barulho, sol", a: t5, b: t6, clima: "explica", vin: 0.75, push: 0.014,
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={520} />
          <Personagem t={t} x={540} y={FLOOR} s={0.86} v={VIS.comprador} seed={1} acentos={ac} humor="neutro" olhar={1} braco={gesto(t, c.s_vizinho - 0.1, 10, 60)} />
          <Pop t={t} at={c.s_vizinho - 0.1} x={200} y={760}><Vizinho t={t} /></Pop>
          <Pop t={t} at={c.s_barulho - 0.1} x={540} y={640}><Barulho t={t} /></Pop>
          <Pop t={t} at={c.s_sol - 0.1} x={880} y={620}><Sol /></Pop>
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.s_vizinho} x={200} y={820} texto="VIZINHO" cor="dark" size={32} />
          <Etiqueta t={t} at={c.s_barulho} x={540} y={760} texto="BARULHO" cor="dark" size={32} />
          <Etiqueta t={t} at={c.s_sol} x={880} y={760} texto="SOL DA TARDE" cor="dark" size={32} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t5 + 0.05} texto="REPARE NOS SINAIS" cor="green" />,
    },
    {
      id: "7 traz alguém junto", a: t6, b: t7, clima: "evento", vin: 0.78, hits: [c.j_mae],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={600} />
          <Personagem t={t} x={430} y={FLOOR} s={0.86} v={VIS.comprador} seed={1} acentos={ac} humor="feliz" braco={gesto(t, c.j_junto - 0.1, 10, 80)} />
          <Pop t={t} at={c.j_mae - 0.15} x={720} y={FLOOR}><Personagem t={t} x={0} y={0} s={0.8} v={MAE} seed={3} acentos={ac} humor="neutro" flip /></Pop>
        </>
      ),
      html: (t) => <Etiqueta t={t} at={c.j_mae} x={720} y={560} texto="A MÃE" cor="white" size={40} />,
    },
    {
      id: "8 quem divide a decisão", a: t7, b: t8, clima: "evento", vin: 0.78, push: 0.012, hits: [c.j_socio],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={640} />
          <Personagem t={t} x={300} y={FLOOR} s={0.8} v={VIS.comprador} seed={1} acentos={ac} humor="feliz" />
          <Personagem t={t} x={560} y={FLOOR} s={0.76} v={MAE} seed={3} humor="neutro" flip />
          <Pop t={t} at={c.j_socio - 0.15} x={820} y={FLOOR}><Personagem t={t} x={0} y={0} s={0.82} v={SOCIO} seed={4} acentos={ac} humor="neutro" flip braco={gesto(t, c.j_decisao - 0.1, 8, 50)} /></Pop>
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.j_socio} x={820} y={560} texto="O SÓCIO" cor="white" size={40} />
          <Carimbo t={t} at={c.j_decisao - 0.05} x={540} y={470} texto="QUEM DECIDE JUNTO" cor="white" size={60} rot={-5} />
        </>
      ),
    },
    {
      id: "9 você atrapalha", a: t8, b: t9, clima: "conflito", vin: 0.9, hits: [c.v_atrapalha + 0.03], punch: [{ at: c.v_atrapalha, s: 1.06 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={560} cor="#FFD9D4" />
          <Personagem t={t} x={330} y={FLOOR} s={0.88} v={VIS.A} acentos={ac} humor="feliz" fala braco={gesto(t, t8 + 0.1, 30, 120)} bracoE={-60} />
          <Pop t={t} at={t8 + 0.1} x={360} y={700}><Balao texto="E AQUI A COZINHA…" w={500} size={42} /></Pop>
          <Personagem t={t} x={770} y={FLOOR} s={0.84} v={VIS.comprador} seed={1} acentos={ac} humor={t > c.v_atrapalha - 0.1 ? "bravo" : "neutro"} flip
            braco={gesto(t, c.v_atrapalha - 0.1, 95, 20)} item={<Trena fita={t > c.v_atrapalha - 0.1 ? 0 : 140} />} />
        </>
      ),
      html: (t) => <Carimbo t={t} at={c.v_atrapalha - 0.03} x={540} y={470} texto="ATRAPALHA" cor="red" size={78} rot={-6} />,
    },
    {
      id: "10 não precisa de tour", a: t9, b: t10, clima: "conflito", vin: 0.88, hits: [c.v_tour + 0.05],
      svg: (t) => <Proibido t={t} at={c.v_tour + 0.05} x={540} y={720} r={190} />,
      html: (t) => <Etiqueta t={t} at={c.v_tour - 0.1} x={540} y={720} texto="TOUR" cor="white" size={72} />,
    },
    {
      id: "11 espaço pra se imaginar", a: t10, b: t11, clima: "ganho", vin: 0.6, hits: [c.v_espaco + 0.03], punch: [{ at: c.v_espaco, s: 1.05, y: -10 }], flash: t10,
      svg: (t) => (
        <>
          <Pop t={t} at={t10 + 0.05} x={600} y={830}><SofaFantasma p={1} solido={prog(t, c.v_imaginar - 0.1, 0.5)} /></Pop>
          <Holofote x={620} chao={FLOOR} w={520} cor={aa(1)} />
          <g transform={`translate(170 ${FLOOR})`}><Porta abre={1} /></g>
          <Personagem t={t} x={170} y={FLOOR} s={0.78} v={VIS.A} acentos={ac} humor="feliz" bracoE={-12} braco={12} />
          <Personagem t={t} x={640} y={FLOOR} s={0.9} v={VIS.comprador} seed={1} acentos={ac} humor="feliz" braco={gesto(t, c.v_imaginar - 0.1, 10, 140)} />
        </>
      ),
      html: (t) => <Carimbo t={t} at={c.v_espaco - 0.03} x={540} y={470} texto="ESPAÇO" cor="green" size={78} rot={-6} />,
    },
    {
      id: "12 leve na mão", a: t11, b: t12, clima: "explica", vin: 0.72, push: 0.012,
      svg: (t) => (
        <>
          <g transform="translate(540 650)"><Checklist t={t} titulo="LEVE NA MÃO" w={720} itens={[{ k: "TRENA", at: c.r_trena }, { k: "MEDIDAS DOS CÔMODOS", at: c.r_medidas }, { k: "VALOR DO CONDOMÍNIO", at: c.r_condominio }]} /></g>
          <Holofote x={540} chao={FLOOR} w={460} />
          <Personagem t={t} x={540} y={FLOOR} s={0.82} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.r_trena - 0.1, 10, 100)} item={<Trena fita={0} />} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t11 + 0.05} texto="ANTES DA 2ª VISITA" cor="green" />,
    },
    {
      id: "13 no horário de viver ali", a: t12, b: t13, clima: "explica", vin: 0.75, hits: [c.r_noite],
      svg: (t) => {
        const noite = prog(t, c.r_noite - 0.15, 0.7, ease.inOut);
        return (
          <>
            <g transform="translate(540 640)"><Janela noite={noite} /></g>
            <Holofote x={540} chao={FLOOR} w={520} />
            <rect x={0} y={0} width={1080} height={1920} fill="#050814" opacity={0.35 * noite} />
            <Personagem t={t} x={540} y={FLOOR} s={0.86} v={VIS.comprador} seed={1} acentos={ac} humor={noite > 0.5 ? "feliz" : "neutro"} braco={gesto(t, c.r_noite - 0.1, 10, 70)} />
          </>
        );
      },
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.r_dia - 0.05} x={300} y={900} texto="TRABALHA DE DIA" cor="dark" size={34} />
          <Etiqueta t={t} at={c.r_noite - 0.05} x={790} y={900} texto="MOSTRE À NOITE" cor="green" size={34} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t12 + 0.05} texto="O HORÁRIO DELE" />,
    },
    {
      id: "14 fale menos", a: t13, b: tFim, clima: "ganho", vin: 0.6, hits: [c.f_menos + 0.03], punch: [{ at: c.f_menos, s: 1.05 }],
      svg: (t) => (
        <>
          <g transform={`translate(760 ${FLOOR + 20})`} opacity={0.85}>
            <g transform="translate(0 -240)"><SofaFantasma p={1} solido={1} /></g>
            <Personagem t={t} x={0} y={0} s={0.62} v={VIS.comprador} seed={1} humor="feliz" flip />
          </g>
          <Holofote x={360} chao={FLOOR + 60} w={520} cor={aa(1)} />
          <Personagem t={t} x={360} y={FLOOR + 60} s={0.98} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.f_menos - 0.1, 12, 30)} bracoE={-12} />
          <Pop t={t} at={c.f_menos + 0.1} x={600} y={1240}><Check r={44} /></Pop>
        </>
      ),
      html: (t) => <Carimbo t={t} at={c.f_menos - 0.05} x={540} y={600} texto="FALE MENOS." sub="DEIXE O CLIENTE SE IMAGINAR" cor="green" size={78} rot={-6} />,
      selo: (t) => <Selo t={t} at={t13 + 0.05} texto="NA 2ª VISITA" />,
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

export { pop, F };
