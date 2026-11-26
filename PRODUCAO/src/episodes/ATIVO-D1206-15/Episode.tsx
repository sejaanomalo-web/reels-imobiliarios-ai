import React from "react";
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { BRAND } from "../../theme";
import "../../fonts";
import { Grain } from "../../components/Background";
import type { Timeline } from "../types";
import { CtaNoir, FundoNoir, LegendaNoir, luz, prog } from "../../estilos/pictograma";
import timelineJson from "./timeline.json";
import { Antes, Rotina, Rua } from "./scenes/Scenes";

export const timeline = timelineJson as Timeline;
const NEGATIVAS = /^(trânsito|escola|disputada\.|surpresa)$/i;

/** ATIVO-D1206-15 — "O horário da rotina" (Segundo modelo, Pictograma cinematográfico · grade 06/12/2026 15h). */
export const D1206_15: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;
  const f = (s: number) => Math.max(0, Math.round(s * fps));
  const win = (a: number, b: number) => ({ from: f(a), durationInFrames: Math.max(1, f(b) - f(a)) });
  const verde = prog(t, c.a_horario, 0.8) * (1 - prog(t, c.f_antes - 0.8, 0.6)) + prog(t, c.f_surpresa, 0.8) * (1 - prog(t, c.cta_quer, 0.6)) + 0.6 * prog(t, c.cta_end + 0.6, 1.0);
  const quente = 1 - 0.5 * luz(t, c.t_seis, c.v_visita, 0.6, 0.8);
  return (
    <AbsoluteFill style={{ backgroundColor: "#050505" }}>
      <FundoNoir t={t} quente={quente} verde={Math.min(1, verde)} />
      <Sequence name="1 A rua" layout="none" {...win(0, c.v_visita - 0.4)}><Rua t={t} tl={tl} /></Sequence>
      <Sequence name="2-3 A rotina" layout="none" {...win(c.v_visita - 1.2, c.f_antes - 0.3)}><Rotina t={t} tl={tl} /></Sequence>
      <Sequence name="4 Antes" layout="none" {...win(c.f_antes - 1.1, c.cta_quer + 0.3)}><Antes t={t} tl={tl} /></Sequence>
      <Sequence name="CTA SISTEMA (noir)" layout="none" {...win(c.cta_quer - 0.4, tl.duration)}>
        <CtaNoir t={t} tl={tl} segPergunta="s7" segComente="s7" logo={staticFile(BRAND.logo)} rodape="INTELIGÊNCIA IMOBILIÁRIA" />
      </Sequence>
      <LegendaNoir t={t} chunks={tl.captions} y={1330} size={52} negativas={NEGATIVAS} />
      <Grain frame={frame} />
      {withAudio ? <Audio src={staticFile(`${tl.id}/mix.wav`)} /> : null}
    </AbsoluteFill>
  );
};
