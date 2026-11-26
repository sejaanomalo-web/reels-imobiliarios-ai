import React from "react";
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { BRAND } from "../../theme";
import "../../fonts";
import { Grain } from "../../components/Background";
import type { Timeline } from "../types";
import { CtaNoir, FundoNoir, LegendaNoir, prog } from "../../estilos/pictograma";
import timelineJson from "./timeline.json";
import { Metodo, Pergunta } from "./scenes/Scenes";

export const timeline = timelineJson as Timeline;
const NEGATIVAS = /^(errado\.|distrato\.)$/i;

/** ATIVO-D1209-15 — "Imagine que deu errado" (Segundo modelo, Pictograma cinematográfico · grade 09/12/2026 15h). */
export const D1209_15: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;
  const f = (s: number) => Math.max(0, Math.round(s * fps));
  const win = (a: number, b: number) => ({ from: f(a), durationInFrames: Math.max(1, f(b) - f(a)) });
  const verde = prog(t, c.e_trinta, 0.8) * (1 - prog(t, c.v_pergunte - 1.0, 0.6)) + prog(t, c.r_agora, 0.8) * (1 - prog(t, c.cta_quer, 0.6)) + 0.6 * prog(t, c.cta_end + 0.6, 1.0);
  const quente = 1 - 0.4 * prog(t, c.h_errado, 0.5) * (1 - prog(t, c.m_psicologo, 0.6));
  return (
    <AbsoluteFill style={{ backgroundColor: "#050505" }}>
      <FundoNoir t={t} quente={quente} verde={Math.min(1, verde)} />
      <Sequence name="1 Método" layout="none" {...win(0, c.v_pergunte - 0.4)}><Metodo t={t} tl={tl} /></Sequence>
      <Sequence name="2-3 Pergunta" layout="none" {...win(c.v_pergunte - 1.2, c.cta_quer + 0.3)}><Pergunta t={t} tl={tl} /></Sequence>
      <Sequence name="CTA SISTEMA (noir)" layout="none" {...win(c.cta_quer - 0.4, tl.duration)}>
        <CtaNoir t={t} tl={tl} segPergunta="s7" segComente="s7" logo={staticFile(BRAND.logo)} rodape="INTELIGÊNCIA IMOBILIÁRIA" />
      </Sequence>
      <LegendaNoir t={t} chunks={tl.captions} y={1330} size={52} negativas={NEGATIVAS} />
      <Grain frame={frame} />
      {withAudio ? <Audio src={staticFile(`${tl.id}/mix.wav`)} /> : null}
    </AbsoluteFill>
  );
};
