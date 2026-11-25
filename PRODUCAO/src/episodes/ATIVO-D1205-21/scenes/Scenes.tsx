import React from "react";
import type { Timeline } from "../../types";
import {
  A, CamNoir, Caminho, Figura, Halo, Holofote, Icone, Pilula, TituloNoir, ease, luz, mix, prog, surge,
} from "../../../estilos/pictograma";

/**
 * ATIVO-D1205-21 — "Anote o não" (grade 05/12/2026 · 21h · IDEIA QUE MUDA O JOGO · Pictograma).
 * Sem corte seco: a casa recusada (X) ao lado da aprovada → os motivos acendem em volta (escada, sol da tarde, barulho) e
 * se perdem no meio das mensagens → anote o não, com o motivo, depois da visita → três visitas: os motivos se repetem e
 * convergem no filtro → a casa certa acende: mais perto do sim → fecho CtaNoir. Tese por raciocínio.
 */
const CHAO = 1180;
type P = { t: number; tl: Timeline };
const Svg: React.FC<{ children: React.ReactNode }> = ({ children }) => <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>{children}</svg>;
const Chao: React.FC = () => <line x1={-400} y1={CHAO} x2={1480} y2={CHAO} stroke="rgba(244,244,242,0.3)" strokeWidth={2} strokeDasharray="3 9" />;
const MOT = [{ at: "m_escada", txt: "ESCADA DEMAIS", ic: "predio", x: 260, y: 720 }, { at: "m_sol", txt: "SOL DA TARDE", ic: "lampada", x: 540, y: 660 }, { at: "m_rua", txt: "RUA BARULHENTA", ic: "audio", x: 820, y: 720 }] as const;

/* ---------------------------------------------------------------- 1 · o não e os motivos ---------------------------------------------------------------- */
export const Recusa: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = 1 - prog(t, c.v_anote - 0.8, 0.5);
  if (on <= 0.001) return null;
  const some = prog(t, c.m_some - 0.2, 0.8);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} push={0.004} keys={[{ t: 0, s: 1.06, y: -16 }, { t: c.h_gostou, s: 1.0, e: ease.out }, { t: c.m_rua, s: 1.04, y: -10 }, { t: c.m_some + 0.6, s: 1.07, y: -16, e: ease.out }]}>
        <Svg>
          <Chao />
          <Holofote x={540} chao={CHAO} w={680} p={prog(t, 0, 0.6)} />
          <g opacity={(1 - some * 0.4) * surge(t, 0.2)}><Icone t={t} nome="casa" x={380} y={900} r={70} tom={t > c.h_recusou - 0.1 ? "cinza" : "branco"} /></g>
          <g opacity={surge(t, c.h_recusou - 0.1) * (1 - some * 0.4)}><Icone t={t} nome="x" x={440} y={840} r={26} tom="vermelho" /></g>
          <g opacity={surge(t, c.h_gostou - 0.2) * (1 - some * 0.4)}><Icone t={t} nome="casa" x={700} y={900} r={70} tom="verde" brilho /></g>
          {MOT.map((m) => (
            <g key={m.txt} opacity={surge(t, c[m.at] - 0.15) * (1 - some)} transform={`translate(0 ${some * 60})`}><Icone t={t} nome={m.ic} x={m.x} y={m.y} r={38} tom="branco" /></g>
          ))}
          {[0, 1, 2, 3].map((i) => <g key={i} opacity={some * (0.4 + 0.15 * i)}><Icone t={t} nome="chat" x={260 + i * 190} y={760 + (i % 2) * 50} r={30} tom="cinza" /></g>)}
          <Figura t={t} x={540} y={CHAO} s={0.9} pose={t > c.m_nao && some < 0.5 ? "apontando" : some > 0.5 ? "cabisbaixo" : "pe"} tom="luz" />
        </Svg>
        {MOT.map((m) => <Pilula key={m.txt} t={t} at={c[m.at] - 0.05} ate={c.m_some} x={m.x} y={m.y + 70} texto={m.txt} tom="branco" size={24} />)}
        <Pilula t={t} at={c.m_some - 0.05} ate={c.v_anote - 0.8} x={540} y={640} texto="O MOTIVO SOME" tom="vermelho" size={28} />
      </CamNoir>
      <TituloNoir t={t} at={0.05} ate={c.m_nao - 0.3} linhas={[{ texto: "O IMÓVEL RECUSADO", size: 64 }, { texto: "ENSINA MAIS", cor: "verde", size: 92 }]} top={300} />
      <TituloNoir t={t} at={c.m_nao - 0.15} ate={c.v_anote - 0.8} linhas={[{ texto: "CADA NÃO", cor: "vermelho", size: 92 }, { texto: "TEM UM MOTIVO", size: 64 }]} top={300} />
    </div>
  );
};

