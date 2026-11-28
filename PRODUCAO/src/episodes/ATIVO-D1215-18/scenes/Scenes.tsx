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
 * ATIVO-D1215-18 — "A ideia em uma frase" (grade 15/12/2026 · 18h · HISTÓRIA QUE ENSINA · Planta técnica v2).
 * Folha 1: a prancha do concurso de 1957 recebe rabiscos a lápis → poucos desenhos e um texto à máquina; a chamada
 * PEDIU DESCULPAS PELA APRESENTAÇÃO → os dois eixos se desenham e se cruzam (a ideia numa frase) → mergulho no cruzamento
 * → Folha 2: o anúncio — a lista de itens apaga e A FRASE DO IMÓVEL acende: PARA QUEM? / POR QUÊ? → quem entende lembra.
 * Apuração: Relatório do Plano Piloto (Lúcio Costa, 1957); IPHAN; Câmara dos Deputados. Não afirma o motivo do júri.
 */
const M = "JetBrains Mono";
const TOP = 380;
const fade = (p: number) => clamp01(p * 1.5);
const TELA = { x: 120, y: 120, w: 840, h: 640 };
const G: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: A.hex }}>{children}</span>;
const Rot: React.FC<{ x: number; y: number; texto: string; p: number; cor?: string; size?: number }> = ({ x, y, texto, p, cor = C.muted, size = 26 }) => (
  <text x={x} y={y} textAnchor="middle" fill={cor} fontFamily={M} fontWeight={700} fontSize={size} letterSpacing="0.12em" opacity={fade(p)}>{texto}</text>
);
const Rabisco: React.FC<{ d: string; p: number; cor?: string }> = ({ d, p, cor = C.muted }) => (
  <path d={d} fill="none" stroke={cor} strokeWidth={3} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - clamp01(p)} opacity={0.8} />
);

/* ------------------------------------------------ 1 · o concurso ------------------------------------------------ */
export const Concurso: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const mg = prog(t, c.a_frase - 0.8, 0.6, ease.linear);
  if (mg >= 1) return null;
  const CRUZ = { x: 440, y: 330, w: 200, h: 200 };
  const m = mergulho(mg, CRUZ, TELA);
  const ano = prog(t, c.e_1957 - 0.2, 0.4);
  const frase = prog(t, c.x_frase - 0.3, 0.4);
  const eixos = prog(t, c.x_eixos - 0.2, 0.9, ease.out);
  const clara = prog(t, c.v_clara - 0.2, 0.4);
  const someRab = 1 - prog(t, c.x_frase - 0.3, 0.5);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans }}>
      <Camera drift={6} t={t} keys={[{ t: 0, s: 1.05, y: -8 }, { t: c.h_rabiscos, s: 1.0, e: ease.out }, { t: c.e_desculpas, s: 1.03, y: -8, e: ease.inOut }, { t: c.x_cruzam, s: 1.0, e: ease.out }, { t: c.v_clara, s: 1.05, y: -12, e: ease.out }]}>
        <Prancha top={TOP} h={900}>
          <g transform={m.transform} opacity={m.opacity}>
            <g opacity={m.outros}>
              <Contorno {...TELA} p={prog(t, -0.1, 0.9, ease.out)} />
              <Rot x={540} y={168} texto="CONCURSO DO PLANO PILOTO" p={prog(t, 0.2, 0.5)} />
              <g opacity={someRab}>
                <Rabisco d="M180 260 q40 -40 80 0 t80 0 t80 0" p={prog(t, c.h_rabiscos - 0.3, 0.8)} />
                <Rabisco d="M200 330 q60 50 120 -10 t120 20" p={prog(t, c.h_rabiscos, 0.8)} />
                <Rabisco d="M640 250 c40 -30 120 -30 160 20 s40 80 -20 90" p={prog(t, c.h_lapis - 0.3, 0.8)} />
                <Rabisco d="M650 400 l60 -20 l50 40 l70 -30" p={prog(t, c.h_lapis, 0.8)} />
              </g>
              <g opacity={someRab}>
                <Comodo x={160} y={460} w={340} h={130} p={prog(t, c.e_desenhos - 0.3, 0.4, ease.out)} titulo="POUCOS DESENHOS" titleSize={24} tone="linha" />
                <Comodo x={580} y={460} w={340} h={130} p={prog(t, c.e_maquina - 0.3, 0.4, ease.out)} titulo="TEXTO À MÁQUINA" titleSize={24} tone="linha" />
              </g>
              <Chamada x={540} y={600} bx={170} by={640} bw={740} texto="PEDIU DESCULPAS PELA APRESENTAÇÃO" p={prog(t, c.e_desculpas - 0.2, 0.4) * (1 - frase)} tone="linha" />
              <Rota id="eixo-mon" d="M540 170 L540 720" p={eixos} />
              <Rota id="eixo-rod" d="M150 520 Q540 330 930 520" p={prog(t, c.x_cruzam - 0.4, 0.9, ease.out)} />
              <Cota x1={170} x2={910} y={740} texto="DOIS EIXOS QUE SE CRUZAM" p={prog(t, c.x_cruzam - 0.1, 0.4)} cor={A.hex} />
            </g>
            <Comodo {...CRUZ} p={frase} titulo="" titleSize={24} acende={Math.max(clara * 0.45, mg * 0.6)} />
          </g>
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, -0.3, 0.4) * (1 - ano)} size={56}>BRASÍLIA EM <G>RABISCOS</G></TituloFolha>
      <TituloFolha p={ano * (1 - frase)} size={56}>1957: <G>POUCOS DESENHOS</G></TituloFolha>
      <TituloFolha p={frase * (1 - prog(t, c.v_detalhes - 0.3, 0.3))} size={56}>A IDEIA NUMA <G>FRASE</G></TituloFolha>
      <TituloFolha p={prog(t, c.v_detalhes - 0.2, 0.35) * (1 - prog(t, c.a_frase - 0.8, 0.2))} size={56}>PRIMEIRO, <G>A IDEIA</G></TituloFolha>
      <SeloPlanta texto="LÚCIO COSTA · RELATÓRIO DO PLANO PILOTO, 1957" p={prog(t, c.e_1957 - 0.1, 0.4) * (1 - prog(t, c.a_frase - 0.8, 0.3))} />
    </div>
  );
};

