import React from "react";
import type { Timeline } from "../../types";
import {
  A, Bolha, CamNoir, Figura, Halo, Holofote, Icone, NOIR, Pilula, Relogio, TituloNoir, ease, luz, mix, prog, surge,
} from "../../../estilos/pictograma";

/**
 * ATIVO-D1204-15 — "Imagine que deu errado" (grade 04/12/2026 · 15h · IDEIA QUE MUDA O JOGO · Pictograma).
 * Sem corte seco: o contrato e a caneta diante do cliente → salto de um ano (relógio) e o arrependimento imaginado →
 * "parece pessimismo": o estudo de 1989, +30% de motivos → os motivos acendem em volta do cliente (barulho, parcela,
 * escola) → voltam para antes da caneta e se resolvem (check) → antes: solução; depois: arrependimento → fecho CtaNoir.
 * Apuração: Klein (2007, HBR), citando Mitchell, Russo & Pennington (1989).
 */
const CHAO = 1180;
type P = { t: number; tl: Timeline };
const Svg: React.FC<{ children: React.ReactNode }> = ({ children }) => <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>{children}</svg>;
const Chao: React.FC = () => <line x1={-400} y1={CHAO} x2={1480} y2={CHAO} stroke="rgba(244,244,242,0.3)" strokeWidth={2} strokeDasharray="3 9" />;

/* ---------------------------------------------------------------- 1–2 · a caneta e o salto de um ano ---------------------------------------------------------------- */
export const Caneta: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = 1 - prog(t, c.v_pessimismo - 0.5, 0.5);
  if (on <= 0.001) return null;
  const salto = prog(t, c.q_ano - 0.3, 0.8, ease.inOut);
  const arrep = prog(t, c.q_arrependeu - 0.1, 0.5);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} push={0.004} keys={[{ t: 0, s: 1.06, y: -16 }, { t: c.h_estranha, s: 1.0, e: ease.out }, { t: c.q_ano, s: 1.05, x: -30, e: ease.inOut }, { t: c.q_errado + 0.4, s: 1.08, y: -20, e: ease.out }]}>
        <Svg>
          <Chao />
          <Holofote x={540} chao={CHAO} w={600} p={prog(t, 0, 0.6)} cor={arrep > 0.5 ? "#FFD9D4" : "#FFFFFF"} />
          <g opacity={1 - salto}><Icone t={t} nome="documento" x={540} y={780} r={70} tom="branco" brilho /></g>
          <g opacity={salto}><Relogio t={t} x={540} y={760} r={130} vel={salto > 0.05 && salto < 0.95 ? 2.5 : 0.1} p={salto} /></g>
          <Figura t={t} x={380} y={CHAO} pose={t > c.h_estranha - 0.2 && salto < 0.5 ? "apontando" : "pe"} tom="luz" />
          <Figura t={t} x={700} y={CHAO} s={0.94} flip pose={arrep > 0.5 ? "cabisbaixo" : "pe"} tom={arrep > 0.5 ? "cinza" : "luz"} />
        </Svg>
        <Pilula t={t} at={c.q_ano - 0.05} ate={c.v_pessimismo - 0.6} x={540} y={590} texto="1 ANO DEPOIS" tom="branco" size={28} />
        <Bolha t={t} at={c.q_errado - 0.15} ate={c.v_pessimismo - 0.5} x={760} y={900} texto="O QUE DEU ERRADO?" lado="dir" tom="vermelho" size={32} />
      </CamNoir>
      <TituloNoir t={t} at={0.05} ate={c.q_ano - 0.5} linhas={[{ texto: "ANTES DE ASSINAR", size: 64 }, { texto: "UMA PERGUNTA ESTRANHA", cor: "verde", size: 72 }]} top={300} />
      <TituloNoir t={t} at={c.q_ano - 0.3} ate={c.v_pessimismo - 0.5} linhas={[{ texto: "IMAGINE QUE", size: 64 }, { texto: "SE ARREPENDEU", cor: "vermelho", size: 92 }]} top={300} />
    </div>
  );
};

