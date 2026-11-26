import React from "react";
import type { Timeline } from "../../types";
import { A } from "../../NOV26/kit";
import type { AtmosferaNome } from "../../../theme";
import {
  Bloco, Boneco, Casa, ConeLuz, Haste, ModulosSistema, Poeira, Predio,
  camAt, ease, prog, sp, type Cam, type Capitulo, type PlacaDef, type V3,
} from "../../../estilos/maquete";

/**
 * ATIVO-D1210-08 — "A conta de luz" (grade 10/12/2026 · 08h · E SE…? · Maquete 3D).
 * Um só mundo: casas com a etiqueta de energia em haste (Europa: a classe vai no anúncio) → aqui, a mesma casa sem etiqueta
 * (voluntária para imóvel residencial privado) → o cliente pergunta do sol da tarde e da conta de luz → o corretor anota a face
 * do sol, pede as contas e a ficha acende → o preço uma vez, a conta todo mês → SISTEMA.
 * Apuração: Diretiva 2010/31/UE, art. 12; PBE Edifica (Inmetro) voluntário para residencial privado.
 */
const G: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: A.hex }}>{children}</span>;
const EU: V3 = [0, 0, 0];
const BR: V3 = [14, 0, 2];
const CASA_B: V3 = [BR[0] - 1.2, 0, BR[2] + 0.6];
const DOC: V3 = [BR[0] + 1.4, 0, BR[2] + 0.8];
const CTA_BASE: V3 = [25, 0, -9];
const CASAS: V3[] = [-2.2, 0, 2.2].map((x) => [x, 0, 0] as V3);
const ini = (tl: Timeline, id: string) => tl.scenes.find((s) => s.id === id)?.start ?? 0;
const add = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];

export const capitulos = (c: Record<string, number>, tl: Timeline): (Capitulo & { atm: AtmosferaNome })[] => [
  { de: 0, atm: "dilema", chip: "E SE…?", titulo: <>A <G>energia</G> no anúncio?</> },
  { de: ini(tl, "europa") + 0.1, atm: "dados", chip: "UNIÃO EUROPEIA", titulo: <>A <G>classe</G> no anúncio</> },
  { de: ini(tl, "aqui") + 0.1, atm: "explicacao", chip: "BRASIL", titulo: <>Aqui, <G>voluntária</G></> },
  { de: ini(tl, "virada") + 0.1, atm: "tensao", chip: "O CLIENTE PERGUNTA", titulo: <>Sol e <G>conta de luz</G></> },
  { de: ini(tl, "acao") + 0.1, atm: "neutra", chip: "NA CAPTAÇÃO", titulo: <>Vai para <G>a ficha</G></> },
  { de: ini(tl, "desfecho") + 0.1, atm: "explicacao", chip: "A LIÇÃO", titulo: <>A conta <G>todo mês</G></> },
  { de: c.cta_quer - 0.1, atm: "explicacao", chip: "SEU SISTEMA", titulo: <>Um sistema <G>personalizado</G></> },
  { de: c.cta_comment - 0.3, atm: "solucao", chip: "SEU SISTEMA" },
];

