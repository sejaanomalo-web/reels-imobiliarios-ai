import React from "react";
import type { Timeline } from "../../types";
import { A } from "../../NOV26/kit";
import type { AtmosferaNome } from "../../../theme";
import {
  Bloco, Boneco, Casa, ConeLuz, Haste, ModulosSistema, Poeira, Tanque,
  camAt, ease, prog, sp, type Cam, type Capitulo, type PlacaDef, type V3,
} from "../../../estilos/maquete";

/**
 * ATIVO-D1206-08 — "A casa que vence" (grade 06/12/2026 · 08h · E SE…? · Maquete 3D).
 * Um só mundo: a casa e o carro com o "tanque de valor" que esvazia → no Japão a casa escurece e afunda (idade média na
 * demolição ~32 anos), a dos EUA dura mais que o dobro → a casa de madeira se deprecia no imposto, o lote acende (o terreno
 * segura o valor) → aqui: a casa brasileira, a pergunta dos 10 anos → localização, terreno, estrutura e manutenção acendem;
 * o acabamento envelhece e o endereço (haste) fica verde → fecho SISTEMA.
 * Apuração: MLIT via Japan Times/HousingJapan (32,1 anos na demolição; EUA 66,6); vida útil fiscal da casa de madeira 22 anos.
 */
const G: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: A.hex }}>{children}</span>;
const CASA_J: V3 = [0, 0, 0];
const TQ_J: V3 = [1.7, 0, 0.3];
const CARRO: V3 = [-2.3, 0, 0.7];
const TQ_C: V3 = [-3.6, 0, 0.3];
const EUA: V3 = [4.4, 0, -0.6];
const BR: V3 = [12, 0, 3];
const CTA_BASE: V3 = [22, 0, -9];
const ini = (tl: Timeline, id: string) => tl.scenes.find((s) => s.id === id)?.start ?? 0;
const add = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

export const capitulos = (c: Record<string, number>, tl: Timeline): (Capitulo & { atm: AtmosferaNome })[] => [
  { de: 0, atm: "dilema", chip: "E SE…?", titulo: <>A casa como um <G>carro</G></> },
  { de: c.j_japao - 0.1, atm: "dados", chip: "JAPÃO", titulo: <>Demolida aos <G>~32 anos</G></> },
  { de: ini(tl, "terreno") + 0.1, atm: "dados", chip: "NO IMPOSTO DE LÁ", titulo: <>O <G>terreno</G> segura o valor</> },
  { de: ini(tl, "virada") + 0.1, atm: "explicacao", chip: "AQUI", titulo: <>E daqui a <G>10 anos?</G></> },
  { de: ini(tl, "acao") + 0.1, atm: "neutra", chip: "O QUE SEGURA O PREÇO", titulo: <>Mostre o que <G>fica</G></> },
  { de: ini(tl, "desfecho") + 0.1, atm: "explicacao", chip: "A LIÇÃO", titulo: <>O <G>endereço</G> não envelhece</> },
  { de: c.cta_quer - 0.1, atm: "explicacao", chip: "SEU SISTEMA", titulo: <>Um sistema <G>personalizado</G></> },
  { de: c.cta_comment - 0.3, atm: "solucao", chip: "SEU SISTEMA" },
];