/* ---------------------------------------------------------------- 3 · parece pessimismo: o estudo ---------------------------------------------------------------- */
export const Estudo: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = luz(t, c.v_pessimismo - 0.6, c.m_barulho - 1.0, 0.5, 0.5);
  if (on <= 0.001) return null;
  const mais = prog(t, c.v_30 - 0.2, 0.6, ease.out);
  const POS = [[300, 760], [440, 700], [640, 700], [780, 760], [360, 880], [720, 880]];
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} t0={c.v_pessimismo} push={0.005} keys={[{ t: c.v_pessimismo - 0.6, s: 1.04 }, { t: c.v_1989, s: 1.0, e: ease.out }, { t: c.v_30 + 0.4, s: 1.07, y: -16, e: ease.out }]}>
        <Svg>
          <Chao />
          <Holofote x={540} chao={CHAO} w={mix(520, 680, mais)} p={0.85} cor={mais > 0.4 ? A.hex : "#FFFFFF"} />
          <Halo x={540} y={CHAO - 260} r={mix(260, 400, mais)} p={0.5 * mais} cor={A.hex} />
          {POS.map(([x, y], i) => (
            <g key={i} opacity={surge(t, (i < 4 ? c.v_aconteceu : c.v_30) - 0.3 + (i % 4) * 0.15)}><Icone t={t} nome="alerta" x={x} y={y} r={34} tom={i < 4 ? "branco" : "verde"} /></g>
          ))}
          <Figura t={t} x={540} y={CHAO} pose={t > c.v_aconteceu ? "apontando" : "pe"} tom={mais > 0.5 ? "verde" : "luz"} />
        </Svg>
        <Pilula t={t} at={c.v_1989 - 0.05} x={540} y={650} texto="ESTUDO · 1989" tom="cinza" size={26} />
        <Pilula t={t} at={c.v_30 - 0.05} x={540} y={560} texto="+30% MOTIVOS" tom="verde" size={34} cheia />
      </CamNoir>
      <TituloNoir t={t} at={c.v_pessimismo - 0.5} ate={c.v_aconteceu - 0.35} linhas={[{ texto: "PARECE", size: 64 }, { texto: "PESSIMISMO", cor: "vermelho", size: 96 }]} top={300} />
      <TituloNoir t={t} at={c.v_aconteceu - 0.15} ate={c.m_barulho - 1.0} linhas={[{ texto: "IMAGINAR QUE", size: 64 }, { texto: "JÁ ACONTECEU", cor: "verde", size: 92 }]} top={300} />
    </div>
  );
};

/* ---------------------------------------------------------------- 4–5 · os motivos, antes da caneta ---------------------------------------------------------------- */
const MOT = [{ at: "m_barulho", txt: "BARULHO", ic: "audio", x: 260 }, { at: "m_parcela", txt: "PARCELA", ic: "dinheiro", x: 540 }, { at: "m_escola", txt: "ESCOLA", ic: "pin", x: 820 }] as const;
export const Motivos: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = luz(t, c.m_barulho - 1.1, c.f_solucao - 1.2, 0.5, 0.5);
  if (on <= 0.001) return null;
  const resolve = (i: number) => prog(t, c.r_resolve + i * 0.35, 0.4);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} t0={c.m_barulho - 1.1} push={0.005} keys={[{ t: c.m_barulho - 1.1, s: 1.04 }, { t: c.m_barulho, s: 1.0, e: ease.out }, { t: c.r_resolve, s: 1.03, y: -10 }, { t: c.r_chave + 0.4, s: 1.07, y: -20, e: ease.out }]}>
        <Svg>
          <Chao />
          <Holofote x={540} chao={CHAO} w={640} p={0.85} cor={resolve(2) > 0.5 ? A.hex : "#FFFFFF"} />
          {MOT.map((m, i) => (
            <g key={m.txt} opacity={surge(t, c[m.at] - 0.15)}>
              <Icone t={t} nome={m.ic} x={m.x} y={760} r={46} tom={resolve(i) > 0.5 ? "verde" : "branco"} brilho={resolve(i) > 0.5} />
              <g opacity={resolve(i)}><Icone t={t} nome="check" x={m.x + 44} y={712} r={22} tom="verde" /></g>
            </g>
          ))}
          <g opacity={surge(t, c.r_caneta - 0.2) * (1 - prog(t, c.f_solucao - 1.3, 0.4))}><Icone t={t} nome="documento" x={400} y={1000} r={44} tom="verde" brilho /></g>
          <g opacity={surge(t, c.r_chave - 0.2) * (1 - prog(t, c.f_solucao - 1.3, 0.4))}><Icone t={t} nome="chave" x={680} y={1000} r={40} tom="cinza" /><Icone t={t} nome="x" x={720} y={960} r={20} tom="vermelho" /></g>
          <Figura t={t} x={540} y={CHAO} s={0.9} pose={t > c.r_resolve ? "bracosAbertos" : "pe"} tom={resolve(2) > 0.5 ? "verde" : "luz"} />
        </Svg>
        {MOT.map((m) => <Pilula key={m.txt} t={t} at={c[m.at] - 0.05} ate={c.f_solucao - 1.3} x={m.x} y={860} texto={m.txt} tom="branco" size={26} />)}
      </CamNoir>
      <TituloNoir t={t} at={c.m_barulho - 1.0} ate={c.r_resolve - 0.35} linhas={[{ texto: "O CLIENTE", size: 64 }, { texto: "FALA", size: 96 }]} top={300} />
      <TituloNoir t={t} at={c.r_resolve - 0.15} ate={c.f_solucao - 1.3} linhas={[{ texto: "RESOLVA", size: 64 }, { texto: "ANTES DA CANETA", cor: "verde", size: 84 }]} top={300} />
    </div>
  );
};

