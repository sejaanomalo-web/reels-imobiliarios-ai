import React from "react";
import type { Timeline } from "../../types";
import {
  A, Caminho, CamNoir, Figura, Halo, Holofote, Icone, Pilula, Relogio, TituloNoir, aa, ease, luz, mix, prog, surge,
} from "../../../estilos/pictograma";

/**
 * ATIVO-D1206-15 — "O horário da rotina" (grade 06/12/2026 · 15h · IDEIA QUE MUDA O JOGO · Pictograma).
 * Sem corte seco: a mesma rua sob duas luzes (10h calma e sol; 18h trânsito, escola, vaga) → ele mora no horário da rotina
 * → pergunte a que horas sai e volta, visite nesse horário ou faça o trajeto (caminho verde) → a rotina antes, sem surpresa
 * depois → fecho CtaNoir. Tese por raciocínio; sem estatística.
 */
const CHAO = 1180;
type P = { t: number; tl: Timeline };
const Svg: React.FC<{ children: React.ReactNode }> = ({ children }) => <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>{children}</svg>;
const Chao: React.FC = () => <line x1={-400} y1={CHAO} x2={1480} y2={CHAO} stroke="rgba(244,244,242,0.3)" strokeWidth={2} strokeDasharray="3 9" />;

/* ---------------------------------------------------------------- 1 · a mesma rua, duas luzes ---------------------------------------------------------------- */
export const Rua: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = 1 - prog(t, c.v_visita - 1.0, 0.5);
  if (on <= 0.001) return null;
  const tarde = prog(t, c.t_seis - 0.3, 0.8, ease.inOut);
  const manha = prog(t, c.m_calma - 0.3, 0.6) * (1 - tarde);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} push={0.004} keys={[{ t: 0, s: 1.06, y: -16 }, { t: c.h_seis, s: 1.0, e: ease.out }, { t: c.m_sol, s: 1.03, x: 24 }, { t: c.t_escola, s: 1.06, x: -24, y: -12, e: ease.out }]}>
        <Svg>
          <Chao />
          <Halo x={820} y={560} r={mix(160, 90, tarde)} cor={tarde > 0.5 ? "#FFB27A" : "#FFF3C4"} p={0.7 * Math.max(manha, 0.35 * tarde)} />
          <Holofote x={540} chao={CHAO} w={720} p={prog(t, 0, 0.6)} cor={tarde > 0.5 ? "#FFD9D4" : "#FFFFFF"} />
          <Relogio t={t} x={540} y={690} r={110} vel={t > c.h_dez && t < c.h_seis + 0.3 ? 3.0 : t > c.t_seis - 0.4 && t < c.t_seis + 0.4 ? 3.0 : 0.2} p={prog(t, 0.1, 0.5)} />
          {[180, 900].map((x, i) => <g key={x} opacity={surge(t, 0.2 + i * 0.1)}><Icone t={t} nome="casa" x={x} y={1080} r={56} tom="branco" /></g>)}
          <g opacity={surge(t, c.t_transito - 0.2) * tarde}><Icone t={t} nome="alerta" x={300} y={900} r={40} tom="vermelho" /></g>
          <g opacity={surge(t, c.t_escola - 0.2) * tarde}><Icone t={t} nome="familia" x={540} y={900} r={40} tom="vermelho" /></g>
          <g opacity={surge(t, c.t_vaga - 0.2) * tarde}><Icone t={t} nome="pin" x={780} y={900} r={40} tom="vermelho" /></g>
          <Figura t={t} x={540} y={CHAO} s={0.8} pose={tarde > 0.6 ? "cabisbaixo" : "pe"} tom="luz" />
        </Svg>
        <Pilula t={t} at={c.m_calma - 0.05} ate={c.t_seis - 0.3} x={540} y={850} texto="RUA CALMA" tom="branco" size={28} />
        <Pilula t={t} at={c.m_sol - 0.05} ate={c.t_seis - 0.3} x={540} y={920} texto="SOL NA SALA" tom="branco" size={28} />
        <Pilula t={t} at={c.t_transito - 0.05} x={300} y={985} texto="TRÂNSITO" tom="vermelho" size={26} />
        <Pilula t={t} at={c.t_escola - 0.05} x={540} y={985} texto="ESCOLA" tom="vermelho" size={26} />
        <Pilula t={t} at={c.t_vaga - 0.05} x={780} y={985} texto="VAGA" tom="vermelho" size={26} />
      </CamNoir>
      <TituloNoir t={t} at={0.05} ate={c.m_calma - 0.5} linhas={[{ texto: "10H E 18H", size: 72 }, { texto: "NÃO SÃO O MESMO IMÓVEL", size: 64 }]} top={300} />
      <TituloNoir t={t} at={c.m_calma - 0.35} ate={c.t_seis - 0.4} linhas={[{ texto: "ÀS 10H", size: 96 }]} top={300} />
      <TituloNoir t={t} at={c.t_seis - 0.25} ate={c.v_visita - 1.0} linhas={[{ texto: "ÀS 18H", cor: "vermelho", size: 96 }]} top={300} />
    </div>
  );
};

