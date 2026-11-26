import React from "react";
import type { Timeline } from "../../types";
import {
  A, CamNoir, Figura, Halo, Holofote, Icone, Pilula, Relogio, TituloNoir, ease, luz, mix, prog, surge,
} from "../../../estilos/pictograma";

/**
 * ATIVO-D1207-15 — "Por que agora?" (grade 07/12/2026 · 15h · IDEIA QUE MUDA O JOGO · Pictograma).
 * Sem corte seco: a figura olhando anúncios há meses; de repente, esta semana → alguma coisa mudou (filho, emprego, fim do
 * aluguel) → o motivo do agora mostra prazo, o que pesa e quem decide → a pergunta com naturalidade → no tempo certo →
 * fecho CtaNoir. Tese por raciocínio; sem estatística.
 */
const CHAO = 1180;
type P = { t: number; tl: Timeline };
const Svg: React.FC<{ children: React.ReactNode }> = ({ children }) => <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>{children}</svg>;
const Chao: React.FC = () => <line x1={-400} y1={CHAO} x2={1480} y2={CHAO} stroke="rgba(244,244,242,0.3)" strokeWidth={2} strokeDasharray="3 9" />;

/* ---------------------------------------------------------------- 1 · meses e, de repente, esta semana ---------------------------------------------------------------- */
export const Busca: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = 1 - prog(t, c.v_prazo - 1.0, 0.5);
  if (on <= 0.001) return null;
  const pressa = prog(t, c.m_repente - 0.2, 0.6);
  const mudou = prog(t, c.u_mudou - 0.3, 0.6);
  const EV: [string, number, number, "familia" | "predio" | "documento", string][] = [["filho", c.u_filho, 300, "familia", "FILHO A CAMINHO"], ["emprego", c.u_emprego, 540, "predio", "EMPREGO NOVO"], ["aluguel", c.u_aluguel, 780, "documento", "FIM DO ALUGUEL"]];
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} push={0.004} keys={[{ t: 0, s: 1.06, y: -16 }, { t: c.h_agora, s: 1.0, e: ease.out }, { t: c.m_semana, s: 1.04, x: 20 }, { t: c.u_aluguel + 0.4, s: 1.07, x: -20, y: -12, e: ease.out }]}>
        <Svg>
          <Chao />
          <Holofote x={540} chao={CHAO} w={mix(560, 720, pressa)} p={prog(t, 0, 0.6)} />
          <g opacity={surge(t, c.m_meses - 0.3) * (1 - mudou)}><Icone t={t} nome="calendario" x={540} y={720} r={70} tom={pressa > 0.5 ? "verde" : "branco"} brilho={pressa > 0.5} /></g>
          {EV.map(([k, at, x, ic]) => <g key={k} opacity={surge(t, at - 0.2)}><Icone t={t} nome={ic} x={x} y={760} r={48} tom="verde" brilho /></g>)}
          <Figura t={t} x={540} y={CHAO} s={0.8} pose={pressa > 0.5 && mudou < 0.5 ? "andando" : "celular"} tom="luz" />
        </Svg>
        <Pilula t={t} at={c.m_meses - 0.05} ate={c.m_semana - 0.3} x={540} y={850} texto="HÁ MESES OLHANDO ANÚNCIOS" tom="cinza" size={26} />
        <Pilula t={t} at={c.m_semana - 0.2} ate={c.u_mudou - 0.3} x={540} y={850} texto="DE REPENTE: ESTA SEMANA" tom="verde" size={28} />
        {EV.map(([k, at, x, , txt], i) => <Pilula key={k} t={t} at={at - 0.05} x={x} y={i === 1 ? 920 : 850} texto={txt} tom="branco" size={24} />)}
      </CamNoir>
      <TituloNoir t={t} at={0.05} ate={c.m_meses - 0.4} linhas={[{ texto: "DUAS PALAVRAS:", size: 64 }, { texto: "POR QUE AGORA?", cor: "verde", size: 92 }]} top={300} />
      <TituloNoir t={t} at={c.m_meses - 0.25} ate={c.u_mudou - 0.4} linhas={[{ texto: "MESES PROCURANDO", size: 72 }, { texto: "E, DE REPENTE…", size: 72 }]} top={300} />
      <TituloNoir t={t} at={c.u_mudou - 0.25} ate={c.v_prazo - 1.0} linhas={[{ texto: "ALGUMA COISA", size: 72 }, { texto: "MUDOU", cor: "verde", size: 104 }]} top={300} />
    </div>
  );
};

