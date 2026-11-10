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
 * EP001 — "O lead que não sumiu".
 * Todos os tempos vêm de timeline.json (gerado a partir da narração real): trocar a voz ou o
 * texto e rodar `npm run ep -- EP001` reposiciona cenas, legendas e efeitos automaticamente.
 */
export const EP001: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;
  const sc = Object.fromEntries(tl.scenes.map((s) => [s.id, s]));
  const f = (s: number) => Math.max(0, Math.round(s * fps));
  const win = (from: number, to: number) => ({ from: f(from), durationInFrames: Math.max(1, f(to) - f(from)) });

  // humor do fundo: neutro → tensão (quente) → clareza (menta)
  const mood =
    -0.7 * prog(t, sc.tensao.start, 5, ease.inOut) * (1 - prog(t, c.ins_fold, 0.6, ease.out)) +
    0.55 * prog(t, c.ins_fold + 0.2, 1.2, ease.out) * (1 - prog(t, c.ins_ghost, 1.2, ease.inOut)) -
    0.45 * prog(t, c.ins_ghost + 0.3, 1.5, ease.inOut) * (1 - prog(t, c.cta_dock, 0.5, ease.out)) +
    0.7 * prog(t, c.cta_dock, 1, ease.out);

  return (
    <AbsoluteFill style={{ backgroundColor: "#07080A" }}>
      <Background t={t} mood={mood} />
      <Sequence name="01 Gancho" layout="none" {...win(0, sc.hook.end + 0.4)}>
        <Hook t={t} tl={tl} />
      </Sequence>
      <Sequence name="02 Situação" layout="none" {...win(sc.situacao.start - 0.25, sc.situacao.end + 0.45)}>
        <Situacao t={t} tl={tl} />
      </Sequence>
      <Sequence name="03 Tensão" layout="none" {...win(sc.tensao.start - 0.1, c.ins_fold + 0.45)}>
        <Tensao t={t} tl={tl} />
      </Sequence>
      <Sequence name="04 Insight" layout="none" {...win(c.ins_fold, c.cta_dock + 0.65)}>
        <Insight t={t} tl={tl} />
      </Sequence>
      <Sequence name="05 CTA" layout="none" {...win(c.cta_dock - 0.1, tl.duration)}>
        <Cta t={t} tl={tl} />
      </Sequence>
      <Sequence name="Legendas" layout="none">
        <Captions t={t} chunks={tl.captions} />
      </Sequence>
      <Grain frame={frame} />
      {withAudio ? <Audio src={staticFile(`${tl.id}/mix.wav`)} /> : null}
    </AbsoluteFill>
  );
};
