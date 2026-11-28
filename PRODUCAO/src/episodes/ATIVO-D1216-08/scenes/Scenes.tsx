import React from "react";
import type { Timeline } from "../../types";
import {
  A, CamNoir, Figura, Halo, Holofote, Icone, Pilula, TituloNoir, ease, luz, prog,
} from "../../../estilos/pictograma";

/**
 * ATIVO-D1216-08 — "O que o comprador pergunta" (grade 16/12/2026 · 08h · E SE…? · Pictograma).
 * Sem corte seco: a casa em linha fina perde a luz → Califórnia: o calendário dos três anos e PODE TER QUE INFORMAR →
 * o comprador pergunta: NINGUÉM PODE MENTIR / NEM SOBRE O ANTES → resposta verdadeira → na captação, o corretor pergunta
 * ao proprietário o que um comprador gostaria de saber → a casa volta a acender → CtaNoir. Civil Code §1710.2 (Califórnia).
 * Tom respeitoso; nada de imagem de morte.
 */
const CHAO = 1180;
type P = { t: number; tl: Timeline };
const Svg: React.FC<{ children: React.ReactNode }> = ({ children }) => <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>{children}</svg>;
const Chao: React.FC = () => <line x1={-400} y1={CHAO} x2={1480} y2={CHAO} stroke="rgba(244,244,242,0.3)" strokeWidth={2} strokeDasharray="3 9" />;

/* ---------------------------------------------------------------- 1 · a lei ---------------------------------------------------------------- */
export const Lei: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = 1 - prog(t, c.v_verdadeira - 0.5, 0.45);
  if (on <= 0.001) return null;
  const apaga = prog(t, c.h_morreu - 0.2, 0.6);
  const lei = prog(t, c.l_california - 0.2, 0.4);
  const perg = prog(t, c.p_perguntar - 0.2, 0.4);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} push={0.004} keys={[{ t: 0, s: 1.06, y: -12 }, { t: c.h_morreu, s: 1.0, e: ease.out }, { t: c.l_tres, s: 1.04, y: -8 }, { t: c.p_mentir, s: 1.0, e: ease.out }]}>
        <Svg>
          <Chao />
          <Holofote x={540} chao={CHAO} w={860} p={prog(t, 0, 0.6) * 0.85 * (1 - 0.4 * apaga)} />
          {apaga < 1 ? <Halo x={540} y={720} r={210} p={0.4 * (1 - apaga)} cor="#FFFFFF" /> : null}
          <Icone t={t} nome="casa" x={540} y={720} r={130} tom={apaga > 0.5 ? "cinza" : "branco"} />
          <g opacity={lei * (1 - perg)}><Icone t={t} nome="calendario" x={850} y={920} r={56} tom="branco" /></g>
          <Figura t={t} x={180} y={CHAO} s={0.6} pose={t > c.p_perguntar - 0.2 ? "apontando" : "pe"} tom="luz" />
          <g opacity={perg}><Icone t={t} nome="chat" x={330} y={930} r={52} tom={t > c.p_mentir - 0.2 ? "vermelho" : "branco"} /></g>
        </Svg>
        <Pilula t={t} at={c.l_tres - 0.1} ate={c.p_perguntar - 0.3} x={540} y={1000} texto="MORTE NOS ÚLTIMOS 3 ANOS" tom="branco" size={28} />
        <Pilula t={t} at={c.l_informada - 0.1} ate={c.p_perguntar - 0.3} x={540} y={590} texto="PODE TER QUE SER INFORMADA" tom="branco" size={26} />
        <Pilula t={t} at={c.p_perguntar - 0.1} ate={c.p_mentir - 0.2} x={540} y={1000} texto="PERGUNTA DIRETA" tom="branco" size={28} />
        <Pilula t={t} at={c.p_mentir - 0.1} ate={c.v_verdadeira - 0.5} x={540} y={1000} texto="NINGUÉM PODE MENTIR" tom="vermelho" size={30} />
        <Pilula t={t} at={c.p_antes - 0.1} ate={c.v_verdadeira - 0.5} x={540} y={590} texto="NEM SOBRE O QUE FOI ANTES" tom="vermelho" size={26} />
      </CamNoir>
      <TituloNoir t={t} at={0.05} ate={c.l_california - 0.4} linhas={[{ texto: "E SE VOCÊ", size: 64 }, { texto: "TIVESSE QUE CONTAR?", cor: "verde", size: 76 }]} top={300} />
      <TituloNoir t={t} at={c.l_california - 0.25} ate={c.p_perguntar - 0.4} linhas={[{ texto: "NA CALIFÓRNIA,", size: 64 }, { texto: "TRÊS ANOS", cor: "verde", size: 104 }]} top={300} />
      <TituloNoir t={t} at={c.p_perguntar - 0.25} ate={c.v_verdadeira - 0.5} linhas={[{ texto: "PERGUNTOU?", size: 64 }, { texto: "A VERDADE", cor: "verde", size: 104 }]} top={300} />
    </div>
  );
};

