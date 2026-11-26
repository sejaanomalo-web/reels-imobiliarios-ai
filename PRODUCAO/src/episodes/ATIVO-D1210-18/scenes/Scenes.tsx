import React from "react";
import type { Timeline } from "../../types";
import { A } from "../../NOV26/kit";
import type { AtmosferaNome } from "../../../theme";
import {
  Bloco, Boneco, Casa, ConeLuz, ModulosSistema, Poeira,
  camAt, ease, prog, sp, type Cam, type Capitulo, type PlacaDef, type V3,
} from "../../../estilos/maquete";

/**
 * ATIVO-D1210-18 — "Os números das casas" (grade 10/12/2026 · 18h · HISTÓRIA QUE ENSINA · Maquete 3D).
 * Um só mundo: uma rua de argila que sai do rio → pares de um lado, ímpares do outro → a contagem começa pelo rio: perto do
 * Sena, o número menor → a câmera sobe e a rua vira mapa → a carteira do corretor: fichas iguais (endereço, fotos, código)
 * acendem uma a uma → imóvel que ninguém acha não vende → SISTEMA.
 * Apuração: decreto de 4/2/1805 (Paris); fontes divergem sobre o prefeito — o vídeo não cita nome.
 */
const G: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: A.hex }}>{children}</span>;
const RUA: V3 = [0, 0, 0];
const RIO: V3 = [0, 0, -3.4];
const PT: V3 = [16, 0, 2];
const CTA_BASE: V3 = [26, 0, -9];
const ZS = [-1.6, 0, 1.6];
const ini = (tl: Timeline, id: string) => tl.scenes.find((s) => s.id === id)?.start ?? 0;
const add = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];

export const capitulos = (c: Record<string, number>, tl: Timeline): (Capitulo & { atm: AtmosferaNome })[] => [
  { de: 0, atm: "memoria", chip: "PARIS · 1805", titulo: <>Uma regra <G>até hoje</G></> },
  { de: ini(tl, "pares") + 0.1, atm: "memoria", chip: "A REGRA 1", titulo: <>Pares × <G>ímpares</G></> },
  { de: ini(tl, "rio") + 0.1, atm: "explicacao", chip: "A REGRA 2", titulo: <>A partir <G>do rio</G></> },
  { de: ini(tl, "virada") + 0.1, atm: "dados", chip: "A VIRADA", titulo: <>A cidade <G>vira mapa</G></> },
  { de: ini(tl, "ponte") + 0.1, atm: "neutra", chip: "NA SUA CARTEIRA", titulo: <>Do <G>mesmo jeito</G></> },
  { de: ini(tl, "desfecho") + 0.1, atm: "explicacao", chip: "A LIÇÃO", titulo: <>Quem acha, <G>vende</G></> },
  { de: c.cta_quer - 0.1, atm: "explicacao", chip: "SEU SISTEMA", titulo: <>Um sistema <G>personalizado</G></> },
  { de: c.cta_comment - 0.3, atm: "solucao", chip: "SEU SISTEMA" },
];

