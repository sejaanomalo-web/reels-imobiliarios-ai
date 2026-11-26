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
 * ATIVO-D1208-12 — "O mito dos 7%" (grade 08/12/2026 · 12h · FORA DA BOLHA · Planta técnica v2).
 * Folhas: três faixas 7% / 38% / 55% (palavras, tom, corpo) → de onde vem: experimentos dos anos 60 sobre sentimentos, só com
 * mensagem contraditória → o autor diz que é mal citado; a faixa das palavras cresce e acende → mergulho na PROPOSTA: valor,
 * condições, prazo, incluso → quem fecha são as palavras certas. Apuração: Mehrabian (1967); Lapakko (2007).
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

/* ------------------------------------------------ 1 · o mito ------------------------------------------------ */
export const Mito: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const cresce = prog(t, c.v_pesam - 0.4, 0.8, ease.inOut);
  const wPal = 150 + cresce * 630;
  const PAL = { x: 150, y: 200, w: wPal, h: 130 };
  const mg = prog(t, c.a_proposta - 0.7, 0.6, ease.linear);
  if (mg >= 1) return null;
  const m = mergulho(mg, PAL, TELA);
  const outros = 1 - cresce * 0.7;
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans }}>
      <Camera drift={6} t={t} keys={[{ t: 0, s: 1.05, y: -8 }, { t: c.o_experimentos, s: 1.0, e: ease.out }, { t: c.c_contradizem, s: 1.03, y: -10, e: ease.inOut }, { t: c.v_pesam, s: 1.06, y: -14, e: ease.out }]}>
        <Prancha top={TOP} h={900}>
          <g transform={m.transform} opacity={m.opacity}>
            <g opacity={m.outros}>
              <Contorno {...TELA} p={prog(t, -0.1, 0.9, ease.out)} />
              <Rot x={540} y={168} texto="O QUE CONTA NA COMUNICAÇÃO?" p={prog(t, 0.2, 0.5)} />
              <g opacity={outros}>
                <Comodo x={150} y={360} w={380} h={130} p={prog(t, 0.5, 0.5, ease.out)} titulo="38%" titleSize={34} tone="muted" />
                <Rot x={550} y={435} texto="TOM DE VOZ" p={prog(t, 0.7, 0.4)} anchor="start" />
                <Comodo x={150} y={520} w={560} h={130} p={prog(t, 0.7, 0.5, ease.out)} titulo="55%" titleSize={34} tone="muted" />
                <Rot x={730} y={595} texto="CORPO" p={prog(t, 0.9, 0.4)} anchor="start" />
              </g>
              <Rot x={wPal + 170} y={275} texto="PALAVRAS" p={prog(t, c.h_palavras - 0.1, 0.4) * (1 - cresce)} cor={C.text} anchor="start" />
              <Chamada x={340} y={490} bx={150} by={690} bw={560} texto="EXPERIMENTOS SOBRE SENTIMENTOS" p={prog(t, c.o_sentimentos - 0.2, 0.4) * (1 - prog(t, c.c_contradizem - 0.4, 0.3))} tone="linha" />
              <Chamada x={340} y={490} bx={150} by={690} bw={620} texto="SÓ COM MENSAGEM CONTRADITÓRIA" p={prog(t, c.c_contradizem - 0.25, 0.4) * (1 - prog(t, c.v_autor - 0.3, 0.3))} tone="warn" />
              <Chamada x={340} y={490} bx={150} by={690} bw={520} texto="O AUTOR: MAL CITADO" p={prog(t, c.v_mal - 0.2, 0.4)} tone="warn" />
            </g>
            <Comodo {...PAL} p={prog(t, c.h_palavras - 0.2, 0.4, ease.out)} titulo={cresce > 0.5 ? "PALAVRAS PESAM MUITO" : "7%"} titleSize={cresce > 0.5 ? 30 : 34} tone={cresce > 0.3 ? "linha" : "warn"} acende={cresce * 0.6} />
          </g>
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, -0.3, 0.4) * (1 - prog(t, c.o_experimentos - 0.6, 0.2))} size={56}>AS PALAVRAS VALEM <W>SÓ 7%?</W></TituloFolha>
      <TituloFolha p={prog(t, c.o_experimentos - 0.4, 0.35) * (1 - prog(t, c.v_autor - 0.5, 0.2))} size={56}>DE ONDE VEM <G>O NÚMERO</G></TituloFolha>
      <TituloFolha p={prog(t, c.v_autor - 0.3, 0.35) * (1 - prog(t, c.a_proposta - 0.7, 0.2))} size={56}>UM NÚMERO <W>MAL CITADO</W></TituloFolha>
      <SeloPlanta texto="MEHRABIAN, 1967 · SENTIMENTOS E ATITUDES" p={prog(t, c.o_experimentos - 0.2, 0.4) * (1 - prog(t, c.a_proposta - 0.7, 0.3))} />
    </div>
  );
};

/* ------------------------------------------------ 2 · a proposta ------------------------------------------------ */
export const Proposta: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const ini = c.a_proposta - 0.15;
  if (t < ini - 0.05 || t > c.cta_quer + 0.4) return null;
  const sai = prog(t, c.cta_quer - 0.2, 0.5);
  const fim = prog(t, c.f_certas - 0.2, 0.4);
  const IT = [
    { x: 150, y: 200, w: 380, h: 180, titulo: "VALOR", at: c.a_valor },
    { x: 550, y: 200, w: 380, h: 180, titulo: "CONDIÇÕES", at: c.a_condicoes },
    { x: 150, y: 400, w: 380, h: 180, titulo: "PRAZO", at: c.a_prazo },
    { x: 550, y: 400, w: 380, h: 180, titulo: "O QUE ESTÁ INCLUSO", at: c.a_incluso },
  ];
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(prog(t, ini, 0.35), 1 - sai) }}>
      <Camera drift={6} t={t} keys={[{ t: ini, s: 1.0 }, { t: c.a_prazo, s: 1.03, y: -8, e: ease.out }, { t: c.f_certas, s: 1.06, y: -14, e: ease.out }]}>
        <Prancha top={TOP} h={900}>
          <Contorno {...TELA} p={prog(t, ini, 0.6, ease.out)} />
          <Rot x={540} y={168} texto="PROJETO: A SUA PROPOSTA" p={prog(t, ini + 0.2, 0.5)} />
          <Rota id="prop" d="M340 290 L740 290 L740 490 L340 490" p={prog(t, c.a_valor, c.a_incluso - c.a_valor + 0.4, ease.linear)} />
          {IT.map((q, i) => (
            <Comodo key={i} x={q.x} y={q.y} w={q.w} h={q.h} p={prog(t, ini + 0.2 + i * 0.1, 0.5, ease.out)} titulo={q.titulo} titleSize={30}
              acende={Math.max(prog(t, q.at - 0.15, 0.35) * 0.6, fim * 0.8)} />
          ))}
          <Cota x1={150} x2={930} y={650} texto="POR ESCRITO, SEM MAL-ENTENDIDO" p={prog(t, c.a_incluso + 0.3, 0.4)} cor={C.text} />
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, ini, 0.35) * (1 - prog(t, c.f_fecha - 0.5, 0.2))} size={56}>NA PROPOSTA, <G>ESCREVA CLARO</G></TituloFolha>
      <TituloFolha p={prog(t, c.f_fecha - 0.3, 0.35)} size={56}>QUEM FECHA SÃO AS <G>PALAVRAS CERTAS</G></TituloFolha>
    </div>
  );
};
