import React from "react";
import type { Timeline } from "../../types";
import { A } from "../../NOV26/kit";
import type { AtmosferaNome } from "../../../theme";
import {
  Bloco, Boneco, Casa, ConeLuz, ModulosSistema, Poeira, Predio,
  camAt, ease, prog, sp, type Cam, type Capitulo, type PlacaDef, type V3,
} from "../../../estilos/maquete";

/**
 * ATIVO-D1214-18 — "A cidade que subiu" (grade 14/12/2026 · 18h · HISTÓRIA QUE ENSINA · Maquete 3D).
 * Um só mundo: Chicago, 1861 — o hotel de seis andares sobre o chão encharcado → o hotel sobe sobre os macacos, com os
 * hóspedes (janelas acesas) → o esgoto não tinha para onde escoar: o cano aparece no chão → a rua sobe e cobre o cano; os
 * prédios sobem junto → o que está embaixo da rua muda o valor de cima → a câmera anda até uma rua de hoje: a casa à
 * venda, a água na sarjeta; A RUA ALAGA? / PERGUNTE AOS VIZINHOS / CONSULTE A PREFEITURA → endereço que não alaga.
 * Apuração: Raising of Chicago (1850s–60s), Tremont House (1861). Sem número exato de macacos nem altura exata.
 */
const G: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: A.hex }}>{children}</span>;
const HOTEL: V3 = [0, 0, -0.6];
const VIZ: V3[] = [[-3.0, 0, -0.4], [3.0, 0, -0.4]];
const MAC: [number, number][] = [[-0.9, -0.5], [0.9, -0.5], [-0.9, 0.5], [0.9, 0.5], [0, -0.5], [0, 0.5]];
const VENDA: V3 = [10.0, 0, -0.4];
const VIZ2: V3[] = [[8.2, 0, -0.6], [11.8, 0, -0.6]];
const COR: V3 = [9.0, 0, 1.4];
const CTA_BASE: V3 = [21, 0, -9];
const ini = (tl: Timeline, id: string) => tl.scenes.find((s) => s.id === id)?.start ?? 0;
const add = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];

export const capitulos = (c: Record<string, number>, tl: Timeline): (Capitulo & { atm: AtmosferaNome })[] => [
  { de: 0, atm: "dilema", chip: "CHICAGO · 1861", titulo: <>Um hotel <G>que subiu</G></> },
  { de: ini(tl, "terreno") + 0.1, atm: "tensao", chip: "O TERRENO", titulo: <>Sem para onde <G>escoar</G></> },
  { de: ini(tl, "subir") + 0.1, atm: "explicacao", chip: "A SOLUÇÃO", titulo: <>A rua <G>subiu</G></> },
  { de: ini(tl, "virada") + 0.1, atm: "neutra", chip: "A VIRADA", titulo: <>Embaixo <G>muda o valor</G></> },
  { de: ini(tl, "acao") + 0.1, atm: "explicacao", chip: "NA VENDA", titulo: <>A rua <G>alaga?</G></> },
  { de: ini(tl, "desfecho") + 0.1, atm: "explicacao", chip: "A LIÇÃO", titulo: <>Endereço <G>que não alaga</G></> },
  { de: c.cta_quer - 0.1, atm: "explicacao", chip: "SEU SISTEMA", titulo: <>Um sistema <G>personalizado</G></> },
  { de: c.cta_comment - 0.3, atm: "solucao", chip: "SEU SISTEMA" },
];

