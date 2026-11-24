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
 * ATIVO-D1203-10 — "O porquê de cada imóvel" (grade 03/12/2026 · 10h · FORA DA BOLHA · Planta técnica v2).
 * Folhas: a tela de streaming em planta (títulos; um acende com o MOTIVO) e a divisão 80% RECOMENDAÇÕES × BUSCA → mergulho:
 * A SUA LISTA, 10 links sem motivo, descartados → mergulho no 1º link: UMA LINHA (2 quartos, perto da escola) ligada ao que
 * o cliente disse → COM MOTIVO × SEM MOTIVO → fecho. Apuração: Gomez-Uribe & Hunt (2015), plataforma sem nome.
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

/* ------------------------------------------------ 1 · a tela que explica o motivo ------------------------------------------------ */
const RECO = { x: 160, y: 520, w: 610, h: 165 };
export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const mg = prog(t, c.v_agora - 0.6, 0.6, ease.linear);
  if (mg >= 1) return null;
  const m = mergulho(mg, RECO, TELA);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans }}>
      <Camera drift={6} t={t} keys={[{ t: 0, s: 1.04, y: -8 }, { t: c.h_motivo, s: 1.0, e: ease.out }, { t: c.d_80, s: 1.05, y: -20, e: ease.inOut }]}>
        <Prancha top={TOP} h={900}>
          <g transform={m.transform} opacity={m.opacity}>
            <g opacity={m.outros}>
              <Contorno {...TELA} p={prog(t, -0.1, 0.9, ease.out)} />
              <Rot x={540} y={170} anchor="middle" texto="PLATAFORMA DE STREAMING · TELA INICIAL" p={prog(t, 0.2, 0.5)} />
              {[0, 1, 2].map((i) => (
                <Comodo key={i} x={160 + i * 260} y={210} w={240} h={150} p={prog(t, 0.2 + i * 0.2, 0.6, ease.out)} titulo="TÍTULO" titleSize={30} acende={i === 1 ? prog(t, c.h_motivo - 0.1, 0.4) * (1 - prog(t, c.d_2015 - 0.2, 0.4)) : 0} />
              ))}
              <Chamada x={540} y={360} bx={260} by={390} bw={560} texto="PORQUE VOCÊ ASSISTIU…" p={prog(t, c.h_motivo - 0.2, 0.6) * (1 - prog(t, c.d_2015 - 0.3, 0.3))} tone="accent" />
              <Comodo x={790} y={520} w={130} h={165} p={prog(t, c.d_80 - 0.2, 0.6, ease.out)} titulo="BUSCA" titleSize={26} tone="muted" />
              <Cota x1={160} x2={770} y={740} texto="≈ 80% DO QUE SE ASSISTE" p={prog(t, c.d_80, 0.6)} cor={C.text} />
            </g>
            <Comodo {...RECO} p={prog(t, c.d_80 - 0.3, 0.6, ease.out)} titulo="RECOMENDAÇÕES" titleSize={40} acende={prog(t, c.d_recomendacoes - 0.1, 0.4)} />
          </g>
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, -0.3, 0.4) * (1 - prog(t, c.d_2015 - 0.5, 0.2))} size={56}>O <G>MOTIVO</G> VEM JUNTO</TituloFolha>
      <TituloFolha p={prog(t, c.d_2015 - 0.3, 0.35) * (1 - prog(t, c.v_agora - 0.6, 0.2))} size={56}><G>80%</G> VEM DA RECOMENDAÇÃO</TituloFolha>
      <SeloPlanta texto="ARTIGO DE ENGENHEIROS DA PLATAFORMA · 2015" p={prog(t, c.d_2015, 0.4) * (1 - prog(t, c.v_agora - 0.6, 0.3))} />
    </div>
  );
};

/* ------------------------------------------------ 2 · a sua lista: dez links, nenhum motivo ------------------------------------------------ */
const LK = (i: number) => ({ x: 170 + (i % 5) * 152, y: 240 + Math.floor(i / 5) * 230, w: 132, h: 190 });
export const Take1: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const ini = c.v_agora - 0.1;
  if (t < ini - 0.05) return null;
  const mg = prog(t, c.l_linha - 0.6, 0.6, ease.linear);
  if (mg >= 1) return null;
  const m = mergulho(mg, LK(0), TELA);
  const desc = prog(t, c.v_descarta - 0.1, 0.4);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans }}>
      <Camera drift={6} t={t} keys={[{ t: ini, s: 1.0 }, { t: c.v_nenhum, s: 1.04, y: -10, e: ease.out }, { t: c.v_descarta, s: 1.07, y: -16, e: ease.out }]}>
        <Prancha top={TOP} h={900}>
          <g transform={m.transform} opacity={m.opacity}>
            <g opacity={m.outros}>
              <Contorno {...TELA} p={prog(t, ini, 0.7, ease.out)} />
              <Rot x={540} y={175} anchor="middle" texto="A LISTA QUE O CLIENTE RECEBE" p={prog(t, ini + 0.2, 0.5)} />
              {Array.from({ length: 9 }, (_, j) => j + 1).map((i) => (
                <Comodo key={i} {...LK(i)} p={prog(t, c.v_dez - 0.5 + i * 0.06, 0.5, ease.out)} titulo="LINK" sub={t > c.v_nenhum - 0.1 ? "?" : ""} titleSize={26} tone={desc > 0.5 && i % 3 !== 0 ? "warn" : "linha"} />
              ))}
              <Rot x={540} y={735} anchor="middle" texto="ABRE · NÃO ENTENDE · DESCARTA" p={prog(t, c.v_abre - 0.1, 0.4)} cor={C.warn} size={26} />
            </g>
            <Comodo {...LK(0)} p={prog(t, c.v_dez - 0.5, 0.5, ease.out)} titulo="LINK" sub={t > c.v_nenhum - 0.1 ? "?" : ""} titleSize={26} tone={desc > 0.5 ? "warn" : "linha"} />
          </g>
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, ini, 0.35) * (1 - prog(t, c.l_linha - 0.6, 0.2))} size={56}>DEZ LINKS, <W>NENHUM MOTIVO</W></TituloFolha>
    </div>
  );
};

