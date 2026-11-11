import React from "react";
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { CaptionsPunch } from "../../components/Captions";
import { ease, prog } from "../../lib/anim";
import type { Timeline } from "../types";
import timelineJson from "./timeline.json";
import { Hook } from "./scenes/Hook";
import { Thread } from "./scenes/Thread";
import { Compare } from "./scenes/Compare";
import { Cta } from "./scenes/Cta";

export const timeline = timelineJson as Timeline;

/** EP015 — "Todo atendimento precisa terminar com isto". Padrão de energia v2 (PROMPTS/GUIA_MELHORIA_CONTINUA.md). */
export const EP015: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
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
    0.2 -
    0.75 * prog(t, c.sit_leave, 0.6, ease.inOut) * (1 - prog(t, c.ten_ask, 0.6, ease.out)) +
    0.35 * prog(t, c.ten_ok, 0.6, ease.out) * (1 - prog(t, c.ins_closed, 0.3, ease.out)) -
    0.5 * prog(t, c.ins_closed, 0.3, ease.out) * (1 - prog(t, c.ins_follow, 0.3, ease.out)) +
    0.6 * prog(t, c.ins_follow, 0.4, ease.out);

  return (
    <AbsoluteFill style={{ backgroundColor: "#07080A" }}>
      <Background t={t * 2.2} mood={mood} />
      <Sequence name="01 Gancho" layout="none" {...win(0, c.sit_line + 0.2)}>
        <Hook t={t} tl={tl} />
      </Sequence>
      <Sequence name="02–04a Fio da conversa" layout="none" {...win(c.sit_line - 0.05, c.ins_diff + 0.4)}>
        <Thread t={t} tl={tl} />
      </Sequence>
      <Sequence name="04b Encerrada × acompanhada" layout="none" {...win(c.ins_diff - 0.1, c.cta_board + 0.75)}>
        <div style={{ position: "absolute", inset: 0, opacity: 1 - prog(t, c.cta_board + 0.45, 0.25, ease.linear) }}>
          <Compare t={t} tl={tl} />
        </div>
      </Sequence>
      <Sequence name="05 CTA" layout="none" {...win(c.cta_board, tl.duration)}>
        <Cta t={t} tl={tl} />
      </Sequence>
      <Sequence name="Legendas" layout="none">
        <CaptionsPunch t={t} chunks={captions} />
      </Sequence>
      <Grain frame={frame} />
      {withAudio ? <Audio src={staticFile(`${tl.id}/mix.wav`)} /> : null}
    </AbsoluteFill>
  );
};
