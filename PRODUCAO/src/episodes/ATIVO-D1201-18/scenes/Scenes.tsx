import React from "react";
import { C } from "../../../theme";
import type { Timeline } from "../../types";
import { A } from "../../NOV26/kit";
import type { AtmosferaNome } from "../../../theme";
import {
  Bloco, Boneco, ConeLuz, Fluxo, Haste, Instituicao, ModulosSistema, Poeira, Predio,
  camAt, ease, mix, prog, sp, type Cam, type Capitulo, type PlacaDef, type V3,
} from "../../../estilos/maquete";

/**
 * ATIVO-D1201-18 — "Sete dias para desistir" (grade 01/12/2026 · 18h · E SE…? · Maquete 3D).
 * Um só mundo: o estande de vendas (mesa, contrato, comprador e corretor) com o prédio em obra ao fundo → a fila de 7
 * blocos de calendário (Lei do Distrato, estande ou fora da sede) → o dinheiro volta do estande ao comprador → a venda só
 * termina depois do 7º dia → a pressão (o corretor empurra, o contrato se desfaz) → o 8º dia acende e o prédio fica de pé
 * → fecho SISTEMA. Apuração: Lei 13.786/2018 (§10 do art. 67-A da Lei 4.591/64); corretagem = parte dos especialistas.
 */
const G: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: A.hex }}>{children}</span>;
const R: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: C.warn }}>{children}</span>;

const ESTANDE: V3 = [0, 0, -0.6];
const MESA: V3 = [0, 0, 0.9];
const COMPRADOR: V3 = [-1.1, 0, 1.8];
const CORRETOR: V3 = [1.15, 0, 1.8];
const PREDIO: V3 = [0.6, 0, -4.2];
const DIA = (i: number): V3 => [3.2 + i * 0.95, 0, 0.6];
const CTA_BASE: V3 = [11, 0, -7];

const ini = (tl: Timeline, id: string) => tl.scenes.find((s) => s.id === id)?.start ?? 0;

export const capitulos = (c: Record<string, number>, tl: Timeline): (Capitulo & { atm: AtmosferaNome })[] => [
  { de: 0, atm: "dilema", chip: "E SE…?", titulo: <>Desistir <R>depois</R> de assinar?</> },
  { de: ini(tl, "lei") + 0.1, atm: "explicacao", chip: "A LEI", titulo: <><G>7 dias</G> para se arrepender</>, selo: "NÃO É ORIENTAÇÃO JURÍDICA" },
  { de: ini(tl, "devolve") + 0.1, atm: "dados", chip: "A DEVOLUÇÃO", titulo: <>Recebe <G>tudo</G> de volta</> },
  { de: ini(tl, "virada") + 0.1, atm: "explicacao", chip: "OU SEJA", titulo: <>A venda termina no <G>8º dia</G></> },
  { de: ini(tl, "pressao") + 0.1, atm: "tensao", chip: "A PRESSÃO", titulo: <>Fechar no impulso <R>sai caro</R></> },
  { de: ini(tl, "desfecho") + 0.1, atm: "neutra", chip: "PARA O CORRETOR", titulo: <>De pé no <G>oitavo dia</G></> },
  { de: c.cta_quer - 0.1, atm: "explicacao", chip: "SEU SISTEMA", titulo: <>Um sistema <G>personalizado</G></> },
  { de: c.cta_comment - 0.3, atm: "solucao", chip: "SEU SISTEMA" },
];

