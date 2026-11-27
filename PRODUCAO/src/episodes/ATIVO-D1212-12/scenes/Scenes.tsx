import React from "react";
import type { Timeline } from "../../types";
import {
  A, CamNoir, Caminho, Figura, Halo, Holofote, Icone, Pilula, TituloNoir, ease, luz, mix, prog, surge,
} from "../../../estilos/pictograma";

/**
 * ATIVO-D1212-12 — "O bastão" (grade 12/12/2026 · 12h · FORA DA BOLHA · Pictograma).
 * Sem corte seco: quatro corredores em linha fina numa pista; o bastão verde passa de mão em mão → prata em 2016 sem os
 * mais rápidos → a passagem de baixo para cima, treinada por anos → perde-se na troca, não na reta (o bastão cai) → dois
 * corretores: a ficha do cliente passa e cai no meio → passa de novo com o histórico (viu, recusou, pediu) → bastão bem
 * passado não perde velocidade → CtaNoir. Apuração: Rio 2016, 4×100 m masculino (Olympics.com, World Athletics).
 */
const CHAO = 1180;
type P = { t: number; tl: Timeline };
const Svg: React.FC<{ children: React.ReactNode }> = ({ children }) => <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>{children}</svg>;
const Pista: React.FC = () => (
  <g stroke="rgba(244,244,242,0.3)" strokeWidth={2} strokeDasharray="3 9">
    <line x1={-400} y1={CHAO} x2={1480} y2={CHAO} />
    <line x1={-400} y1={CHAO + 60} x2={1480} y2={CHAO + 60} />
  </g>
);
const Bastao: React.FC<{ x: number; y: number; rot?: number; cor?: string }> = ({ x, y, rot = 0, cor = A.hex }) => (
  <rect x={x - 34} y={y - 7} width={68} height={14} rx={7} fill={cor} transform={`rotate(${rot} ${x} ${y})`} style={{ filter: `drop-shadow(0 0 8px ${cor})` }} />
);

/* ---------------------------------------------------------------- 1 · a pista ---------------------------------------------------------------- */
export const PistaCena: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = 1 - prog(t, c.v_cliente - 0.5, 0.45);
  if (on <= 0.001) return null;
  const RX = [150, 400, 650, 900];
  const corre = prog(t, c.h_japao - 0.3, c.p_passagem - c.h_japao, ease.linear);
  const bx = mix(RX[0], RX[3], corre);
  const close = prog(t, c.p_passagem - 0.4, 0.6, ease.inOut) * (1 - prog(t, c.t_troca - 0.3, 0.4));
  const sobe = prog(t, c.p_baixo - 0.3, 0.8, ease.inOut);
  const cai = prog(t, c.t_troca - 0.1, 0.5, ease.in);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} push={0.004} keys={[{ t: 0, s: 1.04, y: -10 }, { t: c.h_prata, s: 1.0, e: ease.out }, { t: c.p_passagem, s: 1.08, y: -20, e: ease.inOut }, { t: c.t_troca, s: 1.04, y: -10, e: ease.out }]}>
        <Svg>
          <Pista />
          <Holofote x={540} chao={CHAO} w={900} p={prog(t, 0, 0.6) * 0.8} cor={t > c.t_troca - 0.1 && t < c.v_cliente - 1 ? "#FFD9D4" : "#FFFFFF"} />
          {close < 0.5 ? (
            <>
              {RX.map((x, i) => <Figura key={i} t={t} x={x} y={CHAO} s={0.56} pose="andando" fase={i * 0.3} tom={Math.abs(bx - x) < 130 ? "verde" : "luz"} p={surge(t, 0.1 + i * 0.12)} />)}
              {corre > 0 && cai === 0 ? <Bastao x={bx + 30} y={CHAO - 150} /> : null}
            </>
          ) : (
            <>
              <Figura t={t} x={430} y={CHAO} s={0.62} pose="andando" tom="luz" />
              <Figura t={t} x={650} y={CHAO} s={0.62} pose="andando" fase={0.4} tom={sobe > 0.5 ? "verde" : "luz"} />
              <Caminho pontos={[[470, CHAO - 120], [540, CHAO - 90], [610, CHAO - 170]]} p={sobe} />
              <Bastao x={mix(480, 615, sobe)} y={mix(CHAO - 120, CHAO - 175, sobe)} rot={mix(10, -30, sobe)} />
            </>
          )}
          {cai > 0 && t < c.v_cliente - 0.5 ? <Bastao x={560} y={mix(CHAO - 150, CHAO - 10, cai)} rot={cai * 120} cor="#FF5A4F" /> : null}
        </Svg>
        <Pilula t={t} at={c.h_prata - 0.1} ate={c.p_passagem - 0.3} x={540} y={760} texto="PRATA · 4×100 M · 2016" tom="verde" size={28} />
        <Pilula t={t} at={c.p_baixo - 0.1} ate={c.t_troca - 0.3} x={540} y={760} texto="DE BAIXO PARA CIMA" tom="verde" size={28} />
        <Pilula t={t} at={c.p_treinada - 0.1} ate={c.t_troca - 0.3} x={540} y={840} texto="TREINADA POR ANOS" tom="branco" size={26} />
        <Pilula t={t} at={c.t_troca - 0.1} x={540} y={760} texto="PERDE-SE NA TROCA" tom="vermelho" size={28} />
        <Pilula t={t} at={c.t_reta - 0.1} x={540} y={840} texto="NÃO NA RETA" tom="branco" size={26} />
      </CamNoir>
      <TituloNoir t={t} at={0.05} ate={c.h_rapidos - 0.4} linhas={[{ texto: "2016 · JAPÃO", size: 64 }, { texto: "PRATA OLÍMPICA", cor: "verde", size: 88 }]} top={300} />
      <TituloNoir t={t} at={c.h_rapidos - 0.25} ate={c.p_passagem - 0.4} linhas={[{ texto: "SEM OS", size: 64 }, { texto: "MAIS RÁPIDOS", cor: "verde", size: 96 }]} top={300} />
      <TituloNoir t={t} at={c.p_passagem - 0.25} ate={c.t_troca - 0.4} linhas={[{ texto: "O SEGREDO", size: 64 }, { texto: "A PASSAGEM", cor: "verde", size: 100 }]} top={300} />
      <TituloNoir t={t} at={c.t_troca - 0.25} ate={c.v_cliente - 0.5} linhas={[{ texto: "SE PERDE", size: 64 }, { texto: "NA TROCA", cor: "verde", size: 104 }]} top={300} />
    </div>
  );
};

