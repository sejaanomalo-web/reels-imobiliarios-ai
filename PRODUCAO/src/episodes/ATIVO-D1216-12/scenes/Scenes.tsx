import React from "react";
import type { Timeline } from "../../types";
import { A } from "../../NOV26/kit";
import type { AtmosferaNome } from "../../../theme";
import {
  Bloco, Boneco, ConeLuz, Fluxo, ModulosSistema, Poeira,
  camAt, ease, prog, sp, type Cam, type Capitulo, type PlacaDef, type V3,
} from "../../../estilos/maquete";

/**
 * ATIVO-D1216-12 — "Apontar e falar" (grade 16/12/2026 · 12h · FORA DA BOLHA · Maquete 3D).
 * Um só mundo: a plataforma, o trem que chega e o maquinista que aponta para o sinal (um arco de pontos vai do gesto ao
 * sinal, que acende) → 1994: duas pilhas de erros — só olhando × apontando e falando (−85%) → o gesto obriga a atenção a
 * parar → em silêncio, passa → a câmera anda até a mesa da entrega: chave, controle e certidão acendem um a um quando o
 * corretor aponta → o que é dito em voz alta não fica para trás → SISTEMA. RTRI (1994), via fontes secundárias.
 */
const G: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: A.hex }}>{children}</span>;
const SINAL: V3 = [-2.8, 0, -1.3];
const MAQ: V3 = [-1.2, 0, 0.9];
const MESA: V3 = [9.0, 0, 0.2];
const COR: V3 = [7.4, 0, 1.6];
const CLI: V3 = [10.6, 0, 1.6];
const CTA_BASE: V3 = [21, 0, -9];
const ini = (tl: Timeline, id: string) => tl.scenes.find((s) => s.id === id)?.start ?? 0;
const add = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];

export const capitulos = (c: Record<string, number>, tl: Timeline): (Capitulo & { atm: AtmosferaNome })[] => [
  { de: 0, atm: "dilema", chip: "JAPÃO", titulo: <>Apontar <G>e falar</G></> },
  { de: ini(tl, "estudo") + 0.1, atm: "explicacao", chip: "O ESTUDO · 1994", titulo: <>Cerca de <G>85% menos erros</G></> },
  { de: ini(tl, "porque") + 0.1, atm: "explicacao", chip: "O PORQUÊ", titulo: <>A atenção <G>para em cada item</G></> },
  { de: ini(tl, "virada") + 0.1, atm: "tensao", chip: "A VIRADA", titulo: <>Em silêncio, <G>passa</G></> },
  { de: ini(tl, "acao") + 0.1, atm: "explicacao", chip: "NA ENTREGA", titulo: <>Aponte <G>e fale</G></> },
  { de: ini(tl, "desfecho") + 0.1, atm: "explicacao", chip: "A LIÇÃO", titulo: <>Nada fica <G>para trás</G></> },
  { de: c.cta_quer - 0.1, atm: "explicacao", chip: "SEU SISTEMA", titulo: <>Um sistema <G>personalizado</G></> },
  { de: c.cta_comment - 0.3, atm: "solucao", chip: "SEU SISTEMA" },
];