export const camera = (t: number, c: Record<string, number>, tl: Timeline): Cam => camAt(t, [
  { t: 0, pos: [-1.6, 5.6, 12.6], alvo: [0, 1.2, 0.4], fov: 38 },
  { t: c.h_assinar + 0.3, pos: [0.4, 4.6, 10.6], alvo: [0, 1.1, 0.8], fov: 38, e: ease.inOut },
  { t: c.h_pode + 0.2, pos: [0.4, 7.4, 14.6], alvo: [0.3, 1.2, -1.4], fov: 40, e: ease.inOut },
  // a lei e os 7 dias (à direita)
  { t: c.l_estande, pos: [3.4, 6.6, 12.8], alvo: [3.6, 1.0, 0.2], fov: 40, e: ease.inOut },
  { t: c.l_arrepender + 0.4, pos: [5.6, 7.4, 13.6], alvo: [5.8, 0.8, 0.2], fov: 40, e: ease.inOut },
  // a devolução: volta ao estande
  { t: c.d_volta + 0.3, pos: [-0.4, 5.6, 12.2], alvo: [-0.3, 1.2, 0.4], fov: 40, e: ease.inOut },
  { t: c.d_corretagem + 0.4, pos: [0.4, 5.8, 12.6], alvo: [0.2, 1.2, 0.4], fov: 40 },
  // virada: o calendário de cima, o 8º dia
  { t: c.v_termina, pos: [6.4, 9.6, 12.4], alvo: [6.6, 0.4, 0.2], fov: 40, e: ease.inOut },
  { t: c.v_7 + 0.6, pos: [7.8, 9.8, 13.2], alvo: [8.0, 0.4, 0.2], fov: 40 },
  // pressão: o estande de novo, mais perto
  { t: c.p_pressao + 0.2, pos: [0.6, 4.4, 10.2], alvo: [0, 1.2, 1.0], fov: 38, e: ease.inOut },
  { t: c.p_pensar + 0.3, pos: [2.6, 6.0, 12.8], alvo: [3.0, 1.0, 0.8], fov: 40, e: ease.inOut },
  // desfecho: o 8º dia e o prédio de pé
  { t: c.f_boa + 0.4, pos: [4.6, 8.6, 17.4], alvo: [4.4, 1.6, -1.8], fov: 44, e: ease.inOut },
  { t: c.cta_quer - 0.3, pos: [4.7, 8.7, 17.6], alvo: [4.5, 1.6, -1.8], fov: 44 },
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
  const desfaz = prog(t, c.p_cara - 0.1, 0.6);
  const contrato = sp(t, c.h_assinar - 0.5, { damping: 12, stiffness: 170 }) * (1 - desfaz) + s(c.f_boa - 0.3, 0.3) * desfaz;
  const diaAt = (i: number) => c.l_7 - 0.35 + i * 0.09;
  const oitavo = s(c.v_7, 0.3);
  const anda = prog(t, c.p_empurrado - 0.2, 1.4, ease.inOut);
  const compPos: V3 = [mix(COMPRADOR[0], DIA(3)[0], anda), 0, mix(COMPRADOR[2], 2.0, anda)];
  const volta = prog(t, c.f_boa - 0.4, 1.0, ease.inOut);
  const compFinal: V3 = [mix(compPos[0], 4.0, volta), 0, mix(compPos[2], 2.0, volta)];
  const corFinal: V3 = [mix(CORRETOR[0], 5.2, volta), 0, mix(CORRETOR[2], 2.1, volta)];
  const fimCena = 1 - prog(t, c.cta_quer + 0.4, 0.5);
  const predioP = mix(0.45 * s(c.h_planta, 0.3), 1, prog(t, c.f_boa - 0.2, 1.4));
  return (
    <>
      <Poeira t={t} centro={[3, 1.6, -1]} n={38} />
      {/* o estande de vendas e o prédio em obra */}
      <Instituicao pos={ESTANDE} escala={0.9} surge={sp(t, 0.0, { damping: 12, stiffness: 150 }) * fimCena} />
      <Predio pos={PREDIO} andares={7} escala={0.85} surge={predioP * fimCena} />
      <Bloco pos={MESA} tam={[1.6, 0.75, 0.9]} mat="grafite" surge={sp(t, 0.05, { damping: 12, stiffness: 150 }) * fimCena} />
      <Bloco pos={[MESA[0], 0.75, MESA[2]]} tam={[0.7, 0.04, 0.5]} surge={contrato * fimCena} acende={prog(t, c.h_assinar - 0.05, 0.4) * (1 - prog(t, c.h_planta, 0.4))} />
      <Boneco pos={volta > 0 ? compFinal : compPos} rot={anda > 0.02 && anda < 0.98 ? 1.4 : 0.6} surge={sp(t, 0.1, { damping: 12, stiffness: 150 }) * fimCena} />
      <Boneco pos={corFinal} rot={-0.6} surge={sp(t, 0.15, { damping: 12, stiffness: 150 }) * fimCena} gravata
        acende={prog(t, c.f_oitavo - 0.1, 0.5)} pose={t > c.p_pressao - 0.1 && t < c.p_empurrado + 0.4 ? "aponta" : t > c.f_oitavo ? "bracos" : "pe"} />
      {/* os 7 dias (e o 8º) */}
      {Array.from({ length: 7 }, (_, i) => (
        <Bloco key={i} pos={DIA(i)} tam={[0.75, 0.5 + 0.06 * i, 0.75]} surge={s(diaAt(i), 0.25) * fimCena}
          mat={t > c.v_termina + i * 0.12 ? "argila" : "grafite"} />
      ))}
      <Bloco pos={DIA(7.4)} tam={[0.9, 1.1, 0.9]} surge={oitavo * fimCena} acende={prog(t, c.f_oitavo - 0.1, 0.5)} />
      <Haste pos={[3.0, 0, -0.6]} alt={2.2} surge={s(c.l_lei, 0.3) * (1 - prog(t, ini(tl, "devolve"), 0.4))} />
      {/* o dinheiro volta do estande para o comprador */}
      <Fluxo de={[ESTANDE[0], 1.6, ESTANDE[2]]} para={[COMPRADOR[0], 1.5, COMPRADOR[2]]} altura={1.2} p={prog(t, c.d_volta - 0.1, 0.9) * (1 - prog(t, ini(tl, "virada"), 0.5))} anda={t * 0.5} n={14} />
      {/* a pressão */}
      <Fluxo de={[CORRETOR[0], 1.4, CORRETOR[2]]} para={[COMPRADOR[0] + 0.3, 1.4, COMPRADOR[2]]} altura={0.4} p={prog(t, c.p_pressao - 0.1, 0.6) * (1 - prog(t, c.p_empurrado, 0.4))} anda={t * 0.9} n={10} mat="alerta" />
      <ConeLuz pos={[4.6, 0, 1.6]} alt={6.5} raio={1.8} p={prog(t, c.f_boa - 0.2, 0.6) * fimCena} verde={prog(t, c.f_oitavo - 0.1, 0.5)} />
      <ModulosSistema t={t} tl={tl} segPergunta="s10" segComente="s10" base={CTA_BASE} />
      <ConeLuz pos={CTA_BASE} alt={6.5} raio={2.6} p={prog(t, c.cta_quer + 0.3, 0.8)} verde={prog(t, c.cta_comment, 0.6)} />
    </>
  );
};

export const holofote = (t: number, c: Record<string, number>, tl: Timeline) => {
  if (t >= c.cta_quer) return { pos: [CTA_BASE[0] + 0.4, 7.5, CTA_BASE[2] + 2.4] as V3, alvo: CTA_BASE, intensidade: prog(t, c.cta_quer + 0.3, 0.8) };
  if (t >= c.f_boa - 0.4) return { pos: [4.8, 7.5, 4.0] as V3, alvo: [4.6, 0, 1.6] as V3, intensidade: 0.7 * prog(t, c.f_boa - 0.2, 0.6) };
  return { pos: [0.4, 7.5, 3.4] as V3, alvo: [0, 0, 1.2] as V3, intensidade: 0.55 * prog(t, c.h_assinar - 0.3, 0.6) * (1 - prog(t, ini(tl, "lei"), 0.5)) };
};

export const placas = (t: number, c: Record<string, number>, tl: Timeline): PlacaDef[] => {
  const ate = (de: number, fim: number) => prog(t, de, 0.35) * (1 - prog(t, fim, 0.3));
  return [
    { id: "stand", pos: [ESTANDE[0], 2.3, ESTANDE[2]], texto: "ESTANDE DE VENDAS", p: ate(0.1, c.h_desistir - 0.15) },
    { id: "desistir", pos: [COMPRADOR[0], 2.1, COMPRADOR[2]], texto: "E SE DESISTIR?", p: ate(c.h_desistir - 0.1, c.h_assinar - 0.1) },
    { id: "assinado", pos: [MESA[0], 1.7, MESA[2]], texto: "CONTRATO ASSINADO", tom: "acento", p: ate(c.h_assinar - 0.1, c.h_planta - 0.1) },
    { id: "planta", pos: [PREDIO[0] + 1.2, 1.6, PREDIO[2] + 2.0], texto: "IMÓVEL NA PLANTA", p: ate(c.h_planta - 0.1, ini(tl, "lei")) },
    { id: "lei", pos: [3.0, 1.7, -0.6], texto: "LEI DO DISTRATO · 2018", p: ate(c.l_lei - 0.1, c.l_7 - 0.2) },
    { id: "estande", pos: [ESTANDE[0] + 1.6, 1.9, ESTANDE[2] + 0.6], texto: "ESTANDE OU FORA DA SEDE", p: ate(c.l_estande - 0.1, c.l_7 - 0.1) },
    { id: "sete", pos: [DIA(3)[0], 1.5, DIA(3)[2]], texto: "7 DIAS PARA SE ARREPENDER", tom: "acento", p: ate(c.l_7, ini(tl, "devolve")) },
    { id: "tudo", pos: [COMPRADOR[0], 2.2, COMPRADOR[2]], texto: "DEVOLUÇÃO DO QUE PAGOU", tom: "acento", p: ate(c.d_tudo - 0.1, c.d_especialistas - 0.1) },
    { id: "corretagem", pos: [ESTANDE[0], 2.6, ESTANDE[2]], texto: "INCLUSIVE CORRETAGEM?", p: ate(c.d_corretagem - 0.2, ini(tl, "virada")) },
    { id: "oito", pos: [DIA(7.4)[0], 1.7, DIA(7.4)[2]], texto: "DIA 8", tom: "acento", p: ate(c.v_7, ini(tl, "pressao")) },
    { id: "pressao", pos: [CORRETOR[0], 2.2, CORRETOR[2]], texto: "PRESSÃO", tom: "alerta", p: ate(c.p_pressao - 0.1, c.p_empurrado) },
    { id: "cara", pos: [MESA[0], 1.7, MESA[2]], texto: "SAI CARO", tom: "alerta", p: ate(c.p_cara - 0.1, c.p_pensar) },
    { id: "pensar", pos: [DIA(3)[0], 1.5, DIA(3)[2]], texto: "UMA SEMANA PARA PENSAR", p: ate(c.p_empurrado + 0.2, c.f_boa - 0.2) },
    { id: "pe", pos: [DIA(7.4)[0], 1.9, DIA(7.4)[2]], texto: "DE PÉ NO 8º DIA", tom: "acento", p: ate(c.f_oitavo - 0.1, c.cta_quer) },
  ];
};
