import React from "react";
import type { Timeline } from "../../types";
import {
  A, CamNoir, Figura, Halo, Holofote, Icone, NOIR, Pilula, Relogio, TituloNoir, aa, ease, luz, mix, prog, surge,
} from "../../../estilos/pictograma";

/**
 * ATIVO-D1205-12 — "A espera explicada" (grade 05/12/2026 · 12h · FORA DA BOLHA · Pictograma).
 * Sem corte seco: a fila e o relógio acelerado (dez minutos parecem uma hora) → 1985: sem nada para fazer, sem prazo, sem
 * explicação → o cliente esperando o financiamento, a barra de etapas apagada → uma mensagem a cada etapa: as etapas acendem
 * → a espera é a mesma, explicada pesa menos → fecho CtaNoir. Apuração: Maister (1985), 'The Psychology of Waiting Lines'.
 */
const CHAO = 1180;
type P = { t: number; tl: Timeline };
const Svg: React.FC<{ children: React.ReactNode }> = ({ children }) => <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>{children}</svg>;
const Chao: React.FC = () => <line x1={-400} y1={CHAO} x2={1480} y2={CHAO} stroke="rgba(244,244,242,0.3)" strokeWidth={2} strokeDasharray="3 9" />;
const GLOW_V = `drop-shadow(0 0 12px ${aa(0.6)})`;

/** Barra de etapas (4 segmentos); `acesos` = quantos verdes. */
const Etapas: React.FC<{ x: number; y: number; p: number; acesos: number }> = ({ x, y, p, acesos }) => (
  <g opacity={p}>
    {[0, 1, 2, 3].map((i) => {
      const on = acesos > i + 0.5;
      return <rect key={i} x={x - 380 + i * 195} y={y} width={175} height={44} rx={10} fill={on ? aa(0.25) : "none"} stroke={on ? A.hex : NOIR.cinza} strokeWidth={3} style={{ filter: on ? GLOW_V : undefined }} />;
    })}
  </g>
);

/* ---------------------------------------------------------------- 1 · a fila e os três princípios ---------------------------------------------------------------- */
export const Fila: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = 1 - prog(t, c.v_financiamento - 0.9, 0.5);
  if (on <= 0.001) return null;
  const cansa = prog(t, c.p_nada - 0.2, 4.0);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} push={0.004} keys={[{ t: 0, s: 1.06, y: -16 }, { t: c.h_hora, s: 1.0, e: ease.out }, { t: c.p_nada, s: 1.03, x: 30 }, { t: c.p_explicacao + 0.5, s: 1.07, x: -30, y: -16, e: ease.out }]}>
        <Svg>
          <Chao />
          <Holofote x={540} chao={CHAO} w={720} p={prog(t, 0, 0.6)} cor={cansa > 0.5 ? "#FFD9D4" : "#FFFFFF"} />
          <Relogio t={t} x={540} y={700} r={120} vel={t > c.h_hora - 0.3 && t < c.p_1985 ? 2.2 : 0.3} p={prog(t, 0.1, 0.5)} />
          {[0, 1, 2, 3, 4].map((i) => (
            <Figura key={i} t={t} x={260 + i * 140} y={CHAO} s={0.72} pose={cansa > 0.3 + i * 0.12 ? "cabisbaixo" : "pe"} tom={i === 2 ? "luz" : "cinza"} />
          ))}
        </Svg>
        <Pilula t={t} at={c.p_nada - 0.05} x={540} y={880} texto="SEM NADA PARA FAZER" tom="vermelho" size={28} />
        <Pilula t={t} at={c.p_prazo - 0.05} x={540} y={940} texto="SEM PRAZO" tom="vermelho" size={28} />
        <Pilula t={t} at={c.p_explicacao - 0.05} x={540} y={1000} texto="SEM EXPLICAÇÃO" tom="vermelho" size={28} />
      </CamNoir>
      <TituloNoir t={t} at={0.05} ate={c.p_1985 - 0.3} linhas={[{ texto: "DEZ MINUTOS", size: 72 }, { texto: "PARECEM UMA HORA", cor: "vermelho", size: 80 }]} top={300} />
      <TituloNoir t={t} at={c.p_1985 - 0.15} ate={c.v_financiamento - 0.9} linhas={[{ texto: "1985 · A PSICOLOGIA", size: 60 }, { texto: "DA ESPERA", size: 92 }]} top={300} />
    </div>
  );
};

