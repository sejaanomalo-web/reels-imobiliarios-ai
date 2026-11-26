import React from "react";
import type { Timeline } from "../../types";
import { A } from "../../NOV26/kit";
import type { AtmosferaNome } from "../../../theme";
import {
  Bloco, Boneco, ConeLuz, Fluxo, ModulosSistema, Poeira,
  camAt, ease, prog, sp, type Cam, type Capitulo, type PlacaDef, type V3,
} from "../../../estilos/maquete";

/**
 * ATIVO-D1209-18 — "O que ficou registrado" (grade 09/12/2026 · 18h · HISTÓRIA QUE ENSINA · Maquete 3D).
 * Um só mundo: as torres de argila da basílica e a torre central que sobe até o fim (1882 → 2026) → o arquiteto (boneco) se apaga
 * em 1926 → no ateliê, na guerra, os desenhos e as maquetes de gesso se partem → os pedaços, as fotos e as plantas publicadas
 * voltam em arcos e a obra continua → o atendimento só na cabeça para; o registro passa para outra pessoa → SISTEMA.
 * Apuração: sagradafamilia.org (1882, Gaudí 1883–1926, 1936, reconstrução); cruz da torre de Jesus Cristo em 20/02/2026.
 */
const G: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: A.hex }}>{children}</span>;
const IGR: V3 = [0, 0, 0];
const ATE: V3 = [9, 0, 1.2];
const PT: V3 = [18, 0, 2];
const CTA_BASE: V3 = [28, 0, -9];
const TORRES: [number, number, number][] = [[-1.5, -0.2, 2.2], [-0.9, 0.5, 2.8], [0.9, 0.5, 2.8], [1.5, -0.2, 2.2], [-1.2, -1.1, 3.1], [1.2, -1.1, 3.1], [-0.4, 1.0, 2.0], [0.4, 1.0, 2.0]];
const MAQ: [number, number, number][] = [[-0.9, 0, 0.9], [-0.3, 0.2, 1.3], [0.3, -0.1, 1.0], [0.9, 0.1, 1.2]];
const ini = (tl: Timeline, id: string) => tl.scenes.find((s) => s.id === id)?.start ?? 0;
const add = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];

export const capitulos = (c: Record<string, number>, tl: Timeline): (Capitulo & { atm: AtmosferaNome })[] => [
  { de: 0, atm: "memoria", chip: "1882 → 2026", titulo: <>Uma obra de <G>144 anos</G></> },
  { de: ini(tl, "autor") + 0.1, atm: "memoria", chip: "1926", titulo: <>O autor <G>se foi</G></> },
  { de: ini(tl, "guerra") + 0.1, atm: "tensao", chip: "1936", titulo: <>Desenhos <G>perdidos</G></> },
  { de: ini(tl, "virada") + 0.1, atm: "explicacao", chip: "A VIRADA", titulo: <>A obra <G>continuou</G></> },
  { de: ini(tl, "ponte") + 0.1, atm: "dilema", chip: "NO SEU ATENDIMENTO", titulo: <>Só <G>na cabeça</G>?</> },
  { de: ini(tl, "desfecho") + 0.1, atm: "explicacao", chip: "A LIÇÃO", titulo: <><G>Registre</G></> },
  { de: c.cta_quer - 0.1, atm: "explicacao", chip: "SEU SISTEMA", titulo: <>Um sistema <G>personalizado</G></> },
  { de: c.cta_comment - 0.3, atm: "solucao", chip: "SEU SISTEMA" },
];

