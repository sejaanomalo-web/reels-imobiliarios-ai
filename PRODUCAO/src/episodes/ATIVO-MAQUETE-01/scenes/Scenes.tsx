import React from "react";
import { C } from "../../../theme";
import type { Timeline } from "../../types";
import { A } from "../../NOV26/kit";
import type { AtmosferaNome } from "../../../theme";
import {
  Bloco, Boneco, Casa, ConeLuz, Fluxo, Haste, Instituicao, ModulosSistema, Poeira, Tanque,
  camAt, clamp01, ease, prog, sp, type Cam, type Capitulo, type PlacaDef, type V3,
} from "../../../estilos/maquete";

/**
 * ATIVO-MAQUETE-01 — PILOTO do Quarto modelo (Maquete 3D). Roteiro, voz congelada e timeline do ATIVO-NOV26-03
 * ("O dinheiro que financia os imóveis"). A maquete inteira é um só mundo; a câmera anda por ele sem corte.
 * Apuração (NOV26-03): reservatório é METÁFORA; o valor da saída líquida NÃO aparece; não afirmar que o crédito parou.
 */
const G: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: A.hex }}>{children}</span>;
const R: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: C.warn }}>{children}</span>;

// ----- mundo (metros; +z = perto da câmera = baixo da tela) -----
const TANQUE: V3 = [-1.0, 0, 1.2];
const BANCO: V3 = [0.9, 0, -0.6];
const CASAS: V3[] = [[1.6, 0, -2.9], [0.4, 0, -3.7], [2.7, 0, -3.9]];
const FONTE_A: V3 = [-2.3, 0, -1.4];
const FONTE_B: V3 = [3.3, 0, -0.7];
const CORRETOR: V3 = [10.2, 0, 1.0];
const CLIENTES: V3[] = [[11.6, 0, -1.0], [9.1, 0, -1.5]];
const CTA_BASE: V3 = [20, 0, 0];

export const capitulos = (c: Record<string, number>): (Capitulo & { atm: AtmosferaNome })[] => [
  { de: 0, atm: "explicacao", chip: "A PERGUNTA", titulo: <>De onde vem o <G>financiamento</G>?</> },
  { de: c.a_pensa - 0.1, atm: "dados", chip: "O RESERVATÓRIO", titulo: <>Pensa num <G>reservatório</G></>, selo: "METÁFORA ILUSTRATIVA" },
  { de: c.a_saques - 0.3, atm: "tensao", chip: "A PRESSÃO", titulo: <>Mais <R>saques</R> que depósitos</> },
  { de: c.b_out - 0.4, atm: "tensao", chip: "OUTUBRO", titulo: <><R>Saída líquida</R> na poupança</> },
  { de: c.b_mas - 0.2, atm: "explicacao", chip: "OUTRAS FONTES", titulo: <>O banco <G>não parou</G> de financiar</> },
  { de: c.c_corr - 0.35, atm: "neutra", chip: "PARA O CORRETOR", titulo: <>Explique as <G>condições reais</G></> },
  { de: c.cta_quer - 0.1, atm: "explicacao", chip: "SEU SISTEMA", titulo: <>Um sistema <G>personalizado</G></> },
  { de: c.cta_comment - 0.3, atm: "solucao", chip: "SEU SISTEMA" },
];

export const camera = (t: number, c: Record<string, number>): Cam => camAt(t, [
  { t: 0, pos: [0.6, 13.0, 15.5], alvo: [0.6, 1.5, -1.5], fov: 40 },
  { t: c.h_fin, pos: [0.6, 12.6, 15.0], alvo: [0.6, 1.5, -1.4], fov: 40 },
  { t: c.a_res, pos: [-0.2, 10.4, 13.0], alvo: [0.0, 1.8, -0.6], fov: 38 },
  { t: c.a_poup, pos: [0.8, 11.0, 13.2], alvo: [1.0, 1.6, -1.6], fov: 38 },
  { t: c.a_saques + 0.4, pos: [-1.0, 9.4, 12.4], alvo: [-0.8, 1.9, -0.1], fov: 38 },
  { t: c.b_saida, pos: [-0.9, 9.0, 12.0], alvo: [-0.7, 2.0, 0.0], fov: 38 },
  { t: c.b_outras, pos: [0.5, 12.8, 15.2], alvo: [0.5, 1.5, -1.3], fov: 40 },
  { t: c.c_corr - 0.6, pos: [0.6, 12.6, 15.0], alvo: [0.6, 1.5, -1.3], fov: 40 },
  { t: c.c_corr + 0.6, pos: [10.6, 8.6, 13.0], alvo: [10.6, 2.2, -0.6], fov: 38, e: ease.inOut },
  { t: c.c_trad, pos: [10.7, 7.8, 11.8], alvo: [10.7, 2.3, -0.2], fov: 38 },
  { t: c.cta_quer - 0.3, pos: [10.7, 7.6, 11.4], alvo: [10.7, 2.3, 0.0], fov: 38 },
  { t: c.cta_quer + 0.9, pos: [20, 9.0, 13.5], alvo: [20, 2.1, -0.8], fov: 38, e: ease.inOut },
  { t: c.cta_comment - 0.2, pos: [20, 9.2, 13.8], alvo: [20, 2.2, -0.8], fov: 38 },
  { t: c.cta_comment + 0.5, pos: [20, 10.5, 15.5], alvo: [20, 3.9, -1.0], fov: 38, e: ease.inOut },
]);

