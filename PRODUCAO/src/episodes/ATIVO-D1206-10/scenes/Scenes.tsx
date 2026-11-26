import React from "react";
import { prog } from "../../../lib/anim";
import type { Timeline } from "../../types";
import { aa } from "../../NOV26/kit";
import {
  Balao, CamCartoon, Carimbo, Casa, Checklist, type Clima, Confete, Etiqueta, Flash, Fumaca, Holofote,
  Personagem, Pop, Raios, Selo, VIS, acentosDe, gesto, pop,
} from "../../../estilos/cartoon";

/**
 * ATIVO-D1206-10 — "Dez imóveis no sábado" (grade 06/12/2026 · 10h · CORRETOR NA VIDA REAL · Cartoon explicativo).
 * O pedido (10 casinhas) → a maratona (rota tracejada, o dia inteiro; "qual tinha a varanda?") → salas, quartos e preços se
 * misturam → mais visitas, mais confusão → 3 ou 4 com motivo + a ficha (gostou / não gostou) → ele consegue escolher.
 * Prática profissional; sem estatística.
 */
const FLOOR = 1540;
export type Shot = {
  id: string; a: number; b: number; clima: Clima; vin?: number; push?: number;
  punch?: { at: number; s: number; x?: number; y?: number }[]; hits?: number[];
  svg?: (t: number) => React.ReactNode; html?: (t: number) => React.ReactNode; selo?: (t: number) => React.ReactNode; flash?: number;
};
const CASAS10 = Array.from({ length: 10 }, (_, i) => ({ x: 170 + (i % 5) * 185, y: 600 + Math.floor(i / 5) * 200 }));
const Cartao: React.FC<{ texto: string; cor?: string }> = ({ texto, cor = "#F4F5F7" }) => (
  <g>
    <rect x={-130} y={-50} width={260} height={100} rx={16} fill="#000" opacity={0.3} transform="translate(8 10)" />
    <rect x={-130} y={-50} width={260} height={100} rx={16} fill={cor} stroke="#0A0A0C" strokeWidth={5} />
    <text x={0} y={15} textAnchor="middle" fontFamily="Manrope" fontWeight={800} fontSize={40} fill="#111">{texto}</text>
  </g>
);

