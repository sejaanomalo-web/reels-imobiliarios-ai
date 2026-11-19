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
import { Um } from "./scenes/Um";
import { Dois } from "./scenes/Dois";
import { Tres } from "./scenes/Tres";
import { Cta } from "./scenes/Cta";

export const timeline = timelineJson as Timeline;

/** ATIVO · REEL 05 — "Três atitudes que parecem fazer perder a venda" (ROTEIROS/ATIVO_REEL05.md). Reel orgânico: voz oficial 1,0×, CTA
 *  SISTEMA ("Deixa nos comentários" virou transição), verde exato #3AF584, logo oficial no fecho. Situações ilustrativas. */
export const ATIVOREEL05: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;
  const ctaAt = c.cta_quer;
  const f = (s: number) => Math.max(0, Math.round(s * fps));
  const win = (from: number, to: number) => ({ from: f(from), durationInFrames: Math.max(1, f(to) - f(from)) });
  const mood =
    -0.12 * (1 - prog(t, c.h_conf, 0.8, ease.out)) +
    0.15 * prog(t, c.u_prim, 0.6, ease.out) * (1 - prog(t, ctaAt, 0.5, ease.out)) +
    0.45 * prog(t, c.cta_comment, 0.8, ease.out);
  return (
    <AbsoluteFill style={{ backgroundColor: "#07080A" }}>
      <Background t={t} mood={mood} />
      <Sequence name="1 Gancho — 3 atitudes" layout="none" {...win(0, c.u_prim + 0.1)}>
        <Hook t={t} tl={tl} />
      </Sequence>
      <Sequence name="2 — dizer quando não serve" layout="none" {...win(c.u_prim - 0.45, c.d_seg + 0.1)}>
        <Um t={t} tl={tl} />
      </Sequence>
      <Sequence name="3 — entender o motivo" layout="none" {...win(c.d_seg - 0.45, c.t_terc + 0.1)}>
        <Dois t={t} tl={tl} />
      </Sequence>
      <Sequence name="4 — respeitar o momento + transição" layout="none" {...win(c.t_terc - 0.45, ctaAt + 0.1)}>
        <Tres t={t} tl={tl} />
      </Sequence>
      <Sequence name="6 CTA SISTEMA" layout="none" {...win(ctaAt - 0.4, tl.duration)}>
        <Cta t={t} tl={tl} />
      </Sequence>
      <Sequence name="Legendas" layout="none">
        <Captions t={t} chunks={tl.captions.filter((k) => !(tl.hideCaptions ?? []).includes(k.seg))} />
      </Sequence>
      <Grain frame={frame} />
      {withAudio ? <Audio src={staticFile(`${tl.id}/mix.wav`)} /> : null}
    </AbsoluteFill>
  );
};
