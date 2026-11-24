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
 * ATIVO-D1130-12 — "O número na porta" (grade 30/11/2026 · 12h · FORA DA BOLHA · Maquete 3D).
 * Um só mundo, câmera sem corte: duas casas iguais (Nº 8 e Nº 4) → o bairro de 117 mil vendas brota atrás →
 * a 8 sobe num degrau e a 4 afunda → um setor do bairro ganha luz (a crença) → a casa 8 passa de dono em dono (revenda)
 * → o corretor de gravata verde com o cliente e o próximo comprador ao fundo → fecho SISTEMA.
 * Apuração: Fortin, Hill e Huang (Economic Inquiry, 2014); ~117 mil vendas na Grande Vancouver; vendas até ~2010.
 */
const G: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: A.hex }}>{children}</span>;
const R: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: C.warn }}>{children}</span>;

// ----- mundo (metros; +z = perto da câmera = baixo da tela) -----
const C8: V3 = [-1.15, 0, 0];
const C4: V3 = [1.15, 0, 0];
const ESC = 1.15;
const H8: V3 = [-1.15, 0, 1.25];
const H4: V3 = [1.15, 0, 1.25];
const COLS = [-4.2, -2.6, -1.0, 0.6, 2.2, 3.8];
const LINHAS = [-3.4, -5.0, -6.6, -8.2, -9.8];
const SETOR = (x: number) => x <= -1.0; // as duas colunas da esquerda + a do meio-esquerda = bairro com mais moradores dessa origem
const DONO1: V3 = [-2.9, 0, 1.0];
const DONO2: V3 = [-4.5, 0, 0.1];
const DONO3: V3 = [-6.1, 0, -0.8];
const CLIENTE: V3 = [-0.35, 0, 2.15];
const CORRETOR: V3 = [0.55, 0, 2.0];
const CTA_BASE: V3 = [8, 0, -7];

const ini = (tl: Timeline, id: string) => tl.scenes.find((s) => s.id === id)?.start ?? 0;

export const capitulos = (c: Record<string, number>, tl: Timeline): (Capitulo & { atm: AtmosferaNome })[] => [
  { de: 0, atm: "explicacao", chip: "A RUA", titulo: <>Mesma casa. <G>Preço</G> diferente.</> },
  { de: ini(tl, "estudo") + 0.1, atm: "dados", chip: "O ESTUDO", numero: "117 mil", rotulo: "VENDAS DE CASAS · REGIÃO DE VANCOUVER" },
  { de: ini(tl, "numeros") + 0.1, atm: "dados", chip: "O NÚMERO", titulo: <><G>8</G>: +2,5% · <R>4</R>: −2,2%</> },
  { de: ini(tl, "cultura") + 0.1, atm: "memoria", chip: "A CRENÇA", titulo: <>O <G>8</G> lembra prosperidade</> },
  { de: ini(tl, "virada") + 0.1, atm: "explicacao", chip: "A REVENDA", titulo: <>Quem revende <G>também paga</G></> },
  { de: ini(tl, "desfecho") + 0.1, atm: "neutra", chip: "PARA O CORRETOR", titulo: <>O preço de <G>amanhã</G></> },
  { de: c.cta_quer - 0.1, atm: "explicacao", chip: "SEU SISTEMA", titulo: <>Um sistema <G>personalizado</G></> },
  { de: c.cta_comment - 0.3, atm: "solucao", chip: "SEU SISTEMA" },
];

