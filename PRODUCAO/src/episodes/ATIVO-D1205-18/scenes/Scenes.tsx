import React from "react";
import { C, F } from "../../../theme";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A } from "../../NOV26/kit";
import {
  Chamada, Comodo, Contorno, Cota, Prancha, SeloPlanta, TituloFolha,
  clamp01, ease, mergulho, prog,
} from "../../../estilos/planta";

/**
 * ATIVO-D1205-18 — "A terceira opção" (grade 05/12/2026 · 18h · FORA DA BOLHA · Planta técnica v2).
 * Folhas: três opções, a do meio com 0% e a terceira acesa → mergulho no experimento: só digital US$ 59 × impressa+digital
 * US$ 125, a maioria no digital → entra a impressa sozinha a US$ 125: ninguém escolhe, 84% vão para a combinada → mergulho
 * na aplicação: imóveis em grupos lado a lado, referência honesta, o certo acende → fecho.
 * Apuração: Ariely, 'Previsivelmente Irracional' (2008), ~100 estudantes; nome da revista omitido.
 */
const M = "JetBrains Mono";
const TOP = 380;
const fade = (p: number) => clamp01(p * 1.5);
const TELA = { x: 120, y: 120, w: 840, h: 640 };
const W: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: C.warn }}>{children}</span>;
const G: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: A.hex }}>{children}</span>;
const Rot: React.FC<{ x: number; y: number; texto: string; p: number; cor?: string; size?: number }> = ({ x, y, texto, p, cor = C.muted, size = 26 }) => (
  <text x={x} y={y} textAnchor="middle" fill={cor} fontFamily={M} fontWeight={700} fontSize={size} letterSpacing="0.12em" opacity={fade(p)}>{texto}</text>
);
const COL = (i: number) => ({ x: 150 + i * 270, y: 250, w: 240, h: 300 });

/* ------------------------------------------------ 1 · três opções ------------------------------------------------ */
export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const mg = prog(t, c.t_digital - 2.6, 0.6, ease.linear);
  if (mg >= 1) return null;
  const m = mergulho(mg, COL(1), TELA);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans }}>
      <Camera drift={6} t={t} keys={[{ t: 0, s: 1.05, y: -8 }, { t: c.h_ninguem, s: 1.0, e: ease.out }, { t: c.h_todo, s: 1.05, y: -14, e: ease.inOut }]}>
        <Prancha top={TOP} h={900}>
          <g transform={m.transform} opacity={m.opacity}>
            <g opacity={m.outros}>
              <Contorno {...TELA} p={prog(t, -0.1, 0.9, ease.out)} />
              <Rot x={540} y={175} texto="TRÊS OPÇÕES" p={prog(t, 0.2, 0.5)} />
              <Comodo {...COL(0)} p={prog(t, 0.1, 0.5, ease.out)} titulo="OPÇÃO A" titleSize={30} tone="muted" />
              <Comodo {...COL(2)} p={prog(t, 0.3, 0.5, ease.out)} titulo="OPÇÃO C" titleSize={30} acende={prog(t, c.h_todo - 0.1, 0.4)} />
              <Cota x1={690} x2={930} y={600} texto="QUASE TODOS" p={prog(t, c.h_todo - 0.1, 0.4)} cor={C.text} />
            </g>
            <Comodo {...COL(1)} p={prog(t, 0.2, 0.5, ease.out)} titulo="OPÇÃO B" sub={t > c.h_ninguem - 0.1 ? "0%" : ""} titleSize={30} tone={t > c.h_ninguem - 0.1 ? "warn" : "linha"} />
          </g>
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, -0.3, 0.4) * (1 - prog(t, c.t_digital - 2.6, 0.2))} size={56}>A OPÇÃO QUE <W>NINGUÉM ESCOLHEU</W></TituloFolha>
    </div>
  );
};