const deriva = (t: number, c: Record<string, number>, cam: Cam): Cam => {
  const k = 1 - prog(t, c.cta_quer - 0.3, 0.8);
  return { ...cam, pos: [cam.pos[0] + k * 0.5 * Math.sin(t * 0.41), cam.pos[1] + k * 0.2 * Math.sin(t * 0.33 + 1), cam.pos[2] - k * 0.45 * Math.sin(t * 0.27 + 0.5)] };
};
export const camera = (t: number, c: Record<string, number>, tl: Timeline): Cam => deriva(t, c, camAt(t, [
  { t: 0, pos: [1.5, 8.2, 20.6], alvo: [0, 2.0, 0.0], fov: 40 },
  { t: c.h_subiu, pos: [2.2, 7.6, 19.2], alvo: [0, 2.2, -0.2], fov: 40, e: ease.inOut },
  { t: c.t_chicago, pos: [2.8, 8.6, 21.4], alvo: [0, 1.8, 0.2], fov: 40, e: ease.inOut },
  { t: c.t_esgoto, pos: [3.4, 6.8, 18.0], alvo: [0, 1.2, 1.4], fov: 40, e: ease.inOut },
  { t: c.s_predios, pos: [2.6, 8.6, 21.4], alvo: [0, 2.0, 0.0], fov: 40, e: ease.inOut },
  { t: c.v_valor, pos: [2.0, 9.0, 22.0], alvo: [0, 2.2, 0.0], fov: 40, e: ease.inOut },
  { t: c.a_alaga - 0.6, pos: [10.6, 6.8, 15.6], alvo: [10.0, 1.4, 0.4], fov: 40, e: ease.inOut },
  { t: c.a_prefeitura + 0.4, pos: [11.0, 7.4, 16.6], alvo: [10.2, 1.6, 0.4], fov: 40, e: ease.inOut },
  { t: c.cta_quer - 0.3, pos: [11.0, 7.6, 17.0], alvo: [10.2, 1.6, 0.4], fov: 40 },
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
  const velha = 1 - prog(t, c.a_alaga - 1.2, 0.5);
  const sobe = 0.8 * Math.max(prog(t, c.h_subiu - 0.2, 1.4, ease.inOut), prog(t, c.s_predios - 0.2, 1.2, ease.inOut));
  const rua = prog(t, c.s_ruas - 0.2, 1.0, ease.inOut);
  const cano = prog(t, c.t_esgoto - 0.2, 0.5);
  const agua = prog(t, c.t_encharcado - 0.3, 0.6) * (1 - rua);
  const alaga = prog(t, c.a_alaga - 0.3, 0.8);
  const fim = prog(t, c.d_endereco - 0.15, 0.5);
  return (
    <>
      <Poeira t={t} centro={[4, 2, 0]} n={24} />
      <Bloco pos={[5, 0, 0]} tam={[18, 0.02, 8]} surge={s(0.05, 0.2) * fimCena} mat="grafite" />
      {/* Chicago, 1861 */}
      <Bloco pos={[0, 0.02, 0.9]} tam={[7.6, 0.02, 1.8]} surge={agua > 0.01 ? velha : 0} mat="alerta" />
      <Bloco pos={[0, 0.02, 2.2]} tam={[8.4, 0.12, 0.22]} surge={cano * velha} mat="aceso" acende={0.6 * (1 - rua)} />
      <Bloco pos={[0, 0, 2.2]} tam={[8.6, 0.05 + 0.6 * rua, 1.4]} surge={s(0.3, 0.3) * velha} mat="argila" />
      {MAC.map(([x, z], i) => <Bloco key={i} pos={add(HOTEL, [x, 0, z])} tam={[0.16, sobe + 0.01, 0.16]} surge={sobe > 0.02 ? velha : 0} mat="grafite" />)}
      <Predio pos={add(HOTEL, [0, sobe, 0])} andares={6} escala={0.72} surge={s(0.2, 0.3) * velha} acende={prog(t, c.h_hospedes - 0.2, 0.5) * 0.35 * (1 - prog(t, c.t_chicago, 0.5)) + prog(t, c.v_valor - 0.2, 0.5) * 0.3} />
      {VIZ.map((p, i) => <Casa key={i} pos={add(p, [0, 0.6 * prog(t, c.s_predios - 0.2, 1.2, ease.inOut), 0])} escala={0.85} surge={s(0.35 + i * 0.1, 0.3) * velha} acende={prog(t, c.v_valor - 0.2, 0.5) * 0.25} />)}
      <Boneco pos={[-1.4, 0, 1.2]} rot={0.4} surge={s(c.h_hospedes - 0.2, 0.3) * velha * (1 - prog(t, c.t_chicago, 0.5))} />
      <ConeLuz pos={[0, 0, 0.4]} alt={6} raio={3.2} p={prog(t, 0.1, 0.5) * velha * 0.8} verde={prog(t, c.v_valor - 0.2, 0.6)} />
      {/* uma rua de hoje */}
      <Bloco pos={[10, 0, 1.4]} tam={[6.0, 0.05, 1.3]} surge={s(c.a_alaga - 0.9, 0.3) * fimCena} mat="argila" />
      <Bloco pos={[10, 0.06, 1.95]} tam={[6.0 * alaga * (1 - fim), 0.02, 0.35]} surge={alaga > 0.01 ? fimCena : 0} mat="alerta" />
      <Casa pos={VENDA} escala={0.95} surge={s(c.a_alaga - 0.8, 0.3) * fimCena} acende={Math.max(prog(t, c.a_alaga - 0.1, 0.4) * 0.2, fim * 0.55)} />
      {VIZ2.map((p, i) => <Casa key={i} pos={p} escala={0.8} surge={s(c.a_alaga - 0.7 + i * 0.1, 0.3) * fimCena} acende={prog(t, c.a_vizinhos - 0.1, 0.4) * 0.25 * (1 - fim)} />)}
      {VIZ2.map((p, i) => <Boneco key={i} pos={add(p, [i ? -0.6 : 0.6, 0, 1.2])} rot={i ? -0.5 : 0.5} surge={s(c.a_vizinhos - 0.2 + i * 0.1, 0.3) * fimCena} acende={fim * 0.3} />)}
      <Boneco pos={COR} rot={0.3} gravata surge={s(c.a_alaga - 0.6, 0.3) * fimCena} pose={t > c.a_alaga - 0.2 && t < c.d_endereco ? "aponta" : fim > 0.5 ? "bracos" : "pe"} acende={fim * 0.4} />
      <ConeLuz pos={[10.0, 0, 0.6]} alt={6} raio={2.8} p={prog(t, c.a_alaga - 0.8, 0.6) * fimCena * 0.75} verde={fim} />
      <ModulosSistema t={t} tl={tl} segPergunta="s7" segComente="s7" base={CTA_BASE} />
      <ConeLuz pos={CTA_BASE} alt={6.5} raio={2.6} p={prog(t, c.cta_quer + 0.3, 0.8)} verde={prog(t, c.cta_comment, 0.6)} />
    </>
  );
};

export const holofote = (t: number, c: Record<string, number>, tl: Timeline) => {
  if (t >= c.cta_quer) return { pos: [CTA_BASE[0] + 0.4, 7.5, CTA_BASE[2] + 2.4] as V3, alvo: CTA_BASE, intensidade: prog(t, c.cta_quer + 0.3, 0.8) };
  if (t >= c.a_alaga - 0.8) return { pos: [10, 8, 4] as V3, alvo: VENDA, intensidade: 0.6 };
  return { pos: [0, 8, 5] as V3, alvo: [0, 0.8, 0.0] as V3, intensidade: 0.6 * prog(t, 0.2, 0.6) };
};

export const placas = (t: number, c: Record<string, number>, tl: Timeline): PlacaDef[] => {
  const ate = (de: number, fim: number) => prog(t, de, 0.35) * (1 - prog(t, fim, 0.3));
  return [
    { id: "ano", pos: [-3.3, 2.2, 1.4], texto: "CHICAGO · 1861", tom: "neutra", p: ate(c.h_1861 - 0.1, c.h_hospedes - 0.2) },
    { id: "hospedes", pos: [3.3, 3.2, 1.4], texto: "COM OS HÓSPEDES LÁ DENTRO", tom: "acento", p: ate(c.h_hospedes - 0.1, c.t_chicago - 0.2) },
    { id: "encharcado", pos: [-3.3, 2.2, 1.4], texto: "TERRENO PLANO E ENCHARCADO", tom: "alerta", p: ate(c.t_encharcado - 0.1, c.s_ruas - 0.2) },
    { id: "esgoto", pos: [3.3, 1.4, 2.2], texto: "O ESGOTO SEM SAÍDA", tom: "alerta", p: ate(c.t_esgoto - 0.1, c.s_ruas - 0.2) },
    { id: "ruas", pos: [-3.3, 2.2, 1.4], texto: "A RUA SOBE", tom: "acento", p: ate(c.s_ruas - 0.1, c.v_embaixo - 0.2) },
    { id: "macacos", pos: [3.3, 3.2, 1.4], texto: "E OS PRÉDIOS SOBEM JUNTO", tom: "acento", p: ate(c.s_predios - 0.1, c.v_embaixo - 0.2) },
    { id: "embaixo", pos: [-3.3, 2.2, 1.4], texto: "O QUE ESTÁ EMBAIXO DA RUA", tom: "neutra", p: ate(c.v_embaixo - 0.1, c.a_alaga - 2.2) },
    { id: "valor", pos: [3.3, 3.2, 1.4], texto: "MUDA O VALOR DE CIMA", tom: "acento", p: ate(c.v_valor - 0.1, c.a_alaga - 2.2) },
    { id: "alaga", pos: add(VENDA, [0, 3.0, 0]), texto: "A RUA ALAGA?", tom: "alerta", p: ate(c.a_alaga - 0.1, c.d_endereco - 0.2) },
    { id: "vizinhos", pos: add(VIZ2[0], [-0.6, 1.7, 0.4]), texto: "PERGUNTE AOS VIZINHOS", tom: "neutra", p: ate(c.a_vizinhos - 0.1, c.d_endereco - 0.2) },
    { id: "prefeitura", pos: add(VIZ2[1], [0.6, 2.3, 0.4]), texto: "CONSULTE A PREFEITURA", tom: "neutra", p: ate(c.a_prefeitura - 0.1, c.d_endereco - 0.2) },
    { id: "endereco", pos: add(VENDA, [0, 3.0, 0]), texto: "ENDEREÇO QUE NÃO ALAGA", tom: "acento", p: ate(c.d_endereco - 0.1, c.cta_quer + 0.2) },
  ];
};
