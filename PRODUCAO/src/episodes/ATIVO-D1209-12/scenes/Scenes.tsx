import React from "react";
import { C, F } from "../../../theme";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A } from "../../NOV26/kit";
import {
  Chamada, Comodo, Contorno, Cota, CotaV, Prancha, Rota, SeloPlanta, TituloFolha,
  clamp01, ease, mergulho, prog,
} from "../../../estilos/planta";

/**
 * ATIVO-D1209-12 — "A caneca que vale o dobro" (grade 09/12/2026 · 12h · FORA DA BOLHA · Planta técnica v2).
 * Folhas: a caneca em elevação → 1990: metade ganha a caneca, abre-se um mercado → quem ganhou pedia mais que o dobro (duas
 * barras com cota) → efeito dotação → mergulho na barra do dono: a planta da casa de 20 anos → ouça a história primeiro (rota
 * pelos cômodos) → depois, o que o mercado pagou por casas parecidas (três fichas acendem) → ele sente o preço.
 * Apuração: Kahneman, Knetsch & Thaler (1990), JPE — "mais que o dobro", sem cifra.
 */
const M = "JetBrains Mono";
const TOP = 380;
const fade = (p: number) => clamp01(p * 1.5);
const TELA = { x: 120, y: 120, w: 840, h: 640 };
const G: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: A.hex }}>{children}</span>;
const W: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: C.warn }}>{children}</span>;
const Rot: React.FC<{ x: number; y: number; texto: string; p: number; cor?: string; size?: number; anchor?: "start" | "middle" }> = ({ x, y, texto, p, cor = C.muted, size = 26, anchor = "middle" }) => (
  <text x={x} y={y} textAnchor={anchor} fill={cor} fontFamily={M} fontWeight={700} fontSize={size} letterSpacing="0.12em" opacity={fade(p)}>{texto}</text>
);
/** Caneca em elevação, linha de projeto que se desenha. */
const Caneca: React.FC<{ x: number; y: number; s?: number; p: number; acende?: number }> = ({ x, y, s = 1, p, acende = 0 }) => {
  const cor = acende > 0.5 ? A.hex : C.text;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill="none" stroke={cor} strokeWidth={3 / s} strokeLinecap="round">
      <path d="M-60 -70 L-52 70 Q-50 80 -40 80 L40 80 Q50 80 52 70 L60 -70 Z" pathLength={1} style={{ strokeDasharray: `${p} 1` }} />
      <path d="M58 -30 Q110 -30 106 10 Q102 46 54 44" pathLength={1} style={{ strokeDasharray: `${clamp01(p * 1.4 - 0.4)} 1` }} />
      <line x1={-60} y1={-70} x2={60} y2={-70} opacity={0.5} />
    </g>
  );
};

