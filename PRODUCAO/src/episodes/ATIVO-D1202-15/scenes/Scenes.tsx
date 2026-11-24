import React from "react";
import { prog } from "../../../lib/anim";
import type { Timeline } from "../../types";
import { aa } from "../../NOV26/kit";
import {
  Balao, Calendario, CamCartoon, Carimbo, Casa, Checklist, type Clima, Confete, Contador, Etiqueta, Flash, Holofote,
  Pasta, Personagem, Pop, Raios, Selo, VIS, acentosDe, gesto, pop,
} from "../../../estilos/cartoon";

/**
 * ATIVO-D1202-15 — "Cinquenta mil a mais" (grade 02/12/2026 · 15h · CORRETOR NA VIDA REAL · PRIMEIRO MODELO, Cartoon explicativo).
 * O dono liga: o outro corretor vende por +50 mil → cabo de guerra pelo número (CAPTAÇÃO ≠ VENDA) → a casa acima do mercado
 * fica parada: calendário vira, anúncio envelhece, comprador desconfia, o preço cai abaixo do sugerido → NÃO DISCUTA: MOSTRE
 * os VENDIDOS (não os anunciados) → a regra dos 30 dias → o número alto ganha a assinatura; a data combinada ganha a venda.
 * Prática profissional, sem estatística; o rival é genérico. Personagens ilustrativos.
 */
const FLOOR = 1540;
export type Shot = {
  id: string; a: number; b: number; clima: Clima; vin?: number; push?: number;
  punch?: { at: number; s: number; x?: number; y?: number }[]; hits?: number[];
  svg?: (t: number) => React.ReactNode; html?: (t: number) => React.ReactNode; selo?: (t: number) => React.ReactNode; flash?: number;
};
const DONO = { ...VIS.lider, terno: "#7A4E3A", sombraTerno: "#5F3C2D", camisa: "#7A4E3A", gravata: undefined, calca: "#2A2D33" };
const RIVAL = { ...VIS.B, terno: "#4A4F5C", sombraTerno: "#3A3E49", gravata: "#C9CED6" };

/** Celular na mão. */
const Celular: React.FC = () => (
  <g><rect x={-26} y={-48} width={52} height={96} rx={10} fill="#16181D" /><rect x={-20} y={-38} width={40} height={70} rx={4} fill="#9EC3E6" /></g>
);
/** Placa VENDE-SE em estaca. */
const PlacaVende: React.FC<{ velha?: number }> = ({ velha = 0 }) => (
  <g>
    <rect x={-8} y={-10} width={16} height={190} fill="#5A3A2A" />
    <rect x={-120} y={-110} width={240} height={110} rx={10} fill={velha > 0.5 ? "#C9CED6" : "#F4F5F7"} stroke="#0A0A0C" strokeWidth={6} transform={`rotate(${velha * -9})`} />
    <text x={0} y={-42} textAnchor="middle" fontFamily="Manrope" fontWeight={800} fontSize={40} fill="#111" transform={`rotate(${velha * -9})`}>VENDE-SE</text>
    {velha > 0.2 ? <path d="M-120 -110 L-60 -60 M-120 -60 L-60 -110 M-90 -110 L-90 -60" stroke="#FFFFFF" strokeOpacity={0.55 * velha} strokeWidth={3} fill="none" /> : null}
  </g>
);