/** Clima do capítulo atual (troca de atmosfera em 0,6 s na entrada de cada capítulo). */
export const clima = (t: number, c: Record<string, number>) => {
  const caps = capitulos(c);
  const i = caps.reduce((acc, k, j) => (t >= k.de ? j : acc), 0);
  const ant = caps[Math.max(0, i - 1)].atm;
  return { atm: ant, atmPara: caps[i].atm, atmK: i === 0 ? 1 : prog(t, caps[i].de, 0.6, ease.inOut) };
};

/** Tudo o que está DENTRO do 3D (objetos, fluxos, luz). */
export const Maquete3D: React.FC<{ t: number; tl: Timeline }> = ({ t, tl }) => {
  const c = tl.cues;
  const s = (at: number, d = 0.35) => sp(t, at - d, { damping: 12, stiffness: 170 });
  // nível do reservatório: enche na metáfora, cai com os saques, estabiliza
  const nivel = 0.55 + 0.3 * prog(t, c.a_res - 0.2, 1.2) - 0.42 * prog(t, c.a_saques, 3.4, ease.inOut);
  const pressao = prog(t, c.a_press - 0.1, 0.5) * (1 - prog(t, c.b_mas, 0.8));
  const andaA = t * 0.35;
  const corretor = s(c.c_corr, 0.4);
  const traduz = prog(t, c.c_trad - 0.05, 0.5);
  return (
    <>
      <Poeira t={t} centro={[5, 1.5, -1]} n={36} />
      {/* estação A — poupança → banco → casas */}
      <Tanque pos={TANQUE} raio={1.05} alt={2.3} nivel={nivel} surge={sp(t, 0.0, { damping: 12, stiffness: 150 })} alerta={pressao} />
      <Haste pos={[-2.3, 0, 1.9]} alt={2.7} surge={s(c.h_poup, 0.3)} />
      {CASAS.map((p, i) => <Casa key={i} pos={p} escala={0.85} rot={-0.2 + i * 0.15} surge={s(c.h_fin + i * 0.12)} />)}
      <Haste pos={[3.4, 0, -2.4]} alt={2.1} surge={s(c.h_fin, 0.3)} />
      <Instituicao pos={BANCO} escala={0.95} surge={s(c.a_cred)} />
      <Haste pos={[2.5, 0, 0.3]} alt={2.2} surge={s(c.a_cred, 0.3) * (1 - prog(t, c.c_corr, 0.5))} />
      {/* gancho: poupança direto às casas (some quando o banco entra) */}
      <Fluxo de={[TANQUE[0], 2.5, TANQUE[2]]} para={[1.5, 1.2, -3.3]} altura={2.2} p={prog(t, c.h_rel - 0.1, 1.0) * (1 - prog(t, c.a_cred - 0.2, 0.4))} anda={andaA} />
      {/* a parte dos recursos: poupança → banco → casas */}
      <Fluxo de={[TANQUE[0], 2.5, TANQUE[2]]} para={[BANCO[0], 1.6, BANCO[2]]} altura={1.4} p={prog(t, c.a_parte - 0.1, 1.0) * (1 - 0.6 * prog(t, c.a_saques, 1))} anda={andaA} n={12} />
      <Fluxo de={[BANCO[0], 1.6, BANCO[2]]} para={[1.5, 1.2, -3.3]} altura={1.2} p={prog(t, c.a_poup - 0.1, 1.0)} anda={andaA} n={12} />
      {/* a pressão: saques saem (vermelho), depósitos entram (poucos) */}
      <Fluxo de={[TANQUE[0], 2.5, TANQUE[2]]} para={[-5.0, 0.2, 3.6]} altura={1.0} p={prog(t, c.a_saques - 0.1, 1.0) * (1 - prog(t, c.b_mas, 0.8))} anda={t * 0.6} n={16} mat="alerta" />
      <Fluxo de={[3.4, 0.2, 3.6]} para={[TANQUE[0], 2.5, TANQUE[2]]} altura={1.0} p={prog(t, c.a_dep - 0.1, 1.0) * (1 - prog(t, c.b_mas, 0.8))} anda={t * 0.25} n={7} />
      {/* outras fontes e decisões do banco */}
      <Tanque pos={FONTE_A} raio={0.6} alt={1.4} nivel={0.7} surge={s(c.b_outras)} />
      <Tanque pos={FONTE_B} raio={0.6} alt={1.4} nivel={0.7} surge={s(c.b_outras + 0.15)} />
      <Fluxo de={[FONTE_A[0], 1.6, FONTE_A[2]]} para={[BANCO[0], 1.6, BANCO[2]]} altura={0.9} p={prog(t, c.b_outras, 0.8)} anda={andaA} n={8} />
      <Fluxo de={[FONTE_B[0], 1.6, FONTE_B[2]]} para={[BANCO[0], 1.6, BANCO[2]]} altura={0.9} p={prog(t, c.b_outras + 0.15, 0.8)} anda={andaA} n={8} />
      {/* estação B — o corretor (holofote, gravata verde) e os clientes */}
      <ConeLuz pos={CORRETOR} alt={6.5} raio={1.3} p={prog(t, c.c_corr - 0.4, 0.6)} verde={traduz} />
      <Boneco pos={CORRETOR} rot={0.35} surge={corretor} gravata acende={traduz} pose={t > c.c_expl - 0.1 && t < c.c_trad ? "aponta" : t >= c.c_trad ? "bracos" : "pe"} />
      {CLIENTES.map((p, i) => <Boneco key={i} pos={p} rot={-2.6 + i * 0.5} escala={0.92} surge={s(i === 0 ? c.c_acomp : c.c_cond)} mat="grafite" />)}
      {/* "não são iguais para todo mundo": cada cliente recebe uma pilha diferente */}
      <Bloco pos={[CLIENTES[0][0] + 0.75, 0, CLIENTES[0][2] + 0.2]} tam={[0.45, 1.2, 0.45]} surge={s(c.c_iguais)} />
      <Bloco pos={[CLIENTES[1][0] - 0.75, 0, CLIENTES[1][2] + 0.2]} tam={[0.45, 0.55, 0.45]} surge={s(c.c_iguais + 0.15)} />
      <Haste pos={[12.5, 0, 1.4]} alt={2.2} surge={s(c.c_aprov, 0.4)} />
      {/* fecho */}
      <ModulosSistema t={t} tl={tl} segPergunta="s10" segComente="s11" base={CTA_BASE} />
      <ConeLuz pos={CTA_BASE} alt={6.5} raio={3.0} p={prog(t, c.cta_quer + 0.3, 0.8)} verde={prog(t, c.cta_comment, 0.6)} />
    </>
  );
};

