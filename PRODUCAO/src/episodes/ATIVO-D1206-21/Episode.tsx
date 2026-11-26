import React from "react";
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { BRAND } from "../../theme";
import "../../fonts";
import { Grain } from "../../components/Background";
import type { Timeline } from "../types";
import { CtaNoir, FundoNoir, LegendaNoir, luz, prog } from "../../estilos/pictograma";
import timelineJson from "./timeline.json";
import { Balanca, Fecho, Moedas } from "./scenes/Scenes";

export const timeline = timelineJson as Timeline;
const NEGATIVAS = /^(pressionar\.|assusta\.)$/i;

/** ATIVO-D1206-21 — "O preço por dia" (Segundo modelo, Pictograma cinematográfico · grade 06/12/2026 21h). */
export const D1206_21: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;
  const f = (s: number) => Math.max(0, Math.round(s * fps));
  const win = (a: number, b: number) => ({ from: f(a), durationInFrames: Math.max(1, f(b) - f(a)) });
  const verde = prog(t, c.a_horas, 0.8) * (1 - prog(t, c.f_assusta - 0.8, 0.6)) + prog(t, c.f_comparar, 0.8) * (1 - prog(t, c.cta_quer, 0.6)) + 0.6 * prog(t, c.cta_end + 0.6, 1.0);
  const quente = 1 - 0.5 * luz(t, c.v_pressionar, c.a_trabalho, 0.6, 0.8);
  return (
    <AbsoluteFill style={{ backgroundColor: "#050505" }}>
      <FundoNoir t={t} quente={quente} verde={Math.min(1, verde)} />
      <Sequence name="1 Moedas" layout="none" {...win(0, c.v_clareza - 0.4)}><Moedas t={t} tl={tl} /></Sequence>
      <Sequence name="2-3 Balança" layout="none" {...win(c.v_clareza - 1.2, c.f_assusta - 0.3)}><Balanca t={t} tl={tl} /></Sequence>
      <Sequence name="4 Fecho" layout="none" {...win(c.f_assusta - 1.1, c.cta_quer + 0.3)}><Fecho t={t} tl={tl} /></Sequence>
      <Sequence name="CTA SISTEMA (noir)" layout="none" {...win(c.cta_quer - 0.4, tl.duration)}>
        <CtaNoir t={t} tl={tl} segPergunta="s7" segComente="s7" logo={staticFile(BRAND.logo)} rodape="INTELIGÊNCIA IMOBILIÁRIA" />
      </Sequence>
      <LegendaNoir t={t} chunks={tl.captions} y={1330} size={52} negativas={NEGATIVAS} />
      <Grain frame={frame} />
      {withAudio ? <Audio src={staticFile(`${tl.id}/mix.wav`)} /> : null}
    </AbsoluteFill>
  );
};
