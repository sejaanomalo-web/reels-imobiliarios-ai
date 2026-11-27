import React from "react";
import type { Timeline } from "../../types";
import {
  A, CamNoir, Caminho, Figura, Halo, Holofote, Icone, Pilula, TituloNoir, ease, luz, prog,
} from "../../../estilos/pictograma";

/**
 * ATIVO-D1214-12 — "O pé na porta" (grade 14/12/2026 · 12h · FORA DA BOLHA · Pictograma).
 * Sem corte seco: 1966, a casa e a placa enorme no jardim → a rua de quem já tinha aceitado a plaquinha: três de cada
 * quatro acendem → a rua de quem ouviu só o pedido grande: vermelha → um sim pequeno abre caminho → na captação, nada de
 * exclusividade na primeira conversa: conhecer o imóvel e avaliar → do passo pequeno ao grande → CtaNoir.
 * Freedman & Fraser (1966); sem o percentual do grupo de controle.
 */
const CHAO = 1180;
type P = { t: number; tl: Timeline };
const Svg: React.FC<{ children: React.ReactNode }> = ({ children }) => <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>{children}</svg>;
const Chao: React.FC = () => <line x1={-400} y1={CHAO} x2={1480} y2={CHAO} stroke="rgba(244,244,242,0.3)" strokeWidth={2} strokeDasharray="3 9" />;
const XS = [225, 435, 645, 855];

/** Placa no jardim: haste + quadro em linha fina. */
const Placa: React.FC<{ x: number; y: number; w: number; h: number; p: number; cor?: string; texto?: string }> = ({ x, y, w, h, p, cor = "#F4F4F2", texto }) => (
  <g opacity={p}>
    <line x1={x} y1={y + h} x2={x} y2={y + h + 70} stroke={cor} strokeWidth={3} />
    <rect x={x - w / 2} y={y} width={w} height={h} rx={6} fill="rgba(7,8,10,0.7)" stroke={cor} strokeWidth={3} />
    {texto ? <text x={x} y={y + h / 2 + 9} textAnchor="middle" fill={cor} fontFamily="JetBrains Mono" fontWeight={700} fontSize={26} letterSpacing="0.08em">{texto}</text> : null}
  </g>
);

/* ---------------------------------------------------------------- 1 · a rua ---------------------------------------------------------------- */
export const Rua: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = 1 - prog(t, c.v_sim - 0.5, 0.45);
  if (on <= 0.001) return null;
  const hook = 1 - prog(t, c.s_plaquinha - 0.4, 0.4);
  const ga = luz(t, c.s_plaquinha - 0.3, c.n_grande - 0.3, 0.4, 0.4);
  const gb = prog(t, c.n_grande - 0.2, 0.4);
  const sim = prog(t, c.s_tres - 0.2, 0.5);
  const nao = prog(t, c.n_recusou - 0.2, 0.4);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} push={0.004} keys={[{ t: 0, s: 1.06, y: -12 }, { t: c.h_placa, s: 1.0, e: ease.out }, { t: c.s_tres, s: 1.04, y: -8 }, { t: c.n_recusou, s: 1.0, e: ease.out }]}>
        <Svg>
          <Chao />
          <Holofote x={540} chao={CHAO} w={880} p={prog(t, 0, 0.6) * 0.85} cor={gb > 0.5 ? "#FFD9D4" : "#FFFFFF"} />
          <g opacity={hook}>
            <Icone t={t} nome="casa" x={460} y={760} r={110} tom="branco" />
            <Placa x={760} y={830} w={300} h={110} p={prog(t, c.h_placa - 0.2, 0.4)} texto="CUIDADO!" />
            <Figura t={t} x={250} y={CHAO} s={0.6} pose="apontando" tom="luz" />
          </g>
          <g opacity={ga}>
            {XS.map((x, i) => (
              <g key={x}>
                {i < 3 && sim > 0 ? <Halo x={x} y={760} r={90} p={0.45 * sim} cor={A.hex} /> : null}
                <Icone t={t} nome="casa" x={x} y={760} r={62} tom={sim > 0.5 ? (i < 3 ? "verde" : "cinza") : "branco"} brilho={sim > 0.5 && i < 3} />
                <Placa x={x + 34} y={700} w={34} h={22} p={prog(t, c.s_plaquinha - 0.2, 0.4)} cor={sim > 0.5 && i < 3 ? A.hex : "#F4F4F2"} />
              </g>
            ))}
          </g>
          <g opacity={gb}>
            {XS.map((x) => <Icone key={x} t={t} nome="casa" x={x} y={760} r={62} tom={nao > 0.5 ? "vermelho" : "branco"} />)}
          </g>
        </Svg>
        <Pilula t={t} at={c.h_1966 - 0.1} ate={c.h_placa - 0.2} x={540} y={1000} texto="1966 · CALIFÓRNIA" tom="branco" size={28} />
        <Pilula t={t} at={c.h_placa - 0.1} ate={c.s_plaquinha - 0.4} x={540} y={1000} texto="UMA PLACA ENORME NO JARDIM" tom="branco" size={28} />
        <Pilula t={t} at={c.s_plaquinha - 0.1} ate={c.s_tres - 0.2} x={540} y={1000} texto="ANTES: SÓ UMA PLAQUINHA" tom="branco" size={28} />
        <Pilula t={t} at={c.s_tres - 0.1} ate={c.n_grande - 0.3} x={540} y={1000} texto="3 EM CADA 4: SIM" tom="verde" size={30} />
        <Pilula t={t} at={c.n_grande - 0.1} ate={c.n_recusou - 0.2} x={540} y={1000} texto="SÓ O PEDIDO GRANDE" tom="branco" size={28} />
        <Pilula t={t} at={c.n_recusou - 0.1} x={540} y={1000} texto="A MAIORIA RECUSOU" tom="vermelho" size={30} />
      </CamNoir>
      <TituloNoir t={t} at={0.05} ate={c.s_plaquinha - 0.4} linhas={[{ texto: "UMA PLACA", size: 64 }, { texto: "ENORME", cor: "verde", size: 110 }]} top={300} />
      <TituloNoir t={t} at={c.s_plaquinha - 0.25} ate={c.n_grande - 0.4} linhas={[{ texto: "QUEM JÁ TINHA", size: 64 }, { texto: "DITO SIM", cor: "verde", size: 104 }]} top={300} />
      <TituloNoir t={t} at={c.n_grande - 0.25} ate={c.v_sim - 0.5} linhas={[{ texto: "SÓ O PEDIDO", size: 64 }, { texto: "GRANDE", cor: "verde", size: 110 }]} top={300} />
    </div>
  );
};

