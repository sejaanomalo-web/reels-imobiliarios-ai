import React from "react";
import type { Timeline } from "../../types";
import { A } from "../../NOV26/kit";
import type { AtmosferaNome } from "../../../theme";
import {
  Bloco, Boneco, Casa, ConeLuz, Fluxo, Instituicao, ModulosSistema, Poeira, Predio, Tanque,
  camAt, ease, prog, sp, type Cam, type Capitulo, type PlacaDef, type V3,
} from "../../../estilos/maquete";

/**
 * ATIVO-D1207-08 — "Data de validade" (grade 07/12/2026 · 08h · E SE…? · Maquete 3D).
 * Um só mundo: o prédio com a pergunta da validade → quatro prédios, três acendem (3 em cada 4 moradores), o tanque de 99
 * anos → o prazo esvazia e o fluxo leva o prédio ao Estado → aqui: a casa no litoral, a faixa do terreno da União, o laudêmio
 * de 5% a cada venda (fluxo até a União) → o corretor confere a matrícula antes → fecho SISTEMA.
 * Apuração: HDB Key Statistics FY2025 (75,7%); lease de 99 anos; Decreto-Lei 2.398/1987 (laudêmio de 5%).
 */
const G: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: A.hex }}>{children}</span>;
const PR = (i: number): V3 => [-2.1 + i * 1.4, 0, 0];
const ESTADO: V3 = [3.0, 0, -2.2];
const TQ: V3 = [-2.9, 0, 1.8];
const BR: V3 = [15, 0, 3];
const UNIAO: V3 = [18.2, 0, 0.2];
const CTA_BASE: V3 = [26, 0, -9];
const ini = (tl: Timeline, id: string) => tl.scenes.find((s) => s.id === id)?.start ?? 0;
const add = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];

export const capitulos = (c: Record<string, number>, tl: Timeline): (Capitulo & { atm: AtmosferaNome })[] => [
  { de: 0, atm: "dilema", chip: "E SE…?", titulo: <>Apartamento com <G>validade</G></> },
  { de: ini(tl, "singapura") + 0.1, atm: "dados", chip: "SINGAPURA", titulo: <>Contrato de <G>99 anos</G></> },
  { de: ini(tl, "volta") + 0.1, atm: "tensao", chip: "QUANDO ACABA", titulo: <>Volta para o <G>Estado</G></> },
  { de: ini(tl, "virada") + 0.1, atm: "explicacao", chip: "AQUI", titulo: <>A <G>União</G> tem uma parte</> },
  { de: ini(tl, "acao") + 0.1, atm: "neutra", chip: "TERRENO DE MARINHA", titulo: <>Laudêmio de <G>5%</G></> },
  { de: ini(tl, "desfecho") + 0.1, atm: "explicacao", chip: "A LIÇÃO", titulo: <>Leia a <G>matrícula</G> antes</> },
  { de: c.cta_quer - 0.1, atm: "explicacao", chip: "SEU SISTEMA", titulo: <>Um sistema <G>personalizado</G></> },
  { de: c.cta_comment - 0.3, atm: "solucao", chip: "SEU SISTEMA" },
];

