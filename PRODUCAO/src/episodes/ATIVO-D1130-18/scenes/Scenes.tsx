import React from "react";
import { C, F } from "../../../theme";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A } from "../../NOV26/kit";
import {
  Carimbo, Chamada, Comodo, Contorno, Cota, LINHA, Porta, Prancha, SeloPlanta, TituloFolha, TRACO,
  clamp01, ease, mergulho, mix, prog, sp,
} from "../../../estilos/planta";

/**
 * ATIVO-D1130-18 — "E se o anúncio mostrasse a conta de luz?" (grade 30/11/2026 · 18h · E SE…? · Planta técnica v2).
 * Folhas: o anúncio com uma linha nova de ENERGIA/ANO → a regra francesa (2022, letra do mesmo tamanho) → a escala A–G
 * (F e G em vermelho, CONSUMO EXCESSIVO) → o calendário 2025 · 2028 · 2034 (portas fechadas ao aluguel novo) → a planta
 * brasileira: o coração na sala e os custos que chegam DEPOIS → o anúncio com o CUSTO DE MORAR antes → fecho.
 * Apuração: Service-Public.fr (DPE; anúncio desde 01/01/2022; G proibido para locação nova desde 2025, F 2028, E 2034,
 * França metropolitana). Brasil sem obrigação equivalente. Anúncio e planta ILUSTRATIVOS.
 */
const M = "JetBrains Mono";
const TOP = 380;
const fade = (p: number) => clamp01(p * 1.5);
const TELA = { x: 120, y: 120, w: 840, h: 640 };
const W: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: C.warn }}>{children}</span>;
const G: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: A.hex }}>{children}</span>;

const Tr: React.FC<{ d: string; p: number; cor?: string; w?: number }> = ({ d, p, cor = LINHA, w = TRACO }) => (
  <path d={d} fill="none" stroke={cor} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - clamp01(p)} opacity={p > 0.001 ? 1 : 0} />
);
/** Casa em elevação (corpo + telhado + porta + 2 janelas), centrada em cx, chão em base. */
const CasaElev: React.FC<{ cx: number; base: number; w: number; h: number; p: number; cor?: string }> = ({ cx, base, w, h, p, cor = LINHA }) => {
  const x0 = cx - w / 2, x1 = cx + w / 2, top = base - h, apice = top - h * 0.62, jw = w * 0.2, jh = h * 0.28;
  return (
    <g>
      <Tr d={`M ${x0} ${base} L ${x0} ${top} L ${x1} ${top} L ${x1} ${base} Z`} p={p} cor={cor} />
      <Tr d={`M ${x0 - w * 0.08} ${top} L ${cx} ${apice} L ${x1 + w * 0.08} ${top}`} p={(p - 0.25) / 0.75} cor={cor} />
      <Tr d={`M ${cx - w * 0.1} ${base} L ${cx - w * 0.1} ${base - h * 0.5} L ${cx + w * 0.1} ${base - h * 0.5} L ${cx + w * 0.1} ${base}`} p={(p - 0.5) / 0.5} cor={cor} />
      {[x0 + w * 0.1, x1 - w * 0.1 - jw].map((jx) => <rect key={jx} x={jx} y={top + h * 0.2} width={jw} height={jh} fill="none" stroke={cor} strokeWidth={TRACO * 0.67} opacity={fade((p - 0.6) / 0.4)} />)}
    </g>
  );
};
const Rot: React.FC<{ x: number; y: number; texto: string; p: number; cor?: string; size?: number; anchor?: "start" | "middle" | "end" }> = ({ x, y, texto, p, cor = C.muted, size = 26, anchor = "start" }) => (
  <text x={x} y={y} textAnchor={anchor} fill={cor} fontFamily={M} fontWeight={700} fontSize={size} letterSpacing="0.12em" opacity={fade(p)}>{texto}</text>
);

