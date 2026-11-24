import React from "react";
import { C, F } from "../../../theme";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A } from "../../NOV26/kit";
import {
  Chamada, Comodo, Contorno, Cota, LINHA, Porta, Prancha, Rota, SeloPlanta, TituloFolha, TRACO,
  clamp01, ease, mergulho, prog, sp,
} from "../../../estilos/planta";

/**
 * ATIVO-D1201-12 — "A nota fiscal do aluguel" (grade 01/12/2026 · 12h · AGORA · Planta técnica v2).
 * Folhas: o prédio de aluguel e a nota na porta (só uma unidade fica firme: "não para todo mundo") → o calendário
 * (01/12/2026, NFS-e de locação) → quem emite: EMPRESA (acende) · SIMPLES (01/2027) · PESSOA FÍSICA (R$ 240 mil/ano ·
 * +3 imóveis · leitura divergente) → DEPENDE DE QUEM ALUGA: as 4 perguntas e a rota até o CONTADOR → fecho.
 * Apuração: Ato Conjunto RFB/CGIBS nº 4/2026; LC 214/2025; divergência sobre a pessoa física; risco de adiamento registrado.
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
const Rot: React.FC<{ x: number; y: number; texto: string; p: number; cor?: string; size?: number; anchor?: "start" | "middle" | "end" }> = ({ x, y, texto, p, cor = C.muted, size = 26, anchor = "start" }) => (
  <text x={x} y={y} textAnchor={anchor} fill={cor} fontFamily={M} fontWeight={700} fontSize={size} letterSpacing="0.12em" opacity={fade(p)}>{texto}</text>
);
/** Folha de nota fiscal em linha (retângulo, linhas e "R$"). Topo-esquerdo em (x, y). */
const Nota: React.FC<{ x: number; y: number; w?: number; h?: number; p: number; cor?: string }> = ({ x, y, w = 150, h = 190, p, cor = LINHA }) => (
  <g opacity={fade(p)}>
    <Tr d={`M ${x} ${y} L ${x + w} ${y} L ${x + w} ${y + h} L ${x} ${y + h} Z`} p={p} cor={cor} />
    {[0, 1, 2].map((i) => <Tr key={i} d={`M ${x + 20} ${y + 40 + i * 30} L ${x + w - 20 - (i === 2 ? 40 : 0)} ${y + 40 + i * 30}`} p={(p - 0.3) / 0.7} cor={cor} w={TRACO * 0.67} />)}
    <text x={x + w / 2} y={y + h - 26} textAnchor="middle" fill={cor} fontFamily={M} fontWeight={700} fontSize={28} opacity={fade((p - 0.6) / 0.4)}>NFS-e</text>
  </g>
);

/* ------------------------------------------------ 1 · o prédio de aluguel e a nota ------------------------------------------------ */
const UN = [{ x: 170, y: 200 }, { x: 410, y: 200 }, { x: 650, y: 200 }];
const NOTA = { x: 430, y: 470, w: 220, h: 260 };
export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const mg = prog(t, c.r_calendario - 0.5, 0.55, ease.linear);
  if (mg >= 1) return null;
  const m = mergulho(mg, NOTA, TELA);
  const nao = prog(t, c.h_nao - 0.1, 0.4);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans }}>
      <Camera drift={6} t={t} keys={[{ t: 0, s: 1.02 }, { t: c.h_nota, s: 1.04, y: -10, e: ease.out }, { t: c.r_calendario, s: 1.06, y: -14, e: ease.linear }]}>
        <Prancha top={TOP} h={900}>
          <g transform={m.transform} opacity={m.opacity}>
            <g opacity={m.outros}>
              <Contorno {...TELA} p={prog(t, -0.1, 0.9, ease.out)} />
              <Rot x={540} y={170} anchor="middle" texto="PRÉDIO DE ALUGUEL · PLANTA" p={prog(t, 0.2, 0.5)} />
              {UN.map((u, i) => (
                <Comodo key={i} x={u.x} y={u.y} w={220} h={220} p={prog(t, 0.1 + i * 0.18, 0.7, ease.out)} titulo={`APTO ${i + 1}`} titleSize={34}
                  tone={i === 1 || nao < 0.5 ? "linha" : "muted"} acende={i === 1 ? nao : 0} />
              ))}
              <Rota id="nota" d="M 520 420 L 520 470" p={prog(t, c.h_nota - 0.2, 0.4)} tom="linha" />
              <Rot x={540} y={790} anchor="middle" texto="NÃO PARA TODO MUNDO" p={nao} cor={C.text} size={30} />
            </g>
            <Nota x={NOTA.x + 35} y={NOTA.y + 30} p={prog(t, c.h_nota - 0.35, 0.8, ease.out)} />
          </g>
        </Prancha>
      </Camera>
      <TituloFolha p={sp(t, -0.3, { damping: 14, stiffness: 160 }) * (1 - prog(t, c.r_calendario - 0.6, 0.2))} size={54}>ALUGUEL NA <G>NOTA FISCAL</G></TituloFolha>
    </div>
  );
};

