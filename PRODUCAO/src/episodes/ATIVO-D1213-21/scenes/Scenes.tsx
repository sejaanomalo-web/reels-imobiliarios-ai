import React from "react";
import type { Timeline } from "../../types";
import {
  A, CamNoir, Caminho, Figura, Halo, Holofote, Icone, Pilula, TituloNoir, ease, luz, mix, prog,
} from "../../../estilos/pictograma";

/**
 * ATIVO-D1213-21 — "A visita que não cabe no bolso" (grade 13/12/2026 · 21h · CORRETOR NA VIDA REAL · Pictograma).
 * Sem corte seco: o cliente encantado diante da casa com halo → a simulação aparece, a parcela não cabe e o halo apaga →
 * as outras casas ficam cinzas (tudo parece pior) → a ordem certa: 1 · simulação, 2 · visita → no primeiro contato: renda,
 * entrada e a parcela que cabe → só a casa que cabe acende → o imóvel certo → CtaNoir. Rotina; sem banco, taxa ou %.
 */
const CHAO = 1180;
type P = { t: number; tl: Timeline };
const Svg: React.FC<{ children: React.ReactNode }> = ({ children }) => <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>{children}</svg>;
const Chao: React.FC = () => <line x1={-400} y1={CHAO} x2={1480} y2={CHAO} stroke="rgba(244,244,242,0.3)" strokeWidth={2} strokeDasharray="3 9" />;

/* ---------------------------------------------------------------- 1 · a paixão ---------------------------------------------------------------- */
export const Paixao: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = 1 - prog(t, c.v_antes - 0.5, 0.45);
  if (on <= 0.001) return null;
  const amor = prog(t, c.h_amou - 0.2, 0.5) * (1 - prog(t, c.f_parcela - 0.2, 0.5));
  const nao = prog(t, c.f_parcela - 0.2, 0.4);
  const outras = prog(t, c.c_pior - 0.3, 0.5);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} push={0.004} keys={[{ t: 0, s: 1.06, y: -12 }, { t: c.h_amou, s: 1.0, e: ease.out }, { t: c.f_parcela, s: 1.05, y: -10 }, { t: c.c_pior, s: 1.0, e: ease.out }]}>
        <Svg>
          <Chao />
          <Holofote x={540} chao={CHAO} w={840} p={prog(t, 0, 0.6) * 0.85} cor={nao > 0.5 ? "#FFD9D4" : "#FFFFFF"} />
          {amor > 0 && <Halo x={540} y={720} r={260} p={0.5 * amor} cor={A.hex} />}
          <g transform={`translate(0 ${-outras * 40})`}><Icone t={t} nome="casa" x={540} y={720} r={mix(120, 90, outras)} tom={amor > 0.5 ? "verde" : nao > 0.5 ? "vermelho" : "branco"} brilho={amor > 0.5} /></g>
          <g opacity={outras}>
            <Icone t={t} nome="casa" x={270} y={760} r={64} tom="cinza" />
            <Icone t={t} nome="casa" x={810} y={760} r={64} tom="cinza" />
          </g>
          <g opacity={luz(t, c.h_simulacao - 0.2, c.c_pior - 0.3, 0.3, 0.4)}><Icone t={t} nome="dinheiro" x={850} y={950} r={48} tom={nao > 0.5 ? "vermelho" : "branco"} /></g>
          <Figura t={t} x={150} y={CHAO} s={0.6} pose="pe" tom="luz" />
          <Figura t={t} x={360} y={CHAO} s={0.6} pose={amor > 0.5 ? "comemorando" : nao > 0.5 ? "cabisbaixo" : "pe"} tom={amor > 0.5 ? "verde" : "luz"} fase={0.4} />
        </Svg>
        <Pilula t={t} at={c.h_amou - 0.1} ate={c.h_simulacao - 0.2} x={540} y={1000} texto="AMOU" tom="verde" size={30} />
        <Pilula t={t} at={c.h_simulacao - 0.1} ate={c.f_parcela - 0.2} x={540} y={1000} texto="A SIMULAÇÃO" tom="branco" size={28} />
        <Pilula t={t} at={c.f_parcela - 0.1} ate={c.c_pior - 0.3} x={540} y={1000} texto="A PARCELA NÃO COUBE" tom="vermelho" size={28} />
        <Pilula t={t} at={c.c_pior - 0.1} x={540} y={1000} texto="TUDO PARECE PIOR" tom="vermelho" size={28} />
      </CamNoir>
      <TituloNoir t={t} at={0.05} ate={c.f_parcela - 0.4} linhas={[{ texto: "AMOU O", size: 64 }, { texto: "APARTAMENTO", cor: "verde", size: 92 }]} top={300} />
      <TituloNoir t={t} at={c.f_parcela - 0.25} ate={c.c_pior - 0.4} linhas={[{ texto: "NÃO COUBE", size: 64 }, { texto: "NO BOLSO", cor: "verde", size: 104 }]} top={300} />
      <TituloNoir t={t} at={c.c_pior - 0.25} ate={c.v_antes - 0.5} linhas={[{ texto: "E AGORA TUDO", size: 64 }, { texto: "PARECE PIOR", cor: "verde", size: 100 }]} top={300} />
    </div>
  );
};