/* ------------------------------------------------ 1 · o anúncio e a regra francesa ------------------------------------------------ */
const ENERGIA = { x: 160, y: 590, w: 760, h: 140 };
export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const mg = prog(t, c.n_nota - 0.55, 0.55, ease.linear);
  if (mg >= 1) return null;
  const m = mergulho(mg, ENERGIA, TELA);
  const r = (at: number, d = 0.7) => prog(t, at - 0.3, d, ease.out);
  const gasto = prog(t, c.r_gasto - 0.1, 0.4);
  const carimbo = sp(t, c.r_2022 - 0.1, { damping: 10, stiffness: 220 });
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans }}>
      <Camera drift={6} t={t} keys={[{ t: 0, s: 1.02 }, { t: c.h_luz, s: 1.05, y: -14, e: ease.out }, { t: c.r_franca, s: 1.03, e: ease.inOut }, { t: c.r_tamanho, s: 1.06, y: -20, e: ease.out }]}>
        <Prancha top={TOP} h={900}>
          <g transform={m.transform} opacity={m.opacity}>
            <g opacity={m.outros}>
              <Contorno {...TELA} p={prog(t, -0.1, 0.9, ease.out)} />
              <Rot x={540} y={170} anchor="middle" texto="ANÚNCIO · VENDA" p={prog(t, 0.2, 0.5)} />
              <Comodo x={160} y={200} w={760} h={260} p={r(0.15, 0.8)} titulo="" />
              <CasaElev cx={540} base={430} w={200} h={120} p={prog(t, 0.3, 1.0, ease.out)} />
              <Rot x={180} y={520} texto="PREÇO" p={r(c.h_anuncio)} cor={C.text} size={34} />
              <Tr d="M 380 510 L 900 510" p={r(c.h_anuncio + 0.2)} cor={C.dim} />
              <g opacity={fade(carimbo)} transform={`translate(840 160) rotate(-9) scale(${mix(1.5, 1, Math.min(1, carimbo))})`}>
                <rect x={-80} y={-34} width={160} height={68} rx={8} fill="rgba(7,8,10,0.85)" stroke={LINHA} strokeWidth={TRACO} />
                <text x={0} y={14} textAnchor="middle" fill={C.text} fontFamily={M} fontWeight={700} fontSize={40}>2022</text>
              </g>
              <Chamada x={ENERGIA.x + 640} y={ENERGIA.y + 20} bx={170} by={760} bw={520} texto="LETRA = TAMANHO DO PREÇO" p={prog(t, c.r_letra - 0.3, 0.8)} tone="linha" />
            </g>
            <Comodo {...ENERGIA} p={r(c.h_luz - 0.2)} titulo={gasto > 0.5 ? "GASTO ANUAL ESTIMADO" : "ENERGIA / ANO ?"} sub={gasto > 0.5 ? "DE ENERGIA · NO ANÚNCIO" : undefined}
              tone={gasto > 0.5 ? "linha" : "muted"} acende={gasto} titleSize={38} />
          </g>
        </Prancha>
      </Camera>
      <TituloFolha p={sp(t, -0.3, { damping: 14, stiffness: 160 }) * (1 - prog(t, c.r_franca - 0.25, 0.2))} size={50}>E SE O ANÚNCIO MOSTRASSE A <G>LUZ</G>?</TituloFolha>
      <TituloFolha p={prog(t, c.r_franca - 0.05, 0.35) * (1 - prog(t, c.n_nota - 0.6, 0.2))}>NA FRANÇA, JÁ É <G>REGRA</G></TituloFolha>
      <SeloPlanta texto="ANÚNCIO ILUSTRATIVO" p={prog(t, 1.2, 0.4) * (1 - prog(t, c.r_franca - 0.2, 0.3))} />
      <SeloPlanta texto="SEGUNDO SERVICE-PUBLIC.FR · DESDE 2022" p={prog(t, c.r_2022, 0.4) * (1 - prog(t, c.r_letra - 0.45, 0.25))} />
    </div>
  );
};

