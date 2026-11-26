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
 * ATIVO-D1206-12 — "Dezenove itens" (grade 06/12/2026 · 12h · FORA DA BOLHA · Planta técnica v2).
 * Folhas: a lista de 19 itens se desenha (checklist de cirurgia da OMS; 2009, 8 hospitais, 8 países) → mergulho no último
 * item: ANTES × DEPOIS DA LISTA (mortes 1,5% → 0,8%; complicações 11% → 7%), as equipes já sabiam, a lista só não deixava
 * esquecer → mergulho no DEPOIS: a planta do SEU FECHAMENTO (documentos, certidões, matrícula, prazo, chaves) → lista protege.
 * Apuração: Haynes et al., NEJM 2009 (estudo antes × depois, não randomizado).
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
const CEL = (i: number) => ({ x: 150 + (i % 4) * 200, y: 190 + Math.floor(i / 4) * 104, w: 180, h: 88 });

/* ------------------------------------------------ 1 · a lista de 19 itens ------------------------------------------------ */
export const Lista: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const mg = prog(t, c.n_mortes - 1.4, 0.6, ease.linear);
  if (mg >= 1) return null;
  const m = mergulho(mg, CEL(18), TELA);
  const todos = prog(t, c.e_checklist - 0.2, 0.5);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans }}>
      <Camera drift={6} t={t} keys={[{ t: 0, s: 1.05, y: -8 }, { t: c.h_cirurgias, s: 1.0, e: ease.out }, { t: c.e_2009, s: 1.03, y: -10, e: ease.inOut }, { t: c.e_checklist, s: 1.06, y: -16, e: ease.out }]}>
        <Prancha top={TOP} h={900}>
          <g transform={m.transform} opacity={m.opacity}>
            <g opacity={m.outros}>
              <Contorno {...TELA} p={prog(t, -0.1, 0.9, ease.out)} />
              <Rot x={540} y={168} texto={t < c.h_cirurgias - 0.1 ? "UMA LISTA" : "CHECKLIST DE CIRURGIA · OMS"} p={prog(t, 0.2, 0.5)} />
              {Array.from({ length: 18 }, (_, i) => (
                <Comodo key={i} {...CEL(i)} p={prog(t, c.h_lista - 0.1 + i * 0.09, 0.35, ease.out)} titulo={`${i + 1}`} titleSize={30} tone="linha" acende={todos * 0.55} />
              ))}
              <Cota x1={150} x2={930} y={734} texto="8 HOSPITAIS · 8 PAÍSES" p={prog(t, c.e_hospitais - 0.2, 0.4)} cor={C.text} />
            </g>
            <Comodo {...CEL(18)} p={prog(t, c.h_lista - 0.1 + 18 * 0.09, 0.35, ease.out)} titulo="19" titleSize={30} acende={todos * 0.55} />
          </g>
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, -0.3, 0.4) * (1 - prog(t, c.e_2009 - 0.5, 0.2))} size={56}>UMA LISTA DE <G>19 ITENS</G></TituloFolha>
      <TituloFolha p={prog(t, c.e_2009 - 0.3, 0.35) * (1 - prog(t, c.n_mortes - 1.4, 0.2))} size={56}><G>2009</G>: UM ESTUDO EM HOSPITAIS</TituloFolha>
    </div>
  );
};

