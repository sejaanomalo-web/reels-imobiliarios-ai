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
 * ATIVO-D1210-12 — "O preço da ficha" (grade 10/12/2026 · 12h · FORA DA BOLHA · Planta técnica v2).
 * Folhas: a mesma casa em quatro fichas iguais, menos o preço pedido → as barras da avaliação sobem junto com o preço →
 * "o preço não influenciou" (chamada em alerta) → mergulho na ordem certa: 1. vendas parecidas, 2. só depois o preço pedido →
 * o primeiro número decide. Apuração: Northcraft & Neale (1987), OBHDP 39(1). Sem cifras.
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

/* ------------------------------------------------ 1 · as fichas ------------------------------------------------ */
export const Fichas: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const mg = prog(t, c.a_antes - 0.7, 0.6, ease.linear);
  if (mg >= 1) return null;
  const sobe = prog(t, c.r_alto - 0.3, 1.0, ease.out);
  const neg = prog(t, c.v_maioria - 0.2, 0.4);
  const COL = [
    { x: 160, nivel: "BAIXO", h: 120 },
    { x: 360, nivel: "MÉDIO", h: 170 },
    { x: 560, nivel: "ALTO", h: 220 },
    { x: 760, nivel: "MAIS ALTO", h: 270 },
  ];
  const ULT = { x: 760, y: 700 - COL[3].h * sobe - 30 * (1 - sobe), w: 170, h: COL[3].h * sobe + 30 * (1 - sobe) };
  const m = mergulho(mg, ULT, TELA);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans }}>
      <Camera drift={6} t={t} keys={[{ t: 0, s: 1.05, y: -8 }, { t: c.e_1987, s: 1.0, e: ease.out }, { t: c.r_avaliacao, s: 1.03, y: -8, e: ease.inOut }, { t: c.v_nao, s: 1.05, y: -12, e: ease.out }]}>
        <Prancha top={TOP} h={900}>
          <g transform={m.transform} opacity={m.opacity}>
            <g opacity={m.outros}>
              <Contorno {...TELA} p={prog(t, -0.1, 0.9, ease.out)} />
              <Rot x={540} y={168} texto="A MESMA CASA · QUATRO FICHAS" p={prog(t, 0.2, 0.5)} />
              {COL.map((q, i) => (
                <Comodo key={i} x={q.x} y={200} w={170} h={130} p={prog(t, c.h_experientes - 0.3 + i * 0.15, 0.5, ease.out)} titulo="FICHA" sub={t > c.e_preco - 0.2 ? q.nivel : "IGUAL"} titleSize={24}
                  tone={t > c.e_preco - 0.2 ? (i === 3 ? "warn" : "linha") : "muted"} />
              ))}
              <Cota x1={160} x2={930} y={370} texto="PREÇO PEDIDO →" p={prog(t, c.e_preco - 0.2, 0.4) * (1 - neg)} cor={C.warn} />
              {COL.slice(0, 3).map((q, i) => {
                const h = 30 + (q.h - 30) * sobe;
                return <Comodo key={i} x={q.x} y={700 - h} w={170} h={h} p={prog(t, c.r_alto - 0.4 + i * 0.1, 0.4, ease.out)} titulo={sobe > 0.5 ? "AVAL." : ""} titleSize={20} acende={sobe * 0.15 * (i + 1)} />;
              })}
              <Rot x={540} y={735} texto="AVALIAÇÃO DOS CORRETORES" p={prog(t, c.r_avaliacao - 0.2, 0.4)} cor={C.text} />
              <Chamada x={845} y={420} bx={170} by={360} bw={560} texto="“O PREÇO NÃO INFLUENCIOU”" p={neg} tone="warn" />
            </g>
            <Comodo {...ULT} p={prog(t, c.r_alto - 0.1, 0.4, ease.out)} titulo={sobe > 0.5 ? "AVAL." : ""} titleSize={20} acende={sobe * 0.6} />
          </g>
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, -0.3, 0.4) * (1 - prog(t, c.e_1987 - 0.5, 0.2))} size={56}>MESMA CASA, <W>MESMO ERRO</W></TituloFolha>
      <TituloFolha p={prog(t, c.e_1987 - 0.3, 0.35) * (1 - prog(t, c.r_alto - 0.5, 0.2))} size={56}>1987 · <G>FICHAS IGUAIS</G></TituloFolha>
      <TituloFolha p={prog(t, c.r_alto - 0.3, 0.35) * (1 - prog(t, c.v_maioria - 0.5, 0.2))} size={56}>A AVALIAÇÃO <W>SEGUIU O PREÇO</W></TituloFolha>
      <TituloFolha p={prog(t, c.v_maioria - 0.3, 0.35) * (1 - prog(t, c.a_antes - 0.7, 0.2))} size={56}>E QUASE TODOS <W>NEGARAM</W></TituloFolha>
      <SeloPlanta texto="NORTHCRAFT & NEALE · 1987" p={prog(t, c.e_1987 - 0.1, 0.4) * (1 - prog(t, c.a_antes - 0.7, 0.3))} />
    </div>
  );
};

/* ------------------------------------------------ 2 · a ordem ------------------------------------------------ */
export const Ordem: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const ini = c.a_antes - 0.15;
  if (t < ini - 0.05 || t > c.cta_quer + 0.4) return null;
  const sai = prog(t, c.cta_quer - 0.2, 0.5);
  const fim = prog(t, c.f_decide - 0.2, 0.4);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(prog(t, ini, 0.35), 1 - sai) }}>
      <Camera drift={6} t={t} keys={[{ t: ini, s: 1.0 }, { t: c.a_depois, s: 1.03, y: -8, e: ease.out }, { t: c.f_decide, s: 1.06, y: -14, e: ease.out }]}>
        <Prancha top={TOP} h={900}>
          <Contorno {...TELA} p={prog(t, ini, 0.6, ease.out)} />
          <Rot x={540} y={168} texto="PROJETO: A ORDEM DA AVALIAÇÃO" p={prog(t, ini + 0.2, 0.5)} />
          <Comodo x={170} y={220} w={740} h={170} p={prog(t, ini + 0.2, 0.5, ease.out)} titulo="1 · VENDAS PARECIDAS" titleSize={32} acende={prog(t, c.a_vendas - 0.15, 0.4) * 0.6} />
          <Rota id="ordem" d="M540 390 L540 470" p={prog(t, c.a_depois - 0.4, 0.4, ease.linear)} />
          <Comodo x={170} y={470} w={740} h={170} p={prog(t, ini + 0.35, 0.5, ease.out)} titulo="2 · SÓ DEPOIS, O PREÇO PEDIDO" titleSize={30} tone={t > c.a_depois - 0.2 ? "linha" : "muted"} acende={prog(t, c.a_depois - 0.1, 0.4) * 0.35} />
          <Cota x1={170} x2={910} y={690} texto="O PRIMEIRO NÚMERO PUXA O RESTO" p={prog(t, c.f_primeiro - 0.2, 0.4)} cor={fim > 0.5 ? A.hex : C.text} />
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, ini, 0.35) * (1 - prog(t, c.f_primeiro - 0.5, 0.2))} size={56}>PRIMEIRO, <G>AS VENDAS</G></TituloFolha>
      <TituloFolha p={prog(t, c.f_primeiro - 0.3, 0.35)} size={56}>O PRIMEIRO NÚMERO <G>DECIDE</G></TituloFolha>
    </div>
  );
};
