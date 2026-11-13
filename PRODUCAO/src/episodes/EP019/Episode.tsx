import React from "react";
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { Captions } from "../../components/Captions";
import { ease, prog } from "../../lib/anim";
import type { Timeline } from "../types";
import timelineJson from "./timeline.json";
import { Wave } from "./scenes/Wave";
import { Details } from "./scenes/Details";
import { Summary } from "./scenes/Summary";
import { Followup } from "./scenes/Followup";
import { Cta } from "./scenes/Cta";

export const timeline = timelineJson as Timeline;

/** EP019 — "Áudio longo pode esconder uma decisão". Padrão original (preset aprovado em 1,0×, câmera suave, legenda original)
 *  com CTA de comentário: COMENTE "SISTEMA" → detalhes pelo Direct. */
export const EP019: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
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
    -0.3 * prog(t, c.hook_half, 0.5, ease.out) * (1 - prog(t, c.sit_audio, 0.5, ease.out)) +
    0.15 * prog(t, c.sit_audio, 0.5, ease.out) * (1 - prog(t, c.sit_hard, 0.5, ease.out)) -
    0.35 * prog(t, c.sit_hard, 0.5, ease.out) * (1 - prog(t, c.ten_after, 0.5, ease.out)) +
    0.3 * prog(t, c.ten_after, 0.5, ease.out) * (1 - prog(t, c.cta_routine, 0.5, ease.out)) +
    0.5 * prog(t, c.cta_routine, 0.6, ease.out);

  return (
    <AbsoluteFill style={{ backgroundColor: "#07080A" }}>
      <Background t={t} mood={mood} />
      <Sequence name="01 Gancho" layout="none" {...win(0, c.sit_audio + 0.4)}>
        <Wave t={t} tl={tl} />
      </Sequence>
      <Sequence name="02 Situação" layout="none" {...win(c.sit_audio - 0.1, c.ten_after + 0.35)}>
        <Details t={t} tl={tl} />
      </Sequence>
      <Sequence name="03 Tensão" layout="none" {...win(c.ten_after - 0.15, c.ins_reg + 0.35)}>
        <Summary t={t} tl={tl} />
      </Sequence>
      <Sequence name="04 Insight" layout="none" {...win(c.ins_reg - 0.05, c.cta_routine + 0.35)}>
        <Followup t={t} tl={tl} />
      </Sequence>
      <Sequence name="05 CTA comentário" layout="none" {...win(c.cta_routine - 0.1, tl.duration)}>
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
