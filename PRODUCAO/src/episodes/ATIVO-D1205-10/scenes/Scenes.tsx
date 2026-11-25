import React from "react";
import type { Timeline } from "../../types";
import { A } from "../../NOV26/kit";
import type { AtmosferaNome } from "../../../theme";
import {
  Bloco, Boneco, Casa, ConeLuz, ModulosSistema, Poeira,
  camAt, ease, prog, sp, type Cam, type Capitulo, type PlacaDef, type V3,
} from "../../../estilos/maquete";

/**
 * ATIVO-D1205-10 — "Um prédio, muitas vidas" (grade 05/12/2026 · 10h · HISTÓRIA QUE ENSINA · Maquete 3D).
 * Um só mundo: a lâmina curva brota do chão ao lado de vilas pequenas (mais apartamentos que 254 cidades têm de casas) →
 * Copan, Niemeyer, 1966, 1.160 apartamentos → quitinete e apartamento grande acendem no mesmo endereço → bonecos de vidas
 * diferentes → a porta: certo para um, errado para outro → o corretor pergunta que vida o cliente quer → fecho SISTEMA.
 * Apuração: Gazeta SP, ALESP, São Paulo Secreto (1966; 1.160; 254 municípios). Nº de moradores omitido.
 */
const G: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: A.hex }}>{children}</span>;
const SEG = 9;
const segPos = (i: number): V3 => { const x = -3.2 + (i * 6.4) / (SEG - 1); return [x, 0, -1.4 + 0.7 * Math.sin(x * 0.9)]; };
const segRot = (i: number) => { const x = -3.2 + (i * 6.4) / (SEG - 1); return -Math.atan(0.63 * Math.cos(x * 0.9)); };
const VILAS: V3[] = [[5.0, 0, -2.4], [6.4, 0, -0.8], [4.8, 0, 0.8], [6.6, 0, 1.2]];
const PORTA: V3 = [9.0, 0, 5.0];
const CTA_BASE: V3 = [18, 0, -9];
const ini = (tl: Timeline, id: string) => tl.scenes.find((s) => s.id === id)?.start ?? 0;
const add = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];

export const capitulos = (c: Record<string, number>, tl: Timeline): (Capitulo & { atm: AtmosferaNome })[] => [
  { de: 0, atm: "memoria", chip: "SÃO PAULO", titulo: <>Um prédio, <G>muitas casas</G></> },
  { de: ini(tl, "predio") + 0.1, atm: "memoria", chip: "1966", titulo: <>1.160 <G>apartamentos</G></> },
  { de: c.p_iguais - 0.2, atm: "dados", chip: "O MESMO ENDEREÇO", titulo: <>Nenhum é <G>igual</G></> },
  { de: ini(tl, "virada") + 0.1, atm: "explicacao", chip: "A VIRADA", titulo: <>Vidas <G>diferentes</G></> },
  { de: ini(tl, "licao") + 0.1, atm: "neutra", chip: "NA SUA CARTEIRA", titulo: <>Certo para um, <G>errado</G> para outro</> },
  { de: ini(tl, "desfecho") + 0.1, atm: "explicacao", chip: "ANTES DO PRÉDIO", titulo: <>Que <G>vida</G> ele quer?</> },
  { de: c.cta_quer - 0.1, atm: "explicacao", chip: "SEU SISTEMA", titulo: <>Um sistema <G>personalizado</G></> },
  { de: c.cta_comment - 0.3, atm: "solucao", chip: "SEU SISTEMA" },
];

