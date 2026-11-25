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
 * ATIVO-D1204-18 — "O letreiro era um anúncio" (grade 04/12/2026 · 18h · HISTÓRIA QUE ENSINA · Planta técnica v2).
 * Folhas: a encosta em elevação com letras genéricas (o desenho do letreiro é marca registrada: não é reproduzido) e o
 * LOTEAMENTO embaixo → mergulho: não anunciava a casa, anunciava o lugar (colinas, vista, jeito de morar) → 1949: as quatro
 * últimas letras saem (LAND) → nome do bairro, símbolo da cidade → mergulho na casa: rua, padaria, caminho de volta →
 * mostre o lugar, não só a planta. Apuração: LA Conservancy, History.com, Snopes (1923; 1949).
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
/** Encosta em elevação + 13 blocos de letra genéricos (sem desenho de marca). `sai` apaga os 4 últimos. */
const Encosta: React.FC<{ t: number; at: number; p: number; sai?: number; acende?: number }> = ({ t, at, p, sai = 0, acende = 0 }) => (
  <g opacity={fade(p)}>
    <path d="M 140 520 C 260 380, 380 300, 540 290 C 700 300, 820 360, 940 470" fill="none" stroke={C.text} strokeOpacity={0.8} strokeWidth={3} strokeDasharray="1400" strokeDashoffset={1400 * (1 - clamp01(p))} />
    {Array.from({ length: 13 }, (_, i) => {
      const x = 200 + i * 52;
      const y = 380 - Math.sin((i / 12) * Math.PI) * 70;
      const q = prog(t, at + i * 0.05, 0.3);
      const fora = i >= 9 ? sai : 0;
      const cor = i >= 9 && sai > 0.05 ? C.warn : acende > 0.5 ? A.hex : C.text;
      return <rect key={i} x={x} y={y - 46 * q} width={40} height={46 * q} fill="none" stroke={cor} strokeWidth={3} opacity={(1 - fora) * q} />;
    })}
  </g>
);

/* ------------------------------------------------ 1 · a encosta e o loteamento ------------------------------------------------ */
const LOTE = { x: 220, y: 560, w: 640, h: 170 };
export const Hook: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const mg = prog(t, c.u_casa - 0.7, 0.6, ease.linear);
  if (mg >= 1) return null;
  const m = mergulho(mg, LOTE, TELA);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans }}>
      <Camera drift={6} t={t} keys={[{ t: 0, s: 1.05, y: -8 }, { t: c.h_anuncio, s: 1.0, e: ease.out }, { t: c.l_letras, s: 1.04, y: -14, e: ease.inOut }]}>
        <Prancha top={TOP} h={900}>
          <g transform={m.transform} opacity={m.opacity}>
            <g opacity={m.outros}>
              <Contorno {...TELA} p={prog(t, -0.1, 0.9, ease.out)} />
              <Rot x={540} y={170} anchor="middle" texto="ELEVAÇÃO · COLINAS · LOS ANGELES" p={prog(t, 0.2, 0.5)} />
              <Encosta t={t} at={0.3} p={prog(t, 0.1, 1.0, ease.out)} />
              <Cota x1={200} x2={870} y={410} texto="LETRAS GIGANTES" p={prog(t, c.l_letras - 0.2, 0.5)} cor={C.text} />
              <Chamada x={700} y={330} bx={560} by={200} bw={360} texto="PROVISÓRIO" p={prog(t, c.l_provisorio - 0.2, 0.5)} tone="warn" />
            </g>
            <Comodo {...LOTE} p={prog(t, c.l_loteamento - 0.3, 0.6, ease.out)} titulo="LOTEAMENTO" sub="LOTES À VENDA" titleSize={40} acende={prog(t, c.h_anuncio - 0.1, 0.4) * 0.6} />
          </g>
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, -0.3, 0.4) * (1 - prog(t, c.l_1923 - 0.4, 0.2))} size={56}>O LETREIRO ERA <G>UM ANÚNCIO</G></TituloFolha>
      <TituloFolha p={prog(t, c.l_1923 - 0.3, 0.35) * (1 - prog(t, c.u_casa - 0.7, 0.2))} size={56}>1923: UM <G>LOTEAMENTO</G></TituloFolha>
      <SeloPlanta texto="LOS ANGELES · 1923" p={prog(t, c.l_1923, 0.4) * (1 - prog(t, c.u_casa - 0.7, 0.3))} />
    </div>
  );
};

