import React from "react";
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { BRAND } from "../../theme";
import { Audio } from "@remotion/media";
import "../../fonts";
import { Grain } from "../../components/Background";
import type { Timeline } from "../types";
import { CtaCartoon, LegendaKaraoke, Raios } from "../../estilos/cartoon";
import timelineJson from "./timeline.json";
import { Planos, makeShots } from "./scenes/Scenes";

export const timeline = timelineJson as Timeline;
const shots = makeShots(timeline);

/** ATIVO_PILOTO_01 — "Concorrente ou parceiro?" no formato CARTOON EXPLICATIVO (piloto). Voz aprovada do NOV26_28 (1,0×), verde #02FB3F, CTA SISTEMA (fecho cartoon CtaCartoon). */
export const PILOTO_01: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;
  const f = (s: number) => Math.max(0, Math.round(s * fps));
  const cta = t >= c.cta_quer - 0.05;
  return (
    <AbsoluteFill style={{ backgroundColor: "#07080A" }}>
      {!cta ? <Planos t={t} shots={shots} /> : <Raios t={t} clima="ganho" vin={0.7} />}
      <Sequence name="CTA SISTEMA" layout="none" from={f(c.cta_quer - 0.4)} durationInFrames={Math.max(1, tl.durationInFrames - f(c.cta_quer - 0.4))}>
        {cta ? <CtaCartoon t={t} tl={tl} segPergunta="s12" segComente="s13" logo={staticFile(BRAND.logo)} /> : null}
      </Sequence>
      <LegendaKaraoke t={t} chunks={tl.captions.filter((k) => !(tl.hideCaptions ?? []).includes(k.seg))} y={1000} size={80} />
      <Grain frame={frame} />
      {withAudio ? <Audio src={staticFile(`${tl.id}/mix.wav`)} /> : null}
    </AbsoluteFill>
  );
};