/* ---------------------------------------------------------------- 2–3 · a rotina e a visita no horário certo ---------------------------------------------------------------- */
export const Rotina: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = luz(t, c.v_visita - 1.1, c.f_antes - 0.9, 0.6, 0.5);
  if (on <= 0.001) return null;
  const traj = prog(t, c.a_trajeto - 0.2, 1.4, ease.inOut);
  const certo = prog(t, c.a_horario - 0.2, 0.6);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} t0={c.v_visita - 1.1} push={0.005} keys={[{ t: c.v_visita - 1.1, s: 1.05 }, { t: c.v_rotina, s: 1.0, e: ease.out }, { t: c.a_trajeto + 0.5, s: 1.05, y: -14, e: ease.out }]}>
        <Svg>
          <Chao />
          <Holofote x={540} chao={CHAO} w={mix(520, 680, certo)} p={0.85} cor={certo > 0.5 ? A.hex : "#FFFFFF"} />
          <g opacity={surge(t, c.v_visita - 0.4)}><Icone t={t} nome="calendario" x={300} y={700} r={52} tom={certo > 0.5 ? "cinza" : "branco"} /></g>
          <g opacity={surge(t, c.v_rotina - 0.3)}><Icone t={t} nome="relogio" x={780} y={700} r={52} tom={certo > 0.5 ? "verde" : "branco"} brilho={certo > 0.5} /></g>
          <g opacity={surge(t, c.a_trajeto - 0.3)}><Caminho pontos={[[200, 1080], [380, 960], [620, 1010], [880, 900]]} p={traj} /></g>
          <g opacity={surge(t, c.a_trajeto + 0.6)}><Icone t={t} nome="predio" x={900} y={840} r={44} tom="verde" brilho /></g>
          <Figura t={t} x={traj > 0.05 ? mix(260, 520, traj) : 400} y={CHAO} s={0.8} pose={traj > 0.05 && traj < 0.98 ? "andando" : t > c.a_sai - 0.2 ? "apontando" : "celular"} tom={certo > 0.5 ? "verde" : "luz"} />
        </Svg>
        <Pilula t={t} at={c.v_visita - 0.05} ate={c.v_rotina - 0.2} x={300} y={800} texto="HORÁRIO DA VISITA" tom="cinza" size={26} />
        <Pilula t={t} at={c.v_rotina - 0.05} ate={c.a_sai - 0.2} x={780} y={800} texto="HORÁRIO DA ROTINA" tom="verde" size={26} />
        <Pilula t={t} at={c.a_sai - 0.05} x={540} y={800} texto="A QUE HORAS SAI E VOLTA?" tom="branco" size={28} />
        <Pilula t={t} at={c.a_horario - 0.05} x={540} y={865} texto="VISITE NESSE HORÁRIO" tom="verde" size={28} />
        <Pilula t={t} at={c.a_trajeto - 0.05} x={540} y={930} texto="OU FAÇA O TRAJETO" tom="verde" size={28} />
      </CamNoir>
      <TituloNoir t={t} at={c.v_visita - 1.0} ate={c.a_sai - 0.4} linhas={[{ texto: "ELE NÃO MORA", size: 64 }, { texto: "NA VISITA", size: 92 }, { texto: "MORA NA ROTINA", cor: "verde", size: 64 }]} top={300} />
      <TituloNoir t={t} at={c.a_sai - 0.25} ate={c.f_antes - 0.9} linhas={[{ texto: "PERGUNTE", size: 64 }, { texto: "O HORÁRIO", cor: "verde", size: 92 }]} top={300} />
    </div>
  );
};

/* ---------------------------------------------------------------- 4 · a rotina antes ---------------------------------------------------------------- */
export const Antes: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = luz(t, c.f_antes - 1.0, c.cta_quer - 0.2, 0.6, 0.45);
  if (on <= 0.001) return null;
  const leve = prog(t, c.f_surpresa - 0.2, 0.8, ease.out);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} t0={c.f_antes - 1.0} push={0.005} keys={[{ t: c.f_antes - 1.0, s: 1.04 }, { t: c.f_antes, s: 1.0, e: ease.out }, { t: c.f_surpresa + 0.4, s: 1.07, y: -18, e: ease.out }]}>
        <Svg>
          <Chao />
          <Holofote x={540} chao={CHAO} w={mix(560, 720, leve)} p={0.85} cor={A.hex} />
          <Halo x={540} y={CHAO - 220} r={mix(280, 420, leve)} p={0.5 * leve} cor={A.hex} />
          <Relogio t={t} x={540} y={720} r={100} vel={0.3} p={1} />
          <Figura t={t} x={540} y={CHAO} pose={leve > 0.5 ? "bracosAbertos" : "pe"} tom="verde" />
        </Svg>
      </CamNoir>
      <TituloNoir t={t} at={c.f_antes - 0.9} ate={c.cta_quer - 0.3} linhas={[{ texto: "A ROTINA ANTES,", size: 72 }, { texto: "SEM SURPRESA DEPOIS", cor: "verde", size: 70 }]} top={300} />
    </div>
  );
};
export { aa };