/* ------------------------------------------------ 1 · as canecas ------------------------------------------------ */
export const Canecas: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const mg = prog(t, c.v_dono - 0.6, 0.6, ease.linear);
  if (mg >= 1) return null;
  const barras = prog(t, c.r_ganhou - 0.3, 0.5);
  const grupos = prog(t, c.e_metade - 0.3, 0.5) * (1 - barras);
  const hDono = 100 + 140 * prog(t, c.r_dobro - 0.4, 0.8, ease.out);
  const DONO = { x: 220, y: 720 - hDono, w: 240, h: hDono };
  const m = mergulho(mg, DONO, TELA);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans }}>
      <Camera drift={6} t={t} keys={[{ t: 0, s: 1.06, y: -10 }, { t: c.e_estudo, s: 1.0, e: ease.out }, { t: c.r_dobro, s: 1.04, y: -10, e: ease.inOut }, { t: c.v_efeito, s: 1.06, y: -12, e: ease.out }]}>
        <Prancha top={TOP} h={900}>
          <g transform={m.transform} opacity={m.opacity}>
            <g opacity={m.outros}>
              <Contorno {...TELA} p={prog(t, -0.1, 0.9, ease.out)} />
              <Rot x={540} y={168} texto="ELEVAÇÃO · UMA CANECA" p={prog(t, 0.2, 0.5) * (1 - prog(t, c.e_estudo - 0.2, 0.3))} />
              <Rot x={540} y={168} texto="1990 · O EXPERIMENTO" p={prog(t, c.e_estudo - 0.1, 0.4)} />
              <g opacity={1 - prog(t, c.e_metade - 0.4, 0.4)}>
                <Caneca x={540} y={420} s={1.5} p={prog(t, c.h_caneca - 0.3, 0.8, ease.out)} acende={prog(t, c.h_dobro - 0.1, 0.4)} />
                <CotaV x={760} y1={300} y2={540} texto="×2" p={prog(t, c.h_dobro - 0.1, 0.4)} cor={A.hex} />
              </g>
              <g opacity={grupos}>
                <Comodo x={150} y={300} w={360} h={160} p={prog(t, c.e_metade - 0.2, 0.5, ease.out)} titulo="COM CANECA" titleSize={30} acende={0.35} />
                <Comodo x={570} y={300} w={360} h={160} p={prog(t, c.e_metade, 0.5, ease.out)} titulo="SEM CANECA" titleSize={30} tone="muted" />
                <Rota id="mercado" d="M330 470 L330 560 L750 560 L750 470" p={prog(t, c.e_mercado - 0.1, 0.7, ease.linear)} />
                <Rot x={540} y={610} texto="UM MERCADO ENTRE ELES" p={prog(t, c.e_mercado, 0.4)} cor={C.text} />
              </g>
              <g opacity={barras}>
                <Comodo x={620} y={620} w={240} h={100} p={prog(t, c.r_pagar - 0.4, 0.5, ease.out)} titulo="PAGARIA" titleSize={26} tone="muted" />
                <Rot x={740} y={760} texto="QUEM COMPRA" p={prog(t, c.r_pagar - 0.3, 0.4)} />
                <Rot x={340} y={760} texto="QUEM GANHOU" p={prog(t, c.r_ganhou - 0.1, 0.4)} cor={C.text} />
                <Cota x1={220} x2={860} y={440} texto="MAIS QUE O DOBRO" p={prog(t, c.r_dobro - 0.1, 0.4)} cor={A.hex} />
              </g>
            </g>
            <g opacity={barras}>
              <Comodo {...DONO} p={prog(t, c.r_ganhou - 0.2, 0.5, ease.out)} titulo="PEDIA" titleSize={28} acende={prog(t, c.r_dobro - 0.1, 0.4) * 0.6} />
            </g>
          </g>
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, -0.3, 0.4) * (1 - prog(t, c.e_estudo - 0.5, 0.2))} size={56}>UMA CANECA <G>VALE O DOBRO?</G></TituloFolha>
      <TituloFolha p={prog(t, c.e_estudo - 0.3, 0.35) * (1 - prog(t, c.r_ganhou - 0.5, 0.2))} size={56}>METADE <G>GANHA A CANECA</G></TituloFolha>
      <TituloFolha p={prog(t, c.r_ganhou - 0.3, 0.35) * (1 - prog(t, c.v_efeito - 0.5, 0.2))} size={56}>QUEM TEM <W>PEDE MAIS</W></TituloFolha>
      <TituloFolha p={prog(t, c.v_efeito - 0.3, 0.35) * (1 - prog(t, c.v_dono - 0.6, 0.2))} size={56}>O <G>EFEITO DOTAÇÃO</G></TituloFolha>
      <SeloPlanta texto="KAHNEMAN, KNETSCH & THALER · 1990" p={prog(t, c.e_estudo - 0.1, 0.4) * (1 - prog(t, c.v_dono - 0.6, 0.3))} />
    </div>
  );
};

