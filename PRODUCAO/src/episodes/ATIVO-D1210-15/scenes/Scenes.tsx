import React from "react";
import type { Timeline } from "../../types";
import {
  A, Caminho, CamNoir, Figura, Halo, Holofote, Icone, Pilula, TituloNoir, ease, luz, mix, prog, surge,
} from "../../../estilos/pictograma";

/**
 * ATIVO-D1210-15 — "Termine no melhor cômodo" (grade 10/12/2026 · 15h · IDEIA QUE MUDA O JOGO · Pictograma).
 * Sem corte seco: uma linha do tempo com dois pontos que acendem → o incômodo medido minuto a minuto (a curva se desenha) →
 * na lembrança pesam o pior momento (vermelho) e o final; o meio apaga (a duração quase não contou) → a visita: o ponto alto e
 * o fim → a rota pelos cômodos termina no melhor lugar (varanda, vista, cozinha clara) → quem termina bem é lembrado → CtaNoir.
 * Apuração: Redelmeier & Kahneman (1996), Pain; Redelmeier, Katz & Kahneman (2003). "Um exame médico", sem detalhes.
 */
const CHAO = 1180;
type P = { t: number; tl: Timeline };
const Svg: React.FC<{ children: React.ReactNode }> = ({ children }) => <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>{children}</svg>;
const Chao: React.FC = () => <line x1={-400} y1={CHAO} x2={1480} y2={CHAO} stroke="rgba(244,244,242,0.3)" strokeWidth={2} strokeDasharray="3 9" />;
const CURVA: [number, number][] = [[160, 900], [250, 850], [340, 790], [430, 720], [520, 640], [610, 730], [700, 800], [800, 860], [910, 900]];

/* ---------------------------------------------------------------- 1 · a curva da lembrança ---------------------------------------------------------------- */
export const Curva: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = 1 - prog(t, c.v_visita - 1.0, 0.5);
  if (on <= 0.001) return null;
  const desenha = prog(t, c.e_minuto - 0.3, c.e_exame - c.e_minuto + 0.6, ease.linear);
  const pior = prog(t, c.r_pior - 0.15, 0.4);
  const fim = prog(t, c.r_final - 0.15, 0.4);
  const meio = prog(t, c.r_duracao - 0.2, 0.6);
  const hook = (1 - prog(t, c.e_mediram - 0.3, 0.4));
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} push={0.004} keys={[{ t: 0, s: 1.06, y: -12 }, { t: c.e_mediram, s: 1.0, e: ease.out }, { t: c.r_final, s: 1.04, y: -10 }, { t: c.r_duracao + 0.6, s: 1.06, y: -14, e: ease.out }]}>
        <Svg>
          <Chao />
          <Holofote x={540} chao={CHAO} w={760} p={prog(t, 0, 0.6) * 0.8} />
          {/* gancho: a linha da visita com dois pontos */}
          <g opacity={hook}>
            <line x1={160} y1={800} x2={920} y2={800} stroke="rgba(244,244,242,0.4)" strokeWidth={3} strokeDasharray="4 10" />
            <circle cx={560} cy={800} r={16} fill={A.hex} opacity={prog(t, c.h_dois - 0.2, 0.3)} />
            <circle cx={900} cy={800} r={16} fill={A.hex} opacity={prog(t, c.h_dois, 0.3)} />
          </g>
          <g opacity={1 - hook}>
            <g opacity={1 - 0.75 * meio}><Caminho pontos={CURVA} p={desenha} cor="#F4F4F2" nos={false} w={4} /></g>
            <circle cx={520} cy={640} r={18 * pior} fill="#E5484D" />
            <circle cx={910} cy={900} r={18 * fim} fill={A.hex} />
          </g>
          <g opacity={prog(t, c.e_exame - 0.2, 0.4) * (1 - prog(t, c.r_lembranca - 0.2, 0.3))}><Icone t={t} nome="relogio" x={540} y={560} r={46} tom="branco" /></g>
          <Figura t={t} x={540} y={CHAO} s={0.62} pose={fim > 0.5 ? "pe" : "cabisbaixo"} tom={fim > 0.5 ? "verde" : "luz"} />
        </Svg>
        <Pilula t={t} at={c.e_minuto - 0.05} ate={c.r_lembranca - 0.2} x={540} y={980} texto="INCÔMODO, MINUTO A MINUTO" tom="branco" size={26} />
        <Pilula t={t} at={c.r_pior - 0.05} x={290} y={650} texto="O PIOR MOMENTO" tom="vermelho" size={26} />
        <Pilula t={t} at={c.r_final - 0.05} x={850} y={960} texto="O FINAL" tom="verde" size={26} />
        <Pilula t={t} at={c.r_duracao - 0.05} x={300} y={980} texto="DURAÇÃO: QUASE NADA" tom="cinza" size={24} />
        <Pilula t={t} at={c.e_mediram - 0.05} ate={c.v_visita - 1.0} x={540} y={1250} texto="REDELMEIER & KAHNEMAN · 1996" tom="cinza" size={24} />
      </CamNoir>
      <TituloNoir t={t} at={0.05} ate={c.e_mediram - 0.4} linhas={[{ texto: "SÓ DOIS", size: 72 }, { texto: "MOMENTOS", cor: "verde", size: 100 }]} top={300} />
      <TituloNoir t={t} at={c.e_mediram - 0.25} ate={c.r_lembranca - 0.4} linhas={[{ texto: "UM EXAME,", size: 64 }, { texto: "MINUTO A MINUTO", cor: "verde", size: 84 }]} top={300} />
      <TituloNoir t={t} at={c.r_lembranca - 0.25} ate={c.v_visita - 1.0} linhas={[{ texto: "A LEMBRANÇA:", size: 64 }, { texto: "PICO E FIM", cor: "verde", size: 100 }]} top={300} />
    </div>
  );
};