/* ------------------------------------------------ 2 · a nota de A a G ------------------------------------------------ */
const LETRAS = ["A", "B", "C", "D", "E", "F", "G"];
const barra = (i: number) => ({ x: 170, y: 140 + i * 88, w: 300 + i * 78, h: 70 });
export const Take1: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const ini = c.n_nota - 0.1;
  if (t < ini - 0.05) return null;
  const mg = prog(t, c.k_mais - 0.5, 0.55, ease.linear);
  if (mg >= 1) return null;
  const m = mergulho(mg, barra(6), TELA);
  const passo = (c.n_G - c.n_A) / 6;
  const piores = prog(t, c.n_piores - 0.1, 0.4);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans }}>
      <Camera drift={6} t={t} keys={[{ t: ini, s: 1.0 }, { t: c.n_G, s: 1.03, y: -8, e: ease.out }, { t: c.n_excessivo, s: 1.06, y: -14, e: ease.out }]}>
        <Prancha top={TOP} h={900}>
          <g transform={m.transform} opacity={m.opacity}>
            <g opacity={m.outros}>
              <Contorno {...TELA} p={prog(t, ini, 0.7, ease.out)} />
              {LETRAS.slice(0, 6).map((L, i) => (
                <Comodo key={L} {...barra(i)} p={prog(t, c.n_A - 0.35 + i * passo, 0.5, ease.out)} titulo={L} titleSize={40} tone={i === 5 && piores > 0.5 ? "warn" : "linha"} />
              ))}
              <Chamada x={barra(6).x + barra(6).w} y={barra(6).y + 35} bx={560} by={790} bw={360} texto="CONSUMO EXCESSIVO" p={prog(t, c.n_excessivo - 0.4, 0.8)} tone="warn" />
              <Rot x={barra(0).x + barra(0).w + 24} y={barra(0).y + 46} texto="MENOS ENERGIA" p={prog(t, c.n_A, 0.5)} />
            </g>
            <Comodo {...barra(6)} p={prog(t, c.n_G - 0.35, 0.5, ease.out)} titulo="G" titleSize={40} tone={piores > 0.5 ? "warn" : "linha"} />
          </g>
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, ini, 0.35) * (1 - prog(t, c.k_mais - 0.6, 0.2))}>UMA NOTA DE <G>A</G> A <W>G</W></TituloFolha>
    </div>
  );
};

/* ------------------------------------------------ 3 · o calendário do aluguel ------------------------------------------------ */
const MARCOS = [{ x: 170, ano: "2025", L: "G" }, { x: 450, ano: "2028", L: "F" }, { x: 730, ano: "2034", L: "E" }];
const QUADRA = { x: 150, y: 150, w: 300, h: 230 };
const BIGQ = { x: 210, y: 177, w: 660, h: 506 };
export const Take2: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const ini = c.k_mais - 0.1;
  if (t < ini - 0.05) return null;
  const mg = prog(t, c.v_ouseja - 0.45, 0.55, ease.inOut);
  if (mg >= 1) return null;
  const m = mergulho(mg, TELA, BIGQ);
  const cues = [c.k_2025, c.k_2028, c.k_2034];
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans }}>
      <Camera drift={6} t={t} keys={[{ t: ini, s: 1.0 }, { t: c.k_aluguel, s: 1.04, x: 10, y: -8, e: ease.out }, { t: c.k_2034, s: 1.04, x: -16, y: -8, e: ease.inOut }]}>
        <Prancha top={TOP} h={900}>
          <g transform={m.transform} opacity={m.opacity}>
            <Contorno {...TELA} p={prog(t, ini, 0.7, ease.out)} />
            <Rot x={540} y={175} anchor="middle" texto="ALUGUEL · CONTRATO NOVO" p={prog(t, ini + 0.3, 0.5)} />
            <Tr d="M 160 300 L 920 300" p={prog(t, c.k_mais, 0.9, ease.out)} />
            {MARCOS.map((k, i) => {
              const at = cues[i];
              return (
                <g key={k.ano}>
                  <Tr d={`M ${k.x + 90} 284 L ${k.x + 90} 316`} p={prog(t, at - 0.2, 0.3)} />
                  <Rot x={k.x + 90} y={262} anchor="middle" texto={k.ano} p={prog(t, at - 0.15, 0.4)} cor={C.text} size={36} />
                  <Comodo x={k.x} y={360} w={180} h={250} p={prog(t, at - 0.3, 0.6, ease.out)} titulo={k.L} titleSize={64} tone={i === 2 ? "muted" : "warn"} />
                  <Porta x={k.x + 55} y={610} r={70} p={prog(t, (i === 0 ? c.k_contrato : at + 0.4) - 0.1, 0.5)} aberta={false} />
                </g>
              );
            })}
            <Chamada x={260} y={640} bx={180} by={790} bw={560} texto="SEM CONTRATO NOVO DE ALUGUEL" p={prog(t, c.k_aluguel - 0.4, 0.8) * (1 - prog(t, c.k_2028 - 0.2, 0.3))} tone="warn" />
            <Cota x1={730} x2={910} y={690} texto="A PRÓXIMA" p={prog(t, c.k_proxima - 0.3, 0.6, ease.out)} cor={C.text} />
          </g>
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, ini, 0.35) * (1 - prog(t, c.v_ouseja - 0.6, 0.2))}>ALUGUEL NOVO: <W>PROIBIDO</W></TituloFolha>
      <SeloPlanta texto="FRANÇA METROPOLITANA · SEGUNDO SERVICE-PUBLIC.FR" p={prog(t, c.k_2025, 0.4) * (1 - prog(t, c.v_ouseja - 0.6, 0.3))} />
    </div>
  );
};

