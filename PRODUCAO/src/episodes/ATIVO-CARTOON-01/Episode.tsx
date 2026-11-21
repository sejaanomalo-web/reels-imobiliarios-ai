import React from "react";
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { BRAND } from "../../theme";
import "../../fonts";
import { Grain } from "../../components/Background";
import type { Timeline } from "../types";
import { CtaCartoon, LegendaKaraoke, Raios } from "../../estilos/cartoon";
import timelineJson from "./timeline.json";
import { Planos, makeShots } from "./scenes/Scenes";

export const timeline = timelineJson as Timeline;
const shots = makeShots(timeline);
const NEGATIVAS = /^(outro|corretor\.|some\.|contra|a|dele\.)$/i;

/** ATIVO_CARTOON_01 — "A comissão ficou com outro corretor". PRIMEIRO MODELO (Cartoon explicativo). Voz Puck 1,0×, verde #02FB3F, fecho CtaCartoon (SISTEMA). */
export const CARTOON_01: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
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
      <Sequence name="CTA SISTEMA (cartoon)" layout="none" from={f(c.cta_quer - 0.4)} durationInFrames={Math.max(1, tl.durationInFrames - f(c.cta_quer - 0.4))}>
        {cta ? <CtaCartoon t={t} tl={tl} segPergunta="s13" segComente="s14" logo={staticFile(BRAND.logo)} /> : null}
      </Sequence>
      <LegendaKaraoke t={t} chunks={tl.captions.filter((k) => !(tl.hideCaptions ?? []).includes(k.seg))} y={1000} size={80} negativas={NEGATIVAS} />
      <Grain frame={frame} />
      {withAudio ? <Audio src={staticFile(`${tl.id}/mix.wav`)} /> : null}
    </AbsoluteFill>
  );
};
