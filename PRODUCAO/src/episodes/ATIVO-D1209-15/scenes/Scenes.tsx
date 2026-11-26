import React from "react";
import type { Timeline } from "../../types";
import {
  A, Bolha, CamNoir, Figura, Halo, Holofote, Icone, Pilula, Relogio, TituloNoir, ease, luz, mix, prog, surge,
} from "../../../estilos/pictograma";

/**
 * ATIVO-D1209-15 — "Imagine que deu errado" (grade 09/12/2026 · 15h · IDEIA QUE MUDA O JOGO · Pictograma).
 * Sem corte seco: a casa e o X → o método do pré-mortem (o projeto, o X antes de começar, "por quê?") → um estudo citado pelo
 * autor: +30% na identificação dos motivos → a visita: "imagine que daqui a um ano você se arrependeu" (o relógio avança) →
 * barulho, escola longe, condomínio caro aparecem agora → antes é pergunta; depois, distrato → CtaNoir.
 * Apuração: Klein (2007), HBR, "Performing a Project Premortem"; Mitchell, Russo & Pennington (1989) — número atribuído.
 */
const CHAO = 1180;
type P = { t: number; tl: Timeline };
const Svg: React.FC<{ children: React.ReactNode }> = ({ children }) => <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>{children}</svg>;
const Chao: React.FC = () => <line x1={-400} y1={CHAO} x2={1480} y2={CHAO} stroke="rgba(244,244,242,0.3)" strokeWidth={2} strokeDasharray="3 9" />;

/* ---------------------------------------------------------------- 1 · o método ---------------------------------------------------------------- */
export const Metodo: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = 1 - prog(t, c.v_pergunte - 1.0, 0.5);
  if (on <= 0.001) return null;
  const proj = prog(t, c.m_metodo - 0.3, 0.5);
  const xis = prog(t, c.m_fracassou - 0.2, 0.4);
  const est = prog(t, c.e_estudo - 0.3, 0.5);
  const trinta = prog(t, c.e_trinta - 0.2, 0.5);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} push={0.004} keys={[{ t: 0, s: 1.06, y: -14 }, { t: c.h_errado, s: 1.0, e: ease.out }, { t: c.m_fracassou, s: 1.04, x: 16 }, { t: c.e_trinta + 0.4, s: 1.07, y: -16, e: ease.out }]}>
        <Svg>
          <Chao />
          <Holofote x={540} chao={CHAO} w={680} p={prog(t, 0, 0.6)} cor={trinta > 0.5 ? A.hex : "#FFFFFF"} />
          {trinta > 0 && <Halo x={540} y={760} r={320} p={0.4 * trinta} cor={A.hex} />}
          <g opacity={surge(t, 0.2) * (1 - proj)}><Icone t={t} nome="casa" x={540} y={740} r={84} tom="branco" /></g>
          <g opacity={prog(t, c.h_errado - 0.15, 0.3) * (1 - proj)}><Icone t={t} nome="x" x={640} y={650} r={40} tom="vermelho" /></g>
          <g opacity={proj * (1 - est)}><Icone t={t} nome="documento" x={540} y={740} r={84} tom="branco" /></g>
          <g opacity={xis * (1 - est)}><Icone t={t} nome="x" x={640} y={650} r={40} tom="vermelho" /></g>
          <g opacity={prog(t, c.m_psicologo - 0.2, 0.4) * (1 - est)}><Icone t={t} nome="lampada" x={300} y={760} r={46} tom="branco" /></g>
          <g opacity={est}><Icone t={t} nome="lupa" x={540} y={760} r={76} tom={trinta > 0.5 ? "verde" : "branco"} brilho={trinta > 0.5} /></g>
          <Figura t={t} x={540} y={CHAO} s={0.66} pose={trinta > 0.5 ? "comemorando" : xis > 0.5 ? "cabisbaixo" : "pe"} tom={trinta > 0.5 ? "verde" : "luz"} />
        </Svg>
        <Pilula t={t} at={c.m_antes - 0.05} ate={c.e_estudo - 0.4} x={540} y={850} texto="ANTES DE COMEÇAR" tom="branco" size={28} />
        <Pilula t={t} at={c.m_fracassou - 0.05} ate={c.e_estudo - 0.4} x={540} y={905} texto="IMAGINA QUE FRACASSOU · POR QUÊ?" tom="vermelho" size={26} />
        <Pilula t={t} at={c.e_estudo - 0.05} ate={c.v_pergunte - 1.0} x={540} y={630} texto="ESTUDO DE 1989 CITADO POR KLEIN · HBR · 2007" tom="cinza" size={24} />
        <Pilula t={t} at={c.e_trinta - 0.05} x={540} y={890} texto="+30% NA IDENTIFICAÇÃO DOS MOTIVOS" tom="verde" size={28} />
      </CamNoir>
      <TituloNoir t={t} at={0.05} ate={c.m_psicologo - 0.4} linhas={[{ texto: "IMAGINE QUE", size: 72 }, { texto: "DEU ERRADO", cor: "vermelho", size: 96 }]} top={300} />
      <TituloNoir t={t} at={c.m_psicologo - 0.25} ate={c.e_estudo - 0.4} linhas={[{ texto: "O MÉTODO DO", size: 64 }, { texto: "PRÉ-MORTEM", cor: "verde", size: 100 }]} top={300} />
      <TituloNoir t={t} at={c.e_estudo - 0.25} ate={c.v_pergunte - 1.0} linhas={[{ texto: "UM ESTUDO", size: 64 }, { texto: "VER ANTES", cor: "verde", size: 100 }]} top={300} />
    </div>
  );
};