/* ---------------------------------------------------------------- 2–3 · o financiamento e as etapas ---------------------------------------------------------------- */
const ETAPA = [{ at: "a_documentos", txt: "DOCUMENTOS ENVIADOS" }, { at: "a_analise", txt: "ANÁLISE COMEÇOU" }, { at: "a_avaliacao", txt: "FALTA A AVALIAÇÃO" }] as const;
export const Financiamento: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = luz(t, c.v_financiamento - 1.0, c.f_explicada - 0.8, 0.6, 0.5);
  if (on <= 0.001) return null;
  const acesos = (t > c.a_documentos - 0.1 ? 1 : 0) + (t > c.a_analise - 0.1 ? 1 : 0) + (t > c.a_avaliacao - 0.1 ? 0.4 : 0);
  const calma = prog(t, c.a_documentos - 0.2, 2.0);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} t0={c.v_financiamento - 1.0} push={0.005} keys={[{ t: c.v_financiamento - 1.0, s: 1.05 }, { t: c.v_etapa, s: 1.0, e: ease.out }, { t: c.a_avaliacao + 0.5, s: 1.05, y: -14, e: ease.out }]}>
        <Svg>
          <Chao />
          <Holofote x={540} chao={CHAO} w={mix(520, 640, calma)} p={0.85} cor={calma > 0.5 ? A.hex : "#FFFFFF"} />
          <Etapas x={540} y={700} p={surge(t, c.v_etapa - 0.3)} acesos={acesos} />
          <g opacity={surge(t, c.v_financiamento - 0.2)}><Icone t={t} nome="documento" x={540} y={600} r={44} tom="branco" /></g>
          {ETAPA.map((e, i) => <g key={e.txt} opacity={surge(t, c[e.at] - 0.2) * (1 - prog(t, c[e.at] + 1.0, 0.3))}><Icone t={t} nome="chat" x={760} y={900} r={40} tom="verde" brilho /></g>)}
          <Figura t={t} x={400} y={CHAO} pose={calma > 0.5 ? "pe" : "cabisbaixo"} tom={calma > 0.5 ? "verde" : "luz"} item="celular" />
        </Svg>
        <Pilula t={t} at={c.v_etapa - 0.05} ate={c.a_documentos - 0.2} x={540} y={790} texto="EM QUE ETAPA?" tom="cinza" size={28} />
        {ETAPA.map((e, i) => <Pilula key={e.txt} t={t} at={c[e.at] - 0.05} x={540} y={800 + i * 60} texto={e.txt} tom={i < 2 ? "verde" : "branco"} size={26} />)}
      </CamNoir>
      <TituloNoir t={t} at={c.v_financiamento - 0.9} ate={c.a_mensagem - 0.3} linhas={[{ texto: "E O SEU CLIENTE", size: 64 }, { texto: "NO FINANCIAMENTO?", size: 80 }]} top={300} />
      <TituloNoir t={t} at={c.a_mensagem - 0.15} ate={c.f_explicada - 0.8} linhas={[{ texto: "UMA MENSAGEM", size: 64 }, { texto: "A CADA ETAPA", cor: "verde", size: 92 }]} top={300} />
    </div>
  );
};

/* ---------------------------------------------------------------- 4 · explicada, pesa menos ---------------------------------------------------------------- */
export const Explicada: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = luz(t, c.f_explicada - 0.9, c.cta_quer - 0.2, 0.6, 0.45);
  if (on <= 0.001) return null;
  const leve = prog(t, c.f_menos - 0.2, 0.8, ease.out);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} t0={c.f_explicada - 0.9} push={0.005} keys={[{ t: c.f_explicada - 0.9, s: 1.04 }, { t: c.f_explicada, s: 1.0, e: ease.out }, { t: c.f_menos + 0.4, s: 1.07, y: -18, e: ease.out }]}>
        <Svg>
          <Chao />
          <Holofote x={540} chao={CHAO} w={mix(520, 720, leve)} p={0.85} cor={leve > 0.3 ? A.hex : "#FFFFFF"} />
          <Halo x={540} y={CHAO - 220} r={mix(280, 420, leve)} p={0.55 * leve} cor={A.hex} />
          <Relogio t={t} x={540} y={700} r={110} vel={0.3} p={1} />
          <Etapas x={540} y={860} p={1} acesos={2.4 + leve} />
          <Figura t={t} x={540} y={CHAO} pose={leve > 0.5 ? "bracosAbertos" : "pe"} tom={leve > 0.5 ? "verde" : "luz"} />
        </Svg>
      </CamNoir>
      <TituloNoir t={t} at={c.f_explicada - 0.8} ate={c.f_menos - 0.3} linhas={[{ texto: "A ESPERA", size: 72 }, { texto: "É A MESMA", size: 92 }]} top={300} />
      <TituloNoir t={t} at={c.f_menos - 0.15} ate={c.cta_quer - 0.3} linhas={[{ texto: "EXPLICADA,", size: 72 }, { texto: "PESA MENOS", cor: "verde", size: 96 }]} top={300} />
    </div>
  );
};
