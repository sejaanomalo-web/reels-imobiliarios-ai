import React from "react";
import { C, F } from "../../../theme";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A } from "../../NOV26/kit";
import {
  Comodo, Contorno, Cota, Prancha, SeloPlanta, TituloFolha,
  clamp01, ease, mergulho, prog,
} from "../../../estilos/planta";

/**
 * ATIVO-D1214-08 — "A metragem do anúncio" (grade 14/12/2026 · 08h · E SE…? · Planta técnica v2).
 * Folha 1: a planta de um apartamento com a cota ÁREA ANUNCIADA → a cota ÁREA REAL se desenha mais curta e a faixa que
 * não existe fica vermelha → França (lei Carrez): mais de 5% a menos, o preço cai na proporção → Brasil (CC art. 500):
 * venda pela medida, acima de 1/20 pode virar abatimento → a cota anunciada acende: PROMESSA → mergulho na SALA →
 * Folha 2: a conferência (matrícula, planta, de onde veio o número) → sem surpresa. Sem número de metros.
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

/* ------------------------------------------------ 1 · o anúncio ------------------------------------------------ */
export const Anuncio: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const mg = prog(t, c.a_matricula - 0.8, 0.6, ease.linear);
  if (mg >= 1) return null;
  const SALA = { x: 160, y: 200, w: 360, h: 240 };
  const m = mergulho(mg, SALA, TELA);
  const err = prog(t, c.h_errada - 0.2, 0.4);
  const fr = prog(t, c.f_franca - 0.2, 0.4);
  const br = prog(t, c.b_brasil - 0.2, 0.4);
  const prom = prog(t, c.v_promessa - 0.2, 0.4);
  const real = t < c.f_cinco - 0.2 ? "ÁREA REAL" : t < c.f_preco - 0.2 ? "MAIS DE 5% A MENOS" : t < c.b_vigesimo - 0.2 ? "PREÇO CAI NA PROPORÇÃO" : t < c.b_abatimento - 0.2 ? "ACIMA DE 1/20" : "PODE VIRAR ABATIMENTO";
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans }}>
      <Camera drift={6} t={t} keys={[{ t: 0, s: 1.05, y: -8 }, { t: c.h_errada, s: 1.0, e: ease.out }, { t: c.f_preco, s: 1.03, y: -8, e: ease.inOut }, { t: c.b_abatimento, s: 1.0, e: ease.inOut }, { t: c.v_promessa, s: 1.05, y: -12, e: ease.out }]}>
        <Prancha top={TOP} h={900}>
          <g transform={m.transform} opacity={m.opacity}>
            <g opacity={m.outros}>
              <Contorno {...TELA} p={prog(t, -0.1, 0.9, ease.out)} />
              <Rot x={540} y={168} texto="APARTAMENTO · O ANÚNCIO" p={prog(t, 0.2, 0.5)} />
              <Comodo x={520} y={200} w={280} h={240} p={prog(t, 0.3, 0.5, ease.out)} titulo="QUARTO" titleSize={30} />
              <Comodo x={160} y={440} w={220} h={180} p={prog(t, 0.45, 0.5, ease.out)} titulo="COZINHA" titleSize={28} />
              <Comodo x={380} y={440} w={140} h={180} p={prog(t, 0.55, 0.5, ease.out)} titulo="BANHO" titleSize={26} />
              <Comodo x={520} y={440} w={280} h={180} p={prog(t, 0.65, 0.5, ease.out)} titulo="QUARTO" titleSize={30} />
              <Comodo x={800} y={200} w={120} h={420} p={err} titulo="" tone="warn" />
              <Rot x={860} y={420} texto="NÃO" p={err} cor={C.warn} size={24} />
              <Rot x={860} y={450} texto="EXISTE" p={err} cor={C.warn} size={24} />
              <Cota x1={160} x2={920} y={672} texto={prom > 0.5 ? "ÁREA ANUNCIADA = PROMESSA" : "ÁREA ANUNCIADA"} p={prog(t, c.h_metragem - 0.2, 0.5)} cor={prom > 0.5 ? A.hex : C.muted} />
              <Cota x1={160} x2={800} y={730} texto={real} p={err} cor={C.warn} />
            </g>
            <Comodo {...SALA} p={prog(t, 0.2, 0.5, ease.out)} titulo="SALA" titleSize={34} acende={Math.max(prom * 0.4, mg * 0.6)} />
          </g>
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, -0.3, 0.4) * (1 - fr)} size={54}>E SE A <W>METRAGEM</W> ESTIVER ERRADA?</TituloFolha>
      <TituloFolha p={fr * (1 - br)} size={56}>NA FRANÇA, <G>É LEI</G></TituloFolha>
      <TituloFolha p={br * (1 - prog(t, c.v_detalhe - 0.3, 0.3))} size={56}>NO BRASIL, <G>PELA MEDIDA</G></TituloFolha>
      <TituloFolha p={prog(t, c.v_detalhe - 0.2, 0.35) * (1 - prog(t, c.a_matricula - 0.8, 0.2))} size={56}>METRAGEM É <G>PROMESSA</G></TituloFolha>
      <SeloPlanta texto="FRANÇA · LEI CARREZ (1996)" p={fr * (1 - br)} />
      <SeloPlanta texto="CÓDIGO CIVIL · ART. 500" p={br * (1 - prog(t, c.v_detalhe - 0.3, 0.3))} />
    </div>
  );
};

/* ------------------------------------------------ 2 · a conferência ------------------------------------------------ */
export const Confere: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const ini = c.a_matricula - 0.25;
  if (t < ini - 0.05 || t > c.cta_quer + 0.4) return null;
  const sai = prog(t, c.cta_quer - 0.2, 0.5);
  const fim = prog(t, c.d_surpresa - 0.2, 0.4);
  const ROWS: [number, string][] = [[c.a_matricula, "A MATRÍCULA"], [c.a_planta, "A PLANTA"], [c.a_numero, "DE ONDE VEIO O NÚMERO"]];
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(prog(t, ini, 0.35), 1 - sai) }}>
      <Camera drift={6} t={t} keys={[{ t: ini, s: 1.0 }, { t: c.a_numero, s: 1.03, y: -8, e: ease.out }, { t: c.d_surpresa, s: 1.06, y: -14, e: ease.out }]}>
        <Prancha top={TOP} h={900}>
          <Contorno {...TELA} p={prog(t, ini, 0.6, ease.out)} />
          <Rot x={540} y={168} texto="ANTES DE ANUNCIAR: CONFERIR" p={prog(t, ini + 0.2, 0.5)} />
          {ROWS.map(([at, s], i) => (
            <Comodo key={s} x={170} y={210 + i * 150} w={740} h={120} p={prog(t, at - 0.3, 0.4, ease.out)} titulo={s} titleSize={32} acende={prog(t, at - 0.1, 0.4) * (fim > 0.5 ? 0.55 : 0.4)} />
          ))}
          <Cota x1={170} x2={910} y={700} texto="NEGOCIAÇÃO SEM SURPRESA" p={prog(t, c.d_certa - 0.2, 0.4)} cor={A.hex} />
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, ini, 0.35) * (1 - prog(t, c.d_certa - 0.5, 0.2))} size={56}>CONFIRA <G>A ÁREA</G></TituloFolha>
      <TituloFolha p={prog(t, c.d_certa - 0.3, 0.35)} size={56}>METRAGEM <G>CERTA</G></TituloFolha>
    </div>
  );
};