/* ------------------------------------------------ 2 · não anunciava a casa: anunciava o lugar ------------------------------------------------ */
export const Lugar: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const ini = c.u_casa - 0.15;
  if (t < ini - 0.05 || t > c.v_1949 + 0.3) return null;
  const sai = prog(t, c.v_1949 - 0.4, 0.4);
  const lugar = prog(t, c.u_lugar - 0.1, 0.4);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: 1 - sai }}>
      <Camera drift={6} t={t} keys={[{ t: ini, s: 1.0 }, { t: c.u_lugar, s: 1.03, y: -8, e: ease.out }, { t: c.u_jeito, s: 1.06, y: -14, e: ease.inOut }]}>
        <Prancha top={TOP} h={900}>
          <Contorno {...TELA} p={prog(t, ini, 0.6, ease.out)} />
          <Rot x={540} y={170} anchor="middle" texto="O QUE O ANÚNCIO VENDIA" p={prog(t, ini + 0.2, 0.5)} />
          <Comodo x={420} y={360} w={240} h={170} p={prog(t, ini, 0.5, ease.out)} titulo="UMA CASA" titleSize={30} tone={lugar > 0.5 ? "muted" : "linha"} />
          <Comodo x={160} y={210} w={240} h={130} p={prog(t, c.u_colinas - 0.3, 0.5, ease.out)} titulo="COLINAS" titleSize={30} acende={prog(t, c.u_colinas - 0.1, 0.3)} />
          <Comodo x={680} y={210} w={240} h={130} p={prog(t, c.u_vista - 0.3, 0.5, ease.out)} titulo="VISTA" titleSize={30} acende={prog(t, c.u_vista - 0.1, 0.3)} />
          <Comodo x={300} y={570} w={480} h={140} p={prog(t, c.u_jeito - 0.3, 0.5, ease.out)} titulo="JEITO DE MORAR" titleSize={32} acende={prog(t, c.u_jeito - 0.1, 0.3)} />
          <Rota id="lugar" d="M 400 275 L 420 360 M 680 275 L 660 360 M 540 530 L 540 570" p={prog(t, c.u_jeito, 0.5)} tom="accent" />
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, ini, 0.35) * (1 - prog(t, c.u_lugar - 0.4, 0.2))} size={56}>NÃO ANUNCIAVA <W>A CASA</W></TituloFolha>
      <TituloFolha p={prog(t, c.u_lugar - 0.3, 0.35)} size={56}>ANUNCIAVA <G>O LUGAR</G></TituloFolha>
    </div>
  );
};