/* ------------------------------------------------ 2–3 · o experimento ------------------------------------------------ */
const COMB = { x: 690, y: 250, w: 240, h: 300 };
export const Teste: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const ini = c.t_digital - 2.7;
  if (t < ini - 0.05) return null;
  const mg = prog(t, c.a_comparacao - 0.7, 0.6, ease.linear);
  if (mg >= 1) return null;
  const m = mergulho(mg, COMB, TELA);
  const tres = prog(t, c.v_impressa - 0.2, 0.5);
  const maioria = prog(t, c.t_maioria - 0.1, 0.4) * (1 - tres);
  const v84 = prog(t, c.v_84 - 0.2, 0.5);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans }}>
      <Camera drift={6} t={t} keys={[{ t: ini, s: 1.0 }, { t: c.t_125, s: 1.03, y: -8, e: ease.out }, { t: c.v_impressa, s: 1.0, e: ease.inOut }, { t: c.v_combinada, s: 1.05, y: -14, e: ease.out }]}>
        <Prancha top={TOP} h={900}>
          <g transform={m.transform} opacity={m.opacity}>
            <g opacity={m.outros}>
              <Contorno {...TELA} p={prog(t, ini, 0.7, ease.out)} />
              <Rot x={540} y={175} texto="ASSINATURA DE UMA REVISTA · ESTUDANTES" p={prog(t, ini + 0.2, 0.5)} />
              <Comodo {...COL(0)} p={prog(t, ini + 0.4, 0.5, ease.out)} titulo="SÓ DIGITAL" sub="US$ 59" titleSize={30} acende={maioria} />
              <Cota x1={150} x2={390} y={600} texto="A MAIORIA" p={maioria} cor={C.text} />
              <Comodo {...COL(1)} p={tres} titulo="SÓ IMPRESSA" sub="US$ 125" titleSize={30} tone={t > c.v_ninguem - 0.1 ? "warn" : "linha"} />
              <Chamada x={540} y={560} bx={300} by={660} bw={480} texto="NINGUÉM ESCOLHEU" p={prog(t, c.v_ninguem - 0.1, 0.4)} tone="warn" />
              <Cota x1={690} x2={930} y={600} texto="84%" p={v84} cor={C.text} />
            </g>
            <Comodo {...COMB} p={prog(t, ini + 0.7, 0.5, ease.out)} titulo="IMPRESSA + DIGITAL" sub="US$ 125" titleSize={26} acende={v84} />
          </g>
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, ini, 0.35) * (1 - prog(t, c.v_impressa - 0.4, 0.2))} size={56}>DUAS OPÇÕES: <G>A MAIORIA</G> NO DIGITAL</TituloFolha>
      <TituloFolha p={prog(t, c.v_impressa - 0.3, 0.35) * (1 - prog(t, c.a_comparacao - 0.7, 0.2))} size={56}>TRÊS OPÇÕES: <G>84%</G> NA COMBINADA</TituloFolha>
      <SeloPlanta texto="EXPERIMENTO DESCRITO POR DAN ARIELY · ~100 ESTUDANTES" p={prog(t, ini + 0.3, 0.4) * (1 - prog(t, c.a_comparacao - 0.7, 0.3))} />
    </div>
  );
};

/* ------------------------------------------------ 4 · lado a lado ------------------------------------------------ */
export const Aplica: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const ini = c.a_comparacao - 0.15;
  if (t < ini - 0.05 || t > c.cta_quer + 0.4) return null;
  const sai = prog(t, c.cta_quer - 0.2, 0.5);
  const certo = prog(t, c.f_certo - 0.2, 0.4);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(prog(t, ini, 0.35), 1 - sai) }}>
      <Camera drift={6} t={t} keys={[{ t: ini, s: 1.0 }, { t: c.a_lado, s: 1.03, y: -8, e: ease.out }, { t: c.f_certo, s: 1.06, y: -14, e: ease.out }]}>
        <Prancha top={TOP} h={900}>
          <Contorno {...TELA} p={prog(t, ini, 0.6, ease.out)} />
          <Rot x={540} y={175} texto="A SUA APRESENTAÇÃO" p={prog(t, ini + 0.2, 0.5)} />
          {[0, 1, 2].map((i) => (
            <Comodo key={i} {...COL(i)} p={prog(t, ini + 0.2 + i * 0.15, 0.5, ease.out)} titulo={`IMÓVEL ${["A", "B", "C"][i]}`} sub={i === 0 ? "REFERÊNCIA" : ""} titleSize={30}
              tone={i === 0 ? "muted" : "linha"} acende={i === 2 ? certo : 0} />
          ))}
          <Cota x1={150} x2={930} y={600} texto="LADO A LADO" p={prog(t, c.a_lado - 0.2, 0.5)} cor={C.text} />
          <Chamada x={270} y={560} bx={150} by={670} bw={420} texto="REFERÊNCIA HONESTA" p={prog(t, c.f_honesta - 0.2, 0.5)} tone="accent" />
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, ini, 0.35) * (1 - prog(t, c.f_honesta - 0.4, 0.2))} size={56}>A <G>COMPARAÇÃO</G> MUDA O VALOR</TituloFolha>
      <TituloFolha p={prog(t, c.f_honesta - 0.3, 0.35)} size={56}>E O CLIENTE VÊ <G>O CERTO</G></TituloFolha>
    </div>
  );
};
