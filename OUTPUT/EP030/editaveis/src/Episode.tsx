import React from "react";
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { Captions } from "../../components/Captions";
import { ease, prog } from "../../lib/anim";
import type { Timeline } from "../types";
import timelineJson from "./timeline.json";
import { Clock } from "./scenes/Clock";
import { Board } from "./scenes/Board";
import { Week } from "./scenes/Week";
import { Cta } from "./scenes/Cta";

export const timeline = timelineJson as Timeline;

/** EP030 — "A reunião de carteira de 15 minutos". Padrão aprovado (preset de voz original em 1,0×, câmera suave, legenda original)
 *  com CTA de comentário: COMENTE "SISTEMA" → detalhes pelo Direct. Situação e tensão dividem o mesmo quadro de três colunas. */
export const EP030: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
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
    -0.15 * (1 - prog(t, c.hook_clear, 0.6, ease.out)) +
    0.25 * prog(t, c.hook_15, 0.5, ease.out) * (1 - prog(t, c.ins_goal, 0.5, ease.out)) -
    0.3 * prog(t, c.ins_stop, 0.5, ease.out) * (1 - prog(t, c.ins_reg, 0.5, ease.out)) +
    0.35 * prog(t, c.ins_reg, 0.5, ease.out) * (1 - prog(t, c.cta_org, 0.5, ease.out)) +
    0.5 * prog(t, c.cta_org, 0.6, ease.out);

  return (
    <AbsoluteFill style={{ backgroundColor: "#07080A" }}>
      <Background t={t} mood={mood} />
      <Sequence name="01 Gancho" layout="none" {...win(0, c.sit_open + 0.35)}>
        <Clock t={t} tl={tl} />
      </Sequence>
      <Sequence name="02–03 Quadro (situação + tensão)" layout="none" {...win(c.sit_open - 0.1, c.ins_goal + 0.35)}>
        <Board t={t} tl={tl} />
      </Sequence>
      <Sequence name="04 Insight" layout="none" {...win(c.ins_goal - 0.1, c.cta_org + 0.35)}>
        <Week t={t} tl={tl} />
      </Sequence>
      <Sequence name="05 CTA comentário" layout="none" {...win(c.cta_org - 0.1, tl.duration)}>
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