const deriva = (t: number, c: Record<string, number>, cam: Cam): Cam => {
  const k = 1 - prog(t, c.cta_quer - 0.3, 0.8);
  return { ...cam, pos: [cam.pos[0] + k * 0.5 * Math.sin(t * 0.41), cam.pos[1] + k * 0.2 * Math.sin(t * 0.33 + 1), cam.pos[2] - k * 0.45 * Math.sin(t * 0.27 + 0.5)] };
};
export const camera = (t: number, c: Record<string, number>, tl: Timeline): Cam => deriva(t, c, camAt(t, [
  { t: 0, pos: [1.0, 7.0, 17.0], alvo: [0, 1.2, -0.2], fov: 40 },
  { t: c.h_falam, pos: [0.2, 5.8, 14.2], alvo: [-1.2, 1.2, -0.4], fov: 40, e: ease.inOut },
  { t: c.e_1994, pos: [1.6, 7.2, 17.2], alvo: [0.6, 1.0, 0.2], fov: 40, e: ease.inOut },
  { t: c.p_parar, pos: [0.4, 6.4, 15.6], alvo: [-1.0, 1.2, -0.2], fov: 40, e: ease.inOut },
  { t: c.v_passar, pos: [1.2, 7.4, 17.6], alvo: [0, 1.2, 0], fov: 40, e: ease.inOut },
  { t: c.a_chaves + 0.2, pos: [9.2, 6.6, 14.6], alvo: [9.0, 0.9, 0.6], fov: 40, e: ease.inOut },
  { t: c.d_tras, pos: [9.4, 7.0, 15.6], alvo: [9.0, 1.0, 0.6], fov: 40, e: ease.inOut },
  { t: c.cta_quer - 0.3, pos: [9.4, 7.2, 16.0], alvo: [9.0, 1.0, 0.6], fov: 40 },
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
  const plat = 1 - prog(t, c.a_chaves - 1.0, 0.5);
  const trem = 9 * (1 - prog(t, 0.1, 1.8, ease.out));
  const aponta = prog(t, c.h_apontam - 0.2, 0.4);
  const sinal = Math.max(prog(t, c.h_falam - 0.2, 0.4), prog(t, c.p_parar - 0.2, 0.4)) * (1 - prog(t, c.v_silencio - 0.3, 0.4) * (1 - prog(t, c.v_passar + 0.2, 0.4)));
  const estudo = prog(t, c.e_1994 - 0.3, 0.4) * (1 - prog(t, c.p_atencao - 0.4, 0.4));
  const itens: [string, number, V3][] = [["CHAVE", c.a_chaves, [-0.7, 0.62, -0.2]], ["CONTROLE", c.a_aponte, [0, 0.62, -0.2]], ["CERTIDÃO", c.a_documentos, [0.7, 0.62, -0.2]]];
  const fim = prog(t, c.d_voz - 0.2, 0.5);
  return (
    <>
      <Poeira t={t} centro={[4, 2, 0]} n={24} />
      <Bloco pos={[5, 0, 0]} tam={[20, 0.02, 8]} surge={s(0.05, 0.2) * fimCena} mat="grafite" />
      {/* a plataforma, o trilho, o trem e o sinal */}
      <Bloco pos={[0, 0, 1.0]} tam={[8.0, 0.3, 1.8]} surge={s(0.1, 0.3) * plat * fimCena} />
      <Bloco pos={[0, 0, -0.7]} tam={[9.0, 0.05, 0.12]} surge={s(0.15, 0.3) * plat * fimCena} mat="grafite" />
      {[0, 1, 2].map((i) => <Bloco key={i} pos={[trem + 0.6 + i * 2.4, 0.05, -0.7]} tam={[2.2, 0.95, 0.95]} surge={plat * fimCena} />)}
      <Bloco pos={SINAL} tam={[0.12, 1.8, 0.12]} surge={s(0.3, 0.3) * plat * fimCena} mat="grafite" />
      <Bloco pos={add(SINAL, [0, 1.8, 0])} tam={[0.4, 0.4, 0.4]} surge={s(0.35, 0.3) * plat * fimCena} mat={sinal > 0.5 ? "aceso" : "argila"} acende={sinal * 0.7} />
      <Boneco pos={add(MAQ, [0, 0.3, 0])} rot={-0.9} surge={s(0.4, 0.3) * plat * fimCena} pose={aponta > 0.5 && t < c.e_exagero ? "aponta" : t > c.p_atencao - 0.2 && t < c.v_silencio ? "aponta" : "pe"} />
      <Fluxo de={add(MAQ, [-0.3, 1.9, 0])} para={add(SINAL, [0, 2.0, 0])} altura={0.6} p={prog(t, c.h_falam - 0.2, 0.7) * (1 - prog(t, c.e_exagero, 0.4)) + prog(t, c.p_parar - 0.3, 0.6) * (1 - prog(t, c.v_silencio - 0.2, 0.3))} n={12} mat="aceso" anda={t} />
      {/* o estudo: só olhando × apontando e falando */}
      {Array.from({ length: 6 }).map((_, i) => <Bloco key={`a${i}`} pos={[0.4, 0.3 + i * 0.34, 1.4]} tam={[0.5, 0.3, 0.5]} surge={prog(t, c.e_1994 + i * 0.12, 0.3) * estudo * plat} mat="alerta" />)}
      <Bloco pos={[1.7, 0.3, 1.4]} tam={[0.5, 0.3, 0.5]} surge={prog(t, c.e_oitenta - 0.2, 0.3) * estudo * plat} mat="alerta" />
      <ConeLuz pos={[0, 0, 0.6]} alt={6} raio={3.4} p={prog(t, 0.1, 0.5) * plat * fimCena * 0.8} verde={sinal * 0.4} />
      {/* a mesa da entrega */}
      <Bloco pos={MESA} tam={[2.6, 0.6, 1.4]} surge={s(c.a_chaves - 0.8, 0.3) * fimCena} />
      {itens.map(([nome, at, off]) => <Bloco key={nome} pos={add(MESA, off)} tam={[0.42, 0.14, 0.42]} surge={s(c.a_chaves - 0.6, 0.3) * fimCena} mat={t > at - 0.1 ? "aceso" : "argila"} acende={prog(t, at - 0.1, 0.3) * 0.7} />)}
      <Boneco pos={COR} rot={0.6} gravata surge={s(c.a_chaves - 0.6, 0.3) * fimCena} pose={t > c.a_chaves - 0.2 && t < c.d_voz ? "aponta" : fim > 0.5 ? "bracos" : "pe"} acende={fim * 0.4} />
      <Boneco pos={CLI} rot={-0.6} surge={s(c.a_chaves - 0.5, 0.3) * fimCena} acende={fim * 0.4} />
      <ConeLuz pos={add(MESA, [0, 0, 0.6])} alt={6} raio={2.6} p={prog(t, c.a_chaves - 0.7, 0.6) * fimCena * 0.75} verde={fim} />
      <ModulosSistema t={t} tl={tl} segPergunta="s7" segComente="s7" base={CTA_BASE} />
      <ConeLuz pos={CTA_BASE} alt={6.5} raio={2.6} p={prog(t, c.cta_quer + 0.3, 0.8)} verde={prog(t, c.cta_comment, 0.6)} />
    </>
  );
};

export const holofote = (t: number, c: Record<string, number>, tl: Timeline) => {
  if (t >= c.cta_quer) return { pos: [CTA_BASE[0] + 0.4, 7.5, CTA_BASE[2] + 2.4] as V3, alvo: CTA_BASE, intensidade: prog(t, c.cta_quer + 0.3, 0.8) };
  if (t >= c.a_chaves - 0.7) return { pos: [9, 8, 4] as V3, alvo: MESA, intensidade: 0.6 };
  return { pos: [0, 8, 5] as V3, alvo: [0, 0.6, 0.2] as V3, intensidade: 0.6 * prog(t, 0.2, 0.6) };
};

export const placas = (t: number, c: Record<string, number>, tl: Timeline): PlacaDef[] => {
  const ate = (de: number, fim: number) => prog(t, de, 0.35) * (1 - prog(t, fim, 0.3));
  return [
    { id: "aponta", pos: add(MAQ, [0, 2.6, 0]), texto: "APONTA", tom: "neutra", p: ate(c.h_apontam - 0.1, c.e_exagero - 0.3) },
    { id: "fala", pos: add(SINAL, [0, 2.8, 0]), texto: "E FALA EM VOZ ALTA", tom: "acento", p: ate(c.h_falam - 0.1, c.e_exagero - 0.3) },
    { id: "olhando", pos: [0.4, 2.9, 1.4], texto: "SÓ OLHANDO", tom: "alerta", p: ate(c.e_erros - 0.3, c.p_atencao - 0.4) },
    { id: "oitenta", pos: [1.9, 1.3, 1.4], texto: "APONTANDO E FALANDO: −85%", tom: "acento", p: ate(c.e_oitenta - 0.1, c.p_atencao - 0.4) },
    { id: "atencao", pos: add(SINAL, [0.6, 2.9, 0.6]), texto: "A ATENÇÃO PARA", tom: "acento", p: ate(c.p_atencao - 0.1, c.v_silencio - 0.2) },
    { id: "silencio", pos: [2.4, 2.4, 1.0], texto: "EM SILÊNCIO, PASSA", tom: "alerta", p: ate(c.v_silencio - 0.1, c.a_chaves - 1.0) },
    { id: "chave", pos: add(MESA, [-1.1, 1.6, 0]), texto: "CHAVE", tom: "acento", p: ate(c.a_chaves - 0.1, c.d_voz - 0.2) },
    { id: "certidao", pos: add(MESA, [1.1, 1.6, 0]), texto: "CERTIDÃO", tom: "acento", p: ate(c.a_documentos - 0.1, c.d_voz - 0.2) },
    { id: "controle", pos: add(MESA, [0, 2.3, 0]), texto: "CONTROLE", tom: "acento", p: ate(c.a_aponte - 0.1, c.d_voz - 0.2) },
    { id: "tras", pos: add(MESA, [0, 2.4, 0]), texto: "NADA FICA PARA TRÁS", tom: "acento", p: ate(c.d_voz - 0.1, c.cta_quer + 0.2) },
  ];
};
