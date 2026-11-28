import React from "react";
import type { Timeline } from "../../types";
import { A } from "../../NOV26/kit";
import type { AtmosferaNome } from "../../../theme";
import {
  Bloco, Boneco, Casa, ConeLuz, ModulosSistema, Poeira,
  camAt, ease, prog, sp, type Cam, type Capitulo, type PlacaDef, type V3,
} from "../../../estilos/maquete";

/**
 * ATIVO-D1215-08 — "A vistoria antes de assinar" (grade 15/12/2026 · 08h · E SE…? · Maquete 3D).
 * Um só mundo: a casa, o comprador e o inspetor → o defeito acende na parede (o laudo) → EUA: dez dias brotam no chão e
 * acendem um a um (7 a 10 dias de inspeção) → negocia ou desiste → aqui pode ser combinado → a câmera anda até a proposta
 * no chão: PRAZO DA VISTORIA / E SE ACHAR PROBLEMA → antes: negociação; depois: briga → SISTEMA.
 * Apuração: inspection contingency (EUA), prazo típico de 7 a 10 dias. Brasil: pactuável, não obrigatório.
 */
const G: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: A.hex }}>{children}</span>;
const CASA: V3 = [0, 0, -0.4];
const INSP: V3 = [1.7, 0, 1.2];
const COMP: V3 = [-1.7, 0, 1.2];
const DOC: V3 = [8.0, 0, 0.4];
const COR: V3 = [6.6, 0, 1.9];
const CLI: V3 = [9.4, 0, 1.9];
const CTA_BASE: V3 = [21, 0, -9];
const ini = (tl: Timeline, id: string) => tl.scenes.find((s) => s.id === id)?.start ?? 0;
const add = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];

export const capitulos = (c: Record<string, number>, tl: Timeline): (Capitulo & { atm: AtmosferaNome })[] => [
  { de: 0, atm: "dilema", chip: "E SE…?", titulo: <>Desistir <G>depois do laudo?</G></> },
  { de: ini(tl, "eua") + 0.1, atm: "explicacao", chip: "NOS EUA", titulo: <>Dias para <G>a inspeção</G></> },
  { de: ini(tl, "problema") + 0.1, atm: "tensao", chip: "SE ACHAR PROBLEMA", titulo: <>Negocia <G>ou desiste</G></> },
  { de: ini(tl, "virada") + 0.1, atm: "neutra", chip: "A VIRADA", titulo: <>Aqui, <G>pode ser combinado</G></> },
  { de: ini(tl, "acao") + 0.1, atm: "explicacao", chip: "NA PROPOSTA", titulo: <>Escreva <G>o prazo</G></> },
  { de: ini(tl, "desfecho") + 0.1, atm: "explicacao", chip: "A LIÇÃO", titulo: <>Antes da assinatura <G>é negociação</G></> },
  { de: c.cta_quer - 0.1, atm: "explicacao", chip: "SEU SISTEMA", titulo: <>Um sistema <G>personalizado</G></> },
  { de: c.cta_comment - 0.3, atm: "solucao", chip: "SEU SISTEMA" },
];

