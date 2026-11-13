import React from "react";
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { Captions } from "../../components/Captions";
import { ease, prog } from "../../lib/anim";
import type { Timeline } from "../types";
import timelineJson from "./timeline.json";
import { Hook } from "./scenes/Hook";
import { Compose } from "./scenes/Compose";
import { Compare } from "./scenes/Compare";
import { Base } from "./scenes/Base";
import { Cta } from "./scenes/Cta";

export const timeline = timelineJson as Timeline;

/** EP016 — "A mensagem para quem sumiu". Padrão original (preset de voz aprovado em 1,0×, câmera suave, legenda original)
 *  com CTA de comentário: COMENTE "SISTEMA" → detalhes pelo Direct. */
export const EP016: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
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
    -0.35 * (1 - prog(t, c.sit_new, 0.6, ease.out)) +
    0.15 * prog(t, c.sit_new, 0.6, ease.out) * (1 - prog(t, c.ten_split, 0.4, ease.out)) -
    0.3 * prog(t, c.ten_cobra, 0.4, ease.out) * (1 - prog(t, c.ten_second, 0.5, ease.out)) +
    0.3 * prog(t, c.ten_second, 0.5, ease.out) * (1 - prog(t, c.ins_random, 0.4, ease.out)) -
    0.4 * prog(t, c.ins_random, 0.4, ease.out) * (1 - prog(t, c.ins_ctx, 0.5, ease.out)) +
    0.35 * prog(t, c.ins_ctx, 0.5, ease.out) * (1 - prog(t, c.cta_card, 0.5, ease.out)) +
    0.5 * prog(t, c.cta_card, 0.6, ease.out);

  return (
    <AbsoluteFill style={{ backgroundColor: "#07080A" }}>
      <Background t={t} mood={mood} />
      <Sequence name="01 Gancho" layout="none" {...win(0, c.sit_new + 0.45)}>
        <Hook t={t} tl={tl} />
      </Sequence>
      <Sequence name="02 Situação" layout="none" {...win(c.sit_new - 0.05, c.ten_split + 0.4)}>
        <Compose t={t} tl={tl} />
      </Sequence>
      <Sequence name="03 Tensão" layout="none" {...win(c.ten_split - 0.2, c.ins_base + 0.4)}>
        <Compare t={t} tl={tl} />
      </Sequence>
      <Sequence name="04 Insight" layout="none" {...win(c.ins_base - 0.1, c.cta_card + 0.35)}>
        <Base t={t} tl={tl} />
      </Sequence>
      <Sequence name="05 CTA comentário" layout="none" {...win(c.cta_card - 0.1, tl.duration)}>
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
