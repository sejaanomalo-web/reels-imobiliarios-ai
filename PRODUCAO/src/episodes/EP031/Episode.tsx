import React from "react";
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { Captions } from "../../components/Captions";
import { ease, prog } from "../../lib/anim";
import type { Timeline } from "../types";
import timelineJson from "./timeline.json";
import { Split } from "./scenes/Split";
import { Flow } from "./scenes/Flow";
import { Cta } from "./scenes/Cta";

export const timeline = timelineJson as Timeline;

/** EP031 — "Dois corretores responderam o mesmo lead". Padrão aprovado (preset de voz original em 1,0×, câmera suave, legenda original)
 *  com CTA de comentário: COMENTE "SISTEMA" → detalhes pelo Direct. Gancho+situação num plano; tensão+insight noutro (os campos vazios se preenchem). */
export const EP031: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
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
    -0.35 * prog(t, c.hook_two, 0.5, ease.out) * (1 - prog(t, c.ten_prob, 0.5, ease.out)) -
    0.2 * prog(t, c.ten_prob, 0.5, ease.out) * (1 - prog(t, c.ins_def, 0.5, ease.out)) +
    0.4 * prog(t, c.ins_def, 0.5, ease.out) * (1 - prog(t, c.cta_flow, 0.5, ease.out)) +
    0.5 * prog(t, c.cta_flow, 0.6, ease.out);

  return (
    <AbsoluteFill style={{ backgroundColor: "#07080A" }}>
      <Background t={t} mood={mood} />
      <Sequence name="01–02 Gancho + situação" layout="none" {...win(0, c.ten_prob + 0.35)}>
        <Split t={t} tl={tl} />
      </Sequence>
      <Sequence name="03–04 Tensão + insight" layout="none" {...win(c.ten_prob - 0.15, c.cta_flow + 0.35)}>
        <Flow t={t} tl={tl} />
      </Sequence>
      <Sequence name="05 CTA comentário" layout="none" {...win(c.cta_flow - 0.1, tl.duration)}>
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
