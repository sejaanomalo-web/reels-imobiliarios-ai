import React from "react";
import type { Timeline } from "../../types";
import { A } from "../../NOV26/kit";
import type { AtmosferaNome } from "../../../theme";
import {
  Bloco, Boneco, Casa, ConeLuz, Fluxo, ModulosSistema, Poeira,
  camAt, ease, prog, sp, type Cam, type Capitulo, type PlacaDef, type V3,
} from "../../../estilos/maquete";

/**
 * ATIVO-D1212-18 — "A casa em cima da cachoeira" (grade 12/12/2026 · 18h · HISTÓRIA QUE ENSINA · Maquete 3D).
 * Um só mundo: o rio de argila com a queda; na margem, a casa "com vista" em fantasma (o pedido) → a casa real brota em
 * balanço sobre a queda → 1935: conta-se que o dono estranhou → viver com a cachoeira, não só olhar → o pedido era a vista,
 * o desejo era a cachoeira → a câmera anda até a mesa do corretor: "3 quartos" → para quê? filhos, escritório, visitas →
 * quem entende o desejo encontra o imóvel → SISTEMA. Apuração: Fallingwater (1935), Britannica / NEH. Sem citação literal.
 */
const G: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: A.hex }}>{children}</span>;
const FANT: V3 = [2.9, 0, 0.4];
const MESA: V3 = [8.2, 0, 0.6];
const COR: V3 = [7.1, 0, 1.7];
const CLI: V3 = [9.3, 0, 1.8];
const QUARTOS: V3[] = [[6.9, 0, -0.9], [8.2, 0, -0.9], [9.5, 0, -0.9]];
const CTA_BASE: V3 = [17, 0, -9];
const ini = (tl: Timeline, id: string) => tl.scenes.find((s) => s.id === id)?.start ?? 0;
const add = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];

export const capitulos = (c: Record<string, number>, tl: Timeline): (Capitulo & { atm: AtmosferaNome })[] => [
  { de: 0, atm: "dilema", chip: "UMA ENCOMENDA", titulo: <>Vista para <G>a cachoeira</G></> },
  { de: ini(tl, "quando") + 0.1, atm: "tensao", chip: "1935 · EUA", titulo: <>Em cima <G>da cachoeira</G></> },
  { de: ini(tl, "porque") + 0.1, atm: "explicacao", chip: "O ARQUITETO", titulo: <>Viver <G>com a cachoeira</G></> },
  { de: ini(tl, "virada") + 0.1, atm: "neutra", chip: "A VIRADA", titulo: <>Pedido ≠ <G>desejo</G></> },
  { de: ini(tl, "acao") + 0.1, atm: "explicacao", chip: "NO ATENDIMENTO", titulo: <>Pergunte <G>para quê</G></> },
  { de: ini(tl, "desfecho") + 0.1, atm: "explicacao", chip: "A LIÇÃO", titulo: <>Entenda <G>o desejo</G></> },
  { de: c.cta_quer - 0.1, atm: "explicacao", chip: "SEU SISTEMA", titulo: <>Um sistema <G>personalizado</G></> },
  { de: c.cta_comment - 0.3, atm: "solucao", chip: "SEU SISTEMA" },
];

