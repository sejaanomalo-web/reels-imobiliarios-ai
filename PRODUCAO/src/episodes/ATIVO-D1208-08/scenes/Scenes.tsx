import React from "react";
import type { Timeline } from "../../types";
import { A } from "../../NOV26/kit";
import type { AtmosferaNome } from "../../../theme";
import {
  Bloco, Boneco, ConeLuz, ModulosSistema, Poeira, Predio,
  camAt, ease, prog, sp, type Cam, type Capitulo, type PlacaDef, type V3,
} from "../../../estilos/maquete";

/**
 * ATIVO-D1208-08 — "O prédio escolhe" (grade 08/12/2026 · 08h · E SE…? · Maquete 3D).
 * Um só mundo: o prédio com a mesa do conselho na portaria; o comprador entrevistado e barrado → aqui o condomínio não escolhe,
 * mas a convenção (documento que acende) barra o plano: a placa do aluguel por aplicativo apaga (STJ, 2021, num caso) → o
 * corretor lê a convenção com o cliente antes da proposta → regra errada, investimento errado → fecho SISTEMA.
 * Apuração: co-ops de Nova York (conselho entrevista e pode recusar); STJ REsp 1.819.075/RS (2021), não vinculante.
 */
const G: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: A.hex }}>{children}</span>;
const NY: V3 = [0, 0, -0.6];
const MESA: V3 = [0, 0, 1.8];
const BR: V3 = [15, 0, 2];
const DOC: V3 = [BR[0] + 1.9, 0, BR[2] + 1.4];
const CTA_BASE: V3 = [25, 0, -9];
const ini = (tl: Timeline, id: string) => tl.scenes.find((s) => s.id === id)?.start ?? 0;
const add = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];

export const capitulos = (c: Record<string, number>, tl: Timeline): (Capitulo & { atm: AtmosferaNome })[] => [
  { de: 0, atm: "dilema", chip: "E SE…?", titulo: <>O prédio <G>escolhe</G> quem compra</> },
  { de: ini(tl, "ny") + 0.1, atm: "memoria", chip: "NOVA YORK", titulo: <>Um <G>conselho</G> entrevista</> },
  { de: ini(tl, "aqui") + 0.1, atm: "explicacao", chip: "AQUI", titulo: <>As <G>regras</G> barram o plano</> },
  { de: ini(tl, "virada") + 0.1, atm: "tensao", chip: "STJ · 2021 · NUM CASO", titulo: <>A <G>convenção</G> pode proibir</> },
  { de: ini(tl, "acao") + 0.1, atm: "neutra", chip: "ANTES DA PROPOSTA", titulo: <>Leia a <G>convenção</G></> },
  { de: ini(tl, "desfecho") + 0.1, atm: "explicacao", chip: "A LIÇÃO", titulo: <>Regra errada, <G>investimento errado</G></> },
  { de: c.cta_quer - 0.1, atm: "explicacao", chip: "SEU SISTEMA", titulo: <>Um sistema <G>personalizado</G></> },
  { de: c.cta_comment - 0.3, atm: "solucao", chip: "SEU SISTEMA" },
];

