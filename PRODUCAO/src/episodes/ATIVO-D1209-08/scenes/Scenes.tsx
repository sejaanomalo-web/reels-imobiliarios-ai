import React from "react";
import type { Timeline } from "../../types";
import { A } from "../../NOV26/kit";
import type { AtmosferaNome } from "../../../theme";
import {
  Bloco, Boneco, Casa, ConeLuz, Fluxo, Instituicao, ModulosSistema, Poeira, Predio,
  camAt, ease, prog, sp, type Cam, type Capitulo, type PlacaDef, type V3,
} from "../../../estilos/maquete";

/**
 * ATIVO-D1209-08 — "O preço público" (grade 09/12/2026 · 08h · E SE…? · Maquete 3D).
 * Um só mundo: a rua de casas com o preço em dúvida → Inglaterra: as vendas registradas fluem para o cadastro, de graça,
 * desde 1995 → São Paulo: a prefeitura publica todo mês as transações com ITBI pago (a planilha acende) → anúncio × transação
 * → o corretor compara com vendas reais e guarda pedido × fechado (duas barras) → venda real não discute opinião → SISTEMA.
 * Apuração: HM Land Registry, Price Paid Data (desde 1995, licença aberta); Prefeitura de SP, transações com ITBI (Lei 18.161/2024).
 */
const G: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: A.hex }}>{children}</span>;
const RUA: V3 = [0, 0, 0];
const CAD: V3 = [0, 0, -3.4];
const BR: V3 = [15, 0, 2];
const PREF: V3 = [BR[0] - 0.4, 0, BR[2] - 2.6];
const DOC: V3 = [BR[0] + 0.6, 0, BR[2] + 0.4];
const CASA_V: V3 = [BR[0] - 1.5, 0, BR[2] + 1.6];
const BAR: V3 = [BR[0] + 2.6, 0, BR[2] + 1.2];
const CTA_BASE: V3 = [25, 0, -9];
const CASAS: V3[] = [-2.4, -0.8, 0.8, 2.4].map((x) => [x, 0, 0] as V3);
const ini = (tl: Timeline, id: string) => tl.scenes.find((s) => s.id === id)?.start ?? 0;
const add = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];

export const capitulos = (c: Record<string, number>, tl: Timeline): (Capitulo & { atm: AtmosferaNome })[] => [
  { de: 0, atm: "dilema", chip: "E SE…?", titulo: <>Preço <G>público</G>?</> },
  { de: ini(tl, "inglaterra") + 0.1, atm: "memoria", chip: "INGLATERRA · DESDE 1995", titulo: <>Vendas <G>de graça</G></> },
  { de: ini(tl, "sp") + 0.1, atm: "explicacao", chip: "SÃO PAULO · TODO MÊS", titulo: <>O <G>ITBI</G> publicado</> },
  { de: ini(tl, "virada") + 0.1, atm: "tensao", chip: "A DIFERENÇA", titulo: <>Anúncio × <G>transação</G></> },
  { de: ini(tl, "acao") + 0.1, atm: "neutra", chip: "NA AVALIAÇÃO", titulo: <>Compare e <G>guarde</G></> },
  { de: ini(tl, "desfecho") + 0.1, atm: "explicacao", chip: "A LIÇÃO", titulo: <>Venda <G>real</G></> },
  { de: c.cta_quer - 0.1, atm: "explicacao", chip: "SEU SISTEMA", titulo: <>Um sistema <G>personalizado</G></> },
  { de: c.cta_comment - 0.3, atm: "solucao", chip: "SEU SISTEMA" },
];

