import React from "react";
import type { Timeline } from "../../types";
import { A } from "../../NOV26/kit";
import type { AtmosferaNome } from "../../../theme";
import {
  Bloco, Boneco, ConeLuz, ModulosSistema, Poeira,
  camAt, ease, prog, sp, type Cam, type Capitulo, type PlacaDef, type V3,
} from "../../../estilos/maquete";

/**
 * ATIVO-D1211-18 — "Mandou cortar a corda" (grade 11/12/2026 · 18h · HISTÓRIA QUE ENSINA · Maquete 3D).
 * Um só mundo: a torre da feira com a plataforma alta e a corda; a plateia brota → a corda some, a plataforma cai poucos
 * centímetros e trava (os freios acendem) → o público viu → não disse, mostrou → a câmera anda até a mesa do corretor: o
 * cliente desconfia, e a matrícula, as certidões e o histórico acendem → prova convence mais do que promessa → SISTEMA.
 * Apuração: demonstração do freio de segurança do elevador, Crystal Palace, Nova York, 1854 (sem nome de marca na tela).
 */
const G: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: A.hex }}>{children}</span>;
const TOPO = 4.2;
const PLAT_Y = 2.6;
const MESA: V3 = [7, 0, 0.4];
const COR: V3 = [5.9, 0, 1.5];
const CLI: V3 = [8.1, 0, 1.6];
const DOCS: V3[] = [[6.45, 0.46, 0.4], [7.0, 0.46, 0.4], [7.55, 0.46, 0.4]];
const PLATEIA: V3[] = [[-2.2, 0, 2.6], [-1.3, 0, 3.2], [-0.4, 0, 3.5], [0.5, 0, 3.5], [1.4, 0, 3.2], [2.3, 0, 2.6]];
const CTA_BASE: V3 = [16, 0, -9];
const ini = (tl: Timeline, id: string) => tl.scenes.find((s) => s.id === id)?.start ?? 0;
const add = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];

export const capitulos = (c: Record<string, number>, tl: Timeline): (Capitulo & { atm: AtmosferaNome })[] => [
  { de: 0, atm: "dilema", chip: "1854", titulo: <>Cortem <G>a corda</G></> },
  { de: ini(tl, "quem") + 0.1, atm: "explicacao", chip: "O INVENTOR", titulo: <>O freio <G>de segurança</G></> },
  { de: ini(tl, "parou") + 0.1, atm: "tensao", chip: "A QUEDA", titulo: <>Caiu e <G>parou</G></> },
  { de: ini(tl, "virada") + 0.1, atm: "neutra", chip: "A VIRADA", titulo: <>Ele <G>mostrou</G></> },
  { de: ini(tl, "ponte") + 0.1, atm: "explicacao", chip: "NO ATENDIMENTO", titulo: <>Não jure: <G>mostre</G></> },
  { de: ini(tl, "desfecho") + 0.1, atm: "explicacao", chip: "A LIÇÃO", titulo: <>Prova <G>convence</G></> },
  { de: c.cta_quer - 0.1, atm: "explicacao", chip: "SEU SISTEMA", titulo: <>Um sistema <G>personalizado</G></> },
  { de: c.cta_comment - 0.3, atm: "solucao", chip: "SEU SISTEMA" },
];

