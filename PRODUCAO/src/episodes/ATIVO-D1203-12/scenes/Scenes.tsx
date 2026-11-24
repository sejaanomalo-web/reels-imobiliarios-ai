import React from "react";
import { C } from "../../../theme";
import type { Timeline } from "../../types";
import { A } from "../../NOV26/kit";
import type { AtmosferaNome } from "../../../theme";
import {
  Bloco, Boneco, Casa, ConeLuz, Fluxo, Haste, ModulosSistema, Poeira,
  camAt, ease, prog, sp, type Cam, type Capitulo, type PlacaDef, type V3,
} from "../../../estilos/maquete";

/**
 * ATIVO-D1203-12 — "A casa de 1 euro" (grade 03/12/2026 · 12h · HISTÓRIA QUE ENSINA · Maquete 3D).
 * Um só mundo: a cidade siciliana em miniatura com as casas apagadas (perdendo moradores) → arcos de pontos chegam de
 * longe (o anúncio rodou o mundo) e brotam interessados → a condição (depósito, reforma em 3 anos) e o leilão → a cidade
 * acende casa por casa: queria gente → o dono diante da casa: prazo, quem vai cuidar, recomeço → o corretor pergunta
 * o que ele quer além do preço → fecho SISTEMA. Apuração: Sambuca di Sicilia (2019) — CNN, Money, Time Out, Euronews.
 */
const G: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: A.hex }}>{children}</span>;
const R: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: C.warn }}>{children}</span>;

const CASAS: V3[] = [[-3.3, 0, -2.6], [-1.1, 0, -2.6], [1.1, 0, -2.6], [3.3, 0, -2.6], [-3.3, 0, 0], [-1.1, 0, 0], [1.1, 0, 0], [3.3, 0, 0]];
const DONO: V3 = [4.5, 0, 1.6];
const CORRETOR: V3 = [2.7, 0, 1.8];
const LONGE: V3[] = [[-13, 0.2, -8], [13, 0.2, -9], [-9, 0.2, 7], [10, 0.2, 6], [0, 0.2, -15]];
const CTA_BASE: V3 = [13, 0, -10];
const ini = (tl: Timeline, id: string) => tl.scenes.find((s) => s.id === id)?.start ?? 0;

export const capitulos = (c: Record<string, number>, tl: Timeline): (Capitulo & { atm: AtmosferaNome })[] => [
  { de: 0, atm: "memoria", chip: "SICÍLIA · 2019", titulo: <>Casas por <G>1 euro</G></> },
  { de: ini(tl, "cidade") + 0.1, atm: "memoria", chip: "A CIDADE", titulo: <>Perdendo <R>moradores</R></> },
  { de: ini(tl, "mundo") + 0.1, atm: "dados", chip: "O ANÚNCIO", titulo: <>O mundo quis comprar</> },
  { de: c.m_condicao - 0.1, atm: "dados", chip: "A CONDIÇÃO", titulo: <>Depósito e <R>reforma</R></> },
  { de: ini(tl, "virada") + 0.1, atm: "explicacao", chip: "O OBJETIVO", titulo: <>A cidade queria <G>gente</G></> },
  { de: ini(tl, "licao") + 0.1, atm: "neutra", chip: "PARA O CORRETOR", titulo: <>Além do <G>preço</G></> },
  { de: ini(tl, "desfecho") + 0.1, atm: "neutra", chip: "NA CAPTAÇÃO", titulo: <>Pergunte o que <G>ele quer</G></> },
  { de: c.cta_quer - 0.1, atm: "explicacao", chip: "SEU SISTEMA", titulo: <>Um sistema <G>personalizado</G></> },
  { de: c.cta_comment - 0.3, atm: "solucao", chip: "SEU SISTEMA" },
];