/* ---------------------------------------------------------------- 2 · a captação ---------------------------------------------------------------- */
export const Antes: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = luz(t, c.v_verdadeira - 0.6, c.cta_quer - 0.2, 0.5, 0.45);
  if (on <= 0.001) return null;
  const conversa = prog(t, c.a_proprietario - 0.2, 0.4);
  const fim = prog(t, c.d_confiar - 0.2, 0.6, ease.out);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} t0={c.v_verdadeira - 0.6} push={0.005} keys={[{ t: c.v_verdadeira - 0.6, s: 1.05 }, { t: c.v_verdadeira, s: 1.0, e: ease.out }, { t: c.a_saber, s: 1.04, y: -8 }, { t: c.d_confiar + 0.4, s: 1.08, y: -14, e: ease.out }]}>
        <Svg>
          <Chao />
          <Holofote x={540} chao={CHAO} w={860} p={0.85} cor={fim > 0.5 ? A.hex : "#FFFFFF"} />
          {fim > 0 ? <Halo x={540} y={720} r={300} p={0.4 * fim} cor={A.hex} /> : null}
          <Icone t={t} nome="casa" x={540} y={720} r={110} tom={fim > 0.5 ? "verde" : t > c.a_anunciar - 0.2 ? "branco" : "cinza"} brilho={fim > 0.5} />
          <g opacity={conversa}><Icone t={t} nome="chat" x={540} y={930} r={52} tom={t > c.a_saber - 0.3 ? "verde" : "branco"} brilho={t > c.a_saber - 0.3} /></g>
          <Figura t={t} x={250} y={CHAO} s={0.6} pose={t > c.a_proprietario - 0.2 && t < c.d_depois ? "apontando" : fim > 0.5 ? "bracosAbertos" : "pe"} tom={fim > 0.5 ? "verde" : "luz"} />
          <Figura t={t} x={830} y={CHAO} s={0.6} pose="pe" tom={fim > 0.5 ? "verde" : "luz"} fase={0.4} />
        </Svg>
        <Pilula t={t} at={c.a_anunciar - 0.1} ate={c.d_depois - 0.3} x={540} y={590} texto="ANTES DE ANUNCIAR" tom="branco" size={28} />
        <Pilula t={t} at={c.a_proprietario - 0.1} ate={c.d_depois - 0.3} x={830} y={905} texto="PROPRIETÁRIO" tom="branco" size={24} />
        <Pilula t={t} at={c.a_saber - 1.2} ate={c.d_depois - 0.3} x={540} y={1000} texto="ALGO QUE O COMPRADOR" tom="verde" size={24} />
        <Pilula t={t} at={c.a_saber - 0.6} ate={c.d_depois - 0.3} x={540} y={1050} texto="GOSTARIA DE SABER?" tom="verde" size={24} />
        <Pilula t={t} at={c.d_depois - 0.1} ate={c.d_confiar - 0.2} x={540} y={1000} texto="DESCOBRIR DEPOIS" tom="vermelho" size={28} />
        <Pilula t={t} at={c.d_confiar - 0.1} x={540} y={1000} texto="CONFIANÇA VEM ANTES" tom="verde" size={28} />
      </CamNoir>
      <TituloNoir t={t} at={c.v_verdadeira - 0.35} ate={c.a_anunciar - 0.4} linhas={[{ texto: "RESPOSTA", size: 64 }, { texto: "VERDADEIRA", cor: "verde", size: 96 }]} top={300} />
      <TituloNoir t={t} at={c.a_anunciar - 0.25} ate={c.d_depois - 0.4} linhas={[{ texto: "PERGUNTE", size: 64 }, { texto: "ANTES", cor: "verde", size: 110 }]} top={300} />
      <TituloNoir t={t} at={c.d_depois - 0.25} ate={c.cta_quer - 0.2} linhas={[{ texto: "QUEM DESCOBRE DEPOIS", size: 56 }, { texto: "NÃO CONFIA", cor: "verde", size: 96 }]} top={300} />
    </div>
  );
};