/* ------------------------------------------------ 2–3 · antes × depois ------------------------------------------------ */
const DEPOIS = { x: 560, y: 200, w: 370, h: 400 };
export const Numeros: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const ini = c.n_mortes - 1.5;
  if (t < ini - 0.05) return null;
  const mg = prog(t, c.a_fechamento - 1.0, 0.6, ease.linear);
  if (mg >= 1) return null;
  const m = mergulho(mg, DEPOIS, TELA);
  const dep = prog(t, c.n_sete - 0.2, 0.5);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans }}>
      <Camera drift={6} t={t} keys={[{ t: ini, s: 1.0 }, { t: c.n_menos, s: 1.03, y: -8, e: ease.out }, { t: c.n_sete, s: 1.0, e: ease.inOut }, { t: c.v_esquecer, s: 1.05, y: -12, e: ease.out }]}>
        <Prancha top={TOP} h={900}>
          <g transform={m.transform} opacity={m.opacity}>
            <g opacity={m.outros}>
              <Contorno {...TELA} p={prog(t, ini, 0.7, ease.out)} />
              <Comodo x={150} y={200} w={370} h={400} p={prog(t, ini + 0.2, 0.5, ease.out)} titulo="ANTES" titleSize={30} tone="muted" />
              <Rot x={335} y={300} texto="MORTES 1,5%" p={prog(t, c.n_mortes - 0.2, 0.4)} cor={C.warn} size={30} />
              <Rot x={335} y={540} texto="COMPLICAÇÕES 11%" p={prog(t, c.n_onze - 0.2, 0.4)} cor={C.warn} size={28} />
              <Chamada x={335} y={600} bx={150} by={690} bw={370} texto="AS EQUIPES JÁ SABIAM" p={prog(t, c.v_sabiam - 0.2, 0.4)} tone="linha" />
            </g>
            <Comodo {...DEPOIS} p={prog(t, ini + 0.4, 0.5, ease.out)} titulo="DEPOIS DA LISTA" titleSize={28} acende={dep * 0.7} />
            <Rot x={745} y={300} texto="MORTES 0,8%" p={prog(t, c.n_menos - 0.2, 0.4)} cor={C.text} size={30} />
            <Rot x={745} y={540} texto="COMPLICAÇÕES 7%" p={prog(t, c.n_sete - 0.2, 0.4)} cor={C.text} size={28} />
          </g>
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, ini, 0.35) * (1 - prog(t, c.v_sabiam - 0.5, 0.2))} size={56}>DEPOIS DA <G>LISTA</G></TituloFolha>
      <TituloFolha p={prog(t, c.v_sabiam - 0.3, 0.35) * (1 - prog(t, c.a_fechamento - 1.0, 0.2))} size={56}>NÃO ERA SABER. ERA <G>NÃO ESQUECER</G></TituloFolha>
      <SeloPlanta texto="HAYNES ET AL., NEJM 2009 · ANTES × DEPOIS · 8 HOSPITAIS" p={prog(t, ini + 0.3, 0.4) * (1 - prog(t, c.a_fechamento - 1.0, 0.3))} />
    </div>
  );
};

/* ------------------------------------------------ 4–5 · o seu fechamento ------------------------------------------------ */
const ITENS = (c: Record<string, number>) => [
  { x: 150, y: 200, w: 250, h: 190, titulo: "DOCUMENTOS", sub: "DO VENDEDOR", at: c.a_documentos },
  { x: 415, y: 200, w: 250, h: 190, titulo: "CERTIDÕES", sub: "", at: c.a_certidoes },
  { x: 680, y: 200, w: 250, h: 190, titulo: "MATRÍCULA", sub: "ATUALIZADA", at: c.a_matricula },
  { x: 150, y: 410, w: 380, h: 190, titulo: "PRAZO", sub: "DO FINANCIAMENTO", at: c.a_prazo },
  { x: 550, y: 410, w: 380, h: 190, titulo: "CHAVES", sub: "DATA DA ENTREGA", at: c.a_chaves },
];
export const Fechamento: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const ini = c.a_fechamento - 0.45;
  if (t < ini - 0.05 || t > c.cta_quer + 0.4) return null;
  const sai = prog(t, c.cta_quer - 0.2, 0.5);
  const fim = prog(t, c.f_lista - 0.2, 0.4);
  const it = ITENS(c);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(prog(t, ini, 0.35), 1 - sai) }}>
      <Camera drift={6} t={t} keys={[{ t: ini, s: 1.0 }, { t: c.a_prazo, s: 1.03, y: -8, e: ease.out }, { t: c.f_lista, s: 1.06, y: -14, e: ease.out }]}>
        <Prancha top={TOP} h={900}>
          <Contorno {...TELA} p={prog(t, ini, 0.6, ease.out)} />
          <Rot x={540} y={168} texto="PROJETO: SEU FECHAMENTO" p={prog(t, ini + 0.2, 0.5)} />
          <Rota id="fech" d="M275 295 L540 295 L805 295 L805 505 L740 505 M340 505 L540 505" p={prog(t, c.a_documentos, c.a_chaves - c.a_documentos + 0.3, ease.linear)} />
          {it.map((q, i) => (
            <Comodo key={i} x={q.x} y={q.y} w={q.w} h={q.h} p={prog(t, ini + 0.2 + i * 0.1, 0.5, ease.out)} titulo={q.titulo} sub={q.sub} titleSize={28}
              acende={Math.max(prog(t, q.at - 0.15, 0.35) * 0.6, fim * 0.8)} />
          ))}
          <Cota x1={150} x2={930} y={650} texto="LISTA DO FECHAMENTO" p={fim} cor={C.text} />
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, ini, 0.35) * (1 - prog(t, c.f_experiencia - 0.4, 0.2))} size={56}>NO FECHAMENTO, <G>FAÇA A SUA</G></TituloFolha>
      <TituloFolha p={prog(t, c.f_experiencia - 0.3, 0.35)} size={56}>EXPERIÊNCIA ESQUECE. <G>LISTA PROTEGE</G></TituloFolha>
    </div>
  );
};
export { W };
