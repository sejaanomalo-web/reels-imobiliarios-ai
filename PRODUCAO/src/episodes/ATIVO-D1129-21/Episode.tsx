import React from "react";
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { BRAND } from "../../theme";
import "../../fonts";
import { Grain } from "../../components/Background";
import type { Timeline } from "../types";
import { CtaNoir, FundoNoir, LegendaNoir, luz, prog } from "../../estilos/pictograma";
import timelineJson from "./timeline.json";
import { Balanca, Portas, Tese } from "./scenes/Scenes";

export const timeline = timelineJson as Timeline;
const NEGATIVAS = /^(some|lembrança|cortesia:)$/i;

/** ATIVO-D1129-21 — "Visita não é cortesia" (Segundo modelo, Pictograma cinematográfico · grade 29/11/2026 21h). */
export const D1129_21: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;
  const f = (s: number) => Math.max(0, Math.round(s * fps));
  const win = (a: number, b: number) => ({ from: f(a), durationInFrames: Math.max(1, f(b) - f(a)) });
  const verde = prog(t, c.t_trabalho, 1.0) * (1 - prog(t, c.cta_quer, 0.6)) + 0.6 * prog(t, c.cta_end + 0.6, 1.0);
  const quente = 1 - 0.55 * luz(t, c.p_some, c.f_ficha - 0.3, 0.8, 0.8);
  return (
    <AbsoluteFill style={{ backgroundColor: "#050505" }}>
      <FundoNoir t={t} quente={quente} verde={verde} />
      <Sequence name="1-4 Portas (EUA → Brasil)" layout="none" {...win(0, c.p_dono + 1.3)}><Portas t={t} tl={tl} /></Sequence>
      <Sequence name="5-6 Balança da prova" layout="none" {...win(c.p_dono + 0.4, c.t_la + 0.2)}><Balanca t={t} tl={tl} /></Sequence>
      <Sequence name="7 Lá × aqui" layout="none" {...win(c.t_la - 0.5, c.cta_quer + 0.3)}><Tese t={t} tl={tl} /></Sequence>
      <Sequence name="CTA SISTEMA (noir)" layout="none" {...win(c.cta_quer - 0.4, tl.duration)}>
        <CtaNoir t={t} tl={tl} segPergunta="s14" segComente="s14" logo={staticFile(BRAND.logo)} rodape="INTELIGÊNCIA IMOBILIÁRIA" />
      </Sequence>
      <LegendaNoir t={t} chunks={tl.captions} y={1330} size={52} negativas={NEGATIVAS} />
      <Grain frame={frame} />
      {withAudio ? <Audio src={staticFile(`${tl.id}/mix.wav`)} /> : null}
    </AbsoluteFill>
  );
};