/* ------------------------------------------------ 2 · a casa de 20 anos ------------------------------------------------ */
export const CasaDono: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const ini = c.v_dono - 0.05;
  if (t < ini - 0.05 || t > c.cta_quer + 0.4) return null;
  const sai = prog(t, c.cta_quer - 0.2, 0.5);
  const hist = prog(t, c.a_historia - 0.2, 1.6, ease.linear);
  const merc = prog(t, c.a_mercado - 0.3, 0.5);
  const fim = prog(t, c.f_sentindo - 0.2, 0.4);
  const R = [
    { x: 150, y: 200, w: 330, h: 240, titulo: "SALA" },
    { x: 480, y: 200, w: 200, h: 240, titulo: "COZINHA" },
    { x: 150, y: 440, w: 260, h: 200, titulo: "QUARTO" },
    { x: 410, y: 440, w: 270, h: 200, titulo: "QUARTO" },
  ];
  const V = [
    { y: 220, at: c.a_parecidas - 0.4 },
    { y: 360, at: c.a_parecidas - 0.1 },
    { y: 500, at: c.a_parecidas + 0.2 },
  ];
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(prog(t, ini, 0.35), 1 - sai) }}>
      <Camera drift={6} t={t} keys={[{ t: ini, s: 1.0 }, { t: c.a_historia, s: 1.03, y: -8, e: ease.out }, { t: c.a_mercado, s: 1.02, x: -10, e: ease.inOut }, { t: c.f_sentindo, s: 1.06, y: -14, e: ease.out }]}>
        <Prancha top={TOP} h={900}>
          <Contorno {...TELA} p={prog(t, ini, 0.6, ease.out)} />
          <Rot x={540} y={168} texto="PROJETO: A CASA DO PROPRIETÁRIO" p={prog(t, ini + 0.2, 0.5)} />
          {R.map((q, i) => (
            <Comodo key={i} x={q.x} y={q.y} w={q.w} h={q.h} p={prog(t, ini + 0.15 + i * 0.1, 0.5, ease.out)} titulo={q.titulo} titleSize={28}
              tone={merc > 0.5 ? "muted" : "linha"} acende={Math.max(hist * 0.35 * (1 - merc), fim * 0.3)} />
          ))}
          <Rota id="hist" d="M315 320 L580 320 L545 540 L280 540" p={hist} />
          <Chamada x={415} y={320} bx={150} by={680} bw={530} texto="VINTE ANOS DE HISTÓRIA" p={prog(t, c.v_vinte - 0.2, 0.4) * (1 - merc)} tone="linha" />
          <g opacity={merc}>
            <Rot x={820} y={200} texto="O MERCADO" p={merc} cor={C.text} />
            {V.map((v, i) => (
              <Comodo key={i} x={720} y={v.y} w={200} h={120} p={prog(t, v.at - 0.2, 0.4, ease.out)} titulo="VENDIDA" titleSize={24} acende={prog(t, v.at, 0.35) * 0.6} />
            ))}
          </g>
          <Cota x1={720} x2={920} y={660} texto="PARECIDAS" p={prog(t, c.a_parecidas - 0.1, 0.4)} cor={A.hex} />
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, ini, 0.35) * (1 - prog(t, c.a_historia - 0.5, 0.2))} size={56}>E UMA CASA DE <G>20 ANOS</G>?</TituloFolha>
      <TituloFolha p={prog(t, c.a_historia - 0.3, 0.35) * (1 - prog(t, c.a_mercado - 0.5, 0.2))} size={56}>OUÇA A <G>HISTÓRIA</G> PRIMEIRO</TituloFolha>
      <TituloFolha p={prog(t, c.a_mercado - 0.3, 0.35) * (1 - prog(t, c.f_mentindo - 0.5, 0.2))} size={56}>DEPOIS, <G>O MERCADO</G></TituloFolha>
      <TituloFolha p={prog(t, c.f_mentindo - 0.3, 0.35)} size={56}>ELE <G>SENTE O PREÇO</G></TituloFolha>
    </div>
  );
};