/* ---------------------------------------------------------------- 2–3 · o que o agora mostra e a pergunta ---------------------------------------------------------------- */
export const Motivo: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = luz(t, c.v_prazo - 1.1, c.f_tempo - 0.9, 0.6, 0.5);
  if (on <= 0.001) return null;
  const pergunta = prog(t, c.a_naturalidade - 0.4, 0.6);
  const IT: [number, number, "relogio" | "alerta" | "familia", string][] = [[c.v_prazo, 300, "relogio", "O PRAZO"], [c.v_pesa, 540, "alerta", "O QUE PESA"], [c.v_decide, 780, "familia", "QUEM DECIDE"]];
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} t0={c.v_prazo - 1.1} push={0.005} keys={[{ t: c.v_prazo - 1.1, s: 1.05 }, { t: c.v_decide, s: 1.0, e: ease.out }, { t: c.a_agora + 0.4, s: 1.05, y: -14, e: ease.out }]}>
        <Svg>
          <Chao />
          <Holofote x={540} chao={CHAO} w={mix(540, 680, pergunta)} p={0.85} cor={pergunta > 0.5 ? A.hex : "#FFFFFF"} />
          {IT.map(([at, x, ic]) => <g key={x} opacity={surge(t, at - 0.2) * (1 - pergunta * 0.7)}><Icone t={t} nome={ic} x={x} y={740} r={52} tom="verde" brilho /></g>)}
          <g opacity={pergunta}><Icone t={t} nome="chat" x={760} y={760} r={56} tom="verde" brilho /></g>
          <Figura t={t} x={pergunta > 0.3 ? 420 : 540} y={CHAO} s={0.8} pose={pergunta > 0.3 ? "apontando" : "pe"} tom={pergunta > 0.5 ? "verde" : "luz"} />
        </Svg>
        {IT.map(([at, x, , txt]) => <Pilula key={x} t={t} at={at - 0.05} ate={c.a_naturalidade - 0.4} x={x} y={840} texto={txt} tom="verde" size={26} />)}
        <Pilula t={t} at={c.a_naturalidade - 0.05} x={540} y={880} texto="COM NATURALIDADE" tom="branco" size={28} />
      </CamNoir>
      <TituloNoir t={t} at={c.v_prazo - 1.0} ate={c.a_naturalidade - 0.5} linhas={[{ texto: "O MOTIVO DO AGORA", size: 64 }, { texto: "MOSTRA", cor: "verde", size: 96 }]} top={300} />
      <TituloNoir t={t} at={c.a_naturalidade - 0.35} ate={c.f_tempo - 0.9} linhas={[{ texto: "O QUE FEZ VOCÊ", size: 60 }, { texto: "PROCURAR AGORA?", cor: "verde", size: 84 }]} top={300} />
    </div>
  );
};

/* ---------------------------------------------------------------- 4 · no tempo certo ---------------------------------------------------------------- */
export const Tempo: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = luz(t, c.f_tempo - 1.0, c.cta_quer - 0.2, 0.6, 0.45);
  if (on <= 0.001) return null;
  const leve = prog(t, c.f_tempo - 0.3, 0.8, ease.out);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} t0={c.f_tempo - 1.0} push={0.005} keys={[{ t: c.f_tempo - 1.0, s: 1.04 }, { t: c.f_tempo, s: 1.0, e: ease.out }, { t: c.f_tempo + 0.8, s: 1.07, y: -18, e: ease.out }]}>
        <Svg>
          <Chao />
          <Holofote x={540} chao={CHAO} w={mix(560, 720, leve)} p={0.85} cor={A.hex} />
          <Halo x={540} y={CHAO - 220} r={mix(280, 420, leve)} p={0.5 * leve} cor={A.hex} />
          <Relogio t={t} x={540} y={720} r={100} vel={0.3} p={1} />
          <Figura t={t} x={540} y={CHAO} pose={leve > 0.5 ? "bracosAbertos" : "pe"} tom="verde" />
        </Svg>
      </CamNoir>
      <TituloNoir t={t} at={c.f_tempo - 0.9} ate={c.cta_quer - 0.3} linhas={[{ texto: "QUEM ENTENDE O AGORA", size: 60 }, { texto: "ATENDE NO TEMPO CERTO", cor: "verde", size: 66 }]} top={300} />
    </div>
  );
};
