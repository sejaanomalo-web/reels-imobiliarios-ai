import React from "react";
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { BRAND } from "../../theme";
import "../../fonts";
import { Grain } from "../../components/Background";
import type { Timeline } from "../types";
import { CtaNoir, FundoNoir, LegendaNoir, luz, prog } from "../../estilos/pictograma";
import timelineJson from "./timeline.json";
import { Busca, Motivo, Tempo } from "./scenes/Scenes";

export const timeline = timelineJson as Timeline;
const NEGATIVAS = /^$/;

/** ATIVO-D1207-15 — "Por que agora?" (Segundo modelo, Pictograma cinematográfico · grade 07/12/2026 15h). */
export const D1207_15: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;
  const f = (s: number) => Math.max(0, Math.round(s * fps));
  const win = (a: number, b: number) => ({ from: f(a), durationInFrames: Math.max(1, f(b) - f(a)) });
  const verde = prog(t, c.a_naturalidade, 0.8) * (1 - prog(t, c.f_tempo - 0.8, 0.6)) + prog(t, c.f_tempo, 0.8) * (1 - prog(t, c.cta_quer, 0.6)) + 0.6 * prog(t, c.cta_end + 0.6, 1.0);
  const quente = 1 - 0.5 * luz(t, c.m_repente, c.u_mudou, 0.6, 0.8);
  return (
    <AbsoluteFill style={{ backgroundColor: "#050505" }}>
      <FundoNoir t={t} quente={quente} verde={Math.min(1, verde)} />
      <Sequence name="1 Busca" layout="none" {...win(0, c.v_prazo - 0.4)}><Busca t={t} tl={tl} /></Sequence>
      <Sequence name="2-3 Motivo" layout="none" {...win(c.v_prazo - 1.2, c.f_tempo - 0.3)}><Motivo t={t} tl={tl} /></Sequence>
      <Sequence name="4 Tempo" layout="none" {...win(c.f_tempo - 1.1, c.cta_quer + 0.3)}><Tempo t={t} tl={tl} /></Sequence>
      <Sequence name="CTA SISTEMA (noir)" layout="none" {...win(c.cta_quer - 0.4, tl.duration)}>
        <CtaNoir t={t} tl={tl} segPergunta="s7" segComente="s7" logo={staticFile(BRAND.logo)} rodape="INTELIGÊNCIA IMOBILIÁRIA" />
      </Sequence>
      <LegendaNoir t={t} chunks={tl.captions} y={1330} size={52} negativas={NEGATIVAS} />
      <Grain frame={frame} />
      {withAudio ? <Audio src={staticFile(`${tl.id}/mix.wav`)} /> : null}
    </AbsoluteFill>
  );
};