const deriva = (t: number, c: Record<string, number>, cam: Cam): Cam => {
  const k = 1 - prog(t, c.cta_quer - 0.3, 0.8);
  return { ...cam, pos: [cam.pos[0] + k * 0.55 * Math.sin(t * 0.43), cam.pos[1] + k * 0.2 * Math.sin(t * 0.31 + 1), cam.pos[2] - k * 0.5 * Math.sin(t * 0.29 + 0.5)] };
};
export const camera = (t: number, c: Record<string, number>, tl: Timeline): Cam => deriva(t, c, camAt(t, [
  { t: 0, pos: [1.4, 5.2, 14.4], alvo: [0, 2.0, 0], fov: 40 },
  { t: c.n_conselho, pos: [1.6, 5.6, 13.8], alvo: [0, 1.4, 1.0], fov: 40, e: ease.inOut },
  { t: c.n_nao, pos: [1.2, 5.4, 13.2], alvo: [0, 1.2, 1.4], fov: 40, e: ease.inOut },
  { t: ini(tl, "aqui") + 0.3, pos: [1.2, 5.4, 13.4], alvo: [0, 1.2, 1.4], fov: 40 },
  { t: c.q_regras, pos: [BR[0] + 0.6, 6.2, BR[2] + 14.6], alvo: [BR[0] + 0.6, 1.8, BR[2]], fov: 40, e: ease.inOut },
  { t: c.v_aplicativo, pos: [BR[0] + 0.8, 6.0, BR[2] + 13.6], alvo: [BR[0] + 0.6, 1.8, BR[2]], fov: 40, e: ease.inOut },
  { t: c.a_leia, pos: [BR[0] + 1.4, 5.4, BR[2] + 12.6], alvo: [BR[0] + 1.0, 1.2, BR[2] + 1.0], fov: 40, e: ease.inOut },
  { t: c.cta_quer - 0.3, pos: [BR[0] + 1.5, 5.4, BR[2] + 12.6], alvo: [BR[0] + 1.0, 1.2, BR[2] + 1.0], fov: 40 },
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
  const zonaA = 1 - prog(t, c.q_regras + 0.6, 0.5);
  const nao = prog(t, c.n_nao - 0.2, 0.6);
  const conv = prog(t, c.v_convencao - 0.15, 0.4);
  const proibe = prog(t, c.v_proibir - 0.1, 0.5);
  const leia = prog(t, c.a_leia - 0.15, 0.4);
  const errado = prog(t, c.f_errada - 0.15, 0.5);
  return (
    <>
      <Poeira t={t} centro={[0, 2, 0]} n={24} />
      {/* Nova York: o conselho na portaria */}
      <Bloco pos={add(NY, [0, 0.03, 1.2])} tam={[3.4, 0.06, 4.2]} surge={s(0.1, 0.2) * zonaA} mat="grafite" />
      <Predio pos={NY} andares={7} escala={0.62} surge={s(c.h_predio - 0.2, 0.3) * zonaA} />
      <Bloco pos={add(MESA, [0, 0.38, 0])} tam={[2.0, 0.08, 0.7]} surge={s(c.n_conselho - 0.2, 0.25) * zonaA} />
      {[-0.7, 0, 0.7].map((x, i) => (
        <Boneco key={i} pos={add(MESA, [x, 0, -0.6])} rot={0} escala={0.6} surge={s(c.n_conselho + i * 0.08, 0.25) * zonaA} mat={i === 1 ? "grafite" : "argila"} />
      ))}
      <Boneco pos={add(MESA, [nao * 0.4, 0, 1.3 + nao * 0.8])} rot={Math.PI} escala={0.62} surge={s(c.n_entrevista - 0.4, 0.25) * zonaA} mat={nao > 0.5 ? "grafite" : "argila"} />
      {/* aqui: o prédio, a convenção e o aluguel por aplicativo */}
      <Bloco pos={add(BR, [0, 0.03, 0.8])} tam={[4.2, 0.06, 3.6]} surge={s(c.q_escolhe, 0.25) * fimCena} mat="grafite" />
      <Predio pos={BR} andares={6} escala={0.62} surge={s(c.q_escolhe + 0.1, 0.3) * fimCena} acende={errado * 0} />
      <Bloco pos={add(BR, [0.95, 1.3, 0.35])} tam={[0.5, 0.35, 0.06]} surge={s(c.v_aplicativo - 0.3, 0.25) * fimCena} mat={proibe > 0.5 ? "grafite" : "argila"} acende={(1 - proibe) * 0.4 * prog(t, c.v_aplicativo - 0.3, 0.4)} />
      <Bloco pos={add(DOC, [0, 0.55, 0])} tam={[0.7, 1.0, 0.06]} rot={-0.4} surge={s(c.v_convencao - 0.2, 0.25) * fimCena} acende={Math.max(conv * 0.35, leia * 0.5)} />
      <Boneco pos={add(DOC, [-0.9, 0, 0.9])} rot={0.7} gravata surge={s(c.a_alugar - 0.3, 0.3) * fimCena} pose={t > c.a_leia - 0.2 && t < c.f_certo ? "aponta" : "pe"} acende={leia * 0.4} />
      <Boneco pos={add(DOC, [0.9, 0, 1.0])} rot={-0.7} surge={s(c.a_alugar - 0.2, 0.3) * fimCena} />
      <ConeLuz pos={DOC} alt={5.5} raio={1.8} p={Math.max(conv, leia) * fimCena * 0.8} verde={leia} />
      <ModulosSistema t={t} tl={tl} segPergunta="s7" segComente="s7" base={CTA_BASE} />
      <ConeLuz pos={CTA_BASE} alt={6.5} raio={2.6} p={prog(t, c.cta_quer + 0.3, 0.8)} verde={prog(t, c.cta_comment, 0.6)} />
    </>
  );
};

export const holofote = (t: number, c: Record<string, number>, tl: Timeline) => {
  if (t >= c.cta_quer) return { pos: [CTA_BASE[0] + 0.4, 7.5, CTA_BASE[2] + 2.4] as V3, alvo: CTA_BASE, intensidade: prog(t, c.cta_quer + 0.3, 0.8) };
  if (t >= ini(tl, "aqui") + 0.4) return { pos: [BR[0], 7.5, BR[2] + 3] as V3, alvo: BR, intensidade: 0.6 * prog(t, ini(tl, "aqui") + 0.4, 0.6) };
  return { pos: [0, 8, 4] as V3, alvo: [0, 0, 1] as V3, intensidade: 0.55 * prog(t, 0.2, 0.6) };
};

export const placas = (t: number, c: Record<string, number>, tl: Timeline): PlacaDef[] => {
  const ate = (de: number, fim: number) => prog(t, de, 0.35) * (1 - prog(t, fim, 0.3));
  return [
    { id: "escolhe", pos: add(NY, [0, 3.1, 0]), texto: "O PRÉDIO ESCOLHE?", tom: "alerta", p: ate(c.h_escolher - 0.15, c.n_york - 0.2) },
    { id: "ny", pos: add(NY, [0, 3.1, 0]), texto: "NOVA YORK", p: ate(c.n_york - 0.15, c.n_conselho - 0.1) },
    { id: "conselho", pos: add(MESA, [0, 1.6, -0.6]), texto: "CONSELHO DE MORADORES", p: ate(c.n_conselho - 0.1, c.n_nao - 0.2) },
    { id: "nao", pos: add(MESA, [0, 1.6, -0.6]), texto: "PODE DIZER NÃO", tom: "alerta", p: ate(c.n_nao - 0.15, ini(tl, "aqui") + 0.4) },
    { id: "aqui", pos: add(BR, [0, 2.8, 0]), texto: "AQUI NÃO ESCOLHE O COMPRADOR", p: ate(c.q_escolhe - 0.1, c.q_regras - 0.1) },
    { id: "regras", pos: add(BR, [0, 2.8, 0]), texto: "AS REGRAS PODEM BARRAR O PLANO", tom: "alerta", p: ate(c.q_regras - 0.1, c.v_convencao - 0.2) },
    { id: "conv", pos: add(DOC, [0, 1.5, 0]), texto: "CONVENÇÃO", tom: "acento", p: ate(c.v_convencao - 0.1, c.a_leia - 0.2) },
    { id: "app", pos: add(BR, [1.2, 1.9, 0.6]), texto: "ALUGUEL POR APLICATIVO", p: ate(c.v_aplicativo - 0.3, c.v_proibir - 0.05) },
    { id: "proibir", pos: add(BR, [1.2, 1.9, 0.6]), texto: "PODE PROIBIR (STJ, 2021, NUM CASO)", tom: "alerta", p: ate(c.v_proibir - 0.05, ini(tl, "acao") + 0.3) },
    { id: "leia", pos: add(DOC, [0, 1.5, 0]), texto: "LEIA ANTES DA PROPOSTA", tom: "acento", p: ate(c.a_leia - 0.1, c.f_certo - 0.1) },
  ];
};
