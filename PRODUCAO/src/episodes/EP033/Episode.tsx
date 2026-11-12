import React from "react";
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { Captions } from "../../components/Captions";
import { ease, prog } from "../../lib/anim";
import type { Timeline } from "../types";
import timelineJson from "./timeline.json";
import { Team } from "./scenes/Team";
import { Tracks } from "./scenes/Tracks";
import { Cta } from "./scenes/Cta";

export const timeline = timelineJson as Timeline;

/** EP033 — "Crescer a equipe pode aumentar a confusão". Padrão aprovado (preset de voz original em 1,0×, câmera suave, legenda original)
 *  com CTA de comentário: COMENTE "SISTEMA" → detalhes pelo Direct. Gancho, situação e tensão com a mesma equipe num único plano. */
export const EP033: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;
  const f = (s: number) => Math.max(0, Math.round(s * fps));
  const win = (from: number, to: number) => ({ from: f(from), durationInFrames: Math.max(1, f(to) - f(from)) });
  const hidden = tl.hideCaptions ?? [];
  const captions = tl.captions.filter((k) => !hidden.includes(k.seg));
  const mood =
    -0.3 * prog(t, c.hook_more, 0.5, ease.out) * (1 - prog(t, c.sit_two, 0.5, ease.out)) +
    0.15 * prog(t, c.sit_two, 0.5, ease.out) * (1 - prog(t, c.sit_eight, 0.5, ease.out)) -
    0.35 * prog(t, c.sit_eight, 0.5, ease.out) * (1 - prog(t, c.ins_before, 0.5, ease.out)) +
    0.4 * prog(t, c.ins_before, 0.5, ease.out) * (1 - prog(t, c.cta_doc, 0.5, ease.out)) +
    0.5 * prog(t, c.cta_doc, 0.6, ease.out);

  return (
    <AbsoluteFill style={{ backgroundColor: "#07080A" }}>
      <Background t={t} mood={mood} />
      <Sequence name="01–03 Equipe (gancho, situação, tensão)" layout="none" {...win(0, c.ins_before + 0.35)}>
        <Team t={t} tl={tl} />
      </Sequence>
      <Sequence name="04 Insight — três trilhas" layout="none" {...win(c.ins_before - 0.15, c.cta_doc + 0.35)}>
        <Tracks t={t} tl={tl} />
      </Sequence>
      <Sequence name="05 CTA comentário" layout="none" {...win(c.cta_doc - 0.1, tl.duration)}>
        <Cta t={t} tl={tl} />
      </Sequence>
      <Sequence name="Legendas" layout="none">
        <Captions t={t} chunks={captions} />
      </Sequence>
      <Grain frame={frame} />
      {withAudio ? <Audio src={staticFile(`${tl.id}/mix.wav`)} /> : null}
    </AbsoluteFill>
  );
};
