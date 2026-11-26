import React from "react";
import type { Timeline } from "../../types";
import {
  A, Caminho, CamNoir, Figura, Halo, Holofote, Icone, Pilula, TituloNoir, ease, luz, mix, prog, surge,
} from "../../../estilos/pictograma";

/**
 * ATIVO-D1207-21 — "O novo começo" (grade 07/12/2026 · 21h · FORA DA BOLHA · Pictograma).
 * Sem corte seco: a promessa da segunda-feira → 2014: buscas por dieta sobem no começo da semana, do mês e do ano; academia
 * depois de datas marcantes → as datas como recomeço (o caminho acende) → o lead que esfriou volta a acender num marco (mês,
 * virada do ano, fim do aluguel) → um novo começo → fecho CtaNoir. Apuração: Dai, Milkman & Riis (2014), Management Science.
 */
const CHAO = 1180;
type P = { t: number; tl: Timeline };
const Svg: React.FC<{ children: React.ReactNode }> = ({ children }) => <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>{children}</svg>;
const Chao: React.FC = () => <line x1={-400} y1={CHAO} x2={1480} y2={CHAO} stroke="rgba(244,244,242,0.3)" strokeWidth={2} strokeDasharray="3 9" />;

/* ---------------------------------------------------------------- 1 · a segunda-feira e o estudo ---------------------------------------------------------------- */
export const Marcos: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = 1 - prog(t, c.v_recomeco - 1.0, 0.5);
  if (on <= 0.001) return null;
  const estudo = prog(t, c.d_2014 - 0.3, 0.6);
  const acad = prog(t, c.c_academia - 0.3, 0.6);
  const M: [number, number, string][] = [[c.d_semana, 300, "COMEÇO DA SEMANA"], [c.d_mes, 540, "DO MÊS"], [c.d_ano, 780, "DO ANO"]];
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} push={0.004} keys={[{ t: 0, s: 1.06, y: -16 }, { t: c.h_segunda, s: 1.0, e: ease.out }, { t: c.d_ano, s: 1.04, x: 20 }, { t: c.c_aniversarios + 0.4, s: 1.07, x: -20, y: -12, e: ease.out }]}>
        <Svg>
          <Chao />
          <Holofote x={540} chao={CHAO} w={680} p={prog(t, 0, 0.6)} />
          <g opacity={surge(t, 0.2) * (1 - estudo)}><Icone t={t} nome="calendario" x={540} y={720} r={80} tom={t > c.h_segunda - 0.2 ? "verde" : "branco"} brilho={t > c.h_segunda - 0.2} /></g>
          {M.map(([at, x]) => <g key={x} opacity={surge(t, at - 0.2) * (1 - acad)}><Icone t={t} nome="grafico" x={x} y={740} r={46} tom="verde" brilho /></g>)}
          <g opacity={acad}><Icone t={t} nome="pessoa" x={360} y={740} r={50} tom="branco" /></g>
          <g opacity={surge(t, c.c_aniversarios - 0.2)}><Icone t={t} nome="calendario" x={720} y={740} r={50} tom="verde" brilho /></g>
          <Figura t={t} x={540} y={CHAO} s={0.8} pose={acad > 0.5 ? "andando" : estudo > 0.5 ? "pe" : "cabisbaixo"} tom="luz" />
        </Svg>
        <Pilula t={t} at={c.h_segunda - 0.1} ate={c.d_2014 - 0.3} x={540} y={850} texto="NA SEGUNDA-FEIRA" tom="verde" size={30} />
        <Pilula t={t} at={c.d_dieta - 0.05} ate={c.c_academia - 0.3} x={540} y={640} texto="BUSCAS POR DIETA SOBEM" tom="branco" size={26} />
        {M.map(([at, x, k], i) => <Pilula key={k} t={t} at={at - 0.05} ate={c.c_academia - 0.3} x={x} y={i === 1 ? 890 : 830} texto={k} tom="verde" size={24} />)}
        <Pilula t={t} at={c.c_academia - 0.05} x={360} y={830} texto="ACADEMIA" tom="branco" size={26} />
        <Pilula t={t} at={c.c_aniversarios - 0.05} x={720} y={830} texto="ANIVERSÁRIOS" tom="verde" size={26} />
      </CamNoir>
      <TituloNoir t={t} at={0.05} ate={c.d_2014 - 0.4} linhas={[{ texto: "POR QUE", size: 72 }, { texto: "SEGUNDA-FEIRA?", cor: "verde", size: 88 }]} top={300} />
      <TituloNoir t={t} at={c.d_2014 - 0.25} ate={c.c_academia - 0.4} linhas={[{ texto: "2014 · PESQUISA", size: 64 }, { texto: "OS COMEÇOS", cor: "verde", size: 96 }]} top={300} />
      <TituloNoir t={t} at={c.c_academia - 0.25} ate={c.v_recomeco - 1.0} linhas={[{ texto: "DEPOIS DE", size: 64 }, { texto: "DATAS MARCANTES", cor: "verde", size: 84 }]} top={300} />
    </div>
  );
};