const deriva = (t: number, c: Record<string, number>, cam: Cam): Cam => {
  const k = 1 - prog(t, c.cta_quer - 0.3, 0.8);
  return { ...cam, pos: [cam.pos[0] + k * 0.55 * Math.sin(t * 0.43), cam.pos[1] + k * 0.2 * Math.sin(t * 0.31 + 1), cam.pos[2] - k * 0.5 * Math.sin(t * 0.29 + 0.5)] };
};
export const camera = (t: number, c: Record<string, number>, tl: Timeline): Cam => deriva(t, c, camAt(t, [
  { t: 0, pos: [0.8, 5.0, 16.4], alvo: [0, 2.6, 0], fov: 40 },
  { t: c.h_pronta, pos: [1.0, 5.6, 17.4], alvo: [0, 3.0, 0], fov: 40, e: ease.inOut },
  { t: c.a_longe, pos: [0.0, 5.0, 16.0], alvo: [-0.5, 2.4, 0.8], fov: 40, e: ease.inOut },
  { t: c.g_guerra, pos: [ATE[0] + 0.4, 5.0, ATE[2] + 11.8], alvo: [ATE[0], 1.0, ATE[2]], fov: 40, e: ease.inOut },
  { t: c.g_gesso, pos: [ATE[0] + 0.6, 4.8, ATE[2] + 11.2], alvo: [ATE[0], 0.9, ATE[2] + 0.4], fov: 40, e: ease.inOut },
  { t: c.v_fotos, pos: [ATE[0] - 1.4, 5.4, ATE[2] + 12.4], alvo: [ATE[0] - 1.6, 1.2, ATE[2] + 0.8], fov: 40, e: ease.inOut },
  { t: c.v_plantas + 0.8, pos: [1.0, 5.6, 17.4], alvo: [0, 3.0, 0], fov: 40, e: ease.inOut },
  { t: c.p_atendimento, pos: [PT[0] + 0.4, 5.2, PT[2] + 12.0], alvo: [PT[0], 1.2, PT[2] + 0.4], fov: 40, e: ease.inOut },
  { t: c.f_registre, pos: [PT[0] + 0.8, 5.4, PT[2] + 12.4], alvo: [PT[0] + 0.6, 1.2, PT[2] + 0.6], fov: 40, e: ease.inOut },
  { t: c.cta_quer - 0.3, pos: [PT[0] + 1.0, 5.6, PT[2] + 12.6], alvo: [PT[0] + 0.8, 1.2, PT[2] + 0.6], fov: 40 },
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
  const fimIgr = 1 - prog(t, c.p_atendimento - 0.2, 0.5);
  const central = 0.55 + 0.45 * prog(t, c.h_alta - 0.2, 1.2, ease.out);
  const autorSai = prog(t, c.a_1926 - 0.1, 0.8);
  const quebra = prog(t, c.g_quebraram - 0.1, 0.6);
  const volta = prog(t, c.v_pedacos - 0.3, 1.4);
  const continua = prog(t, c.v_continuou - 0.2, 0.6);
  const para = prog(t, c.p_para - 0.15, 0.5);
  const reg = prog(t, c.f_registre - 0.15, 0.5);
  const passa = prog(t, c.f_constroi - 0.2, 1.0);
  return (
    <>
      <Poeira t={t} centro={[0, 2, 0]} n={24} />
      {/* a basílica: torres de argila e a torre central */}
      <Bloco pos={add(IGR, [0, 0.03, 0.4])} tam={[4.6, 0.06, 3.6]} surge={s(0.1, 0.2) * fimIgr} mat="grafite" />
      {TORRES.map(([x, z, h], i) => <Bloco key={i} pos={add(IGR, [x, 0, z])} tam={[0.34, h, 0.34]} surge={s(c.h_igreja - 0.3 + i * 0.06, 0.25) * fimIgr} />)}
      <Bloco pos={add(IGR, [0, 0, 0.2])} tam={[0.6, 5.2, 0.6]} surge={s(c.h_igreja, 0.25) * central * fimIgr} acende={prog(t, c.h_pronta - 0.15, 0.4) * 0.5 * (1 - prog(t, c.a_gaudi - 0.3, 0.4)) + continua * 0.5 * (1 - prog(t, c.p_atendimento - 0.4, 0.4))} />
      <Boneco pos={add(IGR, [-1.9, 0, 2.6])} rot={0.5} escala={0.8} surge={s(c.a_gaudi - 0.2, 0.3) * (1 - autorSai) * fimIgr} />
      <ConeLuz pos={add(IGR, [0, 0, 0.2])} alt={7} raio={1.6} p={(prog(t, c.h_pronta - 0.2, 0.5) * (1 - prog(t, c.a_gaudi - 0.3, 0.4)) + continua * (1 - prog(t, c.p_atendimento - 0.4, 0.4))) * 0.8} verde={continua} />
      {/* o ateliê: mesa, desenhos e maquetes de gesso que se partem */}
      <Bloco pos={add(ATE, [0, 0.03, 0.8])} tam={[3.8, 0.06, 3.0]} surge={s(c.g_guerra - 1.3, 0.25) * fimIgr} mat="grafite" />
      <Bloco pos={add(ATE, [0, 0.6, 0.9])} tam={[2.8, 0.08, 1.2]} surge={s(c.g_guerra - 1.2, 0.25) * fimIgr} />
      {MAQ.map(([x, z, h], i) => (
        <Bloco key={i} pos={add(ATE, [x, 0.64, 0.9 + z])} tam={[0.32, h * (1 - 0.7 * quebra), 0.32]} rot={quebra * (i % 2 ? 0.6 : -0.5)} surge={s(c.g_guerra - 1.1 + i * 0.05, 0.25) * fimIgr} mat={quebra > 0.5 ? "grafite" : "argila"} />
      ))}
      <Bloco pos={add(ATE, [1.6, 0.03, -0.6])} tam={[0.8, 0.06, 0.6]} surge={s(c.g_queimaram - 0.2, 0.25) * fimIgr * (1 - prog(t, c.g_queimaram + 0.3, 0.6))} />
      {/* a reconstrução: pedaços, fotos e plantas voltam em arcos para a obra */}
      {[0, 1, 2].map((i) => <Fluxo key={i} de={add(ATE, [-0.9 + i * 0.9, 0.9, 1.0])} para={add(IGR, [0, 3.2, 0.2])} altura={2.4} p={volta * fimIgr} n={12} anda={t * 0.5 + i * 0.3} />)}
      <Bloco pos={add(ATE, [-1.8, 0.03, 2.0])} tam={[0.6, 0.06, 0.45]} surge={s(c.v_fotos - 0.2, 0.25) * fimIgr} acende={prog(t, c.v_fotos - 0.1, 0.4) * 0.5} />
      <Bloco pos={add(ATE, [-1.0, 0.03, 2.2])} tam={[0.8, 0.06, 0.55]} surge={s(c.v_plantas - 0.2, 0.25) * fimIgr} acende={prog(t, c.v_plantas - 0.1, 0.4) * 0.5} />
      {/* o atendimento: só na cabeça para; registrado, passa para outra pessoa */}
      <Bloco pos={add(PT, [0, 0.03, 0.8])} tam={[4.0, 0.06, 3.0]} surge={s(c.p_atendimento - 0.3, 0.25) * fimCena} mat="grafite" />
      <Boneco pos={add(PT, [-0.9, 0, 1.0])} rot={0.4} gravata surge={s(c.p_atendimento - 0.2, 0.3) * fimCena} mat={para > 0.5 && reg < 0.5 ? "grafite" : "argila"} acende={reg * 0.4} pose={reg > 0.5 ? "aponta" : "pe"} />
      <Bloco pos={add(PT, [0.3, 0.5, 0.6])} tam={[0.6, 0.9, 0.06]} rot={-0.3} surge={s(c.f_registre - 0.25, 0.25) * fimCena} acende={reg * 0.55} />
      <Boneco pos={add(PT, [1.4, 0, 1.2])} rot={-0.6} surge={s(c.f_constroi - 0.2, 0.3) * fimCena} acende={passa * 0.4} />
      <Fluxo de={add(PT, [0.3, 1.1, 0.6])} para={add(PT, [1.4, 1.2, 1.2])} altura={1.0} p={passa * fimCena} n={8} anda={t * 0.6} />
      <ConeLuz pos={add(PT, [0.3, 0, 0.8])} alt={5.5} raio={1.8} p={prog(t, c.p_atendimento - 0.2, 0.5) * fimCena * 0.8} verde={reg} />
      <ModulosSistema t={t} tl={tl} segPergunta="s7" segComente="s7" base={CTA_BASE} />
      <ConeLuz pos={CTA_BASE} alt={6.5} raio={2.6} p={prog(t, c.cta_quer + 0.3, 0.8)} verde={prog(t, c.cta_comment, 0.6)} />
    </>
  );
};

export const holofote = (t: number, c: Record<string, number>, tl: Timeline) => {
  if (t >= c.cta_quer) return { pos: [CTA_BASE[0] + 0.4, 7.5, CTA_BASE[2] + 2.4] as V3, alvo: CTA_BASE, intensidade: prog(t, c.cta_quer + 0.3, 0.8) };
  if (t >= c.p_atendimento) return { pos: [PT[0], 7.5, PT[2] + 3] as V3, alvo: PT, intensidade: 0.6 * prog(t, c.p_atendimento, 0.6) };
  if (t >= c.g_guerra && t < c.v_plantas) return { pos: [ATE[0], 7.5, ATE[2] + 3] as V3, alvo: ATE, intensidade: 0.6 };
  return { pos: [0, 8, 4] as V3, alvo: [0, 0, 0] as V3, intensidade: 0.55 * prog(t, 0.2, 0.6) };
};

export const placas = (t: number, c: Record<string, number>, tl: Timeline): PlacaDef[] => {
  const ate = (de: number, fim: number) => prog(t, de, 0.35) * (1 - prog(t, fim, 0.3));
  return [
    { id: "1882", pos: add(IGR, [-1.6, 3.0, 2.2]), texto: "COMEÇOU EM 1882", p: ate(c.h_1882 - 0.15, c.h_alta - 0.1) },
    { id: "2026", pos: add(IGR, [1.7, 3.4, 0.6]), texto: "TORRE MAIS ALTA: 2026", tom: "acento", p: ate(c.h_pronta - 0.15, c.a_gaudi - 0.1) },
    { id: "1926", pos: add(IGR, [-1.9, 2.2, 2.6]), texto: "1926 · LONGE DO FIM", tom: "alerta", p: ate(c.a_1926 - 0.15, c.g_guerra - 0.6) },
    { id: "guerra", pos: add(ATE, [1.6, 1.6, -0.6]), texto: "DESENHOS QUEIMADOS", tom: "alerta", p: ate(c.g_queimaram - 0.15, c.g_quebraram - 0.1) },
    { id: "gesso", pos: add(ATE, [0, 2.0, 0.9]), texto: "MAQUETES DE GESSO QUEBRADAS", tom: "alerta", p: ate(c.g_quebraram - 0.1, c.v_continuou - 0.1) },
    { id: "pedacos", pos: add(ATE, [0, 2.0, 0.9]), texto: "OS PEDAÇOS", tom: "acento", p: ate(c.v_pedacos - 0.15, c.v_fotos - 0.1) },
    { id: "fotos", pos: add(ATE, [-1.4, 1.4, 2.1]), texto: "FOTOS E PLANTAS PUBLICADAS", tom: "acento", p: ate(c.v_fotos - 0.15, c.v_plantas + 0.6) },
    { id: "cont", pos: add(IGR, [1.7, 3.4, 0.6]), texto: "A OBRA CONTINUOU", tom: "acento", p: ate(c.v_plantas + 0.4, c.p_atendimento - 0.3) },
    { id: "cabeca", pos: add(PT, [-0.9, 2.3, 1.0]), texto: "SÓ NA SUA CABEÇA?", tom: "alerta", p: ate(c.p_cabeca - 0.15, c.p_parar + 0.2) },
    { id: "para", pos: add(PT, [-0.9, 2.3, 1.0]), texto: "PARA QUANDO VOCÊ PARA", tom: "alerta", p: ate(c.p_parar + 0.2, c.f_registre - 0.1) },
    { id: "reg", pos: add(PT, [0.3, 1.9, 0.6]), texto: "REGISTRE", tom: "acento", p: ate(c.f_registre - 0.1, c.f_constroi - 0.1) },
    { id: "outro", pos: add(PT, [0.6, 2.1, 0.8]), texto: "PARA OUTRO TERMINAR", tom: "acento", p: ate(c.f_constroi - 0.1, c.cta_quer + 0.2) },
  ];
};
