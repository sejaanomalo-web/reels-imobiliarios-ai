import React from "react";
import { C, F } from "../../../theme";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A } from "../../NOV26/kit";
import {
  Chamada, Comodo, Contorno, Cota, Prancha, Rota, SeloPlanta, TituloFolha,
  clamp01, ease, mergulho, prog,
} from "../../../estilos/planta";

/**
 * ATIVO-D1211-12 — "Noventa ou dez" (grade 11/12/2026 · 12h · FORA DA BOLHA · Planta técnica v2).
 * Folha 1: dois cômodos com o mesmo dado — 90% DÁ CERTO × 10% DÁ ERRADO → 1982, o mesmo tratamento, dois jeitos → a barra
 * de quem escolheu a cirurgia sobe mais do lado "sobreviver" → "o número era o mesmo" → Folha 2: a proposta com o lado do
 * ganho aceso e o resto à vista → o número informa, a frase decide. Apuração: McNeil, Pauker, Sox & Tversky (1982), NEJM.
 * Sem percentuais de escolha (só a direção do efeito).
 */
const M = "JetBrains Mono";
const TOP = 380;
const fade = (p: number) => clamp01(p * 1.5);
const TELA = { x: 120, y: 120, w: 840, h: 640 };
const G: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: A.hex }}>{children}</span>;
const W: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: C.warn }}>{children}</span>;
const Rot: React.FC<{ x: number; y: number; texto: string; p: number; cor?: string; size?: number }> = ({ x, y, texto, p, cor = C.muted, size = 26 }) => (
  <text x={x} y={y} textAnchor="middle" fill={cor} fontFamily={M} fontWeight={700} fontSize={size} letterSpacing="0.12em" opacity={fade(p)}>{texto}</text>
);

/* ------------------------------------------------ 1 · os dois jeitos ------------------------------------------------ */
export const Folhas: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const mg = prog(t, c.a_proposta - 0.7, 0.6, ease.linear);
  if (mg >= 1) return null;
  const ALVO = { x: 160, y: 220, w: 340, h: 200 };
  const m = mergulho(mg, ALVO, TELA);
  const barraA = prog(t, c.r_mais - 0.3, 0.9, ease.out);
  const barraB = prog(t, c.r_morrer - 0.3, 0.9, ease.out);
  const mesmo = prog(t, c.v_mesmo - 0.2, 0.4);
  const hA = 30 + 180 * barraA, hB = 30 + 80 * barraB;
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans }}>
      <Camera drift={6} t={t} keys={[{ t: 0, s: 1.05, y: -8 }, { t: c.h_melhor, s: 1.0, e: ease.out }, { t: c.r_sobreviver, s: 1.03, y: -8, e: ease.inOut }, { t: c.v_mesmo, s: 1.05, y: -12, e: ease.out }]}>
        <Prancha top={TOP} h={900}>
          <g transform={m.transform} opacity={m.opacity}>
          <g opacity={m.outros}>
          <Contorno {...TELA} p={prog(t, -0.1, 0.9, ease.out)} />
          <Rot x={540} y={168} texto={t > c.e_1982 - 0.2 ? "O MESMO TRATAMENTO · DOIS JEITOS" : "O MESMO DADO · DOIS JEITOS"} p={prog(t, 0.2, 0.5) * (1 - mesmo)} />
          <Comodo x={580} y={220} w={340} h={200} p={prog(t, c.h_dez - 0.2, 0.5, ease.out)} titulo="10%" sub="DÁ ERRADO" titleSize={52} tone="warn" />
          <Rot x={540} y={462} texto="QUEM ESCOLHEU A CIRURGIA" p={prog(t, c.r_mais - 0.4, 0.4)} cor={C.text} />
          <Comodo x={220} y={700 - hA} w={220} h={hA} p={prog(t, c.r_sobreviver - 0.2, 0.4, ease.out)} titulo={barraA > 0.5 ? "MAIS" : ""} titleSize={26} acende={barraA * 0.55} />
          <Comodo x={640} y={700 - hB} w={220} h={hB} p={prog(t, c.r_morrer - 0.3, 0.4, ease.out)} titulo={barraB > 0.5 ? "MENOS" : ""} titleSize={24} tone="warn" />
          <Rot x={330} y={738} texto="“SOBREVIVER”" p={prog(t, c.r_sobreviver - 0.1, 0.4)} cor={A.hex} />
          <Rot x={750} y={738} texto="“MORRER”" p={prog(t, c.r_morrer - 0.1, 0.4)} cor={C.warn} />
          <Cota x1={160} x2={920} y={470} texto="QUAL PARECE MELHOR?" p={prog(t, c.h_melhor - 0.2, 0.4) * (1 - prog(t, c.e_1982 - 0.3, 0.3))} cor={C.text} />
          <Chamada x={540} y={320} bx={250} by={134} bw={580} texto="O NÚMERO ERA O MESMO" p={mesmo} tone="warn" />
          </g>
          <Comodo {...ALVO} p={prog(t, c.h_noventa - 0.1, 0.5, ease.out)} titulo="90%" sub="DÁ CERTO" titleSize={52} acende={Math.max(prog(t, c.h_certo - 0.1, 0.4) * 0.5, mg * 0.6)} />
          </g>
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, -0.3, 0.4) * (1 - prog(t, c.e_1982 - 0.5, 0.2))} size={60}><G>90%</G> OU <W>10%</W>?</TituloFolha>
      <TituloFolha p={prog(t, c.e_1982 - 0.3, 0.35) * (1 - prog(t, c.r_sobreviver - 0.5, 0.2))} size={56}>1982 · <G>O MESMO TRATAMENTO</G></TituloFolha>
      <TituloFolha p={prog(t, c.r_sobreviver - 0.3, 0.35) * (1 - prog(t, c.v_mesmo - 0.5, 0.2))} size={56}><G>SOBREVIVER</G> × <W>MORRER</W></TituloFolha>
      <TituloFolha p={prog(t, c.v_mesmo - 0.3, 0.35) * (1 - prog(t, c.a_proposta - 0.7, 0.2))} size={56}>MUDOU SÓ <G>O JEITO DE DIZER</G></TituloFolha>
      <SeloPlanta texto="MCNEIL, PAUKER, SOX & TVERSKY · 1982" p={prog(t, c.e_1982 - 0.1, 0.4) * (1 - prog(t, c.a_proposta - 0.7, 0.3))} />
    </div>
  );
};