/* ---------------------------------------------------------------- 2 · a ordem certa ---------------------------------------------------------------- */
export const Ordem: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = luz(t, c.v_antes - 0.6, c.cta_quer - 0.2, 0.5, 0.45);
  if (on <= 0.001) return null;
  const casas = prog(t, c.d_orcamento - 0.3, 0.5);
  const fim = prog(t, c.d_certo - 0.2, 0.6, ease.out);
  const ordem = luz(t, c.v_antes - 0.2, c.a_contato - 0.2, 0.3, 0.4);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} t0={c.v_antes - 0.6} push={0.005} keys={[{ t: c.v_antes - 0.6, s: 1.05 }, { t: c.v_antes, s: 1.0, e: ease.out }, { t: c.a_parcela, s: 1.04, y: -8 }, { t: c.d_certo + 0.4, s: 1.08, y: -14, e: ease.out }]}>
        <Svg>
          <Chao />
          <Holofote x={540} chao={CHAO} w={mix(800, 880, fim)} p={0.85} cor={fim > 0.5 ? A.hex : "#FFFFFF"} />
          {fim > 0 && <Halo x={540} y={760} r={mix(240, 360, fim)} p={0.45 * fim} cor={A.hex} />}
          <g opacity={ordem}><Caminho pontos={[[420, 700], [660, 700]]} p={prog(t, c.v_antes, 0.6)} /></g>
          <g opacity={luz(t, c.a_contato - 0.2, c.d_orcamento - 0.3, 0.3, 0.4)}><Icone t={t} nome="dinheiro" x={880} y={940} r={50} tom="verde" brilho /></g>
          <g opacity={casas}>
            <Icone t={t} nome="casa" x={270} y={760} r={64} tom="cinza" />
            <Icone t={t} nome="casa" x={540} y={740} r={90} tom="verde" brilho={fim > 0.3} />
            <Icone t={t} nome="casa" x={810} y={760} r={64} tom="cinza" />
          </g>
          <Figura t={t} x={150} y={CHAO} s={0.6} pose={t > c.a_contato - 0.2 && t < c.d_orcamento ? "apontando" : fim > 0.5 ? "bracosAbertos" : "pe"} tom={fim > 0.5 ? "verde" : "luz"} />
          <Figura t={t} x={360} y={CHAO} s={0.6} pose={fim > 0.5 ? "comemorando" : "pe"} tom={fim > 0.5 ? "verde" : "luz"} fase={0.4} />
        </Svg>
        <Pilula t={t} at={c.v_antes - 0.1} ate={c.a_contato - 0.3} x={330} y={700} texto="1 · SIMULAÇÃO" tom="verde" size={28} />
        <Pilula t={t} at={c.v_antes + 0.3} ate={c.a_contato - 0.3} x={760} y={700} texto="2 · VISITA" tom="branco" size={28} />
        <Pilula t={t} at={c.v_depois - 0.1} ate={c.a_contato - 0.3} x={540} y={800} texto="NÃO DEPOIS" tom="vermelho" size={28} />
        {([[c.a_renda, "A RENDA"], [c.a_entrada, "A ENTRADA"], [c.a_parcela, "A PARCELA QUE CABE"]] as [number, string][]).map(([at, s], i) => (
          <Pilula key={s} t={t} at={at - 0.1} ate={c.d_orcamento - 0.3} x={540} y={600 + i * 85} texto={s} tom="verde" size={28} />
        ))}
        <Pilula t={t} at={c.d_orcamento - 0.1} x={540} y={1000} texto="DENTRO DO ORÇAMENTO" tom="verde" size={28} />
      </CamNoir>
      <TituloNoir t={t} at={c.v_antes - 0.35} ate={c.a_contato - 0.4} linhas={[{ texto: "SIMULAÇÃO", size: 64 }, { texto: "ANTES DA VISITA", cor: "verde", size: 88 }]} top={300} />
      <TituloNoir t={t} at={c.a_contato - 0.25} ate={c.d_orcamento - 0.4} linhas={[{ texto: "NO PRIMEIRO", size: 64 }, { texto: "CONTATO", cor: "verde", size: 104 }]} top={300} />
      <TituloNoir t={t} at={c.d_orcamento - 0.25} ate={c.cta_quer - 0.2} linhas={[{ texto: "O IMÓVEL", size: 64 }, { texto: "CERTO", cor: "verde", size: 110 }]} top={300} />
    </div>
  );
};
