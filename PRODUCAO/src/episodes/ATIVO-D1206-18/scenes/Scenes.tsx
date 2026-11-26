import React from "react";
import type { Timeline } from "../../types";
import { A } from "../../NOV26/kit";
import type { AtmosferaNome } from "../../../theme";
import {
  Bloco, Boneco, Casa, ConeLuz, ModulosSistema, Poeira,
  camAt, ease, prog, sp, type Cam, type Capitulo, type PlacaDef, type V3,
} from "../../../estilos/maquete";

/**
 * ATIVO-D1206-18 — "A linha de montagem ao contrário" (grade 06/12/2026 · 18h · HISTÓRIA QUE ENSINA · Maquete 3D).
 * Um só mundo: a fileira de casas fica parada e as equipes andam de casa em casa, cada uma fazendo só a sua etapa (laje →
 * paredes → casa pronta) → a câmera sobe e o bairro inteiro brota (mais de 17 mil casas) → cada etapa sempre do mesmo jeito
 * → o atendimento em 4 etapas (contato, visita, proposta, documentos) acende → atende mais sem atender pior → fecho SISTEMA.
 * Apuração: Levittown (Long Island, NY), a partir de 1947; 17.447 casas; 26–27 etapas (History.com, Wikipedia, EBSCO).
 */
const G: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: A.hex }}>{children}</span>;
const N = 6;
const rowP = (i: number): V3 => [-2.4 + i * 1.0, 0, 2.8 - i * 1.7];
const BR: V3 = [16, 0, 3];
const PED = (j: number): V3 => [BR[0] - 2.1 + j * 1.4, 0, BR[2] + 2.0 - j * 1.6];
const CTA_BASE: V3 = [26, 0, -9];
const ini = (tl: Timeline, id: string) => tl.scenes.find((s) => s.id === id)?.start ?? 0;
const add = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const clamp = (x: number, a: number, b: number) => Math.max(a, Math.min(b, x));
const BAIRRO: V3[] = (() => {
  const out: V3[] = [];
  for (let r = 0; r < 4; r++) for (let k = 0; k < 9; k++) out.push([-8 + k * 2 + (r % 2), 0, -11 - r * 2.2]);
  return out;
})();

export const capitulos = (c: Record<string, number>, tl: Timeline): (Capitulo & { atm: AtmosferaNome })[] => [
  { de: 0, atm: "memoria", chip: "EUA · 1947", titulo: <>A linha de montagem <G>ao contrário</G></> },
  { de: ini(tl, "etapas") + 0.1, atm: "memoria", chip: "O MÉTODO", titulo: <>Cada equipe, <G>uma etapa</G></> },
  { de: ini(tl, "escala") + 0.1, atm: "dados", chip: "A ESCALA", titulo: <>Mais de <G>17 mil casas</G></> },
  { de: ini(tl, "virada") + 0.1, atm: "explicacao", chip: "O SEGREDO", titulo: <>Sempre do <G>mesmo jeito</G></> },
  { de: ini(tl, "acao") + 0.1, atm: "neutra", chip: "NO SEU ATENDIMENTO", titulo: <>Defina cada <G>etapa</G></> },
  { de: ini(tl, "desfecho") + 0.1, atm: "explicacao", chip: "A LIÇÃO", titulo: <>Mais, <G>sem pior</G></> },
  { de: c.cta_quer - 0.1, atm: "explicacao", chip: "SEU SISTEMA", titulo: <>Um sistema <G>personalizado</G></> },
  { de: c.cta_comment - 0.3, atm: "solucao", chip: "SEU SISTEMA" },
];