export const camera = (t: number, c: Record<string, number>, tl: Timeline): Cam => camAt(t, [
  // gancho: as duas casas de frente, baixo; desce até as plaquinhas no "número"
  { t: 0, pos: [-2.6, 7.2, 13.6], alvo: [-0.6, 1.0, 0], fov: 38 },
  { t: c.h_rua, pos: [0, 4.0, 11.8], alvo: [0, 1.2, 0], fov: 38, e: ease.inOut },
  { t: c.h_caro + 0.3, pos: [-0.9, 3.6, 10.8], alvo: [-0.7, 1.2, 0.2], fov: 38 },
  { t: c.h_numero + 0.2, pos: [0, 3.2, 10.0], alvo: [0, 1.0, 0.5], fov: 38 },
  // estudo: sobe e recua para o bairro inteiro brotar atrás
  { t: c.e_117 + 0.2, pos: [0.2, 9.5, 12.5], alvo: [0, 0.6, -5.2], fov: 40, e: ease.inOut },
  { t: c.e_vanc + 0.3, pos: [0.3, 10.0, 13.0], alvo: [0, 0.6, -5.4], fov: 40 },
  // números: volta às duas casas (8 sobe, 4 afunda)
  { t: c.n_oito + 0.4, pos: [-1.3, 4.2, 11.2], alvo: [-0.7, 1.1, 0.2], fov: 38, e: ease.inOut },
  { t: c.n_acima + 0.3, pos: [-1.0, 4.6, 11.8], alvo: [-0.6, 1.2, 0.2], fov: 38 },
  { t: c.n_quatro + 0.5, pos: [1.3, 4.2, 11.4], alvo: [0.7, 1.0, 0.2], fov: 38, e: ease.inOut },
  { t: c.n_abaixo + 0.5, pos: [0.1, 4.8, 12.6], alvo: [0, 1.1, 0.2], fov: 38, e: ease.inOut },
  // cultura: o bairro de cima, o setor da esquerda ganha luz
  { t: c.c_familias + 0.6, pos: [-1.2, 9.0, 11.5], alvo: [-1.4, 0.5, -5.6], fov: 40, e: ease.inOut },
  { t: c.c_prosp + 0.3, pos: [-2.2, 8.4, 10.6], alvo: [-2.0, 0.5, -5.2], fov: 40 },
  { t: c.c_morte + 0.3, pos: [1.0, 8.6, 10.8], alvo: [0.4, 0.5, -5.2], fov: 40, e: ease.inOut },
  { t: c.c_bairros + 0.6, pos: [-1.6, 9.6, 11.8], alvo: [-1.8, 0.5, -6.0], fov: 40 },
  // virada: a casa 8 e a fila de donos à esquerda
  { t: c.v_curioso + 0.4, pos: [-2.8, 6.0, 12.6], alvo: [-3.3, 1.0, -0.1], fov: 40, e: ease.inOut },
  { t: c.v_paga + 0.6, pos: [-3.0, 6.2, 13.0], alvo: [-3.4, 1.0, -0.2], fov: 40 },
  // desfecho: o corretor e o cliente diante da casa 8; o próximo comprador ao fundo
  { t: c.f_cliente + 0.4, pos: [-0.2, 5.0, 12.8], alvo: [-0.6, 1.1, 0.6], fov: 38, e: ease.inOut },
  { t: c.f_acredita + 0.4, pos: [-0.5, 5.2, 13.4], alvo: [-0.9, 1.1, 0.4], fov: 38 },
  // fecho
  { t: c.cta_quer - 0.3, pos: [-0.5, 5.2, 13.4], alvo: [-0.9, 1.1, 0.4], fov: 38 },
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

/** Tudo o que está DENTRO do 3D. */
export const Maquete3D: React.FC<{ t: number; tl: Timeline }> = ({ t, tl }) => {
  const c = tl.cues;
  const s = (at: number, d = 0.35) => sp(t, at - d, { damping: 12, stiffness: 170 });
  // a 8 sobe num degrau, a 4 afunda (efeito médio, devagar)
  const sobe = prog(t, c.n_acima - 0.2, 0.9, ease.out);
  const desce = prog(t, c.n_abaixo - 0.2, 0.9, ease.out);
  const degrau = 0.32 * sobe;
  const acende8 = 0.8 * prog(t, c.n_oito - 0.05, 0.4) * (1 - 0.75 * prog(t, ini(tl, "cultura"), 0.5)) + 0.4 * prog(t, c.v_paga - 0.05, 0.4) * (1 - 0.5 * prog(t, c.f_cliente, 0.5));
  const bairro = (i: number, j: number) => s(c.e_estudo + 0.15 + (i + j * COLS.length) * 0.05, 0.3);
  const setorLuz = prog(t, c.c_bairros - 0.2, 0.6) * (1 - prog(t, ini(tl, "virada") + 0.2, 0.5));
  const d1 = s(c.v_tambem - 0.2, 0.3), d2 = s(c.v_revendidas, 0.3), d3 = s(c.v_revender, 0.3);
  const fimDonos = 1 - prog(t, c.f_cliente - 0.6, 0.5);
  const proximo = s(c.f_proximo, 0.3);
  const corretor = s(c.f_cliente - 0.3, 0.35);
  const fimCena = 1 - prog(t, c.cta_quer + 0.4, 0.5);
  return (
    <>
      <Poeira t={t} centro={[0, 1.6, -2]} n={38} />
      {/* estação A — as duas casas iguais (já no quadro 0) e as hastes das plaquinhas */}
      <Bloco pos={[C8[0], 0, C8[2]]} tam={[1.9, Math.max(0.001, degrau), 1.6]} mat="grafite" surge={sobe > 0.01 ? 1 : 0} />
      <Casa pos={[C8[0], degrau, C8[2]]} escala={ESC} acende={acende8 * 0.55} surge={sp(t, 0.0, { damping: 12, stiffness: 150 })} />
      <Casa pos={[C4[0], -0.3 * desce, C4[2]]} escala={ESC} surge={s(c.h_iguais, 0.3)} />
      <Fluxo de={[C8[0] + 0.6, 1.2, C8[2]]} para={[C4[0] - 0.6, 1.2, C4[2]]} altura={0.7} p={prog(t, c.h_iguais - 0.45, 0.4) * (1 - prog(t, c.h_rua, 0.4))} n={8} />
      <Haste pos={H8} alt={1.2} surge={s(c.h_numero, 0.3) * fimCena} />
      <Haste pos={H4} alt={1.2} surge={s(c.h_numero + 0.1, 0.3) * (1 - prog(t, ini(tl, "virada"), 0.4))} />
      {/* estação B — o bairro das 117 mil vendas (brota atrás, em profundidade) */}
      {LINHAS.map((z, j) => COLS.map((x, i) => (
        <Casa key={`${i}-${j}`} pos={[x + (j % 2) * 0.35, 0, z]} escala={0.62} rot={((i * 7 + j * 3) % 5 - 2) * 0.06}
          mat={SETOR(x) ? "argila" : "grafite"} surge={bairro(i, j)} />
      )))}
      <ConeLuz pos={[-2.6, 0, -6.6]} alt={7.5} raio={3.0} p={setorLuz} />
      {/* virada — a casa 8 passa de dono em dono */}
      <Boneco pos={DONO1} rot={0.7} surge={d1 * fimDonos} />
      <Boneco pos={DONO2} rot={0.7} surge={d2 * fimDonos} />
      <Boneco pos={DONO3} rot={0.7} surge={d3 * fimDonos} />
      <Fluxo de={[DONO1[0], 1.5, DONO1[2]]} para={[DONO2[0], 1.5, DONO2[2]]} altura={0.9} p={prog(t, c.v_revendidas - 0.1, 0.8) * fimDonos} anda={t * 0.4} n={10} />
      <Fluxo de={[DONO2[0], 1.5, DONO2[2]]} para={[DONO3[0], 1.5, DONO3[2]]} altura={0.9} p={prog(t, c.v_revender - 0.1, 0.8) * fimDonos} anda={t * 0.4} n={10} />
      {/* desfecho — o corretor e o cliente; o próximo comprador ao fundo, olhando a 8 */}
      <Boneco pos={CLIENTE} rot={-0.3} surge={s(c.f_cliente - 0.2, 0.3) * fimCena} mat="grafite" />
      <Boneco pos={CORRETOR} rot={-0.55} surge={corretor * fimCena} gravata acende={prog(t, c.f_amanha - 0.1, 0.5)} pose={t >= c.f_amanha - 0.1 ? "aponta" : "pe"} />
      <Boneco pos={[-3.3, 0, -1.6]} rot={0.9} escala={0.95} surge={proximo * fimCena} mat="grafite" />
      <ConeLuz pos={[0.1, 0, 2.0]} alt={6.2} raio={1.4} p={prog(t, c.f_cliente - 0.2, 0.6) * fimCena} verde={prog(t, c.f_amanha - 0.1, 0.5)} />
      {/* fecho */}
      <ModulosSistema t={t} tl={tl} segPergunta="s13" segComente="s13" base={CTA_BASE} />
      <ConeLuz pos={CTA_BASE} alt={6.5} raio={2.6} p={prog(t, c.cta_quer + 0.3, 0.8)} verde={prog(t, c.cta_comment, 0.6)} />
    </>
  );
};

/** Holofote real (spot): o setor do bairro → o corretor e o cliente → o pedestal do fecho. */
export const holofote = (t: number, c: Record<string, number>, tl: Timeline) => {
  if (t >= c.cta_quer) return { pos: [CTA_BASE[0] + 0.4, 7.5, CTA_BASE[2] + 2.4] as V3, alvo: CTA_BASE, intensidade: prog(t, c.cta_quer + 0.3, 0.8) };
  if (t >= c.f_cliente - 0.4) return { pos: [0.6, 7.5, 4.2] as V3, alvo: [0.1, 0, 2.0] as V3, intensidade: 0.7 * prog(t, c.f_cliente - 0.2, 0.6) };
  return { pos: [-2.4, 8.5, -3.6] as V3, alvo: [-2.6, 0, -6.6] as V3,
    intensidade: 0.7 * prog(t, c.c_bairros - 0.2, 0.6) * (1 - prog(t, ini(tl, "virada") + 0.2, 0.5)) };
};

/** Placas (HTML projetado no topo das hastes ou sobre os objetos). */
export const placas = (t: number, c: Record<string, number>, tl: Timeline): PlacaDef[] => {
  const ate = (de: number, fim: number) => prog(t, de, 0.35) * (1 - prog(t, fim, 0.3));
  const virada = ini(tl, "virada");
  return [
    { id: "n8", pos: [H8[0], 1.25, H8[2]], texto: "Nº 8", tom: t >= c.n_oito - 0.1 && t < ini(tl, "cultura") ? "acento" : "neutra", p: ate(c.h_numero - 0.05, ini(tl, "estudo") + 0.2) + ate(c.n_oito - 0.3, ini(tl, "cultura") + 0.2) },
    { id: "n4", pos: [H4[0], 1.25, H4[2]], texto: "Nº 4", tom: t >= c.n_quatro - 0.1 && t < ini(tl, "cultura") ? "alerta" : "neutra", p: ate(c.h_numero + 0.05, ini(tl, "estudo") + 0.2) + ate(c.n_oito - 0.3, ini(tl, "cultura") + 0.2) },
    { id: "cara", pos: [C8[0], 1.55, C8[2] + 0.9], texto: "VENDEU MAIS CARO", tom: "acento", p: ate(c.h_caro - 0.1, c.h_numero - 0.1) },
    { id: "mais", pos: [C8[0], 2.45, C8[2]], texto: "+2,5%", tom: "acento", p: ate(c.n_acima - 0.1, ini(tl, "cultura") + 0.2) },
    { id: "menos", pos: [C4[0], 2.0, C4[2]], texto: "−2,2%", tom: "alerta", p: ate(c.n_abaixo - 0.1, ini(tl, "cultura") + 0.2) },
    { id: "prosp", pos: [-3.4, 1.3, -3.4], texto: "8 · PROSPERIDADE", tom: "acento", p: ate(c.c_prosp - 0.1, c.c_efeito - 0.1) },
    { id: "morte", pos: [2.4, 1.3, -3.4], texto: "4 · SOA COMO “MORTE”", tom: "alerta", p: ate(c.c_morte - 0.15, c.c_efeito - 0.1) },
    { id: "setor", pos: [-2.6, 1.6, -5.0], texto: "ONDE O EFEITO APARECEU", p: ate(c.c_bairros - 0.1, virada + 0.2) },
    { id: "rev", pos: [DONO2[0], 2.4, DONO2[2]], texto: "REVENDA", p: ate(c.v_revendidas - 0.1, c.v_paga - 0.1) },
    { id: "paga", pos: [C8[0], 2.3, C8[2] + 0.6], texto: "TAMBÉM PAGA PELO 8", tom: "acento", p: ate(c.v_paga - 0.1, c.f_cliente - 0.3) },
    { id: "dif", pos: [CLIENTE[0], 2.1, CLIENTE[2]], texto: "“NÃO FAZ DIFERENÇA”", p: ate(c.f_diferenca - 0.1, c.f_amanha - 0.2) },
    { id: "prox", pos: [-3.3, 1.9, -1.6], texto: "O PRÓXIMO COMPRADOR", tom: "acento", p: ate(c.f_proximo - 0.1, c.cta_quer) },
  ];
};
