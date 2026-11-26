import React from "react";
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { BRAND } from "../../theme";
import "../../fonts";
import { Grain } from "../../components/Background";
import type { Timeline } from "../types";
import { CtaNoir, FundoNoir, LegendaNoir, luz, prog } from "../../estilos/pictograma";
import timelineJson from "./timeline.json";
import { Marcos, Novo, Recomeco } from "./scenes/Scenes";

export const timeline = timelineJson as Timeline;
const NEGATIVAS = /^(esfriou\?)$/i;

/** ATIVO-D1207-21 — "O novo começo" (Segundo modelo, Pictograma cinematográfico · grade 07/12/2026 21h). */
export const D1207_21: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;
  const f = (s: number) => Math.max(0, Math.round(s * fps));
  const win = (a: number, b: number) => ({ from: f(a), durationInFrames: Math.max(1, f(b) - f(a)) });
  const verde = prog(t, c.a_retome, 0.8) * (1 - prog(t, c.f_novo - 2.4, 0.6)) + prog(t, c.f_novo, 0.8) * (1 - prog(t, c.cta_quer, 0.6)) + 0.6 * prog(t, c.cta_end + 0.6, 1.0);
  const quente = 1 - 0.5 * luz(t, c.a_esfriou, c.a_retome, 0.4, 0.6);
  return (
    <AbsoluteFill style={{ backgroundColor: "#050505" }}>
      <FundoNoir t={t} quente={quente} verde={Math.min(1, verde)} />
      <Sequence name="1 Marcos" layout="none" {...win(0, c.v_recomeco - 0.4)}><Marcos t={t} tl={tl} /></Sequence>
      <Sequence name="2-3 Recomeço" layout="none" {...win(c.v_recomeco - 1.2, c.f_novo - 0.3)}><Recomeco t={t} tl={tl} /></Sequence>
      <Sequence name="4 Novo" layout="none" {...win(c.f_novo - 2.5, c.cta_quer + 0.3)}><Novo t={t} tl={tl} /></Sequence>
      <Sequence name="CTA SISTEMA (noir)" layout="none" {...win(c.cta_quer - 0.4, tl.duration)}>
        <CtaNoir t={t} tl={tl} segPergunta="s7" segComente="s7" logo={staticFile(BRAND.logo)} rodape="INTELIGÊNCIA IMOBILIÁRIA" />
      </Sequence>
      <LegendaNoir t={t} chunks={tl.captions} y={1330} size={52} negativas={NEGATIVAS} />
      <Grain frame={frame} />
      {withAudio ? <Audio src={staticFile(`${tl.id}/mix.wav`)} /> : null}
    </AbsoluteFill>
  );
};
