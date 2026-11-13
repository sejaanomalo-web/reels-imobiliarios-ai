import React from "react";
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import "../../fonts";
import { Background, Grain } from "../../components/Background";
import { Captions } from "../../components/Captions";
import { ease, prog } from "../../lib/anim";
import type { Timeline } from "../types";
import timelineJson from "./timeline.json";
import { Agenda } from "./scenes/Agenda";
import { Doubt } from "./scenes/Doubt";
import { Align } from "./scenes/Align";
import { Routes } from "./scenes/Routes";
import { Cta } from "./scenes/Cta";

export const timeline = timelineJson as Timeline;

/** EP020 — "Nem toda visita precisa acontecer agora". Padrão original (preset aprovado em 1,0×, câmera suave, legenda original)
 *  com CTA de comentário: COMENTE "SISTEMA" → detalhes pelo Direct. */
export const EP020: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
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
    -0.2 * (1 - prog(t, c.hook_not, 0.4, ease.out)) -
    0.4 * prog(t, c.hook_not, 0.4, ease.out) * (1 - prog(t, c.sit_lead, 0.5, ease.out)) -
    0.1 * prog(t, c.sit_lead, 0.5, ease.out) * (1 - prog(t, c.ten_before, 0.5, ease.out)) +
    0.2 * prog(t, c.ten_before, 0.5, ease.out) * (1 - prog(t, c.ins_if, 0.5, ease.out)) +
    0.4 * prog(t, c.ins_if, 0.5, ease.out) * (1 - prog(t, c.cta_crit, 0.5, ease.out)) +
    0.5 * prog(t, c.cta_crit, 0.6, ease.out);

  return (
    <AbsoluteFill style={{ backgroundColor: "#07080A" }}>
      <Background t={t} mood={mood} />
      <Sequence name="01 Gancho" layout="none" {...win(0, c.sit_lead + 0.4)}>
        <Agenda t={t} tl={tl} />
      </Sequence>
      <Sequence name="02 Situação" layout="none" {...win(c.sit_lead - 0.1, c.ten_before + 0.35)}>
        <Doubt t={t} tl={tl} />
      </Sequence>
      <Sequence name="03 Tensão" layout="none" {...win(c.ten_before - 0.15, c.ins_if + 0.35)}>
        <Align t={t} tl={tl} />
      </Sequence>
      <Sequence name="04 Insight" layout="none" {...win(c.ins_if - 0.05, c.cta_crit + 0.35)}>
        <Routes t={t} tl={tl} />
      </Sequence>
      <Sequence name="05 CTA comentário" layout="none" {...win(c.cta_crit - 0.1, tl.duration)}>
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
