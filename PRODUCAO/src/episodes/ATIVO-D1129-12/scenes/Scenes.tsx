import React from "react";
import { C } from "../../../theme";
import type { Timeline } from "../../types";
import { A } from "../../NOV26/kit";
import type { AtmosferaNome } from "../../../theme";
import {
  Bloco, Boneco, Casa, ConeLuz, Fluxo, Haste, Instituicao, ModulosSistema, Poeira,
  camAt, clamp01, ease, mix, prog, sp, type Cam, type Capitulo, type PlacaDef, type V3,
} from "../../../estilos/maquete";

/**
 * ATIVO-D1129-12 — "A casa existe. O aluguel, não." (grade 29/11/2026 · 12h · AGORA · Maquete 3D).
 * Um só mundo, câmera sem corte: casa real → cópia escura (anúncio falso) → mural → família + celular + Pix → casa com dono
 * → CRECI-SC e holofote na orla → 3 checagens acendem e a cópia se desfaz → corretor de gravata verde → fecho SISTEMA.
 * Apuração: campanha do CRECI-SC de 23/11/2026; nenhum número de golpes; a família na porta é SITUAÇÃO ILUSTRATIVA.
 */
const G: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: A.hex }}>{children}</span>;
const R: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: C.warn }}>{children}</span>;

// ----- mundo (metros; +z = perto da câmera = baixo da tela) -----
const CASA: V3 = [0, 0, 0];
const ESC_CASA = 1.3;
const VIZINHAS: V3[] = [[2.9, 0, -2.6], [-2.0, 0, -3.4]];
const MURAL: V3 = [-3.9, 0, -2.9];
const COPIA_FIM: V3 = [-3.4, 0, -1.5];
const FAMILIA_B: V3 = [7.4, 0, 1.6];
const CELULAR: V3 = [5.9, 0, 1.0];
const GOLPISTA: V3 = [10.2, 0, -2.6];
const FAMILIA_A: V3 = [1.7, 0, 2.1];
const DONO: V3 = [0.15, 0, 0.95];
const CRECI: V3 = [-9.2, 0, -1.8];
const ORLA: V3[] = [[-13.2, 0, 2.2], [-11.6, 0, 2.7], [-10.0, 0, 2.4], [-8.4, 0, 2.8], [-6.8, 0, 2.3]];
const CHECK: V3[] = [[-2.5, 0, 1.6], [-1.9, 0, 2.4], [-1.3, 0, 3.2]];
const CHECK_ALT = [3.6, 2.6, 1.6];
const CORRETOR: V3 = [1.9, 0, 1.7];
const CTA_BASE: V3 = [8, 0, -6];

const ini = (tl: Timeline, id: string) => tl.scenes.find((s) => s.id === id)?.start ?? 0;

export const capitulos = (c: Record<string, number>, tl: Timeline): (Capitulo & { atm: AtmosferaNome })[] => [
  { de: 0, atm: "dilema", chip: "O ANÚNCIO", titulo: <>Fotos <G>reais</G>. Anúncio <R>falso</R>.</> },
  { de: ini(tl, "mec") + 0.1, atm: "explicacao", chip: "O MECANISMO", titulo: <>Preço <R>abaixo</R> da região</> },
  { de: ini(tl, "pressa") + 0.1, atm: "tensao", chip: "A PRESSÃO", titulo: <><R>Sinal</R> antes do contrato</> },
  { de: ini(tl, "consequencia") + 0.1, atm: "memoria", chip: "NO VERÃO", titulo: <>A casa <R>tem dono</R></>, selo: "SITUAÇÃO ILUSTRATIVA" },
  { de: ini(tl, "creci") + 0.1, atm: "explicacao", chip: "O QUE MUDOU", titulo: <>CRECI-SC: <G>Operação Verão</G></> },
  { de: ini(tl, "defesa") + 0.1, atm: "dados", chip: "A DEFESA", titulo: <>Confira <G>antes</G> de pagar</> },
  { de: ini(tl, "desfecho") + 0.1, atm: "neutra", chip: "PARA O CORRETOR", titulo: <>O que dá para <G>conferir</G></> },
  { de: c.cta_quer - 0.1, atm: "explicacao", chip: "SEU SISTEMA", titulo: <>Um sistema <G>personalizado</G></> },
  { de: c.cta_comment - 0.3, atm: "solucao", chip: "SEU SISTEMA" },
];