const deriva = (t: number, c: Record<string, number>, cam: Cam): Cam => {
  const k = 1 - prog(t, c.cta_quer - 0.3, 0.8);
  return { ...cam, pos: [cam.pos[0] + k * 0.5 * Math.sin(t * 0.41), cam.pos[1] + k * 0.2 * Math.sin(t * 0.33 + 1), cam.pos[2] - k * 0.45 * Math.sin(t * 0.27 + 0.5)] };
};
export const camera = (t: number, c: Record<string, number>, tl: Timeline): Cam => deriva(t, c, camAt(t, [
  { t: 0, pos: [1.2, 7.4, 17.6], alvo: [0, 1.6, 0.0], fov: 40 },
  { t: c.h_laudo, pos: [1.8, 6.4, 14.8], alvo: [0.2, 1.4, 0.0], fov: 40, e: ease.inOut },
  { t: c.e_sete, pos: [1.0, 8.4, 18.6], alvo: [0, 1.2, 1.2], fov: 40, e: ease.inOut },
  { t: c.p_problema, pos: [2.0, 6.6, 15.2], alvo: [0.2, 1.4, 0.2], fov: 40, e: ease.inOut },
  { t: c.v_combinado, pos: [1.4, 7.8, 17.8], alvo: [0, 1.6, 0.2], fov: 40, e: ease.inOut },
  { t: c.a_proposta + 0.2, pos: [8.4, 7.2, 15.4], alvo: [8.0, 1.0, 0.8], fov: 40, e: ease.inOut },
  { t: c.d_briga, pos: [8.8, 7.6, 16.4], alvo: [8.0, 1.2, 0.8], fov: 40, e: ease.inOut },
  { t: c.cta_quer - 0.3, pos: [8.8, 7.8, 16.8], alvo: [8.0, 1.2, 0.8], fov: 40 },
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
  const defeito = prog(t, c.h_laudo - 0.2, 0.4);
  const pisca = defeito * (0.6 + 0.4 * Math.sin(t * 6)) * (1 - prog(t, c.v_combinado - 0.2, 0.5));
  const dias = (i: number) => prog(t, c.e_sete - 0.4 + i * 0.16, 0.25);
  const fim = prog(t, c.d_antes - 0.15, 0.5);
  return (
    <>
      <Poeira t={t} centro={[4, 2, 0]} n={24} />
      <Bloco pos={[4, 0, 0]} tam={[16, 0.02, 8]} surge={s(0.05, 0.2) * fimCena} mat="grafite" />
      {/* a casa, o comprador e o inspetor */}
      <Casa pos={CASA} escala={1.25} surge={s(0.15, 0.3) * fimCena} acende={prog(t, c.v_combinado - 0.2, 0.5) * 0.2} />
      <Bloco pos={add(CASA, [0.45, 0.25, 0.64])} tam={[0.09, 0.55, 0.05]} surge={defeito * fimCena} mat="alerta" acende={pisca} />
      <Boneco pos={COMP} rot={0.6} surge={s(0.3, 0.3) * fimCena} pose={t > c.p_negocia - 0.2 && t < c.p_desiste ? "aponta" : "pe"} />
      <Boneco pos={INSP} rot={-0.7} surge={s(c.h_vistoria - 0.4, 0.3) * fimCena} pose={t > c.h_laudo - 0.3 && t < c.e_eua ? "aponta" : "pe"} />
      {Array.from({ length: 10 }).map((_, i) => (
        <Bloco key={i} pos={[-2.7 + i * 0.6, 0, 2.6]} tam={[0.42, 0.12, 0.42]} surge={s(c.e_eua - 0.2 + i * 0.04, 0.3) * fimCena * (1 - prog(t, c.v_regra - 0.3, 0.5))} mat={i < 7 ? "argila" : "grafite"} acende={dias(i) * 0.7} />
      ))}
      <ConeLuz pos={[0, 0, 0.4]} alt={6} raio={3.0} p={prog(t, 0.1, 0.5) * fimCena * 0.8} verde={prog(t, c.v_combinado - 0.2, 0.6)} />
      {/* a proposta */}
      <Bloco pos={DOC} tam={[2.2, 0.05, 2.8]} surge={s(c.a_proposta - 0.7, 0.3) * fimCena} acende={Math.max(prog(t, c.a_prazo - 0.2, 0.4) * 0.25, fim * 0.55)} />
      <Bloco pos={add(DOC, [0, 0.05, -0.7])} tam={[1.6, 0.03, 0.18]} surge={s(c.a_prazo - 0.2, 0.3) * fimCena} mat="aceso" acende={0.6} />
      <Bloco pos={add(DOC, [0, 0.05, 0.1])} tam={[1.6, 0.03, 0.18]} surge={s(c.a_acontece - 0.2, 0.3) * fimCena} mat="aceso" acende={0.6} />
      <Bloco pos={add(DOC, [0, 0.05, 0.9])} tam={[1.2, 0.03, 0.12]} surge={s(c.a_proposta - 0.5, 0.3) * fimCena} />
      <Boneco pos={COR} rot={0.4} gravata surge={s(c.a_proposta - 0.6, 0.3) * fimCena} pose={t > c.a_prazo - 0.3 && t < c.d_antes ? "aponta" : fim > 0.5 ? "bracos" : "pe"} acende={fim * 0.4} />
      <Boneco pos={CLI} rot={-0.4} surge={s(c.a_proposta - 0.5, 0.3) * fimCena} acende={fim * 0.4} />
      <ConeLuz pos={DOC} alt={6} raio={2.6} p={prog(t, c.a_proposta - 0.6, 0.6) * fimCena * 0.75} verde={fim} />
      <ModulosSistema t={t} tl={tl} segPergunta="s7" segComente="s7" base={CTA_BASE} />
      <ConeLuz pos={CTA_BASE} alt={6.5} raio={2.6} p={prog(t, c.cta_quer + 0.3, 0.8)} verde={prog(t, c.cta_comment, 0.6)} />
    </>
  );
};

export const holofote = (t: number, c: Record<string, number>, tl: Timeline) => {
  if (t >= c.cta_quer) return { pos: [CTA_BASE[0] + 0.4, 7.5, CTA_BASE[2] + 2.4] as V3, alvo: CTA_BASE, intensidade: prog(t, c.cta_quer + 0.3, 0.8) };
  if (t >= c.a_proposta - 0.6) return { pos: [8, 8, 4] as V3, alvo: DOC, intensidade: 0.6 };
  return { pos: [0, 8, 5] as V3, alvo: [0, 0.6, 0.4] as V3, intensidade: 0.6 * prog(t, 0.2, 0.6) };
};

export const placas = (t: number, c: Record<string, number>, tl: Timeline): PlacaDef[] => {
  const ate = (de: number, fim: number) => prog(t, de, 0.35) * (1 - prog(t, fim, 0.3));
  return [
    { id: "laudo", pos: [2.6, 2.6, 0.6], texto: "O LAUDO DA VISTORIA", tom: "alerta", p: ate(c.h_laudo - 0.1, c.e_eua - 0.2) },
    { id: "eua", pos: [-2.8, 2.6, 1.2], texto: "NOS EUA, É COMUM", tom: "neutra", p: ate(c.e_eua - 0.1, c.p_problema - 0.2) },
    { id: "dias", pos: [2.8, 1.4, 2.6], texto: "7 A 10 DIAS PARA INSPECIONAR", tom: "acento", p: ate(c.e_sete - 0.1, c.p_problema - 0.2) },
    { id: "negocia", pos: [-2.8, 2.4, 1.2], texto: "NEGOCIA", tom: "acento", p: ate(c.p_negocia - 0.1, c.v_regra - 0.2) },
    { id: "desiste", pos: [2.8, 2.4, 1.2], texto: "OU DESISTE", tom: "alerta", p: ate(c.p_desiste - 0.1, c.v_regra - 0.2) },
    { id: "regra", pos: [-2.8, 2.4, 1.2], texto: "AQUI NÃO É REGRA", tom: "neutra", p: ate(c.v_regra - 0.1, c.a_proposta - 0.6) },
    { id: "combinado", pos: [2.8, 2.6, 1.2], texto: "MAS PODE SER COMBINADO", tom: "acento", p: ate(c.v_combinado - 0.35, c.a_proposta - 0.5) },
    { id: "prazo", pos: add(DOC, [-1.9, 1.6, -0.6]), texto: "O PRAZO DA VISTORIA", tom: "acento", p: ate(c.a_prazo - 0.1, c.d_antes - 0.2) },
    { id: "acontece", pos: add(DOC, [1.9, 1.2, 0.1]), texto: "E SE ACHAR PROBLEMA?", tom: "neutra", p: ate(c.a_acontece - 0.1, c.d_antes - 0.2) },
    { id: "antes", pos: add(DOC, [-1.8, 2.2, 0]), texto: "ANTES: NEGOCIAÇÃO", tom: "acento", p: ate(c.d_antes - 0.1, c.cta_quer + 0.2) },
    { id: "depois", pos: add(DOC, [1.8, 1.6, 0]), texto: "DEPOIS: BRIGA", tom: "alerta", p: ate(c.d_briga - 0.1, c.cta_quer + 0.2) },
  ];
};
