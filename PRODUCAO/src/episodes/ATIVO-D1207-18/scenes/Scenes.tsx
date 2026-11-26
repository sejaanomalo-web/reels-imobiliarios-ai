import React from "react";
import type { Timeline } from "../../types";
import { A } from "../../NOV26/kit";
import type { AtmosferaNome } from "../../../theme";
import {
  Bloco, Boneco, Casa, ConeLuz, Fluxo, ModulosSistema, Poeira, Predio,
  camAt, ease, prog, sp, type Cam, type Capitulo, type PlacaDef, type V3,
} from "../../../estilos/maquete";

/**
 * ATIVO-D1207-18 — "A casa no topo do prédio" (grade 07/12/2026 · 18h · HISTÓRIA QUE ENSINA · Maquete 3D).
 * Um só mundo: a torre sobe andar por andar e uma casa pousa no topo → Martinelli, primeiro arranha-céu de SP → a multidão
 * desconfiada embaixo → 1929: a família sobe para a cobertura (arco de pontos) → no atendimento, as provas acendem (matrícula,
 * laudo, manutenção) → confiança não se pede, se mostra → fecho SISTEMA.
 * Apuração: Prefeitura de SP (Gestão Urbana, Habitação); Gazeta SP (30 andares). Motivação atribuída à prefeitura.
 */
const G: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: A.hex }}>{children}</span>;
const TORRE: V3 = [0, 0, 0];
const ESC = 0.56;
const ANDARES = 13;
const TOPO = ANDARES * 0.55 * ESC;
const BR: V3 = [14, 0, 3];
const PROVA = (j: number): V3 => [BR[0] - 1.4 + j * 1.4, 0, BR[2] - 0.6 - j * 0.5];
const CTA_BASE: V3 = [24, 0, -9];
const ini = (tl: Timeline, id: string) => tl.scenes.find((s) => s.id === id)?.start ?? 0;
const add = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];

export const capitulos = (c: Record<string, number>, tl: Timeline): (Capitulo & { atm: AtmosferaNome })[] => [
  { de: 0, atm: "memoria", chip: "SÃO PAULO", titulo: <>Uma casa no <G>alto do prédio</G></> },
  { de: ini(tl, "martinelli") + 0.1, atm: "memoria", chip: "O MARTINELLI", titulo: <>O primeiro <G>arranha-céu</G></> },
  { de: ini(tl, "medo") + 0.1, atm: "tensao", chip: "A DESCONFIANÇA", titulo: <>Vai <G>parar em pé?</G></> },
  { de: ini(tl, "virada") + 0.1, atm: "memoria", chip: "1929", titulo: <>A família <G>na cobertura</G></> },
  { de: ini(tl, "acao") + 0.1, atm: "neutra", chip: "NO SEU ATENDIMENTO", titulo: <>Prova vale mais que <G>argumento</G></> },
  { de: ini(tl, "desfecho") + 0.1, atm: "explicacao", chip: "A LIÇÃO", titulo: <>Confiança <G>se mostra</G></> },
  { de: c.cta_quer - 0.1, atm: "explicacao", chip: "SEU SISTEMA", titulo: <>Um sistema <G>personalizado</G></> },
  { de: c.cta_comment - 0.3, atm: "solucao", chip: "SEU SISTEMA" },
];

