import React from "react";
import type { Timeline } from "../../types";
import {
  A, CamNoir, Caminho, Figura, Halo, Holofote, Icone, NOIR, Pilula, Relogio, TituloNoir, aa, ease, luz, mix, prog, surge,
} from "../../../estilos/pictograma";

/**
 * ATIVO-D1204-21 — "O fim da visita" (grade 04/12/2026 · 21h · FORA DA BOLHA · Pictograma).
 * Sem corte seco: o relógio e a pergunta (mais tempo, lembrança melhor?) → duas rodadas de água gelada: 1 minuto a 14 °C ×
 * 1 minuto e meio com o fim a 15 °C (termômetros) → a curva da lembrança: o final pesa mais que a duração → a visita em
 * cômodos: a figura atravessa e o último acende; não termine na área de serviço → fecho CtaNoir.
 * Apuração: Kahneman, Fredrickson, Schreiber & Redelmeier (1993), Psychological Science.
 */
const CHAO = 1180;
type P = { t: number; tl: Timeline };
const Svg: React.FC<{ children: React.ReactNode }> = ({ children }) => <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>{children}</svg>;
const Chao: React.FC = () => <line x1={-400} y1={CHAO} x2={1480} y2={CHAO} stroke="rgba(244,244,242,0.3)" strokeWidth={2} strokeDasharray="3 9" />;
const GLOW_V = `drop-shadow(0 0 12px ${aa(0.6)})`;

/** Termômetro em linha: nível 0..1; `quente` (0..1) tinge de verde o topo. */
const Termometro: React.FC<{ x: number; y: number; h?: number; nivel: number; p: number; quente?: number }> = ({ x, y, h = 300, nivel, p, quente = 0 }) => (
  <g opacity={p}>
    <rect x={x - 22} y={y - h} width={44} height={h} rx={22} fill="none" stroke={NOIR.branco} strokeWidth={3} />
    <circle cx={x} cy={y + 20} r={36} fill="none" stroke={NOIR.branco} strokeWidth={3} />
    <circle cx={x} cy={y + 20} r={24} fill={quente > 0.5 ? A.hex : NOIR.branco} opacity={0.8} />
    <rect x={x - 10} y={y - h * nivel} width={20} height={h * nivel + 10} rx={10} fill={quente > 0.5 ? A.hex : NOIR.branco} opacity={0.8} style={{ filter: quente > 0.5 ? GLOW_V : undefined }} />
  </g>
);

/* ---------------------------------------------------------------- 1–2 · a pergunta e a água gelada ---------------------------------------------------------------- */
export const Agua: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = 1 - prog(t, c.v_ruim - 0.5, 0.5);
  if (on <= 0.001) return null;
  const testes = prog(t, c.a_1993 - 0.3, 0.6);
  const esquenta = prog(t, c.a_esquentava - 0.2, 1.0, ease.out);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} push={0.004} keys={[{ t: 0, s: 1.06, y: -16 }, { t: c.h_melhor, s: 1.0, e: ease.out }, { t: c.a_minuto, s: 1.04, x: 40, e: ease.inOut }, { t: c.a_esquentava + 0.4, s: 1.06, x: -40, e: ease.inOut }]}>
        <Svg>
          <Chao />
          <Holofote x={540} chao={CHAO} w={620} p={prog(t, 0, 0.6) * (1 - testes * 0.5)} />
          <Holofote x={300} chao={CHAO} w={420} p={testes * 0.8} cor="#C9E4FF" />
          <Holofote x={780} chao={CHAO} w={420} p={testes * 0.8} cor={esquenta > 0.5 ? A.hex : "#C9E4FF"} />
          <g opacity={1 - testes}><Relogio t={t} x={540} y={760} r={130} vel={0.4} p={prog(t, 0.1, 0.5)} /></g>
          <Termometro x={300} y={960} nivel={0.25} p={surge(t, c.a_gelada - 0.2)} />
          <Termometro x={780} y={960} nivel={mix(0.25, 0.38, esquenta)} p={surge(t, c.a_meio - 0.3)} quente={esquenta} />
          <Figura t={t} x={540} y={CHAO} s={0.9} pose={testes > 0.5 ? "cabisbaixo" : "pe"} tom="luz" />
        </Svg>
        <Pilula t={t} at={c.a_minuto - 0.05} ate={c.v_ruim - 0.5} x={300} y={600} texto="1 MIN · 14 °C" tom="branco" size={28} />
        <Pilula t={t} at={c.a_meio - 0.05} ate={c.v_ruim - 0.5} x={780} y={600} texto="1 MIN E MEIO" tom="branco" size={28} />
        <Pilula t={t} at={c.a_esquentava - 0.05} ate={c.v_ruim - 0.5} x={780} y={1060} texto="FIM A 15 °C" tom="verde" size={26} cheia />
      </CamNoir>
      <TituloNoir t={t} at={0.05} ate={c.a_1993 - 0.4} linhas={[{ texto: "MAIS TEMPO DE DOR,", size: 64 }, { texto: "LEMBRANÇA MELHOR?", cor: "verde", size: 76 }]} top={300} />
      <TituloNoir t={t} at={c.a_1993 - 0.2} ate={c.v_ruim - 0.5} linhas={[{ texto: "1993", size: 64 }, { texto: "ÁGUA GELADA", size: 92 }]} top={300} />
    </div>
  );
};