/* ---------------------------------------------------------------- 2 · anote o não ---------------------------------------------------------------- */
export const Anote: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = luz(t, c.v_anote - 0.9, c.i_repetem - 0.9, 0.5, 0.5);
  if (on <= 0.001) return null;
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} t0={c.v_anote - 0.9} push={0.005} keys={[{ t: c.v_anote - 0.9, s: 1.05 }, { t: c.v_anote, s: 1.0, e: ease.out }, { t: c.v_visita + 0.4, s: 1.05, y: -12, e: ease.out }]}>
        <Svg>
          <Chao />
          <Holofote x={540} chao={CHAO} w={600} p={0.85} />
          <Icone t={t} nome="documento" x={480} y={680} r={64} tom="branco" brilho p={surge(t, c.v_anote - 0.3)} />
          <Figura t={t} x={840} y={CHAO} s={0.85} flip pose="celular" tom="luz" item="celular" />
        </Svg>
        {["NÃO · ESCADA DEMAIS", "NÃO · SOL DA TARDE", "NÃO · RUA BARULHENTA"].map((txt, i) => (
          <Pilula key={txt} t={t} at={c.v_anote + 0.3 + i * 0.5} x={420} y={800 + i * 58} texto={txt} tom="branco" size={24} />
        ))}
        <Pilula t={t} at={c.v_visita - 0.05} x={420} y={990} texto="LOGO DEPOIS DA VISITA" tom="verde" size={26} cheia />
      </CamNoir>
      <TituloNoir t={t} at={c.v_anote - 0.8} ate={c.i_repetem - 0.9} linhas={[{ texto: "ANOTE O NÃO", cor: "verde", size: 92 }, { texto: "COM O MOTIVO", size: 64 }]} top={300} />
    </div>
  );
};

/* ---------------------------------------------------------------- 3 · os motivos viram o filtro ---------------------------------------------------------------- */
export const Filtro: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = luz(t, c.i_repetem - 1.0, c.cta_quer - 0.2, 0.6, 0.45);
  if (on <= 0.001) return null;
  const junta = prog(t, c.i_filtro - 0.3, 0.8, ease.inOut);
  const sim = prog(t, c.f_sim - 0.3, 0.6, ease.out);
  const ICS = ["predio", "lampada", "audio"] as const;
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} t0={c.i_repetem - 1.0} push={0.005} keys={[{ t: c.i_repetem - 1.0, s: 1.04 }, { t: c.i_repetem, s: 1.0, e: ease.out }, { t: c.f_sim + 0.4, s: 1.07, y: -18, e: ease.out }]}>
        <Svg>
          <Chao />
          <Holofote x={540} chao={CHAO} w={mix(560, 720, sim)} p={0.85} cor={sim > 0.3 ? A.hex : "#FFFFFF"} />
          <Halo x={540} y={1000} r={mix(160, 260, sim)} p={0.55 * sim} cor={A.hex} />
          {[0, 1, 2].map((v) => (
            <g key={v}>
              <g opacity={surge(t, c.i_repetem - 0.8 + v * 0.2)}><Icone t={t} nome="casa" x={200} y={640 + v * 110} r={36} tom="cinza" /></g>
              {ICS.map((ic, k) => (
                <g key={ic} opacity={surge(t, c.i_repetem - 0.6 + v * 0.2 + k * 0.08) * (1 - junta * 0.7)}>
                  <Icone t={t} nome={ic} x={mix(400 + k * 190, 540, junta)} y={mix(640 + v * 110, 900, junta)} r={30} tom="branco" />
                </g>
              ))}
            </g>
          ))}
          <Caminho pontos={[[400, 900], [540, 940], [680, 900]]} p={junta} cor={A.hex} nos={false} />
          <g opacity={sim}><Icone t={t} nome="casa" x={540} y={1000} r={56} tom="verde" brilho /><Icone t={t} nome="check" x={600} y={950} r={24} tom="verde" /></g>
          <Figura t={t} x={860} y={CHAO} s={0.8} flip pose={sim > 0.5 ? "comemorando" : "pe"} tom={sim > 0.5 ? "verde" : "luz"} />
        </Svg>
        <Pilula t={t} at={c.i_repetem - 0.05} ate={c.i_filtro - 0.2} x={540} y={580} texto="3 VISITAS · OS MESMOS MOTIVOS" tom="branco" size={26} />
        <Pilula t={t} at={c.i_filtro - 0.05} x={540} y={830} texto="O FILTRO DO CLIENTE" tom="verde" size={30} cheia />
      </CamNoir>
      <TituloNoir t={t} at={c.i_repetem - 0.9} ate={c.f_sim - 0.4} linhas={[{ texto: "OS MOTIVOS", size: 64 }, { texto: "VIRAM O FILTRO", cor: "verde", size: 88 }]} top={300} />
      <TituloNoir t={t} at={c.f_sim - 0.25} ate={c.cta_quer - 0.3} linhas={[{ texto: "MAIS PERTO", size: 72 }, { texto: "DO SIM", cor: "verde", size: 104 }]} top={300} />
    </div>
  );
};
