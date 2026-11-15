import React from "react";
import { AbsoluteFill, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { ease, prog } from "../../lib/anim";
import type { Timeline } from "../types";
import timelineJson from "./timeline.json";
import { Edit } from "./scenes/Edit";
import { KText } from "../AD-ATIVO-01/scenes/KText";

export const timeline = timelineJson as Timeline;

/** Criativo Meta Ads 02 — "Só um minutinho" (ROTEIROS/ADS/AD-ATIVO-02.md). Padrão de edição de anúncio v2: voz oficial 1,1×,
 *  transcrição dinâmica, palco com cortes/tremida/flash, SFX em cada troca. CTA para o botão do anúncio; área útil y 270–1250. */
export const AD02: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;
  const mood = -0.35 * prog(t, c.p_so, 0.4, ease.out) * (1 - prog(t, c.q_unico, 0.4, ease.out)) + 0.45 * prog(t, c.q_unico, 0.6, ease.out);
  return (
    <AbsoluteFill style={{ backgroundColor: "#07080A" }}>
      <Background t={t} mood={mood} />
      <Edit t={t} tl={tl} />
      <KText t={t} chunks={tl.captions} solutionAt={c.q_e - 0.1} hidden={tl.hideCaptions ?? []} hideFrom={c.cta_clique - 0.2} />
      <Grain frame={frame} />
      {withAudio ? <Audio src={staticFile(`${tl.id}/mix.wav`)} /> : null}
    </AbsoluteFill>
  );
};