const deriva = (t: number, c: Record<string, number>, cam: Cam): Cam => {
  const k = 1 - prog(t, c.cta_quer - 0.3, 0.8);
  return { ...cam, pos: [cam.pos[0] + k * 0.5 * Math.sin(t * 0.41), cam.pos[1] + k * 0.2 * Math.sin(t * 0.33 + 1), cam.pos[2] - k * 0.45 * Math.sin(t * 0.27 + 0.5)] };
};
export const camera = (t: number, c: Record<string, number>, tl: Timeline): Cam => deriva(t, c, camAt(t, [
  { t: 0, pos: [3.4, 6.4, 14.6], alvo: [1.2, 1.0, -0.8], fov: 40 },
  { t: c.h_cima, pos: [3.0, 6.0, 13.6], alvo: [1.0, 1.1, -1.0], fov: 40, e: ease.inOut },
  { t: c.q_dono, pos: [3.8, 6.0, 13.8], alvo: [1.4, 1.0, -0.6], fov: 40, e: ease.inOut },
  { t: c.p_vivessem, pos: [2.0, 5.4, 12.0], alvo: [0.6, 1.2, -1.2], fov: 40, e: ease.inOut },
  { t: c.v_pedido, pos: [3.4, 6.4, 14.4], alvo: [1.3, 1.0, -0.7], fov: 40, e: ease.inOut },
  { t: c.v_desejo + 0.9, pos: [3.2, 6.2, 14.0], alvo: [1.2, 1.0, -0.8], fov: 40, e: ease.inOut },
  { t: c.a_quartos - 0.4, pos: [8.4, 5.6, 11.8], alvo: [8.2, 1.0, -0.1], fov: 40, e: ease.inOut },
  { t: c.a_visitas + 0.4, pos: [8.2, 5.2, 11.2], alvo: [8.2, 1.0, -0.1], fov: 40, e: ease.inOut },
  { t: c.f_descreve, pos: [8.2, 6.0, 12.8], alvo: [8.2, 1.1, -0.2], fov: 40, e: ease.inOut },
  { t: c.cta_quer - 0.3, pos: [8.2, 6.0, 13.0], alvo: [8.2, 1.1, -0.2], fov: 40 },
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
  const casa = s(c.h_cima - 0.2, 0.4) * fimCena;
  const fant = Math.max(prog(t, c.h_vista - 0.2, 0.4) * (1 - prog(t, c.h_cima, 0.5)), prog(t, c.v_pedido - 0.2, 0.4) * (1 - prog(t, c.a_quartos - 0.6, 0.5)) * 0.85);
  const desejo = prog(t, c.v_desejo - 0.15, 0.4);
  const fimDes = prog(t, c.f_desejo - 0.15, 0.5);
  const QA = [c.a_filhos, c.a_escritorio, c.a_visitas];
  return (
    <>
      <Poeira t={t} centro={[3, 2, 0]} n={24} />
      {/* terreno: platô alto atrás, a queda, o poço embaixo */}
      <Bloco pos={[3.5, 0, 0]} tam={[12, 0.02, 8]} surge={s(0.05, 0.2) * fimCena} mat="grafite" />
      <Bloco pos={[0, 0, -3.2]} tam={[4.2, 0.9, 4.4]} surge={s(0.1, 0.25) * fimCena} />
      <Bloco pos={[0, 0.9, -3.0]} tam={[1.4, 0.04, 4.0]} surge={s(0.2, 0.25) * fimCena} mat="grafite" />
      <Bloco pos={[0, 0, -0.99]} tam={[1.4, 0.9, 0.04]} surge={s(0.25, 0.25) * fimCena} mat="grafite" />
      <Bloco pos={[0.2, 0.01, 0.6]} tam={[2.6, 0.03, 3.0]} surge={s(0.3, 0.25) * fimCena} mat="grafite" />
      {[-0.45, 0, 0.45].map((x, i) => <Fluxo key={i} de={[x, 0.95, -1.1]} para={[x, 0.08, -0.3]} altura={0.15} p={s(0.4, 0.3) * fimCena} n={7} anda={t * 1.2 + i * 0.3} />)}
      {/* a casa com vista (o pedido), em fantasma na margem */}
      <Casa pos={FANT} rot={-1.6} escala={0.8} surge={fant * fimCena} mat="grafite" />
      {/* a casa real, em balanço sobre a queda */}
      <Bloco pos={[0.3, 0.92, -1.5]} tam={[2.6, 0.14, 1.7]} surge={casa} acende={Math.max(desejo, fimDes) * 0.5} />
      <Bloco pos={[0.5, 1.06, -2.1]} tam={[1.6, 0.5, 1.0]} surge={casa} acende={Math.max(desejo, fimDes) * 0.3} />
      <Bloco pos={[0.0, 1.56, -1.6]} tam={[2.1, 0.12, 1.4]} surge={s(c.h_cima, 0.35) * fimCena} acende={Math.max(desejo, fimDes) * 0.5} />
      <Bloco pos={[-0.9, 0.9, -2.5]} tam={[0.3, 1.3, 0.3]} surge={s(c.h_cima + 0.1, 0.35) * fimCena} mat="grafite" />
      <Boneco pos={[2.4, 0, 2.0]} rot={-2.4} escala={0.8} surge={s(c.q_dono - 0.2, 0.3) * fimCena * (1 - prog(t, c.a_quartos - 0.8, 0.4))} pose="pe" />
      <Boneco pos={[-2.0, 0, 1.4]} rot={0.6} escala={0.8} surge={s(c.q_1935 - 0.2, 0.3) * fimCena * (1 - prog(t, c.a_quartos - 0.8, 0.4))} pose={t > c.p_vivessem - 0.2 && t < c.v_pedido ? "aponta" : "pe"} acende={desejo * 0.4} />
      <ConeLuz pos={[0.3, 0, -1.4]} alt={6} raio={2.0} p={prog(t, 0.2, 0.6) * (1 - prog(t, c.a_quartos - 0.8, 0.6)) * 0.75} verde={desejo} />
      {/* a mesa do corretor */}
      <Bloco pos={add(MESA, [0, 0.38, 0])} tam={[2.2, 0.08, 0.9]} surge={s(c.a_quartos - 0.9, 0.25) * fimCena} />
      <Boneco pos={COR} rot={0.5} gravata surge={s(c.a_quartos - 0.8, 0.3) * fimCena} pose={t > c.a_pergunte - 0.3 && t < c.f_desejo ? "aponta" : "pe"} acende={fimDes * 0.4} />
      <Boneco pos={CLI} rot={-0.5} surge={s(c.a_quartos - 0.7, 0.3) * fimCena} acende={fimDes * 0.4} />
      {QUARTOS.map((p, i) => <Bloco key={i} pos={p} tam={[1.0, 0.7, 0.9]} surge={s(c.a_quartos - 0.1 + i * 0.1, 0.25) * fimCena} acende={Math.max(prog(t, QA[i] - 0.1, 0.35) * 0.55, fimDes * 0.5)} />)}
      <ConeLuz pos={MESA} alt={6} raio={2.4} p={prog(t, c.a_quartos - 0.6, 0.6) * fimCena * 0.75} verde={fimDes} />
      <ModulosSistema t={t} tl={tl} segPergunta="s7" segComente="s7" base={CTA_BASE} />
      <ConeLuz pos={CTA_BASE} alt={6.5} raio={2.6} p={prog(t, c.cta_quer + 0.3, 0.8)} verde={prog(t, c.cta_comment, 0.6)} />
    </>
  );
};

export const holofote = (t: number, c: Record<string, number>, tl: Timeline) => {
  if (t >= c.cta_quer) return { pos: [CTA_BASE[0] + 0.4, 7.5, CTA_BASE[2] + 2.4] as V3, alvo: CTA_BASE, intensidade: prog(t, c.cta_quer + 0.3, 0.8) };
  if (t >= c.a_quartos - 0.8) return { pos: [8.2, 8, 4] as V3, alvo: MESA, intensidade: 0.6 };
  return { pos: [0.5, 8, 4] as V3, alvo: [0.5, 0.8, -1.2] as V3, intensidade: 0.6 * prog(t, 0.2, 0.6) };
};

export const placas = (t: number, c: Record<string, number>, tl: Timeline): PlacaDef[] => {
  const ate = (de: number, fim: number) => prog(t, de, 0.35) * (1 - prog(t, fim, 0.3));
  return [
    { id: "vista", pos: add(FANT, [0, 2.0, 0]), texto: "O PEDIDO: VISTA PARA A QUEDA", tom: "neutra", p: ate(c.h_vista - 0.1, c.h_cima - 0.1) },
    { id: "cima", pos: [0.3, 2.3, -1.5], texto: "A CASA EM CIMA DELA", tom: "acento", p: ate(c.h_cima - 0.1, c.q_dono - 0.2) },
    { id: "ano", pos: [-2.0, 2.2, 1.4], texto: "1935 · ESTADOS UNIDOS", tom: "neutra", p: ate(c.q_1935 - 0.1, c.q_dono - 0.2) },
    { id: "dono", pos: [2.4, 2.1, 2.0], texto: "CONTA-SE: O DONO ESTRANHOU", tom: "alerta", p: ate(c.q_dono - 0.1, c.p_vivessem - 0.2) },
    { id: "viver", pos: [0.3, 2.3, -1.5], texto: "VIVER COM A CACHOEIRA", tom: "acento", p: ate(c.p_vivessem - 0.1, c.v_pedido - 0.2) },
    { id: "olhar", pos: add(FANT, [0, 1.6, 0]), texto: "NÃO SÓ OLHAR PARA ELA", tom: "neutra", p: ate(c.p_olhassem - 0.1, c.v_pedido - 0.2) },
    { id: "pedido", pos: add(FANT, [0, 2.0, 0]), texto: "O PEDIDO: A VISTA", tom: "alerta", p: ate(c.v_pedido - 0.1, c.a_quartos - 0.8) },
    { id: "desejo", pos: [0.3, 2.3, -1.5], texto: "O DESEJO: A CACHOEIRA", tom: "acento", p: ate(c.v_desejo - 0.1, c.a_quartos - 0.8) },
    { id: "3q", pos: add(CLI, [0, 2.2, 0]), texto: "PEDIU: 3 QUARTOS", tom: "neutra", p: ate(c.a_quartos - 0.1, c.a_pergunte + 0.6) },
    { id: "praque", pos: add(COR, [0, 2.2, 0]), texto: "PARA QUÊ?", tom: "acento", p: ate(c.a_pergunte - 0.1, c.f_desejo - 0.2) },
    { id: "q1", pos: add(QUARTOS[1], [0, 1.5, 0]), texto: "FILHOS?", tom: "acento", p: ate(c.a_filhos - 0.1, c.a_escritorio - 0.1) },
    { id: "q2", pos: add(QUARTOS[1], [0, 1.5, 0]), texto: "ESCRITÓRIO?", tom: "acento", p: ate(c.a_escritorio - 0.1, c.a_visitas - 0.1) },
    { id: "q3", pos: add(QUARTOS[1], [0, 1.5, 0]), texto: "VISITAS?", tom: "acento", p: ate(c.a_visitas - 0.1, c.f_desejo - 0.2) },
    { id: "fim", pos: add(MESA, [0, 1.8, 0]), texto: "O DESEJO ACHA O IMÓVEL", tom: "acento", p: ate(c.f_desejo - 0.1, c.cta_quer + 0.2) },
  ];
};
