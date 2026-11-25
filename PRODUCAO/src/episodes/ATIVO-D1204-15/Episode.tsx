import React from "react";
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { BRAND } from "../../theme";
import "../../fonts";
import { Grain } from "../../components/Background";
import type { Timeline } from "../types";
import { CtaNoir, FundoNoir, LegendaNoir, luz, prog } from "../../estilos/pictograma";
import timelineJson from "./timeline.json";
import { Antes, Caneta, Estudo, Motivos } from "./scenes/Scenes";

export const timeline = timelineJson as Timeline;
const NEGATIVAS = /^(arrependeu|deu|errado\?|pessimismo\.|barulho|parcela|escola|arrependimento\.)$/i;

/** ATIVO-D1204-15 — "Imagine que deu errado" (Segundo modelo, Pictograma cinematográfico · grade 04/12/2026 15h). */
export const D1204_15: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;
  const f = (s: number) => Math.max(0, Math.round(s * fps));
  const win = (a: number, b: number) => ({ from: f(a), durationInFrames: Math.max(1, f(b) - f(a)) });
  const verde = prog(t, c.v_30, 0.8) * (1 - prog(t, c.m_barulho - 1.0, 0.6)) + prog(t, c.f_solucao, 0.8) * (1 - prog(t, c.cta_quer, 0.6)) + 0.6 * prog(t, c.cta_end + 0.6, 1.0);
  const quente = 1 - 0.5 * luz(t, c.q_arrependeu, c.v_pessimismo, 0.6, 0.8);
  return (
    <AbsoluteFill style={{ backgroundColor: "#050505" }}>
      <FundoNoir t={t} quente={quente} verde={Math.min(1, verde)} />
      <Sequence name="1-2 A caneta e um ano depois" layout="none" {...win(0, c.v_pessimismo + 0.3)}><Caneta t={t} tl={tl} /></Sequence>
      <Sequence name="3 O estudo" layout="none" {...win(c.v_pessimismo - 0.7, c.m_barulho - 0.3)}><Estudo t={t} tl={tl} /></Sequence>
      <Sequence name="4-5 Os motivos antes da caneta" layout="none" {...win(c.m_barulho - 1.2, c.f_solucao - 0.5)}><Motivos t={t} tl={tl} /></Sequence>
      <Sequence name="6 Antes e depois" layout="none" {...win(c.f_solucao - 1.4, c.cta_quer + 0.3)}><Antes t={t} tl={tl} /></Sequence>
      <Sequence name="CTA SISTEMA (noir)" layout="none" {...win(c.cta_quer - 0.4, tl.duration)}>
        <CtaNoir t={t} tl={tl} segPergunta="s7" segComente="s7" logo={staticFile(BRAND.logo)} rodape="INTELIGÊNCIA IMOBILIÁRIA" />
      </Sequence>
      <LegendaNoir t={t} chunks={tl.captions} y={1330} size={52} negativas={NEGATIVAS} />
      <Grain frame={frame} />
      {withAudio ? <Audio src={staticFile(`${tl.id}/mix.wav`)} /> : null}
    </AbsoluteFill>
  );
};