/* ------------------------------------------------ 2 · a proposta ------------------------------------------------ */
export const Proposta: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const ini = c.a_proposta - 0.15;
  if (t < ini - 0.05 || t > c.cta_quer + 0.4) return null;
  const sai = prog(t, c.cta_quer - 0.2, 0.5);
  const fim = prog(t, c.f_decide - 0.2, 0.4);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(prog(t, ini, 0.35), 1 - sai) }}>
      <Camera drift={6} t={t} keys={[{ t: ini, s: 1.0 }, { t: c.a_ganha, s: 1.03, y: -8, e: ease.out }, { t: c.f_decide, s: 1.06, y: -14, e: ease.out }]}>
        <Prancha top={TOP} h={900}>
          <Contorno {...TELA} p={prog(t, ini, 0.6, ease.out)} />
          <Rot x={540} y={168} texto="PROJETO: A PROPOSTA" p={prog(t, ini + 0.2, 0.5)} />
          <Comodo x={170} y={210} w={740} h={180} p={prog(t, ini + 0.2, 0.5, ease.out)} titulo="O QUE VOCÊ GANHA" titleSize={36} acende={prog(t, c.a_ganha - 0.15, 0.4) * 0.65} />
          <Rota id="prop" d="M540 390 L540 460" p={prog(t, c.a_vista - 0.5, 0.4, ease.linear)} />
          <Comodo x={170} y={460} w={740} h={180} p={prog(t, ini + 0.35, 0.5, ease.out)} titulo="E O RESTO, À VISTA" titleSize={34} tone={t > c.a_vista - 0.2 ? "linha" : "muted"} acende={prog(t, c.a_vista - 0.1, 0.4) * 0.25} />
          <Cota x1={170} x2={910} y={690} texto="O NÚMERO INFORMA · A FRASE DECIDE" p={prog(t, c.f_informa - 0.2, 0.4)} cor={fim > 0.5 ? A.hex : C.text} />
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, ini, 0.35) * (1 - prog(t, c.f_informa - 0.5, 0.2))} size={56}>MOSTRE <G>O GANHO</G></TituloFolha>
      <TituloFolha p={prog(t, c.f_informa - 0.3, 0.35)} size={56}>A FRASE <G>DECIDE</G></TituloFolha>
    </div>
  );
};