/* ---------------------------------------------------------------- 3 · o final pesa mais ---------------------------------------------------------------- */
export const Lembranca: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = luz(t, c.v_ruim - 0.6, c.i_ultimo - 0.8, 0.5, 0.5);
  if (on <= 0.001) return null;
  const fim = prog(t, c.v_final - 0.2, 0.8, ease.out);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} t0={c.v_ruim} push={0.005} keys={[{ t: c.v_ruim - 0.6, s: 1.04 }, { t: c.v_ruim, s: 1.0, e: ease.out }, { t: c.v_duracao + 0.4, s: 1.07, y: -16, e: ease.out }]}>
        <Svg>
          <Chao />
          <Holofote x={540} chao={CHAO} w={mix(520, 700, fim)} p={0.85} cor={fim > 0.4 ? A.hex : "#FFFFFF"} />
          <Halo x={820} y={780} r={mix(120, 220, fim)} p={0.6 * fim} cor={A.hex} />
          <Caminho pontos={[[200, 960], [360, 980], [520, 990], [660, 960], [820, 800]]} p={prog(t, c.v_ruim - 0.3, 1.6, ease.inOut)} cor={NOIR.branco} />
          <Caminho pontos={[[660, 960], [820, 800]]} p={fim} cor={A.hex} />
          <g opacity={surge(t, c.v_duracao - 0.2)}><line x1={200} y1={1060} x2={820} y2={1060} stroke={NOIR.cinza} strokeWidth={3} strokeDasharray="10 8" /></g>
        </Svg>
        <Pilula t={t} at={c.v_ruim - 0.05} x={420} y={640} texto="A MAIS LONGA: MENOS RUIM" tom="branco" size={28} />
        <Pilula t={t} at={c.v_final - 0.05} x={820} y={720} texto="O FINAL" tom="verde" size={30} cheia />
        <Pilula t={t} at={c.v_duracao - 0.05} x={510} y={1110} texto="A DURAÇÃO" tom="cinza" size={26} />
      </CamNoir>
      <TituloNoir t={t} at={c.v_ruim - 0.5} ate={c.i_ultimo - 0.8} linhas={[{ texto: "O FINAL", cor: "verde", size: 96 }, { texto: "PESOU MAIS", size: 72 }]} top={300} />
    </div>
  );
};

/* ---------------------------------------------------------------- 4 · a visita: termine no melhor ---------------------------------------------------------------- */
const COM = [{ x: 210, txt: "QUARTOS" }, { x: 430, txt: "COZINHA" }, { x: 650, txt: "SERVIÇO" }, { x: 870, txt: "VARANDA" }];
export const Visita: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = luz(t, c.i_ultimo - 0.9, c.cta_quer - 0.2, 0.6, 0.45);
  if (on <= 0.001) return null;
  const anda = prog(t, c.i_ultimo - 0.6, 2.2, ease.inOut);
  const melhor = prog(t, c.f_melhor - 0.2, 0.5);
  const servico = prog(t, c.f_servico - 0.2, 0.4);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} t0={c.i_ultimo - 0.9} push={0.005} keys={[{ t: c.i_ultimo - 0.9, s: 1.04, x: 60 }, { t: c.i_ultimo + 1.2, s: 1.02, x: -60, e: ease.inOut }, { t: c.f_servico + 0.4, s: 1.06, y: -14, e: ease.out }]}>
        <Svg>
          <Chao />
          <Holofote x={mix(210, 870, anda)} chao={CHAO} w={380} p={0.8} cor={melhor > 0.5 ? A.hex : "#FFFFFF"} />
          {COM.map((k, i) => {
            const ultimo = i === 3;
            const cor = ultimo && melhor > 0.5 ? A.hex : i === 2 && servico > 0.5 ? NOIR.vermelho : NOIR.branco;
            return (
              <g key={k.txt} opacity={surge(t, c.i_ultimo - 0.8 + i * 0.12)}>
                <rect x={k.x - 95} y={CHAO - 250} width={190} height={250} fill={ultimo && melhor > 0.5 ? aa(0.12) : "none"} stroke={cor} strokeWidth={3} style={{ filter: ultimo && melhor > 0.5 ? GLOW_V : undefined }} />
              </g>
            );
          })}
          <g opacity={servico}><Icone t={t} nome="x" x={650} y={CHAO - 300} r={26} tom="vermelho" /></g>
          <Figura t={t} x={mix(210, 870, anda)} y={CHAO} s={0.75} pose={anda > 0.02 && anda < 0.98 ? "andando" : melhor > 0.5 ? "bracosAbertos" : "pe"} fase={t * 1.6} tom={melhor > 0.5 ? "verde" : "luz"} />
        </Svg>
        {COM.map((k, i) => <Pilula key={k.txt} t={t} at={c.i_ultimo - 0.7 + i * 0.12} x={k.x} y={CHAO - 290 - (i % 2) * 60} texto={k.txt} tom={i === 3 && melhor > 0.5 ? "verde" : i === 2 && servico > 0.5 ? "vermelho" : "branco"} size={24} />)}
        <Pilula t={t} at={c.i_ultimo - 0.05} x={540} y={640} texto="O ÚLTIMO CÔMODO FICA" tom="branco" size={30} />
      </CamNoir>
      <TituloNoir t={t} at={c.i_ultimo - 0.8} ate={c.f_melhor - 0.4} linhas={[{ texto: "NA VISITA,", size: 64 }, { texto: "O FIM FICA", size: 92 }]} top={300} />
      <TituloNoir t={t} at={c.f_melhor - 0.2} ate={c.cta_quer - 0.3} linhas={[{ texto: "TERMINE NO", size: 64 }, { texto: "MELHOR PONTO", cor: "verde", size: 92 }]} top={300} />
    </div>
  );
};
