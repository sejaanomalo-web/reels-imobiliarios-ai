import React from "react";
import { C, F } from "../../../theme";
import { Camera } from "../../../components/Camera";
import type { SceneProps } from "../../types";
import { A, aa } from "../../NOV26/kit";
import {
  Chamada, Comodo, Contorno, Cota, CotaV, Prancha, SeloPlanta, TituloFolha,
  clamp01, ease, mergulho, prog,
} from "../../../estilos/planta";

/**
 * ATIVO-D1208-18 — "A torre provisória" (grade 08/12/2026 · 18h · HISTÓRIA QUE ENSINA · Planta técnica v2).
 * Folhas: a elevação da torre se desenha; cota de 20 anos (1889 → 1909), podia ser desmontada; "feia e inútil" → a antena no
 * topo acende: salva por um novo uso → mergulho na antena → a planta de uma casa: o quarto extra vira escritório, a edícula
 * vira renda → não é reforma, é um novo uso. Apuração: site oficial da Torre Eiffel; History.com.
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
const ANTENA = { x: 470, y: 120, w: 140, h: 120 };

/** Elevação da torre em linha fina, desenhada por progresso. */
const Torre: React.FC<{ p: number; tom: string; tracejado?: number }> = ({ p, tom, tracejado = 0 }) => {
  const d = "M330 730 C 420 560, 480 360, 525 200 L 555 200 C 600 360, 660 560, 750 730 M 395 600 L 685 600 M 450 440 L 630 440 M 500 300 L 580 300 M 430 730 C 470 650, 610 650, 650 730 M 525 200 L 540 160 L 555 200";
  return <path d={d} fill="none" stroke={tom} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" pathLength={1} style={{ strokeDasharray: tracejado > 0.5 ? "0.012 0.01" : `${p} 1` }} />;
};

/* ------------------------------------------------ 1 · a torre provisória ------------------------------------------------ */
export const TorreFolha: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const mg = prog(t, c.a_usos - 1.6, 0.6, ease.linear);
  if (mg >= 1) return null;
  const m = mergulho(mg, ANTENA, TELA);
  const desm = prog(t, c.l_desmontada - 0.2, 0.4) * (1 - prog(t, c.v_salva - 0.2, 0.4));
  const ant = prog(t, c.v_antena - 0.2, 0.5);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans }}>
      <Camera drift={6} t={t} keys={[{ t: 0, s: 1.05, y: -8 }, { t: c.l_1889, s: 1.0, e: ease.out }, { t: c.e_feia, s: 1.03, y: -10, e: ease.inOut }, { t: c.v_antena, s: 1.06, y: 10, e: ease.out }]}>
        <Prancha top={TOP} h={900}>
          <g transform={m.transform} opacity={m.opacity}>
            <g opacity={m.outros}>
              <Contorno {...TELA} p={prog(t, -0.1, 0.9, ease.out)} />
              <Rot x={540} y={168} texto="ELEVAÇÃO · EXPOSIÇÃO DE 1889" p={prog(t, c.h_eiffel, 0.5)} />
              <line x1={200} y1={730} x2={880} y2={730} stroke={C.text} strokeWidth={3} opacity={fade(prog(t, 0, 0.6))} />
              <Torre p={prog(t, 0.1, 2.2, ease.inOut)} tom={desm > 0.5 ? C.warn : C.text} tracejado={desm} />
              <CotaV x={860} y1={730} y2={160} texto="20 ANOS" p={prog(t, c.h_vinte - 0.2, 0.5) * (1 - prog(t, c.v_salva, 0.4))} cor={C.text} />
              <Cota x1={250} x2={830} y={810} texto="1889 → 1909" p={prog(t, c.l_1909 - 0.3, 0.5)} cor={C.text} />
              <Chamada x={420} y={600} bx={150} by={650} bw={390} texto="PODIA SER DESMONTADA" p={desm} tone="warn" />
              <Chamada x={640} y={440} bx={590} by={650} bw={320} texto="FEIA E INÚTIL?" p={prog(t, c.e_feia - 0.2, 0.4) * (1 - prog(t, c.v_salva - 0.2, 0.3))} tone="warn" />
              <Chamada x={560} y={200} bx={150} by={650} bw={560} texto="NOVO USO: ANTENA DE RÁDIO" p={prog(t, c.v_uso - 0.2, 0.4)} tone="accent" />
            </g>
            <g opacity={ant}>
              <line x1={540} y1={160} x2={540} y2={120} stroke={A.hex} strokeWidth={5} style={{ filter: `drop-shadow(0 0 10px ${aa(0.7)})` }} />
              {[22, 40, 58].map((r) => <path key={r} d={`M${540 - r} ${130 - r * 0.4} A ${r} ${r} 0 0 1 ${540 + r} ${130 - r * 0.4}`} fill="none" stroke={A.hex} strokeWidth={3} opacity={0.4 + 0.6 * clamp01(Math.sin(t * 4 - r / 20) * 0.5 + 0.5)} />)}
            </g>
          </g>
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, -0.3, 0.4) * (1 - prog(t, c.l_1889 - 0.6, 0.2))} size={56}>FEITA PARA DURAR <G>20 ANOS</G></TituloFolha>
      <TituloFolha p={prog(t, c.l_1889 - 0.4, 0.35) * (1 - prog(t, c.e_feia - 0.6, 0.2))} size={56}>AUTORIZAÇÃO ATÉ <W>1909</W></TituloFolha>
      <TituloFolha p={prog(t, c.e_feia - 0.4, 0.35) * (1 - prog(t, c.v_salva - 0.6, 0.2))} size={56}>MUITA GENTE <W>NÃO GOSTAVA</W></TituloFolha>
      <TituloFolha p={prog(t, c.v_salva - 0.4, 0.35) * (1 - prog(t, c.a_usos - 1.6, 0.2))} size={56}>SALVA POR UM <G>NOVO USO</G></TituloFolha>
      <SeloPlanta texto="SITE OFICIAL DA TORRE EIFFEL · HISTORY.COM" p={prog(t, c.l_1889 - 0.2, 0.4) * (1 - prog(t, c.a_usos - 1.6, 0.3))} />
    </div>
  );
};

