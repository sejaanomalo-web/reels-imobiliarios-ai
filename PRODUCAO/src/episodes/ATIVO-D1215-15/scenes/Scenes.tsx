import React from "react";
import type { Timeline } from "../../types";
import {
  A, CamNoir, Figura, Halo, Holofote, Icone, Pilula, TituloNoir, ease, luz, prog,
} from "../../../estilos/pictograma";

/**
 * ATIVO-D1215-15 — "O que observar na visita" (grade 15/12/2026 · 15h · IDEIA QUE MUDA O JOGO · Pictograma).
 * Sem corte seco: a parede acende e prende o olhar; a luz, o barulho e o espaço ficam apagados → o que chama atenção ×
 * o que importa → gosto, não critério → a visita começa antes → na véspera, o celular manda três pontos; cada um acende
 * o seu ícone (luz da sala, barulho da rua, espaço da cozinha) → quem sabe o que procurar enxerga o imóvel certo → CtaNoir.
 */
const CHAO = 1180;
type P = { t: number; tl: Timeline };
const Svg: React.FC<{ children: React.ReactNode }> = ({ children }) => <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>{children}</svg>;
const Chao: React.FC = () => <line x1={-400} y1={CHAO} x2={1480} y2={CHAO} stroke="rgba(244,244,242,0.3)" strokeWidth={2} strokeDasharray="3 9" />;
const PONTOS: ["lampada" | "audio" | "casa", number][] = [["lampada", 270], ["audio", 540], ["casa", 810]];

/* ---------------------------------------------------------------- 1 · a parede ---------------------------------------------------------------- */
export const Parede: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = 1 - prog(t, c.v_antes - 0.5, 0.45);
  if (on <= 0.001) return null;
  const par = prog(t, c.h_cor - 0.3, 0.5);
  const gosto = prog(t, c.g_gosto - 0.2, 0.4);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} push={0.004} keys={[{ t: 0, s: 1.06, y: -12 }, { t: c.h_parede, s: 1.0, e: ease.out }, { t: c.t_importa, s: 1.04, y: -8 }, { t: c.g_criterio, s: 1.0, e: ease.out }]}>
        <Svg>
          <Chao />
          <Holofote x={540} chao={CHAO} w={860} p={prog(t, 0, 0.6) * 0.85} cor={gosto > 0.5 ? "#FFD9D4" : "#FFFFFF"} />
          {par > 0 ? <Halo x={540} y={640} r={230} p={0.45 * par} cor="#FFFFFF" /> : null}
          <rect x={390} y={540} width={300} height={200} rx={6} fill={`rgba(244,244,242,${0.08 + 0.32 * par})`} stroke="#F4F4F2" strokeWidth={3} opacity={prog(t, 0.1, 0.5)} />
          {PONTOS.map(([nome, x], i) => (
            <Icone key={nome} t={t} nome={nome} x={x} y={890} r={58} tom={t > c.t_importa - 0.2 ? "cinza" : "branco"} />
          ))}
          <Figura t={t} x={160} y={CHAO} s={0.6} pose={t < c.h_parede ? "andando" : "pe"} tom="luz" />
        </Svg>
        <Pilula t={t} at={c.h_parede - 0.1} ate={c.t_atencao - 0.3} x={540} y={790} texto="SÓ A COR DA PAREDE" tom="branco" size={28} />
        <Pilula t={t} at={c.t_atencao - 0.1} ate={c.g_gosto - 0.3} x={540} y={790} texto="O QUE CHAMA ATENÇÃO" tom="branco" size={28} />
        <Pilula t={t} at={c.t_importa - 0.1} ate={c.g_gosto - 0.3} x={540} y={1000} texto="O QUE IMPORTA: APAGADO" tom="vermelho" size={28} />
        <Pilula t={t} at={c.g_gosto - 0.1} ate={c.v_antes - 0.5} x={540} y={1000} texto="GOSTO, NÃO CRITÉRIO" tom="vermelho" size={28} />
      </CamNoir>
      <TituloNoir t={t} at={0.05} ate={c.t_olhar - 0.4} linhas={[{ texto: "SÓ LEMBRAVA", size: 64 }, { texto: "DA PAREDE", cor: "verde", size: 104 }]} top={300} />
      <TituloNoir t={t} at={c.t_olhar - 0.25} ate={c.g_gosto - 0.4} linhas={[{ texto: "SEM SABER", size: 64 }, { texto: "O QUE OLHAR", cor: "verde", size: 96 }]} top={300} />
      <TituloNoir t={t} at={c.g_gosto - 0.25} ate={c.v_antes - 0.5} linhas={[{ texto: "VIRA GOSTO,", size: 64 }, { texto: "NÃO CRITÉRIO", cor: "verde", size: 92 }]} top={300} />
    </div>
  );
};