/* ------------------------------------------------ 4 · lá × aqui: o custo que chega depois ------------------------------------------------ */
const BR = { x: 140, y: 450, w: 800, h: 400 };
const SALA = { x: 140, y: 450, w: 440, h: 400 };
export const Take3: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const ini = c.v_ouseja - 0.15;
  if (t < ini - 0.05) return null;
  const mg = prog(t, c.f_ninguem - 0.6, 0.55, ease.linear);
  if (mg >= 1) return null;
  const m = mergulho(mg, BR, TELA);
  const r = (at: number, d = 0.7) => prog(t, at - 0.3, d, ease.out);
  const coracao = prog(t, c.v_aqui + 0.5, 0.7, ease.out);
  const encolhe = prog(t, c.v_aqui - 0.35, 0.6, ease.inOut);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans }}>
      <Camera drift={6} t={t} keys={[{ t: ini, s: 1.0 }, { t: c.v_aqui, s: 1.02, y: -6, e: ease.inOut }, { t: c.v_apaixonou, s: 1.05, y: -12, e: ease.out }]}>
        <Prancha top={TOP} h={900}>
          <g transform={m.transform} opacity={m.opacity}>
            <g opacity={m.outros}>
              {/* lá: o anúncio francês (grande no "lá", encolhe para o canto no "Aqui"), com o custo na vitrine */}
              <g transform={`translate(${mix(540, 300, encolhe)} ${mix(430, 265, encolhe)}) scale(${mix(2.2, 1, encolhe)}) translate(-300 -265)`}>
              <Contorno {...QUADRA} p={1} />
              <Tr d={`M ${QUADRA.x + 20} ${QUADRA.y + 30} L ${QUADRA.x + QUADRA.w - 20} ${QUADRA.y + 30} L ${QUADRA.x + QUADRA.w - 20} ${QUADRA.y + 120} L ${QUADRA.x + 20} ${QUADRA.y + 120} Z`} p={1} cor={C.dim} />
              <Comodo x={QUADRA.x + 20} y={QUADRA.y + 140} w={QUADRA.w - 40} h={70} p={1} titulo="ENERGIA/ANO" titleSize={28} acende={prog(t, c.v_custo - 0.1, 0.4) * (1 - prog(t, c.v_aqui, 0.4))} />
              <Rot x={QUADRA.x + QUADRA.w / 2} y={QUADRA.y + QUADRA.h + 44} anchor="middle" texto="LÁ: NA VITRINE" p={prog(t, c.v_vitrine - 0.2, 0.4)} cor={C.text} />
              </g>
              {/* aqui: a planta brasileira */}
              <Contorno {...BR} p={r(c.v_aqui - 0.1, 0.9)} />
              <Comodo {...SALA} p={r(c.v_aqui, 0.8)} titulo="SALA" />
              <Comodo x={580} y={450} w={360} h={200} p={r(c.v_aqui + 0.2, 0.8)} titulo="QUARTO" />
              <Comodo x={580} y={650} w={360} h={200} p={r(c.v_aqui + 0.4, 0.8)} titulo="COZINHA" />
              <g transform="translate(0 50)"><Tr d="M 360 760 C 300 700 250 720 270 670 C 285 630 340 640 360 680 C 380 640 435 630 450 670 C 470 720 420 700 360 760 Z" p={coracao} w={TRACO * 1.4} /></g>
              <Rot x={520} y={210} texto="AQUI:" p={prog(t, c.v_aqui - 0.1, 0.4)} cor={C.text} size={34} />
              {[{ at: c.v_luz, txt: "CONTA DE LUZ", y: 240 }, { at: c.v_cond, txt: "CONDOMÍNIO", y: 320 }, { at: c.v_iptu, txt: "IPTU", y: 400 }].map((k) => (
                <Chamada key={k.txt} x={760} y={550} bx={620} by={k.y - 30} bw={300} texto={k.txt} p={prog(t, k.at - 0.35, 0.7)} tone="warn" />
              ))}
              <Cota x1={360} x2={760} y={880} texto="DEPOIS DA PAIXÃO" p={prog(t, c.v_apaixonou - 0.3, 0.7, ease.out)} cor={C.warn} />
            </g>
          </g>
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, ini, 0.35) * (1 - prog(t, c.f_ninguem - 0.65, 0.2))}>O CUSTO CHEGA <W>DEPOIS</W></TituloFolha>
    </div>
  );
};

