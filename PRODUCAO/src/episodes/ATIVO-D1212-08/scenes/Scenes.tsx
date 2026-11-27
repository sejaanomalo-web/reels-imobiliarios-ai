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
 * ATIVO-D1212-08 — "A ficha técnica da casa" (grade 12/12/2026 · 08h · E SE…? · Planta técnica v2).
 * Folha 1: a planta da casa e, ao lado, uma ficha em branco → Portugal, desde 2004: a Ficha Técnica da Habitação → as linhas
 * acendem (áreas, materiais, instalações) e a rota leva a ficha ao comprador → aqui, as linhas ficam em branco até depois
 * da visita → mergulho na ficha → Folha 2: a ficha do corretor (metragem, ano, reformas, documentação) → a visita mostra a
 * parede; a ficha mostra o que tem dentro. Apuração: Decreto-Lei 68/2004 (Portugal). Sem escritura, sem números.
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

/* ------------------------------------------------ 1 · a planta e a ficha ------------------------------------------------ */
export const PlantaFicha: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const mg = prog(t, c.a_monte - 0.7, 0.6, ease.linear);
  if (mg >= 1) return null;
  const FICHA = { x: 600, y: 200, w: 320, h: 420 };
  const m = mergulho(mg, FICHA, TELA);
  const pt = prog(t, c.p_portugal - 0.2, 0.4);
  const aqui = prog(t, c.v_aqui - 0.2, 0.4);
  const LIN: [number, string][] = [[c.c_areas, "ÁREAS"], [c.c_materiais, "MATERIAIS"], [c.c_instalacoes, "INSTALAÇÕES"]];
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans }}>
      <Camera drift={6} t={t} keys={[{ t: 0, s: 1.05, y: -8 }, { t: c.h_carro, s: 1.0, e: ease.out }, { t: c.c_areas, s: 1.03, y: -8, e: ease.inOut }, { t: c.v_depois, s: 1.05, y: -12, e: ease.out }]}>
        <Prancha top={TOP} h={900}>
          <g transform={m.transform} opacity={m.opacity}>
            <g opacity={m.outros}>
              <Contorno {...TELA} p={prog(t, -0.1, 0.9, ease.out)} />
              <Rot x={540} y={168} texto={t > c.v_aqui - 0.2 ? "BRASIL · A MESMA CASA" : pt > 0.5 ? "PORTUGAL · DESDE 2004" : "A CASA E A FICHA"} p={prog(t, 0.2, 0.5)} cor={t > c.v_aqui - 0.2 ? C.warn : C.muted} />
              <Comodo x={150} y={200} w={250} h={200} p={prog(t, 0.2, 0.5, ease.out)} titulo="SALA" titleSize={26} />
              <Comodo x={400} y={200} w={160} h={200} p={prog(t, 0.35, 0.5, ease.out)} titulo="COZINHA" titleSize={22} />
              <Comodo x={150} y={400} w={410} h={220} p={prog(t, 0.5, 0.5, ease.out)} titulo="QUARTO" titleSize={26} />
              <Cota x1={600} x2={920} y={655} texto="IGUAL CARRO?" p={prog(t, c.h_carro - 0.2, 0.4) * (1 - pt)} cor={C.text} />
              <Comodo x={640} y={680} w={240} h={64} p={prog(t, c.c_comprador - 0.3, 0.4, ease.out) * (1 - aqui)} titulo="COMPRADOR" titleSize={22} acende={prog(t, c.c_comprador, 0.4) * 0.5} />
              <Rota id="ficha" d="M760 620 L760 680" p={prog(t, c.c_comprador - 0.4, 0.4, ease.linear) * (1 - aqui)} />
              <Chamada x={760} y={420} bx={150} by={660} bw={420} texto="SÓ DEPOIS DA VISITA" p={prog(t, c.v_depois - 0.2, 0.4)} tone="warn" />
            </g>
            <Comodo {...FICHA} p={prog(t, c.h_ficha - 0.3, 0.5, ease.out)} titulo={pt > 0.5 ? "FICHA TÉCNICA" : "FICHA?"} sub={pt > 0.5 ? "DA HABITAÇÃO" : ""} titleSize={26} tone={aqui > 0.5 ? "warn" : "linha"} acende={Math.max(prog(t, c.p_ficha - 0.2, 0.4) * 0.35 * (1 - aqui), mg * 0.5)} />
            {LIN.map(([at, s], i) => (
              <g key={s} opacity={m.outros}>
                <Rot x={760} y={505 + i * 45} texto={aqui > 0.5 ? "— — —" : s} p={prog(t, at - 0.15, 0.3)} cor={aqui > 0.5 ? C.warn : A.hex} size={26} />
              </g>
            ))}
          </g>
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, -0.3, 0.4) * (1 - prog(t, c.p_portugal - 0.5, 0.2))} size={56}>E SE A CASA TIVESSE <G>FICHA TÉCNICA</G>?</TituloFolha>
      <TituloFolha p={prog(t, c.p_portugal - 0.3, 0.35) * (1 - prog(t, c.c_construcao - 0.5, 0.2))} size={56}>EM PORTUGAL, <G>JÁ TEM</G></TituloFolha>
      <TituloFolha p={prog(t, c.c_construcao - 0.3, 0.35) * (1 - prog(t, c.v_aqui - 0.5, 0.2))} size={56}>A CONSTRUÇÃO <G>NO PAPEL</G></TituloFolha>
      <TituloFolha p={prog(t, c.v_aqui - 0.3, 0.35) * (1 - prog(t, c.a_monte - 0.7, 0.2))} size={56}>AQUI, <W>DEPOIS DA VISITA</W></TituloFolha>
      <SeloPlanta texto="DECRETO-LEI 68/2004 · PORTUGAL" p={prog(t, c.p_portugal - 0.1, 0.4) * (1 - prog(t, c.v_aqui - 0.3, 0.3))} />
    </div>
  );
};

