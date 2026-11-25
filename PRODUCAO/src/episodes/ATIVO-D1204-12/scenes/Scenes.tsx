import React from "react";
import type { Timeline } from "../../types";
import { A } from "../../NOV26/kit";
import type { AtmosferaNome } from "../../../theme";
import {
  Bloco, Boneco, Casa, ConeLuz, ModulosSistema, Poeira, Predio, Tanque,
  camAt, ease, prog, sp, type Cam, type Capitulo, type PlacaDef, type V3,
} from "../../../estilos/maquete";

/**
 * ATIVO-D1204-12 — "A toalha do hotel" (grade 04/12/2026 · 12h · FORA DA BOLHA · Maquete 3D).
 * Um só mundo: o hotel em miniatura e o cartão da toalha → três reservatórios de adesão: cartão comum (~35%), "a maioria
 * reutiliza" (~44%) e "neste mesmo quarto" (o mais alto, sem número) → a gente segue gente parecida, num lugar parecido →
 * no bairro, famílias parecidas e a casa que acende; "desde que seja verdade" → fecho SISTEMA.
 * Apuração: Goldstein, Cialdini & Griskevicius (2008), Journal of Consumer Research 35(3).
 */
const G: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: A.hex }}>{children}</span>;

const HOTEL: V3 = [0, 0, -4.5];
const TQ: V3[] = [[-1.6, 0, 0], [0, 0, 0], [1.6, 0, 0]];
const BAIRRO: V3[] = [[7.4, 0, -1.2], [9.6, 0, -1.4], [11.8, 0, -1.2], [8.4, 0, 1.4], [10.8, 0, 1.4]];
const ALVO = 4; // a casa que acende
const CTA_BASE: V3 = [18, 0, -9];
const ini = (tl: Timeline, id: string) => tl.scenes.find((s) => s.id === id)?.start ?? 0;
const add = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];

export const capitulos = (c: Record<string, number>, tl: Timeline): (Capitulo & { atm: AtmosferaNome })[] => [
  { de: 0, atm: "memoria", chip: "UM HOTEL", titulo: <>Uma frase no <G>cartão</G></> },
  { de: ini(tl, "teste") + 0.1, atm: "dados", chip: "O TESTE", titulo: <>Comum × <G>a maioria</G></> },
  { de: ini(tl, "virada") + 0.1, atm: "explicacao", chip: "A VIRADA", titulo: <>Do <G>mesmo quarto</G></> },
  { de: ini(tl, "licao") + 0.1, atm: "neutra", chip: "O EFEITO", titulo: <>Gente <G>parecida</G></> },
  { de: ini(tl, "desfecho") + 0.1, atm: "explicacao", chip: "NO BAIRRO", titulo: <>Desde que seja <G>verdade</G></> },
  { de: c.cta_quer - 0.1, atm: "explicacao", chip: "SEU SISTEMA", titulo: <>Um sistema <G>personalizado</G></> },
  { de: c.cta_comment - 0.3, atm: "solucao", chip: "SEU SISTEMA" },
];