/* ------------------------------------------------ 5 · o anúncio com o custo de morar antes ------------------------------------------------ */
export const Take4: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const ini = c.f_ninguem - 0.1;
  if (t < ini - 0.05 || t > c.cta_quer + 0.4) return null;
  const r = (at: number, d = 0.7) => prog(t, at - 0.3, d, ease.out);
  const sai = prog(t, c.cta_quer - 0.2, 0.5);
  const foto = prog(t, c.f_foto - 0.1, 0.4);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - sai }}>
      <Camera drift={6} t={t} keys={[{ t: ini, s: 1.0 }, { t: c.f_antes, s: 1.03, y: -10, e: ease.out }, { t: c.f_confianca, s: 1.06, y: -16, e: ease.out }]}>
        <Prancha top={TOP} h={900}>
          <Contorno {...TELA} p={prog(t, ini, 0.8, ease.out)} />
          <Rot x={540} y={170} anchor="middle" texto="SEU ANÚNCIO" p={prog(t, ini + 0.2, 0.5)} />
          <g opacity={1 - 0.55 * foto}>
            <Comodo x={160} y={200} w={760} h={240} p={r(ini + 0.1, 0.8)} titulo="" />
            <CasaElev cx={540} base={410} w={190} h={110} p={prog(t, ini + 0.2, 1.0, ease.out)} />
          </g>
          <Rot x={180} y={500} texto="PREÇO" p={r(ini + 0.3)} cor={C.text} size={34} />
          <Tr d="M 380 490 L 900 490" p={r(ini + 0.5)} cor={C.dim} />
          <Comodo x={160} y={540} w={760} h={180} p={r(c.f_corretor - 0.1, 0.8)} titulo="CUSTO DE MORAR" sub="CONDOMÍNIO · IPTU · LUZ (MÉDIA)" acende={prog(t, c.f_antes - 0.05, 0.4)} titleSize={42} />
          <Chamada x={540} y={360} bx={600} by={20} bw={330} texto="FOTO NENHUMA DÁ" p={prog(t, c.f_foto - 0.3, 0.7)} tone="linha" />
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, ini, 0.35)}>O CUSTO DE MORAR, <G>ANTES</G></TituloFolha>
      <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
        <Carimbo x={310} y={1110} w={460} projeto="CONFIANÇA" folha="ILUSTRATIVO · ATIVO" p={sp(t, c.f_confianca - 0.1, { damping: 12, stiffness: 200 })} />
      </svg>
    </div>
  );
};
