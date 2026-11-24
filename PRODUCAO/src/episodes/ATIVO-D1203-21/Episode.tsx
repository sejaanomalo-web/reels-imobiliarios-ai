import React from "react";
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { BRAND } from "../../theme";
import "../../fonts";
import { Grain } from "../../components/Background";
import type { Timeline } from "../types";
import { CtaNoir, FundoNoir, LegendaNoir, luz, prog } from "../../estilos/pictograma";
import timelineJson from "./timeline.json";
import { Certo, Contra, DoisCaminhos, Elogio, Mostra } from "./scenes/Scenes";

export const timeline = timelineJson as Timeline;
const NEGATIVAS = /^(defeito\.|nada|é\.|desconfia|problema|desconfiança\.|pequena\.|contra)$/i;

/** ATIVO-D1203-21 — "O contra que vende" (Segundo modelo, Pictograma cinematográfico · grade 03/12/2026 21h). */
export const D1203_21: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;
  const f = (s: number) => Math.max(0, Math.round(s * fps));
  const win = (a: number, b: number) => ({ from: f(a), durationInFrames: Math.max(1, f(b) - f(a)) });
  const verde = prog(t, c.v_luz, 0.8) * (1 - prog(t, c.i_informacao - 2.4, 0.6)) + prog(t, c.f_acreditado, 0.8) * (1 - prog(t, c.cta_quer, 0.6)) + 0.6 * prog(t, c.cta_end + 0.6, 1.0);
  const quente = 1 - 0.5 * luz(t, c.t_desconfia, c.v_imagine, 0.6, 0.8);
  return (
    <AbsoluteFill style={{ backgroundColor: "#050505" }}>
      <FundoNoir t={t} quente={quente} verde={Math.min(1, verde)} />
      <Sequence name="1-2 O elogio e o tudo ótimo" layout="none" {...win(0, c.v_imagine + 0.3)}><Elogio t={t} tl={tl} /></Sequence>
      <Sequence name="3 Você mesmo mostra" layout="none" {...win(c.v_imagine - 0.6, c.i_informacao - 1.7)}><Mostra t={t} tl={tl} /></Sequence>
      <Sequence name="4 O mesmo defeito" layout="none" {...win(c.i_informacao - 2.5, c.i_certo - 0.3)}><DoisCaminhos t={t} tl={tl} /></Sequence>
      <Sequence name="5 Dizer não" layout="none" {...win(c.i_certo - 1.2, c.f_contra + 0.1)}><Certo t={t} tl={tl} /></Sequence>
      <Sequence name="6 Quem fala o contra" layout="none" {...win(c.f_contra - 0.8, c.cta_quer + 0.3)}><Contra t={t} tl={tl} /></Sequence>
      <Sequence name="CTA SISTEMA (noir)" layout="none" {...win(c.cta_quer - 0.4, tl.duration)}>
        <CtaNoir t={t} tl={tl} segPergunta="s8" segComente="s8" logo={staticFile(BRAND.logo)} rodape="INTELIGÊNCIA IMOBILIÁRIA" />
      </Sequence>
      <LegendaNoir t={t} chunks={tl.captions} y={1330} size={52} negativas={NEGATIVAS} />
      <Grain frame={frame} />
      {withAudio ? <Audio src={staticFile(`${tl.id}/mix.wav`)} /> : null}
    </AbsoluteFill>
  );
};
