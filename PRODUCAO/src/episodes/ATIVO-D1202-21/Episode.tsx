import React from "react";
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { BRAND } from "../../theme";
import "../../fonts";
import { Grain } from "../../components/Background";
import type { Timeline } from "../types";
import { CtaNoir, FundoNoir, LegendaNoir, luz, prog } from "../../estilos/pictograma";
import timelineJson from "./timeline.json";
import { AoVivo, Honesta, Porta, Promessa } from "./scenes/Scenes";

export const timeline = timelineJson as Timeline;
const NEGATIVAS = /^(morre|outro\.|defeito|tudo\.)$/i;

/** ATIVO-D1202-21 — "A visita maior que a foto" (Segundo modelo, Pictograma cinematográfico · grade 02/12/2026 21h). */
export const D1202_21: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;
  const f = (s: number) => Math.max(0, Math.round(s * fps));
  const win = (a: number, b: number) => ({ from: f(a), durationInFrames: Math.max(1, f(b) - f(a)) });
  const verde = prog(t, c.v_surpreender, 1.0) * (1 - prog(t, c.g_mostre, 0.6)) + prog(t, c.f_maior, 0.8) * (1 - prog(t, c.cta_quer, 0.6)) + 0.6 * prog(t, c.cta_end + 0.6, 1.0);
  const quente = 1 - 0.5 * luz(t, c.p_morre, c.v_contrario, 0.6, 0.8);
  return (
    <AbsoluteFill style={{ backgroundColor: "#050505" }}>
      <FundoNoir t={t} quente={quente} verde={Math.min(1, verde)} />
      <Sequence name="1 A foto e a promessa" layout="none" {...win(0, c.d_chega + 0.3)}><Promessa t={t} tl={tl} /></Sequence>
      <Sequence name="2 A porta" layout="none" {...win(c.d_chega - 0.6, c.v_contrario + 0.3)}><Porta t={t} tl={tl} /></Sequence>
      <Sequence name="3 A foto honesta" layout="none" {...win(c.v_contrario - 0.5, c.g_mostre + 0.3)}><Honesta t={t} tl={tl} /></Sequence>
      <Sequence name="4-5 Ao vivo" layout="none" {...win(c.g_mostre - 0.5, c.cta_quer + 0.3)}><AoVivo t={t} tl={tl} /></Sequence>
      <Sequence name="CTA SISTEMA (noir)" layout="none" {...win(c.cta_quer - 0.4, tl.duration)}>
        <CtaNoir t={t} tl={tl} segPergunta="s11" segComente="s11" logo={staticFile(BRAND.logo)} rodape="INTELIGÊNCIA IMOBILIÁRIA" />
      </Sequence>
      <LegendaNoir t={t} chunks={tl.captions} y={1330} size={52} negativas={NEGATIVAS} />
      <Grain frame={frame} />
      {withAudio ? <Audio src={staticFile(`${tl.id}/mix.wav`)} /> : null}
    </AbsoluteFill>
  );
};
