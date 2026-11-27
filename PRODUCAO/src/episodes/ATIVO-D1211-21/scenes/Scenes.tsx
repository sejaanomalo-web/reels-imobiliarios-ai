import React from "react";
import type { Timeline } from "../../types";
import {
  A, CamNoir, Figura, Halo, Holofote, Icone, Pilula, Relogio, TituloNoir, ease, luz, mix, prog, surge,
} from "../../../estilos/pictograma";

/**
 * ATIVO-D1211-21 — "Com quem está a chave?" (grade 11/12/2026 · 21h · CORRETOR NA VIDA REAL · Pictograma).
 * Sem corte seco: a porta fechada, o corretor e o cliente → portaria? outro corretor? carro? (a chave pula de pergunta em
 * pergunta) → o telefone toca, o relógio corre, o cliente espera na calçada → a chave não sumiu, sumiu o registro → a ficha:
 * quem pegou, qual visita, quando devolve → a porta abre → CtaNoir. Rotina; sem estatística.
 */
const CHAO = 1180;
type P = { t: number; tl: Timeline };
const Svg: React.FC<{ children: React.ReactNode }> = ({ children }) => <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>{children}</svg>;
const Chao: React.FC = () => <line x1={-400} y1={CHAO} x2={1480} y2={CHAO} stroke="rgba(244,244,242,0.3)" strokeWidth={2} strokeDasharray="3 9" />;
/** Porta em linha fina; `abre` 0→1 gira a folha. */
const Porta: React.FC<{ x: number; abre?: number; cor?: string; p?: number }> = ({ x, abre = 0, cor = "#F4F4F2", p = 1 }) => (
  <g opacity={p} fill="none" stroke={cor} strokeWidth={4} strokeLinejoin="round" style={{ filter: cor === A.hex ? `drop-shadow(0 0 10px ${A.hex})` : undefined }}>
    <rect x={x - 110} y={CHAO - 360} width={220} height={360} />
    <g transform={`translate(${x - 100} 0) scale(${1 - 0.75 * abre} 1) translate(${-(x - 100)} 0)`}>
      <rect x={x - 100} y={CHAO - 350} width={200} height={350} />
      <circle cx={x + 70} cy={CHAO - 170} r={8} />
    </g>
  </g>
);

/* ---------------------------------------------------------------- 1 · a porta fechada ---------------------------------------------------------------- */
export const PortaFechada: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = 1 - prog(t, c.v_sumiu - 1.0, 0.5);
  if (on <= 0.001) return null;
  const perg = luz(t, c.o_portaria - 0.3, c.e_liga - 0.3, 0.3, 0.4);
  const espera = prog(t, c.e_liga - 0.2, 0.4);
  const PQ: [number, number, string][] = [[c.o_portaria, 560, "NA PORTARIA?"], [c.o_corretor, 650, "COM OUTRO CORRETOR?"], [c.o_carro, 740, "NO CARRO DE ALGUÉM?"]];
  const qi = t >= c.o_carro - 0.1 ? 2 : t >= c.o_corretor - 0.1 ? 1 : 0;
  const ky = mix(PQ[Math.max(0, qi - 1)][1], PQ[qi][1], prog(t, PQ[qi][0] - 0.15, 0.3, ease.out));
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} push={0.004} keys={[{ t: 0, s: 1.06, y: -12 }, { t: c.h_chave, s: 1.0, e: ease.out }, { t: c.e_liga, s: 1.04, y: -8 }, { t: c.e_calcada + 0.4, s: 1.07, y: -14, e: ease.out }]}>
        <Svg>
          <Chao />
          <Holofote x={540} chao={CHAO} w={820} p={prog(t, 0, 0.6) * 0.85} cor={espera > 0.5 ? "#FFD9D4" : "#FFFFFF"} />
          <Porta x={540} p={surge(t, 0.1)} />
          <g opacity={surge(t, c.h_chave - 0.1) * (1 - perg)}><Icone t={t} nome="cadeado" x={540} y={1000} r={44} tom="vermelho" /></g>
          <g opacity={perg}><Icone t={t} nome="chave" x={250} y={ky} r={34} tom="branco" brilho /></g>
          <g opacity={surge(t, c.e_liga - 0.1)}><Icone t={t} nome="telefone" x={230} y={760} r={44} tom="branco" /></g>
          <Relogio t={t} x={850} y={720} r={100} vel={0.6} p={surge(t, c.e_espera - 0.2)} />
          <Figura t={t} x={150} y={CHAO} s={0.6} item="celular" pose={t > c.e_liga - 0.2 ? "apontando" : "pe"} tom="luz" />
          <Figura t={t} x={900} y={CHAO} s={0.6} p={surge(t, c.h_chegou - 0.2)} flip pose="pe" tom="luz" />
        </Svg>
        {PQ.map(([at, y, s]) => <Pilula key={s} t={t} at={at - 0.05} ate={c.e_liga - 0.3} x={560} y={y} texto={s} tom="branco" size={28} />)}
        <Pilula t={t} at={c.e_calcada - 0.05} x={540} y={600} texto="ESPERANDO NA CALÇADA" tom="vermelho" size={28} />
      </CamNoir>
      <TituloNoir t={t} at={0.05} ate={c.o_portaria - 0.4} linhas={[{ texto: "COM QUEM ESTÁ", size: 64 }, { texto: "A CHAVE?", cor: "verde", size: 104 }]} top={300} />
      <TituloNoir t={t} at={c.o_portaria - 0.25} ate={c.e_liga - 0.4} linhas={[{ texto: "ONDE", size: 64 }, { texto: "FICOU?", cor: "verde", size: 104 }]} top={300} />
      <TituloNoir t={t} at={c.e_liga - 0.25} ate={c.v_sumiu - 1.0} linhas={[{ texto: "E O CLIENTE", size: 64 }, { texto: "ESPERA", cor: "verde", size: 104 }]} top={300} />
    </div>
  );
};

