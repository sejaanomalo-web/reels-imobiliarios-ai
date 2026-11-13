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
import { Situacao } from "./scenes/Situacao";
import { Tensao } from "./scenes/Tensao";
import { Insight } from "./scenes/Insight";
import { Cta } from "./scenes/Cta";

export const timeline = timelineJson as Timeline;

/**
 * EP002 — "A pergunta que o corretor não faz".
 * Todos os tempos vêm de timeline.json (gerado da narração real): `npm run ep -- EP002` refaz tudo.
 */
export const EP002: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;
  const sc = Object.fromEntries(tl.scenes.map((s) => [s.id, s]));
  const f = (s: number) => Math.max(0, Math.round(s * fps));
  const win = (from: number, to: number) => ({ from: f(from), durationInFrames: Math.max(1, f(to) - f(from)) });
  const hidden = tl.hideCaptions ?? [];
  const captions = tl.captions.filter((k) => !hidden.includes(k.seg));

  // humor do fundo: neutro → tensão (quente) na enxurrada → clareza (menta) na pergunta e no CTA
  const mood =
    -0.65 * prog(t, sc.tensao.start, 1.5, ease.inOut) * (1 - prog(t, c.ins_clear, 0.8, ease.out)) +
    0.5 * prog(t, c.ins_question, 1, ease.out) * (1 - prog(t, c.cta_dock, 0.6, ease.inOut)) +
    0.7 * prog(t, c.cta_dock, 1, ease.out);

  return (
    <AbsoluteFill style={{ backgroundColor: "#07080A" }}>
      <Background t={t} mood={mood} />
      <Sequence name="01 Gancho" layout="none" {...win(0, c.sit_split + 0.4)}>
        <Hook t={t} tl={tl} />
      </Sequence>
      <Sequence name="02 Situação" layout="none" {...win(c.sit_split - 0.1, c.ten_start + 0.75)}>
        <Situacao t={t} tl={tl} />
      </Sequence>
      <Sequence name="03 Tensão" layout="none" {...win(c.ten_start - 0.25, c.ins_clear + 0.65)}>
        <Tensao t={t} tl={tl} />
      </Sequence>
      <Sequence name="04 Insight" layout="none" {...win(c.ins_clear, c.cta_dock + 0.6)}>
        <Insight t={t} tl={tl} />
      </Sequence>
      <Sequence name="05 CTA" layout="none" {...win(c.cta_dock - 0.1, tl.duration)}>
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