/* ------------------------------------------------ 2 · o anúncio ------------------------------------------------ */
export const Anuncio: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const ini = c.a_frase - 0.25;
  if (t < ini - 0.05 || t > c.cta_quer + 0.4) return null;
  const sai = prog(t, c.cta_quer - 0.2, 0.5);
  const fim = prog(t, c.d_lembra - 0.2, 0.4);
  const lista = 1 - prog(t, c.a_frase + 0.2, 0.6) * 0.75;
  const ITENS = ["SALA", "3 QUARTOS", "VARANDA", "2 VAGAS"];
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(prog(t, ini, 0.35), 1 - sai) }}>
      <Camera drift={6} t={t} keys={[{ t: ini, s: 1.0 }, { t: c.a_porque, s: 1.03, y: -8, e: ease.out }, { t: c.d_lembra, s: 1.06, y: -14, e: ease.out }]}>
        <Prancha top={TOP} h={900}>
          <Contorno {...TELA} p={prog(t, ini, 0.6, ease.out)} />
          <Rot x={540} y={168} texto="O ANÚNCIO" p={prog(t, ini + 0.2, 0.5)} />
          <Comodo x={170} y={200} w={740} h={130} p={prog(t, c.a_frase - 0.1, 0.4, ease.out)} titulo="A FRASE DO IMÓVEL" titleSize={34} acende={prog(t, c.a_frase, 0.4) * (fim > 0.5 ? 0.6 : 0.45)} />
          <Comodo x={170} y={350} w={360} h={110} p={prog(t, c.a_quem - 0.3, 0.4, ease.out)} titulo="PARA QUEM?" titleSize={28} acende={prog(t, c.a_quem - 0.1, 0.4) * 0.35} />
          <Comodo x={550} y={350} w={360} h={110} p={prog(t, c.a_porque - 0.3, 0.4, ease.out)} titulo="POR QUÊ?" titleSize={28} acende={prog(t, c.a_porque - 0.1, 0.4) * 0.35} />
          <g opacity={lista}>
            {ITENS.map((s, i) => <Rot key={s} x={260 + i * 190} y={540} texto={s} p={prog(t, ini + 0.2 + i * 0.1, 0.4)} size={24} />)}
          </g>
          <Cota x1={170} x2={910} y={600} texto="A LISTA VEM DEPOIS" p={prog(t, c.a_frase + 0.6, 0.4)} cor={C.muted} />
          <Cota x1={170} x2={910} y={700} texto="QUEM ENTENDE A IDEIA, LEMBRA" p={prog(t, c.d_entende - 0.2, 0.4)} cor={A.hex} />
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, ini, 0.35) * (1 - prog(t, c.d_entende - 0.5, 0.2))} size={56}>A FRASE <G>DO IMÓVEL</G></TituloFolha>
      <TituloFolha p={prog(t, c.d_entende - 0.3, 0.35)} size={56}>QUEM ENTENDE, <G>LEMBRA</G></TituloFolha>
    </div>
  );
};
