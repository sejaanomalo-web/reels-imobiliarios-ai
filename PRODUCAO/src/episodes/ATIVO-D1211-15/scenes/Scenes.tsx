import React from "react";
import type { Timeline } from "../../types";
import {
  A, Bolha, CamNoir, Figura, Halo, Holofote, Icone, Pilula, Relogio, TituloNoir, ease, luz, mix, prog, surge,
} from "../../../estilos/pictograma";

/**
 * ATIVO-D1211-15 — "A regra dos dois minutos" (grade 11/12/2026 · 15h · IDEIA QUE MUDA O JOGO · Pictograma).
 * Sem corte seco: a pilha de mensagens "para depois" cresce → o relógio de dois minutos: faça agora → anotar custa mais
 * (a lista vermelha) → visita, localização, "ainda está disponível?": três balões que ganham check → cabe em 2 minutos →
 * o que passa vai para a agenda (blocos com dia e hora) → lista curta, cliente respondido → CtaNoir.
 * Apuração: David Allen, Getting Things Done (2001), regra dos dois minutos.
 */
const CHAO = 1180;
type P = { t: number; tl: Timeline };
const Svg: React.FC<{ children: React.ReactNode }> = ({ children }) => <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>{children}</svg>;
const Chao: React.FC = () => <line x1={-400} y1={CHAO} x2={1480} y2={CHAO} stroke="rgba(244,244,242,0.3)" strokeWidth={2} strokeDasharray="3 9" />;
const PILHA = ["TEM VAGA NA GARAGEM?", "QUAL O CONDOMÍNIO?", "PODE AMANHÃ?", "ACEITA PERMUTA?", "MANDA MAIS FOTOS?"];
const RAPIDAS = ["CONFIRMAR A VISITA", "MANDAR A LOCALIZAÇÃO", "AINDA ESTÁ DISPONÍVEL?"];