export const camera = (t: number, c: Record<string, number>, tl: Timeline): Cam => camAt(t, [
  // gancho: plano baixo na casa de praia; abre para a esquerda quando a cópia se descola
  { t: 0, pos: [3.4, 3.0, 8.6], alvo: [0.2, 1.9, 0], fov: 37 },
  { t: c.h_golpe, pos: [1.4, 3.6, 9.4], alvo: [-0.9, 1.9, -0.3], fov: 38 },
  // mecanismo: segue a cópia até o mural
  { t: c.m_copia + 1.4, pos: [-1.9, 5.0, 10.0], alvo: [-2.3, 1.5, -1.4], fov: 38 },
  { t: c.m_redes, pos: [-2.1, 5.4, 10.4], alvo: [-2.4, 1.5, -1.5], fov: 38 },
  // pressa: a família diante do celular; abre para mostrar o golpista no escuro
  { t: c.p_pressa, pos: [7.2, 5.0, 10.4], alvo: [7.0, 1.5, 0.6], fov: 40, e: ease.inOut },
  { t: c.p_pix + 0.4, pos: [8.2, 6.0, 12.0], alvo: [8.0, 1.5, -0.4], fov: 42 },
  { t: c.p_video + 0.4, pos: [8.1, 6.1, 12.2], alvo: [7.9, 1.5, -0.3], fov: 42 },
  // consequência: a câmera acompanha a família de volta à casa real
  { t: c.c_malas + 0.6, pos: [2.9, 3.9, 9.8], alvo: [0.8, 1.5, 0.8], fov: 38 },
  { t: c.c_nunca + 0.6, pos: [2.0, 3.5, 8.8], alvo: [0.6, 1.5, 0.9], fov: 37 },
  // CRECI e a orla
  { t: c.k_creci + 0.5, pos: [-8.8, 6.6, 11.8], alvo: [-9.2, 1.2, -0.3], fov: 40, e: ease.inOut },
  { t: c.k_fisc + 1.0, pos: [-9.6, 7.4, 13.0], alvo: [-9.4, 1.0, 0.3], fov: 40 },
  // defesa: plano aberto com a casa, a cópia no mural e as 3 placas
  { t: ini(tl, "defesa") + 1.2, pos: [-1.5, 6.8, 14.4], alvo: [-1.5, 1.6, -0.7], fov: 42, e: ease.inOut },
  { t: c.d_contrato + 1.2, pos: [-1.3, 6.6, 14.0], alvo: [-1.4, 1.6, -0.7], fov: 42 },
  // desfecho: a casa sozinha, sólida; o corretor entra
  { t: c.f_golpista + 1.4, pos: [1.0, 4.0, 9.6], alvo: [0.4, 1.6, 0.3], fov: 38 },
  { t: c.f_corretor, pos: [1.6, 3.9, 9.6], alvo: [1.0, 1.6, 0.6], fov: 38 },
  // fecho
  { t: c.cta_quer - 0.3, pos: [1.6, 3.9, 9.5], alvo: [1.0, 1.6, 0.6], fov: 38 },
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

const lerp3 = (a: V3, b: V3, p: number): V3 => [mix(a[0], b[0], p), mix(a[1], b[1], p), mix(a[2], b[2], p)];

/** Partículas da cópia que se desfaz (sobem e somem). */
const Desfaz: React.FC<{ t: number; centro: V3; de: number; ate: number; n?: number }> = ({ t, centro, de, ate, n = 46 }) => (
  <group>
    {Array.from({ length: n }).map((_, i) => {
      const r1 = Math.sin(i * 12.9898) * 43758.5453, r2 = Math.sin(i * 78.233) * 12345.678, r3 = Math.sin(i * 39.425) * 9876.54;
      const fx = r1 - Math.floor(r1), fy = r2 - Math.floor(r2), fz = r3 - Math.floor(r3);
      const nasce = mix(de, ate, (i + 0.5) / n);
      const u = clamp01((t - nasce) / 1.6);
      if (u <= 0 || u >= 1) return null;
      const p: V3 = [centro[0] + (fx - 0.5) * 1.6 + (fx - 0.5) * u * 0.8, centro[1] + 0.3 + fy * 1.4 + u * 1.8, centro[2] + (fz - 0.5) * 1.2];
      return (
        <mesh key={i} position={p}>
          <boxGeometry args={[0.08, 0.08, 0.08]} />
          <meshStandardMaterial color={C.dim} roughness={0.9} transparent opacity={0.85 * (1 - u)} depthWrite={false} />
        </mesh>
      );
    })}
  </group>
);

/** Tudo o que está DENTRO do 3D. */
export const Maquete3D: React.FC<{ t: number; tl: Timeline }> = ({ t, tl }) => {
  const c = tl.cues;
  const s = (at: number, d = 0.35) => sp(t, at - d, { damping: 12, stiffness: 170 });
  const anda = t * 0.4;
  // a cópia escura: descola-se da casa no "golpe", voa até o mural e se desfaz a cada checagem
  const descola = prog(t, c.h_golpe - 0.25, 0.7, ease.out);
  const voa = prog(t, c.m_copia - 0.1, 1.5, ease.inOut);
  const base0: V3 = [CASA[0] - 1.7 * descola, 0, CASA[2] - 0.4 * descola];
  const copiaPos = lerp3(base0, COPIA_FIM, voa);
  const copiaPosY: V3 = [copiaPos[0], 0.6 * Math.sin(Math.PI * voa) + 0.04 * descola, copiaPos[2]];
  const restos = 1 - 0.28 * prog(t, c.d_creci, 0.5) - 0.28 * prog(t, c.d_nome, 0.5) - 0.24 * prog(t, c.d_contrato, 0.5) - 0.2 * prog(t, c.f_conferir - 0.6, 0.7);
  const copiaSurge = descola > 0.001 ? clamp01(restos) : 0;
  // família: no celular (estação B) e depois caminha de volta até a porta da casa real
  const caminha = prog(t, c.c_verao - 0.2, 2.2, ease.inOut);
  const famBase = lerp3(FAMILIA_B, FAMILIA_A, caminha);
  const famSurge = s(c.p_pressa - 0.6, 0.3) * (1 - prog(t, c.k_creci - 0.9, 0.5));
  const famRot = caminha > 0.02 && caminha < 0.98 ? -1.5 : caminha >= 0.98 ? -2.1 : -1.9;
  const malas = s(c.c_malas, 0.3) * (1 - prog(t, c.k_creci - 0.9, 0.5));
  const someB = 1 - prog(t, c.c_verao + 0.6, 0.5);
  const msg = (i: number, at: number) => s(at, 0.25) * someB;
  const checa = [c.d_creci, c.d_nome, c.d_contrato];
  const corretor = s(c.f_verao, 0.4);
  const fimCena = 1 - prog(t, c.cta_quer + 0.4, 0.5);
  return (
    <>
      <Poeira t={t} centro={[-1, 1.5, 0]} n={36} />
      {/* estação A — a casa real (sempre sólida) e as vizinhas */}
      <Casa pos={CASA} escala={ESC_CASA} surge={sp(t, 0.0, { damping: 12, stiffness: 150 })} />
      {VIZINHAS.map((p, i) => <Casa key={i} pos={p} escala={0.8} rot={-0.25 + i * 0.4} surge={s(c.h_casa + 0.25 + i * 0.15)} />)}
      <Haste pos={[1.9, 0, 1.7]} alt={1.5} surge={s(c.h_casa, 0.3) * (1 - prog(t, c.m_copia, 0.4))} />
      {/* a cópia escura (o anúncio falso) */}
      <Casa pos={copiaPosY} escala={ESC_CASA * 0.92} rot={0.12 * voa} surge={copiaSurge} mat="grafite" />
      <Desfaz t={t} centro={COPIA_FIM} de={c.d_creci - 0.1} ate={c.f_conferir + 0.2} />
      <Fluxo de={[CASA[0] - 1.2, 1.4, CASA[2]]} para={[COPIA_FIM[0], 1.2, COPIA_FIM[2]]} altura={1.6} p={prog(t, c.m_copia - 0.1, 1.0) * (1 - prog(t, c.m_redes + 0.6, 0.6))} anda={anda} n={14} mat="grafite" />
      {/* mural de anúncios genéricos */}
      {[-1.1, 0, 1.1].map((dx, i) => <Bloco key={i} pos={[MURAL[0] + dx, 0, MURAL[2]]} tam={[0.95, 1.5 + (i % 2) * 0.3, 0.12]} mat="grafite" surge={s(c.m_copia + 0.5 + i * 0.12)} />)}
      <Haste pos={[-1.9, 0, -0.2]} alt={2.4} surge={s(c.m_preco, 0.3) * (1 - prog(t, c.p_pressa - 0.6, 0.4))} />
      {/* estação B — a família, o celular deitado, as mensagens, o Pix e o golpista no escuro */}
      <Bloco pos={CELULAR} tam={[1.25, 0.1, 2.2]} mat="grafite" surge={s(c.p_pressa - 0.8, 0.3) * someB} />
      <Bloco pos={[CELULAR[0], 0.1, CELULAR[2]]} tam={[1.05, 0.04, 1.9]} surge={s(c.p_pressa - 0.7, 0.3) * someB} />
      {[c.p_pressa, c.p_pressa + 0.8, c.p_sinal - 0.2].map((at, i) => (
        <Bloco key={i} pos={[CELULAR[0] + (i % 2 ? 0.25 : -0.25), 0.6 + i * 0.45, CELULAR[2] - 0.2]} tam={[0.7, 0.32, 0.1]} surge={msg(i, at)} />
      ))}
      <Boneco pos={[famBase[0] - 0.35, 0, famBase[2]]} rot={famRot} surge={famSurge} />
      <Boneco pos={[famBase[0] + 0.35, 0, famBase[2] + 0.1]} rot={famRot} escala={0.92} surge={famSurge} />
      <Boneco pos={[famBase[0], 0, famBase[2] + 0.45]} rot={famRot} escala={0.58} surge={famSurge} />
      <Bloco pos={[famBase[0] - 0.85, 0, famBase[2] + 0.2]} tam={[0.42, 0.55, 0.22]} mat="grafite" surge={malas} />
      <Bloco pos={[famBase[0] + 0.85, 0, famBase[2] + 0.3]} tam={[0.36, 0.45, 0.2]} mat="grafite" surge={malas} />
      <Boneco pos={GOLPISTA} rot={-0.9} surge={s(c.p_sinal - 0.4, 0.3) * someB} mat="grafite" />
      <Fluxo de={[FAMILIA_B[0] + 0.2, 1.3, FAMILIA_B[2]]} para={[GOLPISTA[0], 1.5, GOLPISTA[2]]} altura={1.4} p={prog(t, c.p_pix - 0.1, 0.9) * someB} anda={t * 0.6} n={14} mat="alerta" />
      <Haste pos={[9.7, 0, 1.1]} alt={2.3} surge={s(c.p_pix, 0.3) * someB} />
      <Haste pos={[6.7, 0, -0.9]} alt={2.9} surge={s(c.p_sem, 0.3) * someB} />
      <Haste pos={[8.7, 0, 3.0]} alt={1.6} surge={s(c.p_video, 0.3) * someB} />
      {/* consequência — o dono na porta, luz acesa */}
      <Boneco pos={DONO} rot={0} surge={s(c.c_dono, 0.3) * (1 - prog(t, ini(tl, "defesa"), 0.5))} mat="grafite" />
      <ConeLuz pos={[0, 0, 0.6]} alt={6} raio={1.6} p={prog(t, c.c_dono - 0.3, 0.5) * (1 - prog(t, c.k_creci - 1.2, 0.6))} />
      {/* CRECI-SC e a orla */}
      <Instituicao pos={CRECI} escala={1.15} surge={s(c.k_creci)} />
      {ORLA.map((p, i) => <Casa key={i} pos={p} escala={0.6} rot={0.1 * (i % 3) - 0.1} surge={s(c.k_creci - 0.9 + i * 0.1)} />)}
      <Haste pos={[-7.1, 0, -0.6]} alt={2.6} surge={s(c.k_campanha, 0.3)} />
      <Haste pos={[-11.8, 0, 0.9]} alt={2.0} surge={s(c.k_fisc, 0.3)} />
      <ConeLuz pos={[mix(-13.2, -6.8, prog(t, c.k_fisc - 0.6, 2.4, ease.inOut)), 0, 2.5]} alt={6.5} raio={1.1} p={prog(t, c.k_fisc - 0.6, 0.4) * (1 - prog(t, ini(tl, "defesa") + 0.4, 0.5))} />
      {/* as três checagens (acendem em verde, uma por item) */}
      {CHECK.map((p, i) => <Haste key={i} pos={p} alt={CHECK_ALT[i]} surge={s(checa[i], 0.3) * fimCena} />)}
      {/* desfecho — a casa sólida no holofote e o corretor de gravata verde */}
      <ConeLuz pos={[0.6, 0, 0.6]} alt={6.5} raio={1.9} p={prog(t, c.f_golpista - 0.2, 0.6) * (1 - prog(t, c.cta_quer + 0.3, 0.5))} verde={prog(t, c.f_corretor - 0.1, 0.5)} />
      <Boneco pos={CORRETOR} rot={-0.45} surge={corretor} gravata acende={prog(t, c.f_corretor - 0.1, 0.5)} pose={t >= c.f_corretor - 0.1 ? "bracos" : "pe"} />
      {/* fecho */}
      <ModulosSistema t={t} tl={tl} segPergunta="s14" segComente="s14" base={CTA_BASE} />
      <ConeLuz pos={CTA_BASE} alt={6.5} raio={2.6} p={prog(t, c.cta_quer + 0.3, 0.8)} verde={prog(t, c.cta_comment, 0.6)} />
    </>
  );
};

/** Holofote real (spot): casa com dono → varredura da orla → casa sólida + corretor → pedestal do fecho. */
export const holofote = (t: number, c: Record<string, number>, tl: Timeline) => {
  const alvoOrla: V3 = [mix(-13.2, -6.8, prog(t, c.k_fisc - 0.6, 2.4, ease.inOut)), 0, 2.5];
  if (t >= c.cta_quer) return { pos: [CTA_BASE[0] + 0.4, 7.5, CTA_BASE[2] + 2.4] as V3, alvo: CTA_BASE, intensidade: prog(t, c.cta_quer + 0.3, 0.8) };
  if (t >= c.f_golpista - 0.3) return { pos: [1.4, 7.5, 3.2] as V3, alvo: [0.8, 0, 0.6] as V3, intensidade: prog(t, c.f_golpista - 0.2, 0.6) };
  if (t >= c.k_fisc - 0.8) return { pos: [alvoOrla[0] + 0.4, 7.5, alvoOrla[2] + 2.2] as V3, alvo: alvoOrla, intensidade: prog(t, c.k_fisc - 0.6, 0.4) * (1 - prog(t, ini(tl, "defesa") + 0.4, 0.5)) };
  return { pos: [0.4, 7.5, 3.0] as V3, alvo: [0, 0, 0.6] as V3, intensidade: 0.8 * prog(t, c.c_dono - 0.3, 0.5) * (1 - prog(t, c.k_creci - 1.2, 0.6)) };
};

/** Placas (HTML projetado no topo das hastes). */
export const placas = (t: number, c: Record<string, number>, tl: Timeline): PlacaDef[] => {
  const ate = (de: number, fim: number) => prog(t, de, 0.35) * (1 - prog(t, fim, 0.3));
  const fimB = ini(tl, "consequencia") + 0.25;
  const textos = ["1 · CRECI DE QUEM ANUNCIA", "2 · ANÚNCIO = CONTA = DONO", "3 · CONTRATO ANTES DO PIX"];
  const checa = [c.d_creci, c.d_nome, c.d_contrato];
  return [
    { id: "anuncio", pos: [1.9, 1.55, 1.7], texto: "ANÚNCIO · TEMPORADA", p: ate(c.h_casa - 0.05, c.h_golpe - 0.1) },
    { id: "fotos", pos: [1.9, 1.55, 1.7], texto: "FOTOS REAIS", tom: "acento", p: ate(c.h_golpe - 0.1, c.m_copia - 0.2) },
    { id: "preco", pos: [-1.9, 2.45, -0.2], texto: "PREÇO ABAIXO DA REGIÃO", tom: "alerta", p: ate(c.m_preco - 0.1, c.m_redes - 0.1) },
    { id: "redes", pos: [-1.9, 2.45, -0.2], texto: "PUBLICADO NAS REDES", p: ate(c.m_redes - 0.1, c.p_pressa - 0.7) },
    { id: "pix", pos: [9.7, 2.35, 1.1], texto: "SINAL NO PIX", tom: "alerta", p: ate(c.p_pix - 0.1, fimB) },
    { id: "semc", pos: [6.7, 2.95, -0.9], texto: "SEM CONTRATO", tom: "alerta", p: ate(c.p_sem - 0.1, fimB) },
    { id: "semv", pos: [8.7, 1.65, 3.0], texto: "SEM VIDEOCHAMADA", tom: "alerta", p: ate(c.p_video - 0.1, fimB) },
    { id: "creci", pos: [-7.1, 2.65, -0.6], texto: "CRECI-SC · OPERAÇÃO VERÃO", tom: "acento", p: ate(c.k_campanha - 0.1, ini(tl, "defesa") + 0.2) },
    { id: "fisc", pos: [-11.8, 2.05, 0.9], texto: "FISCALIZAÇÃO", p: ate(c.k_fisc - 0.1, ini(tl, "defesa") + 0.2) },
    ...textos.map((texto, i): PlacaDef => ({ id: `ck${i}`, pos: [CHECK[i][0], CHECK_ALT[i] + 0.05, CHECK[i][2]], texto, tom: "acento", p: ate(checa[i] - 0.08, c.f_golpista - 0.2) })),
  ];
};

export { clamp01 };