/* ------------------------------------------------ 3 · 1949: sai o LAND ------------------------------------------------ */
const CASA = { x: 400, y: 330, w: 280, h: 200 };
export const Virada: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const ini = c.v_1949 - 0.35;
  if (t < ini - 0.05) return null;
  const mg = prog(t, c.c_rua - 0.7, 0.6, ease.linear);
  if (mg >= 1) return null;
  const m = mergulho(mg, CASA, TELA);
  const sai = prog(t, c.v_land - 0.1, 0.6);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: prog(t, ini, 0.35) }}>
      <Camera drift={6} t={t} keys={[{ t: ini, s: 1.0 }, { t: c.v_land, s: 1.04, y: -10, e: ease.out }, { t: c.v_simbolo, s: 1.07, y: -16, e: ease.inOut }]}>
        <Prancha top={TOP} h={900}>
          <g transform={m.transform} opacity={m.opacity}>
            <g opacity={m.outros}>
              <Contorno {...TELA} p={prog(t, ini, 0.6, ease.out)} />
              <Rot x={540} y={170} anchor="middle" texto="ELEVAÇÃO · 1949" p={prog(t, ini + 0.2, 0.5)} />
              <Encosta t={t} at={ini} p={prog(t, ini, 0.6, ease.out)} sai={sai} acende={prog(t, c.v_simbolo - 0.1, 0.4)} />
              <Chamada x={820} y={380} bx={640} by={470} bw={280} texto="SAI: LAND" p={prog(t, c.v_land - 0.2, 0.5)} tone="warn" />
              <Cota x1={200} x2={660} y={420} texto="NOME DO BAIRRO" p={prog(t, c.v_bairro - 0.2, 0.5)} cor={C.text} />
              <Comodo x={200} y={560} w={680} h={150} p={prog(t, c.v_simbolo - 0.3, 0.5, ease.out)} titulo="SÍMBOLO DA CIDADE" titleSize={36} acende={prog(t, c.v_simbolo - 0.1, 0.4)} />
            </g>
            <g opacity={prog(t, c.c_rua - 0.9, 0.3)}><Comodo {...CASA} p={1} titulo="UM IMÓVEL" titleSize={30} /></g>
          </g>
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, ini, 0.35) * (1 - prog(t, c.v_bairro - 0.4, 0.2))} size={56}>1949: <W>SAI O LAND</W></TituloFolha>
      <TituloFolha p={prog(t, c.v_bairro - 0.3, 0.35) * (1 - prog(t, c.c_rua - 0.7, 0.2))} size={56}>O ANÚNCIO <G>VIROU O LUGAR</G></TituloFolha>
    </div>
  );
};

/* ------------------------------------------------ 4 · quem compra um imóvel compra o lugar ------------------------------------------------ */
export const Entorno: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const ini = c.c_rua - 0.15;
  if (t < ini - 0.05 || t > c.cta_quer + 0.4) return null;
  const sai = prog(t, c.cta_quer - 0.2, 0.5);
  const tudo = prog(t, c.f_lugar - 0.1, 0.5);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(prog(t, ini, 0.35), 1 - sai) }}>
      <Camera drift={6} t={t} keys={[{ t: ini, s: 1.0 }, { t: c.c_caminho, s: 1.03, y: -10, e: ease.out }, { t: c.f_planta, s: 1.06, y: -14, e: ease.out }]}>
        <Prancha top={TOP} h={900}>
          <Contorno {...TELA} p={prog(t, ini, 0.6, ease.out)} />
          <Rot x={540} y={170} anchor="middle" texto="O IMÓVEL E O QUE VEM JUNTO" p={prog(t, ini + 0.2, 0.5)} />
          <Comodo x={400} y={330} w={280} h={200} p={1} titulo="A PLANTA" titleSize={32} tone={tudo > 0.5 ? "muted" : "linha"} />
          <Comodo x={150} y={210} w={210} h={120} p={prog(t, c.c_rua - 0.3, 0.5, ease.out)} titulo="A RUA" titleSize={28} acende={prog(t, c.c_rua - 0.1, 0.3) * (0.5 + 0.5 * tudo)} />
          <Comodo x={720} y={210} w={210} h={120} p={prog(t, c.c_padaria - 0.3, 0.5, ease.out)} titulo="A PADARIA" titleSize={28} acende={prog(t, c.c_padaria - 0.1, 0.3) * (0.5 + 0.5 * tudo)} />
          <Comodo x={220} y={590} w={640} h={120} p={prog(t, c.c_caminho - 0.3, 0.5, ease.out)} titulo="O CAMINHO DE VOLTA" titleSize={30} acende={prog(t, c.c_caminho - 0.1, 0.3) * (0.5 + 0.5 * tudo)} />
          <Rota id="ent" d="M 360 270 L 400 360 M 720 270 L 680 360 M 540 530 L 540 590" p={prog(t, c.c_caminho + 0.1, 0.5)} tom="accent" />
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, ini, 0.35) * (1 - prog(t, c.f_lugar - 0.4, 0.2))} size={56}>QUEM COMPRA, <G>COMPRA O LUGAR</G></TituloFolha>
      <TituloFolha p={prog(t, c.f_lugar - 0.3, 0.35)} size={56}>MOSTRE O LUGAR, <W>NÃO SÓ A PLANTA</W></TituloFolha>
    </div>
  );
};
