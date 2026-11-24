import React from "react";
import { C } from "../../../theme";
import type { Timeline } from "../../types";
import { A } from "../../NOV26/kit";
import type { AtmosferaNome } from "../../../theme";
import {
  Bloco, Boneco, Casa, ConeLuz, Fluxo, ModulosSistema, Poeira,
  camAt, ease, prog, sp, type Cam, type Capitulo, type PlacaDef, type V3,
} from "../../../estilos/maquete";

/**
 * ATIVO-D1202-12 — "O cheiro da visita" (grade 02/12/2026 · 12h · FORA DA BOLHA · Maquete 3D).
 * Um só mundo: a loja de decoração com o difusor (o cheiro vira arco de pontos até o cliente) → o teste: difusor SIMPLES
 * (1 fio) × COMPLEXO (3 fios embolados) → sacolas brotam do lado simples (+20%, 1 estudo) → a câmera anda até a casa da
 * visita: perfume, aromatizador e almoço embolam no ar e disputam a atenção → janelas abertas, os fios somem, a casa acende
 * → fecho SISTEMA. Apuração: Herrmann et al., Journal of Retailing (WSU, 2012) — 1 estudo, dito na fala.
 */
const G: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: A.hex }}>{children}</span>;
const R: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: C.warn }}>{children}</span>;

const LOJA: V3 = [-3, 0, -1.2];
const DIF: V3 = [-3, 0, 0.4];
const DIF_S: V3 = [-4.4, 0, 0.4];
const DIF_C: V3 = [-1.6, 0, 0.4];
const CLI: V3 = [-1.9, 0, 2.0];
const CLI_S: V3 = [-4.4, 0, 2.1];
const CLI_C: V3 = [-1.6, 0, 2.1];
const CASA: V3 = [5, 0, -0.6];
const VIS: V3 = [5, 0, 2.6];
const CTA_BASE: V3 = [13, 0, -7];
const cima = (p: V3, y: number): V3 => [p[0], y, p[2]];

const ini = (tl: Timeline, id: string) => tl.scenes.find((s) => s.id === id)?.start ?? 0;

export const capitulos = (c: Record<string, number>, tl: Timeline): (Capitulo & { atm: AtmosferaNome })[] => [
  { de: 0, atm: "neutra", chip: "FORA DA BOLHA", titulo: <>O cheiro da <G>loja</G></> },
  { de: ini(tl, "teste") + 0.1, atm: "dados", chip: "O TESTE", titulo: <>Simples × complexo</> },
  { de: ini(tl, "resultado") + 0.1, atm: "explicacao", chip: "O RESULTADO", titulo: <><G>+20%</G> com o simples</>, selo: "1 ESTUDO" },
  { de: ini(tl, "virada") + 0.1, atm: "tensao", chip: "NA SUA VISITA", titulo: <>Cheiro que <R>disputa</R></> },
  { de: c.d_antes - 0.1, atm: "explicacao", chip: "ANTES DA VISITA", titulo: <>Janelas <G>abertas</G></> },
  { de: ini(tl, "desfecho") + 0.1, atm: "neutra", chip: "PARA O CORRETOR", titulo: <>O cheiro que <G>ninguém comenta</G></> },
  { de: c.cta_quer - 0.1, atm: "explicacao", chip: "SEU SISTEMA", titulo: <>Um sistema <G>personalizado</G></> },
  { de: c.cta_comment - 0.3, atm: "solucao", chip: "SEU SISTEMA" },
];

