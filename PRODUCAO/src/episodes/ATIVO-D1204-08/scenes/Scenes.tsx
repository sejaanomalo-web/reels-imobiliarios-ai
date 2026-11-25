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
 * ATIVO-D1204-08 — "O preço da ficha" (grade 04/12/2026 · 08h · E SE…? · Planta técnica v2).
 * Folhas: a ficha do imóvel com a linha PREÇO PEDIDO acesa → mergulho: o estudo (1987) — a mesma casa, duas fichas iguais,
 * só o preço muda → a cota da AVALIAÇÃO cresce e encolhe junto com o preço → "quase nenhum disse que usou" → mergulho na
 * SUA CONTA: vendidos, metragem, estado → 1º o seu número, 2º o dele; senão quem avalia é a ficha → fecho.
 * Apuração: Northcraft & Neale (1987), OBHDP 39 (valor exato da diferença omitido: fontes divergem).
 */
const M = "JetBrains Mono";
const TOP = 380;
const fade = (p: number) => clamp01(p * 1.5);
const TELA = { x: 120, y: 120, w: 840, h: 640 };
const W: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: C.warn }}>{children}</span>;
const G: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: A.hex }}>{children}</span>;
const Rot: React.FC<{ x: number; y: number; texto: string; p: number; cor?: string; size?: number; anchor?: "start" | "middle" | "end" }> = ({ x, y, texto, p, cor = C.muted, size = 26, anchor = "start" }) => (
  <text x={x} y={y} textAnchor={anchor} fill={cor} fontFamily={M} fontWeight={700} fontSize={size} letterSpacing="0.12em" opacity={fade(p)}>{texto}</text>
);
/** Linhas de uma ficha (campos), a última é o PREÇO. */
const Ficha: React.FC<{ x: number; y: number; w: number; p: number; preco: string; acende?: number; tone?: "linha" | "warn" }> = ({ x, y, w, p, preco, acende = 0, tone = "linha" }) => (
  <g>
    <Comodo x={x} y={y} w={w} h={330} p={p} titulo="" tone="muted" />
    {["ÁREA", "QUARTOS", "BAIRRO"].map((k, i) => (
      <g key={k} opacity={fade(p)}>
        <line x1={x + 24} y1={y + 72 + i * 64} x2={x + w - 24} y2={y + 72 + i * 64} stroke={C.muted} strokeOpacity={0.35} strokeWidth={2} />
        <text x={x + 28} y={y + 60 + i * 64} fill={C.muted} fontFamily={M} fontWeight={700} fontSize={24} letterSpacing="0.1em">{k}</text>
      </g>
    ))}
    <Comodo x={x + 16} y={y + 230} w={w - 32} h={84} p={p} titulo={preco} titleSize={30} tone={tone} acende={acende} />
  </g>
);

/* ------------------------------------------------ 1 · um número na ficha ------------------------------------------------ */
const ALVO1 = { x: 330, y: 200, w: 420, h: 330 };
export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const mg = prog(t, c.e_1987 - 0.6, 0.6, ease.linear);
  if (mg >= 1) return null;
  const m = mergulho(mg, ALVO1, TELA);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans }}>
      <Camera drift={6} t={t} keys={[{ t: 0, s: 1.05, y: -8 }, { t: c.h_numero, s: 1.0, e: ease.out }, { t: c.h_vale, s: 1.05, y: -16, e: ease.inOut }]}>
        <Prancha top={TOP} h={900}>
          <g transform={m.transform} opacity={m.opacity}>
            <g opacity={m.outros}>
              <Contorno {...TELA} p={prog(t, -0.1, 0.9, ease.out)} />
              <Rot x={540} y={170} anchor="middle" texto="FICHA DO IMÓVEL" p={prog(t, 0.2, 0.5)} />
              <Cota x1={330} x2={750} y={640} texto="QUANTO VALE?" p={prog(t, c.h_vale - 0.2, 0.5)} cor={C.text} />
            </g>
            <Ficha x={330} y={200} w={420} p={prog(t, 0, 0.7, ease.out)} preco="PREÇO PEDIDO" acende={prog(t, c.h_numero - 0.1, 0.4)} />
          </g>
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, -0.3, 0.4) * (1 - prog(t, c.e_1987 - 0.6, 0.2))} size={56}>E SE <G>UM NÚMERO</G> MUDASSE TUDO?</TituloFolha>
    </div>
  );
};

