import React from "react";
import { prog } from "../../../lib/anim";
import type { Timeline } from "../../types";
import { aa } from "../../NOV26/kit";
import {
  CamCartoon, Carimbo, Casa, Checklist, type Clima, Confete, Etiqueta, Flash, Holofote,
  Personagem, Pop, Raios, Selo, VIS, acentosDe, gesto, pop,
} from "../../../estilos/cartoon";
import { Celular } from "../../ATIVO-D1204-10/scenes/Scenes";

/**
 * ATIVO-D1207-10 — "Desconto antes da visita" (grade 07/12/2026 · 10h · CORRETOR NA VIDA REAL · Cartoon explicativo).
 * "Faz por quanto?" antes da visita → responder com número ensina que o preço cai primeiro → desconto num imóvel que ele nem
 * sabe se quer → a ordem certa: querer, depois o preço → "vamos visitar; se for o certo, levo sua proposta ao proprietário"
 * → negociação começa com o cliente querendo o imóvel. Prática profissional; sem estatística.
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
  const t1 = c.n_numero - 1.0;
  const t2 = c.s_visita - 0.8;
  const t3 = c.v_primeiro - 0.8;
  const t4 = c.a_visitar - 0.9;
  const t5 = c.f_querendo - 1.0;
  const tFim = c.cta_quer - 0.05;
  return [
    {
      id: "1 faz por quanto", a: 0, b: t1, clima: "pergunta", vin: 0.8, push: 0.012, hits: [c.h_desconto, c.h_antes], punch: [{ at: c.h_antes, s: 1.05 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={680} p={prog(t, 0, 0.3)} />
          <Pop t={t} at={0.1} x={540} y={660}><Celular t={t} x={0} y={0} s={0.72} msgs={[{ texto: ["FAZ POR QUANTO?"], lado: "ele", at: c.h_desconto - 0.1 }]} /></Pop>
          <Personagem t={t} x={540} y={FLOOR} s={0.8} v={VIS.A} acentos={ac} humor={t > c.h_antes - 0.1 ? "espanto" : "neutro"} />
        </>
      ),
      html: (t) => <Etiqueta t={t} at={c.h_antes - 0.05} x={540} y={870} texto="ANTES DE VER O IMÓVEL" cor="red" size={36} />,
      selo: (t) => <Selo t={t} at={0.1} texto="NO WHATSAPP" />,
    },
    {
      id: "2 o preço cai primeiro", a: t1, b: t2, clima: "conflito", vin: 0.84, hits: [c.n_numero, c.n_preco, c.n_cai], punch: [{ at: c.n_cai, s: 1.06 }],
      svg: (t) => {
        const cai = prog(t, c.n_cai - 0.15, 0.5);
        return (
          <>
            <Holofote x={540} chao={FLOOR} w={680} cor="#FFD9D4" />
            <Pop t={t} at={t1 + 0.05} x={330} y={640}><Celular t={t} x={0} y={0} s={0.6} msgs={[{ texto: ["FAZ POR QUANTO?"], lado: "ele", at: 0 }, { texto: ["FAÇO 10% A MENOS"], lado: "eu", at: c.n_numero - 0.1 }]} /></Pop>
            <g transform={`translate(780 ${600 + cai * 260}) rotate(${-8 + cai * 40})`} opacity={t > c.n_preco - 0.2 ? 1 : 0}>
              <rect x={-120} y={-60} width={240} height={120} rx={18} fill="#F4F5F7" stroke="#0A0A0C" strokeWidth={6} />
              <circle cx={-80} cy={0} r={14} fill="#0A0A0C" />
              <text x={20} y={16} textAnchor="middle" fontFamily="Manrope" fontWeight={800} fontSize={44} fill="#111">PREÇO</text>
            </g>
            <Personagem t={t} x={330} y={FLOOR} s={0.76} v={VIS.A} acentos={ac} humor="neutro" fala={t < c.n_aprende} />
            <Personagem t={t} x={760} y={FLOOR} s={0.76} v={VIS.comprador} seed={1} flip humor="feliz" />
          </>
        );
      },
      html: (t) => <Carimbo t={t} at={c.n_cai - 0.03} x={540} y={470} texto="O PREÇO CAI PRIMEIRO" cor="red" size={50} rot={-5} />,
      selo: (t) => <Selo t={t} at={t1 + 0.05} texto="SE JÁ RESPONDE COM NÚMERO…" cor="red" />,
    },
    {
      id: "3 sem visita", a: t2, b: t3, clima: "pergunta", vin: 0.8, hits: [c.s_visita, c.s_queira], punch: [{ at: c.s_queira, s: 1.05 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={640} />
          <Pop t={t} at={t2 + 0.05} x={540} y={700}><g transform="scale(0.7)"><Casa w={300} /></g></Pop>
          <Pop t={t} at={c.s_queira - 0.1} x={720} y={560}><text textAnchor="middle" fontFamily="Manrope" fontWeight={800} fontSize={120} fill="#F4F5F7" stroke="#0A0A0C" strokeWidth={8} paintOrder="stroke">?</text></Pop>
          <Personagem t={t} x={540} y={FLOOR} s={0.82} v={VIS.comprador} seed={1} acentos={ac} humor="neutro" olhar={Math.sin(t * 2)} />
        </>
      ),
      html: (t) => (
        <>
          <Etiqueta t={t} at={c.s_visita - 0.1} x={540} y={420} texto="DESCONTO SEM VISITA" cor="white" size={38} />
          <Carimbo t={t} at={c.s_queira - 0.03} x={540} y={860} texto="TALVEZ NEM QUEIRA" cor="red" size={50} rot={-4} />
        </>
      ),
      selo: (t) => <Selo t={t} at={t2 + 0.05} texto="E MAIS…" />,
    },
    {
      id: "4 a ordem certa", a: t3, b: t4, clima: "explica", vin: 0.72, push: 0.012, hits: [c.v_primeiro, c.v_querer, c.v_depois],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={700} cor={aa(1)} p={0.7} />
          <Pop t={t} at={c.v_primeiro - 0.1} x={540} y={680}><g transform="scale(0.85)">
            <Checklist t={t} titulo="A ORDEM CERTA" itens={[{ k: "1. QUERER O IMÓVEL", at: c.v_querer }, { k: "2. DEPOIS, O PREÇO", at: c.v_depois }]} />
          </g></Pop>
          <Personagem t={t} x={300} y={FLOOR} s={0.74} v={VIS.A} acentos={ac} humor="feliz" fala braco={gesto(t, c.v_primeiro - 0.1, 10, 110)} />
          <Personagem t={t} x={780} y={FLOOR} s={0.74} v={VIS.comprador} seed={1} flip humor="feliz" />
        </>
      ),
      selo: (t) => <Selo t={t} at={t3 + 0.05} texto="PRIMEIRO" cor="green" />,
    },
    {
      id: "5 a resposta", a: t4, b: t5, clima: "explica", vin: 0.7, push: 0.01, hits: [c.a_visitar, c.a_proposta, c.a_proprietario],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={720} cor={aa(1)} p={0.6} />
          <Pop t={t} at={t4 + 0.05} x={360} y={660}><Celular t={t} x={0} y={0} s={0.66} msgs={[{ texto: ["FAZ POR QUANTO?"], lado: "ele", at: 0 }, { texto: ["VAMOS VISITAR?", "SE FOR O CERTO,", "LEVO SUA PROPOSTA."], lado: "eu", at: c.a_visitar - 0.1, verde: true }]} /></Pop>
          <Personagem t={t} x={300} y={FLOOR} s={0.74} v={VIS.A} acentos={ac} humor="feliz" />
          <g opacity={prog(t, c.a_proprietario - 0.3, 0.3)}><Personagem t={t} x={800} y={FLOOR} s={0.74} v={VIS.B} seed={2} flip humor="feliz" /></g>
        </>
      ),
      html: (t) => <Etiqueta t={t} at={c.a_proprietario - 0.05} x={800} y={860} texto="PROPRIETÁRIO" cor="green" size={32} />,
      selo: (t) => <Selo t={t} at={t4 + 0.05} texto="RESPONDA ASSIM" cor="green" />,
    },
    {
      id: "6 querendo o imóvel", a: t5, b: tFim, clima: "ganho", vin: 0.64, hits: [c.f_querendo, c.f_chao], punch: [{ at: c.f_querendo, s: 1.05 }],
      svg: (t) => (
        <>
          <Holofote x={540} chao={FLOOR} w={700} cor={aa(1)} />
          <Pop t={t} at={t5 + 0.05} x={540} y={700}><g transform="scale(0.7)"><Casa w={300} /></g></Pop>
          <Personagem t={t} x={330} y={FLOOR} s={0.74} v={VIS.A} acentos={ac} humor="feliz" />
          <Personagem t={t} x={760} y={FLOOR} s={0.74} v={VIS.comprador} seed={1} flip humor="feliz" braco={gesto(t, c.f_querendo - 0.1, 10, 140)} />
          <Confete t={t} at={c.f_querendo + 0.1} />
        </>
      ),
      html: (t) => (
        <>
          <Carimbo t={t} at={c.f_querendo - 0.03} x={540} y={470} texto="QUERENDO O IMÓVEL" cor="green" size={52} rot={-4} />
          <Etiqueta t={t} at={c.f_chao - 0.1} x={540} y={860} texto="NÃO COM O PREÇO NO CHÃO" cor="white" size={34} />
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