/* ------------------------------------------------ 2 · o calendário oficial ------------------------------------------------ */
export const Take1: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const ini = c.r_calendario - 0.1;
  if (t < ini - 0.05) return null;
  const mg = prog(t, c.e_empresa - 0.55, 0.55, ease.linear);
  if (mg >= 1) return null;
  const m = mergulho(mg, { x: 280, y: 450, w: 520, h: 220 }, TELA);
  const carimbo = sp(t, c.r_dezembro - 0.1, { damping: 10, stiffness: 220 });
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans }}>
      <Camera drift={6} t={t} keys={[{ t: ini, s: 1.0 }, { t: c.r_dezembro, s: 1.03, y: -8, e: ease.out }, { t: c.r_eletronica, s: 1.05, y: -12, e: ease.out }]}>
        <Prancha top={TOP} h={900}>
          <g transform={m.transform} opacity={m.opacity}>
            <g opacity={m.outros}>
            <Contorno {...TELA} p={prog(t, ini, 0.7, ease.out)} />
            <Rot x={540} y={170} anchor="middle" texto="REFORMA TRIBUTÁRIA · CALENDÁRIO" p={prog(t, ini + 0.2, 0.5)} />
            <Tr d="M 170 330 L 910 330" p={prog(t, c.r_reforma - 0.2, 0.8, ease.out)} />
            {[{ x: 260, txt: "07/2026", at: c.r_reforma }, { x: 540, txt: "01/12/2026", at: c.r_dezembro }, { x: 820, txt: "01/2027", at: c.r_eletronica + 0.3 }].map((k, i) => (
              <g key={k.txt}>
                <Tr d={`M ${k.x} 312 L ${k.x} 348`} p={prog(t, k.at - 0.2, 0.3)} cor={i === 1 ? A.hex : LINHA} />
                <Rot x={k.x} y={300} anchor="middle" texto={k.txt} p={prog(t, k.at - 0.15, 0.4)} cor={i === 1 ? A.hex : C.muted} size={i === 1 ? 34 : 26} />
              </g>
            ))}
            <Rot x={260} y={390} anchor="middle" texto="ATO PUBLICADO" p={prog(t, c.r_reforma, 0.4)} size={24} />
            <Rot x={820} y={390} anchor="middle" texto="SIMPLES" p={prog(t, c.r_eletronica + 0.3, 0.4)} size={24} />
            </g>
            <g opacity={fade(carimbo)} transform={`translate(540 560) rotate(-6) scale(${1 + 0.4 * (1 - Math.min(1, carimbo))})`}>
              <Comodo x={-260} y={-110} w={520} h={220} p={1} titulo="NFS-e" sub="LOCAÇÃO DE IMÓVEL" titleSize={56} acende={prog(t, c.r_eletronica - 0.1, 0.4)} />
            </g>
          </g>
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, ini, 0.35) * (1 - prog(t, c.e_empresa - 0.6, 0.2))} size={54}>DESDE <G>1º DE DEZEMBRO</G></TituloFolha>
      <SeloPlanta texto="SEGUNDO ATO CONJUNTO RFB/CGIBS Nº 4/2026" p={prog(t, c.r_dezembro, 0.4) * (1 - prog(t, c.e_empresa - 0.6, 0.3))} />
    </div>
  );
};

