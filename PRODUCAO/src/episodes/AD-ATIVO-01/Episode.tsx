import React from "react";
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { Captions } from "../../components/Captions";
import { ease, prog } from "../../lib/anim";
import type { Timeline } from "../types";
import timelineJson from "./timeline.json";
import { Phone } from "./scenes/Phone";

export const timeline = timelineJson as Timeline;

/** Criativo Meta Ads 01 — "A venda esquecida" (ROTEIROS/ADS/AD-ATIVO-01.md). 9:16, voz oficial 1,0×, CTA para o botão do anúncio.
 *  Legenda em y≈1185 (acima da faixa do botão/legenda da Meta); a fala final "Clique no botão…" fica só na tipografia. */
export const AD01: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;
  const hidden = tl.hideCaptions ?? [];
  const mood = -0.3 * prog(t, c.c_desc, 0.8, ease.out) * (1 - prog(t, c.a_just, 0.6, ease.out)) + 0.4 * prog(t, c.a_just + 0.3, 0.8, ease.out);
  return (
    <AbsoluteFill style={{ backgroundColor: "#07080A" }}>
      <Background t={t} mood={mood} />
      <Phone t={t} tl={tl} />
      <Sequence name="Legendas" layout="none">
        <Captions t={t} chunks={tl.captions.filter((k) => !hidden.includes(k.seg))} y={1185} size={58} />
      </Sequence>
      <Grain frame={frame} />
      {withAudio ? <Audio src={staticFile(`${tl.id}/mix.wav`)} /> : null}
    </AbsoluteFill>
  );
};
