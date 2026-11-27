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
const NEGATIVAS = /^(esfria\.)$/i;

/** ATIVO-D1213-15 — "O próximo passo com data" (Primeiro modelo, Cartoon explicativo · grade 13/12/2026 15h). Voz Puck 1,0×, fecho CtaCartoon curto. */
export const D1213_15: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
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
      <Sequence name="CTA SISTEMA (cartoon, curta)" layout="none" from={f(c.cta_quer - 0.4)} durationInFrames={Math.max(1, tl.durationInFrames - f(c.cta_quer - 0.4))}>
        {cta ? <CtaCartoon t={t} tl={tl} segPergunta="s7" segComente="s7" logo={staticFile(BRAND.logo)} /> : null}
      </Sequence>
      <LegendaKaraoke t={t} chunks={tl.captions.filter((k) => !(tl.hideCaptions ?? []).includes(k.seg))} y={1000} size={80} negativas={NEGATIVAS} />
      <Grain frame={frame} />
      {withAudio ? <Audio src={staticFile(`${tl.id}/mix.wav`)} /> : null}
    </AbsoluteFill>
  );
};
