import React from "react";
import { C } from "../../../theme";
import type { Timeline } from "../../types";
import { A } from "../../NOV26/kit";
import type { AtmosferaNome } from "../../../theme";
import {
  Bloco, Boneco, Casa, ConeLuz, ModulosSistema, Poeira,
  camAt, ease, prog, sp, type Cam, type Capitulo, type PlacaDef, type V3,
} from "../../../estilos/maquete";

/**
 * ATIVO-D1203-18 — "O móvel que você montou" (grade 03/12/2026 · 18h · FORA DA BOLHA · Maquete 3D).
 * Um só mundo: o móvel se monta peça por peça → o experimento: a caixa que a pessoa montou × a caixa igual, pronta →
 * o origami malfeito que ganha valor → a busca do cliente: a lista pronta → o mapa montado junto (bairros, o que não pode
 * faltar, descarte) → o imóvel encontrado junto acende → fecho SISTEMA. Apuração: Norton, Mochon & Ariely (2012), JCP.
 */
const G: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: A.hex }}>{children}</span>;
const R: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: C.warn }}>{children}</span>;

const MONTADA: V3 = [-1.3, 0, -1];
const PRONTA: V3 = [1.3, 0, -1];
const ORIGAMI: V3 = [0, 0, 1.4];
const MAPA: V3 = [8.6, 0, 3.2];
const LISTA: V3 = [8.6, 0, 0.6];
const CASAS_MAPA: V3[] = [[7.3, 0.06, 2.4], [9.8, 0.06, 2.5], [7.5, 0.06, 3.9], [9.6, 0.06, 4.0]];
const FICA = 1; // a casa que sobra depois do descarte
const CTA_BASE: V3 = [17, 0, -9];
const ini = (tl: Timeline, id: string) => tl.scenes.find((s) => s.id === id)?.start ?? 0;
const add = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];

export const capitulos = (c: Record<string, number>, tl: Timeline): (Capitulo & { atm: AtmosferaNome })[] => [
  { de: 0, atm: "memoria", chip: "A PERGUNTA", titulo: <>O móvel que <G>você montou</G></> },
  { de: ini(tl, "estudo") + 0.1, atm: "dados", chip: "O EXPERIMENTO", titulo: <>Montada × <R>pronta</R></> },
  { de: c.e_valoriza - 0.2, atm: "explicacao", chip: "O EFEITO", titulo: <>Quem constrói <G>valoriza</G></> },
  { de: ini(tl, "virada") + 0.1, atm: "neutra", chip: "NA SUA BUSCA", titulo: <>A <R>lista pronta</R></> },
  { de: ini(tl, "junto") + 0.1, atm: "explicacao", chip: "EXPERIMENTE", titulo: <>Montar <G>com ele</G></> },
  { de: ini(tl, "desfecho") + 0.1, atm: "neutra", chip: "O RESULTADO", titulo: <>Encontrado <G>junto</G></> },
  { de: c.cta_quer - 0.1, atm: "explicacao", chip: "SEU SISTEMA", titulo: <>Um sistema <G>personalizado</G></> },
  { de: c.cta_comment - 0.3, atm: "solucao", chip: "SEU SISTEMA" },
];

