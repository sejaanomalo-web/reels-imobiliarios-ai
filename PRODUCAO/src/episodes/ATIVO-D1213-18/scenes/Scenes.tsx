import React from "react";
import type { Timeline } from "../../types";
import { A } from "../../NOV26/kit";
import type { AtmosferaNome } from "../../../theme";
import {
  Bloco, Boneco, Casa, ConeLuz, ModulosSistema, Poeira, Predio,
  camAt, ease, prog, sp, type Cam, type Capitulo, type PlacaDef, type V3,
} from "../../../estilos/maquete";

/**
 * ATIVO-D1213-18 — "A sombra que mudou a cidade" (grade 13/12/2026 · 18h · HISTÓRIA QUE ENSINA · Maquete 3D).
 * Um só mundo: uma quadra com casinhas ao sol → em 1915 brota o paredão sem recuo e a luz some das casas (a sombra se
 * estende no chão) → 1916: a lei de zoneamento; o paredão dá lugar ao prédio em degraus e a luz volta → os vizinhos tinham
 * comprado luz e perderam pelo terreno ao lado → a câmera anda até uma casa à venda com um terreno vazio ao lado: o que a
 * lei permite construir brota em fantasma → o que pode subir ao lado faz parte do imóvel → SISTEMA.
 * Apuração: Equitable Building (1915) e Resolução de Zoneamento de NY (1916). Sem área da sombra, sem nº exato de andares.
 */
const G: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: A.hex }}>{children}</span>;
const CASAS: V3[] = [[-3.0, 0, 1.6], [-1.5, 0, 1.8], [0, 0, 1.9], [1.5, 0, 1.8], [3.0, 0, 1.6]];
const VENDA: V3 = [9.2, 0, 0.2];
const LOTE: V3 = [11.0, 0, 0.2];
const COR: V3 = [8.2, 0, 1.8];
const CLI: V3 = [9.9, 0, 2.0];
const CTA_BASE: V3 = [19, 0, -9];
const ini = (tl: Timeline, id: string) => tl.scenes.find((s) => s.id === id)?.start ?? 0;
const add = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];

export const capitulos = (c: Record<string, number>, tl: Timeline): (Capitulo & { atm: AtmosferaNome })[] => [
  { de: 0, atm: "dilema", chip: "NOVA YORK · 1915", titulo: <>Uma sombra <G>mudou a lei</G></> },
  { de: ini(tl, "paredao") + 0.1, atm: "tensao", chip: "O PAREDÃO", titulo: <>Sem recuo, <G>sem sol</G></> },
  { de: ini(tl, "lei") + 0.1, atm: "explicacao", chip: "1916 · ZONEAMENTO", titulo: <>Recuos <G>para a luz</G></> },
  { de: ini(tl, "virada") + 0.1, atm: "neutra", chip: "A VIRADA", titulo: <>Luz comprada, <G>perdida</G></> },
  { de: ini(tl, "acao") + 0.1, atm: "explicacao", chip: "NA VENDA", titulo: <>Confira <G>o vizinho</G></> },
  { de: ini(tl, "desfecho") + 0.1, atm: "explicacao", chip: "A LIÇÃO", titulo: <>O lado <G>faz parte</G></> },
  { de: c.cta_quer - 0.1, atm: "explicacao", chip: "SEU SISTEMA", titulo: <>Um sistema <G>personalizado</G></> },
  { de: c.cta_comment - 0.3, atm: "solucao", chip: "SEU SISTEMA" },
];

