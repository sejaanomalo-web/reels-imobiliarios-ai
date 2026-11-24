import React from "react";
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { BRAND } from "../../theme";
import "../../fonts";
import { Grain } from "../../components/Background";
import type { Timeline } from "../types";
import { CtaNoir, FundoNoir, LegendaNoir, luz, prog } from "../../estilos/pictograma";
import timelineJson from "./timeline.json";
import { Cerco, Confianca, Cuidado } from "./scenes/Scenes";

export const timeline = timelineJson as Timeline;
const NEGATIVAS = /^(não\.|todas\.|dinheiro\.)$/i;

/** ATIVO-D1130-21 — "A casa que ninguém conseguiu comprar" (Segundo modelo, Pictograma cinematográfico · grade 30/11/2026 21h). */
export const D1130_21: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;
  const f = (s: number) => Math.max(0, Math.round(s * fps));
  const win = (a: number, b: number) => ({ from: f(a), durationInFrames: Math.max(1, f(b) - f(a)) });
  const verde = prog(t, c.f_confianca, 1.0) * (1 - prog(t, c.cta_quer, 0.6)) + 0.6 * prog(t, c.cta_end + 0.6, 1.0);
  const quente = 1 - 0.5 * luz(t, c.o_todas, c.v_foi, 0.8, 0.8);
  return (
    <AbsoluteFill style={{ backgroundColor: "#050505" }}>
      <FundoNoir t={t} quente={quente} verde={verde} />
      <Sequence name="1 A casa, o cerco e as ofertas" layout="none" {...win(0, c.v_foi + 1.1)}><Cerco t={t} tl={tl} /></Sequence>
      <Sequence name="2 O chefe da obra e a chave" layout="none" {...win(c.v_foi + 0.2, c.f_comprar + 0.2)}><Cuidado t={t} tl={tl} /></Sequence>
      <Sequence name="3 Confiança" layout="none" {...win(c.f_comprar - 0.6, c.cta_quer + 0.3)}><Confianca t={t} tl={tl} /></Sequence>
      <Sequence name="CTA SISTEMA (noir)" layout="none" {...win(c.cta_quer - 0.4, tl.duration)}>
        <CtaNoir t={t} tl={tl} segPergunta="s16" segComente="s16" logo={staticFile(BRAND.logo)} rodape="INTELIGÊNCIA IMOBILIÁRIA" />
      </Sequence>
      <LegendaNoir t={t} chunks={tl.captions} y={1330} size={52} negativas={NEGATIVAS} />
      <Grain frame={frame} />
      {withAudio ? <Audio src={staticFile(`${tl.id}/mix.wav`)} /> : null}
    </AbsoluteFill>
  );
};
