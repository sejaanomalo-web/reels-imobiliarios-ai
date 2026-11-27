import React from "react";
import type { Timeline } from "../../types";
import {
  A, CamNoir, Figura, Halo, Holofote, Icone, Pilula, Relogio, TituloNoir, ease, luz, mix, prog, surge,
} from "../../../estilos/pictograma";

/**
 * ATIVO-D1213-12 — "A cabine estéril" (grade 13/12/2026 · 12h · FORA DA BOLHA · Pictograma).
 * Sem corte seco: a cabine em linha fina com dois pilotos; os balões de conversa são cortados → só o voo → regra de 1981:
 * abaixo de 10.000 pés, só o essencial (o altímetro desce) → é onde a distração custa mais → a venda também tem fase
 * crítica: visita decisiva, proposta, assinatura → celular no silencioso → só o essencial → CtaNoir.
 * Apuração: FAA, 14 CFR 121.542 (1981).
 */
const CHAO = 1180;
type P = { t: number; tl: Timeline };
const Svg: React.FC<{ children: React.ReactNode }> = ({ children }) => <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>{children}</svg>;
const Chao: React.FC = () => <line x1={-400} y1={CHAO} x2={1480} y2={CHAO} stroke="rgba(244,244,242,0.3)" strokeWidth={2} strokeDasharray="3 9" />;

/* ---------------------------------------------------------------- 1 · a cabine ---------------------------------------------------------------- */
export const Cabine: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = 1 - prog(t, c.v_fase - 0.5, 0.45);
  if (on <= 0.001) return null;
  const corta = prog(t, c.h_conversar - 0.1, 0.4);
  const desce = prog(t, c.r_dez - 0.4, 1.6, ease.inOut);
  const tilt = Math.sin(t * 0.6) * 3 * (1 - desce * 0.5);
  const alt = mix(600, 860, desce);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} push={0.004} keys={[{ t: 0, s: 1.06, y: -12 }, { t: c.h_voo, s: 1.0, e: ease.out }, { t: c.r_dez, s: 1.04, y: -8 }, { t: c.p_distracao + 0.4, s: 1.07, y: -14, e: ease.out }]}>
        <Svg>
          <Chao />
          <Holofote x={540} chao={CHAO} w={860} p={prog(t, 0, 0.6) * 0.85} cor={t > c.p_distracao - 0.1 ? "#FFD9D4" : "#FFFFFF"} />
          <g fill="none" stroke="#F4F4F2" strokeWidth={4} strokeLinejoin="round" opacity={surge(t, 0.1)}>
            <path d="M260 600 L820 600 L900 900 L180 900 Z" />
            <line x1={540} y1={600} x2={540} y2={900} />
            <g transform={`rotate(${tilt} 540 760)`}><line x1={200} y1={mix(760, 820, desce)} x2={880} y2={mix(760, 820, desce)} stroke="rgba(244,244,242,0.45)" strokeDasharray="10 10" /></g>
          </g>
          <g opacity={surge(t, c.r_dez - 0.3)}>
            <line x1={130} y1={600} x2={130} y2={900} stroke="rgba(244,244,242,0.5)" strokeWidth={3} />
            <line x1={115} y1={760} x2={145} y2={760} stroke={A.hex} strokeWidth={4} />
            <circle cx={130} cy={alt} r={12} fill={desce > 0.6 ? A.hex : "#F4F4F2"} />
          </g>
          {[[380, 0], [700, 1]].map(([x, i]) => (
            <g key={i} opacity={surge(t, c.h_conversar - 0.5 + i * 0.2) * (1 - prog(t, c.h_voo - 0.2, 0.4))}>
              <Icone t={t} nome="chat" x={x + 60} y={960} r={34} tom={corta > 0.5 ? "vermelho" : "branco"} />
              {corta > 0.5 ? <Icone t={t} nome="x" x={x + 60} y={960} r={34} tom="vermelho" /> : null}
            </g>
          ))}
          <Relogio t={t} x={880} y={1020} r={70} vel={0.8} p={luz(t, c.p_minutos - 0.2, c.v_fase - 0.5, 0.3, 0.3)} />
          <Figura t={t} x={380} y={CHAO} s={0.6} pose="sentado" tom={desce > 0.6 ? "verde" : "luz"} />
          <Figura t={t} x={700} y={CHAO} s={0.6} pose="sentado" flip tom={desce > 0.6 ? "verde" : "luz"} fase={0.4} />
        </Svg>
        <Pilula t={t} at={c.h_voo - 0.1} ate={c.r_1981 - 0.2} x={540} y={960} texto="SÓ O VOO" tom="verde" size={28} />
        <Pilula t={t} at={c.r_1981 - 0.1} ate={c.p_minutos - 0.2} x={540} y={960} texto="REGRA DE 1981 · FAA" tom="cinza" size={26} />
        <Pilula t={t} at={c.r_dez - 0.1} ate={c.p_minutos - 0.2} x={300} y={560} texto="10.000 PÉS" tom="branco" size={26} />
        <Pilula t={t} at={c.p_distracao - 0.1} x={540} y={960} texto="DISTRAÇÃO CUSTA MAIS" tom="vermelho" size={28} />
      </CamNoir>
      <TituloNoir t={t} at={0.05} ate={c.r_1981 - 0.4} linhas={[{ texto: "NA CABINE", size: 64 }, { texto: "SÓ O VOO", cor: "verde", size: 104 }]} top={300} />
      <TituloNoir t={t} at={c.r_1981 - 0.25} ate={c.p_minutos - 0.4} linhas={[{ texto: "ABAIXO DE 10 MIL PÉS", size: 60 }, { texto: "SÓ O ESSENCIAL", cor: "verde", size: 92 }]} top={300} />
      <TituloNoir t={t} at={c.p_minutos - 0.25} ate={c.v_fase - 0.5} linhas={[{ texto: "ONDE A DISTRAÇÃO", size: 60 }, { texto: "CUSTA MAIS", cor: "verde", size: 100 }]} top={300} />
    </div>
  );
};