/** Holofote real (spot): no corretor e depois no pedestal do fecho. */
export const holofote = (t: number, c: Record<string, number>) => {
  const noFecho = t >= c.cta_quer;
  const p = noFecho ? prog(t, c.cta_quer + 0.3, 0.8) : prog(t, c.c_corr - 0.4, 0.6);
  const base = noFecho ? CTA_BASE : CORRETOR;
  return { pos: [base[0] + 0.4, 7.5, base[2] + 2.4] as V3, alvo: [base[0], 0, base[2]] as V3, intensidade: p };
};

/** Placas (HTML projetado no topo das hastes). Cada capítulo apaga as placas do anterior. */
export const placas = (t: number, c: Record<string, number>): PlacaDef[] => {
  const ate = (de: number, fim: number) => prog(t, de, 0.35) * (1 - prog(t, fim, 0.3));
  const palavras = ["APROVAÇÃO", "TAXA", "PRAZO"].filter((_, i) => t >= [c.c_aprov, c.c_taxa, c.c_prazo][i] - 0.08);
  return [
    { id: "poup", pos: [-2.3, 2.75, 1.9], texto: "POUPANÇA", p: ate(c.h_poup - 0.1, c.a_saques - 0.5) },
    { id: "fin", pos: [3.4, 2.15, -2.4], texto: "FINANCIAMENTO", tom: "acento", p: ate(c.h_fin - 0.1, c.a_pensa) },
    { id: "regras", pos: [2.5, 2.25, 0.3], texto: "REGRAS ESPECÍFICAS", p: ate(c.a_regras - 0.1, c.a_saques - 0.5) },
    { id: "pressao", pos: [-2.3, 2.75, 1.9], texto: "SOB PRESSÃO", tom: "alerta", p: ate(c.a_press - 0.1, c.b_mas) },
    { id: "decisao", pos: [2.5, 2.25, 0.3], texto: "DECISÕES DO BANCO", p: ate(c.b_dec - 0.1, c.c_corr - 0.6) },
    { id: "condicoes", pos: [12.5, 2.25, 1.4], texto: palavras.join(" · ") || "", p: palavras.length ? ate(c.c_aprov - 0.1, c.c_trad - 0.2) : 0 },
    { id: "traduza", pos: [12.5, 2.25, 1.4], texto: "TRADUZA A NOTÍCIA", tom: "acento", p: ate(c.c_trad - 0.1, c.cta_quer - 0.3) },
  ];
};

export { clamp01 };