/* ---------------------------------------------------------------- 2–3 · a pergunta na visita ---------------------------------------------------------------- */
export const Pergunta: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = luz(t, c.v_pergunte - 1.1, c.cta_quer - 0.2, 0.6, 0.45);
  if (on <= 0.001) return null;
  const objs = prog(t, c.r_barulho - 0.3, 0.4);
  const agora = prog(t, c.r_agora - 0.2, 0.6);
  const dist = prog(t, c.f_distrato - 0.2, 0.5);
  const O: [number, number, "audio" | "pin" | "dinheiro", string][] = [[c.r_barulho, 230, "audio", "BARULHO"], [c.r_escola, 530, "pin", "ESCOLA LONGE"], [c.r_condominio, 820, "dinheiro", "CONDOMÍNIO CARO"]];
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} t0={c.v_pergunte - 1.1} push={0.005} keys={[{ t: c.v_pergunte - 1.1, s: 1.05 }, { t: c.v_pergunte, s: 1.0, e: ease.out }, { t: c.r_condominio, s: 1.04, y: -10 }, { t: c.f_pergunta + 0.4, s: 1.07, y: -16, e: ease.out }]}>
        <Svg>
          <Chao />
          <Holofote x={540} chao={CHAO} w={mix(620, 760, agora)} p={0.85} cor={agora > 0.5 ? A.hex : "#FFFFFF"} />
          <g opacity={(1 - objs) * surge(t, c.v_pergunte - 0.9)}><Icone t={t} nome="casa" x={540} y={720} r={70} tom="branco" /></g>
          <g opacity={prog(t, c.v_ano - 0.3, 0.4) * (1 - objs)}><Relogio t={t} x={820} y={680} r={70} vel={1.5} p={1} /></g>
          {O.map(([at, x, nome]) => <g key={x} opacity={surge(t, at - 0.2) * (1 - dist)}><Icone t={t} nome={nome} x={x} y={720} r={56} tom={agora > 0.5 ? "verde" : "vermelho"} brilho={agora > 0.5} /></g>)}
          <g opacity={dist}><Icone t={t} nome="documento" x={780} y={760} r={64} tom="vermelho" /></g>
          <g opacity={dist}><Icone t={t} nome="chat" x={300} y={760} r={64} tom="verde" brilho /></g>
          <Figura t={t} x={360} y={CHAO} s={0.8} pose={t > c.v_pergunte - 0.2 && t < c.r_barulho ? "apontando" : "pe"} tom={agora > 0.5 ? "verde" : "luz"} />
          <Figura t={t} x={720} y={CHAO} s={0.8} pose={objs > 0.5 && agora < 0.5 ? "apontando" : "pe"} flip tom="luz" fase={0.6} />
        </Svg>
        <Bolha t={t} at={c.v_pergunte - 0.1} ate={c.r_barulho - 0.4} x={420} y={540} texto="IMAGINE: DAQUI A 1 ANO…" tom="branco" size={30} />
        <Bolha t={t} at={c.v_arrependeu - 0.1} ate={c.r_barulho - 0.4} x={500} y={900} texto="…VOCÊ SE ARREPENDEU. POR QUÊ?" tom="verde" size={30} />
        {O.map(([at, x, , k]) => <Pilula key={k} t={t} at={at - 0.05} ate={c.f_antes - 0.3} x={x} y={830} texto={k} tom={agora > 0.5 ? "verde" : "vermelho"} size={24} />)}
        <Pilula t={t} at={c.r_agora - 0.05} ate={c.f_antes - 0.3} x={540} y={930} texto="AGORA, E NÃO DEPOIS" tom="verde" size={28} />
        <Pilula t={t} at={c.f_pergunta - 0.05} x={300} y={870} texto="ANTES: PERGUNTA" tom="verde" size={26} />
        <Pilula t={t} at={c.f_distrato - 0.05} x={780} y={870} texto="DEPOIS: DISTRATO" tom="vermelho" size={26} />
      </CamNoir>
      <TituloNoir t={t} at={c.v_pergunte - 0.9} ate={c.r_barulho - 0.4} linhas={[{ texto: "NA VISITA,", size: 72 }, { texto: "PERGUNTE", cor: "verde", size: 100 }]} top={300} />
      <TituloNoir t={t} at={c.r_barulho - 0.25} ate={c.f_antes - 0.4} linhas={[{ texto: "O QUE ELE", size: 64 }, { texto: "SÓ DIRIA DEPOIS", cor: "verde", size: 84 }]} top={300} />
      <TituloNoir t={t} at={c.f_antes - 0.25} ate={c.cta_quer - 0.2} linhas={[{ texto: "ANTES É PERGUNTA", size: 64 }, { texto: "DEPOIS, DISTRATO", cor: "vermelho", size: 84 }]} top={300} />
    </div>
  );
};
