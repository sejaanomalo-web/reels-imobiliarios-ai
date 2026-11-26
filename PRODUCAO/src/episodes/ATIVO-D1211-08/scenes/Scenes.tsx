import React from "react";
import type { Timeline } from "../../types";
import { A } from "../../NOV26/kit";
import type { AtmosferaNome } from "../../../theme";
import {
  Bloco, Boneco, ConeLuz, Fluxo, ModulosSistema, Poeira, Predio,
  camAt, ease, prog, sp, type Cam, type Capitulo, type PlacaDef, type V3,
} from "../../../estilos/maquete";

/**
 * ATIVO-D1211-08 — "Sete dias para desistir" (grade 11/12/2026 · 08h · E SE…? · Maquete 3D).
 * Um só mundo: o estande de vendas com a maquete do prédio; sete blocos-dia brotam atrás → a comissão volta em arco para o
 * cliente → imóvel na planta, em estande ou fora da sede → sete dias, devolução de tudo, até a corretagem → o 8º dia: o
 * contrato acende firme → o corretor explica antes e acompanha a semana (os dias acendem) → venda bem feita → SISTEMA.
 * Apuração: Lei 4.591/1964, art. 67-A, §§10–12 (Lei 13.786/2018).
 */
const G: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: A.hex }}>{children}</span>;
const EST: V3 = [0, 0, 0];
const MESA: V3 = [0, 0, 0.8];
const COR: V3 = [-1.2, 0, 1.9];
const CLI: V3 = [1.2, 0, 2.0];
const DOC: V3 = [2.4, 0, 0.9];
const DIAS: V3[] = Array.from({ length: 7 }, (_, i) => [-2.7 + i * 0.9, 0, -2.6] as V3);
const D8: V3 = [3.6, 0, -2.6];
const CTA_BASE: V3 = [14, 0, -9];
const ini = (tl: Timeline, id: string) => tl.scenes.find((s) => s.id === id)?.start ?? 0;
const add = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];

export const capitulos = (c: Record<string, number>, tl: Timeline): (Capitulo & { atm: AtmosferaNome })[] => [
  { de: 0, atm: "dilema", chip: "E SE…?", titulo: <>Desistir em <G>7 dias</G>?</> },
  { de: ini(tl, "onde") + 0.1, atm: "explicacao", chip: "JÁ EXISTE", titulo: <>Na planta, <G>no estande</G></> },
  { de: ini(tl, "regra") + 0.1, atm: "dados", chip: "LEI 4.591 · ART. 67-A", titulo: <>Devolve <G>até a corretagem</G></> },
  { de: ini(tl, "virada") + 0.1, atm: "tensao", chip: "DEPOIS DO PRAZO", titulo: <>Contrato <G>firme</G></> },
  { de: ini(tl, "acao") + 0.1, atm: "neutra", chip: "NO ESTANDE", titulo: <>Explique e <G>acompanhe</G></> },
  { de: ini(tl, "desfecho") + 0.1, atm: "explicacao", chip: "A LIÇÃO", titulo: <>Venda <G>bem feita</G></> },
  { de: c.cta_quer - 0.1, atm: "explicacao", chip: "SEU SISTEMA", titulo: <>Um sistema <G>personalizado</G></> },
  { de: c.cta_comment - 0.3, atm: "solucao", chip: "SEU SISTEMA" },
];

