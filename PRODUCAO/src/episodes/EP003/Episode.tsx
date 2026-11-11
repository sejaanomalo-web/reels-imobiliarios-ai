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
import { Incoming } from "./scenes/Incoming";
import { Queue } from "./scenes/Queue";
import { Cta } from "./scenes/Cta";

export const timeline = timelineJson as Timeline;

/**
 * EP003 — "O dia em que cinco clientes ligaram". Primeiro episódio no padrão de energia v2
 * (ver PROMPTS/GUIA_MELHORIA_CONTINUA.md): narração a ~220 palavras/min, câmera virtual sempre em movimento,
 * legenda dinâmica e trilha com bateria. Tempos de timeline.json (`npm run ep -- EP003`).
 */
export const EP003: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
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
    0.25 * (1 - prog(t, c.sit_urgent - 0.2, 0.4, ease.inOut)) -
    0.7 * prog(t, c.sit_urgent - 0.2, 0.4, ease.inOut) * (1 - prog(t, c.ins_sort + 0.3, 0.6, ease.out)) +
    0.5 * prog(t, c.ins_sort + 0.3, 0.6, ease.out) * (1 - prog(t, c.cta_flow, 0.5, ease.inOut)) +
    0.75 * prog(t, c.cta_flow, 0.8, ease.out);

  return (
    <AbsoluteFill style={{ backgroundColor: "#07080A" }}>
      <Background t={t * 2.2} mood={mood} />
      <Sequence name="01 Gancho" layout="none" {...win(0, c.sit_c1 + 0.2)}>
        <Hook t={t} tl={tl} />
      </Sequence>
      <Sequence name="02a Pedidos chegando" layout="none" {...win(c.sit_c1 - 0.02, c.sit_split + 0.3)}>
        <div style={{ position: "absolute", inset: 0, opacity: 1 - prog(t, c.sit_split + 0.05, 0.22, ease.linear) }}>
          <Incoming t={t} tl={tl} />
        </div>
      </Sequence>
      <Sequence name="02b–04 Tela dividida → fila" layout="none" {...win(c.sit_split, c.cta_flow + 0.7)}>
        <Queue t={t} tl={tl} />
      </Sequence>
      <Sequence name="05 CTA" layout="none" {...win(c.cta_flow, tl.duration)}>
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