/** Deriva lenta e contínua da câmera (o plano-sequência nunca congela); some no fecho. */
const deriva = (t: number, c: Record<string, number>, cam: Cam): Cam => {
  const k = 1 - prog(t, c.cta_quer - 0.3, 0.8);
  return { ...cam, pos: [cam.pos[0] + k * 0.6 * Math.sin(t * 0.42), cam.pos[1] + k * 0.22 * Math.sin(t * 0.31 + 1), cam.pos[2] - k * 0.55 * Math.sin(t * 0.27 + 0.5)] };
};
export const camera = (t: number, c: Record<string, number>, tl: Timeline): Cam => deriva(t, c, camAt(t, [
  { t: 0, pos: [0, 5.6, 10.5], alvo: [0, 1.3, -3.0], fov: 40 },
  { t: c.h_frase, pos: [0.4, 4.6, 8.2], alvo: [0.4, 0.9, -2.0], fov: 40, e: ease.inOut },
  { t: c.t_comum, pos: [-0.8, 5.8, 10.8], alvo: [-0.8, 0.9, -0.2], fov: 40, e: ease.inOut },
  { t: c.t_35, pos: [-0.6, 5.6, 10.4], alvo: [-0.6, 0.9, -0.2], fov: 40 },
  { t: c.t_novo + 0.3, pos: [0, 5.8, 10.8], alvo: [0, 0.9, -0.2], fov: 40, e: ease.inOut },
  { t: c.t_44, pos: [0.2, 5.6, 10.4], alvo: [0.2, 0.9, -0.2], fov: 40 },
  { t: c.v_quarto, pos: [0.8, 5.8, 10.8], alvo: [0.6, 0.9, -0.2], fov: 40, e: ease.inOut },
  { t: c.v_melhor, pos: [0, 6.4, 12.4], alvo: [0, 0.9, -0.6], fov: 42, e: ease.inOut },
  { t: c.l_gente + 0.4, pos: [5.4, 6.0, 11.5], alvo: [5.6, 0.8, 0.2], fov: 42, e: ease.inOut },
  { t: c.f_familias, pos: [9.6, 7.6, 13.6], alvo: [9.6, 0.6, 0.0], fov: 40, e: ease.inOut },
  { t: c.f_verdade, pos: [10.2, 6.6, 11.6], alvo: [10.4, 0.7, 0.6], fov: 40, e: ease.inOut },
  { t: c.cta_quer - 0.3, pos: [10.25, 6.6, 11.7], alvo: [10.45, 0.7, 0.6], fov: 40 },
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
  const fimHotel = 1 - prog(t, ini(tl, "desfecho"), 0.6);
  const n1 = 0.35 * prog(t, c.t_comum + 0.4, 2.2, ease.out);
  const n2 = 0.44 * prog(t, c.t_maioria, 2.6, ease.out);
  const n3 = 0.55 * prog(t, c.v_quarto - 0.2, 1.8, ease.out);
  const achou = prog(t, c.f_bairro - 0.3, 0.6);
  return (
    <>
      <Poeira t={t} centro={[0, 1.6, -1]} n={30} />
      {/* o hotel e o cartão */}
      <Predio pos={HOTEL} andares={4} escala={0.9} surge={s(0.2, 0.6) * fimHotel} />
      <Bloco pos={[0.9, 0.55, -2.2]} tam={[0.5, 0.7, 0.05]} rot={-0.2} surge={s(c.h_frase - 0.1, 0.3) * (1 - prog(t, c.t_comum - 0.2, 0.4))} acende={prog(t, c.h_frase, 0.4) * 0.5} />
      <Bloco pos={[0.9, 0.1, -2.2]} tam={[0.7, 0.2, 0.5]} mat="grafite" surge={s(c.h_frase - 0.2, 0.3) * (1 - prog(t, c.t_comum - 0.2, 0.4))} />
      {/* os três cartões, três níveis */}
      <Tanque pos={TQ[0]} raio={0.55} alt={1.8} nivel={n1} surge={s(c.t_comum - 0.2, 0.3) * fimHotel} />
      <Tanque pos={TQ[1]} raio={0.55} alt={1.8} nivel={n2} surge={s(c.t_novo - 0.2, 0.3) * fimHotel} acende={prog(t, c.t_44 - 0.2, 0.5) * (1 - prog(t, c.v_quarto, 0.5)) * 0.6} />
      <Tanque pos={TQ[2]} raio={0.55} alt={1.8} nivel={n3} surge={s(c.v_quarto - 0.4, 0.3) * fimHotel} acende={prog(t, c.v_melhor - 0.3, 0.5)} />
      {/* gente parecida, lugar parecido */}
      {[0, 1, 2].map((i) => (
        <Boneco key={i} pos={[4.6 + i * 0.9, 0, 0.6 - i * 0.3]} rot={-0.4} escala={0.8} surge={s(c.l_gente - 0.1 + i * 0.12, 0.2) * (1 - prog(t, c.f_familias - 0.3, 0.4))} />
      ))}
      {/* o bairro: famílias parecidas */}
      {BAIRRO.map((p, i) => (
        <Casa key={i} pos={p} escala={0.85} rot={(i % 2 ? 0.15 : -0.15)} surge={s(c.l_lugar - 0.3 + i * 0.08, 0.2) * fimCena} acende={i === ALVO ? achou : 0} />
      ))}
      {BAIRRO.slice(0, 3).map((p, i) => (
        <group key={i}>
          <Boneco pos={add(p, [-0.5, 0, 1.0])} rot={0.2} escala={0.7} surge={s(c.f_familias - 0.1 + i * 0.1, 0.2) * fimCena} />
          <Boneco pos={add(p, [-0.05, 0, 1.1])} rot={0.2} escala={0.45} surge={s(c.f_familias + i * 0.1, 0.2) * fimCena} />
        </group>
      ))}
      <Boneco pos={add(BAIRRO[ALVO], [-1.3, 0, 1.0])} rot={0.5} gravata surge={s(c.f_familias, 0.3) * fimCena} pose={t > c.f_bairro ? "aponta" : "pe"} />
      <Boneco pos={add(BAIRRO[ALVO], [0.9, 0, 1.2])} rot={-0.5} escala={0.75} surge={s(c.f_familias + 0.2, 0.3) * fimCena} />
      <ConeLuz pos={BAIRRO[ALVO]} alt={5.5} raio={1.4} p={achou * fimCena} verde={achou} />
      <ModulosSistema t={t} tl={tl} segPergunta="s7" segComente="s7" base={CTA_BASE} />
      <ConeLuz pos={CTA_BASE} alt={6.5} raio={2.6} p={prog(t, c.cta_quer + 0.3, 0.8)} verde={prog(t, c.cta_comment, 0.6)} />
    </>
  );
};

export const holofote = (t: number, c: Record<string, number>, tl: Timeline) => {
  if (t >= c.cta_quer) return { pos: [CTA_BASE[0] + 0.4, 7.5, CTA_BASE[2] + 2.4] as V3, alvo: CTA_BASE, intensidade: prog(t, c.cta_quer + 0.3, 0.8) };
  if (t >= ini(tl, "licao")) return { pos: [9.6, 7.5, 4.0] as V3, alvo: [9.6, 0, 0] as V3, intensidade: 0.6 * prog(t, ini(tl, "licao"), 0.6) };
  return { pos: [0, 8, 4] as V3, alvo: [0, 0, -0.6] as V3, intensidade: 0.5 * prog(t, 0.2, 0.6) };
};

export const placas = (t: number, c: Record<string, number>, tl: Timeline): PlacaDef[] => {
  const ate = (de: number, fim: number) => prog(t, de, 0.35) * (1 - prog(t, fim, 0.3));
  return [
    { id: "hotel", pos: add(HOTEL, [-1.3, 1.2, 0.6]), texto: "UM HOTEL", p: ate(c.h_hotel - 0.1, c.h_frase + 0.6) },
    { id: "frase", pos: [0.9, 1.3, -2.2], texto: "UMA FRASE NO CARTÃO", tom: "acento", p: ate(c.h_frase - 0.1, c.t_comum - 0.2) },
    { id: "comum", pos: add(TQ[0], [0, 2.3, 0]), texto: "CARTÃO COMUM", p: ate(c.t_comum - 0.1, ini(tl, "licao")) },
    { id: "c35", pos: add(TQ[0], [0, 1.0, 0.6]), texto: "≈ 35%", p: ate(c.t_35 - 0.1, ini(tl, "licao")) },
    { id: "maioria", pos: add(TQ[1], [0, 2.3, 0]), texto: "A MAIORIA REUTILIZA", tom: "acento", p: ate(c.t_maioria - 0.1, ini(tl, "licao")) },
    { id: "c44", pos: add(TQ[1], [0, 1.15, 0.6]), texto: "≈ 44%", tom: "acento", p: ate(c.t_44 - 0.1, ini(tl, "licao")) },
    { id: "quarto", pos: add(TQ[2], [0, 2.3, 0]), texto: "NESTE MESMO QUARTO", tom: "acento", p: ate(c.v_quarto - 0.1, ini(tl, "licao")) },
    { id: "melhor", pos: add(TQ[2], [0, 1.35, 0.6]), texto: "AINDA MELHOR", tom: "acento", p: ate(c.v_melhor - 0.1, ini(tl, "licao")) },
    { id: "gente", pos: [5.5, 1.8, 0.2], texto: "GENTE PARECIDA", p: ate(c.l_gente - 0.1, c.f_familias - 0.3) },
    { id: "lugar", pos: [9.6, 1.9, -1.4], texto: "LUGAR PARECIDO", p: ate(c.l_lugar - 0.1, c.f_familias - 0.3) },
    { id: "familias", pos: [8.4, 1.8, -0.2], texto: "FAMÍLIAS COMO A DELE", p: ate(c.f_familias - 0.1, c.f_verdade - 0.2) },
    { id: "bairro", pos: add(BAIRRO[ALVO], [0, 1.7, 0]), texto: "NESTE BAIRRO", tom: "acento", p: ate(c.f_bairro - 0.1, c.cta_quer) },
    { id: "verdade", pos: add(BAIRRO[ALVO], [-1.3, 1.9, 1.0]), texto: "DESDE QUE SEJA VERDADE", p: ate(c.f_verdade - 0.1, c.cta_quer) },
  ];
};