/* ------------------------------------------------ 3 · uma linha por imóvel ------------------------------------------------ */
export const Take2: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const ini = c.l_linha - 0.1;
  if (t < ini - 0.05 || t > c.f_visto + 0.3) return null;
  const sai = prog(t, c.f_visto - 0.4, 0.4);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - sai }}>
      <Camera drift={6} t={t} keys={[{ t: ini, s: 1.0 }, { t: c.l_quartos, s: 1.03, y: -10, e: ease.out }, { t: c.l_ouviu, s: 1.05, y: -16, e: ease.inOut }]}>
        <Prancha top={TOP} h={900}>
          <Contorno {...TELA} p={prog(t, ini, 0.6, ease.out)} />
          <Rot x={540} y={175} anchor="middle" texto="IMÓVEL 1 · COM UMA LINHA" p={prog(t, ini + 0.2, 0.5)} />
          <Comodo x={160} y={220} w={330} h={240} p={prog(t, c.l_separei - 0.5, 0.6, ease.out)} titulo="O QUE ELE DISSE" sub="2 QUARTOS · ESCOLA" titleSize={28} tone="muted" />
          <Comodo x={590} y={220} w={330} h={240} p={prog(t, ini, 0.6, ease.out)} titulo="IMÓVEL 1" titleSize={40} acende={prog(t, c.l_recomendacao - 0.1, 0.4)} />
          <Rota id="ouviu" d="M 490 340 L 590 340" p={prog(t, c.l_ouviu - 0.2, 0.5)} tom="accent" />
          <Chamada x={755} y={460} bx={190} by={560} bw={700} texto="SEPAREI ESTE PORQUE…" p={prog(t, c.l_separei - 0.3, 0.6)} tone="linha" />
          <Cota x1={190} x2={520} y={700} texto="2 QUARTOS" p={prog(t, c.l_quartos - 0.2, 0.5)} cor={C.text} />
          <Cota x1={560} x2={890} y={700} texto="PERTO DA ESCOLA" p={prog(t, c.l_escola - 0.2, 0.5)} cor={C.text} />
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, ini, 0.35) * (1 - prog(t, c.l_ouviu - 0.4, 0.2))} size={56}><G>UMA LINHA</G> POR IMÓVEL</TituloFolha>
      <TituloFolha p={prog(t, c.l_ouviu - 0.2, 0.35)} size={56}>MOSTRA QUE VOCÊ <G>OUVIU</G></TituloFolha>
    </div>
  );
};

/* ------------------------------------------------ 4 · com motivo × sem motivo ------------------------------------------------ */
export const Take3: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const ini = c.f_visto - 0.35;
  if (t < ini - 0.05 || t > c.cta_quer + 0.4) return null;
  const sai = prog(t, c.cta_quer - 0.2, 0.5);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(prog(t, ini, 0.35), 1 - sai) }}>
      <Camera drift={6} t={t} keys={[{ t: ini, s: 1.0 }, { t: c.f_link, s: 1.05, y: -12, e: ease.out }]}>
        <Prancha top={TOP} h={900}>
          <Contorno {...TELA} p={prog(t, ini, 0.6, ease.out)} />
          <Comodo x={160} y={220} w={360} h={420} p={prog(t, ini, 0.6, ease.out)} titulo="COM MOTIVO" sub="É VISTO" titleSize={36} acende={prog(t, c.f_visto - 0.05, 0.4)} />
          <Comodo x={560} y={220} w={360} h={420} p={prog(t, c.f_link - 0.6, 0.6, ease.out)} titulo="SEM MOTIVO" sub="MAIS UM LINK" titleSize={36} tone="muted" />
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, ini, 0.35)} size={56}>COM MOTIVO, <G>É VISTO</G></TituloFolha>
    </div>
  );
};