/* ---------------------------------------------------------------- 2 · a venda ---------------------------------------------------------------- */
export const Venda: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = luz(t, c.v_fase - 0.6, c.cta_quer - 0.2, 0.5, 0.45);
  if (on <= 0.001) return null;
  const fim = prog(t, c.f_decidem - 0.2, 0.8, ease.out);
  const FASES: [number, number, "casa" | "documento" | "check", string][] = [[c.a_visita, 300, "casa", "VISITA DECISIVA"], [c.a_proposta, 540, "documento", "PROPOSTA"], [c.a_assinatura, 780, "check", "ASSINATURA"]];
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} t0={c.v_fase - 0.6} push={0.005} keys={[{ t: c.v_fase - 0.6, s: 1.05 }, { t: c.v_fase, s: 1.0, e: ease.out }, { t: c.a_silencioso, s: 1.04, y: -8 }, { t: c.f_essencial + 0.4, s: 1.08, y: -14, e: ease.out }]}>
        <Svg>
          <Chao />
          <Holofote x={540} chao={CHAO} w={mix(800, 880, fim)} p={0.85} cor={fim > 0.5 ? A.hex : "#FFFFFF"} />
          {fim > 0 && <Halo x={540} y={760} r={mix(260, 380, fim)} p={0.4 * fim} cor={A.hex} />}
          {FASES.map(([at, x, nome], i) => (
            <g key={i} opacity={surge(t, at - 0.2)}><Icone t={t} nome={nome} x={x} y={700} r={56} tom={t > at + 0.1 ? "verde" : "branco"} brilho={fim > 0.5} /></g>
          ))}
          <g opacity={luz(t, c.a_silencioso - 0.3, c.f_decidem - 0.3, 0.3, 0.4)}>
            <Icone t={t} nome="telefone" x={540} y={940} r={44} tom="cinza" />
          </g>
          <Figura t={t} x={150} y={CHAO} s={0.6} pose={t > c.a_visita - 0.2 && t < c.f_decidem ? "apontando" : fim > 0.5 ? "bracosAbertos" : "pe"} tom={fim > 0.5 ? "verde" : "luz"} />
          <Figura t={t} x={910} y={CHAO} s={0.6} flip pose={fim > 0.5 ? "comemorando" : "pe"} tom={fim > 0.5 ? "verde" : "luz"} fase={0.4} />
        </Svg>
        {FASES.map(([at, x, , s]) => <Pilula key={s} t={t} at={at - 0.1} x={x} y={800} texto={s} tom="verde" size={24} />)}
        <Pilula t={t} at={c.a_silencioso - 0.1} ate={c.f_decidem - 0.3} x={540} y={1030} texto="CELULAR NO SILENCIOSO" tom="branco" size={28} />
      </CamNoir>
      <TituloNoir t={t} at={c.v_fase - 0.35} ate={c.a_silencioso - 0.4} linhas={[{ texto: "A VENDA TEM", size: 64 }, { texto: "FASE CRÍTICA", cor: "verde", size: 100 }]} top={300} />
      <TituloNoir t={t} at={c.a_silencioso - 0.25} ate={c.f_decidem - 0.4} linhas={[{ texto: "SÓ O ASSUNTO", size: 64 }, { texto: "DO CLIENTE", cor: "verde", size: 100 }]} top={300} />
      <TituloNoir t={t} at={c.f_decidem - 0.25} ate={c.cta_quer - 0.2} linhas={[{ texto: "NOS MINUTOS QUE DECIDEM", size: 56 }, { texto: "SÓ O ESSENCIAL", cor: "verde", size: 92 }]} top={300} />
    </div>
  );
};
