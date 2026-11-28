import React from "react";
import type { Timeline } from "../../types";
import {
  A, CamNoir, Figura, Halo, Holofote, Icone, Pilula, TituloNoir, ease, luz, mix, prog,
} from "../../../estilos/pictograma";

/**
 * ATIVO-D1214-21 — "A certidão vencida" (grade 14/12/2026 · 21h · CORRETOR NA VIDA REAL · Pictograma).
 * Sem corte seco: o cartório, as três pessoas sentadas e a certidão que fica vermelha (venceu ontem) → assinatura adiada,
 * o cliente cabisbaixo, sem o imóvel → três certidões com barras de prazo diferentes (a do registro: 30 dias) → não
 * vencem juntas → a linha do tempo até a escritura: data de emissão em cada uma, a de prazo curto desliza para o fim →
 * documento em dia, escritura no dia → CtaNoir. Lei 7.433/1985 e Decreto 93.240/1986 (30 dias para as do registro).
 */
const CHAO = 1180;
type P = { t: number; tl: Timeline };
const Svg: React.FC<{ children: React.ReactNode }> = ({ children }) => <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>{children}</svg>;
const Chao: React.FC = () => <line x1={-400} y1={CHAO} x2={1480} y2={CHAO} stroke="rgba(244,244,242,0.3)" strokeWidth={2} strokeDasharray="3 9" />;
const Barra: React.FC<{ x: number; y: number; w: number; p: number; cor: string }> = ({ x, y, w, p, cor }) => (
  <g opacity={p}>
    <rect x={x} y={y} width={w * p} height={14} rx={7} fill={cor} opacity={0.85} />
    <rect x={x} y={y} width={w} height={14} rx={7} fill="none" stroke={cor} strokeWidth={2} opacity={0.5} />
  </g>
);

/* ---------------------------------------------------------------- 1 · o cartório ---------------------------------------------------------------- */
export const Cartorio: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = 1 - prog(t, c.v_juntas - 0.5, 0.45);
  if (on <= 0.001) return null;
  const cena = 1 - prog(t, c.p_registro - 0.5, 0.4);
  const venc = prog(t, c.h_venceu - 0.2, 0.4);
  const prazos = prog(t, c.p_registro - 0.3, 0.5);
  const DOCS: [number, number, string][] = [[300, 90, "verde"], [540, 210, "branco"], [780, 150, "branco"]];
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} push={0.004} keys={[{ t: 0, s: 1.06, y: -12 }, { t: c.h_cartorio, s: 1.0, e: ease.out }, { t: c.h_venceu, s: 1.06, y: -10 }, { t: c.f_sem, s: 1.0, e: ease.out }, { t: c.p_registro, s: 1.03 }]}>
        <Svg>
          <Chao />
          <Holofote x={540} chao={CHAO} w={860} p={prog(t, 0, 0.6) * 0.85} cor={venc > 0.5 && cena > 0.5 ? "#FFD9D4" : "#FFFFFF"} />
          <g opacity={cena}>
            <Icone t={t} nome="predio" x={540} y={680} r={100} tom="branco" />
            <Icone t={t} nome="documento" x={820} y={900} r={60} tom={venc > 0.5 ? "vermelho" : "branco"} />
            <Figura t={t} x={220} y={CHAO} s={0.6} pose={t > c.f_sem - 0.2 ? "cabisbaixo" : "sentado"} tom="luz" />
            <Figura t={t} x={400} y={CHAO} s={0.6} pose="sentado" tom="luz" fase={0.3} />
            <Figura t={t} x={620} y={CHAO} s={0.6} pose={t > c.h_venceu - 0.1 && t < c.f_sem ? "pe" : "sentado"} tom="luz" fase={0.6} />
          </g>
          <g opacity={prazos}>
            {DOCS.map(([x, w, tom], i) => (
              <g key={x}>
                <Icone t={t} nome="documento" x={x} y={680} r={62} tom={i === 0 && t > c.p_trinta - 0.2 ? "verde" : "branco"} brilho={i === 0 && t > c.p_trinta - 0.2} />
                <Barra x={x - 105} y={790} w={w} p={prog(t, (i === 0 ? c.p_trinta : c.p_diferentes) - 0.3 + i * 0.12, 0.6, ease.out)} cor={tom === "verde" ? A.hex : "#F4F4F2"} />
              </g>
            ))}
          </g>
        </Svg>
        <Pilula t={t} at={c.h_cartorio - 0.1} ate={c.h_venceu - 0.2} x={540} y={1000} texto="TODO MUNDO NO CARTÓRIO" tom="branco" size={28} />
        <Pilula t={t} at={c.h_venceu - 0.1} ate={c.f_assinatura - 0.2} x={540} y={1000} texto="A CERTIDÃO VENCEU ONTEM" tom="vermelho" size={28} />
        <Pilula t={t} at={c.f_assinatura - 0.1} ate={c.f_sem - 0.2} x={540} y={1000} texto="ASSINATURA ADIADA" tom="vermelho" size={28} />
        <Pilula t={t} at={c.f_sem - 0.1} ate={c.p_registro - 0.5} x={540} y={1000} texto="SEM O IMÓVEL" tom="vermelho" size={30} />
        <Pilula t={t} at={c.p_trinta - 0.1} x={300} y={880} texto="REGISTRO: 30 DIAS" tom="verde" size={26} />
        <Pilula t={t} at={c.p_diferentes - 0.1} x={660} y={960} texto="AS OUTRAS: PRAZOS DIFERENTES" tom="branco" size={26} />
      </CamNoir>
      <TituloNoir t={t} at={0.05} ate={c.h_venceu - 0.4} linhas={[{ texto: "ESCRITURA", size: 64 }, { texto: "MARCADA", cor: "verde", size: 110 }]} top={300} />
      <TituloNoir t={t} at={c.h_venceu - 0.25} ate={c.p_registro - 0.5} linhas={[{ texto: "E A CERTIDÃO", size: 64 }, { texto: "VENCEU", cor: "verde", size: 110 }]} top={300} />
      <TituloNoir t={t} at={c.p_registro - 0.35} ate={c.v_juntas - 0.5} linhas={[{ texto: "CADA CERTIDÃO", size: 64 }, { texto: "UM PRAZO", cor: "verde", size: 104 }]} top={300} />
    </div>
  );
};

