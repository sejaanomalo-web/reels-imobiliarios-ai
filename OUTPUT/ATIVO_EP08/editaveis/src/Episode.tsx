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
import { AtendA } from "./scenes/AtendA";
import { AtendB } from "./scenes/AtendB";
import { Diferenca } from "./scenes/Diferenca";
import { Insight } from "./scenes/Insight";
import { Cta } from "./scenes/Cta";

export const timeline = timelineJson as Timeline;

/** ATIVO · Episódio 08 — "Quando o mesmo imóvel é anunciado por outros corretores" (ROTEIROS/ATIVO_EP08.md). Reel orgânico: voz oficial 1,0×,
 *  CTA SISTEMA (o "Siga a ATIVO" do roteiro virou transição), verde exato #3AF584, logo oficial no fecho. */
export const ATIVO08: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const tl = timeline;
  const c = tl.cues;
  const ctaAt = c.cta_quer;
  const f = (s: number) => Math.max(0, Math.round(s * fps));
  const win = (from: number, to: number) => ({ from: f(from), durationInFrames: Math.max(1, f(to) - f(from)) });
  const mood =
    -0.2 * prog(t, c.a_mas, 0.6, ease.out) * (1 - prog(t, c.b_seg, 0.6, ease.out)) +
    0.15 * prog(t, c.b_seg, 0.6, ease.out) * (1 - prog(t, ctaAt, 0.5, ease.out)) +
    0.45 * prog(t, c.cta_comment, 0.8, ease.out);
  return (
    <AbsoluteFill style={{ backgroundColor: "#07080A" }}>
      <Background t={t} mood={mood} />
      <Sequence name="1 Gancho — mesmo imóvel, dois corretores" layout="none" {...win(0, c.a_prim + 0.1)}>
        <Hook t={t} tl={tl} />
      </Sequence>
      <Sequence name="2 Atendimento A — adjetivos" layout="none" {...win(c.a_prim - 0.45, c.b_seg + 0.1)}>
        <AtendA t={t} tl={tl} />
      </Sequence>
      <Sequence name="3 Atendimento B — pontos verificáveis" layout="none" {...win(c.b_seg - 0.45, c.d_dois + 0.1)}>
        <AtendB t={t} tl={tl} />
      </Sequence>
      <Sequence name="4 A diferença — descrever × ajudar a avaliar" layout="none" {...win(c.d_dois - 0.45, c.i_outro + 0.1)}>
        <Diferenca t={t} tl={tl} />
      </Sequence>
      <Sequence name="5 Insight — orientação" layout="none" {...win(c.i_outro - 0.45, ctaAt + 0.1)}>
        <Insight t={t} tl={tl} />
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