const deriva = (t: number, c: Record<string, number>, cam: Cam): Cam => {
  const k = 1 - prog(t, c.cta_quer - 0.3, 0.8);
  return { ...cam, pos: [cam.pos[0] + k * 0.55 * Math.sin(t * 0.45), cam.pos[1] + k * 0.2 * Math.sin(t * 0.33 + 1), cam.pos[2] - k * 0.5 * Math.sin(t * 0.29 + 0.5)] };
};
export const camera = (t: number, c: Record<string, number>, tl: Timeline): Cam => deriva(t, c, camAt(t, [
  { t: 0, pos: [-0.9, 8.6, 16.8], alvo: [-0.9, 0.6, 0.2], fov: 40 },
  { t: c.h_carro, pos: [-0.9, 8.2, 16.0], alvo: [-0.9, 0.6, 0.2], fov: 40, e: ease.inOut },
  { t: c.j_japao + 0.2, pos: [0.6, 7.6, 14.6], alvo: [0.6, 0.6, 0], fov: 40, e: ease.inOut },
  { t: c.j_dobro - 0.3, pos: [0.9, 7.6, 14.8], alvo: [0.9, 0.6, 0], fov: 40 },
  { t: c.j_dobro + 0.6, pos: [2.2, 8.4, 16.4], alvo: [2.2, 0.6, -0.2], fov: 40, e: ease.inOut },
  { t: c.t_madeira, pos: [0.7, 7.4, 14.2], alvo: [0.7, 0.5, 0], fov: 40, e: ease.inOut },
  { t: c.t_terreno - 0.3, pos: [0.8, 7.6, 14.4], alvo: [0.8, 0.5, 0], fov: 40 },
  { t: c.t_terreno + 0.5, pos: [0.6, 9.4, 14.6], alvo: [0.5, 0, 0], fov: 40, e: ease.inOut },
  { t: ini(tl, "virada") + 0.2, pos: [0.8, 9.4, 14.8], alvo: [0.6, 0, 0], fov: 40 },
  { t: c.v_diferente + 0.7, pos: [BR[0], 8.6, BR[2] + 15.6], alvo: [BR[0], 0.7, BR[2]], fov: 40, e: ease.inOut },
  { t: c.a_localizacao - 0.4, pos: [BR[0], 8.2, BR[2] + 15.0], alvo: [BR[0], 0.7, BR[2]], fov: 40, e: ease.inOut },
  { t: c.f_endereco, pos: [BR[0] + 0.3, 7.6, BR[2] + 14.0], alvo: [BR[0], 0.8, BR[2]], fov: 40, e: ease.inOut },
  { t: c.cta_quer - 0.3, pos: [BR[0] + 0.35, 7.6, BR[2] + 14.0], alvo: [BR[0], 0.8, BR[2]], fov: 40 },
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

const Carro: React.FC<{ pos: V3; surge: number }> = ({ pos, surge }) => (
  <>
    <Bloco pos={add(pos, [0, 0.26, 0])} tam={[1.3, 0.36, 0.62]} surge={surge} mat="grafite" />
    <Bloco pos={add(pos, [-0.1, 0.58, 0])} tam={[0.72, 0.3, 0.56]} surge={surge} />
  </>
);

export const Maquete3D: React.FC<{ t: number; tl: Timeline }> = ({ t, tl }) => {
  const c = tl.cues;
  const s = (at: number, d = 0.35) => sp(t, at - d, { damping: 12, stiffness: 170 });
  const fimCena = 1 - prog(t, c.cta_quer + 0.4, 0.5);
  const zonaA = 1 - prog(t, c.v_diferente + 1.2, 0.5);
  // valor: cai junto com o carro no gancho; no imposto de lá vai a quase zero
  const nivelJ = lerp(lerp(1, 0.5, prog(t, c.h_carro - 0.1, 0.9)), 0.08, prog(t, c.t_22 - 0.1, 0.9));
  const nivelC = lerp(1, 0.3, prog(t, c.h_carro - 0.1, 0.9));
  const demolida = prog(t, c.j_32 + 0.5, 0.6);
  const madeira = s(c.t_madeira - 0.1, 0.3);
  const lote = prog(t, c.t_terreno - 0.15, 0.4);
  const loc = prog(t, c.a_localizacao - 0.15, 0.4), ter = prog(t, c.a_terreno - 0.15, 0.4), est = prog(t, c.a_estrutura - 0.15, 0.4), man = prog(t, c.a_manutencao - 0.15, 0.4);
  const env = prog(t, c.f_envelhece - 0.1, 0.5);
  const end = prog(t, c.f_endereco - 0.15, 0.4);
  return (
    <>
      <Poeira t={t} centro={[0, 2, 0]} n={26} />
      {/* zona A — o gancho e o Japão */}
      <Bloco pos={add(CASA_J, [0, 0.03, 0])} tam={[2.6, 0.06, 2.2]} surge={s(c.h_casa - 0.3, 0.2) * zonaA} mat="grafite" acende={lote * 0.3} />
      <Casa pos={CASA_J} escala={1.15} surge={s(c.h_casa, 0.3) * (1 - demolida) * zonaA} mat={t > c.j_demolida ? "grafite" : "argila"} />
      <Casa pos={CASA_J} escala={1.0} surge={madeira * (1 - prog(t, c.t_terreno - 0.2, 0.5)) * zonaA} mat="argila" />
      <Tanque pos={TQ_J} raio={0.34} alt={1.5} nivel={nivelJ} surge={s(c.h_casa + 0.2, 0.3) * zonaA} alerta={prog(t, c.t_22, 0.5)} />
      <Carro pos={CARRO} surge={s(c.h_carro, 0.3) * (1 - prog(t, c.j_japao, 0.4))} />
      <Tanque pos={TQ_C} raio={0.3} alt={1.3} nivel={nivelC} surge={s(c.h_carro + 0.1, 0.3) * (1 - prog(t, c.j_japao, 0.4))} alerta={prog(t, c.h_carro + 0.3, 0.6)} />
      <Bloco pos={add(EUA, [0, 0.03, 0])} tam={[2.0, 0.06, 1.8]} surge={s(c.j_dobro, 0.3) * (1 - prog(t, c.t_madeira - 0.3, 0.4))} mat="grafite" />
      <Casa pos={EUA} escala={1.0} surge={s(c.j_dobro + 0.05, 0.3) * (1 - prog(t, c.t_madeira - 0.3, 0.4))} />
      {/* zona B — aqui */}
      <Bloco pos={add(BR, [0, 0.03, 0])} tam={[3.0, 0.06, 2.4]} surge={s(c.v_diferente + 0.4, 0.3) * fimCena} mat="grafite" acende={ter * 0.3} />
      <Casa pos={BR} escala={1.2} surge={s(c.v_diferente + 0.5, 0.3) * fimCena} acende={est * 0.12 * (1 - env * 0.5)} />
      {[[-2.6, 0, 1.6], [2.6, 0, 1.6], [-2.4, 0, -1.8], [2.4, 0, -1.6]].map((d, i) => (
        <Haste key={i} pos={add(BR, d as V3)} alt={i < 2 ? 1.5 : 1.4} surge={s([c.a_localizacao, c.a_terreno, c.a_estrutura, c.a_manutencao][i], 0.25) * fimCena} />
      ))}
      <Boneco pos={add(BR, [1.8, 0, 2.2])} rot={-0.6} gravata surge={s(c.a_localizacao - 0.4, 0.3) * fimCena} pose={t > c.a_localizacao && t < c.f_endereco ? "aponta" : "pe"} acende={end * 0.5} />
      <Haste pos={add(BR, [0, 0, 1.3])} alt={1.1} surge={s(c.f_endereco, 0.25) * fimCena} />
      <ConeLuz pos={BR} alt={6} raio={1.9} p={Math.max(loc, man) * fimCena * 0.8} verde={end} />
      <ModulosSistema t={t} tl={tl} segPergunta="s7" segComente="s7" base={CTA_BASE} />
      <ConeLuz pos={CTA_BASE} alt={6.5} raio={2.6} p={prog(t, c.cta_quer + 0.3, 0.8)} verde={prog(t, c.cta_comment, 0.6)} />
    </>
  );
};

export const holofote = (t: number, c: Record<string, number>, tl: Timeline) => {
  if (t >= c.cta_quer) return { pos: [CTA_BASE[0] + 0.4, 7.5, CTA_BASE[2] + 2.4] as V3, alvo: CTA_BASE, intensidade: prog(t, c.cta_quer + 0.3, 0.8) };
  if (t >= ini(tl, "virada") + 0.4) return { pos: [BR[0], 7.5, BR[2] + 3] as V3, alvo: BR, intensidade: 0.6 * prog(t, ini(tl, "virada") + 0.4, 0.6) };
  return { pos: [0, 8, 4] as V3, alvo: [0, 0, 0] as V3, intensidade: 0.55 * prog(t, 0.2, 0.6) };
};

export const placas = (t: number, c: Record<string, number>, tl: Timeline): PlacaDef[] => {
  const ate = (de: number, fim: number) => prog(t, de, 0.35) * (1 - prog(t, fim, 0.3));
  const virada = ini(tl, "virada");
  return [
    { id: "valor", pos: add(TQ_J, [0, 2.1, 0]), texto: "VALOR", p: ate(c.h_casa + 0.3, c.j_japao) },
    { id: "carro", pos: add(TQ_C, [0, 1.9, 0]), texto: "CARRO: PERDE VALOR", tom: "alerta", p: ate(c.h_carro - 0.1, c.j_japao) },
    { id: "japao", pos: add(CASA_J, [0, 2.4, 0]), texto: "JAPÃO", p: ate(c.j_japao - 0.1, c.j_32 - 0.2) },
    { id: "32", pos: add(CASA_J, [0, 2.4, 0]), texto: "DEMOLIDA AOS ~32 ANOS (MÉDIA)", tom: "alerta", p: ate(c.j_32 - 0.15, c.j_dobro - 0.25) },
    { id: "eua", pos: add(EUA, [0, 2.1, 0]), texto: "EUA: MAIS QUE O DOBRO", p: ate(c.j_dobro - 0.1, c.t_madeira - 0.3) },
    { id: "madeira", pos: add(CASA_J, [0, 2.3, 0]), texto: "CASA DE MADEIRA", p: ate(c.t_madeira - 0.1, c.t_22 - 0.2) },
    { id: "22", pos: add(TQ_J, [0, 2.1, 0]), texto: "22 ANOS NO IMPOSTO", tom: "alerta", p: ate(c.t_22 - 0.15, c.t_terreno - 0.2) },
    { id: "terreno", pos: add(CASA_J, [0, 1.0, 0.9]), texto: "O TERRENO SEGURA O VALOR", tom: "acento", p: ate(c.t_terreno - 0.1, virada + 0.6) },
    { id: "aqui", pos: add(BR, [0, 2.6, 0]), texto: "AQUI É DIFERENTE", p: ate(c.v_diferente + 0.6, c.v_valer - 0.2) },
    { id: "10", pos: add(BR, [0, 2.6, 0]), texto: "O QUE AINDA VAI VALER EM 10 ANOS?", tom: "acento", p: ate(c.v_valer - 0.15, ini(tl, "acao") + 0.6) },
    { id: "loc", pos: add(BR, [-2.6, 1.8, 1.6]), texto: "LOCALIZAÇÃO", tom: "acento", p: ate(c.a_localizacao - 0.1, c.cta_quer) },
    { id: "ter", pos: add(BR, [2.6, 1.8, 1.6]), texto: "TERRENO", tom: "acento", p: ate(c.a_terreno - 0.1, c.cta_quer) },
    { id: "est", pos: add(BR, [-2.4, 1.6, -1.8]), texto: "ESTRUTURA", tom: "acento", p: ate(c.a_estrutura - 0.1, c.cta_quer) },
    { id: "man", pos: add(BR, [2.4, 1.6, -1.6]), texto: "MANUTENÇÃO", tom: "acento", p: ate(c.a_manutencao - 0.1, c.cta_quer) },
    { id: "acab", pos: add(BR, [0, 2.2, 0.4]), texto: t < c.f_envelhece - 0.1 ? "ACABAMENTO NOVO" : "ACABAMENTO ENVELHECE", tom: t < c.f_envelhece - 0.1 ? "neutra" : "alerta", p: ate(c.a_acabamento - 0.1, c.f_endereco - 0.1) },
    { id: "end", pos: add(BR, [0, 1.5, 1.3]), texto: "ENDEREÇO", tom: "acento", p: ate(c.f_endereco - 0.1, c.cta_quer) },
  ];
};