/* ---------------------------------------------------------------- 2 · a captação ---------------------------------------------------------------- */
export const Captacao: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = luz(t, c.v_sim - 0.6, c.cta_quer - 0.2, 0.5, 0.45);
  if (on <= 0.001) return null;
  const tese = luz(t, c.v_sim - 0.3, c.a_captacao - 0.2, 0.3, 0.4);
  const cap = prog(t, c.a_captacao - 0.3, 0.5);
  const fim = prog(t, c.d_grande - 0.2, 0.6, ease.out);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} t0={c.v_sim - 0.6} push={0.005} keys={[{ t: c.v_sim - 0.6, s: 1.05 }, { t: c.v_sim, s: 1.0, e: ease.out }, { t: c.a_avaliacao, s: 1.04, y: -8 }, { t: c.d_grande + 0.4, s: 1.08, y: -14, e: ease.out }]}>
        <Svg>
          <Chao />
          <Holofote x={540} chao={CHAO} w={860} p={0.85} cor={fim > 0.5 ? A.hex : "#FFFFFF"} />
          {fim > 0 ? <Halo x={540} y={760} r={300} p={0.45 * fim} cor={A.hex} /> : null}
          <g opacity={tese}><Caminho pontos={[[300, 840], [540, 780], [780, 680]]} p={prog(t, c.v_sim, 0.8)} /></g>
          <g opacity={cap}>
            <Icone t={t} nome="casa" x={540} y={760} r={90} tom={fim > 0.5 ? "verde" : "branco"} brilho={fim > 0.3} />
            <Figura t={t} x={250} y={CHAO} s={0.6} pose={t > c.a_conhecer - 0.2 && t < c.d_passo ? "apontando" : fim > 0.5 ? "bracosAbertos" : "pe"} tom={fim > 0.5 ? "verde" : "luz"} />
            <Figura t={t} x={830} y={CHAO} s={0.6} pose={fim > 0.5 ? "comemorando" : "pe"} tom={fim > 0.5 ? "verde" : "luz"} fase={0.4} />
          </g>
        </Svg>
        <Pilula t={t} at={c.v_sim - 0.1} ate={c.a_captacao - 0.3} x={300} y={900} texto="SIM PEQUENO" tom="verde" size={28} />
        <Pilula t={t} at={c.v_grande - 0.1} ate={c.a_captacao - 0.3} x={780} y={620} texto="O GRANDE" tom="branco" size={34} />
        <Pilula t={t} at={c.a_exclusividade - 0.1} ate={c.a_conhecer - 0.3} x={540} y={600} texto="EXCLUSIVIDADE DE CARA" tom="vermelho" size={28} />
        <Pilula t={t} at={c.a_conhecer - 0.1} ate={c.d_passo - 0.3} x={540} y={590} texto="1 · CONHECER O IMÓVEL" tom="verde" size={28} />
        <Pilula t={t} at={c.a_avaliacao - 0.1} ate={c.d_passo - 0.3} x={540} y={670} texto="2 · FAZER A AVALIAÇÃO" tom="verde" size={28} />
        <Pilula t={t} at={c.d_passo - 0.1} ate={c.d_grande - 0.2} x={540} y={1000} texto="O PASSO PEQUENO" tom="verde" size={28} />
        <Pilula t={t} at={c.d_grande - 0.1} x={540} y={1000} texto="CHEGA AO GRANDE" tom="verde" size={30} />
      </CamNoir>
      <TituloNoir t={t} at={c.v_sim - 0.35} ate={c.a_captacao - 0.4} linhas={[{ texto: "UM SIM PEQUENO", size: 64 }, { texto: "ABRE CAMINHO", cor: "verde", size: 92 }]} top={300} />
      <TituloNoir t={t} at={c.a_captacao - 0.25} ate={c.d_passo - 0.4} linhas={[{ texto: "NA CAPTAÇÃO", size: 64 }, { texto: "COMECE PEQUENO", cor: "verde", size: 88 }]} top={300} />
      <TituloNoir t={t} at={c.d_passo - 0.25} ate={c.cta_quer - 0.2} linhas={[{ texto: "DO PEQUENO", size: 64 }, { texto: "AO GRANDE", cor: "verde", size: 104 }]} top={300} />
    </div>
  );
};