const deriva = (t: number, c: Record<string, number>, cam: Cam): Cam => {
  const k = 1 - prog(t, c.cta_quer - 0.3, 0.8);
  return { ...cam, pos: [cam.pos[0] + k * 0.6 * Math.sin(t * 0.41), cam.pos[1] + k * 0.22 * Math.sin(t * 0.33 + 1), cam.pos[2] - k * 0.5 * Math.sin(t * 0.27 + 0.5)] };
};
export const camera = (t: number, c: Record<string, number>, tl: Timeline): Cam => deriva(t, c, camAt(t, [
  { t: 0, pos: [1.8, 4.2, 14.4], alvo: [0, 3.4, 0], fov: 40 },
  { t: c.h_casa, pos: [1.4, 5.0, 14.6], alvo: [0, 3.6, 0], fov: 40, e: ease.inOut },
  { t: c.m_30, pos: [2.2, 4.6, 15.0], alvo: [0, 3.5, 0], fov: 40, e: ease.inOut },
  { t: c.d_desconfiava, pos: [1.0, 4.2, 15.2], alvo: [0, 3.2, 0.6], fov: 40, e: ease.inOut },
  { t: c.v_familia - 0.4, pos: [1.6, 4.8, 14.6], alvo: [0, 3.6, 0.4], fov: 40, e: ease.inOut },
  { t: c.v_cobertura + 0.4, pos: [1.2, 6.4, 10.4], alvo: [0, TOPO + 1.4, 0], fov: 40, e: ease.inOut },
  { t: ini(tl, "acao") - 0.2, pos: [1.2, 6.4, 10.6], alvo: [0, TOPO + 1.4, 0], fov: 40 },
  { t: c.a_prova + 0.4, pos: [BR[0], 7.8, BR[2] + 13.6], alvo: [BR[0], 1.6, BR[2] - 0.4], fov: 40, e: ease.inOut },
  { t: c.f_mostra, pos: [BR[0] + 0.3, 7.4, BR[2] + 13.0], alvo: [BR[0], 1.5, BR[2] - 0.4], fov: 40, e: ease.inOut },
  { t: c.cta_quer - 0.3, pos: [BR[0] + 0.35, 7.4, BR[2] + 13.0], alvo: [BR[0], 1.5, BR[2] - 0.4], fov: 40 },
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
  const zonaA = 1 - prog(t, ini(tl, "acao") + 0.3, 0.5);
  const sobe = prog(t, 0.1, 2.6, ease.out);
  const medo = prog(t, c.d_desconfiava - 0.3, 0.6) * (1 - prog(t, c.v_familia, 0.8));
  const fam = prog(t, c.v_familia - 0.2, 1.0, ease.inOut);
  const provas = [c.a_matricula, c.a_laudo, c.a_manutencao].map((a) => prog(t, a - 0.15, 0.35));
  const mostra = prog(t, c.f_mostra - 0.15, 0.5);
  return (
    <>
      <Poeira t={t} centro={[0, 3, 0]} n={26} />
      <Bloco pos={add(TORRE, [0, 0.03, 0])} tam={[3.4, 0.06, 2.6]} surge={s(0.1, 0.2) * zonaA} mat="grafite" />
      <Predio pos={TORRE} andares={ANDARES} escala={ESC} surge={sobe * zonaA} acende={fam * 0.15} />
      <Casa pos={add(TORRE, [0, TOPO, 0])} escala={0.5} surge={s(c.h_casa - 0.1, 0.3) * zonaA} acende={fam * 0.35} />
      {/* a multidão desconfiada */}
      {[[-1.4, 1.6], [-0.6, 2.0], [0.3, 2.2], [1.1, 1.8], [1.7, 1.4]].map(([x, z], i) => (
        <Boneco key={i} pos={[x, 0, z]} rot={Math.PI + (i % 2 ? 0.3 : -0.3)} escala={0.55} surge={s(c.d_desconfiava - 0.2 + i * 0.07, 0.2) * zonaA * (1 - prog(t, c.v_cobertura + 0.6, 0.5))} mat={medo > 0.3 ? "grafite" : "argila"} />
      ))}
      {/* a família sobe para a cobertura */}
      <Fluxo de={[1.2, 0.3, 1.2]} para={add(TORRE, [0.3, TOPO + 0.4, 0.3])} altura={1.2} p={fam * zonaA} anda={t} />
      {[0, 1, 2].map((k) => (
        <Boneco key={k} pos={add(TORRE, [-0.35 + k * 0.32, TOPO, 0.55])} escala={0.22} surge={s(c.v_cobertura + k * 0.1, 0.2) * zonaA} acende={0.3} />
      ))}
      {/* o seu atendimento: as provas */}
      {[0, 1, 2].map((j) => (
        <Bloco key={j} pos={add(PROVA(j), [0, 0.5, 0])} tam={[0.7, 1.0, 0.08]} surge={s(c.a_prova + 0.2 + j * 0.1, 0.25) * fimCena} acende={Math.max(provas[j] * 0.45, mostra * 0.3)} />
      ))}
      <Boneco pos={add(BR, [-1.9, 0, 1.6])} rot={0.6} gravata surge={s(c.a_prova, 0.3) * fimCena} pose={t > c.a_matricula - 0.2 && t < c.f_pede ? "aponta" : "pe"} acende={mostra * 0.5} />
      <Boneco pos={add(BR, [1.8, 0, 1.9])} rot={-0.7} surge={s(c.a_prova + 0.2, 0.3) * fimCena} acende={mostra * 0.35} />
      <ConeLuz pos={BR} alt={6} raio={2.6} p={Math.max(provas[0], mostra) * fimCena * 0.8} verde={mostra} />
      <ModulosSistema t={t} tl={tl} segPergunta="s7" segComente="s7" base={CTA_BASE} />
      <ConeLuz pos={CTA_BASE} alt={6.5} raio={2.6} p={prog(t, c.cta_quer + 0.3, 0.8)} verde={prog(t, c.cta_comment, 0.6)} />
    </>
  );
};

export const holofote = (t: number, c: Record<string, number>, tl: Timeline) => {
  if (t >= c.cta_quer) return { pos: [CTA_BASE[0] + 0.4, 7.5, CTA_BASE[2] + 2.4] as V3, alvo: CTA_BASE, intensidade: prog(t, c.cta_quer + 0.3, 0.8) };
  if (t >= c.a_prova) return { pos: [BR[0], 7.5, BR[2] + 3] as V3, alvo: BR, intensidade: 0.6 * prog(t, c.a_prova, 0.6) };
  return { pos: [2, 10, 5] as V3, alvo: [0, 2, 0] as V3, intensidade: 0.55 * prog(t, 0.2, 0.6) };
};

export const placas = (t: number, c: Record<string, number>, tl: Timeline): PlacaDef[] => {
  const ate = (de: number, fim: number) => prog(t, de, 0.35) * (1 - prog(t, fim, 0.3));
  const NOMES = ["MATRÍCULA EM DIA", "LAUDO", "MANUTENÇÃO"];
  const AT = [c.a_matricula, c.a_laudo, c.a_manutencao];
  return [
    { id: "casa", pos: add(TORRE, [0, TOPO + 1.3, 0]), texto: "UMA CASA NO TOPO", tom: "acento", p: ate(c.h_alto - 0.2, c.m_martinelli - 0.2) },
    { id: "mart", pos: add(TORRE, [0, TOPO + 1.3, 0]), texto: "MARTINELLI · SÃO PAULO", p: ate(c.m_martinelli - 0.15, c.m_30 - 0.2) },
    { id: "30", pos: add(TORRE, [0, TOPO + 1.3, 0]), texto: "PRIMEIRO ARRANHA-CÉU · 30 ANDARES", tom: "acento", p: ate(c.m_30 - 0.15, c.d_desconfiava - 0.3) },
    { id: "medo", pos: [0.2, 1.3, 2.2], texto: "DESCONFIAVAM DA SEGURANÇA", tom: "alerta", p: ate(c.d_desconfiava - 0.1, c.v_1929 - 0.3) },
    { id: "1929", pos: add(TORRE, [0, TOPO + 1.4, 0]), texto: "1929: A FAMÍLIA SE MUDA PARA O TOPO", tom: "acento", p: ate(c.v_1929 - 0.15, ini(tl, "acao") + 0.1) },
    { id: "prova", pos: add(BR, [0, 2.2, -1.2]), texto: "PROVA VALE MAIS QUE ARGUMENTO", tom: "acento", p: ate(c.a_prova - 0.1, c.f_pede - 0.2) },
    ...NOMES.map((k, j) => ({ id: k, pos: add(PROVA(j), [0, 1.45, 0]), texto: k, tom: "acento" as const, p: ate(AT[j] - 0.1, c.cta_quer) })),
    { id: "pede", pos: add(BR, [0, 2.2, -1.2]), texto: "CONFIANÇA NÃO SE PEDE", p: ate(c.f_pede - 0.15, c.f_mostra - 0.1) },
    { id: "mostra", pos: add(BR, [0, 2.2, -1.2]), texto: "SE MOSTRA", tom: "acento", p: ate(c.f_mostra - 0.1, c.cta_quer) },
  ];
};