const deriva = (t: number, c: Record<string, number>, cam: Cam): Cam => {
  const k = 1 - prog(t, c.cta_quer - 0.3, 0.8);
  return { ...cam, pos: [cam.pos[0] + k * 0.6 * Math.sin(t * 0.43), cam.pos[1] + k * 0.22 * Math.sin(t * 0.31 + 1), cam.pos[2] - k * 0.5 * Math.sin(t * 0.27 + 0.5)] };
};
export const camera = (t: number, c: Record<string, number>, tl: Timeline): Cam => deriva(t, c, camAt(t, [
  { t: 0, pos: [-3.8, 9.2, 14.6], alvo: [0.1, 0.9, -1.4], fov: 40 },
  { t: c.h_andava, pos: [-3.4, 9.0, 14.2], alvo: [0.1, 0.9, -1.4], fov: 40, e: ease.inOut },
  { t: c.e_etapas, pos: [-2.8, 8.4, 13.4], alvo: [0.2, 0.9, -1.4], fov: 40, e: ease.inOut },
  { t: c.s_dezessete - 0.6, pos: [-2.6, 8.4, 13.2], alvo: [0.2, 0.9, -1.4], fov: 40 },
  { t: c.s_dezessete + 0.9, pos: [0, 14.0, 6.0], alvo: [0, 2.0, -13.0], fov: 42, e: ease.inOut },
  { t: c.v_jeito, pos: [0.6, 13.4, 5.4], alvo: [0.4, 2.0, -12.6], fov: 42, e: ease.inOut },
  { t: ini(tl, "acao") + 0.9, pos: [BR[0] - 1.5, 9.0, BR[2] + 16.0], alvo: [BR[0], 0.9, BR[2]], fov: 40, e: ease.inOut },
  { t: c.a_defina, pos: [BR[0] - 1.3, 8.8, BR[2] + 15.6], alvo: [BR[0], 0.9, BR[2]], fov: 40, e: ease.inOut },
  { t: c.f_pior, pos: [BR[0] - 1.0, 8.6, BR[2] + 15.2], alvo: [BR[0], 0.9, BR[2]], fov: 40, e: ease.inOut },
  { t: c.cta_quer - 0.3, pos: [BR[0] - 0.95, 8.6, BR[2] + 15.2], alvo: [BR[0], 0.9, BR[2]], fov: 40 },
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
  const zonaA = 1 - prog(t, ini(tl, "acao") + 1.4, 0.5);
  // a onda de obra: cada equipe (etapa e) está na casa w - e; a casa i já passou pela etapa e quando w >= i + e + 1
  const w = Math.max(0, (t - c.h_inverteu + 0.4) / 1.25);
  const estagio = (i: number) => clamp(Math.floor(w - i), 0, 3);
  const mesmo = prog(t, c.v_jeito - 0.2, 0.6);
  const ped = [c.a_contato, c.a_visita, c.a_proposta, c.a_documentos].map((a) => prog(t, a - 0.15, 0.35));
  const certo = prog(t, c.f_certo - 0.2, 0.5);
  const pior = prog(t, c.f_pior - 0.15, 0.4);
  return (
    <>
      <Poeira t={t} centro={[0, 2, 0]} n={26} />
      {/* a fileira parada */}
      {Array.from({ length: N }, (_, i) => {
        const st = estagio(i);
        const base = s(c.h_1947 - 0.2 + i * 0.08, 0.2) * zonaA;
        return (
          <React.Fragment key={i}>
            <Bloco pos={add(rowP(i), [0, 0.04, 0])} tam={[1.5, 0.08, 1.4]} surge={base} mat="grafite" acende={mesmo * 0.25} />
            <Bloco pos={add(rowP(i), [0, st === 1 ? 0.25 : 0.45, 0])} tam={[1.1, st === 1 ? 0.4 : 0.8, 1.0]} surge={(st === 1 || st === 2 ? 1 : 0) * base} mat="argila" />
            <Casa pos={rowP(i)} escala={0.9} surge={(st >= 3 ? s(c.h_inverteu + (i + 3) * 1.25 - 0.4, 0.2) : 0) * base} />
          </React.Fragment>
        );
      })}
      {/* as equipes andam de casa em casa (uma por etapa) */}
      {[0, 1, 2].map((e) => {
        const pos = clamp(w - e - 0.5, -0.6, N - 0.4);
        const vis = s(c.h_inverteu + 0.2 + e * 0.15, 0.25) * zonaA * (pos >= -0.5 && pos <= N - 0.5 ? 1 : 0) * (1 - prog(t, c.s_dezessete - 0.3, 0.4));
        const a = rowP(Math.floor(clamp(pos, 0, N - 1))), b = rowP(Math.min(N - 1, Math.floor(clamp(pos, 0, N - 1)) + 1)), f = clamp(pos, 0, N - 1) % 1;
        return <Boneco key={e} pos={[a[0] + (b[0] - a[0]) * f + 1.0, 0, a[2] + (b[2] - a[2]) * f + 0.4]} rot={-0.53} escala={0.7} surge={vis} acende={e === 0 ? 0.3 : 0} />;
      })}
      {/* o bairro inteiro */}
      {BAIRRO.map((p, i) => (
        <Casa key={i} pos={p} escala={0.75} surge={s(c.s_dezessete + (i % 9) * 0.05 + Math.floor(i / 9) * 0.12, 0.2) * zonaA} acende={mesmo * 0.12} />
      ))}
      {/* o seu atendimento: 4 etapas */}
      {[0, 1, 2, 3].map((j) => (
        <React.Fragment key={j}>
          <Bloco pos={add(PED(j), [0, 0.2, 0])} tam={[1.1, 0.4, 0.9]} surge={s(ini(tl, "acao") + 0.6 + j * 0.1, 0.25) * fimCena} mat="grafite" acende={Math.max(ped[j] * 0.22, pior * 0.28)} />
        </React.Fragment>
      ))}
      <Boneco pos={add(PED(clamp((t - c.a_contato) / 0.7, 0, 3)), [0, 0.4, 0])} rot={-0.6} gravata surge={s(c.a_atendimento, 0.3) * fimCena} acende={pior * 0.6} pose={t > c.a_defina && t < c.f_certo ? "aponta" : "pe"} />
      {[0, 1, 2].map((k) => (
        <Boneco key={k} pos={add(BR, [1.2 + k * 1.1, 0, 2.4 - k * 0.3])} rot={Math.PI} escala={0.8} surge={s(c.f_certo + k * 0.12, 0.3) * fimCena} acende={pior * 0.35} />
      ))}
      <ConeLuz pos={BR} alt={6} raio={3.2} p={Math.max(ped[0], certo) * fimCena * 0.7} verde={pior} />
      <ModulosSistema t={t} tl={tl} segPergunta="s7" segComente="s7" base={CTA_BASE} />
      <ConeLuz pos={CTA_BASE} alt={6.5} raio={2.6} p={prog(t, c.cta_quer + 0.3, 0.8)} verde={prog(t, c.cta_comment, 0.6)} />
    </>
  );
};

export const holofote = (t: number, c: Record<string, number>, tl: Timeline) => {
  if (t >= c.cta_quer) return { pos: [CTA_BASE[0] + 0.4, 7.5, CTA_BASE[2] + 2.4] as V3, alvo: CTA_BASE, intensidade: prog(t, c.cta_quer + 0.3, 0.8) };
  if (t >= ini(tl, "acao") + 0.6) return { pos: [BR[0], 7.5, BR[2] + 3] as V3, alvo: BR, intensidade: 0.6 * prog(t, ini(tl, "acao") + 0.6, 0.6) };
  return { pos: [0, 9, 4] as V3, alvo: [0, 0, -1] as V3, intensidade: 0.55 * prog(t, 0.2, 0.6) };
};

export const placas = (t: number, c: Record<string, number>, tl: Timeline): PlacaDef[] => {
  const ate = (de: number, fim: number) => prog(t, de, 0.35) * (1 - prog(t, fim, 0.3));
  const NOMES = ["CONTATO", "VISITA", "PROPOSTA", "DOCUMENTOS"];
  const AT = [c.a_contato, c.a_visita, c.a_proposta, c.a_documentos];
  return [
    { id: "parada", pos: add(rowP(1), [0, 1.9, 0]), texto: "A CASA FICA PARADA", p: ate(c.h_parada - 0.1, c.e_etapas - 0.4) },
    { id: "anda", pos: add(rowP(4), [1.0, 1.5, 0.4]), texto: "QUEM ANDA É A EQUIPE", tom: "acento", p: ate(c.h_andava - 0.1, c.e_etapas - 0.4) },
    { id: "etapas", pos: add(rowP(2), [0, 2.0, 0]), texto: "VINTE E POUCAS ETAPAS", p: ate(c.e_etapas - 0.15, c.e_sua - 0.2) },
    { id: "sua", pos: add(rowP(2), [0, 2.0, 0]), texto: "CADA EQUIPE FAZ SÓ A SUA", tom: "acento", p: ate(c.e_sua - 0.15, c.s_dezessete - 0.4) },
    { id: "17", pos: [0, 2.4, -13], texto: "MAIS DE 17 MIL CASAS", tom: "acento", p: ate(c.s_dezessete - 0.05, c.v_trabalhar - 0.2) },
    { id: "mais", pos: [0, 2.4, -13], texto: "NÃO ERA TRABALHAR MAIS", tom: "alerta", p: ate(c.v_trabalhar - 0.1, c.v_jeito - 0.25) },
    { id: "jeito", pos: [0, 2.4, -13], texto: "CADA ETAPA, SEMPRE DO MESMO JEITO", tom: "acento", p: ate(c.v_jeito - 0.15, ini(tl, "acao") - 0.1) },
    ...NOMES.map((k, j) => ({ id: k, pos: add(PED(j), [0, 1.3, 0]), texto: k, tom: "acento" as const, p: ate(AT[j] - 0.1, c.cta_quer) })),
    { id: "defina", pos: add(BR, [-2.6, 2.5, -0.8]), texto: "DEFINA COMO CADA UMA É FEITA", tom: "acento", p: ate(c.a_defina - 0.1, c.f_certo - 0.3) },
    { id: "certo", pos: add(BR, [-2.6, 2.5, -0.8]), texto: "UM JEITO CERTO", tom: "acento", p: ate(c.f_certo - 0.1, c.f_pior - 0.2) },
    { id: "pior", pos: add(BR, [-2.6, 2.5, -0.8]), texto: "MAIS, SEM ATENDER PIOR", tom: "acento", p: ate(c.f_pior - 0.1, c.cta_quer) },
  ];
};