const deriva = (t: number, c: Record<string, number>, cam: Cam): Cam => {
  const k = 1 - prog(t, c.cta_quer - 0.3, 0.8);
  return { ...cam, pos: [cam.pos[0] + k * 0.5 * Math.sin(t * 0.41), cam.pos[1] + k * 0.2 * Math.sin(t * 0.33 + 1), cam.pos[2] - k * 0.45 * Math.sin(t * 0.27 + 0.5)] };
};
export const camera = (t: number, c: Record<string, number>, tl: Timeline): Cam => deriva(t, c, camAt(t, [
  { t: 0, pos: [1.5, 7.6, 19.0], alvo: [0, 2.6, 0.0], fov: 40 },
  { t: c.p_paredao, pos: [2.5, 8.2, 20.4], alvo: [0, 2.8, -0.2], fov: 40, e: ease.inOut },
  { t: c.p_sol, pos: [1.8, 7.8, 19.4], alvo: [0, 2.6, 0.2], fov: 40, e: ease.inOut },
  { t: c.l_recuos, pos: [2.6, 8.2, 20.4], alvo: [0, 2.8, -0.2], fov: 40, e: ease.inOut },
  { t: c.v_perderam + 0.5, pos: [2.0, 8.0, 19.8], alvo: [0, 2.6, 0.0], fov: 40, e: ease.inOut },
  { t: c.a_vista - 0.3, pos: [10.0, 5.6, 12.4], alvo: [10.0, 1.4, 0.2], fov: 40, e: ease.inOut },
  { t: c.a_vizinho + 0.4, pos: [10.4, 6.2, 13.4], alvo: [10.2, 1.8, 0.2], fov: 40, e: ease.inOut },
  { t: c.cta_quer - 0.3, pos: [10.4, 6.4, 13.8], alvo: [10.2, 1.8, 0.2], fov: 40 },
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
  const quadra = 1 - prog(t, c.a_vista - 0.8, 0.5);
  const paredao = s(c.h_1915 + 0.3, 0.5) * (1 - prog(t, c.l_recuos - 0.3, 0.5));
  const sombra = prog(t, c.h_sombra - 0.3, 1.2, ease.out) * (1 - prog(t, c.l_luz - 0.3, 0.8));
  const degraus = prog(t, c.l_recuos - 0.2, 0.6);
  const sol = Math.max(prog(t, 0.1, 0.5) * (1 - prog(t, c.h_sombra - 0.3, 0.8)), prog(t, c.l_luz - 0.2, 0.6));
  const fim = prog(t, c.f_parte - 0.15, 0.5);
  return (
    <>
      <Poeira t={t} centro={[4, 2, 0]} n={24} />
      <Bloco pos={[4.5, 0, 0]} tam={[16, 0.02, 8]} surge={s(0.05, 0.2) * fimCena} mat="grafite" />
      {/* a quadra */}
      {CASAS.map((p, i) => <Casa key={i} pos={p} escala={0.75} surge={s(0.15 + i * 0.08, 0.3) * fimCena * quadra} acende={sol * 0.25} />)}
      <Bloco pos={[0, 0.03, 1.0]} tam={[8.0, 0.02, 3.4 * sombra + 0.01]} surge={sombra > 0.01 ? quadra : 0} mat="grafite" />
      <Bloco pos={[0, 0, -1.6]} tam={[3.0, 4.6, 1.6]} surge={paredao * quadra} />
      <Bloco pos={[0, 0, -1.6]} tam={[3.0, 1.8, 1.6]} surge={degraus * quadra} acende={prog(t, c.l_luz - 0.2, 0.5) * 0.25} />
      <Bloco pos={[0, 1.8, -1.7]} tam={[2.2, 1.4, 1.2]} surge={prog(t, c.l_recuos, 0.5) * quadra} acende={prog(t, c.l_luz - 0.2, 0.5) * 0.25} />
      <Bloco pos={[0, 3.2, -1.8]} tam={[1.4, 1.2, 0.8]} surge={prog(t, c.l_recuos + 0.3, 0.5) * quadra} acende={prog(t, c.l_luz - 0.2, 0.5) * 0.25} />
      <ConeLuz pos={[0, 0, 1.8]} alt={6} raio={3.4} p={sol * quadra * 0.8} verde={prog(t, c.l_luz, 0.6) * (1 - prog(t, c.v_luz - 0.3, 0.5))} />
      {/* a casa à venda e o terreno vizinho */}
      <Casa pos={VENDA} escala={0.95} surge={s(c.a_vista - 0.7, 0.3) * fimCena} acende={Math.max(prog(t, c.a_vista - 0.1, 0.4) * 0.35, fim * 0.5)} />
      <Bloco pos={LOTE} tam={[1.8, 0.03, 1.8]} surge={s(c.a_vista - 0.6, 0.3) * fimCena} />
      <Predio pos={add(LOTE, [0, 0, 0])} andares={6} escala={0.55} surge={prog(t, c.a_construir - 0.2, 0.8) * fimCena} acende={fim * 0.4} />
      <Boneco pos={COR} rot={0.5} gravata surge={s(c.a_vista - 0.6, 0.3) * fimCena} pose={t > c.a_confira - 0.3 && t < c.f_subir ? "aponta" : "pe"} acende={fim * 0.4} />
      <Boneco pos={CLI} rot={-0.5} surge={s(c.a_vista - 0.5, 0.3) * fimCena} acende={fim * 0.4} />
      <ConeLuz pos={[10.0, 0, 0.6]} alt={6} raio={2.6} p={prog(t, c.a_vista - 0.6, 0.6) * fimCena * 0.75} verde={fim} />
      <ModulosSistema t={t} tl={tl} segPergunta="s7" segComente="s7" base={CTA_BASE} />
      <ConeLuz pos={CTA_BASE} alt={6.5} raio={2.6} p={prog(t, c.cta_quer + 0.3, 0.8)} verde={prog(t, c.cta_comment, 0.6)} />
    </>
  );
};

export const holofote = (t: number, c: Record<string, number>, tl: Timeline) => {
  if (t >= c.cta_quer) return { pos: [CTA_BASE[0] + 0.4, 7.5, CTA_BASE[2] + 2.4] as V3, alvo: CTA_BASE, intensidade: prog(t, c.cta_quer + 0.3, 0.8) };
  if (t >= c.a_vista - 0.6) return { pos: [10, 8, 4] as V3, alvo: VENDA, intensidade: 0.6 };
  return { pos: [0, 8, 5] as V3, alvo: [0, 0.6, 1.0] as V3, intensidade: 0.6 * prog(t, 0.2, 0.6) };
};

export const placas = (t: number, c: Record<string, number>, tl: Timeline): PlacaDef[] => {
  const ate = (de: number, fim: number) => prog(t, de, 0.35) * (1 - prog(t, fim, 0.3));
  return [
    { id: "ano", pos: [-2.6, 2.0, 1.6], texto: "NOVA YORK · 1915", tom: "neutra", p: ate(c.h_1915 - 0.1, c.p_paredao - 0.2) },
    { id: "sombra", pos: [2.6, 2.0, 1.6], texto: "A SOMBRA SOBRE A QUADRA", tom: "alerta", p: ate(c.h_sombra - 0.1, c.p_quarenta - 0.2) },
    { id: "quarenta", pos: [-2.6, 2.0, 1.6], texto: "QUASE 40 ANDARES, SEM RECUO", tom: "alerta", p: ate(c.p_quarenta - 0.1, c.l_zoneamento - 0.2) },
    { id: "lei", pos: [-2.6, 2.0, 1.6], texto: "1916 · LEI DE ZONEAMENTO", tom: "acento", p: ate(c.l_zoneamento - 0.1, c.v_luz - 0.2) },
    { id: "recuos", pos: [2.6, 2.0, 1.6], texto: "RECUOS PARA A LUZ", tom: "acento", p: ate(c.l_recuos - 0.1, c.v_luz - 0.2) },
    { id: "comprado", pos: [-2.6, 2.0, 1.6], texto: "OS VIZINHOS COMPRARAM LUZ", tom: "neutra", p: ate(c.v_luz - 0.1, c.a_vista - 0.8) },
    { id: "perderam", pos: [2.6, 2.0, 1.6], texto: "E PERDERAM PELO VIZINHO", tom: "alerta", p: ate(c.v_perderam - 0.1, c.a_vista - 0.8) },
    { id: "vista", pos: add(VENDA, [0, 2.2, 0]), texto: "A VISTA, O SOL", tom: "neutra", p: ate(c.a_vista - 0.1, c.a_construir - 0.1) },
    { id: "confira", pos: add(COR, [0, 2.1, 0]), texto: "CONFIRA O ZONEAMENTO", tom: "acento", p: ate(c.a_confira - 0.1, c.f_subir - 0.2) },
    { id: "lote", pos: add(LOTE, [0, 2.6, 0]), texto: "O QUE PODE SUBIR AQUI?", tom: "alerta", p: ate(c.a_construir - 0.1, c.f_subir - 0.2) },
    { id: "parte", pos: add(VENDA, [0.8, 2.6, 0]), texto: "TAMBÉM FAZ PARTE DO IMÓVEL", tom: "acento", p: ate(c.f_subir - 0.1, c.cta_quer + 0.2) },
  ];
};