/* ---------------------------------------------------------------- 2 · o registro ---------------------------------------------------------------- */
export const Registro: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = luz(t, c.v_sumiu - 1.1, c.cta_quer - 0.2, 0.6, 0.45);
  if (on <= 0.001) return null;
  const ficha = prog(t, c.a_sai - 0.3, 0.5) * (1 - prog(t, c.f_nome - 0.45, 0.35));
  const fim = prog(t, c.f_nome - 0.2, 0.8, ease.out);
  const vira = 1 - prog(t, c.a_sai - 0.3, 0.5);
  const LIN: [number, string][] = [[c.a_quem, "QUEM PEGOU"], [c.a_visita, "PARA QUAL VISITA"], [c.a_devolve, "QUANDO DEVOLVE"]];
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} t0={c.v_sumiu - 1.1} push={0.005} keys={[{ t: c.v_sumiu - 1.1, s: 1.05 }, { t: c.v_sumiu, s: 1.0, e: ease.out }, { t: c.a_devolve, s: 1.04, y: -8 }, { t: c.f_atrasa + 0.4, s: 1.08, y: -14, e: ease.out }]}>
        <Svg>
          <Chao />
          <Holofote x={540} chao={CHAO} w={mix(760, 860, fim)} p={0.85} cor={fim > 0.5 ? A.hex : "#FFFFFF"} />
          {fim > 0 && <Halo x={540} y={820} r={mix(240, 380, fim)} p={0.4 * fim} cor={A.hex} />}
          <g opacity={vira * surge(t, c.v_sumiu - 0.1)}><Icone t={t} nome="chave" x={420} y={720} r={70} tom="branco" brilho /></g>
          <g opacity={vira * surge(t, c.v_registro - 0.1)}><Icone t={t} nome="documento" x={680} y={720} r={70} tom="vermelho" /></g>
          <g opacity={ficha}>
            <rect x={300} y={520} width={480} height={330} rx={18} fill="rgba(10,10,10,0.6)" stroke={fim > 0.5 ? A.hex : "#F4F4F2"} strokeWidth={3} />
            <Icone t={t} nome="chave" x={240} y={685} r={40} tom={fim > 0.5 ? "verde" : "branco"} brilho={fim > 0.5} />
          </g>
          <Porta x={540} abre={prog(t, c.f_nome - 0.1, 0.8, ease.out)} cor={fim > 0.5 ? A.hex : "#F4F4F2"} p={prog(t, c.f_nome - 0.3, 0.4)} />
          <Figura t={t} x={150} y={CHAO} s={0.6} item="celular" pose={t > c.a_sai - 0.2 && t < c.f_nome ? "apontando" : fim > 0.5 ? "bracosAbertos" : "pe"} tom={fim > 0.5 ? "verde" : "luz"} />
          <Figura t={t} x={900} y={CHAO} s={0.6} flip pose={fim > 0.5 ? "comemorando" : "pe"} tom="luz" />
        </Svg>
        {LIN.map(([at, s], i) => <Pilula key={s} t={t} at={at - 0.1} ate={c.f_nome - 0.4} x={540} y={590 + i * 95} texto={s} tom={t > at + 0.2 ? "verde" : "branco"} size={28} />)}
        <Pilula t={t} at={c.v_registro - 0.05} ate={c.a_sai - 0.3} x={540} y={900} texto="SUMIU O REGISTRO" tom="vermelho" size={28} />
      </CamNoir>
      <TituloNoir t={t} at={c.v_sumiu - 0.9} ate={c.a_sai - 0.4} linhas={[{ texto: "A CHAVE", size: 64 }, { texto: "NÃO SUMIU", cor: "verde", size: 100 }]} top={300} />
      <TituloNoir t={t} at={c.a_sai - 0.25} ate={c.f_nome - 0.4} linhas={[{ texto: "NA HORA QUE SAI", size: 64 }, { texto: "ANOTE", cor: "verde", size: 104 }]} top={300} />
      <TituloNoir t={t} at={c.f_nome - 0.25} ate={c.cta_quer - 0.2} linhas={[{ texto: "CHAVE COM NOME", size: 64 }, { texto: "NÃO ATRASA", cor: "verde", size: 96 }]} top={300} />
    </div>
  );
};