/* ---------------------------------------------------------------- 6 · antes: solução; depois: arrependimento ---------------------------------------------------------------- */
export const Antes: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = luz(t, c.f_solucao - 1.3, c.cta_quer - 0.2, 0.6, 0.45);
  if (on <= 0.001) return null;
  const sol = prog(t, c.f_solucao - 0.2, 0.5);
  const dep = prog(t, c.f_arrependimento - 0.2, 0.5);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} t0={c.f_solucao - 1.3} push={0.005} keys={[{ t: c.f_solucao - 1.3, s: 1.04 }, { t: c.f_solucao, s: 1.0, e: ease.out }, { t: c.f_arrependimento + 0.4, s: 1.06, y: -16, e: ease.out }]}>
        <Svg>
          <Chao />
          <line x1={540} y1={720} x2={540} y2={CHAO} stroke={NOIR.linhaFraca} strokeWidth={2} strokeDasharray="6 10" />
          <Holofote x={300} chao={CHAO} w={440} p={0.4 + 0.5 * sol} cor={sol > 0.5 ? A.hex : "#FFFFFF"} />
          <Holofote x={780} chao={CHAO} w={440} p={0.3 + 0.5 * dep} cor={dep > 0.5 ? "#FFD9D4" : "#FFFFFF"} />
          <Halo x={300} y={CHAO - 220} r={260} p={0.5 * sol} cor={A.hex} />
          <Figura t={t} x={300} y={CHAO} pose={sol > 0.5 ? "comemorando" : "pe"} tom={sol > 0.5 ? "verde" : "luz"} />
          <Figura t={t} x={780} y={CHAO} pose={dep > 0.5 ? "cabisbaixo" : "pe"} tom="cinza" />
        </Svg>
        <Pilula t={t} at={c.f_solucao - 1.2} x={300} y={760} texto="ANTES DA ASSINATURA" tom="branco" size={24} />
        <Pilula t={t} at={c.f_solucao - 0.9} x={780} y={760} texto="DEPOIS" tom="cinza" size={24} />
        <Pilula t={t} at={c.f_solucao - 0.05} x={300} y={840} texto="SOLUÇÃO" tom="verde" size={30} cheia />
        <Pilula t={t} at={c.f_arrependimento - 0.05} x={780} y={840} texto="ARREPENDIMENTO" tom="vermelho" size={30} />
      </CamNoir>
      <TituloNoir t={t} at={c.f_solucao - 1.2} ate={c.cta_quer - 0.3} linhas={[{ texto: "DÚVIDA ANTES", size: 64 }, { texto: "TEM SOLUÇÃO", cor: "verde", size: 92 }]} top={300} />
    </div>
  );
};