const deriva = (t: number, c: Record<string, number>, cam: Cam): Cam => {
  const k = 1 - prog(t, c.cta_quer - 0.3, 0.8);
  return { ...cam, pos: [cam.pos[0] + k * 0.55 * Math.sin(t * 0.43), cam.pos[1] + k * 0.2 * Math.sin(t * 0.31 + 1), cam.pos[2] - k * 0.5 * Math.sin(t * 0.29 + 0.5)] };
};
export const camera = (t: number, c: Record<string, number>, tl: Timeline): Cam => deriva(t, c, camAt(t, [
  { t: 0, pos: [0.6, 5.0, 13.2], alvo: [0, 1.1, 0], fov: 40 },
  { t: c.h_publico, pos: [0.8, 5.2, 13.6], alvo: [0, 1.1, 0], fov: 40, e: ease.inOut },
  { t: c.i_graca, pos: [1.0, 6.6, 13.4], alvo: [0, 1.4, -1.4], fov: 40, e: ease.inOut },
  { t: ini(tl, "sp") + 0.2, pos: [1.0, 6.8, 13.6], alvo: [0, 1.4, -1.4], fov: 40 },
  { t: c.p_mes, pos: [BR[0] + 0.2, 6.4, BR[2] + 13.8], alvo: [BR[0], 1.6, BR[2] - 0.6], fov: 40, e: ease.inOut },
  { t: c.p_itbi + 0.3, pos: [BR[0] + 0.2, 6.2, BR[2] + 13.2], alvo: [BR[0], 1.4, BR[2] - 0.4], fov: 40, e: ease.inOut },
  { t: c.v_quer, pos: [BR[0] - 1.2, 5.4, BR[2] + 12.6], alvo: [BR[0] - 1.2, 1.2, BR[2] + 0.8], fov: 40, e: ease.inOut },
  { t: c.a_reais, pos: [BR[0] + 0.6, 5.6, BR[2] + 12.8], alvo: [BR[0] + 0.6, 1.2, BR[2] + 0.8], fov: 40, e: ease.inOut },
  { t: c.a_pedido, pos: [BR[0] + 2.2, 5.4, BR[2] + 12.6], alvo: [BR[0] + 2.2, 1.2, BR[2] + 1.0], fov: 40, e: ease.inOut },
  { t: c.cta_quer - 0.3, pos: [BR[0] + 1.2, 5.6, BR[2] + 12.8], alvo: [BR[0] + 1.0, 1.2, BR[2] + 1.0], fov: 40, e: ease.inOut },
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
  const zonaA = 1 - prog(t, c.p_mes + 0.6, 0.5);
  const flui = prog(t, c.i_vendas - 0.2, 1.6);
  const plan = prog(t, c.p_transacoes - 0.15, 0.5);
  const pagou = prog(t, c.v_transacao - 0.1, 0.5);
  const reais = prog(t, c.a_reais - 0.15, 0.5);
  const fech = prog(t, c.a_fechado - 0.15, 0.5);
  const fim = prog(t, c.f_real - 0.15, 0.6);
  return (
    <>
      <Poeira t={t} centro={[0, 2, 0]} n={24} />
      {/* a rua e o cadastro inglês */}
      <Bloco pos={add(RUA, [0, 0.03, 0.2])} tam={[6.4, 0.06, 2.0]} surge={s(0.1, 0.2) * zonaA} mat="grafite" />
      {CASAS.map((p, i) => <Casa key={i} pos={p} escala={0.62} surge={s(c.h_preco - 0.3 + i * 0.12, 0.25) * zonaA} acende={flui * 0.1} />)}
      <Instituicao pos={CAD} escala={0.62} surge={s(c.i_inglaterra - 0.2, 0.3) * zonaA} acende={flui * 0.4} />
      {CASAS.map((p, i) => <Fluxo key={i} de={add(p, [0, 1.1, 0])} para={add(CAD, [0, 1.6, 0.6])} altura={1.4} p={flui * zonaA} n={10} anda={t * 0.6 + i * 0.2} />)}
      {/* São Paulo: prefeitura, prédios, a planilha */}
      <Bloco pos={add(BR, [0, 0.03, 0.4])} tam={[7.2, 0.06, 5.2]} surge={s(c.p_paulo, 0.25) * fimCena} mat="grafite" />
      <Instituicao pos={PREF} escala={0.62} surge={s(c.p_paulo + 0.05, 0.3) * fimCena} acende={plan * 0.35} />
      <Predio pos={add(BR, [-2.4, 0, -1.6])} andares={5} escala={0.55} surge={s(c.p_paulo + 0.15, 0.3) * fimCena} />
      <Predio pos={add(BR, [2.6, 0, -1.8])} andares={6} escala={0.55} surge={s(c.p_paulo + 0.25, 0.3) * fimCena} />
      <Bloco pos={add(DOC, [0, 0.55, 0])} tam={[0.8, 1.0, 0.06]} rot={-0.2} surge={s(c.p_transacoes - 0.2, 0.25) * fimCena} acende={Math.max(plan * 0.45, reais * 0.5)} />
      <Casa pos={CASA_V} escala={0.62} rot={0.3} surge={s(c.v_anuncio - 0.4, 0.3) * fimCena} acende={pagou * 0.4} />
      <ConeLuz pos={DOC} alt={5.5} raio={1.6} p={plan * (1 - pagou * 0.6) * fimCena * 0.8} verde={plan} />
      <ConeLuz pos={CASA_V} alt={5.5} raio={1.6} p={prog(t, c.v_anuncio - 0.2, 0.5) * (1 - reais) * fimCena * 0.8} verde={pagou} />
      {/* o corretor e as duas barras: pedido × fechado */}
      <Boneco pos={add(DOC, [0.6, 0, 1.4])} rot={-0.3} gravata surge={s(c.a_compare - 0.3, 0.3) * fimCena} pose={t > c.a_compare - 0.2 && t < c.f_real ? "aponta" : fim > 0.5 ? "bracos" : "pe"} acende={Math.max(reais * 0.3, fim * 0.5)} />
      <Bloco pos={add(BAR, [0, 0.75, 0])} tam={[0.42, 1.5, 0.42]} surge={s(c.a_pedido - 0.2, 0.3) * fimCena} />
      <Bloco pos={add(BAR, [0.7, 0.55, 0])} tam={[0.42, 1.1, 0.42]} surge={s(c.a_fechado - 0.2, 0.3) * fimCena} acende={fech * 0.5} />
      <ConeLuz pos={add(BAR, [0.35, 0, 0])} alt={5.5} raio={1.4} p={prog(t, c.a_pedido - 0.2, 0.5) * fimCena * 0.8} verde={fech} />
      <ModulosSistema t={t} tl={tl} segPergunta="s7" segComente="s7" base={CTA_BASE} />
      <ConeLuz pos={CTA_BASE} alt={6.5} raio={2.6} p={prog(t, c.cta_quer + 0.3, 0.8)} verde={prog(t, c.cta_comment, 0.6)} />
    </>
  );
};

export const holofote = (t: number, c: Record<string, number>, tl: Timeline) => {
  if (t >= c.cta_quer) return { pos: [CTA_BASE[0] + 0.4, 7.5, CTA_BASE[2] + 2.4] as V3, alvo: CTA_BASE, intensidade: prog(t, c.cta_quer + 0.3, 0.8) };
  if (t >= c.p_mes) return { pos: [BR[0], 7.5, BR[2] + 3] as V3, alvo: BR, intensidade: 0.6 * prog(t, c.p_mes, 0.6) };
  return { pos: [0, 8, 4] as V3, alvo: [0, 0, -0.6] as V3, intensidade: 0.55 * prog(t, 0.2, 0.6) };
};

export const placas = (t: number, c: Record<string, number>, tl: Timeline): PlacaDef[] => {
  const ate = (de: number, fim: number) => prog(t, de, 0.35) * (1 - prog(t, fim, 0.3));
  return [
    { id: "preco", pos: add(RUA, [0, 2.4, 0]), texto: "QUANTO VALEU CADA VENDA?", tom: "alerta", p: ate(c.h_preco + 0.4, c.i_inglaterra - 0.2) },
    { id: "cad", pos: add(CAD, [0, 2.9, 0]), texto: "CADASTRO OFICIAL · DE GRAÇA", tom: "acento", p: ate(c.i_graca - 0.15, c.i_1995 - 0.2) },
    { id: "1995", pos: add(CAD, [0, 2.9, 0]), texto: "VENDAS REGISTRADAS DESDE 1995", tom: "acento", p: ate(c.i_1995 - 0.15, c.p_paulo) },
    { id: "pref", pos: add(PREF, [0, 2.2, 0]), texto: "SÃO PAULO · TODO MÊS", p: ate(c.p_mes - 0.15, c.p_itbi - 0.1) },
    { id: "itbi", pos: add(DOC, [0, 1.6, 0]), texto: "TRANSAÇÕES COM ITBI PAGO", tom: "acento", p: ate(c.p_itbi - 0.15, c.v_anuncio - 0.1) },
    { id: "anuncio", pos: add(CASA_V, [0, 2.4, 0]), texto: "ANÚNCIO: O QUE O DONO QUER", tom: "alerta", p: ate(c.v_anuncio - 0.1, c.v_transacao - 0.1) },
    { id: "pagou", pos: add(CASA_V, [0, 2.4, 0]), texto: "TRANSAÇÃO: O QUE ALGUÉM PAGOU", tom: "acento", p: ate(c.v_transacao - 0.1, c.a_compare - 0.1) },
    { id: "reais", pos: add(DOC, [0, 1.6, 0]), texto: "COMPARE COM VENDAS REAIS", tom: "acento", p: ate(c.a_reais - 0.15, c.a_pedido - 0.2) },
    { id: "pxf", pos: add(BAR, [0.35, 2.1, 0]), texto: "PEDIDO × FECHADO", tom: "acento", p: ate(c.a_pedido - 0.15, c.f_real - 0.1) },
    { id: "fim", pos: add(DOC, [0.6, 2.0, 1.4]), texto: "VENDA REAL, NÃO OPINIÃO", tom: "acento", p: ate(c.f_real - 0.1, c.cta_quer + 0.2) },
  ];
};