export const makeShots = (tl: Timeline): Shot[] => {
  const c = tl.cues;
  const ac = acentosDe(tl.captions);
  const t1 = c.t_brigar - 0.3;
  const t2 = c.p_acima - 0.3;
  const t3 = c.v_entao - 0.3;
  const t4 = c.r_regra - 0.3;
  const t5 = c.f_assinatura - 0.3;
  const tFim = c.cta_quer - 0.05;
  return [
    {
      id: "1 a ligação", a: 0, b: t1, clima: "pergunta", vin: 0.82, push: 0.014, hits: [c.h_50], punch: [{ at: c.h_50, s: 1.06, y: 8 }],
      svg: (t) => (
        <>
          <Holofote x={300} chao={FLOOR} w={520} p={prog(t, 0, 0.3)} />
          <Personagem t={t} x={300} y={FLOOR} s={0.88} v={DONO} seed={4} acentos={ac} humor="feliz" fala braco={150} item={<Celular />} />
          <Personagem t={t} x={800} y={FLOOR} s={0.86} v={VIS.A} acentos={ac} humor={t > c.h_50 ? "espanto" : "neutro"} flip braco={gesto(t, c.h_liga, 10, 150)} item={<Celular />} />
          <Pop t={t} at={c.h_outro - 0.2} x={560} y={900}><g transform="scale(0.55)"><Personagem t={t} x={0} y={0} s={1} v={RIVAL} seed={7} humor="feliz" braco={140} /></g></Pop>
          <Pop t={t} at={c.h_50 - 0.15} x={330} y={720}><Balao texto="+ R$ 50 MIL" w={420} size={60} /></Pop>
        </>
      ),
      html: (t) => <Etiqueta t={t} at={c.h_outro - 0.05} x={560} y={500} texto="O OUTRO CORRETOR" cor="dark" size={34} />,
      selo: (t) => <Selo t={t} at={0.1} texto="A LIGAÇÃO" />,
    },
    {
      id: "2 brigar pelo número", a: t1, b: t2, clima: "conflito", vin: 0.88, hits: [c.t_numero, c.t_venda], punch: [{ at: c.t_captacao, s: 1.05 }],
      svg: (t) => {
        const puxa = Math.sin(t * 7) * 16;
        return (
          <>
            <Holofote x={540} chao={FLOOR} w={760} cor="#FFD9D4" />
            <g transform={`translate(${540 + puxa} 760)`}>
              <rect x={-300} y={-8} width={600} height={16} rx={8} fill="#8A6A4A" />
              <rect x={-150} y={-70} width={300} height={110} rx={14} fill="#F4F5F7" stroke="#0A0A0C" strokeWidth={6} />
              <text x={0} y={8} textAnchor="middle" fontFamily="Manrope" fontWeight={800} fontSize={52} fill="#111">R$ +50 MIL</text>
            </g>
            <Personagem t={t} x={200 + puxa} y={FLOOR} s={0.84} v={VIS.A} acentos={ac} humor="bravo" braco={95} />
            <Personagem t={t} x={880 + puxa} y={FLOOR} s={0.84} v={RIVAL} seed={7} acentos={ac} humor="bravo" flip braco={95} />
          </>
        );
      },
      html: (t) => <Carimbo t={t} at={c.t_captacao - 0.03} x={540} y={560} texto="CAPTAÇÃO ≠ VENDA" cor="red" size={58} rot={-5} />,
      selo: (t) => <Selo t={t} at={t1 + 0.05} texto="BRIGAR PELO NÚMERO?" cor="red" />,
    },
    {
      id: "3 acima do mercado: parado", a: t2, b: t3, clima: "conflito", vin: 0.84, push: 0.01, hits: [c.p_parado, c.p_cai, c.p_abaixo],
      svg: (t) => {
        const velha = prog(t, c.p_envelhece - 0.1, 0.6);
        return (
          <>
            <Holofote x={420} chao={FLOOR} w={560} cor={velha > 0.5 ? "#C9CED6" : "#FFFFFF"} />
            <g transform="translate(380 1420)"><Casa w={420} /></g>
            <g transform="translate(720 1430)"><PlacaVende velha={velha} /></g>
            <Pop t={t} at={c.p_parado - 0.2} x={820} y={640}><g transform="scale(0.75)"><Calendario mes={t > c.p_visita ? "+60 DIAS" : "+30 DIAS"} cor="#4A4F5C" /></g></Pop>
            <Pop t={t} at={c.p_desconfia - 0.25} x={150} y={1500}><g transform="scale(0.5)"><Personagem t={t} x={0} y={0} s={1} v={VIS.comprador} seed={1} humor="bravo" /></g></Pop>
            <Pop t={t} at={c.p_desconfia - 0.1} x={190} y={1150}><Balao texto="?" w={120} size={70} /></Pop>
          </>
        );
      },
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.p_parado - 0.05} x={380} y={520} texto="ACIMA DO MERCADO" cor="red" size={38} />
          <Etiqueta t={t} at={c.p_envelhece - 0.05} x={760} y={1250} texto="ANÚNCIO VELHO" cor="dark" size={32} />
          <Contador t={t} at={c.p_cai - 0.1} de={550} ate={470} x={420} y={690} dur={1.0} prefixo="R$ " sufixo=" MIL" size={76} cor={t > c.p_abaixo - 0.1 ? "red" : "white"} />
          <Etiqueta t={t} at={c.p_abaixo - 0.05} x={420} y={790} texto="ABAIXO DO SUGERIDO" cor="red" size={34} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t2 + 0.05} texto="FICA PARADO" cor="red" />,
    },
    {
      id: "4 vendidos, não anunciados", a: t3, b: t4, clima: "explica", vin: 0.72, push: 0.012, hits: [c.v_mostre, c.v_vendidos],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={620} />
          <Personagem t={t} x={330} y={FLOOR} s={0.88} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.v_mostre - 0.1, 10, 100)} item={t > c.v_mostre - 0.15 ? <g transform="scale(0.9)"><Pasta label="VENDAS" /></g> : null} />
          <Personagem t={t} x={790} y={FLOOR} s={0.86} v={DONO} seed={4} acentos={ac} humor={t > c.v_vendidos ? "feliz" : "neutro"} flip />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.v_avaliacao - 0.05} x={540} y={480} texto="NÃO DISCUTA A AVALIAÇÃO" cor="dark" size={36} />
          <Carimbo t={t} at={c.v_vendidos - 0.03} x={360} y={660} texto="VENDIDOS" cor="green" size={64} rot={-6} />
          <Etiqueta t={t} at={c.v_anunciados - 0.05} x={760} y={680} texto="ANUNCIADOS ✕" cor="dark" size={34} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t3 + 0.05} texto="MOSTRE" />,
    },
    {
      id: "5 a regra dos 30 dias", a: t4, b: t5, clima: "explica", vin: 0.72, push: 0.012, hits: [c.r_30, c.r_juntos],
      svg: (t) => (
        <>
          <g transform="translate(540 680)"><Checklist t={t} titulo="A REGRA COM O DONO" w={760} itens={[{ k: "30 DIAS SEM VISITA", at: c.r_30 }, { k: "REVISAM O PREÇO", at: c.r_revisam }, { k: "JUNTOS", at: c.r_juntos }]} /></g>
          <Holofote x={540} chao={FLOOR} w={600} />
          <Personagem t={t} x={400} y={FLOOR} s={0.84} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.r_juntos - 0.2, 10, 75)} />
          <Personagem t={t} x={680} y={FLOOR} s={0.84} v={DONO} seed={4} acentos={ac} humor="feliz" flip braco={gesto(t, c.r_juntos - 0.2, 10, 75)} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t4 + 0.05} texto="COMBINE A REGRA" cor="green" />,
    },
    {
      id: "6 a data ganha a venda", a: t5, b: tFim, clima: "ganho", vin: 0.62, hits: [c.f_data + 0.03], punch: [{ at: c.f_venda, s: 1.05 }],
      svg: (t) => (
        <>
          <Holofote x={190} chao={FLOOR} w={360} cor="#C9CED6" p={1 - prog(t, c.f_data, 0.5) * 0.6} />
          <Personagem t={t} x={190} y={FLOOR} s={0.76} v={RIVAL} seed={7} acentos={ac} humor={t > c.f_data ? "triste" : "feliz"} braco={gesto(t, c.f_assinatura - 0.1, 10, 120)} />
          <Holofote x={700} chao={FLOOR + 40} w={600} cor={aa(1)} p={prog(t, c.f_data - 0.1, 0.4)} />
          <Personagem t={t} x={590} y={FLOOR + 40} s={0.86} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.f_data - 0.1, 12, 140)} />
          <Personagem t={t} x={850} y={FLOOR + 40} s={0.84} v={DONO} seed={4} humor="feliz" flip />
          <Pop t={t} at={c.f_data - 0.2} x={720} y={760}><g transform="scale(0.6)"><Calendario mes="30 DIAS" cor="#2C3E66" /></g></Pop>
          <Confete t={t} at={c.f_venda} />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.f_assinatura - 0.05} x={220} y={900} texto="ASSINATURA" cor="dark" size={34} />
          <Carimbo t={t} at={c.f_venda - 0.03} x={720} y={560} texto="VENDA" cor="green" size={70} rot={5} />
        </>
      ),
      selo: (t) => <Selo t={t} at={c.f_data - 0.1} texto="DATA COMBINADA" cor="green" />,
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