/* ------------------------------------------------ 2 · os usos do imóvel ------------------------------------------------ */
export const Usos: React.FC<SceneProps> = ({ t, tl }) => {
  const c = tl.cues;
  const ini = c.a_usos - 1.05;
  if (t < ini - 0.05 || t > c.cta_quer + 0.4) return null;
  const sai = prog(t, c.cta_quer - 0.2, 0.5);
  const esc = prog(t, c.a_escritorio - 0.15, 0.4);
  const ren = prog(t, c.a_renda - 0.15, 0.4);
  const fim = prog(t, c.f_novo - 0.2, 0.4);
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: F.sans, opacity: Math.min(prog(t, ini, 0.35), 1 - sai) }}>
      <Camera drift={6} t={t} keys={[{ t: ini, s: 1.0 }, { t: c.a_escritorio, s: 1.03, y: -8, e: ease.out }, { t: c.f_novo, s: 1.06, y: -14, e: ease.out }]}>
        <Prancha top={TOP} h={900}>
          <Contorno {...TELA} p={prog(t, ini, 0.6, ease.out)} />
          <Rot x={540} y={168} texto="O IMÓVEL DO SEU CLIENTE" p={prog(t, ini + 0.2, 0.5)} />
          <Comodo x={150} y={200} w={420} h={240} p={prog(t, ini + 0.2, 0.5, ease.out)} titulo="SALA" titleSize={30} tone="muted" />
          <Comodo x={590} y={200} w={340} h={240} p={prog(t, ini + 0.3, 0.5, ease.out)} titulo={esc > 0.5 ? "ESCRITÓRIO" : "QUARTO EXTRA"} sub={esc > 0.5 ? "ERA O QUARTO EXTRA" : ""} titleSize={30} acende={Math.max(esc * 0.6, fim * 0.7)} />
          <Comodo x={150} y={460} w={420} h={180} p={prog(t, ini + 0.4, 0.5, ease.out)} titulo="COZINHA" titleSize={30} tone="muted" />
          <Comodo x={590} y={460} w={340} h={180} p={prog(t, ini + 0.5, 0.5, ease.out)} titulo={ren > 0.5 ? "RENDA" : "EDÍCULA"} sub={ren > 0.5 ? "ERA A EDÍCULA" : ""} titleSize={30} acende={Math.max(ren * 0.6, fim * 0.7)} />
          <Cota x1={150} x2={930} y={680} texto="OS USOS QUE ELE AINDA NÃO VIU" p={prog(t, c.a_viu - 0.2, 0.4)} cor={C.text} />
        </Prancha>
      </Camera>
      <TituloFolha p={prog(t, ini, 0.35) * (1 - prog(t, c.f_reforma - 0.5, 0.2))} size={56}>MOSTRE OS <G>USOS</G></TituloFolha>
      <TituloFolha p={prog(t, c.f_reforma - 0.3, 0.35)} size={56}>NÃO É REFORMA. É UM <G>NOVO USO</G></TituloFolha>
    </div>
  );
};