export const camera = (t: number, c: Record<string, number>, tl: Timeline): Cam => camAt(t, [
  { t: 0, pos: [0, 9.0, 16.0], alvo: [0, 1.4, -1.2], fov: 40 },
  { t: c.c_vazias, pos: [-1.2, 5.4, 10.2], alvo: [-1, 1.6, -1.2], fov: 40, e: ease.inOut },
  { t: c.m_mundo, pos: [0, 13, 22], alvo: [0, 1.2, -3], fov: 44, e: ease.inOut },
  { t: c.m_interessados + 0.6, pos: [0.6, 11, 19], alvo: [0, 1.4, -2.4], fov: 44 },
  { t: c.m_condicao, pos: [0, 7.4, 13.2], alvo: [0, 1.6, -1.2], fov: 40, e: ease.inOut },
  { t: c.m_leilao, pos: [1.0, 7.0, 12.4], alvo: [0.6, 1.6, -1.0], fov: 40, e: ease.inOut },
  { t: c.v_nunca + 0.3, pos: [0, 9.2, 15.4], alvo: [0, 1.6, -1.2], fov: 42, e: ease.inOut },
  { t: c.v_novo, pos: [-0.6, 8.6, 14.6], alvo: [0, 1.6, -1.2], fov: 42 },
  { t: c.l_objetivo, pos: [3.8, 5.0, 9.6], alvo: [3.6, 1.8, 0.4], fov: 40, e: ease.inOut },
  { t: c.f_pergunte, pos: [3.6, 5.2, 10.2], alvo: [3.5, 1.8, 0.6], fov: 40, e: ease.inOut },
  { t: c.cta_quer - 0.3, pos: [3.7, 5.3, 10.4], alvo: [3.5, 1.8, 0.6], fov: 40 },
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

export const Maquete3D: React.FC<{ t: number; tl: Timeline }> = ({ t, tl }) => {
  const c = tl.cues;
  const s = (at: number, d = 0.35) => sp(t, at - d, { damping: 12, stiffness: 170 });
  const fimCena = 1 - prog(t, c.cta_quer + 0.4, 0.5);
  const vazia = prog(t, c.c_vazias - 0.2, 0.5) * (1 - prog(t, c.v_gente - 0.3, 0.5));
  const mundo = prog(t, c.m_mundo - 0.2, 1.0) * (1 - prog(t, c.m_condicao, 0.6));
  return (
    <>
      <Poeira t={t} centro={[0, 1.6, -1]} n={36} />
      {CASAS.map((p, i) => (
        <Casa key={i} pos={p} escala={0.95} rot={(i % 3 - 1) * 0.12} surge={s(0.1 + i * 0.06, 0.2) * fimCena} mat={vazia > 0.5 ? "grafite" : "argila"}
          acende={i === 7 ? 0 : prog(t, c.v_gente - 0.2 + i * 0.12, 0.4) * (1 - prog(t, c.l_objetivo - 0.3, 0.5)) * (i % 2 ? 0.25 : 0.4)} />
      ))}
      {/* ruas */}
      <Bloco pos={[0, 0, -1.3]} tam={[9.5, 0.03, 0.7]} mat="grafite" surge={s(0.05, 0.1) * fimCena} />
      {/* o mundo chegando */}
      {LONGE.map((p, i) => (
        <Fluxo key={i} de={p} para={CASAS[(i * 3) % 8]} altura={4 + i} p={mundo * prog(t, c.m_mundo - 0.2 + i * 0.15, 0.8)} anda={t * 0.4} n={22} />
      ))}
      {[[-4.6, 1.8], [-2.2, 1.6], [0, 2.0], [2.2, 1.6], [-5.2, -1.2], [5.0, -1.4]].map(([x, z], i) => (
        <Boneco key={i} pos={[x, 0, z]} rot={Math.PI + (i % 2 ? 0.3 : -0.3)} escala={0.7} surge={s(c.m_interessados + i * 0.1, 0.2) * (1 - prog(t, c.v_nunca, 0.5))} />
      ))}
      <Haste pos={[-4.8, 0, -3.4]} alt={2.0} surge={s(0.2, 0.3) * (1 - prog(t, ini(tl, "mundo"), 0.4))} />
      {/* o dono e o corretor */}
      <Boneco pos={DONO} rot={-0.6} surge={s(c.l_objetivo - 0.2, 0.3) * fimCena} />
      <Boneco pos={CORRETOR} rot={0.6} gravata surge={s(c.f_pergunte - 0.3, 0.3) * fimCena} pose={t > c.f_pergunte ? "aponta" : "pe"} />
      <ConeLuz pos={[3.6, 0, 1.0]} alt={6.5} raio={2.0} p={prog(t, c.l_objetivo - 0.2, 0.6) * fimCena} />
      <ModulosSistema t={t} tl={tl} segPergunta="s9" segComente="s9" base={CTA_BASE} />
      <ConeLuz pos={CTA_BASE} alt={6.5} raio={2.6} p={prog(t, c.cta_quer + 0.3, 0.8)} verde={prog(t, c.cta_comment, 0.6)} />
    </>
  );
};

export const holofote = (t: number, c: Record<string, number>, tl: Timeline) => {
  if (t >= c.cta_quer) return { pos: [CTA_BASE[0] + 0.4, 7.5, CTA_BASE[2] + 2.4] as V3, alvo: CTA_BASE, intensidade: prog(t, c.cta_quer + 0.3, 0.8) };
  if (t >= c.l_objetivo - 0.3) return { pos: [3.8, 7.5, 4.0] as V3, alvo: [3.6, 0, 1.0] as V3, intensidade: 0.7 * prog(t, c.l_objetivo - 0.2, 0.6) };
  return { pos: [0, 8, 4] as V3, alvo: [0, 0, -1.2] as V3, intensidade: 0.4 * prog(t, 0.2, 0.6) };
};

export const placas = (t: number, c: Record<string, number>, tl: Timeline): PlacaDef[] => {
  const ate = (de: number, fim: number) => prog(t, de, 0.35) * (1 - prog(t, fim, 0.3));
  return [
    { id: "sambuca", pos: [-4.8, 2.0, -3.4], texto: "SAMBUCA · SICÍLIA", p: ate(0.3, ini(tl, "mundo")) },
    { id: "euro", pos: [0, 2.0, -0.6], texto: "€ 1", tom: "acento", p: ate(c.h_euro - 0.1, c.c_sambuca + 0.4) },
    { id: "vazias", pos: [0, 2.0, -0.6], texto: "CASAS VAZIAS", tom: "alerta", p: ate(c.c_vazias - 0.1, ini(tl, "mundo")) },
    { id: "mundo", pos: [0, 2.6, -1.2], texto: "O ANÚNCIO RODOU O MUNDO", p: ate(c.m_mundo, c.m_condicao - 0.2) },
    { id: "deposito", pos: [-2.2, 2.0, -0.4], texto: "DEPÓSITO € 5 MIL", p: ate(c.m_5mil - 0.1, ini(tl, "virada")) },
    { id: "reforma", pos: [2.2, 2.0, -0.4], texto: "REFORMA EM 3 ANOS", p: ate(c.m_tres - 0.1, ini(tl, "virada")) },
    { id: "leilao", pos: [0, 2.6, -2.0], texto: "LEILÃO: € 5 A 10 MIL", p: ate(c.m_leilao - 0.1, ini(tl, "virada")) },
    { id: "gente", pos: [0, 2.4, -1.2], texto: "QUERIA GENTE MORANDO", p: ate(c.v_gente - 0.1, ini(tl, "licao")) },
    { id: "prazo", pos: [5.6, 1.8, 1.4], texto: "PRAZO", p: ate(c.l_prazo - 0.1, ini(tl, "desfecho")) },
    { id: "cuidar", pos: [5.6, 2.4, 0.4], texto: "QUEM VAI CUIDAR", p: ate(c.l_cuidar - 0.1, ini(tl, "desfecho")) },
    { id: "recomeco", pos: [2.0, 2.4, 0.4], texto: "UM RECOMEÇO", p: ate(c.l_recomeco - 0.1, ini(tl, "desfecho")) },
    { id: "pergunte", pos: [3.6, 2.6, 0.8], texto: "O QUE ELE QUER ALÉM DO PREÇO?", tom: "acento", p: ate(c.f_pergunte - 0.1, c.cta_quer) },
  ];
};