const deriva = (t: number, c: Record<string, number>, cam: Cam): Cam => {
  const k = 1 - prog(t, c.cta_quer - 0.3, 0.8);
  return { ...cam, pos: [cam.pos[0] + k * 0.55 * Math.sin(t * 0.43), cam.pos[1] + k * 0.2 * Math.sin(t * 0.31 + 1), cam.pos[2] - k * 0.5 * Math.sin(t * 0.29 + 0.5)] };
};
export const camera = (t: number, c: Record<string, number>, tl: Timeline): Cam => deriva(t, c, camAt(t, [
  { t: 0, pos: [0.4, 7.4, 13.4], alvo: [0, 1.0, 0.2], fov: 40 },
  { t: c.h_sete, pos: [0.6, 8.2, 14.6], alvo: [0.2, 0.8, -0.4], fov: 40, e: ease.inOut },
  { t: c.o_estande, pos: [0.2, 7.2, 12.8], alvo: [0, 0.9, 0.8], fov: 40, e: ease.inOut },
  { t: c.r_sete, pos: [0.6, 8.4, 14.8], alvo: [0.4, 0.8, -0.4], fov: 40, e: ease.inOut },
  { t: c.v_firme, pos: [1.6, 7.6, 13.6], alvo: [1.6, 0.9, 0.0], fov: 40, e: ease.inOut },
  { t: c.a_semana, pos: [0.6, 8.4, 15.0], alvo: [0.4, 0.8, -0.2], fov: 40, e: ease.inOut },
  { t: c.cta_quer - 0.3, pos: [0.6, 8.4, 15.2], alvo: [0.4, 0.8, -0.2], fov: 40 },
  { t: c.cta_quer + 0.9, pos: [CTA_BASE[0], 9.0, CTA_BASE[2] + 13.5], alvo: [CTA_BASE[0], 2.1, CTA_BASE[2] - 0.8], fov: 38, e: ease.inOut },
  { t: c.cta_comment - 0.2, pos: [CTA_BASE[0], 9.2, CTA_BASE[2] + 13.8], alvo: [CTA_BASE[0], 2.2, CTA_BASE[2] - 0.8], fov: 38 },
  { t: c.cta_comment + 0.5, pos: [CTA_BASE[0], 10.0, CTA_BASE[2] + 15.0], alvo: [CTA_BASE[0], 3.2, CTA_BASE[2] - 1.0], fov: 38, e: ease.inOut },
  { t: tl.duration, pos: [CTA_BASE[0] + 0.6, 10.4, CTA_BASE[2] + 15.8], alvo: [CTA_BASE[0], 3.2, CTA_BASE[2] - 1.0], fov: 38 },
]));

export const clima = (t: number, c: Record<string, number>, tl: Timeline) => {
  const caps = capitulos(c, tl);
  const i = caps.reduce((acc, k, j) => (t >= k.de ? j : acc), 0);
  const ant = caps[Math.max(0, i - 1)].atm;
  return { atm: ant, atmPara: caps[i].atm, atmK: i === 0 ? 1 : prog(t, caps[i].de, 0.6, ease.inOut) };
};

export const Maquete3D: React.FC<{ t: number; tl: Timeline }> = ({ t, tl }) => {
  const c = tl.cues;
  const s = (at: number, d = 0.35) => sp(t, at - d, { damping: 12, stiffness: 170 });
  const fimCena = 1 - prog(t, c.cta_quer + 0.4, 0.5);
  const volta = prog(t, c.h_comissao - 0.3, 1.0) * (1 - prog(t, c.o_existe, 0.5)) + prog(t, c.r_corretagem - 0.3, 1.0) * (1 - prog(t, c.v_passados, 0.5));
  const firme = prog(t, c.v_firme - 0.15, 0.4);
  const acomp = prog(t, c.a_acompanhe - 0.2, c.a_semana - c.a_acompanhe + 0.6);
  const bem = prog(t, c.f_feita - 0.15, 0.5);
  return (
    <>
      <Poeira t={t} centro={[0, 2, 0]} n={24} />
      <Bloco pos={add(EST, [0.4, 0.03, -0.2])} tam={[8.8, 0.06, 5.8]} surge={s(0.1, 0.2) * fimCena} mat="grafite" />
      {/* o estande: mesa, maquete do prédio, corretor e cliente */}
      <Bloco pos={add(MESA, [0, 0.38, 0])} tam={[2.2, 0.08, 0.9]} surge={s(0.2, 0.25) * fimCena} />
      <Predio pos={add(MESA, [0, 0.42, 0])} andares={5} escala={0.28} surge={s(0.35, 0.3) * fimCena} acende={bem * 0.4} />
      <Boneco pos={COR} rot={0.5} gravata surge={s(c.h_desistir - 0.3, 0.3) * fimCena} pose={t > c.a_explique - 0.2 && t < c.f_passa ? "aponta" : "pe"} acende={Math.max(acomp, bem) * 0.4} />
      <Boneco pos={CLI} rot={-0.5} surge={s(c.h_desistir - 0.2, 0.3) * fimCena} acende={bem * 0.4} />
      {/* os sete dias e o oitavo */}
      {DIAS.map((p, i) => (
        <Bloco key={i} pos={p} tam={[0.6, 0.6, 0.6]} surge={s(c.h_sete - 0.2 + i * 0.06, 0.25) * fimCena}
          acende={Math.max(prog(t, c.r_sete - 0.2 + i * 0.05, 0.3) * 0.25 * (1 - prog(t, c.v_passados, 0.4)), (acomp > (i + 0.5) / 7 ? 0.5 : 0))} />
      ))}
      <Bloco pos={D8} tam={[0.6, 0.6, 0.6]} surge={s(c.v_passados - 0.2, 0.25) * fimCena} mat={firme > 0.5 ? "argila" : "grafite"} />
      {/* a comissão volta ao cliente */}
      <Fluxo de={add(COR, [0.3, 1.2, 0])} para={add(CLI, [-0.3, 1.2, 0])} altura={1.4} p={volta * fimCena} n={10} anda={t * 0.7} />
      {/* o contrato firme */}
      <Bloco pos={add(DOC, [0, 0.55, 0])} tam={[0.7, 1.0, 0.06]} rot={-0.4} surge={s(c.v_passados, 0.25) * fimCena} acende={firme * 0.5} />
      <ConeLuz pos={DOC} alt={5.5} raio={1.4} p={firme * (1 - prog(t, c.a_explique, 0.5)) * fimCena * 0.8} verde={firme} />
      <ConeLuz pos={MESA} alt={6} raio={2.4} p={prog(t, 0.2, 0.6) * fimCena * 0.7} verde={bem} />
      <ModulosSistema t={t} tl={tl} segPergunta="s7" segComente="s7" base={CTA_BASE} />
      <ConeLuz pos={CTA_BASE} alt={6.5} raio={2.6} p={prog(t, c.cta_quer + 0.3, 0.8)} verde={prog(t, c.cta_comment, 0.6)} />
    </>
  );
};