/* ---------------------------------------------------------------- 2 · o controle ---------------------------------------------------------------- */
export const Controle: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = luz(t, c.v_juntas - 0.6, c.cta_quer - 0.2, 0.5, 0.45);
  if (on <= 0.001) return null;
  const linha = prog(t, c.v_juntas - 0.3, 0.8, ease.out);
  const curto = prog(t, c.a_curto - 0.2, 0.9, ease.inOut);
  const fim = prog(t, c.d_documento - 0.2, 0.6, ease.out);
  const xs = [230, 420, mix(560, 735, curto)];
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} t0={c.v_juntas - 0.6} push={0.005} keys={[{ t: c.v_juntas - 0.6, s: 1.05 }, { t: c.v_juntas, s: 1.0, e: ease.out }, { t: c.a_curto, s: 1.04, y: -8 }, { t: c.d_dia + 0.4, s: 1.08, y: -14, e: ease.out }]}>
        <Svg>
          <Chao />
          <Holofote x={540} chao={CHAO} w={860} p={0.85} cor={fim > 0.5 ? A.hex : "#FFFFFF"} />
          {fim > 0 ? <Halo x={540} y={760} r={340} p={0.4 * fim} cor={A.hex} /> : null}
          <line x1={160} y1={820} x2={160 + 760 * linha} y2={820} stroke={fim > 0.5 ? A.hex : "#F4F4F2"} strokeWidth={3} opacity={0.8} />
          {xs.map((x, i) => (
            <g key={i} opacity={prog(t, c.v_juntas - 0.1 + i * 0.15, 0.4)}>
              <Icone t={t} nome="documento" x={x} y={720} r={58} tom={fim > 0.5 || t > c.a_data + i * 0.3 ? "verde" : "branco"} brilho={fim > 0.5} />
              <circle cx={x} cy={820} r={9} fill={t > c.a_data + i * 0.3 ? A.hex : "#F4F4F2"} />
            </g>
          ))}
          <Icone t={t} nome="calendario" x={910} y={720} r={62} tom={fim > 0.5 ? "verde" : "branco"} brilho={fim > 0.5} />
          <Figura t={t} x={200} y={CHAO} s={0.6} pose={t > c.a_data - 0.2 && t < c.d_documento ? "apontando" : fim > 0.5 ? "bracosAbertos" : "pe"} tom={fim > 0.5 ? "verde" : "luz"} />
          <Figura t={t} x={860} y={CHAO} s={0.6} pose={fim > 0.5 ? "comemorando" : "pe"} tom={fim > 0.5 ? "verde" : "luz"} fase={0.4} />
        </Svg>
        <Pilula t={t} at={c.v_juntas - 0.1} ate={c.a_data - 0.3} x={540} y={920} texto="NÃO VENCEM JUNTAS" tom="vermelho" size={28} />
        <Pilula t={t} at={c.a_data - 0.1} ate={c.d_documento - 0.3} x={420} y={920} texto="DATA DE EMISSÃO EM CADA UMA" tom="verde" size={26} />
        <Pilula t={t} at={c.v_juntas + 0.3} x={910} y={620} texto="ESCRITURA" tom="branco" size={26} />
        <Pilula t={t} at={c.a_curto - 0.1} ate={c.d_documento - 0.3} x={mix(560, 700, curto)} y={565} texto="PRAZO CURTO: POR ÚLTIMO" tom="verde" size={24} />
        <Pilula t={t} at={c.d_documento - 0.1} ate={c.d_dia + 0.4} x={540} y={1000} texto="DOCUMENTO EM DIA" tom="verde" size={28} />
        <Pilula t={t} at={c.d_dia + 0.5} x={540} y={1000} texto="ESCRITURA NO DIA" tom="verde" size={30} />
      </CamNoir>
      <TituloNoir t={t} at={c.v_juntas - 0.35} ate={c.a_data - 0.4} linhas={[{ texto: "NÃO VENCEM", size: 64 }, { texto: "JUNTAS", cor: "verde", size: 110 }]} top={300} />
      <TituloNoir t={t} at={c.a_data - 0.25} ate={c.d_documento - 0.4} linhas={[{ texto: "ANOTE", size: 64 }, { texto: "A EMISSÃO", cor: "verde", size: 104 }]} top={300} />
      <TituloNoir t={t} at={c.d_documento - 0.25} ate={c.cta_quer - 0.2} linhas={[{ texto: "ESCRITURA", size: 64 }, { texto: "NO DIA", cor: "verde", size: 110 }]} top={300} />
    </div>
  );
};