/* ---------------------------------------------------------------- 2 · a véspera ---------------------------------------------------------------- */
export const Vespera: React.FC<P> = ({ t, tl }) => {
  const c = tl.cues;
  const on = luz(t, c.v_antes - 0.6, c.cta_quer - 0.2, 0.5, 0.45);
  if (on <= 0.001) return null;
  const fim = prog(t, c.d_certo - 0.2, 0.6, ease.out);
  const ats = [c.a_luz, c.a_barulho, c.a_espaco];
  return (
    <div style={{ position: "absolute", inset: 0, opacity: on }}>
      <CamNoir t={t} t0={c.v_antes - 0.6} push={0.005} keys={[{ t: c.v_antes - 0.6, s: 1.05 }, { t: c.v_antes, s: 1.0, e: ease.out }, { t: c.a_espaco, s: 1.04, y: -8 }, { t: c.d_certo + 0.4, s: 1.08, y: -14, e: ease.out }]}>
        <Svg>
          <Chao />
          <Holofote x={540} chao={CHAO} w={860} p={0.85} cor={fim > 0.5 ? A.hex : "#FFFFFF"} />
          {fim > 0 ? <Halo x={540} y={860} r={340} p={0.4 * fim} cor={A.hex} /> : null}
          {PONTOS.map(([nome, x], i) => {
            const k = prog(t, ats[i] - 0.2, 0.4);
            return (
              <g key={nome} opacity={prog(t, c.a_tres - 0.3 + i * 0.1, 0.4)}>
                {k > 0 ? <Halo x={x} y={890} r={90} p={0.4 * k} cor={A.hex} /> : null}
                <Icone t={t} nome={nome} x={x} y={890} r={58} tom={k > 0.5 ? "verde" : "cinza"} brilho={k > 0.5} />
              </g>
            );
          })}
          <Figura t={t} x={170} y={CHAO} s={0.6} pose={t > c.a_vespera - 0.2 && t < c.a_espaco + 0.6 ? "celular" : fim > 0.5 ? "bracosAbertos" : "pe"} tom={fim > 0.5 ? "verde" : "luz"} />
          <Figura t={t} x={900} y={CHAO} s={0.6} pose={t > c.d_procurar - 0.2 && fim < 0.5 ? "apontando" : fim > 0.5 ? "comemorando" : "pe"} tom={fim > 0.5 ? "verde" : "luz"} fase={0.4} />
        </Svg>
        <Pilula t={t} at={c.a_vespera - 0.1} ate={c.a_luz - 0.3} x={540} y={620} texto="NA VÉSPERA: 3 PONTOS" tom="branco" size={28} />
        <Pilula t={t} at={c.a_luz - 0.1} ate={c.d_procurar - 0.3} x={540} y={560} texto="1 · A LUZ DA SALA" tom="verde" size={26} />
        <Pilula t={t} at={c.a_barulho - 0.1} ate={c.d_procurar - 0.3} x={540} y={640} texto="2 · O BARULHO DA RUA" tom="verde" size={26} />
        <Pilula t={t} at={c.a_espaco - 0.1} ate={c.d_procurar - 0.3} x={540} y={720} texto="3 · O ESPAÇO DA COZINHA" tom="verde" size={26} />
        <Pilula t={t} at={c.d_procurar - 0.1} ate={c.d_certo - 0.2} x={540} y={1000} texto="SABE O QUE PROCURAR" tom="verde" size={28} />
        <Pilula t={t} at={c.d_certo - 0.1} x={540} y={1000} texto="O IMÓVEL CERTO" tom="verde" size={30} />
      </CamNoir>
      <TituloNoir t={t} at={c.v_antes - 0.35} ate={c.a_vespera - 0.4} linhas={[{ texto: "A VISITA COMEÇA", size: 64 }, { texto: "ANTES", cor: "verde", size: 110 }]} top={300} />
      <TituloNoir t={t} at={c.a_vespera - 0.25} ate={c.d_procurar - 0.4} linhas={[{ texto: "NA VÉSPERA,", size: 64 }, { texto: "TRÊS PONTOS", cor: "verde", size: 96 }]} top={300} />
      <TituloNoir t={t} at={c.d_procurar - 0.25} ate={c.cta_quer - 0.2} linhas={[{ texto: "O IMÓVEL", size: 64 }, { texto: "CERTO", cor: "verde", size: 110 }]} top={300} />
    </div>
  );
};