export const camera = (t: number, c: Record<string, number>, tl: Timeline): Cam => camAt(t, [
  { t: 0, pos: [-1.0, 5.2, 9.6], alvo: [-1.2, 1.0, -1], fov: 40 },
  { t: c.h_bonito, pos: [-0.6, 5.0, 9.0], alvo: [-1.0, 1.0, -1], fov: 40 },
  { t: c.e_pesquisadores + 0.4, pos: [0, 5.8, 11.4], alvo: [0, 1.2, -0.8], fov: 40, e: ease.inOut },
  { t: c.e_prontas, pos: [0.3, 5.6, 11.0], alvo: [0.2, 1.2, -0.8], fov: 40 },
  { t: c.e_origami + 0.2, pos: [0, 4.4, 8.6], alvo: [0, 0.8, 0.6], fov: 40, e: ease.inOut },
  { t: c.e_valoriza, pos: [-1.0, 4.8, 8.8], alvo: [-1.2, 1.0, -0.8], fov: 40, e: ease.inOut },
  { t: ini(tl, "virada"), pos: [-1.0, 4.8, 8.8], alvo: [-1.2, 1.0, -0.8], fov: 40 },
  { t: c.v_agora + 0.4, pos: [8.6, 5.6, 9.6], alvo: [8.6, 1.0, 0.6], fov: 40, e: ease.inOut },
  { t: c.v_lista, pos: [8.4, 5.2, 9.0], alvo: [8.3, 1.0, 0.4], fov: 40 },
  { t: c.j_montar + 0.2, pos: [8.6, 7.4, 12.4], alvo: [8.6, 0.9, 1.9], fov: 40, e: ease.inOut },
  { t: c.j_descarta, pos: [8.8, 7.2, 12.0], alvo: [8.7, 0.9, 2.0], fov: 40 },
  { t: c.f_junto, pos: [9.6, 5.4, 10.2], alvo: [9.7, 1.3, 1.9], fov: 38, e: ease.inOut },
  { t: c.cta_quer - 0.3, pos: [9.6, 5.5, 10.4], alvo: [9.7, 1.3, 1.9], fov: 38 },
  { t: c.cta_quer + 0.9, pos: [CTA_BASE[0], 9.0, CTA_BASE[2] + 13.5], alvo: [CTA_BASE[0], 2.1, CTA_BASE[2] - 0.8], fov: 38, e: ease.inOut },
  { t: c.cta_comment - 0.2, pos: [CTA_BASE[0], 9.2, CTA_BASE[2] + 13.8], alvo: [CTA_BASE[0], 2.2, CTA_BASE[2] - 0.8], fov: 38 },
  { t: c.cta_comment + 0.5, pos: [CTA_BASE[0], 10.0, CTA_BASE[2] + 15.0], alvo: [CTA_BASE[0], 3.2, CTA_BASE[2] - 1.0], fov: 38, e: ease.inOut },
]);

export const clima = (t: number, c: Record<string, number>, tl: Timeline) => {
  const caps = capitulos(c, tl);
  const i = caps.reduce((acc, k, j) => (t >= k.de ? j : acc), 0);
  const ant = caps[Math.max(0, i - 1)].atm;
  return { atm: ant, atmPara: caps[i].atm, atmK: i === 0 ? 1 : prog(t, caps[i].de, 0.6, ease.inOut) };
};

/** Peça que desce do alto e encaixa no lugar em `at`. */
const Peca: React.FC<{ t: number; at: number; pos: V3; tam: V3; fim?: number; acende?: number }> = ({ t, at, pos, tam, fim = 1, acende = 0 }) => {
  const k = prog(t, at - 0.35, 0.4, ease.out);
  return <Bloco pos={[pos[0], pos[1] + (1 - k) * 2.6, pos[2]]} tam={tam} surge={(k > 0 ? 1 : 0) * fim} acende={acende} />;
};