/* ---------------------------------------------------------------- 1 · a pilha e o relógio ---------------------------------------------------------------- */
export const Mensagens: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = 1 - prog(t, c.s_passa - 1.0, 0.5);
  if (on <= 0.001) return null;
  const relOn = luz(t, c.r_regra - 0.2, c.v_confirmar - 0.3, 0.5, 0.4);
  const lado = prog(t, c.p_anotar - 0.2, 0.6, ease.inOut);
  const caro = prog(t, c.p_mais - 0.15, 0.4);
  const cabe = prog(t, c.v_cabe - 0.15, 0.5);
  const CHK = [c.v_localizacao - 0.15, c.v_disponivel - 0.15, c.v_cabe - 0.15];
  const VQ = [c.v_confirmar, c.v_localizacao, c.v_disponivel];
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} push={0.004} keys={[{ t: 0, s: 1.06, y: -12 }, { t: c.h_depois, s: 1.0, e: ease.out }, { t: c.r_agora, s: 1.05, y: -10 }, { t: c.v_confirmar, s: 1.0, e: ease.out }, { t: c.v_cabe + 0.4, s: 1.06, y: -12, e: ease.out }]}>
        <Svg>
          <Chao />
          <Holofote x={540} chao={CHAO} w={760} p={prog(t, 0, 0.6) * 0.8} cor={cabe > 0.5 ? A.hex : "#FFFFFF"} />
          {cabe > 0 && <Halo x={540} y={700} r={320} p={0.35 * cabe} cor={A.hex} />}
          <Relogio t={t} x={mix(540, 340, lado)} y={720} r={mix(170, 140, lado)} vel={0.5} p={relOn} />
          <g opacity={relOn * lado}><Icone t={t} nome="documento" x={760} y={700} r={74} tom={caro > 0.5 ? "vermelho" : "cinza"} /></g>
          {CHK.map((at, i) => <g key={i} opacity={surge(t, at) * luz(t, c.v_confirmar - 0.2, c.s_passa - 1.0, 0.3, 0.4)}><Icone t={t} nome="check" x={290} y={650 + i * 130} r={36} tom="verde" brilho={cabe > 0.5} /></g>)}
          <Figura t={t} x={150} y={CHAO} s={0.62} item="celular" pose={t > c.v_confirmar - 0.2 && t < c.v_cabe - 0.2 ? "apontando" : cabe > 0.5 ? "comemorando" : "pe"} tom={cabe > 0.5 ? "verde" : "luz"} />
        </Svg>
        {PILHA.map((s, i) => <Bolha key={s} t={t} at={c.h_mensagens - 0.1 + i * 0.4} ate={c.r_regra - 0.3} x={960} y={540 + i * 110} texto={s} lado="dir" tom="cinza" size={30} />)}
        <Pilula t={t} at={c.h_depois - 0.05} ate={c.r_regra - 0.3} x={600} y={1110} texto="PARA DEPOIS" tom="vermelho" size={28} />
        <Pilula t={t} at={c.r_dois - 0.05} ate={c.p_anotar - 0.2} x={540} y={960} texto="MENOS DE 2 MIN" tom="branco" size={28} />
        <Pilula t={t} at={c.r_agora - 0.05} ate={c.p_anotar - 0.2} x={540} y={1050} texto="FAÇA AGORA" tom="verde" size={28} />
        <Pilula t={t} at={c.r_regra - 0.05} ate={c.p_anotar - 0.2} x={540} y={1250} texto="REGRA DOS 2 MINUTOS · DAVID ALLEN, 2001" tom="cinza" size={24} />
        <Pilula t={t} at={c.p_anotar - 0.05} ate={c.v_confirmar - 0.3} x={760} y={880} texto="ANOTAR PARA DEPOIS" tom="cinza" size={26} />
        <Pilula t={t} at={c.p_mais - 0.05} ate={c.v_confirmar - 0.3} x={760} y={960} texto="CUSTA MAIS" tom="vermelho" size={28} />
        {RAPIDAS.map((s, i) => <Bolha key={s} t={t} at={VQ[i] - 0.1} ate={c.s_passa - 1.0} x={345} y={650 + i * 130} texto={s} lado="esq" tom={t > CHK[i] + 0.1 ? "verde" : "branco"} size={32} />)}
        <Pilula t={t} at={c.v_cabe - 0.05} x={540} y={1060} texto="CABE EM 2 MIN" tom="verde" size={30} />
      </CamNoir>
      <TituloNoir t={t} at={0.05} ate={c.r_regra - 0.4} linhas={[{ texto: "QUANTAS FICARAM", size: 64 }, { texto: "PARA DEPOIS?", cor: "verde", size: 96 }]} top={300} />
      <TituloNoir t={t} at={c.r_regra - 0.25} ate={c.p_anotar - 0.4} linhas={[{ texto: "MENOS DE 2 MIN?", size: 64 }, { texto: "FAÇA AGORA", cor: "verde", size: 100 }]} top={300} />
      <TituloNoir t={t} at={c.p_anotar - 0.25} ate={c.v_confirmar - 0.4} linhas={[{ texto: "ANOTAR", size: 64 }, { texto: "CUSTA MAIS", cor: "verde", size: 100 }]} top={300} />
      <TituloNoir t={t} at={c.v_confirmar - 0.25} ate={c.s_passa - 1.0} linhas={[{ texto: "TUDO CABE EM", size: 64 }, { texto: "DOIS MINUTOS", cor: "verde", size: 96 }]} top={300} />
    </div>
  );
};