export const camera = (t: number, c: Record<string, number>, tl: Timeline): Cam => camAt(t, [
  { t: 0, pos: [-2.8, 5.8, 12.8], alvo: [-2.6, 0.9, 0.2], fov: 38 },
  { t: c.h_vitrine, pos: [-2.6, 5.2, 11.4], alvo: [-2.5, 0.9, 0.6], fov: 38, e: ease.inOut },
  { t: c.t_dois + 0.3, pos: [-3.0, 6.4, 14.2], alvo: [-3, 0.8, 0.6], fov: 42, e: ease.inOut },
  { t: c.t_cha + 0.3, pos: [-2.9, 6.2, 13.8], alvo: [-3, 0.8, 0.8], fov: 42 },
  { t: c.r_20, pos: [-3.9, 5.6, 11.8], alvo: [-4.1, 0.9, 1.0], fov: 40, e: ease.inOut },
  { t: c.r_esforco, pos: [-3.0, 6.4, 14.2], alvo: [-3, 0.8, 0.6], fov: 42, e: ease.inOut },
  // a câmera anda até a casa da visita
  { t: c.v_visita + 0.3, pos: [5.0, 6.6, 15.4], alvo: [5, 1.9, 0.2], fov: 40, e: ease.inOut },
  { t: c.d_disputa, pos: [5.2, 6.0, 13.8], alvo: [5, 1.9, 0.6], fov: 40, e: ease.inOut },
  { t: c.d_janelas, pos: [5.0, 6.4, 14.8], alvo: [5, 1.9, 0.4], fov: 40, e: ease.inOut },
  { t: c.f_melhor, pos: [5.0, 6.8, 15.6], alvo: [5, 2.0, 0.2], fov: 42, e: ease.inOut },
  { t: c.cta_quer - 0.3, pos: [5.1, 6.9, 15.8], alvo: [5, 2.0, 0.2], fov: 42 },
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
  const teste = prog(t, c.t_dois - 0.2, 0.4);
  const fimLoja = 1 - prog(t, c.v_visita + 1.2, 0.6);
  const limpa = 1 - prog(t, c.d_janelas - 0.1, 0.6);
  const prateleiras = [-1.6, -0.5, 0.6, 1.7];
  return (
    <>
      <Poeira t={t} centro={[1, 1.6, -1]} n={36} />
      {/* a loja de decoração */}
      <Bloco pos={LOJA} tam={[4.6, 1.5, 0.5]} mat="grafite" surge={sp(t, 0, { damping: 12, stiffness: 150 }) * fimCena} />
      {prateleiras.map((dx, i) => <Bloco key={i} pos={[LOJA[0] + dx, 1.5, LOJA[2]]} tam={[0.6, 0.35 + 0.1 * (i % 2), 0.4]} surge={s(0.15 + i * 0.08, 0.1) * fimCena} />)}
      {/* um difusor no gancho; dois no teste */}
      <Bloco pos={DIF} tam={[0.32, 0.75, 0.32]} surge={sp(t, c.h_cheiro - 0.4, { damping: 12, stiffness: 170 }) * (1 - teste)} />
      <Boneco pos={CLI} rot={0.2} surge={sp(t, 0.2, { damping: 12, stiffness: 150 }) * (1 - teste)} />
      <Fluxo de={cima(DIF, 0.85)} para={cima(CLI, 1.7)} altura={0.8} p={prog(t, c.h_cheiro - 0.1, 0.8) * (1 - teste)} anda={t * 0.5} n={12} />
      <Bloco pos={DIF_S} tam={[0.32, 0.75, 0.32]} surge={s(c.t_dois, 0.25) * fimLoja} />
      <Bloco pos={DIF_C} tam={[0.32, 0.75, 0.32]} surge={s(c.t_dois + 0.15, 0.25) * fimLoja} />
      <Boneco pos={CLI_S} rot={0.25} surge={s(c.t_dois + 0.1, 0.25) * fimLoja} />
      <Boneco pos={CLI_C} rot={-0.25} surge={s(c.t_dois + 0.25, 0.25) * fimLoja} />
      <Fluxo de={cima(DIF_S, 0.85)} para={cima(CLI_S, 1.7)} altura={0.8} p={prog(t, c.t_simples - 0.1, 0.7) * fimLoja} anda={t * 0.5} n={12} />
      {[0.4, 1.1, 1.8].map((h, i) => (
        <Fluxo key={i} de={[DIF_C[0] + (i - 1) * 0.12, 0.85, DIF_C[2]]} para={[CLI_C[0] + (1 - i) * 0.25, 1.7, CLI_C[2]]} altura={h}
          p={prog(t, [c.t_complexo, c.t_manjericao, c.t_cha][i] - 0.1, 0.7) * fimLoja} anda={t * (0.4 + i * 0.25)} n={12} mat={i === 1 ? "grafite" : "argila"} />
      ))}
      {/* sacolas do lado simples */}
      {[[-5.0, 2.5], [-4.6, 2.75], [-3.9, 2.5]].map(([x, z], i) => (
        <Bloco key={i} pos={[x, 0, z]} tam={[0.34, 0.42, 0.2]} surge={s(c.r_20 + i * 0.15, 0.2) * fimLoja} acende={prog(t, c.r_mais - 0.1, 0.4) * (1 - prog(t, c.r_estudo, 0.4))} />
      ))}
      {/* a casa da visita */}
      <Casa pos={CASA} escala={1.9} surge={s(c.v_agora + 0.2, 0.3) * fimCena} />
      {[[3.4, 0.4, 1.4, c.v_perfume, "argila"], [5.0, 0.4, 2.0, c.v_aromatizador, "grafite"], [6.6, 0.4, 1.4, c.v_almoco, "argila"]].map(([x, y, z, at, mat], i) => (
        <Fluxo key={i} de={[x as number, y as number, z as number]} para={[5 + (i - 1) * 0.3, 1.9, 0.9]} altura={0.9 + i * 0.4}
          p={prog(t, (at as number) - 0.1, 0.7) * limpa} anda={t * (0.5 + i * 0.3)} n={14} mat={mat as "argila" | "grafite"} />
      ))}
      <Boneco pos={VIS} rot={Math.PI} surge={s(c.d_disputa, 0.3) * fimCena} />
      <ConeLuz pos={[CASA[0], 0, CASA[2] + 0.6]} alt={6.5} raio={2.2} p={prog(t, c.d_janelas - 0.2, 0.6) * fimCena} verde={prog(t, c.f_ninguem - 0.1, 0.5)} />
      <ModulosSistema t={t} tl={tl} segPergunta="s10" segComente="s10" base={CTA_BASE} />
      <ConeLuz pos={CTA_BASE} alt={6.5} raio={2.6} p={prog(t, c.cta_quer + 0.3, 0.8)} verde={prog(t, c.cta_comment, 0.6)} />
    </>
  );
};

export const holofote = (t: number, c: Record<string, number>, tl: Timeline) => {
  if (t >= c.cta_quer) return { pos: [CTA_BASE[0] + 0.4, 7.5, CTA_BASE[2] + 2.4] as V3, alvo: CTA_BASE, intensidade: prog(t, c.cta_quer + 0.3, 0.8) };
  if (t >= c.v_visita) return { pos: [5.2, 7.5, 4.0] as V3, alvo: [5, 0, 0.4] as V3, intensidade: 0.65 * prog(t, c.v_visita, 0.6) };
  return { pos: [-3, 7.5, 3.6] as V3, alvo: [-3, 0, 1.2] as V3, intensidade: 0.55 * prog(t, 0.2, 0.6) * (1 - prog(t, c.v_agora, 0.5)) };
};

export const placas = (t: number, c: Record<string, number>, tl: Timeline): PlacaDef[] => {
  const ate = (de: number, fim: number) => prog(t, de, 0.35) * (1 - prog(t, fim, 0.3));
  return [
    { id: "dif", pos: [DIF[0], 1.3, DIF[2]], texto: "DIFUSOR", p: ate(c.h_cheiro - 0.1, c.t_pesquisadores - 0.1) },
    { id: "suica", pos: [LOJA[0], 0.9, 2.8], texto: "SUÍÇA · LOJA DE DECORAÇÃO", p: ate(c.t_suica - 0.1, c.t_simples - 0.1) },
    { id: "simples", pos: [DIF_S[0], 1.35, DIF_S[2]], texto: "SIMPLES · LARANJA", p: ate(c.t_simples - 0.1, c.r_simples - 0.1) },
    { id: "complexo", pos: [DIF_C[0], 1.35, DIF_C[2]], texto: "COMPLEXO · 3 AROMAS", p: ate(c.t_complexo - 0.1, c.r_simples - 0.1) },
    { id: "vinte", pos: [CLI_S[0], 2.2, CLI_S[2]], texto: "+20% · 1 ESTUDO", tom: "acento", p: ate(c.r_20 - 0.1, c.r_estudo + 0.2) },
    { id: "cerebro", pos: [LOJA[0], 0.9, 2.8], texto: "O SIMPLES PEDE MENOS ESFORÇO", p: ate(c.r_cerebro - 0.1, c.v_agora) },
    { id: "perfume", pos: [3.4, 1.4, 1.4], texto: "PERFUME", p: ate(c.v_perfume - 0.1, c.d_disputa) },
    { id: "aroma", pos: [5.0, 1.0, 2.0], texto: "AROMATIZADOR", p: ate(c.v_aromatizador - 0.1, c.d_disputa) },
    { id: "almoco", pos: [6.6, 1.4, 1.4], texto: "ALMOÇO", p: ate(c.v_almoco - 0.1, c.d_disputa) },
    { id: "disputa", pos: [CASA[0] - 2.0, 2.4, 0.6], texto: "DISPUTA A ATENÇÃO", tom: "alerta", p: ate(c.d_disputa - 0.1, c.d_janelas - 0.1) },
    { id: "janelas", pos: [CASA[0] - 2.0, 2.4, 0.6], texto: "JANELAS ABERTAS · SEM MISTURA", p: ate(c.d_janelas - 0.1, c.f_melhor - 0.1) },
    { id: "limpo", pos: [CASA[0] - 2.0, 2.4, 0.6], texto: "LIMPO E SIMPLES", p: ate(c.f_ninguem - 0.1, c.cta_quer) },
  ];
};