const deriva = (t: number, c: Record<string, number>, cam: Cam): Cam => {
  const k = 1 - prog(t, c.cta_quer - 0.3, 0.8);
  return { ...cam, pos: [cam.pos[0] + k * 0.55 * Math.sin(t * 0.43), cam.pos[1] + k * 0.2 * Math.sin(t * 0.31 + 1), cam.pos[2] - k * 0.5 * Math.sin(t * 0.29 + 0.5)] };
};
export const camera = (t: number, c: Record<string, number>, tl: Timeline): Cam => deriva(t, c, camAt(t, [
  { t: 0, pos: [0.4, 5.8, 15.2], alvo: [0, 1.0, -0.8], fov: 40 },
  { t: c.p_pares, pos: [1.2, 5.6, 14.6], alvo: [0.2, 1.0, -0.6], fov: 40, e: ease.inOut },
  { t: c.r_rio, pos: [0.6, 7.4, 14.0], alvo: [0, 0.6, -1.8], fov: 40, e: ease.inOut },
  { t: c.v_simples, pos: [0.4, 8.6, 11.6], alvo: [0, 0.4, -1.2], fov: 40, e: ease.inOut },
  { t: c.v_mapa + 0.4, pos: [0.2, 13.5, 5.2], alvo: [0, 0, -0.9], fov: 40, e: ease.inOut },
  { t: c.p_carteira + 0.5, pos: [PT[0] + 0.4, 5.4, PT[2] + 13.2], alvo: [PT[0] + 0.3, 1.2, PT[2] + 0.6], fov: 40, e: ease.inOut },
  { t: c.p_codigo, pos: [PT[0] + 0.6, 5.4, PT[2] + 12.2], alvo: [PT[0] + 0.6, 1.2, PT[2] + 0.6], fov: 40, e: ease.inOut },
  { t: c.cta_quer - 0.3, pos: [PT[0] + 0.6, 5.6, PT[2] + 12.6], alvo: [PT[0] + 0.6, 1.2, PT[2] + 0.6], fov: 40 },
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
  const zonaA = 1 - prog(t, c.p_carteira + 0.8, 0.5);
  const rio = prog(t, c.r_rio - 0.15, 0.5);
  const mapa = prog(t, c.v_mapa - 0.2, 0.6);
  const F = [c.p_endereco, c.p_fotos, c.p_codigo];
  return (
    <>
      <Poeira t={t} centro={[0, 2, 0]} n={24} />
      {/* o rio e a rua */}
      <Bloco pos={add(RIO, [0, 0.0, 0])} tam={[12, 0.1, 1.4]} surge={s(0.1, 0.2) * zonaA} mat="grafite" acende={rio * 0} />
      <Bloco pos={add(RUA, [0, 0.03, 0.2])} tam={[1.0, 0.05, 5.6]} surge={s(0.2, 0.2) * zonaA} mat="grafite" />
      {ZS.map((z, i) => (
        <React.Fragment key={i}>
          <Casa pos={add(RUA, [-1.5, 0, z])} escala={0.55} rot={0} surge={s(c.h_paris - 0.3 + i * 0.12, 0.25) * zonaA} acende={mapa * 0.2} />
          <Casa pos={add(RUA, [1.5, 0, z])} escala={0.55} rot={0} surge={s(c.h_paris - 0.2 + i * 0.12, 0.25) * zonaA} acende={mapa * 0.2} />
        </React.Fragment>
      ))}
      {/* a carteira: fichas iguais */}
      <Bloco pos={add(PT, [0.6, 0.03, 0.6])} tam={[5.0, 0.06, 3.2]} surge={s(c.p_carteira, 0.25) * fimCena} mat="grafite" />
      <Boneco pos={add(PT, [-1.2, 0, 1.6])} rot={0.5} gravata surge={s(c.p_carteira + 0.1, 0.3) * fimCena} pose={t > c.p_jeito && t < c.f_acha ? "aponta" : "pe"} acende={prog(t, c.p_codigo, 0.4) * 0.4} />
      {F.map((at, i) => (
        <Bloco key={i} pos={add(PT, [-0.2 + i * 1.1, 0.5, 0.4])} tam={[0.8, 0.9, 0.06]} surge={s(c.p_jeito - 0.2 + i * 0.1, 0.25) * fimCena} acende={prog(t, at - 0.15, 0.4) * 0.55} />
      ))}
      <ConeLuz pos={add(PT, [0.9, 0, 0.4])} alt={5.5} raio={2.0} p={prog(t, c.p_jeito - 0.2, 0.5) * fimCena * 0.8} verde={prog(t, c.p_codigo, 0.5)} />
      <ModulosSistema t={t} tl={tl} segPergunta="s7" segComente="s7" base={CTA_BASE} />
      <ConeLuz pos={CTA_BASE} alt={6.5} raio={2.6} p={prog(t, c.cta_quer + 0.3, 0.8)} verde={prog(t, c.cta_comment, 0.6)} />
    </>
  );
};

export const holofote = (t: number, c: Record<string, number>, tl: Timeline) => {
  if (t >= c.cta_quer) return { pos: [CTA_BASE[0] + 0.4, 7.5, CTA_BASE[2] + 2.4] as V3, alvo: CTA_BASE, intensidade: prog(t, c.cta_quer + 0.3, 0.8) };
  if (t >= c.p_carteira) return { pos: [PT[0], 7.5, PT[2] + 3] as V3, alvo: PT, intensidade: 0.6 * prog(t, c.p_carteira, 0.6) };
  return { pos: [0, 8, 3] as V3, alvo: [0, 0, -0.6] as V3, intensidade: 0.55 * prog(t, 0.2, 0.6) };
};

export const placas = (t: number, c: Record<string, number>, tl: Timeline): PlacaDef[] => {
  const ate = (de: number, fim: number) => prog(t, de, 0.35) * (1 - prog(t, fim, 0.3));
  const P: PlacaDef[] = [
    { id: "1805", pos: add(RUA, [0, 2.4, -0.2]), texto: "PARIS · DECRETO DE 1805", p: ate(c.h_1805 - 0.1, c.p_pares - 0.2) },
    { id: "rio", pos: add(RIO, [0, 1.0, 0]), texto: "O RIO SENA", tom: "acento", p: ate(c.r_rio - 0.1, c.r_menor - 0.15) },
    { id: "menor", pos: add(RUA, [0, 2.2, -1.6]), texto: "PERTO DO RIO, NÚMERO MENOR", tom: "acento", p: ate(c.r_menor - 0.1, c.v_simples) },
    { id: "mapa", pos: add(RUA, [0, 2.0, 0]), texto: "A CIDADE VIRA MAPA", tom: "acento", p: ate(c.v_mapa - 0.1, c.p_carteira + 0.3) },
    { id: "end", pos: add(PT, [-0.2, 1.5, 0.4]), texto: "ENDEREÇO", tom: "acento", p: ate(c.p_endereco - 0.1, c.f_acha - 0.1) },
    { id: "fot", pos: add(PT, [0.9, 1.75, 0.4]), texto: "FOTOS", tom: "acento", p: ate(c.p_fotos - 0.1, c.f_acha - 0.1) },
    { id: "cod", pos: add(PT, [2.0, 1.5, 0.4]), texto: "CÓDIGO", tom: "acento", p: ate(c.p_codigo - 0.1, c.f_acha - 0.1) },
    { id: "acha", pos: add(PT, [0.6, 2.1, 0.4]), texto: "QUEM ACHA, VENDE", tom: "acento", p: ate(c.f_acha - 0.1, c.cta_quer + 0.2) },
  ];
  ZS.forEach((z, i) => {
    P.push({ id: `par${i}`, pos: add(RUA, [1.5, 1.35, z]), texto: `${2 + i * 2}`, tom: "acento", p: ate(c.p_pares - 0.1 + i * 0.12, c.p_carteira + 0.3) });
    P.push({ id: `imp${i}`, pos: add(RUA, [-1.5, 1.35, z]), texto: `${1 + i * 2}`, p: ate(c.p_impares - 0.1 + i * 0.12, c.p_carteira + 0.3) });
  });
  return P;
};