const deriva = (t: number, c: Record<string, number>, cam: Cam): Cam => {
  const k = 1 - prog(t, c.cta_quer - 0.3, 0.8);
  return { ...cam, pos: [cam.pos[0] + k * 0.5 * Math.sin(t * 0.41), cam.pos[1] + k * 0.2 * Math.sin(t * 0.33 + 1), cam.pos[2] - k * 0.45 * Math.sin(t * 0.27 + 0.5)] };
};
export const camera = (t: number, c: Record<string, number>, tl: Timeline): Cam => deriva(t, c, camAt(t, [
  { t: 0, pos: [0.4, 5.0, 14.0], alvo: [0, 3.3, 0.6], fov: 40 },
  { t: c.h_plataforma, pos: [0.8, 5.8, 16.4], alvo: [0, 2.9, 1.0], fov: 40, e: ease.inOut },
  { t: c.q_freio, pos: [1.2, 5.2, 14.2], alvo: [0, 3.2, 0.4], fov: 40, e: ease.inOut },
  { t: c.p_centimetros - 0.4, pos: [1.0, 4.8, 13.0], alvo: [0, 3.2, 0.4], fov: 40, e: ease.inOut },
  { t: c.p_olhos, pos: [0.4, 6.2, 16.8], alvo: [0, 2.8, 1.4], fov: 40, e: ease.inOut },
  { t: c.v_mostrou + 0.3, pos: [0.6, 5.8, 15.8], alvo: [0, 3.0, 1.0], fov: 40, e: ease.inOut },
  { t: c.a_desconfiar - 0.6, pos: [7.4, 5.2, 10.8], alvo: [7.0, 1.0, 0.6], fov: 40, e: ease.inOut },
  { t: c.a_historico + 0.4, pos: [7.2, 4.6, 9.8], alvo: [7.0, 1.0, 0.6], fov: 40, e: ease.inOut },
  { t: c.f_promessa, pos: [3.5, 7.4, 19.5], alvo: [3.5, 2.2, 0.8], fov: 40, e: ease.inOut },
  { t: c.cta_quer - 0.3, pos: [3.5, 7.4, 19.7], alvo: [3.5, 2.2, 0.8], fov: 40 },
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
  const corta = prog(t, c.h_corda - 0.1, 0.25);
  const cai = prog(t, c.p_centimetros - 0.35, 0.3, ease.in);
  const plat = PLAT_Y - 0.3 * cai;
  const trava = prog(t, c.p_parou - 0.2, 0.35);
  const mostrou = prog(t, c.v_mostrou - 0.15, 0.4) * (1 - prog(t, c.a_desconfiar, 0.6));
  const DOC_AT = [c.a_matricula, c.a_certidoes, c.a_historico];
  const prova = prog(t, c.f_prova - 0.15, 0.5);
  return (
    <>
      <Poeira t={t} centro={[2, 2, 0]} n={24} />
      <Bloco pos={[0, 0.03, 1.2]} tam={[6.2, 0.06, 5.0]} surge={s(0.1, 0.2) * fimCena} mat="grafite" />
      {/* a torre da feira */}
      <Bloco pos={[-0.9, 0, 0]} tam={[0.18, TOPO, 0.18]} surge={s(0.15, 0.3) * fimCena} />
      <Bloco pos={[0.9, 0, 0]} tam={[0.18, TOPO, 0.18]} surge={s(0.2, 0.3) * fimCena} />
      <Bloco pos={[0, TOPO, 0]} tam={[2.0, 0.16, 0.3]} surge={s(0.3, 0.3) * fimCena} />
      {/* os freios nas guias */}
      <Bloco pos={[-0.72, plat - 0.1, 0]} tam={[0.14, 0.3, 0.26]} surge={s(c.q_freio - 0.1, 0.25) * fimCena} acende={Math.max(prog(t, c.q_freio - 0.1, 0.4) * 0.25 * (1 - prog(t, c.p_centimetros - 0.4, 0.3)), trava * 0.6, prova * 0.4)} />
      <Bloco pos={[0.72, plat - 0.1, 0]} tam={[0.14, 0.3, 0.26]} surge={s(c.q_freio - 0.05, 0.25) * fimCena} acende={Math.max(prog(t, c.q_freio - 0.1, 0.4) * 0.25 * (1 - prog(t, c.p_centimetros - 0.4, 0.3)), trava * 0.6, prova * 0.4)} />
      {/* a plataforma, o inventor e a corda */}
      <Bloco pos={[0, plat, 0]} tam={[1.5, 0.12, 1.0]} surge={s(0.35, 0.3) * fimCena} />
      <Boneco pos={[-0.2, plat + 0.12, 0.1]} escala={0.62} rot={0.2} surge={s(0.5, 0.3) * fimCena} pose={t > c.h_cortar - 0.2 && t < c.h_corda + 0.6 ? "aponta" : t > c.v_mostrou - 0.2 && t < c.a_desconfiar ? "bracos" : "pe"} acende={mostrou * 0.5} />
      <Bloco pos={[0.5, plat + 0.12, 0]} tam={[0.05, Math.max(0.01, TOPO - plat - 0.12), 0.05]} surge={(1 - corta) * s(0.4, 0.3) * fimCena} mat="grafite" />
      {/* a plateia */}
      {PLATEIA.map((p, i) => (
        <Boneco key={i} pos={p} rot={Math.PI - Math.atan2(p[0], p[2]) * 0.6} escala={0.72} surge={s(c.h_plataforma - 0.2 + i * 0.07, 0.25) * fimCena} acende={prog(t, c.p_olhos - 0.2, 0.5) * 0.3 * (1 - prog(t, c.a_desconfiar, 0.5))} />
      ))}
      <ConeLuz pos={[0, 0, 0]} alt={6.5} raio={1.8} p={prog(t, 0.2, 0.6) * (1 - prog(t, c.a_desconfiar - 0.4, 0.6)) * 0.75} verde={mostrou} />
      {/* a mesa do corretor */}
      <Bloco pos={add(MESA, [0, 0.38, 0])} tam={[2.2, 0.08, 0.9]} surge={s(c.a_desconfiar - 0.9, 0.25) * fimCena} />
      <Boneco pos={COR} rot={0.5} gravata surge={s(c.a_desconfiar - 0.8, 0.3) * fimCena} pose={t > c.a_matricula - 0.3 && t < c.f_prova ? "aponta" : "pe"} acende={prova * 0.4} />
      <Boneco pos={CLI} rot={-0.5} surge={s(c.a_desconfiar - 0.7, 0.3) * fimCena} acende={prova * 0.4} />
      {DOCS.map((p, i) => (
        <Bloco key={i} pos={p} tam={[0.38, 0.52, 0.05]} rot={-0.15 + i * 0.15} surge={s(DOC_AT[i] - 0.1, 0.25) * fimCena} acende={Math.max(prog(t, DOC_AT[i] - 0.1, 0.35) * 0.5, prova * 0.5)} />
      ))}
      <ConeLuz pos={MESA} alt={6} raio={2.4} p={prog(t, c.a_desconfiar - 0.6, 0.6) * fimCena * 0.75} verde={prova} />
      <ModulosSistema t={t} tl={tl} segPergunta="s7" segComente="s7" base={CTA_BASE} />
      <ConeLuz pos={CTA_BASE} alt={6.5} raio={2.6} p={prog(t, c.cta_quer + 0.3, 0.8)} verde={prog(t, c.cta_comment, 0.6)} />
    </>
  );
};

export const holofote = (t: number, c: Record<string, number>, tl: Timeline) => {
  if (t >= c.cta_quer) return { pos: [CTA_BASE[0] + 0.4, 7.5, CTA_BASE[2] + 2.4] as V3, alvo: CTA_BASE, intensidade: prog(t, c.cta_quer + 0.3, 0.8) };
  if (t >= c.a_desconfiar - 0.6) return { pos: [7, 8, 4] as V3, alvo: MESA, intensidade: 0.6 };
  return { pos: [0, 8, 4] as V3, alvo: [0, 1.5, 0] as V3, intensidade: 0.6 * prog(t, 0.2, 0.6) };
};

export const placas = (t: number, c: Record<string, number>, tl: Timeline): PlacaDef[] => {
  const ate = (de: number, fim: number) => prog(t, de, 0.35) * (1 - prog(t, fim, 0.3));
  return [
    { id: "ano", pos: [-2.0, 3.4, 0], texto: "1854 · NOVA YORK", tom: "acento", p: ate(c.h_1854 - 0.1, c.h_cortar - 0.1) },
    { id: "corda", pos: [2.0, 3.4, 0], texto: "CORTEM A CORDA", tom: "alerta", p: ate(c.h_cortar - 0.1, c.q_inventor - 0.1) },
    { id: "freio", pos: [-2.0, 3.0, 0], texto: "FREIO DE SEGURANÇA", tom: "acento", p: ate(c.q_freio - 0.1, c.p_centimetros - 0.3) },
    { id: "feira", pos: [0, 1.9, 3.4], texto: "UMA FEIRA EM NOVA YORK", tom: "acento", p: ate(c.q_elevador + 0.8, c.p_centimetros - 0.3) },
    { id: "cai", pos: [2.0, 3.0, 0], texto: "CAIU POUCOS CENTÍMETROS", tom: "alerta", p: ate(c.p_centimetros - 0.1, c.p_parou - 0.1) },
    { id: "parou", pos: [2.0, 3.0, 0], texto: "E PAROU", tom: "acento", p: ate(c.p_parou - 0.1, c.v_disse - 0.1) },
    { id: "viu", pos: [0, 1.9, 3.4], texto: "O PÚBLICO VIU", tom: "acento", p: ate(c.p_olhos - 0.1, c.v_disse - 0.1) },
    { id: "disse", pos: [2.3, 3.4, 0], texto: "NÃO DISSE QUE ERA SEGURO", tom: "alerta", p: ate(c.v_disse - 0.1, c.v_mostrou - 0.1) },
    { id: "mostrou", pos: [2.3, 3.4, 0], texto: "ELE MOSTROU", tom: "acento", p: ate(c.v_mostrou - 0.1, c.a_desconfiar - 0.5) },
    { id: "desc", pos: add(CLI, [0, 2.2, 0]), texto: "DESCONFIOU? NÃO JURE", tom: "alerta", p: ate(c.a_desconfiar - 0.1, c.a_matricula - 0.1) },
    { id: "mat", pos: add(MESA, [0, 1.7, 0]), texto: "MATRÍCULA", tom: "acento", p: ate(c.a_matricula - 0.1, c.a_certidoes - 0.1) },
    { id: "cert", pos: add(MESA, [0, 1.7, 0]), texto: "CERTIDÕES", tom: "acento", p: ate(c.a_certidoes - 0.1, c.a_historico - 0.1) },
    { id: "hist", pos: add(MESA, [0, 1.7, 0]), texto: "HISTÓRICO", tom: "acento", p: ate(c.a_historico - 0.1, c.f_prova - 0.1) },
    { id: "prova", pos: add(MESA, [0, 1.7, 0]), texto: "PROVA, NÃO PROMESSA", tom: "acento", p: ate(c.f_prova - 0.1, c.cta_quer + 0.2) },
  ];
};