const deriva = (t: number, c: Record<string, number>, cam: Cam): Cam => {
  const k = 1 - prog(t, c.cta_quer - 0.3, 0.8);
  return { ...cam, pos: [cam.pos[0] + k * 0.6 * Math.sin(t * 0.42), cam.pos[1] + k * 0.22 * Math.sin(t * 0.31 + 1), cam.pos[2] - k * 0.55 * Math.sin(t * 0.27 + 0.5)] };
};
export const camera = (t: number, c: Record<string, number>, tl: Timeline): Cam => deriva(t, c, camAt(t, [
  { t: 0, pos: [1.6, 8.0, 17.0], alvo: [1.6, 0.6, -0.8], fov: 42 },
  { t: c.h_254, pos: [2.4, 8.4, 17.6], alvo: [2.4, 0.6, -0.6], fov: 42, e: ease.inOut },
  { t: c.p_copan, pos: [0, 7.0, 15.0], alvo: [0, 0.9, -1.2], fov: 40, e: ease.inOut },
  { t: c.p_mil, pos: [0.3, 7.0, 15.2], alvo: [0.2, 0.9, -1.2], fov: 40 },
  { t: c.p_quitinete, pos: [-1.4, 6.0, 12.8], alvo: [-1.6, 1.0, -1.4], fov: 40, e: ease.inOut },
  { t: c.p_grande, pos: [1.6, 6.0, 12.8], alvo: [1.8, 1.0, -1.2], fov: 40, e: ease.inOut },
  { t: c.p_endereco, pos: [0, 7.4, 15.6], alvo: [0, 0.8, -0.8], fov: 40, e: ease.inOut },
  { t: c.v_diferentes, pos: [0.3, 6.6, 14.6], alvo: [0.2, 0.7, 0.2], fov: 40 },
  { t: c.l_certo - 0.6, pos: [9.0, 7.0, 15.4], alvo: [9.0, 0.8, 4.6], fov: 40, e: ease.inOut },
  { t: c.f_pergunte, pos: [9.2, 6.6, 14.6], alvo: [9.1, 0.8, 4.8], fov: 40, e: ease.inOut },
  { t: c.cta_quer - 0.3, pos: [9.25, 6.6, 14.7], alvo: [9.15, 0.8, 4.8], fov: 40 },
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
  const quit = prog(t, c.p_quitinete - 0.15, 0.4) * (1 - prog(t, c.v_vidas, 0.5));
  const grande = prog(t, c.p_grande - 0.15, 0.4) * (1 - prog(t, c.v_vidas, 0.5));
  const certo = prog(t, c.l_certo - 0.15, 0.4);
  const errado = prog(t, c.l_errado - 0.15, 0.4);
  return (
    <>
      <Poeira t={t} centro={[0, 2, -1]} n={30} />
      {/* a lâmina curva */}
      {Array.from({ length: SEG }, (_, i) => (
        <Bloco key={i} pos={add(segPos(i), [0, 1.0, 0])} tam={[0.82, 2.0, 0.5]} rot={segRot(i)} surge={s(c.h_predio + i * 0.06, 0.25) * fimCena}
          mat={(i >= 1 && i < 3 && quit > 0.05) || (i > 5 && i < 8 && grande > 0.05) ? "argila" : "grafite"}
          acende={i >= 1 && i < 3 ? quit * 0.45 : i > 5 && i < 8 ? grande * 0.45 : 0} />
      ))}
      {/* as vilas pequenas */}
      {VILAS.map((v, j) => [0, 1, 2].map((k) => (
        <Casa key={`${j}${k}`} pos={add(v, [k * 0.55 - 0.55, 0, (k % 2) * 0.4])} escala={0.45} surge={s(c.h_254 - 0.2 + j * 0.1 + k * 0.04, 0.2) * (1 - prog(t, c.p_copan + 0.6, 0.5))} />
      )))}
      {/* vidas diferentes */}
      {[[-2.4, 0.6, 0.55], [-1.4, 0.8, 0.85], [-1.0, 0.8, 0.5], [0.2, 0.9, 0.8], [1.4, 0.8, 0.75], [2.4, 0.6, 0.65]].map(([x, z, e], i) => (
        <Boneco key={i} pos={[x, 0, z]} rot={Math.PI + (i % 2 ? 0.3 : -0.3)} escala={e} surge={s(c.v_vidas + i * 0.08, 0.2) * (1 - prog(t, ini(tl, "licao") + 0.3, 0.4))} />
      ))}
      {/* a porta: certo para um, errado para outro */}
      <Bloco pos={add(PORTA, [0, 1.0, -0.6])} tam={[1.4, 2.0, 0.12]} surge={s(ini(tl, "licao") + 0.2, 0.3) * fimCena} mat="grafite" />
      <Bloco pos={add(PORTA, [0, 0.8, -0.52])} tam={[0.6, 1.6, 0.06]} surge={s(ini(tl, "licao") + 0.3, 0.3) * fimCena} acende={certo * 0.6} />
      <Boneco pos={add(PORTA, [-1.4, 0, 0.6])} rot={0.4} surge={s(ini(tl, "licao") + 0.4, 0.3) * fimCena} acende={certo} />
      <Boneco pos={add(PORTA, [1.4, 0, 0.6])} rot={-0.4} surge={s(ini(tl, "licao") + 0.5, 0.3) * fimCena} mat={errado > 0.5 ? "grafite" : "argila"} />
      <Boneco pos={add(PORTA, [0, 0, 1.6])} rot={Math.PI} gravata surge={s(c.f_pergunte - 0.4, 0.3) * fimCena} pose={t > c.f_pergunte ? "aponta" : "pe"} />
      <ConeLuz pos={add(PORTA, [-1.4, 0, 0.6])} alt={5.5} raio={1.0} p={certo * fimCena} verde={certo} />
      <ModulosSistema t={t} tl={tl} segPergunta="s7" segComente="s7" base={CTA_BASE} />
      <ConeLuz pos={CTA_BASE} alt={6.5} raio={2.6} p={prog(t, c.cta_quer + 0.3, 0.8)} verde={prog(t, c.cta_comment, 0.6)} />
    </>
  );
};

export const holofote = (t: number, c: Record<string, number>, tl: Timeline) => {
  if (t >= c.cta_quer) return { pos: [CTA_BASE[0] + 0.4, 7.5, CTA_BASE[2] + 2.4] as V3, alvo: CTA_BASE, intensidade: prog(t, c.cta_quer + 0.3, 0.8) };
  if (t >= ini(tl, "licao")) return { pos: [9.0, 7.5, 8.0] as V3, alvo: PORTA, intensidade: 0.6 * prog(t, ini(tl, "licao"), 0.6) };
  return { pos: [0, 8, 4] as V3, alvo: [0, 0, -1.2] as V3, intensidade: 0.5 * prog(t, 0.2, 0.6) };
};

export const placas = (t: number, c: Record<string, number>, tl: Timeline): PlacaDef[] => {
  const ate = (de: number, fim: number) => prog(t, de, 0.35) * (1 - prog(t, fim, 0.3));
  return [
    { id: "predio", pos: [0, 2.5, -1.4], texto: "UM PRÉDIO", p: ate(c.h_predio + 0.6, c.h_254 - 0.2) },
    { id: "cidades", pos: [5.8, 1.1, 0.2], texto: "254 CIDADES TÊM MENOS CASAS", p: ate(c.h_254 - 0.1, c.p_copan + 0.4) },
    { id: "copan", pos: [0, 2.5, -1.4], texto: "COPAN · OSCAR NIEMEYER", p: ate(c.p_copan - 0.1, c.p_mil - 0.2) },
    { id: "mil", pos: [0, 2.5, -1.4], texto: "1966 · 1.160 APARTAMENTOS", tom: "acento", p: ate(c.p_mil - 0.2, c.p_iguais - 0.2) },
    { id: "quit", pos: add(segPos(1.5), [0, 2.4, 0.3]), texto: "QUITINETE", tom: "acento", p: ate(c.p_quitinete - 0.1, ini(tl, "virada")) },
    { id: "grande", pos: add(segPos(6.5), [0, 2.4, 0.3]), texto: "APARTAMENTO GRANDE", tom: "acento", p: ate(c.p_grande - 0.1, ini(tl, "virada")) },
    { id: "endereco", pos: [0, 1.0, 0.6], texto: "MESMO ENDEREÇO", p: ate(c.p_endereco - 0.1, ini(tl, "virada")) },
    { id: "vidas", pos: [0, 1.9, 0.8], texto: "VIDAS DIFERENTES", tom: "acento", p: ate(c.v_vidas - 0.1, ini(tl, "licao") + 0.3) },
    { id: "certo", pos: add(PORTA, [-1.4, 2.0, 0.6]), texto: "CERTO PARA UM", tom: "acento", p: ate(c.l_certo - 0.1, c.cta_quer) },
    { id: "errado", pos: add(PORTA, [1.4, 2.0, 0.6]), texto: "ERRADO PARA OUTRO", tom: "alerta", p: ate(c.l_errado - 0.1, c.cta_quer) },
    { id: "vida", pos: add(PORTA, [0, 1.3, 1.6]), texto: "QUE VIDA ELE QUER?", tom: "acento", p: ate(c.f_pergunte - 0.1, c.cta_quer) },
  ];
};