export const holofote = (t: number, c: Record<string, number>, tl: Timeline) => {
  if (t >= c.cta_quer) return { pos: [CTA_BASE[0] + 0.4, 7.5, CTA_BASE[2] + 2.4] as V3, alvo: CTA_BASE, intensidade: prog(t, c.cta_quer + 0.3, 0.8) };
  return { pos: [0, 8, 4] as V3, alvo: [0, 0, 0.4] as V3, intensidade: 0.6 * prog(t, 0.2, 0.6) };
};

export const placas = (t: number, c: Record<string, number>, tl: Timeline): PlacaDef[] => {
  const ate = (de: number, fim: number) => prog(t, de, 0.35) * (1 - prog(t, fim, 0.3));
  return [
    { id: "7d", pos: [0.0, 1.7, -2.6], texto: "7 DIAS PARA DESISTIR?", tom: "alerta", p: ate(c.h_sete - 0.1, c.h_comissao - 0.15) },
    { id: "com", pos: add(CLI, [0, 2.3, 0]), texto: "ATÉ A COMISSÃO DE VOLTA", tom: "alerta", p: ate(c.h_comissao - 0.1, c.o_existe) },
    { id: "planta", pos: add(MESA, [0, 1.9, 0]), texto: "IMÓVEL NA PLANTA", tom: "acento", p: ate(c.o_planta - 0.1, c.r_lei - 0.1) },
    { id: "estande", pos: add(MESA, [0, 1.9, 0]), texto: "ESTANDE OU FORA DA SEDE", tom: "acento", p: ate(c.o_estande - 0.1, c.r_lei + 0.2) },
    { id: "lei", pos: [0.0, 1.7, -2.6], texto: "7 DIAS · LEI 4.591, ART. 67-A", tom: "acento", p: ate(c.r_sete - 0.1, c.r_devolucao - 0.15) },
    { id: "dev", pos: add(CLI, [0, 2.3, 0]), texto: "DEVOLUÇÃO ATÉ DA CORRETAGEM", tom: "alerta", p: ate(c.r_devolucao - 0.1, c.v_passados - 0.1) },
    { id: "firme", pos: add(DOC, [0, 1.6, 0]), texto: "DIA 8: CONTRATO FIRME", tom: "acento", p: ate(c.v_firme - 0.1, c.a_explique) },
    { id: "exp", pos: add(COR, [0, 2.3, 0]), texto: "EXPLIQUE ANTES DE ASSINAR", tom: "acento", p: ate(c.a_explique - 0.1, c.a_acompanhe - 0.1) },
    { id: "acomp", pos: [0.0, 1.7, -2.6], texto: "ACOMPANHE A SEMANA", tom: "acento", p: ate(c.a_acompanhe - 0.1, c.f_passa) },
    { id: "bem", pos: add(MESA, [0, 1.9, 0]), texto: "VENDA BEM FEITA", tom: "acento", p: ate(c.f_feita - 0.1, c.cta_quer + 0.2) },
  ];
};