/* ------------------------------------------------ 3 · quem emite ------------------------------------------------ */
const ROW = { x: 160, w: 760 };
export const Take2: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const ini = c.e_empresa - 0.2;
  if (t < ini - 0.05) return null;
  const mg = prog(t, c.v_ouseja - 0.5, 0.55, ease.linear);
  if (mg >= 1) return null;
  const m = mergulho(mg, { x: ROW.x, y: 540, w: ROW.w, h: 200 }, TELA);
  const r = (at: number, d = 0.7) => prog(t, at - 0.3, d, ease.out);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans }}>
      <Camera drift={6} t={t} keys={[{ t: ini, s: 1.0 }, { t: c.e_simples, s: 1.02, y: -6, e: ease.inOut }, { t: c.p_fisica, s: 1.04, y: -40, e: ease.inOut }, { t: c.p_divergencia, s: 1.06, y: -50, e: ease.out }]}>
        <Prancha top={TOP} h={900}>
          <g transform={m.transform} opacity={m.opacity}>
          <g opacity={m.outros}>
          <Contorno {...TELA} p={prog(t, ini, 0.7, ease.out)} />
          <Rot x={540} y={170} anchor="middle" texto="QUEM EMITE A NOTA DO ALUGUEL" p={prog(t, ini + 0.2, 0.5)} />
          <Comodo x={ROW.x} y={200} w={ROW.w} h={150} p={r(c.e_empresa)} titulo="EMPRESA" sub="SEM PISO · SEM MÍNIMO DE IMÓVEIS" acende={prog(t, c.e_emite - 0.05, 0.4)} titleSize={40} />
          <Porta x={ROW.x + 640} y={350} r={60} p={r(c.e_emite)} aberta />
          <Comodo x={ROW.x} y={380} w={ROW.w} h={130} p={r(c.e_simples)} titulo="SIMPLES NACIONAL" titleSize={34} tone="muted" />
          <Cota x1={ROW.x + 440} x2={ROW.x + 740} y={492} texto="A PARTIR DE 01/2027" p={r(c.e_2027 - 0.2)} cor={C.text} />
          <Cota x1={ROW.x + 30} x2={ROW.x + 380} y={722} texto="+ R$ 240 MIL/ANO" p={r(c.p_240)} cor={C.text} />
          <Cota x1={ROW.x + 410} x2={ROW.x + 730} y={722} texto="+ 3 IMÓVEIS" p={r(c.p_tres)} cor={C.text} />
          <Chamada x={ROW.x + 600} y={560} bx={520} by={790} bw={400} texto="LEITURA DIVERGENTE" p={prog(t, c.p_divergencia - 0.3, 0.7)} tone="warn" />
          </g>
          <Comodo x={ROW.x} y={540} w={ROW.w} h={200} p={r(c.p_fisica)} titulo="PESSOA FÍSICA" titleSize={36} tone={prog(t, c.p_divergencia, 0.3) > 0.5 ? "warn" : "linha"} />
          </g>
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, ini, 0.35) * (1 - prog(t, c.p_fisica - 0.3, 0.2))} size={54}>QUEM <G>EMITE</G>?</TituloFolha>
      <TituloFolha p={prog(t, c.p_fisica - 0.1, 0.35) * (1 - prog(t, c.v_ouseja - 0.6, 0.2))} size={54}>E A <W>PESSOA FÍSICA</W>?</TituloFolha>
    </div>
  );
};

/* ------------------------------------------------ 4 · depende: a pergunta certa ------------------------------------------------ */
const PERG = ["É EMPRESA?", "É DO SIMPLES?", "QUANTOS IMÓVEIS?", "QUANTO POR ANO?"];
export const Take3: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const ini = c.v_ouseja - 0.2;
  if (t < ini - 0.05 || t > c.cta_quer + 0.4) return null;
  const sai = prog(t, c.cta_quer - 0.2, 0.5);
  const ats = [c.v_ouseja + 0.4, c.v_perguntar - 0.3, c.v_perguntar + 0.6, c.v_depende];
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - sai }}>
      <Camera drift={6} t={t} keys={[{ t: ini, s: 1.0 }, { t: c.v_depende, s: 1.03, y: -10, e: ease.out }, { t: c.f_indicar, s: 1.05, y: -16, e: ease.out }]}>
        <Prancha top={TOP} h={900}>
          <Contorno {...TELA} p={prog(t, ini, 0.7, ease.out)} />
          <Rot x={540} y={170} anchor="middle" texto="A CONVERSA COM O PROPRIETÁRIO" p={prog(t, ini + 0.2, 0.5)} />
          {PERG.map((q, i) => (
            <Comodo key={q} x={160} y={200 + i * 110} w={440} h={90} p={prog(t, ats[i] - 0.3, 0.6, ease.out)} titulo={q} titleSize={30}
              acende={prog(t, c.f_pergunta - 0.05 + i * 0.22, 0.2) * (1 - prog(t, c.f_pergunta + 0.17 + i * 0.22, 0.2))} />
          ))}
          <Rota id="contador" d="M 600 445 L 700 445 L 700 600" p={prog(t, c.f_indicar - 0.3, 0.7, ease.out)} tom="accent" />
          <Comodo x={640} y={600} w={280} h={140} p={prog(t, c.f_contador - 0.3, 0.7, ease.out)} titulo="CONTADOR" titleSize={34} acende={prog(t, c.f_indicar, 0.4)} />
          <Rot x={780} y={580} anchor="middle" texto="QUEM RESPONDE" p={prog(t, c.f_indicar, 0.4)} size={24} />
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, ini, 0.35) * (1 - prog(t, c.f_contador - 0.3, 0.2))} size={54}><W>DEPENDE</W> DE QUEM ALUGA</TituloFolha>
      <TituloFolha p={prog(t, c.f_contador - 0.1, 0.35)} size={54}>A <G>PERGUNTA CERTA</G></TituloFolha>
      <SeloPlanta texto="INFORMATIVO · NÃO É ORIENTAÇÃO CONTÁBIL" p={prog(t, c.v_depende, 0.4)} />
    </div>
  );
};