export const makeShots = (tl: Timeline): Shot[] => {
  const c = tl.cues;
  const ac = acentosDe(tl.captions);
  const t1 = c.r_rota - 0.8;
  const t2 = c.m_salas - 0.8;
  const t3 = c.v_certeza - 0.9;
  const t4 = c.a_tres - 0.7;
  const t5 = c.a_ficha - 0.5;
  const t6 = c.f_tudo - 0.9;
  const tFim = c.cta_quer - 0.05;
  return [
    {
      id: "1 dez imóveis", a: 0, b: t1, clima: "pergunta", vin: 0.8, push: 0.012, hits: [c.h_dez, c.h_sabado], punch: [{ at: c.h_dez, s: 1.05 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={720} p={prog(t, 0, 0.3)} />
          {CASAS10.map((p, i) => (
            <Pop key={i} t={t} at={c.h_dez - 0.25 + i * 0.07} x={p.x} y={p.y}><g transform="scale(0.42)"><Casa w={300} /></g></Pop>
          ))}
          <Personagem t={t} x={300} y={FLOOR} s={0.74} v={VIS.A} acentos={ac} humor={t > c.h_sabado ? "espanto" : "neutro"} />
          <Personagem t={t} x={780} y={FLOOR} s={0.74} v={VIS.comprador} seed={1} acentos={ac} humor="feliz" flip fala={t < c.h_sabado + 0.6} />
        </>
      ),
      html: (t) => <Etiqueta t={t} at={c.h_sabado - 0.1} x={540} y={470} texto="DEZ IMÓVEIS · SÁBADO" cor="white" size={40} />,
      selo: (t) => <Selo t={t} at={0.1} texto="O PEDIDO" />,
    },
    {
      id: "2 a maratona", a: t1, b: t2, clima: "conflito", vin: 0.84, push: 0.014, hits: [c.r_rota, c.r_dia, c.r_varanda], punch: [{ at: c.r_varanda, s: 1.05 }],
      svg: (t) => {
        const rota = prog(t, c.r_rota - 0.2, 1.6);
        const cansa = prog(t, c.r_dia, 1.2);
        return (
          <>
            <Holofote x={540} chao={FLOOR} w={700} cor="#FFD9D4" p={0.6 + 0.4 * cansa} />
            <path d="M120 620 C 300 480, 420 780, 560 620 S 820 480, 960 640" fill="none" stroke="#F4F5F7" strokeWidth={10} strokeDasharray="26 22" strokeLinecap="round"
              pathLength={1} style={{ strokeDasharray: `${rota} 1` }} opacity={0.9} />
            {[120, 330, 560, 760, 960].map((x, i) => (
              <Pop key={i} t={t} at={c.r_rota - 0.2 + i * 0.25} x={x} y={i % 2 ? 560 : 680}><g transform="scale(0.36)"><Casa w={300} /></g></Pop>
            ))}
            <Personagem t={t} x={330} y={FLOOR} s={0.76} v={VIS.A} acentos={ac} humor={cansa > 0.6 ? "triste" : "neutro"} />
            <Personagem t={t} x={760} y={FLOOR} s={0.76} v={VIS.comprador} seed={1} flip humor={t > c.r_lembra - 0.2 ? "espanto" : "neutro"} fala={t > c.r_lembra - 0.2 && t < c.r_varanda + 0.6} />
            <Pop t={t} at={c.r_lembra - 0.1} x={690} y={830}><Balao texto="QUAL TINHA A VARANDA?" w={540} size={38} cauda={-1} /></Pop>
          </>
        );
      },
      html: (t) => <Etiqueta t={t} at={c.r_dia - 0.1} x={540} y={450} texto="O DIA INTEIRO" cor="red" size={40} />,
      selo: (t) => <Selo t={t} at={t1 + 0.05} texto="A MARATONA" cor="red" />,
    },
    {
      id: "3 tudo se mistura", a: t2, b: t3, clima: "pergunta", vin: 0.8, hits: [c.m_salas, c.m_quartos, c.m_precos, c.m_misturar], punch: [{ at: c.m_misturar, s: 1.05 }],
      svg: (t) => {
        const mix = prog(t, c.m_misturar - 0.2, 0.7);
        const cartas: [string, number, number, number][] = [["SALAS", c.m_salas, 260, 600], ["QUARTOS", c.m_quartos, 540, 600], ["PREÇOS", c.m_precos, 820, 600]];
        return (
          <>
            <Holofote x={540} chao={FLOOR} w={640} />
            {cartas.map(([k, at, x, y], i) => {
              const dx = mix * [180, -20, -200][i] + mix * 20 * Math.sin(t * 6 + i);
              const dy = mix * [130, -60, 100][i];
              return <Pop key={k} t={t} at={at - 0.1} x={x + dx} y={y + dy} rot={mix * [-18, 12, 24][i]}><Cartao texto={k} /></Pop>;
            })}
            <Personagem t={t} x={540} y={FLOOR} s={0.82} v={VIS.comprador} seed={1} acentos={ac} humor={mix > 0.4 ? "espanto" : "neutro"} olhar={Math.sin(t * 3)} />
          </>
        );
      },
      html: (t) => <Etiqueta t={t} at={c.m_misturar - 0.05} x={540} y={450} texto="TUDO SE MISTURA" cor="white" size={40} />,
      selo: (t) => <Selo t={t} at={t2 + 0.05} texto="DEPOIS DE ALGUNS…" />,
    },
    {
      id: "4 mais confusão", a: t3, b: t4, clima: "conflito", vin: 0.86, hits: [c.v_certeza, c.v_confusao], punch: [{ at: c.v_confusao, s: 1.07 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={620} cor="#FFD9D4" />
          <Personagem t={t} x={540} y={FLOOR} s={0.84} v={VIS.comprador} seed={1} acentos={ac} humor={t > c.v_confusao - 0.2 ? "bravo" : "neutro"} />
          <Fumaca t={t} at={c.v_confusao} r={130} />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.v_certeza - 0.1} x={540} y={500} texto="MAIS VISITAS ≠ MAIS CERTEZA" cor="white" size={38} />
          <Carimbo t={t} at={c.v_confusao - 0.03} x={540} y={680} texto="MAIS CONFUSÃO" cor="red" size={60} rot={-5} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t3 + 0.05} texto="A VIRADA" cor="red" />,
    },
    {
      id: "5 três ou quatro com motivo", a: t4, b: t5, clima: "explica", vin: 0.72, push: 0.012, hits: [c.a_tres, c.a_motivo],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={720} cor={aa(1)} p={0.7} />
          {[220, 540, 860].map((x, i) => (
            <Pop key={i} t={t} at={c.a_tres - 0.1 + i * 0.12} x={x} y={700}><g transform="scale(0.55)"><Casa w={300} /></g></Pop>
          ))}
          <Personagem t={t} x={300} y={FLOOR} s={0.74} v={VIS.A} acentos={ac} humor="feliz" fala braco={gesto(t, c.a_tres - 0.1, 10, 110)} />
          <Personagem t={t} x={780} y={FLOOR} s={0.74} v={VIS.comprador} seed={1} flip humor="feliz" />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.a_tres - 0.05} x={540} y={470} texto="3 OU 4 IMÓVEIS" cor="green" size={40} />
          {(["PERTO DA ESCOLA", "TEM VARANDA", "CABE NO BOLSO"] as const).map((k, i) => (
            <Etiqueta key={k} t={t} at={c.a_motivo - 0.1 + i * 0.25} x={[220, 540, 860][i]} y={860} texto={k} cor="white" size={26} />
          ))}
        </>
      ),
      selo: (t) => <Selo t={t} at={t4 + 0.05} texto="CADA UM COM UM MOTIVO" cor="green" />,
    },
    {
      id: "6 a ficha", a: t5, b: t6, clima: "explica", vin: 0.7, push: 0.01, hits: [c.a_ficha, c.a_gostou],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={700} cor={aa(1)} p={0.6} />
          <Pop t={t} at={c.a_ficha - 0.1} x={540} y={660}><g transform="scale(0.82)">
            <Checklist t={t} titulo="FICHA DA VISITA" itens={[{ k: "GOSTOU: A VARANDA", at: c.a_gostou }, { k: "NÃO GOSTOU: A VAGA", at: c.a_gostou + 1.1 }, { k: "IMÓVEL 2: SOL DA TARDE", at: c.a_gostou + 2.3 }]} />
          </g></Pop>
          <Personagem t={t} x={300} y={FLOOR} s={0.74} v={VIS.A} acentos={ac} humor="feliz" braco={gesto(t, c.a_ficha - 0.1, 10, 120)} />
          <Personagem t={t} x={780} y={FLOOR} s={0.74} v={VIS.comprador} seed={1} flip humor="feliz" fala={t > c.a_gostou && t < c.a_gostou + 2.5} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t5 + 0.05} texto="ENTREGUE UMA FICHA" cor="green" />,
    },
    {
      id: "7 consegue escolher", a: t6, b: tFim, clima: "ganho", vin: 0.64, hits: [c.f_tudo, c.f_escolher], punch: [{ at: c.f_escolher, s: 1.05 }],
      svg: (t) => {
        const esc = prog(t, c.f_escolher - 0.2, 0.4);
        return (
          <>
            <Holofote x={540} chao={FLOOR} w={680} cor={aa(1)} />
            {[240, 540, 840].map((x, i) => (
              <g key={i} opacity={i === 1 ? 1 : 1 - esc * 0.55}>
                <Pop t={t} at={t6 + 0.05 + i * 0.08} x={x} y={i === 1 ? 680 - esc * 30 : 700}><g transform={`scale(${i === 1 ? 0.55 + esc * 0.12 : 0.5})`}><Casa w={300} cor={i === 1 && esc > 0.5 ? "#F4F5F7" : "#E9E2D6"} /></g></Pop>
              </g>
            ))}
            <Personagem t={t} x={540} y={FLOOR} s={0.8} v={VIS.comprador} seed={1} acentos={ac} humor="feliz" braco={gesto(t, c.f_escolher - 0.1, 10, 140)} />
            <Confete t={t} at={c.f_escolher + 0.1} />
          </>
        );
      },
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.f_tudo - 0.1} x={540} y={470} texto="NÃO PRECISA LEMBRAR DE TUDO" cor="white" size={34} />
          <Carimbo t={t} at={c.f_escolher - 0.03} x={540} y={880} texto="ESCOLHER" cor="green" size={56} rot={-4} />
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