/* ---------------------------------------------------------------- 2–3 · o recomeço e o lead que esfriou ---------------------------------------------------------------- */
export const Recomeco: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = luz(t, c.v_recomeco - 1.1, c.f_novo - 2.6, 0.6, 0.4);
  if (on <= 0.001) return null;
  const cam = prog(t, c.v_recomeco - 0.2, 1.4, ease.inOut);
  const lead = prog(t, c.a_esfriou - 0.3, 0.5);
  const volta = prog(t, c.a_retome - 0.2, 0.6);
  const M: [number, number, string][] = [[c.a_mes, 300, "COMEÇO DO MÊS"], [c.a_ano, 540, "VIRADA DO ANO"], [c.a_aluguel, 780, "FIM DO ALUGUEL"]];
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} t0={c.v_recomeco - 1.1} push={0.005} keys={[{ t: c.v_recomeco - 1.1, s: 1.05 }, { t: c.v_chance, s: 1.0, e: ease.out }, { t: c.a_aluguel + 0.4, s: 1.05, y: -14, e: ease.out }]}>
        <Svg>
          <Chao />
          <Holofote x={540} chao={CHAO} w={mix(540, 680, volta)} p={0.85} cor={volta > 0.5 ? A.hex : "#FFFFFF"} />
          <g opacity={1 - lead}><Caminho pontos={[[220, 1100], [420, 980], [660, 1020], [880, 900]]} p={cam} /></g>
          <g opacity={lead}><Icone t={t} nome="pessoa" x={780} y={760} r={60} tom={volta > 0.5 ? "verde" : "cinza"} brilho={volta > 0.5} /></g>
          <g opacity={volta}><Icone t={t} nome="chat" x={600} y={700} r={40} tom="verde" brilho /></g>
          <Figura t={t} x={lead > 0.3 ? 400 : mix(300, 540, cam)} y={CHAO} s={0.8} pose={lead > 0.3 ? (volta > 0.3 ? "celular" : "pe") : cam > 0.05 && cam < 0.98 ? "andando" : "pe"} tom={volta > 0.5 || (cam > 0.6 && lead < 0.3) ? "verde" : "luz"} />
        </Svg>
        <Pilula t={t} at={c.v_adiado - 0.05} ate={c.a_esfriou - 0.4} x={540} y={760} texto="O PLANO ADIADO" tom="cinza" size={28} />
        <Pilula t={t} at={c.v_chance - 0.05} ate={c.a_esfriou - 0.4} x={540} y={830} texto="GANHA UMA NOVA CHANCE" tom="verde" size={28} />
        <Pilula t={t} at={c.a_esfriou - 0.05} ate={c.a_retome - 0.2} x={780} y={860} texto="O LEAD QUE ESFRIOU" tom="cinza" size={26} />
        <Pilula t={t} at={c.a_retome - 0.05} x={780} y={860} texto="RETOME NUM MARCO" tom="verde" size={26} />
        {M.map(([at, x, k], i) => <Pilula key={k} t={t} at={at - 0.05} x={x} y={i === 1 ? 600 : 560} texto={k} tom="branco" size={24} />)}
      </CamNoir>
      <TituloNoir t={t} at={c.v_recomeco - 1.0} ate={c.a_esfriou - 0.5} linhas={[{ texto: "AS DATAS VIRAM", size: 64 }, { texto: "UM RECOMEÇO", cor: "verde", size: 96 }]} top={300} />
      <TituloNoir t={t} at={c.a_esfriou - 0.35} ate={c.f_novo - 2.6} linhas={[{ texto: "AQUELE LEAD", size: 64 }, { texto: "QUE ESFRIOU?", cor: "verde", size: 92 }]} top={300} />
    </div>
  );
};

/* ---------------------------------------------------------------- 4 · um novo começo ---------------------------------------------------------------- */
export const Novo: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = luz(t, c.f_novo - 2.4, c.cta_quer - 0.2, 0.6, 0.45);
  if (on <= 0.001) return null;
  const leve = prog(t, c.f_novo - 0.3, 0.8, ease.out);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} t0={c.f_novo - 2.4} push={0.005} keys={[{ t: c.f_novo - 2.4, s: 1.04 }, { t: c.f_novo, s: 1.0, e: ease.out }, { t: c.f_novo + 0.8, s: 1.07, y: -18, e: ease.out }]}>
        <Svg>
          <Chao />
          <Holofote x={540} chao={CHAO} w={mix(560, 720, leve)} p={0.85} cor={A.hex} />
          <Halo x={540} y={CHAO - 220} r={mix(280, 420, leve)} p={0.5 * leve} cor={A.hex} />
          <g opacity={surge(t, c.f_novo - 2.2)}><Icone t={t} nome="casa" x={540} y={720} r={70} tom={leve > 0.5 ? "verde" : "branco"} brilho={leve > 0.5} /></g>
          <Figura t={t} x={540} y={CHAO} pose={leve > 0.5 ? "bracosAbertos" : "pe"} tom={leve > 0.5 ? "verde" : "luz"} />
        </Svg>
      </CamNoir>
      <TituloNoir t={t} at={c.f_novo - 2.3} ate={c.f_novo - 0.4} linhas={[{ texto: "NÃO É OUTRO IMÓVEL", size: 64 }]} top={300} />
      <TituloNoir t={t} at={c.f_novo - 0.25} ate={c.cta_quer - 0.2} linhas={[{ texto: "É UM", size: 72 }, { texto: "NOVO COMEÇO", cor: "verde", size: 100 }]} top={300} />
    </div>
  );
};