export const Maquete3D: React.FC<{ t: number; tl: Timeline }> = ({ t, tl }) => {
  const c = tl.cues;
  const s = (at: number, d = 0.35) => sp(t, at - d, { damping: 12, stiffness: 170 });
  const fimCena = 1 - prog(t, c.cta_quer + 0.4, 0.5);
  const fimHook = 1 - prog(t, c.e_pesquisadores - 0.1, 0.35);
  const valor = prog(t, c.e_valoriza - 0.2, 0.5) * (1 - prog(t, ini(tl, "virada"), 0.5));
  const achou = prog(t, c.f_junto - 0.2, 0.6);
  const W = 1.0, E = 0.06;
  return (
    <>
      <Poeira t={t} centro={[0, 1.6, -1]} n={30} />
      {/* gancho: o móvel montado peça por peça */}
      <Peca t={t} at={c.h_movel} pos={add(MONTADA, [0, 0.05, 0])} tam={[1.8, 0.1, 1.0]} fim={fimHook} />
      <Peca t={t} at={c.h_movel + 0.35} pos={add(MONTADA, [-0.85, 0.75, 0])} tam={[0.1, 1.4, 1.0]} fim={fimHook} />
      <Peca t={t} at={c.h_movel + 0.7} pos={add(MONTADA, [0.85, 0.75, 0])} tam={[0.1, 1.4, 1.0]} fim={fimHook} />
      <Peca t={t} at={c.h_montou} pos={add(MONTADA, [0, 0.75, 0])} tam={[1.6, 0.08, 1.0]} fim={fimHook} />
      <Peca t={t} at={c.h_montou + 0.4} pos={add(MONTADA, [0, 1.5, 0])} tam={[1.9, 0.1, 1.05]} fim={fimHook} acende={prog(t, c.h_bonito - 0.2, 0.4) * fimHook * 0.6} />
      <Boneco pos={[-2.2, 0, 0.5]} rot={0.6} escala={0.75} surge={s(0.2, 0.2) * (1 - prog(t, ini(tl, "virada"), 0.4))} pose={t > c.e_montaram ? "bracos" : "pe"} />
      {/* o experimento: a caixa que montou × a caixa pronta */}
      <Peca t={t} at={c.e_pesquisadores + 0.5} pos={add(MONTADA, [0, E / 2, 0])} tam={[W, E, W]} fim={fimCena} acende={valor} />
      <Peca t={t} at={c.e_pesquisadores + 0.85} pos={add(MONTADA, [-W / 2, W / 2, 0])} tam={[E, W, W]} fim={fimCena} acende={valor} />
      <Peca t={t} at={c.e_pesquisadores + 1.2} pos={add(MONTADA, [W / 2, W / 2, 0])} tam={[E, W, W]} fim={fimCena} acende={valor} />
      <Peca t={t} at={c.e_pesquisadores + 1.55} pos={add(MONTADA, [0, W / 2, -W / 2])} tam={[W, W, E]} fim={fimCena} acende={valor} />
      <Peca t={t} at={c.e_montaram - 0.1} pos={add(MONTADA, [0, W / 2, W / 2])} tam={[W, W, E]} fim={fimCena} acende={valor} />
      <Bloco pos={add(PRONTA, [0, W / 2, 0])} tam={[W, W, W]} surge={s(c.e_montaram + 0.9, 0.25) * fimCena} mat={valor > 0.3 ? "grafite" : "argila"} />
      <Boneco pos={[2.2, 0, 0.5]} rot={-0.6} escala={0.75} surge={s(c.e_montaram + 1.0, 0.2) * (1 - prog(t, ini(tl, "virada"), 0.4))} />
      {/* o origami malfeito */}
      <group>
        <Bloco pos={add(ORIGAMI, [-0.22, 0.32, 0])} tam={[0.06, 0.7, 0.7]} rot={0.5} surge={s(c.e_origami, 0.2) * (1 - prog(t, c.e_valoriza, 0.4))} acende={prog(t, c.e_dobrou - 0.15, 0.4)} />
        <Bloco pos={add(ORIGAMI, [0.24, 0.26, 0.05])} tam={[0.06, 0.6, 0.62]} rot={-0.7} surge={s(c.e_origami + 0.12, 0.2) * (1 - prog(t, c.e_valoriza, 0.4))} acende={prog(t, c.e_dobrou - 0.15, 0.4)} />
      </group>
      {/* a busca do cliente: a lista pronta */}
      <Boneco pos={[7.2, 0, 0.9]} rot={0.6} gravata surge={s(c.v_agora, 0.3) * fimCena} pose={t > c.j_bairros && t < c.f_junto ? "aponta" : "pe"} />
      <Boneco pos={[10.0, 0, 0.9]} rot={-0.6} surge={s(c.v_agora + 0.15, 0.3) * fimCena} pose={t > c.j_bairros - 0.2 && t < c.j_descarta + 1 ? "aponta" : "pe"} />
      {[0, 1, 2, 3, 4].map((i) => (
        <Bloco key={i} pos={add(LISTA, [0, 0.04 + i * 0.09, 0])} tam={[0.9, 0.06, 1.2]} rot={(i % 2 ? 0.08 : -0.06)}
          surge={s(c.v_lista - 0.3 + i * 0.08, 0.15) * fimCena} mat={t > c.j_montar ? "grafite" : "argila"} />
      ))}
      {/* o mapa montado junto */}
      <Bloco pos={add(MAPA, [0, 0.02, 0])} tam={[4.6, 0.04, 2.8]} mat="grafite" surge={s(c.j_montar, 0.3) * fimCena} />
      {[[-1.3, -0.75], [1.0, -0.7], [-1.1, 0.75], [1.0, 0.8], [0, 0]].map(([x, z], i) => (
        <Bloco key={i} pos={add(MAPA, [x, 0.06, z])} tam={[1.5, 0.05, 0.9]} surge={s(c.j_montar + 0.1 + i * 0.06, 0.2) * fimCena}
          acende={i < 2 || i === 3 ? prog(t, c.j_bairros - 0.1 + i * 0.15, 0.3) * 0.45 * (1 - achou * 0.6) : 0} />
      ))}
      {CASAS_MAPA.map((p, i) => (
        <Casa key={i} pos={p} escala={0.5} rot={(i % 2 ? 0.2 : -0.2)}
          surge={s(c.j_faltar - 0.1 + i * 0.1, 0.2) * fimCena * (i === FICA ? 1 : 1 - prog(t, c.j_descarta + i * 0.12, 0.35))}
          acende={i === FICA ? achou : 0} />
      ))}
      <ConeLuz pos={CASAS_MAPA[FICA]} alt={5.5} raio={1.2} p={achou * fimCena} verde={achou} />
      <ModulosSistema t={t} tl={tl} segPergunta="s8" segComente="s8" base={CTA_BASE} />
      <ConeLuz pos={CTA_BASE} alt={6.5} raio={2.6} p={prog(t, c.cta_quer + 0.3, 0.8)} verde={prog(t, c.cta_comment, 0.6)} />
    </>
  );
};