/* ---------------------------------------------------------------- 2 · o cliente ---------------------------------------------------------------- */
export const ClienteCena: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = luz(t, c.v_cliente - 0.6, c.cta_quer - 0.2, 0.5, 0.45);
  if (on <= 0.001) return null;
  const passa1 = prog(t, c.v_cliente, c.v_mao - c.v_cliente, ease.inOut);
  const cai = prog(t, c.v_mao - 0.1, 0.5, ease.in) * (1 - prog(t, c.a_colega - 0.3, 0.3));
  const passa2 = prog(t, c.a_colega - 0.2, c.a_pediu - c.a_colega + 0.6, ease.inOut);
  const fim = prog(t, c.f_bastao - 0.2, 0.8, ease.out);
  const primeira = t < c.a_colega - 0.3;
  const dx = primeira ? mix(330, 750, passa1) : mix(330, 750, passa2);
  const dy = primeira ? mix(860, 1110, cai) : 860;
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} t0={c.v_cliente - 0.6} push={0.005} keys={[{ t: c.v_cliente - 0.6, s: 1.05 }, { t: c.v_cliente, s: 1.0, e: ease.out }, { t: c.a_historico, s: 1.04, y: -8 }, { t: c.f_velocidade + 0.4, s: 1.08, y: -14, e: ease.out }]}>
        <Svg>
          <Pista />
          <Holofote x={540} chao={CHAO} w={mix(780, 880, fim)} p={0.85} cor={fim > 0.5 ? A.hex : cai > 0.3 ? "#FFD9D4" : "#FFFFFF"} />
          {fim > 0 && <Halo x={540} y={800} r={mix(240, 380, fim)} p={0.4 * fim} cor={A.hex} />}
          <g opacity={surge(t, c.v_cliente - 0.2)}><Icone t={t} nome="documento" x={dx} y={dy} r={46} tom={cai > 0.3 ? "vermelho" : primeira ? "branco" : "verde"} brilho={!primeira} /></g>
          <Figura t={t} x={230} y={CHAO} s={0.62} pose={t > c.a_colega - 0.3 && t < c.f_bastao ? "apontando" : fim > 0.5 ? "bracosAbertos" : "pe"} tom={fim > 0.5 ? "verde" : "luz"} />
          <Figura t={t} x={850} y={CHAO} s={0.62} flip pose={fim > 0.5 ? "comemorando" : cai > 0.5 ? "cabisbaixo" : "pe"} tom={fim > 0.5 ? "verde" : "luz"} fase={0.4} />
        </Svg>
        <Pilula t={t} at={c.v_mao - 0.1} ate={c.a_colega - 0.3} x={540} y={700} texto="O CLIENTE SE PERDE" tom="vermelho" size={26} />
        {([[c.a_viu, "O QUE VIU"], [c.a_recusou, "O QUE RECUSOU"], [c.a_pediu, "O QUE PEDIU"]] as [number, string][]).map(([at, s], i) => (
          <Pilula key={s} t={t} at={at - 0.1} ate={c.cta_quer - 0.3} x={540} y={600 + i * 80} texto={s} tom="verde" size={28} />
        ))}
        <Pilula t={t} at={c.f_velocidade - 0.1} x={540} y={850} texto="SEM PERDER VELOCIDADE" tom="verde" size={28} />
      </CamNoir>
      <TituloNoir t={t} at={c.v_cliente - 0.35} ate={c.a_colega - 0.4} linhas={[{ texto: "COM CLIENTE", size: 64 }, { texto: "É IGUAL", cor: "verde", size: 104 }]} top={300} />
      <TituloNoir t={t} at={c.a_colega - 0.25} ate={c.f_bastao - 0.4} linhas={[{ texto: "PASSE JUNTO", size: 64 }, { texto: "O HISTÓRICO", cor: "verde", size: 100 }]} top={300} />
      <TituloNoir t={t} at={c.f_bastao - 0.25} ate={c.cta_quer - 0.2} linhas={[{ texto: "BASTÃO BEM", size: 64 }, { texto: "PASSADO", cor: "verde", size: 104 }]} top={300} />
    </div>
  );
};