const deriva = (t: number, c: Record<string, number>, cam: Cam): Cam => {
  const k = 1 - prog(t, c.cta_quer - 0.3, 0.8);
  return { ...cam, pos: [cam.pos[0] + k * 0.6 * Math.sin(t * 0.44), cam.pos[1] + k * 0.22 * Math.sin(t * 0.32 + 1), cam.pos[2] - k * 0.5 * Math.sin(t * 0.28 + 0.5)] };
};
export const camera = (t: number, c: Record<string, number>, tl: Timeline): Cam => deriva(t, c, camAt(t, [
  { t: 0, pos: [-1.6, 6.4, 12.0], alvo: [-1.4, 1.2, 0], fov: 40 },
  { t: c.h_validade, pos: [-1.4, 6.6, 12.6], alvo: [-1.4, 1.2, 0], fov: 40, e: ease.inOut },
  { t: c.s_tres, pos: [0, 9.4, 19.6], alvo: [0, 1.2, -0.4], fov: 40, e: ease.inOut },
  { t: c.s_99 + 0.4, pos: [-0.2, 9.6, 20.4], alvo: [-0.1, 1.2, -0.2], fov: 40, e: ease.inOut },
  { t: c.p_volta, pos: [0.6, 10.4, 21.0], alvo: [0.6, 1.2, -0.8], fov: 40, e: ease.inOut },
  { t: ini(tl, "virada") + 0.2, pos: [0.7, 10.4, 21.0], alvo: [0.7, 1.2, -0.8], fov: 40 },
  { t: c.v_uniao, pos: [BR[0] + 0.8, 8.6, BR[2] + 15.4], alvo: [BR[0] + 0.8, 0.9, BR[2] - 0.8], fov: 40, e: ease.inOut },
  { t: c.a_laudemio, pos: [BR[0] + 0.8, 8.6, BR[2] + 15.6], alvo: [BR[0] + 0.8, 0.9, BR[2] - 0.2], fov: 40, e: ease.inOut },
  { t: c.f_assinar, pos: [BR[0] + 0.2, 8.0, BR[2] + 14.4], alvo: [BR[0], 0.9, BR[2] + 0.4], fov: 40, e: ease.inOut },
  { t: c.cta_quer - 0.3, pos: [BR[0] + 0.25, 8.0, BR[2] + 14.4], alvo: [BR[0], 0.9, BR[2] + 0.4], fov: 40 },
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
  const zonaA = 1 - prog(t, c.v_uniao + 1.0, 0.5);
  const tres = prog(t, c.s_tres - 0.15, 0.5);
  const nivel = 1 - prog(t, c.p_prazo - 0.1, 1.6, ease.inOut);
  const volta = prog(t, c.p_volta - 0.2, 0.9);
  const lau = prog(t, c.a_laudemio - 0.2, 0.9);
  const mat = prog(t, c.a_matricula - 0.15, 0.4);
  const fim = prog(t, c.f_antes - 0.15, 0.5);
  return (
    <>
      <Poeira t={t} centro={[0, 2, 0]} n={26} />
      {/* Singapura */}
      {[0, 1, 2, 3].map((i) => (
        <Predio key={i} pos={PR(i)} andares={i === 0 ? 6 : 5} escala={0.62} surge={(i === 0 ? s(c.h_apartamento, 0.3) : s(c.s_singapura + i * 0.12, 0.25)) * zonaA} acende={i < 3 ? tres * 0.35 * (1 - volta * 0.7) : 0} />
      ))}
      <Tanque pos={TQ} raio={0.4} alt={1.6} nivel={nivel} surge={s(c.s_99, 0.3) * zonaA} alerta={prog(t, c.p_prazo, 0.8)} />
      <Instituicao pos={ESTADO} escala={1.1} surge={s(c.p_estado - 0.3, 0.3) * zonaA} acende={volta * 0.2} />
      <Fluxo de={add(PR(1), [0, 2.2, 0])} para={add(ESTADO, [0, 1.6, 0])} altura={1.6} p={volta * zonaA} anda={t} />
      {/* aqui: a casa no litoral */}
      <Bloco pos={add(BR, [0, 0.03, 0])} tam={[3.0, 0.06, 2.6]} surge={s(c.v_aqui + 0.5, 0.3) * fimCena} mat="grafite" acende={fim * 0.12} />
      <Bloco pos={add(BR, [0, 0.07, -1.05])} tam={[3.0, 0.04, 0.5]} surge={s(c.v_uniao, 0.25) * fimCena} mat="argila" />
      <Casa pos={add(BR, [0, 0, 0.2])} escala={1.1} surge={s(c.v_aqui + 0.6, 0.3) * fimCena} acende={fim * 0.08} />
      <Instituicao pos={UNIAO} escala={0.7} surge={s(c.v_uniao + 0.1, 0.3) * fimCena} />
      <Fluxo de={add(BR, [0.4, 1.8, 0])} para={add(UNIAO, [0, 1.2, 0])} altura={1.2} p={lau * fimCena} anda={t} />
      <Boneco pos={add(BR, [-1.5, 0, 2.2])} rot={0.5} gravata surge={s(c.a_matricula - 0.5, 0.3) * fimCena} pose={t > c.a_matricula && t < c.f_assinar ? "aponta" : "pe"} acende={fim * 0.5} />
      <Bloco pos={add(BR, [-0.7, 0.45, 2.4])} tam={[0.6, 0.8, 0.06]} surge={s(c.a_matricula, 0.25) * fimCena} acende={mat * 0.5} />
      <ConeLuz pos={BR} alt={6} raio={2.2} p={Math.max(mat, fim) * fimCena * 0.8} verde={fim} />
      <ModulosSistema t={t} tl={tl} segPergunta="s7" segComente="s7" base={CTA_BASE} />
      <ConeLuz pos={CTA_BASE} alt={6.5} raio={2.6} p={prog(t, c.cta_quer + 0.3, 0.8)} verde={prog(t, c.cta_comment, 0.6)} />
    </>
  );
};

export const holofote = (t: number, c: Record<string, number>, tl: Timeline) => {
  if (t >= c.cta_quer) return { pos: [CTA_BASE[0] + 0.4, 7.5, CTA_BASE[2] + 2.4] as V3, alvo: CTA_BASE, intensidade: prog(t, c.cta_quer + 0.3, 0.8) };
  if (t >= ini(tl, "virada") + 0.4) return { pos: [BR[0], 7.5, BR[2] + 3] as V3, alvo: BR, intensidade: 0.6 * prog(t, ini(tl, "virada") + 0.4, 0.6) };
  return { pos: [0, 9, 4] as V3, alvo: [0, 0, -1] as V3, intensidade: 0.55 * prog(t, 0.2, 0.6) };
};

export const placas = (t: number, c: Record<string, number>, tl: Timeline): PlacaDef[] => {
  const ate = (de: number, fim: number) => prog(t, de, 0.35) * (1 - prog(t, fim, 0.3));
  return [
    { id: "validade", pos: add(PR(0), [0.8, 1.6, 0.8]), texto: "DATA DE VALIDADE?", tom: "alerta", p: ate(c.h_validade - 0.15, c.s_tres - 0.3) },
    { id: "tres", pos: add(PR(1), [0.7, 2.6, 0.4]), texto: "3 EM CADA 4 MORADORES", tom: "acento", p: ate(c.s_tres - 0.1, c.s_99 - 0.3) },
    { id: "publicos", pos: add(PR(1), [0.7, 0.4, 1.4]), texto: "APARTAMENTOS PÚBLICOS", p: ate(c.s_publicos - 0.1, c.p_prazo - 0.2) },
    { id: "99", pos: add(TQ, [0.4, 2.1, 0]), texto: "CONTRATO DE 99 ANOS", tom: "acento", p: ate(c.s_99 - 0.1, c.p_volta - 0.2) },
    { id: "prazo", pos: add(TQ, [0.4, 2.1, 0]), texto: "O PRAZO ACABA", tom: "alerta", p: ate(c.p_volta - 0.1, ini(tl, "virada") + 0.5) },
    { id: "estado", pos: add(ESTADO, [0, 2.4, 0]), texto: "VOLTA PARA O ESTADO", tom: "alerta", p: ate(c.p_estado - 0.15, ini(tl, "virada") + 0.5) },
    { id: "aqui", pos: add(BR, [0, 2.6, 0]), texto: "AQUI NÃO É ASSIM", p: ate(c.v_aqui + 0.6, c.v_uniao - 0.2) },
    { id: "uniao", pos: add(BR, [0, 1.0, -1.05]), texto: "A PARTE DA UNIÃO", tom: "alerta", p: ate(c.v_uniao - 0.1, ini(tl, "desfecho")) },
    { id: "marinha", pos: add(BR, [0, 2.7, 0]), texto: "TERRENO DE MARINHA", p: ate(c.a_marinha - 0.15, c.a_laudemio - 0.25) },
    { id: "laudemio", pos: add(UNIAO, [0, 2.3, 0]), texto: "LAUDÊMIO DE 5% A CADA VENDA", tom: "alerta", p: ate(c.a_laudemio - 0.1, ini(tl, "desfecho") + 0.2) },
    { id: "matricula", pos: add(BR, [-0.7, 1.5, 2.4]), texto: "CONFIRA NA MATRÍCULA", tom: "acento", p: ate(c.a_matricula - 0.1, c.cta_quer) },
    { id: "antes", pos: add(BR, [0, 2.7, 0]), texto: "ANTES DE ANUNCIAR", tom: "acento", p: ate(c.f_antes - 0.1, c.f_assinar - 0.1) },
    { id: "sem", pos: add(BR, [0, 2.7, 0]), texto: "SEM SURPRESA NA ASSINATURA", tom: "acento", p: ate(c.f_assinar - 0.15, c.cta_quer) },
  ];
};