/* ---------------------------------------------------------------- 2–3 · a rota da visita ---------------------------------------------------------------- */
export const Rota: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = luz(t, c.v_visita - 1.1, c.cta_quer - 0.2, 0.6, 0.45);
  if (on <= 0.001) return null;
  const rota = prog(t, c.a_planeje - 0.2, c.a_varanda - c.a_planeje + 0.4, ease.inOut);
  const melhor = prog(t, c.a_varanda - 0.2, 0.6);
  const fim = prog(t, c.f_termina - 0.2, 0.8, ease.out);
  const PTS: [number, number][] = [[180, 980], [360, 880], [540, 940], [720, 840], [880, 760]];
  const xF = mix(180, 880, rota); const yF = CHAO;
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} t0={c.v_visita - 1.1} push={0.005} keys={[{ t: c.v_visita - 1.1, s: 1.05 }, { t: c.v_alto, s: 1.0, e: ease.out }, { t: c.a_varanda, s: 1.05, x: -30, y: -8 }, { t: c.f_lembrado + 0.4, s: 1.08, x: -40, y: -16, e: ease.out }]}>
        <Svg>
          <Chao />
          <Holofote x={mix(540, 820, melhor)} chao={CHAO} w={mix(700, 520, melhor)} p={0.85} cor={melhor > 0.5 ? A.hex : "#FFFFFF"} />
          {melhor > 0 && <Halo x={880} y={760} r={mix(200, 320, fim)} p={0.45 * melhor} cor={A.hex} />}
          <g opacity={surge(t, c.v_visita - 0.9) * (1 - prog(t, c.a_planeje - 0.4, 0.4))}>
            <Icone t={t} nome="grafico" x={540} y={760} r={70} tom={t > c.v_alto - 0.2 ? "verde" : "branco"} brilho={t > c.v_alto - 0.2} />
          </g>
          <g opacity={prog(t, c.a_planeje - 0.3, 0.4)}>
            <Caminho pontos={PTS} p={rota} />
            <g opacity={0.9}><Icone t={t} nome="chave" x={180} y={980} r={40} tom="branco" /></g>
            <g opacity={0.9}><Icone t={t} nome="casa" x={360} y={880} r={40} tom="branco" /></g>
            <g opacity={0.9}><Icone t={t} nome="pin" x={540} y={940} r={40} tom="branco" /></g>
            <g opacity={0.9}><Icone t={t} nome="familia" x={720} y={840} r={40} tom="branco" /></g>
            <Icone t={t} nome="lampada" x={880} y={760} r={56} tom={melhor > 0.5 ? "verde" : "branco"} brilho={melhor > 0.5} />
          </g>
          <Figura t={t} x={t > c.a_planeje - 0.2 ? xF : 540} y={yF} s={0.7} pose={rota > 0.02 && rota < 0.98 ? "andando" : fim > 0.5 ? "bracosAbertos" : "pe"} tom={melhor > 0.5 ? "verde" : "luz"} />
        </Svg>
        <Pilula t={t} at={c.v_alto - 0.05} ate={c.a_planeje - 0.3} x={380} y={880} texto="O PONTO ALTO" tom="verde" size={26} />
        <Pilula t={t} at={c.v_fim - 0.05} ate={c.a_planeje - 0.3} x={720} y={880} texto="O FIM" tom="verde" size={26} />
        <Pilula t={t} at={c.a_varanda - 0.05} x={860} y={660} texto="A VARANDA" tom="verde" size={24} />
        <Pilula t={t} at={c.a_vista - 0.05} x={640} y={640} texto="A VISTA" tom="verde" size={24} />
        <Pilula t={t} at={c.a_clara - 0.05} x={420} y={640} texto="A COZINHA CLARA" tom="verde" size={24} />
      </CamNoir>
      <TituloNoir t={t} at={c.v_visita - 0.9} ate={c.a_planeje - 0.4} linhas={[{ texto: "NA VISITA:", size: 64 }, { texto: "PICO E FIM", cor: "verde", size: 100 }]} top={300} />
      <TituloNoir t={t} at={c.a_planeje - 0.25} ate={c.f_termina - 0.4} linhas={[{ texto: "PLANEJE A ROTA,", size: 64 }, { texto: "TERMINE NO MELHOR", cor: "verde", size: 80 }]} top={300} />
      <TituloNoir t={t} at={c.f_termina - 0.25} ate={c.cta_quer - 0.2} linhas={[{ texto: "QUEM TERMINA BEM", size: 64 }, { texto: "É LEMBRADO", cor: "verde", size: 96 }]} top={300} />
    </div>
  );
};
