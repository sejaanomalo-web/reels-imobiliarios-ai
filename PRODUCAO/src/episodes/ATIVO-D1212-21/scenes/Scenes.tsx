import React from "react";
import type { Timeline } from "../../types";
import {
  A, CamNoir, Figura, Halo, Holofote, Icone, Pilula, TituloNoir, ease, luz, mix, prog, surge,
} from "../../../estilos/pictograma";

/**
 * ATIVO-D1212-21 — "O inquilino e a visita" (grade 12/12/2026 · 21h · CORRETOR NA VIDA REAL · Pictograma).
 * Sem corte seco: a porta fechada, o inquilino na frente e o corretor com o comprador → "ninguém entra" → a lei: precisa
 * permitir a visita de quem quer comprar → com dia e hora combinados; surpresa não vale → a lei dá o direito, o jeito de
 * pedir abre a porta → por escrito, com antecedência, no horário aceito → a porta abre → CtaNoir.
 * Apuração: Lei 8.245/1991, art. 23, IX (e art. 27). Sem prazo de aviso (não está na lei).
 */
const CHAO = 1180;
type P = { t: number; tl: Timeline };
const Svg: React.FC<{ children: React.ReactNode }> = ({ children }) => <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>{children}</svg>;
const Chao: React.FC = () => <line x1={-400} y1={CHAO} x2={1480} y2={CHAO} stroke="rgba(244,244,242,0.3)" strokeWidth={2} strokeDasharray="3 9" />;
const Porta: React.FC<{ x: number; abre?: number; cor?: string; p?: number }> = ({ x, abre = 0, cor = "#F4F4F2", p = 1 }) => (
  <g opacity={p} fill="none" stroke={cor} strokeWidth={4} strokeLinejoin="round" style={{ filter: cor === A.hex ? `drop-shadow(0 0 10px ${A.hex})` : undefined }}>
    <rect x={x - 110} y={CHAO - 360} width={220} height={360} />
    <g transform={`translate(${x - 100} 0) scale(${1 - 0.75 * abre} 1) translate(${-(x - 100)} 0)`}>
      <rect x={x - 100} y={CHAO - 350} width={200} height={350} />
      <circle cx={x + 70} cy={CHAO - 170} r={8} />
    </g>
  </g>
);

/* ---------------------------------------------------------------- 1 · a porta e a lei ---------------------------------------------------------------- */
export const PortaLei: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = 1 - prog(t, c.v_direito - 0.5, 0.45);
  if (on <= 0.001) return null;
  const nao = prog(t, c.h_ninguem - 0.15, 0.3) * (1 - prog(t, c.l_lei - 0.2, 0.4));
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} push={0.004} keys={[{ t: 0, s: 1.06, y: -12 }, { t: c.h_ninguem, s: 1.0, e: ease.out }, { t: c.l_permitir, s: 1.04, y: -8 }, { t: c.c_surpresa + 0.4, s: 1.06, y: -12, e: ease.out }]}>
        <Svg>
          <Chao />
          <Holofote x={540} chao={CHAO} w={820} p={prog(t, 0, 0.6) * 0.85} cor={nao > 0.5 ? "#FFD9D4" : "#FFFFFF"} />
          <Porta x={540} p={surge(t, 0.1)} />
          <g opacity={nao}><Icone t={t} nome="x" x={850} y={860} r={40} tom="vermelho" /></g>
          <g opacity={surge(t, c.c_dia - 0.2)}><Icone t={t} nome="calendario" x={850} y={860} r={44} tom="verde" brilho /></g>
          <Figura t={t} x={150} y={CHAO} s={0.6} item="celular" pose={t > c.l_lei - 0.2 ? "apontando" : "pe"} tom="luz" />
          <Figura t={t} x={300} y={CHAO} s={0.58} p={surge(t, c.h_alugado - 0.2)} pose="pe" tom="luz" fase={0.3} />
          <Figura t={t} x={850} y={CHAO} s={0.6} p={surge(t, c.h_inquilino - 0.2)} flip pose={nao > 0.5 ? "bracosAbertos" : "pe"} tom="luz" fase={0.6} />
        </Svg>
        <Pilula t={t} at={c.h_alugado - 0.1} ate={c.h_ninguem - 0.2} x={540} y={620} texto="IMÓVEL ALUGADO, À VENDA" tom="branco" size={28} />
        <Pilula t={t} at={c.h_ninguem - 0.1} ate={c.l_lei - 0.2} x={540} y={620} texto="“NINGUÉM ENTRA”" tom="vermelho" size={30} />
        <Pilula t={t} at={c.l_lei - 0.1} ate={c.c_dia - 0.3} x={540} y={590} texto="LEI 8.245/91 · ART. 23, IX" tom="cinza" size={26} />
        <Pilula t={t} at={c.l_permitir - 0.1} ate={c.c_dia - 0.3} x={540} y={670} texto="PRECISA PERMITIR A VISITA" tom="verde" size={28} />
        <Pilula t={t} at={c.l_comprar - 0.1} ate={c.c_dia - 0.3} x={540} y={750} texto="DE QUEM QUER COMPRAR" tom="branco" size={26} />
        <Pilula t={t} at={c.c_dia - 0.1} x={540} y={620} texto="DIA E HORA COMBINADOS" tom="verde" size={28} />
        <Pilula t={t} at={c.c_surpresa - 0.1} x={540} y={705} texto="SURPRESA NÃO VALE" tom="vermelho" size={28} />
      </CamNoir>
      <TituloNoir t={t} at={0.05} ate={c.l_lei - 0.4} linhas={[{ texto: "O INQUILINO", size: 64 }, { texto: "NÃO DEIXA?", cor: "verde", size: 100 }]} top={300} />
      <TituloNoir t={t} at={c.l_lei - 0.25} ate={c.c_dia - 0.4} linhas={[{ texto: "A LEI", size: 64 }, { texto: "DIZ QUE DEIXA", cor: "verde", size: 96 }]} top={300} />
      <TituloNoir t={t} at={c.c_dia - 0.25} ate={c.v_direito - 0.5} linhas={[{ texto: "MAS COM", size: 64 }, { texto: "DIA E HORA", cor: "verde", size: 100 }]} top={300} />
    </div>
  );
};