/* ---------------------------------------------------------------- 2 · a agenda ---------------------------------------------------------------- */
const DIAS = ["SEG", "TER", "QUA", "QUI", "SEX"];
const GX = 250, GY = 600, CW = 116, RH = 96;
export const Agenda: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = luz(t, c.s_passa - 1.1, c.cta_quer - 0.2, 0.6, 0.45);
  if (on <= 0.001) return null;
  const grade = prog(t, c.s_agenda - 0.3, 0.6, ease.out);
  const fim = prog(t, c.f_curta - 0.2, 0.8, ease.out);
  const BL = [{ d: 1, r: 0, h: "10H", at: c.s_dia - 0.1 }, { d: 3, r: 1, h: "15H", at: c.s_dia + 0.35 }];
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} t0={c.s_passa - 1.1} push={0.005} keys={[{ t: c.s_passa - 1.1, s: 1.05 }, { t: c.s_passa, s: 1.0, e: ease.out }, { t: c.s_dia, s: 1.04, y: -8 }, { t: c.f_respondido + 0.4, s: 1.08, y: -14, e: ease.out }]}>
        <Svg>
          <Chao />
          <Holofote x={540} chao={CHAO} w={mix(760, 860, fim)} p={0.8} cor={fim > 0.5 ? A.hex : "#FFFFFF"} />
          {fim > 0 && <Halo x={540} y={760} r={mix(260, 380, fim)} p={0.4 * fim} cor={A.hex} />}
          <g opacity={(1 - grade) * surge(t, c.s_passa - 0.1)}><Icone t={t} nome="relogio" x={540} y={720} r={80} tom="cinza" /></g>
          <g opacity={grade}>
            {DIAS.map((d, i) => <text key={d} x={GX + i * CW + CW / 2} y={GY - 18} textAnchor="middle" fill="#F4F4F2" opacity={0.75} style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 700, fontSize: 24 }}>{d}</text>)}
            {Array.from({ length: 6 }, (_, i) => <line key={`v${i}`} x1={GX + i * CW} y1={GY} x2={GX + i * CW} y2={GY + 3 * RH} stroke="rgba(244,244,242,0.45)" strokeWidth={2} />)}
            {Array.from({ length: 4 }, (_, i) => <line key={`h${i}`} x1={GX} y1={GY + i * RH} x2={GX + 5 * CW} y2={GY + i * RH} stroke="rgba(244,244,242,0.45)" strokeWidth={2} />)}
            {BL.map((b, i) => {
              const k = prog(t, b.at, 0.4, ease.out);
              return (
                <g key={i} opacity={k} transform={`translate(0 ${(1 - k) * -60})`}>
                  <rect x={GX + b.d * CW + 8} y={GY + b.r * RH + 8} width={CW - 16} height={RH - 16} rx={10} fill={A.hex} style={{ filter: `drop-shadow(0 0 10px ${A.hex})` }} />
                  <text x={GX + b.d * CW + CW / 2} y={GY + b.r * RH + RH / 2 + 9} textAnchor="middle" fill="#01290B" style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 800, fontSize: 26 }}>{b.h}</text>
                </g>
              );
            })}
          </g>
          <Figura t={t} x={170} y={CHAO} s={0.66} item="celular" pose={t > c.s_agenda - 0.3 && t < c.f_curta ? "apontando" : fim > 0.5 ? "bracosAbertos" : "pe"} tom={fim > 0.5 ? "verde" : "luz"} fase={0.4} />
          <Figura t={t} x={910} y={CHAO} s={0.66} p={surge(t, c.f_curta - 0.2)} pose={t > c.f_respondido - 0.2 ? "comemorando" : "pe"} flip tom="luz" />
          <g opacity={surge(t, c.f_respondido - 0.15)}><Icone t={t} nome="check" x={910} y={880} r={40} tom="verde" brilho /></g>
        </Svg>
        <Pilula t={t} at={c.s_passa - 0.05} ate={c.s_dia + 0.6} x={540} y={1000} texto="MAIS DE 2 MIN" tom="cinza" size={28} />
        <Pilula t={t} at={c.s_dia + 0.5} ate={c.f_curta - 0.2} x={540} y={1000} texto="COM DIA E HORA" tom="verde" size={28} />
        <Pilula t={t} at={c.f_curta - 0.05} x={540} y={1000} texto="LISTA CURTA" tom="verde" size={28} />
      </CamNoir>
      <TituloNoir t={t} at={c.s_passa - 0.9} ate={c.f_curta - 0.4} linhas={[{ texto: "O RESTO VAI", size: 64 }, { texto: "PARA A AGENDA", cor: "verde", size: 92 }]} top={300} />
      <TituloNoir t={t} at={c.f_curta - 0.25} ate={c.cta_quer - 0.2} linhas={[{ texto: "LISTA CURTA", size: 64 }, { texto: "CLIENTE RESPONDIDO", cor: "verde", size: 76 }]} top={300} />
    </div>
  );
};