const deriva = (t: number, c: Record<string, number>, cam: Cam): Cam => {
  const k = 1 - prog(t, c.cta_quer - 0.3, 0.8);
  return { ...cam, pos: [cam.pos[0] + k * 0.55 * Math.sin(t * 0.43), cam.pos[1] + k * 0.2 * Math.sin(t * 0.31 + 1), cam.pos[2] - k * 0.5 * Math.sin(t * 0.29 + 0.5)] };
};
export const camera = (t: number, c: Record<string, number>, tl: Timeline): Cam => deriva(t, c, camAt(t, [
  { t: 0, pos: [0.6, 5.0, 13.4], alvo: [0, 1.4, 0], fov: 40 },
  { t: c.e_classe, pos: [0.8, 5.4, 13.8], alvo: [0, 1.6, 0], fov: 40, e: ease.inOut },
  { t: ini(tl, "aqui") + 0.2, pos: [0.8, 5.4, 13.8], alvo: [0, 1.6, 0], fov: 40 },
  { t: c.q_etiqueta, pos: [BR[0] + 0.2, 5.6, BR[2] + 12.8], alvo: [BR[0], 1.4, BR[2] + 0.4], fov: 40, e: ease.inOut },
  { t: c.v_conta, pos: [BR[0] - 0.6, 5.2, BR[2] + 12.0], alvo: [BR[0] - 0.6, 1.2, BR[2] + 0.6], fov: 40, e: ease.inOut },
  { t: c.a_contas, pos: [BR[0] + 0.6, 5.4, BR[2] + 12.4], alvo: [BR[0] + 0.6, 1.2, BR[2] + 0.8], fov: 40, e: ease.inOut },
  { t: c.cta_quer - 0.3, pos: [BR[0] + 0.4, 5.6, BR[2] + 12.8], alvo: [BR[0] + 0.4, 1.2, BR[2] + 0.8], fov: 40, e: ease.inOut },
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
  const zonaA = 1 - prog(t, c.q_etiqueta + 0.6, 0.5);
  const classe = prog(t, c.e_classe - 0.15, 0.5);
  const sol = prog(t, c.v_sol - 0.15, 0.5);
  const ficha = prog(t, c.a_ficha - 0.15, 0.5);
  const contas = prog(t, c.a_contas - 0.15, 0.5);
  return (
    <>
      <Poeira t={t} centro={[0, 2, 0]} n={24} />
      {/* Europa: casas com a etiqueta de energia em haste */}
      <Bloco pos={add(EU, [0, 0.03, 0.4])} tam={[6.6, 0.06, 2.4]} surge={s(0.1, 0.2) * zonaA} mat="grafite" />
      {CASAS.map((p, i) => (
        <React.Fragment key={i}>
          <Casa pos={p} escala={0.62} surge={s(c.h_anuncio - 0.3 + i * 0.12, 0.25) * zonaA} />
          <Haste pos={add(p, [0.7, 0, 0.6])} alt={1.6} surge={s(c.h_energia - 0.2 + i * 0.08, 0.25) * zonaA} />
          <Bloco pos={add(p, [0.7, 1.6, 0.6])} tam={[0.5, 0.34, 0.06]} surge={s(c.h_energia - 0.1 + i * 0.08, 0.25) * zonaA} acende={classe * (0.6 - i * 0.18)} />
        </React.Fragment>
      ))}
      {/* Brasil: a casa sem etiqueta, prédios ao fundo, o sol da tarde e a ficha */}
      <Bloco pos={add(BR, [0, 0.03, 0.6])} tam={[6.4, 0.06, 4.4]} surge={s(c.q_aqui, 0.25) * fimCena} mat="grafite" />
      <Predio pos={add(BR, [-2.4, 0, -1.6])} andares={5} escala={0.5} surge={s(c.q_aqui + 0.1, 0.3) * fimCena} />
      <Predio pos={add(BR, [2.4, 0, -1.8])} andares={4} escala={0.5} surge={s(c.q_aqui + 0.2, 0.3) * fimCena} />
      <Casa pos={CASA_B} escala={0.66} rot={0.2} surge={s(c.q_aqui + 0.1, 0.3) * fimCena} />
      <Haste pos={add(CASA_B, [0.75, 0, 0.7])} alt={1.6} surge={s(c.q_etiqueta - 0.2, 0.25) * fimCena * (1 - prog(t, c.v_pergunta - 0.4, 0.4))} />
      <ConeLuz pos={add(CASA_B, [1.6, 0, -0.4])} alt={5.5} raio={1.6} p={sol * (1 - ficha) * fimCena * 0.8} verde={0} />
      <Boneco pos={add(DOC, [-0.6, 0, 1.2])} rot={0.4} gravata surge={s(c.v_pergunta - 0.3, 0.3) * fimCena} pose={t > c.a_anote - 0.2 && t < c.f_vez ? "aponta" : "pe"} acende={ficha * 0.4} />
      <Boneco pos={add(DOC, [0.9, 0, 1.4])} rot={-0.5} surge={s(c.v_pergunta - 0.2, 0.3) * fimCena} />
      <Bloco pos={add(DOC, [0, 0.55, 0])} tam={[0.8, 1.0, 0.06]} rot={-0.2} surge={s(c.a_anote - 0.25, 0.25) * fimCena} acende={Math.max(contas * 0.35, ficha * 0.55)} />
      <ConeLuz pos={DOC} alt={5.5} raio={1.6} p={prog(t, c.a_anote - 0.2, 0.5) * fimCena * 0.8} verde={ficha} />
      <ModulosSistema t={t} tl={tl} segPergunta="s7" segComente="s7" base={CTA_BASE} />
      <ConeLuz pos={CTA_BASE} alt={6.5} raio={2.6} p={prog(t, c.cta_quer + 0.3, 0.8)} verde={prog(t, c.cta_comment, 0.6)} />
    </>
  );
};

export const holofote = (t: number, c: Record<string, number>, tl: Timeline) => {
  if (t >= c.cta_quer) return { pos: [CTA_BASE[0] + 0.4, 7.5, CTA_BASE[2] + 2.4] as V3, alvo: CTA_BASE, intensidade: prog(t, c.cta_quer + 0.3, 0.8) };
  if (t >= c.q_etiqueta) return { pos: [BR[0], 7.5, BR[2] + 3] as V3, alvo: BR, intensidade: 0.6 * prog(t, c.q_etiqueta, 0.6) };
  return { pos: [0, 8, 4] as V3, alvo: [0, 0, 0] as V3, intensidade: 0.55 * prog(t, 0.2, 0.6) };
};

export const placas = (t: number, c: Record<string, number>, tl: Timeline): PlacaDef[] => {
  const ate = (de: number, fim: number) => prog(t, de, 0.35) * (1 - prog(t, fim, 0.3));
  return [
    { id: "gasta", pos: add(EU, [0, 2.6, 0]), texto: "QUANTO A CASA GASTA?", tom: "alerta", p: ate(c.h_energia - 0.15, c.e_uniao) },
    { id: "classe", pos: add(EU, [0, 2.6, 0]), texto: "CLASSE DE ENERGIA NO ANÚNCIO", tom: "acento", p: ate(c.e_classe - 0.15, c.q_aqui) },
    { id: "vol", pos: add(CASA_B, [0.75, 2.3, 0.7]), texto: "ETIQUETA VOLUNTÁRIA", p: ate(c.q_voluntaria - 0.15, c.v_pergunta - 0.2) },
    { id: "sol", pos: add(CASA_B, [1.6, 2.4, -0.4]), texto: "BATE SOL À TARDE?", tom: "alerta", p: ate(c.v_sol - 0.1, c.v_conta - 0.05) },
    { id: "conta", pos: add(CASA_B, [1.6, 2.4, -0.4]), texto: "A CONTA DE LUZ É ALTA?", tom: "alerta", p: ate(c.v_conta - 0.05, c.a_anote - 0.1) },
    { id: "face", pos: add(DOC, [0, 1.6, 0]), texto: "FACE DO SOL", tom: "acento", p: ate(c.a_face - 0.1, c.a_contas - 0.1) },
    { id: "contas", pos: add(DOC, [0, 1.6, 0]), texto: "ÚLTIMAS CONTAS DE LUZ", tom: "acento", p: ate(c.a_contas - 0.1, c.a_ficha - 0.1) },
    { id: "ficha", pos: add(DOC, [0, 1.6, 0]), texto: "NA FICHA DO IMÓVEL", tom: "acento", p: ate(c.a_ficha - 0.1, c.f_vez - 0.1) },
    { id: "vez", pos: add(CASA_B, [0, 2.3, 0]), texto: "PREÇO: UMA VEZ", p: ate(c.f_vez - 0.1, c.cta_quer + 0.2) },
    { id: "mes", pos: add(DOC, [0, 1.6, 0]), texto: "CONTA: TODO MÊS", tom: "acento", p: ate(c.f_mes - 0.1, c.cta_quer + 0.2) },
  ];
};