export const holofote = (t: number, c: Record<string, number>, tl: Timeline) => {
  if (t >= c.cta_quer) return { pos: [CTA_BASE[0] + 0.4, 7.5, CTA_BASE[2] + 2.4] as V3, alvo: CTA_BASE, intensidade: prog(t, c.cta_quer + 0.3, 0.8) };
  if (t >= ini(tl, "virada")) return { pos: [8.6, 7.5, 5.0] as V3, alvo: [8.6, 0, 2.0] as V3, intensidade: 0.6 * prog(t, ini(tl, "virada"), 0.6) };
  return { pos: [0, 8, 4] as V3, alvo: [0, 0, -0.6] as V3, intensidade: 0.5 * prog(t, 0.2, 0.6) };
};

export const placas = (t: number, c: Record<string, number>, tl: Timeline): PlacaDef[] => {
  const ate = (de: number, fim: number) => prog(t, de, 0.35) * (1 - prog(t, fim, 0.3));
  return [
    { id: "bonito", pos: add(MONTADA, [0, 2.0, 0]), texto: "PARECE MAIS BONITO?", tom: "acento", p: ate(c.h_bonito - 0.1, c.e_pesquisadores) },
    { id: "pagavam", pos: [0, 2.2, -1.6], texto: "PAGAVAM MAIS", tom: "acento", p: ate(c.e_pagavam - 0.1, c.e_origami - 0.2) },
    { id: "montou", pos: add(MONTADA, [0, 1.6, 0.2]), texto: "ELA MONTOU", p: ate(c.e_montaram - 0.1, c.e_origami - 0.2) },
    { id: "pronta", pos: add(PRONTA, [0, 1.6, 0.2]), texto: "IGUAL, PRONTA", p: ate(c.e_prontas - 0.1, c.e_origami - 0.2) },
    { id: "origami", pos: add(ORIGAMI, [0, 1.4, 0]), texto: "ORIGAMI MALFEITO", p: ate(c.e_origami - 0.1, c.e_dobrou - 0.1) },
    { id: "dobrou", pos: add(ORIGAMI, [0, 1.4, 0]), texto: "VALE MAIS PRA QUEM DOBROU", tom: "acento", p: ate(c.e_dobrou - 0.1, c.e_valoriza - 0.1) },
    { id: "construir", pos: add(MONTADA, [0, 1.5, 0.3]), texto: "AJUDOU A CONSTRUIR", tom: "acento", p: ate(c.e_construir - 0.6, ini(tl, "virada")) },
    { id: "busca", pos: [8.6, 1.6, 0.4], texto: "A BUSCA DO SEU CLIENTE", p: ate(c.v_agora, c.v_lista - 0.2) },
    { id: "lista", pos: add(LISTA, [0, 1.1, 0]), texto: "LISTA PRONTA", tom: "alerta", p: ate(c.v_lista - 0.1, c.j_montar) },
    { id: "montar", pos: [8.6, 1.0, 1.8], texto: "MONTAR COM ELE", tom: "acento", p: ate(c.j_montar - 0.1, c.j_bairros - 0.1) },
    { id: "bairros", pos: [7.3, 1.0, 2.2], texto: "BAIRROS NO MAPA", p: ate(c.j_bairros - 0.1, c.f_junto - 0.3) },
    { id: "faltar", pos: [9.9, 1.0, 2.2], texto: "O QUE NÃO PODE FALTAR", p: ate(c.j_faltar - 0.1, c.f_junto - 0.3) },
    { id: "descarta", pos: [8.6, 0.9, 3.8], texto: "DESCARTA JUNTO", p: ate(c.j_descarta - 0.1, c.f_junto - 0.3) },
    { id: "junto", pos: add(CASAS_MAPA[FICA], [-0.6, 1.3, 0.4]), texto: "ENCONTRADO JUNTO VALE MAIS", tom: "acento", p: ate(c.f_junto - 0.1, c.cta_quer) },
  ];
};