/* ------------------------------------------------ 2 · a sua ficha ------------------------------------------------ */
export const SuaFicha: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const ini = c.a_monte - 0.15;
  if (t < ini - 0.05 || t > c.cta_quer + 0.4) return null;
  const sai = prog(t, c.cta_quer - 0.2, 0.5);
  const fim = prog(t, c.f_dentro - 0.2, 0.4);
  const ROWS: [number, string][] = [[c.a_metragem, "METRAGEM DE CADA CÔMODO"], [c.a_ano, "ANO DA CONSTRUÇÃO"], [c.a_reformas, "REFORMAS FEITAS"], [c.a_documentacao, "DOCUMENTAÇÃO EM ORDEM"]];
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(prog(t, ini, 0.35), 1 - sai) }}>
      <Camera drift={6} t={t} keys={[{ t: ini, s: 1.0 }, { t: c.a_documentacao, s: 1.03, y: -8, e: ease.out }, { t: c.f_dentro, s: 1.06, y: -14, e: ease.out }]}>
        <Prancha top={TOP} h={900}>
          <Contorno {...TELA} p={prog(t, ini, 0.6, ease.out)} />
          <Rot x={540} y={168} texto="PROJETO: A FICHA DO IMÓVEL" p={prog(t, ini + 0.2, 0.5)} />
          {ROWS.map(([at, s], i) => (
            <Comodo key={s} x={170} y={200 + i * 120} w={740} h={100} p={prog(t, at - 0.3, 0.4, ease.out)} titulo={s} titleSize={28} acende={prog(t, at - 0.1, 0.4) * (fim > 0.5 ? 0.55 : 0.4)} />
          ))}
          <Cota x1={170} x2={910} y={710} texto={t > c.f_dentro - 0.2 ? "A FICHA MOSTRA O QUE TEM DENTRO" : "A VISITA MOSTRA A PAREDE"} p={prog(t, c.f_parede - 0.2, 0.4)} cor={fim > 0.5 ? A.hex : C.text} />
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, ini, 0.35) * (1 - prog(t, c.f_parede - 0.5, 0.2))} size={56}>MONTE <G>A SUA</G></TituloFolha>
      <TituloFolha p={prog(t, c.f_parede - 0.3, 0.35)} size={56}>O QUE TEM <G>DENTRO DA PAREDE</G></TituloFolha>
    </div>
  );
};