/* ---------------------------------------------------------------- 2 · o jeito de pedir ---------------------------------------------------------------- */
export const JeitoPedir: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = luz(t, c.v_direito - 0.6, c.cta_quer - 0.2, 0.5, 0.45);
  if (on <= 0.001) return null;
  const fim = prog(t, c.f_avisado - 0.2, 0.8, ease.out);
  const brilho = prog(t, c.v_porta - 0.2, 0.4);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} t0={c.v_direito - 0.6} push={0.005} keys={[{ t: c.v_direito - 0.6, s: 1.05 }, { t: c.v_direito, s: 1.0, e: ease.out }, { t: c.a_horario, s: 1.04, y: -8 }, { t: c.f_vontade + 0.4, s: 1.08, y: -14, e: ease.out }]}>
        <Svg>
          <Chao />
          <Holofote x={540} chao={CHAO} w={mix(780, 880, fim)} p={0.85} cor={fim > 0.5 ? A.hex : "#FFFFFF"} />
          {fim > 0 && <Halo x={540} y={850} r={mix(240, 380, fim)} p={0.4 * fim} cor={A.hex} />}
          <Porta x={540} abre={prog(t, c.f_avisado - 0.1, 0.9, ease.out)} cor={brilho > 0.5 || fim > 0.5 ? A.hex : "#F4F4F2"} />
          <g opacity={surge(t, c.a_agende - 0.2) * (1 - fim)}><Icone t={t} nome="calendario" x={850} y={860} r={44} tom="verde" brilho /></g>
          <Figura t={t} x={150} y={CHAO} s={0.6} item="celular" pose={t > c.a_agende - 0.2 && t < c.f_avisado ? "apontando" : fim > 0.5 ? "bracosAbertos" : "pe"} tom={fim > 0.5 ? "verde" : "luz"} />
          <Figura t={t} x={300} y={CHAO} s={0.58} pose="pe" tom="luz" fase={0.3} />
          <Figura t={t} x={850} y={CHAO} s={0.6} flip pose={fim > 0.5 ? "comemorando" : "pe"} tom={fim > 0.5 ? "verde" : "luz"} fase={0.6} />
        </Svg>
        <Pilula t={t} at={c.v_direito - 0.1} ate={c.a_agende - 0.3} x={540} y={620} texto="A LEI DÁ O DIREITO" tom="branco" size={28} />
        <Pilula t={t} at={c.v_jeito - 0.1} ate={c.a_agende - 0.3} x={540} y={705} texto="O JEITO DE PEDIR ABRE" tom="verde" size={28} />
        {([[c.a_escrito, "POR ESCRITO"], [c.a_antecedencia, "COM ANTECEDÊNCIA"], [c.a_horario, "NO HORÁRIO ACEITO"]] as [number, string][]).map(([at, s], i) => (
          <Pilula key={s} t={t} at={at - 0.1} ate={c.f_avisado - 0.3} x={540} y={595 + i * 75} texto={s} tom="verde" size={28} />
        ))}
        <Pilula t={t} at={c.f_vontade - 0.1} x={540} y={640} texto="DE BOA VONTADE" tom="verde" size={28} />
      </CamNoir>
      <TituloNoir t={t} at={c.v_direito - 0.35} ate={c.a_agende - 0.4} linhas={[{ texto: "O JEITO", size: 64 }, { texto: "DE PEDIR", cor: "verde", size: 104 }]} top={300} />
      <TituloNoir t={t} at={c.a_agende - 0.25} ate={c.f_avisado - 0.4} linhas={[{ texto: "AGENDE", size: 64 }, { texto: "POR ESCRITO", cor: "verde", size: 100 }]} top={300} />
      <TituloNoir t={t} at={c.f_avisado - 0.25} ate={c.cta_quer - 0.2} linhas={[{ texto: "AVISADO,", size: 64 }, { texto: "ABRE A PORTA", cor: "verde", size: 96 }]} top={300} />
    </div>
  );
};