/* ------------------------------------------------ 2 · a mesma casa, duas fichas ------------------------------------------------ */
export const Estudo: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const ini = c.e_1987 - 0.1;
  if (t < ini - 0.05) return null;
  const mg = prog(t, c.c_antes - 0.7, 0.6, ease.linear);
  if (mg >= 1) return null;
  const NOSSO = { x: 130, y: 200, w: 820, h: 520 };
  const m = mergulho(mg, NOSSO, TELA);
  const resultado = prog(t, c.e_alto - 0.3, 0.4);
  const alto = prog(t, c.e_alto - 0.1, 0.5, ease.out);
  const baixo = prog(t, c.e_baixo - 0.1, 0.5, ease.out);
  const ninguem = prog(t, c.v_nenhum - 0.1, 0.4);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans }}>
      <Camera drift={6} t={t} keys={[{ t: ini, s: 1.0 }, { t: c.e_mesma, s: 1.03, y: -8, e: ease.out }, { t: c.e_alto, s: 1.0, e: ease.inOut }, { t: c.v_nenhum, s: 1.06, y: -14, e: ease.out }]}>
        <Prancha top={TOP} h={900}>
          <g transform={m.transform} opacity={m.opacity}>
            <g opacity={m.outros}>
              <Contorno {...TELA} p={prog(t, ini, 0.7, ease.out)} />
              <Rot x={540} y={170} anchor="middle" texto="A MESMA CASA · A MESMA FICHA" p={prog(t, c.e_mesma - 0.2, 0.5)} />
              <g opacity={1 - resultado * 0.25}>
                <Ficha x={160} y={200} w={340} p={prog(t, c.e_1987 + 0.3, 0.6, ease.out)} preco="PREÇO: ALTO" tone="linha" acende={prog(t, c.e_preco - 0.2, 0.4) * (1 - ninguem)} />
                <Ficha x={580} y={200} w={340} p={prog(t, c.e_1987 + 0.6, 0.6, ease.out)} preco="PREÇO: BAIXO" tone="linha" acende={prog(t, c.e_preco - 0.1, 0.4) * (1 - ninguem)} />
              </g>
              <Comodo x={160} y={550} w={340} h={100} p={alto} titulo="AVALIOU MAIS CARA" titleSize={26} tone="linha" />
              <Comodo x={580} y={550} w={340} h={100} p={baixo} titulo="AVALIOU MAIS BARATA" titleSize={26} tone="linha" />
              <Chamada x={540} y={650} bx={190} by={690} bw={700} texto="USOU O PREÇO? QUASE NENHUM DISSE QUE SIM" p={ninguem} tone="warn" />
            </g>
          </g>
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, ini, 0.35) * (1 - prog(t, c.e_alto - 0.4, 0.2))} size={56}>A <G>MESMA CASA</G>, OUTRO PREÇO</TituloFolha>
      <TituloFolha p={prog(t, c.e_alto - 0.3, 0.35) * (1 - prog(t, c.v_nenhum - 0.4, 0.2))} size={56}>A AVALIAÇÃO <W>SEGUIU O PREÇO</W></TituloFolha>
      <TituloFolha p={prog(t, c.v_nenhum - 0.3, 0.35) * (1 - prog(t, c.c_antes - 0.7, 0.2))} size={56}>E <W>NINGUÉM PERCEBEU</W></TituloFolha>
      <SeloPlanta texto="ESTUDO COM CORRETORES · 1987" p={prog(t, c.e_1987, 0.4) * (1 - prog(t, c.v_nenhum - 0.4, 0.3))} />
    </div>
  );
};

/* ------------------------------------------------ 3 · a sua conta antes ------------------------------------------------ */
export const Conta: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const ini = c.c_antes - 0.15;
  if (t < ini - 0.05 || t > c.cta_quer + 0.4) return null;
  const sai = prog(t, c.cta_quer - 0.2, 0.5);
  const seu = prog(t, c.f_seu - 0.15, 0.4);
  const ficha = prog(t, c.f_ficha - 0.15, 0.4);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(prog(t, ini, 0.35), 1 - sai) }}>
      <Camera drift={6} t={t} keys={[{ t: ini, s: 1.0 }, { t: c.c_estado, s: 1.03, y: -10, e: ease.out }, { t: c.f_seu, s: 1.0, e: ease.inOut }, { t: c.f_ficha, s: 1.05, y: -14, e: ease.out }]}>
        <Prancha top={TOP} h={900}>
          <Contorno {...TELA} p={prog(t, ini, 0.6, ease.out)} />
          <Rot x={540} y={170} anchor="middle" texto="A SUA CONTA · ANTES DA FICHA" p={prog(t, ini + 0.2, 0.5)} />
          <Comodo x={150} y={210} w={250} h={170} p={prog(t, c.c_vendidos - 0.4, 0.5, ease.out)} titulo="VENDIDOS" sub="DA REGIÃO" titleSize={30} acende={prog(t, c.c_vendidos - 0.1, 0.3) * (1 - seu * 0.5)} />
          <Comodo x={415} y={210} w={250} h={170} p={prog(t, c.c_metragem - 0.4, 0.5, ease.out)} titulo="METRAGEM" titleSize={30} acende={prog(t, c.c_metragem - 0.1, 0.3) * (1 - seu * 0.5)} />
          <Comodo x={680} y={210} w={250} h={170} p={prog(t, c.c_estado - 0.4, 0.5, ease.out)} titulo="ESTADO" titleSize={30} acende={prog(t, c.c_estado - 0.1, 0.3) * (1 - seu * 0.5)} />
          <Rota id="conta" d="M 275 380 L 275 470 L 540 470 M 540 380 L 540 470 M 805 380 L 805 470 L 540 470 L 540 520" p={prog(t, c.c_estado + 0.1, 0.6)} tom="accent" />
          <Comodo x={160} y={520} w={360} h={170} p={prog(t, c.c_antes - 0.1, 0.5, ease.out)} titulo="1º O SEU NÚMERO" titleSize={30} acende={seu} />
          <Comodo x={560} y={520} w={360} h={170} p={prog(t, c.c_antes + 0.3, 0.5, ease.out)} titulo="2º O DO DONO" titleSize={30} tone={ficha > 0.5 ? "warn" : "muted"} acende={0} />
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, ini, 0.35) * (1 - prog(t, c.f_seu - 0.4, 0.2))} size={56}>FAÇA A CONTA <G>ANTES</G></TituloFolha>
      <TituloFolha p={prog(t, c.f_seu - 0.3, 0.35) * (1 - prog(t, c.f_ficha - 0.4, 0.2))} size={56}>PRIMEIRO, <G>O SEU NÚMERO</G></TituloFolha>
      <TituloFolha p={prog(t, c.f_ficha - 0.3, 0.35)} size={56}>SENÃO, QUEM AVALIA <W>É A FICHA</W></TituloFolha>
    </div>
  );
};
